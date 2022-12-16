# Mở đầu
Solidity là một ngôn ngữ được sự dụng rất nhiều khi xây dựng các hợp đồng thông minh (Smart contract), tuy nhiên do là một ngôn ngữ còn mới mẻ nên vẫn còn nhiều thiếu sót và nhiều chỗ bất tiện cho các nhà phát triển. Với phiên bản 0.5 lần này, hi vọng những đổi mới từ ngôn ngữ này sẽ giúp ích ít nhiều cho những nhà phát triển

![](https://images.viblo.asia/9266c12f-c3de-4ae6-bec4-629fd716f321.png)
# Những thay đổi chính
## Cú pháp

Sự thay đổi đầu tiên có thể dễ dàng nhận thấy là những thay đổi về cú pháp:

1. Những function như **.call()**, **.delegatecall()**, **staticcall()**, **keccak256()**, **sha256()**, **ripemd160()** giờ đây chỉ chấp nhận một đối số đầu vào dưới dạng bytes. Theo như nhà phát triển giải thích thì mục đích cuả thay đổi này nhằm tạo ra sự rõ ràng và clear cho người sử dụng về phương pháp những đối số được truyền vào.  
     * **.call(signature, a, b, c)**    chuyển đổi thành     **.call(abi.encodeWithSignature(signature, a, b, c))**
    * **keccak256(a, b, c)**                       chuyển đổi thành     **keccak256(abi.encodePacked(a, b, c))**
    * .call() chuyển đổi thành **.call("")**
1. Những function **.call()**, **.delegatecall()** và **.staticcall()** hiện nay trả về dạng dữ liệu **(bool, bytes memory)**. Do đó với cú pháp **bool success = otherContract.call("f")** cần chuyển thành **(bool success, bytes memory data) = otherContract.call("f")**

3. Bên cạnh đấy với phiên bản mời này, ngôn ngữ đã chặt chẽ hơn đối với các biến cục bộ, các  biến này chỉ được sử dụng khi đã được khai báo. Các biến khởi báo trong khối vòng lặp **For** luôn hợp lệ trong bất kì thời điểm nào của vòng lặp

## Các quy tắc , điều kiện mới

* Khai báo rõ ràng access modified cho mỗi hàm. Thêm modified **public** cho các function và constructor, **external** cho các hàm fallback và các hàm interface chưa được định nghĩa chi tiết.
* Vị trí lưu trữ (storage và memory) cần phải khai báo rõ ràng cho các kiểu dữ liệu **struct**,  **array** và **mapping**. điều này cũng tương tự cho các biến đầu vào và dữ liệu trả về 

```js
uint[] storage x = m_x
function f(uint[][] memory x)
```

* Contract ở phiên bản mới này cũng không được tự động ép kiểu sang **address** để sử dụng những function dành riêng cho address nữa. Do đó, khi muốn thực hiện những hàm của address cho contract, cần phải ép kiểu nó trước, ví dụ với **c** là một **contract**

```js
address(c).transfer(...)
address(c).balance
```
* Chuyển đổi giữa hai contract không liên quan trong phiên bản mới này không còn được cho phép, tuy nhiên vẫn có thể "lách luật" một chút bằng cách convert về dạng address sau đó chuyển đổi. Ví dụ 2 kiểu contract A và B không liên quan đến nhau, trong đó contract **b** là contract kiểu B, khi đó ta vẫn có thể chuyển đổi **b**  sang kiểu A bằng cách:
```js
A(address(b))
```
* Kiểu **address** được chia thành hai kiểu **address** và **address payable**. Với bản cập nhật này thì chỉ **address payble** mới có thể gọi đến function **transfer**.  Kiểu **address payable** cũng có thể convert trực tiếp sang dạng **address**, tuy nhiên điều kiện ngược lại thì không tồn tại.  Muốn convert từ **address** sang **payable address** cần  phải chuyển đổi thông qua **uint160**.  Với **c** là một **contract** , chuyển đổi **address(c)** chỉ trả về dạng **payable address** nếu c chứa  một **payable fallback function**. 

* Những function non-payable sẽ không được sử dụng cú pháp **msg.value** 


## Những phần bị lược bỏ
### Dòng lệnh và giao diện JSON
* Tùy chọn dòng lệnh --formal (được sử dụng để tạo đầu ra Why3 để xác minh chính thức hơn nữa) không được chấp nhận và hiện đã bị xóa. Một mô-đun xác minh chính thức mới, SMTChecker, được kích hoạt thông qua thử nghiệm SMTChecker thử nghiệm pragma;.Tùy chọn dòng lệnh --formal (được sử dụng để tạo đầu ra Why3 để xác minh chính thức hơn nữa) không được chấp nhận và hiện đã bị xóa. Một mô-đun xác minh chính thức mới, SMTChecker, được kích hoạt thông qua thử nghiệm SMTChecker thử nghiệm pragma
* Tùy chọn dòng lệnh --julia được đổi tên thành --yul do đổi tên ngôn ngữ trung gian Julia thành Yul
* Các tùy chọn dòng lệnh --clone-bin và --combined-json đã được loại bỏ.
* Các trường JSON AST không đổi và phải trả đã bị xóa. Thông tin hiện có trong trường StateMutability.

### Constructors
* Contructor được định nghĩa bằng cách sử dụng từ khóa **constructor**
* Việc chỉ định các đối số của constructor nhiều lần trong cùng một hệ thống phân cấp thừa kế hiện không được phép.
* Gọi constructor với các đối số nhưng số lượng đối số sai hiện không được phép.

### Các function đã có
* Hàm **callcode** hiện tại không được phép (khuyến khích sử dụng **delegatecall**).  Tuy nhiên vẫn có thể sử dụng thông qua việc  sử dụng hợp ngữ assembly
* suicide đã được bỏ (Sử dụng **selfdestruct**)
* sha3 bị bỏ ( Sử dụng **keccak256**)
* throw bị bỏ (Sử dụng **revert**, **require**, **assert**)

###  Các hậu tố
* Đơn vị **years** bị bỏ vì gây nhầm lẫn phức tạp cho người sử dụng vì sự nhập nhằng của những năm nhuận
* Tiền tố **0X** bị loại bỏ cho kiểu hex, chỉ chấp nhận tiền tố **0x**
* Kết hợp số hex với mệnh giá đơn vị (ví dụ: 0x1e wei) hiện không được phép.

### Biến số
* Không được khai báo những **struct** rỗng
* Việc gán giữa các bộ dữ liệu với số lượng thành phần khác nhau hiện không được phép.
* Các giá trị cho các hằng số không phải là hằng số thời gian biên dịch không được phép.
* Các biến storage chưa được khởi tạo hiện không được phép.
* Các mảng có kích thước cố định với độ dài bằng 0 hiện không được phép.

### Cú pháp
* Sử dụng hằng số làm công cụ sửa đổi trạng thái chức năng hiện không được phép.
* Biểu thức Boolean không thể sử dụng các phép toán số học.
* Lệnh trả về trống cho các hàm có một hoặc nhiều giá trị trả về hiện không được phép.
* Các loại hàm với giá trị trả về được đặt tên hiện không được phép.


# Kết luận

Trên đây là những phần thay đổi nổi bật cũng như thường được sử dụng cho ngôn ngữ solidity để xây dựng smart contract, hi vọng có thể giúp ít nhiều cho những người bắt đầu tìm hiểu ngôn ngữ soldity. Trong những phần tiếp theo mình sẽ nói chi tiết hơn về những thay đổi của bản 0.5 solidity này.