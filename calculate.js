function calculate(families) {

    // Copy all the names into a straight list
    let names = new Array();
    families.forEach(fam => {
        fam.forEach(person => {
            names.push(person);
        })
    });

    // Go through the list, generate a random match.
    let matches = new Array();
    //names.forEach(giver => {
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

                // If we still didn't find a match, just bail all the way out.
                return "Error: couldn't find matches.";
            }

            var match = new Object();
            match.giver = giver;
            match.receiver = receiver;
            matches.push(match);
        })
    })

    var response = new String();
    matches.forEach(match => {
        response += match.giver + " -> " + match.receiver + "\n";
    });
    
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

function alreadyTaken(names, receiver) {
    //todo: finish
    return false;
}