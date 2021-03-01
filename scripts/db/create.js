const mysql = require('mysql2');  

require('dotenv').config();

const { 
  WHITE_LABEL_DB_USER, 
  WHITE_LABEL_DB_PASS, 
  WHITE_LABEL_DB_HOST,
  WHITE_LABEL_DB_PORT,
  WHITE_LABEL_DB_DEV_DB_NAME,
  WHITE_LABEL_DB_TEST_DB_NAME,
  NODE_ENV
} = process.env;

const dbName = NODE_ENV === "development" 
  ? WHITE_LABEL_DB_DEV_DB_NAME 
  : WHITE_LABEL_DB_TEST_DB_NAME

const connection = mysql.createConnection({  
  host: WHITE_LABEL_DB_HOST, 
  port: WHITE_LABEL_DB_PORT,  
  user: WHITE_LABEL_DB_USER,  
  password: WHITE_LABEL_DB_PASS  
});  

connection.connect((err) => {
  if (err) throw err;
  connection.query(`CREATE DATABASE ${dbName}`, (err, result) => {
    
    if (err && err.code === "ER_DB_CREATE_EXISTS") {
      console.log('Db already created');
      process.exit(0);
    } 
    
    if (err) {
      throw err;
    }

    console.log('Created db');
    process.exit(0);
  })
})