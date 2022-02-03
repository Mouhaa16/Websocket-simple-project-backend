const app = require("express")();
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Student = require("./src/Model/Student");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const cors = require("cors");
app.use(cors());
dotenv.config();
io.on("connection", async (socket) => {
  console.log("connection made successfully");
  socket.on("upload", async (students) => {
    try {
      let upload = await Student.create(students);
      if (upload) {
        await Student.find((err, result) => {
          if (err) return;
          io.emit("upload", result);
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", async () => {
    console.log("socket disconnected");
  });
});

app.get("/", async (req, res) => {
  Student.find((err, result) => {
    if (err) return;
    res.json(result);
    console.log(result);
  });
});

var opts = {
  keepAlive: 1,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

server.listen(8999, () => {
  console.log("I am listening at port: 8999)");
  mongoose
    .connect(process.env.CONNECTIONSTRING, opts)
    .then((res) => {
      if (res) console.log("DB conected!");
    })
    .catch((err) => console.log(err));
});
