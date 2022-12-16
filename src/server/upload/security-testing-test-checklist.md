Dưới đây là một vài kịch bản security testing áp dụng cho mọi ứng dụng.

#### 1.Check for SQL injection attacks.
Cùng xem câu lệnh sau: 
```
SELECT * FROM Users WHERE UserId = 105 OR 1=1;
```
Câu lệnh trên là hợp lệ và sẽ trả về toàn bộ bản ghi từ bảng `Users` bởi vì điều kiện `OR 1=1` luôn luôn đúng.
Nếu không có biện pháp ngăn chặn hacker sẽ truy cập tới toàn bộ user names và passwords trong database gây ra các hoạt động phá hoại ảnh hưởng tới người dùng và tổ chức.

#### 2. Các trang cần bảo mật sử dụng phương thức HTTPS
Ví dụ các trang chưa được public, hoặc các giai đoạn phát triển đang ở phiên bản alpha, beta… cần hạn chế người truy cập, cấu hình các dải IP có quyền truy cập dịch vụ.
#### 3. Các trang thông báo lỗi không được hiển thị thông tin ứng dụng hoặc thông tin máy chủ.
#### 4. Loại bỏ các ký tự đặc biệt khi nhập liệu.
Ví dụ username không nên chứa các ký tự đặc biệt như *, #….

#### 5. Error messages Không được tiết lộ bất kỳ thông tin nhạy cảm nào.
Ví dụ: Khi user thực hiện đăng nhập không thành công do thông tin không đúng thì không nên hiển thị các error message kiểu như sau:
> - user_name không tồn tại
> - password không đúng
> 
Việc hiển thị error message như trên sẽ giúp hacker có thể đưa ra những phán đoán nhằm xâm nhập vào hệ thống.
Trong trường hợp này nên hiển thị error message một cách chung chung như: 

> Tên đăng nhập hoặc mật khẩu không đúng.

#### 6.Tất cả các thông tin đăng nhập như email, password phải được chuyển qua kênh mã hóa
#### 7.Kiểm tra bảo mật mật khẩu và chính sách bảo mật
Thông thường việc đặt mật khẩu và chính sách bảo mật thường tuân theo một số điểm như sau:
- Mật khẩu phải được mã hóa
- Đổi mật khẩu:  Mật khẩu mới phải khác mật khẩu cũ
- Mật khẩu phải tối thiểu 8 kí tự trở lên
- Mật khẩu không nên trùng với username
- Mật khẩu không nên là các số liền nhau như 12345678
- Nên yêu cầu người dùng đổi mật khẩu định kỳ 3 tháng, 6 tháng/ lần….
…...
Tuy nhiên mỗi  một dự án lại có các yêu cầu khác nhau, từ đó tạo lên checklist đáp ứng với từng specs cụ thể.
#### 8. Kiểm tra chức năng log out của ứng dụng
- Sau  khi logout user không thể truy cập các trang bảo mật như trang cá nhân, trang lịch sử xem...

#### 9. Kiểm tra Brute Force Attacks.
Vậy tấn công Brute Force là gì?
Brute Force là việc hacker nắm trong tay một danh sách rất lớn các username và mật khẩu phổ biến hay được sử dụng. Sau đó họ gửi liên tục các truy vấn đăng nhập vào file wp-login.php của bạn và nếu tài khoản nào sai, nó sẽ bỏ qua và thử tiếp tài khoản khác. Cứ lần lượt như vậy, sau đó lại “trộn” mật khẩu đến khi nào đăng nhập được thì thôi.
Vậy làm sao để phòng tránh:
* Tên đăng nhập khó đoán ra.
* Mật khẩu dài, mạnh, có ký tự đặc biệt và không liên quan đến các thông tin cá nhân.
* Hạn chế số lần đăng nhập sai.
* Bảo mật đường dẫn đăng nhập.
* Thường xuyên thay đổi mật khẩu.

Link tham khảo sau: https://thachpham.com/wordpress/wp-plugin/cach-chong-brute-force-attack.html

#### 10. Thông tin cookie chỉ nên được lưu trữ ở định dạng được mã hóa.
Để kiểm tra chúng ta nhấn F12 ->Tab Aplication -> Check mục Cookies -> Cột Value

![](https://images.viblo.asia/e459f372-2bc6-4806-ad9f-9233d0eb8b60.png)

#### 11. Kiểm tra session cookies sau khi hết thời gian chờ hoặc sau khi đăng xuất

#### 12. Session tokens nên truyền qua kênh bảo mật như https
#### 13.Password không nên lưu trữ trong cookies.
#### 14. Kiểm Denial of Service attacks.(DDos)
DDos: là một nỗ lực làm cho những người dùng không thể sử dụng tài nguyên của một máy tính. Mặc dù phương tiện để tiến hành, động cơ, mục tiêu của tấn công từ chối dịch vụ có thể khác nhau, nhưng nói chung nó gồm có sự phối hợp, sự cố gắng ác ý của một người hay nhiều người để một trang, hay hệ thống mạng không thể sử dụng, làm gián đoạn, hoặc làm cho hệ thống đó chậm đi một cách đáng kể với người dùng bình thường, bằng cách làm quá tải tài nguyên của hệ thống. Thủ phạm tấn công từ chối dịch vụ thường nhắm vào các trang mạng hay server tiêu biểu như ngân hàng, cổng thanh toán thẻ tín dụng và thậm chí DNS root servers.
#### 15.Kiểm tra trường hợp rò rỉ bộ nhớ
Rò rỉ bộ nhớ trong lập trình là hiện tượng chương trình máy tính không quản lý chính xác việc cấp phát bộ nhớ giành cho dịch vụ. Thông thường là tốn dung lượng so với dung lượng thực sự hệ thống cần. Nếu việc này diễn ra thường xuyên và liên tục sẽ dẫn đến việc truy cập hệ thống bị chậm hoặc quá tải. 
Ngoài các nguyên nhân do phần cứng thì việc khởi tạo các đối tượng, biến, hàm, ..v.v.  trong chương trình mà không được sử dụng cũng được xem là rò rỉ bộ nhớ bởi vì nó cũng gây lãng phí tài nguyên của máy tính. 
#### 16. Kiểm tra truy cập ứng dụng trái phép bằng cách thao tác các giá trị biến trong thanh địa chỉ trình duyệt.
#### 17. Kiểm tra các file mở rộng, đảm bảo rằng các file không được hỗ trợ sẽ không upload lên máy chủ.

#### 18. Các trường nhạy cảm như mật khẩu, thông tin thẻ tín dụng… không nên bật chế độ tự động hoàn tất. (autocomplete)
#### 19.Chức năng upload file nên sử dụng các cách hạn chế file và quét virust các file upload
#### 20. Kiểm tra danh sách các thư mục bị cấm.
#### 21.Chức năng quên mật khẩu:
- Kiểm tra thời gian hết hạn của mật khẩu tạm thời, hoặc link reset password
- Câu hỏi bảo mật..
#### 22. Chức năng xác mình mã CAPCHA.
#### 23. Kiểm tra các sự kiện quan trọng có được ghi trong file log hay không? .
#### 24. Mật khẩu và các trường thông tin quan trọng cần được bảo mật bằng cách ẩn đi khi nhập liệu.
#### 25. Check permission
#### 26. Check XSS
Hiện nay các framework đa phần đã có chế độ chặn tấn công XSS. Tuy nhiên một vài coder có thể quên xử lý này. Để check code đã xử lý tấn công XSS chưa chúng ta có thể sử dụng đoạn mã sau truyền vào một input bất kỳ và submit chúng.
```
<scrip type="text/javascript">alert(document.cookie);</script>
```
Nếu một popup được bật lên có nghĩa là chương trình này chưa xử lý tấn công XSS

Nguồn tham khảo: https://www.softwaretestinghelp.com/sample-test-cases-testing-web-desktop-applications/ 

https://thachpham.com/wordpress/wp-plugin/cach-chong-brute-force-attack.html