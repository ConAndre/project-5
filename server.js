const express = require('express');
const history = require('connect-history-api-fallback');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

if (app.get('env') === 'production') {
  // trust first proxy
  app.set('trust proxy', 1);

  // redirect to https
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}


// app.use(express.json({ limit: '100MB' }));
app.use(express.json()); // default 1MB

// configure the history fallback
app.use(history());

// All urls goto to index.html in /dist folder [build folder]
app.use("/", serveStatic(path.join(__dirname, 'web/dist')));

app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, 'web/dist/index.html'));
});

// error handler
app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      err = {
        client: true,
        msg: "Invalid JSON payload received",
        status: err.status,
      };
    }
    if (err.client) {
      // instance of validation error
      res.status(err.status || 400).json({ error: err.msg });
    } else {
      res
        .status(err.status || 500)
        .json({ error: 'There was an error with your request.' });
      next(err);
    }
    console.error(err);
  }
});

['log', 'warn', 'error'].forEach(function (method) {
  var old = console[method];
  console[method] = function () {
    var stack = (new Error()).stack.split(/\n/);
    // Chrome includes a single "Error" line, FF doesn't.
    if (stack[0].indexOf('Error') === 0) {
      stack = stack.slice(1);
    }
    var args = [].slice.apply(arguments).concat([stack[1].trim()]);
    return old.apply(console, args);
  };
});

if (app.get('env') !== 'production') {
  const port = 3000;
  app.listen(port, () => console.log(`API listening on ${port}!`));
}

module.exports = app;