const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Everton')`
connection.query(sql)
connection.end()

app.get('/', async (req, res) => {
    const results = await getPeople()
    res.write('<h1>Full Cycle Rocks!</h1>')

    results.forEach(element => {
        res.write('<h2>' + element.name + '</h2>')
    });
    res.send()
})

async function getPeople() {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config)
        connection.query('SELECT * FROM people', function (error, results, fields) {
            if (error) {
                console.log(error)                
                reject(error)
            }
            connection.end()            
            resolve(results)
        })
    })
}

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})