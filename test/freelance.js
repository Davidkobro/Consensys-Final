 const Freelance = artifacts.require("../contracts/FreelanceCampaign.sol");

contract("FreelanceCampaign", accounts => {

//INITIAL CONTRACT TESTS

   //Tests to see if the campaign can properly change the value of stored data when initially starting the contract
  it("...should store the value 5.", async () => {
    const freelanceInstance = await Freelance.new();

    // Set value of 89
    await freelanceInstance.set(5, { from: accounts[0] });

    // Get stored value
    const storedData = await freelanceInstance.get.call();

    assert.equal(storedData, 5, "The value 5 was not stored.");
  });


  //Tests to check the freelancer address
  it("...should be the correct address.", async () => {
    const freelanceInstance = await Freelance.new();

    // Get stored value
    const freelancerAddress = await freelanceInstance.freelancer();

    //msg.sender?
    assert.equal(freelancerAddress, accounts[0], "The address is incorrect.");
  });


  //TEST FOR REQUEST


//Tests whether the freelancers can create a request 
//Tests whether the request amount is in Ether as opposed to wei 
  it("...creates a request.", async () => {
    const freelanceInstance = await Freelance.new();

    var value = 1;
    var employer = "0x8a44eB27760A7B4236c7fc9A318bbb23D0dbd66A";

    // creates request
    await freelanceInstance.createRequest(value, employer);
    
    // gets amount requested 
    let valueRequest = await freelanceInstance.getRequestValue(0);

    assert.equal(valueRequest, 1000000000000000000, "The value 1 was not requested.");
  });


//Tests if a request properly pushes to the request array 
it("...makes sure the request amount is in Ether rather than Wei.", async () => {
  const freelanceInstance = await Freelance.new();

  var value = 1;
  var employer = "0x8a44eB27760A7B4236c7fc9A318bbb23D0dbd66A";

  // creates request
  await freelanceInstance.createRequest(value, employer);
  
  // gets amount requested 
  let requestCount = await freelanceInstance.getRequestsCount()

  assert.equal(requestCount, 1, "The value 1 was not requested.");
});
  

//TEST FOR APPROVE 


//Tests whether a request can properly be approved and that the funds transfer
it("...creates a request.", async () => {
  const freelanceInstance = await Freelance.new();

  var value = 1;
  var employer = accounts[1];

  var oldValue =  Number(await web3.eth.getBalance(accounts[1]))

  // creates request
  await freelanceInstance.createRequest(value, employer)

  let valueRequest = await freelanceInstance.getRequestValue(0)

  await freelanceInstance.approveRequest(0, {value: valueRequest, from: employer})

  var newValue = Number(await web3.eth.getBalance(accounts[1]))

  assert.isBelow(newValue, oldValue, "not lower value");
});

});
 