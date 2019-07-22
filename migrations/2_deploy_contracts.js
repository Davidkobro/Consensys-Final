var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var FreelanceCampaign = artifacts.require("./FreelanceCampaign.sol");


module.exports = function(deployer, network, accounts) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(FreelanceCampaign, accounts[0]);
};
