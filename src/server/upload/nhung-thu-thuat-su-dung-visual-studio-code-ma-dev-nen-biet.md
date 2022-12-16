Như các bạn đã biết, Visual Studio Code là một text editor khá phổ biến và được rất nhiều dev sử dụng . Cá nhân mình cũng sử dụng từ khi mới bập bẹ tập code :sweat_smile: , ấy vậy mà còn quá nhiều tiện ích và thủ thuật đơn giản nhưng lại tối ưu kha khá thời gian cũng như công sức .
Vậy nên hôm nay mình xin phép tổng hợp một số tricks hay tính năng cần thiết mà developer nên biết để việc code hiệu quả hơn. :v 

# Zen Mode
Zen mode là chế độ giúp bạn tránh phân tâm trong quá trình code, khi bật Zen Mode, tất cả những phần dư thừa như sidebar hay tool box đều được loại bỏ, chỉ để lại màn hình code ở chính giữa giúp bạn tập chung hơn.

Bạn có thể bật Zen Mode bằng cách chọn  **View > Appearance > Zen Mode**

![](https://images.viblo.asia/c0a688ac-5100-45a0-b955-29275c004b91.png)

# Split View
Khi bạn làm một việc cần sử dụng đồng thời 2 hoặc nhiều file cùng lúc, hoặc đơn giản muốn kiểm tra sự thay đổi , giống hay khác nhau giữa 2 files thì việc chuyển qua lại các tab khá là phiền nhiễu, mất thời gian, đôi khi còn xảy ra nhầm lẫn.

Visual Code đã giúp ta giải quyết vấn đề này bằng cách cho phép ta chia màn hình thành 2 hoặc nhiều hơn để phục vụ việc multitasking. 

Bạn có thể dùng Split View bằng cách chọn **View > Editor Layout > Split up/down/left/right** hoặc có thể thao tác nhanh hơn bằng cách giữ chuột kéo 1 tab cần split sang rìa bên phải màn hình 

![](https://images.viblo.asia/14c73cfa-7a4c-4f63-8489-fc01774b2859.png)

# Command Palette
Command Palette cho phép bạn truy cập tới các commands của visual code chỉ bằng một vài phím tắt. 

Để mở Command Palette , bạn cần gõ tổ hợp phím **Ctrl + Shift + P**, tiếp đến bạn có thể gõ những keywords cần thiết để tìm kiếm commands danh sách commands.

![](https://images.viblo.asia/68e3153d-3232-46f3-8220-ebedc07d5a9b.png)

# Change JSON Setting
Đây là tiện ích khá thú vị của Visual Code, cho phép bạn chỉnh sửa giá trị mặc định của editor hoặc một extentions bất kì bạn đã cài đặt.

Đầu tiên truy cập **Command Palette** như mình đã nói ở trên và chọn **Preferences: Open Default Settings (JSON)**. (đây là setting mặc định của VS)

Tiếp tục truy cập **Command Palette** và chọn **Preferences: Open Settings (JSON)** (Đây là phần setting chỉnh sửa ) và kéo tab qua góc phải màn hình để chia đôi màn xem cho dễ. :roll_eyes: :grin:

![](https://images.viblo.asia/40fe613d-9c34-4f65-bf68-1b29fa1aacbe.png)

Như hình trên là mình đã chỉnh sửa setting của **php-cs-fixer** ( một extention giúp chỉnh sửa convention code php theo đúng chuẩn), cụ thể là :
* `"php-cs-fixer.onsave": true` :  tự động chỉnh code cho đúng convention khi save
* `"php-cs-fixer.formatHtml": true` : tùy chọn tự động format code html
* ... vân vân và mây mây
# Keyboard Shortcut
Phím tắt giúp đỡ ta rất nhiều trong việc lập trình, giảm nhiều thời gian thao tác và tạo cảm giác tiện lợi cho người sử dụng hơn.
Đầu tiên, bạn có thể truy cập danh sách các phím tắt bằng cách "sử dụng" phím tắt  **Ctrl + K + S** :sweat_smile:

![](https://images.viblo.asia/4e59a12e-8259-4eda-bd2f-148804385662.png)

### Một số phím tắt cần thiết cho developer:
* **Ctrl + Space** : Phím tắt này giúp bạn hoàn thành code một cách nhanh gọn hơn, khi sử dụng, một bảng lựa chọn sẽ hiển thị để giúp bạn hoàn thành mẩu code đang dở, rất thích hợp cho những người mới bắt đầu khi không nhớ hàm hoặc "nhớ mang máng" :sweat_smile:
* **Ctrl + ?** :  Comment dòng code hoặc đoạn code theo ý muốn
* **Ctrl + Shift + F** :  Tìm kiếm trên tất cả các files
*  **Ctrl + D** : Tìm trong file một đoạn text bất kì và thao tác với chúng
*  **Ctrl + Shift + T** : Mở lại những tab đã đóng
* **Ctrl + Alt + R** : Reload lại visual code
* **Ctrl + Backspace** : Xóa từ vừa mới nhập, thật ra đây là tính năng bạn có thể áp dụng ở bất cứ đâu. :laughing:
* **Ctrl + Shift + Right/Left Arrow** : Bôi đen theo đơn vị là chữ (mặc định là theo kí tự )
* **Ctrl + Shift + D** : Nhân đôi dòng chỉ định
*  **Ctrl + Home** : Di chuyển con trỏ chuột tới đầu file
*   **Ctrl + End** : di chuyển con trỏ chuột tới cuối file
*   **Alt + Up/Down Arrow** : Di chuyển dòng lên hoặc xuống
*   
....Và còn rất nhiều phím tắt hữu dụng khác nữa, nhưng mình nghĩ  chỉ cần quen tay những phím trên đây cũng đã giúp dev tiết kiệm được kha khá thời gian lập trình rồi. :grin: 

# Tổng kết
Trên đây là những chia sẻ của mình về một số tips nhỏ khi sử dụng VS trong lập trình, nếu có gì sai xót , mong được mọi người góp ý, xin cảm ơn. (bow) :kissing: