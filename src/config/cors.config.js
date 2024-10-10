const cors = require("cors");

const initCors = (app) => {
  let corsOptions = {
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  //cors enable
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, GET, POST, DELETE, PATCH, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Expose-Headers", "rx-a");
    next();
  });
};

module.exports = { initCors };
