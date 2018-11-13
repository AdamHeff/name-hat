function calculate(families) {

    // Copy all the names into a straight list
    let names = new Array();
    families.forEach(fam => {
        fam.forEach(person => {
            names.push(person);
        })
    });

    // Go through the list, generate a random match.
    let totalFailure = false;
    let matches = new Array();
    families.forEach(fam => {
        fam.forEach(giver => {    
            let origIndex = Math.floor(Math.random() * names.length);
            let currIndex = origIndex;

            // Find a match
            let doneLooping = false;
            let matchFound = false;
            while(doneLooping == false) {
                var receiver = names[currIndex];
                // Is the person in the same family? (Including self)? Is the person taken?
                if(inFamily(fam, receiver) || alreadyTaken(matches, receiver)) {
                    currIndex++;
                    if(currIndex >= names.length) {
                        currIndex = 0;
                    }
                    if(currIndex == origIndex) {
                        // We went through the whole list and didn't find a match. Bailout, with no match
                        doneLooping = true;
                    }
                }
                else {
                    doneLooping = true;
                    matchFound = true;
                }
            }

            if(!matchFound)
            {
                // If we make it here, we need to try a swap as a last ditch effort
                let notTaken = getNotTaken(matches, names);
                let matchFriend = null;
                matches.forEach(match => {
                    if(matchFriend == null) {
                        if(!inFamily(getFamily(match.giver, families), notTaken) && !inFamily(getFamily(giver, families), match.receiver)) {
                            // Perform swap
                            matchFriend = match;
                        }
                    }
                });

                if(matchFriend != null) {
                    let tempReciever = matchFriend.receiver;
                    matchFriend.receiver = notTaken;
                    receiver = tempReciever;
                } else {
                    totalFailure = true;
                }
            }

            var match = new Object();
            match.giver = giver;
            match.receiver = receiver;
            matches.push(match);
        })
    })

    var response = new String();
    if(totalFailure) {
        response = "Unable to make a match with this data."
    } else {
        matches.forEach(match => {
            response += match.giver + " -> " + match.receiver + "\n";
        });
    }
    return response;
}

function inFamily(fam, receiver) {
    let returnVal = false;
    fam.forEach(person => {
        if(receiver == person) {
            returnVal = true;
        }
    })
    return returnVal;
}

function alreadyTaken(matches, receiver) {
    let returnVal = false;
    matches.forEach(match => {
        if(match.receiver == receiver) {
            returnVal = true;
        }
    })
    return returnVal;
}

function getFamily(person, families) {
    return families.find(fam => fam.indexOf(person) > -1);
}

function getNotTaken(matches, names) {
    let returnVal = new String();
    names.forEach(name => {
        if(!alreadyTaken(matches, name)) {
            returnVal = name;
        }
    });
    return returnVal;
}