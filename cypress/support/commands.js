Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('addProduto', (index, tamanho, cor) => {
  cy.visit('produtos')

  cy.get('.product-block')
    .eq(index)
    .click()

  if (tamanho) {
    cy.get(`.button-variable-item-${tamanho}`).click()
  }

  if (cor) {
    cy.get(`.button-variable-item-${cor}`).click()
  }

  cy.get('.single_add_to_cart_button').click()
})
