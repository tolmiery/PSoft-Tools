// requires that the java code be in the form {pre} code {post}
export default function dafnyParser(triple: String) {
    // Regex to find valid variable names
    const validDafnyVarRegex = /[a-zA-Z?'][a-zA-Z_?'0-9]*/g;
    // Realistically, we don't need to account for most keywords, only those that should be present in a hoare triple
    const keywords = ["if", "else"];
    console.log(`Code: ` + triple);
    const hoareTriple = triple.split(/\n/g).filter(Boolean); // [pre, code, post]
    // Remove the brackets from the pre/postcondition
    hoareTriple[0] = hoareTriple[0].split(/{([^}]*)}/g).filter(Boolean)[0].trim();
    hoareTriple[hoareTriple.length - 1] = hoareTriple[hoareTriple.length - 1].split(/{([^}]*)}/g).filter(Boolean)[0].trim();
    let resultCode: string = "";
    let methodHeader: string = "method test(";
    // each variable in the precondition should be an argument to the Main method.
    // each variable in the postcondition should be a new variable that should be declared in returns.
    // statements can easily be parsed into dafny statements but we cannot use the same variable
    // names as in the method header, so add on `_method` to whatever variable name is used from the precondition.
    // e.g. if the java code uses variables a and b, name them a_method and b_method so we can use their values in 
    // the dafny code

    // find how many variables exist in the precondition
    let preVariables: Set<string> = new Set(hoareTriple[0].match(validDafnyVarRegex));
    let counter: number = 0;
    for (var variable of preVariables) {
        methodHeader += variable + "_pre: int";
        counter += 1;
        if (counter !== preVariables.size) {
            methodHeader += ",";
        }
    }
    methodHeader += ") ";

    // get variables to return from postcondition
    let postVariables: Set<string> = new Set<string>();
    for (let i = 1; i < hoareTriple.length - 1; ++i) {
        postVariables = new Set<string>([...postVariables, ...new Set(hoareTriple[i].match(validDafnyVarRegex))]);
    }
    console.log(postVariables);

    methodHeader += "returns (";
    counter = 0;
    for (var postVariable of postVariables) {
        counter += 1;
        if (keywords.includes(postVariable)) {
            // postVariables.delete(postVariable);
            continue;
        }
        methodHeader += postVariable + ": int";
        if (counter !== postVariables.size) {
            methodHeader += ",";
        }
    }
    methodHeader += ")\n";

    // find and replace each postVariable
    for (var preVariable of preVariables) {
        hoareTriple[0] = hoareTriple[0].replace(new RegExp(preVariable, 'g'), preVariable + "_pre");
    }
    // put in pre and postcondition
    methodHeader += "requires " + hoareTriple[0] + "\n";
    methodHeader += "ensures " + hoareTriple[hoareTriple.length - 1] + "{\n";

    // add in statements
    let methodBody = "";

    // Set initial value of each postVariable in the method
    for (let postVariable of postVariables) {
        // all postVariables have "_post" appended, for simplicity
        if (preVariables.has(postVariable)) {
            // if a postVariable is part of the precondition give it the same value
            // as the corresponding preVariable
            methodBody += postVariable + " := " + postVariable + "_pre;\n";
        }
    }

    for (let i = 1; i < hoareTriple.length - 1; ++i) {
        for (let j = 0; j < hoareTriple[i].length; j++) {
            if (hoareTriple[i][j] === "=") {
                // Check for '==' or '='
                if (hoareTriple[i][j + 1] === "=") {
                    // if this is an 'a == b' statement, print this '=' and increment j
                    methodBody += hoareTriple[i][j++];
                }
                else {
                    // otherwise, this is an 'a := b' statement
                    methodBody += ':';
                }
            }
            methodBody += hoareTriple[i][j];
        }
        methodBody += '\n';
    }
    methodBody += "}";

    resultCode = methodHeader + methodBody;
    return resultCode;
}