require("./check-versions")();

var config = require("../config");
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}
const { errorHandler } = require("./middleware/errorMiddleware");
var opn = require("opn");
var path = require("path");
const bodyParser = require("body-parser");
var express = require("express");
var webpack = require("webpack");
var proxyMiddleware = require("http-proxy-middleware");
var webpackConfig =
  process.env.NODE_ENV === "testing"
    ? require("./webpack.prod.conf")
    : require("./webpack.dev.conf");
const dotenv = require("dotenv").config();
const color = require("colors");
const connectDB = require("../config/database");
//Connect to database
connectDB()
// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable;

var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = require("webpack-dev-middleware")(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
});

var hotMiddleware = require("webpack-hot-middleware")(compiler, {
  log: () => {},
});
// force page reload when html-webpack-plugin template changes
compiler.plugin("compilation", function (compilation) {
  compilation.plugin("html-webpack-plugin-after-emit", function (data, cb) {
    hotMiddleware.publish({ action: "reload" });
    cb();
  });
});
//////////////////////////////////////////////////////////////
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context];
  if (typeof options === "string") {
    options = { target: options };
  }
  app.use(proxyMiddleware(options.filter || context, options));
});

///////////////////////////////////////////////

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

//extra middleware so that we can read the data body of the request
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
///////////////////////
// const maxRequestBodySize = "1mb";
app.use(express.json());
app.use(express.urlencoded({ extended: true, parameterLimit: 100000, limit: '500mb'}));

// serve pure static assets
var staticPath = path.posix.join(
  config.dev.assetsPublicPath,
  config.dev.assetsSubDirectory
);
app.use(staticPath, express.static("./static"));

var uri = "http://localhost:" + port;

var _resolve;
var readyPromise = new Promise((resolve) => {
  _resolve = resolve;
});

console.log("> Starting dev server...");
devMiddleware.waitUntilValid(() => {
  console.log("> Listening at " + uri + "\n");
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== "testing") {
    opn(uri);
  }
  _resolve();
});

// whenever the user request /api/element, direct the request to elementRoutes
app.use("/api/elements", require("./routes/elementRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// override default error handler of ExpressJS
app.use(errorHandler);

var server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  },
};
