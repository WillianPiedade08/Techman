const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

//Importando os dados de arquivo csv para variáveis
const perfisData = fs.readFileSync('./prisma/data/perfis.csv', 'utf8');
const usuariosData = fs.readFileSync('./prisma/data/usuarios.csv', 'utf8');
const equipamentosData = fs.readFileSync('./prisma/data/equipamentos.csv', 'utf8');
const comentariosData = fs.readFileSync('./prisma/data/comentarios.csv', 'utf8');

// Funções para inserir os dados em cada tabela
async function inserePerfis() {
    const linhas = perfisData.split('\r\n');
    for (let i = 1; i < linhas.length; i++) { // ignora a primeira linha
        const linha = linhas[i];
        if (linha.trim()) { // verifica se a linha não está vazia
            const [id, perfil] = linha.split(';');
            await prisma.perfil.create({
                data: {
                    id: Number(id),
                    perfil
                }
            });
        }
    }
}

async function insereUsuarios() {
    const linhas = usuariosData.split('\r\n');
    for (let i = 1; i < linhas.length; i++) { // ignora a primeira linha
        const linha = linhas[i];
        if (linha.trim()) { // verifica se a linha não está vazia
            const [id, senha, perfil] = linha.split(';');
            await prisma.usuario.create({
                data: {
                    id: Number(id),
                    senha,
                    perfil: Number(perfil)
                }
            });
        }
    }
}

async function insereEquipamentos() {
    const linhas = equipamentosData.split('\r\n');
    for (let i = 1; i < linhas.length; i++) { // ignora a primeira linha
        const linha = linhas[i];
        if (linha.trim()) { // verifica se a linha não está vazia
            const [id, equipamento, imagem, descricao, ativo, data] = linha.split(';');
            await prisma.equipamento.create({
                data: {
                    id: Number(id),
                    equipamento,
                    imagem,
                    descricao,
                    ativo: Number(ativo),
                    data: new Date(data)
                }
            });
        }
    }
}

async function insereComentarios() {
    const linhas = comentariosData.split('\r\n');
    for (let i = 1; i < linhas.length; i++) { // ignora a primeira linha
        const linha = linhas[i];
        if (linha.trim()) { // verifica se a linha não está vazia
            const [id, comentario, equipamento, perfil, data] = linha.split(';');
            await prisma.comentario.create({
                data: {
                    id: Number(id),
                    comentario,
                    equipamento: Number(equipamento),
                    perfil: Number(perfil),
                    data: new Date(data)
                }
            });
        }
    }
}

//Implementa a função main que insere os dados em ordem sequencial
async function main() {
    console.log('Iniciando inserção de dados...');
    
    console.log('Inserindo perfis...');
    await inserePerfis();
    
    console.log('Inserindo usuários...');
    await insereUsuarios();
    
    console.log('Inserindo equipamentos...');
    await insereEquipamentos();
    
    console.log('Inserindo comentários...');
    await insereComentarios();
    
    console.log('Dados inseridos com sucesso!');
}

//Executando a função main
main()
    .then(async () => {
        await prisma.$disconnect()
        console.log('Semente completa!');
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });