
describe('Image Resize', () => {
  it('load homepage', () => {
    cy.visit('/')
  })

  it('resize a picture', () => {
    cy.fixture('avatar.jpeg').as('image')
    cy.visit('/')
      // Select input Image
      .fixture('avatar.jpeg').then(setImageInApp)
      .wait(1000)
      .get('#image').invoke('width').should('equal', 302)
      .get('#width')
        // Check that the default Width is loaded correctly
        .should('have.value', '302')
        // Type in desired width
        .clear()
        .type('100')
      .get('#process-image').click()
      .wait(1000)
      .get('#result').invoke('width').should('equal', 100)
  })
})

// Function to select the Image in the App
// needed because cypress does not support using <input type='file'> yet
// https://github.com/cypress-io/cypress/issues/170
function setImageInApp(image) {
  return Cypress.Blob.base64StringToBlob(image, 'image/jpeg')
    .then(blob => {
      const file = new File([blob], 'avatar.jpeg', { type: 'image/jpeg' })
      return cy.window().then(w => w.vueApp.setFile(file))
    })
}