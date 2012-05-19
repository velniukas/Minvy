// A super, super minimal LiveReload implementation in node.
// Relies on polling.
//
// Run as
//
//   node reload.js ~/your/project/dir
//
// Add to your HTML like
//
//   <script src='http://127.0.0.1:1337/'></script>

var http = require('http'),
    fs = require('fs'),
    reload;

fs.watch(process.argv[2], function(evt, filename) {
    reload = true;
});

http.createServer(function (req, res) {
    if (req.url == '/') {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        return res.end('(' + ('' + function reload_run() {
            window.setInterval(function() {
                var im = new Image();
                im.onload = function(r) { window.location.reload(); };
                im.src = 'http://127.0.0.1:1337/stat?m=' + (+new Date());
            }, 1000);
        }) + ')()');
    }
    if (req.url.match(/\/stat/) && reload) {
        res.writeHead(200, {
            'Content-Type': 'image/gif'
        });
        reload = false;
        return res.end(new Buffer('R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=', 'base64'));
    }
    return res.end();
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
