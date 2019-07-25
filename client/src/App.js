import React, { Component } from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import FreelanceCampaign from "./contracts/FreelanceCampaign.json";
import getWeb3 from "./utils/getWeb3";
import "./App.css";

class App extends Component {
  state = { 
    storageValue: '', 
    web3: null, 
    account: null, 
    contract: null,
    freelancer: '',
    requests: [],
    value: '',
    message: '',
    employer: ''
  };


  componentDidMount = async () => {

    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      //const deployedNetwork = SimpleStorageContract.networks[networkId];
      //const instance = new web3.eth.Contract(
        //SimpleStorageContract.abi,
       // deployedNetwork && deployedNetwork.address,
        //);

      const freeDeployedNetwork = FreelanceCampaign.networks[networkId];
      const instance = new web3.eth.Contract(
        FreelanceCampaign.abi,
        freeDeployedNetwork && freeDeployedNetwork.address
      ); 


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }


    
  };

  runExample = async () => {

    //const web3 = await getWeb3();

    const { accounts, contract } = this.state;

    const freelancer = await contract.methods.freelancer().call();
    const requests = await contract.methods.getRequestsCount().call();
    //const balance = await web3.eth.getBalance(contract.options.address);
     

    // Stores a given value, 5 by default.
    await contract.methods.set(1).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    //balance : balance
    this.setState({ storageValue: response, freelancer : freelancer, requests : requests });

  };



  //don't need to worry about "this" so don't need to bind
  onSubmit = async (event) => {

    const { accounts, contract, web3 } = this.state;


    event.preventDefault();


    this.setState({ message: 'Waiting on transaction success...' })

    //await contract.methods.createRequest({web3.utils.toWei(this.state.value, 'ether')}, this.state.employer).send({
     // from: accounts[0]
    //})
    console.log(this.state.value)
    console.log(this.state.employer)
    console.log(this.state.contract)
    await contract.methods.createRequest(this.state.value, this.state.employer).send({
      from: accounts[0]
    })

    this.setState({ message: 'You have submitted a request!' })
  } 

  onClick = async () => {

    const { accounts, contract, web3 } = this.state;

    this.setState({ message: 'Waiting on Transaction Success...' });

    //may need to crate a getter that return struct at that index (value requested)
    //will return specific part of the struct
    let valueRequest = await contract.methods.requests(0).valueRequested.call()

    await contract.methods.approveRequest(0).send({
      from: accounts[0],
      value: valueRequest
    })

    this.setState({ message: 'Payment has been sent :)' })
  };

  render() {
    //const web3 = getWeb3();

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    //X = {this.state.requests.length}
    // Y = {web3.utils.fromWei(this.state.balance), 'ether' }
    /*
    There are currently requests and the value of the most recent 
          request was Y ether
          */
    return (
      <div className="App">
        <h1>Lowest fees for Freelancers</h1>
        <p>20% of the cut to UpWork? We don't take a dime.</p>
        <h2>Project Details:</h2>
        
        <p>
          This contract was deplpyed by the freelancer at {this.state.freelancer} 
          
        </p> 
  
        <hr />

        <form onSubmit={this.onSubmit}>
          <h4> Are you a freelancer and want to avoid the fees on upwork? Enter the Eth address of your contractor here! </h4>
          <div>
            <label> Amount of Ether to request from your employer </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value})}
            />
          </div>
          <div>
            <label> Address of your Employer </label>
            <input
              value={this.state.employer}
              onChange={event => this.setState({ employer: event.target.value})}
            />
          </div>
          <button> Enter Amount and Employer Address </button>
          
        </form>

        <hr />

        <h4>If you're the employer, click below to send the contractor their requested amount of {this.state.value} ether </h4>
        <button onClick={this.onClick}> Pay Contractor </button>

        <hr />

        <h3>{this.state.message}</h3>
        

    
        <div>Has A Freelancer entered the Contract? 1 for Yes: {this.state.storageValue}</div>   
       
     </div>
    );
  }
}

export default App;


//get App to function properly 
//Check to see what's required around the excersizes as I still need to do one of them
//other requirements I'll work on (libraries, Curcuit breaker pattern, ReadMe, etc)
//section that describes design decisions I made (file called design patterns) 
//section on common attacks and how contract protects 
//video of me using application and how I did it. 
//Readme explain everything and everything someone needs to test the project (oversharing is always best) 