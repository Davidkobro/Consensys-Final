pragma solidity ^0.5.0;

contract SimpleStorage {
  uint storedData;
  address public manager;

  constructor() public {
        manager = msg.sender;
    }

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
