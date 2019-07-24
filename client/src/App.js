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
    //balance: ''
    //value: ''
    //message: ''
    //employer: ''
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
    await contract.methods.set("Yes").send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    //balance : balance
    this.setState({ storageValue: response, freelancer : freelancer, requests : requests });

  };


  /* handleClick(event){
    const contract = this.state.contract 
    const account = this.state.account 

    var value = 3

    contract.methods.set(value);
    //return contract.methods.get.call();
    return this.setState({storageValue: contract.methods.get.call()});
  }  */

  //don't need to worry about "this" so don't need to bind
  /* onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' })

    await contract.methods.createRequest({web3.utils.toWei(this.state.value, 'ether')}, this.state.employer).send({
      from: accounts[0]
      //do I need a value here?
    })

    this.setState({ message: 'You have submitted a request!' })
  } */


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
            <label> Amount of Ether to enter </label>
            <input
              //value={this.state.value}
              //onChange={event => this.setState({ value: event.target.value})}
            />
          </div>
          <div>
            <label> Address of Employer </label>
            <input
              //value={this.state.employer}
              //onChange={event => this.setState({ employer: event.target.employer})}
            />
          </div>
          <button> Enter Amount and Employer Address </button>
          
        </form>

        <hr />

        {//<h3>{this.state.message}</h1>
        }

    
        <div>Has A Freelancer entered the Contract?: {this.state.storageValue}</div>   
       
     </div>
    );
  }
}

export default App;
