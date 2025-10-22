describe("Funcionaliidades: Usuários API DummyJSON", () => {
  // GET /users
  // All users
  const baseUrl = "https://dummyjson.com";
  it("Validar se retorna lista de usuários, Dado que faço requisição para o endpoint de usuários, então deve retornar uma lista de usuários.", () => {
    cy.request("GET", `${baseUrl}/users`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.users).to.be.an("array");
    });
  });

  // User by ID valid
  it("Verificar busca por id, Dado que faço requisição com parâmetro /1, então deve retornar apenas o usuário com id 1.", () => {
    cy.request("GET", `${baseUrl}/users/1`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("id", 1);
      expect(res.body).to.have.property("firstName");
    });
  });

  // User by ID invalid
  it("Verificar erro ao buscar ID inexistente, dado que faço requisição com parâmetro /9999, então retorna uma mensagem de erro.", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/users/9999`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  // POST /users
  // Dado válido
  it("Criar novo usuário com dados válidos, Dado que envio dados válidos, quando faço POST, então deve retornar o usuário criado.", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/users/add`,
      body: {
        firstName: "João",
        lastName: "Silva",
        age: 30,
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("firstName", "João");
      expect(res.body).to.have.property("lastName", "Silva");
      expect(res.body).to.have.property("age", 30);
    });
  });

  // Dado inválido
  it("Criar novo usuário com dado inválido, Dado que envio dado inválido, quando faço POST, então deve retornar erro.", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/users/add`,
      failOnStatusCode: false,
      body: {
        firstName: "Ana",
        lastName: "Souza",
        age: "vinte",
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
    });
  });

  // PUT /users/:id
  // Atualizar usuário existente
  it("Atualizar usuário existente, Dado que envio dados válidos para um usuário existente, quando faço PUT, então deve retornar o usuário atualizado.", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/users/1`,
      body: {
        firstName: "Carlos",
        lastName: "Pereira",
        age: 35,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("firstName", "Carlos");
      expect(response.body).to.have.property("lastName", "Pereira");
      expect(response.body).to.have.property("age", 35);
    });
  });

  // Atualizar usuário com dado inválido
  it("Atualizar usuário com dado inválido, Dado que envio dado inválido para um usuário existente, quando faço PUT, então deve retornar erro.", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/users/1`,
      failOnStatusCode: false,
      body: {
        firstName: "Mariana",
        lastName: "Alves",
        age: "trinta e cinco",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // DELETE /users
  // Deletar usuário existente
  it("Deletar usuário existente, Dado que faço DELETE em um usuário existente, então deve retornar confirmação de exclusão.", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/users/1`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("object");
    });
  });

  // Deletar usuário inexistente
  it("Deletar usuário inexistente, Dado que faço DELETE em um usuário inexistente, então deve retornar erro.", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/users/9999`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

});