var calculate = require('../js/calculate.js');
var assert = require('assert');

//todo: adam: the next step is to test the case of the single guy who draws his own name, but need to inject random first.

describe('calculate', function() {
    it('should return an empty string', function() {
        var empty = calculate(new Array());
        assert.equal(empty, "");
    });
});

describe('calculate', function() {
    it('should not be able to calculate 2 families of unequal length', function() {
        var families = new Array();
        var fam1 = ["Adam", "Mary", "Ben"];
        var fam2 = ["Jeremy", "Lindsay"];
        families.push(fam1);
        families.push(fam2);
        var undoable = calculate(families);
        assert.equal(undoable, "Unable to make a match with this data.");
    });
});

//todo: adam: this test will improve when I make random injectable
describe('calculate', function() {
    it('should be able to match 2 families', function() {

        // Arrange
        var families = new Array();
        var fam1 = ["Adam", "Mary"];
        var fam2 = ["Jeremy", "Lindsay"];
        families.push(fam1);
        families.push(fam2);

        // Act
        var fine = calculate(families);

        // Assert
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
