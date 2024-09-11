# Week 4.1 | Solana Jargons, Programming Models, Tokens

## Contents:
- [**Limitations of Bitcoin**](#limitations-of-bitcoin)
- [**The Rise of Alternative Blockchains**](#the-rise-of-alternative-blockchains)
- [**Ethereum: A Revolutionary Solution**](#ethereum-a-revolutionary-solution)
- [**Solana: A New Frontier**](#solana-a-new-frontier)
- [**Accounts in Solana**](#accounts-in-solana)

## Limitations of Bitcoin
- `Bitcoin` primarily serves as a `decentralized currency`.
- It was not designed to support complex applications or diverse use cases.

## The Rise of Alternative Blockchains
- **Post-2012 Developments**: Various blockchains emerged, each tailored for specific purposes, such as *lending protocols* or *decentralized exchanges*.
- **Challenges Faced**:
    - **Fragmentation**: Each blockchain operated independently with its own set of miners and consensus mechanisms.
    - **Cold Start Problem**: New blockchains struggled to gain traction and security, unable to match Bitcoin's network size and robustness.

## Ethereum: A Revolutionary Solution
- `Ethereum` introduced the concept of **smart contracts**, allowing developers to build **decentralized applications** (**dApps**) directly on the Ethereum network.
- Advantages of Ethereum:
    - **No Cold Start Problem**: Developers could leverage Ethereum's existing decentralized network, avoiding the initial growth challenges faced by standalone blockchains.
    - **Flexibility and Innovation**: Enabled a wide range of applications, from finance to gaming, all on a single, secure blockchain.
- Example: Counter Smart Contract in Solidity:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint public count;

    // Constructor to initialize count
    constructor() {
        count = 0;
    }

    // Function to increment the count
    function increment() public {
        count += 1;
    }

    // Function to decrement the count
    function decrement() public {
        require(count > 0, "Count cannot be negative");
        count -= 1;
    }
    
    // Function to get the current count
    function getCount() public view returns (uint) {
        return count;
    }
}
```

## Solana: A New Frontier
- **`Smart Contracts` vs `Programs`**: What `Ethereum` calls `smart contracts`, `Solana` refers to as `programs`.
- `Solana` offers similar capabilities to `Ethereum` but with significantly **faster transaction speeds** and **scalability**, **high throughput** and **low latency**.
- The design and operation of Solana’s programs differ from traditional blockchains, providing a distinct approach to building and running decentralized applications.

## Accounts in Solana
- In `Solana`, an **account** is a *data structure* that includes a **public-private key pair** (using the `ed25519 elliptic curve`).
- Types of accounts:
    1. **Wallet Accounts**: 
        - These accounts represent **user wallets** that can hold **lamports** (Solana’s native currency).
        - Example of a wallet account (only Lamports): [DNp2hBynGWFWomptmxiSzhhTYjGxDsyu43RBrC6TzuMW](https://solscan.io/account/DNp2hBynGWFWomptmxiSzhhTYjGxDsyu43RBrC6TzuMW)
        - ![](images/wallet-accunt.avif)
    2. **Data Accounts**:
        - These accounts **store data** on the blockchain and can be used for various decentralized applications.
        - Example of a Data Account (Data & Lamports): [4GQsAP5jYi5ysGF1GEnWiV3zJHZLRcLWhLCSuim6aAkL](https://explorer.solana.com/address/4GQsAP5jYi5ysGF1GEnWiV3zJHZLRcLWhLCSuim6aAkL)
        - ![](images/data-account.avif)
    3. **Program Accounts**: 
        - These are special accounts that **store executable code**, allowing `smart contracts` (known as `programs` in Solana) to run on the blockchain.
        - Example of Program Account (Data, Lamports and Executable code): [TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA](https://explorer.solana.com/address/TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA)
        - ![](images/program-account.avif)

