import SHA256 from 'crypto-js/sha256';

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
        this.addBlock(this.genesisBlock())
    }

    genesisBlock() {
        return new Block("First block in the chain - Genesis block");
    }

    // addBlock method
    addBlock(newBlock) {
        if (this.chain.length > 0) {
            // previous block hash
            newBlock.previousHash = this.chain[this.chain.length - 1].hash;
        }
        // SHA256 requires a string of data
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
        this.chain.push(newBlock);
    }
}