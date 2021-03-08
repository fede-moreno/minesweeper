# Minesweeper in Angular - https://minesweeper-pro.herokuapp.com/

##Description
* Create a version of the classic game of Minesweeper in your prefered stack.
* Minesweeper is a grid of tiles, each of which may or may not cover hidden mines. The goal is to click on every tile except those that have mines. When a user clicks a tile, one of two things happens: if the tile was covering a mine, the mine is revealed and the game ends in failure; if the tile was not covering a mine, it instead reveals the number of adjacent tiles (including diagonals) that are covering mines - and, if that number is 0, it behaves as if the user has clicked on every cell around it. With each turn, the game is validated:
  * If the player uncovers a bomb tile, the player loses and the game ends.
  * If the player uncovers a non-bomb tile (number) and there are remaining non-bomb tiles uncovered, the game continues. Otherwise, the player wins.
##Design constraints
1. The board should be an N x M grid and by default X hidden mines are randomly placed on the board. These parameters should be entered by the user before starting the game. The user should also be able to select between 3 pre-defined levels (easy, medium, hard).
1. The user should be able to mark a tile with a flag (right click) that points that the tile could contain a bomb. That tile should be disabled and the user shouldn't be able to click it.
1. The board header should display the remaining bombs in the game. This counter is modified when the user sets flags on the tiles.
1. The app should have routing for different pages (game setup, game board, finished games list, etc).
##Additional encouraged features
* Saving/loading (either server side or client side).
* Unit tests.
* Add a page that list all the games played by the user.
* The table must still appear if the page is refreshed.
* The columns
  * Start Time. Format: MM-DD-YYYY hh:mm (12hr format)
  * End Time: Format: MM-DD-YYYY hh:mm (12hr format)
  * Difficulty
  * Total time spent
  * Status: Won/Lost
* Order records Difficulty and Total time spent. Ascending.
* Multiplayer support.
##Technical constraints
* Language: Javascript ES6. Please use a framework/library relevant for the open position you are applying for (e.g., Angular or React).
* Use Webpack to build the app.
* If you use a starter-kit/boilerplate project, make sure you understand and are able to explain the structure and config files.
##Bonus
* Use SASS for styling
* Test your application.
* Use a linter.
* Coverage report.

# For Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
