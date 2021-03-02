it('Happy flow test', () => {
  cy.visit('/');
  cy.contains('Minesweeper');
});
