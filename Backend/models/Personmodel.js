const mysql = require('mysql2');
require('dotenv').config(); 

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    throw err; 
  }
  console.log('MySQL connected');
});

const Person = {};

Person.create = (personData, resultCallback) => {
  const { name, email, mobileNumber, dateOfBirth } = personData;
  const sql = `INSERT INTO person (name, email, mobileNumber, dateOfBirth) VALUES (?, ?, ?, ?)`;
  db.query(sql, [name, email, mobileNumber, dateOfBirth], (err, result) => {
    if (err) {
      resultCallback(err, null);
      return;
    }
    resultCallback(null, result);
  });
};

Person.getAll = (resultCallback) => {
  db.query(`SELECT * FROM person`, (err, result) => {
    if (err) {
      resultCallback(err, null);
      return;
    }
    resultCallback(null, result);
  });
};

Person.update = (id, personData, resultCallback) => {
  const { name, email, mobileNumber, dateOfBirth } = personData;
  const sql = `UPDATE person SET name=?, email=?, mobileNumber=?, dateOfBirth=? WHERE id=?`;
  db.query(sql, [name, email, mobileNumber, dateOfBirth, id], (err, result) => {
    if (err) {
      resultCallback(err, null);
      return;
    }
    resultCallback(null, result);
  });
};

Person.delete = (id, resultCallback) => {
  const sql = `DELETE FROM person WHERE id=?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      resultCallback(err, null);
      return;
    }
    resultCallback(null, result);
  });
};

module.exports = Person;
