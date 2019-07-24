import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import FreelanceCampaign from "./contracts/FreelanceCampaign.json";
import getWeb3 from "./utils/getWeb3";
import "./App.css";

class App extends Component {
  state = { 
    storageValue: 0, 
    web3: null, 
    account: null, 
    contract: null,
    manager: ''
    //requests: []
    //balance: ''
    //value: ''
  };

  componentDidMount = async () => {


    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
        );




      // Get the contract instance.
     /*  const freeDeployedNetwork = FreelanceCampaign.networks[networkId];
      const freelanceInstance = new web3.eth.Contract(
        FreelanceCampaign.abi,
        freeDeployedNetwork && freeDeployedNetwork.address
      ); */

      //console.log(freelanceInstance);

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
    const { accounts, contract } = this.state;

    const manager = await contract.methods.manager().call();
    //const requests = await contract.methods.getRequestsCount().call();
    //const balance = await web3.eth.getBalance(contract.options.address);
     

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    //******* When ready, add requests below to set state
    //add balance to state
    this.setState({ storageValue: response, manager : manager });
  };


  /* handleClick(event){
    const contract = this.state.contract 
    const account = this.state.account 

    var value = 3

    contract.methods.set(value);
    //return contract.methods.get.call();
    return this.setState({storageValue: contract.methods.get.call()});
  }  */


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Lowest fees for Freelancers</h1>
        <p>20% of the cut to UpWork? We don't take a dime.</p>
        <h2>Project Details:</h2>
        <p> 
          This contract was deplpyed but the freelancer at {this.state.manager} 
          {//There are currently {this.state.requests.length} requests and the value of the most recent 
          //request was {web3.utils.fromWei(this.state.balance), 'ether' }
        }
        </p> 
  

        <hr />

        <form >
          <h4> Are you a freelancer and want to avoid the fees on upwork? Enter the Eth address of your contractor here! </h4>
          <div>
            <label> Amount of Ether to enter </label>
            <input
              //value={this.state.value}
              //onChange={event => this.setState({ value: event.target.value})}
            />
          </div>
          <button>Enter </button>
        </form>

        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>   
        {/* <button onClick={this.handleClick.bind(this)}> Set Storage</button>  */}
     </div>
    );
  }
}

export default App;
