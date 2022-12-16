Gần đây mình đọc một bài khá thú vị về việc so sánh ảnh sử dụng Docker và imagemagick , hôm nay xin chia sẻ lại với các bạn !

Imagemagick  như là phần mềm để thao tác và hiển thị hình ảnh ở nhiều định dạng tệp khác nhau
(ví dụ:  bạn có thể so sánh hình ảnh và thay đổi kích thước)

Đại khái phải làm gì lúc này
Tạo một Dockerfile và tạo một hình ảnh (ubuntu / imagemagick) với imagemagick được cài đặt trên ubuntu
Đặt hai hình ảnh vào một thư mục thích hợp, gắn kết và so sánh các hình ảnh trong vùng chứa → lưu kết quả vào thư mục máy chủ
Tình huống này là như thế này
![](https://images.viblo.asia/21e74a33-b70b-4421-95ef-1a24bc781962.png)

# Thực hành
Trước tiên , hãy thực hiện công việc này trong thư mục hoge-docker.
Khi bạn tự thử, hãy tiếp tục trong khi thay thế nó bằng thư mục bạn đã tạo. Thư mục
hoge-docker chỉ chứa các hình ảnh test1.png và test2.png mà bạn muốn so sánh. 

test1.png
![](https://images.viblo.asia/f1eb707e-67f4-46f1-954e-4856597bd700.png)

test2.png
![](https://images.viblo.asia/b6e7ebd6-6957-4dde-b9d0-42727301962b.png)

## 1. Tạo Dockerfile
Dockerfile giống như một cuốn sổ ghi chép để tạo một hình ảnh. Viết như sau
```
FROM ubuntu

RUN apt-get update

RUN apt-get -y  install imagemagick
```

Chỉ định hình ảnh cơ sở với FROM
và thực hiện lệnh OS với RUN để thêm nó vào hình ảnh mới.
Lần này nó mô tả việc cập nhật gói và cài đặt imagemagick

## 2. Thực thi Dockerfile

Thực thi Dockerfile bằng lệnh sau
để tạo ảnh Chỉ định tên ảnh mới tạo bằng tùy chọn -t
Là đường dẫn tương đối của Dockerfile sẽ được thực thi.
```
docker build -t ubuntu / imagemagick.
```
Bằng cách nào đó,  quá trình cài đặt sẽ bắt đầu đột ngột, vì vậy hãy đợi cho đến khi nó kết thúc

## 3. Gắn thư mục làm việc và nhập vùng chứa

Nói một cách đại khái, mount là đồng bộ hóa thư mục. Khi vùng chứa bị dừng, các tệp bên trong tất nhiên sẽ biến mất,
nhưng nó được tạo bên trong vùng chứa bằng cách đọc một phần của thư mục cục bộ dưới dạng ổ đĩa bên trong vùng chứa. Có thể chia sẻ tệp, v.v. địa phương

-v Đường dẫn thư mục phía máy chủ:
Chỉ định đường dẫn thư mục phía vùng chứa . Lần này đồng bộ hóa thư mục làm việc hiện tại với / tmp trong vùng chứa
```
docker run -it -v $ (PWD): / tmp ubuntu / imagemagick
```
4. So sánh hình ảnh bằng imagemagick

Nếu bạn đặt nó trong hộp đựng một cách an toàn
```
compare
```

Đảm bảo rằng imagemagick được cài đặt đúng cách bằng cách sử dụng, v.v.
Lần này, tôi đã chỉ định / tmp làm đích đồng bộ hóa, vì vậy hãy di chuyển nó và kiểm tra xem thư mục hoge-docker có được đồng bộ hóa đúng cách hay không.

```
cd tmp /
ls
```

Với điều này, nếu bạn có Dockerfile, test1.png, test2.png thì không sao cả!
Để so sánh hình ảnh, hãy viết hai tên hình ảnh bạn muốn so sánh và tên tệp của tệp đầu ra thể hiện sự khác biệt giữa chúng như sau.
Lần này, xuất ra dưới dạng result.png.
```
compare test1.png  test2.png result.png
```

Khi hoàn thành
```
ls
```
Xác nhận rằng result.png được tạo trong
. Nếu có thể, hãy thoát và thoát khỏi vùng chứa.
Thành công nếu bạn lại cục bộ và tạo ra result.png!

![](https://images.viblo.asia/dd00625b-67dc-44b2-9354-0a84b041b8b7.png)

Lần này, tôi đã tạo ra sự khác biệt của hình ảnh bằng cách đặt một khối
(phần khác nhau sẽ chuyển sang màu đỏ khi so sánh)

# Cuối cùng
Hiện tại, tôi đã cố gắng vận động để hiểu những điều cơ bản, nhưng dường như vẫn còn chỗ để cải thiện. Tôi muốn có thể kết hợp nó vào các bài kiểm tra tự động , v.v.

Cảm ơn bạn đã đọc đến đây. Hy vọng nó có ích cho bạn !