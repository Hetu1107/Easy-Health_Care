const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const server = require("http").createServer(app);
const { spawn } = require("child_process");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require("path");
const broadcast = require("nodemon");
app.use(express.static(path.join(__dirname, "client/build")));

app.post("/py", async (req, res, next) => {
  let val = req.body.message;
  let ans = "";
  var childpython = null;
  await new Promise((resolve, reject) => {
    childpython = spawn("python", ["HospitalModel.py", val[0], val[2], val[4]]);
    childpython.stdout.on("data", (data) => {
      ans = "";
      console.log(val[0]);
      console.log(val[2]);
      console.log(val[4]);
      ans += data;
      console.log(`${data}`);
      resolve(true);
    });
    childpython.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      resolve(true);
    });
  }).then(() => {
    res.json({ value: ans, val: val });
    res.end();
  });
});

let ansss = [];
let str1 = "";
app.post("/predict", async (req, res, next) => {
  let val = req.body.dat;
  let finalString = "";
  finalString += val[0];
  for (var i = 1; i < val.length; i++) {
    finalString += `,${val[i]}`;
  }
  var childpython = null;
  await new Promise((resolve, reject) => {
    childpython = spawn("python", ["diseasePrediction.py", finalString]);
    childpython.stdout.on("data", (data) => {
      str1 = "";
      ansss = [];
      ansss.push(data);
      str1 += ansss[0];
      console.log(`${ansss[0]}`);
      resolve(true);
    });
    // childpython.stderr.on("data", (data) => {
    //   console.error(`stderr: ${data}`);
    //   resolve(true);
    // });
  }).then(() => {
    res.json({ key: str1 });
    res.end();
  });
});

app.post("/append", (req, res) => {
  const val = req.body.message;
  fs.appendFile("./appointment.txt", `\n${val}`, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("file was saved");
  });
  res.end();
});
const user = {};
const activated = {};

io.on("connection", (socket) => {
  console.log("ready to use");

  socket.on("join-room", (roomId, userId) => {
    console.log("joined room", roomId, "-", userId);
    socket.join(roomId);
    console.log(user[roomId]);
    if (!user[roomId]) {
      user[roomId] = 1;
    } else {
      user[roomId]++;
    }
    console.log(user[roomId]);
    socket.broadcast.to(roomId).emit("user-connected", userId, user);

    socket.on("disconnect", () => {
      // console.log("user left", userId);
      // user[roomId]--;
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });
  });

  socket.on("room-full", (roomId, userId) => {
    user[roomId]--;
    console.log("removed from room", userId);
    io.to(roomId).emit("removed", userId);
    console.log(user[roomId]);
  });

  socket.on("room-check", (roomId) => {
    console.log(user[roomId]);
    socket.emit("check", user);
  });

  socket.on("leave-room", (roomId, userId) => {
    console.log("left the room", roomId, userId);
    socket.leave(roomId);
    user[roomId]--;
    socket.emit("room-left", userId);
    io.to(roomId).emit("empty-chat", userId);
  });

  socket.on("chat", (roomId, payload) => {
    io.to(roomId).emit("chat", payload);
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

server.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});