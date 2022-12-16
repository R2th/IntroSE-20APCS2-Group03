Tác giả: ***[QuynhBC]( https://www.facebook.com/bui.congquynh)***

Xin chào các bạn. Tiếp nối bài viết đầu tiên giới thiệu sơ qua về SAP thì ở bài viết tiếp theo này mình sẽ giới thiệu cho các bạn về SAP GUI và các cấu trúc thành phần ở trong ngỗn ngữ lập trình SAP ABAP.

Bài viết 02.
### SAP GUI

Cũng giống như các ngôn ngữ lập trình khác như C, C#, Python, ... đều có IDE nơi mà nó có được môi trường để sử dụng thì SAP ABAP cũng có SAP GUI nơi mà lập trinh viên ABAP dùng để viết code.

Để tải SAP GUI : ***[tại đây](https://support.sap.com/en/offerings-programs.html)***

Sau khi download vài cài đặt thành công các bạn cần:
* Khởi động SAP GUI: click **start** => gõ **SAP LOGON** => **double click**
* Liên hệ với Basis để lấy thông tin cấu hình và tài khoản đăng nhập

 Sau khi cấu hình thành công trong System Entry Properties có thông tin dạng như sau:
 ![](https://images.viblo.asia/ec457e0e-554e-4b58-b0d8-5f2480d57e3c.PNG)

Giao diện sau khi bạn đã đăng nhập thành công
![](https://images.viblo.asia/c7f72868-9561-4508-8c55-98220efcde65.png)
![](https://images.viblo.asia/9d108074-ec39-4c24-88fd-d0cd456112bc.png)
Hãy cài đặt theo cách của mình.

### SAP ABAP

Hãy tạo cho mình một chương trình code đầu tiên.

Goto Tcode: se38 => ZPG_DEMO1 => nhấn Create.

***Note:*** Các chương trình ***nằm ngoài chương trình của SAP*** thì luôn luôn ***bắt đầu bằng đầu Z***
```
REPORT ZPG_DEMO1.

WRITE: 'Hello World!'.
```
Nhấn Ctrl + F2 (check) => Ctrl+F3 (Active) => F8 (Run) .

Kết quả sẽ được hiển thị:
![](https://images.viblo.asia/7389f1c0-479a-41ea-a8f7-d5204a8134d5.png)

Tổng kết:
* Bài viết giới thiệu về giao diện SAP GUI.
* Các thức code và khởi chạy một chương trình.

Trong bài viết tiếp theo:
* Data type, Domain, DataElement.
* Structure, Table type.
* Database.

*[Bài viết 01.](https://viblo.asia/p/abap-danh-cho-nguoi-moi-bat-dau-Qbq5QRQ3KD8)*