import express from "express";
/*import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";*/
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

//Server HTTP
const app = express();
const port = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
/*app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);*/

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/", viewsRouter);

//Levantar server HTTP
const httpServer = app.listen(port, () =>
  console.log("Listening on port " + port)
);

//Server Sockets
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("New client connected: " + socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  socket.emit("");
});
