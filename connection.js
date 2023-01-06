const mysql = require('mysql2')

let db = mysql.createConnection({
    user: 'root', 
    password: 'Bummer13',
    port: 3306,
    host: 'localhost',
    database: 'employee_db'
})


db.connect((err) => {
    if(err) throw err
    console.log(' Connected dawg')
})

module.exports = db