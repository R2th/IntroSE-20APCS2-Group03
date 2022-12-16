## I. Mở đầu
### 1. Giới thiệu

Chúng ta đã biết về các lỗ hổng information disclosure - khiến trang web tiết lộ một số thông tin nhạy cảm. Ở bài viết này tôi muốn giới thiệu tới các bạn một dạng lỗ hổng có thể nói là nâng cao của Information disclosure vulnerabilities - Lỗ hổng Directory traversal (một số tài liệu còn gọi là Path traversal vulnerabilities). Vì sao lại là nâng cao ư? Vì nó cũng có điểm chung là khiến kẻ tấn công có thể đọc nội dung các tệp tin ngoài quyền hạn truy cập. Trong lỗ hổng này kẻ tấn công thường có thể thao tác để đọc nội dung tệp tin tại các thư mục theo ý muốn, phạm vi tiết lộ thông tin lớn hơn, thậm chí là toàn bộ tệp tin trong server. Với lượng lớn thông tin thu thập được như vậy sẽ là một bước "khởi đầu" vô cùng suôn sẻ cho kẻ xấu.

### 2. Cấu trúc thư mục trong hệ điều hành nhân Unix

Trong mục này tôi sẽ giới thiệu cấu trúc thư mục trong hệ điều hành Ubuntu làm đại diện cho các hệ điều hành hướng theo hướng Module như Unix.

Hệ thống tệp tin trong Ubuntu được tổ chức theo một hệ thống phân bậc tương tự cấu trúc của một cây phân cấp.

![](https://i.imgur.com/Cycfjxu.png)

Bậc cao nhất của hệ thống tập tin là thư mục gốc (root directory), được ký hiệu bằng dấu gạch chéo (xổ trái) `/`. Đường dẫn tới một tệp tin (hoặc thư mục) được biểu diễn xuất phát từ thư mục gốc (bắt đầu bằng `/`), rồi lần lượt các thư mục cha, thư mục con, ... mỗi tên thư mục ngăn cách nhau bằng dấu `/`. Ví dụ đường dẫn `/home/viblo/Desktop/hello_world.cpp` chỉ tệp tin `hello_world.cpp` đang chứa trong thư mục `Desktop` thuộc thư mục cha `viblo`, thư mục `viblo` thuộc thư mục cha `home`, thư mục `home` nằm trong thư mục gốc.

![](https://i.imgur.com/2FN5FQi.png)

## II. Kiến thức chuẩn bị

Với các bạn thường xuyên làm việc với hệ điều hành Ubuntu chắc hẳn đã rất quen thuộc các dòng lệnh thao tác với thư mục. Trong quá trình khai thác lỗ hổng Directory traversal, chúng ta cần biết tới hai khái niệm sau:

### 1. Thư mục hiện tại

Thư mục hiện tại, hay vị trí hiện tại chỉ thư mục chúng ta đang làm việc, có thể kiểm tra bằng lệnh `pwd`

![](https://i.imgur.com/pkeY0Ra.png)

Chuỗi kí tự `./` chỉ thư mục hiện tại. Ví dụ, các đường dẫn sau là tương đương:

```
/home/viblo/Desktop
/home/viblo/Desktop/./
/home/viblo/././Desktop
```

![](https://i.imgur.com/ePnvMjH.png)

Cảm giác chuỗi kí tự này không có tác dụng gì phải không, cần gì thêm chuỗi `./` vào trong khi nó không thay đổi gì =))) Nhưng thực ra nó có thể giúp chúng ta bypass một số filter trong quá trình khai thác lỗ hổng Directory traversal.

### 2. Thư mục cha - lùi thư mục

Thư mục cha chỉ thư mục đang chứa thư mục hiện tại của chúng ta. Ví dụ, chúng ta đang ở trong thư mục `/home/viblo/Desktop`, khi đó thư mục cha hiện tại sẽ là `viblo`, do thư mục `Desktop` được chứa trong thư mục `viblo`.

![](https://i.imgur.com/PyGzJYS.png)

Lùi thư mục có nghĩa là di chuyển từ thư mục hiện tại tới thư mục cha. Chúng ta sử dụng lệnh `cd` (di chuyển) kết hợp với chuỗi kí tự `../` có được dòng lệnh:

`cd ../`

Nghĩa là lùi về một thư mục. Như vậy, nếu đang ở trong thư mục `/home/viblo/Desktop`, khi sử dụng lệnh `cd ../` sẽ lùi về tới thư mục `/home/viblo`.

![](https://i.imgur.com/vGj9Lgz.png)

Có thể kết hợp để lùi nhiều thư mục.

![](https://i.imgur.com/t8X8aSZ.png)

Những thao tác di chuyển qua lại các thư mục rất đơn giản phải không, chúng ta cũng có thể kết hợp để di chuyển tới các thư mục theo ý muốn (Nắm chắc các kỹ thuật di chuyển thư mục này sẽ giúp chúng ta có thể khai thác triệt để lỗ hổng Directory traversal). Ví dụ, di chuyển từ `/home/viblo/Desktop/example` tới `/home/viblo/Download`:

![](https://i.imgur.com/LVXYpTI.png)

## Các tài liệu tham khảo

- [https://portswigger.net/web-security/file-path-traversal](https://portswigger.net/web-security/file-path-traversal)
- [https://viblo.asia/p/tim-hieu-ve-unixlinux-p1-QpmlebyV5rd](https://viblo.asia/p/tim-hieu-ve-unixlinux-p1-QpmlebyV5rd)
- [https://wiki.matbao.net/kb/co-ban-cau-truc-thu-muc-trong-linux/](https://wiki.matbao.net/kb/co-ban-cau-truc-thu-muc-trong-linux/)