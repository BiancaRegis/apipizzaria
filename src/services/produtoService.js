//Sintaxe de 'import'. Note a extensão '.js' no import relativo.
import db from '../db/db.js';

//Usando 'export const' para exportações nomeadas.
export const findAll = async () => {
    const [result] = await db.query('SELECT * FROM produto');
    return result;
};

export const findById = async (idProduto) => {
    const [result] = await db.query('SELECT * FROM produto WHERE idProduto = ?', [idProduto]);
    return result.length > 0 ? result[0] : null;
};

export const findByTipo = async (tipo) => {
    const [result] = await db.query('SELECT * FROM produto WHERE tipo = ?', [tipo]);
    return result;
};

export const findByNome = async (nome) => {
    const sql = 'SELECT * FROM produto WHERE nome = ?';
    const [rows] = await db.query(sql, [nome]);
    return rows[0] || null;
};

export const create = async (produtoData) => {
    await db.query('INSERT INTO produto SET ?', produtoData);
    return produtoData;
};

export const update = async (idProduto, produtoData) => {
    const [result] = await db.query('UPDATE produto SET ? WHERE idProduto = ?', [produtoData, idProduto]);
    return result.affectedRows > 0;
};

export const remove = async (idProduto) => {
    const [result] = await db.query('DELETE FROM produto WHERE idProduto = ?', [idProduto]);
    return result.affectedRows > 0;
};
