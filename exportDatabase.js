import mysqldump from 'mysqldump';
import fs from 'fs';

// MySQL connection details
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'TONYstark@27',
    database: 'test',
  };
  
  // Output file name
  const outputFile = 'exported_database.sql';
  
  // Perform the database dump
  mysqldump({
    connection: connectionConfig, // Pass connection details using the 'connection' property
    dumpToFile: outputFile,       // Use 'dumpToFile' instead of 'dest'
  })
    .then(() => {
      console.log(`Database dumped successfully to ${outputFile}`);
    })
    .catch((err) => {
      console.error('Error dumping database:', err);
    });