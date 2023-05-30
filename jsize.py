header = "function getData() { return "
footer = "; }"
with open(r"C:\Users\Paul\Downloads\resultGIA.json", encoding="utf-8") as file:
    text = file.read()
with open(r"C:\Users\Paul\Downloads\resultGIA.js", mode="w", encoding="utf-8") as file:
    file.write(header)
    file.write(text)
    file.write(footer)
