const router = require('express').Router();
const store = require('../db/store');


// GET Route for retrieving all the feedback
// router.get('/notes', (req, res) =>
//   readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
// );

// GET Route for retrieving all the notes
router.get('/notes', (req, res) => {
  store
    .getNotes()
    .then((notes) => {return res.json(notes);})
    .catch((err) => res.status(500).json(err));
});

// POST Route for submitting feedback
// router.post('/notes', (req, res) => {
//   const { title, text } = req.body;

//   if (title && text) {
//     const newNote = {
//       title,
//       text,
//       id: uuid(),
//     };

//     readAndAppend(newNote, './db/db.json');

//     const response = {
//       status: 'success',
//       body: newNote,
//     };

//     res.json(response);
//   } else {
//     res.json('Error, Title and Text are required.');
//   }
// });

// POST Route for submitting
router.post('/notes', (req, res) => {
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});


// router.delete('/notes/:id' , (req, res) => {
//     const id = req.params.id;
//     readAndRemove(id, './db/db.json');
//     res.json('Your note has been deleted')
// });

// DELETE Route for deleting
router.delete('/notes/:id', (req, res) => {
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
