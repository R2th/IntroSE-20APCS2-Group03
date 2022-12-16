# 1. Test case là gì

Test case ( Kịch bản kiểm thử ) là một tập hợp các hành động được thực thi để xác minh một function, một hệ thống phần mềm có hoạt động đúng hay không. Test case mô tả dữ liệu đầu vào (input) , hành động (action) hoặc sự kiện (event) và một kết quả mong đợi (expected result). 

Một Test case bao gồm những thành phần quan trọng sau: 
- Test case ID  - TC ID
- Function
- Test Objective 
- Pre - condition 
- Test Steps
- Expected results 
- Test result (Passed ; Failed ; Blocked ; N/A ; Pending)

Tester sẽ so sánh kết quả mong đợi với thực tế để xác định xem sản phẩm phần mềm có hoạt động theo yêu cầu cảu khách hàng hay không. 

# 2. Thực hành thôi nào.
Như phần tiêu đề ở trên thì mình sẽ thực hiện viết test case cho chức năng auto fill OTP. Vì muốn mọi người dễ hiểu thì mình sẽ triển khai từ design, spec đến TCs một cách cụ thể và chi tiết nhất. ^ ^

 **Tổng quát về chức năng** 

Một cái app nọ với chức năng login bằng số diện thoại, sau khi nhập số điện thoại xong thì hệ thống sẽ di chuyển đến mà hình nhập OTP và đồng thời hệ thống sẽ gửi OTP về số điện thoại đó để người dùng nhập confirm thì mới login thành công được. Nhưng trong trường hợp người dùng Login với chính số điện thoại trên device thì  thay vì chúng ta phải tự nhập như mọi khi, OTP sẽ auto fill luôn. Chức năng chỉ đơn giản vậy thôi nhưng chắc sẽ gặp nhiều trong thực tế. 

### i.Design :
**Note:** Đối với android thì sẽ cho auto fill nhưng iOS thì lại chỉ cho suggest thôi. 
<br> 

![image.png](https://images.viblo.asia/9f9b7c5d-a2a8-4caf-a686-ceb389b877f5.png)

### ii. Spec:

| No | Item name | Description |
| -------- | -------- | -------- 
| 1   | input OTP | - Validation : 6 ký tự, căn lề giữa  <br>  - Trường hợp   auto nhập với Android , khi sms OTP được gửi đến máy, OTP sẽ tự động fill vào ô số 1<br> - Trường hợp auto nhập với iOS: <br>  + khi sms OTP được gửi đến máy, OTP sẽ tự động show trên phần gợi ý của bàn phím với nội dung: <br> "From message <br>  xxxxxx" <br> + Khi user click vào phần trên thì OTP tự động nhập vào ô số 1<br>  + Nếu người dùng không chọn suggest OTP mà nhập từ bàn phím thì suggest phía trên sẽ mất đi <br> + Sau khi người dùng xóa OTP đã nhập thì suggest sẽ hiển thị lại. |
| 2   | Text Resent OTP     |   "Please enter your OTP <br>  If you did not receive it: **Resend** " <br> Nhấn text link "Resend" để được gửi lại OTP|
| 3   | Next     |      |
| 4   | Keyboard     | Bàn phím default của hệ thống     |

### iii. Test case : 

Dưới đây không là một template hoàn chỉnh của test case, mình đã lượt bỏ một số cột, rút gọn chỉ còn một số cột chính thôi. 


| TC ID    | Function | Test Objective |Pre-condition  |Expected results	|
| -------- | -------- | -------- | -------- | -------- |
| 1     | Auto Fill      | - Xác minh OTP sẽ được tự động hiển thị ở mục suggestion phía trên keyboard  và có thể login thành công khi người dùng nhấn chọn giá trị được suggest |- iOS<br> - Login với chính sdt của device  |1. OTP được tự động hiển thị ở mục suggestion phía trên keyboard <br> + Nội dung "From message <br>  xxxxxx" <br> 2. OTP hiển thị đúng như sms được gửi đến device <br> 3. Login thành công với OTP đó  |
| 2   |     |- Xác minh người dùng có thể login thành công khi nhập OTP bằng keyboard <br> + Nhập giá trị giống ở phần suggest|  |1. Login thành công   |
| 3  |       |- Xác minh rằng OPT ở mục suggest sẽ mất đi khi người dùng nhập OTP từ keyboard ||1. OPT ở mục suggest sẽ mất đi khi người dùng nhập OTP từ keyboard   |
| 4  |       |- Xác minh OPT ở mục suggest sẽ hển thị trở lại khi người dùng nhập OTP từ keyboard , sau đó xóa đi ||1. OPT ở mục suggest sẽ hển thị trở lại <br> 2. Khi nhấn vào phần suggest thì OTP sẽ hiển thị trên [Nhập mật mã] textbox  <br> 3. Login thành công với OTP đó   |
| 5  |       | - Xác minh OTP sẽ lại được tự động hiển thị ở mục suggestion phía trên keyboard  khi người dùng nhấn [Resent] textlink   ||1. OTP được tự động hiển thị ở mục suggestion phía trên keyboard <br> 2. OTP hiển thị đúng như sms được gửi đến device <br> 3. Login thành công với OTP đó |
| 6  |       |- Xác minh rằng OTP tự động điền vào [Nhập mật mã] textbox khi OTP được gửi đến thiết bị   |- Android <br> - Login với chính sdt của device  |1.  OTP tự động điền vào [Nhập mật mã] textbox  <br> 2. OTP hiển thị đúng như sms được gửi đến device <br> 3. Login thành công với OTP đó |
| 7  |       |- Xác minh rằng OTP mới được điền tự động vào [Nhập mật mã] textbox khi người dùng nhấn vào [Resent] textlink| |1.  OTP mới tự động điền vào [Nhập mật mã] textbox <br> 2. OTP hiển thị đúng như sms được gửi đến device <br> 3. Login thành công với OTP đó |
| 8  |      |- Xác minh rằng người dùng có thể xóa và nhập lại OTP từ keyboad ||1. Người dùng có thể xóa và nhập lại OTP từ keyboad   |
|9   |     |- Xác minh rằng OTP vẫn tự động điền/ suggest ngay cả khi người dùng tắt thông báo nhận tin nhắn của device |- Android / iOS |1. OTP vẫn tự động điền/ suggest đúng   |
|10   |     |- Xác minh rằng OTP vẫn tự động điền/ suggest đúng khi có đồng thời  tin nhắn OTP của ứng dụng khác được gửi đến device  ||1. OTP vẫn tự động điền/ suggest đúng   |
|11  |     |- Xác minh rằng OTP vẫn tự động điền/ suggest đúng mặc dùng người dùng không accept tin nhắn <br> + Đối với iOS từ 11 trở lên có hỗ trợ   | |1. OTP vẫn tự động điền/ suggest đúng   |
<br>
Đây là toàn bộ những gì mà mình muốn chia sẽ. Cảm ơn đã đọc. ^ ^
<br> 
<br>
> Tài liệu tham khảo:   [https://www.guru99.com/test-case.html]