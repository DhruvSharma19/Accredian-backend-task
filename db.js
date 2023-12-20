import mysql from "mysql2"

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'TONYstark@27',
  database: 'test',
  waitForConnections: true, 
  connectionLimit: 10,      
  queueLimit: 0,            
});

