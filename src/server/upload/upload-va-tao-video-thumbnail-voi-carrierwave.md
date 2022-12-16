`carrierwave` là gem rất phổ biến trong framework rails sử dụng để upload các loại files. Gem này hỗ trợ rất nhiều chức năng và rất mạnh. Nếu bạn chưa biết đến gem này, hãy vào https://github.com/carrierwaveuploader/carrierwave để xem chi tiết cách sử dụng và tính năng của nó. 

Hôm này mình sẽ giới thiệu các bạn về cách tạo thumbnail luôn từ video đã upload, không cần phải mất thời gian để tìm ảnh cho video đó nữa. Trong bài này mình sẽ sử dụng `gem carrierwave-video-thumbnailer` kết hợp với `gem carrierwave`.

# Installation
* Install gem carrierwave: 
```
gem 'carrierwave', '~> 1.0'
//hoặc
$ gem install carrierwave
```
* Install gem carrierwave-video-thumbnailer: 
```
gem 'carrierwave-video-thumbnailer'
//hoặc
$ gem install carrierwave-video-thumbnailer
```
* Gem `carrierwave-video-thumbnailer` sử dụng `ffmpegthumbnailer` để tạo thumbnail
```
// Ubuntu
sudo apt-get install ffmpegthumbnailer

// mac
brew install ffmpegthumbnailer
```

# Usage
* Tạo uploader cho video:
```
rails generate uploader Video
```
Nó sẽ sinh ra file uploader như sau: 
```
// app/uploaders/video_uploader.rb
class VideoUploader < CarrierWave::Uploader::Base
  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
end
```
*  Bây giờ bạn đã có VideoUploader rồi, tiếp theo là bước kết hợp  carrierwave-video-thumbnailer với VideoUploader đó:

```
// app/uploaders/video_uploader.rb
class VideoUploader < CarrierWave::Uploader::Base
  include CarrierWave::Video // cho video proccessing
  include CarrierWave::Video::Thumbnailer // để tạo video thumbnail

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
  
   version :thumb do
    process thumbnail: [{format: "png", quality: 10, size: 512, logger: Rails.logger}]
    def full_filename for_file
      png_name for_file, version_name
    end
  end

  def png_name for_file, version_name
    %Q{#{version_name}_video_#{model.id}.png}
  end
end
```
Sau khi upload video, sẽ tạo version :thumb chính là thumbnail của video đã upload. 
Thumbnailer Options sẽ bao gồm:
* format: 'jpg' hoặc 'png' ('jpg' là mặc định).
* quality: chất lượng ảnh (1 to 10, mặc định là 8).
* size: kích thước thumbnail (pixel) (mặc định là 128).
* strip: movie film strip decoration (mặc định là false).
* seek:  Đoạn nào cần snapshot. có thể HH:MM:SS hoặc X%. mặc định là 10%.
* square: Nếu true sẽ tạo thành square thumbnail.
* logger: Sử dụng để tạo log (Rails.logger)

VideoUploader đã hoàn thiện. Bây giờ mình gán uploader này cho trường nào đó mình cần lưu video url đó, ví du như sau:

```
// app/models/movie.rb
class Movie < ActiveRecord::Base
  mount_uploader :video, VideoUploader
end
```

Vào console để thử nhé:
```
$ movie = Movie.create! video: File.open("public/video.mp4")
$ movie.video_url //url video đã upload
$ movie.video_url :thumb //url video thumbnail
```

# References:
https://github.com/carrierwaveuploader/carrierwave

https://github.com/evrone/carrierwave-video-thumbnailer

https://www.howtoinstall.co/en/ubuntu/xenial/ffmpegthumbnailer

https://brewinstall.org/install-ffmpegthumbnailer-on-mac-with-brew/