var Robot = require('./robot'),
    Grid = require('./grid');

var RobotPrograms = (function() {

  var RobotPrograms = function (fileBlob) {
    this.lines = fileBlob.split('\n') || [];
    if (this.lines.length === 0) {
      throw new Error("No lines passed into the robot program");
    }

    var firstLine = this.lines.shift();
    this.createGrid(firstLine);
  };

  RobotPrograms.prototype.createGrid = function (firstLine) {
    var _coordinates = firstLine.split(' '),
        x = parseInt(_coordinates[0]), y = parseInt(_coordinates[1]);

    if (isNaN(x) || isNaN(y)) {
      throw new Error("First line did not contain numbers");
    }

    this.grid = new Grid(x, y);
  };

  RobotPrograms.prototype.createRobot = function (createRobotLine) {
    var _position = createRobotLine.split(' '),
        x = parseInt(_position[0]),
        y = parseInt(_position[1]),
        orientation = _position[2];

    var robot = new Robot(this.grid, x, y, orientation);
    return robot;
  };

  RobotPrograms.prototype.run = function () {
    var robot, instructions = '';
    while (this.lines.length !== 0) {
      var createRobotLine = this.lines.shift();
      robot = this.createRobot(createRobotLine);

      var robotInstructionsLine = this.lines.shift();
      instructions = this.getRobotInstructions(robotInstructionsLine);

      robot.actOnInstructions(instructions);
      this.printRobotFinishingPosition(robot);

      this.lines.shift(); // Get rid of an empty new line (if it exists...)
    }
  };

  RobotPrograms.prototype.getRobotInstructions = function(line) {
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
