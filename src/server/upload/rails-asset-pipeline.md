## Rails Asset Pipeline và những điều cần biết

### Asset pipeline là gì?


Nếu bạn đang xây dựng ứng dụng Rails, có thể bạn đã nghe nói về asset pipeline. Asset pipeline được coi là công cụ và cơ chế mà theo đó các tệp Javascript, Style, Image được xử lý và chuẩn bị để trình duyệt sử dụng. Các quy trình này gồm có thu nhỏ, nén nội dung và các bước tiền xử lý cho các ngôn ngữ  Coffeescript or Sass.

Asset pipeline ược tạo để giải quyết một loạt vấn đề liên quan đến tài sản tĩnh. 
 - Một vấn đề  là mỗi nội dung được chỉ định riêng biệt trong HTML phải được truy xuất riêng, dẫn đến số lượng yêu cầu HTTP cao và dẫn tới thời gian tải lâu hơn. Các tệp Javascript và CSS thô(chưa tối ưu) cũng có thể lãng phí rất nhiều băng thông với các comment, khoảng trắng thừa và các tên biến dài. 
 - Một vấn đề khác liên quan đến bộ nhớ đệm. Ví dụ: khi bạn cấp phát tệp Javascript từ máy chủ của mình, trình duyệt sẽ tự động lưu trữ tệp đó trong một khoảng thời gian. Điều đó cải thiện thời gian tải trang, nhưng điều gì xảy ra nếu nội dung đó thay đổi vào thời điểm sau đó? Trình duyệt sẽ không biết về nó, do đó, trình duyệt sẽ tiếp tục sử dụng nội dung được lưu vào bộ nhớ cache cho đến khi hết tuổi thọ bộ nhớ cache. Cuối cùng, các ngôn ngữ như Coffeescript, Sass, Less và Erb giúp dễ dàng tổ chức và viết Javascript và CSS, nhưng trình duyệt không thể diễn giải trực tiếp, vì vậy cần phải có bộ xử lý trước để chuyển đổi các tệp đó thành các đối tác thích hợp của chúng trước khi chúng được gửi tới trình duyệt.

Asset Pipeline có thể giải quyết tất cả các vấn đề trên khi được sử dụng đúng cách. Nó có thể biên dịch nhiều tài nguyên thành một, rút gọn và nén nội dung, cung cấp tiêu hóa tài nguyên để tránh các vấn đề về bộ nhớ đệm và có thể xử lý trước các ngôn ngữ thay thế và biến chúng thành Javascript và CSS. 

Bài viết này bảo gồm nhiều chủ đề khác nhau liên quan đến Asset Pipeline:
 * Các khái niệm cơ bản về cách sử dụng Asset Pipeline
 * Các phương pháp hay nhất để cấu trúc vị trí đặt nội dung của bạn.
 * cách sử dụng mảng biên dịch trước để chỉ định tệp nào được xử lý bằng Asset Pipeline
 * làm thế nào Sass và Coffeescript có thể được kế thừa
 * Làm thế nào để sử dụng Rails Helper Asset.

### Sử dụng cơ bản

Có hai cách cơ bản mà Asset pipeline được sử dụng:

1. Khi chạy một máy chủ trong chế độ development, nó sẽ tự động xử lý trước và chuẩn bị tài nguyên của bạn một cách nhanh chóng.

2. Ở chế độ production, có thể bạn sẽ sử dụng chế độ này để xử lý trước, phiên bản hóa và nén, biên dịch nội dung của mình. Bạn có thể làm như vậy bằng cách chạy lệnh sau:

```
bundle exec rake assets:precompile
```

Điều này sẽ tạo (theo mặc định) một thư mục `asset` trong thư mục `public/` của bạn.
Sau đó nó sẽ thêm tất cả các tập tin nén và biên dịch vào thư mục đó, trong các định dạng thích hợp và với các phiên bản mới. Sau đó, bạn có thể thiết lập Nginx hoặc Apache để trực tiếp quản lý các tệp đó để Rails không phải phân phối chúng. 

Hãy nhớ rằng mặc định có thể được thay đổi, vì vậy nếu mọi thứ không hoạt động như mong đợi, hãy kiểm tra tệp cấu hình ứng dụng của bạn trong `config/initializers/assets.rb`.

### Cấu trúc tệp

Điều quan trọng là tổ chức tài sản của bạn theo cách dễ hiểu đối với bạn và tạo điều kiện cho chức năng hiện có của Asset pipeline.

```
rails-app/
    app/
        assets/
            images/      # Image assets
            javascripts/ # Custom Javascript/coffeescript
            stylesheets/ # Custom CSS/Sass
    ...
    vendor/ #node_modules
        assets/
            javascripts/ # Javascript libraries, etc.
            stylesheets/ # Vendor themes, javascript library themes, etc.


```


### Precompilation
Bạn có thể tự hỏi nếu mọi thứ bạn đưa vào ứng dụng `/ assets / javascripts / folder` sẽ được tự động biên dịch cho ứng dụng của bạn. May mắn thay, `asset pipeline ` cung cấp một cách để chỉ định tệp nào được biên dịch và theo thứ tự nào. Theo mặc định, `application.css` và `application.js` (hoặc tương đương `sass / coffeescript` của chúng), cùng với tất cả các `asset` không phải Javascript, không phải CSS được bao gồm. Để  thêm CSS hoặc Javascript ngoài application.css và application.js, bạn cần làm theo một trong hai cách:

1. Thêm file cần sử dụng vào trong thư mục `config/initializers/assets.rb`.
2. Sử dụng các lệnh yêu cầu mở rộng của js, css.

##### Tùy chọn đầu tiên:

```ruby
# In config/initializers/assets.rb
Rails.application.config.assets.precompile += %w( some-other-file.js even-another.css )
```

Tùy chọn này phù hợp nhất cho các tệp có ý nghĩa khi chỉ bao gồm trên các trang nhất định và không được đưa vào các trang khác.
Ví dụ: nếu bạn có một phần của trang web sẽ được sử dụng làm tiện ích con được nhúng iframe, bạn chỉ có thể muốn `widget.js and widget.css` hoặc tương tự, được sử dụng trên trang đó. Các tệp đó sẽ phải được thêm vào mảng biên dịch như được hiển thị ở trên.
 
##### Tùy chọn thứ hai: 
là những gì nên được sử dụng hầu hết thời gian, và cho phép các tệp Javascript và CSS của bạn được biên dịch thành một tệp application.js và một tệp application.css

Trong coffeescript, nó trông như thế này:

```javascript
# In application.coffee
#
#= require jquery
#= require jquery_ujs
#= require_tree .
```


Tệp này bao gồm jquery, jquery_ujs, và tất cả các tệp trong thư mục hiện tại `(i.e. app/assets/javascript/*).`.

Lưu ý rằng require_tree không biên dịch tài sản đệ quy thông qua các thư mục. Nếu bạn có một thư mục chứa các tệp mà bạn muốn đưa vào, bạn cũng sẽ phải thêm tệp đó vào tệp kê khai.

```
#= require_tree ./components
```

Một chỉ thị rõ ràng hơn là require_self, được sử dụng để bao gồm Javascript của tệp hiện tại tại điểm đó trong chuỗi. Ở trên, với require_self có thể được viết bằng một tệp .js như sau:

```
// In application.js
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//= require_tree ./components
//= require_self
```

Tệp kê khai Sass / CSS sử dụng cùng một định dạng cơ bản, nhưng với kiểu nhận xét thích hợp:

```
/** In application.css
 *
 *= require reset
 *= require global
 *= require layout
 */
```
Lưu ý rằng khi sử dụng Sass, bạn cần phải sử dụng quy tắc `@import` để tận dụng các biến và mixin, vì mỗi tệp được tệp kê khai biên dịch có phạm vi riêng.
Hãy cẩn thận với việc sử dụng chỉ thị require_tree của bạn. Nội dung trong cây sẽ được bao gồm theo thứ tự bảng chữ cái, có nghĩa là nếu tệp bắt đầu bằng “a” phụ thuộc vào tệp bắt đầu bằng “z”, bạn có thể gặp sự cố trong đó các phần cần thiết không khả dụng khi Javascript là được đánh giá bởi trình duyệt

Vấn đề này có thể tránh được bằng cách sử dụng `jQuery(document).ready(), or window.onload` thích hợp, bằng cách chỉ định một cách thủ công, hoặc đặt tiền tố cho các tập tin với các số như 01_, 02_:

```
# application.js
# Note that the `.js` isn't needed at the end of the filename.
#
#= require subfolder/library
#= require subfolder/depends-on-library
```

### Sass and Coffescript vs Rails Asset Helpers

Tôi đã đề cập đến Sass và Coffeescript một chút trong các phần trên, nhưng tôi vẫn chưa đi vào những gì chúng đang hỗ trợ. Nếu bạn đã quen thuộc với chúng, có thể bỏ qua và di chuyển tới `Rails Asset Helpers`.

##### Sass and Coffeescript

Sass và Coffeescript là các ngôn ngữ sử dụng các bộ tiền xử lý để biến đổi cú pháp của chúng thành CSS và Javascrip. Có một số ngôn ngữ được xử lý trước như Typecript và Less, nhưng Sass và Coffeescript được bao gồm theo mặc định với Rails, và có lẽ là phổ biến nhất. Tôi sẽ không đi sâu vào chi tiết ở đây bằng các ngôn ngữ này, vì vậy hãy xem các liên kết ở trên để biết thêm thông tin. [Sass](http://sass-lang.com/) vs [coffee](https://coffeescript.org/).

Từ kinh nghiệm của tôi, Sass và Coffeescript cung cấp rất nhiều cú pháp (code beautyful), thực tế là các ngoại lệ được ném cho mã không hợp lệ trong giai đoạn tiền xử lý là đủ để đảm bảo sử dụng chúng. Coffeescript tự động kết thúc mã của bạn cho mỗi tệp và thêm từ khóa var vào các biến cục bộ của bạn, do đó ngăn ngừa rất nhiều lỗi có thể xảy ra.

Ví dụ: code Coffeescript sau:

```Coffeescript
$ ->
  $('#element').on 'click', ->
    state = 'clicked'
    window.state = 'clicked'
    console.log 'element clicked'
```
được chuyển đổi sang Javascript sau:

```javascript
(function() {
  $(function() {
    return $('#element').on('click', function() {
      var state;
      state = 'clicked';
      window.state = 'clicked';
      return console.log('element clicked');
    });
  });

}).call(this);
```

##### Rails Asset Helpers

Một tính năng tuyệt vời khác mà bạn chỉ có thể nhận được bằng cách sử dụng Sass trong dự án Rails của bạn là `the asset path helpers.`. Khi tham chiếu các tài nguyên khác trong Sass của bạn, bạn có thể sử dụng cú pháp sau để có được các đường dẫn thích hợp:

```
.logo {
    background-image: image-url("logo.png");
}
```

helpers: `image-path`, `asset-url`, and `asset-path` được phép sử dụng. 

##### Erb in Assets

asset pipeline cho phép bạn đánh giá mã erb trong tài sản CSS và Javascript của bạn bằng cách kết hợp tên tệp với .erb (e.g. application.js.erb or application.scss.erb). Mặc dù điều này có thể hữu ích khi thêm đường dẫn nội dung vào Javascript của bạn, nhưng tôi không khuyên bạn nên sử dụng tính năng này. Nó thêm một bước tiền xử lý khác vào tệp, do đó tăng thời gian cần thiết để biên dịch. Nó cũng có thể dẫn đến những thói quen xấu. Bạn có thể bị thêm mã không có ý nghĩa trong thời gian biên dịch, như dịch chuỗi.


### Kết luận

Sử dụng asset pipeline đúng cách có thể cải thiện chất lượng tổng thể của ứng dụng của bạn về hiệu suất, khả năng phục hồi và code sạch sẽ. Bằng cách sử dụng các tính năng của asset pipeline, bạn có thể tự động khắc phục một số vấn đề lớn nhất liên quan đến mã hóa và phân phối nội dung tĩnh.


Cám ơn các bạn. 
[Nguồn](https://launchschool.com/blog/rails-asset-pipeline-best-practices)