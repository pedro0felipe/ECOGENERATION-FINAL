# 📋 O que mudou nesta versão

## ✅ Novos arquivos criados

### Models
- `app/models/comprasModel.js` — gerencia compras no banco (create, findByUsuario, findById, findAll)
- `app/models/usuariosModel.js` — atualizado com funções `delete` e `update`

### Views
- `app/views/pages/confirmar-compra.ejs` — página de confirmação antes de comprar
- `app/views/pages/compra-sucesso.ejs` — página de sucesso após comprar
- `app/views/pages/perfil.ejs` — atualizado com histórico de compras + excluir conta
- `app/views/pages/produto.ejs` — atualizado com botão "Comprar agora"

### CSS
- `app/public/css/compra.css` — estilos para confirmar-compra e compra-sucesso
- `app/public/css/perfil.css` — atualizado com estilos de compras e modal de exclusão
- `app/public/css/produto.css` — atualizado

### Routes
- `app/routes/router.js` — reescrito com todas as rotas novas

---

## 🗄️ SQL para rodar no Clever Cloud (PHPMyAdmin)

Cole isso no SQL do PHPMyAdmin:

```sql
CREATE TABLE IF NOT EXISTS compras (
  id_compra      INT           NOT NULL AUTO_INCREMENT,
  id_usuario     INT,
  id_produto     INT,
  nome_produto   VARCHAR(100)  NOT NULL,
  preco_produto  DECIMAL(10,2) NOT NULL,
  imagem_produto VARCHAR(100)  
  status_compra  VARCHAR(30)   DEFAULT 'confirmado',
  PRIMARY KEY (id_compra)
);
```

---

## 🔄 Fluxo de compra implementado

1. `/ecoloja` — usuário vê os produtos
2. `/produto/:id` — clica em "Ver produto" → vê detalhes
3. `/confirmar-compra/:id` — clica em "Comprar agora" → vê resumo
4. POST `/confirmar-compra/:id` — confirma → salva no banco
5. `/compra-sucesso` — vê confirmação com número do pedido
6. `/perfil` → aba "Minhas Compras" → vê histórico

---

## 🔐 Proteções implementadas

- Rotas de compra só funcionam para usuários logados
- Se não logado, redireciona para /login automaticamente
- Excluir conta mostra modal de confirmação antes de executar

