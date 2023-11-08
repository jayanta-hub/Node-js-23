const http = require("http");
const fs = require("fs");
// const rqListener = (req, res) => {
//   console.log("res>>", res);
// };
// http.createServer((req, res) => {
//   console.log("res>>", req);
// });
const server = http.createServer((req, res) => {
  //   console.log("res>>url", req.url);
  //   console.log("res>>method", req.method);
  //   console.log("res>>headers", req.headers);
  //   process.exit();
  console.log(res);
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<header><title> My First Page </title></header>");
    res.write(
      "</body><form action='/message' method='POST'><input type='text' name='message'></input> <button type='submit'>Click</button></form>",
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    console.log("🚀 ~ file: server.js:29 ~ server ~ body", body);
    req.on("data", (chunk) => {
      //   console.log("🚀 ~ file: server.js:30 ~ req.on ~ chunk", chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (error) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<header><title> My First Page </title></header>");
  res.write("</body><h1>Hello my first NodeJs Server!</h1></body>");
  res.write("</html>");
  res.end();
});
server.listen(4000);
