# 🔐 Painel de Administração - ECOGENERATION

## Visão Geral

Foi criado um **painel de administração completo** para gerenciar todos os dados da plataforma ECOGENERATION.

### ✨ Funcionalidades Implementadas

- ✅ **Dashboard** com estatísticas em tempo real
- ✅ **Gerenciamento de Usuários** - listar e deletar cadastros
- ✅ **Gerenciamento de Diagnósticos** - listar e deletar diagnósticos realizados
- ✅ **Gerenciamento de Produtos** - criar, editar, deletar e controlar estoque
- ✅ **Autenticação de Admin** com credenciais padrão
- ✅ **Persistência de Dados** em arquivo JSON local

---

## 🚀 Como Acessar o Admin

### 1. Iniciar o Servidor
```bash
cd /workspaces/ECOGENERATION-FINAL
node app.js
```

O servidor iniciará em `http://localhost:3000`

### 2. Acessar o Painel de Admin
Navegue até: **http://localhost:3000/admin-login**

### 3. Credenciais Padrão
- **Usuário**: `admin`
- **Senha**: `admin123`

---

## 📊 Dashboard

Ao fazer login, você verá:

- **Estatísticas Gerais**:
  - Total de usuários cadastrados
  - Total de diagnósticos realizados
  - Total de produtos em catálogo
  - Produtos com estoque baixo (≤ 5 unidades)

- **Tabelas de Dados Recentes**:
  - Últimos 5 usuários cadastrados
  - Últimos 5 diagnósticos realizados
  - Produtos com baixo estoque

---

## 👥 Gerenciamento de Usuários

**URL**: `/admin/usuarios`

Funcionalidades:
- ✅ Visualizar lista completa de usuários cadastrados
- ✅ Ver informações: Nome, Email, Sexo, Data de Cadastro
- ✅ Deletar usuários (com confirmação)

---

## 📋 Gerenciamento de Diagnósticos

**URL**: `/admin/diagnosticos`

Funcionalidades:
- ✅ Visualizar todos os diagnósticos realizados
- ✅ Ver informações: Usuário, Email, Nível de Autonomia, Data
- ✅ Badges coloridas indicando nível (Baixa, Média, Alta)
- ✅ Deletar diagnósticos (com confirmação)

---

## 📦 Gerenciamento de Produtos

**URL**: `/admin/produtos`

### Funcionalidades:

#### Listar Produtos
- Visualizar todos os produtos do catálogo
- Ver informações: ID, Nome, Categoria, Preço, Estoque
- Produtos com estoque baixo são destacados em amarelo
- Ícones de alerta para estoque crítico (≤ 5 unidades)

#### Criar Novo Produto
**URL**: `/admin/produtos/novo`
```
Campos:
- Nome do Produto
- Categoria (Iluminação, Ventilação, Energia, Carregamento, Outros)
- Preço (R$)
- Estoque (unidades)
- Descrição Detalhada
```

#### Editar Produto
**URL**: `/admin/produtos/:id/editar`
- Modificar qualquer informação do produto
- Atualizar preço e estoque

#### Deletar Produto
- Remove o produto do catálogo permanentemente
- Requer confirmação

---

## 📁 Armazenamento de Dados

Os dados são armazenados em arquivo JSON:
```
app/data/data.json
```

Estrutura:
```json
{
  "usuarios": [...],
  "diagnosticos": [...],
  "produtos": [...]
}
```

**Nota**: Os dados persistem entre reinicializações do servidor, pois são salvos em arquivo.

---

## 🗂️ Estrutura de Arquivos Criados

```
app/
├── middleware/
│   └── adminAuth.js              (Autenticação)
├── data/
│   ├── data.json                 (Banco de dados)
│   └── dataManager.js            (Gerenciador de dados)
├── views/pages/
│   ├── admin-login.ejs           (Página de login)
│   ├── admin-dashboard.ejs       (Dashboard)
│   ├── admin-usuarios.ejs        (Gerenciar usuários)
│   ├── admin-diagnosticos.ejs    (Gerenciar diagnósticos)
│   ├── admin-produtos.ejs        (Listar produtos)
│   └── admin-produto-editar.ejs  (Criar/Editar produto)
└── public/css/
    └── admin.css                 (Estilos do painel)
```

---

## 🔧 Configuração de Sessões

O painel usa `express-session` para manter o usuário autenticado:

```javascript
// Tempo de expiração: 24 horas
// Cookies seguros configurados em app.js
```

Faça logout para sair: **URL**: `/admin-logout`

---

## 🎨 Design e Interface

- **Tema**: Gradiente roxo/azul profissional
- **Responsivo**: Funciona em desktop, tablet e mobile
- **Navegação Intuitiva**: Sidebar fixo com menu de opções
- **Feedback Visual**: Carregamentos, alertas e confirmações
- **Acessibilidade**: Cores e tamanhos bem definidos

---

## 🔒 Segurança

**Melhorias Recomendadas para Produção:**

1. Usar banco de dados real (MongoDB, PostgreSQL, etc)
2. Criptografar senhas com `bcrypt`
3. Usar JWT ao invés de sessões
4. Implementar 2FA (autenticação de dois fatores)
5. Adicionar logs de auditoria
6. Rate limiting para login
7. HTTPS obrigatório

---

## 📝 Exemplos de Uso

### Criar um Novo Produto
1. Acesse `/admin/produtos`
2. Clique em "➕ Novo Produto"
3. Preencha o formulário
4. Clique em "✅ Criar Produto"

### Editar Estoque
1. Acesse `/admin/produtos`
2. Clique em "✏️ Editar" no produto
3. Atualize o campo "Estoque"
4. Clique em "✅ Salvar Alterações"

### Deletar Usuário
1. Acesse `/admin/usuarios`
2. Clique em "🗑️ Deletar" no usuário desejado
3. Confirme a ação

---

## 📞 Suporte

Para dúvidas ou melhorias, consulte a documentação da estrutura ou entre em contato com o time de desenvolvimento.

**Última atualização**: 24 de Março de 2026
