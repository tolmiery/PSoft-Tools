// requires that the java code be in the form {pre} code {post}
export default function dafnyParser(triple: String) {
    // Regex to find valid variable names
    const validDafnyVarRegex = /[a-zA-Z?'][a-zA-Z_?'0-9]*/g;
    // Realistically, we don't need to account for most keywords, only those that should be present in a hoare triple
    const keywords = ["if", "else", "true", "false"];
    console.log(`Code: ` + triple);
    const hoareTriple = triple.split(/\n/g).filter(Boolean); // [pre, code, post]
    // Remove the brackets from the pre/postcondition
    let precondition = hoareTriple[0].split(/{([^}]*)}/g).filter(Boolean)[0].trim();
    let postcondition = hoareTriple[hoareTriple.length - 1].split(/{([^}]*)}/g).filter(Boolean)[0].trim();
    let resultCode: string = "";
    let methodHeader: string = "method test(";
    // each variable in the precondition should be an argument to the Main method.
    // each variable in the postcondition should be a new variable that should be declared in returns.
    // statements can easily be parsed into dafny statements but we cannot use the same variable
    // names as in the method header, so add on `_method` to whatever variable name is used from the precondition.
    // e.g. if the java code uses variables a and b, name them a_method and b_method so we can use their values in 
    // the dafny code

    // find how many variables exist in the precondition
    let preVariables: Set<string> = new Set(precondition.match(validDafnyVarRegex));
    // Remove any keywords (likely true and false)
    for (var keyword of keywords) {
        preVariables.delete(keyword);
    }
    let counter: number = 0;
    for (var variable of preVariables) {
        methodHeader += variable + "_pre: int";
        counter += 1;
        if (counter !== preVariables.size) {
            methodHeader += ",";
        }
    }
    methodHeader += ") ";

    // To ensure all variables are defined, we tell Dafny to return any variables found in the method body and postcondition
    let postVariables: Set<string> = new Set<string>(postcondition.match(validDafnyVarRegex));
    for (let i = 1; i < hoareTriple.length - 1; ++i) {
        postVariables = new Set<string>([...postVariables, ...new Set(hoareTriple[i].match(validDafnyVarRegex))]);
    }
    // Remove all keywords from postVariables
    for (var keyword of keywords) {
        postVariables.delete(keyword);
    }
    // Build our returns clause
    methodHeader += "returns (";
    counter = 0;
    for (var postVariable of postVariables) {
        counter++;
        methodHeader += postVariable + ": int";
        if (counter !== postVariables.size) {
            methodHeader += ",";
        }
    }
    methodHeader += ")\n";

    // find and replace each preVariable in the precondition with "<preVariable>_pre"
    for (var preVariable of preVariables) {
        precondition = precondition.replace(new RegExp(preVariable, 'g'), preVariable + "_pre");
    }
    // put in pre and postcondition
    methodHeader += "requires " + precondition + "\n";
    methodHeader += "ensures " + postcondition   + "\n{\n";

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
            if (hoareTriple[i][j] === "=" || hoareTriple[i][j] === "!" ) {
                // Check for '==' or '=' or '!='
                if (hoareTriple[i][j + 1] === "=") {
                    // if this is an 'a == b' or 'a != b' statement, print current char and increment j
                    methodBody += hoareTriple[i][j++];
                }
                else if (hoareTriple[i][j] === "=") {
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