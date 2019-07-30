pragma solidity ^0.5.0;

//safe math library
import "../client/node_modules/zeppelin-solidity/contracts/math/SafeMath.sol";

/// @title A way for freelancers to request funds from employeers without paying typical contracting fees
/// @author David Kobrosky
/// @notice You can request funds as a freelancer, pay funds as an employer, and pause the contract as a freelancer
/// @dev All function calls are currently implemented without side effects
contract FreelanceCampaign {
    
    struct Request {
        uint valueRequested;
        address payable ownerToPay;
        bool complete;
        mapping(address => bool) approvals;
    }

    //Using Openzeppelin for uint operations
    using SafeMath for uint;
    //Stored Data is a uint that verifies proper initiation of contract
    uint storedData;
    //Array of requests from freelancers
    Request[] public requests;
    //Mapping of approvers that determines if they can approve requests 
    mapping(address => bool) public approvers;
    //Address of the contract owner, the freelancer
    address payable public freelancer;
    //Owner is the employer who fullfills a given request 
    address payable public owner;
    //When True, Contract ceases to function
    bool public contractPaused = false; 

    //Events
    event LogRequested(address freelanceAddress, uint amount);
    event LogApproved(address ownerAddress, uint amount);


    //Modifiers
    modifier freelanceronly() {
        require(msg.sender == freelancer);
        _;
    }

    // If the contract is paused, stop the modified function
    modifier checkIfPaused() {
        require(contractPaused == false);
        _;
    }

    //Called upon contract execution
    constructor() public {
        freelancer = msg.sender;
    }

    //@dev updates to 1 when a freelancer calls the contract (in App.js)
    function set(uint x) public {
        storedData = x;
    }

    //getter function for the stored value
    function get() public view returns (uint) {
        return storedData;
    }

    //@noticed helper function to get the value requested so App.js can properly run
    function getRequestValue(uint index) public view returns (uint){
        Request storage request = requests[index];
        uint value = request.valueRequested;
        return value;
    }

    //@dev only can be called by freelancer when they want to pause the contract. 
    function circuitBreaker() public freelanceronly { 
        if (contractPaused == false) { 
            contractPaused = true; 
        }
        else { 
            contractPaused = false; 
        }
    }   
    
    //@notice This is the function called for freelancers to create a request 
    //@param value requested to the employer as well as the address of the employer 
    //@dev multiplies the value requested so the request is in Ether rather than Wei 
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

    //@notice This function is called by the employer to pay the freelancer 
    //@dev the require statements make sure that the person approving this is not the freelancer 
    //and that the request was not already market as complete (can't call this twice)
    function approveRequest(uint index) public payable checkIfPaused{
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        require(!request.complete);
        
        uint amount = request.valueRequested;
        freelancer.transfer(amount);
        emit LogApproved(msg.sender, amount);
        request.complete = true;
    }

    //enables one to get the number of tests and primarily for testing purposes. 
    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}
