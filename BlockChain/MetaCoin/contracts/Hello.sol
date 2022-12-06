/**"SPDX-License-Identifier: UNLICENSED" */
pragma solidity >=0.4.22 <0.9.0;
contract Hello {
    string greeting; ///="Welcome to block Chain Test";

 
    constructor(string memory _greeting) public {
        greeting=_greeting;
    }

    function displayGreeting() public view returns (string memory){
       
        return greeting;
    }

}


