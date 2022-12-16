Trong số chúng ta ai cũng đều đã từng trải qua một thời sinh viên tràn ngập đồ án này, đồ án kia đúng không? Mình cũng đã từng có một thời như thế :triumph: Mà chuyên ngành chúng ta là công nghệ thông tin thì làm việc với Database trong mỗi đồ án là điều không thể thiếu rồi. Chuyện sẽ chẳng có gì to tát cho đến khi mà giáo viên yêu cầu: Hãy nộp cho tôi một bản ER Diagram vào ngày mai :100:

Vậy phải làm sao đây khi mà **phpMyAdmin** chỉ có thể tạo ra một ER Diagram với một đống bảng chồng chất lên nhau cũng với hàng loạt các đường lối quan hệ giữa các bảng đủ màu sắc nữa, chả nhẽ phải ngồi kéo chỉnh từng bảng một :scream:

Phải làm sao đây????
![](https://images.viblo.asia/6e3f6ad3-a0db-4161-aad2-878e390bf1e5.gif)

Thật may là có MySQL Workbench giúp ta làm các điều đó và hôm nay mình sẽ hướng dẫn cho những ai chưa biết đến cách này nhé :D

## Giới thiệu và cài đặt

**MySQL Workbench** là một công cụ truy cập cơ sở dữ liệu được mô hình hóa và thiết kế trực quan sử dụng cho cơ sở dữ liệu quan hệ MySQL server. MySQL Workbench giúp tạo ra các mô hình dữ liệu vật lý mới và hỗ trợ sửa đổi các cơ sở dữ liệu MySQL hiện có với các kỹ thuật đảo ngược / chuyển tiếp, các chức năng quản lý tùy chọn.

Để cài đặt MySQL Workbench thì hơi nhiều bước chút xíu nên mình không nói ở đây, các bạn có thể vào [đây](https://tech.vccloud.vn/mysql-workbench-la-gi-20181009105241884.htm) để tham khảo nhé. Từ cài đặt rồi cho đến kết nối với MySQL luôn, giờ thì ta bắt đầu tạo nào.

## Tạo ER Diagram
### 1. Đầu tiên bạn phải chắc chắn có Database và Tables được tạo trên MySQL server.
Ở đây mình đã kết nối và chuẩn bị sẵn một database như sau:

**Database** - *report*

**Tables** - *migrations, users, passwordresets, products, categories, images, categoryproduct*

![](https://images.viblo.asia/dff3ce29-ebd4-4521-8636-9d7bf39cadd8.gif)

### 2. Click Database -> Reverse Engineer.

![](https://images.viblo.asia/6cc0cdad-55c8-4590-b258-41e53fd6f953.gif)

### 3. Tại cột Stored Connection chọn database từ danh sách thả xuống, sau đó chọn Next

Nếu bạn nhận được thông báo nhập mật khẩu thì hãy nhập mật khẩu phpMyadmin của bạn vào nhé.

![](https://images.viblo.asia/ca90093a-dd6c-4434-9777-029a6f4eb3a2.gif)

### 4. Sau khi kết nối thành công (connection to DBMS), tiếp chọn chọn Next.

![](https://images.viblo.asia/29150e29-9bc6-4156-9277-8328c0907c04.gif)

### 5. Chọn Database mà bạn muốn tạo ER Diagram (ở đây của mình là "report"), sau đó chọn Next.

![](https://images.viblo.asia/163c8efe-77ff-46d8-8f6b-75e3de0d4f2a.gif)

### 6. Tiếp tục chọn Next.

![](https://images.viblo.asia/273e3ea4-a912-4a39-bd04-504443ba26ea.gif)

### 7. Cuối cùng chọn Execute -> Next -> Close.

![](https://images.viblo.asia/9654b7f7-3539-4bc0-9da8-3e6b66b1cd33.gif)

### 8. ER Diagram của Database.
Giờ thì bạn đã có được lược đồ Diagram cho Database của bạn rồi đó, bạn chỉ cần Export ra file .png rồi nộp cho giáo viên thôi.

![](https://images.viblo.asia/702bc390-0096-4ec6-bd5a-db3fc8da3bb9.gif)

## Kết luận

Vừa rồi mình đã hướng dẫn các bạn tạo ER Diagram bằng **MySQL Workbench** rồi đó, thật đơn giản phải không. Qua bài này mình mong giúp được chút ít cho các bạn muốn tạo ER Diagram từ Database, không còn phải ngồi thủ công như trước nữa. Tuy nhiên bạn cũng có thể di chuyển các bảng theo vị trí mình thích nhé, và còn cách nào thì các bạn cũng comment để cho mình và các bạn cùng biết. 

Cảm ơn các bạn đã đọc bài của mình, hãy upvote cho mình để mình có động lực viết các bài tiếp theo nhé :grinning:

### Bài viết tham khảo
https://medium.com/@tushar0618/how-to-create-er-diagram-of-a-database-in-mysql-workbench-209fbf63fd03