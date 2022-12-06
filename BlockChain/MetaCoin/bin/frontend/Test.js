const Web3 = require('web3');
// const Tx = require('ethereumjs-tx');
const Migrations = require('../../build/contracts/Migrations.json');
const Provider = require('@truffle/hdwallet-provider');
const rpcURL = 'https://rinkeby.infura.io/v3/8a02cebbb87b4d47b38945710a716ac4';
const web3 = new Web3(rpcURL);
const address = '0x6b21b93d54400F92EFe4341c0D7c35D30Df28639';
const privateKey = "e7579e22c0ffc312bb4daa6a735287114d24f47be6e74a22d47ebd8271593144";
web3.eth.getBalance(address, (err, wei) => {
    balance = wei ? web3.utils.fromWei(wei.toString(), 'ether') : '';
    err = err;
    console.log(balance);
    console.log(err);
});
/*

const contractAddress = "0x6EF3127E40478094B4bb5ae0B6B88e750a81E75a";
var contract = new web3.eth.Contract(abi, contractAddress);
async function getCurrentAccount() {
    const accounts = await web3.eth.getAccounts();
    console.log("accounts  : " + accounts);
    return accounts[0];
    r
}


async function setCompleted() {
    const value = Math.floor(Math.random() * 100);
    // updateStatus(`Updating coolNumber with ${value}`);
    const account = getCurrentAccount();
    console.log("account  : " + account);
    const isCompleted = await contract.methods.setCompleted(value).send({from: account});
    // updateStatus('Updated.');
};
// const account = await getCurrentAccount();

// contract.methods.setCompleted(5000).send({from: account})


contract.methods.last_completed_migration().call((err, result) => {
    console.log(" last_completed_migration result3 " + result);
    console.log(" last_completed_migration err3 :" + err);
})
*/
async function init() {
    try {
        // const rpcURL = 'https://rinkeby.infura.io/v3/8a02cebbb87b4d47b38945710a716ac4';
        // const privateKey = "e7579e22c0ffc312bb4daa6a735287114d24f47be6e74a22d47ebd8271593144";
        const provider = new Provider(privateKey, rpcURL);
        const web3 = new Web3(provider);
        const address = '0x6b21b93d54400F92EFe4341c0D7c35D30Df28639';
        const contractAddress = "0x6EF3127E40478094B4bb5ae0B6B88e750a81E75a";
        const abi = [
            {
                "constant": true,
                "inputs": [],
                "name": "last_completed_migration",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "completed",
                        "type": "uint256"
                    }
                ],
                "name": "setCompleted",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];

        const networkId = await web3.eth.net.getId();
        console.log("networkId " + networkId);
        var contract = new web3.eth.Contract(Migrations.abi, Migrations.networks[networkId].address);
        console.log("Before Completed " + await contract.methods.last_completed_migration().call());
        const tx = await contract.methods.setCompleted(244300).send({from: address});
        console.log("Transaction Hash " + tx.transactionHash);
        console.log("After Completed " + await contract.methods.last_completed_migration().call());
        // const gas = await tx.estimateGas({from: address});
        // const gasPrice = await web3.eth.gasPrice;
        // const data = tx.encodeABI();
        // const nonce = await web3.eth.getTransactionCount();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
init();
// init();console.log("... End ....");
