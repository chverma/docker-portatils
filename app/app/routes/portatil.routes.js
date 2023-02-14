module.exports = app => {
  const portatil = require("../controllers/portatil.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", portatil.create);

  // Retrieve all Tutorials
  router.get("/", portatil.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", portatil.findOne);

  // Retrieve a single Tutorial with id
  router.get("/hostname/:hostname", portatil.findOneByHostname);

  // Update a Tutorial with id
  router.put("/:id", portatil.update);

  // Delete a Tutorial with id
  router.delete("/:id", portatil.delete);

  // Delete all Tutorials
  router.delete("/", portatil.deleteAll);


  app.use('/api/portatils', router);
};
