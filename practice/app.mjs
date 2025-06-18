import inquirer from 'inquirer';
import chalk from 'chalk';
import saludar from './saludo.js';
import figlet from 'figlet';

inquirer.prompt([
    {
        type: 'input',
        name: 'age',
        message: '¿Cuál es tu edad?',        
    }, {
        type: 'input',
        name: 'name',
        message: '¿Cuál es tu nombre?',
    }
]).then(answers => {
    let msj = saludar(answers.name, answers.age);
    console.log(chalk.blue());
    figlet (msj, (err, data) => {
        if (err) {
            console.log('Algo salió mal...');
            console.dir(err);
            return;
        }
        console.log(chalk.green(data));
    });
});
   
