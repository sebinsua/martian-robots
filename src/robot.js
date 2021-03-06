var Robot = (function() {

  var VALID_ORIENTATIONS = ['N', 'S', 'W', 'E'];

  function Robot (grid, x, y, orientation) {
    if (grid == null) {
      throw new Error("No grid given to the robot");
    }

    this.grid = grid;

    x = x || 0;
    if (x < 0 || x > this.grid.width) {
      throw new Error("x argument " + x + " outside grid");
    }
    this.x = x;

    y = y || 0;
    if (y < 0 || y > this.grid.height) {
      throw new Error("y argument " + y + " outside grid");
    }
    this.y = y;

    orientation = orientation || 'N';
    if (VALID_ORIENTATIONS.indexOf(orientation) === -1) {
      throw new Error("orientation argument " + orientation + " is invalid");
    }
    this.currentOrientation = orientation;

    this.lost = false;
  }

  Robot.prototype.actOnInstructions = function (instructionsLine) {
    if (instructionsLine.length === 0) {
      throw new Error('Empty instructions string');
    }

    while (!this.lost && instructionsLine.length !== 0) {
      var instruction = instructionsLine.charAt(0);

      this.actOnInstruction(instruction);

      instructionsLine = instructionsLine.slice(1);
    }
  };

  Robot.prototype.actOnInstruction = function (instruction) {
    switch (instruction) {
      case 'F':
        return this.moveForwards();
      case 'R':
        return this.turnRight();
      case 'L':
        return this.turnLeft();
      default:
        throw new Error("Invalid instruction " + instruction);
    }
  };

  Robot.prototype.moveForwards = function () {
    if (this.lost || this.sniffForScent()) {
      return false;
    }

    if (this.isOffGrid()) {
      this.grid.addLostScent(this.x, this.y, this.currentOrientation);
      this.lost = true;
      return false;
    }

    switch (this.currentOrientation) {
      default:
      case 'N':
        this.y++;
        break;
      case 'S':
        this.y--;
        break;
      case 'E':
        this.x++;
        break;
      case 'W':
        this.x--;
        break;
    }

    return true;
  };

  Robot.prototype.turnLeft = function() {
    if (this.lost) {
      return false;
    }
    var left = {
      'N': 'W',
      'W': 'S',
      'S': 'E',
      'E': 'N'
    };
    return this.currentOrientation = left[this.currentOrientation];
  };

  Robot.prototype.turnRight = function() {
    if (this.lost) {
      return false;
    }
    var right = {
      'N': 'E',
      'E': 'S',
      'S': 'W',
      'W': 'N'
    };
    return this.currentOrientation = right[this.currentOrientation];
  };

  Robot.prototype.isLost = function() {
    return this.lost;
  };

  Robot.prototype.isOffGrid = function () {
    return !this.grid.isMovementForwardsPossible(this.x, this.y, this.currentOrientation);
  };

  Robot.prototype.sniffForScent = function () {
    return this.grid.isLostHere(this.x, this.y, this.currentOrientation);
  };

  Robot.prototype.exclaim = function () {
    if (this.lost) {
      return "LOST";
    }
    return "";
  };

  return Robot;

})();

module.exports = Robot;
