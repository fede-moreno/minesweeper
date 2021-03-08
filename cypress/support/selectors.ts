export const SELECTORS = {
  HOME: {
    title: '.Home-container h1',
    gameLink: '.Home-container a[data-cy="gameLink"]',
  },
  GAME: {
    header: '.Game-header',
    minesCounter: '.Game .counter.minesToFlag label',
    firstRowCells: '.Game tbody tr:first-child td',
    allCells: '.Game tbody tr td'
  }
}
