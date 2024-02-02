const express = require('express')
const app = express()
const path = require('path')
const PORT = 3000
const mysql = require('mysql');


//connect
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : "classicmodels"
  });
  
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
   })

//app set
app.set('views','./views');
app.set('view engine', 'ejs');

//app start
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });

//app use
app.use(express.static("static"))
app.use("/js",express.static(__dirname+"static/js"))
app.use("/css",express.static(__dirname+"static/css"))


//app get
app.get('/', (req, res) => {
    let sql = "SELECT * FROM customers";
    db.query(sql, function (err, result) {
      if (err) {
        console.error("Error retrieving data from MySQL:", err);
        return res.status(500).send("Internal Server Error");
      }
  
      res.render('admin', { data: result });
      
    });
  });

