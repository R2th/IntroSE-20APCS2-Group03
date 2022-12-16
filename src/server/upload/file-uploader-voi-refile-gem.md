## **I. Giới thiệu**
Trong rails, 2 thư viện thường được sử dụng nhất trong việc upload file lên server đó là `CarrierWave` và `PaperClip`. Ngoài ra còn có một thư viện thông dụng khác đó là `Refile`. Nó là một sản phẩm kế thừa từ gem `CarrierWave` với nhiều vượt trội. Và giống như `DragonFly`, nó kết hợp tính dễ sử dụng và đơn giản của `PaperClip` với sức mạnh của `CarrierWave`. 
Nó có khả năng định nghĩa bộ tùy chỉnh của xử lí tập tin, nhưng nó có khả năng xử lí tất cả các tập tin đó trong nháy mắt. Một khái niệm thú vị giống như nó làm cho các thư viện không sử dụng được ở trên môi trường production và không có CDN và đó có thể là một lỗ hổng tiềm tàng đối với các cuộc tấn công DDos.
Nó gắn kết giống như nó chia ứng dụng Sinatra ở trên cùng ứng dụng rails của bạn. Cho phép stream các tập tin để cải thiện thời gian render trang và tiết kiệm bố nhớ máy chủ.

## II. Cách sử dụng 
Hãy chắc chắn là bạn phải cài `imagemagick` trên máy của bạn 
`sudo apt-get install imagemagick`
Giờ ta sẽ tạo thử 1 ứng dụng rails
`rails new album`
Tạo 1 thực thể `photo` với câu lệnh `scaffold`
`rails g scaffold photo name`
Chạy lệnh migrate
`rails db:migrate`
Thêm thư viện `refile` và trong file `Gemfile`
```
gem "refile", require: "refile/rails"
gem "refile-mini_magick"
```

Chạy bundle
Kết quả của nó sẽ lỗi như hình dưới đây 
```
Bundler could not find compatible versions for gem "rack":
  In Gemfile:
    rails (< 5.1, >= 5.0.0.rc1) was resolved to 5.0.0.rc1, which depends on
      actioncable (= 5.0.0.rc1) was resolved to 5.0.0.rc1, which depends on
        actionpack (= 5.0.0.rc1) was resolved to 5.0.0.rc1, which depends on
          rack (~> 2.x)

    rails (< 5.1, >= 5.0.0.rc1) was resolved to 5.0.0.rc1, which depends on
      actioncable (= 5.0.0.rc1) was resolved to 5.0.0.rc1, which depends on
        actionpack (= 5.0.0.rc1) was resolved to 5.0.0.rc1, which depends on
          rack-test (~> 0.6.3) was resolved to 0.6.3, which depends on
            rack (>= 1.0)

    refile-mini_magick was resolved to 0.1.0, which depends on
      refile (~> 0.5) was resolved to 0.5.0, which depends on
        sinatra (~> 1.4.5) was resolved to 1.4.5, which depends on
          rack (~> 1.4)

    sass-rails (~> 5.0) was resolved to 5.0.4, which depends on
      sprockets (< 4.0, >= 2.8) was resolved to 3.6.0, which depends on
        rack (< 3, > 1)
```

Bạn có thể chỉ định nguồn git với ref, branch hoặc tag trong Gemfile như sau:
```
gem 'rails', :git => "git://github.com/rails/rails.git", :ref => "4aded"
gem 'rails', :git => "git://github.com/rails/rails.git", :branch => "2-3-stable"
gem 'rails', :git => "git://github.com/rails/rails.git", :tag => "v2.3.5"
```

Sau đó bundle lại , bạn vẫn có thể gặp lỗi như sau:
```
Bundler could not find compatible versions for gem "rack":
  In Gemfile:
    rails (< 5.1, >= 5.0.0.rc1) was resolved to 5.0.0.rc1, which depends on
      railties (= 5.0.0.rc1) was resolved to 5.0.0.rc1, which depends on
        actionpack (= 5.0.0.rc1) was resolved to 5.0.0.rc1, which depends on
          rack (~> 2.x)

    refile was resolved to 0.6.2, which depends on
      sinatra (~> 1.4.5) was resolved to 1.4.5, which depends on
        rack (~> 1.4)

[Can't install on Rails 5 ](https://github.com/refile/refile/issues/447 'Can't install on Rails 5')
```

Nếu bị vậy, chúng ta thay đổi phần `refile` trong Gemfile như sau:
```
gem 'sinatra', github: 'sinatra' #require master to get the rack >= 2.0
# remove version on gem dependency to use sinatra master branch
gem 'refile', require: 'refile/rails', github: 'pgericson/refile', branch: 'stupid-hack-sinatra-version' 
gem 'refile-mini_magick'
```
Và chạy lại bundle, sẽ thêm thành công.
Ta thêm vào trong model `Photo` như sau:
```
class Photo < ApplicationRecord
  attachment :image
end
```

Ta thay đổi để thêm cột `image_id` vào bảng `Photo` như sau:
`rails g migration add_image_to_photos image_id`
Sau đó chạy lệnh `rake db:migrate`
Ở trong form partial, thêm vào file upload, cụ thể:
```
<div class='field'>
    <%= f.attachment_field :image %>
</div>
```

Chắc chắn rằng params `image` phải được đẩy lên ở trong form
```
def photo_params
  params.require(:photo).permit(:name, :image)
end
```

Ở trong file `show.html.erb`, để hiện thị ra ảnh:
```
<%= image_tag attachment_url (@photo, :image) %>
```

Bạn có thể thêm vào vài thuôc tính để thay đổi kích cỡ của ảnh:
```
<%= image_tag attachment_url(@photo, :image, :fill, 100, 100, format: 'jpg') %>
```

Còn nhiều ví dụ về việc sử dụng `refile`, bạn cũng có thể tham khảo tại đây: https://github.com/refile/refile

Bài viết tham khảo tại:
https://www.rubyplus.com/articles/4141-File-Upload-using-Refile-Gem-in-Rails-5
https://infinum.co/the-capsized-eight/best-rails-image-uploader-paperclip-carrierwave-refile