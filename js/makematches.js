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
    return makematchesBody(families, Math.random);
}

// The main body that will output a match if at all possible.
function makematchesBody(families, randomFunc) {

    var givers = new Array();
    var receivers = new Array();
    initializeGiversAndReceivers(families, givers, receivers);

    // Go through the list, generate a random match.
    var unmatchableList = false;
    givers.forEach(function (giver) {
        var idx = Math.floor(randomFunc() * receivers.length);
        for(var i=0; i<receivers.length; i++) {
            if (giver.isOkReceiver(receivers[idx])) {

                giver.receiverName = receivers[idx];
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
                        if(givers[j].isOkReceiver(receivers[0]) && giver.isOkReceiver(givers[j].receiverName)) {                            
                            unmatchableList = false;
                            let tempRecieverName = givers[j].receiverName;
                            givers[j].receiverName = receivers[0];
                            giver.receiverName = tempRecieverName;
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
        givers.forEach(function (giver) {
            response += giver.name + " -> " + giver.receiverName + "\n";
        });
    }
    return response;
}

function initializeGiversAndReceivers(families, givers, receivers) {
    families.forEach(function (family) {
        family.forEach(function (person) {
            var giver = new Giver(person, family);
            givers.push(giver);
            receivers.push(person);
        });
    });
}

module.exports = makematchesBody;