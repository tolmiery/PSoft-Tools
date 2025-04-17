import random
import string
import HoareTripleTemplate
import sys

""" 
Grammar rules:

expression  ->  expression + term | numExpression - term | term
term        ->  term * factor | term / factor | factor 
factor      ->  (expression) | number | variable
variable    ->  a | b | ... | y | z
number      ->  -10 | -9 | ... | 9 | 10

condition   ->  number statementOp variable statementOp number | variable statementOp variable | variable statementOp number
code        ->  variable = expression
boolean     ->  true | false | condition 
"""

# Generating terminal constants, return as a string
def genConstant():
    return random.randint(-10,10)

# Generate terminal operators for boolean statements, return as a string
def genStatementOp():
    return random.choice(HoareTripleTemplate.getStatementOp())

# Generate terminal variable, return as a string
def genVariable():
    return random.choice(HoareTripleTemplate.getVariables())

#returns either "<" or "<=", return as a string
def genLesserThan():
    return random.choice(HoareTripleTemplate.getLesserThan())

#returns either "&&" or "||", return as a string
def genAndOr():
    return random.choice(HoareTripleTemplate.getAndOr())

#returns either "true" or "false", return as a string
def genBool():
    return random.choice(HoareTripleTemplate.getBool())
"""
Factors are where we stop adding operations to our grammar.
Factors are either variables (x,y,z), constants (-10 to 10), or expressions
10% of the time, a factor will generate an expression
45% of the time a factor will be a constant, and the other 45% of the time it will be a variable

All values returned will be strings
"""
def genFactor():
    randNum = random.random()
    if randNum < 0.1:
        return f"{genExpression(2)}"
    elif randNum < .55:
        return f"{genConstant()}"
    else:
        return f"{genVariable()}"

"""
Terms are used to add either multiplication or division to our expression
Since terms are generated at least two times per genExpression() call, the percent change for term to recur is low
Input i is an int used to keep track of recursive depth.
genTerm() will return a string

if the recursive depth is less than 5:
15% of the time, term will produce a recursive call * a factor.
15% of the time, term will produce a recursive call / a factor.
the other 70% of the time, term will just produce a factor.

if the recursive depth is at 5, term will always produce a factor
"""

def isNegative(expression):
    # If the expression starts with parentheses, skip them and check inside
    i = 0
    while expression[i] == "(": i += 1
    return expression[i] == "-"

def pseudoAbsolute(expression):
    i = 0
    while expression[i] == "(": i += 1
    if expression[i] == "-":
        # Remove the negative sign
        expression = expression[0:i] + expression[i+1:]
    return expression

def genTerm(i):
    i = i+1
    if i < 5:
        randNum = random.random()
        if randNum < 0.3:
            #make sure we don't divide by 0 + multiplication by 0 is not interesting
            second = genFactor()
            while second == "0":      
                second = genFactor()
            first = genTerm(i)
            if len(first) > 3 and first[0] != "(":
                    first = f"({first})"
            if len(second) > 3 and second[0] != "(":
                second = f"({second})"
            if randNum < 0.15:
                while first == "0":
                    first = genTerm(i)
                return f"{first} * {second}"
            else:
                while first == second or first == "0":
                    first = genTerm(i)
                if isNegative(first) and isNegative(second):
                    #if both are negative, return positive
                    first = pseudoAbsolute(first)
                    second = pseudoAbsolute(second)
                return f"{first} / {second}"
    
    return f"{genFactor()}"

"""
Expressions are used in this grammar to include either addition or subtraction to our expression.
Input i is an int used to keep track of recursive depth.
Recursive will stop at 4 in genExpression(), and will let genTerm() execute one more time.
genExpression() will return a string.

if the recursive depth is less than 4:
12.5% of the time, genExpression() will produce a recursive call + a term.
12.5% of the time, genExpression() will produce a recursive call - a term.
12.5% of the time, genExpression() wont recur and will produce a term + a term.
12.5% of the time, genExpression() wont recur and will produce a term - a term.
the other 50% of the time, genExpression() will just produce a term.

if the recursive depth is at least 4, genExpression() will always produce a term
"""
def genExpression(i):
    i = i+1
    #stop at recursion depth of 4 if not already finished
    if i < 4:
        randNum = random.random()
        second = genTerm(i)
        while second == "0":
            #additions and subtractions with 0 are not interesting
            second = genTerm(i)
        if randNum < 0.5:
            if randNum < 0.25:
                #branch to recurr genExpression again
                first = genExpression(i)
                while first == "0":
                    #additions and subtractions with 0 are not interesting
                    first = genExpression(i)
            else:
                #branch to not recur genExpression again, and only do addition with terms.
                first = genTerm(i)
                while first == "0":
                    #additions and subtractions with 0 are not interesting
                    first = genTerm(i)
            if randNum < 0.375:
                return f"{first} + {pseudoAbsolute(second)}"
            else:
                return f"{first} - {pseudoAbsolute(second)}"
    return f"{genTerm(i)}"

"""
genConditionStart() starts the recursive call for pre and post conditions.
This function is used to include booleans as conditions.
A seperate function is optimal as it prevents conditions like "true <= x" from being generated

7.5% of the time, a boolean is the condition. This is returned as a string, ie: "true" or "false"
Otherwise genCondition() is called.
"""
def genConditionStart():
    if random.random() < 0.075:
        return f"{genBool()}"
    else:
        return f"{genCondition()}" 

"""
genCondition() will return a string that will be a complete boolean expression that may or may not be valid. 
ifElse parameter defaulted to False, unless passed True by genIfElse. Used to know when to prevent recurrsion for if statement conditions.


25% of the time, a condition bounding a variable between two numbers is generated.
25% of the time, genCondition() creates a condition bounding a variable by another variable, either with <, <=, >, >=, or ==.
25% of the time, genCondition() creates a condition bounding a variable by a constant, either with <, <=, >, >=, or ==.
The other 25% of the time, genCondition() creates a variable bounded by another variable, "&&" or "||", and a recursive call of genCondition()


"""
def genCondition(ifElse = False):
    randNum = random.random()
    if ifElse:
        #ifElse boolean used to check if this is to generate a condition to enter an if else statement
        while randNum >= 0.75:
            #force randNum to be less than .75, preventing recurrsion so we dont have long conditions.
            randNum = random.random()
    if randNum < 0.25:
        first = genConstant()
        second = genConstant()
        while first >= second:
            first = genConstant()
            second = genConstant()
        return f"{first} {genLesserThan()} {genVariable()} {genLesserThan()} {second}"
    elif randNum < 0.50:
        first = genVariable()
        second = genVariable()
        while first == second:
            second = genVariable()
        return f"{first} {genStatementOp()} {second}"
    elif randNum < 0.75:
        return f"{genVariable()} {genStatementOp()} {genConstant()}"
    else:
        first = genVariable()
        second = genVariable()
        while first == second:
            second = genVariable()
        return f"{first} {genStatementOp()} {second} {genAndOr()} {genCondition()}"

"""
Will return an if else block with exactly one condition in the if statement, and at least one line of code inside each indented block.
True paramaters are given to other generators so they know to handle them differently.
"""
def genIfElse():
    randNum = random.random()
    if randNum < .667:
        return f"if ({genCondition(True)}) {{\n\t{genCode(True)}\n}}"
    else:
        return f"if ({genCondition(True)}) {{\n\t{genCode(True)}\n}} else {{\n\t{genCode(True)}\n}}"

""" 
Will return one string consisting of one line of java code in the format of "variable = expression;"
genLine() sets i=0 as input for genExpression() to keep track of recursive depth for each expression.
"""
def genLine():
    var = genVariable()
    expression = genExpression(0)
    while var == expression:
        expression = genExpression(0)
    return f"{var} = {expression};"

"""
Will return one string that will include at least one line of java code.
ifElse parameter defaulted to False, unless passed True by genIfElse. Used to know when to indent lines or when to generate if else blocks.

40% of the time genCode() will create a line of code followed by further generation of code. Maximum of 4 lines are generated.
60% of the time, genCode() will create a single line of code and stop.
"""

def genCode(ifElse = False):
    lines = []
    nextLine = genLine()
    #make sure no more than 4 lines generated
    while len(lines) < 4:
        randNum = random.random()
        # 27.5% of the time, generate an if statement, unless already in one. > 0.875 or < 0.15, so we get if else blocks with and without code after.
        if (randNum > 0.875 or randNum < 0.15) and (not ifElse):
                nextLine = genIfElse()
        else:
            # Dont need to check this if last line was an if else block
            # If the variable of the current code segment is the same as the previous one, generate a new one
            # If we had code segments which assigned values to the same variable immediately after each other, first code segment would be meaningless
            if len(lines) > 0:
                while lines[len(lines)-1][0] == nextLine[0]:
                    nextLine = genLine()
        lines.append(nextLine)
        # 60% of the time, stop generating code
        if randNum < 0.6:
            break
    if ifElse:
        # If code generated is in an if else block, indent each line
        return "\n\t".join(lines)
    return "\n".join(lines)

"""
Helper function for genForwardReasoning() and genBackwardReasoning().
This function generates 1-2 code segments with genCode, and finds the longest line in each segment to use for the separator width.
Returns the longest line length as an int.

"""

def genHelper(condition, codeSegments):
    length = random.randint(1, 2)
    for _ in range(length):
        # Generate a code segment and store it in the list
        codeSegment = genCode()
        codeSegments.append(codeSegment)
    # Find the longest line (for separator width)
    maxCodeLength = len(condition) +2
    for codeSegment in codeSegments:
        # Split each code segment into lines and find the longest line in each segment
        maxCodeLength = max(maxCodeLength, max(len(line) for line in codeSegment.split("\n")))
    return maxCodeLength

#Start of recursion for Hoare Triples.
#Returns a string in the format "{P} code; {Q}", where P and Q are pre and post condtions respectively.
def genHoareTriple():
    return f"{{{genConditionStart()}}}\n{genCode()}\n{{{genConditionStart()}}}\n"


"""
genForwardReasoning() and genBackwardReasoning() are used to generate forward and backward reasoning respectively.
genForwardReasoning() will return a string in the format of "{P}\ncode;\n{-}\ncode; ... \n{-}"
genBackwardReasoning() will return a string in the format of "{-}\ncode;\n{-}\ncode; ... \n{Q}"

"""

def genForwardReasoning():
    start = genConditionStart()
    output = f"{{{start}}}\n"
    codeSegments = []  # List to store all generated code segments
    maxCodeLength = genHelper(start, codeSegments)  # Find the longest line (for separator width) while generating code segments
    # Build the output with separators of the appropriate length
    for codeSegment in codeSegments:
        if(codeSegment[-1]!="\n"):
            codeSegment+= f"\n" # Some code segments dont end in a newline, this checks and fixes so the following loop works
        i=0
        while(i<len(codeSegment)):  
            i=codeSegment.find("\n", i)+1
            if(i==0): 
                break
            codeSegment = f"{codeSegment[:i]}{{{'-' * (maxCodeLength-2)}}}\n{codeSegment[i:]}" # Add separator after index of "\n"
            i+=maxCodeLength+1 # Update i to index after "\n" in new seperator
        output += f"{codeSegment}"
    return output

def genBackwardReasoning():
    end = genConditionStart()
    output = f""
    codeSegments = []  # List to store all generated code segments
    maxCodeLength = genHelper(end, codeSegments)  # Find the longest line (for separator width) while generating code segments
    # Build the output with separators of the appropriate length

    for codeSegment in codeSegments:
        codeSegment = f"{{{'-' * (maxCodeLength-2)}}}\n{codeSegment}" # Add separator at start
        if(codeSegment[-1]!="\n"):
            codeSegment+= f"\n" # Some code segments dont end in a newline, this checks and fixes so the following loop works
        i = codeSegment.find("\n")+1 # Start after first separator
        while(i<len(codeSegment)):  
            i=codeSegment.find("\n", i)+1
            if(i==0 or i>=len(codeSegment)): 
                break
            codeSegment = f"{codeSegment[:i]}{{{'-' * (maxCodeLength-2)}}}\n{codeSegment[i:]}" # Add separator after index of "\n"
            i+=maxCodeLength+1 # Update i to index after "\n" in new seperator
        output += f"{codeSegment}"
        #output += f"{{{'-' * (maxCodeLength-2)}}}\n{codeSegment}\n"
    output += f"{{{end}}}"
    return output
        
#post process indentation issues with the generated code
def adjustIndentation(code):
    adjusted_lines = []
    in_block = False
    for line in code.splitlines():
        stripped = line.strip()
        # First handle separators 
        if stripped.startswith('{') and stripped.endswith('}') and len(stripped) > 2:
            dash_part = stripped[1:-1]
            if all(c == '-' for c in dash_part):
                new_dash_count = len(dash_part) - 4 if in_block else len(dash_part)
                new_dash_count = max(0, new_dash_count)  # avoid negative dashes
                new_separator = '{' + ('-' * new_dash_count) + '}'
                if in_block:
                    adjusted_lines.append('\t' + new_separator)
                else:
                    adjusted_lines.append(new_separator)
                continue

        # Detect if/else block entry
        if ('if' in stripped or 'else' in stripped) and '{' in stripped:
            in_block = True
        elif stripped == '}':
            in_block = False
        adjusted_lines.append(line)
    return '\n'.join(adjusted_lines)


if __name__ == "__main__":
    if(int(sys.argv[1])==1):
        print(adjustIndentation(genHoareTriple()))
            
    if(int(sys.argv[1])==2):
        print(adjustIndentation(genForwardReasoning()))

    if(int(sys.argv[1])==3):
        print(adjustIndentation(genBackwardReasoning()))

