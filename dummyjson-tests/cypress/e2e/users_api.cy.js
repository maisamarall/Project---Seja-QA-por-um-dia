describe("Funcionaliidades: Usuários", () => {
    const baseUrl = 'https://dummyjson.com';
    it('Validar se retorna lista de usuários, Dado que faço requisição para o endpoint de usuários, então deve retornar uma lista de usuários.', () => {
        cy.request('GET', `${baseUrl}/users`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.users).to.be.an('array')
            expect(response.body.users[0]).to.include.keys('id', 'firstName', 'lastName', 'email');
        })
    })

    it('Verificar busca por id, Dado que faço requisição com parâmetro /1, então deve retornar apenas o usuário com id 1.', () => {
        cy.request('GET', `${baseUrl}/users/1`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id', 1)
            expect(response.body).to.have.property('firstName')
        })
    })

    it('Verificar erro ao buscar ID inexistente, dado que faço requisição com parâmetro /9999, então retorna uma mensagem de erro.', () => {
        cy.request({method: 'GET', url: `${baseUrl}/users/9999`, failOnStatusCode: false}).then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body).to.have.property('message');
        })
    })

    it('Verificar erro ao buscar ID inexistente, dado que faço requisição com parâmetro /9999, então retorna uma mensagem de erro.', () => {
        cy.request({method: 'GET', url: `${baseUrl}/users/9999`, failOnStatusCode: false}).then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body).to.have.property('message');
        })
    })

    it('Dado que vou adicionar um usuário com dados válidos, quando der /users/add, então retornará status 201 e os dados atualizados', () => {
        cy.request('POST', `${baseUrl}/users/add`, {
            firstName: 'Teste',
            lastName: 'Silva',
            age: 20
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('id')
            expect(response.body.firstName).to.eq('Teste')
        })
    })

    it('Dado que vou adicionar um usuário comm dados inválidos, quando der /users/add, então retornará erro', () => {
        const newUser = {
            firstName: 123,
            lastName: 'Silva',
            age: 'teste'
        }
        
        cy.request({method: 'POST', url: `${baseUrl}/users/add`, failOnStatusCode: false, body: newUser}).then((response) => {
            expect(response.status).to.eq(400)
        })
    })

    it('Dado que quero atualizar dados de usuário existente, quando der /user/1, então retornará o status 200 e o usuário atualizado', () => {
        cy.request('PUT', `${baseUrl}/users/1`, {
            firstName: 'NomeAtualizado',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.firstName).to.eq('NomeAtualizado')
        })
    })

    it('Dado que quero simular exclusão de usuário, quando der DELETE em um user, então deverá retornar o status 200 e ele deverá aparecer como deletado', () => {
        cy.request('DELETE', `${baseUrl}/users/1`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('isDeleted', true)
        })
    })
})