var expect = require('chai').expect;

var Grid = require('../src/grid'),
    Robot = require('../src/robot');

describe('Robot', function () {

  it('should construct a robot attached to a grid successfully', function () {
    var robot = new Robot(new Grid(5, 5));

    expect(robot).to.exist;
    expect(robot.x).to.equal(0);
    expect(robot.y).to.equal(0);
    expect(robot.currentOrientation).to.equal('N');
  });

  it('should throw an error if the robot does not have a grid', function () {
    expect(function () {
      var robot = new Robot();
    }).to.throw();
  });

  it('should be able to turn left', function () {
    var robot = new Robot(new Grid(5, 5));

    robot.lost = true;
    expect(robot.turnLeft()).to.be.false;

    robot.lost = false;
    expect(robot.turnLeft()).to.equal('W');
    expect(robot.turnLeft()).to.equal('S');
    expect(robot.turnLeft()).to.equal('E');
    expect(robot.turnLeft()).to.equal('N');
  });

  it('should be able to turn right', function () {
    var robot = new Robot(new Grid(5, 5));

    robot.lost = true;
    expect(robot.turnRight()).to.be.false;

    robot.lost = false;
    expect(robot.turnRight()).to.equal('E');
    expect(robot.turnRight()).to.equal('S');
    expect(robot.turnRight()).to.equal('W');
    expect(robot.turnRight()).to.equal('N');
  });

  it('should modify its x and y co-ordinates correctly when it moves forwards', function () {
    var robot = new Robot(new Grid(5, 5));

    expect(robot.x).to.equal(0);
    expect(robot.y).to.equal(0);
    robot.moveForwards();
    expect(robot.x).to.equal(0);
    expect(robot.y).to.equal(1);
    robot.moveForwards();
    expect(robot.x).to.equal(0);
    expect(robot.y).to.equal(2);
    robot.turnRight();
    robot.moveForwards();
    expect(robot.x).to.equal(1);
    expect(robot.y).to.equal(2);
  });

  it('should be marked as lost if it falls off the grid', function () {
    var robot = new Robot(new Grid(5, 5));

    expect(robot.x).to.equal(0);
    expect(robot.y).to.equal(0);

    robot.moveForwards();
    robot.moveForwards();
    robot.moveForwards();
    robot.moveForwards();
    expect(robot.lost).to.be.false;
    robot.moveForwards();
    expect(robot.lost).to.be.true;

    // This won't run...
    robot.moveForwards();
    expect(robot.x).to.equal(0);
    expect(robot.y).to.equal(5);
    expect(robot.lost).to.be.true;
  });

  it('should not move forwards if a scent has been left before', function () {
    // An instruction to move “off” the world from a grid point from which a
    // robot has been previously lost is simply ignored by the current robot.
    var sameGrid = new Grid(5, 5),
        robotA = new Robot(sameGrid),
        robotB = new Robot(sameGrid);

    robotA.moveForwards();
    robotA.moveForwards();
    robotA.moveForwards();
    robotA.moveForwards();
    expect(robotA.y).to.equal(4);
    expect(robotA.lost).to.be.false;
    robotA.moveForwards();
    expect(robotA.y).to.equal(5);
    expect(robotA.lost).to.be.true;

    // Robot A has been lost, but just as it got lost it left a strange scent.

    robotB.moveForwards();
    robotB.moveForwards();
    robotB.moveForwards();
    robotB.moveForwards();
    expect(robotB.y).to.equal(4);
    expect(robotB.lost).to.be.false;
    robotB.moveForwards();
    expect(robotB.y).to.equal(4);
    expect(robotB.lost).to.be.false;

    // Robot B never gets lost, it smells trouble.
  });

  it('should be able to take a valid instruction', function () {
    var robot = new Robot(new Grid(5, 5));
    expect(robot.actOnInstruction).to.be.a('function');
    expect(function () {
      robot.actOnInstruction('R');
    }).to.not.throw();
  });

  it('should error on an invalid instruction', function () {
    var robot = new Robot(new Grid(5, 5));
    expect(function () {
      robot.actOnInstruction('A');
    }).to.throw();
  });

  it('should be able to take in a list of instructions', function () {
    var robot = new Robot(new Grid(5, 5));

    robot.actOnInstructions('FFFFRFFRF');
    expect(robot.x).to.equal(2);
    expect(robot.y).to.equal(3);
  });

  it('should throw an error if the instructions line is empty', function () {
    var robot = new Robot(new Grid(5, 5));

    expect(function () {
      robot.actOnInstructions('');
    }).to.throw();
  });

  it('should be able to test whether movement is possible', function () {
    var grid = new Grid(5, 5),
        robot = new Robot(grid, 1, 1);

    robot.x = 1;
    robot.y = 1;
    robot.currentOrientation = 'N';
    expect(robot.isOffGrid()).to.be.false;

    robot.x = 5;
    robot.y = 6;
    robot.currentOrientation = 'N';
    expect(robot.isOffGrid()).to.be.true;

    robot.x = 1;
    robot.y = 5;
    robot.currentOrientation = 'S';
    expect(robot.isOffGrid()).to.be.false;

    robot.x = 1;
    robot.y = 5;
    robot.currentOrientation = 'N';
    expect(robot.isOffGrid()).to.be.true;
  });

  it('should be able to exclaim if it is lost', function () {
    var robot = new Robot(new Grid(5, 5));

    robot.lost = false;
    expect(robot.exclaim()).to.equal(""); // do not cry wolf!

    robot.lost = true;
    expect(robot.exclaim()).to.equal("LOST");
  });

  it('should be able to sniff for a scent', function () {
    var robot = new Robot(new Grid(5, 5));

    expect(robot.sniffForScent).to.be.a("function");
  });
})
