# Sudoku Solver

A minimalistic, web-based Sudoku Solver application built with React and TypeScript, featuring an efficient backtracking algorithm.

## Table of Contents

- [Features](#features)
- [Algorithm](#algorithm)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features

- Clean, minimalistic black and white user interface
- Interactive 9x9 Sudoku grid for input
- Efficient backtracking algorithm for solving Sudoku puzzles
- Responsive design that works on desktop and mobile devices
- Accessibility features for better screen reader support

## Algorithm

The Sudoku Solver uses a backtracking algorithm to solve puzzles. Here's how it works:

1. **Find an empty cell**: The algorithm starts by finding an empty cell in the Sudoku grid.

2. **Try a number**: It then tries to place a number (1-9) in that empty cell.

3. **Check if the number is valid**: The algorithm checks if the placed number is valid according to Sudoku rules (no repetition in row, column, or 3x3 sub-grid).

4. **Recursion**: If the number is valid, the algorithm moves to the next empty cell and repeats steps 2-4.

5. **Backtracking**: If the number is not valid or if the algorithm can't find a valid number for a cell, it backtracks to the previous cell and tries the next number.

6. **Solution found**: The process continues until all cells are filled (solution found) or all possibilities are exhausted (no solution).

Here's the core of the algorithm in TypeScript:

```typescript
const solve = (board: number[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) {
              return true;
            } else {
              board[row][col] = 0;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
};

const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
    if (board[x][col] === num) return false;
    if (board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) return false;
  }
  return true;
};
```

This algorithm is efficient for most Sudoku puzzles, solving them in milliseconds. However, for extremely difficult puzzles or puzzles with multiple solutions, the solving time may increase.

## Installation

To run this project locally, follow these steps:

1. Ensure you have [Node.js](https://nodejs.org/) installed (version 14 or higher recommended).

2. Clone this repository:
   ```
   git clone https://github.com/yourusername/sudoku-solver.git
   ```

3. Navigate to the project directory:
   ```
   cd sudoku-solver
   ```

4. Install the dependencies:
   ```
   npm install
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your browser and visit `http://localhost:3000` to see the application running.

## Usage

1. When you open the application, you'll see an empty 9x9 Sudoku grid.
2. Click on any cell to input a number from 1 to 9. Leave cells blank for unknown values.
3. Once you've entered the known values, click the "Solve Sudoku" button.
4. The algorithm will attempt to solve the puzzle:
   - If a solution exists, the grid will be filled with the solved puzzle, and the cells will turn light gray.
   - If no solution exists, you'll see an alert informing you that the puzzle can't be solved.
5. To start over, simply refresh the page or clear the inputs manually.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Next.js

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

Please ensure your code adheres to the existing style and that you've tested your changes thoroughly.

