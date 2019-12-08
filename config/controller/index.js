exports.serveGzipped = contentType => (req, res, next) => {
    const acceptedEncodings = req.acceptsEncodings();
    const encoding = {ext:".js.gz",type:"gzip"};
    if (acceptedEncodings.indexOf('gzip') === -1 && acceptedEncodings.indexOf('br') === -1) {
        next()
        return
    }
    
    if (acceptedEncodings.indexOf('br') > -1) {
        encoding.ext= ".js.br";
        encoding.type = "br";
    }
    req.url = req.url.replace(".js",  encoding.ext);
    res.set('Content-Encoding', encoding.type )
    res.set('Content-Type', contentType)
    res.set('Transfer-Encoding', 'chunked')
    res.set('Vary', 'Accept-Encoding')
    next()
}