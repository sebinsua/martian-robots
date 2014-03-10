var Robot = (function() {

  function Robot (grid, x, y, orientation) {
    if (grid == null) {
      throw new Error("No grid given to the robot");
    }

    this.grid = grid;

    this.x = x || 0;
    this.y = y || 0;
    this.currentOrientation = orientation || 'N';

    this.lost = false;
  }

  Robot.prototype.actOnInstructions = function (instructionsLine) {
    if (instructionsLine.length === 0) {
      throw new Error('Empty instructions string');
    }

    while (!this.lost) {
      var instruction = instructionsLine.charAt(0);

      this.actOnInstruction(instruction);

      instructionsLine = instructionsLine.slice(1);
    }
  };

  Robot.prototype.actOnInstruction = function (instruction) {
    switch (instruction) {
      case 'F':
        this.moveForward();
        break;
      case 'R':
        this.turnRight();
        break;
      case 'L':
        this.turnLeft();
        break;
      default:
        throw new Error("Invalid instruction " + instruction);
    }
  };

  Robot.prototype.moveForward = function () {
    if (this.lost || this.sniffForScent()) {
      return false;
    }

    var previousX = this.x, previousY = this.y;
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

    if (this.isOffGrid()) {
      this.grid.addLostScent(previousX, previousY, this.currentOrientation);
      this.lost = true;
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
    return this.grid.isMovementForwardsPossible(this.x, this.y, this.currentOrientation);
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
