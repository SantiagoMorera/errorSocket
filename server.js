const compression = require("compression");
/* const cors = require("cors"); */
const dotenv = require("dotenv");
const express = require("express");
const { engine } = require("express-handlebars");
const session = require("express-session");
const { createServer } = require("http");
const passport = require("passport");
const { passportInit } = require("./middleware/passportAuth.js");
const { authRouter, chatRouter, defaultRouter, productRouter, userRouter } = require("./routers/router.js");
/* const { client, redisConnect, RedisStoreSession } = require("./utils/redis.js"); */
const { socketStart } = require("./utils/socket.js");
const logger = require("./utils/winston.js");

dotenv.config();
const app = express();

/* socket */
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

io.on("connection", async (socket) => {

  console.log(`Nuevo cliente conectado ${socket.id}`);

});


/* Redis  */
const redis = require("redis");
const RedisStore = require('connect-redis')(session);

const client = redis.createClient({ legacyMode: true, });

const redisConnect = () => {
  try {
    client.connect();
    logger.log('info', "✅ Redis ON");
  } catch (error) {
    throw logger.log('error', `❌ Can not connect to Redis! ${error}`);
  }
};

passportInit();
redisConnect();




class mainServer {
  constructor() {
    this.PORT = process.env.PORT || 8888;
    this.app = express();
    this.httpServer = new createServer(this.app);
    this.middlewares();
    this.routes();
    this.templatingEngine();
    /* this.startSockets(); */
  }

  middlewares() {
    /* this.app.use(cors()); */
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      session({
        store: new RedisStore({
          host: "localhost",
          port: 6379,
          client,
          ttl: 300,
        }),
        secret: "keyboard cat",
        cookie: {
          httpOnly: false,
          secure: false,
          maxAge: 86400000, // 1 dia
        },
        admin: true,
        rolling: true,
        resave: true,
        saveUninitialized: false,
      })
    );

    this.app.use(passport.initialize());
    this.app.use(passport.session());

  }

  routes() {
    this.app.use("/", defaultRouter);
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/user", userRouter);
    this.app.use("/api/product", productRouter);
    this.app.use("/api/chat", chatRouter);
  }


  templatingEngine() {
    this.app.use("/public", express.static(__dirname + "/public"));
    this.app.set("view engine", "hbs");
    this.app.set("views", "./views");
    this.app.engine(
      "hbs",
      engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
      })
    );

  }

  listen() {
    this.httpServer.listen(this.PORT, () =>
      logger.log("info", `✅ Server ON at => http://localhost:${this.PORT}`)
    );
  }
}





const server = new mainServer;
server.listen();

