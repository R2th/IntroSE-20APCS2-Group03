## Khởi đầu 

Chúng ta có 1 hợp đồng txạo 1 token dạng ERC-20 đơn giản như sau:

```js
pragma solidity ^0.4.24;

contract BasicToken {
  
  uint256 totalSupply_;
  mapping(address => uint256) public balances;
  
  constructor(uint256 _initialSupply) public {
    totalSupply_ = _initialSupply;
    balances[msg.sender] = _initialSupply;
  }

  function totalSupply() public view returns (uint256) {
    return totalSupply_;
  }

  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[msg.sender]);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    return true;
  }

  function balanceOf(address _owner) public view returns (uint256) {
    return balances[_owner];
  }
}
```

**Lưu ý**: Contract này dễ bị tấn công [over flow](https://consensys.github.io/smart-contract-best-practices/known_attacks/#integer-overflow-and-underflow). Nhưng để cho đơn giản, chúng ta chưa cần quan tâm đến vấn đề bảo mật, mà tập trung để tìm hiểu về bytecode.

## Biên dịch hợp đồng

Chúng ta sẽ sử dụng công cụ [Remix](https://remix.ethereum.org/) để biên dịch, đọc bytecode, deploy cũng như debug smart contract.

![](https://images.viblo.asia/ad6abeab-5bb9-4de2-abf0-82d218cc7a2b.png)

Sau khi biên dịch xong, chúng ta có thể lấy và xem bytecode của contract.

### Deploy contract

![](https://images.viblo.asia/1716fa0f-7e47-4d92-bcd3-dc78279d1012.png)

Tiếp theo, tìm đến phần Run trong Remix. Chúng ta sẽ sử dụng Javascript VM. Về cơ bản, đây là một mạng Javascript EVM + được nhúng, sân chơi Ethereum lý tưởng của chúng tôi. Nhập số 10000 và ấn nút **Deploy** . Remix sẽ deploy contract `BasicToken.sol` với số lượng 10000 token và được nắm giữ bởi địa chỉ đã deploy contract.

Ở phần console của Remix sẽ hiện thị các thông tin của giao dịch deploy BasicToken contract vừa thực hiện như from, to, txHash, ..

Nếu bạn đã quen thuộc với Remix thì những thao thác trên hẳn đã quá quen thuộc, phần này chúng ta chỉ nói nhanh qua.

### Mổ xẻ bytecode (Disassembling the bytecode)

Ở console của Remix, chúng ta ấn vào nút **Debug** của giao dịch tạo hợp đồng BasicToken. Ở bên trái, debug mode sẽ hiện lên.

![](https://images.viblo.asia/e1dcbc62-aa5c-4a03-ac1a-0e22fe508d27.png)


Kéo kéo thanh process hoặc ấn mũi tên, debugger sẽ bắt đầu chạy và hiện thị các opcode của  contract theo thứ tự.

![](https://images.viblo.asia/fdeb7b00-1acb-4369-9128-5a26584f45b4.png)


```asm
000 PUSH1 80
002 PUSH1 40
004 MSTORE
005 CALLVALUE
006 DUP1
007 ISZERO
008 PUSH2 0010
011 JUMPI
012 PUSH1 00
014 DUP1
015 REVERT
016 JUMPDEST
017 POP
018 PUSH1 40
020 MLOAD
021 PUSH1 20
023 DUP1
024 PUSH2 0217
027 DUP4
028 CODECOPY
029 DUP2
030 ADD
031 PUSH1 40
033 SWAP1
034 DUP2
035 MSTORE
036 SWAP1
037 MLOAD
038 PUSH1 00
040 DUP2
041 DUP2
042 SSTORE
043 CALLER
044 DUP2
045 MSTORE
046 PUSH1 01
048 PUSH1 20
050 MSTORE
051 SWAP2
052 SWAP1
053 SWAP2
054 SHA3
055 SSTORE
056 PUSH2 01d1
059 DUP1
060 PUSH2 0046
063 PUSH1 00
065 CODECOPY
066 PUSH1 00
068 RETURN
069 STOP
070 PUSH1 80
072 PUSH1 40
074 MSTORE
075 PUSH1 04
077 CALLDATASIZE
078 LT
079 PUSH2 0056
082 JUMPI
083 PUSH4 ffffffff
088 PUSH29 0100000000000000000000000000000000000000000000000000000000
118 PUSH1 00
120 CALLDATALOAD
121 DIV
122 AND
123 PUSH4 18160ddd
128 DUP2
129 EQ
130 PUSH2 005b
133 JUMPI
134 DUP1
135 PUSH4 70a08231
140 EQ
141 PUSH2 0082
144 JUMPI
145 DUP1
146 PUSH4 a9059cbb
151 EQ
152 PUSH2 00b0
155 JUMPI
156 JUMPDEST
157 PUSH1 00
159 DUP1
160 REVERT
161 JUMPDEST
162 CALLVALUE
163 DUP1
164 ISZERO
165 PUSH2 0067
168 JUMPI
169 PUSH1 00
171 DUP1
172 REVERT
173 JUMPDEST
174 POP
175 PUSH2 0070
178 PUSH2 00f5
181 JUMP
182 JUMPDEST
183 PUSH1 40
185 DUP1
186 MLOAD
187 SWAP2
188 DUP3
189 MSTORE
190 MLOAD
191 SWAP1
192 DUP2
193 SWAP1
194 SUB
195 PUSH1 20
197 ADD
198 SWAP1
199 RETURN
200 JUMPDEST
201 CALLVALUE
202 DUP1
203 ISZERO
204 PUSH2 008e
207 JUMPI
208 PUSH1 00
210 DUP1
211 REVERT
212 JUMPDEST
213 POP
214 PUSH2 0070
217 PUSH20 ffffffffffffffffffffffffffffffffffffffff
238 PUSH1 04
240 CALLDATALOAD
241 AND
242 PUSH2 00fb
245 JUMP
246 JUMPDEST
247 CALLVALUE
248 DUP1
249 ISZERO
250 PUSH2 00bc
253 JUMPI
254 PUSH1 00
256 DUP1
257 REVERT
258 JUMPDEST
259 POP
260 PUSH2 00e1
263 PUSH20 ffffffffffffffffffffffffffffffffffffffff
284 PUSH1 04
286 CALLDATALOAD
287 AND
288 PUSH1 24
290 CALLDATALOAD
291 PUSH2 0123
294 JUMP
295 JUMPDEST
296 PUSH1 40
298 DUP1
299 MLOAD
300 SWAP2
301 ISZERO
302 ISZERO
303 DUP3
304 MSTORE
305 MLOAD
306 SWAP1
307 DUP2
308 SWAP1
309 SUB
310 PUSH1 20
312 ADD
313 SWAP1
314 RETURN
315 JUMPDEST
316 PUSH1 00
318 SLOAD
319 SWAP1
320 JUMP
321 JUMPDEST
322 PUSH20 ffffffffffffffffffffffffffffffffffffffff
343 AND
344 PUSH1 00
346 SWAP1
347 DUP2
348 MSTORE
349 PUSH1 01
351 PUSH1 20
353 MSTORE
354 PUSH1 40
356 SWAP1
357 SHA3
358 SLOAD
359 SWAP1
360 JUMP
361 JUMPDEST
362 PUSH1 00
364 PUSH20 ffffffffffffffffffffffffffffffffffffffff
385 DUP4
386 AND
387 ISZERO
388 ISZERO
389 PUSH2 0147
392 JUMPI
393 PUSH1 00
395 DUP1
396 REVERT
397 JUMPDEST
398 CALLER
399 PUSH1 00
401 SWAP1
402 DUP2
403 MSTORE
404 PUSH1 01
406 PUSH1 20
408 MSTORE
409 PUSH1 40
411 SWAP1
412 SHA3
413 SLOAD
414 DUP3
415 GT
416 ISZERO
417 PUSH2 0163
420 JUMPI
421 PUSH1 00
423 DUP1
424 REVERT
425 JUMPDEST
426 POP
427 CALLER
428 PUSH1 00
430 SWAP1
431 DUP2
432 MSTORE
433 PUSH1 01
435 PUSH1 20
437 DUP2
438 SWAP1
439 MSTORE
440 PUSH1 40
442 DUP1
443 DUP4
444 SHA3
445 DUP1
446 SLOAD
447 DUP6
448 SWAP1
449 SUB
450 SWAP1
451 SSTORE
452 PUSH20 ffffffffffffffffffffffffffffffffffffffff
473 DUP6
474 AND
475 DUP4
476 MSTORE
477 SWAP1
478 SWAP2
479 SHA3
480 DUP1
481 SLOAD
482 DUP4
483 ADD
484 SWAP1
485 SSTORE
486 SWAP3
487 SWAP2
488 POP
489 POP
490 JUMP
491 STOP
492 LOG1
493 PUSH6 627a7a723058
500 SHA3
501 INVALID
502 INVALID
503 SWAP10
504 DELEGATECALL
505 GASLIMIT
506 SWAP7
507 TIMESTAMP
508 DUP8
509 INVALID
510 INVALID
511 INVALID
512 SWAP4
513 LOG4
514 SWAP1
515 JUMPI
516 INVALID
517 CALLVALUE
518 INVALID
519 BLOCKHASH
520 INVALID
521 SWAP2
522 INVALID
523 INVALID
524 INVALID
525 INVALID
526 CALLCODE
527 SWAP13
528 DUP9
529 INVALID
530 INVALID
531 RETURN
532 INVALID
533 STOP
534 INVALID
535 STOP
536 STOP
537 STOP
538 STOP
539 STOP
540 STOP
541 STOP
542 STOP
543 STOP
544 STOP
545 STOP
546 STOP
547 STOP
548 STOP
549 STOP
550 STOP
551 STOP
552 STOP
553 STOP
554 STOP
555 STOP
556 STOP
557 STOP
558 STOP
559 STOP
560 STOP
561 STOP
562 STOP
563 STOP
564 STOP
565 INVALID
566 LT
```

Trông vào đoạn mã trên, chúng ta vẫn chưa hiểu gì cả, đừng lo lắng :D, chúng ta sẽ dần dần hiểu rõ chúng từng bước một ở các phần tiếp theo.

### Instructions

Mỗi dòng trong đoạn mã bytecode ở trên là một lệnh để EVM thực thi. Mỗi lệnh chứa một mã opcode. Ví dụ ở lệnh 88, lệnh này đẩy số 4 vào ngăn xếp. 

```
88 PUSH1 0x04
|  |     |     
|  |     Hex value for push.
|  Opcode.
Instruction number.
```

EVM định nghĩa các lệnh opcodes bằng các số, với mỗi số nhất định, nó lại gắn liền với 1 opcode. 

```
0x60 => PUSH
0x01 => ADD
0x02 => MUL
0x00 => STOP
...
```

Chi tiết chúng ta có thể xem ở [đây](https://github.com/ethereum/pyethereum/blob/master/ethereum/opcodes.py#L3)

Ý nghĩa các các lệnh [opcode](https://docs.soliditylang.org/en/v0.4.21/assembly.html)

### Chiến lược (The Strategy)

Chúng ta sẽ áp dụng chiến lược chia để trị để phân tích đoạn bytecode dài dằng dặc ở trên. Chúng ta sẽ chia đoạn bytecode thành 2 phần là **creation** và **runtime**. Nôm na rằng đoạn bytecode **creation** sẽ thực thi 1 lần duy nhất khi khởi tạo contract, còn **runtime** sẽ được thực thị khi có lời gọi đến contract (các hàm v.v).

![](https://images.viblo.asia/ac0e9a8e-f19b-472b-9393-46f8ba8adb46.png)

Ở phần dưới, chúng ta sẽ bắt đầu đi phân tích chi tiết, cụ thể hơn các lệnh.

## Từng bước phân tích các lệnh 

**Lưu ý**: Chuỗi lệnh opcode trong bài viết gốc có thể sẽ có đôi chút khác biệt so với chuỗi lệnh chúng ta chạy trên Remix, đơn giản là sự khác biệt version biên dịch Solidity thôi. 

Bây giờ, chúng ta sẽ chỉ quan tâm đến 5 opcodes sau: `JUMP`, `JUMPI`, `JUMPDEST`, `RETURN` và `STOP` và tạm thời bỏ qua tất cả các opcode khác. Bất cứ khi nào chúng ta thấy một mã opcode không phải là một trong những mã này, chúng ta sẽ bỏ qua nó và chuyển sang lệnh tiếp theo, vờ như chúng ko liên can gì.

Khi thực thi, EVM sẽ thực thi các lệnh tuần tự từ trên xuống dưới (stack) nhưng khi gặp các lệnh jump thì nó sẽ nhảy cóc trên stack :))
- `JUMP`: khi gặp lệnh `JUMP`, EVM sẽ di chuyển việc thực thi đến nơi có lệnh `JUMPDEST`. Nếu ko có lệnh `JUMPDEST` trên stack, việc thực thi sẽ bị lỗi
- `JUMPDEST`: Đánh dấu cho "bước nhảy" của lệnh JUMP
- `JUMPI`: Giống JUMP nhưng kèm theo điều kiện là lệnh ngay dưới lệnh JUMPI ko được là 0, nếu ko sẽ ko có bước nhảy diễn ra
- `STOP`: Tạm dừng hoàn toàn việc thực thi
- `RETURN`: Tạm dừng việc thực thi như STOP, nhưng có trả về dữ liệu

Bây giờ chúng ta sẽ thao tác 1 chút với Remix debugger. Chúng ta có thể sử dụng thanh trượt hay các nút mũi tên để theo dõi thứ tự thực hiện các lệnh của EVM từ đầu đến cuối.

![](https://images.viblo.asia/f6097d42-6858-4e66-aea3-af8eba4878e1.png)

Chạy từng bước thực thi của EVM, đến lệnh `0011 JUMPI`. Nếu không nhảy, các lệnh 0012 -> 0015 sẽ được thực thi theo thứ tự. Lệnh `0015 REVERT` sẽ dừng quá trình thực thi ngay lập tực. Tuy nhiên, khi lệnh `0011 JUMPI` sẽ nhảy đến lệnh `0016 JUMPDEST` rồi từ đó thực thi tiếp các lệnh 0017, 0018, ...

Cứ tiếp tục như thế chúng ta sẽ gặp lệnh `0140 RETURN` và dừng lại quá trình thực thi. Vậy :thinking: các lệnh phía dưới sẽ có ý nghĩa gì khi mà ở lệnh `0140 RETURN`, EVM đã dừng thực thi và trả về data ?

![](https://images.viblo.asia/a59d116d-e9c2-44a8-8740-4a082fb43605.png)

Như đã có đề cập qua ở phần 1, bytecode của contract được chia thành 2 phần là **creation** và **run time**.

Phần mà chúng ta duyệt qua bằng debugger từ `0000 PUSH1 80` đến `0140 RETURN` là phần **creation**. Creation chỉ chạy 1 lần khi contract được deploy, nó có nhiệm vụ thiết lập trạng thái ban đầu của contract như các biến khởi tạo, hàm constructor. Phần mã **creation** sẽ ko nằm trong thành phần contract được deploy lên mạng blockchain.

Phần bytecode còn lại là phần **run time**, là phần của contract được deploy lên mạng blockchain, các bytecode này sẽ được đưa vào thực thi nếu như có lời gọi từ các giao dịch trên mạng.

## Creation

Phần mã creation lại được chia ra thành nhiều phần với các chức năng khác nhau

![](https://images.viblo.asia/4d9f8c1b-6989-4246-9fc2-7a0485fc249f.png)

### Free memory pointer

![](https://images.viblo.asia/c5d0e898-078f-4b2e-bdfa-b44f17c6a4ff.png)

   - `PUSH1`: Đẩy 1 byte dữ liệu stack
   - `MSTORE`:  Lưu giá trị vào bộ nhớ EVM (memory), lấy giá trị của 2 phần từ đầu tiên tính từ đỉnh stack làm đầu vào.

1. Lệnh thứ nhất đặt số 0x80 (128 hệ cơ số 10) vào stack.
2. Lệnh thứ hai đặt số 0x40 (64 hệ cơ số 10) vào đỉnh stack.
3. Lệnh `MSTORE` sẽ lưu số `0x80` vào memory ở vị trí số `0x40`

#### Stack

Trạng thái của stack khi thực thi các lệnh sẽ là

1. `PUSH1 80`

```
[
	"0x0000000000000000000000000000000000000000000000000000000000000080"
]
```

2. `PUSH1 40`

```
[
	"0x0000000000000000000000000000000000000000000000000000000000000040",
	"0x0000000000000000000000000000000000000000000000000000000000000080"
]
```

3. `MSTORE`

stack sẽ rỗng vì câu lệnh mstore đã lấy 2 giá trị của 2 phần tử  trong stack để thực thi.

```
[]
```


### Non-payable check

![](https://images.viblo.asia/27a13b46-a508-44f9-94b1-f49d5efd958d.png)

- `CALLVALUE`: lấy giá trị wei mà địa chỉ khởi tạo gửi vào contract (msg.value)
- `DUP1`: duplicate phần tử đầu tiên trên stack
- `ISZERO`: Đẩy giá trị 1 vào stack nếu giá trị trên cùng của stack là 0
- `PUSH1`: Đẩy 2 bytes dữ liệu vào stack
- `REVERT`: dừng thực thi, hoàn nguyên giao dịch


Đoạn bytecode trên tương đương với đoạn code Solidity dưới đây:

```js
if(msg.value != 0) revert();
```

Đoạn code trên vốn ko có trong contract nhưng được trình biên dịch thêm vào để tránh việc như deploy có gửi nhầm ETH vào và ko rút ra được (constructor ko có `payable` modifier).

Nếu giao dịch tạo contract `BasicToken` này có gửi kèm theo ETH thì khi đến lệnh `011 JUMPI` sẽ không nhảy đến lệnh `016 JUMPDEST` mà sẽ thực thi cho đến lệnh `015 REVERT`.

#### Stack

Trạng thái của stack khi thực thi qua các lệnh sẽ như sau

1. `CALLVALUE`

Do msg.value = 0 nên giá trị của phần tử được đẩy vào stack sẽ là 0

```
[
	"0x0000000000000000000000000000000000000000000000000000000000000000"
]
```

2. `DUP1`

```
[
	"0x0000000000000000000000000000000000000000000000000000000000000000",
	"0x0000000000000000000000000000000000000000000000000000000000000000"
]
```
3. `ISZERO`

Do msg.value đúng bằng 0 nên đẩy 1 vào stack.

```
[
	"0x0000000000000000000000000000000000000000000000000000000000000001",
	"0x0000000000000000000000000000000000000000000000000000000000000000"
]
```

5.  `PUSH2 0010`

```
[
	"0x0000000000000000000000000000000000000000000000000000000000000010",
	"0x0000000000000000000000000000000000000000000000000000000000000001",
	"0x0000000000000000000000000000000000000000000000000000000000000000"
]
```

6. `JUMPI`

`JUMPI` nhảy đến lệnh JUMPDEST. thành ra stack thành rỗng

```
[
	"0x0000000000000000000000000000000000000000000000000000000000000000"
]
```


### Retrieve constructor parameters

```
0016 JUMPDEST
0017 POP
0018 PUSH1 40
0020 MLOAD
0021 PUSH1 20
0023 DUP1
0024 PUSH2 03f8
0027 DUP4
0028 CODECOPY
0029 DUP2
0030 ADD
0031 DUP1
0032 PUSH1 40
0034 MSTORE
0035 DUP2
0036 ADD
0037 SWAP1
0038 DUP1
0039 DUP1
0040 MLOAD
```

`COPYCODE`: Sao chép dữ liệu (có thể tùy chọn số lượng byte) từ vị trí này sang vị trí khác của memory

#### `0017 POP`

Loại bỏ phần tử đầu tiên ra khỏi stack

Stack khi đó sẽ ở trạng thái rỗng

#### `0018 PUSH1 40`

**Stack**  :

```
[
	"0x0000000000000000000000000000000000000000000000000000000000000040"
]
```

#### `0020 MLOAD`

Lệnh `MLOAD` này sẽ lấy giá trị truyền vào là giá trị `0x40` ở trên đỉnh stack vào làm tham số. Lệnh sẽ lấy giá trị từ ô nhớ `0x40` trong memory ra và đẩy vào stack, giá trị đó bằng `0x80`

**Stack** :

```
[
	"0x0000000000000000000000000000000000000000000000000000000000000080"
]
```

#### `0021 PUSH1 20`

**Stack**:

```
[
	"0x0000000000000000000000000000000000000000000000000000000000000020",
	"0x0000000000000000000000000000000000000000000000000000000000000080"
]
```

#### `0023 DUP1`

`DUP1` .... `DUP16`: sao chép phần tử ngăn xếp thứ i và đẩy vào stack.

**Stack**:

```
[
	"0x0000000000000000000000000000000000000000000000000000000000000020",
	"0x0000000000000000000000000000000000000000000000000000000000000020",
	"0x0000000000000000000000000000000000000000000000000000000000000080"
]
```

#### `0024 PUSH1 03f8`

**Stack**:

```
[
	"0x00000000000000000000000000000000000000000000000000000000000003f8",
	"0x0000000000000000000000000000000000000000000000000000000000000020",
	"0x0000000000000000000000000000000000000000000000000000000000000020",
	"0x0000000000000000000000000000000000000000000000000000000000000080"
]
```

#### `0027 DUP4`

**Stack**:

```
[
	"0x0000000000000000000000000000000000000000000000000000000000000080",
	"0x00000000000000000000000000000000000000000000000000000000000003f8",
	"0x0000000000000000000000000000000000000000000000000000000000000020",
	"0x0000000000000000000000000000000000000000000000000000000000000020",
	"0x0000000000000000000000000000000000000000000000000000000000000080"
]
```

#### `0028 CODECOPY`

lệnh này sẽ có 3 tham số, lấy 3 giá trị thuộc 3 phần tử trên đỉnh stack.

`codecopy(t, f, s)`: sao chép s byte từ mã ở vị trí f sang vị trí t ở memory
	

**Stack**:

```
[
	"0x0000000000000000000000000000000000000000000000000000000000000020",
	"0x0000000000000000000000000000000000000000000000000000000000000080"
]
```

Đoạn bytecode trên giúp ta lấy được giá trị đầu vào của hàm **constructor** trong contract và lưu vào memory. giá trị 10000 chính là biến `_initialSupply` chúng ta truyền vào khi deploy contract.


**Bài viết có lẽ đã hơi dài, chúng ta sẽ tiếp tục phần 2 ở bài viết tiếp theo nhé.**

## Tài liệu tham khảo

https://blog.openzeppelin.com/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737/