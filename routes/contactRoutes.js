const express = require("express");
const router = express.Router();

const {
  getContact,
  postContact,
  updateContact,
  deleteContact,
  getParticularContact,
} = require("../controllers/contactControllers");
const tokenValidate = require("../middleware/validateUser");

router.use(tokenValidate);

router.route("/").get(getContact).post(postContact);

router
  .route("/:id")
  .put(updateContact)
  .delete(deleteContact)
  .get(getParticularContact);

module.exports = router;
