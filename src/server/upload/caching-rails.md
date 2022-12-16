Chúng ta đều biết **web caching** là một phương pháp lưu trữ bản sao của tài liệu web để có thể tăng tốc độ load trang, cải thiện hiệu suất của web site.

Có các loại caching chính trong rails:

- **HTTP caching**: Là phương pháp mạnh và có **hiệu suất lớn nhất** trong các phương thức caching. Trong thực tiễn thì các web page có các tương tác với Mobile (IPhone, Android) nên sử dụng tối đa HTTP caching. Nếu kết hợp giữa HTTP caching và key-base cache expiration, chúng ta sẽ tiết kiệm rất nhiều băng thông và thời gian xử lý của server
- **Page caching**: Là một phương pháp khá hữ hiệu trong caching, nhưng không tối ưu như HTTP caching.
- Fragment caching
- Action caching
- Database caching

## 1. HTTP caching
HTTP caching là cơ chế sử dụng các headers của HTTP request để web browser có thể nhận biết được có nên gửi caching cho client cũng như update cache.
HTTP headers quy định các header sau dùng để caching:

- **Strong caching headers**: Expires, Cache-control
- **Weak caching headers**: Etag, Last-modified

Browser sẽ
1. Check Expires/Cache-Control để xác định xem liệu có tạo request tới server không.
2. Nếu phải tạo request, browser sẽ gửi kèm Last-Modified/ETag trong HTTP request. Nếu giá trị Etag của page trùng với Etag cũ, server sẽ gửi về 304 response thay cho 200, đồng thời browser sẽ load data từ cache mà không gửi về bản mới.


**Implement:**

### 1.1 Last-modified
Các bạn có thể tạo models đơn giản, ở đây mình sử dụng generate scafforld 
```
def index
    @companies = Company.all
    fresh_when last_modified: @companies.maximum(:updated_at)
end

def show
    fresh_when last_modified: @company.updated_at
end
```

curl lên server ta thấy có Last-Modified header là trường updated_at của companies
```
$ curl -I http://localhost:3000/companies
HTTP/1.1 200 OK
.....
Last-Modified: Thu, 22 Aug 2019 02:31:28 GMT
```
curl lại với header If-Modified-Since, ta sẽ thấy Response trả về là 304
```
$ curl -I http://0.0.0.0:3000/companies --header 'If-Modified-Since: Thu, 22 Aug 2019 02:31:28 GMT'
HTTP/1.1 304 Not Modified
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
X-Download-Options: noopen
X-Permitted-Cross-Domain-Policies: none
Referrer-Policy: strict-origin-when-cross-origin
Last-Modified: Thu, 22 Aug 2019 02:31:28 GMT
Cache-Control: max-age=0, private, must-revalidate
```
Xem rails logs, ta thấy server không mất time để render view nữa 
![](https://images.viblo.asia/7419eb7c-e26d-4965-a8d4-6990d33c5a1f.png)
### 1.2 Etag
Sử dụng Etag, server sẽ generate Etag để so sánh giữa 2 phiên bản
```
  def index
    @companies = Company.all
    fresh_when etag: @companies
  end
```
```
$ curl -I http://0.0.0.0:3000/companies
HTTP/1.1 200 OK
.......
ETag: W/"1be50b94a50f93f5613f6cc5562c0e3f"
```
curl lại với If-non-match
```
$ curl -I http://0.0.0.0:3000/companies --header 'If-None-Match: W/"1be50b94a50f93f5613f6cc5562c0e3f"'
HTTP/1.1 304 Not Modified
ETag: W/"1be50b94a50f93f5613f6cc5562c0e3f"
```

Do Etag được generate theo object, nên để phân biệt giữa 2 user chúng ta có thể làm như sau
```
fresh_when etag: [@companies, current_user]
```

### 1.3 Cache-control
Cache control cho phép ta có thể quy định cache thông qua proxy

Ví dụ ta sử dụng CDN cloudfront để caching webpage, 

Cache-control:
- private: không cho phép CDN cache lại page của chúng ta
- public: cho phép CDN cache lại page .
```
fresh_when @company, public: true
```

```
$ curl -I http://0.0.0.0:3000/companies
Cache-Control: public
```

Ta cũng có thể active cho Rails sử dụng asset_host trên production là cloudfront như sau:
```
config.action_controller.asset_host = "ENV["cloud_front_url"]"

```

Chúng ta cũng có thể sử dụng expires_in để set time expires cho cache-control 
```
expires_in 1.minutes, :public => true
```

### 1.4. touch
Giả sử Company có nhiều Employee, nếu thay đổi Employee trong company thì nếu ta cũng muốn company thay đổi, ta có thể sử dụng touch. Bởi nếu viết theo **updated_at** thì company không được modified nên không thay đổi. Khi này ta sử dụng touch
```
class Employee < ActiveRecord::Base
 belongs_to :company, touch: true
end
```
## 2. Page Caching
Page caching là một cơ chế của Rails cho phép ta có thể cache được page bằng static file, ta cũng có thể serve static file bằng NGINX hoặc Apache
Pache caching đã được remove ở Rails 4 nên muốn sử dụng ta thêm gem
```
gem 'actionpack-page_caching'
gem 'actionpack-action_caching'
```

```
caches_page :index, :show
```

chạy lệnh sau trên console để cho phép Rails enabled caching
```
rails dev:cache
rails s
```
Thư mục public trước khi caching sẽ như sau
```
- public
  - assets
  - 404.html
  - 422.html
  - 500.html
  - robots.txt
```
Sau khi caching, cached page sẽ được lưu trong public
```
- public
  - assets
  - 404.html
  - 422.html
  - 500.html
  - robots.txt
  - companies.html
```

Page Caching  cũng cho phép ta zip caching page bằng gz. Dưới đây là config để zip 
```
caches_page :index, :show, :gzip => :best_compression
```

```
- public
  - assets
  - 404.html
  - 422.html
  - 500.html
  - robots.txt
  - companies.html
  - companies.html.gz
```

bài viết thiếu 1 vài demo, mình đang bổ sung, mong các bạn thông cảm :bow:

to be continue .....