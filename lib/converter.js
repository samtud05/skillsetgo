// Install csv-parser if not already installed
// npm install csv-parser

const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// Function to convert CSV to JSON and save to a new file
function convertCsvToJson(inputFilePath, outputFilePath) {
    const results = [];

    // Read the CSV file
    fs.createReadStream(inputFilePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Convert results to JSON and write to the output file
            fs.writeFile(outputFilePath, JSON.stringify(results, null, 2), (err) => {
                if (err) {
                    console.error('Error writing JSON file:', err);
                } else {
                    console.log(`JSON file has been saved to ${outputFilePath}`);
                }
            });
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
        });
}

// Example usage
const inputFilePath = path.join(__dirname, 'employees.csv'); // Replace with your input CSV file
const outputFilePath = path.join(__dirname, 'output.json'); // Replace with your desired output JSON file

convertCsvToJson(inputFilePath, outputFilePath);
