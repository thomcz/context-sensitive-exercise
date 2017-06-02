var influent = require('influent');

influent
    .createHttpClient({
        server: [
            {
                protocol: "http",
                host:     "192.168.99.100",
                port:     8086
            }
            
        ],
        username: "thomcz",
        password: "xxxx",

        database: "training"
    })
    .then(function(client) {
        client
            .query("show databases")
            .then(function(result) {
                // ...
            });
        // super simple point
        client.write({ key: "myseries", value: 10 });
        
    });