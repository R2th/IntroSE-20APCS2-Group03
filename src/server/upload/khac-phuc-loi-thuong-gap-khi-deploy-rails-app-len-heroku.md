Chào mọi người! :heart_eyes:

Nếu nói về các bài viết hướng dẫn deploy ứng dụng rails lên heroku hay vps mình cũng đã thấy rất nhiều. Trong những ngày đầu tập tành bản thân mình cũng search và làm theo các hướng dẫn đó. Tuy vây mà trong quá trình sau này, mỗi project mình lại khởi tạo khác nhau. Nên khi deploy lên phát sinh rất nhiều lỗi. Cũng chính vì vậy mà mình phải đọc Log cũng như tìm kiếm cách khắc phục khá nhiều. Dần dần cũng tích lũy được một số lỗi cơ bản.

Bài viết này dựa trên kinh nghiệm cá nhân của mình. 
## Lỗi sinh ra từ file Gemfile
Khi nhiều bạn deploy ứng dụng lên heroku. Nếu nhận được thông báo như sau

```
remote:  !     Failed to install gems via Bundler.
**remote:  !     Detected sqlite3 gem which is not supported on Heroku:**
remote:  !     https://devcenter.heroku.com/articles/sqlite3
remote:  !
remote:  !     Push rejected, failed to compile Ruby app.
remote: 
**remote:  !     Push failed
remote: Verifying deploy...
remote: **
remote: !	Push rejected to viblo-demo.
```
![](https://images.viblo.asia/3f494a62-7fea-4312-b658-c80702a205bd.png)

Lỗi này thì cơ bản đã quá rõ ràng. Do heroku không hỗ trợ sqlite làm database cho ứng dụng, trong khi file Gemfile của bạn lại đang sử dụng nó ( Đặt nằm ngoài group :development). Cách giải quyết đơn giản là bạn hãy mở file gemfile lên, tìm và di chuyển nó vào group development. 

```
group :development do
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "web-console", ">= 3.3.0"
  gem "sqlite3", "~> 1.3.6"
end
```
Đừng quên sử dụng postgress làm DB cho ứng dụng rails của bạn trên môi trường production của heruko nhé. 
```
group :production do
  gem "pg"
  gem "rails_12factor"
end
```
Và nhớ thêm 1 điều nữa là sửa cấu hình lại adapter trong file **config/database.yml** nữa. File mẫu cho các bạn sử dụng luôn
```
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: myapp_development

test:
  <<: *default
  database: myapp_test

production:
  <<: *default
  database: myapp_production
  username: myapp
  password: <%= ENV['MYAPP_DATABASE_PASSWORD'] %>
```

**Lưu ý thêm**
Sau khi có sự chỉnh sửa (thêm và bớt gem) trong file Gemfile. Các bạn hãy chạy lệnh `bundle install --without production` để cập nhật lại các gem cũng như file Gemfile.lock được cập nhật mới nhất. Sau đó git `add . và git commit` lại và `git push heroku master `. Nếu không sẽ nhận được thông báo này
```
       You are trying to install in deployment mode after changing
       your Gemfile. Run `bundle install` elsewhere and add the
       updated Gemfile.lock to version control.
       
       The dependencies in your gemfile changed
       
       You have added to the Gemfile:
       * pg
       * rails_12factor
 !
 !     Failed to install gems via Bundler.
 !
 !     Push rejected, failed to compile Ruby app.
 !     Push failed
```

### Nếu như các bạn đã làm đúng các bước trên mà vẫn nhận được thông báo lỗi xảy ra liên quan đến sqlite thì hãy kiểm tra 2 lý do sau đây

1. Bạn có đang đứng ở nhánh master trên local để `git push heroku master` hay đang đứng nhầm ở nhánh khác, nãy giờ edit ở nhánh khác master mà lại sử dụng lệnh đó ??
2. Nếu bạn đang có ý định đẩy branch khác lên heroku thay vì master thì hãy sử dụng lệnh này `git push heroku branch-can-push:master`
 ( Xem thêm hướng dẫn cụ thể từ heroku [tại đây](https://devcenter.heroku.com/articles/git#deploying-from-a-branch-besides-master) )
 
## Lỗi sinh ra do file .gitignore

Các bạn có thể khi dùng lệnh git push heroku master -> Đẩy toàn bộ code trong project trên máy của bạn lên nhánh master của app trên heroku. Heroku dùng nó để deploy.
Cách hoạt động cũng giống như khi các bạn push lên github vậy. Bởi khi dùng lệnh `heroku create` để tạo 1 app mới. Nó đã sinh ra cho bạn 1 cái remote tên là heroku. Do đó mà những file nằm trong file .gitignore sẽ không được đẩy lên.

Mình hay làm việc với github nên mình sẽ thường dùng cấu trúc file `.gitignore` như bên dưới. Mình thường loại bỏ đi file cấu hình DB `config/database.yml,` thư mục `bin` ( vì không muốn đổi lên github). 
Và một trong số lỗi mình gặp chính là từ việc đã ignore thư mục BIN này.

```
/.bundle
/db/*.sqlite3
/db/*.sqlite3-journal
/log/*
/tmp/*
!/log/.keep
!/tmp/.keep
/storage/*
!/storage/.keep
/yarn-error.log
/public/assets
.byebug_history
/config/master.key
/.bundle
/vendor/bundle
.byebug_history
.rubocop.yml
.rubocop_disabled.yml
.rubocop_enabled.yml

config/settings.local.yml
config/settings/*.local.yml
config/environments/*.local.yml
config/database.yml

**bin/***
```
Khi các bạn deploy lên. Vẫn nhận được thông báo thành công. Nhưng khi truy cập vào App sẽ nhận được 1 trang index mà bất kỳ ai cũng đều không thích


Check log Realtime bằng lệnh `heroku logs --tail` bạn sẽ nhận có thể biết về lỗi này như sau.
`bash: bin/rails: No such file or directory`

> Bởi thư mục Bin này chứa Rails Script để khởi động ứng dụng của bạn và có thể chứa các tập lệnh khác mà bạn sử dụng để setup, update, deploy hoặc chạy ứng dụng của mình. Do đó khi được đẩy lên heroku. Heroku sẽ dùng để chạy 1 số script. Do thư mục này không tồn tại nên ứng dụng sẽ bị crash

```
2019-03-17T16:32:51.088313+00:00 heroku[web.1]: State changed from starting to crashed
2019-03-17T16:32:59.973370+00:00 app[web.1]: bash: bin/rails: No such file or directory
2019-03-17T16:34:07.871215+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/" host=viblo-demo.herokuapp.com request_id=86cbe003-c0b4-456b-8a36-a1c6d02e4c01 fwd="171.225.38.167" dyno= connect= service= status=503 bytes= protocol=http
2019-03-17T16:34:08.491359+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/favicon.ico" host=viblo-demo.herokuapp.com request_id=86ca06ce-1ea4-40a8-bb0c-2748248dcbf4 fwd="171.225.38.167" dyno= connect= service= status=503 bytes= protocol=http
```
![](https://images.viblo.asia/ed235517-30b5-45dc-b6cd-62a525dfdfec.png)


**=> Cách khắc phục: **  Xóa thư mục bin ra khỏi` .gitignore`. Sau đó `git rm -r --cached bin` và git add , commit, push lên lại

## Ứng dụng Realtime sử dụng ActionCable không hoạt động?

Tham khảo cách khắc phục chi tiết mình đã đề cập ở bài viết này: https://viblo.asia/p/cai-redis-cho-ung-dung-rails-su-dung-action-cable-redis-heroku-6J3Zgj6RKmB

## 
## Kết luận

Bài viết của mình đã đề cập một lỗi lỗi cơ bản khi bạn deploy rails app lên heroku khiến ứng dụng của bạn không chạy được hoàn hảo được như bạn mong đợi. Đó cũng là những sự cố mà mình đã từng gặp. Cái quan trọng là khi có lỗi xảy ra, hãy đọc logs realtime bằng cách sử dụng lệnh.

### heroku logs --tails 

Từ đó các bạn sẽ biết được lỗi do đâu và khắc phục thế nào. 
Hi vọng sẽ giúp ích được cho các bạn sau này. Mình sẽ tiếp tục bổ sung bài viết cũng như nếu có bất kỳ góp ý, đóng góp nào cho phần nội dung. Xin hãy để lại ở phần bình luận . Cảm ơn các bạn!

> Trích dẫn bài viết vui lòng ghi nguồn:  nguyen.huu.hung - Viblo