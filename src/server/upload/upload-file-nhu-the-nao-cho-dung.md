Chức năng Upload file là một chức năng có trong hầu hết các dự án, qua một bài viết lượm lặt trên mạng kết hợp với lượng hành đã ăn trong các dự án mình xin đưa ra các phương pháp để upload và lưu file nhưng ở dưới dạng các quick knowledge, còn cách làm các bạn có thể google sẽ có rất nhiều hướng dẫn tường tận và chi tiết hơn để vọc vạch.

# 0. Lưu trực tiếp server
Cách này thì vô cùng đơn giản lưu tất cả các file vào, một thư mục nào đó ngay trong server:

**Khi lưu**

- Client gửi file binary lên server
- Server sẽ lưu file này vào một thư mục nào đó, thường thì sẽ có một cơ chế nào đó để quản lý nơi ở cho đám file này, điển hình là tạo cho mỗi file một ID và lưu file vào thư mục có tên là ID này, sau đó lưu các thông tin này vào database

**Khi truy suất**
- Server sẽ lục lọi trong database và sinh ra một URL truy cập vào nơi chứa file và gửi về cho client
- Client sẽ theo URL này và tải file về

Cách này vì file được lưu trực tiếp trong server nên việc truy suất khá nhanh, tuy nhiên chỉ nên sử dụng được ở trong môi trường development vì nếu sử dụng ở production thì số lượng file upload lên rất nhiều và khó kiểm soát dẫn đến server sẽ mau hết dung lượng, và server đầy == server tèo.

# 1. Lưu trực tiếp phiên bản base64 của file vào Database:
Base64 là một chương trình mã hóa chuỗi ký tự bằng cách dùng thay thế các ký tự trong bảng mã ASCII 8 bit thông dụng thành bảng mã 6 bit. Theo cách này, ở phía client, thay vì gửi cả file binary lên thì sẽ encode nội dung của file thành một string dạng Base 64.

**Khi lưu**
- Ở phía client, thay vì gửi cả file binary lên thì sẽ encode file thành một string dạng Base 64 sau đó gửi về server
- Lúc này, ở phía server sau khi nhận được chuỗi Base64 này sẽ encode chuỗi này thành một phiên bản nhẹ hơn rồi mới lưu vào database, không nên lưu cả chuỗi Base64 vào database vì lưu như vậy không khác lưu cả một file vật lý, và vì Base64 string là phiên bản 6 bit nên sẽ nặng hơn file gốc đến 4/3 lần (8bit/6bit). Khi ấy DB chúng ta rất nặng vì chứa cả file vật lý, lâu dần sẽ khiến database nặng hơn dẫn đến khi truy xuất tốn tài nguyên và băng thông rất lớn

**Khi truy suất**
- Phía server sẽ lấy string đã lưu từ trước sau đó decode về nguyên dạng Base64 và trả về cho client
- Phía client sau khi nhận được Base64 string sẽ decode thành file binary và hiển thị ra cho user

Cách này có nhược điểm là hiệu suất không cao, vì phải encode và decode ở cả 2 bên, thích hợp cho các dự án ít cần phải xử lý tới file/ảnh, vì lưu trực tiếp vào database nên sẽ tiết kiệm chi phí cho việc mua/thuê các dịch lưu trữ file như Cloud Storage.

# 2. Upload lên Cloud Storage qua backend:
**Khi lưu**
- Phía client gửi thẳng file binary lên server sử dụng định dạng request multipart form data.
- Phía server sau khi nhận được file, sẽ tiến hành upload lên nơi lưu trữ như Cloud Storage, hoặc một server khác chuyên dụng để lưu file
- Sau khi quá trình upload lên nơi lưu trữ kết thúc, lúc này server sẽ lưu thông tin về vị trí chứa file trên storage vào database

**Khi truy suất file**
- Server sẽ dựa vào các thông tin đã lưu ở trên để sinh ra url truy cập đến file về cho client, lúc này client sẽ thông qua url và tải file về sau đó hiển thị ra cho user

Tuy nhiên cách này có một số nhược điểm là: 
- Thời gian phản hồi của server về client sẽ lâu hơn đáng kể vì phải đợi server upload file lên nơi lưu trữ, cách này có thể giải quyết bằng cách đưa việc upload file của server vào background job, tuy nhiên nếu cách này, sẽ khó phản hồi về cho client biết khi quá trình upload bị lỗi như mất mạng đột ngột khi đang upload
- Băng thông tiêu thụ ở phía server sẽ gấp đôi. VD nhận file 10MB, upload đi 10MB là 20MB băng thông I/O

# 3. Client upload trực tiếp lên Cloud Storage
Việc upload lên Cloud Storage sẽ được tiến hành ở phía client theo các bước sau 
- Khi user upload một file, client sẽ lấy file này quăng thẳng lên clound storage thông qua API và các secret credential như username-passowrd/secret keys...
- Sau khi quá trình upload thành công, lúc này phía client sẽ đem các thông tin lưu trữ file ở Cloud Storage như URL gửi lên server để lưu lại trong database, phục vụ cho việc truy suất sau này

Cách này giúp giảm băng thông ở phía server, tuy nhiên việc lưu các secret credential ở phía client sẽ dẫn đến việc các thông tin này dễ bị kẻ gian đánh cắp và sài free Cloud Storage của chúng ta.

# 4. Sử dụng Presigned URL
Hiện nay đa phần các nhà cung cấp Cloud Storage như AWS cung cấp một tính năng là Presigned URL, cho phép truy cập vào storage với một khoản thời gian cũng như lượt truy cập giới hạn. Việc upload lên Cloud Storage vẫn do client đảm nhiệm nhưng upload sử dụng Presigned URL thay vì API trực tiếp và với cách này, các secret credential được lưu ở server.
- Trước khi upload, phía client sẽ request lên server để lấy Presigned URL
- Phía server sẽ sử dụng các secret credential để tạo ra một Presigned URL trả về cho client
- Phía client sẽ sử dụng URL này để upload ảnh trực tiếp lên clound storage, sau khi hoàn thành việc upload, client sẽ gửi các thông tin cần thiết cho việc truy suất sau này lên server để lưu vào database.

Code mẫu về Presigned URL (React, Ruby on Rails, S3) ở [đây](https://finnian.io/blog/uploading-files-to-s3-react-native-ruby-on-rails/)

# 5. Tham khảo
- https://www.facebook.com/edu.200lab/posts/175306537706296
- https://medium.com/@shreyanmehta/pre-signed-put-client-side-aws-s3-9587e447dbd6
- https://finnian.io/blog/uploading-files-to-s3-react-native-ruby-on-rails/