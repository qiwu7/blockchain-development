/**
 * Importing the Block class
 */
//
const ChainClass = require('./simpleChain.js');
/**
 * Creating a blockchain object
 */

let chain = new ChainClass.Blockchain();
chain.addBlock(new ChainClass.Block("block 1"));
chain.addBlock(new ChainClass.Block("block 2"));

console.log(chain.chain);

/**
 * Step 3: Run the application in node.js
 *
 */

// From the terminal: cd into Project folder
// From the terminal: Run node app.js to run the code
