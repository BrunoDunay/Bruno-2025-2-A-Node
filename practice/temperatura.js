//✅ Práctica en clase: Convertir grados Celsius a Fahrenheit usando boxen
//🎯 Objetivo
//Crear un módulo reutilizable (temperatura.js) que convierta grados.
//
//Usar inquirer para entrada de usuario.
//
//Mostrar el resultado con estilo usando boxen.

export function exportCelsiusToFarenheit(temperatura) {
    let result = (temperatura * 9/5) + 32;
    return result;
}

export function exportFarenheitToCelsius(temperatura) {
    let result = (temperatura - 32) * 5/9;
    return result;
}
  


