// requires that the java code be in the form {pre} code {post}
export default function dafnyParser(triple: String) {
    // Regex to find valid variable names
    const validVarRegex = /[a-zA-Z?'][a-zA-Z_?'0-9]*/g;

    console.log(`Code: ` + triple);
    const hoareTriple = triple.split(/\n/g).filter(Boolean); // [pre, code, post]
    console.log(hoareTriple);
    // Remove the brackets from the pre/postcondition
    hoareTriple[0] = hoareTriple[0].split(/{([^}]*)}/g).filter(Boolean)[0].trim();
    console.log(hoareTriple);
    hoareTriple[hoareTriple.length - 1] = hoareTriple[hoareTriple.length - 1].split(/{([^}]*)}/g).filter(Boolean)[0].trim();
    console.log(hoareTriple);
    let resultCode: string = "";
    let methodHeader: string = "method test(";
    // each variable in the precondition should be an argument to the Main method.
    // each variable in the postcondition should be a new variable that should be declared in returns.
    // statements can easily be parsed into dafny statements but we cannot use the same variable
    // names as in the method header, so add on `_method` to whatever variable name is used from the precondition.
    // e.g. if the java code uses variables a and b, name them a_method and b_method so we can use their values in 
    // the dafny code

    // find how many variables exist in the precondition
    let preVariables: Set<string> = new Set(hoareTriple[0].match(validVarRegex));
    console.log(preVariables);
    // for (var character of hoareTriple[0]) {
    //     if ((character >= 'a' && character <= 'z') || (character >= 'A' && character <= 'Z') && !preVariables.has(character)) {
    //         preVariables.add(character);
    //     }
    // }
    let counter: number = 0;
    for (var variable of preVariables) {
        methodHeader += variable + ": int";
        counter += 1;
        if (counter !== preVariables.size) {
            methodHeader += ",";
        }
    }
    methodHeader += ") ";

    // get variables to return from postcondition
    let postVariables: Set<string> = new Set<string>();
    for (let i = 1; i < hoareTriple.length - 1; ++i) {
        for (var character of hoareTriple[i]) {
            if ((character >= 'a' && character <= 'z') || (character >= 'A' && character <= 'Z') && !postVariables.has(character)) {
                postVariables.add(character);
            }
        }
    }

    methodHeader += "returns (";
    counter = 0;
    for (var variable of postVariables) {
        methodHeader += variable + "_post: int";
        counter += 1;
        if (counter !== postVariables.size) {
            methodHeader += ",";
        }
    }
    methodHeader += ")\n";

    // put in pre and postcondition
    methodHeader += "requires " + hoareTriple[0] + "\n";
    methodHeader += "ensures ";
    for (var postCharacter of hoareTriple[hoareTriple.length - 1]) {
        methodHeader += postCharacter;
        // if we have a variable in our postcondition we append _post to it
        if (postVariables.has(postCharacter)) {
            methodHeader += "_post";
        }
    }
    methodHeader += "{\n";

    // add in statements
    // const statements = triple[1].split("\n");
    let methodBody = "";

    // Set initial value of each postVariable in the method
    for (let postVariable of postVariables) {
        // all postVariables have "_post" appended, for simplicity
        if (preVariables.has(postVariable)) {
            // if a postVariable is part of the precondition give it the same value
            // as the corresponding preVariable
            methodBody += postVariable + "_post := " + postVariable + ";\n";
        }
    }

    for (let i = 1; i < hoareTriple.length - 1; ++i) {
        for (let statementCharacter of hoareTriple[i]) {
            if (postVariables.has(statementCharacter)) {
                methodBody += statementCharacter + "_post";
            }
            else if (statementCharacter === "=") {
                methodBody += ':' + statementCharacter;
            }
            else {
                methodBody += statementCharacter;
            }
        }
        methodBody += '\n';
    }
    methodBody += "}";

    resultCode = methodHeader + methodBody;
    return resultCode;
}