# Week 3 | Creating a web based wallet

## Contents:
- [**Keccak-256**](#keccak-256)
    - [**Key Features of Keccak-256**](#key-features-of-keccak-256)
    - [**How it differs from SHA-256**](#how-it-differs-from-sha-256)
    - [**Properties of Keccak-256 hashing algorithm**](#properties-of-keccak-256-hashing-algorithm)
- [**Public-Private Key Pair in Ethereum**](#public-private-key-pair-in-ethereum)
- [**Public-Private Key Pair in Solana**](#public-private-key-pair-in-solana)
- [**RPC, JSON-RPC**](#rpc-json-rpc)
- [**Wei, Lamports**](#wei-lamports)
    - [**What is Wei?**](#what-is-wei)
    - [**What is Gwei?**](#what-is-gwei)
    - [**What is Lamports?**](#what-is-lamports)
- [**RPC Server**](#rpc-server)
- [**Common RPC calls on Solana**](#common-rpc-calls-on-solana)
- [**Common RPC calls on Ethereum**](#common-rpc-calls-on-ethereum)
- [**Creating a web based wallet**](#creating-a-web-based-wallet)

## Keccak-256
Keccak-256 is a cryptographic hash function, which is part of the Keccak family. Keccak was chosen as the winner of the NIST (National Institute of Standards and Technology) SHA-3 competition and became the basis for the SHA-3 (Secure Hash Algorithm 3) standard.

- [Try out keccak-256](https://emn178.github.io/online-tools/keccak_256.html)

### Key Features of Keccak-256:
1. **Hash Length:** It produces a *256-bit hash value* (*32 bytes*).
2. **Security:** It provides strong cryptographic security and is resistant to *collision*, *pre-image*, and *second pre-image attacks*.
3. **Applications:** `Keccak-256` is widely used in various cryptographic applications, including *digital signatures*, *hashing in blockchain technology* (`Ethereum` uses it), and *password hashing*.

### How it differs from SHA-256:
`Keccak-256` and `SHA-256` are both cryptographic hash functions, but they differ in internal design. Keccak uses a **sponge construction**, whereas `SHA-256` is part of the `SHA-2 family` and uses a **Merkle–Damgård construction**.

### Properties of `keccak-256` hashing algorithm

1. **Collision resistance**: Keccak256 is designed to be collision-resistant, meaning finding two inputs that produce the same hash output should be extremely difficult. However, it's important to note that collision resistance is not absolute, and there is always a small chance of collision. Therefore, it's recommended to use a combination of unique input parameters (e.g., block hash + block timestamp + contract nonce) for a lower probability of collision.
2. **Pre-image resistance**: Keccak256 is also designed to be pre-image resistant, meaning it should be nearly impossible to determine the original input from the hash output. However, it's important to note that brute-force attacks can still be attempted, and stronger passwords or keys will increase security.
3. **Key length**: Keccak256 outputs a 256-bit hash value, which means that it has a very large output space. This makes it resistant to brute-force attacks, but it's important to ensure that the key length is also sufficient for the application.
4. **Implementation**: It's important to ensure that the implementation of Keccak256 used is secure and free from vulnerabilities. Additionally, the implementation should be updated regularly to ensure that any discovered vulnerabilities are patched.

## Public-Private Key Pair in Ethereum
- Ethereum public addresses are `20 bytes` (`0x8BCd4591F46e809B15A490F5C6eD031FDDE0bee0`).
- When generating the public key for an ETH address
    - Initially, a public key is generated using **elliptic curve cryptography**. 
    - The public key is then hashed using the `Keccak-256` algorithm.
    - fter hashing the public key with `Keccak-256`, you get a ``32-byte` hash. The Ethereum address is derived from this hash by taking only the **last 20 bytes of the hash output**.
    - The resulting `20-byte` value is then converted into **hexadecimal format** and prefixed with `'0x'` to form the `Ethereum` address. This is the address that users use to send and receive ETH and interact with smart contracts.
- [How backpack does it](https://github.com/coral-xyz/backpack/blob/master/packages/secure-background/src/services/evm/util.ts#L3)
- [How ethers does it under the hood](https://github.com/ethers-io/ethers.js/blob/main/src.ts/transaction/address.ts#L12)

## Public-Private Key Pair in Solana
- `Solana` public keys are `32 bytes` (5W4oGgDHqir3KNEcmiMn6tNHmbWjC7PgW11sk4AwWbpe). 
- No need for **hashing/chopping**.

## RPC, JSON-RPC
`RPC`, or `Remote Procedure Call`, is a protocol or mechanism that allows a program to *execute a procedure* (*subroutine*) on a different address space, often on another computer across a network, as if it were a local procedure call. 
- The key idea behind RPC is to abstract the communication between distributed systems, so developers can invoke methods on remote systems without needing to deal with the complexities of the network.

- Popular **RPC** implementations include:
    - **gRPC** (used in *microservices*)
    - **XML-RPC**
    - **JSON-RPC**

### JSON-RPC
- `JSON-RPC` is a **lightweight remote procedure call (RPC) protocol** that uses `JSON` (**JavaScript Object Notation**) as the data format. 
- It is **transport-agnostic**, meaning it can be used over various communication protocols like **HTTP**, **WebSockets**, or **any other bi-directional transport**.
- It allows for communication between a client and a server over a network. JSON-RPC enables a client to invoke methods on a server and receive responses, similar to traditional RPC protocols but using JSON for data formatting.
- [](images/json-rpc.avif)
- As a user, you interact with the blockchain for two purposes - 
    1. To send a `transction`
    2. To fetch some details from the blockchain (balances etc)
- In both of these, the way to interact with the blockchain is using JSON-RPC

## Wei, Lamports

### What is Wei?
- The `wei` is the smallest unit of `Ether`. It's similar to how a cent is to a dollar.
- It is equivalent to `1e-18` ether.
- 1 Ether (ETH) = 10^18 Wei.

### Waht is Gwei?
- A larger unit of Ether commonly used in the context of gas prices.
- It is equivalent to `1e-9` ether.
- 1 Ether (ETH) = 10^9 Gwei.

### What is Lamports?
- In the Solana blockchain, the smallest unit of currency is called a lamport. Just as wei is to Ether in Ethereum, lamports are to SOL (the native token of Solana).
- It is equivalent to `1e-9` SOL.
- 1 SOL = 10^9 Lamports.
```js
const { LAMPORTS_PER_SOL } = require("@solana/web3.js")

console.log(LAMPORTS_PER_SOL)
```

## RPC Server
- An `RPC server` provides a way for *external clients to interact with the blockchain network*. 
- `RPC` stands for `Remote Procedure Call`, and an RPC server exposes an API that allows clients to send requests and receive responses from the blockchain.
- An RPC server is a service that listens for JSON-RPC requests from clients, processes these requests, and returns the results. 
- It acts as an intermediary between the blockchain and external applications or services.
- An `RPC (Remote Procedure Call)` server is not inherently part of the blockchain network itself, nor does it participate in staking or consensus mechanisms
 
![](images/rpc-server.avif)

- You can grab your own RPC server from one of many providers: 
    1. `Quicknode`
    2. `Alchemy`
    3. `Helius`
    4. `Infura`

## Common RPC calls on Solana
1. **Get account info**
    - Retrieves information about a specific account.
    ```js
    {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getAccountInfo",
        "params": ["Eg4F6LW8DD3SvFLLigYJBFvRnXSBiLZYYJ3KEePDL95Q"]
    }
    ``` 
2. **Get balance**
    - Gets the balance for a given account
    ```js
    {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getBalance",
        "params": ["Eg4F6LW8DD3SvFLLigYJBFvRnXSBiLZYYJ3KEePDL95Q"]
    }
    ```
3. **Get Transaction count**
    ```js
        {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getTransactionCount"
        }
    ``` 

## Common RPC calls on Ethereum
1. **Get balance**
    ```js
    {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "eth_getBalance",
        "params": ["0xaeaa570b50ad00377ff8add27c50a7667c8f1811", "latest"]
    }
    ```
2. **Get latest block**
    ```js
    {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "eth_blockNumber"
    }
    ```
3. **Get block by number**
    ```js
    {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "eth_getBlockByNumber",
        "params": ["0x1396d66", true]
    }
    ```

## Creating a web based wallet
- A web based wallet is a web application that allows users to interact with the blockchain network using their web browser.
- It provides a user-friendly interface for managing their cryptocurrency assets, such as Ethereum and Solana.

### Prerequisites
1. Knowledge of HTML, CSS, and JavaScript
2. Basic understanding of blockchain technology
3. Familiarity with React.js

### Steps to create a web based wallet
1. Create a new React.js project using vite
```bash
npm create vite@latest
```

2. Install the required dependencies
```bash
npm install 
```

3. Add node-pollyfils
```bash
npm install node-polyfill-webpack-plugin
```
```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), nodePolyfills()],
})
```

4. Clean up  App.jsx
```js
function App() {
    return (
        <div>
        </div>
    )
}

export default App
```

5. Create a mnemonics state variable in `App.jsx`
```js
import { useState } from 'react'

function App() {
    const [mnemonic, setMnemonic] = useState('')

    return (
        <div>
        </div>
    )
}

export default App
```

6. 4. Create a new component called `SolanaWalletSeedPhrase.jsx` which takes `mnemonic` and `setMnemonic` as props
```js 
function SolanaWalletSeedPhrase({ mnemonic, setMnemonic }) {
    return (
        <div>
        </div>
    )
}

export default SolanaWalletSeedPhrase
```

7. Add `SolanaWalletSeedPhrase` component to `App.jsx`
```js
import { useState } from 'react'
import SolanaWalletSeedPhrase from './SolanaWalletSeedPhrase'

function App() {
    const [mnemonic, setMnemonic] = useState('')

    return (
        <div>
            <SolanaWalletSeedPhrase mnemonic={mnemonic} setMnemonic={setMnemonic} />
        </div>
    )
}

export default App
```

8. Add a button that lets the user generate a fresh mnemonic phrase. 
    - [reference for the project](https://projects.100xdevs.com/tracks/public-private-keys/Public-Key-Cryptography-9)
    - [referecnce - BIP39](https://github.com/hujiulong/web-bip39)
```bash
npm install bip39
```
```js
import { useState } from 'react'
import { generateMnemonic } from 'bip39'

function SolanaWalletSeedPhrase({mnemonic, setMnemonic}) {
    const generateMnemonics = async () => {
            const mnemonic = await generateMnemonic()
            setMnemonic(mnemonic)
    }

    return (
        <div>
            <button onClick={generateMnemonics}>Create Seed Phrase</button>
        </div>
    )
}

export default SolanaWalletSeedPhrase
```

9. Display the mnemonic in an input box in `SolanaWalletSeedPhrase.jsx`
```js
import { useState } from 'react'
import { generateMnemonic } from 'bip39'

function SolanaWalletSeedPhrase({mnemonic, setMnemonic}) {
    const generateMnemonics = async () => {
            const mnemonic = await generateMnemonic()
            setMnemonic(mnemonic)
    }

    return (
        <div>
            <input type="text" value={mnemonic} onChange={(e) => setMnemonic(e.target.value)} />
            <button onClick={generateMnemonics}>Create Seed Phrase</button>
        </div>
    )
}

export default SolanaWalletSeedPhrase
```

10. Create `SolanaWallet.jsx` component
    - [reference](https://projects.100xdevs.com/tracks/public-private-keys/Public-Key-Cryptography-10)
```js
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

function SolanaWallet() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [addresses, setAddresses] = useState([])

    const generateAddress = async () => {
        const seed = await mnemonicToSeed(mnemonic)
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`
        const hdNode = HDNodeWallet.fromSeed(seed)
        const child = hdNode.derivePath(derivationPath)
        const privateKey = child.privateKey
        const wallet = new Wallet(privateKey)

        setCurrentIndex(prev => prev + 1)
        setAddresses(prev => [...prev, wallet.address])
    }

    return (
        <div>
            <button onClick={generateAddress}>Generate Address</button>

            {
                addresses.map((address, index) => (
                    <div key={index}>
                        {address}
                    </div>
                ))
            }
        </div>
    )
}

export default SolanaWallet
```
11. Add `SolanaWallet` component to `App.jsx`
```js
import { useState } from 'react'
import SolanaWallet from './SolanaWallet'
import SolanaWalletSeedPhrase from './SolanaWalletSeedPhrase'

function App() {
    const [mnemonic, setMnemonic] = useState('')

    return (
        <div>
            <SolanaWalletSeedPhrase mnemonic={mnemonic} setMnemonic={setMnemonic} />
            <SolanaWallet mnemonic={mnemonic} setMnemonic={setMnemonic} />
        </div>
    )
}

export default App
```

![](images/wallet.avif)