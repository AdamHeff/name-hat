// Constructor for a person with all it's properties
function Giver(name, family) {
    this.name = name;
    this.family = family;
    this.receiverName = undefined;

    this.isOkReceiver = function(receiver) {
        if(receiver == undefined) {
            return false;
        }
        for(var i=0; i<this.family.length; i++) {
            if(receiver == this.family[i]) {
                return false;
            }
        }
        return true;
    }
}

function makematches(families) {
    var matchMaker = new MatchMaker(families, Math.random);
    return matchMaker.makeMatchesBody();
}

// todo: 1. make this whole thing into a class/function so that I don't have to pass
// so many parameters to the functions that are called by makematchesBody.
// todo: 2. continue to breakdown this function until it has fewer than 20 lines.
// todo: 3. Update my comments to be in line with clean code principles.
// todo: 4. Check the vertical ordering of this file so that functions that are called 
// com after the caller.
// todo: 5. Try running Lighthouse on this thing.
// todo: 6. See if there are any places where I could add explanitory variables.

function MatchMaker(families, randomFunc) {
    this.families = families;
    this.randomFunc = randomFunc;
    this.givers = new Array();
    this.receivers = new Array();
    var self = this;

    this.makeMatchesBody = function() {
        self.initializeGiversAndReceivers();

        // Go through the list, generate a random match.
        for(var outer=0; outer < self.givers.length; outer++) {
            var giver = self.givers[outer];
            var idx = Math.floor(self.randomFunc() * self.receivers.length);
    
            for(var i=0; i < self.receivers.length; i++) {
                if (giver.isOkReceiver(self.receivers[idx])) {
                    giver.receiverName = self.receivers[idx];
                    self.receivers.splice(idx, 1);
                    break;
                } else {
    
                    idx++;
                    if (idx >= self.receivers.length) {
                        idx = 0;
                    }
                    if (i == self.receivers.length-1) {
    
                        if(!self.swapReceiverWithSomeone(giver)) {
                            return 'Unable to make a match with this data.'
                        }
                    }
                }
            }
        }
    
        var response = '';
        self.givers.forEach(function (giver) {
            response += giver.name + " -> " + giver.receiverName + "\n";
        });
        return response;
    }

    this.initializeGiversAndReceivers = function () {
        self.families.forEach(function (family) {
            family.forEach(function (person) {
                var giver = new Giver(person, family);
                console.log("Hey, man");
                self.givers.push(giver);
                self.receivers.push(person);
            });
        });
    }

    this.swapReceiverWithSomeone = function(giver) {
        for(var j=0; j<self.givers.length; j++) {
            if(self.givers[j].isOkReceiver(self.receivers[0]) && giver.isOkReceiver(self.givers[j].receiverName)) {                            
                madeASwap = true;
                let tempRecieverName = self.givers[j].receiverName;
                self.givers[j].receiverName = self.receivers[0];
                giver.receiverName = tempRecieverName;
                self.receivers.splice(0, 1);
                return true;
            }
        }
        return false;
    }
}

module.exports = MatchMaker;