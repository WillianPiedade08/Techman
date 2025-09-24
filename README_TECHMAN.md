# TechMan - Sistema de Gerenciamento de Equipamentos

## 📋 Descrição do Projeto

O **TechMan** é um sistema web completo para gerenciamento de equipamentos desenvolvido com tecnologias modernas. O sistema oferece uma interface intuitiva com teclado virtual para login, gerenciamento de equipamentos com diferentes níveis de permissão, e sistema completo de comentários.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web para Node.js
- **MySQL** - Banco de dados relacional
- **mysql2** - Driver MySQL para Node.js
- **express-session** - Gerenciamento de sessões
- **cors** - Middleware para Cross-Origin Resource Sharing

### Frontend
- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilização moderna com gradientes e animações
- **JavaScript (Vanilla)** - Interatividade e comunicação com API
- **Google Fonts (Inter)** - Tipografia profissional

### Banco de Dados
- **MySQL** - Compatível com XAMPP
- **4 Tabelas**: perfis, usuarios, equipamentos, comentarios
- **Relacionamentos** bem definidos com chaves estrangeiras

## 🎯 Funcionalidades

### 🔐 Sistema de Autenticação
- **Teclado Virtual**: Interface com botões numéricos (0-9), Clear (C) e Enter (⏎)
- **Login por Senha**: Autenticação com senhas numéricas de 6 dígitos
- **Feedback Visual**: Display com asteriscos e botão Enter habilitado apenas com 6 dígitos
- **Sessões Seguras**: Gerenciamento de sessões com Express Session

### 👥 Controle de Usuários e Permissões
- **Perfis de Usuário**: Administrador e Usuário comum
- **Controle de Acesso**: Funcionalidades diferentes baseadas no perfil
- **Usuários Pré-cadastrados**:
  - **Admin**: senha `123456` (perfil administrador)
  - **User1**: senha `654321` (perfil usuário)
  - **User2**: senha `111111` (perfil usuário)
  - **Manager**: senha `999999` (perfil administrador)

### 📦 Gerenciamento de Equipamentos
- **Listagem Visual**: Cards responsivos com imagens e descrições
- **Cadastro de Equipamentos**: Formulário completo (apenas administradores)
- **Exclusão de Equipamentos**: Funcionalidade restrita a administradores
- **Status de Equipamentos**: Ativo/Inativo com indicadores visuais
- **Validação de Dados**: Campos obrigatórios e validação de URLs

### 💬 Sistema de Comentários
- **Visualização por Equipamento**: Modal com lista de comentários
- **Cadastro de Comentários**: Todos os usuários podem comentar
- **Informações Completas**: Data, perfil do usuário e texto do comentário
- **Interface Responsiva**: Modal moderno com scroll automático

## 📁 Estrutura do Projeto

```
techman/
├── server.js                 # Servidor principal Express.js
├── package.json              # Dependências e scripts npm
├── config/
│   └── database.js          # Configuração e conexão MySQL
├── routes/
│   ├── auth.js              # Rotas de autenticação
│   ├── equipamentos.js      # Rotas de equipamentos
│   └── comentarios.js       # Rotas de comentários
└── public/
    ├── index.html           # Interface principal
    ├── styles.css           # Estilos CSS
    └── script.js            # JavaScript frontend
```

## 🛠️ Passo a Passo para Executar

### Pré-requisitos
1. **XAMPP** instalado e funcionando
2. **Node.js** (versão 14 ou superior)
3. **npm** (gerenciador de pacotes do Node.js)

### 1. Configurar o XAMPP e MySQL

#### 1.1. Iniciar o XAMPP
1. Abra o **XAMPP Control Panel**
2. Clique em **Start** nos módulos:
   - **Apache**
   - **MySQL**
3. Verifique se ambos estão com status verde

#### 1.2. Criar o Banco de Dados
1. Acesse `http://localhost/phpmyadmin` no navegador
2. Clique em **"Databases"** (Bancos de Dados)
3. Digite `techman` no campo "Create database"
4. Selecione `utf8mb4_general_ci` como collation
5. Clique em **"Create"** (Criar)

#### 1.3. Executar Scripts SQL
1. Selecione o banco `techman` na lista à esquerda
2. Clique na aba **"SQL"**
3. Cole e execute o seguinte script para criar as tabelas:

```sql
CREATE TABLE perfis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_perfil VARCHAR(50) NOT NULL
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(6) NOT NULL,
    perfil_id INT NOT NULL,
    FOREIGN KEY (perfil_id) REFERENCES perfis(id)
);

CREATE TABLE equipamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    url_imagem VARCHAR(255),
    status_ativo BOOLEAN DEFAULT TRUE,
    data_inclusao DATE NOT NULL
);

CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT NOT NULL,
    data_inclusao DATE NOT NULL,
    usuario_id INT NOT NULL,
    equipamento_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (equipamento_id) REFERENCES equipamentos(id)
);
```

4. Execute o script para inserir dados de exemplo:

```sql
INSERT INTO perfis (nome_perfil) VALUES ('administrador'), ('usuario');

INSERT INTO usuarios (login, senha, perfil_id) VALUES 
('admin', '123456', 1),
('user1', '654321', 2),
('user2', '111111', 2),
('manager', '999999', 1);

INSERT INTO equipamentos (nome, descricao, url_imagem, status_ativo, data_inclusao) VALUES 
('Furadeira Industrial', 'Furadeira de alta potência para uso industrial', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400', TRUE, '2024-01-15'),
('Serra Circular', 'Serra circular profissional para cortes precisos', 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400', TRUE, '2024-01-20'),
('Compressor de Ar', 'Compressor de ar de 50 litros para ferramentas pneumáticas', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', TRUE, '2024-02-01'),
('Soldadora MIG', 'Equipamento de solda MIG para trabalhos em metal', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400', FALSE, '2024-02-10'),
('Esmerilhadeira Angular', 'Esmerilhadeira de 4.5 polegadas para desbaste e corte', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', TRUE, '2024-02-15');

INSERT INTO comentarios (texto, data_inclusao, usuario_id, equipamento_id) VALUES 
('Excelente equipamento! Muito potente e durável.', '2024-01-16', 2, 1),
('Recomendo para trabalhos pesados. Ótima qualidade.', '2024-01-17', 3, 1),
('Cortes muito precisos. Ferramenta indispensável.', '2024-01-21', 2, 2),
('Compressor silencioso e eficiente. Muito bom!', '2024-02-02', 3, 3),
('Perfeito para soldas em chapas finas.', '2024-02-11', 2, 4),
('Equipamento robusto. Vale o investimento.', '2024-02-16', 3, 5);
```

### 2. Configurar o Projeto Node.js

#### 2.1. Extrair os Arquivos
1. Extraia o arquivo ZIP do projeto em uma pasta (ex: `C:\techman`)
2. Abra o **Prompt de Comando** ou **Terminal**
3. Navegue até a pasta do projeto:
   ```bash
   cd C:\techman
   ```

#### 2.2. Instalar Dependências
```bash
npm install
```

#### 2.3. Iniciar o Servidor
```bash
npm start
```

Ou para desenvolvimento com auto-reload:
```bash
npm run dev
```

### 3. Acessar o Sistema

1. Abra seu navegador
2. Acesse: `http://localhost:3000`
3. Use uma das senhas para fazer login:
   - **Administrador**: `123456`
   - **Usuário comum**: `654321`

## 🔧 Configuração Avançada

### Alterar Porta do Servidor
No arquivo `server.js`, modifique a linha:
```javascript
const PORT = process.env.PORT || 3000; // Altere 3000 para a porta desejada
```

### Configurar Conexão MySQL
No arquivo `config/database.js`, ajuste as configurações:
```javascript
const dbConfig = {
    host: 'localhost',     // Endereço do MySQL
    user: 'root',          // Usuário do MySQL
    password: '',          // Senha do MySQL (vazia no XAMPP)
    database: 'techman',   // Nome do banco
    port: 3306            // Porta do MySQL
};
```

## 🧪 Testando o Sistema

### Funcionalidades para Testar

#### Como Administrador (senha: 123456)
- ✅ Login com teclado virtual
- ✅ Visualizar lista de equipamentos
- ✅ Cadastrar novo equipamento
- ✅ Excluir equipamentos
- ✅ Visualizar comentários
- ✅ Adicionar comentários
- ✅ Fazer logout

#### Como Usuário Comum (senha: 654321)
- ✅ Login com teclado virtual
- ✅ Visualizar lista de equipamentos
- ✅ Visualizar comentários
- ✅ Adicionar comentários
- ❌ Cadastrar equipamentos (botão não aparece)
- ❌ Excluir equipamentos (botão não aparece)
- ✅ Fazer logout

## 🎨 Características do Design

### Interface Moderna
- **Gradiente de Fundo**: Azul e roxo para visual atrativo
- **Cards com Glassmorphism**: Efeito de vidro com blur e transparência
- **Animações Suaves**: Transições e hover effects
- **Tipografia Profissional**: Fonte Inter do Google Fonts

### Responsividade
- **Desktop**: Layout em grid com múltiplas colunas
- **Tablet**: Adaptação automática do grid
- **Mobile**: Layout em coluna única com botões empilhados

### Acessibilidade
- **Contraste Adequado**: Cores que atendem padrões de acessibilidade
- **Feedback Visual**: Estados hover, focus e disabled
- **Navegação por Teclado**: Suporte completo
- **Mensagens Claras**: Feedback de erro e sucesso

## 🔒 Segurança

### Medidas Implementadas
- **Validação de Entrada**: Sanitização de dados no backend
- **Controle de Sessão**: Timeout automático de sessões
- **Controle de Acesso**: Verificação de permissões em todas as rotas
- **Prevenção SQL Injection**: Uso de prepared statements
- **CORS Configurado**: Controle de origem das requisições

### Melhorias Futuras
- Hash de senhas com bcrypt
- Tokens JWT para autenticação
- Rate limiting para prevenir ataques
- Logs de auditoria
- Validação mais robusta no frontend

## 📊 API Endpoints

### Autenticação
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/logout` - Fazer logout
- `GET /api/auth/check` - Verificar autenticação

### Equipamentos
- `GET /api/equipamentos` - Listar equipamentos
- `GET /api/equipamentos/:id` - Buscar equipamento específico
- `POST /api/equipamentos` - Cadastrar equipamento (admin)
- `PUT /api/equipamentos/:id` - Atualizar equipamento (admin)
- `DELETE /api/equipamentos/:id` - Excluir equipamento (admin)

### Comentários
- `GET /api/comentarios/equipamento/:id` - Listar comentários de um equipamento
- `GET /api/comentarios/:id` - Buscar comentário específico
- `POST /api/comentarios` - Adicionar comentário
- `PUT /api/comentarios/:id` - Atualizar comentário
- `DELETE /api/comentarios/:id` - Excluir comentário

## 🐛 Solução de Problemas

### Erro de Conexão MySQL
```
Erro: connect ECONNREFUSED 127.0.0.1:3306
```
**Solução**: Verifique se o MySQL está rodando no XAMPP

### Erro de Banco Não Encontrado
```
Erro: Unknown database 'techman'
```
**Solução**: Crie o banco de dados `techman` no phpMyAdmin

### Erro de Porta em Uso
```
Erro: listen EADDRINUSE :::3000
```
**Solução**: Altere a porta no `server.js` ou pare o processo que está usando a porta 3000

### Página em Branco
**Solução**: 
1. Verifique se o servidor Node.js está rodando
2. Verifique o console do navegador para erros JavaScript
3. Confirme se todos os arquivos estão na pasta `public/`

## 📝 Scripts Disponíveis

```bash
npm start          # Iniciar servidor em produção
npm run dev        # Iniciar servidor em desenvolvimento (com nodemon)
```

## 🤝 Suporte

Para dúvidas ou problemas:
1. Verifique se todos os pré-requisitos estão instalados
2. Confirme se o XAMPP está rodando (Apache e MySQL)
3. Verifique se o banco de dados foi criado corretamente
4. Confirme se as dependências foram instaladas (`npm install`)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ usando Node.js, Express.js, MySQL e tecnologias web modernas.**

