import string
import HoareTripleTemplate
import requests
import sys

if __name__ == "__main__":
    input = sys.argv[0] #set input to forward reasoning that we want verified
    inputR = input.find("}")+2
    inputL = inputR
    removeIndex = 0
    dafnyCode = input[:inputR] #initialize string dafnyCode with precondition for forward reasoning
    line = 0        #keep track of line num to let user know where mistake is
    while(inputR<len(input)):
        line += 1
        inputL = inputR
        inputR = input.find("}", inputL)+2
        dafnyCode += input[inputL:inputR]
        try:
            response = requests.post("http://localhost:3000/verify", dafnyCode) #run dafnyCode through dafny verifier. Update this if wrong
            response.raise_for_status() #honestly not sure if this works, i looked up how to do this and this is what i found
        except requests.exceptions.RequestException as e: #if dafny verifier doesnt verify, could possibly need changing
            print(f"Failed at line {line}:\n{e}") #send to output saying which line failed, and also include dafny output. 
                                                  #I dont know how to return this so i just have it as print right now, needs updating
            break
        removeIndex = dafnyCode.rfind("{")
        dafnyCode = dafnyCode[:removeIndex]  #remove most recent post condition from dafnyCode so we can append next line and new post condition
    #return that forward reasoning verified
