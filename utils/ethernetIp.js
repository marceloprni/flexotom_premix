const { Controller, Tag, EthernetIP } = require("ethernet-ip");
const { DINT } = EthernetIP.CIP.DataTypes.Types;

const PLC = new Controller();
let TagConst = new Tag("httpPremix", null, DINT);

module.exports = {
    PLC,
    TagConst
}