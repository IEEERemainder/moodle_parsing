import json
data = json.load(open(r"C:\Users\Paul\Downloads\resultGIA.json", encoding="utf-8"))
header = """<html><head><meta charset="utf-8" /></head><body><table border="1">"""
footer = """</table></body></html>"""
lines = []
for row in data:
    obj = row["data"]
    if type(obj) == type([]):
        if type(obj[0]) == type([]): # match
            obj = "<br>".join([f"{x[0]} - {x[1]}" for x in obj])
        elif type(obj[0]) == type({}):
            obj = "<br>".join([x["option"] for x in obj if x["checed"]])
    lines.append(f"<tr><td>{row['text']}</td><td>{row['status']}</td><td>{obj}</td></tr>".replace("\n", "<br>").replace("\xa0", " ").replace("\t", "    "))
result = header + ''.join(lines) + footer
with open(r"C:\Users\Paul\Downloads\lmao.html", mode="w", encoding="utf-8") as file:
    file.write(result)
