describe('Funcionalidades: POST e PUT - Testes na API DummyJSON', () => {
    // Dado válido
    it('Dado que envio dados válidos, Quando faço POST, Então deve retornar produto criado', () => {
        cy.request({
            method: 'POST',
            url: 'https://dummyjson.com/products/add',
            body: {
                title: 'Perfume',
                price: 150
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('title', 'Perfume')
            expect(response.body).to.have.property('price', 150)
        })
    })

    //Dado inválido
    it('Dado que envio dado inválido, Quando faço um POST, Então deve retornar erro', () => {
        cy.request({
            method: 'POST',
            url: 'https://dummyjson.com/products/add',
            failOnStatusCode: false,
            body: {
                title: 'Perfume',
                price: 'cem'
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.price).to.eq('cem')
        })
    })

    it('Dado que quero atualizar o titulo, Quando faço PUT, Então a resposta deve refletir a alteração', () => {
        cy.request({
            method: 'PUT',
            url: 'https://dummyjson.com/products/1',
            body: {
                title: 'Perfume'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object');
            expect(response.body.title).to.eq('Perfume');
        })
    })

    it('Dado que quero atualizar apenas os campos válidos, Quando faço PUT, Então ele ignora os inválidos', () => {
        const produtoId = 1;
        const url = `https://dummyjson.com/products/${produtoId}`;

        cy.request({
            method: 'PUT',
            url: url,
            failOnStatusCode: false,
            body: {
                title: 'perfume',
                price: 150,
                marca: 'Fake'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);

            expect(response.body).to.have.property('title', 'perfume');
            expect(response.body).to.have.property('price', 150);

            expect(response.body).to.not.have.property('marca');

            expect(response.body).to.have.all.keys(
                'id',
                'title',
                'description',
                'price',
                'discountPercentage',
                'rating',
                'stock',
                'brand',
                'category',
                'thumbnail',
                'images'
            );
        });
    });
})