import { produtoCreateSchema } from "./produtoController.js";

describe("testes para criar um novo produto", () => {
    it("deve validar um produto com dados corretos", () => {
        const produtoCerto = {
            idProduto: "5",
            nome: "Pizza do Matheus",
            descricao: "O patrão ficou maluco",
            tipo: "Pizza",
            imagem: "calabresaprodutoespecial.jpn",
            valor: 5.50
        };
       const {error} = produtoCreateSchema.validate(produtoCerto);
       expect(error).toBeFalsy();
    });

    it("deve retornar verdade para rejeitar um campo sem nome", () => {
        const nomeCerto = {
            idProduto: "3",
            nome: '',
            descricao: "pizza de brócolis",
            tipo: "sobremesa",
            imagem:'bróclois.png',
            valor: 50
        };
        const{error} = produtoCreateSchema.validate(nomeCerto);
        expect(error).toBeTruthy();
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
    });

    // it("deve permitir um produto com imagem em branco", () => {
    //       const imagemCerta = {
    //         idProduto: "5",
    //         nome: "Pizza do Matheus",
    //         descricao: "O patrão ficou maluco",
    //         tipo: "Pizza",
    //         imagem: '',
    //         valor: 5.50
    //     };
    //     const{error} = produtoCreateSchema.validate(imagemCerta);
    //     expert(error).toBeTruthy();
    // });
});