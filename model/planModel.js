// Driver
const mongoose = require("mongoose");
// DB
const DB =
  "mongodb+srv://users:tonystark@cluster0-ll0cm.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(function(conn) {
    console.log("Plan DB connected");
    // console.log(conn.connection);
  });
// document
const planSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is a required Field"] },
  price: { type: Number, min: 20, default: 40 },
  description: { type: String, required: true },
  averagerating: { type: Number, default: 5 },
  duration: { type: Number }
});

// Collection
const planModel = mongoose.model("planModel", planSchema);
module.exports = planModel;