const net = require("net");
const client = new net.Socket();

client.connect(8080, "127.0.0.1", () => {

    process.stdin.on("data", (dataBf) => {
        let data = dataBf.toString().replace("\n", "");
        data = data.slice(0, data.length - 1);
        
        client.write(data);

    });

});

client.on("data", (dataBf) => {
    let data = dataBf.toString();

    console.log(data);

});