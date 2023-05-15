const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const PORT = 5000;

// use bodyParser.urlencoded throughout the app with this:
app.use(bodyParser.urlencoded({ extended: true }));

// starting array for jokes to be pushed into eventually
let jokes = [
  {
    // object properties established
    whoseJoke: "Danny",
    jokeQuestion: "Why do scuba divers fall backwards out of boats?",
    punchLine: "If they fell forwards they’d still be in the boat!"
  },
  {
    whoseJoke: "Luke",
    jokeQuestion: "Two fish are in a tank. What did one fish say to the other?",
    punchLine: "Do you know how to drive this thing?"
  },
  {
    whoseJoke: "Millie",
    jokeQuestion: "What do you call a pile of cats?",
    punchLine: "A meowntain!"
  },
  {
    whoseJoke: "dEv",
    jokeQuestion: "Why should you not play cards in the forest?",
    punchLine: "Too many Cheetahs!"
  },
  {
    whoseJoke: "Scott",
    jokeQuestion: "I went to the zoo the other day, it had one dog...",
    punchLine: "It was a shih tzu."
  }
];

// server side of the ajax GET request
app.get('/jokes', (req, res) => {
  console.log('Request for /jokes was made');
  // sending back jokes array
  res.send(jokes);
})

// server side of the ajax POST request
app.post('/jokes', (req, res) => {
  console.log('POST some data:', req.body);
  // pushing body of the request (req.body), which is an object with the properties whoseJoke
  // jokeQuestion, and punchLine, into the jokes array
  jokes.push(req.body)
  // responding to the client with Created!
  res.sendStatus(201)
});

// serve back static files - .html, .js, .css
app.use(express.static('server/public'));

app.listen(PORT, () => {
  console.log('server running on: ', PORT);
}); // end spin up server
