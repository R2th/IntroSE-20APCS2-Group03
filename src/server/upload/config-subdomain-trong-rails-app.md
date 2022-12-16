![](https://images.viblo.asia/c9693339-572e-42e5-be48-e4b8c830f3a0.jpg)
## I. Giới thiệu
Hello mọi người. Khi làm trong một dự án chắc hẳn chúng ta thường gặp thấy 1 domain có chứa nhiều subdomain khác. Giả sử chúng ta có một trang web thời trang `fashion.com` và chúng ta muốn hỗ trợ nhiều subdomains như `dev.fashion.com`, `app.fashion.com`, `api.fashion.com` trong một Rails application và muốn đảm bảo rằng việc authentication cho tất cả các subdomain và không có routes nào bị duplicate. Câu hỏi đặt ra là: "Làm thế nào để tạo một Rails app có thể hỗ trợ nhiều `subdomains`".

Trong bài post này, hãy cùng mình tìm hiểu:
1. Subdomain là gì?
2. Config subdomain trong Rails app.
3. Thiết lập nhiều subdomains locally cho môi trường development.

Let's go!!!

## II. Chi tiết
### 1. Subdomain là gì?

- `Subdomain` hay còn gọi là tên miền phụ (domain phụ). Đây là một phần được tách ra từ Domain.
- `Subdomain` hoạt động riêng biệt như một trang web bình thường và có cùng tên miền chính. Và nó tách biệt hoàn toàn như 1 website khác (nên về mặt SEO, nó không hưởng bất kỳ backlinks nào từ domain chính).

Như giả sử ban đầu mình đưa ra:
- `fashion.com`: là tên miền chính (domain)
- `dev.fashion.com`, `app.fashion.com`, `api.fashion.com`: là các tên miền phụ (subdomain)

Bằng cách sử dụng tên Subdomain, bạn tạo ra một trang web hoàn toàn riêng biệt, hoạt động độc lập mà không cần mất phí đăng ký tên miền mới hay gặp các rắc rối như việc xử lý chuyển hướng tên miền.

Để tìm hiểu kỹ hơn về subdomain bạn có thể truy cập link [này](https://mona.media/subdomain-la-gi/) nha.

### 2. Config subdomain trong Rails app.

#### 2.1 Xử lý multiple subdomains

Rails sử dụng file `routes.rb` để xử lý các `request` và map chúng tới các `action` của `controller` cụ thể.
Ví dụ:
```
get "/fashions", to: "fashions#index"
```
Trong ví dụ trên, tất cả endpoints được định nghĩa trong `routes.rb` có thể áp dụng cho tất cả các `subdomain`. Vì thế `api.fashion.com/fashions` hay `app.fashion.com/fashions` cũng được xử lý theo route này. Vấn đề đặt ra là chúng ta chỉ muốn request từ `api` subdomain được xử lý theo route này còn `app` subdomain thì chỉ sử dụng cho APP routes. Chúng ta sẽ phải thêm một vài quy tắc vào các routes để chúng được xử lý chỉ khi một quy tắc cụ thể được đáp ứng khi thực hiện request.

Rails cung cấp một phương thức là `constraints` có thể chỉ định các quy tắc bổ sung cho route đã cho.

```
get "/fashions", to: "fashions#index", constraints: { subdomain: "api" }
```

Điều này đảm bảo rằng nếu request đến từ `api.fashion.com/fashions`, nó sẽ được xử lý bởi `FashionsController#index`. Mọi request từ những subdomain khác như `app` sẽ không được xử lý bởi route này.

```
get "/fashions", to: "fashions#index", constraints: { subdomain: "api" }
get "/fashions/:id", to: "fashions#show", constraints: { subdomain: "api" }
post "/fashions", to: "fashions#create", constraints: { subdomain: "api" }
```

Chúng ta có thể sử dụng bock cho `constraints` để định nghĩa nhiều routes cho một subdomain.
```
constraints subdomain: "api" do
  get "/fashions", to: "fashions#index"
  get "/fashions/:id", to: "fashions#show"
  post "/fashions", to: "fashions#create"
end
```

Để định nghĩa routes cho multiple subdomains, chúng ta chỉ cần thêm block `constraints` trong file `routes.rb`.
```
constraints subdomain: "api" do
  ...
end

constraints subdomain: "app" do
  ...
end

constraints subdomain: "dev" do
  ...
end
```

Rails cung cấp `request constraints` và `segment constraints`. `Segment constraints` thêm quy tắc trên request trong khi `request constraints` thêm điều kiện trên request. `Hash key` trong một request constraints cần phải là một phương thức trên `Request object` trả về một `string` và giá trị cần phải là giá trị mong đợi.
```
constraints subdomain: "api" do
  ...
end
```
Trong trường hợp trên, chúng ta đang sử dụng phương thức `subdomain` trên `Request` object và matching nó với một string như api, app hay dev.

**Xử lý multi-level subdomains**

Chúng ta sử dụng `app.staging.fashion.com` cho môi trường staging. Nếu chúng ta cài đặt như trên, chúng ta sẽ nhận thấy rằng tất cả các yêu cầu được gọi đến subdomain `app` đều trả về lỗi 404. Nếu chúng ta thử debug vào, chúng ta sẽ thấy constraint cho subdomain sẽ lỗi.

```
request.subdomain #=> app.staging
```

Chúng ta hy vọng nó sẽ trả lại subdomain `app`, nhưng thay vì trả về như mong muốn, nó trả về app.staging.

Chúng ta muốn giải quyết vấn đề này mà không cần thêm vào trong enviroment. Việc phân tích cú pháp tên miền subdomain được quản lý bởi `config.action_dispatch.tld_length`. Giá trị mặc định của configuration này là 1, về cơ bản hỗ trợ một level subdomain.

Vì chúng ta có 2 level subdomains, chúng ta cần set giá trị cho `config.action_dispatch.tld_length` là 2.

```
# config/application.rb
config.action_dispatch.tld_length = Integer(ENV['TLD_LENGTH'] || 1)
```

Chúng ta có thể thiết lập bằng cách sử dụng một biến môi trường để có thể sử dụng cùng một code trong môi trường staging cũng như trong môi trường production. Bây giờ, thiết lập routing cũng sẽ hoạt động với cả `app.staging.fashion.com`.

#### 2.2. Quản lý session

Bây giờ các routes đã được define để xử lý các request đến từ nhiều subdomains, chúng ta cần quan tâm đến việc xác thực cho tất cả các subdomains. Chúng ta có thể thực hiện việc này theo 2 cách:

- Sử dụng một session để sử dụng trên tất cả các subdomains.
- Các session riêng biệt sử dụng trên các subdomain riêng biệt.

Rails sử dụng cookies để lưu trữ session key. Khi user đăng nhập, thông tin session được lưu trữ trong session store và session key được lưu dưới dạng một cookie trong trình duyệt. Vì vậy, vào lần tới khi user truy cập trang web, cùng một session cookie được gửi từ trình duyệt đến server và server sẽ quyết định xem user có đăng nhập hay không dựa trên session có tồn tại cho lần tới không.

Cấu hình mặc định cho session trong Rails:
```
Rails.application.config.session_store :cookie_store, key: "_fashions_session"
```

Key `_fashions_session` sẽ được sử dụng như tên của session cookie và giá trị của nó là id của session.

**Cookies primer**

Mặc định, cookies được trình duyệt đặt trên request's domain. Vì vậy nếu chúng ta đến ứng dụng của mình từ `app.fashions.com` thì session cookie sẽ được đặt với `app.fashions.com`. Mỗi subdomain sẽ đặt session cookie riêng, do đó user session sẽ không được chia sẻ trên các subdomain theo mặc định.

**Chia sẻ session giữa các subdomains khác nhau**

Nếu chúng ta muốn chia sẻ user session giữa các subdomains, chúng ta sẽ đặt session cookie trên domain `fashions.com` để tất cả các subdomain có thể truy cập. Điều này có thể làm được bằng cachs chuyển option `domain` đến cài đặt session store.

```
Rails.application.config.session_store :cookie_store, key: "_fashions_session", domain: :all
```

Bằng cách chuyển `domain` thành `:all`, chúng ta đang nói với Rails để đặt session cookie trên level cao nhất của ứng dụng như `fashions.com` thay vì
trên máy chủ yêu cầu có thể bao gồm các subdomains riêng lẻ. Khi chúng ta làm như vậy, session có thể được chia sẻ giữa các subdomains khác nhau.

Chúng ta cũng có thể chuyển danh sách domains sang tùy option domains vào trong 1 mảng để hỗ trợ nhiều domains

Có thêm một option cần được cấu hình để đặt cookie đúng cho tất cả các subdomains. Là option `tld_length`. Khi sử dụng `domain: :all`, option này có thể chỉ định cách parse domain để thông dịch TLD của domain. Trong trường hợp, đối với `app.fashions.com` chúng ta nên đặt `tld_length` thành 2 để Rails thông dịch TLD là `fashions.com` khi thiết lập cookie. Vì vậy, cấu hình lưu trữ session cuối cùng cho nhiều subdomains sẽ như thế này:

```
Rails.application.config.session_store :cookie_store,
                                       key: "_fashions_session",
                                       domain: :all,
                                       tld_length: 2
```

### 3. Config nhiều subdomains locally cho môi trường development

Có nhiều cách để thiết lập subdomains locally. Đơn giản nhất là sửa trong file: `/etc/hosts`

```
127.0.0.1 dev.fashions.local
127.0.0.1 app.fashions.local
127.0.0.1 api.fashions.local
```

Điều này đảm bảo rằng thiết lập subdomains sẽ hoạt động trong môi trường local. Chúng ta cũng có thể sử dụng các công cụ như [pow](http://pow.cx/) để quản lý subdomains cục bộ.

## III. Kết luận
Trên đây là tìm hiểu của mình về subdomain và cách config subdomain trong Rails app, hy vọng sẽ giúp ích cho các bạn. Thanks for reading.

Link tham khảo:
- https://guides.rubyonrails.org/routing.html
- https://blog.appsignal.com/2020/03/04/building-a-rails-app-with-multiple-subdomains.html
- https://gist.github.com/indiesquidge/b836647f851179589765