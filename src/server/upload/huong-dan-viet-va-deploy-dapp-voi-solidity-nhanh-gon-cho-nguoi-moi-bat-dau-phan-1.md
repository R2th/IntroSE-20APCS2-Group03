**Đối với một lập trình viên, cách tốt nhất để học một công nghệ mới là nhảy vào và "vọc" nó. Cách tốt nhất là cùng nhau viết một ứng dụng Voting đơn giản ’Hello World!’.
Tất cả những gì Dapp này làm là khởi tạo một tập ứng cử viên, cho phép người dùng vote cho họ và hiện thị số phiếu của mỗi ứng cử viên.**

> Nếu đây là lần đầu bạn làm quen với Dapp, bạn có thể hiểu đơn giản Dapp là app chạy trên mạng phân tán Ethereum. Bạn cũng có thể đọc thêm về khái niệm Ethereum và Solidity tại [đây](https://viblo.asia/p/solidity-ethereum-va-smart-contract-dau-tien-Az45bg0oKxY).

**UPDATE!! [Phần 2](https://viblo.asia/p/huong-dan-viet-va-deploy-dapp-voi-solidity-nhanh-gon-cho-nguoi-moi-bat-dau-phan-2-aWj53OB156m) của series nhập môn lập trình Dapp với solidity vừa "ra lò"**!!

Để "vén" tấm màn bí mật đằng sau việc tạo ra một Dapp, trong bài viết này chúng ta chỉ sử dụng những công cụ "thô sơ nhất" mà không sử dụng những framework "too smart" như Truffle. Nhờ đó vừa hiểu được vai trò "gánh tạ" của framework giúp thực hiện hết phân khó, nhưng vẫn giúp bạn hiểu được cách thức vận hành bên trong việc tạo một Dapp.

## Objective:
* Dựng môi trường lập trình
* Học cách viết smart-contract, compile và deploy nó lên blockchain trong môi trường lập trình
* Tương tác với blockchain qua nodeJS console.
* Tương tác với blockchain qua một webpage, hiển thị danh sách ứng cử viên và số phiếu của họ.

Đây là "bức tranh" khái quát cho ứng dụng chúng ta sẽ xây dựng:
![](https://images.viblo.asia/6668ac2a-f76c-41fc-805a-7616af31739d.png)

## 1. Dựng môi trường lập trình.

Để phát triển một Dapp một cách hiệu quả thì việc sử dụng in-memory blockchain để test Dapp nhanh chóng và miễn phí là phù hợp nhất. Trong bài viết này, chúng ta sẽ sử dụng [ganache](https://truffleframework.com/docs/ganache/overview) để test Dapp, [phần 2](https://viblo.asia/p/huong-dan-viet-va-deploy-dapp-voi-solidity-nhanh-gon-cho-nguoi-moi-bat-dau-phan-2-aWj53OB156m) của bài viết này sẽ hướng dẫn bạn cách đưa Dapp này "go Live" trên mạng Testnet. Ngoài ra chúng ta sẽ sử dụng thư viện [web3js](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3-javascript-app-api-for-02xx) để deploy ứng dụng và tương tác với blockchain. Lần lượt chạy những commands bên dưới để cài đặt ganache và web3js:

```js
$ npm -v
$ node -v
$ sudo apt-get install build-essential python
$ mkdir hello_world_voting
$ cd hello_world_voting
$ mkdir node_modules
$ npm install ganache-cli web3@0.20.2
$ node_modules/.bin/ganache-cli
```

Để ý rằng ganache-cli tạo sẵn cho chúng ta 10 account với 100 token trong đó.

![](https://images.viblo.asia/7369276a-5aa2-4a08-8ca9-c6eb8369207b.png)




## 2. Viết smart-contract đơn giản

Chúng ta sẽ sử dụng ngôn ngữ Solidity để viết smart-contract. Nếu bạn đã quen với lập trình OOP thì việc học solidity khá đơn giản và gần gũi. Dưới đây là code của smart-contract.

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

Lưu code bên trên vào trong file có tên Voting.sol trong thư mục hello_world_voting. Bây giờ chúng ta sẽ compile code và deploy nó lên giả lập blockchain ganache.
Để compile solidity code, chúng ta cần cài solc trong thư mục ./hello_world_voting:

`npm install solc`

Đầu tiên, chúng ta chạy ‘node’ command trong cửa sổ terminal khác, rồi sau đó khởi tạo solc và web3 obeject.

```js
$ node
> Web3 = require('web3')
> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
```

Để đảm bảo web3 object đã được khởi tạo, chạy thử command phía dưới để query tất cả acccounts. Bạn sẽ nhìn thấy kết quả tương tự như phía dưới:

```js
> web3.eth.accounts
[ '0x7049205fdf5041a64d09d2aaa32fbe48580ca893',
  '0x14880daaffd07bebd60b5fa675d2b711eae2ddc1',
  '0x10cc40c11e3a30670e9567d810d9ac34d3a17662',
  '0x7af46839f2848cb820bbc1018cb3a4d48ff4339a',
  '0xd5f8de1699676518ce9a3be446746a36e3688eb2',
  '0x1e0053b05ce71d43c421b2a71278474921133add',
  '0x3f5b700bd80ec09f03dfbb61697b7d58a6665b6f',
  '0x31c99f57035c533d8aab3f2fed3b00f010b2c520',
  '0x6e976e60af4b0c9d54063ca7e45d779eaa305032',
  '0x5302ec4772a9dd83989fecf3b355fbdecd9d855d' ]

```

Tiếp theo chúng ta sẽ dùng thư viên solc để compile code, rồi sử dụng web3js để deploy ứng dụng lên Blockchain và tương tác với nó.

```js
> code = fs.readFileSync('Voting.sol').toString()
> solc = require('solc')
> compiledCode = solc.compile(code)
```

Mục đích của việc compile code là để dịch solidity code sang bytecode là mã máy, nhờ đó Ethereum (bằng máy ảo [EVM](https://github.com/CoinCulture/evm-tools/blob/master/analysis/guide.md)) có thể chạy các method trong contract khi được gọi . Khi compile code thành công và in ra 'contract' object:

```js
> compiledCode.contracts[':Voting']
```

Chúng ta cần lưu ý 2 trường cực kỳ quan trọng là:
1. **compiledCode.contracts[':Voting'].bytecode**: Đây là **bytecode** mà chúng ta nhận được từ source code trong Voting.sol đã được compiled. **Bytecode** được dùng deploy contract lên blockchain
2. **compiledCode.contracts[':Voting'].interface**: Đây là **interface** của contract (sau này xin gọi là [ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI)). **ABI** được dùng để invoke method/function của contract, bất cứ khi nào bạn muốn tương tác với contract bạn phải dùng **ABI**. Tiếp tục đọc bài viết để thấy được cách sử dụng nó.
 
Bây giờ chúng ta sẽ deploy contract. Đầu tiên bạn tạo một contract object, cụ thể ở đây là **VotingContract**. Object này sẽ được dùng để deploy và khởi tạo contracts trong blockchain.

```js
> abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
> VotingContract = web3.eth.contract(abiDefinition)
> byteCode = compiledCode.contracts[':Voting'].bytecode
> deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
> deployedContract.address
> contractInstance = VotingContract.at(deployedContract.address)
```

Chúng ta sử dụng **VotingContract.new** dùng để deploy contract vào blockchain. Tham số đầu tiên là mảng danh sách các ứng cử viên, tham số thứ hai phức tạp hơn một chút:

* **data**: dữ liệu là bytecode được deploy lên blockchain.
* **from**: blockchain đánh dấu ai là người đã deploy contract này. Cụ thể trong trường hợp này, chúng ta chỉ đơn giản chọn account đầu tiên trong mảng được trả về từ web3.eth.accounts. Đối với giả lập ganache, web3.eth.accounts trả về mảng 10 test account. Còn trong mạng blockchain thực tế, chúng ta không thể chọn account một cách tùy ý. Bạn phải sở hữu account và unlock nó trước khi thực hiện bất kỳ một transaction nào (ở đây là gửi transaction khởi tạo một contract mới). Tuy nhiên để thuận tiện, ganache để unlock cả 10 account test cho chúng ta.
* **gas**: bạn quy đinh lượng gas tối đa bạn định trả cho miner người sẽ thêm code của bạn vào blockchain, giống như bạn ước lượng đi từ A-B sẽ hết bao nhiêu rồi mặc cả với chú xe ôm. Lượng Ether dùng để trả phí này được lấy trực tiếp từ tài khoản của **from**.

Nếu bạn chạy **deployedContract.address** và console trả về giá trị là một địa chỉ nào đó thì có nghĩa bạn deploy thành công. 

```js
> deployedContract.address
'0x7a28436ade4a58a3bdbf7da63541c3f2a4130896'
```

Việc còn lại là khai báo **contractInstance** để sử dụng cho việc tương tác với contract qua console sau này. Tuy nhiên, trong thực tế có hàng trăm ngàn contract được deployed vậy làm sao để tương tác với đúng contract. **Hãy nhớ rằng, khi bạn cần tương tác với một contract bất kỳ, bạn cần deployed address và abi của contract đó.**

## 3.Tương tác với blockchain qua node console

```js
> contractInstance.totalVotesFor.call('Rama')
BigNumber { s: 1, e: 0, c: [ 0 ] }
> contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
'0xac0991bd2a8a4783a8c06dade2a60ab674c1bf740fad8bfd8407d51159bd6578'
> contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
'0x3438705451a0612b2073ae12474f3d63e35037b55060bf1e89580c1ad17286d3'
> contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
'0xd7989ca23bfdcabb25c6edb4da5facb115ec99f077b295e4157d391a80141114'
> contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
'0x64728000fc95581c51947102c528a7a92011e06b658bccae4358a90de30a97be'
> contractInstance.totalVotesFor.call('Rama').toLocaleString()
'4'
```

Thử những commands bên trên và bạn sẽ thấy số vote sẽ tăng. Mỗi lần bạn vote, bạn nhận được giá trị transaction hash (**Tx hash**) ví dụ: `0x3438705451a0612b2073ae12474f3d63e35037b55060bf1e89580c1ad17286d3`. Giá trị **Tx hash** có thể dùng để chứng minh sự tồn tại của mỗi lá phiếu bằng việc một transaction đã được gửi đi và có thể được truy ngược về quá khứ bất cứ khi nào. Việc transaction đã gửi đi không thể thay đổi được là một trong những ưu điểm lớn nhất của blockchain như Ethereum.

## 4. Xây dựng giao diện web để tương tác với blockchain

Việc đơn giản còn lại là tạo một file html đơn giản và thực hiện việc gọi hàm trên file js. Thêm 2 file phía dưới vào thư mục hello_world_voting và mở index.html để "thưởng thức".

**index.html**:
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
  </div>
  <input type="text" id="candidate" />
  <a href="#" onclick="voteForCandidate()" class="btn btn-primary">Vote</a>
</body>
<script src="https://cdn.rawgit.com/ethereum/web3.js/develop/dist/web3.js"></script>
<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
<script src="./index.js"></script>
</html>
```

-----

**index.js**:
```js
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
// Trong nodejs console, gõ contractInstance.address để lấy giá trị địa chỉ của contract sau khi nó được deployed và thay nó vào giá trị phía dưới: 
contractInstance = VotingContract.at('0x7a28436ade4a58a3bdbf7da63541c3f2a4130896');
candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

function voteForCandidate() {
  candidateName = $("#candidate").val();
  contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
});
```


Nếu bạn còn nhớ, chúng ta đã nhắc đến việc sử dụng abi và address để tương tác với bất kỳ contract nào. Bạn có thể thấy việc chúng được sử dụng trong file index.js để tương tác với contract.
Mở index.html bằng trình duyệt của bạn:

![](https://images.viblo.asia/95fe9854-9128-48ee-b102-1ce2425bac4c.png)

Reference:
* [English post](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2)