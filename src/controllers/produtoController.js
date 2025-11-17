//Usamos 'import * as' para agrupar todas as exportações do service.
import * as produtoService from '../services/produtoService.js';
import Joi from 'joi';

//Validação dos campos com Joi
export const produtoCreateSchema = Joi.object({
    idProduto: Joi.string().required(),
    nome: Joi.string().required(),
    descricao: Joi.string().required(),
    tipo: Joi.string().required(),
    imagem: Joi.string().allow(''),
    valor: Joi.number().positive().required()
});

export const produtoUpdateSchema = Joi.object({
    nome: Joi.string(),
    descricao: Joi.string(),
    tipo: Joi.string(),
    imagem: Joi.string().allow(''),
    valor: Joi.number().positive(),
}).min(1);

//Listar todos os produtos
export const listarProdutos = async (req, res) => {
    try {
        // capturamos os parâmetros de consukta de URL
        // ex: ?minValor=10 / ?maxValor = 100 / ?nome=pizza / ?id=001
        const { minValor, maxValor, nome, id, tipo} = req.query;
        // passamos todos os filtros para o serviço
        const produtos = await produtoService.findAll(minValor, maxValor, nome, id, tipo);
        if (produtos.length === 0) {
            return res.status(404).json({ message: "nenhum produto encontrado com esses filtros."});
        }
        res.status(200).json(produtos);
    } catch (err) {
        console.error('erro ao buscar produtos:', err);
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
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({error: 'ID já cadastrado.'});
        }
        res.status(500).json({ error: 'erro ao adicionar produto' });
    }
};

//Atualizar produto
export const atualizarProduto = async (req, res) => {
    try {
        const { idProduto } = req.params;
        //a validação agora é feita pelo middleware
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
