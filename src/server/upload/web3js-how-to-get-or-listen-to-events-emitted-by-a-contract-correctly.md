## 1. The consideration
Have you ever had trouble listening to specific event emmited on your contract with Web3.js ? 
Okay. Let's learn how to do this together! 

## 2. Different ways to get events
Let's diccuss about the Web3.js ver 1.whatever.whatever since it is widely used by the time I'm writing this article.
In version 1, we have 8 different ways to get an event emitted by a specific contract. Surprise ?
I won't let you wait long, I'll describe all of them right away and here you are:

**In contract way:**
1. once
2. events
3. events.allEvents
4. getPastEvents
5. "transaction" way

**In eth way:**

6. subscribe('logs') 
7. getTransactionReceipt
8. getPastLogs

## 3. When to use what?

As you can see, we have we have many ways to get events emmited in the blockchain with web3.js.
It's really depended on how you want to get your specific events.

### 3.1 Once, events , events.allEvents or subscribe('logs')
**=> Usually used to catch event instantly using Websocket.**

For example, Let's say we have the following simple contracts.

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract TeslaFactory {
    Tesla[] public deployedTeslas;
    event NewTeslaCreated(address owner);

    function createNewTesla() public {
        Tesla newTesla = new Tesla(msg.sender);
        deployedTeslas.push(newTesla);
        emit NewTeslaCreated(msg.sender);
    }

}

contract Tesla {
    address public manager;
    constructor(address owner) {
        manager = owner;
    }
}
```


We have a TeslaFactory contract and a Tesla contract. Users can access to the the TeslaFactory contract to deploy their own Tesla contract. Whenever a Tesla contract is deployed, an `NewTeslaCreated` event is emitted. 

From the project requirements, whenever a Tesla contract is deployed, instantly you have to send an email to inform the project manager  or something like that.

#### 3.1.1 The "events" approach
Simply, you can listen to the `NewTeslaCreated` with node.js and Websocket like this:


```javascript
//File name: server.js

var Contract = require('web3-eth-contract');
var abi =  require('./path-to-abi.json');

// set provider for all later instances to use
Contract.setProvider('wss://ropsten.infura.io/ws/v3/{your_infura_project_id}');

var address = 'your factory contract address';

var contract = new Contract(abi, address);

contract.events.NewTeslaCreated(() => {
}).on("connected", function(subscriptionId){
    console.log('SubID: ',subscriptionId);
})
.on('data', function(event){
    console.log('Event:', event);
    console.log('Owner Wallet Address: ',event.returnValues.owner);
    //Write send email process here!
})
.on('changed', function(event){
    //Do something when it is removed from the database.
})
.on('error', function(error, receipt) {
    console.log('Error:', error, receipt);
});;
```

And run it with `node server.js` to start listen to the event. 

![Screen Shot 2022-05-07 at 13.18.24.png](https://images.viblo.asia/caae19d1-53d2-44c9-8fbb-16a73d19151d.png)

And "bomb!", you have successfully started listening to the `NewTeslaCreated` event. Now, let's try to create a new Tesla and see what will happen.

![Screen Shot 2022-05-07 at 13.19.28.png](https://images.viblo.asia/09636160-e87f-426e-8f5b-3f3ec9debb85.png)

And... "bomb!". We have successfully listened to the `NewTeslaCreated` event. We can now write some code to send email to project manager or anything you want here.

#### 3.1.2 The "once" and "events.allEvents" approach
The concept of the two functions are similar to the "events" approach. 

They all are to  catch event instantly using Websocket. And the differences are the following attributes:



|Attribute| Events | Once | events.allEvents |
|-------- | -------- | -------- | -------- |
|Fired on |A single event    | A single event   | All the contract event     |
|Termination|Manual termination     | After the first event is fired or Error   | Manual termination      |


#### 3.1.3 The subscribe('logs') approach

The approach of **subscribe('logs')** is not on the contract side, It is in the eth side. Because It is one of the websocket way, I will descibe it right here.

We already had the contract side event subscription. It is convinent, easy to understand and efficient. But, As it is still a possible way to get the event, Let's we see what it is.

And YES. We can subscribe to the blockchain's logs, **filter the event that we want by contract address and "topics"to get our desired information**. 

As from the document, it's not clearly describe how we can get event from here but i will show you an possible way with the `topics` parameter.

Document:https://web3js.readthedocs.io/en/v1.5.2/web3-eth-subscribe.html#subscribe-logs
![Screen Shot 2022-05-07 at 14.11.10.png](https://images.viblo.asia/b304d8b9-835a-42b8-9338-ffed47a84340.png)

According to the document:

Topics - Array: An array of values which must each appear in the log entries. The order is important, if you want to leave topics out use null, e.g. [null, '0x00...']. You can also pass another array for each topic with options for that topic e.g. [null, ['option1', 'option2']]

It's difficult to understand but it can be refered as an 256 bit string impliciting the description of a specific event as kwown as the event signature.

We can create a event signature by hashing the event desciption with kekak256 or sha3.

For example, the TeslaFactory contract we have the `NewTeslaCreated` event described as the following in contract source code:

```javascript
event NewTeslaCreated(address owner);
```

From the source code, we can create the event's signature by hashing the following syntax:

```javascript
web3.utils.sha3('NewTeslaCreated(address)');
// 0xc68786aef16e2bfb318808764e5b2e709dbe1f7c06371c044ed3b3dd28c3b299
```

The full example can be found here:
```javascript
var Web3 = require('web3');

var web3 = new Web3('wss://ropsten.infura.io/ws/v3/{your_infura_project_id}');

var cotract_address = 'your_factory_contract_address![Screen Shot 2022-05-07 at 14.50.43.png](https://images.viblo.asia/062536e9-d092-4e2f-9213-0a832da7fba3.png)';
var event_hash = web3.utils.sha3('NewTeslaCreated(address)');
console.log('Event Hash:', event_hash);
var subscription = web3.eth.subscribe('logs',{ address: cotract_address, topics: [event_hash]},(error, event) => {
    //Do something
}).on("connected", function(subscriptionId){
    console.log('SubID: ',subscriptionId);
})
.on('data', function(event){
    console.log('Event:', event); 
    console.log(event.transactionHash);
    //Write send mail here!
})
.on('changed', function(event){
    // remove event from local database
})
.on('error', function(error, receipt) { 
    console.log('Error:', error, receipt);
});;
```



And~~ "Bomb!". We have successfully subscribed to the event with another 
![Screen Shot 2022-05-07 at 14.51.17.png](https://images.viblo.asia/30d0bef7-aa84-4819-891f-dd6ad9089064.png)

### 3.2 The "transaction" way approach
**=> Used along with sendTransaction() function**

For example we have the following source code:

```javascript
var Contract = require('web3-eth-contract');
var abi =  require('./abi.json');

// set provider for all later instances to use
Contract.setProvider('https://ropsten.infura.io/ws/v3/{your_infura_project_id}');

var contract_address = '0xxxxxxx';

var some_user_wallet_address = '0xdddd....';

var contract = new Contract(abi, contract_address);

var transaction = null;

transaction = deployTesla();
owner_address = transaction.events['NewTeslaCreated'].returnValues.owner;

if(owner_address) {
    //Do send mail ~~
}

async function deployTesla() {
    return await contract.methods.createNewTesla().send({ from: some_user_wallet_address });
};
```

And YES, we totally can get emitted event within the rerurned transaction receipt right after an sendTransaction() method is called. Nothing fancy here.

### 3.3 The getTransactionReceipt() and getPastLogs() approach
**=>Good when using batch processing** 

#### 3.3.1 For getTransactionReceipt()
I mean whenever user submit the transaction (even when the transaction is not yet completed),  We will save the transaction_hash to somewhere.

Then from the transaction_hash we can call getTransactionReceipt() to get the transaction topics, compare the event signature to check the event was emitted or not.

#### 3.3.2 For getPastLogs() 
Same way as `subscribe('logs')` with a HTTPS GET call request.

Let's try  the **3.3** by yourself and happy coding!