var expect = require('chai').expect;

var Grid = require('../src/grid'),
    Robot = require('../src/robot');

describe('Robot', function () {

  it('should construct a robot attached to a grid successfully', function () {

  });

  it('should throw an error if the robot does not have a grid', function () {

  });

  it('should be able to take a valid instruction', function () {

  });

  it('should error on an invalid instruction', function () {

  });

  it('should be able to turn left', function () {

  });

  it('should be able to turn right', function () {

  });

  it('should modify its x and y co-ordinates correctly when it moves forwards', function () {

  });

  it('should be marked as lost if it falls off the grid', function () {

  });

  it('should not move forwards if a scent has been left before', function () {
    // An instruction to move “off” the world from a grid point from which a
    // robot has been previously lost is simply ignored by the current robot.
  });

  it('should be able to test whether movement is possible', function () {
    var grid = new Grid(5, 5),
        robot = new Robot(grid, 1, 1);

    robot.x = 1;
    robot.y = 1;
    robot.currentOrientation = 'N';
    expect(robot.isOffGrid()).to.be.true;

    robot.x = 5;
    robot.y = 6;
    robot.currentOrientation = 'N';
    expect(robot.isOffGrid()).to.be.false;

    robot.x = 1;
    robot.y = 5;
    robot.currentOrientation = 'S';
    expect(robot.isOffGrid()).to.be.true;

    robot.x = 1;
    robot.y = 5;
    robot.currentOrientation = 'N';
    expect(robot.isOffGrid()).to.be.false;
  });

  it('should be able to exclaim if it is lost', function () {

  });
})
