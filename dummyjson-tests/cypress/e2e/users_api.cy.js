describe("Funcionaliidades: Usuários", () => {
    const baseUrl = 'https://dummyjson.com';
    it('Validar se retorna lista de usuários, Dado que faço requisição para o endpoint de usuários, então deve retornar uma lista de usuários.', () => {
        cy.request('GET', `${baseUrl}/users`).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.users).to.be.an('array')
        })
    })

    it('Verificar busca por id, Dado que faço requisição com parâmetro /1, então deve retornar apenas o usuário com id 1.', () => {
        cy.request('GET', `${baseUrl}/users/1`).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('id', 1)
            expect(res.body).to.have.property('firstName')
        })
    })

    it('Verificar erro ao buscar ID inexistente, dado que faço requisição com parâmetro /9999, então retorna uma mensagem de erro.', () => {
        cy.request({method: 'GET', url: `${baseUrl}/users/9999`, failOnStatusCode: false}).then((res) => {
            expect(res.status).to.eq(404)
        })
    })
})