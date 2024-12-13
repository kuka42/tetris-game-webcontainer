export class Board {
      constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.createGrid();
        this.rows = 20;
        this.cols = 10;
        this.blockSize = 32;
      }

      createGrid() {
        return Array.from({ length: 20 }, () => Array(10).fill(0));
      }

      clear() {
        this.grid = this.createGrid();
      }

      draw() {
        for (let row = 0; row < this.rows; row++) {
          for (let col = 0; col < this.cols; col++) {
            if (this.grid[row][col]) {
              this.ctx.fillStyle = this.grid[row][col];
              this.ctx.fillRect(col * this.blockSize, row * this.blockSize, this.blockSize, this.blockSize);
              this.ctx.strokeStyle = '#000';
              this.ctx.strokeRect(col * this.blockSize, row * this.blockSize, this.blockSize, this.blockSize);
            }
          }
        }
      }

      isValidPosition(piece) {
        for (let row = 0; row < piece.shape.length; row++) {
          for (let col = 0; col < piece.shape[row].length; col++) {
            if (piece.shape[row][col]) {
              const x = piece.x + col;
              const y = piece.y + row;

              if (x < 0 || x >= this.cols || y >= this.rows || (y >= 0 && this.grid[y][x])) {
                return false;
              }
            }
          }
        }
        return true;
      }

      merge(piece) {
        for (let row = 0; row < piece.shape.length; row++) {
          for (let col = 0; col < piece.shape[row].length; col++) {
            if (piece.shape[row][col]) {
              this.grid[piece.y + row][piece.x + col] = piece.color;
            }
          }
        }
      }

      clearLines() {
        let linesCleared = 0;
        for (let row = this.rows - 1; row >= 0;) {
          if (this.isLineFull(row)) {
            this.grid.splice(row, 1);
            this.grid.unshift(Array(this.cols).fill(0));
            linesCleared++;
          } else {
            row--;
          }
        }
        return linesCleared;
      }

      isLineFull(row) {
        return this.grid[row].every(cell => cell);
      }
    }
