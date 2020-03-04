const express = require('express');
const router = express.Router();

//@route   GET api/contacts
//@desc    get all user own contacts
//@access private
router.get('/', (req, res) => {
  res.send('get all your own contacts');
});

//@route   POST api/contacts
//@desc    add new your contact
//@access private
router.post('/', (req, res) => {
  res.send('add contact');
});

//@route   POST api/contacts/:id
//@desc    update the contact
//@access private
router.post('/:id', (req, res) => {
  res.send('update the contact');
});

//@route   DELETE api/contacts/:id
//@desc    delete the contact
//@access private
router.delete('/:id', (req, res) => {
  res.send('delete the contact');
});

module.exports = router;
