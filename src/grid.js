var Grid = (function () {

  var MAX_GRID_HEIGHT = 50, MAX_GRID_WIDTH = 50;

  var Grid = function (x, y) {
    if (x > MAX_GRID_WIDTH || x < 0) {
      throw new Error("Grid too wide: " + x);
    }
    if (y > MAX_GRID_HEIGHT || y < 0) {
      throw new Error("Grid too tall: " + y);
    }

    this.width = x || 0;
    this.height = y || 0;

    this._lostScents = [];
  };

  Grid.prototype.isLostHere = function (currentX, currentY, orientatingTo) {
    var scentIdentifier = "" + currentX + "," + currentY + ":" + orientatingTo;
    for (var lsi = 0; lsi < this._lostScents.length; lsi++) {
      if (scentIdentifier === this._lostScents[lsi]) {
        return true;
      }
    }
    return false;
  };

  Grid.prototype.addLostScent = function (previousX, previousY, currentOrientation) {
    var scentIdentifier = "" + previousX + "," + previousY + ":" + currentOrientation;
    this._lostScents.push(scentIdentifier);
  };

  Grid.prototype.isMovementForwardsPossible = function (currentX, currentY, currentOrientation) {
    if (currentX < 0 || currentX > this.width || currentY < 0 || currentY > this.height) {
      return false;
    }

    switch (currentOrientation) {
      default:
      case 'N':
        return currentY !== this.height;
      case 'S':
        return currentY !== 0;
      case 'E':
        return currentX !== this.width;
      case 'W':
        return currentX !== 0;
    }

    return false;
  };

  return Grid;
})();

module.exports = Grid;
