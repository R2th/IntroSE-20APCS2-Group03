### Mở đầu
Như các bài viết trước thì chúng ta đã tìm hiểu về Golang, Gin, PostgreSQL là gì thì hôm nay chúng ta sẽ có một bài thực hành nhỏ nho để hiểu rõ hơn về cách hoạt động của chúng nhé.
### ORM - GORM
Trước khi vào thực hành thì ta tìm hiểu thêm về ORM nhé. ORM hay  Object Relational Mapping là tên gọi chỉ việc ánh xạ các record dữ liệu trong hệ quản trị cơ sở dữ liệu sang dạng đối tượng mà mã nguồn đang định nghĩa trong class. Với một ngôn ngữ lập trình phía backend làm việc với cơ sở dữ liệu nhiều như Golang thì GORM ra đời để phục vụ cho các Go dev chúng ta.
GORM là một thư viện tuyệt vời cho Golang. Nó là một ORM để xử lý quan hệ cơ sở dữ liệu. Thư viện GORM này được phát triển trên các package cơ sở dữ liệu/SQL.
Tổng quan và tính năng của GORM là:
* Full-Featured ORM (almost)
* Associations (Has One, Has Many, Belongs To, Many Too Many, Polymorphism)
* Callbacks (Before/After Create/Save/Update/Delete/Find)
* Preloading (eager loading)
* Transactions
* Composite Primary Key
* SQL Builder
* Logger
* Developer Friendly
### Cài đặt và viết một CRUD nhỏ
Chúng ta sẽ sử dụng tất cả những gì chúng ta có trong thời gian vừa qua. Đầu tiên sẽ là PostgreSQL và GORM để làm việc với cơ sở dữ liệu nhé.
Để cài đặt chúng ta sẽ chạy terminal 2 dòng như sau
```
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres
```
Sau đó các bạn cấu hình postgre để có thể kết nối được vào database của Postgre nhá:
![image.png](https://images.viblo.asia/59f701f3-257f-4f53-90f5-6bf0e05e51d4.png)
Chúng ta sẽ khai báo một struct Post chứa các trường như sau: 
![image.png](https://images.viblo.asia/a46108c7-109d-499c-acaa-e7cee808a0b1.png)
Tiếp đó mình sẽ cài đặt các chức năng CRUD vào các api mình đã viết trước đó( các bạn có thể tham khảo ở đây https://viblo.asia/p/golang-va-gin-ruou-chuot-chui-Do754L705M6):
**POST**
![image.png](https://images.viblo.asia/be261914-e1c9-4b42-a47d-78b4f75e8c2e.png)
Đây là kết quả của POST API với Postgre:
![image.png](https://images.viblo.asia/f3aa9471-8729-45d1-904b-0e81692f4e3c.png)
**GET**
Ở đây mình sẽ demo cả 2 trường hợp Get All lẫn Get theo id nhé.
Lấy tất cả các dữ liệu đã nhập:
![image.png](https://images.viblo.asia/b71a1a16-059a-4536-8e6a-96e357a252c8.png)
Kết quả:
![image.png](https://images.viblo.asia/6dfec52e-76f9-4669-bc89-01785df59b2f.png)
Lấy dữ liệu theo id:
![image.png](https://images.viblo.asia/2efcaae0-1ed4-43be-83fd-922d8057eee5.png)
Kết quả:
![image.png](https://images.viblo.asia/b444cd92-723c-4c3c-a6e8-507c993a1dbc.png)
**UPDATE**
Mình sẽ tạo một api update như sau:
![image.png](https://images.viblo.asia/a08e5b76-af5f-41b7-ac18-e9d603bd9523.png)
Sau đó ta chạy service update, ở đây mình sẽ chỉnh lại thông tin của id 4 mình vừa nhập ở trên:
![image.png](https://images.viblo.asia/f1a05cab-a5c3-4499-9338-a620aa3aa68b.png)
Kết quả:
![image.png](https://images.viblo.asia/a77fbc66-3837-4d0b-afdd-d03f4fcf91db.png)
Id 4 đã thay đổi title và description.
**DELETE**
Tiếp đến là delete:
![image.png](https://images.viblo.asia/15f50749-ecd2-491e-ae1e-89d83485cd04.png)
Mình sẽ xóa Id 2 để các bạn có thể dễ hình dung hơn nhé:
![image.png](https://images.viblo.asia/d921fe08-8a2a-4126-940b-4bdd12011edd.png)
Kết quả sau khi xóa Id 2:
![image.png](https://images.viblo.asia/9a77a4c5-42f8-4f86-8cae-8ea95f142807.png)
Quá dễ phải không xD.
### Tóm lại
Ở trên là các bước cơ bản để các bạn có thể hình dung ra một backend làm việc với dữ liệu như thế nào. Có thể thấy GORM giúp chúng ta thao tác khá nhanh và cũng không đòi hỏi quá cao về khả năng truy vấn SQL của bạn( ngoài ra vẫn còn nhiều cách truy vấn khác bạn có thể tham khảo https://gorm.io/docs/query.html). Hy vọng là bài viết của mình sẽ giúp các bạn có 1 cái nhìn tổng quan về Golang và có thể tự mày mò. Cảm ơn các bạn đã đọc bài viết của mình. Have a nice day <3
Các bài viết đã tham khảo:
CRUD using GIN, GORM, POSTGRES: https://medium.com/@tinhuynh1/crud-using-gin-gorm-postgres-90f3194a48db
GORM.io: https://gorm.io/docs/connecting_to_the_database.html