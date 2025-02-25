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