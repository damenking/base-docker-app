const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { Pool } = require('pg');

const keys = require('./keys.js');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
});

pgClient.on('error', () => console.log('Lost PG connection'));
pgClient
    .query('CREATE TABLE IF NOT EXISTS values(number INT)')
    .catch((error) => console.log(error));

app.get('/', (req, res) => {
    res.send('Success');
});

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * from values');
    res.send(values.rows);
});

app.post('/values', async (req, res) => {
    const value = req.body.value;
    pgClient.query('INSERT INTO values(number) VALUES($1)', [value]);
    res.send({ 'addedValue': value });
});

app.listen(5000, err => {
    console.log('Listening on port 5000');
});