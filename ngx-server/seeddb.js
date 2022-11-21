// Importing the installed node packages
const sqlite3 = require('sqlite3').verbose()
const fetch = require('node-fetch');

// Connecting to the created database file with read and write permissions
const database = new sqlite3.Database('./database/dummySalesData.db', sqlite3.OPEN_READWRITE, (error) => {
    if(error){
        console.log(error.message)
    }
    else{
        console.log("Successfully established a database connection")
    }
})

// Fetching the dummy sales data from a GitHub repository and inserting it into the SQLite database
fetch("https://raw.githubusercontent.com/kimanikevin254/dummy-sales-data/main/salesdata.json")
    .then(res => res.json())
    .then((json) =>
    database.serialize(() => {
            // Create a table to store the dummy sales data with the specified fields
            database.run("CREATE TABLE dummySales(region, manager, salesman, item, units, unitPrice, saleAmt)")
            
            // SQL statement for inserting the fetched dummy sales data into the SQLite database
            const insertStmt = database.prepare("INSERT INTO dummySales VALUES (?, ?, ?, ?, ?, ?, ?)")
            
            // Looping through the fetched sales data and inserting it into the SQLite database
            for(let i=0; i<json.salesData.length;i++){
                insertStmt.run(json.salesData[i].Region, json.salesData[i].Manager, json.salesData[i].SalesMan, json.salesData[i].Item, json.salesData[i].Units, json.salesData[i].Unit_price, json.salesData[i].Sale_amt)
            }
        
            insertStmt.finalize()
            
            // Read data from the DB and display it in the console
            database.each("SELECT region, manager, salesman, item, units, unitPrice, saleAmt FROM dummySales", (err, row) => {
                console.log(row.region, row.manager, row.salesman, row.item, row.units, row.unitPrice, row.saleAmt)
            })
        })
    )
    // Closing the database connection
    .then(() => database.close())
