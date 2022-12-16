# Console tool
## Cấu trúc và chức năng
Theo mặc định trên Chrome devtool  thì `Console` được đặt ở vị trí tab thứ 2 sau tab Elements. 

Đủ để cho thấy tầm quan trọng của nó. Với mình thì thấy nó là cái có nhiều chức năng nhất :stuck_out_tongue_winking_eye:

Có thể được hiển thị thông qua phím tắt `Command+Option+J (Mac)` or `Control+Shift+J (Windows, Linux, Chrome OS)` 

![](https://images.viblo.asia/84e59ff5-2739-4f8c-950d-c47f94f2650c.PNG)

### Show Console Sidebar (1)
Bắt đầu tìm hiểu với công cụ đầu tiên `Show Console Sidebar`(vị trí 1 trên hình). 

`Show Console Sidebar` là một button để show thanh Sidebar (có nhiều thành phần quá nên phải để riêng đây mà :sweat_smile:)

![](https://images.viblo.asia/d1d9bf2b-5b58-46db-872a-2deee8e5c734.PNG)

Ở đây, console đang lọc theo các cảnh báo, message gồm có 6 loại:
- message
- user message
- errors
- warnings
- info
- verbose
Message là tổng số thông báo, mỗi khi chọn lọc theo 1 loại cụ thể thì những loại khác sẽ bị loại bỏ khỏi màn hình `Logged messages`
Notes: thường thì mình lọc theo `errors` để xem lỗi thôi. Ngoài ra cũng có hay lọc theo `user message` phần `<other>` để xem console javascript đang viết, tại code smell quá mà :laughing:

### Console clear (2)
Cái này thì chắc sử dụng suốt, nhìn message nhiều quá thì clear đi thoi.

![](https://images.viblo.asia/052ecd5a-8e50-441d-a592-1a5b002ed5a5.PNG)

nó cũng tương tự khi bạn gõ `console.clear()` trên `Logged messages`
### JavaScript Context (3)
Chọn ngữ cảnh JavaScript, theo mặc đinh sẽ được để là `top` đại diện cho  [ngữ cảnh duyệt web](https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context) của DOM cha.

![](https://images.viblo.asia/231300a1-1931-492e-a30d-7f383a60f2fe.PNG)

Nhưng bạn cũng có thể thay đổi nó cho các ngữ cảnh Javascrypt khác. Giả sử bạn có một quảng cáo trên trang của bạn được nhúng trong một `<iframe>`. Bạn muốn chạy JavaScript để điều chỉnh DOM của quảng cáo. Để làm điều này, trước tiên bạn cần chọn bối cảnh duyệt web của quảng cáo từ danh sách thả xuống `JavaScript Context`. Và giờ bạn có thể sử dụng javascript trên DOM đã chọn mà không ảnh hưởng đến DOM khác.

### Create live expression (4)
Biểu tượng hình con mắt này cho phép bạn theo dõi trực tiếp (kiểu live stream :rofl:) các thành phần DOM, các biểu thức Javascript. 
Hoặc viết nhiều quá chán thì đây cũng là 1 cách lưu lại biến, biểu thức hay dữ liệu một cách tuyệt vời. Bạn luôn có thể thay đổi nó, theo dõi biến mà k sợ nó mất dấu khỏi tầm mắt. 

![](https://images.viblo.asia/af12074e-f4c0-42b9-a4a3-baf5bbda3808.PNG)

### Filter (5)
Giống với tên, nó dùng để `filter` những gì được nhập vào, lấy ra các messages cần thiết từ  `Logged messages`. Khi đưa chuột vào sẽ có title hướng dẫn sử dụng `Filter`: 
> e.g. /event\d/ -cdn url:a.com 

theo hướng dẫn thì bạn có thể filter các trường hợp như: biểu thức chính quy, filter theo đường dẫn url, loại bỏ một đường dẫn ra khỏi kết quả (bằng dấu `-` đằng trước) .... hay đơn giản bạn cũng có thể filter theo văn bản.

Ví dụ filter theo từ khóa `goo`
![](https://images.viblo.asia/8fc84194-6aff-47de-af63-b913104d9d4b.PNG)

hoặc theo từ khóa `-goo`

![](https://images.viblo.asia/9d304ee3-1875-4de7-b8af-bb27c5192849.PNG)

thật tiện lợi!

### Log level (6)
Log level cũng là một dạng filter nhưng đó là theo các level có sẵn:
- default
- Verbose
- Info 
- Warnings
- Errors

Tương tự như `Show Console Sidebar` nhưng chỉ lấy ra log và có thể lấy nhiều loại (tích nhiều lựa chọn)

### Console setting (7)
Biểu tượng hình bánh răng bên phải màn hình Console là `Console setting` với chức năng cũng là filter các `Logged messages` theo chỉ định
![](https://images.viblo.asia/b81e7808-e84f-45cc-afd0-ad95cff90732.PNG)

## Tổng kết
Còn phần thứ 8 `Console` thì mình sẽ để sang bài sau vì nó có nhiều cái hơn, phải dành cả 1 bài để nói :stuck_out_tongue_winking_eye:.
Cám ơn mọi người đã đọc bài của mình.

Tài liệu tham khảo: [developers.google.com](https://developers.google.com/web/tools/chrome-devtools/console)