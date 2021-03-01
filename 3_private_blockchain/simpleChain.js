const SHA256 = require('crypto-js/sha256');

/* ===== Block Class ===================================
|  Class with a constructor for block data model       |
|  ====================================================*/

class Block {
    constructor(data) {
        this.height = '';
        this.timeStamp = '';
        this.data = data;
        this.previousHash = '0x';
        this.hash = '';
    }
}

/* ===== Blockchain ===================================
|  Class with a constructor for blockchain data model  |
|  with functions to support:                          |
|     - createGenesisBlock()                           |
|     - getLatestBlock()                               |
|     - addBlock()                                     |
|     - getBlock()                                     |
|     - validateBlock()                                |
|     - validateChain()                                |
|  ====================================================*/

class Blockchain {
    constructor() {
        // new chain array
        this.chain = [];
        this.addBlock(this.createGenesisBlock())
    }

    createGenesisBlock() {
        return new Block("First block in the chain - Genesis block");
    }

    // getLatest block method
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // addBlock method
    addBlock(newBlock) {
        // block height
        newBlock.height = this.chain.length;
        // UTC timestamp
        newBlock.timeStamp = new Date().getTime().toString().slice(0, -3);

        // previous block hash
        if (this.chain.length > 0) {
            newBlock.previousHash = this.chain[this.chain.length - 1].hash;
        }
        // SHA256 requires a string of data
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
        console.log(JSON.stringify(newBlock));
        // add block to chain
        this.chain.push(newBlock);
    }
}

// Exporting the class BlockChain and Block to be reuse in other files
module.exports.Blockchain = Blockchain;
module.exports.Block = Block;