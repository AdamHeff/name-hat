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
    names.forEach(giver => {
        let origIndex = Math.floor(Math.random() * names.length);
        let currIndex = origIndex;

        // Find a match
        let matchFound = false;
        while(matchFound == false) {
            var receiver = names[currIndex];
            // Is the person in the same family? (Including self)? Is the person taken?
            if(inFamily(families, receiver) || alreadyTaken(names, receiver)) {
                currIndex++;
                if(currIndex >= names.length) {
                    currIndex = 0;
                }
                if(currIndex == origIndex) {
                    // We went through the whole list and didn't find a match. Start over.
                    //todo: handle
                }
            }
            else {
                matchFound = true;
            }
        }

        var match = new Object();
        match.giver = giver;
        match.receiver = receiver;
        matches.push(match);
    })

    var response = new String();
    matches.forEach(match => {
        response += match.giver + " -> " + match.receiver + "\n";
    });
    
    return response;
}

function inFamily(families, receiver) {
    //todo: finish
    return false;
}

function alreadyTaken(names, receiver) {
    //todo: finish
    return false;
}