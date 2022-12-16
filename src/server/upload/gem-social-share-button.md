## Giới thiệu
Gem Social Share Button là một thư viện giúp bạn nhanh chóng xây dựng tính năng chia sẻ trên các trang mạng xã hội một cách dễ dàng.
## Cài đặt
Thêm vào Gemfile
```
gem 'social-share-button'
```
Tiếp theo chạy lệnh sau
```
$ bundle install
$ rails generate social_share_button:install
```

## Config

Trong file **config/initializers/social_share_button.rb** bạn có thể chọn mạng xã hội muốn chia sẻ
```
SocialShareButton.configure do |config|
  config.allow_sites = %w(twitter facebook weibo)
end
```
## Sử dụng
Cần phải thêm các require css, js file trong trong ứng dụng
**app/assets/javascripts/application.coffee**
```
#= require social-share-button
#= require social-share-button/wechat # if you need use WeChat
```

**app/assets/stylesheets/application.scss**
```
*= require social-share-button
```

Trong Rails 4.1.6 cần sử dụng import

app/assets/stylesheets/application.css.scss
```
@import "social-share-button";
```

Sau đó dùng social_share_button_tag  trong view. Ví dụ ** app/views/posts/show.html.erb**
```
<%= social_share_button_tag(@post.title) %>
```
Ngoài tiêu đề mặc định ta có thể đặt tiêu đề cho mạng xã hội
```
<%= social_share_button_tag(@post.title, 'data-twitter-title' => 'TheTitleForTwitter') %>
```
Hoặc có thể chỉ định trang xã hội cho phép
```
<%= social_share_button_tag(@post.title, :allow_sites => %w(twitter facebook)) %>
```
Và bạn có thể tùy chỉnh rel thuộc tính
```
<%= social_share_button_tag(@product.name, :rel => "twipsy") %>
```
Bạn có thể chỉ định URL liên kết đến
```
<%= social_share_button_tag(@post.title, :url => "http://myapp.com/foo/bar") %>
```
```
<%= social_share_button_tag(@post.title, :url => "http://myapp.com/foo/bar", :image => "http://foo.bar/images/a.jpg", desc: "The summary of page", via: "MyTwitterName") %>
```
Dưới đây là một số thuộc tính tùy thuộc vào tham số kiểu dữ liệu của bạn


|data-type |  standard | custom :"data-*" prefixed |
| -------- | -------- | -------- |
| link (default)     | title     | data-title     |
|     | url     | data-url     |
| text     | title     | data-title |
| photo     | title     | 	data-caption     |
|     | image     | 	data-source     |
| quote     | title     | data-quote     |
|     |    | data-source   |
## Facebook
Một vài vấn đề dành riêng cho facebook
### Facebook cần thêm mô tả
Phải có thành phần data-desc thì facebook mới chấp nhận 
```
<%= socialsharebuttontag('Share to Facebook', :url => coursepath(@course), desc: @course.name) %>
```
### Chú ý
Việc test trên localhost:3000 sẽ không hoạt động, bạn cần phải test trên một trang thật nếu không sẽ bị facebook từ chối

## Thay đổi kích thước icon
Trong **app/assets/stylesheets/application.scss**
```
$size: 24px;

.social-share-button {
  .ssb-icon {
    background-size: $size $size;
    height: $size;
    width: $size;
  }
}
```
## Nguồn
https://github.com/huacnlee/social-share-button