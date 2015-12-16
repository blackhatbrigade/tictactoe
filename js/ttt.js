function TicTacToe(mainView, canvas, context)
{
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

  function tickLocation(xCell, yCell, player)
  {
    var pos = findArrayPos(xCell, yCell);

    tttMap[pos].owner = player;
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
