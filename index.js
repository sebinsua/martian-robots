var fs = require('fs');

var Robot = require('./src/robot'),
    Grid = require('./src/grid'),
    RobotPrograms = require('./src/robot-programs');

var inputFilePath = "test/mocks/test.dat";

fs.readFile(inputFilePath, function (err, data) {
  var fileBlob = data.toString();
  try {
    var robotPrograms = new RobotPrograms(fileBlob);
    robotPrograms.run();
  } catch (error) {
    console.error(error.message);
  }
});
