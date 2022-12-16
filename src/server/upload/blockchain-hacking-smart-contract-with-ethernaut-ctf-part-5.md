Trong bài này chúng ta sẽ đi giải quyết các thử thách từ bài 15 tới bài 18.

**The Ethernaut**: https://ethernaut.zeppelin.solutions/

Một vài recommend:
- Sẽ tốt hơn nếu bạn có kiến thức về Blockchain và Smart Contract.
- Sẽ tốt hơn nếu bạn có kiến thức về Solidity và Web3js.
- Sẽ là tốt hơn nếu bạn biết cách sử dụng Remix IDE hoặc Truffle.


# 15. Naughty Coin 　★★★★★★

**Nhiệm vụ**: bạn có rất nhiều tiền, nhưng phải đợi tới tận 10 năm sau mới được tiêu số tiền đó. Bằng cách nào đó hãy tiêu hết số tiền đó mà ko cần phải chờ tới 10 năm nữa.

```js
pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

 contract NaughtCoin is StandardToken {

  string public constant name = 'NaughtCoin';
  string public constant symbol = '0x0';
  uint public constant decimals = 18;
  uint public timeLock = now + 10 years;
  uint public INITIAL_SUPPLY = 1000000 * (10 ** decimals);
  address public player;

  function NaughtCoin(address _player) public {
    player = _player;
    totalSupply_ = INITIAL_SUPPLY;
    balances[player] = INITIAL_SUPPLY;
    Transfer(0x0, player, INITIAL_SUPPLY);
  }

  function transfer(address _to, uint256 _value) lockTokens public returns(bool) {
    super.transfer(_to, _value);
  }

  // Prevent the initial owner from transferring tokens until the timelock has passed
  modifier lockTokens() {
    if (msg.sender == player) {
      require(now > timeLock);
      if (now < timeLock) {
        _;
      }
    } else {
     _;
    }
  }
}
```

## Phân tích & Solution

Contract này được thiết kế theo chuẩn ERC20, nên ta hãy xem qua một lượt interface của chuẩn này:

```js
// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// ----------------------------------------------------------------------------
contract ERC20Interface {
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}
```

Ta dễ dàng nhận thấy, ngoài `transfer` ra thì trong ERC20 còn có `transferFrom` nữa. Để chuyển token trong ERC20, chúng ta có 2 cách

- Cách1: thực hiện hàm `transfer`:

```js
function transfer(address to, uint tokens) public returns (bool success);
```

- Cách 2: `approve` cho ai đó quyền tiêu tiền của mình, sau đó người đó tiêu số tiền đó bằng `transferFrom`

```js
function approve(address spender, uint tokens) public returns (bool success);
function transferFrom(address from, address to, uint tokens) public returns (bool success);
```

Do đó ta sẽ khai thác như sau: Đầu tiên paste code lên Remix và load contract của ta ra, nhớ là sử dụng account *player* hiện tại nhé.

Bước 1: Trên chrome console kiểm tra balance hiện tại

```js
await contract.blanceof(player).then(x => x.toNumber())
1000000000000000000000000
```

Bước 2: Trên Remix, tiến hành `approve` cho một tài khoản khác với số lượng token là 1000000000000000000000000, ở đây mình sử dụng một tài khoản khác của mình là `0xc3A5e98871B9Bbb045A700c28b53C017D15Bd288`, các bạn hãy thay bằng tài khoản khác của các bạn.

![](https://images.viblo.asia/0aedaaeb-d45f-4ed3-885d-9cf0378cccac.png)

Bước 3: Switch qua account `0xc3A5e98871B9Bbb045A700c28b53C017D15Bd288` và tiến hành rút toàn bộ tiền tiền bằng `transferFrom`

![](https://images.viblo.asia/6105ca9a-b457-4958-a1ee-715ae41bb297.png)

Bước 4: Switch lại tài khoản player, trên chrome console check lại balance

```js
await contract.blanceof(player).then(x => x.toNumber())
0
```

Vậy là balance đã về 0. Submit && all done!

![](https://images.viblo.asia/6050a15b-0b48-4dd5-83e7-4cb4608a6ba2.png)

## Bình luận

Đây là một bài toán khá đơn giản, điều cốt lõi ở đây chỉ là nắm và hiểu kiến trúc của ERC20 mà thôi.

# 16. Preservation 　★★★★★★

**Nhiệm vụ**: chiếm quyền owner

```js
pragma solidity ^0.4.23;

contract Preservation {

  // public library contracts
  address public timeZone1Library;
  address public timeZone2Library;
  address public owner;
  uint storedTime;
  // Sets the function signature for delegatecall
  bytes4 constant setTimeSignature = bytes4(keccak256("setTime(uint256)"));

  constructor(address _timeZone1LibraryAddress, address _timeZone2LibraryAddress) public {
    timeZone1Library = _timeZone1LibraryAddress;
    timeZone2Library = _timeZone2LibraryAddress;
    owner = msg.sender;
  }

  // set the time for timezone 1
  function setFirstTime(uint _timeStamp) public {
    timeZone1Library.delegatecall(setTimeSignature, _timeStamp);
  }

  // set the time for timezone 2
  function setSecondTime(uint _timeStamp) public {
    timeZone2Library.delegatecall(setTimeSignature, _timeStamp);
  }
}

// Simple library contract to set the time
contract LibraryContract {

  // stores a timestamp
  uint storedTime;

  function setTime(uint _time) public {
    storedTime = _time;
  }
}
```

## Solution

Có 2 điều ta cần nắm được về `delegatecall`:

**Điều thứ nhất**: `delegatecall` chỉ là mượn hàm từ một contract khác và gọi hàm đó trong contract của mình.

Để diễn giải điều này, ta xét một ví dụ có thể coi là kinh điển về `delegatecall`, search google phát thấy ngay

```js
contract D {
  uint public n;
  address public sender;

  function delegatecallSetN(address _e, uint _n) {
    _e.delegatecall(bytes4(sha3("setN(uint256)")), _n); // D's storage is set, E is not modified
  }
}

contract E {
  uint public n;
  address public sender;
  function setN(uint _n) {
    n = _n;
    sender = msg.sender;
  }
}
```

Trong contract E ta có một hàm là hàm `setN` sẽ thay đổi giá trị của `n` và `sender`. Trong contract D ta gọi hàm `_e.delegatecall(bytes4(sha3("setN(uint256)")), _n);`, điều này tương đương với việc ta chuyển hàm setN vào bên trong contract D như sau:

```js
contract D {
  uint public n;
  address public sender;

  function delegatecallSetN(uint _n) {
    setN(_n);
  }

  function setN(uint _n) {
    n = _n;
    sender = msg.sender;
  }
}
```

**Điều thứ hai**: khi gọi `delegatecall`, các biến của hàm trong contract E sẽ là *biến với slot tương ứng* của contract D, không cần quan tâm đến tên biến và kiểu dữ liệu.

Ví dụ như bên trên, giả sử ta đổi tên biến và kiểu dữ liệu trong contract D như sau:

```js
contract D {
  address public addr;
  bytes20 public mess;

  function delegatecallSetN(address _e, uint _n) {
    _e.delegatecall(bytes4(sha3("setN(uint256)")), _n); // D's storage is set, E is not modified
  }
}

contract E {
  uint public n;
  address public sender;
  function setN(uint _n) {
    n = _n;
    sender = msg.sender;
  }
}
```

khi này trong D, nếu ta gọi `_e.delegatecall(bytes4(sha3("setN(uint256)")), _n);` thì `addr` sẽ được gán cho giá trị của `_n`, tất nhiên có ép kiểu từ `uint` sang `address`, còn `mess` sẽ được gán cho giá trị của `msg.sender`, ép kiểu từ `address` qua `bytes20`.

Các bạn hãy tự test thử trên RemixIDE để hiểu rõ hơn.

Ok vậy là ta đã hiểu về `delegatecall`, trong bài này ta sẽ áp dụng thế nào ?

Cùng nhìn qua contract `LibraryContract`

```js
contract LibraryContract {

  // stores a timestamp
  uint storedTime;

  function setTime(uint _time) public {
    storedTime = _time;
  }
}
```

Contract này có một slot duy nhất chứa `storedTime`, do đó nó sẽ tương ứng với slot của `timeZone1Library` trong contract `Preservation` nếu ta gọi `setTime` bằng `delegatecall`. Điều này có ý nghĩa thế nào?

```js
function setFirstTime(uint _timeStamp) public {
  timeZone1Library.delegatecall(setTimeSignature, _timeStamp);
}
```

nó có nghĩa là nếu ta gọi `setFirstTime` thì `timeZone1Library` sẽ được gán bởi `_timeStamp` một lần duy nhất, vì sau đó địa chỉ `timeZone1Library` sẽ trở thành địa chỉ `_timeStamp` rồi.

```js
function setSecondTime(uint _timeStamp) public {
  timeZone2Library.delegatecall(setTimeSignature, _timeStamp);
}
```

nó có nghĩa là nếu ta gọi `setSecondTime` thì `timeZone1Library` sẽ được gán lại bởi giá trị `_timeStamp` bất cứ khi nào gọi hàm

Từ ý nghĩa này, ta có kịch bản tấn công như sau:

- Thay `timeZone1Library` bằng địa chỉ contract tấn công.
- Do trong contract `Preservation`, biến `owner` ứng với slot thứ 3, nên trong contract tấn công ta sẽ có 3 biến, theo đó nếu gọi bằng `delegatecall`, slot thứ 3 sẽ tương tứng với `owner` trong `Preservation`.
- Trong contract tấn công cũng phải có hàm `setTime` y như `timeZone1Library` và `timeZone2Library`, trong hàm này ta sẽ tiến hành đổi owner sang chính mình (tx.origin)
- Contract tấn công sẽ như sau

```js
contract Attack {
  address public slot1;
  address public slot2;
  address public owner;

  function setTime(uint _time) public {
    owner = tx.origin;
  }
}
```

**Note**: Trong các giao dịch, nhớ cho `gasLimit` cao một chút để tránh bị hết gas

- Trên Remix IDE, load contract `Preservation`

![](https://images.viblo.asia/0f64b4aa-142d-4863-8125-70209da52eb4.png)

- Trên Remix IDE, deploy contract `Attack`

![](https://images.viblo.asia/a7b23bec-8763-4f65-bd7d-1730f1d93cdc.png)

- Tại `Preservation`, gọi hàm `setFirstTime` với giá trị là địa chỉ của contract `Attack`, đã được convert ra uint256

![](https://images.viblo.asia/33d32924-5f0c-433c-a224-e3ea7efd73a9.png)

- Tại `Preservation`, gọi hàm `setFirstTime` lần thứ 2 với giá trị bất kì

![](https://images.viblo.asia/33b660ad-c6b5-48d9-a691-c58ab794e3fe.png)

- Kiếm tra lại xem owner đã là mình chưa ?

![](https://images.viblo.asia/40e7e024-fc20-4480-b28e-34ac4244d3fe.png)

- Submit & all done!

![](https://images.viblo.asia/6050a15b-0b48-4dd5-83e7-4cb4608a6ba2.png)

## Bình luận

`delegatecall` và `storage` chưa bao giờ là dễ cả!

# 17. Locked 　★★★★★★

**Nhiệm vụ**: unlock contract

```js
pragma solidity ^0.4.23;

// A Locked Name Registrar
contract Locked {

    bool public unlocked = false;  // registrar locked, no name updates

    struct NameRecord { // map hashes to addresses
        bytes32 name; //
        address mappedAddress;
    }

    mapping(address => NameRecord) public registeredNameRecord; // records who registered names
    mapping(bytes32 => address) public resolve; // resolves hashes to addresses

    function register(bytes32 _name, address _mappedAddress) public {
        // set up the new NameRecord
        NameRecord newRecord;
        newRecord.name = _name;
        newRecord.mappedAddress = _mappedAddress;

        resolve[_name] = _mappedAddress;
        registeredNameRecord[msg.sender] = newRecord;

        require(unlocked); // only allow registrations if contract is unlocked
    }
}
```

## Phân tích

Trong hàm `register` có một lỗi cơ bản, đó chính là không có keyword `memory` trước biến `newRecord`, do đó biến `newRecord` sẽ chính là biến trong `storage` của contract.

Hay nói cách khác, `newRecord` đang trỏ đến slot của `unlocked`. Một chỉ dẫn rất rõ ràng phải không ?

Bạn có thể đọc thêm về storage trong smart contract tại [bài viết này](http://dotrungkien.github.io/2018/05/01/smart-contract-storage/) của mình.

## Solution

Ta chỉ cần chạy hàm `register`, vì kiểu của `_name` là bytes32, nên ta sẽ chạy với tham số là `_name=0x0000000000000000000000000000000000000000000000000000000000000001` để khi convert sang bool sẽ là `true`, phần `_mappedAddress` thì để địa chỉ bất kì là được

![](https://images.viblo.asia/26f7df42-2a12-4a84-ad03-26ff1fd0fe73.png)

Trên chrome console, kiểm tra lại xem đã được unlock chưa

```js
> await contract.unlocked()
true
```

Submit && all done!

![](https://images.viblo.asia/6050a15b-0b48-4dd5-83e7-4cb4608a6ba2.png)

## Bình luận

Hãy luôn nhớ tới keyword `memory` khi khai báo một struct mới trong hàm.

Bên cạnh đó, việc nắm chắc *storage* là điều tối cần thiết cho bất cứ ai muốn làm việc với *smart contract* nói chung và *solidity* nói riêng.

# 18 Recovery 　★★★★★★

**Nhiệm vụ**: tác giả đã tạo ra contract `Recovery` đóng vai trò như một token factory để có thể dễ dàng tạo ra những đồng tiền ảo mới. Thật không may khi tạo ra đồng tiền ảo đầu tiên và gửi vào đó 0.5 ether để mua token, ông đã quên mất địa chỉ của token contract này. Nhiệm vụ của chúng ta là phải tìm ra địa chỉ của token contract đó và lấy lại 0.5 ether.

```js
pragma solidity ^0.4.23;

contract Recovery {

  //generate tokens
  function generateToken(string _name, uint256 _initialSupply) public {
    new SimpleToken(_name, msg.sender, _initialSupply);

  }
}

contract SimpleToken {

  // public variables
  string public name;
  mapping (address => uint) public balances;

  // constructor
  constructor(string _name, address _creator, uint256 _initialSupply) public {
    name = _name;
    balances[_creator] = _initialSupply;
  }

  // collect ether in return for tokens
  function() public payable {
    balances[msg.sender] = msg.value*10;
  }

  // allow transfers of tokens
  function transfer(address _to, uint _amount) public {
    require(balances[msg.sender] >= _amount);
    balances[msg.sender] -= _amount;
    balances[_to] = _amount;
  }

  // clean up after ourselves
  function destroy(address _to) public {
    selfdestruct(_to);
  }
}
```

## Phân tích & Solution

Để tìm xem tác giả đã gửi tiền vào địa chỉ nào, rất đơn giản, ta paste địa chỉ contract lên trên [https://ropsten.etherscan.io](https://ropsten.etherscan.io), trong trường hợp của mình là [https://ropsten.etherscan.io/address/0x9998be07d49f52d93d98ebf78c7526d712246bf3#internaltx](https://ropsten.etherscan.io/address/0x9998be07d49f52d93d98ebf78c7526d712246bf3#internaltx).

Sau đó tìm tới phần `internal Txns`, ta thấy ngay transaction tạo ra token contract.

![](https://images.viblo.asia/15d82926-54a4-43c2-95fa-c4b192cf8a02.png)

Nhấn vào `Contract Creation`, ta thấy ngay được địa chỉ của token contract với 0.5 ether trong đó, trong trường hợp của mình là `0x417e544648E583Dc15004e86Ef94E1D79a068BFc`.

![](https://images.viblo.asia/7d3a6532-8cc9-4685-9b45-b88cf219f605.png)

Tiếp theo, tiến hành load `SimpleToken` với địa chỉ `0x417e544648E583Dc15004e86Ef94E1D79a068BFc` trên Remix IDE.

![](https://images.viblo.asia/a1278251-eb82-46a0-99d9-031599895dce.png)

Trong contract `Simple Token` có hàm `destroy`:

```js
function destroy(address _to) public {
  selfdestruct(_to);
}
```

Trong solidity, khi ta gọi `selfdestruct(_to)` trong một contract, thì contract đó sẽ bị huỷ và chuyển toàn bộ tiền về cho địa chỉ `_to`.

Do đó ta sẽ tiến hành destroy contract `0x417e544648E583Dc15004e86Ef94E1D79a068BFc`, địa chỉ nhận là địa account của mình, để lấy lại 0.5 ether.

![](https://images.viblo.asia/37828860-5f4d-4f9e-8e63-6d366a91e84a.png)

Quay trở lại địa chỉ của token contract trên etherscan.io, ta thấy balance của contract đã trở về 0, nghĩa là ta đã thành công.

![](https://images.viblo.asia/dc1659ce-1999-40fe-9d23-8f601246414c.png)

Submit && all done!

![](https://images.viblo.asia/6050a15b-0b48-4dd5-83e7-4cb4608a6ba2.png)

## Bình luận

Enjoy coding!