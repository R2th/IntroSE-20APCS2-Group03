![](https://images.viblo.asia/b37b5437-ee0e-4639-8041-d2a45d0c8cac.jpg)


Hẳn những ai đã từng tìm hiểu Ethereum chắc sẽ chẳng xa lạ gì với khái niệm Ethereum Virtual Machine (EVM). Nhưng để thực hiểu sự cơ chế nó hoạt động như thế nào thì không phải chuyện đơn giản, mình trước giờ thấy nó khá phức tạp và lằng nhằng nên cũng chưa bao giờ tìm hiểu sâu. Trong bài viết ngày hôm nay, mình sẽ cùng các bạn đi kỹ hơn về cấu trúc, cách hoạt động của EVM ;)

## 1. EVM là gì ?

**EVM** nói một cách đơn giản là một phần trong mạng Ethereum có nhiệm vụ xử lý việc triển khai và thực thi trên smart contract. Một giao dịch chuyển ETH từ tài khoản **EOA** này qua tài khoản **EOA** khác sẽ không cần **EVM** xử lý. **EVM** có trên tất cả các client (node) của mạng Ethereum, hướng đến mục tiêu như là một máy tính phi tập trung toàn cầu.


**EVM** là một máy trạng thái Turing hoàn chỉnh, bởi vì tất cả các bước thực thi được giới hạn trong một lượng hữu hạn các bước tính toán. Đây là điều khác biệt so với Bitcoin khi trên bitcoin thì Stack Machine chỉ là máy Turing không hoàn chỉnh.

**EVM** được thiết kế theo kiến trúc **stack-based**, tất cả đều được lưu trong stack, word size là 256-bit. Các thành phần lưu trữ thông tin trên **EVM** được chia ra thành 3 phần
- Một mã **ROM** cố định, không thể thay đổi. Được load cùng **byte code** của smart contract khi xử lý contract.
- Một bộ nhớ ngắn hạn. . Khi muốn lưu trên Solidity thì dùng từ khóa **memory**
- Một bộ nhớ dài hạn. Khi muốn lưu trên Solidity thì dùng từ khóa **storage**


## 2. Tập lệnh 

Tập lệnh của **EVM** được chia thành các loại như sau

#### 1. Xử lý toán học
- ADD:  Cộng
- MUL: Nhân
- SUB: Trừ
- DIV: Chia số nguyên
- SDIV: Chia số nguyên dương
- MOD: Modulo
- SMOD: Tính Modulo số nguyên dương
- ADDMOD: Cộng trong hệ cơ số
- MULMOD: Nhân trong hệ cơ số
- EXP: Lũy thừa
- SIGNEXTEND: Tăng không gian biểu diễn bit của số nguyên dương 
- SHA3: Tính giá trị băm keccak256

#### 2. Lệnh tương tác với stack
- POP: Loại bỏ phần tử trên cùng stack
- MLOAD: Load 1 word (16 bit) từ bộ nhớ memory
- MSTORE: Lưu 1 word vào bộ nhớ memory
- MSTORE8: Lưu 1 byte vào bộ nhớ memory
- SLOAD: Load 1 word từ bộ nhớ storage
- SSTORE: Lưu 1 word từ bộ nhớ storage
- MSIZE: Kiểm tra dung lượng bộ nhớ memory còn trống
- PUSHx: Thay đổi giá trị x byte trên stack (x từ 1-32)
- DUPx: Nhân bản ngăn xếp thứ x (x từ 1 đến 16)
- SWAPx: Đổi vị trí giữ stack thứ 1 và stack (x+1) (x từ 1-16)

#### 3. Tương tác với thanh ghi
- STOP: Lệnh dừng
- JUMP: Set giá trị của thanh ghi PC thành bất cứ giá trị nào
- JUMPI: Thay đổi điều kiện giá trị trên thanh ghi PC
- PC: Lấy giá trị của thanh ghi PC
- JUMPDEST: Đánh dấu 

#### 4. Lệnh hệ thống
- LOGx: Thêm log với x tham số, (x từ 0 đến 4)
- CREATE: Tạo account mới
- CALL: Lời gọi dến account khác
- CALLCODE: Lời gọi đến account đang thực thi giao dịch
- RETURN: Tạm dừng thực thi và trả lại dữ liệu đầu ra
- DELEGATECALL: Ủy quyền việc thao tác bộ nhớ của contract cho địa chỉ khác
- STATICCALL: Lời gọi ko làm thay đổi trạng thái
- REVERT: Revert transaction
- INVALID: Chỉ định ko hợp lệ, dừng thực thi
- SELFDESTRUCT: Hủy hợp đồng và chuyển toàn bộ số dư đến tài khoản khác

#### 5. Logic
- LT: Phép so sánh ít hơn (less than)
- GT: Phép so sánh lớn hơn (greater than) 
- SLT: So sánh bé hơn với số dương
- SGT: So sánh lớn hơn với số dương
- EQ: So sánh bằng
- ISZERO: Toán tử NOT
- AND: Toán tử AND
- OR: Toán tử OR
- XOR: Toán tử XOR
- NOT: Toán tử NOT
- BYTE: Lấy 1 byte từ 256 byte

#### 6. Môi trường

- GAS: Truy vấn lượng Gas còn lại trong quá trình thực thi giao dịch
- ADDRESS: Lấy giá trị địa chỉ đang thực thi giao dịch
- BALANCE: Lấy số dư tài khoản
- ORIGIN: Trả về giá trị địa chỉ người dùng khởi phát giao dịch
- CALLER: Trả về địa chỉ gọi giao dịch này (bao gồm cả địa chỉ contract)
- CALLVALUE: Trả về lượng eth được dùng trong giao dịch
- CALLDATALOAD: Trả về input data của giao dịch
- CALLDATASIZE: Trả về size của input data
- CALLDATACOPY: Copy the input data vào memory
- CODESIZE: Trả về kích thước mã nguồn (size of code) trong môi trường hiện tại (EOA sẽ có size of code bằng 0)
- CODECOPY: Copy code vào memory
- GASPRICE: Trả về giá Gas
- EXTCODESIZE: Trả về size of code của bất cứ account nào
- EXTCODECOPY: Copy code vào memory
- RETURNDATASIZE: Trả về output data 
- RETURNDATACOPY: Copy output data vào memory

#### 6.Lệnh tương tác với block
- BLOCKHASH: Lấy giá trị băm của 1 trong 256 block gần nhất
- COINBASE //Get the block's beneficiary address for the block reward
- TIMESTAMP: Lấy giá trị timestamp của block
- NUMBER: Lấy giá trị block number
- DIFFICULTY: Lấy giá trị độ khó
- GASLIMIT: Lấy giá trị gas limit

### 3. Biên dịch Sodility sang EVM ByteCode

Phần này chúng ta cùng demo và đi chi tiết hơn về cách code Solidity được biên dịch sang ByteCode. Trước mắt chúng ta cần cài trình biên dịch **Solidity**

```bash
npm install -g solc
```

Chúng ta có 1 file code đơn giản như sau

```js
// Example.sol
pragma solidity ^0.6.12;

contract Example {
 address contractOwner;
 
 constructor() public {
     contractOwner = msg.sender;
 }
}
```

Biên dịch code nào

```bash
solc -o bytescode --asm ./Example.sol
solc -o bytescode --opcodes ./Example.sol
solc -o bytescode --bin ./Example.sol
```

`--asm`cho output là `EVM assembly`, `--opcodes` là ra dạng các **OPCODES** và `--bin` sẽ cho ra binary của contract ở dạng hex. Để xem thêm các tùy chọn và giải nghĩa của từng tham số, chúng ta tra cứu bằng lệnh `solc --help`. Kết quả sẽ cho 3 file dưới đây

#### Example.opcode

```
PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH1 0xF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLER PUSH1 0x0 DUP1 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP PUSH1 0x3F DUP1 PUSH1 0x5D PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 STATICCALL 0xDE PUSH22 0xB41B5EE14B779448E07EE6894AC84FACD068A74CDD3A 0x2B 0xB1 0xF8 CALLER GASPRICE 0xAD 0x49 PUSH5 0x736F6C6343 STOP MOD 0xC STOP CALLER 
```

#### Example.evm

```
    /* "./Example.sol":26:132  contract Example {... */
  mstore(0x40, 0x80)
    /* "./Example.sol":72:130  constructor() public {... */
  callvalue
  dup1
  iszero
  tag_1
  jumpi
  0x00
  dup1
  revert
tag_1:
  pop
    /* "./Example.sol":116:126  msg.sender */
  caller
    /* "./Example.sol":100:113  contractOwner */
  0x00
  dup1
    /* "./Example.sol":100:126  contractOwner = msg.sender */
  0x0100
  exp
  dup2
  sload
  dup2
  0xffffffffffffffffffffffffffffffffffffffff
  mul
  not
  and
  swap1
  dup4
  0xffffffffffffffffffffffffffffffffffffffff
  and
  mul
  or
  swap1
  sstore
  pop
    /* "./Example.sol":26:132  contract Example {... */
  dataSize(sub_0)
  dup1
  dataOffset(sub_0)
  0x00
  codecopy
  0x00
  return
stop

sub_0: assembly {
        /* "./Example.sol":26:132  contract Example {... */
      mstore(0x40, 0x80)
      0x00
      dup1
      revert

    auxdata: 0xa26469706673582212209625abe2c853fe00901ebd3c2636931b5bf7b41ae052accf10eaa6d7d027d7fc64736f6c634300060c0033
}
```

#### Example.bin

```
6080604052348015600f57600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550603f80605d6000396000f3fe6080604052600080fdfea26469706673582212209625abe2c853fe00901ebd3c2636931b5bf7b41ae052accf10eaa6d7d027d7fc64736f6c634300060c0033
```

Nhìn các file trên thực sự mình không hiểu mô tê gì hết :joy: Nhưng với các câu lệnh stack của **EVM** đã biết ở phần trên, chúng ta cùng thử giải mã 1 đoạn trong file `Example.opcode`

```
PUSH1 0x60 PUSH1 0x40 MSTORE CALLVALUE
```

- 2 câu lệnh **PUSH1** nhằm thêm 1 byte vào đỉnh stack lần lượt theo thứ tự là `0x60` và `0x40`
- Lệnh **MSTORE** sẽ làm trống stack, gía trị `0x60` sẽ được lưu ở vùng nhớ `0x40`. Lệnh **MSTORE** cần 2 đối số, và nó sẽ lấy 2 giá trị trên đỉnh stack (Đối số đầu tiên là địa chỉ vùng nhớ và đối số thứ 2 là giá trị)
- **CALLVALUE** push vào đỉnh stack lượng wei mà địa chỉ triển khai hợp đồng, ở TH số lượng wei bằng 0




## Tài liệu tham khảo

https://ethereum.stackexchange.com/questions/46084/which-nodes-have-evms-and-how-do-they-compare-the-results

https://github.com/ethereumbook/ethereumbook