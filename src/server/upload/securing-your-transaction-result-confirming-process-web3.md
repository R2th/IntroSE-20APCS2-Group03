## 1. Background
As a developer, not learning means that we are left behind. 
It has been sometimes since Ethereum & Solidity was introduced. Then we have many new definitions like DeFi, NFT, DApps, etc.
Today, let's talk about securing your DApp.

## 2. The consideration
So, Have you ever wondered how to confirm the transaction result with best practices ?
Let's deep dive into it right away!

## 3. The example
Let's say your company is a Game developing company.
To support the business your company asks you to develop a decentralized community votes application for the next development idea.

The app requirement is as simple like this:
1. The app must run in Ethereum blockchain smart contract
2. Users are able to see current votes in voting page

The page is just simple like so:

![](https://images.viblo.asia/413c6bb8-35f4-4269-9e41-70f863941bac.png)


## 4. Different Approaches

### 4.1 Totally Web3 approach

![Screen Shot 2022-10-05 at 17.42.46.png](https://images.viblo.asia/00c1e68a-bbe3-4b43-b976-5816b9f09513.png)

In this design, we will store all vote data needed to the smart contract. And when displaying data to the Frontend, we will directly call the smart contract for the data you need.
It could be the simplest approach since we only need 2 layers with Frontend & Blockchain.

However, this design is not ideal for scaling. Most of RPC provider has gas limit on `eth_call`. So when  data stored in your contract become too large. It'll be impossible to be query from client's frontend.


### 4.2 Web 2.5 approach
And yes. Everything has its own solution. We can deal with the scaling concern with additional Backend & A centralized DB like this.

When we display data in FE, We will no longer query the Blockchain. We query the Backend & the centralized DB instead.
That's much faster & we will have more control with the data ( it means more centralized 🤨 )

![Screen Shot 2022-10-05 at 19.13.14.png](https://images.viblo.asia/613aeb41-9f2c-4db7-9dc9-e93bdea7fe2e.png)

Things get a bit more complicated when we add this Backend server. And we should have the following concerns

#### Concern 1: How to deal with transaction processing time
Let's review the following **Example 1**:
1. User connects their wallet in Frontend
2. User makes a vote transaction through their wallet
3. After the transaction is completed in the Blockchain, we will call an Backend API to save the transaction information to centralized DB

This design will work, but **it will fail sometimes**. 
Since the vote transaction is made with Blockchain, it will take some time to be fully confirmed. 
When the transaction is not fully confirmed , user somehow closes their Browser or Frontend App. 
It means it ends without the step 3 and the data will not be saved to centralized DB although the transaction is made with blockchain.

=> Of course, we can solve it by changing the process  a bit with following **Example 2**:
1. User connects their wallet in Frontend
2. User makes a vote transaction through their wallet
3. Right after user signs the transaction with their wallet, we call API to save the created transaction hash to centralized DB
4. Configure cron-job to connect to the blockchain to query the blockchain for the transaction information & substract the data needed to save to DB

This solution is much better since we saved the transaction hash right after user signs the transaction. But this way will make us additional concerns.

#### Concern 2: How to validate data coming from the Frontend

We will deep dive into step 3 in  **Example 2**. 
In this step, we allow user to update their transaction_hash with our API. 
It could become an vulnerable point if we don't validate this information strictly.
Let me mention some possible attacks here:

①Possible Attack 1: Some spam guys will call this api many times with the same transaction hash

②Possible Attack 2: Some spam guys will make an similar contract & make transaction with their own contract & update that transaction hash to our DB. It means that, Vote data will become not reliable with wrong data.

①can be prevented easily with duplicate check in the API. But ② cannot.
②At the time of calling this API, It has high chance that the transaction is not available in the Blockchain yet. So it is impossible for us to prevent ② in the API validation.

=> Since ② cannot be validated when the transaction is not available in Blockchain. So let's validate it when it's available in Blockchain. We can validate it in our cron-job when we check the transaction result.

However, it's still not perfect yet. In this Design, if user pass an invalid transaction hash, it will not be validated by our cron-job but there is another way not to allow user to update their own transaction hash in the frontend.

#### Possible solution 1
For a better solution, we should design as following:

1. User connects their wallet in Frontend
2. Backend generate an unique id, save it to DB and give it to frontend
3. User makes a vote transaction through their wallet with generated unique id
4. Right after user signs the transaction with their wallet, we call API to tell the cron-job to directly query the blockchain for the unique id in target contract for the transaction information.

In this way, user will no longer have ability to update the wrong transaction_hash, we directly query the blockchain for the most reliable data.

#### Possible solution 2
We can use a Blockchain Indexing Service like The Graph to solve all the problem too.

![Screen Shot 2022-10-06 at 13.34.59.png](https://images.viblo.asia/d42c2bfb-7d8a-4177-89c0-3b934b76e9a9.png)

In this Design, we replace our Backend layer by the Graph. The Graph will help us index the blockchain data for us to query it efficently.
It can be treated as Fully Web3 Solution with good scalability. But we should consider about the price of the service.
We have to use its token called GRT to pay for the querying fee. 
However the token price rising could become a big problem.

As its price is growing, the oprating cost is growing too. So it's good idea to note that we should consider this concern when making design decision~

## 5. Conclusion
Feel free to share your solution & Happy Coding ~~