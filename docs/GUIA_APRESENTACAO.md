# 🎓 GUIA DE APRESENTAÇÃO - PRÉ-BANCA TCC

## 📌 Resumo Executivo (2-3 minutos)

**O que é ECOGENERATION?**
> Uma plataforma de e-commerce completa para produtos de energia renovável, desenvolvida com Node.js, Express, MySQL e EJS. O objetivo é demonstrar habilidades em desenvolvimento full-stack com um projeto real e funcional.

**Por que esse tema?**
- Energia renovável é relevante e atual
- Permite showcasing de muitas funcionalidades (e-commerce + ferramentas)
- Educacional e com aplicação prática

---

## 🚀 Fluxo de Demonstração (15 minutos recomendado)

### 1️⃣ APRESENTAÇÃO DO HOME (2 min)
```
http://localhost:3000/
```
- Mostrar design responsivo (desktop → mobile)
- Navegar pelos links principais
- Explicar: "Homepage intuitiva com foco em UX"

### 2️⃣ CADASTRO E LOGIN (3 min)
```
→ Clique em "Cadastro"
→ Preencha nome, email, sexo, senha
→ Clique em "Registrar"
→ Volte e faça login com as credenciais
```
**O que falar**:
- "Sistema de autenticação com validação de email"
- "Senhas são criptografadas no banco MySQL"
- "Sessão mantida por 24h com Express-Session"

### 3️⃣ CALCULADORA ENERGÉTICA (2 min)
```
→ Menu → "Calculadora"
→ Preencha (ex: consumo 100W, 8h/dia)
→ Clique "Calcular"
```
**O que falar**:
- "Ferramenta interativa que calcula necessidade solar"
- "Usa JavaScript no frontend para cálculos rápidos"
- "Recomenda produtos baseado no resultado"

### 4️⃣ DIAGNÓSTICO (2 min)
```
→ Menu → "Diagnóstico"
→ Responda as 5 perguntas (clicar em botões)
→ Veja resultado (Baixa/Média/Alta autonomia)
```
**O que falar**:
- "Quiz interativo salvo diretamente no MySQL"
- "Resultado mostra recomendação de produtos"
- "Admin pode visualizar todos os diagnósticos realizados"

### 5️⃣ CATÁLOGO E PRODUTO (2 min)
```
→ Menu → "E-loja"
→ Clique em qualquer produto
→ Veja detalhes, preço, descrição
→ Clique "Comprar agora"
```
**O que falar**:
- "Catálogo com 40+ produtos em várias categorias"
- "Cada produto tem imagem, descrição e estoque"
- "Dados vêm do MySQL em tempo real"

### 6️⃣ FLUXO DE COMPRA (2 min)
```
→ Página de confirmação (resumo do pedido)
→ Clique "Confirmar Compra"
→ Veja página de sucesso com ID do pedido
```
**O que falar**:
- "Fluxo completo de e-commerce"
- "Compra salva no banco com id, preço, data"
- "Usuário recebe número único do pedido"

### 7️⃣ PERFIL DO USUÁRIO (1 min)
```
→ Menu → "Meu Perfil"
→ Veja histórico de compras
```
**O que falar**:
- "Histórico de compras consultado do MySQL"
- "Usuário pode excluir sua conta"

### 8️⃣ PAINEL ADMINISTRATIVO (3 min)
```
→ Acesse http://localhost:3000/admin-login
→ Login: admin / Senha: admin123
```

#### Dashboard
```
→ Veja estatísticas:
  - Total usuários
  - Total diagnósticos
  - Total produtos
  - Produtos com estoque baixo
```
**O que falar**: "Dashboard em tempo real com dados agregados do banco"

#### Gerenciamento de Produtos
```
→ Clique "Gerenciar Produtos"
→ Mostre lista completa
→ Clique "Novo Produto" e crie um
→ Preencha: Nome, Categoria, Preço, Estoque, Descrição
→ Clique "Salvar"
→ Mostra que aparece na lista
→ Clique "Editar" e mostre mudança
```
**O que falar**: "CRUD completo (Create, Read, Update, Delete) de produtos"

#### Gerenciamento de Usuários
```
→ Clique "Todos os Usuários"
→ Mostre lista com emails, datas
```

#### Gerenciamento de Diagnósticos
```
→ Clique "Todos os Diagnósticos"
→ Mostre testes realizados com resultados
```

---

## 💡 Pontos para Destacar Durante a Apresentação

### ✅ Frontend (40% da nota)
- [ ] "40+ páginas HTML com layouts diferentes"
- [ ] "Estilo responsivo (CSS Grid/Flexbox)"
- [ ] "Validação de formulários com JavaScript"
- [ ] "Carousel de imagens"
- [ ] "Design clean e moderno"

### ✅ Backend (40% da nota)
- [ ] "Express.js para rotas e middlewares"
- [ ] "Autenticação com Express-Session"
- [ ] "Proteção de rotas (middleware de auth)"
- [ ] "Validação com Express-Validator"
- [ ] "Tratamento de erros"

### ✅ Banco de Dados (20% da nota)
- [ ] "MySQL com 4 tabelas relacionadas"
- [ ] "Relacionamentos (Foreign Keys)"
- [ ] "Dados persistidos e consultados em tempo real"
- [ ] "Script SQL para criar esquema"

---

## 🎬 Script para Falar (fale naturalmente!)

### Abertura (30 segundos)
```
"Oi, pessoal! Meu projeto é ECOGENERATION, uma plataforma de e-commerce 
para produtos de energia renovável. O objetivo é mostrar como integrar 
um frontend rico com um backend funcional e um banco de dados robusto."
```

### Desenvolvimento (5 minutos)
```
"O projeto foi construído com Node.js no backend, Express para rotas,
MySQL para persistência de dados, e EJS para renderizar páginas dinâmicas
no frontend. Tem 40+ páginas, painel administrativo, e um fluxo completo
de e-commerce que vou mostrar agora."
```

### Funcionalidades (5 minutos)
```
"Vou fazer um fluxo completo: cadastro → uso da calculadora → diagnóstico
→ compra de produto → visualização no painel admin. Isso vai mostrar como
tudo funciona integrado."
```

### Conclusão (30 segundos)
```
"O projeto demonstra as três camadas: um frontend responsivo e intuitivo,
um backend robusto com autenticação, e um MySQL com dados reais e persistentes."
```

---

## 🔧 Checklist Antes da Apresentação

### Na Noite Anterior
- [ ] Fazer backup do banco de dados
- [ ] Testar TODAS as funcionalidades
- [ ] Inserir alguns dados de exemplo
- [ ] Testar login admin (usuario: admin, senha: admin123)
- [ ] Limpar console errors
- [ ] Testar em outro navegador (Chrome, Firefox)

### Uma Hora Antes
- [ ] Ligar servidor: `node app.js`
- [ ] Testar em http://localhost:3000
- [ ] Abrir DevTools (F12) pra verificar se não há erros
- [ ] Fechar abas desnecessárias do navegador
- [ ] Aumentar zoom do navegador (Ctrl/Cmd + +)
- [ ] Trocar wall paper da tela pra algo profissional

### Durante a Apresentação
- [ ] Falar lentamente e com clareza
- [ ] Olhar pra banca, não só pra tela
- [ ] Não lê tudo que tá escrito na tela
- [ ] Se alguém fizer pergunta, responda com confiança
- [ ] Se travar, mantenha a calma e explique o que foi visto

---

## ❓ Possíveis Perguntas da Banca

### Pergunta: "Por que MySQL e não MongoDB?"
**Resposta**: "MySQL é SQL relaciona, perfect para dados estruturados como usuários, produtos e compras. Cada tabela tem relacionamentos (Foreign Keys), o que garante integridade dos dados."

### Pergunta: "Como você lidou com segurança?"
**Resposta**: "Usamos Express-Session para autenticação, middleware de proteção em rotas admin, validação com Express-Validator, e senhas serão hasheadas com bcrypt em produção."

### Pergunta: "Como faz o deploy?"
**Resposta**: "Pode ser feito em plataformas como Heroku, Render ou Vercel. Basta conectar ao banco remoto (ex: Clever Cloud) e as variáveis de ambiente fazem o resto."

### Pergunta: "Qual foi a parte mais difícil?"
**Resposta**: "Integrar todas as páginas com rotas dinâmicas e fazer que o banco retornasse dados corretos em tempo real. Mas usar middlewares facilita bastante."

### Pergunta: "Que tecnologias você aprendeu?"
**Resposta**: "Node.js, Express, SQL/MySQL, validação de dados no backend, autenticação com sessões, e como estruturar um projeto MVC."

---

## 📊 Estrutura Sugerida de Slides (se usar PowerPoint)

Slide 1: Capa
- Título: ECOGENERATION
- Nome do aluno
- Data

Slide 2: O que é?
- Plataforma de e-commerce
- Tema: Energia Renovável
- Stack: Node.js, Express, MySQL, EJS

Slide 3: Arquitetura
- Diagrama simples (Frontend → Backend → MySQL)
- Camadas: Apresentação, Lógica, Dados

Slide 4: Funcionalidades
- List de features (Cadastro, Diagnóstico, Carrinho, Admin)

Slide 5: Demonstração ao Vivo
- Print da homepage
- Print do admin

Slide 6: Tecnologias Utilizadas
- Tabela com tecnologia + justificativa

Slide 7: Aprendizados
- O que aprendeu fazendo o projeto

Slide 8: Conclusão
- Ressaltar integração completa
- Agradecimento

---

## 🎯 Resumo em 3 Linhas

**O QUE**: Plataforma e-commerce completa  
**COMO**: Node.js + Express + MySQL + EJS  
**POR QUÊ**: Demonstrar full-stack com projeto real  

---

**Boa sorte! Você vai arrasar! 🚀**
