Dạo quanh Viblo không thấy bài nào về OTP nên mình cũng muốn tìm hiểu vài điều về tính năng này và note lại đây biết đâu sau này cần dùng đến.

OTP là viết tắt của từ One Time Password, và đúng như tên gọi dịch từ nghĩa đen của nó, bạn chỉ có thể sử dụng mật khẩu này một lần duy nhất . Định nghĩa về OTP có rất nhiều , bạn có thể google ra rất nhiều kết quả cả tiếng Anh lẫn tiếng Việt nên mình không đi sâu giải thích định nghĩa OTP là gì và nó được dùng như thế nào . Mình muốn đi sâu vào các kịch bản có thể xảy ra để test chức năng OTP và giải thích theo ý hiểu của mình, Let's enjoy ^^~

Scenarios to Test OTP (One-Time Password)

1) OTP should be generated within time period.

OTP chỉ được sử dụng một lần và bạn cần xem xét đến khía cạnh thời gian khi sử dụng chức năng OTP, bao gồm:
+ Thời gian OTP được tạo ra , chắc hẳn người dùng không muốn chờ đợi quá lâu sau khi khởi động chức năng OTP
+ Thời gian OTP có hiệu lực, thời gian này phải bảo đảm bao phủ được:  thời gian OTP tạo ra + thời gian OTP gởi đến người dùng + thời gian người dùng thao tác nhập OTP để xác thực 

2) Limitations of number of OTP generation for single authentication.

Giới hạn số lần tạo OTP cho một lần xác thực: cũng như khi bạn rút tiền ở ATM, nhập sai pass quá x lần thì bị khóa thẻ hoặc mất thẻ là chuyện đương nhiên, thì khi sử dụng tính năng OTP cũng vậy, một người dùng bình thường không bao giờ cần quá nhiều OTP cho một lần xác thực của họ trừ khi họ có ý đồ xấu . Đây cũng là một kịch bản quan trọng cần test vì nó có tính bảo mật và kinh tế nữa, một số hệ thống gởi OTP đến số điện thoại qua SMS, gởi càng nhiều SMS thì càng tốn tiền rồi @_@

3) It is received only on registered Mobile Number / E-mail Address.

OTP chỉ được nhận thông qua số điện thoại hoặc địa chỉ E-mail đã đăng ký để sử dụng tính năng OTP, hãy bảo đảm rằng OTP không được gởi đến nơi nào khác.

4) Network delay for expiry of One-Time Password.

Cái này có đề cập đến ở 1 nhỉ, khi sử dụng tính năng này cần tính toán độ trễ của mạng để xác định thời gian OTP hết hạn một cách hợp lý.

5) Verify that once expired, it should not be used for any authentication.

Xác nhận rằng một khi OTP đã hết hạn, nó không nên dùng được cho bất kỳ xác thực nào nữa, hết hạn nghĩa là vô giá trị , lúc này chức năng resend OTP sẽ cần có để người dùng nhận lại OTP mới

6) Verify that once used, it should not be allowed to use again.

Xác nhận rằng một khi OTP đã được sử dụng, nó không được phép dùng lại một lần nữa, một và chỉ một lần sử dụng thành công duy nhất.

7) Verify that resend OTP functionality is working properly.

Đây là chức năng backup cần phải có cho tính năng OTP, xác nhận rằng chức năng resend OTP là hoạt động đúng giống như lần gởi OTP đầu tiên, tất nhiên kết hợp với 2) thì chức năng này cũng nên giới hạn số lần sử dụng b-)

8) Verify that once user resent the OTP, the old one should be of no use.

OK, giả sử bạn có được OTP ở lần gởi đầu tiên và khoan hãy sử dụng, sau đó bạn nhận thêm một OTP mới bằng tính năng resend OTP, hãy xác nhận rằng OTP đầu tiên bạn nhận được sẽ không sử dụng được

9) Availability of Help and Documentation Link for OTP usage.

Cuộc sống mà, đôi khi bạn biết rõ OTP là gì nhưng vẫn tồn tại đâu đó 1 số người không nắm rõ nó, hãy chắc chắn rằng hệ thống của mình có tài liệu hướng dẫn sử dụng OTP

10) Verify for Case Sensitiveness.

Khó hiểu nhỉ, sao lại có nhạy cảm với OTP ở đây :v có thể là OTP nên phức tạp 1 tí, bao gồm một dãy các ký tự chữ và số tạo ra ngẫu nhiên 

11) Check for types of characters OTP supports: Only Digits, Only Alphabets, Alphanumeric.

Kiểm tra các kiểu ký tự mà OTP hỗ trợ: Chỉ chữ số, chỉ chữ cái hoặc bao gồm số và chữ

12) How many times user can provide invalid OTP?

Xác định số lần được phép nhập sai OTP , định dò OTP hả, mơ đi nhé b-)

13) After multiple invalid try, verify that system temporarily blocks the account.

Quá số lần được phép nhập sai OTP thì phải có biện pháp ngăn chặn như khóa tài khoản, khóa chức năng OTP v...v

14) Verify that after temporary blocking of account, system does not send the one-time password.

Xác nhận rằng sau khi account đã tạm thời bị khóa thì hệ thống không được gởi OTP nữa, bị khóa rồi có gởi cũng bằng thừa thì gởi làm gì cho tốn tiền nhỉ :P

15) Provide an invalid Phone Number or E-Mail address and submit the OTP. Check the validation

Một case check invalid data thông thường, ở một số hệ thống vẫn cho phép nhập sai số điện thoại hoặc email , đơn giản là bạn sẽ không nhận được OTP thôi

16) Are the one-time password patterns are predictable?

Xem xét liệu OTP có thể dễ dàng bị đoán được hay ko ?  tất nhiên là nếu nó được tạo bởi một chuỗi số và chữ kết hợp ngẫu nhiên thì khỏi đoán , còn nếu OTP là một chuỗi từ có ý nghĩa thì... ahihi

Trên đây là một số các kịch bản test cho OTP được dịch từ http://www.testingjournals.com/otp-test-scenarios/ , cũng như tác giả, mình hy vọng các bạn có thể đóng góp thêm các kịch bản test khác dựa trên kinh nghiệm của mình , mọi ý kiến đóng góp mình cũng đều trân trọng, thanks so much ^^~