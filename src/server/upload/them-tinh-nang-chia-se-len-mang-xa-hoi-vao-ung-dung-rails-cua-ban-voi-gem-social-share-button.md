## Giới thiệu

Chào các bạn, chắc ai trong chúng ta hay lướt web ở một số trang website như thương mại điện tử, blog, forum hay là website về du lịch, ẩm thực đều bắt gặp button chia sẽ nhanh lên mạng xã hội.  Vậy thì làm sao để project của mình cũng có tính năng như thế. Sau đây mình sẽ hướng dẫn các bạn thêm tính năng chia sẽ lên mạng xã hội như facebook, google, twitter,... vào ứng dụng Rails của bạn với gem Social Share Button. :grinning:

## Những website mà gem hỗ trợ

* Facebook
* Twitter
* Douban
* Google+
* Weibo
* QZone
* Google Bookmark
* Delicious
* Tumblr
* Pinterest
* Email
* LinkedIn
* WeChat (Weixin)
* Vkontakte
* Odnoklassniki
* Xing
* Reddit
* Hacker News
* Telegram
* WhatsApp


Nếu dùng tất cả thì bạn sẽ có full bộ button không che như sau:

![](https://images.viblo.asia/094ae71e-7797-41ac-b54d-db04193fa839.png)

Thường thì mình chỉ muốn share lên vài website mà mình muốn. Mình sẽ hướng dẫn các bạn cách config để giới hạn button ở sau. 

## Cài đặt

Thêm gem vào Gemfile của bạn

```
gem 'social-share-button'
```

Sau đó chạy lệnh sau để cài đặt

```
$ bundle install
$ rails generate social_share_button:install
```

## Cấu hình

Bạn có thể cấu hình trong `config/initializers/social_share_button.rb` để chọn nhưng mạng xã hội mà bạn muốn chia sẽ lên. 

```
SocialShareButton.configure do |config|
  config.allow_sites = %w(twitter facebook google_plus google_bookmark email)
end
```

Ở trên thì mình chỉ muốn user có thể chia sẽ lên facebook, google+, google bookmark, email mà thôi.

## Sử dụng như thế nào?

Đầu tiên, bạn cần require file js, css vào trong thư mục assets.

Tại `app/assets/javascripts/application.js` bạn thêm dòng

```
//= require social-share-button
```

Tại `app/assets/stylesheets/application.css` bạn cũng thêm dòng

```
*= require social-share-button
```

Trong proejct website bán hàng của mình có chức năng show product để người dùng có thể xem thông tin sản phẩm. Và cũng button để người dùng có thể nhanh chóng share lên mạng xã hội của họ. Trong ProductsController có action show như sau

```
class ProductsController < ApplicationController
  def show
    @product = Product.find_by id: params[:id]
  end
end
```

Đoạn code đơn giản trên thì mình không cần giải thích đúng không @@. Tiếp theo, trong view `app/view/products/show.html.erb`  ta sử dụng method heplper `social_share_button_tag`

```
<% = social_share_button_tag(@product.name) %>
```

sau đó chạy thử, vào trang show product, được như sau

![](https://images.viblo.asia/56ddef82-1d3c-474f-a3e9-0a8a66f0e152.png)

rất đơn giản, đúng không nào :+1:. Ngoài tiêu đề mặc định, bạn có thể chỉ định tiêu đề cho mạng xã hội đặc biệt:

```
<%= social_share_button_tag(@product.name, 'data-twitter-title' => 'TheTitleForTwitter') %>
```

Và bạn có thể tùy chỉnh thuộc tính rel:

```
<%= social_share_button_tag(@product.name, :rel => "twipsy") %>
```

Bạn cũng có thể chỉ định URL mà nó liên kết đến:

```
<%= social_share_button_tag(@product.name, :url => "http://myapp.com/foo/bar") %>
```

### Chỉ Facebook

Một vài vấn đề chỉ dành cho facebook.

Facebook cần thêm description

```
<%= social_share_button_tag('Share to Facebook', :url => course_path(@course), desc: @course.name) %>
```

Test trên local của bạn sẽ không hoạt động. Bạn sẽ cần kiểm tra từ một trang web trực tiếp hoặc Facebook sẽ từ chối nó.

## Custom size cho các button

Bạn có thể override css để thay đổi kích thước của các button

Trong `app/assets/stylesheets/application.css` bạn thêm đoạn css này vào

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

## Lời cuối

Vậy là mình đã hướng dẫn xong cho các bạn cách thêm tính năng chia sẽ lên mạng xã hội với gem Social Share Button. Hi vọng qua bài hướng dẫn đơn giản này các bạn có thể tự tạo cho mình nhưng button share. Bạn viết có thể còn thiếu sót, rất mong các bạn có thể góp ý thêm cho mình bằng các comment ở phía dưới. Cảm ơn các bạn đã đọc đến đây !! :grinning:

Link tham khảo: https://github.com/huacnlee/social-share-button