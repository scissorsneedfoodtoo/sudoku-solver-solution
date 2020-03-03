const setGrid = str => {
  const cells = document.querySelectorAll('.sudoku-input');
  const numbers = str.split('');
  
  return cells.forEach((cell, i) => {
    const currNum = numbers[i];

    validSudokuInput(currNum) && currNum !== '.' ? cell.value = currNum : cell.value = '';
  });
}

const setTextArea = () => {
  const textArea = document.getElementById('text-input');
  const cells = Array.from(document.querySelectorAll('.sudoku-input'));
  let str = '';
  cells.forEach(cell => cell.value !== '' && validSudokuInput(cell.value) ? str += cell.value : str += '.');
  
  return textArea.value = str;
}

const validSudokuInput = str => {
  const possibleNum = parseInt(str);
  if (possibleNum >= 1 && possibleNum <= 9) {
    return str;
  } else {
    return false;
  }
}

const reference = () => {
  const combine = (a, b) => {
    const combos = [];
    for (let i in a) {
      for (let j in b) {
        combos.push(a[i] + b[j]);
      }
    }
    
    return combos;
  };

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  const cols = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const rowSquare = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']];
  const colSquare = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
  
  const coords = combine(rows, cols);
  const rowUnits = rows.map(row => combine(row, cols));
  const colUnits = cols.map(col => combine(rows, col));
  const boxUnits = rowSquare.reduce((acc, curr, i, arr) => {
    colSquare.forEach((col, j) => {
      acc.push(combine(arr[i], colSquare[j]))
    });
    
    return acc;
  }, []);
  
  const allUnits = rowUnits.concat(colUnits, boxUnits);
  let groups = {};
  
  /* 
    Generate an array of three units (row, col, and box) for each 
    cell/coordinate. Each unit has a length of 9.
  */
  groups.units = coords.reduce((acc, currCell) => {
    acc[currCell] = allUnits.reduce((acc, currArr) => {
      if (currArr.includes(currCell)) {
        acc.push(currArr);
      }
      
      return acc;
    }, []);
    
    return acc;
  }, {});
  
  /* 
    Generate a list of peers for each cell/coordinate, which
    is a list of all cells in the three units *except* the cell
    itself. For ex., the peers of C2 are all the cells in its 
    three units except for C2. Each peer list has a length of 20.
  */
  groups.peers = coords.reduce((acc, currCell) => {
    const flattenedArr = groups.units[currCell].reduce((acc, currArr) => {
      currArr.forEach(el => acc.push(el));
      return acc;
    }, []);
    
    acc[currCell] = Array.from(new Set(flattenedArr)).filter(el => el !== currCell);
    
    return acc;
  }, {});
  
  return {
    coords,
    groups,
    allUnits
  }
}

// Make these available globally
const { coords, groups, allUnits } = reference();

const parsePuzzle = str => {
  /* 
    Create a map of the incomplete sudoku puzzle at
    the beginning of the game with each cell and 
    either the current value or '.'
  */
  const valueMap = coords.reduce((acc, coord, i) => {
    acc[coord] = str[i];

    return acc;
  }, {});
  
  const errorDiv = document.getElementById('error-msg');
  
  if (str.length === 81) {
    errorDiv.innerText = '';
    return valueMap;
  } else {
    errorDiv.innerText = "Error: Expected puzzle to be 81 numbers long.";
  }
}

const solve = (puzzle = document.getElementById('text-input').value) => {
  /*
    User clicks solve button
  */
  const digits = '123456789';
  let inputGrid = parsePuzzle(puzzle);
  
  // Filter out cells with no value
  inputGrid = Object.keys(inputGrid).reduce((acc, key) => {
    const currVal = inputGrid[key];
    if (currVal !== '.') {
      acc[key] = currVal;
    }

    return acc;
  }, {});
  // 1-9 for each coordinate
  let outputGrid = coords.reduce((acc, coord) => {
    acc[coord] = digits;

    return acc;
  }, {});
  
  const confirmValue = (grid, pos, val) => {

    const remainingValues = grid[pos].replace(val, '');
    
    remainingValues.split('').forEach(val => {
      grid = eliminate(grid, pos, val);
    });

    return grid;
  }

  const eliminate = (grid, pos, val) => {
    if (!grid) return false;

    if (!grid[pos].includes(val)) return grid; // Exit if we've already eliminated the value from the grid/cell

    grid[pos] = grid[pos].replace(val, ''); // Set cell value if known, otherwise remove possibility

    if (grid[pos].length === 0) { // If there are no possibilities we made a wrong guess somewhere
      return false; 
    } else if (grid[pos].length === 1) { // Remove known cell values from all peers recursively
      groups.peers[pos].forEach(peer => {
        grid = eliminate(grid, peer, grid[pos]);

        if (!grid) return false;
      });
    }

    const possibilities = groups.units[pos].reduce((acc, unit) => {
      return unit.map(coord => {
        if (grid[coord] && grid[coord].indexOf(val) > -1) return coord;
      }).filter(Boolean);
    }, []);

    if (possibilities.length === 0) { // We made a mistake somewhere if there are no possible values for a coordinate
      return false;
    } else if (possibilities.length === 1 && grid[possibilities[0]].length > 1) { // There is only one possible position, but the grid still lists multiple possibilities, confirm the value before removing it
      if (!confirmValue(grid, possibilities[0], val)) {
        return false;
      } 
    }
    
    return grid;
  }

  /* 
    Loop through the known positions on the input grid 
    and begin eliminating other possibilities for cells 
    without a value -- first pass of constraint propagation
  */
  Object.keys(inputGrid).forEach(position => {
    const value = inputGrid[position];

    outputGrid = confirmValue(outputGrid, position, value);
  });

  // If puzzle is complete after first pass, return it
  if (validatePuzzle(outputGrid)) {
    // console.log(outputGrid);
    return outputGrid;
  }

  const guessDigit = grid => {
    /* 
      Guess a digit with the fewest number 
      of possibilities
    */
    if (!grid) return false;
  
    // End if there's a possible valid solution
    if (validatePuzzle(grid)) return grid;
  
    // Sort by cells with the least number of possibilities
    const possibilities = Object.keys(grid).reduce((acc, curr) => {
      const output = {};
      output[curr] = grid[curr];
      if (grid[curr].length > 1) acc.push(output);
  
      return acc;
    }, []).sort((a, b) => {
      return a[Object.keys(a)[0]].length - b[Object.keys(b)[0]].length;
    });
  
    const pos = Object.keys(possibilities[0])[0];
  
    for (let i in grid[pos]) {
      const val = grid[pos][i];
      const possibleSolution = guessDigit(confirmValue(Object.assign({}, grid), pos, val));
  
      if (possibleSolution) return possibleSolution;
    }
  }

  // Guess digits for incomplete puzzle
  outputGrid = guessDigit(outputGrid);
  // console.log(outputGrid);
  return outputGrid;
}

const validatePuzzle = puzzle => {
  if (!puzzle) return false;

  const validUnit = '123456789'.split('');
  /* 
    Create a 2D array of puzzle units with 
    sorted values for each cell 
  */
  const puzzleUnits = allUnits.map(unit => {
    return unit.map(cell => {
      return puzzle[cell];
    }).sort();
  });

  /* 
    Check that every puzzle unit matches a
    valid unit of the digits 1-9 
  */

  return puzzleUnits.every(arr => {
    return validUnit.every(e => arr.includes(e));
  });
}

const showSolution = obj => {
  const solutionStr = Object.values(obj).join().replace(/\,/g, '');
  
  return setGrid(solutionStr), setTextArea();
}

const clearInput = () => {
  /*
    User clicks clear button
  */
  // Move this reference down into exported function for testing
  const textArea = document.getElementById('text-input');
  
  return textArea.value = '', setGrid('');
}

// LEAVE THIS IN BOILERPLATE! (Except for setGrid line)
document.addEventListener('DOMContentLoaded', () => {
  // Set text area with a simple puzzle
  const textArea = document.getElementById('text-input');
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
  
  setGrid(textArea.value);
});

// Export your functions for testing
module.exports = {
  validSudokuInput,
  validatePuzzle,
  parsePuzzle,
  solve,
  setTextArea,
  setGrid,
  clearInput,
  showSolution
}
