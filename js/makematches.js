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

                    if(!self.swapReceiverWithSomeone(giver)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

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