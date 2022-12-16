**Trong [phần 1](https://viblo.asia/p/huong-dan-viet-va-deploy-dapp-voi-solidity-tren-ethereum-nhanh-gon-cho-nguoi-moi-bat-dau-phan-1-bJzKmgaXl9N) của series này, chúng ta đã xây dựng một ứng dụng voting đơn giản với ganache và web3js. Việc thú vị nhất là chúng ta có thể đưa Dapp này "Go Live" lên mạng blockchain. Ethereum có một main blockchain và một vài test blockchain nổi tiếng như:**
* Testnet: có một vài test blockchains như Ropsten, Rinkeby, Kovan. Tất cả những mạng này chỉ được sử dụng với mục đích testing và ether của nó cũng vậy.
* Mainnet: đây là mạng Ethereum thực tế mà cả thế giới sử dụng.

## Objective:
1. Cài đặt Ethereum dapp framework - Truffle
2. Chuẩn bị ví Metamask và Infura 
3. Cài đặt Dapp để tích hợp với Infura
4. Deploy contract lên Ropsten testnet với Infura và Metamask
5. Tương tác với contract qua truffle console và webpage.

## 1. Cài đặt Truffle framework 

Cài đặt truffle sử dụng npm. Phiên bản hiện tại của truffle đang được sử dụng là: v4.1.14

```js
$ npm install -g truffle
$ truffle -v
Truffle v4.1.14 - a development framework for Ethereum
```

*Tùy vào cài đặt máy tính của bạn mà có thể bạn sẽ phải sử dụng sudo*

## 2. Chuẩn bị ví Metamask và Infura

Có nhiều cách để có thể tương tác được với Ethereum, cách "kinh điển" nhất là duy trì một light node hoặc full node bằng việc cài đặt [Ethereum-client](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum) và thực hiện đồng bộ blockchain với mạng Ethereum. Hoặc đơn giản là là sử dụng:
*  Infura: cung cấp API đến các remote node, do đó bạn sẽ không phải lo tự duy trì một node nữa.
*  Google extension Metamask: đây là một remote-client giúp quản lý account Ethereum của bạn, thực hiện một số chức năng như tạo và gửi transaction lên mạng, tương tác với các Dapp, ..

### Cài đặt ví Metamask
Metamask hiện đã hỗ trợ Chorme, FireFox, Opera và Brave.

[![](https://images.viblo.asia/e976934d-5aba-4836-9b5e-019cbc4f52a4.png)](https://metamask.io/)

Thực hiện cài đặt Metamask từ Google extension. Sau đó tạo mới hoặc nếu lần đầu tiên bạn dùng metamask sẽ được hỏi tạo password.

![](https://images.viblo.asia/f38adc2a-bd52-480f-bcaa-279a580496f2.png)

Lưu seed word vào đâu đó để sử dụng cho các bước sau.
> Lưu ý bạn không nên chia sẻ seed word với người lạ như tôi đang làm, điều đó chẳng khác gì nhờ người lạ cầm hộ tiền cả. Bạn có thể tìm hiểu lý do tại sao ở [đây](https://github.com/MetaMask/metamask-extension).

Đổi lại mạng Ethereum sang Ropsten:

![](https://images.viblo.asia/cde72e35-e403-4c34-ad2a-f0a6d1bb46f0.png)

Nếu mới tạo account,bạn nên vào [Metamask faucet](https://faucet.metamask.io/) để nhận Ether miễn phí. Chỉ khi đó bạn mới có thể thực hiện deploy và gửi transaction đi từ account đó được.


### Lấy API từ Infura

Vào trang chủ của [Infura](https://infura.io/) tạo một tài khoản và vào DASHBOARD để tạo một project mới. Tại đây copy `API KEY` và lưu nó vào đâu đó để sử dụng sau này:

![](https://images.viblo.asia/7e2a23fb-f2fe-47bf-8062-a0dc3cbb2dc9.png)

## 3. Cài đặt Dapp để tích hợp với Truffle và Infura

```js
$ mkdir voting
$ cd voting
$ npm install -g wepack
$ truffle unbox webpack
$ ls
```

![](https://images.viblo.asia/6e7cbd1f-2919-4715-9fd3-72890124802a.png)

Như bạn có thể thấy bên trên, truffle tạo ra những file cần thiết cho việc chạy full stack Dapp. Đồng thời framework cũng có một ứng dụng mẫu để làm quen nhưng chúng ta sẽ không "làm quen" ứng dụng đó ở trong bài viết này. Có thể bạn sẽ muốn đọc về nó ở [đây](https://truffleframework.com/docs/truffle/getting-started/truffle-with-metamask). Do đó bạn hoàn toàn có thể xóa những file này CovertLib.sol và MetaCoin.sol ra khỏi thư mục contracts

Một điều rất quan trọng cần phải thực hiện đó là "vọc" code trong thư mục migrations. Những file này được sử dụng để deploy contract lên blockchain. (Nếu bạn còn nhớ trong [bài trước](https://viblo.asia/p/huong-dan-viet-va-deploy-dapp-voi-solidity-tren-ethereum-nhanh-gon-cho-nguoi-moi-bat-dau-phan-1-bJzKmgaXl9N), chúng ta đã dùng **VotingContract.new** để deploy contract nhưng giờ không cần nữa). Chú ý đến các tiền tố 1, 2 trong `1_initial_migration`, `2_deploy_contracts` nó được sử dụng để đánh thứ tự thực thi các file migrations. Với file migrations đầu tiên, nhiệm vụ của nó là  deploy contract có tên là Migrations lên blockchain và sử dụng nó để lưu prefixed của file sau cùng được deployed. Mỗi lần chạy `truffle migrate`, truffle sẽ queries từ blockchain để lấy prefixed của file cuối cùng được deployed và sau đó deploy tiếp các contract chưa được deployed. Sau đó lại tiếp tục cập nhật `last_completed_migration` đến prefixed của file cuối cùng được deployed. Bạn cũng có thể chạy `truffle migrate --reset --all` để thực thi deploy lại từ file đầu.

Tiếp theo chúng ta sẽ cùng update code từ bài trước. Đầu tiên, thêm Voting.sol vào thư mục contracts (file này vẫn được giữ nguyên).

```js
pragma solidity ^0.4.18;
// Chúng ta phải chỉ ra version của compiler cho code của contract

contract Voting {
  /* trường mapping phía dưới tương đương với một associative array, lưu dữu liệu
  theo cấu trúc (key => value). Theo đó key của mapping được lưu trữ dưới dạng bytes32 
  dùng để lưu tên của ứng cử viên, còn value được lưu trữ dưới dạng unsigned integer dùng 
  để lưu số phiêu của ứng cử viên: votesReceived[key] = value
  */
  
  mapping (bytes32 => uint8) public votesReceived;
  
  /* Solidity chưa cho phép chuyền vào mảng của strings trong constructor. Do đó
  chúng ta sử dụng mảng bytes32 để lưu trữ danh sách ứng cử viên
  */
  
  bytes32[] public candidateList;
  
  /* Đây là constructor được gọi duy nhất một lần khi deploy contract lên blockchain.
  Khi deploy contract, chúng ta chuyền vào danh sách ứng cử viên. Lưu ý từ phiên bản
  solidity ^0.4.22 mọi constructor sẽ được khai báo bằng cú pháp "constructor(arg)"
  */
  function Voting(bytes32[] candidateNames) public {
    candidateList = candidateNames;
  }

  // Đây là hàm trả về tổng lượng vote cho ứng cử viên tương ứng tính tới thời điểm hiện tại.
  function totalVotesFor(bytes32 candidate) view public returns (uint8) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  // Hàm bỏ phiếu sẽ tăng 1 vào tổng số phiếu của ứng cử viên tương ứng với tham số
  // truyền vào.
  function voteForCandidate(bytes32 candidate) public {
    require(validCandidate(candidate));
    votesReceived[candidate] += 1;
  }
  
  // Hàm kiểm tra tính hiệu lực của ứng cử viên bằng cách search từ danh sách ứng cử viên
  function validCandidate(bytes32 candidate) view public returns (bool) {
      for(uint i = 0; i < candidateList.length; i++) {
          if (candidateList[i] == candidate) {
            return true;
          }
        }
        return false;
      }
  }
```

-----

```js
$ ls contracts
Migrations.sol  Voting.sol
```

Tiếp theo, sửa lại nội dung của 2_deploy_contracts.js trong thư mục migration:

```js
var Voting = artifacts.require("./Voting.sol");
module.exports = function(deployer) {
  deployer.deploy(Voting, ['Rama', 'Nick', 'Jose'], {gas: 470000});
};
/*Như bạn có thể thấy ở trên, deployer truyền vào tham số thứ nhất là tên của contract, tiếp theo đó là tham số của constructor và cuối cùng là lượng gas chúng ta dự định cần dùng để deploy contract. Hoàn toàn phụ thuộc vào nội dung code ta dùng. 
*/
```

Bạn thể tùy chỉnh giá trị gas ở trong global setting trong file truffle.js nhờ đó nếu bạn có lỡ quên không truyền vào giá trị gas trong migration file thì nó sẽ sử dụng giá trị mặc định trong global setting.

```js
// Cho phép sử dụng ES6 trong migration
require('babel-register')

module.exports = {
  networks: {
    ganache: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // match bất kỳ network nào
      gas: 470000
    }
  }
}
```

Thay nội dung của app/scripts/index.js với:

**index.js**
```js
// Import the page's CSS. Webpack will know what to do with it.
// Import file css
import "../styles/app.css";

// Import thư viện
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'


/*
 * Khi compiple và deploy Voting contract,
 * truffle lưu abi và deployed address trong một file json 
 * ở trong thư mục build. Ta dùng nó để setup Voting abstraction.
 * Sau đó dùng abstraction này để tạo instance của Voting contract
 * later to create an instance of the Voting contract.
 */
import voting_artifacts from '../../build/contracts/Voting.json'

var Voting = contract(voting_artifacts);

let candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

window.voteForCandidate = function(candidate) {
  let candidateName = $("#candidate").val();
  try {
    $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    $("#candidate").val("");

    /* Voting.deployed() trả về instance của contract. VỚi mỗi lần call
     * Truffle trả về một promise mà chúng ta sẽ sử dụng then() bất cứ
     * khi nào có transaction call.
     */
    Voting.deployed().then(function(contractInstance) {
      contractInstance.voteForCandidate(candidateName, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
        let div_id = candidates[candidateName];
        return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
          $("#" + div_id).html(v.toString());
          $("#msg").html("");
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Dùng Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // nếu fallback (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Voting.setProvider(web3.currentProvider);
  let candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    Voting.deployed().then(function(contractInstance) {
      contractInstance.totalVotesFor.call(name).then(function(v) {
        $("#" + candidates[name]).html(v.toString());
      });
    })
  }
});
```

Thay nội dung của file app/index.html bằng:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Hello World DApp</title>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
  <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet' type='text/css'>
</head>
<body class="container">
  <h1>A Simple Hello World Voting Application</h1>
  <div id="address"></div>
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Candidate</th>
          <th>Votes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Rama</td>
          <td id="candidate-1"></td>
        </tr>
        <tr>
          <td>Nick</td>
          <td id="candidate-2"></td>
        </tr>
        <tr>
          <td>Jose</td>
          <td id="candidate-3"></td>
        </tr>
      </tbody>
    </table>
    <div id="msg"></div>
  </div>
  <input type="text" id="candidate" />
  <a href="#" onclick="voteForCandidate()" class="btn btn-primary">Vote</a>
</body>
<script src="https://cdn.rawgit.com/ethereum/web3.js/develop/dist/web3.js"></script>
<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
<script src="app.js"></script>
</html>
```



## 4. Deploy contract lên Ropsten testnet với Infura
Trong thư mục `./voting` cài đặt `truffle-hdwallet-provider` bằng npm:

```js
$ npm install --save truffle-hdwallet-provider
```

Sau đó cập nhật lại nội dung của `truffle.js` như sau:

```js
const HDWalletProvider = require("truffle-hdwallet-provider");
// Bạn cũng có thể sử dụng 'dotenv' để lưu biến môi trường từ '.env' sang 'process.env'
// và tương ứng bổ sung process.env.MNENOMIC & process.env.INFURA_API_KEY
// Mặc định truffle-hdwallet-provider sẽ chọn account đầu tiên của Metamask, bạn có thể chọn account khác trong Metamask bằng cách truyền vào index (số thứ tự tính từ 0 của account trong Metamask).
// Điều đó có nghĩa new HDWalletProvider( .., "https://ropsten.infura.io/v3/" +  INFURA_API_KEY) 
// tương đương với new HDWalletProvider( .., "https://ropsten.infura.io/v3/" +  INFURA_API_KEY, 0)
MNENOMIC = "ABC"// Thay ABC bằng seed word của account bạn muốn dùng vào đây.
INFURA_API_KEY = "123"// Thay 123 bằng API KEY của Infura vào đây

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    // testnets
    // properties
    // network_id: định nghĩa từ vào network
    // gas: gas limit
    // gasPrice: gas price in gwei
    ropsten: {
      provider: () => new HDWalletProvider( MNENOMIC, "https://ropsten.infura.io/v3/" +  INFURA_API_KEY),
      network_id: 3,
      gas: 470000,
      gasPrice: 21
    },
    kovan: {
      provider: () => new HDWalletProvider( MNENOMIC, "https://kovan.infura.io/v3/" +  INFURA_API_KEY),
      network_id: 42,
      gas: 470000,
      gasPrice: 21
    },
    rinkeby: {
      provider: () => new HDWalletProvider( MNENOMIC, "https://rinkeby.infura.io/v3/" +  INFURA_API_KEY),
      network_id: 4,
      gas: 470000,
      gasPrice: 21
    },
    // main ethereum network(mainnet)
    main: {
      provider: () => new HDWalletProvider( MNENOMIC, "https://mainnet.infura.io/v3/" +  INFURA_API_KEY),
      network_id: 1,
      gas: 470000,
      gasPrice: 21
    }
  }
}

```

Cuối cùng deploy contract của bạn lên Ropsten testnet, mở terminal chạy lệnh sau:

```js
truffle migrate --network ropsten
```

Nếu bạn deploy thành công, terminal sẽ hiển thị tương tự thế này:

```js
Compiling ./contracts/Voting.sol...

Compilation warnings encountered:

Writing artifacts to ./build/contracts

Using network 'ropsten'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x8c3310c07165a7b3d3b0a0f1f8f7c753a4ae2243468fc4878fb5e9306d973be7
  Migrations: 0x73afdd29685ddcb1e3c3115b5919a5ded9142c23
Saving successful migration to network...
  ... 0x6cec95075995c7998ab1022443b40c9e0756cfe75564a8894cff3a66c856e8ad
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying ConvertLib...
  ... 0x2149ca549a1e6e8ee2652c9ae6c32b6eff3d9baf6d76a3acc011467302feb683
  ConvertLib: 0x6dee533b01b412bd2e707582630ce910413d3296
  Linking ConvertLib to MetaCoin
  Deploying MetaCoin...
  ... 0xf85ae8e2883f579005c19f1271d8637d4066d9477a23b875a402fe258a88dcbb
  MetaCoin: 0x3d7cf32534ae86476031f62aa0aeead8c2ee1c92
Saving successful migration to network...
  ... 0x95cb734353165799fb711694359fddd8d73bbf3d21aef08f0c220588680c47b8
Saving artifacts...

```




## 5. Tương tác với contract qua truffle console và webpage.

Nếu bạn đã đến được bước này thì có nghĩa bây giờ bạn đã có một Dapp Live trên Ropsten net rồi đó!! Chúng ta có thể tương tác với nó qua cả console và webpage:

```js
$ truffle console --network ropsten
truffle(ropsten)> Voting.deployed().then(function(contractInstance) {contractInstance.voteForCandidate('Rama').then(function(v) {console.log(v)})})

//Chờ một lát terminal sẽ hiển thị

truffle(ropsten)> { tx: '0xa6a150db911da9a8fbcb9d91f9af28faf78fb5129813786b23dbd32e9843b926',
  receipt: 
   { blockHash: '0x45acd369a44a1714a9c8dcd6284c018c94fd45cbbfbb27cfeff87bfe5972127e',
     blockNumber: 3893282,
     contractAddress: null,
     cumulativeGasUsed: 3623373,
     from: '0x387e69bfa5b28726b54c9ef9a4f0e2586e8d4415',
     gasUsed: 43411,
     logs: [],
     logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
     status: '0x1',
     to: '0x0e084fa36eb7fdebc9fcab5ff158d8ab49221d94',
     transactionHash: '0xa6a150db911da9a8fbcb9d91f9af28faf78fb5129813786b23dbd32e9843b926',
     transactionIndex: 89 },
  logs: [] }
  
truffle(ropsten)> Voting.deployed().then(function(contractInstance) {contractInstance.totalVotesFor.call('Rama').then(function(v) {console.log(v)})})
truffle(ropsten)> BigNumber { s: 1, e: 0, c: [ 1 ] }

```

Bạn hoàn toàn có thể sử dụng webpage để tương tác với blockchain:

```js
$ npm run dev
```

Mở localhost:8080 lên và bạn sẽ thấy kết quả vote hiện tại đang là 1:0:0 do chúng ta vừa mới thực hiện vote trong console (chú ý đoạn `contractInstance.voteForCandidate('Rama')` ).

![](https://images.viblo.asia/410a7303-caec-46ca-a7b3-8e78cf035e2e.png)

-----

Bạn hoàn toàn có thể thực hiện việc bỏ phiếu cho "Nick" trên webpage!

![](https://images.viblo.asia/49d480ca-abe5-4552-9330-2c366021bc7e.png)

Sumbit transaction bằng Metamask và chờ kết quả trong vài giây.
> Nếu chờ quá lâu bạn sẽ phải F5 đấy. Nguyên do thì để bạn tự tìm hiểu nhé.

![](https://images.viblo.asia/d6d80ec0-5e43-4f09-bec6-3f6ca64fbfc7.png)

# CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH SERIES ĐẦU TIÊN!
~~Upvote cho tôi nếu bạn muốn đọc walkthrough về CaptureTheEther~~

![](https://images.viblo.asia/22cb7d11-4f23-43a2-aaa1-7b643cd93f9f.png)

**Đón đọc CaptureTheEther-Walkthrough trong series sắp tới!!**


REFERENCE:
* [Deploy truffle project with infura](https://medium.com/coinmonks/deploy-your-smart-contract-directly-from-truffle-with-infura-ba1e1f1d40c2)
* [Full stack Hello World Dapp](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-2-30b3d335aa1f)