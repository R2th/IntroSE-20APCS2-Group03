# Tổng quan
Gem carrierwave là một gem trong ruby on rails giúp hỗ trợ để upload một hay nhiều file trong ứng dụng ruby.
# Cài đặt
Thêm dòng sau vào Gemfile, sau đó chạy lệnh bundle install:
```ruby
    gem 'carrierwave', '~> 1.0'
```
# Bắt đầu
Đầu tiên cần tạo một uploader:
```ruby
    rails generate uploader Avatar
```
Sau khi chạy câu lệnh trên nó sẽ tạo ra 1 file app/uploaders/avatar_uploader.rb:
```ruby
    class AvatarUploader < CarrierWave::Uploader::Base
      storage :file
    end
```
Bạn có thể sử dụng class uploader để lưu trữ và truy vấn dữ liệu như sau:
```ruby
    uploader = AvatarUploader.new

    uploader.store!(my_file)

    uploader.retrieve_from_store!('my_file.png')
```
# ActiveRecord
Hãy chắc chắn rằng bạn đang load CarrierWave sau khi load ORM của bạn, nếu không bạn sẽ cần sử dụng require thủ công:
```ruby
    require 'carrierwave/orm/activerecord'
```
Thêm một column vào model bằng cách migrate:
```ruby
    rails g migration add_avatar_to_users avatar:string
    rake db:migrate
```
Mở file model và thêm vào dòng sau:
```ruby
    class User < ActiveRecord::Base
      mount_uploader :avatar, AvatarUploader
    end
```
Bây giờ bạn có thể gán file bạn muốn upload cho thuộc tính của user, chúng sẽ được tự động lưu trữ khi bản ghi được save:
```ruby
    u = User.new
    u.avatar = params[:file] # Assign a file like this, or

    # like this
    File.open('somewhere') do |f|
      u.avatar = f
    end

    u.save!
    u.avatar.url # => '/url/to/file.png'
    u.avatar.current_path # => 'path/to/file.png'
    u.avatar_identifier # => 'file.png'
```
# Upload nhiều file
Carrierwave cũng hỗ trợ khả năng tải lên cùng lúc nhiều file. Tạo thêm một cột trong database để có thể lưu trữ một mảng dữ liệu:
```ruby
   rails g migration add_avatars_to_users avatars:json
   rake db:migrate 
```
Mở file model vừa tạo được và thêm vào uploader
```ruby
    class User < ActiveRecord::Base
      mount_uploaders :avatars, AvatarUploader
      serialize :avatars,
    end
```
Hãy chắc chắn rằng các trường nhập file của bạn được cài đặt multiple. 
```ruby
  <%= form.file_field :avatars, multiple: true %>  
```
Và đảm bảo rằng controller upload của bạn cho phép thuộc tính upload nhiều file
```ruby
    params.require(:user).permit(:email, :first_name, :last_name, {avatars: []})
```
Bây giờ bạn có thể lựa chọn nhiều files trong dialog tải lên (có thể sử dụng tổ hợp phím SHIFT+SELECT), chúng sẽ được lưu tự động khi bản ghi được save
```ruby
    u = User.new(params[:user])
    u.save!
    u.avatars[0].url # => '/url/to/file.png'
    u.avatars[0].current_path # => 'path/to/file.png'
    u.avatars[0].identifier # => 'file.png'
```
# Thay đổi thư mục lưu trữ file
Khi muốn thay đổi thư mực lưu trữ file, bạn chỉ cần override phương thức store_dir:
```ruby
    class MyUploader < CarrierWave::Uploader::Base
        def store_dir
            "public/app/upload/"
        end
    end
```
Nếu bạn muốn lưu file ở ngoài thư mục gốc của project, chỉ cần override phương thức cache_dir:
```ruby
    class MyUploader < CarrierWave::Uploader::Base
      def cache_dir
        '/tmp/projectname-cache'
      end
    end
```
# Bảo vệ uploads
CarrierWave còn cho phép người dùng giới hạn kiểu file nhất định để được tải lên:
```ruby
    class ImageUploader < CarrierWave::Uploader::Base
      def extension_white_list
        %w(jpg jpeg gif png)
      end
    end
```
# Thêm version
Carrierwave cung cấp chức năng tạo các version của ảnh với các kích thước khác nhau trước khi lưu. Để làm được điều này bạn cần phải cài đặt Imagemagick và MiniMagick để thay đổi kích thước của hình ảnh
```ruby
    class MyUploader < CarrierWave::Uploader::Base
      include CarrierWave::MiniMagick

      process resize_to_fit: [800, 800]

      version :thumb do
        process resize_to_fill: [200,200]
      end
    end    
```
Khi bắt đầu upload , một image được tải lên và bạn muốn thay đổi kích thước của nó không vượt quá 800 x 800px. Một versions mới thumb được viết ra để thu nhỏ hình ảnh 200 x 200px. Ta có thể viết như sau:
```ruby
    uploader = AvatarUploader.new
    uploader.store!(image)                              # size: 1024x768

    uploader.url # => '/url/to/image.png'               # size: 800x600
    uploader.thumb.url # => '/url/to/thumb_image.png'   # size: 200x200
```

# Cấu hình CarrierWave
CarrierWave có rất nhiều cấu hình mà bạn có thể tuỳ chọn, cho toàn bộ hoặc cho từng uploader
```ruby
    CarrierWave.configure do |config|
      config.permissions = 0666
      config.directory_permissions = 0777
      config.storage = :file
    end    
```
Hoặc là:
```ruby
    class AvatarUploader < CarrierWave::Uploader::Base
      permissions 0777
    end
```
Trong rails bạn cần khởi tạo cho nó
```ruby
    config/initializers/carrierwave.rb
```
# Tài liệu tham khảo
https://github.com/carrierwaveuploader/carrierwave