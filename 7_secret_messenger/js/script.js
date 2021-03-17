const CryptoJS = require('crypto-js');
const coder = require('web3/lib/solidity/coder');
const Web3 = require("web3");

// Connect a the web3 provider
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/4aa415a154114b41a860b6a3f443f429"));
const CONTRACT_ADDRESS = "0x117Dc5D5065Bcc3E997a2E12f4429D9F599cd4aC";
const privateKey = new Buffer("802710cd614604b2d2d51774717814153a647bb866328bd02e0e36f9d915985e", 'hex');
const account = "0xEA159949CcE9738F9739470f9F3628B3f9229d52";

$("#setMessageButton").click(function () {
    const msg = $("#userInput").val();
    setMessage(msg);
    $("#messageText").text(msg);
});

function setMessage(message) {
    var functionName = 'setMessage'
    var types = ['string']
    var args = [message]
    var fullName = functionName + '(' + types.join() + ')'
    var signature = CryptoJS.SHA3(fullName, { outputLength: 256 }).toString(CryptoJS.enc.Hex).slice(0, 8)
    var dataHex = signature + coder.encodeParams(types, args)
    var data = '0x' + dataHex
    var nonce = web3.toHex(web3.eth.getTransactionCount(account))
    var gasPrice = web3.toHex(web3.eth.gasPrice);
    var gasLimitHex = web3.toHex(300000);
    var rawTx = { 'nonce': nonce, 'gasPrice': gasPrice, 'gasLimit': gasLimitHex, 'from': account, 'to': CONTRACT_ADDRESS, 'data': data }
    var tx = new Tx(rawTx)
    tx.sign(privateKey)
    var serializedTx = '0x' + tx.serialize().toString('hex')
    web3.eth.sendRawTransaction(serializedTx, function (err, txHash) { console.log(err, txHash) })
}