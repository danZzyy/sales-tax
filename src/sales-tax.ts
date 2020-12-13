import chalk from 'chalk';
import * as inquirer from 'inquirer';

const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'How would you like to enter data?',
        choices: ['Enter Manually', 'Enter Filepath', 'Exit']
    }   
];

const filePrompt = [
    {
        type: 'input',
        name: 'filepath',
        message: 'Enter relative filepath'
    }
]


console.log(chalk.blue('pizza'));
inquirer.prompt(questions).then(answers => {
    if (answers.options === 'Enter Filepath') {
        inquirer.prompt(filePrompt).then(fileAns =>{
            console.log(fileAns);
        });
    }
});