Trong bài viết này, mình xin được đi lướt Solidity để giới thiệu về Modifier, nếu mọi người cần tìm hiểu thêm về các khái niệm sẽ có trong bài: Solidity, Smart contract, Ethereum hay Blockchain thì có thể tham khảo các tài liệu bên ngoài.

Trước hết, chúng ta cùng điểm qua đôi chút về Solidity.

## 1, Solidity

Theo định nghĩa: 
    
![](https://images.viblo.asia/5209f7dc-ce5f-4111-8866-738031ae4fc0.png)

Nhìn qua thì Solidity cũng chỉ là một ngôn ngữ lập trình bậc cao, hướng đối tượng nhưng nó hỗ trợ một thứ gọi là “smart contracts”. Vì vậy, lập trình với ngôn ngữ Solidity thì không có gì là quá phức tạp, chỉ là thay đổi cú pháp như các ngôn ngữ khác.

Điểm đáng chú ý: nó “designed to target the Ethereum Virtual Machine (EVM)”. Hiểu đơn giản: nó sinh ra để lập trình các chương trình chạy trên Ethereum Blockchain. Và nhắc tới Blockchain là nhắc tới sự minh bạch, tính bất biến, phi tập trung và tính bảo mật. 

Vì vậy để đảm bảo nó hoạt động được trên một môi trường mà dữ liệu gần như không thể sửa đổi thì “trách nhiệm” của các chương trình Solidity lại là một điều đáng để chú ý. Và một trong các bước để đảm bảo được điều đó chính là các khâu xác thực các điều kiện, dữ liệu.

(Có thể tìm hiểu thêm về Solidity tại: https://solidity.readthedocs.io/en/v0.5.5/index.html )

Và tiếp theo đây, chúng ta sẽ cùng tìm hiểu về phương thức Modifier trong Smart Contract

## 2, Modifier

### 2.1, Một số tính chất của Modifier

Modifier được sử dụng trong một phương thức trong Smart Contract để kiểm tra các điều kiện trước khi các đoạn mã code trong phương thức đó được thực thi (điều này là vô cùng quan trọng trong việc đảm bảo được tính an toàn trong Smart Contract)

Ví dụ 1:

![](https://images.viblo.asia/88b825ad-8e19-452e-9784-095b516109d4.png)

-> Modifier onlyOwner() sẽ đảm bảo cho hàm kill() sẽ hoạt động một cách đúng đắn: chỉ có owner của Contract mới được quyền gọi nó.

Lưu ý: Ta hoàn toàn có thể viết trực tiếp điều kiện ở hàm kill() nhưng việc sử dụng modifier sẽ tiện cho việc dùng những lần gọi sau để giảm sự dư thừa của các đoạn code. Tuy nhiên, việc sử dụng chúng lại phải thực hiện một cách cẩn trọng.

   Modifier khai báo như thuộc tính trong một Smart Contract, có thể được kế thừa và sử dụng bởi các Smart Contract con.
Ví dụ:
```
contract Ownable {
    address public owner;
    constructor() public {
      owner = msg.sender;
      }

    modifier onlyOwner() {
      if (msg.sender != owner) {
        revert();
      }    
      _;
    }
} 
// ta sẽ viết contract Killable để kế thừa modifier “onlyOwner" từ “Ownable"
contract Killable is Ownable {
    function kill() onlyOwner public {
        selfdestruct(/*_addressTo*/);
    }
    // function kill() sẽ kế thừa modifier onlyOwner từ contract Ownable và dùng bình thường
}
```
   
   Một phương thức có thể áp dụng nhiều hơn một modifier bằng việc liệt kệ chúng theo danh sách được ngăn cách nhau bởi khoảng trắng.

Ví dụ 2:

![](https://images.viblo.asia/f2bf2bf0-7352-41fa-984d-a6ac9b96e282.png)

Chú ý: Các modifiers sẽ được thực thi theo đúng thứ tự đã được liệt kê trong quá trình khai báo phương thức.

### 2.2, “_;” trong Modifier

Trong các ví dụ trên, ta thấy xuất hiện các ký tự `_;` trong mỗi modifier. Vậy ý nghĩa của nó là gì?

- Ký tự `_;`trong modifier đại diện cho đoạn code của phương thức sử dụng modifier này và nó được thực thi ngay khi vượt qua được điều kiện đã kiểm tra tại các câu lệnh của modifier. Hiểu đơn giản: `_;` xuất hiện sẽ trả lại luồng thực thi cho function gọi nó.

ví dụ 3:

![](https://images.viblo.asia/88b825ad-8e19-452e-9784-095b516109d4.png)

-> onlyOwner() kiểm tra: nếu qua được lệnh `if()` ban đầu thì tiếp tục thực thi đoạn`"_;"` ở phía dưới.

- Một modifier có thể sử dụng 1 hoặc nhiều `_;` và nó có thể được đặt ở bất kì đâu trong modifier, vậy phương thức sử dụng nó sẽ được gọi 1 hoặc nhiều lần tương ứng.

ví dụ 4: như ở ví dụ 2:

![](https://images.viblo.asia/f2bf2bf0-7352-41fa-984d-a6ac9b96e282.png)

Và kết quả thu được sẽ là:
```
	modState1 = 1 
	modState2 = 2  
	modState3 = 2 (vì nó được gọi 2 lần ở modifier modB()) 
```

Lưu ý: Solidity là một ngôn ngữ mới (ra đời cùng Ethereum vào 2014), và vẫn đang trong giai đoạn phát triển, hoàn thiện nên các version khác nhau có thể khác nhau về cú pháp (có thể là bổ sung, thay đổi, xóa) tuy nhiên chúng ta có thể sử dụng một version cụ thể để sử dụng (tùy thuộc vào mỗi cá nhân).

## 3, Tổng kết:

- Tính bất biến, minh bạch của Blockchain là những điểm mạnh thúc đấy ta áp dụng, khai thác chúng, nhưng đồng thời nó lại là một thử thách không hề nhỏ đối với những lập trình viên làm việc trong lĩnh vực này.

- Vì vậy, cần đảm bảo cho các smart contract hoạt động một cách chính xác nhất có thể và để làm được điều này thì các khâu xác thực, kiểm tra các dữ liệu đầu vào cũng là một bước cực kì quan trọng cần được kiểm tra và đảm bảo không thể có những sơ suất đáng tiếc, nghiêm trọng nào xảy ra!

Trên đây là một số thứ mình tìm hiểu được về modifier trong Solidity, rất mong mọi người đóng góp ý kiến!

**Nguồn tham khảo:**

https://medium.com/coinmonks/the-curious-case-of-in-solidity-16d9eb4440f1

https://solidity.readthedocs.io/en/v0.5.5/