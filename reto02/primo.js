export function esPrimo(num) {
  if (num <= 1) return false; // 0 y 1 no son primos
  if (num === 2) return true; // 2 es primo
  if (num % 2 === 0) return false; // pares mayores a 2 no son primos

  // Probar divisores desde 3 hasta la raíz cuadrada de num
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) {
      return false; // Tiene un divisor, no es primo
    }
  }
  return true; // No tiene divisores, sí es primo
}