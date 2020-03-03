/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

// Mock the DOM for testing
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM(
  `<div class="container"><div class="form-container"><textarea rows="10" cols="85" id="text-input" oninput="setGrid(this.value);"></textarea><br><input type="button" value="Solve" onclick="showSolution(solve());"> <input type="button" value="Clear" onclick="clearInput();"> <div id="error-msg"></div> </div> <div id="sudoku-grid"> <table class="grid"> <tbody> <tr> <td class="A1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A1" class="sudoku-input"> </td> <td class="A2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A2" class="sudoku-input"> </td> <td class="A3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A3" class="sudoku-input"> </td> <td class="A4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A4" class="sudoku-input"> </td> <td class="A5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A5" class="sudoku-input"> </td> <td class="A6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A6" class="sudoku-input"> </td> <td class="A7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A7" class="sudoku-input"> </td> <td class="A8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A8" class="sudoku-input"> </td> <td class="A9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="A9" class="sudoku-input"> </td> </tr> <tr> <td class="B1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B1" class="sudoku-input"> </td> <td class="B2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B2" class="sudoku-input"> </td> <td class="B3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B3" class="sudoku-input"> </td> <td class="B4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B4" class="sudoku-input"> </td> <td class="B5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B5" class="sudoku-input"> </td> <td class="B6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B6" class="sudoku-input"> </td> <td class="B7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B7" class="sudoku-input"> </td> <td class="B8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B8" class="sudoku-input"> </td> <td class="B9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="B9" class="sudoku-input"> </td> </tr> <tr> <td class="C1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C1" class="sudoku-input"> </td> <td class="C2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C2" class="sudoku-input"> </td> <td class="C3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C3" class="sudoku-input"> </td> <td class="C4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C4" class="sudoku-input"> </td> <td class="C5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C5" class="sudoku-input"> </td> <td class="C6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C6" class="sudoku-input"> </td> <td class="C7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C7" class="sudoku-input"> </td> <td class="C8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C8" class="sudoku-input"> </td> <td class="C9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="C9" class="sudoku-input"> </td> </tr> <tr> <td class="D1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D1" class="sudoku-input"> </td> <td class="D2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D2" class="sudoku-input"> </td> <td class="D3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D3" class="sudoku-input"> </td> <td class="D4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D4" class="sudoku-input"> </td> <td class="D5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D5" class="sudoku-input"> </td> <td class="D6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D6" class="sudoku-input"> </td> <td class="D7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D7" class="sudoku-input"> </td> <td class="D8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D8" class="sudoku-input"> </td> <td class="D9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="D9" class="sudoku-input"> </td> </tr> <tr> <td class="E1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E1" class="sudoku-input"> </td> <td class="E2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E2" class="sudoku-input"> </td> <td class="E3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E3" class="sudoku-input"> </td> <td class="E4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E4" class="sudoku-input"> </td> <td class="E5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E5" class="sudoku-input"> </td> <td class="E6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E6" class="sudoku-input"> </td> <td class="E7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E7" class="sudoku-input"> </td> <td class="E8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E8" class="sudoku-input"> </td> <td class="E9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="E9" class="sudoku-input"> </td> </tr> <tr> <td class="F1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F1" class="sudoku-input"> </td> <td class="F2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F2" class="sudoku-input"> </td> <td class="F3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F3" class="sudoku-input"> </td> <td class="F4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F4" class="sudoku-input"> </td> <td class="F5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F5" class="sudoku-input"> </td> <td class="F6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F6" class="sudoku-input"> </td> <td class="F7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F7" class="sudoku-input"> </td> <td class="F8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F8" class="sudoku-input"> </td> <td class="F9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="F9" class="sudoku-input"> </td> </tr> <tr> <td class="G1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G1" class="sudoku-input"> </td> <td class="G2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G2" class="sudoku-input"> </td> <td class="G3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G3" class="sudoku-input"> </td> <td class="G4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G4" class="sudoku-input"> </td> <td class="G5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G5" class="sudoku-input"> </td> <td class="G6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G6" class="sudoku-input"> </td> <td class="G7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G7" class="sudoku-input"> </td> <td class="G8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G8" class="sudoku-input"> </td> <td class="G9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="G9" class="sudoku-input"> </td> </tr> <tr> <td class="H1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H1" class="sudoku-input"> </td> <td class="H2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H2" class="sudoku-input"> </td> <td class="H3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H3" class="sudoku-input"> </td> <td class="H4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H4" class="sudoku-input"> </td> <td class="H5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H5" class="sudoku-input"> </td> <td class="H6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H6" class="sudoku-input"> </td> <td class="H7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H7" class="sudoku-input"> </td> <td class="H8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H8" class="sudoku-input"> </td> <td class="H9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="H9" class="sudoku-input"> </td> </tr> <tr> <td class="I1"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I1" class="sudoku-input"> </td> <td class="I2"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I2" class="sudoku-input"> </td> <td class="I3"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I3" class="sudoku-input"> </td> <td class="I4"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I4" class="sudoku-input"> </td> <td class="I5"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I5" class="sudoku-input"> </td> <td class="I6"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I6" class="sudoku-input"> </td> <td class="I7"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I7" class="sudoku-input"> </td> <td class="I8"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I8" class="sudoku-input"> </td> <td class="I9"> <input oninput="setTextArea()" autocomplete="disabled" type="text" size="1" maxlength="1" id="I9" class="sudoku-input"> </td> </tr> </tbody> </table> </div> </div>`
);

global.window = dom.window;
global.document = dom.window.document;

const Solver = require('../public/sudoku-solver.js');

suite('UnitTests', () => {
  // Only the digits 1-9 are accepted
  // as valid input for the puzzle grid
  suite('Function validSudokuInput(input) are accepted', () => {
    test('Valid "1-9" characters', (done) => {
      const input = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      input.forEach((el, i) => {
        assert.strictEqual(Solver.validSudokuInput(el), input[i]);
      });
      done();
    });

    // Invalid characters or numbers are not accepted 
    // as valid input for the puzzle grid
    test('Invalid characters (anything other than "1-9") are not accepted', (done) => {
      const input = ['!', 'a', '/', '+', '-', '0', '10', 0, '.'];
      input.forEach((el, i) => {
        assert.strictEqual(Solver.validSudokuInput(el), false);
      });
      done();
    });
  });
  
  suite('Function parsePuzzle(input)', () => {
    test('Parses a valid puzzle string into an object', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const output = {
        A1: ".",A2: ".",A3: "9",A4: ".",A5: ".",A6: "5",A7: ".",A8: "1",A9: ".",
        B1: "8",B2: "5",B3: ".",B4: "4",B5: ".",B6: ".",B7: ".",B8: ".",B9: "2",
        C1: "4",C2: "3",C3: "2",C4: ".",C5: ".",C6: ".",C7: ".",C8: ".",C9: ".",
        D1: "1",D2: ".",D3: ".",D4: ".",D5: "6",D6: "9",D7: ".",D8: "8",D9: "3",
        E1: ".",E2: "9",E3: ".",E4: ".",E5: ".",E6: ".",E7: ".",E8: "6",E9: ".",
        F1: "6",F2: "2",F3: ".",F4: "7",F5: "1",F6: ".",F7: ".",F8: ".",F9: "9",
        G1: ".",G2: ".",G3: ".",G4: ".",G5: ".",G6: ".",G7: "1",G8: "9",G9: "4",
        H1: "5",H2: ".",H3: ".",H4: ".",H5: ".",H6: "4",H7: ".",H8: "3",H9: "7",
        I1: ".",I2: "4",I3: ".",I4: "3",I5: ".",I6: ".",I7: "6",I8: ".",I9: "."
      };
      
      assert.deepStrictEqual(Solver.parsePuzzle(input), output);
      done();
    });
    
    // Puzzles that are not 81 numbers long show the message 
    // "Error: Expected puzzle to be 81 numbers long." in the
    // `div` with the id "error-msg"
    test('Shows an error for puzzles that are not 81 numbers long', done => {
      const shortStr = '83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const longStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
      const errorMsg = 'Error: Expected puzzle to be 81 numbers long.';
      const errorDiv = document.getElementById('error-msg');
      
      Solver.parsePuzzle(shortStr);
      
      assert.strictEqual(errorDiv.innerText, errorMsg);
      done();
    });
  });

  suite('Function validatePuzzle(input)', () => {
    // Valid complete puzzles pass
    test('Valid puzzles pass', done => {
      const input = Solver.parsePuzzle('769235418851496372432178956174569283395842761628713549283657194516924837947381625');

      assert.equal(Solver.validatePuzzle(input), true);
      done();
    });

    // Invalid complete puzzles fail
    test('Invalid puzzles fail', done => {
      const input = Solver.parsePuzzle('779235418851496372432178956174569283395842761628713549283657194516924837947381625');

      assert.equal(Solver.validatePuzzle(input), false);
      done();
    });
  });
  
  
  suite('Function solve(input)', () => {
    // Returns the expected solution for a valid, incomplete puzzle
    test('Returns the expected solution for an incomplete puzzle', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const solution = {
        A1: "7",A2: "6",A3: "9",A4: "2",A5: "3",A6: "5",A7: "4",A8: "1",A9: "8",
        B1: "8",B2: "5",B3: "1",B4: "4",B5: "9",B6: "6",B7: "3",B8: "7",B9: "2",
        C1: "4",C2: "3",C3: "2",C4: "1",C5: "7",C6: "8",C7: "9",C8: "5",C9: "6",
        D1: "1",D2: "7",D3: "4",D4: "5",D5: "6",D6: "9",D7: "2",D8: "8",D9: "3",
        E1: "3",E2: "9",E3: "5",E4: "8",E5: "4",E6: "2",E7: "7",E8: "6",E9: "1",
        F1: "6",F2: "2",F3: "8",F4: "7",F5: "1",F6: "3",F7: "5",F8: "4",F9: "9",
        G1: "2",G2: "8",G3: "3",G4: "6",G5: "5",G6: "7",G7: "1",G8: "9",G9: "4",
        H1: "5",H2: "1",H3: "6",H4: "9",H5: "2",H6: "4",H7: "8",H8: "3",H9: "7",
        I1: "9",I2: "4",I3: "7",I4: "3",I5: "8",I6: "1",I7: "6",I8: "2",I9: "5"
      };
      
      assert.deepStrictEqual(Solver.solve(input), solution);
      done();
    });
  });
});
