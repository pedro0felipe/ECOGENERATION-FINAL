# 🌱 ECOGENERATION - Plataforma de E-commerce de Energia Renovável

![Status](https://img.shields.io/badge/Status-Desenvolvimento-yellow)
![Node](https://img.shields.io/badge/Node.js-v14+-green)
![License](https://img.shields.io/badge/License-ISC-blue)

> Um projeto integrado de e-commerce especializado em produtos de energia renovável, com painel administrativo, sistema de diagnóstico de autonomia energética e carrinho de compras.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Banco de Dados](#-banco-de-dados)
- [API Routes](#-api-routes)

---

## 🎯 Sobre o Projeto

**ECOGENERATION** é uma plataforma educacional de e-commerce focada em **produtos de energia renovável** desenvolvida como projeto de TCC de Ensino Médio Técnico.

### Objetivos
✅ Demonstrar habilidades em **Front-end responsivo**  
✅ Implementar **Back-end coerente e profissional**  
✅ Integrar **Banco de Dados MySQL** com dados reais  
✅ Criar fluxo completo de compra e-commerce  
✅ Gerenciamento administrativo de dados  

### Diferenciais
- 40+ páginas com interfaces diferentes
- Sistema de diagnóstico inteligente de autonomia energética
- Calculadora de consumo energético
- Painel administrativo completo com dashboard
- Autenticação de usuários e administradores
- Histórico de compras persistente no banco

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript, EJS |
| **Backend** | Node.js, Express 5.1 |
| **Banco de Dados** | MySQL 2 (Clever Cloud / Local) |
| **Autenticação** | Express-Session |
| **Validação** | Express-Validator |
| **Ambiente** | Dotenv |

---

## ✨ Funcionalidades

### 🛒 Para Usuários Finais
- **Cadastro e Autenticação** - Login seguro com sessão
- **Catálogo de Produtos** - 40+ produtos em diversas categorias
- **Calculadora Energética** - Simular consumo e potência necessária
- **Diagnóstico** - Teste interativo para determinar autonomia energética
- **Carrinho de Compras** - Adicionar produtos, confirmar e finalizar compra
- **Histórico de Compras** - Acessar pedidos anteriores no perfil
- **Perfil do Usuário** - Atualizar dados e excluir conta

### 🔧 Para Administradores
- **Dashboard** - Estatísticas em tempo real do negócio
  - Total de usuários, diagnósticos e produtos
  - Produtos com estoque baixo
  - Últimos registros de cada tabela
  
- **Gerenciamento de Usuários** - Listar e deletar cadastros
- **Gerenciamento de Diagnósticos** - Visualizar e deletar testes realizados
- **Gerenciamento de Produtos** - CRUD completo (Criar, Editar, Deletar)
  - Controlar estoque
  - Visualizar produtos com alerta de falta

---

## 📦 Requisitos

- **Node.js** v14+ 
- **MySQL** 5.7+ (com credenciais configuradas)
- **npm** ou **yarn**

Testar:
```bash
node --version
npm --version
mysql --version
```

---

## 🚀 Instalação

### 1️⃣ Clonar o Repositório
```bash
cd /workspaces/ECOGENERATION-FINAL
```

### 2️⃣ Instalar Dependências
```bash
npm install
```

### 3️⃣ Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=SuaSenha123
DB_NAME=ecogeneration
DB_PORT=3306

# Node
NODE_ENV=development
PORT=3000
```

### 4️⃣ Criar Banco de Dados

Acesse o MySQL e execute:

```sql
CREATE DATABASE IF NOT EXISTS ecogeneration;
USE ecogeneration;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome_usuario VARCHAR(100) NOT NULL,
  email_usuario VARCHAR(100) UNIQUE NOT NULL,
  sexo VARCHAR(20),
  senha VARCHAR(255) NOT NULL,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Diagnósticos
CREATE TABLE IF NOT EXISTS diagnosticos (
  id_diagnostico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  nivel_autonomia VARCHAR(50),
  respostas JSON,
  data_diagnostico TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
  id_produto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome_produto VARCHAR(150) NOT NULL,
  categoria VARCHAR(50),
  preco_produto DECIMAL(10, 2) NOT NULL,
  estoque INT DEFAULT 0,
  descricao TEXT,
  imagem_produto VARCHAR(100),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Compras
CREATE TABLE IF NOT EXISTS compras (
  id_compra INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_produto INT NOT NULL,
  nome_produto VARCHAR(100) NOT NULL,
  preco_produto DECIMAL(10, 2) NOT NULL,
  imagem_produto VARCHAR(100),
  status_compra VARCHAR(30) DEFAULT 'confirmado',
  data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);
```

### 5️⃣ Inicializar o Servidor
```bash
node app.js
```

✅ Servidor rodando em: **http://localhost:3000**

---

## 📖 Como Usar

### 🏠 Página Inicial
```
http://localhost:3000/
```
- Apresentação da plataforma
- Links para cadastro e login
- Informações sobre energia renovável

### 📝 Cadastro de Usuário
```
http://localhost:3000/cadastro
```
- Formulário com validação
- Nome, Email, Sexo, Senha
- Dados salvos no MySQL

### 🔐 Login
```
http://localhost:3000/login
```
- Autenticação de usuário
- Sessão segura com Express-Session
- Redirecionamento após login

### 🛍️ E-loja
```
http://localhost:3000/ecoloja
```
- Catálogo com 40+ produtos
- Filtros por categoria
- Descrição detalhada de cada produto

### 📊 Diagnóstico
```
http://localhost:3000/diagnostico
```
- Teste interativo (5-10 perguntas)
- Resultado: Autonomia Baixa, Média ou Alta
- Salvo no banco de dados

### 🔢 Calculadora
```
http://localhost:3000/calculadora
```
- Simular consumo energético
- Calcular painel solar necessário
- Resultado com recomendção de produtos

### 🛒 Carrinho e Compra
```
http://localhost:3000/produto/:id        → Detalhes do produto
http://localhost:3000/confirmar-compra/:id → Confirmar pedido
http://localhost:3000/compra-sucesso     → Confirmação
```

### 👤 Perfil
```
http://localhost:3000/perfil
```
- Histórico de compras
- Opção de excluir conta
- Dados pessoais

### 🔧 Admin
```
http://localhost:3000/admin-login
```
Credenciais padrão:
- **Usuário**: `admin`
- **Senha**: `admin123`

Dashboard do admin:
- `http://localhost:3000/admin/dashboard` - Estatísticas
- `http://localhost:3000/admin/usuarios` - Gerenciar usuários
- `http://localhost:3000/admin/diagnosticos` - Visualizar diagnósticos
- `http://localhost:3000/admin/produtos` - CRUD de produtos

---

## 📁 Estrutura do Projeto

```
ECOGENERATION-FINAL/
│
├── app.js                              # Arquivo principal (entrada)
├── package.json                        # Dependências do projeto
├── .env                                # Variáveis de ambiente (não commitado)
│
├── config/
│   ├── pool_conexoes.js               # Conexão MySQL
│   └── script_bd.sql                  # Script SQL (referência)
│
├── app/
│   ├── public/                         # Arquivos estáticos (CSS, JS, Imagens)
│   │   ├── css/                       # 30+ arquivos de estilo
│   │   ├── js/                        # Validações e scripts frontend
│   │   └── imagens/                   # Imagens dos produtos
│   │
│   ├── views/
│   │   ├── pages/                     # 40+ páginas EJS
│   │   │   ├── index.ejs             # Home
│   │   │   ├── cadastro.ejs          # Registro
│   │   │   ├── login.ejs             # Autenticação
│   │   │   ├── calculadora-*.ejs     # Calculadora energética
│   │   │   ├── diagnostico.ejs       # Teste de autonomia
│   │   │   ├── ecoloja.ejs           # Catálogo
│   │   │   ├── produto.ejs           # Detalhe produto
│   │   │   ├── confirmar-compra.ejs  # Checkout
│   │   │   ├── compra-sucesso.ejs    # Confirmação
│   │   │   ├── perfil.ejs            # Usuário logado
│   │   │   └── [admin-*.ejs]         # Páginas admin
│   │   └── partials/                 # Componentes reutilizáveis
│   │
│   ├── routes/
│   │   ├── router.js                  # Rotas principais da aplicação
│   │   └── admin/router-adm.js        # Rotas do painel admin
│   │
│   ├── models/                         # Modelos de dados (MySQL)
│   │   ├── usuariosModel.js           # CRUD usuários
│   │   ├── produtosModel.js           # CRUD produtos
│   │   ├── diagnosticosModel.js       # CRUD diagnósticos
│   │   └── comprasModel.js            # CRUD compras
│   │
│   ├── data/
│   │   ├── data.json                  # Dados de demonstração (temporário)
│   │   └── dataManager.js             # Gerenciador JSON
│   │
│   └── middleware/
│       ├── auth.js                    # Middleware de autenticação
│       └── adminAuth.js               # Proteção de rotas admin
│
└── README.md                           # Este arquivo
```

---

## 🗄️ Banco de Dados

### Arquitetura

```
┌─────────────┐       ┌────────────────┐       ┌─────────────┐
│  USUARIOS   │       │  DIAGNOSTICOS  │       │  PRODUTOS   │
├─────────────┤       ├────────────────┤       ├─────────────┤
│ id_usuario  │◄──┐   │ id_diagnostico │       │ id_produto  │
│ nome        │   └───│ id_usuario     │       │ nome        │
│ email       │       │ nivel          │       │ categoria   │
│ sexo        │       │ respostas      │       │ preco       │
│ senha       │       │ data           │       │ estoque     │
│ data_cad    │       │                │       │ descricao   │
└─────────────┘       └────────────────┘       └─────────────┘
        ▲                                              ◄──┐
        │                                                 │
        └──────────────────────┬──────────────────────────┘
                               │
                        ┌──────┴──────┐
                        │   COMPRAS   │
                        ├─────────────┤
                        │ id_compra   │
                        │ id_usuario  │
                        │ id_produto  │
                        │ preco       │
                        │ data_compra │
                        │ status      │
                        └─────────────┘
```

**Nota**: Alguns dados de **demonstração** estão em `data.json` para mostrar funcionalidades antes de integração total com MySQL.

---

## 🔌 API Routes

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Home |
| GET | `/cadastro` | Página de registro |
| POST | `/cadastro` | Salvar novo usuário |
| GET | `/login` | Página de login |
| POST | `/login` | Autenticar usuário |
| GET | `/logout` | Sair da sessão |

### Usuário
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/perfil` | Perfil do usuário logado |
| GET | `/historico-compras` | Histórico de pedidos |
| POST | `/excluir-conta` | Deletar usuário |

### Produtos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/ecoloja` | Catálogo completo |
| GET | `/produto/:id` | Detalhe do produto |
| GET | `/categoria/:cat` | Produtos por categoria |

### Compras
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/confirmar-compra/:id` | Página de checkout |
| POST | `/confirmar-compra/:id` | Finalizar compra |
| GET | `/compra-sucesso` | Confirmação |

### Ferramentas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/calculadora` | Página inicial calculadora |
| POST | `/calcular` | Processar cálculo |
| GET | `/diagnostico` | Quiz de autonomia |
| POST | `/submit-diagnostico` | Salvar resultado |

### Admin
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/admin-login` | Login admin |
| POST | `/admin-login` | Autenticar admin |
| GET | `/admin/dashboard` | Dashboard |
| GET | `/admin/usuarios` | Listar usuários |
| GET | `/admin/diagnosticos` | Listar diagnósticos |
| GET | `/admin/produtos` | Listar produtos |
| GET | `/admin/produtos/novo` | Criar produto |
| POST | `/admin/produtos/novo` | Salvar produto |
| GET | `/admin/produtos/editar/:id` | Editar produto |
| POST | `/admin/produtos/editar/:id` | Atualizar produto |
| POST | `/admin/produtos/deletar/:id` | Deletar produto |

---

## 🎓 Para a Apresentação da Pré-banca

### ✅ Checklist de Demonstração
- [ ] Navegar pela home e mostrar design responsivo
- [ ] Faz cadastro → login → acessa catálogo
- [ ] Realiza diagnóstico → vê resultado salvo no banco
- [ ] Usa calculadora energética
- [ ] Adiciona produto ao carrinho
- [ ] Confirma compra → vê confirmação com ID
- [ ] Acessa perfil → visualiza histórico de compras
- [ ] Faz login como admin → acessa dashboard
- [ ] Mostra estatísticas (total usuários, diagnósticos, etc)
- [ ] Cria/edita/deleta um produto
- [ ] Mostra banco de dados MySQL com dados persistidos

### 📊 Dados para Apresentação

Para ter dados de exemplo no banco antes da apresentação:

```sql
-- Inserir usuários de exemplo
INSERT INTO usuarios (nome_usuario, email_usuario, sexo, senha) VALUES
('João Silva', 'joao@email.com', 'M', MD5('senha123')),
('Maria Santos', 'maria@email.com', 'F', MD5('senha123')),
('Pedro Costa', 'pedro@email.com', 'M', MD5('senha123'));

-- Inserir produtos de exemplo
INSERT INTO produtos (nome_produto, categoria, preco_produto, estoque, descricao) VALUES
('Painel Solar 100W', 'Energia', 450.00, 15, 'Painel fotovoltaico com eficiência 18%'),
('Luminária Solar', 'Iluminação', 79.90, 50, 'LED solar com bateria integrada'),
('Ventilador Solar', 'Ventilação', 199.90, 8, 'Ventilador com carregamento solar');
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
npm install
```

### Erro: "Connection refused" (MySQL)
- Verificar se MySQL está rodando
- Confirmar credenciais em `.env`
- Confirmar host/porta do banco

### Erro: "Template not found"
- Verificar caminho das views em `app.js`
- Garantir arquivos `.ejs` existem em `app/views/pages`

---

## 📝 Notas Importantes

📌 **JSON vs MySQL**: Este projeto usa MySQL em produção. O arquivo `data.json` é apenas para **demonstração rápida** de funcionalidades que podem não estar 100% integradas ao banco ainda.

📌 **Segurança**: Para produção, implemente:
- Validação mais rigorosa (express-validator expandido)
- Proteção contra SQL Injection (use prepared statements)
- Hash de senhas (bcrypt)
- HTTPS/SSL

📌 **Deployment**: Para colocar em produção (Heroku, Vercel, Render):
1. Usar banco MySQL remoto (ex: Clever Cloud, AWS)
2. Settar variáveis de ambiente no host
3. Usar `npm start` ao invés de `node app.js`

---

## 📧 Contato / Informações

- **Autor**: Pedro
- **Projeto**: TCC - Ensino Médio Técnico
- **Versão**: 1.0.0
- **License**: ISC

---

## 🚀 Próximas Melhorias

- [ ] Testes automatizados (Jest)
- [ ] API REST com JSON responses
- [ ] Integração com gateway de pagamento real
- [ ] PWA (Progressive Web App)
- [ ] Dashboard dinâmico com gráficos (Chart.js)
- [ ] Sistema de notificações por email
- [ ] Multiplos idiomas (i18n)

---

**Boa sorte na pré-banca! 🍀**
