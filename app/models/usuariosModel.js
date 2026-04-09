const pool = require("../../config/pool_conexoes");

const usuariosModel = {

    create: async (dadosJson) => {
        try {
            const [resultado] = await pool.query(
                "INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario) VALUES (?, ?, ?)",
                [dadosJson.nome, dadosJson.email, dadosJson.senha]
            );
            return resultado;
        } catch (erro) {
            return erro;
        }
    },

    findByEmail: async (email) => {
        try {
            const [resultado] = await pool.query(
                "SELECT * FROM usuarios WHERE email_usuario = ? AND status_usuario = 1",
                [email]
            );
            return resultado;
        } catch (erro) {
            return erro;
        }
    },

    findById: async (id) => {
        try {
            const [resultado] = await pool.query(
                "SELECT id_usuario, nome_usuario, email_usuario, status_usuario FROM usuarios WHERE id_usuario = ?",
                [id]
            );
            return resultado;
        } catch (erro) {
            return erro;
        }
    },

    // Exclusão lógica — marca como inativo em vez de apagar
    delete: async (id) => {
        try {
            const [resultado] = await pool.query(
                "UPDATE usuarios SET status_usuario = 0 WHERE id_usuario = ?",
                [id]
            );
            return resultado;
        } catch (erro) {
            return erro;
        }
    },

    // Atualizar nome e email
    update: async (id, dadosJson) => {
        try {
            const [resultado] = await pool.query(
                "UPDATE usuarios SET nome_usuario = ?, email_usuario = ? WHERE id_usuario = ?",
                [dadosJson.nome, dadosJson.email, id]
            );
            return resultado;
        } catch (erro) {
            return erro;
        }
    }

}

module.exports = { usuariosModel };
