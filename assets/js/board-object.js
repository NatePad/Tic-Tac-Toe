const board = {
  x: 'X',
  o: 'O',
  currentPlayer: '',

  squares: [
      ['a1', '.'],
      ['b1', '.'],
      ['c1', '.'],
      ['a2', '.'],
      ['b2', '.'],
      ['c2', '.'],
      ['a3', '.'],
      ['b3', '.'],
      ['c3', '.'],
  ],

//   when the player chooses X or O
  chooseXO: function(e) {

    // assign letters to players
    if (e === this.x) {
      this.currentPlayer = e;
    } else {
      this.currentPlayer = e;
    }

    // hide the choice div and show the board div
    document.getElementById('choose-xo').classList.add('display-none');
    document.getElementById('board').classList.remove('display-none');
  },

  // verify that the square hasn't already been clicked
  findXO: function(e) {
    for (let i = 0; i < this.squares.length; i++) {
      if (this.squares[i][0] === e) {
        if (this.squares[i][1] === '.') {
          return false;
        } else {
          return true;
        }
      }
    }
  },

  // on mouse over
  showXO: function(e) {
    let t = this.findXO(e);
    if (t === false) {
      document.getElementById(e).textContent = this.currentPlayer;
    }
  },

  // on mouse leave
  hideXO: function(e) {
    let t = this.findXO(e);
    if (t === false) {
      document.getElementById(e).textContent = '.';
    }
  },

  // click a square to place an X or an O
  clickSquare: function(e) {
    let t = this.findXO(e);

    if (t === false) {
      for (let i = 0; i < this.squares.length; i++) {
        if (this.squares[i][0] === e) {
         this.squares[i][1] = this.currentPlayer;
        }
        document.getElementById(e).textContent = this.currentPlayer;
      }

    this.switchPlayer();
    document.getElementById(e).classList.add('fill-in');
    }
    
    this.evaluateDirections();
  },

  switchPlayer: function() {
    if (this.currentPlayer === this.x) {
      this.currentPlayer = this.o;
    } else {
      this.currentPlayer = this.x;
    }
  },

  // scan the board for a win
  evaluateDirections: function() {
    this.evaluateHorizontal();
    this.evaluateVertical();
    this.evaluateDiagonal();
  },

  // inner function called to add up tallies of Xs and Os
  checkForWin: function(i, countX, countO) {
    if (this.squares[i][1] === this.x) {
      countX++;
      if (countX === 3) {
        this.win(this.x);
      }
    } else if (this.squares[i][1] === this.o) {
      countO++;
      if (countO === 3) {
        this.win(this.o);
      }
    }
    return [countX, countO];
  },

  evaluateHorizontal: function() {
    for (let i = 0; i < this.squares.length; i+=3) {
      let countX = 0;
      let countO = 0;
      for (let j = 0; j < this.squares.length/3; j++) {
        let getCounts = this.checkForWin(i + j, countX, countO);
        countX = getCounts[0];
        countO = getCounts[1];
      }
    }
  },
  
  evaluateVertical: function() {
    for (let i = 0; i < this.squares.length/3; i++) {
      let countX = 0;
      let countO = 0;
      for (let j = i; j < this.squares.length; j+=3) {
        let getCounts = this.checkForWin(j, countX, countO);
        countX = getCounts[0];
        countO = getCounts[1];
      }
    }
  },

  evaluateDiagonal: function() {
    let countX = 0;
    let countO = 0;
    for (let i = 0; i < this.squares.length; i+=4) {
      let getCounts = this.checkForWin(i, countX, countO);
      countX = getCounts[0];
      countO = getCounts[1];
    }

    countX = 0;
    countO = 0;
    for (let i = 2; i < this.squares.length; i+=2) {
      let getCounts = this.checkForWin(i, countX, countO);
      countX = getCounts[0];
      countO = getCounts[1];
    }
  },

  win: function(e) {
    alert('Congratulations! ' + e + ' wins!');
  }
};