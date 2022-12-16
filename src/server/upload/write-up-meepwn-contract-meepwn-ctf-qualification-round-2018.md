# Task
https://scoreboard.meepwn.team/task

![](https://images.viblo.asia/fd265c3f-adf9-428b-8bee-30682193eff2.png)

Source code của "gate":

```js
pragma solidity ^0.4.18;

contract Meepwn_Wire
{
    address public entrant;
    
    constructor()
    {
        entrant = msg.sender;
    }
    
    function isAccountAddress(address addr) private returns(bool)
    {
        uint x;
        assembly { x := extcodesize(caller) }
        return x == 0;
    }
    
    function exploitMe(bytes8 _key)
    {
        require(msg.sender != tx.origin);
        require(isAccountAddress(msg.sender));
        require(msg.gas % 1337 == 0);
        require(uint64(_key) ^ uint64(sha3(msg.sender)) ^ uint64(sha3(address(this))) == 0x13371337);
        
        entrant = tx.origin;
    }
}
```

Interface của contract chính:

```js
pragma solidity ^0.4.18;

contract MeePwnMain {

  function getNewInstance() public payable returns(address) {}
  function submitInstance(string email) public returns(bytes32) {}
}
```

sau khi truy cập đến http://178.128.87.12/smart-contract những việc bạn cần làm như sau (hiện site đã không truy cập được nữa, mình xin phép tóm tắt lại theo...kí ức của mình :smile:)

- Sẽ có một contract chính tại địa chỉ [0x3da169ad88c8f419b57e181fe971b33993dfdc81](https://ropsten.etherscan.io/address/0x3da169ad88c8f419b57e181fe971b33993dfdc81) được deploy trên Testnet Ropsten
- Bạn sẽ gọi hàm `getNewInstance` chuyển 0.1 ETH vào địa chỉ này, contract chính sẽ deploy contract **Meepwn_Wire** ở trên và gán `entrant = msg.sender` tức là địa chỉ của contract chính.
- Nhiệm vụ của bạn làm thế nào đó, dùng hàm `exploitMe`, vượt qua tất cả các "gate", set lại biến `entrant` thành địa chỉ của mình (pwned !)
- Sau đó gọi hàm `submitInstance` kèm với email của mình để chứng minh mình đã làm được, để hệ thống gửi flag về email mà bạn submit.

Về cơ bản, mô hình này khá giống với [Ethernaut](https://ethernaut.zeppelin.solutions/) cụ thể hơn thì bạn có thể tham khảo thêm các bài write-up của anh @kiendinang trên Viblo, với nhiều cấp độ từ dễ đến khó.

# Walk Through

Mình xin tóm tắt các bước để vượt qua các gate như sau:

## Gate 1
`require(msg.sender != tx.origin);` : Trong Solidity thì `msg.sender` là thứ/người trực tiếp gọi hàm của contract, còn `tx.origin` là người tạo ra transaction. Do vậy `tx.origin` sẽ luôn là người dùng, còn `msg.sender` thì có thể là người dùng hoặc là một contract khác. Do vậy ta có mô hình sau:

```
A (người dùng) -> B (exploit contract) -> C (Meepwn_Wire contract)
```

Với mô hình này sẽ đảm bảo được `msg.sender != tx.origin`

## Gate 2

`require(isAccountAddress(msg.sender));` : Gate này đúng như tên hàm, kiểm tra xem địa chỉ đang tương tác với contract, có phải là người dùng không hay là một contract khác ? và **Meepwn_Wire** yêu cầu `msg.sender` phải là một account người dùng thông qua việc kiểm tra storage của account có chứa code hay không bằng đoạn assembly (nếu địa chỉ là người dùng thì sẽ codesize == 0, và ngược lại nếu đó là một contract khác)

```js
assembly { x := extcodesize(caller) }
```

Nếu vậy, trick chúng ta dùng ở bước 1 sẽ fail ? Tuy nhiên, có một thời điểm mà codesize của một contract bằng 0, đó chính là thời điểm mà contract được deploy (nói cách khác, khi đang chạy contructor của contract), như được note trong [yellow paper](https://github.com/ethereum/yellowpaper) của Ethereum. Vậy để pass qua gate này, ta cần thực hiện exploit trong contructor của contract. Đến đây ta có thể xây dựng được contract tạm thời dùng để exploit như sau:

```js
contract HackMeepwn_Wire {
    
    address public target = 0x9a6210545c23d287496c518564b3db5f3efb2918;
    
    constructor()
    {
        Meepwn_Wire t = Meepwn_Wire(target);
        t.exploitMe(????);
    }
}
```

với target là địa chỉ của contract `Meepwn_Wire` mà contract chính đã deploy. Để biết được địa chỉ này, bạn có thể tìm đến transaction `getNewInstance` trên https://ropsten.etherscan.io/ và kiểm tra tab `Internal Transactions`.

## Gate 3

`require(msg.gas % 1337 == 0);` : Gate này yêu cầu số gas còn lại (`msg.gas`) tại thời điểm thực hiện kiểm tra phải chia hết cho 1337. Để thực hiện điều này, ta có thể gọi hàm `exploitMe` theo cách sau:

```js
t.exploitMe.gas(xxx)(????)
```

với `xxx` là số gas dùng để chạy hàm `exploitMe`. Như vậy chúng ta sẽ control được số gas truyền vào. Vậy truyền vào bao nhiêu gas để thoả mãn ? Mình sẽ làm theo cách thử saim truyền vào 1 số gas tuỳ ý, và kiểm tra instruction trên Remix.

```js
contract HackMeepwn_Wire {
    
    address public target = 0x9a6210545c23d287496c518564b3db5f3efb2918;
    
    constructor()
    {
        Meepwn_Wire t = Meepwn_Wire(target);
        t.exploitMe.gas(98000)(0x41414141);
    }
}
```

Ví dụ chạy với gas 98000, chắc chắn transaction sẽ fail, bằng sử dụng môi trường Javascript VM trên Remix sẽ cho phép chúng ta debug:
![](https://images.viblo.asia/a22a0df6-77f0-4920-b715-634fa749ffda.png)

Click `Debug`, mở phần `Instructions` và `Stack` và step qua từng instruction cho đến đoạn kiểm tra số gas:

![](https://images.viblo.asia/bd209629-0feb-4b81-934e-bb8d9d5f8705.png)

IP hiện đang ở 363, ngay sau khi chúng ta chạy xong `GAS`, top stack lúc này sẽ chính là số gas còn lại: `0x17abc = 96956` (tại ngăn tiếp theo chính là giá trị `0x539` = 1337). Vậy ta sẽ có gas thoả mãn là:

```
98000 - 96956 % 1337 = 97308
```

**Note**: Để đảm bảo debug đúng thì version compiler và thiết lập optimize của bạn và đề bài phải giống nhau, rất may, đều đang là version `soljson-v0.4.24+commit.e67f0147.js` :smile:, cơ mà nếu có sai thì cũng sai khác nhau không quá 100 gas, chúng ta có thể brute-force được :laughing: 

## Gate 4

`require(uint64(_key) ^ uint64(sha3(msg.sender)) ^ uint64(sha3(address(this))) == 0x13371337);` : gate này là khá đơn giản (tuy nhiên trong thời gian thi BTC đã không may đeploy nhầm source code đoạn này khiến các đội thi tốn cỡ "1 tiếng" tìm cách brute-force 8 bytes sha3 (nếu thực sự có team định làm vậy :sweat_smile:)), đây là phép XOR và chúng ta làm lại như sau:

```js
_key = bytes8(uint64(sha3(this)) ^ uint64(sha3(address(target))) ^ 0x13371337)

```

`this` ở đây sẽ cho ra địa chỉ contract exploit của chúng ta.

## Full Exploit

(Test thử trên Remix trước cho chắc ăn rồi hãy submit nhé)

```js
contract HackMeepwn_Wire {
    
    address public target = 0x9a6210545c23d287496c518564b3db5f3efb2918;
    
    constructor()
    {
        Meepwn_Wire t = Meepwn_Wire(target);
        t.exploitMe.gas(97308)(bytes8(uint64(sha3(this)) ^ uint64(sha3(address(target))) ^ 0x13371337));
    }
}
```

Việc còn lại là thực hiện `submitInstance` và chờ mail flag về:

![](https://images.viblo.asia/24d169be-0e35-4eb1-8c0c-c715b9ed1b46.png)

# References
- https://viblo.asia/s/blockchain-smart-contract-Am5yq0mq5db
- http://solidity.readthedocs.io/en/v0.4.24/