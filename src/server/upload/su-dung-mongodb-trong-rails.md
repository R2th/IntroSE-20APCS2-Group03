1. Mongodb là gì ?
2. Ưu điểm của mongodb
3. Nhược điểm của mongodb
4. Khi nào nên sử dụng mongodb
5. Cài đặt mongodb trong rails
6. Kết

# 1. Mongodb là gì ?
- MongoDB là một hệ quản trị cơ sở dữ liệu mã nguồn mở NoSQL. Nó được thiết kế theo kiểu hướng đối tượng và được viết bằng ngôn ngữ C++ nên nó có khả năng tính toán với tốc độ cao
- Các bảng trong MongoDB được cấu trúc rất linh hoạt, cho phép các dữ liệu lưu trữ trên bảng không cần tuân theo một cấu trúc nhất định nào cả 
- MongoDB lưu trữ dữ liệu theo hướng tài liệu (document), các dữ liệu được lưu trữ trong document kiểu JSON nên truy vấn sẽ rất nhanh.
### Một số thuật ngữ hay sử dụng trong MongoDB
- _id – Là trường bắt buộc có trong mỗi document
- Collection – Là nhóm của nhiều document trong MongoDB
- Cursor – Đây là một con trỏ đến tập kết quả của một truy vấn. Máy khách có thể lặp qua một con trỏ để lấy kết quả
- Database – Nơi chứa các Collection, giống với cơ sở dữ liệu RDMS chúng chứa các bảng
- Document – Một bản ghi thuộc một Collection thì được gọi là một Document
- Field – Là một cặp name – value trong một document
- JSON – Viết tắt của JavaScript Object Notation
- Index – Là những cấu trúc dữ liệu đặc biệt, dùng để chứa một phần nhỏ của các tập dữ liệu một cách dễ dàng để quét
### So sánh giữa RDBMS và MongoDB
![](https://images.viblo.asia/20152199-784b-42a6-b44a-26bbc4d560c6.png)
# 2. Ưu điểm của mongodb
- Tốc độ truy vấn (find, update, insert, delete) của MongoDB nhanh hơn hẳn so với các hệ quản trị cơ sở dữ liệu quan hệ (RDBMS).
- Schema linh hoạt: Do MongoDB sử dụng lưu trữ dữ liệu dưới dạng Document JSON nên mỗi một collection sẽ các các kích cỡ và các document khác nhau.
- Cấu trúc đối tượng rõ ràng: Tuy rằng cấu trúc của dữ liệu là linh hoạt nhưng đối tượng của nó được xác định rất rõ ràng. Sử dụng bộ nhớ nội tại, nên truy vấn sẽ rất nhanh.
- MongoDB rất dễ mở rộng.
- Ngoài ra mongodb còn hỗ trợ hỗ trợ replica set nhằm đảm bảo việc sao lưu và khôi phục dữ liệu
# 3. Nhược điểm của mongodb
- MongoDB không có các tính chất ràng buộc nên khi truy vấn cần phải thận cẩn thận
- Sử dụng nhiều bộ nhớ: do dữ liệu lưu dưới dạng key-value, các collection chỉ khác về value do đó key sẽ bị lặp lại
- Không hỗ trợ join nên sẽ bị dữ thừa dữ liệu
- Bị giới hạn kích thước bản ghi: mỗi document không được có kích thước > 16Mb và không mức độ các document con trong 1 document không được > 100
# 4. Khi nào nên sử dụng mongodb
- Mongodb thường được sủ dụng cho hệ thống realtime yêu cầu phản hồi nhanh
- Các hệ thống bigdata với nhiều transactions
- Các hệ thống có tần suất write/insert dữ liệu lớn
# 5. Cài đặt mongodb trong rails
1. Tạo dự án mới
```
rails new my_app --skip-active-record
```
 + --skip-active-record : để bỏ qua bản ghi đang hoạt động không cần thiết trong mongodb
2. Cài đặt gem mongoid
 + Mongoid là 1 Object-Document-Mapper(ODM) cho MongoDB được viết bằng Ruby. Nó được hình tháng vào 8/2009 bởi Durran Jordan.
 ```
gem install mongoid
```
3. Cài đặt cấu hình
 ```
rails generate mongoid:config
```
+ sau khi chạy file `config/mongoid.yml` sẽ giống như thế này:
```
development:
  # Configure available database clients. (required)
  clients:
    # Defines the default client. (required)
    default:
      # Defines the name of the default database that Mongoid can connect to.
      # (required).
      database: my_app_development
      # Provides the hosts the default client can connect to. Must be an array
      # of host:port pairs. (required)
      hosts:
        - localhost:27017
      options:
        # Change the default write concern. (default = { w: 1 })
        # write:
        #   w: 1

        # Change the default read preference. Valid options for mode are: :secondary,
        # :secondary_preferred, :primary, :primary_preferred, :nearest
        # (default: primary)
        # read:
        #   mode: :secondary_preferred
        #   tag_sets:
        #     - use: web
 seconds.
        # (default: 5)
        # connect_timeout: 5

        # The timeout to wait to execute operations on a socket before raising an error.
        # (default: 5)
        # socket_timeout: 5

        # The name of the replica set to connect to. Servers provided as seeds that do
      certifications
  options:
test:
  clients:
    default:
      database: my_app_test
      hosts:
        - localhost:27017
      options:
        read:
          mode: :primary
        max_pool_size: 1
```
+ Một số ví dụ:
+ **Model trong mongodb**
```
class Person
include Mongoid::Document

field :first_name, type: String
field :last_name, type: String
end
```

+ **Định nghĩa các trường:**
```
field :first_name, type: String
field :last_name, type: String
```

+ **Quan hệ trong Mongodb:**
```
class User
include Mongoid::Document
field :name, type: String
has_many :posts
end

class Post
include Mongoid::Document
field :x, type: Integer
field :y, type: Integer
belongs_to :user
end
```
# 6. Kết 
Đây là những kiến thức mình tìm hiểu được về mongodb, ngoài ra các bạn có thể tham khảo thêm link dưới đây:
*  http://ianthro.com/using-mongodb-with-rails
*  https://mongoid.github.io/old/en/mongoid/docs/querying.html