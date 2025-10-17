//1. IMPORTA A FERRAMENTA EXPRESS
import express from 'express'

//2. CRIA A NOSSA APLICAÇÃO (NOSSO SERVIDOR)
const app = express();
//express é uma função e colocamos dentro de uma variável 

// HABILITA O EXPRESS PARA ENTENDER O FORMATO JSON NO CORPO DAS REQUISIÇÕES 
// avisa o express que o json será meu padrão, tudo que chegar do usuário será convertido em arquivo json
app.use(express.json());

//3. DEFONE A PORTA EM QUE O SERVIDOR VAI "ESCUTAR" OS PEDIDOS
const PORTA = 3333;

//ROTA PRINCIPAL DA APLICAÇÃO
app.get('/', (request, response) => {
    //req = REQUISIÇÃO (DADOS DO PEDIDO DO CLIENTE)
    //res = RESPOSTA (O QUE VAMOS ENVIAR DE VOLTA)


    //ESTAMOS ENVIANDO UMA RESPOSTA NO FORMATO JSON
    response.json({ message: `bem vindo à API da Pizzaria Senac!` });
});

//4. MADA O SERVIDOR FICAR "ESCUTANDO" NA PORTA DEFINIDA
app.listen(PORTA, () => {
    console.log(`servidor rodando na porta ${PORTA}. acesse http://localhost:${PORTA}`);
});

// seus dados mockados (simulando o banco de dados) 
const listaDeClientes = [
    { id: 1, nome: `João Silva`, email: `joao.silva@example.com` },
    { id: 2, nome: `Maria Santos`, email: `maria.santos@example.com` },
    { id: 3, nome: `Pedro Almeida`, email: `pedro.almeida@example.com` }
];

//rota para listar todos os clientes (seu código original)
app.get('/clientes', (req, res) => {
    res.json(listaDeClientes);
});

//NOVA ROTA: rota para buscar UM cliente pelo ID
app.get ('/clientes/:id', (req, res) => {
//1. CAPTURA O ID DA URL E CONVERTE PARA NÚMERO
const idDoCliente = parseInt(req.params.id);

//2. PROCURA O CLIENTE NO ARRAY USANDO O MÉTODO FIND()
const cliente = listaDeClientes.find(c => c.id === idDoCliente);

//3. VERIFICA SE O CLIENTE FOI ENCONTRADO
if (cliente) {
    //se encontrou, retorna o cliente com status 200 (OK)
    res.json(cliente);
} else {
   // se não encontrou, retorna um erro 404 (Not Found)
   res.status(404).json({ mensagem: `cliente não encontrado.`});    
}
});

//ROTA PARA CRIAR UM NOVO CLIENTE
app.post('/clientes', (req, res) => {
    //o middleware express.json() pega o corpo da requisição e o coloca em req.boddy
    const novoCliente = req.body; // body é um arquivo (obj)
    console.log(`recebemos um novo cliente:`, novoCliente);
    res.json ({ message: `cliente ${novoCliente.novo} cadastrado com sucesso!`, data: novoCliente});
});