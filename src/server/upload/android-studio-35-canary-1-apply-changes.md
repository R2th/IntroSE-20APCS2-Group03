Trước đây, hồi Android Studio (AS) mới giới thiệu tính năng Instant Run, mình cũng có dùng thử một thời gian nhưng thấy có lúc nó lỗi linh tinh, khá khó chịu, nên từ đó mặc định AS tải mới về là mình sẽ disable cái Instant Run này đi, khi nào thấy ổn thì chắc mới dùng lại.
Hôm trước, sau khi tải bản Android Studio 3.5 Canary 1 về máy, theo thói quen mình cũng vào setting, tìm Instant Run để disable nó đi, nhưng mà ... tìm mãi không thấy :)), mà lại thấy mấy cái button mới ở cạnh nút Run, sau đó mình lên tìm hiểu những thay đổi của bản Android Studio 3.5 Canary 1 này thì mới thấy được sự thay đổi hay ho này, được gọi là Apply Changes. Dưới đây là những thông tin về sự thay đổi này.
###  
**---------------------------**

Nguồn tham khảo: https://androidstudio.googleblog.com/2019/01/android-studio-35-canary-1-available.html
### Apply Changes
Bản Canary 1 của AS 3.5 giới thiệu bản preview của Apply Changes, sự thay thế cho Instant Run. Chúng tôi biết rằng Instant Run trước đây gây ra vấn đề cho nhiều người, và tính năng này đã không còn đảm bảo các tiêu chuẩn chất lượng của chúng tôi. Instant Run viết lại mã bytecode APK của bạn ở build time nhằm inject hooks để thay thế các class. Với một app đơn giản, điều này khá ok, nhưng đối với những app phức tạp hơn, điều này có thể làm cho thời gian build lâu hơn hoặc gây ra các xung đột giữa app của bạn và quá trình build của Instant Run. Chúng tôi đã quyết định lùi lại một bước và viết lại từ đầu. Kết quả là, Apply Changes không còn sửa APK trong thời gian build, thay vào nó, chúng tôi dựa vào runtime instrumentation, được support từ Android 8.0 để define lại các class.

Chúng tôi cũng đã có những phản hồi cho những feedback xung quanh tính unpredictability và inconsistency khi sử dụng nút Instant Run, nó sẽ tự động quyết định có khởi động lại ứng dụng của bạn hay không. Với Apply Changes, chúng tôi sẽ nhắc nhở bạn một cách rõ ràng nếu chúng tôi phát hiện ra rằng thay đổi của bạn không tương thích với Apply Changes.

Còn khá là sớm với tính năng này, nhưng chúng tôi rất muốn được nghe bất kỳ phản hồi nào có thể. Đặc biệt, nếu trước đây bạn gặp sự cố khi sử dụng Instant Run, hãy thử Apply Changes và cho chúng tôi biết ý kiến của bạn. Nếu bạn gặp phải bất kỳ vấn đề nào trong quá trình sử dụng, vui lòng gửi lỗi và file idea.log tương ứng của bạn.

Chúng tôi sẽ thông báo chi tiết hơn về Apply Changes và những gì chúng tôi đã thực hiện trong thời gian sớm nhất.

Để sử dụng Apply Changes:
* Nếu bạn muốn apply code mà không restart activity hiện tại, Click **Apply Code Changes** hoặc dùng tổ hợp phím **Ctrl+Alt+F10** (hoặc **Command+Shift+Ctrl+R** đối với macOS)
* Nếu bạn muốn apply sự thay đổi của resource và code mà không restart app, Click **Apply Change**s hoặc dùng tổ hợp phím **Ctrl+F10** (hoặc **Command+Ctrl+R** đối với macOS).

### Limitations
Apply Changes chỉ tương thích với các device chạy từ API 26 (Android 8.0) trở lên.

Giống với Instant Run, những thay đổi dưới đây sẽ không được áp dụng trừ khi restart app, bao gồm:
- Thêm hoặc xóa một class, method hoặc field
- Thay đổi manifest
- Thay đổi method signatures
- Thay đổi mofifiers của các method hoặc class
- Đổi tên class
- Thay đổi class inheritance
- Thêm hoặc xóa một resource
### Known issues
- Tốc độ khi sử dụng Apply Changes có thể chậm hơn so với Instant Run. Ưu tiên ban đầu của chúng tôi là tính ổn định, chúng tôi sẽ nâng cao hiệu năng ở các phiên bản sau
- Apply Change trong khi đang debug chỉ suppott trên API 28 (Android 9.0)
- Bạn có thể thấy các hành vi không mong muốn nếu bạn sử dụng các Custom Classloader
- Apply Changes sẽ không hoạt động trên x86_64 emulator

**------------------------**

Trên đây là những điều chính được viết trên trang chủ về bản AS mới này, còn thực tế sử dụng thì mình cảm thấy khá OK, độ ổn định và rõ ràng về những message thông báo tốt hơn hẳn so với Instant Run, có lẽ đây là một tính năng rất thú vị mà mọi người nên dùng thử.

Chúc mọi người buổi tối vui vẻ

### Thanks for reading!