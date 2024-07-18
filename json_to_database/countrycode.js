import xlsx from 'xlsx';
import mongoose from 'mongoose';


// Load the Excel file
const workbook = xlsx.readFile('/Users/mantri/Desktop/typeface_ai/task-Bhaskar-459/json_to_database/Database/Country-Code.xlsx');

const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];


const data = xlsx.utils.sheet_to_json(worksheet);

  
// // Connect to MongoDB
let con = mongoose.connect("mongodb+srv://m03bhaskar:bhaskar459@zomato.sl3ap4z.mongodb.net/?retryWrites=true&w=majority&appName=zomato").then(() => {
    console.log('Connected to MongoDB');
    console.log('Inserting data into the database');
    CountryCode.insertMany(data).then(() => {
        console.log('Data inserted successfully');
    }).catch((error) => {
        console.log('Error inserting data:', error.message);
    });
}
).catch((error) => {
    console.log('Connection error:', error.message);
});

export default con;




