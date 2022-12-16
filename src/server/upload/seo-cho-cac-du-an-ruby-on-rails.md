# Tại sao ta phải quan tâm đến SEO?

Rất có thể bạn đã click vào bài viết này vì bạn quan tâm đến SEO và muốn biết cách thực hiện tốt nó trong một ứng dụng Rails. Trong trường hợp bạn vẫn cần thuyết phục, tôi muốn làm rõ ý nghĩa của Search Engine Optimisation (SEO).

Nói chung, SEO quan tâm đến việc trang web của bạn có thứ hạng cao hơn trong các công cụ tìm kiếm. Nếu bạn có một trang trên kết quả đầu tiên trên Google cho một cụm từ đủ phổ biến, bạn có thể nhận được hàng chục nghìn lượt truy cập mỗi ngày.

Nghĩ về lần cuối cùng bạn tìm kiếm thứ gì đó, bạn đã click qua bao nhiêu trang trước khi từ bỏ? Tôi cá rằng nó không phải là nhiều!

Khi các nhà phát triển nói về SEO, ý họ nói chung là SEO kỹ thuật. SEO kỹ thuật được loại bỏ một chút khỏi xây dựng liên kết, tạo nội dung và những thứ khác mà các nhà tiếp thị nói về SEO làm.

Kỹ thuật SEO liên quan đến việc làm cho nội dung trang web của bạn dễ hiểu đối với các công cụ tìm kiếm nhất có thể.

Trong bài viết này, chúng tôi sẽ không đi sâu vào bất kỳ lý thuyết kỹ thuật SEO nào, nhưng theo nguyên tắc chung, bạn muốn trang web của mình:

*     Máy tính có thể hiểu được
*     Nhanh
*     Dễ điều hướng

Nếu trang web của bạn có thể hiểu được bởi máy tính, thì điều đó có thể hiểu được bởi những người sử dụng công nghệ hỗ trợ.

Nếu trang web của bạn nhanh, nó sử dụng ít tài nguyên hơn cho cả máy chủ và thiết bị của người dùng.

Nếu trang web của bạn dễ điều hướng, người dùng của bạn sẽ tìm thấy những gì họ muốn nhanh hơn, làm tăng sự thích thú của họ.

Đây đều là những cải tiến tích cực rộng rãi và nếu kết quả là trang web của bạn xuất hiện cao hơn trên công cụ tìm kiếm, thì đó là đôi bên cùng có lợi!

# Chỉ có một phiên bản URL của bạn 

Bạn có biết rằng các URL sau đây đều được các công cụ tìm kiếm coi là khác nhau không?

*     https://www.website.com/this/
*     http://www.website.com/this/
*     https://website.com/this/
*     https://website.com/this

Về mặt kỹ thuật, đây có thể là các trang khác nhau. Trong thực tế, phần lớn thời gian, bạn sẽ muốn mỗi trang này cung cấp cùng một nội dung.

Nếu bạn không cố gắng có ý thức để chuyển hướng mọi người đến vị trí chính xác, thì mọi người có thể gửi một số lưu lượng truy cập đến http://www, một số người https:// và các công cụ tìm kiếm sẽ không biết trang web tốt nhất để sử dụng.

Theo nguyên tắc chung, bạn muốn các công cụ tìm kiếm phải suy nghĩ về trang web của bạn càng ít càng tốt. Họ chỉ dành một khoảng thời gian nhất định để suy nghĩ về từng trang web và nếu bạn lãng phí thời gian để họ quyết định xem bạn có phải là www hay không. hoặc không phải www. sẽ dành ít thời gian hơn để suy nghĩ về điều gì đó quan trọng như “trang web này nói về cái gì”.

Có ba điều chúng ta cần làm đúng để đảm bảo có một phiên bản URL.

*     Buộc sử dụng https
*     Buộc sử dụng phiên bản có www hoặc không có www
*     Xóa dấu gạch chéo ở cuối

## Buộc sử dụng https

Khi một trình duyệt web đang gửi dữ liệu đến hoặc nhận dữ liệu từ một máy chủ web nếu nó qua http, những người khác có thể thấy những gì đang xảy ra; nếu nó trên https, họ không thể.

Đây là một sự đơn giản hóa một chút, nhưng https an toàn hơn http và ngay cả khi trang web của bạn chứa 100% thông tin công khai và hoàn toàn không thu thập bất cứ thứ gì, việc sử dụng https cho thấy bạn quan tâm và được các công cụ tìm kiếm coi là một yếu tố xếp hạng.

Có hai bước để buộc https, đảm bảo rằng bạn có thể cung cấp lưu lượng truy cập qua https và sau đó yêu cầu Rails chuyển hướng mọi người đến https khi họ sử dụng http.

### Đảm bảo rằng bạn có thể sử dụng https

Hầu hết các nền tảng lưu trữ sẽ cho phép bạn thiết lập các chứng chỉ bắt buộc miễn phí và bạn đã có thể cho phép truy cập https. Cách dễ nhất để kiểm tra là truy cập trang web của bạn bằng https và xem điều gì sẽ xảy ra. Các trình duyệt sẽ nhanh chóng cảnh báo bạn nếu có điều gì đó không được thiết lập đúng với https.

Chúng tôi không thể đề cập đến việc thiết lập https cho mọi nhà cung cấp dịch vụ lưu trữ, nhưng nếu bạn sử dụng Heroku thì trong trang cài đặt Ứng dụng của bạn sẽ có một phần dành cho chứng chỉ SSL. Đảm bảo khi bạn nhấp vào “Định cấu hình SSL” rằng Quản lý chứng chỉ tự động được bật.

Khi bạn có thể thấy rằng việc truy cập trang web của mình bằng https có hiệu quả, bạn đã sẵn sàng yêu cầu Rails chỉ chấp nhận https.

### Yêu cầu Rails buộc https

Rails có cài đặt cấu hình đặc biệt để buộc SSL, điều này cho các trình duyệt có nghĩa là buộc sử dụng https thay vì https.

Trong file config/environments/production.rb, thêm các dòng sau:

```ruby
config.force_ssl = true
config.ssl_options = { hsts: { preload: true } }
```

Chúng tôi thêm điều này vào cấu hình dành riêng cho sản xuất thay vì một nơi chung chung hơn như config/application.rb vì việc chạy ứng dụng của bạn ở chế độ phát triển dưới https có thể là một vấn đề khó khăn.

Dòng thứ hai là tùy chọn. Nếu được đặt sẽ thông báo cho các trình duyệt rằng "Này, tôi chỉ được phép sử dụng https", điều này trong các trình duyệt được hỗ trợ có thể hoạt động như một tín hiệu tích cực vì nó cải thiện tính bảo mật. Nếu bạn có ý định hỗ trợ https về lâu dài, việc đặt tùy chọn này sẽ cải thiện một chút hiệu suất. Làm cho mọi thứ nhanh chóng là một trong những mục tiêu của chúng tôi.

## Buộc www trong Rails

Các công cụ tìm kiếm dường như có ít ý kiến hơn về việc sử dụng tên miền có www hoặc không có www, nhưng bạn nên chọn một và nhất quán. Chúng tôi có xu hướng buộc www.

Để xử lý điều này trong Rails, chúng ta có thể sử dụng các ràng buộc để kiểm tra xem miền không có www. Nếu không, hãy chuyển hướng đến www.

```ruby
class Constraints::NoWWWDomain
  def self.matches?(request)
    request.subdomain == ""
  end
end
```

Bên trong config/route.rb, chúng ta có thể kiểm tra ràng buộc này và chuyển hướng nếu thích hợp.

```ruby
constraints(Constraints::NoWWWDomain) do
  get ':any', to: redirect(subdomain: 'www', path: '/%{any}'), any: /.*/
end
```

## Xóa dấu gạch chéo ở cuối

Bước cuối cùng để chuẩn hóa tất cả các URL của bạn thành một phiên bản chuẩn là loại bỏ các dấu gạch chéo.

Chúng ta có thể thực hiện điều này bằng cách sử dụng gem có tên là rack-rewrite. Gem này giới thiệu một số phần mềm trung gian (mã chạy ở một phần khác của ngăn xếp với mã ứng dụng của bạn) mà chúng ta có thể sử dụng để viết lại URL.

Trong Gemfile của bạn, hãy thêm những thứ sau:

gem 'rack-rewrite' # we use to remove trailing slashes

Với gem được cài đặt, chúng ta có thể sử dụng phần mềm trung gian này bằng cách thêm phần sau vào khối cấu hình bên trong config/application.rb

```ruby
config.middleware.insert_before(Rack::Runtime, Rack::Rewrite) do
  r301 %r{^/(.*)/$}, '/$1'
end
```

Dòng đầu tiên của mã này cho biết, “trước khi bạn gọi Rack::Runtime, vui lòng gọi Rack::Rewrite  bằng mã sau”.

Phần tiếp theo của mã là một số regex tìm kiếm bất kỳ thứ gì có dấu gạch chéo ở cuối, nếu nó tìm thấy thứ gì đó, hãy thay thế nó bằng mọi thứ trừ dấu gạch chéo.

Bạn có thể kiểm tra điều này bằng cách truy cập trang web của mình và bao gồm / ở cuối và xem nó có xóa dấu gạch chéo hay không.

## Reduce the need for redirects

Nếu bạn đã làm theo lời khuyên của chúng tôi về việc có một phiên bản URL, thì việc ai đó chọn truy cập trang web của bạn không quan trọng; họ sẽ được chuyển hướng đến phiên bản chính xác.

Chuyển hướng tốn effort và chúng tôi không muốn thực hiện chúng. Bây giờ là lúc để xem lại mã của bạn để xem liệu ứng dụng của bạn có tạo ra các liên kết nội bộ cần chuyển hướng hay không.

Việc cho công ty của bạn biết về phiên bản ưa thích cũng là điều tốt để những người khác có thể viết những thứ như tweet và các liên kết bên ngoài khác để tránh cần chuyển hướng.

# Hãy cho mọi người biết đây là phiên bản chuẩn

Trong HTML, bạn có thể đặt một thẻ có nội dung “bất cứ điều gì bạn nghĩ khác, đây là phiên bản chuẩn của nội dung này”. Nếu bạn có một blog cá nhân và một blog Phương tiện mà bạn đăng chéo, bạn nên đảm bảo rằng bạn có thể cho các công cụ tìm kiếm biết đâu là phiên bản chuẩn. Nếu không, bạn sẽ gặp phải vấn đề khi các công cụ tìm kiếm xem hai trang là nội dung trùng lặp. Các công cụ tìm kiếm sẽ cố gắng hết sức nhưng cuối cùng có thể phạt nội dung hợp pháp của bạn, vì nghĩ rằng đó là một bản sao.

Ngay cả trong một ứng dụng, bạn có thể gặp sự cố này. Ngay cả khi bạn thực hiện tất cả các bước trên để đảm bảo chỉ có một phiên bản trang web của bạn có sẵn cho thế giới bên ngoài, bạn thường sẽ có hai trang với nội dung gần như giống hệt nhau.

Chúng tôi có thể giải quyết vấn đề này bằng cách sử dụng “Canonical Tag”; thẻ này nằm trong `<head>` của tài liệu HTML trỏ đến phiên bản chuẩn của trang.

Nó trông như thế này;
    
```ruby
<link rel="canonical" href="https://tosbourn.com/ruby-on-rails-seo" />
```

Thật không may, điều này không đơn giản như viết một cái gì đó như;

```ruby
# don't do this
<link rel="canonical" href="<%= link_to my_url %>">
```

Có rất nhiều trường hợp cạnh để xem xét cho my_url. Chúng tôi khuyên bạn nên sử dụng Canonical Rails.
    
## Setting up Canonical Rails

Trong Gemfile của bạn, thêm vào;

`gem 'canonical-rails' # Canonical Tag management`

Sau khi chạy gói cài đặt để cài đặt đá quý mới này, bạn có thể chạy rails g canonical_rails: cài đặt này chạy một tập lệnh cài đặt tạo tệp cấu hình / khởi tạo / canonical_rails.rb

Có một số cấu hình bạn cần thiết lập;

```ruby
config.protocol = 'https://'
config.host = 'www.yourwebsite.com'
config.collection_actions = []
config.allowed_parameters = %i[page]
config.opengraph_url = false
```

Dưới đây là giải thích về từng cài đặt;

*     config.protocol = 'https: //' - Chúng tôi sử dụng https cho tất cả các trang của mình, vì vậy tất cả các URL chuẩn nên sử dụng https.
*     config.host = 'www.pintrader.club' - Tên miền chính bạn sử dụng, nếu bạn có .com và .org, hãy chọn một tên miền làm tên miền "chính".
*     config.collection_actions = [] - Chúng tôi không muốn có bất kỳ dấu gạch chéo nào. Nếu bạn muốn có dấu gạch chéo, bạn có thể thêm các hành động tại đây, ví dụ: :show
*     config.allowed_parameters =% i [page] - Chúng tôi thường cho phép trang làm tham số vì chúng tôi sử dụng phân trang và muốn mỗi trang được coi là riêng biệt. Các thông số khác sẽ bị bỏ qua.
*     config.opengraph_url = false - Chúng tôi đã đặt điều này trong chế độ xem ứng dụng, nhưng nếu bạn muốn viên ngọc này tạo URL OpenGraph cho bạn, hãy đặt giá trị này thành true

# Chuyển hướng các URL cũ


Trong suốt thời gian ứng dụng của bạn, các cấu trúc URL sẽ đến và đi. /people có thể trở thành /users, hoặc thông thường /posts có thể bắt đầu được gọi là /articles.

Ngay cả khi bạn đã dành thời gian để sửa tất cả các liên kết nội bộ để trỏ đến URL mới, bạn không thể kiểm soát những liên kết mà mọi người đã chia sẻ hoặc đã đánh dấu trang theo thời gian. Do đó, điều quan trọng là phải chuyển hướng các URL cũ sang URL mới một cách chính xác.

Không có gì lạ khi một thay đổi nhỏ như site.com/blog/my-post/ giảm thứ hạng tìm kiếm sau khi URL đã thay đổi thành site.com/articles/my-post/ - bởi vì qua đêm tất cả các liên kết đã từng chỉ vào nó bị mất.

Chúng tôi có thể sửa lỗi này trong tệp config/route.rb của chúng ta.

`get '/my-really-specific-old-url', to: redirect ('/my-new-url', status: 301)`

Điều này sẽ yêu cầu Rails chuyển hướng URL cũ sang URL mới, với trạng thái là 301, điều này cho các công cụ tìm kiếm biết rằng chuyển hướng là vĩnh viễn, vì vậy hãy quên URL cũ thay vì URL mới.

Việc chuyển hướng các bộ sưu tập dữ liệu rất giống nhau;

`get '/blogs/:name', to: redirect('/articles/%{name}', status: 301)`

Điều này sẽ chuyển hướng bất kỳ thứ gì sau /blog/ và chuyển nó vào /article/.

# Sơ đồ trang web

Sơ đồ trang web là một hoặc nhiều tệp XML cho các công cụ tìm kiếm biết vị trí của tất cả các trang của bạn và tần suất chúng được cập nhật. Đây là một ví dụ cơ bản về những gì nó có thể trông như thế nào;

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>https://tosbourn.com/ruby-on-rails-seo/</loc>
      <lastmod>2021-04-20</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
   </url>
</urlset> 
```

Điều này nói rằng trang trên https://tosbourn.com/ruby-on-rails-seo/ được cập nhật lần cuối vào ngày 20 tháng 4 năm 2020; nó thường được cập nhật hàng tháng và có mức ưu tiên tương đối là 0,8.

Nếu công cụ tìm kiếm chưa xem trang đó kể từ khi nó được sửa đổi lần cuối, nó sẽ ưu tiên kiểm tra trang đó.

Bằng cách cho nó biết tần suất thay đổi, công cụ tìm kiếm có thể đoán khi nào nó nên thử và tìm kiếm lại trang. Một số trang của bạn sẽ cập nhật rất thường xuyên, và những trang khác thì luôn luôn, bạn muốn các công cụ tìm kiếm tiếp tục xem các trang được cập nhật thường xuyên.

Cuối cùng, mức độ ưu tiên là liên quan đến các trang khác trên trang web của bạn. Nếu bạn có 1000 trang mà bạn muốn trên công cụ tìm kiếm nhưng không quan tâm nhiều đến điều đó, hãy đảm bảo rằng chúng có mức độ ưu tiên thấp hơn 100 trang mà bạn quan tâm. Các công cụ tìm kiếm đảm bảo sẽ kiểm tra các trang này thường xuyên hơn một chút.

Trong Rails, gem tốt nhất để tạo sơ đồ trang là sitemap_generator.

# Robots.txt

Robots.txt là một tệp mà tất cả các spider và các thợ cạo nên đọc và tôn vinh.

Bạn có thể chặn hoàn toàn các tác nhân người dùng cụ thể, bạn có thể xác định độ trễ thu thập thông tin (nếu bạn lo lắng rằng các trang của mình đang bị tấn công quá thường xuyên) và bạn có thể cho trình thu thập thông tin biết nơi tìm sơ đồ trang web.

Các ứng dụng Ruby on Rails có xu hướng tạo ra sự kết hợp giữa các trang công khai và riêng tư. Nếu trình thu thập thông tin không bao giờ vào được nội dung của một số trang này, thì việc không cho phép trình thu thập thông tin sẽ tiết kiệm thời gian quý báu có thể dành cho việc thu thập thông tin các trang công khai mà bạn muốn xuất hiện.

```ruby
User-agent: *
Allow: /
Disallow: /newsletter-thanks/
Disallow: /offline/

User-agent: SemrushBot
Disallow: /
```

Sitemap: https://mysite.s3.amazonaws.com/sitemaps/sitemap.xml.gz

Trong ví dụ này, chúng tôi cho phép tất cả các tác nhân người dùng truy cập mọi thứ ngoại trừ /newsletter-thanks/ và /offline/ mà chúng tôi không cho phép bất kỳ ai truy cập.

Chúng tôi cũng không cho phép trình thu thập thông tin SemrushBot truy cập vào bất kỳ thứ gì.

Bằng cách đặt thuộc tính Sơ đồ trang web, chúng tôi sẽ nói với bất kỳ trình thu thập thông tin nào rằng “này, nếu bạn muốn có nhiều trang hơn, đây là nơi bạn có thể tìm thấy chúng”.

Chúng tôi đã thấy một số bài viết trên Rails mô tả cách bạn có thể thiết lập tuyến đường để quản lý Robots.txt của mình theo lập trình. Nếu bạn có một thiết lập đặc biệt phức tạp, đó có thể là một ý tưởng hay; tuy nhiên, phần lớn các ứng dụng duy trì tệp public/robots.txt của bạn dưới dạng tệp văn bản sẽ rất phong phú.