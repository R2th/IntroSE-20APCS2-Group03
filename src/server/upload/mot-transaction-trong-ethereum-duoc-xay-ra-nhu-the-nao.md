**Transaction** là trái tim của mạng Ethereum :heart: 

Trong [Yellow Paper](https://github.com/ethereum/yellowpaper) của Ethereum, **transaction** được định nghĩa như sau:

> Transaction: A piece of data, signed by an External Actor. It represents either a Message or a new Autonomous Object. Transactions are recorded into each block of the blockchain.

hiểu một cách đơn giản, toàn bộ các hoạt động chuyển tiền, nhận tiền, sinh contract, tạo token.... trên mạng ethereum đều là _transaction_. Những transaction này sẽ được ghi lại vào trong các _block_ và tồn tại mãi mãi không ai thay đổi được.

Trong bài viết này mình sẽ giới thiệu với các bạn cách mà một _transaction_ được tạo ra - gửi đi - được confirm và đưa vào block từ đầu tới cuối.

**Recommend**:

- Sẽ tốt hơn nếu bạn có kiến thức về **Ethereum** blockchain
- Sẽ tốt hơn nếu bạn có kiến thức về **Solidity** và **Web3js**

# Một transaction xảy ra như thế nào

Mình lấy ví dụ một smart contract **Voting** đơn giản như sau:

```js
pragma solidity ^0.4.23;

contract Voting {
  mapping (bytes32 => uint8) public votesReceived;

  bytes32[] public candidateList;

  constructor (bytes32[] candidateNames) public {
    candidateList = candidateNames;
  }

  function totalVotesFor(bytes32 candidate) view public returns (uint8) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  function voteForCandidate(bytes32 candidate) public {
    require(validCandidate(candidate));
    votesReceived[candidate] += 1;
  }

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

Contract nội dung khá đơn giản, không cần đọc cũng không sao, vì trong bài này ta chỉ quan tâm vào **transaction** mà thôi.

Sau khi deploy, để tiến hành vote cho một ứng viên, ta sẽ tạo ra một **transaction** bằng cách gọi hàm như sau:

```js
Voting.deployed().then(function(instance) {
  instance
    .voteForCandidate('Nick', { gas: 140000, from: web3.eth.accounts[0] })
    .then(function(r) {
      console.log('Voted successfully!')
    })
})
```

transaction đó sẽ được broad cast đi toàn bộ các node trong mạng lưới Ethereum

![](https://images.viblo.asia/64300ad9-251d-4ed6-814d-a475530cd6ed.png)

ta sẽ tiếp tục đi sâu vào nội dung của transaction này.

## Cấu trúc của một raw transaction object

Sau khi hàm `voteForCandidate` được gọi, đầu tiên nó sẽ được chuyển sang dạng **raw transaction** object bởi thư viện `web3js`.

**raw transaction** sẽ có cấu trúc như sau:

```js
txnCount = web3.eth.getTransactionCount(web3.eth.accounts[0])
var rawTxn = {
  nonce: web3.toHex(txnCount),
  gasPrice: web3.toHex(100000000000),
  gasLimit: web3.toHex(140000),
  to: '0x633296baebc20f33ac2e1c1b105d7cd1f6a0718b',
  value: web3.toHex(0),
  data:
    '0xcc9ab2674e69636b00000000000000000000000000000000000000000000000000000000'
}
```

trong đó:

- `nonce`: đây chính là số transaction mà tài khoản gửi đã từng thực hiện. Mỗi lần gửi một transaction thì giá trị này sẽ tăng lên. Số _nonce_ sinh ra nhằm ngăn các cuộc tấn công _replay attack_ trong ethereum.
- `gasPrice`: Mạng lưới ethereum được vận hành bởi _gas_, cũng giống như xăng để chạy xe vậy. Mỗi transaction đều tốn một lượng _gas_ nhất định, và _gasPrice_ chính là đơn giá của 1 gas, đơn giá này tính bằng chính **ether**, tuy nhiên giá trị của nó khá nhỏ, chỉ từ 0.1 cho tới 100+ _Gwei_ mà thôi.
- `gasLimit`: Đây là số lượng gas tối đa mà người gửi có thể trả cho một transaction. Nếu coi một transaction là một chiếc xe máy, thì _gas_ chính là xăng, _gasPrice_ chính là giá xăng, còn _gasLimit_ chính là dung tích bình xăng.
- `to`: địa chỉ gửi tới của transaction, nó chính là địa chỉ của contract **Voting**.
- `value`: số lượng **ether** mà người gửi muốn chuyển.
- `data`: phần này khá phức tạp, về cơ bản nó sẽ được tạo ra từ 2 phần: **function signature** và **function arguments**
  - **function signature**: ethereum sử dụng 4 bytes đầu tiên trong mã hóa sha3 của function name để làm function signature, trong trường hợp này là `0xcc9ab267`.
```js
  > web3.utils.sha3('voteForCandidate(bytes32)')
  '0xcc9ab267dda32b80892b2ae9e21b782dbf5562ef3e8919fc17cab72aa7db9d59'
```
   - **function arguments**: tham số trong hàm của ta là _Nick_, mã hóa bytes32 của giá trị này là `0x4e69636b00000000000000000000000000000000000000000000000000000000`
```js
> web3.utils.fromAscii('Nick')
0x4e69636b
```

ghép 2 giá trị lại ta sẽ được data `0xcc9ab2674e69636b00000000000000000000000000000000000000000000000000000000` như trên.

## Ký transaction

Bạn có thể để ý bên trên, transaction được gọi từ tài khoản `web3.eth.accounts[0]`.

Trong mạng ethereum, để chứng minh transaction đó thuộc về mình, chúng ta sẽ phải ký giao dịch. Việc này được thực hiện với private key:

```js
const privateKey = Buffer.from(
  'e331b6d69882b4ab4ea581s88e0b6s4039a3de5967d88dfdcffdd2270c0fd109',
  'hex'
)

const txn = new EthereumTx(rawTxn)
txn.sign(privateKey)
const serializedTxn = txn.serialize()
```

## Xác nhận giao dịch tại local

Đầu tiên transaction sẽ được submit đến Ethereum local node trước. Tại đây local node sẽ validate transaction (đã được ký) để đảm rằng transaction được ký bởi đúng tài khoản `web3.eth.accounts[0]` như trên.

## Broadcast transaction đi toàn bộ network

Sau khi đã validate xong tại local node, local node sẽ broadcast transaction ra toàn mạng lưới Ethereum. Đi kèm với việc broadcast thì local node cũng sẽ sinh ra một transaction hash để làm nhiệm vụ tracking trạng thái của transaction.

```js
transactionHash = sha3(serializedTxn)
```

quá trình phát tán transaction sẽ trông giống như thế này:

![](https://images.viblo.asia/fd35ef7a-2cdd-47f7-99c1-028d177ac8a1.png)

Sau khi đã broadcast transaction, ta có thể theo dõi trạng thái của transaction thông qua [etherscan.io](https://etherscan.io/). Trong hình trên các bạn có thể để ý rằng có một số node có tên dạng _Etherscan node_, khi transaction của chúng ta tới được Etherscan node đó, thì khi chúng ta truy cập vào [etherscan.io](https://etherscan.io/) chúng ta sẽ thấy được trạng thái của transaction được cập nhật.

Có một sự thật là không phải tất cả các node trong mạng lưới Ethereum đều giống nhau, một số node thì làm tất cả các nhiệm vụ - tức **full node**; một số node chỉ làm nhiệm vụ **mining** - tức confirm transaction; một số node thì chỉ để cập nhật thông tin mạng lưới; một số node thì chỉ confirm một phần, tức chỉ confirm các transaction có trả phí cao, khi đó nếu transaction của bạn trả phí không đủ cao, thì sẽ bị các node này ignore luôn.

## Miner node chấp nhận giao dịch và đưa vào block

Sau khi được broadcast ra mạng lưới ethereum thì transaction của chúng ta sẽ được đưa vào một nơi gọi là **mining pool**. Các miner sẽ pick các transaction tại đây, confirm nó và đưa vào block.

Giống như trên ta có nói, không phải node nào cũng làm nhiệm vụ như nhau, không phải node nào cũng confirm toàn bộ các giao dịch, vậy nên số lượng và cách sắp xếp transaction trong mining pool của các miner cũng có thể khác nhau, tùy vào config của mining node. Tuy nhiên thông dụng nhất là như dưới đây, các transaction trong pool sẽ được sắp xếp theo giá gas từ cao tới thấp, lý do duy nhất là để tối đa hóa lợi nhuận từ quá trình confirm giao dịch.

![](https://images.viblo.asia/e18e3936-8e6d-4782-bd61-86b2ed30d112.png)

Trong trường hợp trên, transaction `voteForCandidate('Nick')` của chúng ta đang đứng cuối bảng xếp hạng với giá gas chỉ 1 Gwei, có nghĩa là transaction này có thể sẽ rất lâu nữa mới được confirm, hoặc thậm chí sẽ nằm đó mãi mãi nếu như các transaction mới với giá gas cao hơn cứ liên tục được đẩy vào pool.

Một trick để giải quyết việc này, đó là chúng ta sẽ gửi lại một transaction mới, với giá gas cao hơn, tuy nhiên đặc biệt quan trọng là _số nonce phải giữ nguyên như cũ_. Khi số nonce không thay đổi, thì transaction mới sẽ được ghi đè transaction cũ trong pool, còn nếu số nonce thay đổi, nó sẽ trở thành 2 transaction hoàn toàn khác nhau.

> _Có thể bạn đã biết_: **mining** chính là quá trình confirm các giao dịch và đưa vào block.

## Miner tìm ra block mới và broadcast đi toàn bộ network

Bạn có thể thắc mắc rằng tại sao miner không đưa càng nhiều các transaction vào block để confirm nhằm tối đa hóa lợi nhuận ? Câu trả lời chính là mỗi block đều có _gas limit_, bạn không thể vượt quá giá trị này trong một block. Về bản chất quá trình mining chính là giải một bài toán tối ưu lợi nhuận với điều kiện ràng buộc là tổng số gas của các transaction không được vượt quá giá trị **block gas limit**. Các bạn có thể check giá trị này tại [ethstats.net](https://ethstats.net/).

Sau khi đã lựa chọn được một số transaction phù hợp miner sẽ đưa nó vào một _pending block_, sau đó bắt đầu tính toán Proof of Work để đưa ra được một block hợp lệ. Sau đó cũng giống như local node broadcast một transaction hợp lệ, thì block hợp lệ này cũng sẽ được miner node broadcast đi toàn mạng lưới để đưa thêm vào block chain.

## Local node nhận block

Cuối cùng, local node sẽ nhận được block mới tạo ra đó và sẽ đồng bộ toàn bộ trạng thái của blockchain tại local, tất nhiên không chỉ với transaction mà chúng ta vừa gửi đi, mà toàn bộ các transaction chứa trong block mà ta nhận được.

Vậy là cuối cùng Nick cũng đã được vote, khá phức tạp phải ko :joy:

# Sử dụng metamask thay cho local node

Việc sử dụng local node để ký và broadcast giao dịch không thuận tiện lắm, vì thứ nhất đó là command line, thứ 2 đó là chúng ta phải unlock tài khoản, tức trao private key cho local node.

Có một cách khác trực quan và dễ sử dụng hơn, đó chính là [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en). Chúng ta sẽ không phải chạy local node nữa, bạn sẽ quản lý private key của chính mình trên browser. Mỗi khi thực hiện một transaction, thì metamask sẽ tự động convert function call thành raw transaction, và sẽ hỏi chúng ta xem có ký giao dịch đó không, rất thuận tiện.

> _Có thể bạn chưa biết_: Metamask sử dụng node của [Infura.io](https://infura.io/)

# Offline signing

Nếu bạn luôn cảm thấy không an toàn khi giao private cho bất kì ai, dù đó là local node hay Metamask, thì có một giải pháp cho bạn, đó chính là **Offline signing**.

Nếu bạn để ý, thì tại bước kí giao dịch bên trên, ta hoàn toàn không cần kết nối mạng:

```js
const privateKey = Buffer.from(
  'e331b6d69882b4ab4ea581s88e0b6s4039a3de5967d88dfdcffdd2270c0fd109',
  'hex'
)

const txn = new EthereumTx(rawTxn)
txn.sign(privateKey)
const serializedTxn = txn.serialize()
```

Do vậy bạn sẽ tự convert function call của bạn sang raw transaction, sau đó tiến hành ký offline như trên. Cuối cùng bạn sẽ được một transaction đã ký, khi này bạn có thể sử dụng chức năng **push transaction** của [Etherscan.io](https://etherscan.io/pushTx) để broadcast transaction của bạn đi. Mọi thứ còn lại tương tự như trước, không hề thay đổi.

# Kết luận

Hi vọng bài viết có thể giúp các bạn hiểu rõ hơn về vòng đời của transaction trong Ethereum, và rộng hơn là cách hoạt động của mạng lưới Ethereum.

Enjoy coding!

# Tham khảo

- [Life Cycle of an Ethereum Transaction](https://medium.com/blockchannel/life-cycle-of-an-ethereum-transaction-e5c66bae0f6e)
- [Etherscan.io Push transaction](https://etherscan.io/pushTx)
- [Web3js documents](https://web3js.readthedocs.io)