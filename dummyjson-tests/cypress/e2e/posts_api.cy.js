describe('Funcionalidades: Posts API DummyJSON', () => {
    const baseUrl = 'https://dummyjson.com'

    it('Dado que faço requisição para o endpoint de posts, então deve retornar uma lista de posts.', () => {
        cy.request('GET', `${baseUrl}/posts`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.posts).to.be.an('array')
        })
    })

    it('Dado que faço requisição com parâmetro /1, então deve retornar apenas o post com id 1.', () => {
        cy.request('GET', `${baseUrl}/posts/1`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id', 1)
            expect(response.body).to.have.property('title')
        })
    })

    it('Dado que faço requisição com parâmetro /9999, então retorna uma mensagem de erro.', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/posts/9999`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(404)
        })
    })

    it('Dado que envio dados válidos, quando faço POST, então deve retornar o post criado.', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/posts/add`,
            body: {
                title: 'Novo Post',
                userId: 1
            },
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.be.an('object')
            expect(response.body).to.have.property('title', 'Novo Post')
            expect(response.body).to.have.property('userId', 1)
        })
    })

    it('Dado que envio dado inválido, quando faço POST, então deve retornar erro.', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/posts/add`,
            failOnStatusCode: false,
            body: {
                title: '',
                userId: 'um'
            },
        }).then((response) => {
            expect(response.status).to.eq(400)
        })
    })


    it('Dado que envio dados para atualizar um post, quando faço PUT, então deve retornar o post atualizado.', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/posts/1`,
            body: {
                title: 'Post Atualizado'
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
            expect(response.body).to.have.property('title', 'Post Atualizado')
        })
    })

    it('Dado que envio dados para atualizar um post inexistente, quando faço PUT, então deve retornar erro.', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/posts/9999`,
            failOnStatusCode: false,
            body: {
                title: 'Post Inexistente'
            },
        }).then((response) => {
            expect(response.status).to.eq(404)
        })
    })

    it('Dado que quero deletar um post existente, quando faço DELETE, então deve retornar sucesso.', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/posts/1`,
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
        })
    })

    it('Dado que quero deletar um post inexistente, quando faço DELETE, então deve retornar erro.', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/posts/9999`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(404)
        })
    })
})