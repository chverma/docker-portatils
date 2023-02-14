const db = require("../models");
const Portatil = db.portatil;
const Op = db.Sequelize.Op;

// Create and Save a new Portatil
exports.create = (req, res) => {
  // Validate request
  if (!req.body.hostname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  cDate = new Date();
  req.body.datetime = new Date(req.body.mes+' '+req.body.dia+', '+cDate.getFullYear()+' ' +req.body.hora);
  aux_port = req.body.hostname.replace("carro", "").replace("Port", ";").split(";");
  req.body.carro = aux_port[0];
  req.body.num_portatil = aux_port[1];
  // Create a Portatil
  const portatil = {
    datetime: req.body.datetime,
    user: req.body.user,
    hostname: req.body.hostname,
    serialnumber: req.body.serialnumber,
    carro: req.body.carro,
    num_portatil: req.body.num_portatil
  };

  // Save Portatil in the database
  Portatil.create(portatil)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err || err.message || "Some error occurred while creating the Portatil."
      });
    });
};

// Retrieve all Portatils from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Portatil.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving portatils."
      });
    });
};

// Find a single Portatil with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Portatil.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Portatil with id=" + id
      });
    });
};

// Find a single Portatil with a hostname
exports.findOneByHostname = (req, res) => {
  const hostname = req.params.hostname;

  Portatil.findAll({where: { hostname: { [Op.like]: `%${hostname}%` } }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Portatil with id=" + id
      });
    });
};

// Update a Portatil by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Portatil.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Portatil was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Portatil with id=${id}. Maybe Portatil was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Portatil with id=" + id
      });
    });
};

// Delete a Portatil with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Portatil.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Portatil was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Portatil with id=${id}. Maybe Portatil was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Portatil with id=" + id
      });
    });
};

// Delete all Portatils from the database.
exports.deleteAll = (req, res) => {
  Portatil.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Portatils were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all portatils."
      });
    });
};

// find all published Portatil
exports.findAllHostname = (req, res) => {
  Portatil.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving portatils."
      });
    });
};
