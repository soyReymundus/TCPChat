const net = require("net");
const server = net.createServer();
const users = new Map();

server.on("connection", (socket) => {
    let ip = socket.address().address;

    if (!users.has(ip)) {
        socket.write("[Server] Por favor dinos tu nombre.");
    };

    socket.on("data", (dataBf) => {
        let data = dataBf.toString().replace("\n", "");

        if (users.has(ip)) {

            let name = users.get(ip).name;

            users.forEach((user, address) => {
                if (address != ip) {
                    if (data != "") user.socket.write(`[${name}] ${data}`);
                };
            });

        } else {

            if (!data) {
                socket.write("[Server] Se te desconectara por no enviar la informacion solicitada.");
                socket.end();
            } else {

                if (data.length <= 10 && data.length >= 3) {
                    users.set(ip, { "socket": socket, "name": data });
                    socket.write("[Server] Registrado con exito.");
                } else {
                    socket.write("[Server] El nombre de usuario debe tener entre 3 y 10 caracteres.");
                };

            };

        };

    });

    socket.on("end", () => {
        if (users.has(ip)) {
            users.delete(ip);
        };
    });

    socket.on("close", () => {
        if (users.has(ip)) {
            users.delete(ip);
        };
    });

    socket.on("error", () => {
        if (users.has(ip)) {
            users.delete(ip);
        };
    });

});

server.listen(8080, () => {
    console.log("Servidor funcionando");
});