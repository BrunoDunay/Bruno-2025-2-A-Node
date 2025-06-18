import inquirer from 'inquirer';
import boxen from 'boxen';
import chalk from 'chalk';
import {exportCelsiusToFarenheit, exportFarenheitToCelsius} from './temperatura.js';

function iniciar(){

inquirer .prompt([
    {
        type: 'list',
        name: 'type',
        message:chalk.green('¿Qué conversión desea realizar?'), 
        choices: ['Celsius a Fahrenheit', 'Farenheit a Celsius'],
    },
    {
        type: 'input',
        name: 'grados',
        message: 'Ingresa la temperatura a convertir',
    }
]).then(res=> {
    const { type, grados } = res;

    let msj = '';
    if (type === 'Celsius a Fahrenheit') {
        msj = `${grados}°C es igual a ${exportCelsiusToFarenheit(grados)}°F`;
    } else {
        msj = `${grados}°F es igual a ${exportFarenheitToCelsius(grados)}°C`;
    }
    mostrarResultado(msj);
    continuar();
});
    
}

function mostrarResultado(msj) {
    console.log(chalk.red(boxen(msj, {padding: 1})));
}

function continuar() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'continuar',
            message: chalk.green('¿Desea realizar otra conversión?'),
            default: true
        }
    ]).then(res => {
        if (res.continuar) {
            iniciar();
        } else {
            console.log(chalk.blue('¡Gracias por usar el conversor de temperatura!'));
        }
    });
}

iniciar();