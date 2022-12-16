**I.Giới thiệu**
   - Android P vừa mới ra mắt cùng với vo vàn các tính năng cải tiến, và cũng có nhưng tính năng lần đâu tiên xuất hiện, điển hình nhất là Fingerprint Dialog. 
   - Dialog xác nhận dấu vân tay người dùng, nó hoạt động như trình mở khoá vân tay.
   - Mình sẽ giới thiệu về nó ngay sau đây

**II.Giới thiệu Fingerprint Dialog**
1. Điều kiện cần dùng
    - Android Min version 23
    - Đã được setting lock Fingerprint
2. Tính chất và mục đích
    - Dialog thông báo cần xác thực vân tay, giống như việc xác thực mở khoá màn hình.
    - Sử dụng trong các trường hợp cần xác thực bảo mật cho các tính năng trong app 
    - Các tính chất
        - Có thể nhấn 'Hủy' để bỏ qua hộp thoại
        - Có thể thực hiện xác thực vân tay thành công
        - Có thể thực hiện nhận dạng vân tay không được công nhận
        - Có thể thử nhận dạng dấu vân tay quá nhiều lần
 ![](https://images.viblo.asia/289197cc-49d6-4d84-9da0-8c618713d88d.png)
 
 3. Các sử dụng
    - Khởi tạo
        ```
            val dialog = FingerprintDialog.Builder()
                .setTitle(getString(R.string.dialog_title))
                .setSubtitle(getString(R.string.dialog_subtitle))
                .setDescription(getString(R.string.dialog_description))
                .setNegativeButton(getString(R.string.dialog_negative_text), mainExecutor, DialogInterface.OnClickListener { dialogInterface, i -> })
                .build(this) 
        ```
   
         - setTitle: Tiêu đề của dialog, hiển thị trên đầu
         - setSubtitle: Thiết lập phụ đề Dialog
         - setDescription: Mô tả dialog
         - setNegativeButton: lắng nghe sự kiện OnClickListener
         - ![](https://images.viblo.asia/ae762f83-059e-4c8c-a47f-8f05729d3410.png)

   - Lắng nghe sự kiện
       - OnAuthenticationError: 
           - Hàm này sẽ được gọi khi xảy ra lỗi không thể khắc phục được. 
           - Việc chứng thực đã kết thúc mà không thành công. Callback sẽ được cung cấp một mã lỗi (Int) để xác định nguyên nhân của lỗi, cùng với thông báo lỗi (CharSequence). 
           - Chúng ta có thể sử dụng hai điều này để cho phép người dùng biết tại sao việc xác thực đã thất bại. 
           - Mã lỗi được trả về tại thời điểm này sẽ là:
               - FINGERPRINT_ERROR_CANCELED : Thiết bị bị khóa hoặc một số thao tác khác đã diễn ra
               - FINGERPRINT_ERROR_HW_NOT_PRESENT: Thiết bị không có cảm biến dấu vân tay
               - FINGERPRINT_ERROR_HW_UNAVAILABLE: Phần cứng thiết bị hiện không khả dụng
               - FINGERPRINT_ERROR_LOCKOUT: Quá nhiều lần thử dấu vân tay đã được thực hiện, điều này xảy ra sau 5 lần thất bại. Người dùng sẽ có thể thử lại sau 30 giây
               - FINGERPRINT_ERROR_LOCKOUT_PERMANENT: Đã phát hiện quá nhiều lỗi FINGERPRINT_ERROR_LOCKOUT, có nghĩa là xác thực dấu vân tay bị khóa
               - FINGERPRINT_ERROR_NO_FINGERPRINTS: Lỗi này sẽ bị ném ra khi người dùng không có dấu vân tay được đăng ký trên thiết bị
               - FINGERPRINT_ERROR_NO_SPACE: Bỏ qua khi không có đủ không gian lưu trữ trên thiết bị để hoàn tất thao tác được yêu cầu
               - FINGERPRINT_ERROR_TIMEOUT: Lỗi này xảy ra khi yêu cầu xác thực đã được mở quá lâu. Mặc dù điều này phụ thuộc vào thiết bị / nền tảng, nhưng thường khoảng 30 giây
               - FINGERPRINT_ERROR_UNABLE_TO_PROCESS: Bộ cảm biến không thể xử lý hình ảnh dấu vân tay mà nó nhận được
               - FINGERPRINT_ERROR_USER_CANCELED: Người dùng huỷ quy trình xác thực vân tay
               - FINGERPRINT_ERROR_VENDOR : Lỗi cụ thể của nhà cung cấp mà nhà cung cấp có thể sử dụng để cung cấp lỗi cụ thể nếu một trong những điều trên không áp dụng được

        - onAuthenticationHelp: 
            - Việc này sẽ được gọi khi có lỗi phục hồi xảy ra trong quá trình xác thực. 
            - Mã lỗi được trả về tại thời điểm này sẽ là:
                - FINGERPRINT_ACQUIRED_IMAGER_DIRTY: Trả lại khi dấu vân tay đã lấy được quá bẩn để đọc, nhắc người dùng thử làm sạch bộ cảm biến của chúng
                - FINGERPRINT_ACQUIRED_INSUFFICIENT: Điều này có thể do một vài lý do nhưng được sử dụng như một loại chung cho khi hình ảnh không đủ để thực hiện chứng thực
                - FINGERPRINT_ACQUIRED_PARTIAL: Chỉ phát hiện một dấu vân tay một phần, tại thời điểm này bạn sẽ nhắc người dùng thử đặt tay theo chiều khác
                - FINGERPRINT_ACQUIRED_TOO_FAST: Người dùng di chuyển ngón tay xung quanh cảm biến quá nhanh, vào thời điểm này bạn sẽ nhắc nhở người dùng thử lại với tốc độ thấp hơn
                - FINGERPRINT_ACQUIRED_TOO_SLOW: Dấu vân tay không thể đọc được vì thiếu sự chuyển động ngón tay

        - onAuthenticationSucceeded:
            - Khi quá trình xác thực thành công
            - Tại thời điểm này chúng ta sẽ nhận được một thể hiện của một AuthenticationResult mà chúng ta có thể sử dụng để điều chỉnh giao diện của chúng ta.
        
        - onAuthenticationFailed:
            - Quá trình xác thực không thành công do dấu vân tay không được nhận dạng

    - Authentication (show dialog)
        - Khi đã khởi tạo và thiết lập các sự kiện chúng ta tiến hành kích hoạt chúng
            ```
            dialog.authenticate(cancellationSignal, executor, callback)
            ```
        
        
 
            - cancellationSignal: được sử dụng để hủy bỏ quá trình xác thực tại một số điểm trong vòng đời 
            - executor: được sử dụng để xử lý việc thực hiện các sự kiện 
            - callback: được sử dụng để nhận các sự kiện được kích hoạt trong quá trình xác thực
    
**IV.Kết Thúc**
- Kết quả sử dụng
    - Tằng tính bảo mật của app 
    - Tuỳ biến bảo mật vào từng chức năng
    - Đơn giản dễ dùng
    - Tăng tính cá nhân hoá cho app.