# Asset Pipeline
## Asset pipeline là cái chi chi?
> Asset pipeline phụ trách công việc chính là: ghép lại (Concatenation) và giảm thiểu (Minification) hoặc nén (Compress) các tập tin Javascript, CSS. 

**Giải thích:**
1. **Sự ghép lại - Concatenation**: Ghép nhiều tập tin thành một tập tin.
2. **Giảm thiểu - Minification**: quá trình loại bỏ tất cả các ký tự không cần thiết khỏi mã nguồn của ngôn ngữ lập trình được thông dịch hoặc ngôn ngữ đánh dấu mà không làm thay đổi chức năng của nó.
3. **Nén - Compress**: Một trình xử lý nén cho CSS và Js.

Thế lực đứng sau Asset pipeline đó là gem [sprockets-rails](https://github.com/rails/sprockets-rails), từ phiên bản Rails 4 Asset pipeline được cài đặt và bật mặc định.

## Asset Pipeline mang lại những gì cho Rails?
Khi chúng ta sử dụng một công nghệ hay kỹ thuật bất kỳ thì luôn luôn có lý do cho câu hỏi “*Ủa, tại sao lại dùng nó?*”.
Chúng ta cùng đi tìm hiểu 3 đặc điểm nổi bật được Rails đưa ra để trả lời câu hỏi này.
### Concatenate assets
Dịch nôm na là ghép những tài sản - tài sản ở đây được hiểu là các tập tin css và js của bạn đó. Có thể định nghĩa lại là: ghép các tập tin css và js.
Cụ thể hơn tất cả các tập tin CSS trong ứng dụng của bạn sẽ được ghép thành một tập tin duy nhất, tương tự với Js cũng vậy. 

**Lợi ích**: 
Điều này giúp giảm thiểu request tới server để tải xuống các tập tin css và js. Vì mọi thứ đã được ghép lại thành một thì sẽ chỉ mất một request thôi.
Các tập tin sẽ được cache trên browser người dùng. Nếu các bạn để ý với những request với phương thức GET sẽ được browser, http server (Apache, Nginx) cache lại nếu các request là giống nhau (bao gồm các tập tin như css, js, image, ...).

Cách làm này lại có một vấn đề phát sinh là: do chúng ta chỉ thay đổi nội dung của các tập tin trong khi tên của tập tin không thay đổi thì browser hay http server sẽ không biết được tập tin đó đã thay đổi. Do đó sẽ trả về cho người dùng tập tin từ cache chứ không phải tập tin mới nhất. 

Để giải quyết vấn đề này Asset pipeline áp dụng kỹ thuật **Fingerprinting**: Nội dung tập tin thay đổi thì tên của tập tin cũng thay đổi theo. Rails thêm một đoạn mã **SHA256** vào tên của tập tin. 
Ví dụ: 
`global-908e25f4bf641868d8683022a5b62f54.css`

Vậy bất cứ khi nào nội dung thay đổi thì browser và http server sẽ biết sự thay đổi đó thông qua tên của tập tin.

### Minification or compress assets
Giảm thiểu hoặc nén các tập tin. Mục đích rất dễ hiểu, giúp cho tập tin có size nhỏ hơn để việc truyền tải nhanh hơn. 
Giảm thiểu ở đây có thể được hiểu là bỏ những khoảng trắng, xuống dòng không cần thiết. Điều này khá đơn giản với CSS nhưng lại khá phức tạp đối với Js.

### Support SASS, CoffeeScript, ERB
Việc này hỗ trợ bạn viết CSS và JS bằng một ngôn ngữ cấp cao hơn như SASS cho CSS hoặc CoffeeScript cho JS, hoặc ERB cho cả 2. Trước khi được áp dụng Asset pipeline thì chúng được Rail hỗ trợ biên dịch sang CSS và JS. Đó là lý do chúng ta sử dụng các tập tin .scss, .coffee trong Rails rất dễ dàng. Không cần quan tâm đến việc biên dịch scss thành css rồi mới sử dụng.

## Cách sử dụng Asset Pipeline
Với những phiên bản trước của Rails thì tất cả các assets được lưu trữ trong thư mục public như images, stylesheets, javascript. Nhưng hiện tại chúng được lưu trữ trong thư mục app/assets. Những file trong thư mục này sẽ được phục vụ thông qua [Sprocket middleware](https://www.sitepoint.com/sprockets-dissected-rack-middleware/) .

Assets vẫn có thể được lưu trữ trong thư mục public nhưng chúng sẽ được xử lý như những file tĩnh bởi ứng dụng hoặc web server khi có thiết lập `config.public_file_server.enabled =  true`. Bạn nên đặt những tập tin phải precompile trong thư mục `app/assets` trước khi chúng được sử dụng.

**Chú ý:** Trong môi trường production, Rails precompile những file trong thư mục app/assets vào trong public/assets. Sau đó thư mục app/assets sẽ được sử dụng thay vì app/assets.

### Manifest files và Directives
Để điều khiển được asset pipeline sẽ phục vụ những tập tin nào và thứ tự của những file đó như thế nào? Chúng ta cần biết tới **Manifest Files** và **Directives**.

**Chú thích:**
* **Manifest files** là tập tin chứa các *Directives*.
* **Directives** là những chỉ dẫn những file cần cho vào asset pipeline.

Rất dễ dàng chúng ta có thể thấy trong Rails đó là 
`app/assets/stylesheets/application.scss(.css)` là Manifest file. 

```
 //app/assets/stylesheets/application.scss
 *= require_tree . //Directive
 *= require_self  //Directive
 *= require home //Directive
```
 
Mình sẽ không đề cập tới js trong bài vì Rails 6 sử dụng [Webpacker](https://github.com/rails/webpacker) thay vì Asset Pipeline cho Js. 
Các Directives như sau: 
* **require_tree** : chỉ thị cho Asset pipeline tải tất cả các file trong thư mục hiện tại. Kể cả tập tin trong thư mục con của thư mục hiện tại.
* **require_self**: Tải chính tập tin hiện tại. Ở ví dụ trên chính là application.scss.
* **require**: Tải một tập tin được chỉ định.

**Chú ý**: Nếu các bạn muốn tải các tập tin `.scss` thì hãy sử dụng @import thay vì directive. Vì một số lý do liên quan tới scope variable, mixin của scss.

### Những vị trí mặc định sử dụng Asset pipeline
Chúng ta đặt ra câu hỏi, nếu chỉ với Manifest file và directive như trên thì Asset Pipeline sẽ tải tập tin nào và ở đâu?

Asset Pipeline mặc định sẽ tìm kiếm những tập tin mà bạn chỉ định trong Manifest ở 3 nơi và theo thứ tự ưu tiên là: app/assets, lib/assets, vendor/assets.
Một tập tin ở thư mục có độ ưu tiên cao hơn sẽ ghì đề tập tin cùng tên và cấp ở thư mục có độ ưu tiên thấp hơn.
Chúng ta thường hay sử dụng nhiều nhất là app/assets. Hoàn toàn có thể thêm những thư mục khác. 
Ví dụ: Hiện tại chúng ta có các tập tin css như sau.
```
app/assets/stylesheets/home.css
lib/assets/stylesheets/moovinator.css
vendor/assets/stylesheets/slider.css
vendor/assets/stylesheets/phonebox.css
```

Tập tin manifest sẽ như sau:
```
*= require home
*= require moovinator
*= require slider
*= require phonebox
```

**Chú ý:** 
Bạn có thể kiểm tra đường dẫn mà Asset Pipeline đã tìm kiếm để kiểm tra xem đã có những tập tin mà bạn mong muốn hay chưa bằng cách sử dụng :
`Rails.application.config.assets.paths` trong rails console.
Ví dụ : 
```
["/home/***/projects/xxx/app/assets/config",
 "/home/***/projects/xxx/app/assets/images",
 "/home/***/projects/xxx/app/assets/stylesheets",
 "/home/***/.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/gems/actioncable-6.0.3.4/app/assets/javascripts",
 "/home/***/.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/gems/activestorage-6.0.3.4/app/assets/javascripts",
 "/home/***/.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/gems/actionview-6.0.3.4/lib/assets/compiled",
 "/home/***/.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/gems/turbolinks-source-5.2.0/lib/assets/javascripts"]
```

## Sự khác bọt giữa 2 môi trường development và production
### Môi trường development
Những tập tin được chỉ định trong manifest `app/assets/stylesheets/application.scss` sẽ được tải riêng biệt. Chứ không thông qua tập tin đã được xứ lý bằng Asset Pipeline.
Dễ dàng kiểm tra ứng dụng của bạn trên browser.
![](https://images.viblo.asia/b2d3883b-52af-4a79-b892-ac41690e36aa.png)

### Môi trường production
Như đề cập ở trên, với môi trường production sẽ không sử dụng những tập tin trong trong thư mục `app/assets` mà sẽ sử dụng tập tin đã được xử lý bằng Asset Pipeline lưu tại `public/assets`.

Khi bạn deploy sang môi trường production luôn có một câu lệnh được chạy nếu project của bạn chưa được precompile.

`rake assets:precompile`

Hoặc bạn có thể thực hiện precompile dưới local bằng command:
`RAILS_ENV=production rails assets:precompile`

**Kết quả:**
![](https://images.viblo.asia/06394934-e1d2-4cb3-ab95-4e313fa11201.png)

Tất cả những tập tin riêng lẻ trong thư mục app/assets sẽ được gộp thành application-xxx.css. Tập tin này sẽ được sử dụng trong ứng dụng của bạn.

### Cách sử dụng Asset pipeline với các tập tin font, image, video, audio, …
Khi các bạn sử dụng Asset pipeline với các tập tin như font, image, video, audio, ... thì phải dùng thông qua các helper do sass-rails cung cấp. Nếu không cẩn thận bạn sẽ gặp tình trạng ở dưới môi trường develop ứng dụng của bạn chạy ngon mà khi chuyển sang môi trường production thì bị lỗi css, font, image, video ... tùm lum.

Với .scss chúng ta sử dụng dấu "-": image-path, image-url, font-path, font-url,... hoặc đơn giản là asset-path, asset-url (Chúng sẽ lo hết mọi việc còn lại cho bạn).
Một bài viết rất dễ hiểu và đơn giản sau đây sẽ hướng dẫn bạn sử dụng Asset Pipeline với font.
https://guides.rubyonrails.org/asset_pipeline.html#coding-links-to-assets
https://coderwall.com/p/v5c8kq/web-fonts-and-rails-asset-pipeline

## Kết luận
Mọi thông tin trong bài viết phục vụ cho mục đích cung cấp thông tin cơ bản nhất về Asset Pipeline trong Rails, mong bạn đọc phần nào hiểu hơn về cách xử lý các tập tin bên dưới Rails nói riêng và Rails nói chung.

Thanks for reading to my post! <3

## Tham khảo
1. https://guides.rubyonrails.org/asset_pipeline.html