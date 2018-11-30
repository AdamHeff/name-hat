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

    // Copy all the names into a straight list
    var personInfos = new Array();
    families.forEach(function (fam) {
        fam.forEach(function (person) {
            var personInfo = new PersonInfo(person, fam);
            // todo: also needs to have the inFamily method.
            // todo: read here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
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

/*
function displayCar() { var result = 'A Beautiful ' + this.year + ' ' + this.make + ' ' + this.model; pretty_print(result); }
where pretty_print is a function to display a horizontal rule and a string. Notice the use of this to refer to the object to which the method belongs.
You can make this function a method of Car by adding the statement
this.displayCar = displayCar;
to the object definition. So, the full definition of Car would now look like
function Car(make, model, year, owner) { this.make = make; this.model = model; this.year = year; this.owner = owner; this.displayCar = displayCar; }
Then you can call the displayCar method for each of the objects as follows:
car1.displayCar(); car2.displayCar();

// Animal properties and method encapsulation

var Animal = {
type: 'Invertebrates', // Default value of properties
displayType: function() { // Method which will display type of Animal console.log(this.type); } };

// Create new animal type called animal1 var animal1 = Object.create(Animal); animal1.displayType(); // Output:Invertebrates

// Create new animal type called Fishes
var fish = Object.create(Animal);
fish.type = 'Fishes';
fish.displayType(); // Output:Fishes

*/
//todo: adam: good object/object type example


//todo: adam: remove non ie compliant code
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