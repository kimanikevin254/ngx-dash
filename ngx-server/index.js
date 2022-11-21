// Importing the required dependencies
const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require("cors")

// Creating an instance of the server
const app = express()
// Enabling all CORS requests
app.use(cors())
// Specifying the port
const port = 3000

// Create a route that allows the GET HTTP method
app.get('/dummySales', (req, res) => {
    // The SQL statement for fetching all the dummy sales data from the database
    const fetchSqlStmt = "SELECT * FROM dummySales"

    // Establishing a database connection with read-only permission
    const database = new sqlite3.Database('./database/dummySalesData.db', sqlite3.OPEN_READONLY, (err) => {
        if(err){
          console.log(err.message)
        }
        else{
          console.log("Database connection successfully established")
        }
    })

    // Fetching all the dummy sales using the specified SQL statement
    database.all(fetchSqlStmt, (err, rows) => {  
            // sending it back to the client
            res.send(rows)
            //closing the database connection
            database.close()
    })
})

app.listen(port, () => {
  console.log(`Server running: http://localhost:${port}`)
})
