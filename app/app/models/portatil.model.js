module.exports = (sequelize, Sequelize) => {
  const Portatil = sequelize.define("portatil", {
    datetime: {
      type: Sequelize.DATE
    },
    hostname: {
      type: Sequelize.STRING
    },
    user: {
      type: Sequelize.STRING
    },
    serialnumber: {
      type: Sequelize.STRING
    },
    carro: {
      type: Sequelize.INTEGER
    },
    num_portatil: {
      type: Sequelize.INTEGER
    }
  });

  return Portatil;
};
