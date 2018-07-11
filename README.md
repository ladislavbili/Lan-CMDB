###Vygenerovanie fake data
node fake-data-generator.js > db-test.json

###Spustenie json-server
json-server --watch db.json -p 3001
