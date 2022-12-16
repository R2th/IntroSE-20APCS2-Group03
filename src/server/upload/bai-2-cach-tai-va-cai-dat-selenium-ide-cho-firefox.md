## Cài đặt Selenium IDE
Cái bạn cần là:

•	Mozilla Firefox

•	Kết nối mạng hoạt động

Nếu bạn vẫn chưa có Mozilla Firefox, bạn có thể tải từ http://www.mozilla.org/en-US/firefox/new.
Selenium IDE làm việc trên tất cả các phiên bản chính nhưng chúng tôi khuyến khích bạn nên sử dụng 47.0.0 trở đi vì chúng ổn định hơn.
Selenium IDE không còn tương thích với Firefox 55 trở lê. Để nó có thể làm việc, có 2 cách thức như sau:

•	Downgrade FireFox xuống phiên bản cũ hơn

•	Sử dụng phiên bản Firefox  54 Portable

**Bước 1)**

Chạy Firefox và di chuyển đến https://addons.mozilla.org/en-US/firefox/addon/selenium-ide/. Click vào Add to Firefox

![](https://images.viblo.asia/f6f43132-250c-45da-b759-845de8ed70e0.png)

**Bước 2)**

Đợi cho đến khi Firefox hoàn thành tải sau đó click vào “Install.”
![](https://images.viblo.asia/c7d62027-af2f-46e1-b739-22b50a3ed07a.png)

**Bước 3)**

Đợi cho đến khi việc cài đặt hoàn thành. Trên cửa sổ pop-up, click vào “Restart Now”
![](https://images.viblo.asia/49d23a2c-1b03-4e6a-9bf6-a03a80b03960.png)

**Bước 4)**

Sau khi Firefox khởi động lại, chạy Selenium IDE sử dụng 1 trong 2 cách sau:

•	Bằng cách nhấn tổ hợp phím Ctrl+Alt+S

•	Bằng cách click vào Firefox menu button> Developer>Selenium IDE

![](https://images.viblo.asia/b28b896f-4bc2-4318-a398-bd2a8138ea48.png)

**Bước 5)**
Selenium IDE sẽ chạy ra như bên dưới:

![](https://images.viblo.asia/11b0e784-68c7-4464-ad20-8aadcbd62542.png)

## Cài đặt Firebug
Firebug là một add-on của Firefox mà chúng tôi sẽ sử dụng để kiểm tra các phần tử HTML của ứng dụng web đang được kiểm tra. Nó sẽ cung cấp cho chúng ta tên của phần tử mà lệnh Selenese sẽ tác động.

**Bước 1**

Sử dụng Firefox để di chuyển đến trang tải Firebug ( https://addons.mozilla.org/en-US/firefox/addon/firebug/) rồi click vào link tải.

![](https://images.viblo.asia/265a62a9-51f5-47d0-a56a-56f29d33d5e4.png)

**Bước 2**

Đợi Firefox cho đến khi nó hoàn thành tải add-on này. Khi đó sẽ hiển thị 1 dialog, click vào “Install Now”

![](https://images.viblo.asia/ddd9f9b4-77e0-45b8-800d-95c31431cb08.png)

**Bước 3**

Đợi cho đến khi cài đặt kết thúc. 1 popup xuất hiện với nội dung:”Firebug has been installed successfully”. Bạn có thể đóng popup này đi.

![](https://images.viblo.asia/6abe01cd-1e1f-4d69-a500-9cd729a083e0.png)

*Lưu ý:* Trong trường hợp bạn không nhìn thấy pop-up trên thì cũng đừng lo lắng nhé! Pop-up này xuất hiện chỉ trong vài giây rồi tự mất thôi.
Bạn không cần phải khởi động lại Firefox sau khi cài đặt Firebug.

**Bước 4**

Launch Firebug by doing either of these two methods:
Chạy Firefox bằng 1 trong 2 cách sau:

•	Nhấn F12

•	Click vào nút Firebug ở góc trên cùng bên phải của màn hình Firefox

![](https://images.viblo.asia/5d00d49e-0cba-4371-9fb6-ad3b7f6789f1.png)

**Bước 5**

Firebug chạy ở phần dưới của Firefox như sau:

![](https://images.viblo.asia/9524d6db-61bd-4fa0-9f9d-c8e30492523d.png)

*Lưu ý:* Firebug Extension không còn được phát triển và bị phản đối như đề cập trên trang firebug.

![](https://images.viblo.asia/49347fa1-c0e3-47c1-bd35-f3c9a2839b99.png)

Chúng tôi khuyến khích sử dụng Firefox Dev Tools
Bạn có thể truy cập Firefox Dev Tools bằng cách làm theo các bước sau:

•	Mở Firefox

•	Nhấn tổ hợp Ctrl + Shift + "I"


![](https://images.viblo.asia/784ac612-052c-4fc9-b2d9-3592831e8c2f.png)

*Lưu ý:* Lợi ích của việc sử dụng Firebug over DevTools trong Firebug là bạn có thể sao chép trực tiếp XPath của WebElement để có thể sử dụng trong Selenium. Do đó chúng ta có thể sử dụng nó trong tutorials của chúng ta.

## Plugins
Selenium IDE có thể hỗ trợ các Firefox add-ons hay plugins bổ sung được tạo bới người dùng khác. Bạn có thể xem ở đây danh sách các Selenium add-ons có sẵn cho đến nay. Chỉ cài đặt chúng khi bạn làm việc với Firefox add-ons khác.
Mặc định Selenium IDE đi kèm với 4 plugins sau:

1. Selenium IDE: C# Formatters
2. Selenium IDE: Java Formatters
3. Selenium IDE: Python Formatters
4. Selenium IDE: Ruby Formatters

4 plugins này được yêu cầu bởi Selenium IDE để chuyển đổi Selenese sang các định dạng khác.

Plugins tab chỉ ra danh sách tất cả các add-on bạn đã cài đăt, cùng với đó là con số phiên bản và tên người tạo cho mỗi add-on.

![](https://images.viblo.asia/84356931-8b22-4d0c-8695-79f4b97118cd.png)

## User Extensions
Selenium IDE có thể hỗ trợ phần mở rộng của người dùng để cung cấp các tính năng nâng cao. Tiện ích mở rộng của người dùng ở dạng tệp JavaScript. Bạn cài đặt bằng cách xác định đường dẫn tuyệt đối của chúng ở 1 trong 2 hộp thông báo Options.

•	Selenium Core extensions (user-extensions.js)

•	Selenium IDE extensions

![](https://images.viblo.asia/cfcb3b95-b221-4ca9-aacd-7ae2149894f8.png)

Bạn sẽ có thể tìm thấy hàng nghìn user extensions [ở đây](https://www.seleniumhq.org/download/)


Nguồn: https://www.guru99.com/install-selenuim-ide.html