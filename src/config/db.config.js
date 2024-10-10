const mongoose = require("mongoose");
const initDB = () => {
  mongoose.Promise = global.Promise;
  let dbPath = `mongodb://localhost:27017/quizapp`;
  mongoose.set("strictQuery", false);
  mongoose
    .connect(dbPath, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log("MongoDB Connection Error:" + err);
    });
};

module.exports = { initDB };
