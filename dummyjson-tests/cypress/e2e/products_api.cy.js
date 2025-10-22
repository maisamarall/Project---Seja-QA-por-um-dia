describe("Funcionalidades: Produtos API DummyJSON", () => {
  // GET /products
  // All products
  it("Dado que quero validar se retorna lista de produtos da API, Quando faço a requisição para o endpoint de produtos, Então deve retornar uma lista de produtos.", () => {
    cy.request("GET", "https://dummyjson.com/products").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.products).to.be.an("array");
    });
  });

  // Limit products
  it("Dado que quero verificar limit=5, Quando faço a requisição com parâmetro limit=5, Então deve retornar exatamente 5 produtos.", () => {
    cy.request("GET", "https://dummyjson.com/products?limit=5").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.products).to.have.length(5);
      }
    );
  });

  // Campos esperados
  it("Dado que quero garantir campos esperados, Quando faço a requisição para o endpoint de produtos, Então cada produto deve possuir id, title, price etc.", () => {
    cy.request("GET", "https://dummyjson.com/products").then((response) => {
      response.body.products.forEach((product) => {
        expect(product).to.have.property("id");
        expect(product).to.have.property("title");
        expect(product).to.have.property("price");
        expect(product).to.have.property("description");
        expect(product).to.have.property("category");
      });
    });
  });

  // POST /products
  // Dado válido
  it("Dado que envio dados válidos, Quando faço POST, Então deve retornar produto criado", () => {
    cy.request({
      method: "POST",
      url: "https://dummyjson.com/products/add",
      body: {
        title: "Perfume",
        price: 150,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("title", "Perfume");
      expect(response.body).to.have.property("price", 150);
    });
  });

  //Dado inválido
  it("Dado que envio dado inválido, Quando faço um POST, Então deve retornar erro", () => {
    cy.request({
      method: "POST",
      url: "https://dummyjson.com/products/add",
      failOnStatusCode: false,
      body: {
        title: "Perfume",
        price: "cem",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.be.an("object");
      expect(response.body.price).to.eq("cem");
    });
  });

  // PUT /products/
  // Dado valído
  it("Dado que quero atualizar o titulo, Quando faço PUT, Então a resposta deve refletir a alteração", () => {
    cy.request({
      method: "PUT",
      url: "https://dummyjson.com/products/1",
      body: {
        title: "Perfume Roxo",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("object");
      expect(response.body.title).to.eq("Perfume Roxo");
    });
  });

  it("Dado que quero atualizar apenas os campos válidos, Quando faço PUT, Então ele ignora os inválidos", () => {
    const produtoId = 1;
    const url = `https://dummyjson.com/products/${produtoId}`;

    cy.request({
      method: "PUT",
      url: url,
      failOnStatusCode: false,
      body: {
        title: "perfume",
        price: 150,
        marca: "Fake",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.have.property("title", "perfume");
      expect(response.body).to.have.property("price", 150);

      expect(response.body).to.not.have.property("marca");

      expect(response.body).to.have.all.keys(
        "id",
        "title",
        "description",
        "price",
        "discountPercentage",
        "rating",
        "stock",
        "brand",
        "category",
        "thumbnail",
        "images"
      );
    });
  });

  // Dado inválido
  it("Dado que quero atualizar com dado inválido, Quando faço PUT, Então deve retornar erro", () => {
    cy.request({
      method: "PUT",
      url: "https://dummyjson.com/products/1",
      failOnStatusCode: false,
      body: {
        title: "Perfume",
        price: "cem",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("object");
      expect(response.body.price).to.eq("cem");
    });
  });

  // DELETE /products
  // Válido
  it("Dado que quero deletar um produto existente, Quando faço DELETE, Então deve retornar o produto deletado", () => {
    cy.request({
      method: "DELETE",
      url: "https://dummyjson.com/products/1",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("id", 1);
    });
  });

  // Inválido
  it("Dado que quero deletar um produto inexistente, Quando faço DELETE, Então deve retornar erro", () => {
    cy.request({
      method: "DELETE",
      url: "https://dummyjson.com/products/9999",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

});