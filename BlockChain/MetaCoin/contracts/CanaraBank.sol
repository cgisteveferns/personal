/**"SPDX-License-Identifier: UNLICENSED" */
pragma solidity >=0.4.22 <0.9.0;
contract CanaraBank {

    uint256 clientCount;
    mapping (address => uint) private balances;
    address public owner;

    constructor() payable public{
        require(msg.value==30, "Initial Deposit of 30 ether is required");
        clientCount=0;
        owner=msg.sender;

    }

    event LogDepositEvent(address indexed accountAddress,uint256 depositAmt);

    function deposit() public payable returns (uint256){
        balances[msg.sender]+=msg.value;
        emit LogDepositEvent(msg.sender,msg.value);
        
        return balances[msg.sender];
    }

    function withdraw(uint256 amount)  payable public  returns (uint256){
        require(amount<balances[msg.sender], "Bank Balance should be greater than withdrawal amount");
        balances[msg.sender]-=amount;
        msg.sender.transfer(amount);
        return balances[msg.sender];
        
    }

    function getBankBalanceofCustomer() public view returns (uint256){
        return balances[msg.sender];
    }

    function getBankBalance() public view returns (uint256){
        return address(this).balance;
    }


}