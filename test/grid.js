var expect = require('chai').expect;

var Grid = require('../src/grid');

describe('Grid', function () {
  it('should be able to construct with an x and y co-ordinate' +
     ' to make a particular size', function () {
    var grid = new Grid(3, 5);

    expect(grid).to.exist;
    expect(grid.width).to.equal(3);
    expect(grid.height).to.equal(5);
  });

  it('should not be larger than 50 wide or 50 tall', function () {
    expect(function () {
      var grid = new Grid(51, 10);
    }).to.throw();
    expect(function () {
      var grid = new Grid(10, 51);
    }).to.throw();
    expect(function () {
      var grid = new Grid(50, 50);
    }).to.not.throw();
  });

  it('should be able to deposit a scent where the robot gets lost', function () {
    var grid = new Grid(50, 50);

    grid.addLostScent(50, 50, 'N');
    grid.addLostScent(50, 50, 'E');

    expect(grid._lostScents).to.have.length(2);

  });

  it('should be able to test for a scent where the robot gets lost', function () {
    var grid = new Grid(50, 50);

    grid.addLostScent(50, 50, 'N');

    expect(grid.isLostHere(50, 50, 'N')).to.be.true;
    expect(grid.isLostHere(50, 50, 'E')).to.be.false;
  });

});
