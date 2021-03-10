const Web3 = require('web3');

const INFURA_MAINNET_URL = "https://mainnet.infura.io/v3/4aa415a154114b41a860b6a3f443f429";
const MAINNET_ADDRESS = "";

async function queryAccount(address, unit = 'wei') {
    const web3 = new Web3(INFURA_MAINNET_URL);

    const balance = await web3.eth.getBalance(address);
    const balanceInUnit = web3.utils.fromWei(balance, unit);
    const txCount = await web3.eth.getTransactionCount(address);

    console.log(`${address}: balance = ${balanceInUnit} ${unit}, transaction count = ${txCount}`);
}

queryAccount(MAINNET_ADDRESS); // in wei
queryAccount(MAINNET_ADDRESS, "ether"); // in ether
