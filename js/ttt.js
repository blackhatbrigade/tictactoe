function TicTacToe(mainView, canvas, context)
{
  /**
   * Stateful var that determines if it's the players turn or not.
   */
  var playerTurn = true;

  /**
   * Width (in pixels) of the main viewport.
   */
  var width = mainView.offsetWidth;

  /**
   * Height (in pixels) of the main viewport.
   */
  var height = mainView.offsetHeight;

  /**
   * Width of the gameboard in cells.
   */
  var cellWidth = 3;

  /**
   * Height of the gameboard in cells.
   */
  var cellHeight = 3;

  /**
   * Main data array for game state.
   */
  var tttMap = [];

  /**
   * Width offset for determining how gameboard should be drawn.
   */
  var xLineOffset = width / 3;

  /**
   * Height offset for determing how gameboard should be drawn.
   */
  var yLineOffset = height / 3;

  /**
   * The starting offset from the left side of the window.
   */
  var xStartOffset = canvas.getBoundingClientRect().left;

  /**
   * The starting offset from the top side of the window.
   */
  var yStartOffset = canvas.getBoundingClientRect().top;

  // Constructor functionality.
  buildTTTMap(3, 3);
  canvasRedraw(mainView);
  canvas.addEventListener("mouseup", clickEvent, false);

  /**
   * Non-functional atm.
   *
   * @param {object} mainView The body element of the document.
   */
  function canvasRedraw(mainView)
  {
    // Reset registered width/height.
    width = mainView.offsetWidth;
    height = mainView.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    // Determine new offsets.
    xlineOffset = width / 3;
    ylineOffset = height / 3;

    // Trigger redraw of game.
    drawGameBoard();
  }

  /**
   * Based on current width / height settings, draw the game board.
   */
  function drawGameBoard()
  {
    var w = 1;
    var h = 1;

    context.beginPath();

    for (; w < cellWidth; w++) {
      context.moveTo((w*xLineOffset), 0);
      context.lineTo((w*xLineOffset), height);
    }

    for (; h < cellHeight; h++) {
      context.moveTo(0, (h*yLineOffset));
      context.lineTo(width, (h*yLineOffset));
    }
    context.stroke();
  }

  /**
   * Build our ttt Data object.
   *
   * @param {Number} width  The width of the data object in cells.
   * @param {Number} height The height of the data object in cells.
   */
  function buildTTTMap(width, height)
  {
    // Manual hoisting.
    var indexNum;
    var w;
    var h;

    cellWidth = width;
    cellHeight = height;

    for (w = 0; w < width; w++) {
      for (h = 0; h < height; h++) {
        indexNum = w + (h * 3);
        tttMap.push({
          owner: null,
          position: indexNum
        });
      }
    }
  }

  function clickEvent(event) {
    var xLoc = event.pageX - xStartOffset;
    var yLoc = event.pageY - yStartOffset;

    var xCell = Math.floor(xLoc / xLineOffset);
    var yCell = Math.floor(yLoc / yLineOffset);

    // Check if the spot selected has already been selected.
    if (!isTaken(xCell, yCell)) {
        tickLocation(xCell, yCell);
    }
  }

  /**
   * Determines if a cell has already been taken or not.
   *
   * @param Number xCell The x position of the cell.
   * @param Number yCell The y position of the cell.
   *
   * @return boolean
   */
  function isTaken(xCell, yCell)
  {
    var pos = findArrayPos(xCell, yCell);

    if (tttMap[pos].owner === null) {
      return false;
    } else {
      return true;
    }
  }

  function tickLocation(xCell, yCell)
  {
    var pos = findArrayPos(xCell, yCell);

    if (tttMap[pos].owner === null) {
      tttMap[pos].owner = playerTurn;
      if (playerTurn === true) {
        makeX(xCell, yCell);
      } else {
        makeO(xCell, yCell);
      }

      if (isWon(playerTurn)) {
        console.log('YOU WON!');
      }

      if (playerTurn === true) {
        playerTurn = false;
      } else {
        playerTurn = true;
      }
    }
  }

  function findArrayPos(xCell, yCell)
  {
    var position = xCell + (yCell * 3);
    for (var i = 0; i < tttMap.length; i++) {
      if (tttMap[i].position === position) {
        return i;
      }
    }
    return -1;
  }

  function makeX(xCell, yCell)
  {
    context.moveTo((xCell*xLineOffset)+Math.floor(xLineOffset*0.1), (yCell*yLineOffset)+Math.floor(yLineOffset*0.1));
    context.lineTo((xCell*xLineOffset)+Math.floor(xLineOffset*0.9), (yCell*yLineOffset)+Math.floor(yLineOffset*0.9));
    context.moveTo((xCell*xLineOffset)+Math.floor(xLineOffset*0.1), (yCell*yLineOffset)+Math.floor(yLineOffset*0.9));
    context.lineTo((xCell*xLineOffset)+Math.floor(xLineOffset*0.9), (yCell*yLineOffset)+Math.floor(yLineOffset*0.1));
    context.stroke();
  }

  function makeO(xCell, yCell)
  {
    var radius;
    var x = (xCell*xLineOffset)+(xLineOffset*0.5);
    var y = (yCell*yLineOffset)+(yLineOffset*0.5);

    // Determine radius based on the shorter axis.
    if (xLineOffset > yLineOffset) {
      radius = (yLineOffset/2)*0.8;
    } else {
      radius = (xLineOffset/2)*0.8;
    }

    context.moveTo(x+radius, y);
    context.arc(x, y, radius, 0, 2*Math.PI);
    context.stroke();
  }

  /**
   * Going to kep it interesting and make the ai not super intelligent.
   */
  function aiTurn(xCell, yCell)
  {
    // Check if it's a edge cell.
    if (xCell !== 1 || yCell !== 1) {
      if (xCell !== 1) {
        // on left or right.
        
      } else if (yCell !== 1) {
        // on top or bottom.

      }
    } else {
      // middle chosen.

    }
  }

  function isWon(curPlayer)
  {
    var won = true;
    // Verticals
    won = true;
    for (var i = 0; i < cellWidth; i++)
    {
      for (var j = 0; j < cellHeight; j+=cellWidth) {
        if (tttMap[i+j].owner !== curPlayer) {
          won = false;
        }
      }
    }
    if (won) {
      return true;
    }

    // Horizontals
    won = true;
    for (var i = 0; i < cellHeight; i+=cellWidth)
    {
      for (var j = 0; j < cellHeight; j++) {
        if (tttMap[i+j].owner !== curPlayer) {
          won = false;
        }
      }
    }
    if (won) {
      return true;
    }

    // Diagonals
    // Yeah, sorry for abusing the poor for statement.
    won = true;
    for (var i = 0, j = 0; (i < cellWidth) && (j < cellHeight); i++, j++) {
      if (tttMap[i+(j*cellWidth)].owner !== curPlayer) {
        won = false;
      }
    }
    if (won) {
      return true;
    }

    won = true;
    for (var i = (cellWidth-1); i >= 0; i--) {
      if (tttMap[i+(i*cellWidth)].owner !== curPlayer) {
        won = false;
      }
    }
    if (won) {
      return true;
    }

    won = true;
    for (var i = 0; i < cellWidth; i++) {
      if (tttMap[i+((cellWidth-(i+1))*cellWidth)].owner !== curPlayer) {
        won = false;
      }
    }
    if (won) {
      return true;
    }

    return false;
  }

  /**
   * Debug function.
   */
  function getInfo()
  {
    console.log(width + ', ' + height);
  }

  return {
    getInfo: getInfo,
    canvasRedraw: canvasRedraw
  }
}
