# 1. Tại sao cần phải upgrade smart contract?
Một smart contract một khi đã được deploy lên network thì nó sẽ tồn tại vĩnh viễn trên đó và không thể nào sửa đổi được. Đây chính ưu điểm lớn nhất của Blockchain, tuy nhiên, trong một số trường hợp nó lại là hạn chế. 

Chẳng hạn như một lập trình viên phát hiện ra có lỗ hổng trong logic smart contract của mình, nó có thể bị hacker khai thác và gây thiệt hại cho anh ta, bây giờ anh ta muốn tìm cách làm thế nào để vừa có thể vá được lỗ hổng vừa giữ được toàn bộ dữ liệu của smart contract đó. 

Theo tư duy thông thường, anh ta sẽ backup hết dữ liệu của smart contract cũ về một nơi nào đó ngoài network, deploy một smart contract mới đã vá lỗ hổng, sau đó migrate lại dữ liệu đã backup lên nó, nhưng cách này có những hạn chế sau:
- việc này chỉ khả thi khi dữ liệu tương đối ít
- bắt buộc smart contract mới phải có function để gọi migrate dữ liệu => gây rối cho smart contract
- tốn nhiều gas

Như vậy, làm thế nào để một smart contract đã được deploy network, sau khi chạy một thời gian đã lưu rất nhiều dữ liệu trên đó, nếu đột nhiên phát hiện có lỗ hổng trong logic thì vẫn có thể cho smart contract chạy theo một logic khác an toàn hơn mà không cần deploy lại một bản mới rồi migrate dữ liệu? Người ta đã nghiên cứu ra một cách rất hay dựa trên tính năng của hàm `delegatecall()` để làm điều này. 
# 2. Cách delegatecall cập nhật storage của contract
Như các bạn đã biết, trong `solidity` có nhiều cách gọi `low-level call` từ `contract A` đến `contract B` gồm:
- call()
- staticcall()
- delegatecall()

Trong đó, `delegatecall()` hoạt động theo một cách đặc biệt, có thể hiểu như sau: Khi một `contract X` thực hiện `delegatecall()` đến một `contract Y` thì nó sẽ thực hiện `logic` của `contract Y` nhưng dưới `context` và `storage` của `contract X`. Ví dụ có mã nguồn bên dưới: 
```javascript
// Contract A
pragma solidity >=0.6.2 <0.8.0;

contract A {

    address public sender;
    uint256 public balance;

    function delegateCallToB(address _contractLogic, uint256 _balance) external {
        (bool success, ) =  _contractLogic.delegatecall(abi.encodePacked(bytes4(keccak256("setBalance(uint256)")), _balance));
        require(success, "Delegatecall failed");
    }
}


```
```javascript
// Contract B
pragma solidity >=0.6.2 <0.8.0;

contract B {
    
    address public sender;
    uint256 public balance;
    
    function setBalance(uint256 _balance) external {
        sender = msg.sender;
        balance = _balance;
    }
}

```

cả 2 contract A và B đều khai báo biến là `_balances`, ở contract A có function là `delegateCallToB` sẽ `delegatecall()`  đến function `setBalance()` của B. 

Ta deploy 2 contract lên network bằng `Remix` sau đó: 
- dùng một `user_address`nào đó  (có địa chỉ `0x8f287eA4DAD62A3A626942d149509D6457c2516C` chẳng hạn)  gọi đến function `delegateCallToB()` của A với các tham số là địa chỉ deploy của B và mốt số nguyên là 10 chẳng hạn => `delegateCallToB(B_contract_address, 10)`.
- truy vấn `sender` và `balance` của B, kết quả là `0x0000000000000000000000000000000000000000` và `0`.
- truy vấn `sender` và `balance` của A, kết quả là `0x8f287eA4DAD62A3A626942d149509D6457c2516C` và `10`.

<br/>

![](https://images.viblo.asia/ea7a449e-e49f-46fa-8ca8-aac615ef30cb.png)

Nếu bây giờ ta deploy thêm một contract C có mã nguồn như sau:
```javascript
pragma solidity >=0.6.2 <0.8.0;

contract C {
    
    address public sender;
    uint256 public balance;
    
    function setBalance(uint256 _balance) external {
        sender = msg.sender;
        balance = balance + _balance * 2;
    }
}
```
Thực hiện:
 - gọi function `delegateCallTo(B)` của A với các tham số là `C_contract_address` và `3`  => `delegateCallToB(C_contract_address, 3)`.
- truy vấn `sender` và `balance` của C, kết quả là `0x0000000000000000000000000000000000000000` và `0`.
- truy vấn `sender` và `balance` của A, kết quả là `0x8f287eA4DAD62A3A626942d149509D6457c2516C` và `16`.

Như vậy, điều đó hoàn toàn đúng với tính chất của `delegatecall()` mà ta đã nói ở trên. 

> Khi một `contract X` thực hiện `delegatecall()` đến một `contract Y` thì nó sẽ thực hiện `logic` của `contract Y` nhưng dưới `context` và `storage` của `contract X`

![](https://images.viblo.asia/8664d36b-2eb0-4f0c-8177-9ea5da2a54a7.png)

# 3. Triển khai một `upgradeable contract` theo cách Inherited Storage
Như vậy từ tính chất của `delegatecall()` đã mở ra cho ta khả năng upgrade một contract. Tuy nhiên để triển khai như thế nào cho nó hợp lý là một vấn đề khác. 

Thực chất, cách mà `delegatecall()` tác động lên `storage` của contract `X` là nó tác động lên theo thứ tự của slot tương ứng giữa X và Y. Ví dụ có contract D như sau:
```javascript
pragma solidity >=0.6.2 <0.8.0;

contract D
    
    uint256 public balance;
    address public sender;
    
    function setBalance(uint256 _balance) external {
        sender = msg.sender;
        balance = _balance;
    }
}
```
thứ tự khai báo 2 biến `balance` và `sender` của D khác so với A, B, C. Thực hiện:
- gọi function `delegateCallToB(B)` của A với các tham số là `D_contract_address` và `10`  => `delegateCallToB(D_contract_address, 10)`
- truy vấn `sender` và `balance` của D, kết quả là `0x0000000000000000000000000000000000000000` và `0`
- truy vấn `sender` và `balance` của A, kết quả là `0x000000000000000000000000000000000000000A` (kết quả của address(10)) và `817288742280969564811718162174206570979710357868` (kết quả của uint256(0x8f287eA4DAD62A3A626942d149509D6457c2516C)). Đáng lẽ phải là sender = `0x8f287eA4DAD62A3A626942d149509D6457c2516C` và balance = `10` ?

<br/>

![](https://images.viblo.asia/0c39c820-8c6c-4cc3-9703-14efe7ca6a5c.png)

Lý do là, giữa contract A và contract D do bị xung đột về thứ tự khai báo các biến nên dẫn đến kết quả bị sai. Như vậy, khi muốn triển khai một contract có thể upgrade (upgradeable contract) chúng ta phải nhất quán thứ tự khai báo các biển giữ contract đóng vai trò là `storage` (contract A) và contract đóng vai trò là `logic` (contract B, C, D). Có thể triển khai ngắn gọn lại như sau:

```javascript
pragma solidity >=0.6.2 <0.8.0;

contract StorageContract {

    address public sender;
    uint256 public balance;
}

contract A is StorageContract {

    function delegateCallToB(address _contractLogic, uint256 _balance) external {
        (bool success, ) =  _contractLogic.delegatecall(abi.encodePacked(bytes4(keccak256("setBalance(uint256)")), _balance));
        require(success, "Delegatecall failed");
    }
}

contract B is StorageContract {
    
    function setBalance(uint256 _balance) external {
        sender = msg.sender;
        balance = _balance;
    }
}

contract C is StorageContract {
    function setBalance(uint256 _balance) external {
        sender = msg.sender;
        balance = balance + _balance * 2;
    }
}

contract D is StorageContract {
    
    function setBalance(uint256 _balance) external {
        sender = msg.sender;
        balance = _balance;
    }
}
```

Cách triển khai này được gọi là `Inherited Storage`. Tuy nhiên nó một số khuyết điểm:
- Các hợp đồng logic có thể kế thừa một storage mà trong đó có thể có những biến nó không sử dụng tới.
- Các hợp đồng logic bắt buộc phải liên kết chặt chẽ với hợp đồng storage
- Khó khăn trong việc quản lý các biển private
- Dễ xảy ra xung đột lưu trữ
- Bắt buộc storage contract phải có đủ các function get-set cần thiết

Ngoài ra còn một cách có thể dùng để triển khai một `upgradeable contract` tương tự như `Inherited Storage` là `Eternal Storage` các bạn có thể tham khảo thêm [tại đây](https://medium.com/1milliondevs/solidity-storage-layout-for-proxy-contracts-and-diamonds-c4f009b6903).

Kết thúc phần 1, mình muốn giới thiệu cho các bạn về:
- lý do tại sao phải upgrade contract
- delegatecall() là kỹ thuật chính mà người ta vận dụng để làm cho một contract có thể upgrade (upgradeable contract)
- cách triển khai đơn giản nhất là Inherited Storage.

Sang phần 2, mình sẽ đi sau vào cách tiếp cách Unstructured Storage, đã được Openzeppelin chuẩn hóa và publish trên github của mình.