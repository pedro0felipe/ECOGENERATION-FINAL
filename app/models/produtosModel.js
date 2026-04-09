const pool = require("../../config/pool_conexoes");

const produtosModel = {

    findAll: async () => {
        try {
            const [resultado] = await pool.query(
                "SELECT * FROM produtos WHERE status_produto = 1"
            );
            return resultado;
        } catch (erro) {
            return erro;
        }
    },

    findById: async (id) => {
        try {
            const [resultado] = await pool.query(
                "SELECT * FROM produtos WHERE status_produto = 1 AND id_produto = ?",
                [id]
            );
            return resultado;
        } catch (erro) {
            return erro;
        }
    },

    findByCategoria: async (categoria) => {
        try {
            const [resultado] = await pool.query(
                "SELECT * FROM produtos WHERE categoria_produto = ? AND status_produto = 1 LIMIT 3",
                [categoria]
            );
            return resultado;
        } catch (erro) {
            return erro;
        }
    }

}

module.exports = { produtosModel };