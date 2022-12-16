Với các bài toán lưu dữ liệu là file ảnh, đôi khi chúng ta sẽ cần lưu thuộc tính `dimension(widthxheight)` của ảnh. Với rails + carrierwave, mình sẽ chỉ cho các bạn 3 cách để lưu thuộc tính này:
* Cách 1: Sử dụng những tính năng sẵn có của `Carrierwave`
* Cách 2: Sử dụng `gem image-size`
* Cách 3: Sử dụng `gem fast-image`

### Cách 1: Sử dụng những tính năng sẵn có của Carrierwave
Đầu tiên, hãy tạo 1 ứng dụng rails cơ bản như trong bài viết này của mình :  [Bài viết trước](https://viblo.asia/p/mot-so-van-de-voi-khi-upload-file-anh-voi-rails-carrierwave-RQqKLkdz57z) .
Bạn chỉ cần chú ý vào file `model`, `controllers` và `uploaders`
```
class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      t.string :title
      t.string :thumbnail
      t.string :dimension
      t.timestamps
    end
  end
end
```
```ruby
class Article < ApplicationRecord
  mount_uploader :thumbnail, ImageUploader
  validates :title, presence: true
end
```
```ruby
class ArticlesController < ApplicationController
  def new
    @article = Article.new
  end

  def create
    @article = Article.new article_params
    if @article.save
      redirect_to article_path(@article)
    else
      render :new
    end
  end

  def show
    @article = Article.find_by id: params[:id]
  end

  private

  def article_params
    params.require(:article).permit :thumbnail, :title, :thumbnail_cache
  end
end
```
```ruby
class ImageUploader < CarrierWave::Uploader::Base
  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
end
```
Để thực hiện lưu attributes `dimension `, mình sẽ sử dụng tính năng của MiniMagick(hoặc RMagick tùy vào trình xử lý ảnh mà bạn cài đặt). Mình tạo một `process store_dimension` trong file uploader như sau:
```ruby
class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
  
  process :store_dimensions

  private

  def store_dimensions
    if file && model
      model.dimension = ::MiniMagick::Image.open(file.file)[:dimensions].join "x"
    end
  end
end
```
Mình sẽ debug vào uploader để các bạn hiểu các biến `model`, `file` ở đây là gì? 
```
11: 
   12:   def store_dimensions
   13:     byebug
=> 14:     if file && model
   15:       model.dimension = ::MiniMagick::Image.open(file.file)[:dimensions].join "x"
   16:     end
   17:   end
   18: end
(byebug) file
#<CarrierWave::SanitizedFile:0x00007f1d4427bad8 @file="/home/sun/environment/input_picture_demo/tmp/1574906055-7401-0001-8476/vai.jpg", @original_filename=nil, @content_type="image/jpeg">
(byebug) model
#<Article id: nil, title: nil, thumbnail: nil, dimension: nil, created_at: nil, updated_at: nil>
(byebug) model.dimension = ::MiniMagick::Image.open(file.file)[:dimensions].join "x"
"660x485"
```
Khá đơn giản và dễ hiểu đúng không? Mình sẽ tiếp tục với cách số 2.

### Cách 2: Sử dụng gem image-size
Với cách số 1, các file ở định dạng đặc biệt như .swf, .tiff, .webp, .... sẽ không thể lấy được dimension. Vì vậy, mình sẽ sử dụng gem `image-size` để lấy được dimension cho nhiều định dạng file hơn.
Đầu tiên các bạn cần cài đặt [gem này](https://github.com/toy/image_size) trong Gemfile :
```
gem 'image_size', '~> 2.0'
```

Và cũng tạo process store_dimension tương tự:
```ruby
def store_dimensions
    if file && Settings.image_extensions.include?(file.content_type) && model
      image_size = ImageSize.path file.path
      model.dimension = "#{image_size.width}x#{image_size.height}"
    end
  end
```

### Cách 3: Sử dụng gem fast-image
So với `image-size`, gem `fast-image` mạnh mẽ hơn trong việc mở ảnh gà get size từ 1 url public. 
```
FastImage will follow up to 4 HTTP redirects to get the image.
```
Cách sử dụng cũng tương đối đơn giản, sau khi cài đặt gem:
```
gem 'fastimage'
```
Ta cũng làm 1 process store_dimension :
```ruby
def store_dimensions
    if file && Settings.image_extensions.include?(file.content_type) && model
      image_size = FastImage.size file.path
      model.dimension = "#{image_size.width}x#{image_size.height}"
    end
  end
```
Ngoài ra, bạn có thể lấy trực tiếp size từ 1 public url, thay vì phải tạo process thông qua uploader:
```
FastImage.size("http://stephensykes.com/images/ss.com_x.gif")
```
Đơn giản phải không. 

Bài viết của mình đến đây là kết thúc, hy vọng nó hữu ích với các bạn.



-----
References:

https://github.com/sdsykes/fastimage

https://github.com/carrierwaveuploader/carrierwave/wiki/How-to:-Get-image-dimensions

https://github.com/toy/image_size