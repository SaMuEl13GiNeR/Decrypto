describe('tests cypress en decypto', () => {
  beforeEach(() => {
    cy.visit('https://localhost:4200/');
  });

  it('1. Que al cargar la página se cargue al menos 1 elemento de la tabla', () => {
    cy.get('.item').should('exist');
  });

  it('2. Que el primer elemento de la lista sea el que mayor capitalización de mercado tenga', () => {
    // const capitalizations = [];
    // cy.get('.item td:nth-child(5)').should('be.a', 'string');
  });

  it('3. Que el cambio de precio durante las 24 últimas horas aparezca verde si es positivo o rojo si es negativo', () => {
    cy.get('.item td:nth-child(6) span p').should(($color) => {
      if (parseFloat($color.text()) > 0) {
        expect($color).to.have.class('text-success');
      } else {
        expect($color).to.have.class('text-danger');
      }
    });
  });

  it('4. Comprobar que junto al precio de cada criptomoneda salga el símbolo del dólar', () => {
    cy.get('.item td:nth-child(4)')
      .invoke('text')
      .then((text) => expect(text.trim()).to.match(/^\$/));
  });
});
