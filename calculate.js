function calculate(families) {

    // Copy all the names into a straight list
    var personInfos = new Array();
    families.forEach(function (fam) {
        fam.forEach(function (person) {
            var personInfo = new Object();
            personInfo.name = person;
            personInfo.taken = false;
            personInfo.fam = fam;
            personInfo.receiverName = null;

            personInfos.push(personInfo);
        });
    });

    // Go through the list, generate a random match.
    var unmatchableList = false;
    personInfos.forEach(function (giverInfo) {
        var receiverInfo = null;

        var origIndex = Math.floor(Math.random() * personInfos.length);
        var currIndex = origIndex;

        // Find a match
        var innerloop = true;
        var matchFound = false;
        while (innerloop) {
            receiverInfo = personInfos[currIndex];
            // Is the person in the same family? (Including self)? Is the person taken?
            if (inFamily(giverInfo.fam, receiverInfo.name) || receiverInfo.taken) {
                currIndex++;
                if (currIndex >= personInfos.length) {
                    currIndex = 0;
                }
                if (currIndex == origIndex) {
                    // We went through the whole list and didn't find a match. Bailout, with no match
                    innerloop = false;
                }
            } else {
                innerloop = false;
                matchFound = true;
            }
        }
        if (matchFound) {
            giverInfo.receiverName = receiverInfo.name;
            receiverInfo.taken = true;
        } else {

            // If we make it here, we need to try a swap as a last ditch effort (This is a rare case, but is most of
            // the complexity. It's when the last person draws her own name, or the name of someone in her family.)
            var notTakenInfo = personInfos.find(function (x) {
                return x.taken == false;
            });
            var matchFriend = null;
            personInfos.forEach(function (person) {
                if (!inFamily(notTakenInfo.fam, person.name) && !inFamily(giverInfo.fam, person.receiverName)) {
                    matchFriend = person;
                }
            });

            if (matchFriend != null) {
                var tempRecieverName = matchFriend.receiverName;
                matchFriend.receiverName = notTakenInfo.name;
                notTakenInfo.taken = true;
                giverInfo.receiverName = tempRecieverName;
            } else {
                unmatchableList = true;
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

function inFamily(fam, receiver) {
    var returnVal = false;
    fam.forEach(function (person) {
        if (receiver == person) {
            returnVal = true;
        }
    });
    return returnVal;
}


/*function calculate(families) {

    // Copy all the names into a straight list
    let personInfos = new Array();
    families.forEach(fam => {
        fam.forEach(person => {
            let personInfo = new Object();
            personInfo.name = person;
            personInfo.taken = false;
            personInfo.fam = fam;
            personInfo.receiverName = null;

            personInfos.push(personInfo);
        })
    });

    // Go through the list, generate a random match.
    let unmatchableList = false;
    personInfos.forEach(giverInfo => {
        let receiverInfo = null;

        let origIndex = Math.floor(Math.random() * personInfos.length);
        let currIndex = origIndex;

        // Find a match
        let innerloop = true;
        let matchFound = false;
        while(innerloop) {
            receiverInfo = personInfos[currIndex];
            // Is the person in the same family? (Including self)? Is the person taken?
            if(inFamily(giverInfo.fam, receiverInfo.name) || receiverInfo.taken) {
                currIndex++;
                if(currIndex >= personInfos.length) {
                    currIndex = 0;
                }
                if(currIndex == origIndex) {
                    // We went through the whole list and didn't find a match. Bailout, with no match
                    innerloop = false;
                }
            }
            else {
                innerloop = false;
                matchFound = true;
            }
        }
        if(matchFound) {
            giverInfo.receiverName = receiverInfo.name;
            receiverInfo.taken = true;    
        } else {

            // If we make it here, we need to try a swap as a last ditch effort (This is a rare case, but is most of
            // the complexity. It's when the last person draws her own name, or the name of someone in her family.)
            let notTakenInfo = personInfos.find(x => x.taken == false);
            let matchFriend = null;
            personInfos.forEach(person => {
                if(!inFamily(notTakenInfo.fam, person.name) && !inFamily(giverInfo.fam, person.receiverName)) {
                    matchFriend = person;
                }
            });

            if(matchFriend != null) {
                let tempRecieverName = matchFriend.receiverName;
                matchFriend.receiverName = notTakenInfo.name;
                notTakenInfo.taken = true;
                giverInfo.receiverName = tempRecieverName;
            } else {
                unmatchableList = true;
            }
        }
    })

    var response = new String();
    if(unmatchableList) {
        response = "Unable to make a match with this data."
    } else {
        personInfos.forEach(person => {
            response += person.name + " -> " + person.receiverName + "\n";
        });
    }
    return response;
}

function inFamily(fam, receiver) {
    return fam.findIndex(x => x == receiver) != -1;
}*/