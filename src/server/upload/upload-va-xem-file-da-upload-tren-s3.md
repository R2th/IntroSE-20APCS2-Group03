Hello các bạn tiếp tục hôm nay mình sẽ giới thiệu về amazon s3 và cách truyền tải data của ruby on rails lên amazon s3 nha
# Tạo account AWS
À trước khi start thì bạn cần phải có được tài khoản AWS nhé, truy cập [link](https://aws.amazon.com/vi/resources/create-account/) để tạo account nha
# Tạo bucket trên S3
Sau khi tạo tài khoản aws và verify thành công, tiếp tục chúng ta đăng nhập vào aws và tiến hành tạo bucket nhé.
![](https://images.viblo.asia/243af64a-1150-47cd-9ee3-eed1b0e98222.png)

Sau khi tạo thành công sẽ có folder như hình dưới.
![](https://images.viblo.asia/b6b6104d-9f6c-48cb-9c92-7ebd28c3a1c3.png)
# Code thôi
Tiếp tục chúng ta vào project và code vài đường thôi.

Đầu tiên thêm gem `gem "aws-sdk", "~> 3"` để có thể giao thức được với aws nhé

vào config/initializers tạo file amazon_s3.rb
```
require "aws-sdk"

S3_CLIENT = Aws::S3::Client.new(
  region: ENV["AWS_REGION"]
)

S3_RESOURCE = Aws::S3::Resource.new client: S3_CLIENT
S3_BUCKET = S3_RESOURCE.bucket ENV["BUCKET_NAME"]

```
tiếp theo vào file .env update đúng AWS_REGION và BUCKET_NAME vừa được tạo ở s3

tiếp theo bạn vào chạy rails console chạy S3_BUCKET thì nó ra như bên dưới : 
![](https://images.viblo.asia/c7c0be6a-7d7b-4128-ae14-ae436e65133e.png)

nhưng ở đây, hiện tại project đang chưa biết bạn sẽ up data lên tài khoản nào, vì thế chúng ta tiếp tục đi xuống phần bên dưới để tạo IAM để có thể up data lên s3.
![](https://images.viblo.asia/f6c439bb-24c2-4de2-b861-f683b1427896.png)

click vào add user
![](https://images.viblo.asia/98e35071-de2a-49df-8384-f8016c30c5cf.png)

tiếp theo vì ở đây chúng ta chưa tạo group cho nó nên chúng ta sẽ tạo ra group mới và add quyền cho nó luôn nhé
![](https://images.viblo.asia/dc2b4a25-5cfa-49cf-b4de-90caf2403c4e.png)

ở đây mình đang chọn full quyền với s3
![](https://images.viblo.asia/52fd5a65-3e48-47a0-a916-71c6c8a61f2c.png)
![](https://images.viblo.asia/f4f88275-0678-4c08-a489-379d5cbff357.png)

các bạn để ý nhé, ở bước này chúng ta tạo thành công và có được access key id và secret access key, 2 key này mình dùng để bỏ vào project của mình nhé
![](https://images.viblo.asia/ce673efa-e349-4da0-9d53-779214ac9964.png)

Tiếp theo vào config/initilizers tạo file amazon_aws.rb
```
require "aws-sdk"

Aws.config.update({
  region: ENV["AWS_REGION"],
  credentials: Aws::Credentials.new(ENV["AWS_ACCESS_KEY_ID"], ENV["AWS_SECRET_ACCESS_KEY"])
})

```
ok lúc này tắt và chạy lại rails console nhé.

trước tiên bạn chọn file url hình bạn muốn up lên s3 nhé `file_url = "/home/le.dinh.doan/Pictures/import_1.png"` đây mình đang lấy hình từ dưới máy local của mình.

tiếp theo `obj = S3_BUCKET.object("uploads/import_1.png")` với dòng này, bạn đang muốn upload lên s3 với file name là import_1.png và trong folder uploads, s3 sẽ tự hiểu với mỗi / sẽ là trỏ vào thư mục, nếu chưa có s3 sẽ tự tạo thư mục với tên tương ứng bạn đặt.

sau khi chạy bạn sẽ nhận được `#<Aws::S3::Object:0x00000000054551f0 @bucket_name="demo-s3-amz", @key="uploads/import_1.png", @data=nil, @client=#<Aws::S3::Client>, @waiter_block_warned=false>`
tới lúc này bạn sẽ chạy như bên dưới để up hình lên s3 nhé.
```
obj.put(body: File.open(file_url))
```
check trên s3 nào :D
![](https://images.viblo.asia/b6ba6aa7-d072-4929-a7a0-06e3c1a24c2f.png)

đã có file image bạn tải lên, nhưng bạn không thể xem nó bằng url trên s3 được.

Vì thế bạn dùng Presigner để get key của file bạn vừa tải lên, nó sẽ trả về cho bạn 1 url và lúc đó bạn mới có thể xem được nhé.
```
key = obj.key
signer = Aws::S3::Presigner.new
signer.presigned_url(:get_object, bucket: ENV["BUCKET_NAME"], key: key)
```
click vào url và xem kết quả nhé.

Bài này mình giới thiệu cho các bạn cách upload và xem file trên s3 nhé, hãy đợi những bài tiếp theo nhé <3