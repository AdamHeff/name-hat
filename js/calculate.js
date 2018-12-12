// Constructor for a person with all it's properties
function GiverInfo(name, fam) {
    this.name = name;
    this.fam = fam;
    this.receiverName = undefined;

    this.isOkReceiver = function(receiver) {
        if(receiver == undefined) {
            return false;
        }
        for(var i=0; i<this.fam.length; i++) {
            if(receiver == this.fam[i]) {
                return false;
            }
        }
        return true;
    }
}

function calculate(families) {
    return calculateBody(families, Math.random);
}

// The main body that will output a match if at all possible.
function calculateBody(families, randomFunc) {

    var givers = new Array();
    var receivers = new Array();

    families.forEach(function (fam) {
        fam.forEach(function (person) {
            var giverInfo = new GiverInfo(person, fam);
            givers.push(giverInfo);
            receivers.push(person);
        });
    });

    // Go through the list, generate a random match.
    var unmatchableList = false;
    givers.forEach(function (giverInfo) {
        var idx = Math.floor(randomFunc() * receivers.length);
        for(var i=0; i<receivers.length; i++) {
            if (giverInfo.isOkReceiver(receivers[idx])) {

                giverInfo.receiverName = receivers[idx];
                receivers.splice(idx, 1);
                break;

            } else {

                idx++;
                if (idx >= receivers.length) {
                    idx = 0;
                }
                if (i == receivers.length-1) {

                    // We went through the whole list and didn't find a match. (In normal scenarios, this
                    // is a very rare case when the last guy draws his own name.)
                    unmatchableList = true;                    
                    for(var j=0; j<givers.length; j++) {
                        if(givers[j].isOkReceiver(receivers[0]) && giverInfo.isOkReceiver(givers[j].receiverName)) {                            
                            unmatchableList = false;
                            let tempRecieverName = givers[j].receiverName;
                            givers[j].receiverName = receivers[0];
                            giverInfo.receiverName = tempRecieverName;
                            receivers.splice(0, 1);
                            break;
                        }
                    }
                }
            }
        }
    });

    var response = new String();
    if (unmatchableList) {
        response = "Unable to make a match with this data.";
    } else {
        givers.forEach(function (person) {
            response += person.name + " -> " + person.receiverName + "\n";
        });
    }
    return response;
}

module.exports = calculateBody;