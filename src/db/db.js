import mysql from 'mysql2/promise';
//CRIAÇÃO DO POOL DE CONEXÕES

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//FUNÇÃO DE TESTE DE CONEXÃO AUTO-EXECUTÁVEL
(async () => {
    try {
        const connection = await db.getConnection();
        console.log(`conexão com o banco de dados estabelecida com sucesso!`);
        connection.release(); // LIBERA A CONEXÃO DE VOLTA PARA O POOL.
    } catch (error) {
        console.log(`erro ao conectar ao banco de dados:`, error);
    }
})();

// USANDO 'export default' PARA EXPORTAR A INSTÂNCIA DO POOL DE CONEXÕES.
export default db;