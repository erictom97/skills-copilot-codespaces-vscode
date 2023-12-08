// Create web server
// Run with: node comments.js
// Access with browser: http://localhost:3000/
// Access with curl: curl http://localhost:3000/

// Import modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var sqlite3 = require('sqlite3').verbose();

// Create database object
var db = new sqlite3.Database('comments.db');

// Create table if it does not already exist
db.run("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, comment TEXT)");

// Create server
http.createServer(function (request, response) {

  // Get the URL
  var url_parts = url.parse(request.url);

  // Check for form submission
  if (request.method == 'POST') {

    // Read the form data
    var body = '';
    request.on('data', function (data) {
      body += data;
    });

    // Parse the form data
    request.on('end', function () {
      var post = qs.parse(body);

      // Insert the comment into the database
      db.run("INSERT INTO comments (comment) VALUES (?)", post.comment);

      // Redirect to the home page
      response.writeHead(302, {'Location': '/'});
      response.end();
    });

  // Check for a list request
  } else if (url_parts.pathname == '/list') {

    // Get the comments from the database
    db.all("SELECT * FROM comments", function(err, rows) {

      // Send the comments back to the client
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end(JSON.stringify(rows));
    });

  // Otherwise, serve the home page
  } else {

    // Read the home page
    fs.readFile('index.html', function(err, data) {

      // Send the home page back to the client
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(data);
    });
  }

}).listen(3000);

// Log the server status
console.log('Server running at http://localhost:3000/');
