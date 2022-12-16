## ImageMagick là gì
ImageMagick là bộ phần mềm (có thể gọi là thư viện) xử lý các file ảnh. ImageMagick là phần mềm tự do với một giấy phép riêng, tương đương với GPL.

Tên gọi ImageMagick ghép từ Image (hình ảnh) và Magick (đọc giống như Magic nghĩa là phép thuật). ImageMagick nổi tiếng do tương thích với nhiều định dạng ảnh và có giao diện (API) phong phú.

## Tính năng
ImageMagick có khả năng đọc, ghi, và chuyển đổi nhiều dạng file ảnh như JPEG, GIF, PNG, TIFF, PDF, PostScript, SVG... (tổng cộng hơn 100 định dạng).

Có thể dùng ImageMagick thực hiện các thao tác đơn giản với hình ảnh như: dịch chuyển, xoay hình, lật hình, thu phóng, kéo xiên hình; cũng như hiệu chỉnh màu sắc, thêm các hiệu ứng, hoặc vẽ thêm chữ và các khối hình vào file hình ảnh sẵn có.

Cách dùng ImageMagick hiệu quả nhất là thông qua các câu lệnh được thực hiện trong các ngôn ngữ lập trình. ImageMagick hỗ trợ giao diện lập trình ứng dụng API cho nhiều ngôn ngữ lập trình khác nhau.

## Jokingly with ImageMagick

Hình ảnh là một phần quan trọng của bất kỳ ứng dụng nào. Từ một mạng xã hội đến một trình theo dõi lỗi đơn giản, hình ảnh đóng một vai trò quan trọng. Tuy nhiên, quản lý hình ảnh không phải là một nhiệm vụ tầm thường và đòi hỏi nhiều kế hoạch trước.

Trong bài viết này cho phép tôi để chứng minh làm thế nào để đạt được điều này trong Rails. Tôi sẽ chỉ cho bạn cách xử lý hình ảnh của bạn và tạo nhiều phiên bản trong chương trình phụ trợ. Chúng tôi cũng sẽ xem cách cải thiện hiệu suất của trang bằng cách nén những hình ảnh này mà không làm giảm chất lượng.

## Setting up the Stage
ImageMagick là thư viện để xử lý ảnh trên hệ thống POSIX. Nếu bạn không có ImageMagick được cài đặt trên hệ thống của bạn, nó có thể được cài đặt với trình quản lý gói cho hệ điều hành của bạn. Trên Ubuntu:
```
sudo apt-get -y install imagemagick
sudo apt-get -y install libmagic-dev
sudo apt-get -y install libmagickwand-dev
```
Trên Mac OS X, tôi khuyên bạn nên sử dụng Homebrew:
```
brew install imagemagick
```
Bây giờ, chúng ta cần một bộ điều hợp Ruby để kết nối với thư viện ImageMagick gốc. Cá nhân tôi thích MiniMagick, vì nó nhẹ và có khá nhiều thứ mà ứng dụng điển hình yêu cầu:
```
# Gemfile

gem 'mini_magick'
```
## Playground
Hãy thử với một số tính năng của MiniMagick trước khi xây dựng. Mở bảng điều khiển Rails `rails c` và chạy như sau:
```
image = MiniMagick::Image.open("https://s2.anh.im/2018/08/20/1A7438f7f70218a5b4.jpg")

# Get the Image's width
image.width # 721

# Get the image's height
image.height #960
```
Giờ thì chúng ta resize em nó :)
```
image.resize "421x660"
```
Lấy chiều rộng, chiều cao mới của hình
```
p "Width is => #{image.width} and height is => #{image.height}"
```
Hình mới đc resize lưu ở đâu? Hiển thị đáp án với lệnh
```
image.path
```
Hình ảnh mới này được lưu trữ trong một đường dẫn tạm thời và sẽ bị mất. Để lưu nó vào đĩa, chỉ cần gọi phương thức ghi:
```
image.write "public/uploads/test.jpg"
```
## Convert Image
Một trong những hoạt động thường xuyên nhất bạn sẽ làm là chuyển đổi hình ảnh sang các định dạng khác nhau. MiniMagick làm cho điều này rất đơn giản:
```
image.format "png"
image.write "public/uploads/test.png"
```
Bạn cũng có thể kết hợp nhiều thao tác trong một khối duy nhất:

```
image.combine_options do |i|
  i.resize "421x660"
  i.flip
  i.rotate "-45"
  i.blur "0x15"
end
image.write "public/uploads/blur.png"

![Some weird result](blur.png)
```

## Image Processing with Rails

Uploading Files
```
# Gemfile

gem 'carrierwave'
gem 'carrierwave-mongoid', :require => 'carrierwave/mongoid'
```
Sau đó: 
```
bundle install
````
Generate Uploader và edit nó
```
#app/uploaders/image_uploader.rb

class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file
  
  def store_dir
    "uploads/images"
  end
  
  def extension_white_list
    %w(jpg jpeg png gif)
  end
end
```

Tạo một model chứa ảnh

```
class Image
  mount_uploader :media, ImageUploader
end
```

Chỉnh sửa image_uploader.rb để xử lý hình ảnh đã tải lên:
```
# app/uploaders/image_uploader.rb

#.....
process :resize_to_fill => [200, 200]
process :convert => 'png'
#.....
```
Hãy thử tạo đối tượng ảnh mới từ Rails Console:
```
media = File.open("/Users/test/Desktop/image/jpg")
img = Image.new(:media => media)
img.save
```
Hình ảnh được tải lên có sẵn trong store_dir. Tuy nhiên, hình ảnh được tải lên sẽ được xử lý ngay lập tức và ghi đè bằng hình ảnh 200 × 200. Chúng tôi sẽ không có bản sao của tệp gốc cho bất kỳ chỉnh sửa nào trong tương lai. Để tránh điều này, hãy tạo nhiều phiên bản của ảnh.
```
version :thumb do
  process :resize_to_fit => [100, 100]
  process :convert => 'jpg'
end

version :cover   do
  process :resize_to_fit => [240, 180]
  process :convert => 'jpg'
end
```
```
img.media.versions[:thumb] # returns the thumb image instance
img.media.versions[:cover] # returns the cover image instance
```
Bạn có nhận thấy rằng những hình ảnh này được tạo ngay lập tức không? Điều này có nghĩa là việc chuyển đổi hình ảnh xảy ra trong cùng một luồng và thực thi bị chặn cho đến khi nó hoàn thành. Trong một ứng dụng sản xuất, nó sẽ là không mong muốn để tạo ra nhiều phiên bản của một hình ảnh trong cùng một luồng. Thay vào đó, chúng ta nên xử lý điều kiện này.
```
# app/uploaders/image_uploader/rb

#....
version :cover, :if => :is_live? do
  process :resize_to_fit => [240, 180]
  process :convert => 'jpg'
end

def is_live?(img = nil)
  @is_live
end

def is_live=(value)
  @is_live = value
end
#....
```
Bây giờ, khi chúng tôi thử tạo một hình ảnh mới, phiên bản cover sẽ không được tạo. Chúng tôi có thể kích hoạt thủ công điều này khi cần bằng cách chạy:
```
img.media.is_live = true
img.save
img.media.recreate_versions! :cover
```
Đoạn code này được chạy ngầm và Chúng ta có thể thực hiện bước này thêm một bước nữa bằng cách chạy nó trong Resque:
```
# lib/resque/image_queue.rb
class ImageQueue
  @queue = :image_queue
  def self.perform(image_id)
    image = Image.find image_id
    img.media.is_live= true
    img.save
    img.media.recreate_versions! :cover
  end
end
```
và, enqueue nó:
```
Resque.enqueue(ImageQueue, img.id.to_s)
```
## Improving Performance
```
# Gemfile

gem 'carrierwave-imageoptimizer'
```
Chỉnh sửa uploader
```
# app/uploaders/image_uploader.rd

#.....

include CarrierWave::ImageOptimizer
process :optimize
process :quality => 100
#....
```
Nó sẽ nén tất cả các hình ảnh mà không bị mất hình ảnh nào. Cách hoạt động này là tất cả thông tin meta về hình ảnh bị tước đi. Điều này làm giảm kích thước khoảng 20-30%.