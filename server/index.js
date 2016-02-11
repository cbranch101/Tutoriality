var browserify = require('browserify-middleware')
var express = require('express')
var Path = require('path')

var routes = express.Router();
var routers = [];

//
// Provide a browserified file at a specified path
//
routes.get('/app-bundle.js',
  browserify('./client/app.js'))

//
// Static assets (html, etc.)
//
var assetFolder = Path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))
routers.push(require('./apis/tutorial-api.js'));


if (process.env.NODE_ENV !== 'test') {
  // Load all routes
  
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  var app = express()

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() )

  // Mount our main router
  routers.push(routes);
  routers.forEach(function(router){
    app.use('/', router);
  });

  // Start the server!
  var port = process.env.PORT || 4000
  app.listen(port)
  console.log("Listening on port", port)
  module.exports = routes;
}
else {

  // We're in test mode; make this file importable instead.
  routers.push(routes);
  module.exports = routers;
}