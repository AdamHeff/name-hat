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

// This function will attempt to match all people with a random non-family member and report the results
// in the form of a string. If the input data cannot be matched, then it reports an error.
function makematches(families) {
    var matchMaker = new MatchMaker(families, Math.random);
    return matchMaker.makeMatchesBody();
}

function MatchMaker(families, randomFunc) {
    this.families = families;
    this.randomFunc = randomFunc;
    this.givers = new Array();
    this.receivers = new Array();
    var self = this;

    this.makeMatchesBody = function() {
        self.initializeGiversAndReceivers();

        for(var outer=0; outer < self.givers.length; outer++) {
            var giver = self.givers[outer];
            var foundOne = self.findAReceiver(giver);
            if(!foundOne) {
                // For example, the following data set can never be matched: family1: Adam, Mary; family2: Scott
                return 'Unable to make a match with this data.'
            }
        }
    
        return self.generateResponse();
    }

    this.initializeGiversAndReceivers = function () {
        self.families.forEach(function (family) {
            family.forEach(function (person) {
                var giver = new Giver(person, family);
                self.givers.push(giver);
                self.receivers.push(person);
            });
        });
    }

    this.findAReceiver = function (giver) {
        var randomIndex = Math.floor(self.randomFunc() * self.receivers.length);

        for(var i=0; i < self.receivers.length; i++) {
            if (giver.isOkReceiver(self.receivers[randomIndex])) {
                giver.receiverName = self.receivers[randomIndex];
                self.receivers.splice(randomIndex, 1);
                break;
            } else {
                randomIndex++;
                if (randomIndex >= self.receivers.length) {
                    randomIndex = 0;
                }
                if (i == self.receivers.length-1) {
                    // This is a rare case when the last person (or last family) pulls her own name (or someone in her family)
                    // In real life we would have to start the game over, but in this case we can swap.
                    if(!self.swapReceiverWithSomeone(giver)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // The giver is stuck with a reciever that she can't give to. So we attempt to switch with someone who already has a reciever.
    this.swapReceiverWithSomeone = function(giver) {
        for(var i=0; i<self.givers.length; i++) {
            if(self.givers[i].isOkReceiver(self.receivers[0]) && giver.isOkReceiver(self.givers[i].receiverName)) {                            
                madeASwap = true;
                let tempRecieverName = self.givers[i].receiverName;
                self.givers[i].receiverName = self.receivers[0];
                giver.receiverName = tempRecieverName;
                self.receivers.splice(0, 1);
                return true;
            }
        }
        return false;
    }

    this.generateResponse = function() {
        var response = '';
        self.givers.forEach(function (giver) {
            response += giver.name + " -> " + giver.receiverName + "\n";
        });
        return response;
    }
}

module.exports = MatchMaker;