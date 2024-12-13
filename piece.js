export class Piece {
      constructor(ctx, board) {
        this.ctx = ctx;
        this.board = board;
        this.blockSize = 32;
        this.shapes = [
          [[1, 1, 1, 1]],
          [[1, 1, 1], [0, 1, 0]],
          [[1, 1, 0], [0, 1, 1]],
          [[0, 1, 1], [1, 1, 0]],
          [[1, 1], [1, 1]],
          [[0, 0, 1], [1, 1, 1]],
          [[1, 0, 0], [1, 1, 1]]
        ];
        this.colors = [
          'cyan', 'purple', 'orange', 'blue', 'yellow', 'green', 'red'
        ];
        this.randomShape();
        this.x = Math.floor(this.board.cols / 2) - Math.floor(this.shape[0].length / 2);
        this.y = 0;
      }

      randomShape() {
        const index = Math.floor(Math.random() * this.shapes.length);
        this.shape = this.shapes[index];
        this.color = this.colors[index];
      }

      draw() {
        for (let row = 0; row < this.shape.length; row++) {
          for (let col = 0; col < this.shape[row].length; col++) {
            if (this.shape[row][col]) {
              this.ctx.fillStyle = this.color;
              this.ctx.fillRect((this.x + col) * this.blockSize, (this.y + row) * this.blockSize, this.blockSize, this.blockSize);
              this.ctx.strokeStyle = '#000';
              this.ctx.strokeRect((this.x + col) * this.blockSize, (this.y + row) * this.blockSize, this.blockSize, this.blockSize);
            }
          }
        }
      }

      moveLeft() {
        this.x--;
        if (!this.isValidPosition()) {
          this.x++;
        }
      }

      moveRight() {
        this.x++;
        if (!this.isValidPosition()) {
          this.x--;
        }
      }

      moveDown() {
        this.y++;
        if (!this.isValidPosition()) {
          this.y--;
          return false;
        }
        return true;
      }

      rotate() {
        const originalShape = this.shape;
        this.shape = this.rotateShape(this.shape);
        if (!this.isValidPosition()) {
          this.shape = originalShape;
        }
      }

      rotateShape(shape) {
        const rows = shape.length;
        const cols = shape[0].length;
        const rotatedShape = Array.from({ length: cols }, () => Array(rows).fill(0));

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            rotatedShape[col][rows - 1 - row] = shape[row][col];
          }
        }
        return rotatedShape;
      }

      isValidPosition() {
        return this.board.isValidPosition(this);
      }
    }
