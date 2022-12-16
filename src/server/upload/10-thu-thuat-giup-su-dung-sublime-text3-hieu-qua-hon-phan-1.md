![](https://images.viblo.asia/d251f10d-581a-4f4b-a35a-f3ec15d21482.png)

**[Sublime Text 3](https://www.sublimetext.com/)** là một trong những trình soạn thảo phổ biến nhất hiện nay. So với Atom hay VSCode, Sublime chiếm ưu thế hơn hẳn nhờ tốc độ nhanh, giao diện đơn giản, và có đầy đủ các tính năng mạnh mẽ. Để khai thác hết khả năng của Sublime, bạn nên lưu ý một số thủ thuật “nhỏ mà có võ” dưới đây.
Note: Bạn nên cài [Package Control](https://packagecontrol.io/) để quản lý các phần mở rộng dễ dàng hơn.
## 1. Tận dụng phím tắt
Dùng phím tắt để thực hiện tác vụ luôn nhanh hơn dùng chuột hay menu. Bạn không nhất thiết phải học thuộc lòng mọi phím tắt này, mà chỉ cần nhớ là chúng có tồn tại để dễ bề “lục lọi” khi cần.


| Chung ||
| -------- | -------- |
| Ctrl+Shift+P | Mở Command Prompt    |
|Ctrl+K, Ctrl+B  |Ẩn/hiện side bar  |
| **Chỉnh sửa**  |     |
|Ctrl+Shift+↑    |Dịch chuyển dòng/vùng chọn lên 1 dòng   |
|Ctrl+Shift+↓|Dịch chuyển dòng/vùng chọn xuống 1 dòng    |
| Ctrl+L  |Chọn dòng hiện tại, tiếp tục nhấn Ctrl+L để chọn dòng tiếp theo|
| Ctrl+D |Chọn một từ, tiếp tục nhấn Ctrl+D để chọn những từ giống vậy   |
|Ctrl+Shift+D  |Nhân đôi dòng hiện tại  |
| Ctrl+M  | Đi tới dấu đóng ngoặc gần nhất - Lặp lại để đi tới dấu mở ngoặc  |
| Ctrl+Shift+M   |Chọn toàn bộ nội dung trong dấu ngoặc |
| Ctrl+Shift+K  | Xóa toàn bộ dòng  |
|Ctrl+]  | Lùi dòng hiện tại vào trong 1 tab |
| Ctrl+/  | Comment/Un-comment dòng/vùng chọn hiện tại |
|**Điều hướng/di chuyển**  |   |
|Ctrl+P    |Mở nhanh file bằng tên |
| Ctrl+R| Đi đến kí tự cần tìm|
| Ctrl+;  | Đi đến từ trong file hiện tại  |
| Ctrl+G   | Đi đến dòng trong file hiện tại  |
|** Tìm kiếm và thay thế  ** |  |
|Ctrl+F    | Tìm   |
|Ctrl+H| Thay thế    |
| Ctrl+Shift+F  | 	Tìm trong các file đang mở   |
| **Tabs**    |   |
|Ctrl+Shift+T    |Mở tab đã đóng gần nhất   |
| Ctrl+Tab |Di chuyển qua lại giữa các tab   |
| Ctrl+W  | 	Đóng tab hiện tại   |
| Alt+[NUM]  | Đi tới tab thứ [NUM]   |
| Alt+Shift+5  | Chia màn hình thành grid gồm 4 groups  |
|Alt+Shift+8   | Chia màn hình thành 2 hàng  |
| Ctrl+[NUM]     |Đi tới group thứ [NUM]  |
| Ctrl+[NUM]    | Chuyển file tới group thứ [NUM]  |
| **Bookmarks**  |     |
| Ctrl+F2    |Bookmarks/Bỏ bookmarks   |
| F2   | Đi tới bookmarks tiếp theo     |
| Shift+F2  |Đi tới bookmarks trước     |
| Ctrl+Shift+F2    | Xóa tất cả bookmarks  |
|**Thao tác với văn bản**    |   |
| Ctrl+K, Ctrl+U   |Chuyển vùng chọn sang chữ in hoa   |
|Ctrl+K, Ctrl+L   | Chuyển vùng chọn sang chữ thường    |
## 2. Tô màu mã nguồn với các gói mở rộng ngôn ngữ
Sublime hỗ trợ đến hơn 50 ngôn ngữ lập trình. Tuy nhiên, nếu làm việc với Angular, Vue, React hay những framework/ngôn ngữ mới, bạn cần phải cài đặt thêm các phần mở rộng để Sublime có thể hiểu và tô màu mã nguồn. Tùy nhu cầu cụ thể mà bạn có thể tìm thấy plugin tương ứng trên Package Control.Tôi liệt kê dưới đây những plugin thông dụng nhất.
###    Ngôn ngữ
1. [Babel (React)](https://packagecontrol.io/packages/Babel): bên cạnh hỗ trợ các tính năng mới trong ES6, ES7, plugin này cũng hỗ trợ tô màu cho JSX

1. [Better CoffeeScript](https://packagecontrol.io/packages/Better%20CoffeeScript)
1. [Flow](https://packagecontrol.io/packages/Flow)
1. [TypeScript](https://packagecontrol.io/packages/TypeScript)
  ### Thư viện
1. [AngularJS](https://packagecontrol.io/packages/AngularJS)
1. [Vue Syntax Highlight](https://packagecontrol.io/packages/Vue%20Syntax%20Highlight)
1. [EmberScript](https://packagecontrol.io/packages/EmberScript)
## 3.Emmet
Với lập trình viên front-end, Emmet là plugin không thể thiếu rồi. Emmet cho phép bạn viết HTML “nhanh như chớp” bằng cách dùng biểu thức mô tả HTML, sau đó Emmet sẽ mở rộng biểu thức này. Chẳng hạn, khi bạn viết #content>p.text*5>lorem, Emmet sẽ “úm ba la” thành:

![](https://images.viblo.asia/afaab404-a939-4615-a2a0-e2525c65afa6.gif)

Không chỉ hỗ trợ làm việc với HTML, Emmet cũng biểu thức HTML bên trong JSX. Để tìm hiểu thêm về cách viết biểu thức, bạn có thể tham khảo [ở đây](https://docs.emmet.io/).
## 4.Các gói snippets hữu ích
**[JavaScript & NodeJS Snippets](https://packagecontrol.io/packages/JavaScript%20%26%20NodeJS%20Snippets)**, như tên gọi, bao gồm các snippets dành riêng cho JavaScript, giúp bạn gõ một đoạn mã thông dụng nhanh hơn. Ví dụ, thay vì gõ `document.querySelector('selector');`, bạn chỉ cần gõ `qs`, nhấn `Tab`, và Sublime sẽ làm phần việc còn lại giúp bạn. Hoặc `gi` như ví dụ dưới đây.

![](https://images.viblo.asia/f6ca1d99-4ded-4a4a-a4c7-e43c3caad6c5.gif)

Nếu thấy Emmet hơi phức tạp, bạn có thể sử dụng một plugin khác tương tự là **[HTML Snippets](https://packagecontrol.io/packages/HTML%20Page%20Snippets)**. Plugin này có ít tính năng hơn, nhưng dễ sử dụng hơn.

![](https://images.viblo.asia/15132dda-8616-46fa-b1c5-8dfd02002455.gif)

Bên cạnh đó, cũng đừng quên những gói snippets khi làm việc với các thư viện/framework, chẳng hạn như **[ReactJS Snippets](https://packagecontrol.io/packages/ReactJS%20Snippets)**, **[AngularJS Snippets](https://packagecontrol.io/packages/AngularJS%20Snippets)**, **[VueJS Snippets](https://packagecontrol.io/packages/Vuejs%20Snippets)**…

Với CSS, bạn chỉ cần cài **[CSS Snippets](https://packagecontrol.io/packages/CSS%20Snippets)** là có hỗ trợ CSS, LESS, SASS và Stylus.
## 5.Định dạng mã nguồn
![](https://images.viblo.asia/4a63cf4c-00bb-441a-a6fb-23ecad2c42b3.png)

Bằng cách sử dụng **[HTMLBeautify](https://packagecontrol.io/packages/HTMLBeautify)**, **[CSS Format](https://packagecontrol.io/packages/CSS%20Format)**, **[Pretty JSON](https://packagecontrol.io/packages/Pretty%20JSON)** hoặc **[jsfmt](https://packagecontrol.io/packages/jsfmt)**, bạn có thể chọn tự động định dạng mã nguồn khi lưu files. Nếu là fan của **[Prettier](https://prettier.io/)**, bạn đừng quên plugin **[JsPrettie](https://packagecontrol.io/packages/JsPrettier)**r.

## Kết luận
Trong phần 1 này tôi đã giới thiệu tới các bạn một số thủ thuật trên, mong các bạn sẽ nâng cao hiệu suất làm việc. Đừng quên follow để xem phần 2 sẽ có thêm những gì nhé.