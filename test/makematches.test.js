var MatchMaker = require('../js/makematches.js');
var assert = require('assert');

describe('makematchesBody', function() {
    it('should return an empty string', function() {
        var matchMaker = new MatchMaker(new Array(), Math.random);
        var empty = matchMaker.makeMatchesBody();
        assert.equal(empty, "");
    });
});

describe('makematchesBody', function() {
    it('should not be able to makematches for 2 families of unequal length', function() {
        var families = new Array();
        var fam1 = ["Adam", "Mary", "Ben"];
        var fam2 = ["Jeremy", "Lindsay"];
        families.push(fam1);
        families.push(fam2);
        var matchMaker = new MatchMaker(families, Math.random);
        var undoable = matchMaker.makeMatchesBody();
        assert.equal(undoable, "Unable to make a match with this data.");
    });
});

describe('makematchesBody', function() {
    it('should be able to match 2 families with actual Math.random', function() {

        // Arrange
        var families = new Array();
        var fam1 = ["Adam", "Mary"];
        var fam2 = ["Jeremy", "Lindsay"];
        families.push(fam1);
        families.push(fam2);

        // Act
        var matchMaker = new MatchMaker(families, Math.random);
        var fine = matchMaker.makeMatchesBody();

        // Assert
        // This test is a tad complex since it uses actual Math.random
        assert.equal((fine.match(/Adam/g) || []).length, 2);
        assert.equal((fine.match(/Mary/g) || []).length, 2);
        assert.equal((fine.match(/Jeremy/g) || []).length, 2);
        assert.equal((fine.match(/Lindsay/g) || []).length, 2);
        var matches = fine.trim().split("\n");
        assert.equal(matches.length, 4);
        matches.forEach(function (matchBlob) {
            var match = matchBlob.split("->").map(function (a) {
                return a.trim();
            });
            if(match[0] == "Adam" || match[0] == "Mary") {
                assert.equal(match[1] == "Lindsay" || match[1] == "Jeremy", true);                
            } else {
                assert.equal(match[1] == "Adam" || match[1] == "Mary", true);
            }
        });
    });
});

describe('makematchesBody', function() {
    it('should handle worst case randomization', function() {

        // Arrange
        function myRandom() {
            return 0.01;
        }
        var families = new Array();
        var fam1 = ["Adam", "Mary"];
        var fam2 = ["Jeremy", "Lindsay"];
        var fam3 = ["Brett"];
        families.push(fam1);
        families.push(fam2);
        families.push(fam3);

        // Act
        var matchMaker = new MatchMaker(families, myRandom);
        var fakeRand = matchMaker.makeMatchesBody();

        // Assert
        assert.equal(fakeRand, 'Adam -> Brett\nMary -> Lindsay\nJeremy -> Adam\nLindsay -> Mary\nBrett -> Jeremy\n');
    });
});