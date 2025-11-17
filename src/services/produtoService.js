//Sintaxe de 'import'. Note a extensão '.js' no import relativo.
import db from '../db/db.js';

//Usando 'export const' para exportações nomeadas.
export const findAll = async (minValor, maxValor, nome, idProduto, tipo) => {
    //1. define a consulta SQL base
    let sql = 'SELECT * FROM produto';
    //2. cria um array para as condições WHERE
    const conditions = [];
    //3. cria um array para os valores (para prevenir SQL Injection)
    const values = [];
    //4. adiciona as condições dinamicamente
    // adicionamos o filtro de menor valor
    if (minValor) {
        conditions.push('valor >= ?');
        values.push(minValor);
    }
    // adicionamos o filtro de maior valor
    if (maxValor) {
        conditions.push('valor <= ?');
        values.push(maxValor);
    }
    // adicionamos o filtro buscar por id
    if (idProduto) {
        conditions.push('idProduto = ?');
        values.push(idProduto);
    }
    // adicionamos o filtro de nome
    if (nome) {
        conditions.push('LOWER(nome) LIKE ?');
        values.push(`%${nome.toLowerCase()}%`);
    }
    // adicionamos o filtro por tipo
    if (tipo) {
        conditions.push('LOWER(tipo) LIKE ?');
        values.push(`%${tipo.toLowerCase()}%`);
    }

    //5. se houver condições, anexa elas à consulta SQL
    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }
    
    //6 executa a consulta final
    const [rows] = await db.query(sql, values);
    return rows;
};
//Agora você pode combinar todos os filtros na mesma URL:
//Buscar por nome(pizza) e preço (entre 30 e 50): GET http://localhost:3333/api/produtos?nome=pizza&minValor=30&maxValor=50
//Buscar por nome (borda) e preço (abaixo de 15): GET http://localhost:3333/api/produtos?nome=borda&maxValor=15
//Buscar por nome (calabresa): GET http://localhost:3333/api/produtos?nome=calabresa

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
