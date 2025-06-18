function invertirTexto(req, res, next) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const texto = url.searchParams.get('texto');
    if (!texto) {
        res.statusCode = 400;
        return res.end('Falta el parametro "texto"');
    } else {
        textoInvertido = texto.split('').reverse().join('');
        req.textoInvertido = textoInvertido;
        req.texto = texto;
    }
    next();

}

module.exports = invertirTexto;
