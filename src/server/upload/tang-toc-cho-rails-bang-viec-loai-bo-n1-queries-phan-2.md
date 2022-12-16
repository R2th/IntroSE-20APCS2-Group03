### **I. Loại bỏ N+1 queries dùng gem Bullet**

- Bước đầu tiên là đảm bảo rằng các queries có thể được tối ưu hóa
- Ngoài việc review các pull requests một các cẩn thận, chia sẻ kiến thức với nhau, ta có thể sử dụng thêm CI như một công cụ kiểm tra tự động các truy vấn không hiệu quả.
- Để cài đặt Bullet vào dự án, đầu tiên ta thêm vào `Gemfile`

```ruby
gem "bullet"
```

- Tiếp theo, thêm vào `app/environments/test.rb` các config để enable bullet

```ruby
config.after_initialize do
  Bullet.enable = true
  Bullet.bullet_logger = true
end
```

- Cuối cùng, thêm vào Rspec để tìm kiếm và log lại các truy vấn N+1

```
# spec/spec_helper.rb

RSpec.configure do |config|
  if Bullet.enable?
    config.before(:each) { Bullet.start_request }
    config.after(:each)  { Bullet.end_request }
  end
end
```

- Với các bước trên, mọi N+1 queries đều được ghi lại trong file `log/bullet.log` dưới dạng:

```
USE eager loading detected
  Build => [:branch]
  Add to your finder: :includes => [:branch]
```

### **II. Phòng tránh N+1 queries**

- Ngoài việc ghi lại các N+1 queries bằng `bullet`, ta cũng có thể dừng tiến trình và raise ra lỗi khi gặp các N+1 queries trong quá trình test bằng cách thêm vào config như sau:

```
# config/environments/test.rb

config.after_initialize do
  Bullet.enable = true
  Bullet.bullet_logger = true
  Bullet.raise = true # raise an error if an n+1 query occurs
end
```

- Việc này sẽ trả về lỗi khi gặp các truy vấn N+1, khi đó, ta có thể đám bẳo rằng không tồn tại các N+1 queries trong source code.

### **III. Loại bỏ N+1 queries trong các dự án lớn**

- Trong khi tiếp tục phát triển các dự án lớn đã có tồn tại rất nhiều N+1 queries, ta không thể phòng tránh N+1 queries chủ động như phương án trên. Khi đó CI sẽ không thể hoạt động cho đến khi fix hết tất cả các queries.
- Trong trường hợp này, cách tốt nhất là thu thập các N+1 queries đã có và cho vào một blacklist, ta sẽ bỏ qua backlist này và chỉ cần kiểm tra source code mới mà ta thêm vào. Bằng cách này, ta có thể chủ động phòng tránh các N+1 queries trong code mới được thêm vào như phương án trên.
- Tiếp theo ta có thể lần lượt loại bỏ các N+1 queries trong blacklist một cách từ từ đến khi source code được clear và loại bỏ hoàn toàn N+1 queries.

### **IV. Làm thế nào để đối phó với N+1 queries**

- Trên đây là một số phương pháp đối phó với N+1 queries.
- Hãy chia sẻ thêm các phương pháp của bạn để mọi người cùng tham khảo.

## **Tài liệu tham khảo**
https://semaphoreci.com/blog/2017/08/09/faster-rails-eliminating-n-plus-one-queries.html

## **Cảm ơn đã theo dõi**