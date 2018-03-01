// db.js
const { Pool, Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'goodshepherddb',
    password: 'master',
    port: 5433,
  })

client.connect();
const query = client.query('CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(40) not null, password VARCHAR(100))', (err, res) =>{
    console.log(err, res)
    client.end()
});
