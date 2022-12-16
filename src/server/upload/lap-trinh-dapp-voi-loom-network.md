![](https://images.viblo.asia/b800dbe5-626b-434e-9faa-b0bdbc340920.png)

# Loom Network là gì ?

   Loom Network là một giải pháp mở rộng lớp 2 cho Ethereum. Đây là một mạng lưới sidechains DPoS, cho phép các trò chơi và DApps trên nền tảng blockchain có khả năng mở rộng trong khi vẫn được hỗ trợ tính bảo mật của Ethereum. Nó cho phép các nhà phát triển chạy các ứng dụng quy mô lớn và là giải pháp mở rộng Ethereum đầu tiên được áp dụng vào thực tế.

## The Loom SDK

   Sản phẩm cốt lõi của Loom là SDK cho phép người dùng nhanh chóng xây dựng blockchain cho riêng họ mà không cần phải hiểu chi tiết về hạ tầng hay các thuật toán đồng thuận của blockchain. Hãy nghĩ về nó giống như một bộ tạo blockchain cho riêng bạn.

## DAppChains

   Loom SDK tạo ra một DAppChain - một blockchain hai lớp sử dụng Ethereum làm lớp cơ sở của nó. Việc chạy DApp trên sidechain đem lại cho Ethereum có một số lợi ích, nhưng quan trọng nhất: DAppChains có thể sử dụng các quy tắc đồng thuận (như DPoS) để tối ưu hóa cho khả năng mở rộng . Sử dụng Ethereum làm lớp cơ sở có nghĩa là các tài sản dựa trên DAppChain ( như tokens ERC20 và ERC721) có thể có được đảm bảo một cách an toàn.

## Khả năng mở rộng DApps
   Loom SDK cho phép người dùng chọn thuật toán đồng thuận, quy tắc để tùy chỉnh khả năng mở rộng hay bảo mật tùy theo nhu cầu DApps cần. Loom Network hỗ trợ DPoS (Delegated Proof of Stake), cho phép phát triển các ứng dụng trò chơi trực tuyến và mạng xã hội quy mô lớn . Đó là 2 loại DApp đầu tiên mà Loom tập trung vào phát triển (mặc dù người dùng hoàn toàn có thể xây dựng bất kỳ loại DApp nào trên SDK Loom) . Được liên kết với Ethereum thông qua Plasma trên nên có thể chuyển tài sản qua lại từ Ethereum vào Dappchain, để dễ hiểu thì các tokens ERC20 và ERC721 được sử dụng trên DAppChain trong khi vẫn được Ethereum bảo đảm . Nói tóm lại, SDK Loom cho phép các nhà phát triển xây dựng các loại ứng dụng giống như họ sẽ xây dựng trên EOS, nhưng được Ethereum hỗ trợ.

Để tìm hiểu thêm về Plasma có thể tham khảo bài viết :
https://viblo.asia/p/plasma-giai-phap-cho-su-mo-rong-mang-luoi-blockchain-tiep-theo-ByEZkybY5Q0

ring ring ring ... giờ học lý thuyết đến đây là hết tiếp theo là đến giờ thực hành 
# Chạy và tạo ứng dụng đơn giản trên Loom Network

##  Download Loom
Bạn có thể sử dụng lệnh bên dưới để tải Loom ở thư mục hiện tại:

    curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
##  Installation
Chạy các lệnh dưới đây ở cùng thư mục với file loom vừa tải về
    
    ./loom init
## Run

    ./loom run

Chỉ với 3 lệnh bên trên bạn đã tạo được một mạng blockchain cho riêng mình rồi đấy :+1:

# Deploy contract lên mạng Loom 

## Hãy bắt đầu với Solidity + Truffle

Bạn có thể cài đặt Truffle theo các hướng dẫn ở đây : https://www.trufflesuite.com/docs/truffle/overview

Và học về ngôn ngữ Solidity để viết contract tại đây : https://cryptozombies.io/

## Deploying and run from Truffle

```
# Currently supported version
npm install -g truffle@5.0.0
```



Giờ hãy tạo project nào

```
# Create directory and access
mkdir simple-store
cd simple-store

# Initialize a project from zero with truffle
truffle init
```


Các file được tạo ra 
    
```
    .
    ├── contracts
    │   └── Migrations.sol
    ├── migrations
    │   └── 1_initial_migration.js
    ├── test
    ├── truffle-config.js
    └── truffle.js
```
    
## Viết contract 

Trên thư mục contracts , chúng ta tạo file mới có tên Simplestore.sol có chức năng **set**  một giá trị tham số cũng cho một thay đổi giá trị đó, hàm **get** chỉ đọc và một **event** có tên **NewValueSet** sẽ có giá trị tham số, như ví dụ sau:
 
```js
pragma solidity ^0.4.22;
contract SimpleStore {
  uint value;

  event NewValueSet(uint _value);

  function set(uint _value) public {
    value = _value;
    emit NewValueSet(value);
  }

  function get() public view returns (uint) {
    return value;
  }
}

```

Tiếp theo thêm 1 migration và tên tệp bắt đầu bằng số 2 ví dụ 2_simple_store.js và nội dung phải như sau:

```js
var SimpleStore = artifacts.require("./SimpleStore.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStore);
};
```

## Cài đặt và cấu hình Loom Truffle Provider

Công đoạn tiếp theo chúng ta cần cài **loom-truffle-provider**  để cung cấp kết nối giữa Truffle và Loom DAppChain và cấu hình truffle-config.js

```
npm install loom-truffle-provider --save
#or
yarn add loom-truffle-provider
```
   
Trước khi cấu hình truffle-config.js chúng ta cần tạo key bằng lệnh :

`loom genkey -a public_key -k private_key`


Cấu hình **truffle-config.js** 
    
```js
const { readFileSync } = require('fs')
const LoomTruffleProvider = require('loom-truffle-provider')

const chainId    = 'default'
const writeUrl   = 'http://127.0.0.1:46658/rpc'
const readUrl    = 'http://127.0.0.1:46658/query'
const privateKey = readFileSync('./private_key', 'utf-8')

const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)

module.exports = {
  networks: {
    loom_dapp_chain: {
      provider: loomTruffleProvider,
      network_id: '*'
    }
  }
}
```
    
## Running Truffle deploy command

Bây giờ bạn có thể deploy contract lên Dappchain được rồi nhưng hãy nhớ chạy mạng bằng lệnh  **./loom run** trước nhé :

`truffle deploy --network loom_dapp_chain`


Nếu bạn đã deploy và muốn deploy lại hãy dùng lệnh 

`truffle deploy --reset --network loom_dapp_chain`


## Cấu hình và chạy Web3.js + LoomProvider

Chúng ta đã deploy được contract lên mạng Dappchain rồi và tiếp theo chúng ta sẽ tương tác với contract đó thông qua web3.js và LoomProvider

Cài đặt web3.js 

```
npm install web3@1.0.0 --save
#or
yarn add web3@1.0.0
```
Cài đặt LoomProvider ( nó nằm trong loom-js)

```
npm install loom-js --save
#or
yarn add loom-js
```

Sau khi cài đặt xong chúng ta tạo một file js có tên **index.js** đùng để tương tác với Dappchain với nội dung như sau :

```js
const Web3 = require('web3')
const SimpleStore = require('./build/contracts/SimpleStore.json')
const {
  LoomProvider, Client,
  Contract, Address, LocalAddress, CryptoUtils
} = require ('loom-js')

const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// Create the client
const client = new Client(
  'default',
  'ws://127.0.0.1:46658/websocket',
  'ws://127.0.0.1:46658/queryws',
)
const main = async() =>  {
  // The address for the caller of the function
  const from = LocalAddress.fromPublicKey(publicKey).toString()
  console.log("from = " + from);

  // Instantiate web3 client using LoomProvider
  const web3 = new Web3(new LoomProvider(client, privateKey))

  // const contractAddress = '0x62C436B6f3f028cF1eb14BDBBc0eaF0c63f62B0E'
  const contractAddress = SimpleStore.networks["13654820909954"].address;

  console.log(contractAddress);
  // Instantiate the contract and let it ready to be used
  const contract = new web3.eth.Contract(SimpleStore.abi, contractAddress, {from})
  // Set the value 47
  await contract.methods.set(47).send({from })
  // Get the value 47
  await contract.methods.get().call({from : from},(error,result)=>{
    console.log("result = " + result);
  })

  contract.events.NewValueSet({}, (error, event) => {
    console.log('New value set = ', event)
  })
  .on('error',console.error)// The address for the caller of the function
}

main();
```
    
Để chạy file này bạn có thể chạy bằng lệnh :
    
`node index.js`
    
github ví dụ hoàn chỉnh :

https://github.com/vinhyenvodoi98/Loomnetwork_Dappchain


Các nguồn tham khảo : 

https://loomx.io/developers/docs/en/intro-loom-sdk.html

Bài giới thiệu về Loom Network cũng như xây dựng một ví dụ đơn giản chạy  trên Loom Network đến đây là kết thúc rất mọng mọi người có thể để lại ý kiến dưới phần comment bên dưới