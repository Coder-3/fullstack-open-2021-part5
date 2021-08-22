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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('coder-3')
      cy.get('#password').type('coder-3')
      cy.get('#loginButton').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test blog title')
      cy.get('#author').type('Test blog author')
      cy.get('#url').type('Test blog url')
      cy.get('#submitBlog').click()

      cy.contains('Test blog title')
      cy.contains('Test blog author')
    })

    it('A blog can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test blog title')
      cy.get('#author').type('Test blog author')
      cy.get('#url').type('Test blog url')
      cy.get('#submitBlog').click()

      cy.contains('View').click()
      cy.get('.blogExpanded').contains('0')
      cy.get('.blogExpanded').contains('like').click()
      cy.get('.blogExpanded').contains('1')
    })
  })
})