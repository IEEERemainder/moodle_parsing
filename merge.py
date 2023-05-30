import glob, json
alreadyProcessed = []
incorrectsData = {} # store questions for incorrect and partiallycorrect statuses           
result=[]
for file in glob.glob(r"C:\Users\Paul\Downloads\moodle*.json"):
    for x in json.load(open(file, encoding="utf-8")):
        text = x["text"] 
        if text in alreadyProcessed:
            if x["status"] == "correct": continue # scip duplicates of correct answered questions
            hasCorrectAnswer = any([x for x in result if x["status"] == "correct" and x["text"] == text])
            if hasCorrectAnswer: continue
            probablyDuplicated = text in incorrectsData
            if probablyDuplicated and x["data"] in incorrectsData[text]: continue # scip duplicates of incorrect answered (we need only that have different answers)
            # don't really worc in all cases, need to strip a. and 1. and chec order of options
            if not probablyDuplicated:
                incorrectsData[text] = [x["data"]]
            else:
                incorrectsData[text].append(x["data"])
        alreadyProcessed.append(text)
        result.append(x)
result = sorted(result, key=lambda x: x["status"] + x["text"] + str(x["data"])) # sort by status, then by text, then by data
json.dump(result, open(r"C:\Users\Paul\Downloads\resultGIA.json", mode="w",encoding="utf-8"), ensure_ascii=False)
