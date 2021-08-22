describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Cedric Q',
      username: 'coder-3',
      password: 'coder-3'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('coder-3')
      cy.get('#password').type('coder-3')
      cy.get('#loginButton').click()

      cy.contains('Cedric Q logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('coder-3')
      cy.get('#password').type('coder-4')
      cy.get('#loginButton').click()
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')

      cy.contains('Wrong credentials')
    })
  })
})