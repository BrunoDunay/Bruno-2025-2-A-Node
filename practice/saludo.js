export default function saludar(nombre, edad) {
    let message = "";
    if (edad >= 18) {
        message = `Hola ${nombre}, tienes ${edad} años y eres mayor de edad.`;
    } else {
        message = `Hola ${nombre}, tienes ${edad} años y eres menor de edad.`;
    }
    return message;
}

