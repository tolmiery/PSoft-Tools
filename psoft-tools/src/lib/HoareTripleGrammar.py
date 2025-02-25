import random
import string

""" 
expression  ->  expression + term | numExpression - term | term
term        ->  term * factor | term / factor | factor 
factor      ->  (expression) | number | variable
variable    ->  a | b | ... | y | z
number      ->  -10 | -9 | ... | 9 | 10

condition   ->  number statementOp variable statementOp number | variable statementOp variable | variable statementOp number
code        ->  variable = expression
boolean     ->  true | false | condition 
"""



NUM_OPERATORS = ["+", "-", "*", "/", "%"]
LESSER_THAN = ["<=", "<"]
STATEMENT_OPERATORS = [">=", "<=", "<", ">", "==", "!="]
AND_OR = ["||", "&&"]
BOOL = ["true", "false"]
#VARIABLES = {"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"}
VARIABLES = ["x", "y", "z"]

# Generating terminal constants
def genConstant():
    return random.randint(-10,10)


"""# Generate terminal operators for math operations
def genNumOp():
    return random.choice(NUM_OPERATORS)"""

# Generate terminal operators for boolean statements
def genStatementOp():
    return random.choice(STATEMENT_OPERATORS)

# Generate terminal variable
def genVariable():
    return random.choice(VARIABLES)

#returns either "<" or "<="
def genLesserThan():
    return random.choice(LESSER_THAN)

#returns either "&&" or "||"
def genAndOr():
    return random.choice(AND_OR)

#returns either "true" or "false"
def genBool():
    return random.choice(BOOL)

def genFactor():
    randNum = random.random()
    if randNum < 0.1:
        return f"({genExpression()})"
    elif randNum < .55:
        return f"{genConstant()}"
    else:
        return f"{genVariable()}"
    
def genTerm():
    randNum = random.random()
    if randNum < 0.15:
        if randNum < 0.075:
            return f"{genTerm()} * {genFactor()}"
        else:
            factor = genFactor()
            while factor == 0:      
                #make sure we dont divide by 0
                factor = genFactor()
            return f"{genTerm()} / {factor}"
    elif randNum < 0.3:
        if randNum < 0.225:
            return f"{genFactor()} * {genFactor()}"
        else:
            factor = genFactor()
            while factor == 0:      
                #make sure we dont divide by 0
                factor = genFactor()
            return f"{genTerm()} / {factor}"
    else:
        return f"{genFactor()}"
    
def genExpression():
    randNum = random.random()
    if randNum < 0.25:
        if randNum < 0.125:
            return f"{genExpression()} + {genTerm()}"
        else:
            return f"{genExpression()} - {genTerm()}"
    elif randNum < 0.5:
        if randNum < 0.375:
            return f"{genTerm()} + {genTerm()}"
        else:
            return f"{genTerm()} - {genTerm()}"
    else:
        return f"{genTerm()}"

def genCondition():
    randNum = random.random()
    if randNum < 0.25:
        greater = genConstant()
        lesser = genConstant()
        return f"{genConstant()} {genLesserThan()} {genVariable()} {genLesserThan()} {genConstant()}"
    elif randNum < 0.525:
        return f"{genVariable()} {genStatementOp()} {genVariable()}"
    elif randNum < 0.775:
        return f"{genVariable()} {genStatementOp()} {genConstant()}"
    else:
        return f"{genVariable()} {genStatementOp()} {genVariable()} {genAndOr()} {genCondition()}"

def genConditionStart():
    if random.random() < 0.075:
        return f"{genBool()}"
    else:
        return f"{genCondition()}"


def genCode():
    randNum = random.random()
    if randNum < 0.4:
        return f"{genVariable()} = {genExpression()}; {genCode()}"
    else:
        return f"{genVariable()} = {genExpression()};"
    
def genHoareTriple():
    return f"{{{genConditionStart()}}} {genCode()} {{{genConditionStart()}}}"


i = 0
while i <10:
    print(genHoareTriple()+"\n")
    i = i+1


"""# Generate an expression
def genExpression():
    randNum = random.random()
    if randNum < 0.33:
        return genVariable()
    elif randNum < 0.67:
        return f"{genExpression()} {genNumOp()} {genExpression()}"
    else:
        return f"{}"

def genCondition():
    ranNum = random.random()
    if ranNum < 0.33:
        return f"{genVariable()} {genStatementOp()} {genConstant()}"
    elif(ranNum < 0.67):
        return f"{genVariable()} {genStatementOp()} {genExpression()}"
    else:
        return f"{}"
        """
    
