# Mở đầu
Upload file là một trong nhưng chức năng quan trọng và phổ biến trên hầu hết các website hiện nay. Các trang mạng xã hội cho phép upload ảnh đại diện, hình ảnh, video, các trang web với chức năng quản lý file, các nền tảng CMS (Content Management System) cho phép up load file ảnh, file tài liệu... Hơn nữa việc xử lý các file này được thực hiện trên phía server nên đây là một trong những mục tiêu được các hacker quan tâm tới đầu tiên khi vào một website.

Việc các ứng dụng web không kiểm soát nội dung các file upload từ phía người dùng hoặc kiểm soát thiếu chặt chẽ có thể sẽ bị lợi dụng để tấn công, gây tổn thương hoặc thậm chí nguy hiểm hơn là chiếm quyền điều khiển web server.

Vậy làm thể nào hacker có thể tấn công vào website của bạn thông qua chức năng upload file? Và dù bạn có các biện pháp để bảo vệ thì liệu thực sự đã an toàn? Bài viết dưới đây sẽ giúp các bạn hiểu rõ một phần việc các lỗi upload file được khai thác như thế nào và cách xử lý ra sao.
# Khai thác lỗ hổng
## Khai thác ứng dụng không thực hiện validate
Lỗi xảy ra khi ứng dụng không thực hiện kiểm tra file upload từ phía người dùng, người dùng có thể upload file bất kỳ lên phía server.
Ví dụ: Ở đây mình khai thác lỗ hổng trên ứng dụng web thông qua chức năng upload ảnh:
![](https://images.viblo.asia/a472de02-eafa-4a4d-9242-f99f4519535e.png)

Khi upload 1 file ảnh, kết quả thành công và trả về đường dẫn của file ảnh. Ồ, vậy là chúng ta có thể biết file chúng ta up lên nằm ở đâu trên server, vậy chúng ta có thể truy cập vào file đó.
Bây giờ, chúng ta thử upload 1 file php lên xem sao
![](https://images.viblo.asia/f72df724-7f54-4750-ad3b-11d3aae818c2.png)

Truy cập vào file đã upload và thực thi lệnh tùy ý trên server.:
![](https://images.viblo.asia/147c3e13-bac4-4482-a9f4-70b7b67618ee.png)

Vậy là nếu ứng dụng không kiểm soát file upload lên, chúng ta có thể dễ dàng khai thác chiếm quyền điều khiển server
## Một số kỹ thuật bypass khi ứng dụng thực hiện validate
### Client validation bypass
Một số ứng dụng web sử dụng javascript để ngăn chặn việc người dùng upload những file độc hại lên phía server.
Ví dụ, đối với chức năng upload ảnh, người phát triển ứng dụng mong muốn người dùng chỉ upload các file ảnh có đuôi .jpg, .png, .gif. Do đó, anh ta sử dụng javascript để kiểm tra file được upload lên có phần đuôi là gì, nếu nó là file ảnh thì sẽ không có vấn đề gì, còn nếu là file độc hại ví dụ: .php, .exe thì sẽ pop-up thông báo file không được phép upload. Ở đây mình thử upload một file .php thì ứng dụng trả về pop-up bên dưới
![](https://images.viblo.asia/e06b49a2-cfdb-407a-9f6d-3a7d5b35e970.png)
Như vậy liệu thực sự đã an toàn? Câu trả lời là không, hacker có thể dễ dàng sử dụng các kỹ thuật bypass việc chặn bằng javascript ở phía client bằng cách tắt javascript trên trình duyệt hoặc sử dụng các công cụ như burpsuite để bypass việc ngăn chặn.
### Bypass check file name
Ứng dụng thực hiện kiểm tra file được upload lên có phải là file ảnh hay không. Chúng ta sẽ thực hiện bypass bằng cách sử dụng ký tự null byte %00, \x00 (Ví dụ: test.php%00.png , test.php\x00.png...)
Khi upload lên server ứng dụng sẽ xử lý loại bỏ phần từ ký tự null trở đi khi đó file sẽ trở thành test.php
Upload file test.phpA.png
Dùng burpsuite sửa hex byte ký tự A (41) -> Ký tự null (00)
![](https://images.viblo.asia/ba1a01e7-a73f-4b55-9cf4-31acaf9a0f91.png)

Upload thành công
![](https://images.viblo.asia/d3649b25-3af4-4caa-8b7c-f856b661f04f.png)

Thực thi lệnh RCE
![](https://images.viblo.asia/85d714e5-8b96-440f-84aa-5fbf9d7e8a5e.png)

### Bypass check content-type
Ứng dụng kiểm tra file upload lên có đúng content type yêu cầu không. Với file ảnh là: `Content-Type: image/jpeg` hoặc `Content-Type: image/png`. Lúc này hacker có thể bypass bằng cách chỉnh sửa content-type của file upload trước khi gửi lên server.
Ở ví dụ này mình sẽ upload 1 file php lên server bằng việc chỉnh sửa content-type. Đây là chức năng upload ảnh ở ví dụ khi không validate nhưng đã được sửa code để kiểm tra file upload lên:

Upload file php bị chặn
![](https://images.viblo.asia/3f774207-4f36-4a77-8689-dbe494323f72.png)

Upload file php và chỉnh sửa content-type:
![](https://images.viblo.asia/702163cf-832c-487d-b1d7-bbbcaaf050e6.png)

Kết quả upload thành công:
![](https://images.viblo.asia/67070ccb-c0d7-42bd-8c4a-7c7930be28b5.png)

Truy cập tới đường dẫn file và RCE:

![](https://images.viblo.asia/147c3e13-bac4-4482-a9f4-70b7b67618ee.png)

Vậy rõ ràng việc kiểm tra content-type là chưa đủ vì hacker vẫn có thể bypass để thực hiện upload file lên server thông qua việc chỉnh sửa content-type

### Bypass check header
Một ví dụ khác về việc kiểm tra file không an toàn. Ứng dụng cho phép upload avatar là file ảnh, nếu upload file không phải là file ảnh sẽ bị chặn.
Ở đây, ta sẽ bypass cách cách upload một file không phải là file ảnh nhưng  với phần header là một file ảnh:
Upload  file html với phần header là file jpg, nhưng nội dung là file html
![](https://images.viblo.asia/9333620a-e606-4f0f-9542-6af5c9d635f3.png)

Kết quả upload thành công:
![](https://images.viblo.asia/d560670b-1634-45d2-baec-9cf829a9f584.png)

Và javascript được thực thi (Tấn công XSS)
![](https://images.viblo.asia/cc5b1546-bfd2-4633-bc21-3ba8aacc544f.png)
# Biện pháp khắc phục
- Luôn thực hiện input validation: Kiểm tra đồng thời tên file, content-type, header, file size mỗi khi thực hiện kiểm tra các file upload
- Phân quyền các thư mục upload, nếu là chức năng upload ảnh thì cần chặn quyền thực thi ở thư mục chứa ảnh
-  Tránh để lộ đường dẫn file được upload lên
-  Đổi tên file trên server khi upload thành công,thực hiện hash đường dẫn file đã được upload để chống lại việc đoán được đường dẫn file
-  Sử dụng các trình scan virus trên server để ngăn chặn việc upload các file độc hại
# Lời kết
Trên đây mình chia sẻ một trong số các cách mà hacker có thể sử dụng để thực hiện upload file và vượt qua các kiểm tra về bảo mật. Còn vô vàn các cách khác nhau có thể thực hiện, vì vậy nếu website của bạn có chức năng upload file thì cần thực sự quan tâm đến vấn đề bảo mật của chức năng này.
Cảm ơn các bạn đã theo dõi bài viết!