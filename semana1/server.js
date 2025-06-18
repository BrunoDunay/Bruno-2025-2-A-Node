const express = require('express');
const { program } = require('commander');
const crypto = require('crypto');
const { parse } = require('path');

const app = express();

let port = 0;
const portDev = 3000;
const portQA = 3001;
const portProd = 3002;
const args = process.argv;

program.option("--dev", "Modo desarrollo");
program.option("--qa", "Modo QA");
program.option("--production", "Modo producción");
program.option('--generate-password <length>', 'Generar una contraseña', parseInt);

program.parse(process.argv);
const options = program.opts();

if (options.dev) {port = portDev; }
else if (options.qa) {port = portQA; }
else if (options.prod) {port = portProd; }
else {port = portDev; }
// Invertir el orden de las letras.
// Reemplazar vocales por números:
// a → 4
// e → 3
// i → 1
// o → 0
// u → _
// Añadir 2 caracteres especiales aleatorios al final.
function codificar(mensaje) {
  const reemplazos = {
    "a": "4",
    "e": "3",
    "i": "1",
    "o": "0",
    "u": "_",
  }

  const invertido = mensaje.split("").reverse().join("");
  const convertido = invertido
    .replace(/[aeiou]/gi, letra => reemplazos[letra.toLowerCase()] || letra);
  const caracteresExtra = "!@#$%^&*";
  const extra1 = caracteresExtra[Math.floor(Math.random() * caracteresExtra.length)];
  const extra2 = caracteresExtra[Math.floor(Math.random() * caracteresExtra.length)];

  return convertido + extra1 + extra2;
}

function generatePassword() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const limiteCarecteres = 6;

  let password = "";
  for (let i = 0; i < limiteCarecteres; i++) {
    let random = Math.floor(Math.random() * caracteres.length);
    password = password + caracteres[random];
  }
  return password;
}

app.get("/", (req, res) => {
  res.send("Hola!");
});

app.get("/home", (req, res) => {
  res.send("Hola desde home!");
});

app.get("/password", (req, res) => {
  res.send(generatePassword());
});

app.get('/generatePassword', (req, res) => {
  // Generar una contraseña si se solicita
  if (options.generatePassword) {
    const length = options.generatePassword;
    const password = crypto.randomBytes(length).toString('hex').slice(0, length);
    res.send(password);
  } 
});

// http://localhost:3000/enigma?mensaje=hola
app.get("/enigma", (req, res) => {
  //console.log(req.query.mensaje);
  res.send(codificar(req.query.mensaje));
});

app.get("/par-impar/:numero", (req, res) => {
  const numero = parseInt(req.params.numero);

  if (isNaN(numero)) {
    return res.send("El número no es válido");
  }
  
  const resultado = numero % 2 === 0 ? "par" : "impar";
  res.send(`El número ${numero} es ${resultado}.`);
});

app.listen(port, () => {
  console.log("Servidor iniciado");
});