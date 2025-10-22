# Project---Seja-QA-por-um-dia
O desafio é explorar a API DummyJSON (https://dummyjson.com/docs) e verificar o comportamento de todos os endpoints, documentar possíveis falhas e criar testes automatizados em Cypress.

---

### Falhas encontradas nos testes de POST e PUT:

- (POST /products/add API) aceita campo inválido sem retornar erro

-Passos:

Enviar uma requisição POST para https://dummyjson.com/products/add.

No corpo da requisição, incluir:

{
  "title": "Perfume",
  "price": "cem"
}

-Executar o request.

-Resultado esperado:
A API deve retornar status 400 e mensagem informando que o campo price deve ser numérico.

-Resultado obtido:
A API retorna status 201 (OK) e aceita o valor incorreto "price": "cem" sem validar o tipo.

-Evidência:
Teste Cypress falhou no caso “Dado que envio dado inválido, Quando faço um POST, Então deve retornar erro”.

<img width="1068" height="672" alt="image" src="https://github.com/user-attachments/assets/1827bf11-1199-4560-b4fb-fa27ba8c13ab" />

---

### Discentes

| Nome do Discente | RA        |
| ---------------- | --------- |
| Jênie Danielle  | 1993310 |
| Maisa Amaral    | 1997058 |
| Samara Adorno     | 2001639 |
| Simone Siqueira  | 2001915 |

---

### Matéria

**Teste e Qualidade de Software**
