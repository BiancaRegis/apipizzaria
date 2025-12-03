// 1. importamos o schema que queremos testar
import { produtoCreateSchema } from "./produtoController.js";

//2. agrupamos nossos testes com 'describe'
describe("testes para criar um novo produto", () => {
    //3. teste 1: o 'caminho feliz'
    it("deve validar um produto com dados corretos", () => {
        // preparação (arrange)
        const produtoCerto = {
            idProduto: "5",
            nome: "Pizza do Matheus",
            descricao: "O patrão ficou maluco",
            tipo: "Pizza",
            imagem: "calabresaprodutoespecial.jpn",
            valor: 5.50
        };
        //execução (act)
       const {error} = produtoCreateSchema.validate(produtoCerto);
       //verificação (assert)
       //se 'error' for undefined (ou nulo), a validação passou.
       expect(error).toBeFalsy();
    });

    it("deve retornar verdade para rejeitar um campo sem nome", () => {
        const nomeCerto = {
            idProduto: "3",
            descricao: "pizza de brócolis",
            tipo: "sobremesa",
            imagem:'bróclois.png',
            valor: 50
        };
        const{error} = produtoCreateSchema.validate(nomeCerto);
        expect(error).toBeTruthy();

        expect(error.details[0].message).toBe('"nome" is required'); 
    });

    it("deve retornar verdade para rejeitar o campo de valor negativo", () => {
        const numeroCerto = {
            idProduto: "9",
            nome: "pizza de bacon",
            descricao: "pizza de bacon",
            tipo: "pizza",
            imagem: 'bacon.png',
            valor: -15.99
        };
        const{error} = produtoCreateSchema.validate(numeroCerto);
        expect(error).toBeTruthy();
        expect(error.details[0].message).toBe('"valor" must be a positive number');
    });

    it("deve rejeitar um produto com valor que não é um número", () => {
        const valorErrado = {
            idProduto: "10",
            nome: "pizza da leti",
            descricao: "pizza da letileti",
            tipo: "pizza",
            imagem: "",
            valor: "cinquentao"
        };
        const{error} = produtoCreateSchema.validate(valorErrado);
        expect(error).toBeTruthy();
        expect(error.details[0].message).toBe('"valor" must be a number');
    });

    it("deve permitir um produto com imagem em branco", () => {
        //preparação (arrange)
          const imagemCerta = {
            idProduto: "5",
            nome: "Pizza do Matheus",
            descricao: "O patrão ficou maluco",
            tipo: "Pizza",
            imagem: "",
            valor: 5.50
        };
        const{error} = produtoCreateSchema.validate(imagemCerta);
        expect(error).toBeFalsy()
    });
});