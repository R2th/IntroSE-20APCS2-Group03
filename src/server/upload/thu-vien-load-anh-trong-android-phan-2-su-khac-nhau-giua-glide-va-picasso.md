## 1. Picasso là gì?
Cùng với Glide thì cả Picasso là các thư viện load ảnh được sử dụng nhiều nhất trong thế giới ứng dụng Android. Cả hai thư viện này đều cung cấp nhiều tính năng, rất nhanh và tối ưu. Chúng chạy tốt trên nhiều ứng dụng. Picasso là thư viện của Square.
![](https://images.viblo.asia/23bd9316-6d10-4962-88b8-ef291b079e1b.png)
## 2. So sánh Glide và Picasso.
Nhìn bề ngoài thì Picasso vs Glide có vẻ làm việc theo cùng một cơ chế. Nhưng cả hai đều rất khác nhau trong cách tải hình ảnh, lưu trữ hình ảnh  và tải chúng vào bộ nhớ. Cách Glide tải một hình ảnh vào bộ nhớ và cache làm cho load ảnh nhanh hơn Picasso rất nhiều. Và cũng ngăn chặn OutOfMemoryError phổ biến. Glide có một tính năng hơn Picasso đó là có thể tải hình ảnh động GIF. Picasso thì decode một hình ảnh với chất lượng tốt hơn Glide. 
Chúng ta hãy so sánh Glide v3.7.0 và Picasso v2.5.2
### 2.1 Kích thước thư viện.
![](https://images.viblo.asia/eb0005bb-5ff0-4436-ae2e-893a8ae81e71.png)
Trên biểu đồ ta có thể thấy kích thước thư viện của Glide gấp khoảng gần 4 lần Picasso.
### 2.2 Method count.
![](https://images.viblo.asia/d9e1722a-f4cf-4cf7-a186-3edbec362737.png)
Để load một bức ảnh giống nhau đến lúc hiển thị trong cùng một điều kiện môi trường thì Glide phải thực hiện số phương thức gấp hơn 3 lần so với Picasso.
### 2.3 Disk Caching.
Cả hai thư viện đều hỗ trợ lưu ảnh trong disk. Chúng tải hình ảnh từ Url và lưu trữ hình ảnh đó trên disk bằng cách lưu vào bộ nhớ cache. Nhưng có một số khác biệt về cách lưu trữ hình ảnh trong bộ nhớ cache
Picasso tải hình ảnh và lưu trữ nó với kích thước đầy đủ ở bộ nhớ cache, khi ta có yêu cầu lấy ảnh thì nó trả về hình ảnh với chất lượng đầy đủ nhưng lại thay đổi kích thước cho khớp với ImageView.
Glide thì khác, nó tải hình ảnh về, nó thay đổi kích thước của hình ảnh như với ImageView và sau đó lưu trữ vào bộ nhớ cache. Glide có thể lưu nhiều hình ảnh với kích thước khác nhau trong bộ nhớ cache, điều đó cũng một phần tăng kích thước của cache
Khi ta có các ImageView có các kích thước khác nhau. Picasso chỉ lưu một kích thước duy nhất của hình ảnh đó ở cache, và là kích thước đầy đủ. Trong khi Glide lưu trữ từng file riêng cho từng ImageView.
### 2.4 Memory.
Mặc định Glide sử dụng cấu hình RGB_565 trong khi Picasso tải hình ảnh trong cấu hình ARGB_8888 để tải bitmap vào bộ nhớ.
Biểu đồ tiêu thụ bộ nhớ khi load ảnh với Glide và Picasso
![](https://images.viblo.asia/3996de10-8522-4e71-a814-15a4a2aea4ab.png)
Nhìn vào biểu đồ thì ta có thể thấy Glide dùng bộ nhớ hiệu quả hơn Picasso (8M so với 13M). Điều này khá dễ hiểu khi ta đã trình bày ở những phần trước.
### 2.5 Thời gian để lấy một hình ảnh mới.
Để lấy cùng một hình ảnh về thì có vẻ Picasso nhanh hơn Glide. Vì Picasso sau khi tải ảnh về nó đẩy trực tiếp kích thước đầy đủ của ảnh đó vào bộ nhớ trong khi Glide thay đổi kích thước của hình ảnh theo ImageView. Điều đó cần một chút thời gian để thay đổi kích thước hình ảnh.
### 2.6 Các tính năng Support cho Glide mà Picasso không có.
Animated GIF : Glide hỗ trợ load hình ảnh động. Còn Picasso thì không.

Thumbnail: Với Glide bạn có thể tải nhiều hình ảnh vào trong ImageView cùng một lúc.

(*) Note: ***Phiên bản hiện tại của Picasso là 2.71828 ra mắt 07/03/2018. Phiên bản này hoàn toàn không tương thích ngược với các phiên bản trước đó. Nó có nhiều thay đổi và chúng ta sẽ chờ đón những tài liệu đầy đủ hơn của Picasso trong thời gian sắp tới.***
## 3. Bảng so sánh các thư viện load ảnh.
Dưới đây là bảng so sánh khá chi tiết của các thư viện load ảnh thông dụng Picasso, Glide, UImageLoader & Fresco.
![](https://images.viblo.asia/02ea9092-812c-48f4-9b60-f817bba1292a.png)
## 4. Tổng kết.
Qua bài viết mình đã so sánh một cách cơ bản giữa các thư viện load ảnh thường sử dụng trong Android. Đặc biệt là Gilde và Picasso. Mong là hữu ích với các bạn. Cám ơn mọi người đã theo dõi bài viết.

Các bạn cũng có thể xem chi tiết hơn về thư viện Glide ở [Phần 1](https://viblo.asia/p/thu-vien-load-anh-trong-android-phan-1-glide-jvElaP44Zkw) của mình.
## 5.  Tài liệu tham khảo.
https://bumptech.github.io/glide/
https://github.com/bumptech/glide
http://square.github.io/picasso/
https://stackoverflow.com/questions/29363321/picasso-v-s-imageloader-v-s-fresco-vs-glide