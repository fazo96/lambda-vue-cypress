
describe('Image Resize', () => {
  it('load homepage', () => {
    cy.visit('/')
  })

  it('resize a picture', () => {
    cy.visit('/')
      .uploadFile('#input-image', 'avatar.jpeg')
      .get('#image').invoke('width').should('equal', 302)
      .get('#width')
        // Check that the default Width is loaded correctly
        .should('have.value', '302')
        // Type in desired width
        .clear()
        .type('100')
      .get('#process-image').click()
      .get('#result').invoke('width').should('equal', 100)
  })
})