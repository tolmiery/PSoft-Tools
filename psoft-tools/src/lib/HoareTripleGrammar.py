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
            if randNum < 0.15:
                while first == "0":
                    first = genTerm(i)
                return f"{first} * {second}"
            else:
                while first == second or first == "0":
                    first = genTerm(i)
                return f"({first} / {second})"
    
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
        if randNum < 0.25:
            #branch to recurr genExpression again
            first = genExpression(i)
            while first == "0":
                #additions and subtractions with 0 are not interesting
                first = genExpression(i)
            if randNum < 0.125:
                return f"{first} + {second}"
            else:
                return f"{first} - {second}"
        elif randNum < 0.5:
            first = genTerm(i)
            while first == "0":
                #additions and subtractions with 0 are not interesting
                first = genTerm(i)
            #branch to not recur genExpression again, and only do addition with terms.
            if randNum < 0.375:
                return f"{first} + {second}"
            else:
                return f"{first} - {second}"
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

25% of the time, a condition bounding a variable between two numbers is generated.
25% of the time, genCondition() creates a condition bounding a variable by another variable, either with <, <=, >, >=, or ==.
25% of the time, genCondition() creates a condition bounding a variable by a constant, either with <, <=, >, >=, or ==.
The other 25% of the time, genCondition() creates a variable bounded by another variable, "&&" or "||", and a recursive call of genCondition()


"""
def genCondition():
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
Start of recursion for creating expressions.
Creates expressions in java language.
Lines of code in the format of "variable = expression;"
40% of the time genCode() will create a line of code followed by a recurssive call to genCode()
60% of the time, genCode() will create a single line of code.

genCode() declares and initalizes i=0, and uses it as input for genExpression() to keep track of recursive depth for each expression.

Will return one string that will include at least one line of java code.
"""
def genCode():
    randNum = random.random()
    var = genVariable()
    expression = genExpression(0)
    while var == expression:
        expression = genExpression(0)
    if randNum < 0.4:
        return f"{var} = {expression};\n{genCode()}"
    else:
        return f"{var} = {expression};"



#Start of recursion for Hoare Triples.
#Returns a string in the format "{P} code; {Q}", where P and Q are pre and post condtions respectively.
def genHoareTriple():
    return f"{{{genConditionStart()}}}\n{genCode()}\n{{{genConditionStart()}}}\n"

def genForwardReasoning():
    start=genConditionStart()
    output = f"{{{start}}}\n"
    length = random.randint(1, 4)
    i = 0
    while i < length:
        output += f"{genCode()}\n{{{'-' * len(start)}}}\n"
        i += 1
    return output

def genBackwardReasoning():
    end = start=genConditionStart()
    output = f""
    length = random.randint(1, 4)
    i = 0
    while i < length:
        output += f"{{{'-' * len(end)}}}\n{genCode()}\n"
        i += 1
    output += f"{{{end}}}"
    return output
        

if __name__ == "__main__":
    if(int(sys.argv[1])==1):
        print(genHoareTriple())
            
    if(int(sys.argv[1])==2):
        print(genForwardReasoning())

    if(int(sys.argv[1])==3):
        print(genBackwardReasoning())
