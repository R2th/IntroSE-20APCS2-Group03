Đây là bài viết đầu tiên trong series Solidity Jouney Path của mình, bài viết này mình sẽ giới thiệu những vấn đề cơ bản nhất về Solidity.
# Basic Syntax
Một file solidity có thể chứa những code định nghĩa về hợp đồng (contract), import và pragma, ví dụ một đoạn code solidity đơn giản:
```
pragma solidity >=0.4.0 <0.8.0;
contract SimpleContract {
   string name;
   function set(string newName) public {
      name = newName;
   }
   function get() public view returns (string) {
      return name;
   }
}
```
Đoạn code định nghĩa phiên bản solidity với từ khoá pragma (lớn hơn 0.4.0 và nhỏ hơn 0.8.0). Khai báo một contract có tên là SimpleContract.
## Pragma
Pargma cho chúng ta biết source code viết cho phiên bản mới hơn hoặc bằng 0.4.0 và cũ hơn 0.8.0. Mỗi file đều cần khai báo pragma và khai báo này là cục bộ theo từng file.
## Contract
Contract là một khái niệm cơ bản trong solidity, nó chứa dữ liệu (state) và các hàm logic đi kèm (function), và sẽ được lưu trữ trên một địa chỉ Ethereumblockchain.

# Types
Giống như những ngôn ngữ lập trình khác, solidity cũng có một số kiểu dữ liệu đi kèm
## Các loại types trong solidity
Type|	Keyword|	Values
| -------- | -------- | -------- |
Boolean|	bool|	true/false
Integer|	int/uint|	Signed and unsigned integers of varying sizes.
Integer|	int8 to int256|	Signed int from 8 bits to 256 bits. int256 is the same as int.
Integer|	uint8 to uint256|	Unsigned int from 8 bits to 256 bits. uint256 is the same as uint.
Fixed Point Numbers|	fixed/unfixed|	Signed and unsigned fixed point numbers of varying sizes.
Fixed Point Numbers|	fixed/unfixed|	Signed and unsigned fixed point numbers of varying sizes.
Fixed Point Numbers|	fixedMxN|	Signed fixed point number where M represents number of bits taken by type and N represents the decimal points. M should be divisible by 8 and goes from 8 to 256. N can be from 0 to 80. fixed is same as fixed128x18.
Fixed Point Numbers|	ufixedMxN|	Unsigned fixed point number where M represents number of bits taken by type and N represents the decimal points. M should be divisible by 8 and goes from 8 to 256. N can be from 0 to 80. ufixed is same as ufixed128x18.

## address
Address là một khái niệm đặc thù, đại diện cho địa chi trên network của Etherium
```
address x = 0x212;
address myAddress = this;
if (x.balance < 10 && myAddress.balance >= 10) x.transfer(10);
```

# Variables
Solidity hỗ trợ 3 kiểu biến:
1. State Variable: Biến trạng thái, giá trị các biến này sẽ được lưu vĩnh viễn trên bộ nhớ của contract
2. Local Variable: Biến cục bộ, giá trị của biến sẽ được lưu cho tới khi hàm thực thi được kết thúc
3. Global Variable: Biến toàn cục, giá trị của biến được lưu trên toàn cục, được sử dụng để lấy thông tin của blockchain

## State Variable
```
pragma solidity ^0.5.0;
contract SolidityTest {
   uint storedData;      // State variable
   constructor() public {
      storedData = 10;   // Using State variable
   }
}
```
Biến trạng thái thường được sử dụng để khởi tạo giá trị cho một hợp đồng và được lưu trữ vĩnh viễn trong hợp đồng này

# Local Variable
```
pragma solidity ^0.5.0;
contract SolidityTest {
   uint storedData; // State variable
   constructor() public {
      storedData = 10;   
   }
   function getResult() public view returns(uint){
      uint a = 1; // local variable
      uint b = 2;
      uint result = a + b;
      return result; //access the local variable
   }
}
```

Biến cục bộ thường được định nghĩa và sử dụng trong các funtion (chỉ được lưu trữ trong khi function thực thi và xoá đi sau khi function kết thúc)
## Global Variable
Biến toàn cục thường là những biến được built-in và có thể sử dụng giá trị trực tiếp mà không cần định nghĩa (thường là những biến để tương tác với các giá trị của blockchanin)
Name|	Returns
| -------- | -------- | -------- |
blockhash(uint blockNumber) returns (bytes32)|	Hash of the given block - only works for 256 most recent, excluding current, blocks
block.coinbase (address payable)|	Current block miner's address
block.difficulty (uint)|	Current block difficulty
block.gaslimit (uint)|	Current block gaslimit
block.number (uint)|	Current block number
block.timestamp (uint)|	Current block timestamp as seconds since unix epoch
gasleft() returns (uint256)|	Remaining gas
msg.data (bytes calldata)|	Complete calldata
msg.sender (address payable)|	Sender of the message (current caller)
msg.sig (bytes4)|	First four bytes of the calldata (function identifier)
msg.value (uint)|	Number of wei sent with the message
now (uint)|	Current block timestamp
tx.gasprice (uint)|	Gas price of the transaction
tx.origin (address payable)|	Sender of the transaction

Ví dụ msg.sender là một biến được sử dụng rất phổ biến giúp lấy ra địa chỉ của người gửi lên hành động

## Đặt tên biến trong solidity
1. Solidity không cho phép sử dụng từ khoá hệ thống làm tên biến. Ví dụ: boolean, break, ...
2. Tên biến bắt đầu bằng chữ hoặc kí tự gạch dưới ( _ ), không được phép sử dụng số hoặc kí tự đặc biệt.
3. Solidity phân biệt chữ cái hoa và thường. Ví dụ myName và myname là hai tên biến khác nhau

# Variable Scope
Phạm vi của biến cục bộ (local variable) được giới hạn trong code block mà nó được sử dụng, tuy nhiên với biến trạng thái (state variable) sẽ có nhiều phạm vi mà chúng ta có thể định nghĩa:
1. Public: Giống với các ngôn ngữ hướng đối tượng khác, biến public được truy cập từ trong contract hoặc bên ngoài, khi định nghĩa biết là public một method get tự động được tạo ra để truy xuất thông tin của biến từ bên ngoài contract.
2. Internal: Biến Internal được truy cập từ Contract chứa nó và các Contract kế thừa
3. Private: Biến private chỉ được truy cập ở Contract mà nó được định nghĩa

```
pragma solidity ^0.5.0;
contract Contract {
   uint public data = 30;
   uint internal internalData = 10;
   
   function updateDate() public returns (uint) {
      data = 3; // internal access
      return data;
   }
}
contract OtherContract {
   Contract contract = new Contract();
   function getContractData() public view returns (uint) {
      return contract.data(); //external access
   }
}
contract ChildContract is Contract {
   function setInternarData() public returns (uint) {
      internalData = 3; // internal access
      return internalData;
   }
   function getResult() public view returns(uint){
      uint a = 1; // local variable
      uint b = 2;
      uint result = a + b;
      return storedData; //access the state variable
   }
}
```

Bài viết này xin phép dừng lại ở đây, trên đây là những lý thuyết cơ bản nhất về Solidity bao gồm cú pháp, kiểu dữ liệu, biến và phạm vi của biến