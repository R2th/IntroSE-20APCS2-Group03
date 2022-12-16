# Mở đầu
Sau một thời gian làm việc với các hợp đồng thông minh (smart contract) của Ethereum và tìm hiểu qua một số tài liệu, mình muốn chia sẻ kiến thức của mình cũng như là một bản note cho chính mình về những tips nho nhỏ có thể giúp cho các lập trình viên hợp đồng thông minh có thể tiết kiệm được một lượng chi phí không hề nhỏ cho **gas** khi làm việc với các hợp đồng thông minh.

![](https://images.viblo.asia/5324a856-cecb-4bae-b0ac-5b02be460132.png)

Kiến thức cần có thì yêu cầu cần biết thì là một chút về **solidity**, một chút về **Remix** (ethereum IDE)

# Nội dung chính

Sau đây sẽ là những tips mà mình đã thực nghiệm và thu thập được

## Tương tác với storage

Hẳn khi làm việc với các smart contract các bạn sẽ thấy việc mỗi lần tương với **storage** sẽ bắt chúng ta phải tạo các **transaction** => tốn một lượng **gas**. Trong đó opcode **SSTORE** là một trong những opcode thường được sử dụng nhiều nhất để tương tác với **storage** và cũng là một trong những **opcode** tốn một lượng gas lớn .  Trong **yellow papers**, thì **SSTORE** sẽ lấy đi một lượng 20.000 gas để tạo mới 1 dữ liệu và 5000 gas để update lại một dữ liệu.
Các bạn có thể cập nhật các giá trị gas của các  opcode tại [đây](https://github.com/djrtwo/evm-opcode-gas-costs/blob/master/opcode-gas-costs_EIP-150_revision-1e18248_2017-04-12.csv)

Do đó nên tránh việc sử dụng **SSTORE** quá nhiều, cố gắng để có thể tổng hợp dữ liệu cuối cùng để ghi vào **storage** càng muộn càng tốt. Đây là một ví dụ :

```js
for (uint256 i = 0; i < 10; ++i) {
  // ...  
  ++count;
}
```

Sẽ được sửa thành 

```js
for (uint256 i = 0; i < 10; ++i) {
  // ...
}
count += 10;
```
## Định nghĩa kiểu dữ liệu sử dụng

Làm việc với **smart contract** các bạn sẽ rất quen thuộc với các kiểu dữ liệu **uint256**, **byte32**. Vậy thì vấn đề ở đây là những **smart contract** sẽ lưu các biến theo những slot trong storage . Mỗi **slot** trong **storage** sẽ là **256** **bits** . Do đó khi một dữ liệu được khai báo là **uint8** thì **248 bits** còn lại vẫn sẽ bị lấp đầy bằng các số 0 => Việc này sẽ gây tốn gas

**Khắc phục:**

Việc khắc phục thì sẽ đi từ những **slot**, việc của chúng ta là tối ưu dữ liệu trong **slot** để tránh nó bị lấp đầy bởi các số 0 vô nghĩa :
```
    uint64 a;
    uint64 b;
    uint128 c;
    uint256 d;
```

Với việc sắp xếp như vậy **compiler** sẽ sắp xếp những dữ liệu gần nhau thành 1 slot (**256 bits**), khi đó chúng ta sẽ chỉ cần phải gị opcode **SSTORE** 2 lần và cũng như sẽ không tạo ra những số 0 vô nghĩa trong **slot**


Một transaction cơ bản sẽ tốn khoảng 21.000 gas. Dữ liệu đầu vào sẽ tốn khoảng 68 gas cho 1 byte và 4 gas cho 1 byte 0x00. Ví dụ :

* Dữ liệu 0x0def123e  sẽ tốn một lượng là 68 x 4 = 272 gas
* Dữ liệu 0x0000001f sẽ tốn một lượng là 68 x 1 + 4 x 3 = 80

Như đã nói, dữ liệu cần phải tối . Ngoài cách ở phần ví dụ, các bạn cũng có thể tham khảo qua việc tối ưu gộp các bit dữ liệu chi tiết tại  [đây](https://medium.com/joyso/solidity-compress-input-in-smart-contract-d9a0eee30fe0), với phương pháp này chúng ta vừa có thể tối ưu lượng gas lẫn tối ưu số lượng đối số đầu vào (Smart contract hạn chế số lượng đối số đầu vào nhất định)

## Lưu trữ dữ liệu vào bytecode của contract

Một trong những cách để lưu trữ và đọc dữ liệu đơn giản để giảm chi phí gas chính là cho nó trức tiếp vào bytecode . Điểm yếu cuả phương pháp này là sẽ tạo ra những dữ liệu dạng constant , tức là sẽ không thể thay đổi sau này tuy nhiên nó lại giảm được một lượng gas đáng kể . Có thể áp dụng ngay cho contract của bạn phương pháp này thông qua 2 cách :

* Khai báo là dạng dữ liệu **constant**
* Hardcode trực tiếp giá trị 

Một ví dụ đơn giản:
```js
uint256 public v1;
uint256 public constant v2;
function calculate() returns (uint256 result) {
    return v1 * v2 * 10000
}
```

Các dữ liệu v2 và 1000 là những dữ liệu đã được đổi sang dạng constant và hardcode trực tiếp. v1 được đọc thông qua opcode SLOAD và sẽ tốn khoảng 200 gas

## Hàm transfer

Có 2 Function withdraw như sau

**withdraw**: 
```js
function withdraw(uint256 amount) {
  msg.sender.transfer(amount);
}
```

**withdrawTo**
```js
function withdrawTo(uint256 amount, address receiver) {
  receiver.transfer(amount);
}
```

Hai hàm này cũng sử dụng **transfer**, tuy nhiên  function **withdrawTo** có thể sẽ bị tính thêm một lượng gas khi tạo transaction do đối số **receiver** được xem là một địa chỉ mà contract chưa biết, khác với địa chỉ từ **msg.sender** - được contract biết thông qua việc gọi functionhttps://medium.com/joyso/solidity-save-gas-in-smart-contract-3d9f20626ea4


Từ bản solidity 0.5 thì hàm băm được sử dụng official là **keccak256** . Tuy nhiên với những phiên bản cũ hơn thì chúng ta có thêm những hàm băm như **sha256**, **ripemd160** . Tuy nhiên lượng gas của các hàm này không giống nhau mà sẽ được xếp theo thứ tự : **ripemd160** > **sha256** > **keccak256** . Cũng có thể do vậy mà từ bản solidity 0.5 thì chúng ta chỉ được khuyến khích sử dụng hàm băm **keccak256**

## Event

Emit một Event tương đối hữu ích trong khá nhiều trường hợp, tuy nhiên nó không phải là đồ free. Một Event sẽ tốn khoảng 750 gas và mỗi đối sô thêm vào Event sẽ tăng thêm 256 gas => Do đó tránh việc viết tràn làn Event không cần thiết cũng sẽ tiết kiệm cho các transaction một lượng gas đáng kể

# Kết Luận

Trên đây là những kinh nghiệm cũng như những kiến thức được mình thu thập qua các tài liệu, mong có thể giúp các bạn trong việc tối ưu hóa lượng gas cho hợp đồng thông minh.

# Tham khảo
* https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a
* https://medium.com/joyso/solidity-save-gas-in-smart-contract-3d9f20626ea4
* https://programtheblockchain.com/posts/2018/03/09/understanding-ethereum-smart-contract-storage/
* https://ethereum.stackexchange.com/questions/5812/what-is-the-difference-between-transaction-cost-and-execution-cost-in-remix
* https://github.com/djrtwo/evm-opcode-gas-costs/blob/master/opcode-gas-costs_EIP-150_revision-1e18248_2017-04-12.csv