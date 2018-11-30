function PersonInfo(name, fam) {
    this.taken = false;
    this.name = name;
    this.fam = fam;
    this.receiverName = undefined;
    this.isInFamily = function(receiver) {
        let returnVal = false;
        this.fam.forEach(function (person) {
            if (receiver == person) {
                returnVal = true; //todo: need a break and/or a return from right here. Consider a different for loop,
                //todo: like this: //var divs = document.getElementsByTagName('div');
                                    //for (var i = 0, div; div = divs[i]; i++) {...}
            }
        });
        return returnVal;
    }
}



function calculate(families) {

    // Copy all the people into an array of objects
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

        var receiverInfo = undefined;
        var origIndex = Math.floor(Math.random() * personInfos.length);
        var currIndex = origIndex;

        // Find a match
        var innerloop = true;
        var matchFound = false;
        while (innerloop) {
            receiverInfo = personInfos[currIndex];
            // Is the person in the same family? (Including self)? Is the person taken?
            if (giverInfo.isInFamily(receiverInfo.name) || receiverInfo.taken) {
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
            var matchFriend = undefined;
            personInfos.forEach(function (person) {
                if (!notTakenInfo.isInFamily(person.name) && !giverInfo.isInFamily(person.receiverName)) {
                    matchFriend = person;
                    //todo: need a break here.
                }
            });

            if (matchFriend != undefined) {
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
        //todo: can this be simplified with this? var myArray = new Array('Wind', 'Rain', 'Fire'); var list = myArray.join(' - '); // list is "Wind - Rain - Fire"
        personInfos.forEach(function (person) {
            response += person.name + " -> " + person.receiverName + "\n";
        });
    }
    return response;
}