const connection = require('../app'); 
const { Op, Sequelize, QueryTypes} = require("sequelize");




connection.io.on("connection", (socket) => {

    socket.on('disconnect', () => {
        console.log('x desconectou: ' + socket.id);
    })

    //socket.on("palavra", (data) => {
    //    console.log(data);
    //    tabAcidentes.findOne({ where: { id: 9 } });
    //    socket.emit("resultado", data.hello + " hello mundo");
    //})
})


module.exports = {
    connection
}