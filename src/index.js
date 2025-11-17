//PRIMEIRA LINHA DO SEU PROJETO. CARREGA AS VARIÁVEIS DE AMBIENTE ANTES DE QUALQUER OUTRO CÓDIGO.
import 'dotenv/config';

//SINTAXE DE IMPORTAÇÃO PARA TODAS AS DEPENDÊNCIAS.
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; //NECESSÁRIO PARA RECRUAR O '__dirname'.
//import db from './db/db.js'; // EXCLUIR DEPOIS

// //Importando as rotas.
// Importa as rotas de autenticação 
import authRoutes from './routes/authRoutes.js';

import clienteRoutes from './routes/clienteRoutes.js';

import produtoRoutes from './routes/produtoRoutes.js';

// HABILITA O EXPRESS PARA ENTENDER O FORMATO JSON NO CORPO DAS REQUISIÇÕES 
// avisa o express que o json será meu padrão, tudo que chegar do usuário será convertido em arquivo json


// --- CONFIGURAÇÕES ---
// remete ao caminho para chegar até nosso conteúdo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const corsOptions = {
    origin: ['http://localhost:3333', 'https://meudominio.com'],
    methods: 'GET, POST, PUT, PATCH, DELETE',
    credentials: true
};

// --- INICIALIZAÇÃO DO APP ---
const app = express();

// --- MIDDLEWARES ---
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json()); // HABILITA O EXPRESS PARA ENTENDER O FORMATO JSON NO CORPO DAS REQUISIÇÕES. avisa o express que o json será meu padrão, tudo que chegar do usuário será convertido em arquivo json
//servindo pasta 'public' para arquivos (CSS, JS imagens).
app.use(express.static(path.join(__dirname, '..', 'public')));

//--- ROTAS ---
// rota principal que serve a página HTML.
app.get('/', (request, response) => {
    //req = REQUISIÇÃO (DADOS DO PEDIDO DO CLIENTE)
    //res = RESPOSTA (O QUE VAMOS ENVIAR DE VOLTA)
    response.sendFile(path.join(__dirname, '..', 'pages', 'home.html'));
});



const apiPrefix = '/api';
// Rotas gerais da API (ex: /api/sandro)
app.use(`${apiPrefix}/clientes`, clienteRoutes); //ex /api/clientes
app.use(`${apiPrefix}/login`, authRoutes); //Rota de login ex: /api/login
app.use(`${apiPrefix}/produtos`, produtoRoutes); //ex: /api/produtos/

// --- TRATAMENTO DE ERROS ---
// um middleware de erro centralizado.
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    res.status(500).send('algo deu errado no servidor!');
});

// --- INICIALIZAÇÃO DO SERVIDOR ---
//3. DEFINE A PORTA EM QUE O SERVIDOR VAI "ESCUTAR" OS PEDIDOS
const PORTA = process.env.PORT || 3333;
app.listen(PORTA, () => {
    console.log(`servidor rodando na porta ${PORTA}.`);
});

// // seus dados mockados (simulando o banco de dados) 
// const listaDeClientes = [
//     { id: 1, nome: `João Silva`, email: `joao.silva@example.com` },
//     { id: 2, nome: `Maria Santos`, email: `maria.santos@example.com` }
// ];

// //rota para listar todos os clientes (seu código original)
// app.get('/clientes', (req, res) => {
//     res.json(listaDeClientes);
// });

// //NOVA ROTA: rota para buscar UM cliente pelo ID
// app.get('/clientes/:id', (req, res) => {
//     //1. CAPTURA O ID DA URL E CONVERTE PARA NÚMERO
//     const idDoCliente = parseInt(req.params.id);

//     //2. PROCURA O CLIENTE NO ARRAY USANDO O MÉTODO FIND()
//     const cliente = listaDeClientes.find(c => c.id === idDoCliente);

//     //3. VERIFICA SE O CLIENTE FOI ENCONTRADO
//     if (cliente) {
//         //se encontrou, retorna o cliente com status 200 (OK)
//         res.json(cliente);
//     } else {
//         // se não encontrou, retorna um erro 404 (Not Found)
//         res.status(404).json({ mensagem: `cliente não encontrado.` });
//     }
// });

//ROTA PARA CRIAR UM NOVO CLIENTE
app.post('/clientes', (req, res) => {
    //o middleware express.json() pega o corpo da requisição e o coloca em req.boddy
    const novoCliente = req.body; // body é um arquivo (obj)
    console.log(`criamos um novo cliente:`, novoCliente);
    res.json({ message: `cliente ${novoCliente.novo} cadastrado com sucesso!`, data: novoCliente });
}); 

