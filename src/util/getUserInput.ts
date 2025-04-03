import inquirer from 'inquirer';

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