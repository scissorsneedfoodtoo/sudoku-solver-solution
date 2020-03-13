**freeCodeCamp** - Quality Assurance Sudoku Solver
------

### User stories:

1. I can enter a sudoku puzzle by filling in the text area with either a number or period (".") to represent an empty cell. When a valid number is entered in the text area, the same number is applied to the correct cell of the sudoku grid.
2. I can enter a sudoku puzzle by adding numbers directly to the sudoku grid. When a valid number is entered in the sudoku grid, the same number appears in the correct position in the text area.
3. I can solve an incomplete puzzle by clicking the "Solve" button. When a solution is found, the sudoku grid is automatically populated with the correct numbers for each cell.
4. I can clear the text area and sudoku grid by clicking the "Clear" button.
5. All 6 unit tests are complete and passing.
6. All 4 functional tests are complete and passing.

### Testing and additional notes

* To run the tests on Glitch, set NODE_ENV to `test` without quotes.
* To run the tests in the console, use the command `npm run test`. To open the Glitch console, first click "Tools" in the bottom left corner and then click "Full Page Console".
* All logic can go into `public/sudoku-solver.js`.
* Create all of the unit/functional tests in `tests/1_unit-tests.js` and `tests/2_functional-tests.js`.