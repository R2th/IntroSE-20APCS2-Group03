![](https://images.viblo.asia/c1fac2af-9706-43ac-ab40-70bc405e0a43.png)
# Mở đầu
Solidity là ngôn ngữ lập trình quen thuộc với những nhà phát triển ứng dụng blockchain, dùng để xây dựng hợp đồng thông minh (smart contract). Trong phiên bản 0.6 lần này, solidity đã có thêm những thay đổi quan trọng hỗ trợ việc xây dựng smart contract ngày càng hoàn thiện hơn.
# Những thay đổi chính
## Abstract 
Từ khóa `abstract` được dùng để biểu thị contract là trừu tượng (chỉ khai báo hàm chứ không tự implement các hàm của nó) - giống với abstract class trong Java. Contract phải được khai báo là abstract khi có ít nhất 1 function không được implemented, tuy nhiên vẫn có thể khai báo một contract là abstract mặc dù tất cả các hàm của nó đã được implemented. 

Cần phân biệt `abstract` với `interface`. Toàn bộ function trong `interface` đều không được implemented.

Ví dụ:
```js
pragma solidity ^0.6.0;

abstract contract Feline {
    function utterance() public virtual returns (bytes32);
}

contract Cat is Feline {
    function utterance() public override returns (bytes32) { return "miaow"; }
}
```
> Lưu ý: Khi một contract kế thừa từ 1 `abstract` contract. và không thực thi hàm tất cả các hàm non-implemented bằng cách ghi đè nó thì contract đó cũng phải được khai báo là `abstract`.


## Virtual và override
Một hàm bây giờ chỉ có thể được ghi đè nếu nó được khai báo với từ khóa `virtual` hoặc được định nghĩa trong `interface` hoặc `abstract` contract. Khi muốn ghi đè hoặc thay đổi một function ta sử dụng thêm từ khóa `override`. Ví dụ:
```js
pragma solidity >=0.6.0 <0.7.0;

contract Base
{
    function foo() virtual public {}
}

contract Middle is Base {}

contract Inherited is Middle
{
    function foo() public override {}
}
```
Trong trường hợp đa kế thừa, hàm gốc có cùng tên cần được chỉ định rõ ràng sau từ khóa `override`
Ví dụ:
```js
pragma solidity >=0.6.0 <0.7.0;

contract Base1
{
    function foo() virtual public {}
}

contract Base2
{
    function foo() virtual public {}
}

contract Inherited is Base1, Base2
{
    // Derives from multiple bases defining foo(), so we must explicitly
    // override it
    function foo() public override(Base1, Base2) {}
}
```
> Lưu ý: hàm private không thể khai báo là virtual.
## Length of array
Quyền truy cập length của arrays sẽ luôn là read-only, kể cả với storage arrays. Bây giờ chúng ta không thể thay đổi độ dài của array bằng cách gán giá trị mới cho length của nó nữa. Thay vào đó ta sẽ sử dụng các hàm `push` và `pop` , hoặc cổ thể assign cả 1 array mới vào array cũ. 

Function `push(value)` cho dynamic array không còn trả về độ dài mới của array nữa. Ví dụ trong cách dùng cũ:
```js
uint length = zombies.push(Zombie(_name, _dna));
```
Bây giờ hàm push chỉ đơn thuần thêm phần tử mới cho mảng chứ không trả về gì nữa.


## Fallback function
Hàm không có tên trước kia được ngầm hiểu là fallback function trong phiên bản này sẽ được tách ra làm `fallback` và `receive` , không có từ khóa `function` đứng trước. Ví dụ:

Cách khai báo fallback cũ:
```js
contract Test {
    // This function is called for all messages sent to
    // this contract (there is no other function).
    // Sending Ether to this contract will cause an exception,
    // because the fallback function does not have the `payable`
    // modifier.
    function() external { x = 1; }
    uint x;
}
```
Cách khai báo mới:
```js
contract Test {
    // This function is called for all messages sent to
    // this contract (there is no other function).
    // Sending Ether to this contract will cause an exception,
    // because the fallback function does not have the `payable`
    // modifier.
    fallback() external { x = 1; }
    uint x;
}
```

Receive function:
Một contract có ít nhất 1 hàm receive , sử dụng cú pháp  `receive() external payable { ... }`. Hàm này không có tham số cũng không trả về gì cả. Nó được gọi khi gọi contract mà không có dữ liệu truyền vào mà chỉ có chuyển eth. Nếu không có hàm `receive` thì nó sẽ rơi vào `fallback` được khai báo là `payable`.  Nếu không có cả hàm `receive` lẫn hàm `fallback` với `payable`, contract sẽ không thể nhận eth và bắn ra exception. 
```js
pragma solidity ^0.6.0;

// This contract keeps all Ether sent to it with no way
// to get it back.
contract Sink {
    event Received(address, uint);
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
```
## Try/Catch
Một `external call` khi fail có thể được bắt bởi câu lệnh `try/catch` như trong ví dụ sau:
```js
pragma solidity ^0.6.0;

interface DataFeed { function getData(address token) external returns (uint value); }

contract FeedConsumer {
    DataFeed feed;
    uint errorCount;
    function rate(address token) public returns (uint value, bool success) {
        // Permanently disable the mechanism if there are
        // more than 10 errors.
        require(errorCount < 10);
        try feed.getData(token) returns (uint v) {
            return (v, true);
        } catch Error(string memory /*reason*/) {
            // This is executed in case
            // revert was called inside getData
            // and a reason string was provided.
            errorCount++;
            return (0, false);
        } catch (bytes memory /*lowLevelData*/) {
            // This is executed in case revert() was used
            // or there was a failing assertion, division
            // by zero, etc. inside getData.
            errorCount++;
            return (0, false);
        }
    }
}
```
## Struct và Enum: #
Struct và enum giờ có thể được khai báo ở cấp độ file.

## Address:
Không thể chuyển đổi từ kiểu `external function` sang kiểu `address`. Thay vào đó kiểu external function sẽ có 1 thành phần là address. Ví dụ:

`address(f)` chuyển thành  `f.address` với f là kiểu external function.

- Có thể chuyển từ kiểu`address`sang kiểu`address payable`nhờ sử dụng cú pháp payable(x) với x là kiểu address. 

# Kết luận
Trên đây là những thay đổi đáng  chú ý trong phiên bản 0.6.0 của Solidity. Hy vọng bài viết trên sẽ giúp ích cho bạn trong việc phát triển Dapp của mình.
# Source:
https://solidity.readthedocs.io/en/v0.6.7/060-breaking-changes.html