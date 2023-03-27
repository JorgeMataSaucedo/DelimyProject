const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Metadata info about the API
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Delimy API",
            version: "1.0.0",
            description: "Delimy API Information",
        }
    },
    apis: ["./router/*.js", "./models/*.js"],
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

const swaggerDocs = (app, port) => {
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
    app.get("/swagger.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpecs);
    });

    console.log('Version 1 docs are available at http://localhost:' + port + '/api-docs/')

}

module.exports = {
    swaggerDocs,
}