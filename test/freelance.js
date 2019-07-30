 const Freelance = artifacts.require("../contracts/FreelanceCampaign.sol");

contract("FreelanceCampaign", accounts => {

//INITIAL CONTRACT TESTS

   //Tests to see if the campaign can properly change the value of stored data when initially starting the contract
  it("...should store the value 89.", async () => {
    const freelanceInstance = await Freelance.deployed();

    // Set value of 89
    await freelanceInstance.methods.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await freelanceInstance.methods.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });


  //Tests to check the freelancer address
  it("...should be the correct address.", async () => {
    const freelanceInstance = await Freelance.deployed();

    // Set value of 89
    await freelanceInstance.methods.constructor();

    // Get stored value
    const freelancerAddress = await freelanceInstance.methods.freelancer().call();

    //msg.sender?
    assert.equal(freelancerAddress, "The value 89 was not stored.");
  });


  //TEST FOR REQUEST


//Tests whether the freelancers can create a request 
  it("...creates a request.", async () => {
    const freelanceInstance = await Freelance.deployed();

    // Set value of 89
    await freelanceInstance.methods.createRequest(1, { from: accounts[0] });


    // gets amount requested 
    const storedData = await freelanceInstance.methods.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });


//Tests whether the request amount is in Ether as opposed to wei 
it("...makes sure the request amount is in Ether rather than Wei.", async () => {
  const freelanceInstance = await Freelance.deployed();

  // Set value of 89
  await freelanceInstance.methods.createRequest(1, { from: accounts[0] });

  // Get stored value
  const storedData = await freelanceInstance.methods.get.call();

  assert.equal(storedData, 89, "The value 89 was not stored.");
});


//Tests if a request properly pushes to the request array and the value in the request is accurate
it("...makes sure the request amount is in Ether rather than Wei.", async () => {
  const freelanceInstance = await Freelance.deployed();

  // Set value of 89
  await freelanceInstance.methods.createRequest(1, { from: accounts[0] });

  // Get stored value
  const storedData = await freelanceInstance.methods.get.call();

  assert.equal(storedData, 89, "The value 89 was not stored.");
});
  

//TEST FOR APPROVE 


//Tests whether a request can properly be approved and that the funds transfer
it("...creates a request.", async () => {
  const freelanceInstance = await Freelance.deployed();

  // Set value of 89
  await freelanceInstance.methods.createRequest(1, { from: accounts[0] });

  // Get stored value
  const storedData = await freelanceInstance.methods.get.call();

  assert.equal(storedData, 89, "The value 89 was not stored.");
});

});
 