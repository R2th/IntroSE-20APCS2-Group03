Solidity được thiết kế để có khả năng reverting state nhằm ngăn chặn các sự cố có thể xảy ra. Bài viết này tập trung vào các sử dụng các hàm **require**, **assert** và **revert** . Ngoài ra cũng sẽ tái hiện các exceptions của assert và require .

Ví dụ: Solidity assert-type được tạo ra khi bạn truy cập một mảng với index âm hoặc quá lớn. Một ví dụ exception của require kích hoạt khi hợp đồng với từ khóa mới không kết thúc thành công. 

![](https://images.viblo.asia/02b5e60f-b7b4-4d10-bb0c-78137082f591.png)

# Main Tips
- Solidity xử lý các errors bằng cách trả lại các state vs exceptions
- Solidity **assert** và **require** là các hàm check điều kiện và trả lại exceptions
- **revert** trigger exceptions và có thể trả về **error string**

# Giải thích về Error Handling
Solidity quản lý các vấn đề bằng cách sử dụng state-reverting exceptions. Một exception như vậy sẽ hoàn tác tất cả các thay đổi được thực hiện đối với trạng thái trong cuộc gọi hiện tại (và tất cả các lệnh gọi con của nó) và gắn cờ lỗi cho người gọi.

## Assert and Require
Hàm **assert** và **require** có thể được sử dụng để kiểm tra các điều kiện và đưa ra một exception nếu điều kiện không được đáp ứng. 

Hàm **assert** sẽ tạo ra lỗi kiểu **Panic(uint256)** ( hàm trong trình biên dịch ). Assert chỉ nên được sử dụng để kiểm tra các lỗi internal.  

Sau đây là các trường hợp mà Solidity tạo ra các exception dạng **assert**
- Nếu bạn gọi assert với một argument được đánh giá là **false**.
- Khi bạn gọi một biến chưa được khởi tạo 
- Khi bạn convert một giá trị lớn hoặc âm thành kiểu **enum**
- Khi chia cho 0
- Khi truy cập vào array vs index âm hoặc quá lớn

Hàm **require** dùng để đảm bảo tính hợp lệ của các điều kiện không thể được phát hiện trước khi thực thi. Nó kiểm tra **inputs, contract state** và **return values** từ việc call các external contract. Hàm này sẽ tạo ra lỗi kiểu **Error(string)**  

Sau đây là các trường hợp mà Solidity tạo ra các exception dạng **require**
- Khi bạn gọi require với một argument được đánh giá là **false**.
- Khi bạn thực hiện một lệnh gọi đến một external funtion mà nó không chứa code.
- Khi create contract với **new** keyword nhưng không kết thúc đúng cách
- Khi contract của bạn nhận Ether trong hàm public không có **payable** bao gồm cả fallback function
- Khi contract của bạn nhận Ether trong hàm public getter
- Khi **.transfer()** lỗi

Ví dụ dưới đây thể hiện cách để yêu cầu Solidity xem qua các điều kiện đầu vào và thực hiện kiểm tra các **lỗi internal**.
```js
pragma solidity >=0.5.0 <0.7.0;

contract Sharer {
    function sendHalf(address payable addr) public payable returns (uint balance) {
        require(msg.value % 2 == 0, "Even value required.");
        uint balanceBeforeTransfer = address(this).balance;
        addr.transfer(msg.value / 2);
        // Since transfer throws an exception on failure and
        // cannot call back here, there should be no way for us to
        // still have half of the money.
        assert(address(this).balance == balanceBeforeTransfer - msg.value / 2);
        return address(this).balance;
    }
}
```

Chú ý **assert** sẽ sử dụng **gas** được cung cấp . require thì không sử dụng **gas** .
## Revert
Hàm **revert** là một cách khác để kích hoạt các exception  từ bên trong các code block khác để gắn cờ lỗi và revert current call. Đầu vào là một chuỗi chứa thông tin chi tiết về lỗi được chuyển lại cho người gọi và nó sẽ tạo ra Error(string) giống requires.

Dưới đây là một ví dụ về dùng revert giống như require
```js
pragma solidity >=0.5.0 <0.7.0;

contract VendingMachine {
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Alternative way to do it:
        require(
            amount <= msg.value / 2 ether,
            "Not enough Ether provided."
        );
        // Perform the purchase.
    }
}
```
Trong ví dụ trên thì **revert** trả lại đoạn lỗi như sau
```js
0x08c379a0                                                         // Function selector for Error(string)
0x0000000000000000000000000000000000000000000000000000000000000020 // Data offset
0x000000000000000000000000000000000000000000000000000000000000001a // String length
0x4e6f7420656e6f7567682045746865722070726f76696465642e000000000000 // String data
```

## try/catch
Lỗi trong việc gọi external có thể được phát hiện bằng cách sử dụng câu lệnh try / catch, như sau:
```js
pragma solidity >=0.6.0 <0.9.0;

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
            // This is executed in case revert() was used.
            errorCount++;
            return (0, false);
        }
    }
}
```
Sau từ khóa **try** phải có một biểu thức gọi hàm external hoặc một contract creation (**new ContractName()**) . Phần **returns** (optional) theo sau là các kiểu trả về khớp với kiểu đc trả về bởi lệnh external call .
# Tổng kết
- Để handle error , Solidity undo các thay đổi có thể gây ra lỗi
- **Assert** check các internal errors, **require** thì yêu cầu một điều kiện
- Các exception mà Solidity revert có thể chứa error strings
# Reference 
- https://docs.soliditylang.org/en/v0.8.0/control-structures.html?#error-handling-assert-require-revert-and-exceptions