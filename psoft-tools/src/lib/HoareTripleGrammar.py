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
"""



NUM_OPERATORS = ["+", "-", "*", "/", "%"]
GREATER_THAN = ["<=", "<"]
STATEMENT_OPERATORS = [">=", "<=", "<", ">", "==", "%", "!="]
AND_OR = ["||", "&&"]
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

def genGreaterThan():
    return random.choice(GREATER_THAN)

def genAndOr():
    return random.choice(AND_OR)

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
        return f"{genTerm()} * {genFactor()}"
    elif randNum < 0.3:
        return f"{genTerm()} / {genFactor()}"
    else:
        return f"{genFactor()}"
    
def genExpression():
    randNum = random.random()
    if randNum < 0.25:
        return f"{genExpression()} + {genTerm()}"
    elif randNum < 0.5:
        return f"{genExpression()} - {genTerm()}"
    else:
        return f"{genTerm()}"

def genCondition():
    randNum = random.random()
    if randNum < 0.25:
        return f"{genConstant()} {genGreaterThan()} {genVariable()} {genGreaterThan()} {genConstant()}"
    elif randNum < 0.625:
        return f"{genVariable()} {genStatementOp()} {genVariable()}"
    else:
        return f"{genVariable()} {genStatementOp()} {genVariable()} {genAndOr()} {genCondition()}"

def genCode():
    randNum = random.random()
    if randNum < 0.4:
        return f"{genVariable()} = {genExpression()}; {genCode()}"
    else:
        return f"{genVariable()} = {genExpression()};"
    
def genHoareTriple():
    return f"{{{genCondition()}}} {genCode()} {{{genCondition()}}}"


print(genHoareTriple())


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
    
