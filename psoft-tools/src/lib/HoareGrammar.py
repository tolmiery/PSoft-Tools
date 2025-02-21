from lark import Lark, Transformer, v_args
# modified from https://github.com/gio54321/hoare-logic-prover
# PROBLEM: can't yet handle multiple triples in one input

def get_hoare_parser():
    hoare_grammar = """
        ?triple: "{" boolexp "}" program "{" boolexp "}"
        
        ?program: statement+
            | program statement -> composition
        
        ?statement: "if" "(" boolexp ")" "{" program "}" ("else" "{" program "}")? -> if
            | "while" "(" boolexp ")" "{" program "}" -> while
            | ";" -> skip
            | IDE "=" exp ";" -> assignment
            | TYPE IDE "=" exp ";" -> declaration
            | TYPE IDE ";" -> declaration

        ?boolexp: "(" boolexp ")"
            | "true" -> true
            | "false" -> false
            | boolexp "&&" boolexp -> and
            | boolexp "||" boolexp -> or
            | "!" boolexp -> not
            | exp "<=" exp -> le
            | exp ">=" exp -> ge
            | exp "==" exp -> eq
            | exp "!=" exp -> neq
            | exp "<" exp -> lt
            | exp ">" exp -> gt
        
        ?exp: term
            | exp "+" term -> add
            | exp "-" term -> sub

        ?term: factor
            | term "*" factor -> mul
            | term "/" factor -> div
        
        ?factor: NUMBER -> number
            | "-" factor -> neg
            | IDE -> var
            | "(" exp ")"
        
        %import common.CNAME -> IDE
        %import common.INT -> NUMBER
        %import common.WS
        %ignore WS
        
        %declare TYPE
    """
    
    return Lark(hoare_grammar, start='triple', parser='lalr')

# Test cases
def test_hoare_parser():
    parser = get_hoare_parser()
    #note: code will either end ; and be followed with { or end } and be followed with { ... use this in post grammar?
    test_cases = [
        "{ true } x = 5; y = 2; { x == 5 }",
        "{ x < 10 } while (x < 10) { x = x + 1; } { x >= 10 }",
        "{ y == 0 } if (y == 0) { y = 1; } else { y = 2; } { y > 0 }"
    ]
    
    result_triples = []
    for test in test_cases:
        try:
            #first identify the precondition with trivial matching
            #then try to parse through until hitting an end-of code indicator
            #assign indexes from end of pre to end of code indicator to code
            #then find postcondition with trivial matching
        except Exception as e:
            print(f"Test failed: {test}\nError: {e}\n")

if __name__ == "__main__":
    test_hoare_parser()
