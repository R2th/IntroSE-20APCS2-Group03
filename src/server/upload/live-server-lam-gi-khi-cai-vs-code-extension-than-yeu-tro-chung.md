![Uninstall Live Server](https://images.viblo.asia/568d067b-34a7-45bd-a767-973a204df400.png)

Hôm nay là một ngày Chủ Nhật cuối tuần đẹp trời  để... code. Như bao ngày cuối tuần, mình lại ngồi vào máy, bật VS Code để vọc vạch những thứ linh tinh về web, JS các kiểu. Lâu ngày mở lại cái pet project từ thời tám hoánh nào đó mà mình viết bằng HTML, CSS, JS thuần, cái thời chưa biết React, Vue là cái beep gì, lúc đấy toàn xài cái [Live Server Extension](https://github.com/ritwickdey/vscode-live-server) để phục vụ cho việc development. Vậy mà hôm nay, vì một lý do magic nào đó mà cái extension thân yêu khi xưa không còn hoạt động nữa (hẳn là do bản cập nhật của VS Code chứ chẳng có magic gì 😄), thế là mình lên repo của tác giả để xem thì thấy 1 nùi issue tương tự kèm một đống pull request đã khá lâu nhưng vẫn chưa được review/merge, chắc tác giả đang quá bận để maintain cái extension. Vậy là mình quyết định tìm hiểu "under the hood", và thế là bài viết này ra đời để chia sẻ những gì mình biết về **Live Server** và giải pháp thay thế nếu bạn không dùng extension được.

# TL;DR

Giải pháp thay thế cho extension là:

* Cài [Node](https://nodejs.org/en/) nếu máy của bạn chưa có.
* Mở Cmd hoặc CLI của VS code, nhập `npm i live-server -g`.
* Chuyển đến thư mục cần mở server, nhập `live-server`.

Vậy là xong, thư mục của bạn đã được host lên server local với địa chỉ + port mặc định.
Nếu muốn tìm hiểu kỹ hơn thì mời các bạn đọc tiếp.

**Update**: Các bạn cũng có thể sử dụng [serve](https://www.npmjs.com/package/serve) để dễ dàng tạo một server, hỗ trợ luôn *https*.

# Hiểu công cụ của mình

Chắc nhiều bạn cũng như mình, trước giờ code web nghe nhiều người khuyên dùng VS Code, rồi nhớ cài thêm Live Server extension mà cũng chưa tìm hiểu kỹ về công cụ của mình 😄. Chuyện thường ở huyện ấy mà, tới lúc cần thì sẽ tìm hiểu thôi, mà giờ chắc là lúc rồi.

**Live Server** là một tiện ích dành cho VS Code giúp dân chơi hệ front-end đỡ khổ khi cần phải phát triển một trang web/web app tĩnh (static) hoặc độc lập với back-end (giao tiếp bằng các micro service/RESTful API). Nếu đào sâu tí vào source code, các bạn sẽ biết extension này được phát triển trên [**một bộ core cùng tên**](https://github.com/tapio/live-server), tích hợp thêm nhiều tính năng, nhưng chung quy lại vẫn xoay quanh 2 tính năng cơ bản sau:

* Cho phép gửi Http request lên các service, việc mà các bạn không thể thực hiện với giao thức `file://` vì lý do an ninh, bảo mật.
* Tự động reload lại trang khi có sửa đổi trong các file được theo dõi (watch), giúp tốc độ code tăng đáng kể.

Nếu đào sâu hơn vào chi tiết cách implement của bộ core, các bạn sẽ thấy cơ bản là tác giả xây dựng một server chạy trên local nên việc gửi request có thể được thực hiện. Ngoài ra, việc hot reload cũng được tích hợp với sự hỗ trợ của một thư viện khác gọi là **chokidar**, thư viện cung cấp một interface dễ sử dụng phục vụ việc theo dõi file và xử lý ứng với event đã quy định.

Sức mạnh của open source quả là lợi hại 👍

# Giải pháp thay thế

Ok, giờ hiểu sơ sơ cái Live Server extension của mình rồi thì việc tìm cách khắc phục cũng sẽ khả thi, hoặc chí ít cũng có cách workaround chứ không bí thế mà phải đợi ông tác giả fix cái extension của ổng, có khi tới mùa mít. Đây cũng là một trong những kỹ năng problem solving quan trọng mà dân kỹ thuật chúng ta cần.

Như đã nói trên, cái extension này cũng chỉ được phát triển dựa trên một bộ core là [**Live Server**](https://github.com/tapio/live-server), giờ chỉ cần bỏ tí tẹo thời gian ra đọc hướng dẫn sử dụng là mình setup được cái server mà không cần extension ấy mà.

* Đầu tiên, việc cần làm là cài NodeJS vì Live Server là một Node package.
* Sau khi cài Node, các bạn mở Cmd hoặc command line của VS Code để cài package Live Server bằng lệnh `npm i live-server -g`.
* Vậy là chúng ta đã cài đặt xong, từ giờ mỗi lần cần host một thư mục hoặc file nào đó, chỉ cần mở thư mục đó trong VS Code, hoặc trỏ đến đường dẫn thư mục và chạy lệnh `live-server` trong command line.

Khi cần thay đổi cấu hình server, vd như IP hay port, chỉ cần truyền thêm các đối số tương ứng vào CLI. Truy cập [repo](https://github.com/tapio/live-server#usage-from-command-line) để xem danh sách đầy đủ các đối số được hỗ trợ.
Ví dụ để thay đổi port mặc định thành 3000, và mở bằng trình duyệt Firefox sau khi server được kích hoạt:

```shell
live-server --port=3000 --browser=Firefox
```

## Kích hoạt bằng phím tắt

Tuy giải pháp thay thế đã có, nhưng sau mấy bước setup, chạy lệnh phiền phức, cái Live Server extension vẫn lợi hại hơn đúng không? Rõ ràng là vậy, chứ nếu không đâu tự nhiên mà cái extension tới 10M+ lượt tải. Tuy không hoàn toàn xịn như extension, nhưng chúng ta vẫn có thể tự đặt một phím tắt cho câu lệnh `live-server`, kèm theo cấu hình chúng ta hay dùng, xem nhé:

* Trong VS Code, bấm phím **F1**, một Command Palette sẽ hiện ra bao gồm tất cả chức năng của VS Code.
* Gõ tìm `keyboard shortcuts` và chọn **Preferences: Open Keyboard Shortcuts (JSON)**
* Nhập vào đoạn code sau để thiết lập phím tắt:
```json
{
  "key": "alt+l alt+o",
  "command": "workbench.action.terminal.sendSequence",
  "args": {
    "text": "live-server --port=3000 --browser=Firefox\u000D"
  }
}
```

Từ giờ mỗi lần muốn kích hoạt Live Server, chúng ta chỉ cần mở CLI (bấm **Ctrl + \`**) và tổ hợp phím **Alt + L, Alt + O** là xong.

# Kết

Vậy là mình đã chia sẻ xong một giải pháp để giải quyết vấn đề không sử dụng được cái extension Live Server thân yêu. Chắc hẳn nhiều bạn vẫn còn nhiều giải pháp xịn và sáng tạo hơn nhiều, nhưng nhìn chung thì quan trọng vẫn là cố gắng hiểu rõ bản chất của mọi thứ mình dùng và làm, từ cách thức, công cụ, đến code, và cuối cùng là sản phẩm, để chúng ta có thể nắm quyền kiểm soát và đưa ra những giải pháp thay thế phù hợp khi có vấn đề xảy ra.

PS: Cái ảnh để câu view thôi nha, đừng gỡ extension, biết đâu mai này tác giả quay lại fix, còn update thêm nhiều tính năng pro hơn nữa sao 😂

----
@khangnd<br>[![Github](https://images.viblo.asia/20x20/81dd12f0-a8c9-403f-ae51-27b92828ca22.png)](https://github.com/khang-nd) [![Linkedin](https://images.viblo.asia/20x20/4981766e-5e57-401a-8623-d3657a3148e5.png)](https://www.linkedin.com/in/khangnd/) [![Dev.to](https://images.viblo.asia/20x20/3921db2e-e4e5-45d7-acc8-e8b92e02d47d.png)](https://dev.to/khangnd) [![Fandom](https://images.viblo.asia/20x20/fad64df3-0be8-4481-b810-8995f18f71ea.png)](https://dev.fandom.com/wiki/User:KhangND)