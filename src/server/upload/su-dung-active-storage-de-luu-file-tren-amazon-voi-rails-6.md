Hiện nay việc lưu trữ ảnh, video, hay các loại file khác lên cloud rất phổ biến đối với tất cả các ứng dụng. Việc lưu file lên cloud có rất nhiều lợi ích, có thể kể đến như các file lưu trữ trên cloud sẽ khó bị mất, có thể sử dụng trên nhiều nền tảng, tối ưu hóa dung lượng app, dễ dàng quản lí,... Trong bài viết này sẽ giới thiệu về cách lưu trữ file lên Amazon S3 trong Rails 6 sử dụng Active Storage.

# Tạo tài khoản Amazon và S3 bucket
## Tạo tài khoản Amazon
Tạo tài khoản Amazon tại trang chủ [Amazon](https://portal.aws.amazon.com/billing/signup#/start), lưu ý bạn phải nhập thông tin creadit card thì mới sử dụng được các dịch vụ của Amazon.

Sau khi đăng kí thành công bạn đăng nhập với tài khoản root user chính là tài khoản với email bạn vừa tạo.

## Tạo bucket
Sau khi đăng nhập thì bạn sẽ thấy một màn hình như sau:
![](https://images.viblo.asia/d15b6a8c-bc64-41e8-acf7-b10b8702e7c8.png)

Tìm kiếm S3 trên thanh tìm kiếm Dịch vụ AWS nếu bạn không thể nhìn thấy nó ngay từ đầu:
![](https://images.viblo.asia/59aeafc6-abe1-49c5-8821-da8a953ec751.png)

Nhấn vào dịch vụ S3, bạn sẽ được chuyển tới một màn hình như sau:
![](https://images.viblo.asia/3f354758-3749-4455-ab6a-a3ff5996d6eb.png)

Click vào Create bucket để đi tới trang tạo bucket
![](https://images.viblo.asia/9196a7b2-3dfd-48df-8544-46321a4b34c3.png)

Chuyển đến màn hình tiếp theo:
![](https://images.viblo.asia/2689eeff-2c1a-4335-8102-dcb07a8f2c67.png)

Trên màn hình thuộc tính, bạn có thể đặt các cài đặt cho bucket. Đối với hướng dẫn này, chúng ta sẽ không đi sâu vào những điều này nhưng bạn có thể thử với nó. Sẽ để nó với các giá trị mặc định.

![](https://images.viblo.asia/f95fd7cb-8b5d-4709-b55c-59ed1eefc0e9.png)

Tiếp theo, trên màn hình Permissions, chúng ta có thể đặt người dùng để có quyền truy cập vào bucket này nhưng chúng tôi sẽ thực hiện điều đó sau trong cài đặt IAM của Amazon service, vì vậy, trong thời điểm này, hãy giữ nguyên trạng thái và nhấp vào Next.

![](https://images.viblo.asia/146edfe6-66f4-4af3-b28a-69b3ad66ac97.png)

Đây là màn hình xác nhận bạn có thể tiếp tục và nhấp vào Create Bucket
## Thêm chính sách người dùng để cấp quyền truy cập vào tệp
Bây giờ chúng ta sẽ tạo một người dùng và cấp các quyền cần thiết để có quyền truy cập đọc / ghi vào S3 Bucket.

Hãy nhấn vào Services và tìm kiếm IAM
![](https://images.viblo.asia/a61e466d-490c-4ec3-b85c-19cf6860564f.png)

Trên trang IAM service nhấn vào User và nhấn Add User
![](https://images.viblo.asia/888044a0-577d-4740-9217-a5762d085c57.png)

Trong màn hình Add User nhập vào user name và check vào Programmatic access trong mục Access type.
![](https://images.viblo.asia/4836fa81-5a8e-4679-b7d6-f12f8246eb99.png)

Sau đó chúng ta phải chỉ định quyền truy cập S3 Policy Access trong màn hình tiếp theo:
![](https://images.viblo.asia/ea151a1c-09f6-459f-9117-46a044f5cf8e.png)

Click vào **Attach Existing** và tìm kiếm chính sách **S3** và chọn **AmazonS3FullAccess**, sau đó nhấn **Next: Review**

Trong màn hình Review nhấn vào **Show** trong cột Secret access key và xem giá trị. Hãy lưu cả 2 giá trị: Access key ID và Secret access key vào một nơi an toàn bởi vì chúng ra sẽ cần nó để cài đặt Active Storage trong Rails.
![](https://images.viblo.asia/dfdfec7c-c04e-4042-b424-ebd7c4c7c9d6.png)

# Rails setup
## Config storage.yml
Bước đầu tiên để thiết lập Active Storage trên Rails là thiết lập `config/storage.yml`. Các cài đặt giống như sau:
```yml
test:
  service: Disk
  root: <%= Rails.root.join("tmp/storage") %>

local:
  service: Disk
  root: <%= Rails.root.join("storage") %>

# Use rails credentials:edit to set the AWS secrets (as aws:access_key_id|secret_access_key)
amazon:
  service: S3
  access_key_id: <%= ENV["AWS_ACCESS_KEY_ID"] %>
  secret_access_key: <%= ENV["AWS_SECRET_ACCESS_KEY"] %>
  region: <%= ENV["AWS_REGION"] %>
  bucket: <%= ENV["S3_BUCKET_NAME"] %>
```
Các giá trị **AWS_ACCESS_KEY_ID**, **AWS_SECRET_ACCESS_KEY**, **AWS_REGION**, **S3_BUCKET_NAME** bạn sẽ lấy từ cài đặt ở phần trước để lưu ở biến môi trường.

## Config production.rb / staging.rb / development.rb environment
```ruby
config.active_storage.service = :amazon
```

## Install active_storage
Bạn chạy lệnh sau để cài đặt active_storage vào project
```ruby
rails active_storage:install
```
Bây giờ trong thư mục project bạnn sẽ thấy file migrate của active storage như sau:
![](https://images.viblo.asia/866c2470-c24b-4f6a-bdd2-b542618be506.png)

Sau đó chạy lệnh `rails db:migrate` để tạo ra 2 bảng: **active_storage_attachments** và **active_storage_blobs**

## Lưu ảnh
Để lưu ảnh ta cần tạo một Model và thêm quan hệ với Active Storage
```ruby
has_one_attached :image (nếu chỉ lưu 1 ảnh)
# Or
has_many_attached :image (nếu lưu nhiều ảnh)
```
Sau đó, chúng ta cần permit params trong controller để nhận file ảnh từ client và lưu:
Đối với 1 ảnh:
```ruby
def product_params
  params.require(:product).permit(:title, :description, :image)
end
```
Đối với nhiều ảnh:
```ruby
def product_params
  params.require(:product).permit(:title, :description, image: [])
end
```

## Lấy link ảnh
Cuối cùng để lấy được link ảnh và xem lại ảnh ta có thể dùng cú pháp sau:
```ruby
object.image.attachment.service_url
```
# Tổng kết
Như vậy qua bài viết này mình đã giới thiệu tới các bạn các bước cơ bản để có thể lưu ảnh lên môi trường Amazon S3 service thông qua active_storage trong Rails. Chúc các bạn thành công.