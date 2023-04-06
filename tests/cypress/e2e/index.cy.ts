describe('Works properly', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load an image from Getty', () => {
    cy.get('[data-test=GettyCardContainer]')
      .children()
      .should('have.length.greaterThan', 10);
  });
});
