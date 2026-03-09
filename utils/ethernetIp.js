const { Controller, Tag, EthernetIP } = require("ethernet-ip");
const { DINT, INT } = EthernetIP.CIP.DataTypes.Types;

const PLC = new Controller();
let TagConst = new Tag("httpPremix", null, DINT);
let ReadConst = new Tag("httpPremix");

module.exports = {
    PLC,
    TagConst,
    ReadConst
}