var Robot = require('./robot'),
    Grid = require('./grid');

var RobotPrograms = (function() {

  // @todo: Ask yourself: are the constraints in the right place?

  var MAX_GRID_HEIGHT = 50, MAX_GRID_WIDTH = 50;

  var RobotPrograms = function (fileBlob) {
    this.lines = fileBlob.split('\n') || [];
    if (this.lines.length === 0) {
      throw new Error("No lines passed into the robot program");
    }

    var firstLine = this.lines.shift(),
        coordinates = firstLine.split(' '),
        x = parseInt(coordinates[0]), y = parseInt(coordinates[1]);
    this.createGrid(x, y);
  };

  RobotPrograms.prototype.createGrid = function (x, y) {
    if (isNaN(x) || isNaN(y)) {
      throw new Error("First line did not contain numbers");
    }

    if (x > MAX_GRID_WIDTH || x < 0) {
      throw new Error("Grid too wide: " + x);
    }
    if (y > MAX_GRID_HEIGHT || y < 0) {
      throw new Error("Grid too tall: " + y);
    }
    this.grid = new Grid(x, y);
  };

  RobotPrograms.prototype.run = function () {
    var robot, instructions = '';
    while (this.lines.length !== 0) {
      robot = this.createRobot();

      instructions = this.getRobotInstructions();

      robot.actOnInstructions(instructions);

      this.printRobotFinishingPosition(robot);

      this.lines.shift(); // Get rid of an empty new line (if it exists...)
    }
  };

  RobotPrograms.prototype.createRobot = function () {
    var createRobotLine = this.lines.shift();

    var _position = createRobotLine.split(' '),
        x = parseInt(_position[0]),
        y = parseInt(_position[1]),
        orientation = _position[2];

    var robot = new Robot(this.grid, x, y, orientation);
    return robot;
  };

  RobotPrograms.prototype.getRobotInstructions = function() {
    var line = this.lines.shift();
    if (line.length > 100) {
      throw new Error("Instructions too long: " + line.length + " > 100");
    }

    return line;
  };

  RobotPrograms.prototype.printRobotFinishingPosition = function (robot) {
    console.log(robot.x + " " + robot.y +
                " " + robot.currentOrientation + " " + robot.exclaim());
    console.log("");
  };

  return RobotPrograms;

})();

module.exports = RobotPrograms;
