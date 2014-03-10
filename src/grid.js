var Grid = (function () {
  var Grid = function (x, y) {
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

  return Grid;
})();

module.exports = Grid;
