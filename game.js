import { Board } from './board.js';
    import { Piece } from './piece.js';

    export class Game {
      constructor(canvas, scoreElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.scoreElement = scoreElement;
        this.board = new Board(this.ctx);
        this.piece = null;
        this.score = 0;
        this.isRunning = false;
        this.dropInterval = 1000;
        this.lastDropTime = 0;
        this.gameOver = false;
      }

      start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.gameOver = false;
        this.score = 0;
        this.scoreElement.textContent = this.score;
        this.board.clear();
        this.piece = new Piece(this.ctx, this.board);
        this.gameLoop();
      }

      gameLoop(time = 0) {
        if (!this.isRunning) return;
        if (this.gameOver) return;

        const deltaTime = time - this.lastDropTime;

        if (deltaTime > this.dropInterval) {
          this.lastDropTime = time;
          this.drop();
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.board.draw();
        if (this.piece) {
          this.piece.draw();
        }

        requestAnimationFrame(this.gameLoop.bind(this));
      }

      drop() {
        if (!this.piece) return;
        if (!this.piece.moveDown()) {
          this.board.merge(this.piece);
          this.piece = new Piece(this.ctx, this.board);
          if (!this.piece.isValidPosition()) {
            this.gameOver = true;
            this.isRunning = false;
            alert('game over kuka kuka');
          }
          this.clearLines();
        }
      }

      moveLeft() {
        if (this.piece) {
          this.piece.moveLeft();
        }
      }

      moveRight() {
        if (this.piece) {
          this.piece.moveRight();
        }
      }

      moveDown() {
        if (this.piece) {
          this.drop();
        }
      }

      rotate() {
        if (this.piece) {
          this.piece.rotate();
        }
      }

      clearLines() {
        const linesCleared = this.board.clearLines();
        this.score += linesCleared * 100;
        this.scoreElement.textContent = this.score;
      }
    }
