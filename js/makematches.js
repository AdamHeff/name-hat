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

// todo: 1. make this whole thing into a class/function so that I don't have to pass
// so many parameters to the functions that are called by makematchesBody.
// todo: 2. continue to breakdown this function until it has fewer than 20 lines.
// todo: 3. Update my comments to be in line with clean code principles.
// todo: 4. Check the vertical ordering of this file so that functions that are called 
// com after the caller.
// todo: 5. Try running Lighthouse on this thing.

// The main body that will output a match if at all possible.
function makematchesBody(families, randomFunc) {

    var givers = new Array();
    var receivers = new Array();
    initializeGiversAndReceivers(families, givers, receivers);

    // Go through the list, generate a random match.
    for(var outer=0; outer<givers.length; outer++) {
        var giver = givers[outer];
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

                    if(!swapReceiverWithSomeone(giver, givers, receivers)) {
                        return 'Unable to make a match with this data.'
                    }
                }
            }
        }
    }

    var response = '';
    givers.forEach(function (giver) {
        response += giver.name + " -> " + giver.receiverName + "\n";
    });
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

// We went through the whole list and didn't find a match. (In normal scenarios, this
// is a very rare case when the last guy draws his own name.)
function swapReceiverWithSomeone(giver, givers, receivers) {
    for(var j=0; j<givers.length; j++) {
        if(givers[j].isOkReceiver(receivers[0]) && giver.isOkReceiver(givers[j].receiverName)) {                            
            madeASwap = true;
            let tempRecieverName = givers[j].receiverName;
            givers[j].receiverName = receivers[0];
            giver.receiverName = tempRecieverName;
            receivers.splice(0, 1);
            return true;
        }
    }
    return false;
}

module.exports = makematchesBody;