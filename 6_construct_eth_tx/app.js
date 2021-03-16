/*
 * CONFIGURATION
 */

// -- Step 1: Set up the appropriate configuration
const Web3 = require("web3");
const EthereumTransaction = require("ethereumjs-tx");
const web3 = new Web3('HTTP://127.0.0.1:7545');

// -- Step 2: Set the sending and receiving addresses for the transaction.
const sendingAddress = '0xb43C04B53d157249B545722d4D57a63160853551';
const receivingAddress = '0xDe53aF629c7f2bD1b7002248ac49f48F6112b766';

// -- Step 3: Check the balances of each address
web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);

/**
 * CREATE A TRANSACTION
 */

// -- Step 4: Set up the transaction using the transaction variables as shown
const txParams = {
    nonce: 3,
    to: receivingAddress,
    gasPrice: 100,
    gasLimit: 100000,
    value: 1000000000000000,
}

// -- Step 5: View the raw transaction
console.log(txParams);

// -- Step 6: Check the new account balances (they should be the same)
web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);

/*
 * Sign the Transaction
*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender
const privateKeySenderHex = Buffer.from('0aea5a93f16f0b64d64b971c4b0985f11783a57e988ba23ba393af1ac180955d', 'hex');
const transaction = new EthereumTransaction.Transaction(txParams);
transaction.sign(privateKeySenderHex);

/*
 * Send the transaction to the network
 */

// -- Step 8: Send the serialized signed transaction to the Ethereum network.
const serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);
