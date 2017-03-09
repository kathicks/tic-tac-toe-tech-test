(function(exports) {

  function Game(player_one, player_two, board = new Board()) {
    this.player_one = player_one;
    this.player_two = player_two;
    this.board = board;
    this.turn  = this.player_one;
  }

  Game.prototype = {
    play: function(position){
      this.board.grid[position[0]][position[1]].push(this.turn.marker);
      this.checkWin();
      this.switchPlayer();
    },
    switchPlayer: function(){
      if (this.turn == this.player_one) {
        this.turn = this.player_two;
      }
      else {
        this.turn = this.player_one;
      }
    },
    checkWin: function(){
      for (i = 0; i < 3; i++) {
        if (this.compareRow(i) && this.notEmpty(i)) {
          throw "Game over!";
        }
      }
    },
    compareCells: function(cell_one, cell_two){
      return JSON.stringify(this.board.grid[cell_one[0]][cell_one[1]]) == JSON.stringify(this.board.grid[cell_two[0]][cell_two[1]]);
    },
    compareRow: function(row_number){
      return this.compareCells([row_number,0], [row_number,1]) && this.compareCells([row_number,1], [row_number,2]);
    },
    notEmpty: function(row_number){
      return this.board.grid[row_number][0][0] == "X" || this.board.grid[row_number][0][0] == "O";
    }
  };

  exports.Game = Game;

})(this);
