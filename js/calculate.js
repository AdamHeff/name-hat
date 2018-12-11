// Constructor for a person with all it's properties
function PersonInfo(name, fam) {
    this.taken = false;
    this.name = name;
    this.fam = fam;
    this.receiverName = undefined;
    this.isInFamily = function(receiver) {
        for(var i=0; i<this.fam.length; i++) {
            if(receiver == this.fam[i]) {
                return true;
            }
        }
        return false;
    }
}

function calculate(families) {
    return calculateBody(families, Math.random);
}

// The main body that will output a match if at all possible.
function calculateBody(families, randomFunc) {

    //todo: adam: try having two totally different arrays (possibly with two different object types) : Givers and Receivers.
    //todo: adam: Then the receivers could be a dictionary or something... it could be an object, which I can also iterate...or not.
    //todo: adam: Start with just an array.
    var personInfos = new Array();
    families.forEach(function (fam) {
        fam.forEach(function (person) {
            var personInfo = new PersonInfo(person, fam);
            personInfos.push(personInfo);
        });
    });

    // Go through the list, generate a random match.
    var unmatchableList = false;
    personInfos.forEach(function (giverInfo) {

        var origIndex = Math.floor(randomFunc() * personInfos.length);
        var idx = origIndex;

        // Find a match
        var innerloop = true; //todo: change this to a for loop, and then I wont need the innerloop flag.
        while (innerloop) {
            // Is the person in the same family? (Including self)? Is the person taken?
            if (giverInfo.isInFamily(personInfos[idx].name) || personInfos[idx].taken) {
                idx++;
                if (idx >= personInfos.length) {
                    idx = 0;
                }
                if (idx == origIndex) {
                    // We went through the whole list and didn't find a match. Try a last ditch swap
                    innerloop = false;

                    // There could be more than one notTakenInfo, but the algorithm meets the requirements anyway.
                    unmatchableList = true;            
                    var notTakenInfo = personInfos.find(function (x) {
                        return x.taken == false;
                    });
                    for(var i=0; i<personInfos.length; i++) {
                        if (personInfos[i].receiverName != undefined &&
                            !notTakenInfo.isInFamily(personInfos[i].name) &&
                            !giverInfo.isInFamily(personInfos[i].receiverName)) {
                            
                            unmatchableList = false;
                            let tempRecieverName = personInfos[i].receiverName;
                            personInfos[i].receiverName = notTakenInfo.name;
                            notTakenInfo.taken = true;
                            giverInfo.receiverName = tempRecieverName;
                            break;
                        }
                    }
                }
            } else {
                innerloop = false;
                giverInfo.receiverName =  personInfos[idx].name;
                personInfos[idx].taken = true;
            }
        }
    });

    var response = new String();
    if (unmatchableList) {
        response = "Unable to make a match with this data.";
    } else {
        personInfos.forEach(function (person) {
            response += person.name + " -> " + person.receiverName + "\n";
        });
    }
    return response;
}

module.exports = calculateBody;