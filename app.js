import express from 'express';
import session from 'express-session';
import lodash from 'lodash';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import ViteExpress from 'vite-express';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});
app.set('view engine', 'njk');
const MOST_LIKED_FOSSILS = {
  aust: {
    img: '/img/australopith.png',
    name: 'Australopithecus',
    num_likes: 584,
  },
  quetz: {
    img: '/img/quetzal_torso.png',
    name: 'Quetzal',
    num_likes: 587,
  },
  steg: {
    img: '/img/stego_skull.png',
    name: 'Stegosaurus',
    num_likes: 598,
  },
  trex: {
    img: '/img/trex_skull.png',
    name: 'Tyrannosaurus Rex',
    num_likes: 601,
  },
};

const OTHER_FOSSILS = [
  {
    img: '/img/ammonite.png',
    name: 'Ammonite',
  },
  {
    img: '/img/mammoth_skull.png',
    name: 'Mammoth',
  },
  {
    img: '/img/ophthalmo_skull.png',
    name: 'Opthalmosaurus',
  },
  {
    img: '/img/tricera_skull.png',
    name: 'Triceratops',
  },
];

// TODO: Replace this comment with your code
const checkNameInSession = (req, res, next) => {
  if (!req.session.name) {
    return res.redirect('/');
  }
  next();
};


app.get('/random-fossil.json', (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});

// Route to extract the name from the form and store it in session
app.post('/get-name', (req, res) => {
  const {userName} = req.body;
  req.session.name = userName;
  

  // Store the name in the session
 res.redirect('/top-fossils');

 
});

// Route to render the top-fossils page
app.get('/top-fossils', (req, res) => {
  if (req.session.name) {
    res.render('top-fossils.html.njk', { fossils: MOST_LIKED_FOSSILS, userName: req.session.name });
  } else {
    res.redirect('/');
  }
});

// Route to render the homepage
app.get('/', (req, res) => {
  if (req.session.name) {
    res.redirect('/top-fossils');
  } else {
    res.render('homepage.html.njk');
  }
});

// Route to like a fossil
app.post('/like-fossil', (req, res) => {
  const { fossil } = req.body;
  if (MOST_LIKED_FOSSILS[fossil]) {
    MOST_LIKED_FOSSILS[fossil].num_likes++;
    res.render('thank-you.html.njk', { userName: req.session.name });
  } else {
    res.status(400).send('Invalid fossil ID');
  }
});



  


  
  
  



ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});
