const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.remove);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.updateSchema, "Body must have at least one field"),
  ctrl.update
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema, "missing field favorite"),
  ctrl.updateStatusContact
);

module.exports = router;
