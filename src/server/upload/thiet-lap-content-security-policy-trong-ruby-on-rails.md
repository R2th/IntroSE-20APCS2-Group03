# Giới thiệu

**Content Security Policy** (CSP) là 1 cách hữu hiệu để giảm thiểu hoặc loại bỏ hoàn toàn các lỗ hổng **Cross Site Scripting** (XSS). Với CSP, chúng ta có thể chặn inline script và các script từ những nguồn không đáng tin cậy. Chúng ta định nghĩa policy thông qua 1 HTTP header chứa các rule dành cho tất cả các loại tài nguyên.

Mặt khác, điều đó cũng có nghĩa là chúng ta phải chuyển các đoạn inline script ra các file riêng biệt. Dù sao thì đây cũng là 1 điều nên làm và nó sẽ cho phép tái sử dụng 1 lượng code lớn hơn.

Dưới đây là ví dụ của 1 HTTP header mà chỉ cho phép trình duyệt load tài nguyên (scripts, CSS, fonts, ảnh...) từ cùng nguồn (same origin - `self`). Ngoài ra script từ Google Analytics cũng được cho phép để các đoạn code tracking có thể chạy được. Mọi thứ khác sẽ bị chặn.

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://www.google-analytics.com;
```

Danh sách các directive và giá trị của chúng có thể được xem ở [đây](https://bauland42.com/ruby-on-rails-content-security-policy-csp/#directives).

# Những trình duyệt nào hỗ trợ CSP?
[CSP 1.0](https://www.w3.org/TR/2012/CR-CSP-20121115/) được hỗ trợ bởi khoảng [80%](https://caniuse.com/#search=Content%20Security%20Policy) trình duyệt hiện nay, bao gồm cả trình duyệt trên di động (iOS, Android browser từ bản 4.4, Chrome trên Android). IE 10 và 11 chỉ hỗ trợ header kiểu cũ `X-Content-Security-Policy` và chỉ [sandbox directive](https://www.w3.org/TR/CSP/#sandbox-usage).

Đáng tiếc là IE trước phiên bản [Edgle 12](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/contentsecuritypolicy) không hỗ trợ việc whitelist nguồn của các tài nguyên. Nếu bạn muốn làm điều đó bạn chỉ nên dùng header `Content-Security-Policy` chứ không phải header kiểu cũ `X-Content-Security-Policy`. Mặt khác, đừng bao giờ gửi cả 2 header, điều đó sẽ làm 1 số trình duyệt bị nhầm lẫn. CSP header có khả năng tương thích ngược nên đối với 1 số trình duyệt rất cũ header đó sẽ chỉ không có tác dụng chứ không gây ra ảnh hưởng gì khác.

Phiên bản 1 của các tiêu chuẩn về CSP đã định nghĩa rất nhiều những thứ cần có. [CSP 2.0](https://www.w3.org/TR/CSP/) hiện tại (và cả phiên bản trung gian 1.1) đã thêm 1 số directive, chủ yếu liên quan đến `frame`, nguồn cho endpoint của `form` , các plugin được cho phép. Chúng cũng hỗ trợ `nonce` để sign các inline style và script với 1 mã hash duy nhất.

Việc hỗ trợ các directive mới vẫn còn chưa hoàn thiện, chỉ có Chrome là hỗ trợ tất cả các directive. Firefox vẫn còn thiếu directive `plugin-types` và `child-src`.  Các trình duyệt khác thì còn chưa hỗ trợ các directive mới.

Điều gì sẽ xảy ra nếu 1 directive nào đó không được hỗ trợ bởi trình duyệt? Dưới đây là thông báo của Safari khi thấy directive `child-src` mà nó chưa hỗ trợ

![](https://images.viblo.asia/0f04dc8d-14d3-42ca-8d4c-ce94f31e2d7a.png)

Tuy nhiên thì các directive khác vẫn hoạt động bình thường.

Nói gì thì nói nhưng những thông báo như vậy trông có vẻ là không professional, sẽ tốt hơn nếu có thể nhận diện trình duyệt của người dùng và chỉ gửi những direcitve mà nó hỗ trợ. Ví dụ như GitHub chỉ gửi các directive `child-src`, `form-action`, `frame-ancestors` và `plugin-types` tới Chrome mà không gửi tới Safari. Firefox thì sẽ không được gửi `child-src` và `plugin-types`.

May mắn là với Rails chúng ta không phải đọc user agent rồi set các rule tương ứng cho từng trình duyệt vì đã có gem [SecureHeaders](https://github.com/twitter/secureheaders/blob/master/lib/secure_headers/headers/policy_management.rb) làm điều đó 1 cách tự động.

# Violation report
CSP đi kèm với 1 tính năng rất hữu ích, đó là báo cáo các trường hợp vi phạm policy. Thông tin về các trường hợp vi phạm sẽ được hiển thị ở console của trình duyệt và cũng có thể được gửi tới 1 URL thông qua phương thức POST. Thông tin khi đó có dạng JSON như dưới

```
{"csp-report":
  {"document-uri":"...",
  "violated-directive":"script-src 'self' https://ajax.googleapis.com",
  "original-policy":"...",
  "blocked-uri":"https://cdnjs.cloudflare.com"}
}
```

Nếu chúng ta sử dụng header `Content-Security-Policy-Report-Only` thay cho header `Content-Security-Policy` thì trình duyệt sẽ chỉ gửi thông báo khi có vi phạm mà không chặn việc load bất kì tài nguyên nào. Cả 2 header đều hỗ trợ directive `report-uri` để chỉ thị nơi mà báo cáo vi phạm được gửi tới.

Đối với Rails, chúng ta cần có 1 controller để nhận và xử lí các báo cáo được gửi tới. Các bạn có thể vào [đây](https://bauland42.com/ruby-on-rails-content-security-policy-csp/#cspviolationreports) để xem 1 ví dụ.

# Các bước để áp dụng CSP

CSP không phải là 1 tính năng plug-and-play nên chúng ta cần có 1 chiến lược để đưa nó vào sử dụng thực tế.

1. Chuyển các đoạn code inline script vào các file riêng biệt.
2. Chuyển các tài nguyên lên CDN hoặc vào trong các subdomain. Nếu vậy chúng ta có thể chỉ cần dùng `script-src cdn.example.com` mà ko cần phải cho phép các tài nguyên cùng nguồn `self`. Tuỳ thuộc vào ứng dụng của chúng ta mà những nội dung của người dùng (trong cùng nguồn) có thể chứa script, ví dụ các file được upload, các string được nhập để tìm kiếm, ... Nếu có thể loại bỏ `self` khỏi `script-src` thì chúng ta sẽ có 1 sự bảo vệ ở mức cao hơn. Tuy vậy, cũng không phải là quá tệ nếu cho phép thực thi script cùng nguồn khi chúng ta mới bắt đầu áp dụng CSP.
3. Bắt đầu với `style-src 'unsafe-inline'` (có thể kèm theo CDN, subdomain, các file style cùng nguồn) để cho phép inline style. Nhiều khả năng là sẽ có vấn đề với việc ẩn/hiện các phần tử HTML khi sử dụng 1 số thư viện JavaScript phổ biến.
4. Sử dụng header `Content-Security-Policy-Report-Only` để chỉ nhận báo cáo về các trường hợp vi phạm policy của chúng ta mà chưa cần chặn cái gì hết. Khi chúng ta đã có đầy đủ các thông tin để xây dựng 1 policy hoàn chỉnh, hãy chuyển sang dùng header  `Content-Security-Policy`.
5. Directive `default-src` có thể được dùng để định nghĩa nguồn mặc định cho hầu hết các directive `*-src` khác. Chúng ta có thể bắt đầu với blacklist hoặc whitelist (xem phần sau để rõ hơn).

# Blacklist hay whitelist?

Chúng ta có thể bắt đầu với `default-src *`, nó cũng giống với việc không có CSP. Một khi chúng ta rõ nguồn của các loại tài nguyên cần thiết thì có thể chuyển qua sử dụng whitelist: chặn tất cả các nguồn với `default-src 'none'` và chỉ cho phép những nguồn chúng ta muốn đối với các directive khác. GitHub cũng sử dụng cách này vì họ có rất nhiều nội dung của người dùng và sẽ phải mất 1 thời gian để xác định nguồn nào có thể được cho phép. Nếu trang web của chúng ta khá rõ ràng thì có thể bắt đầu với `default-src 'none'` luôn.
 
 # Cấu hình cơ bản
 
Vì không thể có 1 cấu hình CSP nào phù hợp với mọi trang web nên mặc định thì Rails không gửi CSP header. Nếu chúng ta sử dụng gem [SecureHeaders](https://github.com/twitter/secure_headers) thì nó sẽ tự động gửi những CSP directive được hỗ trở bởi trình duyệt của người dùng. Gem này cũng cho phép thay đổi các directive theo từng controller và action 1 cách dễ dàng.

Dưới đây là ví dụ của 1 cách cấu hình CSP 

```ruby
# Gemfile
gem 'secure_headers'
```

```ruby
# config/initializers/csp.rb:
SecureHeaders::Configuration.default do |config|
  config.csp = {
    report_only: Rails.env.production?,
    preserve_schemes: true,
    default_src: %w(*),
    script_src: %w('self' https://ajax.googleapis.com https://www.google-analytics.com),
    connect_src: %w('self'),
    style_src: %w('self' 'unsafe-inline'),
    report_uri: ["/csp_report?report_only=#{Rails.env.production?}"]
  }
end
```


Với cấu hình này thì 

- Header `Content-Security-Policy-Report-Only` được gửi trên môi trường production còn header `Content-Security-Policy` được gửi trên các môi trường khác
- Cho phép load tài nguyên từ tất cả các nguồn 1 cách mặc định (`default-src: *`)
- Chỉ cho phép script và style từ 1 số CDN và từ cùng nguồn (`'self'`). Ngoài ra có thể sử dụng `unsafe-inline` trong các thuộc tính HTML.
- Chỉ cho phép gửi AJAX request đến cùng nguồn 
- Báo cáo các trường hợp vi phạm sẽ được gửi đến `CspReportsController#create` với phương thức POST.

# Unsafe style

Directive `style-src` ở trên chứa `'unsafe-inline'` vì những thư viện JavaScript phổ biến như jQuery hay Bootstrap thường thêm trực tiếp style cho các phần tử để ẩn/hiện chúng. Chúng ta có thể bỏ `'unsafe-inline'` nếu không dùng các thư viện đó mà dùng các class để ẩn/hiện nội dung.

Nói chung thì style cũng có thể là không an toàn vì có thể chứa JavaScript (URI có thể vẫn hoạt động trên 1 số trình duyệt). Tuy nhiên thì các trình duyệt hiện đại có thể tự chặn các request đó. Vì thế `unsafe-inline` vẫn có thể được chấp nhận sử dụng.

# Whitelist CDN script

Nếu chúng ta sử dụng jQuery, Bootstrap hoặc các thư viện tương tự thì nhiều khả năng là chúng được load từ các CDN. Google CDN dành cho jQuery được đặt tại https://ajax.googleapis.com nên chúng ta sẽ thêm domain đó vào directive `script-src`.

Chúng ta có thể tiết kiệm được vài byte trong header bằng việc bỏ đi `https://` nhưng như thế sẽ cho phép load từ phiên bản HTTP. 

Chúng ta cũng có thể thêm đoạn code như sau để load jQuery từ server của chúng ta trong trường hợp không load được từ CDN.

```javascript
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
<script>
  (function() {
    if (typeof jQuery === "undefined" || jQuery === null) {
      document.write('<%= javascript_include_tag 'jquery'%>');
    }

  }).call(this);
</script>
```

Tuy nhiên như này thì lại vi phạm CSP vì inline script không được phép tự thi. Cách giải quyết là chuyển đoạn code ở trên ra 1 file riêng biệt

app/assets/javascripts/jquery_loader.js.erb
```javascript
(function() {
if (typeof jQuery === "undefined" || jQuery === null) {
    document.write('<%= javascript_include_tag 'jquery'%>');
  }
}).call(this);
```

app/assets/javascripts/application.js
```javascript
//= require jquery_loader
```

# Chuyển đổi inline script

Đến lúc này chúng ta đã biết cách chuyển các đoạn code inline thành các file riêng biệt. Tuy nhiên chúng ta cũng không muốn có quá nhiều hoặc quá ít file như vậy, 1 file cho 1 controller có vẻ là thích hợp. Nếu vậy thì hãy thêm ` javascript_include_tag controller_name`  vào trong application layout và tạo 1 file JS trong `app/assets` cho mỗi controller.

Cách này hẳn sẽ hiệu quả đối với những application không quá phức tạp. Những application lớn hơn sẽ có những cách khác để quản lý, sắp xếp các script. Dưới đây là 1 gợi ý mà cũng có thể hoạt động với Turbolinks:

- Thêm scope cho từng page với `<body class="<%= controller_name %> <%= action_name %>">`
- Cho phép 1 application script luôn được load, ví dụ như Bootstrap tooltips. Thêm các script cho từng controller hoặc từng chức năng (chart, cart, modal, ...).
- Ở đầu các đoạn code dành cho các page riêng biệt, thêm đoạn code như `return unless $(".posts.index").length > 0` để nó chỉ được load trong trang `PostsController#index`. 
 
Chú ý là cách này sẽ load tất cả các script cùng 1 lúc và sẽ tăng thời gian load lúc đầu. Tuy nhiên thì sau đó tải trang sẽ trở lên nhanh hơn. Các bạn có thể sử dụng cách khác nếu không thích có những file script quá lớn.
    
# Chuyển đổi JavaScript trong các thuộc tính HTML

Nếu chúng ta có đoạn code như thế này

```javascript
<button class='my-javascript-button' onclick="alert('hello');">
```

thì có thể chuyển nó ra 1 file riêng biệt như sau

```javascript
$(document).ready(function () {
  $('.my-javascript-button').on('click', function() {
    alert('hello');
  });
});
```

# Chuyển đổi script mà cần đến input động

Ví dụ với đoạn code như dưới

```html
<a href="#" onclick="paintIt(this, '#990000')">Paint it red</a>
```

chúng ta có thể dùng thuộc tính `data-*` và chuyển thành 

```html
<a href="#" data-background-color="#990000">Paint it red</a>
```

Unobtrusive CoffeeScript

```javascript
@paintIt = (element, backgroundColor, textColor) ->
  element.style.backgroundColor = backgroundColor
  if textColor?
    element.style.color = textColor
 
$ ->
  $("a[data-background-color]").click (e) ->
    e.preventDefault()
 
    backgroundColor = $(this).data("background-color")
    textColor = $(this).data("text-color")
    paintIt(this, backgroundColor, textColor)
```

# AJAX
Policy ở trên có chứa `connect-src ‘self’` và cho phép thực hiện AJAX request đến cùng nguồn, điều này thường là sẽ ổn đối với hầu hết các ứng dụng. 

1 trong những nhiệm vụ khó khăn nhất khi áp dụng CSP là chuyển các action trả về JavaScript thông qua các file view `.js.erb` mà thường được dùng cho AJAX response. AJAX response mà có chứa script thường được thực thi bằng `eval()`. Cách này sẽ không được chấp nhận bởi CSP trừ khi chúng ta thêm `script-src ‘unsafe-eval’`. Nếu không muốn dùng tới `eval()` (mà cũng không nên dùng) chúng ta có thể làm như sau:

- Thêm thuộc tính như `data-behavior="update-credit-card"` vào những phần tử HTML mà sẽ trigger AJAX request
- Xử lí việc click vào link trong 1 file JS riêng biệt `$(document).on "click", "[data-behavior~=update-credit-card]"`
- Thực hiện AJAX request nếu chúng ta cần dữ liệu gì đó từ server
- Thay đổi AJAX action để không trả về script mà trả về JSON, markup, ... 

Sẽ có nhiều việc phải làm hơn so với khi sử dụng `link_to ..., remote: true` và 1 file `*.js.erb` nhưng làm vậy chúng ta sẽ được những đoạn code JavaScript được phân tách độc lập. 

Kết quả của tất cả những việc này là khi chúng ta đã cấu hình CSP mà trang web có lỗ hổng Cross-Site Scripting, trình duyệt sẽ tự động chặn việc thực thi những đoạn code được inject 

![](https://images.viblo.asia/64ca5e09-dcc1-480c-9a2f-1eb19d5a7a1d.png)

# Tham khảo

- [How to Get Started with a Content Security Policy](https://blog.codeship.com/how-to-get-started-with-a-content-security-policy/)
- [RUBY ON RAILS CONTENT-SECURITY-POLICY (CSP)](https://bauland42.com/ruby-on-rails-content-security-policy-csp)