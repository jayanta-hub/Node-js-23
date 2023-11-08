const http = require("http");
const routes = require("./routes");
const server = http.createServer(routes.hanlder);
server.listen(3000);
