Nếu không dùng Shrine, bạn đang làm tính năng upload file sai cách.

![Shrine logo](https://images.viblo.asia/612a1c62-30b5-4e9d-b88a-55e64792b3bb.png)

Bạn làm một trang với form thêm mới dài dằng dặc các trường. Cuối form là một trường upload file mà người dùng cần chọn upload 1,2GB tài liệu lên đấy. Sau khi ấn submit và đợi chờ mòn mỏi trong 30 phút, cái đập vào mắt người dùng là: "**tiêu đề không được dài quá 20 ký tự**". Người dùng sửa lại tiêu đề và submit lại form, chờ tiếp 30 phút trong cay đắng, mà không biết rằng thứ đợi chờ họ phía sau lại là một lỗi validation khác...

Thực hiện một tính năng upload file có rất nhiều trường hợp phức tạp như vậy đấy. Và ví dụ trên mới chỉ là một trong số rất nhiều vấn đề mà được **Shrine** - một thư viện Ruby mới mẻ mà nhỏ bé - giải quyết trọn vẹn.

Trong bài viết này, mình muốn chia sẻ chút ít về cách thiết kế - các quyết định sáng suốt mà creator của Shrine đã cẩn thận lựa chọn khi phát triển thư viện của mình, và cách mà thư viện này giúp cho việc phát triển tính năng upload file trở nên đơn giản và thú vị như thế nào!

# Storage và promotion
Shrine cho phép bạn định nghĩa rất nhiều storage tùy thích. Đó đơn giản có thể đơn giản lưu vào filesystem, hay lưu trên Amazon S3, Google Cloud Storage hay thậm chí Flickr. Nếu bạn có dịch vụ lưu trữ nào khác (ví dụ fshare), bạn cũng hoàn toàn có thể dễ dàng viết thêm plugin storage cho nó :grinning:

Mặc định, Shrine có sẵn 2 loại storage, và bạn phải thiết lập trước "storage" cho nó:
```ruby
Shrine.storages = { 
  cache: Shrine::Storage::FileSystem.new("public", prefix: "uploads/cache"), # temporary
  store: Shrine::Storage::FileSystem.new("public", prefix: "uploads"),       # permanent
}
```

Tại sao lại cần lưu file ở những 2 chỗ?

Một là `cache`, nơi lưu trữ dành cho bất cứ file nào được upload lên, có thể đã hoặc chưa vượt qua validation, và chưa được lưu vào một model nào. Khi model đã lưu lại thành công vào cơ sở dữ liệu cùng với file, file đó sẽ được chuyển đến storage `store`. Quá trình chuyển từ storage `cache` đến `store` được gọi là quá trình **promotion**.

Shrine hoàn toàn hỗ trợ thực thi quá trình promotion dưới dạng một **background job**. Và không chỉ đơn thuần là di chuyển file, bạn còn thể thực hiện kèm nhiều thứ "hay ho" trong quá trình promotion nữa (trích xuất metadata, tạo các phiên bản khác nhau của file).

# Cơ sở dữ liệu
Shrine hỗ trợ các dạng ORM không chỉ ActiveRecord, mà còn rất nhiều ORM khác như Sequel, ROM,... Nhưng khoan hãy nói đến nó, giờ ta đi tìm hiểu trước cách Shrine lưu dữ liệu về những file đã upload vào cơ sở dữ liệu như thế nào.

## Vấn đề
Bạn đang phát triển hệ thống dành cho các photographer, cho phép người dùng tự do chia sẻ ảnh chụp. Mới đầu khi thiết kế cơ sở dữ liệu, bạn nghĩ chỉ cần tạo bảng có trường `picture_path` (lưu đường dẫn/link đến hình ảnh đó) là đủ.

Đi vào hoạt động vài ngày, bạn mới nhận ra rằng ảnh người dùng upload lên quá nặng (những 5MB trở lên), và bạn cần phải tạo thêm phiên bản đã resize độ phân giải và tối ưu kích thước để hiển thị. OK, tạo thêm cột nữa tên `picture_optimized_path` và `picture_thumbnail_path` vậy.

Một hôm khác, website bạn đã lớn dần và gặp vấn đề về băng thông, và bạn quyết định tạo thêm phiên bản .webp cho ảnh, để có kích thước tối ưu nhất. Vậy bạn lại phải tạo migration, thêm 2 cột nữa là `picture_optimized_webp_path` và `picture_thumbnail_webp_path`.

Rồi một hôm bạn lại muốn lưu lại các thông tin về size, EXIF, màu chủ đạo của ảnh. Bạn lại phải tạo thêm 3 cái cột nữa. Dần dần, cái bảng `pictures` của bạn nhìn không khác gì bãi chiến trường.

## Giải pháp của Shrine
Shrine nhận ra vấn đề này rất sớm: các dữ liệu liên quan đến file có bản chất cực kỳ **linh động**, và cách lưu các dữ liệu riêng từng cột không phải là giải pháp hữu hiệu. Thay vào đó, tác giả của Shrine chọn cách thêm một **trường jSON** vào bảng, tức với trường hợp trên, bạn chỉ cần một trường JSON duy nhất tên là `picture_data`. JSON type là thứ mà nhiều cơ sở dữ liệu quan hệ phổ biến hiện nay như mariaDB hay postgreSQL đã hỗ trợ, cho hiệu suất truy vấn tốt, và thích hợp để lưu những dạng dữ liệu linh động cao.

Dữ liệu JSON mà Shrine lưu lại có dạng như sau:

```ruby
attacher.data #=>
# {
#   "id" => "abc123.jpg",
#   "storage" => "store",
#   "metadata" => {
#     "size" => 223984,
#     "filename" => "nature.jpg",
#     "mime_type" => "image/jpeg",
#   }
# }
```

Trong trường JSON này, Shrine lưu mọi thứ liên quan đến tệp: các phiên bản tệp, kích thước, loại tệp, thông tin metadata khác,...

# Uploaders
*Uploader* chỉ là các class Ruby đơn thuần, bên trong nó định nghĩa cách file được validate, các metadata cần được trích xuất, các phiên bản file (derivatives) cần tạo ra,...

```ruby
class ImageUploader < Shrine
  # image attachment logic
end
```

Cái uploader trên sau đó có thể được include vào trong bất kỳ model nào:

```ruby
class Photo < ActiveRecord::Base # has `image_data` column
  include ImageUploader::Attachment(:image) # adds methods, callbacks & validations
end
```

Bạn có thể tạo rất nhiều uploader: ImageUploader để validate và resize ảnh, VideoUploader chứa các hàm xử lý, encode video,... Qua các uploader mà chúng ta có thể **tái sử dụng** các logic về upload, validate, xử lý file của uploader ở nhiều model khác nhau.
# Derivatives
Shrine hỗ trợ khả năng **tạo nhiều phiên bản** khác nhau của cùng một file. Tác giả Shrine lựa chọn gọi nó là các *dẫn xuất* (derivatives).

Thông thường, bạn sẽ muốn tạo ra các dẫn xuất trong quá trình promotion - tức khi bản ghi đã được lưu vào cơ sở dữ liệu, và file được chuyển từ `cache` sang `store`. Việc tạo các dẫn xuất hoàn toàn có thể thực hiện trong **background job**, hoặc thực thi **on-the-fly**.

Tưởng tượng một trang như Netflix, với mỗi một tập phim, người ta phải tạo ra **hàng trăm phiên bản** file khác nhau, với đủ dạng kích thước, và tương ứng với mỗi kích thước là các dạng định dạng cho các hệ máy. Shrine giúp bạn quản lý lượng phiên bản file nhiều đến vậy vô cùng dễ dàng. Bạn cũng có thể *nhóm* (nested) những derivatives lại với nhau để tiện quản lý.

Ví dụ, khi bạn muốn tạo ra 3 phiên bản: small, medium, large cho một tệp được upload lên, hãy định nghĩa trước trong một `Uploader`:

```ruby
require "image_processing/mini_magick"
 
class ImageUploader < Shrine
  Attacher.derivatives do |original|
    magick = ImageProcessing::MiniMagick.source(original)
 
    { 
      large:  magick.resize_to_limit!(800, 800),
      medium: magick.resize_to_limit!(500, 500),
      small:  magick.resize_to_limit!(300, 300),
    }
  end
end
```

Upload file, gọi lệnh tạo các derivative và lưu model:

```ruby
photo = Photo.new(image: file)
photo.image_derivatives! # calls derivatives processor 
photo.save
```

Sau này, bạn có thể lấy bất cứ derivative nào mà bạn mong muốn:

```ruby
photo.image(:large)            #=> #<Shrine::UploadedFile ...>
photo.image(:large).url        #=> "/uploads/store/lg043.jpg"
photo.image(:large).size       #=> 5825949
photo.image(:large).mime_type  #=> "image/jpeg"
```

# Tối ưu trải nghiệm upload
## Form upload retain
Nhờ vào việc luôn cache lại dữ liệu mà người dùng đã upload lên, Shrine có thể giúp **giữ lại** những file mà người dùng đã upload, phòng khi trường hợp model không được tạo thành công (lỗi validate,...). Đối với form đơn thuần, Shrine có plugin `cached_attachment_data` giúp bạn dễ dàng làm điều này.

## Direct Upload
Với cách upload truyền thống, file chỉ được upload lên khi người dùng nhấn vào nút submit. Ngày nay, với sự hỗ trợ từ các frontend framework, trải nghiệm người dùng sẽ tốt hơn rất nhiều nếu như ta **upload file ngay khi người dùng chọn** nó, và sau đó chỉ việc "gán" tham chiếu file đã upload xong đó vào form khi người dùng submit. Đây gọi là kỹ thuật **Direct Upload**.

Shrine hỗ trợ direct upload lên cả file system lẫn AWS S3 và nhiều loại storage khác. Việc setup Direct Upload trong Shrine hết sức đơn giản. Trước tiên là thêm route cho direct upload:

```ruby
# config/routes.rb (Rails) 
Rails.application.routes.draw do
  # ... 
  mount ImageUploader.upload_endpoint(:cache) => "/images/upload"
end
```

Sau đó, khi muốn direct upload, bạn chỉ cần gửi POST đến /images/upload kèm theo form data của file bạn định upload. File đó sẽ được upload lên `cache` storage bằng ImageUploader. Một dạng JSON đại diện cho file đã upload sẽ được gửi lại:

```ruby
# POST /images/upload 
{ 
  "id": "43kewit94.jpg",
  "storage": "cache",
  "metadata": { 
    "size": 384393,
    "filename": "nature.jpg",
    "mime_type": "image/jpeg"
  }
}
```

Chuỗi JSON trên có thể đính vào form gửi lên như bình thường. Khi form được submit và model được lưu lại, file này sẽ tự động được gắn với model và bắt đầu promote.

## Resumable upload
Khi người dùng thường xuyên phải upload file lớn cỡ 1-2GB hoặc hơn, việc upload file như truyền thống cũng hết sức rủi ro. Khi kết nối đến server không ổn định hoặc người dùng bị mất mạng, quá trình tải lên sẽ phải bắt đầu lại từ đầu. Nhưng Shrine sẵn sàng chấp tất và hỗ trợ upload qua **Tus protocol**, một dạng giao thức giúp quá trình upload file có thể resumable.

## Dọn dẹp cache storage
Cách thức direct upload khiến các file thường xuyên được lưu vào cache storage, dù cho tệp đó có được gán vào model nào hay không. Vậy sẽ thế nào nếu storage cache dần dần bị chất đống file thừa lại và chiếm dung lượng ổ đĩa?

Shrine sẽ không tự giúp bạn, nhưng bạn đơn giản chỉ cần lên lịch qua cron để thường xuyên dọn dẹp lại cache storage là đủ. Câu lệch đặt trong cron/schedule task có thể như dưới đây:

```ruby
file_system = Shrine.storages[:cache]
file_system.clear! { |path| path.mtime < 1.week.ago }
```

# Tạm kết
Trên đây chỉ là một số những giải pháp của Shrine để giải quyết bài toán upload file cho các hệ thống. Tuy chỉ là thư viện dành cho Ruby và các framework web của Ruby, có rất nhiều thứ mà bạn có thể học được từ Shrine khi thiết kế bất ký hệ thống nào có phần upload - lưu trữ file là trọng tâm.

Nếu bạn dùng Ruby hay framework Ruby on Rails và có hứng thú tìm hiểu thêm về Shrine, xem tài liệu về Shrine tại https://shrinerb.com/docs/getting-started.