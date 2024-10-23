import express from 'express';
import axios from 'axios';
import cors from 'cors';
import path from 'path'; // Import the path module

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static('public')); // Ensure 'public' is the directory where your index.html is located

// Endpoint to exchange the code for an access token
app.post('/exchange_token', async (req, res) => {
  const code = req.body.code;

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: 'Ov23liE7ASL9VKMNIArS',
      //client_secret: '42d99542cd23e89b91406353d972d150f4785ed6', //¡¡SECRET KEY UNCOMENT!!
      code: code
    }, {
      headers: {
        accept: 'application/json'
      }
    });

    const accessToken = response.data.access_token;
    res.json({ access_token: accessToken });
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).json({ error: 'Error exchanging code for token' });
  }
});

// Callback route
app.get('/callback', (req, res) => {
  const code = req.query.code;

  if (code) {
    // Redirect to the main page with the code in the URL
    res.redirect(`/?code=${code}`);
  } else {
    res.status(400).send('GitHub code was not received');
  }
});

// Route for the root of the server
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html')); // Send the index.html file as a response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
