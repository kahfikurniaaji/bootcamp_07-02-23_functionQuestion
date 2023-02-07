const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');
const validator = require('validator');

// Main Function
main();

function input(question) {
    return new Promise(resolve => {
        readline.question(`${question} : `, answer => resolve(answer));
    });
}

async function main() {
    const name = await input('Name');
    const phone = await input('Phone');
    if (validator.isMobilePhone(phone, 'id-ID')) {
        const email = await input('Email');
        if (validator.isEmail(email)) {
            const dirPath = './data';

            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }

            const dataPath = 'data/contacts.json';

            if (!fs.existsSync(dataPath)) {
                fs.writeFileSync(dataPath, '[]', 'utf-8');
            }

            const contacts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

            const contact = {
                name,
                phone,
                email
            };

            contacts.push(contact);
            const jsonString = JSON.stringify(contacts);
            fs.writeFileSync(dataPath, jsonString);
            console.log('Terima kasih sudah memasukan data!');
        } else {
            console.log(`Email is invalid!`);
        }
    } else {
        console.log(`Phone is tidak valid!`);
    }
    readline.close();
}