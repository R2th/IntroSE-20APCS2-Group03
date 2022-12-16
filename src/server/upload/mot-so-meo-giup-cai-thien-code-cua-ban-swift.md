*Bảng cheat các mẹo dev iOS hữu ích; enums, tùy chọn, toán tử ternary, và nhiều hơn nữa*

![](https://images.viblo.asia/d19381b6-f184-41d5-b504-c140fe6ab5e9.jpeg)

Mình đã tổng hợp một bảng cheat về một số mẹo và thủ thuật Swift hữu ích mà chúng ta sử dụng để tạo các ứng dụng iOS của mình.
Mình hy vọng rằng bạn có thể tìm thấy một cái gì đó hữu ích trong danh sách này, nếu bạn có bất kỳ đề xuất hoặc tìm thấy bất kỳ vấn đề, hãy bình luận cho mình biết.
# 1. Optional Unwrapping
{@embed: https://gist.github.com/gavinShr/a53b47422c4ee31592afd9aa2a893be2#file-optionalunwrapping-swift}

Unwrap optional các biến và xử lý tất cả lỗi trong một dòng với option 2.
Nếu cả hai giá trị option không có giá trị bằng nil, hàm sẽ tiếp tục phần xử lý dưới của chúng ta (Reached). Nếu một trong hai biến là nil, chúng sẽ quay trở lại và thoát khỏi phạm vi của hàm này.
# 2. Ternary Operators (Toán tử ba ngôi)
{@embed: https://gist.github.com/gavinShr/9d25877db2a82f8102c4917149565d9f#file-ternaryoperators-swift}

Nén logic điều kiện của bạn thành một dòng với các toán tử hữu ích này. Đặt giá trị của một biến tùy thuộc vào trạng thái.
Ngoài ra, Bạn có thể lồng các toán tử này cho gọn, nếu hơi khó đọc code.
```
//double stack 
let ternaryDouble = conditional ? true : (conditional2 ? true : false)
//triple stack
let ternaryTriple = conditional ? true : (conditional2 ? true : (conditional3 ? true : false))
```
# 3. Generics
{@embed: https://gist.github.com/gavinShr/d8ca4539dd72d84af550ae9549ba8cfd#file-generics-swift}

Lập trình Generics, như được định nghĩa bởi Google, là một phương pháp để viết các hàm và kiểu dữ liệu trong khi đưa ra các giả định tối thiểu về loại dữ liệu đang được sử dụng.
Sử dụng generic cho phép trừu tượng hóa tạo ra code clean hơn với ít lỗi hơn.
Như bạn có thể thấy, bằng cách chọn option 2, chúng ta có thể viết một hàm (so với nhiều) có thể xử lý một số loại đầu vào khác nhau.
# 4. Generate một UIColor thông qua Hex Code
Tạo tên tệp UIColor + Extended.swift có chứa đoạn mã sau:
{@embed: https://gist.github.com/gavinShr/c54b5b486cdaa8dc170cf401d513665b#file-uicolor-extensions-swift}

Wow, bây giờ chúng ta có thể tạo màu thông qua mã hex, như thế này:
```
let green = UIColor(hex: 0x1faf46)
let red = UIColor(hex: 0xfe5960)
let blue = UIColor(hex: 0x0079d5)
```
# 5. Sử dụng Extensions
{@embed: https://gist.github.com/gavinShr/2f76ecb2d71e48d0fd6ff6aba688eba0#file-uibutton-extensions-swift}

Tạo một tệp mở rộng một lớp mà bạn thường xuyên sử dụng lại.
Trong trường hợp này, tôi đã chọn UIButton để chứng minh thêm chức năng nhấn tùy chỉnh.
Bây giờ, bất cứ nơi nào chúng ta thêm một UIButton, chúng ta có thể gọi chức năng báo chí để bắt chước một hình ảnh động ra vào tỷ lệ, như thế này:
```
let myButton = UIButton()
myButton.press() {
    //handle completion
}
```
# 6. Funnel Multiple Back-End/Function Calls thông qua một lớp
Hãy tưởng tượng bạn có một chức năng mà bạn cần gọi bên trong ứng dụng của mình để cập nhật dữ liệu cục bộ của bạn như thế này:
```
FAB.updateData()
```
Trong ví dụ này, FAB đại diện cho Google Firebase. Bây giờ, hãy tưởng tượng chúng ta muốn xé Firebase và thay thế nó bằng một back end thay thế, mẹo này sẽ tạo ra một kịch bản nhanh chóng và đơn giản như vậy.
Khi bạn đang viết code, nếu bạn thấy mình thực hiện một số lệnh call đến cùng một chức năng trên ứng dụng của mình, hãy tạo một class mà Funnel Phác các cuộc gọi của bạn thành một chức năng, sau đó gọi code network của bạn.
Ví dụ:
{@embed: https://gist.github.com/gavinShr/5d7a8ba7572609189db7a715cc1cf281#file-networkingexample-swift}

Trong tùy chọn 1, nếu chúng ta muốn thay thế Firebase, chúng ta sẽ cần phải thực hiện ba lệnh call. Trong tùy chọn hai, chúng ta chỉ cần cập nhật class network thôi.
# 7. Guard Let
Sử dụng các câu lệnh bảo vệ là hữu ích cho nhiều hơn là chỉ các tùy chọn hủy ghép nối. Bạn có thể sử dụng các câu lệnh này để kiểm tra xác thực có điều kiện, đơn giản để chuyển điều khiển chương trình ra khỏi phạm vi theo các điều kiện nhất định.
Ví dụ:
{@embed: https://gist.github.com/gavinShr/867a02c0314273d1c88053e9a3692056#file-guardstatements-swift}

Tạm thời mình xin kết thúc tại đây. Hi vọng có thể giúp các bạn code tốt hơn. Chờ phần 2 cùng mình nhé.

Tham khảo: [15 Quick Tips to Improve Your Swift Code](https://medium.com/better-programming/15-quick-tips-to-improve-your-swift-code-ed390c99afcd)