var blog_chessboard = (function() {
  return {
    draw: function(cfg) {
      var board = ChessBoard('board' + cfg.id, cfg);
      var game = new Chess();

      // 1. Load a PGN into the game
      game.load_pgn(cfg.pgn);
      if (cfg.move === undefined) {
        cfg.move = 1;
      }

      var prefix = '';
      if (cfg.move % 2 === 0) {
        prefix = String(cfg.move / 2) + '. ... ';
      }
      $('#pgn' + cfg.id).html(prefix + cfg.pgn.split(' ').slice(cfg.move-1).join(' '));

      // 2. Get the full move history
      var history = game.history();
      var i = 0;

      function setup() {
        game.reset();
        for (i = 0;i < cfg.move - 1; i++) {
          game.move(history[i]);
        }
        board.position(game.fen());
      }

      setup();

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
      $('#startPositionBtn' + cfg.id).on('click', setup);

      // 6. If End button clicked, go to end position
      $('#endPositionBtn' + cfg.id).on('click', function() {
        game.load_pgn(pgn);
        board.position(game.fen());
        i = history.length;
      });
    },
  }
}());
