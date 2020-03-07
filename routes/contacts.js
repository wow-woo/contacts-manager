const express = require("express");
const router = express.Router();
const ContactModel_doc = require("../models/Contact");
const { check, validationResult } = require("express-validator");
const authController = require("../controllers/auth");

//@route   GET api/contacts
//@desc    get all user own contacts
//@access private
router.get("/", authController, async (req, res) => {
  try {
    const contacts = await ContactModel_doc.find({
      access_user: req.user.id
    }).sort({
      date: -1
    });

    res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//@route   POST api/contacts
//@desc    add new your contact
//@access private
router.post(
  "/",
  [
    authController,
    check("name", "name is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type, _id } = req.body;

    try {
      const newContact = new ContactModel_doc({
        name,
        email,
        phone,
        type,
        access_user: req.user.id
      });

      const contact = await newContact.save();
      res.status(200).send(contact);
    } catch (err) {
      console.log("err.message", err.message);
      res.status(500).send("server error");
    }
  }
);

//@route   PUT api/contacts/:id
//@desc    update the contact
//@access private
router.put("/:id", authController, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //build update
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await ContactModel_doc.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "contact not found " });
    if (contact.access_user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    contact = await ContactModel_doc.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route   DELETE api/contacts/:id
//@desc    delete the contact
//@access private
router.delete("/:id", authController, async (req, res) => {
  try {
    let contact = await ContactModel_doc.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "contact not found " });
    if (contact.access_user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    await ContactModel_doc.findByIdAndRemove(req.params.id);

    res.json({ msg: "contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
