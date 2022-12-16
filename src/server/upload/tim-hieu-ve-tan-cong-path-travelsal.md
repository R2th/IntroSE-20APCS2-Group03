## Mở đầu:
- Thông thường tất cả các nội dụng, tài nguyên của trang web đều cần phải được phân quyền truy cập một cách đúng đắn. Mỗi hành động chỉ được phép truy cập tài nguyên trong một thư mục chỉ định. Nhưng với tấn công Path traversal có thể giúp hacker truy cập hoặc kiểm soát các thư mục nằm ngoài quyền hạn thông thường...
## What is Path traversal?
- Path traversal ( còn có tên gọi khác là Directory traversal)  là một dạng tấn công cho phép hacker truy cập được các thư mục và tệp tài nguyên nằm ngoài thư mục hiện hành. Những tài nguyên bị truy cập trái phép này có thể là **source code**, **các thông tin cấu hình server**, **các tệp và thư mục hệ thống**,...
- Ngoài ra lỗ hổng này thì thường được kết hợp với 1 số lỗ hổng khác để có thể khai thác sâu hơn.
## Why is Path traversal attack dangerous?
- Đây là một lỗ hổng rất nguy hiểm vì nó có thể gây ảnh hưởng đến hệ thống. Ở mức độ đơn giản, hacker có thể đọc được các file trong thư mục web hay thậm chí là các file nhạy cảm trong hệ thống.
- Với 1 số cách khai thác và lỗ hổng ở mức độ chuyên sâu hơn, hacker có thể ghi được file vào hệ thống từ đó chèn thêm mã độc. Tệ nhất là có thể dẫn đến **RCE**

## How Path traversal work?
- Một ví dụ đơn giản là việc lưu trữ ảnh trong hệ thống:
    - Giả sử những file ảnh được dev lưu trong thư mục **/var/www/html/blog/public/img/**
    - Khi truy cập file avatar.jpg trên thư mực này dev có thể để link là ``GET photo/file?name=avatar.jpg``. Lúc này webserver sẽ truy cập vào file ở đường dẫn **/var/www/html/blog/public/img/avatar.jpg** và trả về cho người dùng.
    - Nhưng thay vì việc truyền file name là avatar.jpg hacker có thể truyền tên file là **../../../../../../etc/password**. Lúc này webserver sẽ truy cập và trả về file ở đường dẫn **/var/www/html/blog/public/img/../../../../../../etc/password**. Đường dẫn này tương đương với  **/etc/pasword** nên webserver sẽ trả về file hệ thống cho chúng ta.
    - Tất nhiên trong thực tế tùy theo web server và config của chúng mà cách khai thác có thể khác, khó hơn chút và đa dạng hơn chút :D
    - Ví dụ như đối với windown server thì chúng ta có thể dùng cả ``../`` và ``..\``
## Check Path traversal vulnerable
- Việc kiểm tra xem một trang web có thể bị tấn công **Path traversal** không có khá là nhiều cách  nhưng về cơ bản thì chúng ta cần tập trung vào các ``endpoint`` truy cập file thông qua tên file, các ``endpoint`` upload file. Đây là những ``endpoint`` nhạy cảm và dễ bị dính nhất.
- Ngoài ra các endpoint này có thể sẽ không hiển thị rõ ràng trên ``url`` mà sẽ tồn tại ở đâu đó trong trang web. Có thể là trong source code ``html``, trong các funtion call api của ``ajax``, thậm trí trong cả cookiee.
- Ví dụ như trong thẻ html sau:
    ```html
    <img src="/loadImage?filename=218.png">
    ```
- Phía web server có thể có 1 bộ lọc để lọc các request này. Ta có thể thử một số cách để bypass chúng:
    - Sử dụng các kí tự ``....// or ....\/`` thay cho ``../``
    - Sử dụng một số mã hóa không chuẩn như: ``..%c0%af or ..%252f``
    - Hoặc đôi khi ws yêu cầu một tên file với phần đuôi file cụ thể ta có thể sử dụng cách sau : ``../../../etc/passwd%00.png``. ``%00`` chính là null byte và có thể bypass qua bộ lọc nếu bạn may mắn =))
## References
https://portswigger.net/web-security/file-path-traversal
https://www.owasp.org/index.php/Path_Traversal