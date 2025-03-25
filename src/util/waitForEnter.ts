import readline from 'readline';

export function waitForEnter(): Promise<void> {
    return new Promise(resolve => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
    });

    rl.question("Press Enter to continue...", () => {
        rl.close();
        resolve();
    }
    )});
}