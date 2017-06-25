var blog_chessboard = (function() {
  return {
    draw: function(cfg) {
      var board = ChessBoard('board' + cfg.id, cfg);
      var game = new Chess();

      // 1. Load a PGN into the game
      game.load_pgn(cfg.pgn);
      $('#pgn' + cfg.id).html(cfg.pgn);

      // 2. Get the full move history
      var history = game.history();
      game.reset();
      var i = 0;

      // 3. If Next button clicked, move forward one
      $('#nextBtn' + cfg.id).on('click', function() {
        game.move(history[i]);
        board.position(game.fen());
        i += 1;
        if (i > history.length) {
          i = history.length;
        }
      });

      // 4. If Prev button clicked, move backward one
      $('#prevBtn' + cfg.id).on('click', function() {
        game.undo();
        board.position(game.fen());
        i -= 1;
        if (i < 0) {
          i = 0;
        }
      });

      // 5. If Start button clicked, go to start position
      $('#startPositionBtn' + cfg.id).on('click', function() {
        game.reset();
        board.start();
        i = 0;
      });

      // 6. If End button clicked, go to end position
      $('#endPositionBtn' + cfg.id).on('click', function() {
        game.load_pgn(pgn);
        board.position(game.fen());
        i = history.length;
      });
    },
  }
}());
