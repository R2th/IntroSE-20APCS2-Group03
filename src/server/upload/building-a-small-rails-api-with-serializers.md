# Prerequisites

Bài viết này sẽ hướng dẫn các bước cần thiết để thiết lập một Rails API. Trước khi bắt đầu, hãy chắc chắn rằng Postgres đã được install và active trên máy tính của bạn. Nếu không, chúng ta có thể tìm thấy nó trên https://postgresapp.com. Thêm nữa, Postman sẽ được sử dụng để test các API endpoints. Download và install Postman tại địa chỉ https://www.getpostman.com/.

# Models

Mục tiêu của API là gửi những Photos trở lại các comment mà mà nó được liên kết. Model sẽ được thiết lập đơn giản, chúng ta chỉ có 2 model là Photos và Comments. Quan hệ giữa chúng là một photo sẽ có nhiều comments trong khi đó, 1 comments sẽ belongs to một photo

```
Photo -< Comments
```

Các attributes của một Photo sẽ là title và photo_url_string. Còn attributes của comments là content, owner và photo_id.

# Setup

Ở terminal chúng ta sinh ra một API project với command:

```
rails new photo_api --database=postgresql --api
```

Để làm rõ, chúng ta include flag --database để chỉ ra Postgres sẽ được sử dụng thay vì SQLite, và flag --api để tránh sinh ra các views cũng như các view helpers vì chúng không cần thiết cho một API.

Tiếp theo, trong Gemfile add thêm:

```
gem 'active_model_serializers'
```

Gem serializer được sử dụng để cấu trúc format của dữ liệu mỗi khi request được tạo. Điều này sẽ được giải thích sau thông qua việc sử dụng Postman. Sau đó run:

```
bundle install
```

# Generating Models and Controllers

Tạo ra các model Photo và Comment bằng việc chạy các lệnh:

```
rails g model Photo title:string photo_url_string:string
rails g model Comment content:string owner:string photo_id:integer
```

Di chuyển đến file app/models/photo.rb và add thjeem quan hệ với comments cũng như validate cho nó:
![](https://images.viblo.asia/4d6c6232-f0b9-4818-a79c-79f12d97349f.png)

Trong file app/models/comment.rb, add thêm:
![](https://images.viblo.asia/29283021-4a33-4adc-a2a6-ae00af13b1dc.png)

Bây giờ, tạo các controller cho Photo và Comment bằng lệnh:

```
rails g controller api/v1/Photos
rails g controller api/v1/Comments
```

Các lệnh này sẽ sinh ra các đường dẫn lồng nhau trong controllers. Trong file app/controllers/api/v1/photos_controller.rb add thêm:
![](https://images.viblo.asia/f067fe28-8c85-4e51-acf7-6ec3b20dbb96.png)

Có một vài thứ sẽ xảy ra với đoạn code phía trên:

- Tất cả photos sẽ được hiển thị dưới dạng JSON
- check_params đại diện cho dữ liệu nhận được từ front-end.
- Method check_params permit các key title và photo_url_string mỗi khi một request PATCH được tạo

Cũng trong file app/controllers/api/v1/comments_controller.rb, add thêm các methods:
![](https://images.viblo.asia/08670e75-3c3f-4e8d-8b35-52e48a7c19cc.png)

Tiếp theo, di chuyển đến file config/route.rb và add thêm một số routes sau tương ứng với các controller bên trên:
![](https://images.viblo.asia/285d44fa-55f5-4cfd-a829-8cd016ac410d.png)

Thêm vào nữa, hãy chắc chắn rằng dữ liệu được tồn tại để trả về các dữ liệu tương ứng một khi request được tạo. Di chuyển đến file db/seed.rb và input một số dữ liệu seed:
![](https://images.viblo.asia/cba303c5-3fef-430e-813e-188330a4602b.png)

Sau đó chạy:

```
rails db:seed
```

Bây giờ, Rails API đã được set, chúng ta sẽ cùng run server và test các endpoints sử dụng Postman

# GET Requests with Postman

Thông qua API chúng ta có thể access và xem được danh sách các route trong hệ thống:

```
http://localhost:3000/rails/info/routes
```
![](https://images.viblo.asia/058e7fe7-7410-4dba-a70a-5ebb80d607e7.png)

Mở postman và test các đường dẫn. Bắt đầu với request get all các photo. Trong Postman, method HTTP là GET và URL request là: http://localhost:3000/api/v1/photos

Một khi button send được click, nột request sẽ được tạo đến API với status code là 200 và response từ API trong body
![](https://images.viblo.asia/b960441c-0695-46dc-a7a4-d848eb7174b6.png)

Trong file seed data, bốn comment được sinh ra thuộc về một photo, nhưng chúng không được hiển thị trong response. Hơn nữa, thuộc tính created_at và updated_at có vẻ như không cần thiết. Có một giải pháp để thực thi cho những dữ liệu trả về ở đây là, serializers.

Trở lại với Rails API, dừng server và chạy lệnh sau:

```
rails g serializer photo
```

Việc này sẽ sinh ra đường dẫn serializer cho model Photo. Di chuyển đến file serializers/photo_serializer.rb. Trong file này, các attribites avaiable trong response có thể được config. Chúng ta có thể chỉnh sửa lại như sau:

```
class PhotoSerializer < ActiveModel::Serializer
   attributes :title, :photo_url_string
end
```

Với việc thay đổi đó, khi tạo một request khác trên Postman thì response trả về đã thay đổi:
![](https://images.viblo.asia/845e023c-5b8e-4596-af7e-0439f9dc11c9.png)

Chúng ta có thể thấy, chỉ còn title và photo_url_string trong response trả về. Với serializers có thể được cấu trúc để chứa một số thông tin nhất định. Với các comment bị thiếu khi hiển thị photo, chúng ta có thể include các comment vào trong photo. Vẫn trong file serializers/photo_serializer.rb include thêm như sau:
![](https://images.viblo.asia/c438b00a-ed77-4076-83a9-a6498fe2ea41.png)

Khi đó, với request: http://localhost:3000/api/v1/photos/1 thì JSON response đã được include các comments tương ứng:
![](https://images.viblo.asia/31d8c6a4-264c-4e0c-9c2f-3b5e95c96690.png)

Source:

https://levelup.gitconnected.com/building-a-small-rails-api-with-serializers-32e3e69a078