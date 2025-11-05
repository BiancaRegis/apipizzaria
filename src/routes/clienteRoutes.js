// src/routes/clientesRoutes.js
import express from 'express';
import * as clienteController from '../controllers/clienteController.js';
import validate from '../middlewares/validate.js';
import { clienteCreateSchema, clienteUpdateSchema } from '../controllers/clienteController.js';


//import authMiddleware from '../middlewares/authMiddleware.js'; //1 importa o middleware
const router = express.Router();

//A rota de criação de cliente (registro) continua pública
router.post('/', validate(clienteCreateSchema),clienteController.adicionarCliente); // rota final: POST /api/clientes

//2 aplica o proteção do login em todas as rotas abaixo desta linha
//router.use(authMiddleware); // //DESCOMENTAR PARA FUNCIONAR

// o caminho base '/api/clientes' já foi definido no index.js
// agora definimos apenas as partes relativas: '/', '/:cpf', etc.
router.get('/', clienteController.listarClientes); // rota final: GET /api/clientes
router.get('/:cpf', clienteController.listarClienteCpf); // rota final: GET /api/clientes/:cpf

router.put('/:cpf', validate(clienteUpdateSchema), clienteController.atualizarCliente); // rota final: PUT /api/cliente/:cpf
router.delete('/:cpf', clienteController.deletarCliente); // rota final: DELETE /api/clientes/:cpf
export default router;