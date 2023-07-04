import './styles/style.css';
import './styles/style.scss';
import bombMusic from './music/bomb.mp3';
import clickMusic from './music/click.mp3';
import victoryMusic from './music/victory.mp3';

const savedResults = JSON.parse(localStorage.getItem('results')) || [];

function saveResults(results) {
  localStorage.setItem('results', JSON.stringify(results));
}

function addResult(clicks, time, bombs, width, height) {
  const result = {
    clicks,
    time,
    bombs,
    width,
    height,
  };
  savedResults.unshift(result);
  if (savedResults.length > 10) {
    savedResults.pop();
  }
  saveResults(savedResults);
}

class Minesweeper {
  constructor(width, height, bombs) {
    this.width = width;
    this.height = height;
    this.bombs = bombs;
    this.bombArr = [];
    this.cells = [];
    this.closedCount = height * width;
    this.gameOver = false;
    this.flags = bombs;
    this.StopGame = this.StopGame.bind(this);
    this.keypressHandler = this.keypressHandler.bind(this);
    this.timerId = 0;
    this.timer = 0;
    this.clicks = 0;
    this.audio = new Audio();
  }

  isValid(row, column) {
    return row >= 0 && row < this.height && column >= 0 && column < this.width;
  }

  StopGame() {
    const mineSweeper = document.querySelector('div');
    const body = document.querySelector('body');
    const playAgain = window.confirm('Хотите начать заново?');
    this.gameOver = true;
    console.log(savedResults);
    clearInterval(this.timerId);
    if (playAgain) {
      body.removeChild(mineSweeper);
      body.removeEventListener('keypress', this.keypressHandler);
      const level = prompt('Ведите сложность игры "hard" , "middle", "junior","custom"');
      if (level === 'junior') {
        this.width = 10;
        this.height = 10;
        this.bombs = parseInt(prompt('Ведите количество бомб'), 10);
      } else if (level === 'middle') {
        this.width = 15;
        this.height = 15;
        this.bombs = parseInt(prompt('Ведите количество бомб'), 10);
      } else if (level === 'hard') {
        this.width = 25;
        this.height = 25;
        this.bombs = parseInt(prompt('Ведите количество бомб'), 10);
      } else if (level === 'custom') {
        this.width = parseInt(prompt('Ведите ширину'), 10);
        this.height = parseInt(prompt('Ведите высоту'), 10);
        this.bombs = parseInt(prompt('Ведите количество бомб'), 10);
      }
      const minesweeper = new Minesweeper(this.width, this.height, this.bombs);
      minesweeper.StartGame();
    } else {
      for (let i = 0; i <= this.width * this.height; i += 1) {
        const columns = i % this.width;
        const rows = Math.floor(i / this.width);
        if (!this.isBomb(rows, columns)) {
          this.open(rows, columns);
        } else {
          this.cells[i].innerHTML = 'X';
          this.cells[i].disabled = true;
        }
      }
    }
  }

  keypressHandler(e) {
    if (e.key === 'r') {
      this.StopGame();
    }
  }

  isBomb(row, column) {
    if (!this.isValid(row, column)) return false;
    const index = row * this.width + column;
    return this.bombArr.includes(index);
  }

  getCountsMines(row, columns) {
    let count = 0;
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        if (this.isBomb(row + y, columns + x)) {
          count += 1;
        }
      }
    }
    return count;
  }

  open(row, column) {
    if (!this.isValid(row, column)) return undefined;
    const index = row * this.width + column;
    const cell = this.cells[index];
    if (cell.classList.contains('&')) {
      return undefined;
    }
    if (cell.disabled === true) return undefined;
    cell.disabled = true;
    if (this.isBomb(row, column) && !this.gameOver) {
      cell.innerHTML = 'X';
      this.audio.src = bombMusic;
      addResult(this.clicks, this.timer, this.flags, this.width, this.height);
      this.audio.addEventListener('canplaythrough', () => {
        this.audio.play();
      });
      this.audio.addEventListener('ended', () => {
        alert('you louse');
        this.StopGame();
      });
      return undefined;
    }
    this.closedCount -= 1;
    if (this.closedCount <= this.bombArr.length && !this.gameOver) {
      addResult(this.clicks, this.timer, 0);
      this.audio.src = victoryMusic;
      this.audio.addEventListener('canplaythrough', () => {
        this.audio.play();
      });
      this.audio.addEventListener('ended', () => {
        alert('you win');
        this.StopGame();
      });
      return undefined;
    }
    const count = this.getCountsMines(row, column);
    cell.classList.add(`count_${count}`);
    if (count !== 0) {
      cell.innerHTML = count;
      return undefined;
    }
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        this.open(row + y, column + x);
      }
    }
    return undefined;
  }

  StartGame() {
    const cellsCount = this.width * this.height;
    const body = document.querySelector('body');
    const field = document.createElement('div');
    const span = document.createElement('span');
    const time = document.createElement('span');
    const clicksCount = document.createElement('span');
    const mineSweeper = document.createElement('div');
    const results = document.createElement('div');
    span.innerHTML = `${this.flags} - Flags`;
    field.classList.add('field');
    body.appendChild(mineSweeper);
    mineSweeper.appendChild(field);
    mineSweeper.appendChild(span);
    mineSweeper.appendChild(time);
    mineSweeper.appendChild(clicksCount);
    savedResults.forEach((element) => {
      const resultElement = document.createElement('span');
      resultElement.innerHTML = `Clicks: ${element.clicks}, Time: ${element.time}, Bombs: ${element.bombs}, Width: ${element.width}, Height:${element.height}`;
      results.appendChild(resultElement);
    });
    mineSweeper.appendChild(results);
    field.style.gridTemplateColumns = `repeat(${this.width},1fr)`;
    for (let i = 0; i < cellsCount; i += 1) {
      field.appendChild(document.createElement('button'));
    }
    this.cells = [...field.children];
    this.bombArr = [...Array(cellsCount).keys()]
      .sort(() => Math.random() - 0.5)
      .slice(0, this.bombs);
    field.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON' || e.target.classList.contains('&')) {
        return undefined;
      }
      this.clicks += 1;
      this.audio.src = clickMusic;
      this.audio.addEventListener('canplaythrough', () => {
        this.audio.play();
      });
      clicksCount.innerHTML = `${this.clicks} - Click`;
      const index = this.cells.indexOf(e.target);
      const columns = index % this.width;
      const rows = Math.floor(index / this.width);
      this.open(rows, columns);
      return undefined;
    });
    field.addEventListener('contextmenu', (e) => {
      if (e.target.tagName !== 'BUTTON' || e.target.disabled) {
        return undefined;
      }
      if (e.target.classList.contains('&')) {
        e.target.innerHTML = '';
        e.target.classList.remove('&');
        this.flags += 1;
        span.innerHTML = `${this.flags} - Flags`;
      } else if (!(this.flags === 0)) {
        e.target.innerHTML = '&';
        e.target.classList.add('&');
        this.flags -= 1;
        span.innerHTML = `${this.flags} - Flags`;
      }
      return undefined;
    });
    body.addEventListener('keypress', this.keypressHandler);
    this.timerId = setInterval(() => { this.timer += 1; time.innerHTML = `${this.timer} - Time`; }, 1000);
  }
}
alert('Что бы выйграть надо что бы все клетки в которых нет бомб были disabled. Перезагрузить игру на кнопку r (проверте что стояла английский язык на клавиатуре) Помететь флагами клетки правая кнопка мыши. Левая кнопка мыши открытие клеток');
const level = prompt('Ведите сложность игры "hard" , "middle", "junior","custom"');
if (level === 'junior') {
  const minesweeper = new Minesweeper(10, 10, parseInt(prompt('Ведите количество бомб'), 10));
  minesweeper.StartGame();
} else if (level === 'middle') {
  const minesweeper = new Minesweeper(15, 15, parseInt(prompt('Ведите количество бомб'), 10));
  minesweeper.StartGame();
} else if (level === 'hard') {
  const minesweeper = new Minesweeper(25, 25, parseInt(prompt('Ведите количество бомб'), 10));
  minesweeper.StartGame();
} else if (level === 'custom') {
  const minesweeper = new Minesweeper(parseInt(prompt('Ведите ширину'), 10), parseInt(prompt('Ведите высоту'), 10), parseInt(prompt('Ведите количество бомб'), 10));
  minesweeper.StartGame();
}
