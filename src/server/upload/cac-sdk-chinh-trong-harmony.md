# Giới thiệu
Trong bài viết lần này mình sẽ giới thiệu một nền tảng blockchain tương đối giống với Ethereum là Harmony. Đây là nền tảng blockchain có hỗ trợ viết các Smart Contract bằng solidity và cũng sử dụng Truffle để deploy contract. Tuy nhiên trong bài viết lần này mình sẽ giới thiệu các SDK của Harmony để tương tác với mạng Blockchain cũng như tương tác với các Smart Contract có trên mạng.

![](https://images.viblo.asia/74c03b7f-7095-4452-8f1a-c6cac6201d79.jpg)


Bài viết sẽ yêu cầu bạn cần một chút kiến thức về **Solidity** để có thể viết các smart contract, bài này chủ yếu sẽ hướng đến các SDK được Harmony cung cấp để tương tác với mạng Blockchain của họ.

# Các SDK chính

Các SDK chính để tương tác với Harmony bao gồm:

-  **harmony-js/core** : Package chứa các function tương tác với các thành phần trong mạng như Trx, account, những function này đa phần là những function đọc dữ liệu
-  **harmony-js/account**: Package chứa các function để tương tác với Account như tạo account, tạo ví, export, import privateKey
-  **harmony-js/utils** : Package chứa các function để chuyển đổi các loại đơn vị trong mạng như convert hex, string hay convert one sang wei
-  **harmony-js/transaction** : Package chứa các function để tracking dữ liệu của một transaction từ lúc khởi tạo cho đến lúc được lưu vào chain
-  **harmony-js/contract**: Package chứa các function giúp developer có thể tương tác với những smart contract đã được deploy lên mạng Harmony

Đầu tiên chúng ta cần phải có môi tường để test, cần các package chính là harmony và tslib:
```bash
yarn init
yarn add @harmony-js/core@next
yarn add tslib
```

Đã có đủ các package cần thiết, bây giờ khởi tạo 1 file để cùng test nào :
```bash
touch testSDK.js
```

Khởi tạo một instance trong file **testSDK.js**, instance này sẽ giúp ta tương tác với Harmony:
Node này là node của mạng testnet : https://api.s0.b.hmny.io/

```js
const { Harmony } = require('@harmony-js/core');
const {
  ChainID,
  ChainType,
  hexToNumber,
  numberToHex,
  fromWei,
  Units,
  Unit,
} = require('@harmony-js/utils');

const hmy = new Harmony(
    'https://api.s0.b.hmny.io/',
    {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyTestnet,
    },
);
```
## harmony-js/core

Trên mạng Harmony địa chỉ của các ví có thể được biểu thị dưới 2 dạng là **checksumAddress** và **bech32Address** . Trong đó **checksumAddress** là địa chỉ có dạng hex như Ethereum còn **bech32** là địa chỉ của Harmony có prefix **one**

### Lấy balance của 1 địa chỉ

```js
hmy.blockchain
  .getBalance({ address: 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7' })
  .then((response) => {
    console.log('balance in ONEs: ' + fromWei(hexToNumber(response.result), Units.one));
  });
```

### Lấy transaction thông qua hash 
```js
hmy.blockchain
  .getTransactionByHash({
    txnHash: '0x56c73eb993b18dc04baacec5c2e9d1292a090f6a978a4a1c461db5255fcbc831',
  })
  .then((response) => {
    console.log(response.result);
  });
```

### Lấy latest block number

```js
hmy.blockchain.getBlockNumber().then((response) => {
  console.log('current block number: ' + hexToNumber(response.result));
});
```

### Truy vấn người nhận transaction thông qua hash

```js
hmy.blockchain
  .getTransactionReceipt({
    txnHash: '0x56c73eb993b18dc04baacec5c2e9d1292a090f6a978a4a1c461db5255fcbc831',
  })
  .then((response) => {
    console.log(response.result);
  });
```

### Tạo transaction chuyển One

Cách này sẽ sử dụng privateKey để tự kí **transaction**, địa chỉ nhận (to) có thể là dạng bech32 hoặc checksum đều thảo mãn
```js
// key corresponds to one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7, only has testnet balance
hmy.wallet.addByPrivateKey('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');

async function transfer() {
  const txn = hmy.transactions.newTx({
    to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
    value: new Unit(1).asOne().toWei(),
    // gas limit, you can use string
    gasLimit: '21000',
    // send token from shardID
    shardID: 0,
    // send token to toShardID
    toShardID: 0,
    // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
    gasPrice: new hmy.utils.Unit('1').asGwei().toWei(),
  });

  // sign the transaction use wallet;
  const signedTxn = await hmy.wallet.signTransaction(txn);
  const txnHash = await hmy.blockchain.sendTransaction(signedTxn);
  console.log(txnHash.result);
}

transfer();
```

## harmony-js/account

Đâu là package giúp chúng ta có thể tự tạo các địa chỉ, tạo ví lưu trữ các địa chỉ đó và cũng có thể kí các transaction.

### Tạo tài khoản và hiển thị address tương ứng

```js
const account = new Account(); // or const account = Account.new()
console.log(account.checksumAddress);
console.log(account.bech32Address);
```

### Import privateKey để tạo Account

```js
const account = Account.add('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');
console.log(account.checksumAddress);
```

### Import keystore để tạo Account
```
const passphrase = '';
const keystore = '{"version":3,"id":"33363566-3564-4264-a638-363531666335","address":"7c41e0668b551f4f902cfaec05b5bdca68b124ce","crypto":{"ciphertext":"9b09380afb742838b32d9afc0ec1a3df35dbd7a41e3a160d08c07a4d0e79b855","cipherparams":{"iv":"1cd0e0522260eef055b9170f4825f4a0"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"salt":"bf35e36c45cccefcef73a4c900f41c682c94c28630d94d2d1f764760d245f30b","n":8192,"r":8,"p":1,"dklen":32},"mac":"25b4442972356bea02af57eba3b87803086d90b5e7657a57b528b89b1aa25f2f"}}';
const account = new Account();
account.fromFile(keystore, passphrase).then(account => {
    console.log(account.bech32Address);
});
```

### Export account dưới dạng keystore

```js
const passphrase = '';
const keystore = '{"version":3,"id":"33363566-3564-4264-a638-363531666335","address":"7c41e0668b551f4f902cfaec05b5bdca68b124ce","crypto":{"ciphertext":"9b09380afb742838b32d9afc0ec1a3df35dbd7a41e3a160d08c07a4d0e79b855","cipherparams":{"iv":"1cd0e0522260eef055b9170f4825f4a0"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"salt":"bf35e36c45cccefcef73a4c900f41c682c94c28630d94d2d1f764760d245f30b","n":8192,"r":8,"p":1,"dklen":32},"mac":"25b4442972356bea02af57eba3b87803086d90b5e7657a57b528b89b1aa25f2f"}}';
const account = new Account();
account.fromFile(keystore, passphrase).then(account => {
    console.log(account.bech32Address);
});
```

### Lấy balance của account

```js
const account = new Account(
  '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e'
);
account.getBalance().then(response => {
    console.log(response);
});
//{ balance: '9126943763247054940484', nonce: 45, shardID: 0 }
```

### Kí transaction 
Tạo tài khoản từ privateKey tương tự như việc add signer trong **harmony-js/core**
```js
const { TransactionFactory } = require('@harmony-js/transaction');
const { Unit } = require('@harmony-js/utils');
const factory = new TransactionFactory();

//Import privateKey
const account = new Account('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');

const txn = factory.newTx({
  to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
  value: new Unit(1).asOne().toWei(),
  // gas limit, you can use string
  gasLimit: '21000',
  // send token from shardID
  shardID: 0,
  // send token to toShardID
  toShardID: 0,
  // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
  gasPrice: new Unit('1').asGwei().toWei(),
});

account.signTransaction(txn).then((signedTxn) => {
  console.log(signedTxn);
});
```

### Tạo wallet
Một wallet có thể chứa một hoặc nhiều các account

```js
const { Wallet } = require('@harmony-js/account')
const wallet = new Wallet();
```

### Add account vào wallet 
```js
//Thông qua mnemonic của account 
const mnemonics = 'horse distance dry brother pretty manual chicken mushroom town swim prize clutch';
const account = wallet.addByMnemonic(mnemonics);
```


```js
//Thông qua privateKey của account
const account = wallet.addByPrivateKey('0x676cd9773dd23a4c1d7f22767c61c7b6723cc6be37b078545f6e0e91433a23dd')
```

```js
//Thông qua keystore file
const keystore = '{"version":3,"id":"33363566-3564-4264-a638-363531666335","address":"7c41e0668b551f4f902cfaec05b5bdca68b124ce","crypto":{"ciphertext":"9b09380afb742838b32d9afc0ec1a3df35dbd7a41e3a160d08c07a4d0e79b855","cipherparams":{"iv":"1cd0e0522260eef055b9170f4825f4a0"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"salt":"bf35e36c45cccefcef73a4c900f41c682c94c28630d94d2d1f764760d245f30b","n":8192,"r":8,"p":1,"dklen":32},"mac":"25b4442972356bea02af57eba3b87803086d90b5e7657a57b528b89b1aa25f2f"}}';
const passphrase = '';
wallet.addByKeyStore(keystore, passphrase).then(account => {
    console.log(account.bech32Address);
});
```

### Tạo account thông qua passphrase
```js
const passphrase = 'harmony-one';
wallet.createAccount(passphrase).then(account => {
    console.log(account.bech32Address);
});
```

### Lấy toàn bộ các account trong wallet
```js
wallet.accounts.forEach(addr => {
    const account = wallet.getAccount(addr);
    console.log(account.bech32Address);
});
```

### Kí transaction bằng wallet

```js
wallet.setSigner(signerAddr);
const txn = factory.newTx({
  to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
  value: new Unit(1).asOne().toWei(),
  // gas limit, you can use string
  gasLimit: '21000',
  // send token from shardID
  shardID: 0,
  // send token to toShardID
  toShardID: 0,
  // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
  gasPrice: new Unit('1').asGwei().toWei(),
});

wallet.signTransaction(txn).then((signedTxn) => {
  console.log(signedTxn);
});
```

## harmony-js/transaction

Package này cung cấp các api để tương tác với các transaction từ việc tạo, gửi transaction hay subcription receipt

Việc đầu tiên vẫn là tạo instance Harmony testnet và import các hàm cần sử dụng:

```js
const { Harmony } = require('@harmony-js/core');
const {
  ChainID,
  ChainType,
  hexToNumber,
  numberToHex,
  fromWei,
  Units,
  Unit,
} = require('@harmony-js/utils');

const hmy = new Harmony(
    'https://api.s0.b.hmny.io/',
    {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyTestnet,
    },
);
```

### Lấy thông tin transaction thông qua transaction hash
```js
const raw = '0xf86d21843b9aca00825208808094d6ba69da5b45ec98b53e3258d7de756a567b6763880de0b6b3a76400008028a0da8887719f377401963407fc1d82d2ab52404600cf7bea37c27bd2dfd7c86aaaa03c405b0843394442b303256a804bde835821a8a77bd88a2ced9ffdc8b0a409e9';
const tx = hmy.transactions.recover(raw);

//output
Transaction {
  blockNumbers: [],
  confirmations: 0,
  confirmationCheck: 0,
  cxStatus: 'NONE',
  cxBlockNumbers: [],
  cxConfirmations: 0,
  cxConfirmationCheck: 0,
  messenger: Messenger {
    chainType: 'hmy',
    chainId: 2,
    Network_ID: 'Local',
    send: [Function (anonymous)],
    subscribe: [Function (anonymous)],
    unsubscribe: [Function (anonymous)],
    provider: HttpProvider {
      middlewares: [Object],
      reqMiddleware: Map(0) {},
      resMiddleware: Map(0) {},
      url: 'https://api.s0.b.hmny.io/',
      fetcher: [Object],
      options: [Object]
    },
    config: { Default: [Object], DefaultWS: [Object] },
    JsonRpc: JsonRpc { toPayload: [Function (anonymous)], messageId: 0 },
    shardProviders: Map(0) {}
  },
  txStatus: 'SIGNED',
  emitter: Emitter {
    handlers: {},
    emitter: {
      on: [Function: on],
      off: [Function: off],
      emit: [Function: emit]
    },
    off: [Function: bound off],
    emit: [Function: bound emit],
    resolve: [Function (anonymous)],
    reject: [Function (anonymous)],
    promise: Promise { <pending> },
    then: [Function: bound then]
  },
  id: '0x19c362d9d4e97d6b2dabad67c8271f395ee362c7948bed78f5c3cfc99c9fba97',
  shardID: 0,
  from: '0x7c41E0668B551f4f902cFaec05B5Bdca68b124CE',
  nonce: 33,
  gasPrice: BN { negative: 0, words: [ 60475904, 14 ], length: 2, red: null },
  gasLimit: BN { negative: 0, words: [ 21000 ], length: 1, red: null },
  toShardID: 0,
  to: '0xd6ba69DA5b45eC98b53e3258d7DE756a567B6763',
  value: BN {
    negative: 0,
    words: [ 56885248, 2993385, 222 ],
    length: 3,
    red: null
  },
  data: '0x',
  chainId: 2,
  rawTransaction: '0xf86d21843b9aca00825208808094d6ba69da5b45ec98b53e3258d7de756a567b6763880de0b6b3a76400008028a0da8887719f377401963407fc1d82d2ab52404600cf7bea37c27bd2dfd7c86aaaa03c405b0843394442b303256a804bde835821a8a77bd88a2ced9ffdc8b0a409e9',
  unsignedRawTransaction: '0x',
  signature: {
    r: '0xda8887719f377401963407fc1d82d2ab52404600cf7bea37c27bd2dfd7c86aaa',
    s: '0x3c405b0843394442b303256a804bde835821a8a77bd88a2ced9ffdc8b0a409e9',
    recoveryParam: 0,
    v: 40
  },
  receipt: undefined
}
```

### Kí transaction và đợi khi transaction thành công sẽ log ra receipt
```js
const txn = hmy.transactions.newTx({
  to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
  value: new Unit(1).asOne().toWei(),
  // gas limit, you can use string
  gasLimit: '21000',
  // send token from shardID
  shardID: 0,
  // send token to toShardID
  toShardID: 0,
  // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
  gasPrice: new hmy.utils.Unit('1').asGwei().toWei()
});

hmy.wallet.addByPrivateKey('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');

hmy.wallet.signTransaction(txn).then(signedTxn => {
  signedTxn.sendTransaction().then(([tx, hash]) => {
    console.log('tx hash: ' + hash);
    signedTxn.confirm(hash).then(response => {
      console.log(response.receipt);
    });
  });
});

```

Output: 
```js
{
  blockHash: '0x84e485e697721745d28201d00679b7ab1cf250a0c313556cb125015b672d7800',
  blockNumber: '0x19f0d1',
  contractAddress: '0x0000000000000000000000000000000000000000',
  cumulativeGasUsed: '0x5208',
  from: 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7',
  gasUsed: '0x5208',
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  shardID: 0,
  status: '0x1',
  to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
  transactionHash: '0x4194c6b83d4c7f9b5a4f680ad4d0e4ed9a718becaf30a9a40290daae091d2cbe',
  transactionIndex: '0x0',
  byzantium: true
}
```

### Tổng hợp các trạng thái của một transaction từ khi khới tạo cho đến khi thành công (hoặc bị revert)

Một transaction từ khi được khởi tạo sẽ trải qua các trạng thái cho đến khi thành công hoặc bị revert

```js
async function transfer() {
  hmy.wallet.addByPrivateKey('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');
  const txn = hmy.transactions.newTx({
    to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
    value: new Unit(1).asOne().toWei(),
    // gas limit, you can use string
    gasLimit: '21000',
    // send token from shardID
    shardID: 0,
    // send token to toShardID
    toShardID: 0,
    // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
    gasPrice: new hmy.utils.Unit('1').asGwei().toWei()
  });
  const signedTxn = await hmy.wallet.signTransaction(txn);
  signedTxn
    .observed()
    .on('transactionHash', txnHash => {
      console.log('');
      console.log('--- hash ---');
      console.log('');
      console.log(txnHash);
      console.log('');
    })
    .on('receipt', receipt => {
      console.log('');
      console.log('--- receipt ---');
      console.log('');
      console.log(receipt);
      console.log('');
    })
    .on('cxReceipt', receipt => {
      console.log('');
      console.log('--- cxReceipt ---');
      console.log('');
      console.log(receipt);
      console.log('');
    })
    .on('error', error => {
      console.log('');
      console.log('--- error ---');
      console.log('');
      console.log(error);
      console.log('');
    });

  const [sentTxn, txnHash] = await signedTxn.sendTransaction();

  const confiremdTxn = await sentTxn.confirm(txnHash);

  // if the transactino is cross-shard transaction
  if (!confiremdTxn.isCrossShard()) {
    if (confiremdTxn.isConfirmed()) {
      console.log('--- Result ---');
      console.log('');
      console.log('Normal transaction');
      console.log(`${txnHash} is confirmed`);
      console.log('');
      console.log('please see detail in explorer:');
      console.log('');
      console.log('https://explorer.testnet.harmony.one/#/tx/' + txnHash);
      console.log('');
      process.exit();
    }
  }
  if (confiremdTxn.isConfirmed() && confiremdTxn.isCxConfirmed()) {
    console.log('--- Result ---');
    console.log('');
    console.log('Cross-Shard transaction');
    console.log(`${txnHash} is confirmed`);
    console.log('');
    console.log('please see detail in explorer:');
    console.log('');
    console.log('https://explorer.testnet.harmony.one/#/tx/' + txnHash);
    console.log('');
    process.exit();
  }
}
transfer();
```

## harmony-js/utils

Package này tuy ít function nhưng thực ra lại được dùng khá nhiều do nó giúp convert các đơn vị trong Harmony

Đơn vị trong harmony
```js
const { Units } = require('@harmony-js/utils');

[Units.wei, '1'], // 1 wei
[Units.Kwei, '1000'], // 1e3 wei
[Units.Mwei, '1000000'], // 1e6 wei
[Units.Gwei, '1000000000'], // 1e9 wei
[Units.szabo, '1000000000000'], // 1e12 wei
[Units.finney, '1000000000000000'], // 1e15 wei
[Units.ether, '1000000000000000000'], // 1e18 wei
[Units.one, '1000000000000000000'], // 1e18 wei
[Units.Kether, '1000000000000000000000'], // 1e21 wei
[Units.Mether, '1000000000000000000000000'], // 1e24 wei
[Units.Gether, '1000000000000000000000000000'], // 1e27 wei
[Units.Tether, '1000000000000000000000000000000'], // 1e30 wei
```

Các function thường được sử dụng bao gồm :
```js
const { Units, Unit, numberToString, add0xToString, fromWei, toWei, numToStr} = require('@harmony-js/utils');
const { BN } = require('@harmony-js/crypto');

const one = new Unit('1').asOne();
const oneToGwei = one.toGwei();
console.log(oneToGwei);

// numberToString
const num = 123;
const str = numberToString(num)
console.log(str);

// add0xToString
const str = '12345';
const expected = add0xToString(str)
console.log(expected);

// fromWei
const Wei = new BN('1000000000000000000');
const expected = fromWei(Wei, Units.one);
console.log(expected);

// toWei
const one = new BN('1');
const expected = toWei(one, hmy.utils.Units.one);
const num = numToStr(expected);
console.log(num);
```

## harmony-js/contract
Package cuối cùng này cũng là một trong những package quan trọng nhất, nó cung cấp các API để có thể tương tác với các smart contract

Đầu tiên chúng ta phải deploy 1 contract lên mạng testnet của Harmony. Tuy nhiên mình đã chuẩn bị 1 contract đã deploy để các bạn có thể test trực tiếp.

Đầu tiên tạo một file Counter.json với nội dung trong đường dẫn này: https://raw.githubusercontent.com/harmony-one/sdk/master/packages/harmony-contract/Counter.json

### Tạo instance contract Counter và log ra các methods của nó:

```js
const { Harmony } = require("@harmony-js/core");
const { ChainID, ChainType } = require("@harmony-js/utils");
const hmy = new Harmony("https://api.s0.b.hmny.io", {
  chainType: ChainType.Harmony,
  chainId: ChainID.HmyTestnet,
});

const contractJson = require("./Counter.json");
const contractAddr = "0x19f64050e6b2d376e52AC426E366c49EEb0724B1";

const contract = hmy.contracts.createContract(contractJson.abi, contractAddr);
console.log(contract.methods);
```

Output:

```js
{
  incrementCounter: [Function (anonymous)],
  '0x5b34b966': [Function (anonymous)],
  'incrementCounter()': [Function (anonymous)],
  decrementCounter: [Function (anonymous)],
  '0xf5c5ad83': [Function (anonymous)],
  'decrementCounter()': [Function (anonymous)],
  getCount: [Function (anonymous)],
  '0xa87d942c': [Function (anonymous)],
  'getCount()': [Function (anonymous)],
  contractConstructor: [Function (anonymous)]
}
```

### Estimate lượng gas tiêu thụ cho các transaction

```js
const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType, hexToNumber } = require('@harmony-js/utils');
const hmy = new Harmony('https://api.s0.b.hmny.io', {
  chainType: ChainType.Harmony,
  chainId: ChainID.HmyTestnet
});

const contractJson = require('./Counter.json');
const contractAddr = '0x19f64050e6b2d376e52AC426E366c49EEb0724B1';

const contract = hmy.contracts.createContract(contractJson.abi, contractAddr);

const options1 = { gasPrice: '0x3B9ACA00' }; // gas price in hex corresponds to 1 Gwei or 1000000000

contract.methods
  .getCount()
  .estimateGas(options1)
  .then(gas => {
    console.log('gas required for getCount is ' + hexToNumber(gas));
  });

```

Output: 

```js
gas required for getCount is 22077
```

### Gọi đến các function read-only trên smart contract

Mặc dù đây là những function không tốn gas nhưng hiện tại những api này vẫn cần truyền gasPrice và gasLimit

Hàm dưới đây sẽ tính lượng gasLimit cần phải dùng và thêm vào methods:

```js
let options2 = { gasPrice: 1000000000, gasLimit: 21000 }; // setting the default gas limit, but changing later based on estimate gas

contract.methods
  .getCount()
  .estimateGas(options1)
  .then(gas => {
    options2 = { ...options2, gasLimit: hexToNumber(gas) };
    contract.methods
      .getCount()
      .call(options2)
      .then(count => {
        console.log('counter value: ' + count);
      });
  });
```

Output:

```js
ounter value: 15
```

### Gọi đến function thay đổi dữ liệu trên contract
Đây là các function thay đổi dữ liệu trên smart contract do đó sẽ đòi hỏi lượng phí gas và phải kí transaction, do đó sẽ phải addPrivateKey.

```js
const options1 = { gasPrice: '0x3B9ACA00' }; // gas price in hex corresponds to 1 Gwei or 1000000000
let options2 = { gasPrice: 1000000000, gasLimit: 21000 }; // setting the default gas limit, but changing later based on estimate gas

contract.wallet.addByPrivateKey('1f054c21a0f57ebc402c00e14bd1707ddf45542d4ed9989933dbefc4ea96ca68');

contract.methods.incrementCounter().estimateGas(options1).then(gas => {
  options2 = {...options2, gasLimit: hexToNumber(gas)};
  contract.methods.incrementCounter().send(options2).then(response => {
    console.log(response.transaction.receipt);
  });
});
```

Cuối cùng là có thể subcription các Event trong contract để lắng nghe các Event contract emit từ contract Counter:

```js
const { ContractFactory } = require('@harmony-js/contract');
const { Wallet } = require('@harmony-js/account');
const { Messenger, WSProvider } = require('@harmony-js/network');
const { ChainID, ChainType, hexToNumber } = require('@harmony-js/utils');
const ws = new WSProvider('wss://ws.s0.b.hmny.io');

const wallet = new Wallet(
  new Messenger(
    ws,
    ChainType.Harmony,
    ChainID.HmyTestnet,
  ),
);
const factory = new ContractFactory(wallet);

const contractJson = require("./Counter.json");
const contractAddr = '0x8ada52172abda19b9838eb00498a40952be6a019';

const contract = factory.createContract(contractJson.abi, contractAddr);

contract.events
  .IncrementedBy()
  .on('data', (event) => {
    console.log(event);
  })
  .on('error', console.error);
```

# Kết luận
Về cơ bản những SDK phía trên là những SDK chính cần thiết để xây dựng một DApp trên nền tảng Harmony. Hi vọng bài viết giúp ích được cho các bạn.

# Nguồn tham khảo
https://github.com/harmony-one/sdk