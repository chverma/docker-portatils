module.exports = (sequelize, Sequelize) => {
    const Ddosrequest = sequelize.define("ddosrequests", {
        datetime: {
            type: Sequelize.DATE
        },
        vlan: {
            type: Sequelize.STRING
        },
        out: {
            type: Sequelize.STRING
        },
        srcMac: {
            type: Sequelize.STRING
        },
        protocol: {
            type: Sequelize.STRING
        },
        srcIp: {
            type: Sequelize.STRING
        },
        srcPort: {
            type: Sequelize.INTEGER
        },
        dstIP: {
            type: Sequelize.STRING
        },
        dstPort: {
            type: Sequelize.INTEGER
        },
        pktLength: {
            type: Sequelize.INTEGER
        }
    });

    return Ddosrequest;
};