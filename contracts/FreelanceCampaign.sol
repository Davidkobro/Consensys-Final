pragma solidity ^0.5.0;

//safe math library
import "github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath.sol";


contract FreelanceCampaign {
    
    struct Request {
        //string ipfsreference;
        uint valueRequested;
        address payable ownerToPay;
        bool complete;
        mapping(address => bool) approvals;
    }

    using SafeMath for uint;
    uint storedData;
    Request[] public requests;
    mapping(address => bool) public approvers;
    address payable public freelancer;
    address payable public owner;
    bool public contractPaused = false; 


    event LogRequested(address freelanceAddress, uint amount);
    event LogApproved(address ownerAddress, uint amount);

    modifier freelanceronly() {
        require(msg.sender == freelancer);
        _;
    }

    // If the contract is paused, stop the modified function
    // Attach this modifier to all public functions
    modifier checkIfPaused() {
        require(contractPaused == false);
        _;
    }


    constructor() public {
        freelancer = msg.sender;
    }

    function set(uint x) public {
        storedData = x;
    }

    function getRequestValue(uint index) public view returns (uint){
        Request storage request = requests[index];
        uint value = request.valueRequested;
        return value;
    }

    function get() public view returns (uint) {
     return storedData;
    }

    function circuitBreaker() public freelanceronly { // onlyfreelancer can call
        if (contractPaused == false) { 
            contractPaused = true; 
        }
        else { 
            contractPaused = false; 
        }
    }   
    
    function createRequest(uint valueRequested, address payable ownerToPay) public freelanceronly checkIfPaused{
        Request memory newRequest = Request({
            //converts to Ether
           valueRequested: valueRequested.mul(1000000000000000000),
           ownerToPay: ownerToPay,
           complete: false
        });
        
        owner = newRequest.ownerToPay;
        requests.push(newRequest);
        emit LogApproved(msg.sender, newRequest.valueRequested);
        approvers[owner] = true;

    }


    function approveRequest(uint index) public payable checkIfPaused{
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        require(!request.complete);
        
        //is this msg.sender (owner) or is it the freelancer?
        //request.approvals[msg.sender] = true;
        uint amount = request.valueRequested;
        freelancer.transfer(amount);
        emit LogApproved(msg.sender, amount);
        request.complete = true;
    }


    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}

//when crafting transaction using web 3 js 
//https://ethereum.stackexchange.com/questions/38034/using-sendtransaction-in-web3-js