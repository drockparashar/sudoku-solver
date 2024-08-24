"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill("")))
  const [solved, setSolved] = useState(false)

  const handleInputChange = (row: number, col: number, value: string) => {
    if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 9)) {
      const newGrid = grid.map(r => [...r])
      newGrid[row][col] = value
      setGrid(newGrid)
      setSolved(false)
    }
  }

  const solveSudoku = () => {
    const numericGrid = grid.map(row => row.map(cell => cell === "" ? 0 : parseInt(cell)))
    if (solve(numericGrid)) {
      setGrid(numericGrid.map(row => row.map(String)))
      setSolved(true)
    } else {
      alert("No solution exists for this Sudoku puzzle!")
    }
  }

  const solve = (board: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num
              if (solve(board)) {
                return true
              } else {
                board[row][col] = 0
              }
            }
          }
          return false
        }
      }
    }
    return true
  }

  const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false
      if (board[x][col] === num) return false
      if (board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) return false
    }
    return true
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-4xl font-bold mb-6 text-black">Sudoku Solver</h1>
      <div className="bg-white border-2 border-black p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-9 gap-0 mb-4">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                inputMode="numeric"
                pattern="[1-9]"
                maxLength={1}
                value={cell}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                className={`w-8 h-8 sm:w-10 sm:h-10 text-center ${
                  solved ? "bg-gray-100" : "bg-white"
                } border border-gray-300 focus:outline-none focus:border-black ${
                  colIndex % 3 === 2 && colIndex !== 8 ? "border-r-2 border-r-black" : ""
                } ${
                  rowIndex % 3 === 2 && rowIndex !== 8 ? "border-b-2 border-b-black" : ""
                }`}
                disabled={solved}
              />
            ))
          )}
        </div>
        <Button 
          onClick={solveSudoku}
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Solve Sudoku
        </Button>
      </div>
      <footer className="mt-8 text-center text-gray-500">
        <p>Created by Pranshu Parashar</p>
        <Link href="https://github.com/drockparashar/sudoku-solver">
        View on GitHub
      </Link>
      </footer>
    </div>
  )
}