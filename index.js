const express = require("express");
const router = require("./routes");
const MongoHelper = require("./infra/db");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const userAuth = require("./middlewares/user_auth");

const app = express();
const port = 4003;
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.all("*", userAuth);
app.use(router);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

MongoHelper.connect()
  .then(async () => {
    app.listen(port, () =>
      console.log(`Server running at http://localhost:${port}`)
    );
  })
  .catch(console.error);
