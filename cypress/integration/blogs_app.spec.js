describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.request('POST', 'http://localhost:3000/api/users', {
      username: 'palmupe',
      name: 'Petri Palmu',
      password: 'salainen',
    })
    cy.request('POST', 'http://localhost:3000/api/users', {
      username: 'testeri',
      name: 'Test Tester',
      password: 'salainen',
    })
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#loginButton').click()
      cy.get('#username').type('palmupe')
      cy.get('#password').type('salainen')
      cy.get('#login').click()

      cy.contains('palmupe logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#loginButton').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login').click()

      cy.contains('wrong username/password').should(
        'have.css',
        'color',
        'rgb(97, 26, 21)'
      )
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'palmupe', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#author').type('Gleb Bahmutov')
      cy.get('#title').type('Readable Cypress.io tests')
      cy.get('#url').type('https://glebbahmutov.com/blog/readable-tests/')
      cy.get('#newBlogSubmit').click()

      cy.contains('Readable Cypress.io tests')
      cy.contains('Gleb Bahmutov')
    })
  })

  describe('When several blogs creaded by many people exist', function () {
    beforeEach(function () {
      cy.login({ username: 'palmupe', password: 'salainen' })
      cy.createBlog({
        author: 'John Doe',
        title: 'test1',
        url: 'http://example.com./test1',
      })
      cy.createBlog({
        author: 'John Doe',
        title: 'test2',
        url: 'http://example.com./test2',
      })
      cy.get('#logoutButton').click()
      cy.login({ username: 'testeri', password: 'salainen' })
      cy.createBlog({
        author: 'Jane Doe',
        title: 'test3',
        url: 'http://example.com./test3',
      })

      cy.contains('test1')
      cy.contains('test2')
      cy.contains('test3')
    })

    it('Blogs can be liked', function () {
      cy.contains('test1').click()
      cy.get('.likeBtn').click()
      cy.contains('likes 1')
    })

    it('The creator can delete a blog', function () {

      cy.contains('test3').click()
      cy.contains('remove').click()
      cy.get('#blogsButton').click()
      cy.should('not.contain', 'test3')

    })
  })
})

/*
 it('they are ordered by number of likes', function () {
      cy.contains('test1').click()
      cy.get('.likeBtn').click()

      cy.get('#blogsButton').click()

      cy.contains('test2').click()
      cy.get('.likeBtn').click()

      cy.get('#blogsButton').click()

      cy.contains('test3').click()
      cy.get('.likeBtn').click()

      cy.get('#blogsButton').click()

      cy.contains('test2').click()
      cy.get('.likeBtn').click()
      cy.get('.likeBtn').click()

      cy.get('#blogsButton').click()

      cy.contains('test1').click()
      cy.get('.likeBtn').click()

      cy.get('#blogsButton').click()
      cy.contains('test3').click()
      cy.get('.likeBtn').click()
      cy.get('.likeBtn').click()
      cy.get('.likeBtn').click()

      cy.get('#blogsButton').click()

      cy.get('.blog').then((blogs) => {
        cy.wrap(blogs[0]).click().get('.likes').contains('likes 4')
      })
      cy.get('#blogsButton').click()
      cy.get('.blog').then((blogs) => {
        cy.wrap(blogs[1]).click().get('.likes').contains('likes 3')
      })

      cy.get('#blogsButton').click()
      cy.get('.blog').then((blogs) => {
        cy.wrap(blogs[2]).click().get('.likes').contains('likes 2')
      })
    })
    */
