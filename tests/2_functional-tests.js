
/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chai = require("chai");
const assert = chai.assert;

// Mock the DOM for testing
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(
  `<div class="container"><div class="form-container"><textarea rows="10" cols="85" id="text-input" oninput="setGrid(this.value);"></textarea><br><input type="button" value="Solve" onclick="showSolution(solve());"> <input type="button" value="Clear" onclick="clearInput();"> <div id="error-msg"></div> </div> <div id="sudoku-grid"> <table class="grid"> <tbody> <tr> <td class="A1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A1" class="sudoku-input"> </td> <td class="A2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A2" class="sudoku-input"> </td> <td class="A3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A3" class="sudoku-input"> </td> <td class="A4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A4" class="sudoku-input"> </td> <td class="A5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A5" class="sudoku-input"> </td> <td class="A6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A6" class="sudoku-input"> </td> <td class="A7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A7" class="sudoku-input"> </td> <td class="A8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A8" class="sudoku-input"> </td> <td class="A9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A9" class="sudoku-input"> </td> </tr> <tr> <td class="B1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B1" class="sudoku-input"> </td> <td class="B2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B2" class="sudoku-input"> </td> <td class="B3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B3" class="sudoku-input"> </td> <td class="B4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B4" class="sudoku-input"> </td> <td class="B5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B5" class="sudoku-input"> </td> <td class="B6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B6" class="sudoku-input"> </td> <td class="B7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B7" class="sudoku-input"> </td> <td class="B8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B8" class="sudoku-input"> </td> <td class="B9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B9" class="sudoku-input"> </td> </tr> <tr> <td class="C1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C1" class="sudoku-input"> </td> <td class="C2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C2" class="sudoku-input"> </td> <td class="C3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C3" class="sudoku-input"> </td> <td class="C4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C4" class="sudoku-input"> </td> <td class="C5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C5" class="sudoku-input"> </td> <td class="C6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C6" class="sudoku-input"> </td> <td class="C7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C7" class="sudoku-input"> </td> <td class="C8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C8" class="sudoku-input"> </td> <td class="C9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C9" class="sudoku-input"> </td> </tr> <tr> <td class="D1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D1" class="sudoku-input"> </td> <td class="D2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D2" class="sudoku-input"> </td> <td class="D3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D3" class="sudoku-input"> </td> <td class="D4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D4" class="sudoku-input"> </td> <td class="D5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D5" class="sudoku-input"> </td> <td class="D6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D6" class="sudoku-input"> </td> <td class="D7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D7" class="sudoku-input"> </td> <td class="D8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D8" class="sudoku-input"> </td> <td class="D9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D9" class="sudoku-input"> </td> </tr> <tr> <td class="E1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E1" class="sudoku-input"> </td> <td class="E2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E2" class="sudoku-input"> </td> <td class="E3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E3" class="sudoku-input"> </td> <td class="E4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E4" class="sudoku-input"> </td> <td class="E5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E5" class="sudoku-input"> </td> <td class="E6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E6" class="sudoku-input"> </td> <td class="E7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E7" class="sudoku-input"> </td> <td class="E8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E8" class="sudoku-input"> </td> <td class="E9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E9" class="sudoku-input"> </td> </tr> <tr> <td class="F1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F1" class="sudoku-input"> </td> <td class="F2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F2" class="sudoku-input"> </td> <td class="F3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F3" class="sudoku-input"> </td> <td class="F4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F4" class="sudoku-input"> </td> <td class="F5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F5" class="sudoku-input"> </td> <td class="F6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F6" class="sudoku-input"> </td> <td class="F7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F7" class="sudoku-input"> </td> <td class="F8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F8" class="sudoku-input"> </td> <td class="F9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F9" class="sudoku-input"> </td> </tr> <tr> <td class="G1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G1" class="sudoku-input"> </td> <td class="G2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G2" class="sudoku-input"> </td> <td class="G3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G3" class="sudoku-input"> </td> <td class="G4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G4" class="sudoku-input"> </td> <td class="G5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G5" class="sudoku-input"> </td> <td class="G6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G6" class="sudoku-input"> </td> <td class="G7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G7" class="sudoku-input"> </td> <td class="G8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G8" class="sudoku-input"> </td> <td class="G9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G9" class="sudoku-input"> </td> </tr> <tr> <td class="H1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H1" class="sudoku-input"> </td> <td class="H2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H2" class="sudoku-input"> </td> <td class="H3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H3" class="sudoku-input"> </td> <td class="H4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H4" class="sudoku-input"> </td> <td class="H5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H5" class="sudoku-input"> </td> <td class="H6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H6" class="sudoku-input"> </td> <td class="H7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H7" class="sudoku-input"> </td> <td class="H8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H8" class="sudoku-input"> </td> <td class="H9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H9" class="sudoku-input"> </td> </tr> <tr> <td class="I1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I1" class="sudoku-input"> </td> <td class="I2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I2" class="sudoku-input"> </td> <td class="I3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I3" class="sudoku-input"> </td> <td class="I4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I4" class="sudoku-input"> </td> <td class="I5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I5" class="sudoku-input"> </td> <td class="I6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I6" class="sudoku-input"> </td> <td class="I7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I7" class="sudoku-input"> </td> <td class="I8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I8" class="sudoku-input"> </td> <td class="I9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I9" class="sudoku-input"> </td> </tr> </tbody> </table> </div> </div>`
);

global.window = dom.window;
global.document = dom.window.document;

const Solver = require('../public/sudoku-solver.js');

suite('Functional Tests', () => {
  suite('Text area and sudoku grid update automatically', () => {
    // Entering a valid number in the text area populates 
    // the correct cell in the sudoku grid with that number
    test('Valid number in text area populates correct cell in grid', done => {
      const textArea = document.getElementById('text-input');
      textArea.value = '123';
      Solver.setGrid(textArea.value);
      const testArr = Array.from(document.querySelectorAll('.sudoku-input')).map(cell => cell.value).filter(str => str);
      const expected = ['1', '2', '3'];

      assert.deepStrictEqual(testArr, expected);
      done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', done => {
      const textArea = document.getElementById('text-input');
      const gridCells = Array.from(document.querySelectorAll('.sudoku-input')).map(cell => cell);
      // gridCells.forEach((cell, i) => i < 3 ? cell.value = (i += 1) : null);
      gridCells[0].value = '5';
      gridCells[1].value = '4';
      gridCells[2].value = '3';

      const expected = '543..............................................................................';

      assert.strictEqual(Solver.setTextArea(), expected);
      done();
    });
  });
  
  suite('Clear and solve buttons', () => {
    // Pressing the "Clear" button clears the sudoku 
    // grid and the text area
    test('Function clearInput()', done => {
      // Populate text area and sudoku grid
      const puzzleStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const textArea = document.getElementById('text-input');
      textArea.value = puzzleStr;
      Solver.setGrid(puzzleStr);
      
      // Invoke function and grab array of grid values to test
      Solver.clearInput();
      const gridValues = Array.from(document.querySelectorAll('.sudoku-input')).map(cell => cell).filter(cell => cell.value);
      
      assert.strictEqual(textArea.value, '');
      assert.deepStrictEqual(gridValues, []);
      done();
    });
    
    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test('Function showSolution(solve(input))', done => {
      const puzzleStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

      Solver.showSolution(Solver.solve(puzzleStr));

      const rowA = Array.from(document.querySelectorAll('.sudoku-input')).filter((cell, i) => i < 9).map(cell => cell.value);
      const rowAExpected = ["7", "6", "9", "2", "3", "5", "4", "1", "8"];

      assert.deepStrictEqual(rowA, rowAExpected);
      done();
    });
  });
});
