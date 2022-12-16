## Blob and Attachment models

ActiveStorage được thiết kế với các models Blob và Attachment, vì vậy khi bạn thêm nó vào bất kỳ ứng dụng Rails nào, bạn sẽ không cần phải sửa đổi các bảng của mình (như thêm bất kỳ cột image_id nào).

Hãy thử xem các bảng trông như thế nào khi chúng ta tải lên hình ảnh đại diện của người dùng.

> active_storage_attachments: "join" model kết nối các bản ghi đa hình (ở đây là bảng users) với các blobs.

|id          | 1
| -------- | -------- |
|name        | avatar|
|record_type | User|
|record_id   | 1|
|blob_id     | 1|

> active_storage_blobs: chứa **metadata** của file và một **key**.

 |id           | 1 |
| -------- | -------- |
 |key          | spsqwM32xZSyM4T3cdhu11ZK |
 |filename     | nara.jpg |
 |content_type | image/png |
 |metadata     | {"width":254,"height":254,"analyzed":true} |
 |byte_size    | 5937 |
 |checksum     | IOam5/yjCufSlj9owd39wQ== |

Giả sử, khi bạn có một model **Post** khác cũng được liên kết với image, nó sẽ được lưu vào **active_storage_attachments** với **record_type** là **Post**, **record_id** làm **id** của bài đăng và **name** là **image**.

## Xử lí N+1 với eager loading

Với kiểu thiết kế mô hình như trên, chúng ta cần cẩn thận đối với các truy vấn N + 1 trong tình huống has_many.

Giả sữ chúng ta có như sau:

> post.rb

```
class Post < ApplicationRecord
  has_many_attached :images
end
```

> posts_controller.rb

```
def show
  @post = Post.find params[:id]
end
```

Nếu post có nhiều images được đính kèm, bạn có thể thấy :

```
ActiveStorage::Attachment Load (0.7ms)  SELECT "active_storage_attachments".* FROM "active_storage_attachments" WHERE "active_storage_attachments"."record_id" = $1 AND "active_storage_attachments"."record_type" = $2 AND "active_storage_attachments"."name" = $3  [["record_id", 74], ["record_type", "Post"], ["name", "images"]]
ActiveStorage::Blob Load (0.4ms)  SELECT  "active_storage_blobs".* FROM "active_storage_blobs" WHERE "active_storage_blobs"."id" = $1 LIMIT $2  [["id", 154], ["LIMIT", 1]]
ActiveStorage::Blob Load (0.4ms)  SELECT  "active_storage_blobs".* FROM "active_storage_blobs" WHERE "active_storage_blobs"."id" = $1 LIMIT $2  [["id", 155], ["LIMIT", 1]]
ActiveStorage::Blob Load (0.2ms)  SELECT  "active_storage_blobs".* FROM "active_storage_blobs" WHERE "active_storage_blobs"."id" = $1 LIMIT $2  [["id", 156], ["LIMIT", 1]]
```

ActiveStorage cung cấp cho chúng ta scope: **with_attached_images**

Thêm nó vào controller

```
def show
  @post = Post.with_attached_images.find(params[:id])
end
```

Kết quả sẽ như thế này

```
ActiveStorage::Attachment Load (0.3ms)  SELECT "active_storage_attachments".* FROM "active_storage_attachments" WHERE "active_storage_attachments"."record_type" = $1 AND "active_storage_attachments"."name" = $2 AND "active_storage_attachments"."record_id" = $3  [["record_type", "Post"], ["name", "images"], ["record_id", 74]]
ActiveStorage::Blob Load (0.6ms)  SELECT "active_storage_blobs".* FROM "active_storage_blobs" WHERE "active_storage_blobs"."id" IN ($1, $2, $3)  [["id", 154], ["id", 155], ["id", 156]]
```

Đã xử lí xong N+1

**with_attached_images** thực hiên **includes("#{name}_attachment": :blob)**, với name được định nghĩa trong **has_many_attached :the_name** trong model.

## file name và extension

ActiveStorage cung cấp các hàm rất tiện lợi

```
user.avatar.filename
=> #<ActiveStorage::Filename:0x007fec0f32e0a8 @filename="jangnara.png">

user.avatar.filename.to_s
=> "jangnara.png"

user.avatar.filename.base
=> "jangnara"

user.avatar.filename.extension_with_delimiter
=> ".png"

user.avatar.filename.extension_without_delimiter
=> "png"
```

Hi vọng bài viết sẽ hữu ích :)

Tham khảo: https://bloggie.io/@kinopyo/7-practical-tips-for-activestorage-on-rails-5-2

-----

## Mr.Nara