# Project---Seja-QA-por-um-dia
O desafio é explorar a API DummyJSON (https://dummyjson.com/docs) e verificar o comportamento de todos os endpoints, documentar possíveis falhas e criar testes automatizados em Cypress.

---

### Falhas encontradas nos testes de POST e PUT:

- A API não valida tipos nos campos. Um exemplo seria na hora de enviar `"price": "cem"` e ainda assim obter `200 OK`, o que é um comportamento incorreto. O esperado seria erro 400 com mensagem.

- No PUT `/products/:id`, a API retorna um objeto do produto atualizado, mas não valida se os campos enviados são válidos. Campos inválidos como `"marca": "Fake"` são ignorados silenciosamente, sem feedback.

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
