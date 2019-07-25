pragma solidity ^0.5.0;

    //safe math library
    //import "github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath.sol";

    //curcut breaker pattern - terminate contract (if bug)
//contract Moral is Ownable{
        
 //       function kill()
 //       {
 //               if(msg.sender == owner) selfdestruct(owner);
 //       }

//}

contract FreelanceCampaign {
    
    struct Request {
        //string ipfsreference;
        uint valueRequested;
        address payable ownerToPay;
        bool complete;
        mapping(address => bool) approvals;
    }

    uint storedData;
    Request[] public requests;
    mapping(address => bool) public approvers;
    address payable public freelancer;
    address payable public owner;

    event LogRequested(address freelanceAddress, uint amount);
    event LogApproved(address ownerAddress, uint amount);

    modifier freelanceronly() {
        require(msg.sender == freelancer);
        _;
    }

    modifier owneronly() {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        freelancer = msg.sender;
    }

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
     return storedData;
    }
    
//took out string memory ipfsreference from parameter
    function createRequest(uint valueRequested, address payable ownerToPay) public freelanceronly {
        Request memory newRequest = Request({
           //ipfsreference: ipfsreference,
           valueRequested: valueRequested,
           ownerToPay: ownerToPay,
           complete: false
        });
        
        owner = newRequest.ownerToPay;
        requests.push(newRequest);
        emit LogApproved(msg.sender, newRequest.valueRequested);
        approvers[owner] = true;

    }


    function approveRequest(uint index) public payable owneronly{
        Request storage request = requests[index];
        require(request.valueRequested < msg.value, "not enough funds sent with transaction");
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