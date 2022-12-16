Như chúng ta đã biêt, đối với một website điều quan trọng nhất là để lại ấn tượng cho người dùng và cung cấp những thông tin mà người dùng quan tâm,  và đối với các nhà phát triển web như chúng ta, chúng ta luôn luôn phải đối mặt với một bài toán muôn thủa `Performance`

`Performance` quyết định rất rất nhiều đến cảm xúc và ấn tượng của người dùng, và dưới đây là một vài hình ảnh để chúng ta hiểu rõ hơn về điều đó:
![](https://images.viblo.asia/a7256c77-e384-4802-97cb-a92206dac4a7.png)

nhìn qua hỉnh ảnh trên chắc các bạn đã rõ người dùng cảm thấy như thế nào đối với một website, nếu một website mất quá `1s` để load, cảm xúc của người dùng đã bị tác động và thay đổi khá nhiều, và nó theo chiều hướng không tốt chút nào.
để rõ hơn bạn có thể tham khảo: [WebPerformance with Rails 5.2](https://speakerdeck.com/wintermeyer/webperformance-with-rails-5-dot-2)
Và nếu các bạn muốn trải nghiệm trực tiếp, các bạn có thể vào 2 website dưới đây để cảm nhận rõ ràng cảm xúc của bản thân
- https://www.thegioididong.com/
- https://dienthoaididong.com/
theo cảm nhận cá nhân của mình, mình thích trang web của https://www.thegioididong.com/ hơn, cảm giác mình có thể lướt mà không cần phải suy nghĩ nhiều.

### Vậy làm sao và làm thế nào để cải thiện `performance` của webiste?

Trước khi nói đến vấn đề cải thiện, chúng ta cần có công cụ để đo lường và ước định được như thế nào là tốt. Và hai công cụ người đây có lẽ là hai cộng cụ phổ biến nhất để đo `performance` cho website
- [webpagetest](https://www.webpagetest.org/)
- [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

### Các giải pháp cải thiện performance của Rails

#### 1) View: Fragment caching
đây là một trong những kĩ thuật của cache trong rails. Nó cho phép cache một phần hiển thị của view .
Ví dụ: chúng ta muốn cache từng `product` trong một page:
```
<% @products.each do |product| %>
  <% cache product do %>
    <%= render product %>
  <% end %>
<% end %>
```
khi chúng ta request vào trang web lần đầu tiên, Rails sẽ viết bản cache với `unique key` giống như dưới đây:
```
views/products/1-201505056193031061005000/bea67108094918eeba42cd4a6e786901
```
cấu trúc của nó là `products/#{id}-#{update_at.to_i}...`, và khi dữ liệu của trường `updated_at` thay đổi thì sẽ tạo ra cache mới và cache cũ sẽ được xóa bỏ.
Ngoài ra, chúng ta có thể cache theo điều kiện với `cache_if`:
```
<% cache_if admin?, product do %>
  <%= render product %>
<% end %>
```
Tham khảo: [RoR guides: Fragment Caching](http://guides.rubyonrails.org/caching_with_rails.html#fragment-caching)

#### 2) Database: Counter cache

Vậy trong trường hợp chúng ta muốn lấy dữ liệu model.associated_objects.count, chúng ta cần gọi `COUNT` truy vấn `SQL` trên database. Thay vào đó chúng ta có thể sử dụng `counter_cache`.
options `counter_cache` đã được khai báo trong `ActiveRecord` và nó được định nghĩa cho các liên kết trong mô hình `ActiveRecord`.

Tham khảo:  [RoR guides: Associations Basics](http://guides.rubyonrails.org/association_basics.html)

#### 3) HTTP: etag and last_modified
đây là hai phương thức này để thao tác với bộ nhớ cache phản hồi từ phía browser.
vậy chúng ta sẽ tìm hiểu sơ qua về `etag` và `last_modified` nhé ^_^

Các bạn có thể  đọc bài viết dưới đây, mình thấy bạn viết rất dễ hiểu và giải thích rất rõ ràng cơ chế của `last_modified ` và `etag`
Tham khảo: https://viblo.asia/p/tim-hieu-ve-http-caching-djeZ1BRJlWz

Vậy giờ làm sao chúng ta có thể tận dụng tính năng này trong Rails, rất may Rails đã cung cấp một method được gọi là `fresh_when`. 
Chúng ta có thể xem ví dụ dưới đây để hiểu rõ hơn về `fresh_when`:
```
fresh_when(object = nil, etag: nil, weak_etag: nil, strong_etag: nil, last_modified: nil, public: false, template: nil)
```
trên đây là các trường của `fresh_when`, chúng ta hãy cùng xem controller dưới đây:
```
def show
  @article = Article.find(params[:id])
  fresh_when(etag: @article, last_modified: @article.updated_at, public: true)
end
```
Như chúng ta tham khảo ở bài viblo trên, trong trường hợp `Etag` hoặc `last_modified` khớp, thì server sẽ phản hồi `304 Not Modified`.

Như vậy, với `fresh_when` thay vì chúng ta phải request lên server liên tục và trả lại  `response`, chúng ta chỉ cần gửi trả lại khi có thay đổi, như vậy `performance` có lẽ đã tăng lên không ít phải không nào :D

Tham khảo: RoR API: [ActionController#fresh_when](http://api.rubyonrails.org/v5.1/classes/ActionController/ConditionalGet.html#method-i-fresh_when)

#### 4) controller + server: Page caching
```
The fastest page is delivered by Nginx without ever contacting Rails
```
Chúng ta sẽ thấy câu nói trên vô cùng hợp lý, hãy cùng xem các trang như 500 hay 404, hoặc các trang similar page, chúng ta thấy chúng load nhanh vô cùng, lý do đơn giản là nó k đụng chạm gì đến rails cả =)), nó chỉ đơn giản là show view ra thôi ^_^
Rails cho phép chúng ta sử dụng tính năng `caches_page` trong controller như ví dụ dưới đây:
```
class ProductsController < ActionController
 
  caches_page :index
 
  def index
    @products = Products.all
  end
```  
Tại sao nó lại nhanh, đơn giản là nó được lưu trong `Nginx` là được lôi ra ngay mà không cần phải làm phiền đến rails, và đặc biệt cache nè được lưu trữ dựa trên phương thức `expire_page` và `expire_cache`, còn các bạn muốn hiểu là gì thì hãy tham khảo thêm ở bài viết về `http-caching` này nhé https://viblo.asia/p/tim-hieu-ve-http-caching-djeZ1BRJlWz
Đối với các trang tĩnh thì chắc không có vấn đề gì, nhưng đối với các trang dữ liệu người dùng thay đổi thì chúng ta sẽ phải cân nhắc về không gian lưu trữ và cách thức, cái nè chắc phải thảo luận trong trường hợp cụ thể :D

Tham khảo:
- [RoR guides: Page caching](http://guides.rubyonrails.org/v3.2/caching_with_rails.html#page-caching)
- [StefanWintermeyer: Caching in Ruby on Rails 5.2](https://medium.com/rubyinside/https-medium-com-wintermeyer-caching-in-ruby-on-rails-5-2-d72e1ddf848c)

#### 5) Uploads and images: ActiveStorage
Đối với các vấn đề về `upload` và lưu trữ `images` thì chúng ta có thể sử dụng `ActiveStorage` ví dụ như Amazon S3, Google Cloud hay Microsoft Azure.
Hiện nay, các công cụ hỗ trợ bởi các ông lớn đã rất mạnh, chúng ta có thể dùng sử dụng để chỉnh sửa độ phân giải một cách đơn giản và tối ưu thay vì phải tự tay cài đặt hay quan tâm đến khả năng lưu trữ hay performance.
Nó khiến cho công việc của nhà phát triển đơn giản hơn nhiều ^_^

### Một vài Tip và Trick khác để cải thiện performance

#### Use HTTP/2
Với những tính năng vô cùng mạnh mẽ, bản HTTP/2 đã vượt qua 1.1 với các tính năng vượt trội như:
- Dữ liệu truyền tải dạng nhị phân thay vì truyền tải bằng text như 1.1
- Dữ liệu được nén trước khi gửi đi
- Giải quyết phản hồi ưu tiên, thay vì phản hồi theo thứ tự như 1.1, HTTP/2 cho phép xử lý bất đồng bộ, do vậy các truy vấn nhỏ và nhanh hơn sẽ được xử lý sớm. Đồng thời cho phép trình duyết có thể sắp xếp ưu tiên tải về cho các tài nguyên nào quan trọng.
- Thiết lập kết nối liên tục cho phép xử lý nhiều truy vấn cùng lúc

#### CDN
CDN thì chắc các bạn đã biết, nếu các bạn muốn hiểu rõ hơn CDN là gì, tại sao chúng ta nên dùng CDN và dùng khi nào thì hợp lý?
Xin hãy tham khảo bài viết của đại ca dưới đây nhé, đảm bảo không phí thời gian đâu. Một bài viết vô cùng tuyệt vời đó :D

https://viblo.asia/p/su-dung-cdn-de-giam-tai-cho-server-ymwGXOxoM4p1

### Kết luận:
Trên đây là bài dịch từ nguồn tham khảo bên dưới xen lẫn một ít cảm xúc cá nhân, do vậy bài viết vẫn cần chỉnh sửa nhiều, mong rằng các bạn đi qua có thể cho xin một ít ý kiến cá nhân để mình cố gắng hoàn thiện bài viết hơn.
Xin chân thành cảm ơn các bạn.

Tham khảo: https://www.monterail.com/blog/actionable-tips-to-improve-web-performance-with-rails