export function validarNumeros(array) {
  return array.every((elemento) => !isNaN(elemento)); // Verifica si todos los elementos del arreglo son números 
}

export function paresImpares(numeros) {
  const pares = [];
  const impares = [];

  for (let numero of numeros) {
    if (numero % 2 === 0) {
      pares.push(numero);
    } else {
      impares.push(numero);
    }
  }

  return { pares, impares };
}


