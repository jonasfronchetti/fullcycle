const express = require('express');
const axios = require('axios').default;
const mysql = require('mysql');

const app = express();
const port = 3000;

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'nodedb',
  database: 'nodedb',
};

app.get('/', (_req, res) => {
  addGetName(res);
});

app.listen(port, () => {
  console.log('Application running ');
});

async function addGetName(res) {
  const connection = mysql.createConnection(dbConfig);
  const insert = `INSERT INTO people(name) values('Jonas')`;

  connection.query(insert);

  const sql = 'SELECT id, name FROM people';

  connection.query(sql, (error, results) => {
    if (error) {
      console.log('Error getting people');
      res.status(500).send('Error getting people');
      return;
    }

    const tableRows = results
      .map(
        (person) => `
        <tr>
          <td>${person.id}</td>
          <td>${person.name}</td>
        </tr>
      `
      )
      .join('');
    const table = `
      <table>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>${tableRows}
      </table>`;

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      ${table}
    `);

    connection.end();
  });
}
