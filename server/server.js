const mongoose = require('mongoose');
const app = require('./app');
const {swaggerDocs: v1SwaggerDocs} = require('./router/swagger');
require("dotenv").config();

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    IP_SERVER,
    PORT_DB,
    API_VERSION
} = require("./constants");

const port = process.env.PORT || 3977;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
    (err, res) => {
        if (err) {
            throw err;
        } else {
            v1SwaggerDocs(app, port);

            //console.log("Connection to the database is successful");
            app.listen(port, () => {
                console.log("################");
                console.log("##### API REST FOODEMY #####");
                console.log("################");
                console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
            });
        }
    }
);
