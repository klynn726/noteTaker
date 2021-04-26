const router = require('express').Router();
const { filterByQuery, createNewNote, validateNote } = require('../../lib/notes');
const notesDb = require('../../db/notes.json');

router.get('/notes', (req, res) => {
  let results = notesDb;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});



router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
   req.body.id = notesDb.length.toString();
  if (!validateNote(req.body)) {
    res.status(400).send('The note is invalid.');
  } else {
    const note = createNewNote(req.body, notesDb);
    res.json(note);
  }
});


module.exports = router;