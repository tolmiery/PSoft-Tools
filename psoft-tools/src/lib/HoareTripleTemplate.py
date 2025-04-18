import random
import string
import operator as op
ops = {
    '+': op.add,
    '-': op.sub,
    '*': op.mul,
    '/': op.truediv,
    '%': op.mod
}

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



NUM_OPERATORS = ["+", "-", "*", "/", "%"]
LESSER_THAN = ["<=", "<"]
STATEMENT_OPERATORS = [">=", "<=", "<", ">", "==", "!="]
AND_OR = ["||", "&&"]
BOOL = ["true", "false"]
#VARIABLES = {"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"}
VARIABLES = ["x", "y", "z"]


#returns a list with all number operators
def getNumOp():
    return NUM_OPERATORS

#returns a list with "<" and "<="
def getLesserThan():
    return LESSER_THAN

#returns a list with all boolean statement operators except conjunctions
def getStatementOp():
    return STATEMENT_OPERATORS

#returns a list with "&&" and "||"
def getAndOr():
    return AND_OR

#returns a list with "true" and "false"
def getBool():
    return BOOL

#returns a list with all varibles
def getVariables():
    return VARIABLES


"""Class to represent an expression to be assigned to a variable in Hoare Triple Generation.
    The factors are numbers and variables, while the operators are the arithmetic operators.
    We map a pair of factors to their operator.
    """
class Expression:
    factors = []  # list of factors (numbers and variables)
    operators = []  # list of operators (arithmetic operators) should be len(factors) - 1 unless both empty
    def __init__(self, factors, operators):
        self.factors = factors
        self.operators = operators

    def __str__(self):
        expString = ""
        for i in range(len(self.factors)):
            expString += str(self.factors[i])
            if i < len(self.operators):
                expString += " " + str(self.operators[i]) + " "
        return expString
    
    def hasMultiplication(self):
        """Returns true if the expression has a multiplication operator."""
        return "*" in self.operators
    
    def hasDivision(self):
        """Returns true if the expression has a division operator."""
        return "/" in self.operators
    
    def hasAddition(self):
        """Returns true if the expression has an addition operator."""
        return "+" in self.operators
    
    def hasSubtraction(self):
        """Returns true if the expression has a subtraction operator."""
        return "-" in self.operators
    
    def condense(self):
        """Condenses the expression by removing any redundant operators.
        Do we care about PEMDAS? maybe."""
        condensed_factors = []
        condensed_operators = []
        for i in range(len(self.factors)-1):
            if self.operators[i] == "*" or self.operators[i] == "/":
                try:
                    condensed_factor = str(ops[self.operators[i]](int(self.factors[i]), int(self.factors[i+1])))
                    condensed_factors.append(condensed_factor)
                except:
                    if self.factors[i] == self.factors[i+1]  and self.operators[i] == "/":
                        condensed_factors.append("1")
                    else:
                        condensed_factors.append(str(self.factors[i]))
                        condensed_factors.append(str(self.factors[i+1]))
                        condensed_operators.append(self.operators[i])
        for i in range(len(condensed_factors)-1):
            if condensed_operators[i] == "+" or condensed_operators[i] == "-":
                try:
                    condensed_factor = str(ops[condensed_operators[i]](int(condensed_factors[i]), int(condensed_factors[i+1])))
                    condensed_factors.append(condensed_factor)
                except:
                    if condensed_factors[i] == condensed_factors[i+1]  and condensed_operators[i] == "-":
                        condensed_factors.append("0")
                    elif condensed_factors[i] == condensed_factors[i+1]  and condensed_operators[i] == "+":
                        condensed_factors.append("2" + str(condensed_factors[i]))
                    else:
                        condensed_factors.append(str(condensed_factors[i]))
                        condensed_factors.append(str(condensed_factors[i+1]))
                        condensed_operators.append(condensed_operators[i])
                