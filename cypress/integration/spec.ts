import { EASY_SETTINGS } from '../../src/app/consts/predifined-settings.const';
import { SELECTORS } from '../support/selectors';
import { AppPages } from '../../src/app/enums/app-pages.enum';

it('Happy flow test', () => {
  cy.visit(`/${AppPages.HOME}`);
  cy.get(SELECTORS.HOME.title).contains('Minesweeper'); // Could make variables for these titles
  cy.get(SELECTORS.HOME.gameLink).click();
  cy.get(SELECTORS.GAME.header).contains('Minesweeper');
  cy.get(SELECTORS.GAME.minesCounter).contains(EASY_SETTINGS.minesQuantity);
  cy.get(SELECTORS.GAME.firstRowCells).its('length').should('eq', EASY_SETTINGS.boardWidth);
  cy.get(SELECTORS.GAME.allCells).its('length').should('eq', EASY_SETTINGS.boardWidth * EASY_SETTINGS.boardHeight);
});
