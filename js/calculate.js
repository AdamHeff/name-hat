// Constructor for a person with all it's properties
function PersonInfo(name, fam) {
    this.name = name;
    this.fam = fam;
    this.receiverName = undefined;
    this.taken = false;

    this.inFamily = function(receiver) {
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

        var idx = Math.floor(randomFunc() * personInfos.length);
        for(var i=0; i<personInfos.length; i++) {

            // Is the person in the same family? (Including self)? Is the person taken?
            if (giverInfo.inFamily(personInfos[idx].name) || personInfos[idx].taken) {
                idx++;
                if (idx >= personInfos.length) {
                    idx = 0;
                }
                if (i == personInfos.length-1) {

                    // We went through the whole list and didn't find a match. Try a last ditch swap
                    unmatchableList = true;
                    
                    // There could be more than one notTakenInfo, but the algorithm meets the requirements anyway.
                    var notTaken = personInfos.find(function (x) {
                        return x.taken == false;
                    });
                    for(var j=0; j<personInfos.length; j++) {
                        if (personInfos[j].receiverName != undefined &&
                            !notTaken.inFamily(personInfos[j].name) &&
                            !giverInfo.inFamily(personInfos[j].receiverName)) {
                            
                            unmatchableList = false;
                            let tempRecieverName = personInfos[j].receiverName;
                            personInfos[j].receiverName = notTaken.name;
                            notTaken.taken = true;
                            giverInfo.receiverName = tempRecieverName;
                            break;
                        }
                    }
                }
            } else {
                giverInfo.receiverName =  personInfos[idx].name;
                personInfos[idx].taken = true;
                break;
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