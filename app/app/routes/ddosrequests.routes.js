module.exports = app => {
    const portatil = require("../controllers/ddosrequests.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", portatil.create);

    // Retrieve all Tutorials
    router.get("/ports/", portatil.ports);

    router.get("/src/", portatil.src);

    router.get("/dst/", portatil.dst);

    // Retrieve a single Tutorial with id
    router.get("/mac/:mac", portatil.findOneByHostname);

    // Retrieve all Tutorials
    router.get("/", portatil.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", portatil.findOne);



    // Update a Tutorial with id
    router.put("/:id", portatil.update);

    // Delete a Tutorial with id
    router.delete("/:id", portatil.delete);

    // Delete all Tutorials
    router.delete("/", portatil.deleteAll);




    app.use('/api/ddosrequests', router);
};