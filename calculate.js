function calculate(families) {
    // Copy all the names into a straight list
    var names;
    families.forEach(fam => {
        fam.forEach(person => {
            names.push(person);
        })
    });

    // Go through the list, generate a random match.
    Math.floor(Math.random() * names.length);

    // Test the match on 3 criteria. If it fails, try agian.

    // If there is someone extra left over, try the whole thing again.
}
