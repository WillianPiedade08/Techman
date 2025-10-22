const uri = 'http://localhost:3000/';
const user = JSON.parse(window.localStorage.getItem("usertechman"));
const formEquipamento = document.getElementById('formEquipamento');
var idEquipamento = 0;
const perfis = [];

if (user == undefined) {
    window.location.href = '../login/';
} else {
    let btnovo = document.getElementById('btnovo');
    if (user.perfil == 2) {
        btnovo.classList.remove('oculto');
    }
}

function sair() {
    window.localStorage.removeItem("usertechman");
    window.location.reload();
}

function listarPerfis() {
    fetch(uri + 'perfil')
        .then(response => response.json())
        .then(data => {
            data.forEach(p => {
                perfis.push(p);
            });
        });
}

function listarEquipamentos() {
    const equipamentos = document.getElementById('equipamentos');
    equipamentos.innerHTML = '';
    fetch(uri + "equipamento")
        .then(response => response.json())
        .then(data => {
            data.forEach(e => {
                const card = document.createElement('div');
                card.className = 'card';
                if (user.perfil == 2)
                    card.innerHTML = `
                    <div>
                        <img class="ilustracao" src="${e.imagem.slice(0,4)=='http'?e.imagem:`../assets/${e.imagem}`}" alt="imagem do equipamento">
                    </div>
                    <div>
                        <h2>${e.equipamento}</h2>
                        <p>${e.descricao}</p>
                        <div>
                            <img src="../assets/comentario.png" onclick="exibirComentarios(${e.id})" class="icone">
                            <img onclick="excluirEquipamento(${e.id})" src="../assets/deletar.png" class="icone">
                        </div>
                    </div>
                    `;
                else
                    card.innerHTML = `
                    <div>
                        <img class="ilustracao" src="../assets/${e.imagem}" alt="imagem ilustrativa">
                    </div>
                    <div>
                        <h2>${e.equipamento}</h2>
                        <p>${e.descricao}</p>
                        <div>
                            <img src="../assets/comentario.png" onclick="exibirComentarios(${e.id})">
                        </div>
                    </div>
                    `;
                equipamentos.appendChild(card);
            });
        });
}

function excluirEquipamento(id) {
    const excluir = document.getElementById('excluir');
    excluir.classList.remove('oculto');
    idEquipamento = id;
}

function comfirmaExclusao() {
    fetch(uri + 'equipamento/' + idEquipamento, {
        method: 'DELETE'
    })
        .then(() => {
            window.location.reload();
        });
}

function exibirComentarios(id) {
    idEquipamento = id;
    const comentarios = document.getElementById('comentarios');
    comentarios.classList.remove('oculto');
    const listaComentarios = document.getElementById('listaComentarios');
    listaComentarios.innerHTML = '';
    fetch(uri + 'comentario/equipamento/' + id)
        .then(response => response.json())
        .then(data => {
            data.forEach(c => {
                const card = document.createElement('div');
                card.className = 'comentario';
                card.innerHTML = `
                    <div>
                        <h2>${perfis[c.perfil - 1].perfil} - ${new Date(c.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</h2>
                        <p>${c.comentario}</p>
                    </div>
                    `;
                listaComentarios.appendChild(card);
            });
        });
}

function habilitarNComent(e) {
    const nComent = document.getElementById('nComent');
    if (e.value.length > 0)
        nComent.removeAttribute('disabled');
    else
        nComent.setAttribute('disabled', 'true');
}

function cadastrarComentario(comentario) {
    const dados = {
        comentario: comentario.value,
        perfil: user.perfil,
        equipamento: idEquipamento
    }
    console.log(dados);
    fetch(uri + 'comentario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then((res) => {
            if (res.status == 201) {
                alert('Sucesso! Comentário cadastrado para o equipamento.');
                window.location.reload();
            } else {
                alert('Erro ao cadastrar comentário');
            }
        });
}

formEquipamento.addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = {
        equipamento: formEquipamento.nome.value,
        descricao: formEquipamento.descricao.value,
        imagem: formEquipamento.imagem.value,
        ativo: formEquipamento.ativo.checked ? 1 : 0
    }
    console.log(dados);
    fetch(uri + 'equipamento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then((res) => {
            if (res.status == 201) {
                alert('Sucesso! Equipamento cadastrado.');
                window.location.reload();
            } else {
                alert('Erro ao cadastrar equipamento');
            }
        });
});