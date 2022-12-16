Errbit là open source để track các error trong hệ thống của bạn nhờ sử dụng API của Airbrake.
Nó là công cụ để tổng hợp và quản lý các errors một cách hiệu quả và nhanh. Đây là open source, vậy bạn chỉ cần clone về và deploy lên server là xong.

# Cài đặt Errbit
**Requirement của Errbit :**
* Ruby >= 2.3.x
* MongoDB 3.4.x-4.0.x

Để install MongoDB, bạn có thể tham khảo link này: 
https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04

Sau khi bạn cài đặt thành công requirement trên xong, thì bạn có thể cài đặt Errbit như sau:

* git clone https://github.com/errbit/errbit.git
* bundle install
* Bạn vào .env.default, bạn sẽ thấy các biến môi trường. Bạn có thể sửa lại theo yêu cầu thực tế của mình. Chi tiết về biến môi trường này, bạn đọc tại https://github.com/errbit/errbit/blob/master/docs/configuration.md

* bundle exec rake errbit:bootstrap
* bundle exec rails server

Đến đây server Errbit đã config xong và chạy thành công. 

# Chạy Errbit server và kết nối với hệ thống Rails
* Login với email và password khi bạn đã chạy seed ở trên.
![](https://images.viblo.asia/4e26328c-90c1-485e-8c88-ea60e78c9155.png)


* Màn hình danh sách các Application của bạn. 
![](https://images.viblo.asia/2301a4f3-4ee4-4948-8d4b-b3b5eccdf64b.png)

* Tạo Application mới
![](https://images.viblo.asia/f1ec5f03-62c0-45af-9614-50974ae6abef.png)
* Sau đó nó sẽ show các hướng dẫn để link nó với hệ thống của mình. 
![](https://images.viblo.asia/8438d54a-8d83-410f-805a-0cc8ea473581.png)

`Gemfile`
```
gem "airbrake", "~> 5.0"
```

`config/initializers/errbit.rb`
```
Airbrake.configure do |config|
  config.host = 'http://localhost:3000'
  config.project_id = 1 # required, but any positive integer works
  config.project_key = 'af0c342368112310d9205f4112bb93be'

  # Uncomment for Rails apps
  # config.environment = Rails.env
  # config.ignore_environments = %w(development test)
end
```


Copy code trong hướng dẫn trên, sau đó chạy hệ thống của bạn. Khi có các erors, nó sẽ hiển thị các log cho bạn vào trong server Errbit rất rõ ràng và dễ quản lý.

![](https://images.viblo.asia/ef4b502c-7e99-4173-9389-8f0605d74304.png)

![](https://images.viblo.asia/e7d1d1c3-6db1-4e65-bfa4-6e8760bbfc75.png)

Để chi tiết hơn, bạn tham khảo các link sau đây:

https://github.com/errbit/errbit

https://gorails.com/episodes/rails-error-tracking-with-errbit?autoplay=1