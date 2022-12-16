# Mở đầu
Bài hôm nay hơi khác các bài mình từng làm đó là ta sẽ đi reivew source code để tìm ra lỗ hổng và tiến hành khai thác. Ngôn ngữ được dùng ở đây là PHP, mình chưa từng code qua PHP bao giờ nên lúc làm bài gặp khá nhiều khó khăn vì mình khá là thích C nhưng nó lại thiếu các thư việc hỗ trợ nên mình tìm đến Golang một ngôn ngữ mình mới học gần đây là mình khá là thích vì nó là sự kết hợp của C và Python. Lan man đủ rồi vào việc thôi :)
# Write-up
Vì mình biết bài này là reivew source code nên mình đã chạy gobuster với option -x với các file extension là .zip, .rar, .bak và mình tìm được source code là source_code.zip.
Chức năng đầu tiên mình kiểm tra là login 
![](https://images.viblo.asia/64d16c9e-1651-4d16-9231-fd1a6b8ec173.PNG)
Phân tích một chút thì hàm sqli_real_escape_string() dùng để lọc tất cả các kí tự như `' " \n \r %00` mà username lại được bao quanh bởi dấu ' thì khả năng bypass gần như không có. Tiếp đến là hàm hash md5() chỉ trả lại kết quả chứ kí từ từ a-z, A-Z và 0-9 nên có thể kết luận là chức năng Login không tồn tại lỗ hổng<br>
Mình để ý hầu hết tất cả các file có chứa dòng `include '../include/isAuthenticated.php';` 
![](https://images.viblo.asia/c3d77b25-882f-4c7d-a761-0e8e29ffc529.PNG)

File này kiểm tra trong session có chứa id_level =1 hay không nếu không sẽ chuyển hướng đến login.php. Vì kiểm tra biến trong session nên khả năng cao chúng ta sẽ không khai thác được gì thêm ở đây<br>
Như mình đã nói chỉ hầu hết các file có chứa file isAuthenticated.php nên ta còn các file resetPassword.php, doResetPassword.php, doChangePassword.php, viewItem.php. Sau khi nhìn qua các file trên thì ta rút ra được các điều như sau:
* Token dùng để reset password có độ dài là 15 và bao gồm các kí tự từ a-z, A-Z và 0-9
![](https://images.viblo.asia/e84e754c-9090-4989-9e97-ea1fc4a23f6b.PNG)
* File viewItem.php có chứa lỗ hổng Sqli Bool-base mặc dù đã dùng hàm sqli_real_escape_string() nhưng vì không để tham số trong dấu ' nên ta dễ dàng chèn thêm tùy ý
![](https://images.viblo.asia/8b3ea86c-c212-4a2b-bc16-40c0637d819e.PNG)

Thoạt nhìn qua ta tưởng file viewItem.php là an toàn vì nó cách nó kiểm tra người dùng có phải là admin không tương tự như file isAuthenticated.php, nó sẽ chuyển hướng về login nếu người dùng không phải là admin. Mình mất khá nhiều thời gian ở đây vì mình cũng nghĩ cách nó hoạt động như file isAuthenticated.php, nhưng không nếu người dùng không phải là admin thì nó sẽ vẫn tiếp tục thực hiện các dòng ở dưới mà không chuyển hướng luôn như mình nghĩ. Đến đây ta có thể lấy được token và chiếm được quyền của admin và phần phía ta chỉ cần bypass upload shell một chút là xong nên mình sẽ không trình bày nữa<br>
Mình cũng có viết 1 đoạn code bằng go để khai thác tự động link ở [đây](https://github.com/n00b-bot/Golang/blob/main/securecode.go)<br>
*Cách dùng* 
1. Đầu tiên bạn cần vào link reset password và nhập admin rồi gửi để tạo lại token 
2. Vào file thay đổi password và địa chỉ máy cùng với cổng 
3. Chạy lệnh nc -lnvp + số cổng bạn chọn
4. Chạy file và hưởng thụ
# Kết lại 
Đây là bài khá là hay đối với mình và mình cũng tập viết được mã khai thác bằng ngôn ngữ yêu thích mới của mình là Go. Tuy nhiên code mình viết vẫn chưa tận dụng hết được sức mạnh của Go là currency để tăng tốc độ khai thác khi ta phải dùng Sqli Bool-base