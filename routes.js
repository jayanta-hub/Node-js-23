const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<header><title> My First Page </title></header>");
    res.write(
      `<body><form action='/user' method='POST'><h2>User Name </h2><input type='text' name='user'></input><button type='submit'>Submit</button></form>`,
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (error) => {
        res.statusCode = 302;
        res.setHeader("Location", "/create-user");
        return res.end();
      });
    });
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
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
  res.write("<body><h1>Hello my first NodeJs Server!</h1></body>");
  res.write("</html>");
  res.end();
};
//1. One Way to export
// module.exports = requestHandler;

//2. Other Way to export
module.exports = {
  hanlder: requestHandler,
  text: "Welcome",
};

//3. Other Way to export
// module.exports.hanlder = requestHandler;
// module.exports.text = "Welcome";

//4. Other Way to export
// exports.hanlder = requestHandler;
// exports.text = "Welcome";
