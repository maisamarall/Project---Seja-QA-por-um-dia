# Project---Seja-QA-por-um-dia
O desafio é explorar a API DummyJSON (https://dummyjson.com/docs) e verificar o comportamento de todos os endpoints, documentar possíveis falhas e criar testes automatizados em Cypress.

---

### Falhas encontradas nos testes de POST e PUT:

- (POST /products/add API) aceita campo inválido sem retornar erro

- Passos:
Enviar uma requisição POST para https://dummyjson.com/products/add.

No corpo da requisição, incluir:

{
  "title": "Perfume",
  "price": "cem"
}

- Executar o request.

- Resultado esperado:
A API deve retornar status 400 e mensagem informando que o campo price deve ser numérico.

- Resultado obtido:
A API retorna status 201 (OK) e aceita o valor incorreto "price": "cem" sem validar o tipo.

- Evidência:
<img width="1068" height="672" alt="image" src="https://github.com/user-attachments/assets/1827bf11-1199-4560-b4fb-fa27ba8c13ab" />

---

PUT /products/:id) – API ignora campos inválidos
- Passos:
Enviar uma requisição PUT para https://dummyjson.com/products/1

No corpo da requisição, incluir:

{
  "title": "perfume",
  "price": 150,
  "marca": "Fake"
}

- Executar o request.

- Resultado esperado:
A API deve retornar erro informando que o campo marca não é válido, ou rejeitar toda a atualização.

- Resultado obtido:
A API retorna status 200 (OK) e ignora o campo inválido "marca", sem retornar mensagem de alerta ou erro.

- Evidência:
<img width="1068" height="672" alt="image" src="https://github.com/user-attachments/assets/7d1aced8-4f0f-4d1d-8229-aa8bd1f498d0" />

---

### Nossa conclusão

- A nossa conclusão a respeito da API Dummy JSON seria dizer que ela é muito útil para a realização de testes, porém *não é confiável* para produção, pois faltam algumas validações básicas, tratamento de erro de maneira adequada, não tem muita consistência com relação aos seus retornos, entre outros pontos que podem ser descritos como possíveis defeitos da API.

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
