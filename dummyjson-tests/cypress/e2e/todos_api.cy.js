describe("Funcionalidades: Todos API DummyJSON", () => {
    const baseUrl = "https://dummyjson.com";

    // GET /todos
    // All todos
  it("Dado que faço requisição para o endpoint de todos, então deve retornar uma lista de todos.", () => {
    cy.request("GET", `${baseUrl}/todos`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.todos).to.be.an("array");
    });
  });

    // Todo by ID valid
  it("Dado que faço requisição com parâmetro /1, então deve retornar apenas o todo com id 1.", () => {
    cy.request("GET", `${baseUrl}/todos/1`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("id", 1);
      expect(res.body).to.have.property("todo");
    });
  });

    // Todo by ID invalid
  it("Dado que faço requisição com parâmetro /9999, então retorna uma mensagem de erro.", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/todos/9999`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });

    // POST /todos
    // Dado válido
    it("Dado que envio dados válidos, quando faço POST, então deve retornar o todo criado.", () => {
        cy.request({
            method: "POST",
            url: `${baseUrl}/todos/add`,
            body: {
                todo: "Novo Todo",
                completed: false,
                userId: 1
            },
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property("todo", "Novo Todo");
            expect(response.body).to.have.property("completed", false);
            expect(response.body).to.have.property("userId", 1);
        });
    });

    // Dado inválido
    it("Dado que envio dado inválido, quando faço POST, então deve retornar erro.", () => {
        cy.request({
            method: "POST",
            url: `${baseUrl}/todos/add`,
            failOnStatusCode: false,
            body: {
                todo: "",
                completed: "não",
                userId: "um"
            },
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    // PUT /todos
    // Update todo existing
    it("Dado que quero atualizar o título do todo, quando faço PUT, então a resposta deve refletir a alteração.", () => {
        cy.request({
            method: "PUT",
            url: `${baseUrl}/todos/1`,
            body: {
                completed: true
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property("completed", true);
        });
    });

    // Update todo non-existing
    it("Dado que quero atualizar um todo inexistente, quando faço PUT, então deve retornar erro.", () => {
        cy.request({
            method: "PUT",
            url: `${baseUrl}/todos/9999`,
            failOnStatusCode: false,
            body: {
                completed: true
            },
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    // DELETE /todos
    // Delete todo existing
    it("Dado que quero deletar um todo existente, quando faço DELETE, então deve retornar sucesso.", () => {
        cy.request({
            method: "DELETE",
            url: `${baseUrl}/todos/1`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("object");
        });
    });

    // Delete todo non-existing
    it("Dado que quero deletar um todo inexistente, quando faço DELETE, então deve retornar erro.", () => {
        cy.request({
            method: "DELETE",
            url: `${baseUrl}/todos/9999`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
});