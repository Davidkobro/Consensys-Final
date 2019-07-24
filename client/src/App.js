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

      //var SimpleStorageContract



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
      

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response, manager : manager});
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
        <h2>Freelancer Address:</h2>
        <p> {this.state.manager} </p> 
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
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
