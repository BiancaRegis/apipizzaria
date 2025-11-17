// src/routes/produtoRoutes.js
import express from 'express';
import * as produtoController from '../controllers/produtoController.js';
import validate from '../middlewares/validate.js';
import { produtoCreateSchema, produtoUpdateSchema } from '../controllers/produtoController.js';

const router = express.Router();

//Criar produto
router.post('/', validate(produtoCreateSchema), produtoController.adicionarProduto);

//Listar produtos
router.get('/', produtoController.listarProdutos);

//Atualizar produto
router.put('/:idProduto', validate(produtoUpdateSchema), produtoController.atualizarProduto);

//Deletar produto
router.delete('/:idProduto', produtoController.deletarProduto);

export default router;
