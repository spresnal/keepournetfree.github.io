var chai = require('chai');
var expect = chai.expect;
var fileSystem = require('fs');
var BaseScheduler = require('../js/schedulers/base-scheduler.js');

describe('BaseScheduler', function() {
  var testFile = 'temp-objects/test.js';

  afterEach(function() {
    //fileSystem.unlinkSync(testFile);
  });

  describe('openCreateFile', function(){
    it('should create a file if it does not exist', function() {
      //arrange
      var scheduler = new BaseScheduler(testFile, {key: 'test-key'});

      //act
      scheduler.openCreateFile();

      //assert
						expect(scheduler.fileExists()).to.equal(true);
    });
  });
});