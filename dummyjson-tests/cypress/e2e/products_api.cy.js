describe("Funcionalidades: Produtos", () => {
    it("Validar se retorna lista de produtos, Dado que faço requisição para o endpoint de produtos, então deve retornar uma lista de produtos.", () => {
        cy.request("GET", "https://dummyjson.com/products").then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.products).to.be.an('array')
        })
    })

    it("Verificar limit=5, Dado que faço requisição com parâmetro limit=5, então deve retornar exatamente 5 produtos.", () => {
        cy.request("GET", "https://dummyjson.com/products?limit=5").then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.products).to.have.length(5);
        })
    })

    it("Garantir campos esperados, Dado que faço requisição para o endpoint de produtos, então cada produto deve possuir id, title, price etc.", () => {
        cy.request("GET", "https://dummyjson.com/products").then((response) => {
            response.body.products.forEach((product) => {
                expect(product).to.have.property('id');
                expect(product).to.have.property('title');
                expect(product).to.have.property('price');
                expect(product).to.have.property('description');
                expect(product).to.have.property('category');
            })
        })
    })
})