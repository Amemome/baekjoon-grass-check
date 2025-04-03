import inquirer from 'inquirer';
import * as readline from 'readline/promises';

async function getUserInput(message: string): Promise<string> {
    
    const { input } = await inquirer.prompt([
        {
            type: "input",
            name: "input",
            message: message,
        },
    ]);

    return input;
}

export default getUserInput;