const db = require("../models");
const Ddosrequest = db.ddosrequests;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

// Create and Save a new Portatil
exports.create = (req, res) => {
    // Validate request
    console.log(req.body.params, req.body)
    if (!req.body.srcMac) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    cDate = new Date();
    //req.body.datetime = new Date(req.body.datetime);
    // Create a Portatil

    const ddosrequests = {
        datetime: Date.parse(req.body.dateTime),
        vlan: req.body.vlan,
        out: req.body.out,
        srcMac: req.body.srcMac,
        protocol: req.body.protocol,
        srcIp: req.body.srcIp,

        srcPort: req.body.srcPort,
        dstIP: req.body.dstIP,
        dstPort: req.body.dstPort,
        pktLength: req.body.pktLength,
    };

    // Save Portatil in the database
    Ddosrequest.create(ddosrequests)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err || err.message || "Some error occurred while creating the Portatil."
            });
        });
};

// Retrieve all Portatils from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null;

    Ddosrequest.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving portatils."
            });
        });
};

// Find a single Portatil with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Ddosrequest.findByPk(id)
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

    Ddosrequest.findAll({
            where: {
                hostname: {
                    [Op.like]: `%${hostname}%`
                }
            }
        })
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

    Ddosrequest.update(req.body, {
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

    Ddosrequest.destroy({
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
    Ddosrequest.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Portatils were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all portatils."
            });
        });
};

// find all published Portatil
exports.findAllHostname = (req, res) => {
    Ddosrequest.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving portatils."
            });
        });
};

// Find a single Portatil with a hostname
exports.ports = (req, res) => {

    Ddosrequest.findAll({
            attributes: ['dstPort', [sequelize.literal('COUNT(*)'), 'num_occ']],
            group: ["dstPort"],
            order: [
                [sequelize.literal('COUNT(*)')]
            ]
        })
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
exports.src = (req, res) => {

    Ddosrequest.findAll({
            attributes: ['srcMac', [sequelize.literal('COUNT(*)'), 'num_occ']],
            group: ["srcMac"],
            order: [
                [sequelize.literal('COUNT(*)')]
            ]
        })
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
exports.dst = (req, res) => {
    Ddosrequest.findAll({
            attributes: ['dstIp', [sequelize.literal('COUNT(*)'), 'num_occ']],
            group: ["dstIp"],
            order: [
                [sequelize.literal('COUNT(*)')]
            ]
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Portatil with id=" + id
            });
        });
};