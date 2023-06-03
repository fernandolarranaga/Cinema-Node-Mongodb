const express = require('express');
const router  = express.Router();

const Cine = require('../models/Cine.model.js'); // <== add this line


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/nando', (req, res)=>res.send("Página nando"));
//router.get('/books', (req, res) => res.render('books-list.hbs'));

router.get('/movies', (req, res, next) => {
  Cine.find()
    .then(allTheMoviesFromDB => {
      // console.log('Retrieved books from DB:', allTheBooksFromDB);
      res.render('movie-list', { movies: allTheMoviesFromDB }); // pass `allTheBooksFromDB` to the view (as `books`)
    })
    .catch(error => console.log('Error while getting the books from the DB: ', error));
});


  // routes/book.routes.js
  router.get('/movies/create', (req, res) => res.render('movie-create'));
   
  router.post('/movies/create', (req, res) => {
    const { title, director, description, image } = req.body;
   
    Cine.create({ title, director, description, image })
      .then(() => res.redirect('/movies'))
      .catch(error => `Error while creating a new book: ${error}`);
  });


router.get('/movies/:movieId', (req, res) => {
  const { movieId } = req.params;
 
  Cine.findById(movieId)
    .then(theMovie => res.render('movie-details', { movie: theMovie }))
    .catch(error => console.log('Error while retrieving book details: ', error));
});


 // routes/book/:id/edit

 router.get('/movies/:id/edit', (req, res) =>{
    const {id}= req.params;

    Cine.findById( id )
    .then(data =>{res.render('movie-edit', data)})
    .catch(error => console.log(`Error while getting a single book for edit: ${error}`));
 });

 router.post('/movies/:id/edit', (req, res) =>{
   const {id}= req.params;
   const {title, director, description, image}= req.body;

   Cine.findByIdAndUpdate(id, {title, director, description, image}, {new: true})
   .then( dataUpdate => res.redirect(`/movies/${dataUpdate._id}`))
   .catch(err =>console.log(`El error es : ${error}`))
  });

  // eliminar

  router.post('/movies/:id/delete', (req, res) => {
    const {id} = req.params;

    Cine.findByIdAndDelete(id)
    .then(()=>res.redirect(`/movies`))
     .catch(error => console.log(`Error while deleting a movie: ${error}`));x
  })

module.exports = router;
