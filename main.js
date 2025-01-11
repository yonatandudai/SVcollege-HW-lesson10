import fs from "node:fs/promises"
import xlsx from "xlsx"

//Q1. Write a function that reads a file and returns the number of words in the file.
async function fileWOrdsCounter() {
    const data = await fs.readFile('./example.txt', 'utf8');
    const words = data.split(' ');
    console.log(words.length);
}

//Q2. Function to read an Excel file and log its content
async function calcGradesAvgFromExcel() {
    const workbook = xlsx.readFile('./grades.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    let totalGrades = 0;
    let numberOfGrades = 0;

    // Assuming the first row is the header
    data.slice(1).forEach((row) => {
        const grade = row[1]; // Column B (index 1)
        totalGrades += grade;
        numberOfGrades++;
    });

    const average = totalGrades / numberOfGrades;
    console.log(`Average Grade: ${average}`);
}

async function main() {
    await fileWOrdsCounter();
    await calcGradesAvgFromExcel();
}

main();