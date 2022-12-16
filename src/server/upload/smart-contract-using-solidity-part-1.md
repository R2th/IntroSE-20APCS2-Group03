# Introduction

**Smart contract**: Simply a program that runs on the Ethereum blockchain, has specific address on blockchain, not controlled by a user.

**Ethereum virtual machine** (EVM): It's the environment to Ethereum accounts and smart contracts live.

**Solidity**: A high-level programming language, use to develop smart contracts.

**Remix**: An online IDE allows develop, compile, deploy smart contracts for Ethereum.

Here is a simple example of Smart Contract:
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.1 <0.9.0;

contract Message {
    string private message;
    
    constructor()  {
        message = "hello world1";
    }
    
    function setMessage(string memory mes) public {
        message = mes;
    }
    
    function getMessage() view public returns(string memory) {
        return message;
    }
}
```

# Smart Contracts life cycle

![](https://images.viblo.asia/3e03a256-9ee2-4012-95f1-a10f2e14a0d8.jpg)
As shown in the above figure, the smart contract life cycle follows the steps below :
- A Smart contract is implemented using a high level language such as Solidity.
- Smart contract is compiled to two results that specifically are: **Bytecode** (which is a stack-based machine language compiled and executable by the EVM) and an **ABI - Application Binary Interface** (which is a JSON file that describes the distributed contract and the functions of the smart contract). The ABI is the bridge between Web2 and Web3.
- After that, the smart contract is deployed. This consists of creating a transaction packing the smart contract bytecode, and sending it to the network. The transaction gets its own contract account which has an address, a balance, a Nonce, and holds the bytecode in the data field.
- Finally, a Smart contract is invoked. This consists of external calls to the smart contract.

**Special note**: 
- When a contract is created, the **constructor** function is executed once and that first call is always triggered by an EOA account (Externally Owned Account).
- A smart contract is **not self-executable**. It requires an external call to be executed.
- Once it is executed, transactions resulting from the execution are transcribed on the blockchain and eventually smart contracts meta data are updated.

# Solidity: Variables and Functions

## Variables

#### The following value types:
| Type | Default value | Example |
| -------- | -------- | -------- |
| int and uint (all sizes) | 0 | int number; uint age; // 0|
| bool |false | bool flag; // false |
|string|Empty string|string name; // “”|
|bytes1 to bytes32|All bytes set to 0|bytes3 gender; // 0x000000|
|Static array|All items set to default value|int[3] numbers; // [0, 0, 0]|
|Dynamic array|Empty array|int[] numbers; // []|
|struct|Each element set to default value|struct Student { string name;uint age;bool gender;}|
|address (bytes20)||address myAddress; // 0x0000000000000000000000000000000000000000|
|enum||enum status {active, inactive, cancel};|
|mapping (as hash tables)||mapping(address => unit) balances;|

The concept of “**undefined**” or “**null**” values does not exist in Solidity.

#### There are three types of variables:
- **State Variables**: Variables whose values are permanently stored in a contract storage.
- **Local Variables**: Variables whose values are present till function is executing.
- **Global Variables**: Special variables exists in the global namespace used to get information about the blockchain.

Syntax: 
```
<type> <access-modifier> <variable-name> ;
```
Example: 
```
uint public age;
```

#### State Variable Scope:
| Name | Describe |
| -------- | -------- |
|Public|Can be accessed internally contract. The compiler automatically creates getter functions for all public state variables.|
|Internal (**default**)|Can be accessed internally from the current contract. And contract inheriting from it without using this. |
|Private|Can be accessed only internally from the current contract. |

## Functions
Syntax: 
```
function <function-name>(<parameter-list>) <scope> returns(<return-type-list>)  { 
    // block code
 }
```

Example: 
```
function getSender() public returns (address) {
    return msg.sender;
}
```

#### Function Scope:
| Name | Describe |
| -------- | -------- |
|Private|Only be called by the main contract itself.|
|Internal|Only be called by the main contract itself. And contract inheriting from it. |
|External|Only be called from a third-party. |
|Public (**default**)|Externally and internally. |

# Cryptocurrency example
The following contract implements the simplest form of a cryptocurrency
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.1 <0.9.0;

contract PBCoin {
    address private owner;
    mapping(address => uint) balances;

    event Sent(address from, address to, uint amount);
    
    constructor() {
        owner = msg.sender;
        balances[owner] = 1000000;
    }
    
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender]);
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
    
    function getBalance(address receiver) view public returns(uint) {
        return balances[receiver];
    }
}
```
# References
https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html

https://remix.ethereum.org/

<div align="center">Thanks for reading!!
</div>