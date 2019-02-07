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
    var mainMatchMaker = this;

    this.makeMatchesBody = function() {
        mainMatchMaker.initializeGiversAndReceivers();

        for(var outer=0; outer < mainMatchMaker.givers.length; outer++) {
            var giver = mainMatchMaker.givers[outer];
            var foundOne = mainMatchMaker.findAReceiver(giver);
            if(!foundOne) {
                // For example, the following data set can never be matched: family1: Adam, Mary; family2: Scott
                return 'Unable to make a match with this data.'
            }
        }
    
        return mainMatchMaker.generateResponse();
    }

    this.initializeGiversAndReceivers = function () {
        mainMatchMaker.families.forEach(function (family) {
            family.forEach(function (person) {
                var giver = new Giver(person, family);
                mainMatchMaker.givers.push(giver);
                mainMatchMaker.receivers.push(person);
            });
        });
    }

    this.findAReceiver = function (giver) {
        var randomIndex = Math.floor(mainMatchMaker.randomFunc() * mainMatchMaker.receivers.length);

        for(var i=0; i < mainMatchMaker.receivers.length; i++) {
            if (giver.isOkReceiver(mainMatchMaker.receivers[randomIndex])) {
                giver.receiverName = mainMatchMaker.receivers[randomIndex];
                mainMatchMaker.receivers.splice(randomIndex, 1);
                break;
            } else {
                randomIndex++;
                if (randomIndex >= mainMatchMaker.receivers.length) {
                    randomIndex = 0;
                }
                if (i == mainMatchMaker.receivers.length-1) {
                    // This is a rare case when the last person (or last family) pulls her own name (or someone in her family)
                    // In real life we would have to start the game over, but in this case we can swap.
                    if(!mainMatchMaker.swapReceiverWithSomeone(giver)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // The giver is stuck with a reciever that she can't give to. So we attempt to switch with someone who already has a reciever.
    this.swapReceiverWithSomeone = function(giver) {
        for(var i=0; i<mainMatchMaker.givers.length; i++) {
            if(mainMatchMaker.givers[i].isOkReceiver(mainMatchMaker.receivers[0]) && giver.isOkReceiver(mainMatchMaker.givers[i].receiverName)) {                            
                madeASwap = true;
                let tempRecieverName = mainMatchMaker.givers[i].receiverName;
                mainMatchMaker.givers[i].receiverName = mainMatchMaker.receivers[0];
                giver.receiverName = tempRecieverName;
                mainMatchMaker.receivers.splice(0, 1);
                return true;
            }
        }
        return false;
    }

    this.generateResponse = function() {
        var response = '';
        mainMatchMaker.givers.forEach(function (giver) {
            response += giver.name + " -> " + giver.receiverName + "\n";
        });
        return response;
    }
}

module.exports = MatchMaker; // Not yet sure the best way to get Mocha to like a simple export.