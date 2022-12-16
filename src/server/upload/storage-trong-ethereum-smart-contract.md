Trong các bài toán liên quan đến security của smart contract, ta rất hay gặp những lỗi liên quan đến **storage**, vì thế việc nắm chắc *storage* là điều tối cần thiết cho bất cứ ai muốn làm việc với *smart contract* nói chung và *solidity* nói riêng.

# Storage structure

Mỗi smart contract chạy trên máy ảo Ethereum (EVM) đều được cấp một dung lượng nhớ nhất định gọi là **storage**. Storage này có tổng cộng tất cả
$2^{256}$ slot nhớ, tương đương với khoảng $10^{77}$ slot nhớ.

Nên nhớ rằng theo ước lượng thì tổng số hạt trong vũ trụ quan sát được là khoảng xấp xỉ $10^{80}$, có nghĩa là, số slot nhớ này đủ lưu trữ gần như toàn bộ proton, electron và neutron trong toàn vũ trụ rồi!

WOW, một con số ấn tượng đấy chứ?

![](https://images.viblo.asia/79bbad6d-d04e-457e-bffb-67c0e2a5204f.png)

# Storage lưu trữ state variables như thế nào?

Các slot trong **storage** lưu trữ dưới dạng các cặp key-value với độ dài 256 bit (32 byte). Value mặc định của mỗi slot luôn là 0, nên ta không cần phải gán giá trị 0 cho biến khi mới khai báo.

Cơ bản nhất, chúng ta có thể hiểu các biến trong contract sẽ được lưu trữ strong storage như sau:

- Storage chỉ lưu các biến, không lưu *constant*
- Mỗi slot lưu trữ được tối đa 256 bit (32 byte)
- Các biến lần lượt được vào slot theo thứ tự lower-order (nghĩa là từ phải qua trái).
- Nếu size của biến vượt quá size còn lại của slot, biến này sẽ được đưa qua slot mới.
- Struct tạo một slot mới, các phần tử trong struct được đưa vào slot lần lượt tương tự như trên.
- Fixed size array tạo một slot mới, các phần tử trong struct được đưa vào slot lần lượt tương tự như trên.
- Dynamic size array tạo một slot mới, slot này chỉ lưu **độ dài** của array, còn các value trong array sẽ được lưu trữ tại các vị trí khác, ta sẽ nói cụ thể hơn ở phần sau.
- Mapping luôn tạo một slot mới để giữ chỗ, các value trong array sẽ được lưu trữ tại các vị trí khác, ta sẽ nói cụ thể hơn ở phần sau.
- String tạo ra một slot mới, slot này lưu trữ cả dữ liệu & độ dài dữ liệu, ta sẽ nói cụ thể hơn ở phần sau.

Đi sâu vào thực tế, chúng ta sẽ thấy việc lưu trữ kết hợp các kiểu dữ liệu trở nên phức tạp hơn rất nhiều. Ta sẽ đi qua vài ví dụ để các bạn có thể hiểu rõ hơn.

**Có thể bạn chưa biết:**

- Tất cả các biến trong contract đều được lưu trong storage và đều có thể truy xuất được
- Dù bạn có khai báo biến là `private` hay `internal` đi chăng nữa, nó chỉ có tác dụng trong phạm vi contract mà thôi, lên blockchain tất cả đều public hết. Tất nhiên tuỳ kiểu dữ liệu mà sẽ có mã hoá khác nhau, song về cơ bản không có gì là private cả.

## Lưu trữ các biến fixed size

Các biến fixed size chính là các biến đơn, dùng kiểu dữ liệu cơ bản như là `uint8, uint16, uint24, uint32, uint64, uint128, uint256, bool, address`

Giả sử ta có contract như sau:

```js
contract StorageTest {
  uint256 a;
  uint256[2] b;

  struct Entry {
    uint256 id;
    uint256 value;
  }
  Entry c;
}
```

các biến sẽ được lưu trữ trong storage như sau:

- `a` lưu trữ tại slot 0 và chiếm nguyên slot này do size của `a` là 256 bit (uint256)
- `b` chiếm một slot mới (slot 1) rồi đưa lần lượt 2 phần tử vào. Vì kiểu dữ liệu của b là `uint256` nên mỗi phần tử sẽ chiếm trọn một slot. Có nghĩa là b[0] sẽ chiếm slot 1, và b[1] sẽ chiếm slot 2
- Struct Entry mới khai báo nên chưa sinh slot
- `c` sẽ chiếm một slot mới (slot 3) rồi lần lượt đưa 2 phần tử trong struct vào. Cũng giống như `b` bên trên, mỗi phần từ đều là `uint256` nên mỗi chúng sẽ chiếm trọn một slot. Kết quả là `c.id` chiếm slot 3 và `c.value` chiếm slot 4

![](https://images.viblo.asia/2df1a24c-f896-40c8-b569-e1a7da27eb8c.png)

Ta sẽ xét một ví dụ khác phức tạp hơn.

```js
pragma solidity ^0.4.23;

contract StorageTest {
  uint128 public a = 7;
  bool public b = true;
  uint64 public c = 10;
  address public d = 0xdc241a86c63487eb57ff4bda8a3105702f5fbf69;
  uint256 public e = 123;
  uint8 public f = 4;
  uint256 public g = 567;
}
```

Trong contract này các biến không phải là full-slot size như trước nữa, vậy thì nó được sắp xếp trong storage như thế nào? Ta sẽ phân tích

- `a` có size 128 bit, đưa vào slot 0
- `b` kiểu bool, chỉ cần 1 bit để lưu trữ, nhưng trong solidity thì kiểu dữ liệu nhỏ nhất là 8 bit, nên bool cũng sẽ chiếm 8 bit; ta đưa tiếp vào slot 0
- `c` có size 64 bit, đưa tiếp vào slot 0
- `d` là address. Address có 40 ký tự hexa, vậy là 160 bit, không vừa slot 0 nữa nên sẽ bị đưa sang slot 1
- `e` chiếm full slot 2
- `f` được đưa vào slot 3
- `g` chiếm full slot 4

Ta kiểm tra lại điều này bằng cách nào ? Ta sẽ deploy lên một mạng testnet (ở đây mình sử dụng Ropsten) và sau đó get thử dữ liệu về.

Sử dụng [Remix IDE](https://remix.ethereum.org/) để deploy contract lên Ropsten test net, contract của mình có địa chỉ là `0x746cdf0a9846222bee8fec96957b745b4b36610f`

![](https://images.viblo.asia/9055c852-6d5a-4f5f-ab39-2f269b33d1c4.png)

Trên khung debug của Remix, ta check thử dữ liệu của contract

- Slot 0

```js
> web3.eth.getStorageAt('0x746cdf0a9846222bee8fec96957b745b4b36610f', 0, (err, res) => console.log(res))
0x00000000000000000000000000000a0100000000000000000000000000000007
```

Lần lượt từ phải qua trái: `a = 0x00000000000000000000000000000007`, chiếm 32 ký tự hexa (128 bit); `b = 0x01`, chiếm 2 ký tự hexa (8 bit); `c = 0x000000000000000a = 10` chiếm 16 ký tự hexa (64 bit). Số bit còn lại bên trái không có biến nào chiếm vì `d` đã nhảy qua slot sau rồi.

- Slot 1: address `d = 0xdc241a86c63487eb57ff4bda8a3105702f5fbf69` chiếm 40 ký tự hexa

```js
> web3.eth.getStorageAt('0x746cdf0a9846222bee8fec96957b745b4b36610f', 1, (err, res) => console.log(res))
0x000000000000000000000000dc241a86c63487eb57ff4bda8a3105702f5fbf69
```

- Slot 2: `e = 0x000000000000000000000000000000000000000000000000000000000000007b = 123` chiếm 64 ký tự hexa (256 bit)

```js
> web3.eth.getStorageAt('0x746cdf0a9846222bee8fec96957b745b4b36610f', 2, (err, res) => console.log(res))
0x000000000000000000000000000000000000000000000000000000000000007b
```

- Slot 3: `f = 0x04 = 123` chiếm 2 ký tự hexa (8 bit)

```js
> web3.eth.getStorageAt('0x746cdf0a9846222bee8fec96957b745b4b36610f', 3, (err, res) => console.log(res))
0x0000000000000000000000000000000000000000000000000000000000000004
```

- Slot 4: `g = 0000000000000000000000000000000000000000000000000000000000000237 = 567` chiếm 64 ký tự hexa (256 bit)

```js
> web3.eth.getStorageAt('0x746cdf0a9846222bee8fec96957b745b4b36610f', 4, (err, res) => console.log(res))
0x0000000000000000000000000000000000000000000000000000000000000237
```

## Lưu trữ các biến Dynamic Size

Các biến dynamic size là các biến array động và mapping.

### Dynamic array

Dynamic array sẽ luôn chiếm một slot mới, tại slot này sẽ lưu trữ **length** của array. Ta giả sử slot này là `p`.

Phần tử trong dynamic array sẽ được lưu trữ lần lượt từ `keccak256(p)`, một lưu ý quan trọng là `p` là *chuỗi* 64 ký tự hexa (256 bit), chứ không phải là các giá trị uint.

Ta xét một ví dụ khá giống lúc nãy

```js
contract StorageTest {
  uint256 a;     // slot 0
  uint256[2] b;  // slots 1-2

  struct Entry {
    uint256 id;
    uint256 value;
  }
  Entry c;       // slots 3-4
  uint256[] d;
  Entry[] e;

  constructor () public {
    d.push(1244);
    d.push(14);
    e.push(Entry(9, 99));
  }
}
```

Khi này:

- `d` sẽ chiếm slot 5, ở đây tại constructor ta tạo ra 2 phần tử của `d` nên slot này sẽ có giá trị là 2
- `d[0]` sẽ được lưu trữ tại vị trí `keccak256(hex(5))`
- `d[1]` sẽ được lưu trữ tại vị trí `keccak256(hex(5)) + 1`
- `e` sẽ chiếm slot 6
- `e[0]` sẽ được lưu trữ tại slot `keccak256(hex(6))`
- `e[0].id` sẽ được đưa vào slot của e[0], tức `keccak256(hex(6))`, và chiếm toàn bộ slot này (uint256)
- `e[0].value` sẽ được đưa vào slot `keccak256(hex(6)) + 1`

![](https://images.viblo.asia/7e435685-2da6-4d7b-ac78-546686fdee03.png)

Ta sẽ tiến hành test thử trên RemixIDE, địa chỉ contract deploy của mình là `0xb4d3245971d2b372f632ec26dbeabff89d0652a5`

Trên khung debug của Remix, ta check thông tin của contract như sau, lưu ý `keccak256` chính là `web3.sha3`:

- Kiểm tra length của `d`

```js
> web3.eth.getStorageAt('0xb4d3245971d2b372f632ec26dbeabff89d0652a5', 5, (err, res) => console.log(res))
0x0000000000000000000000000000000000000000000000000000000000000002 // 2
```

- Kiểm tra giá trị của `d[0]`

```js
> lengthSlot = '0000000000000000000000000000000000000000000000000000000000000005'
> d0Slot = web3.sha3(lengthSlot, {encoding: 'hex'})
0x036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0
> web3.eth.getStorageAt('0xb4d3245971d2b372f632ec26dbeabff89d0652a5', d0Slot, (err, res) => console.log(res))
0x00000000000000000000000000000000000000000000000000000000000004dc // 1244
```

- Kiểm tra giá trị của `d[1]`

```js
> d1Slot = '0x036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db1' // d0Slot + 1
> web3.eth.getStorageAt('0xb4d3245971d2b372f632ec26dbeabff89d0652a5', d1Slot, (err, res) => console.log(res))
0x000000000000000000000000000000000000000000000000000000000000000e // 14
```

- Kiểm tra length của `e`

```js
> web3.eth.getStorageAt('0xb4d3245971d2b372f632ec26dbeabff89d0652a5', 6, (err, res) => console.log(res))
0x0000000000000000000000000000000000000000000000000000000000000001 // 1
```

- Kiểm tra giá trị của `e[0].id`

```js
> lengthSlot = '0000000000000000000000000000000000000000000000000000000000000006'
> e0IdSlot = web3.sha3(lengthSlot, {encoding: 'hex'})
0xf652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f
> web3.eth.getStorageAt('0xb4d3245971d2b372f632ec26dbeabff89d0652a5', e0IdSlot, (err, res) => console.log(res))
0x0000000000000000000000000000000000000000000000000000000000000009 // 9
```

- Kiểm tra giá trị của `e[0].value`

```js
> e0ValueSlot = '0xf652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d40' // e0IdSlot + 1
> web3.eth.getStorageAt('0xb4d3245971d2b372f632ec26dbeabff89d0652a5', e0ValueSlot, (err, res) => console.log(res))
0x0000000000000000000000000000000000000000000000000000000000000063 // 99
```

Vậy là các giá trị ta check được hoàn toàn chính xác với những gì chúng ta dự đoán.

**Note**: một lời khuyên cho các bạn, đó là javascript tính toán số lớn khá là tù, do đó ta nên đưa việc tính toán số lớn ra bên ngoài sử dụng thư viện [bignumber.js](https://github.com/MikeMcl/bignumber.js/) hoặc bằng ngôn ngữ khác như `python` chẳng hạn. Ví dụ để tính `keccak256(smt) + 1` mình có thể sử dụng hàm sau thay vì tính tay:

```js
function increaseHexByOne(hex) {
 let x = new BigNumber(hex)
 let sum = x.add(1)
 let result = '0x' + sum.toString(16)
 return result
}
```

### Mappings

Mapping cũng luôn chiếm một slot mới, tuy nhiên slot này không lưu trữ giá trị nào cả! giả sử slot này là `p`

Việc sinh ra slot mới này chỉ đơn thuần để đảm bảo 2 mapping này là *khác nhau* mà thôi.

Mỗi key `k` của mapping sẽ được lưu trữ tại slot `keccak256(k + p)`, một lưu ý quan trọng là `k` và `p` là *chuỗi* 64 ký tự hexa (256 bit), chứ không phải là các giá trị uint.

Ta xét một ví dụ nữa.

```js
contract StorageTest {
  uint256 a;     // slot 0
  uint256[2] b;  // slots 1-2

  struct Entry {
    uint256 id;
    uint256 value;
  }
  Entry c;       // slots 3-4
  uint256[] d; // slot 5
  Entry[] e; // slot 6

  mapping (uint256 => uint256) f;

  constructor () public {
    f[162] = 13;
    f[789] = 543;
  }
}
```

Khi này:

- `f` sẽ chiếm slot số 7
- `f[162]` sẽ chiếm slot `keccak256(hex(162) + hex(7))`
- `f[789]` sẽ chiếm slot `keccak256(hex(789) + hex(7))`

Ta sẽ tiến hành test thử trên RemixIDE, địa chỉ contract deploy của mình là `0xa56a3622ce70fe34d55e13dd3a09ff8a4bccea3d`

Trên khung debug của Remix, ta check thông tin của contract như sau, lưu ý `keccak256` chính là `web3.sha3`:

- Kiểm tra giá trị của `f[162]`

```js
> slot = '0000000000000000000000000000000000000000000000000000000000000007'
> web3.fromDecimal(162)
0xa2
> key162 = '00000000000000000000000000000000000000000000000000000000000000a2'
> valueSlot = web3.sha3(key162 + slot, {encoding: 'hex'})
0x0eb536c710ee19830308e2e6328714114581ce1a53897aedb555c87c58c9fa55
> web3.eth.getStorageAt('0xa56a3622ce70fe34d55e13dd3a09ff8a4bccea3d', valueSlot, (err, res) => console.log(res))
0x000000000000000000000000000000000000000000000000000000000000000d // 13
```

- Kiểm tra giá trị của `f[789]`

```js
> slot = '0000000000000000000000000000000000000000000000000000000000000007'
> web3.fromDecimal(789)
0x315
> key789 = '0000000000000000000000000000000000000000000000000000000000000315'
> valueSlot = web3.sha3(key789 + slot, {encoding: 'hex'})
0x359f5512cf9e787a9e64f9016e731883718235345309b8c37b4661f74deddd4f
> web3.eth.getStorageAt('0xa56a3622ce70fe34d55e13dd3a09ff8a4bccea3d', valueSlot, (err, res) => console.log(res))
0x000000000000000000000000000000000000000000000000000000000000021f // 543
```

Yes, các giá trị vẫn đúng như ta dự đoán (y)

## Bytes và String

Với `bytes`: `bytes` là chuỗi ký tự có độ dài cố định, và vì thế nó cũng được lưu trữ vảo các slot giống như các biến fixed size thông thường. Chỉ có một lưu ý nhỏ là mỗi ký tự trong `bytes` có size là 1 byte, nó sẽ tương ứng với 2 ký tự hexa trong value trong storage.

Với `string`: mỗi `string` sẽ chiếm một slot mới

- Nếu chuỗi ký tự ít hơn 32 byte, các chuỗi ký tự sẽ được lữu trữ kèm với độ dài của nó theo quy tắc: chuỗi sẽ được lưu từ bit trái qua phải (higher-order), còn độ dài thì lưu từ bit phải qua trái (lower-order) với giá trị `length * 2`, tức số lượng ký tự hexa của chuỗi.
- Nếu chuỗi ký tự dài từ 32 byte trở lên, thì main slot sẽ lưu trữ độ dài của chuỗi, tức `length * 2 + 1`. Còn giá trị thì theo thông thường sẽ được lưu trữ tại `keccak256(p)`, với `p` là vị trí của main slot.

Ta xét một ví dụ.

```js
contract StorageTest {
  bytes8 public a = "there is"; // 8 chars
  bytes1 public b = "a"; // 1 char
  bytes32 public c = "big different"; // 13 chars
  string public d = " between"; // 7 chars
  string public e = "knowing something"; // 17 chars
  string public f = "and knowing the name of something"; // 33 chars
}
```

Khi này:

- `a` chiếm 8 byte, tức 16 ký tự hexa, đưa vào slot 0
- `b` chiếm 1 byte, tức 2 ký tự hexa, đưa tiếp vào slot 0
- `c` chiếm 32 byte, chiếm slot 1
- `d` chiếm slot số 2
- `e` chiếm slot số 3
- `f` chiếm slot số 4, tuy nhiên độ dài của string là 33 > 32 ký tự, nên slot này sẽ chứa giá trị `length * 2 + 1 = 67`, và value sẽ được lưu tại slot `keccak256(hex(4))`

Ta sẽ tiến hành test thử trên RemixIDE, địa chỉ contract deploy của mình là `0xde7f331e143c3db5889c783be57db79178865848`

![](https://images.viblo.asia/ee92bfe0-0895-45a1-a2a5-f3fe2d259d7d.png)

Trên khung debug của Remix, ta check thông tin của contract như sau, lưu ý `keccak256` chính là `web3.sha3`:

- Slot 0:

```js
> web3.eth.getStorageAt('0xde7f331e143c3db5889c783be57db79178865848', 0, (err, res) => console.log(res))
0x0000000000000000000000000000000000000000000000617468657265206973
> web3.toAscii('0x617468657265206973')
athere is
```

sở dĩ ở đây ta chỉ lấy `617468657265206973` vì đoạn `a, b` chỉ chiếm tổng cộng 9 byte, tức 18 ký tự hexa

- Slot 1:

```js
> web3.eth.getStorageAt('0xde7f331e143c3db5889c783be57db79178865848', 1, (err, res) => console.log(res))
0x62696720646966666572656e7400000000000000000000000000000000000000
> web3.toAscii('0x62696720646966666572656e7400000000000000000000000000000000000000')
big different
```

- Slot 2:

```js
> web3.eth.getStorageAt('0xde7f331e143c3db5889c783be57db79178865848', 2, (err, res) => console.log(res))
0x206265747765656e000000000000000000000000000000000000000000000010
```

từ bên phải qua, chuỗi này có độ dài `0x10`, tức 16 ký tự, nên ta sẽ lấy 16 ký tự từ bên trái qua để lấy giá trị biến

```js
> web3.toAscii('0x206265747765656e')
between
```

- Slot 3:

```js
> web3.eth.getStorageAt('0xde7f331e143c3db5889c783be57db79178865848', 3, (err, res) => console.log(res))
0x6b6e6f77696e6720736f6d657468696e67000000000000000000000000000022
> web3.toAscii('0x6b6e6f77696e6720736f6d657468696e67')
knowing something
```

- Slot 4:

```js
> web3.eth.getStorageAt('0xde7f331e143c3db5889c783be57db79178865848', 4, (err, res) => console.log(res))
0x0000000000000000000000000000000000000000000000000000000000000043
```

từ bên phải qua, chuỗi này có độ dài `0x43`, tức 67, đúng như lý thuyết của ta. Giờ ta sẽ lấy tiếp giá trị của chuỗi.

Do chuỗi có độ dài 33 byte, lớn hơn giới hạn 32 byte của một slot, nên nó sẽ được chia ra làm 2 slot, slot đầu chứa 32 ký tự đầu, tức "and knowing the name of somethin", slot sau chứa ký tự "g" còn lại.

```js
> slot = '0000000000000000000000000000000000000000000000000000000000000004'
> valueSlot = web3.sha3(slot, {encoding: 'hex'})
0x8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b
> web3.eth.getStorageAt('0xde7f331e143c3db5889c783be57db79178865848', valueSlot, (err, res) => console.log(res))
0x616e64206b6e6f77696e6720746865206e616d65206f6620736f6d657468696e
> web3.toAscii('0x616e64206b6e6f77696e6720746865206e616d65206f6620736f6d657468696e')
and knowing the name of somethin
> valueSlotNext = '0x8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19c'
> web3.eth.getStorageAt('0xde7f331e143c3db5889c783be57db79178865848', valueSlotNext, (err, res) => console.log(res))
0x6700000000000000000000000000000000000000000000000000000000000000
> web3.toAscii('0x6700000000000000000000000000000000000000000000000000000000000000')
g
```

OK, vậy tất cả kết quả đều đúng, chứng tỏ lý thuyết của chúng ta là hoàn toàn chính xác.

# Kết luận

Storage trong Solidity thực sự rất phức tạp, nhất là khi chúng được kết hợp vào với nhau.

Và đó cũng là nguyên nhân của rất nhiều những lỗ hổng trong các smart contract.

Về các lỗ hổng có thể xảy ra, các bạn có thể tham khảo các challenge *Vault* và *Preservation* trong chuỗi CTF [The Ethernaut](https://ethernaut.zeppelin.solutions/), hoặc các challenge [Donation](https://capturetheether.com/challenges/math/donation/) và [Fifty Years](https://capturetheether.com/challenges/math/fifty-years/) trong chuỗi CTF [Capture the Ether](https://capturetheether.com/challenges/) xem sao. Hi vọng các bạn cũng sẽ có những trải nghiệm xoắn não giống mình =))

Enjoy coding!

# Tham khảo

- [Layout of State Variables in Storage](https://solidity.readthedocs.io/en/v0.4.20/miscellaneous.html#layout-of-state-variables-in-storage)
- [Understanding Ethereum Smart Contract Storage](https://programtheblockchain.com/posts/2018/03/09/understanding-ethereum-smart-contract-storage/)
- [How to read ethreum contract storage](https://medium.com/aigang-network/how-to-read-ethereum-contract-storage-44252c8af925)