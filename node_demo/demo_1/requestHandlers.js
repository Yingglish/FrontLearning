var exec = require("child_process").exec;

function start(response) {
    console.log("Request handler 'start' was called.");

    exec("dir", function (error, stdout, stderr) {
        function sleep(milliSeconds) {
            var startTime = new Date().getTime();
            while (new Date().getTime() < startTime + milliSeconds);
        }

       // sleep(10000);
        response.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        response.write(stdout,"ANSI");
        response.end();
    });
}

function upload(response) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("Hello Upload");
    response.end();
}

exports.start = start;
exports.upload = upload;
