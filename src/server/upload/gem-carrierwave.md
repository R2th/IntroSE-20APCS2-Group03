## Giới thiệu
Là một gem hỗ trợ cho việc upload file trong ứng dụng Rails, nó cung cấp các phương thức đơn giản và linh hoạt giúp người dùng có thể upload file dễ dàng.

## Cài đặt
Thêm vào Gemfile:
```
gem "carrierwave"
```
chạy `bundle install`<br>

Giả sử ta có model User có 1 column là Avartar, giờ ta sẽ tạo tính năng upload file đối với cột Avartar này.
```
rails generate uploader Avatar
```
Sau khi chạy ta sẽ đc `app/uploaders/avatar_uploader.rb`
```
class AvatarUploader < CarrierWave::Uploader::Base
  storage :file
end
```
Bạn cũng có thể dùng uploader class và lưu file hoặc truy xuất file
```
uploader = AvatarUploader.new

uploader.store!(my_file)

uploader.retrieve_from_store!('my_file.png')
```
CarrierWave cung cấp cho bạn một **store** để lưu trữ vĩnh viễn và bộ nhớ **cache** để lưu trữ tạm thời. Bạn có thể lựa chọn các store khác nhau, bao gồm cả filesystem và cloud storage. <br>
### Upload một file
Add column avartar vào model User
```
rails g migration add_avatar_to_users avatar:string
rails db:migrate
```

```
class User < ActiveRecord::Base
  mount_uploader :avatar, AvatarUploader
end
```

Giờ bạn có thể lưu file bằng cách gán chúng cho column avartar.

```
user = User.new
user.avatar = params[:file]

user.save!
user.avatar.url # => '/url/to/file.png'
user.avatar.current_path # => 'path/to/file.png'
user.avatar_identifier # => 'file.png'
```

### Upload nhiều files
Add column avartar vào model User
```
rails g migration add_avatars_to_users avatars:json
rails db:migrate
```
```
class User < ActiveRecord::Base
  mount_uploaders :avatars, AvatarUploader
end
```

Trong form của bạn, thêm **multiple: true** vào trường input files
```
<%= form.file_field :avatars, multiple: true %>
```

Ở users_controller.rb
```
def create
  user = User.new user_params
  user.save!
end

private

def user_params
  params.require(:user).permit(:email, :first_name, :last_name, {avatars: []})
end
```

### Thay đổi thư mục lưu trữ
Để thay đổi nơi đặt các tệp đã tải lên, chỉ cần ghi đè phương thức store_dir:
```
class AvatarUploader < CarrierWave::Uploader::Base
  def store_dir
    'public/my/upload/directory'
  end
end
```
Thay đổi nơi lưu cache
```
class AvatarUploader < CarrierWave::Uploader::Base
  def cache_dir
    '/tmp/projectname-cache'
  end
end
```

Ngoài ra còn có 1 số phương thức mở rộng giúp bạn validate file như:
```
// giới hạn kích thước file
def size_range
  1.megabytes..10.megabytes
end

// xác định trước đuôi file
def extension_whitelist
  %w(jpg jpeg gif png)
end

// hoặc nội dung file là hình ảnh.
def content_type_whitelist
  /image\//
end
```

### Adding versions
Giả sử bạn muốn upload file và kích thước của nó không vượt quá 800 x 800 thì ta có thể thêm 1 version thumb để có thể thu nhỏ hình ảnh 200 x 200. Đầu tiên là cần phải cài đặt **Imagemagick**
```
$ brew install imagemagick
```

```
class MyUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  process resize_to_fit: [800, 800]

  version :thumb do
    process resize_to_fill: [200,200]
  end
end

// Ta có thể viết như sau:
uploader = AvatarUploader.new
uploader.store!(image)                              # size: 1024x768

uploader.url # => '/url/to/image.png'               # size: 800x600
uploader.thumb.url # => '/url/to/thumb_image.png'   # size: 200x200
```
Có thể lồng version với nhau:
```
class MyUploader < CarrierWave::Uploader::Base

  version :animal do
    version :human
    version :monkey
    version :llama
  end
end
```

Và thêm điều kiện để cho các version
```
class MyUploader < CarrierWave::Uploader::Base

  version :human, if: :is_human?
  version :monkey, if: :is_monkey?
  version :banner, if: :is_landscape?

private

  def is_human? picture
    model.can_program?(:ruby)
  end

  def is_monkey? picture
    model.favorite_food == 'banana'
  end

  def is_landscape? picture
    image = MiniMagick::Image.new(picture.path)
    image[:width] > image[:height]
  end

end
```

### Kết luận
Với gem Carrierwave chúng ta có thể cài đặt và upload file một cách dễ dàng. Trên đây chỉ là hướng dẫn cơ bản để làm quen với gem Carrierwave. Các bạn có thể tham khảo thêm: <br>
[How to](https://github.com/carrierwaveuploader/carrierwave/wiki) <br>
https://github.com/carrierwaveuploader/carrierwave