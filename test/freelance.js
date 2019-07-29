 const Freelance = artifacts.require("./FreelanceCampaign.sol");

 //Tests to see if the campaign can properly change the value of stored data when initially starting the contract
contract("FreelanceCampaign", accounts => {
  it("...should store the value 89.", async () => {
    const freelanceInstance = await Freelance.deployed();

    // Set value of 89
    await freelanceInstance.methods.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await freelanceInstance.methods.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });


//Tests whether the freelancers can create a request 
  it("...creates a request.", async () => {
    const freelanceInstance = await Freelance.deployed();

    // Set value of 89
    await freelanceInstance.methods.createRequest(1, { from: accounts[0] });

    // Get stored value
    const storedData = await freelanceInstance.methods.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });


//Tests whether the request amount is in Ether as opposed to wei 
it("...creates a request.", async () => {
  const freelanceInstance = await Freelance.deployed();

  // Set value of 89
  await freelanceInstance.methods.createRequest(1, { from: accounts[0] });

  // Get stored value
  const storedData = await freelanceInstance.methods.get.call();

  assert.equal(storedData, 89, "The value 89 was not stored.");
});
  

//Tests whether a request can properly be approved 
it("...creates a request.", async () => {
  const freelanceInstance = await Freelance.deployed();

  // Set value of 89
  await freelanceInstance.methods.createRequest(1, { from: accounts[0] });

  // Get stored value
  const storedData = await freelanceInstance.methods.get.call();

  assert.equal(storedData, 89, "The value 89 was not stored.");
});

});
 