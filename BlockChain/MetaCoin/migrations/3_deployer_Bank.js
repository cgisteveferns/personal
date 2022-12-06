const CanaraBank = artifacts.require("CanaraBank");

module.exports = function (deployer) {
    deployer.deploy(CanaraBank, {value: 30});
};
