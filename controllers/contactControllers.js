const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

const postContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json("All fields (name, email, phone) are required");
  } else {
    const find = await Contact.create({
      name,
      email,
      phone,
      user_id: req.user.id,
    });
    res.status(200).json(find);
  }
  //   console.log(response);
});

// or u can use this method instead

// router.post("/", async (req, res) => {
//   try {
//     const data = req.body;

//     if (!data.name || !data.email || !data.phone) {
//       return res.status(400).json("All fields (name, email, phone) are required");
//     }

//     const newContact = new Contact(data);
//     const response = await newContact.save();

//     res.status(200).json(response);
//   } catch (err) {
//     res.status(500).json("err");
//   }
// });

const updateContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.findById(req.params.id);
  if (!contacts) {
    res.status(400).json({ message: "not found" });
  }

  if (contacts.user_id.toString() !== req.user.id) {
    res.status(403).send("Error");
  }

  const update = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(update);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.findById(req.params.id);
  if (!contacts) {
    res.status(400).json({ message: "not found" });
  }
  if (contacts.user_id.toString() !== req.user.id) {
    res.status(403).send("Error");
  }

  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(contacts);
});

const getParticularContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.findById(req.params.id);
  if (!contacts) {
    res.status(400).json({ message: "not found" });
  }
  res.status(200).json(contacts);
});

module.exports = {
  getContact,
  postContact,
  updateContact,
  deleteContact,
  getParticularContact,
};
