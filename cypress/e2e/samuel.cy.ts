describe('tests cypress en decypto', () => {
  beforeEach(() => {
    cy.visit('https://localhost:4200/');
  });

  it('1. Que al cargar la página se cargue al menos 1 elemento de la tabla', () => {
    cy.get('.item').should('exist');
  });

  it('2. Que el primer elemento de la lista sea el que mayor capitalización de mercado tenga', () => {
    cy.get('.item .market-cap').each(($number, $index, $list) => {
      let $number1 = parseFloat(
        $number.text().trim().replaceAll(',', '').slice(1)
      );
      if ($index != $list.length - 1) {
        let $number2 = parseFloat(
          $list[$index + 1].innerText.trim().replaceAll(',', '').slice(1)
        );
        expect($number1).be.gte($number2);
      }
    });
  });

  it('3. Que el cambio de precio durante las 24 últimas horas aparezca verde si es positivo o rojo si es negativo', () => {
    cy.get('.item .price_change_percentage_24h span p').each(($color) => {
      if (parseFloat($color.text().trim().replace('%', '')) >= 0) {
        expect($color.parent()).to.have.class('text-success');
      } else {
        expect($color.parent()).to.have.class('text-danger');
      }
    });
  });

  it('4. Comprobar que junto al precio de cada criptomoneda salga el símbolo del dólar', () => {
    cy.get('.item .price').each(($price) => {
      expect($price.text().trim()).to.match(/^\$/);
    });
  });
});
