
const http = require('http');
const PORT = 3000;

function logEvents (req , res, next) {
    const dateTime = new Date();
    const fecha = dateTime.toLocaleDateString();
    const tiempo = dateTime.toLocaleTimeString();
    console.log(`${fecha}-${tiempo} | Solicitud a: ${req.url}`);
    next();
}

function validarNombre (req, res, next) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const nombre = url.searchParams.get('name');
    if (!nombre) {
       res.statusCode = 400;
       return res.end('Falta el parametro "name"');
    }
    req.nombre = nombre;
    next();
}

function isAdmin (req, res, next) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const isAdmin = url.searchParams.get('admin');
    if (!isAdmin) {
        res.statusCode = 400;
        return res.end('Falta el parametro "admin"');
    }
    req.isAdmin = (isAdmin === 'true') ? 'true' : 'false';
    next();
    
}

const server = http.createServer((req, res) => {
    logEvents(req, res, () => {
        validarNombre(req, res, () => {
            isAdmin (req, res, () => {
            if (req.url.startsWith('/?')) {
                if (req.isAdmin === 'true') {
                    res.end(`Welcome Admin ` + req.nombre);
                } else {
                    res.end(`Welcome ` + req.nombre);
                }
            } else {
                res.end('404');
            }
            });
        });
    });
    
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});