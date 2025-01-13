import fs from "node:fs/promises";
import path from 'node:path';

const inputDir = './input_files';

//Q1.  Write a script that reads the contents of 'input.txt' and prints it to the console.
const inputFilePath = path.join(inputDir, 'input.txt');
const data = await fs.readFile(inputFilePath, 'utf8');
console.log(data);

//Q2.Create a script that writes ' Node.js is fun!' into a file named 'output.txt'.
await fs.writeFile('./output.txt', 'Learning Node.js is fun!');
//console.log('File written successfully!');

//Q3. Write a program to append the current timestamp to a file named 'log.txt'.
const timestamp = new Date().toISOString();
await fs.appendFile('./log.txt', timestamp + '\n');
console.log('Timestamp appended to log.txt');

//Q4. Create a script that reads a file and handles errors gracefully if the file does not exist.
try {
    const data = await fs.readFile('./nonexistent.txt', 'utf8');
    //console.log(data);
} catch (error) {
    //console.error('Error reading file:', error.message);
}

//Q5. Write a program to create a new directory named 'testDir'.
//await fs.mkdir('./testDir');
//console.log('Directory created successfully.');

//Q6. Create a script that checks if 'testDir' exists, and if not, creates it.
async function ensureDirectoryExists() {
    try {
        await fs.access('./testDir2');
        console.log('Directory already exists.');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.mkdir('./testDir2');
            console.log('Directory created successfully.');
        } else {Learning
            console.error('Error checking directory:', err);
        }
    }
}

//ensureDirectoryExists();

//fs.appendFile('./temp.txt', 'Hello World\n'); //prepare a file to be deleted
//Q7. Write a program to delete a file named 'temp.txt'.
//await fs.unlink('./temp.txt');
//console.log('File deleted successfully.');

//fs.appendFile('./oldFile.txt', 'Hello World\n'); //prepare a file to be renamed
//Q8. Create a script that renames 'oldFile.txt' to 'newFile.txt'.
//await fs.rename('./oldFile.txt', './newFile.txt');
//console.log('File renamed successfully.');

//Q9. Write a script that lists all files and directories in the current directory.
async function listFiles() {
    const files = await fs.readdir('./');
    console.log('Files and directories in the current directory:');
    files.forEach((file) => {
        console.log(file);
    });
}

//listFiles();

//Q10. Create a program that reads the contents of a file line by line and prints each line.
async function readLines() {
    const data = await fs.readFile('./example.txt', 'utf8');
    const lines = data.split('\n');
    lines.forEach((line) => {
        console.log(line);
    });
}

//readLines();

//Q11. . Write a script to create a file named 'data.json' with some sample JSON content.
async function createJsonFile() {
    const jsonData = {
        name: 'Alice',
        age: 30,
        city: 'New York'
    };
    const myStringified = JSON.stringify(jsonData);
    await fs.writeFile('./data.json', myStringified);
    console.log('JSON data written to data.json');
}

//createJsonFile();

//Q12. Write a program that reads 'data.json', parses it, and logs the parsed object to the console.
async function readJsonFile() {
    const data = await fs.readFile('./data.json', 'utf8');
    const jsonData = JSON.parse(data);
    console.log('Data from data.json:', jsonData);
}

//readJsonFile();

//fs.writeFile('./source.txt', 'Hello World\n'); //prepare a file to be copied
//Q13. Create a script that copies the contents of 'source.txt' to 'destination.txt'.
//await fs.copyFile('./source.txt', './destination.txt');
//console.log('File copied successfully.');

//fs.writeFile('./fileA.txt', 'Hello World\n'); //prepare a file to be moved
//Q14. Write a program to move 'fileA.txt' to a different directory named 'backup'.
async function moveFile() {
await fs.mkdir('./backup');
await fs.rename('./fileA.txt', './backup/fileA.txt');
console.log('File moved successfully.');
}

//moveFile();

//fs.mkdir('./tempFiles'); //prepare a directory to store files
fs.appendFile('./tempFiles/file1.txt', 'Hello World\n'); //prepare a file to be deleted
fs.appendFile('./tempFiles/file2.txt', 'Hello World\n'); //prepare a file to be deleted
//Q15. Write a script that deletes all files in a directory named 'tempFiles'.
async function deleteFiles() {
    let directoryToWatch = './tempFiles';
    const filePath = path.join(directoryToWatch, 'input.txt');
    const deleteFilePath = path.join(directoryToWatch, 'input.txt');
    const files = await fs.readdir('./tempFiles');
    files.forEach(async (file) => {
        await fs.unlink(`./tempFiles/${file}`);
        console.log(`Deleted file: ${file}`);
    });
}

//deleteFiles();

//Q16. Create a script that monitors a directory for changes and logs the type of change.

async function monitorDirectory(directory) {
        // Directory to monitor
        const directoryToWatch = './tempFiles';
        // Ensure the directory exists
        if (!fs.access(directoryToWatch)) {
        fs.mkdirSync(directoryToWatch);
        console.log(`Created directory: ${directoryToWatch}`);
        }

        // Start monitoring the directory
        fs.watch(directoryToWatch, (eventType, filename) => {
        if (filename) {
        const fullPath = path.join(directoryToWatch, filename);
        if (eventType === 'rename') {
        // 'rename' can mean a file was added, removed, or renamed
        if (fs.access(fullPath)) {
        console.log(`File added/renamed: ${filename}`);
        } else {
        console.log(`File removed: ${filename}`);
        }
        } else if (eventType === 'change') {
        // 'change' means a file was modified
        console.log(`File modified: ${filename}`);
        }
        } else {
        console.log('Filename not provided');
        }
});

console.log(`Monitoring changes in directory: ${directoryToWatch}`);
}

// Monitor the 'tempFiles' directory
monitorDirectory('./tempFiles');

//fs.appendFile('./bigfile.txt', 'x'.repeat(1024 * 1024 * 10)); //prepare a large file
//Q17. Write a program that reads the size of a file named 'bigfile.txt' and logs it to the console.
async function readFileSize() {
    const stats = await fs.stat('./bigfile.txt');
    console.log(`File size: ${stats.size} bytes`);
}

//readFileSize();

//Q18. Create a script that creates multiple files named 'file1.txt', 'file2.txt', and 'file3.txt' in a loop.
async function createMultipleFiles() {
    for (let i = 1; i <= 3; i++) {
        await fs.writeFile(`./file${i}.txt`, `Hello from file ${i}`);
        console.log(`File${i}.txt created`);
    }
}

createMultipleFiles();

//Q19. Write a program to count the number of files in a directory and log the count.
async function countFiles() {
    const files = await fs.readdir('./');
    console.log(`Number of files: ${files.length}`);
}

countFiles();

//Q20. Create a script to merge the contents of two text files into a third file.

// Function to merge files
async function mergeFiles() {
    const file1Path = path.join(inputDir, 'file1.txt');
    const file2Path = path.join(inputDir, 'file2.txt');
    const file3Path = path.join(inputDir, 'file3.txt');
    const mergedFilePath = path.join(inputDir, 'merged.txt');

    try {
        const file1Data = await fs.readFile(file1Path, 'utf8');
        const file2Data = await fs.readFile(file2Path, 'utf8');
        const file3Data = await fs.readFile(file3Path, 'utf8');

        const mergedData = `${file1Data}\n${file2Data}\n${file3Data}`;
        await fs.writeFile(mergedFilePath, mergedData);
        console.log('Files merged successfully');
    } catch (err) {
        console.error('Error merging files:', err);
    }
}

mergeFiles();