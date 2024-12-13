import { Game } from './game.js';

    const canvas = document.getElementById('tetris');
    const scoreElement = document.getElementById('score');
    const startButton = document.getElementById('startButton');

    const game = new Game(canvas, scoreElement);

    startButton.addEventListener('click', () => {
      game.start();
    });

    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          game.moveLeft();
          break;
        case 'ArrowRight':
          game.moveRight();
          break;
        case 'ArrowDown':
          game.moveDown();
          break;
        case 'ArrowUp':
          game.rotate();
          break;
      }
    });
