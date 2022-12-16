![](https://images.viblo.asia/3a65e0bb-1fc8-43ac-a8e6-c0b849d0fbfd.png)

Bài viết này sẽ trình bày cách viết một hợp đồng thông minh đơn giản nhưng đầy đủ trong Solidity giúp contract của chúng ta có thể nhận và phân phối Ether

### Tài khoản sở hữu Ether (Accounts Own Ether)

Có 2 loại tài khoản Ethereum là **smart contract** và **tài khoản thuộc sở hữu** ( Externally-Owned Accounts ) cả 2 loại tài khoản này đều có thể sở hữu Ether. Chỉ cần địa chỉ của tài khoản đó thì có thể kiểm tra số dư của tài khoản đó trong Solidity bằng câu lệnh **address.balance** . Một smart contract có thể truy cập số dư của chính nó bằng câu lệnh **address(this).balance** . Smart contract minh họa dưới đây sẽ trả lại số dư tài khoản mà nó đang sở hữu: 

```
pragma solidity ^0.4.24;

contract Sandbox {
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
```

### Tiền Gửi (Deposit)

Để cho phép các tài khoản khác có thể gửi và rút ether từ smart contract , chúng ta sẽ thêm vài hàm . Bắt đầu với hàm gửi ether **deposit()** 
```
pragma solidity ^0.4.24;

contract Sandbox {
    function deposit() payable public {
        // TODO do something then
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
```

Với đoạn code trên  :
* **payable** trong hàm cho phép contract nhận ether mà người gửi tin nhắn có thể gửi kèm theo trong **transaction message**
* Hàm này có thể hiểu là ngầm nhận ether đính kèm được chuyển đến 

Do việc ngầm định này nên hàm deposit() rất đơn giản .Mặc dù chúng ta có thể hoàn toàn viết như ở trên nhưng có một cách tốt hơn đó là truyền số tiền qua tham số và kiểm tra số tiền đó thực sự được chuyển chưa. Điều này cho phép smart contract từ chối các giao dịch có thể bị lỗi

```
pragma solidity ^0.4.24;

contract Sandbox {
    function deposit(uint256 amount) payable public {
        require(msg.value == amount);
        // TODO do songthing then
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
```
Giải thích : 
* **msg.value** đại diệncho số tiền người gửi đính kèm trong transaction message
* **require(msg.value == amount);** kiểm tra số tiền được đính kèm trong transaction message và số tiền mà ng gửi chuyển như 1 đối số của hàm **deposit()** . Nếu requite fails thì toàn bộ giao dịch thất bại và không gây tổn thất gì .

Đây là một lựa chọn thiết kế cơ bản cho các smart contract , các giao dịch sẽ hoàn thành đầy đủ với tất cả các trạng thái được ghi lại đầy đủ hoặc giao dịch bị hủy bỏ mà không có bất cứ tổn thất gì. Mô hình này được khai thác nhiều khi phải triển các smart contract phức tạp hơn.

### Rút tiền ( Withdraw )
Một điều quan trọng của smart contract là hoàn toàn không có cách nào để rút ether khỏi nó ngoài việc thực hiện thông qua một số chức năng mà smart contract phát triển. Hoàn toàn không có "backdoor" nào để có thể cho phép tác giả hoặc người pháp triển hợp đồng có thể rút ether mà không thông qua các hàm của smart contract.  Đây là lí do cơ bản tại sao một smart contract được viết tốt có thể được tin cậy để xử lí giao dịch ether thay cho người dùng. 

Hãy thử viết 1 hàm withdraw để rút tất cả số tiền của contract cho địa chỉ gọi hàm **withdraw()**

```
pragma solidity ^0.4.24;

contract Sandbox {
    function withdraw() public {
        msg.sender.transfer(address(this).balance);
    }

    function deposit(uint256 amount) payable public {
        require(msg.value == amount);
        // TODO do songthing then
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
```

Giải thích :
*  **msg.sender** đại diện cho địa chỉ tài khoản gọi đến contract
*  **address.transfer(amount)** chuyển số tiền bằng ether vào địa chỉ được đại diện bởi biến address
Đoạn code trên minh họa việc chuyển ether từ smart contract này sang địa chỉ gọi đến hàm withdarw(). Tất nhiên , hợp đồng phải sở hữu một lượng ether đủ để trả phí thực hiện giao dịch . Nếu không hệ thống sẽ hủy bỏ giao dịch.

### transfer() , send() và call.value() 

Ngoài chức năng **transfer()** để chuyển ether, Solidity còn cung cấp chức năng **send()**, **call()** .Nhưng tôi ko khuyến khich sử dụng **send()** , **call()** vì có thể sẽ hơi nguy hiểm khi sử dụng.

1. Nếu **transfer()** gặp vấn đề, nó sẽ đưa ra ngoại lệ, nó sẽ khiến cho giao dịch bị hủy bỏ. Điều này thường sẽ chỉ xảy ra nếu quá trình chuyển hết gas. Hủy bỏ giao dịch trong trường hợp này là tốt và an toàn vì có lẽ bạn cũng không muốn giao dịch hoàn thành với giả định sai là nó đã thực hiện chuyển ether.

1. **send()** sẽ trả về **true** hoặc **false** tùy thuộc vào việc nó chuyển ether thành công hay thất bại, nhưng nó sẽ không bao giờ hủy bỏ. Nếu smart contract không kiểm tra gía trị trả về của **send()** hoặc không xử lý được chính xác lỗi thì smart contract có thể rơi vào trạng thái không nhất quán và không thể khôi phục. Do đó, tôi khuyên bạn hãy sử dụng **transfer()** thay vì **send()** để chuyển tiền ra khỏi smart contract

1. **address.call.value(amount)( ).gas()**  đây là một **low-level** function và nó sẽ trả lại **false** nếu xảy ra lỗi . Sự khác biệt của nó so với hai chức năng trên là bạn phải set gas thông qua **.gas(gasLimit)** nếu không nó sẽ gây tốn gas trong những hợp đồng phải thực hiện một logic phức tạp , đòi hỏi nhiều gas

![](https://images.viblo.asia/beb4dceb-f0b9-4923-86d8-4f80439a66ff.png)

### Solidity’s "Fallback Function"
Solidity có một cấu trúc được gọi là **fallback function** , nó cũng có tác dụng giúp các smart contract có thể nhận ether . Lưu ý là để viết hàm này chúng ta sẽ ko đề cập đến tên của chúng. 

```
pragma solidity ^0.4.24;

contract Sandbox {
    function () public payable{
            // do nothing here
    }
}
```

Các hàm không được define trong contract mà có payable ở fallback thì đều có thể nhận ether.

Đây là cấu trúc thường được sử dụng , tuy nhiên cũng tiềm ẩn nhiều rủi ro hãy thận trọng khi sử dụng nó 
### Tổng kết
* Ethereum smart contracts có thể nhận cũng như gửi ether
* Hàm để kiểm tra số dư của contract **address(this).balance**
* Để contract có thể nhận ether phải có hàm yêu cầu **payable**
* Có thể xác nhận số lượng ether được gửi vào qua transaction message qua câu lệnh **msg.value**
* Để chuyển ether đi ta có thể sử dụng **transfer(amout)** hoặc có thể sử dụng **send(amount)** hay **call.value(amout)** nhưng hãy cẩn thận check giá trị trả về
* Smart contract có thể chấp nhận nhận ether bằng **fallback function**  

### Nguồn tham khảo
https://medium.com/daox/three-methods-to-transfer-funds-in-ethereum-by-means-of-solidity-5719944ed6e9