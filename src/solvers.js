/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n: n}),
       rows = board.rows(),
       solution;

  for(var i = 0; i < n; i++) {
    for(var j = 0; j < n; j++) {
      board.togglePiece(i, j);
      if(board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
      }
    }
  }
  solution = board;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0,
              board = new Board({n: n});

  var recurse = function(row) {
    if (row === n) return solutionCount++
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyRooksConflicts()) {
        recurse(row+1);
      }
      board.togglePiece(row, i);
    }
  }

  recurse(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n}),
      rows = board.rows(),
      solution;

  var recurse = function(row) {
    for (var j = 0; j < n; j++) {
      board.togglePiece(row, j);
      if(board.hasAnyQueensConflicts()) {
        board.togglePiece(row, j);
      } else {
        if (row === n - 1) {
          return board;
        }
        var temp = recurse(row+1);
        if (temp === undefined) {
          board.togglePiece(row, j);
        } else {
          return temp;
        }
      }
    }
  }

  if (n === 0 || n === 2 || n === 3) {
    solution = board;
  } else {
    solution = recurse(0);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0,
              board = new Board({n: n});

  var recurse = function(row) {
    if (row === n) return solutionCount++
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyQueenConflictsOn(row, i)) {
        recurse(row+1);
      }

      board.togglePiece(row, i);
    }
  }

  recurse(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
