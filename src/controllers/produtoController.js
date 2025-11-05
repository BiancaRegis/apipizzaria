//Usamos 'import * as' para agrupar todas as exportações do service.
import * as produtoService from '../services/produtoService.js';
import Joi from 'joi';

//Validação dos campos com Joi
export const produtoCreateSchema = Joi.object({
    nome: Joi.string().required(),
    descricao: Joi.string().required(),
    tipo: Joi.string().required(),
    imagem: Joi.string().allow('').required(),
    valor: Joi.number().required()
});

export const produtoUpdateSchema = Joi.object({
    nome: Joi.string(),
    descricao: Joi.string(),
    tipo: Joi.string(),
    imagem: Joi.string().allow(''),
    valor: Joi.number()
}).min(1);

//Listar todos os produtos
export const listarProdutos = async (req, res) => {
    try {
        const produtos = await produtoService.findAll();
        res.status(200).json(produtos);
    } catch (err) {
        console.error('erro ao buscar produtos:', err);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};

//Listar um produto por ID
export const listarProdutoId = async (req, res) => {
    try {
        const { idProduto } = req.params;
        const produto = await produtoService.findById(idProduto);
        if (!produto) {
            return res.status(404).json({ error: 'produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (err) {
        console.error('erro ao buscar produto:', err);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};

//Adicionar novo produto
export const adicionarProduto = async (req, res) => {
    try {
        const novoProduto = await produtoService.create(req.body);
        res.status(201).json({ message: 'produto adicionado com sucesso', data: novoProduto });
    } catch (err) {
        console.error('erro ao adicionar produto:', err);
        res.status(500).json({ error: 'erro ao adicionar produto' });
    }
};

//Atualizar produto
export const atualizarProduto = async (req, res) => {
    try {
        const { idProduto } = req.params;
        const update = await produtoService.update(idProduto, req.body);
        if (!update) {
            return res.status(404).json({ error: 'produto não encontrado' });
        }
        res.status(200).json({ message: 'produto atualizado com sucesso' });
    } catch (err) {
        console.error('erro ao atualizar produto:', err);
        res.status(500).json({ error: 'erro ao atualizar produto' });
    }
};

//Deletar produto
export const deletarProduto = async (req, res) => {
    try {
        const { idProduto } = req.params;
        const deleted = await produtoService.remove(idProduto);
        if (!deleted) {
            return res.status(404).json({ error: 'produto não encontrado' });
        }
        res.status(200).json({ message: 'produto deletado com sucesso' });
    } catch (err) {
        console.error('erro ao deletar produto:', err);
        res.status(500).json({ error: 'erro ao deletar produto' });
    }
};
