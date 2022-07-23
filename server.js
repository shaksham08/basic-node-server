const http = require("http");

const PORT = 3005;

const server = http.createServer();

const friends = [
  {
    id: 1,
    name: "Nikola Tesla",
  },
  {
    id: 2,
    name: "Albert Einstein",
  },
  {
    id: 3,
    name: "Sir Isaac Newton",
  },
];

server.on("request", (req, res) => {
  const urlItems = req.url.split("/");
  if (req.method === "POST" && urlItems[1] === "friend") {
    const id = friends.length + 1;
    req.on("data", (data) => {
      const friend = JSON.parse(data);
      friend.id = id;
      friends.push(friend);
      console.log(friends);
    });
    req.pipe(res);
  } else if (req.method === "GET" && urlItems[1] === "friends") {
    res.end(JSON.stringify(friends));
  } else res.end("HELLO");
});

server.listen(3005, () => {
  console.log("SERVER IS RUNNING AT LOCALHOST PORT " + PORT);
});
