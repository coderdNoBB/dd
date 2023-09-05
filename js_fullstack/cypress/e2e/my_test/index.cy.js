/// <reference types="cypress" />

Cypress.Commands.add('login', (username, password) => {
  cy.visit('http://localhost:3000/mountain?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F')
  cy.get('button').click()
  cy.get('form').within(() => {
    cy.get('input[name="username"]').type(username)
    cy.get('input[name="password"]').type(password)
    cy.get('button[type=submit]').click()
  })
  cy.url().should('eq', 'http://localhost:3000/')
})

context('LoginToHomePage', () => {
  beforeEach(() => {
    cy.login('d', 'd')
  })

  it('open index page', () => {
    cy.contains('Signed in as')
    console.log(cy.url())
  })
})
