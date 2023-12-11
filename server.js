const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new sqlite3.Database('formdata.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database');
  }
});

// Create a table for storing form data
db.run('CREATE TABLE IF NOT EXISTS formdata (id INTEGER PRIMARY KEY, formData TEXT, hashedKey TEXT)');

// Handle POST request to save form data and hashed key
app.post('/saveData', (req, res) => {
  const formData = JSON.stringify(req.body.formData);
  const hashedKey = req.body.hashedKey;

  db.run('INSERT INTO formdata (formData, hashedKey) VALUES (?, ?)', [formData, hashedKey], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error saving data to database');
    } else {
      res.status(200).send('Data saved successfully');
    }
  });
});

// Handle POST request to verify key
app.post('/verifyKey', (req, res) => {
  const keyToVerify = req.body.key;

  db.get('SELECT * FROM formdata WHERE hashedKey = ?', [keyToVerify], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error verifying key');
    } else {
      if (row) {
        const formData = JSON.parse(row.formData);
        res.status(200).json({ success: true, formData });
      } else {
        res.status(404).json({ success: false, message: 'Key not found' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
