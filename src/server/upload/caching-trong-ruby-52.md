Dưới đây là bài dịch từ nguồn [caching-in-ruby-on-rails](https://medium.com/rubyinside/https-medium-com-wintermeyer-caching-in-ruby-on-rails-5-2-d72e1ddf848c) và được trích một phần từ quyển "learn ruby 5.2"

### Tóm tắt sơ bộ
Thông thường các lập trình viên khi triển khai tối ưu performance, thường sẽ lưu tâm đến vấn đề đánh index trong database, sau đó là đến caching. Và mục đích của bài viết này là để chúng ta hiểu hơn về cơ chế hoạt động của bộ nhớ cache, nhằm đưa ra giải pháp tối ưu cho hệ thống của mình.

#### Có 2 mục tiêu đối với caching:
- Khi ứng dụng chạy nhanh hơn, nó sẽ làm gia tăng trải nghiệm người dùng, khiến ứng dụng để lại ấn tượng tốt hơn trong mắt người dùng, do vậy tỉ lệ chuyển đổi sẽ tốt hơn
- Thứ 2 là nếu sử dụng cache hợp lý, chúng ta sẽ giảm tải bớt phần cứng cho máy chủ web, do CPU và RAM cần để xử lý truy vấn ít hơn.

#### Chúng ta chia caching thành 3 loại:
- HTTP caching: cực mạnh mẽ, HTTP caching được sử dụng rất nhiều cho các ứng dụng di động, và cùng với đánh index trong database, nó sẽ làm bạn tiết kiệm rất nhiều thời gian xử lý trên máy chủ và băng thông
- Page caching: không bằng HTTP caching
- Fragment caching

Và mục tiêu của chúng ta là kết hợp 3 phương pháp trên để  đưa ra giải pháp tốt nhất cho hệ thống.
Nhưng do thời gian và hiểu biết có hạn nên trong phần đầu này mình chỉ viết về  `HTTP caching`, `last-modified` và `etag`

### Thiết kế app cơ bản
Bây giờ chúng ta sẽ thiết kế một app cơ bản với 2 table `Company` và `Developer`
để tránh dài dòng, chúng ta sẽ thiết kế  app bằng `scaffold` và sử dụng gem `faker` để fake data
dưới đây là model của 2 table

app/models/company.rb
```rb
class Company < ApplicationRecord
 has_many :employees, dependent: :destroy
 validates :name, presence: true, uniqueness: true
end
```
app/models/employee.rb
```rb
class Employee < ApplicationRecord
 belongs_to :company, touch: true
 validates :first_name, presence: true
 validates :last_name, presence: true
 validates :company, presence: true
end
```
### Đo tốc độ bình thường của trang
giờ chúng ta sẽ lấy tốc độ load trang lần đầu tiên
đối với trang index `localhost:3000/companies`
```sql
Completed 200 OK in 2180ms (Views: 2167.2ms | ActiveRecord: 1.3ms)
```
cùng là trang index chúng ta load lần thứ 2
```
Completed 200 OK in 50ms (Views: 48.4ms | ActiveRecord: 0.4ms)
```
đối với trang show `localhost:3000/companies/1`
```sql
Completed 200 OK in 94ms (Views: 56.9ms | ActiveRecord: 0.3ms)
```
cùng với trang show chúng ta load lần 2
```
Completed 200 OK in 43ms (Views: 39.8ms | ActiveRecord: 0.2ms)
```

Qua 2 ví dụ trên chúng ta đặt ra câu hỏi, tại sao lần thứ 2 page được load nhanh như vậy.Mod
Câu trả lời `Đương nhiên là do caching rùi`
Vậy chúng ta cùng đi tìm hiểu cơ chế caching nhé

### HTTP caching
Chúng ta đều biết đến cơ chế caching là thông qua `Last-Modified`. vậy `Last-Modified` là gì?
`Last-Modified` là thời gian cập nhật cuối cùng của dữ liệu lưu tạm và nó được lưu trong `HTTP Header`
Cơ chế là khi dữ liệu được load lần đầu tiên, nó sẽ được lưu trữ trên client và được đánh dấu bằng `Last-Modified`, và khi chúng ta request lần thứ 2, hệ thống sẽ kiểm tra `Last-Modified` trong `HTTP Header` xem có khớp không, nếu khớp thì sẽ load dữ liệu đang được lưu tạm, còn không sẽ trả về lỗi `304 Not Modified` và sẽ requets lên server để lấy dữ liệu mới về cập nhật lại.

Vậy làm sao để  chúng ta có thể xem `Last-Modified` trong Rails

Chúng ta sẽ sửa `HTTP Header` giống dưới đây:
`app/controllers/companies_controller.rb`
```rb
# GET /companies/1
# GET /companies/1.json
def show
 fresh_when last_modified: @company.updated_at
end
```
Và giờ chúng ta hãy xem kết quả, chúng ta chạy lệnh
```command
$ curl -I http://localhost:3000/companies/1
```
```
HTTP/1.1 200 OK
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
X-Download-Options: noopen
X-Permitted-Cross-Domain-Policies: none
Referrer-Policy: strict-origin-when-cross-origin
Last-Modified: Sun, 29 Jul 2018 15:08:46 GMT
...
```

bây giờ, chúng ta hãy quay ra trang `index` xong click vào trang `show` của company 1 lần nữa và xem log server:
```
Started GET "/companies/1" for 127.0.0.1 at 2018-07-30 04:48:38 +0700
Processing by CompaniesController#show as HTML
  Parameters: {"id"=>"1"}
  Company Load (0.2ms)  SELECT  "companies".* FROM "companies" WHERE "companies"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
  ↳ app/controllers/companies_controller.rb:68
Completed 304 Not Modified in 3ms (ActiveRecord: 0.2ms)
```
#### Chúng ta dễ dàng nhận thấy `Completed 304 Not Modified in 3ms (ActiveRecord: 0.2ms)`, lần chạy này chúng ta sử dụng cache để load và nó chỉ mất `3ms` thay vì mất `43ms` như ban đầu, như vậy chúng ta đã tận dụng được khá là nhiều tài nguyên.

#### Etag
Khuyết điểm của `last-modified` là thời gian phải client phải trùng với thời gian của server, do đó chúng ta sẽ thay thế nó bằng một đánh dấu khác đó là `etag`
`Etag` là một chuỗi `Hash` hoặc `footprint` và nó thay đổi sau mỗi lần cập nhật (chức năng tương tự như `last-modified`)

Và giờ chúng ta sẽ sử theo dõi `etag` trong hệ thống dưới đây:
chúng ta sẽ cập nhật 2 method `index` và `show` như dưới đây:
```
# GET /companies
# GET /companies.json
def index
 @companies = Company.all
 fresh_when etag: @companies
end
# GET /companies/1
# GET /companies/1.json
def show
 fresh_when etag: @company
end
```
Và chúng ta hãy xem header của nó bằng lệnh dưới đây:
```command
curl -I http://localhost:3000/companies -c cookies.txt
```
```
HTTP/1.1 200 OK
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
X-Download-Options: noopen
X-Permitted-Cross-Domain-Policies: none
Referrer-Policy: strict-origin-when-cross-origin
ETag: W/"305f07ae62145e92f7cd789e2b10c931"
Content-Type: text/html; charset=utf-8
Cache-Control: max-age=0, private, must-revalidate
Set-Cookie: _demo_session=7eUrBJX516dCfU4cFdKSkC8uGyDvazCpSsNqiNs1FUptCWELAFXGv%2F%2FTQ%2Bv6x0vhw1fJ%2BoRUuat9sVz84kdxCPd%2BF3Lvmy0BdQlGA2ttQEk2Ypy0EZEQJeU%2Fxe2VI1SgYck4%2BH14OBQkzuz1tWw%3D--CkVyYsCqpyYVDY9k--YoNteeFLBpcWRKFUMghijQ%3D%3D; path=/; HttpOnly
X-Request-Id: 27062f06-e80c-4e2f-8edb-85bb4ceb7129
X-Runtime: 0.081971
```
Khi chúng ta chạy lệnh `curl` với phần mở rộng là `-b cookies.txt`, `curl` sẽ gửi trả lại `cookies`, và chúng ta dễ dàng nhận thấy `etag` của 2 lần gửi giống hệt nhau
```
curl -I http://localhost:3000/companies -b cookies.txt
```
```
HTTP/1.1 200 OK
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
X-Download-Options: noopen
X-Permitted-Cross-Domain-Policies: none
Referrer-Policy: strict-origin-when-cross-origin
ETag: W/"305f07ae62145e92f7cd789e2b10c931"
Content-Type: text/html; charset=utf-8
Cache-Control: max-age=0, private, must-revalidate
Set-Cookie: _demo_session=A9ZRYyjMA3LjcSkj0hJAucXKnirkqwgORW1UVnfP48fxErScpZpUCYyslkxOUS%2FcZWuY4NTpgBpTJLZliiP9QocQsFaSk0q4K5pk6R%2FW1CMsZakxiL1GM3J3%2FjnU43ZyweSwEmlYpFa8k%2F%2BR6L8%3D--I2qZXXFqZ%2FprgOYQ--9H0SyHClQ%2FsR5%2BIFYqKoEQ%3D%3D; path=/; HttpOnly
X-Request-Id: 2c8fd224-b62a-4ec8-95fe-b50dc823c03e
X-Runtime: 0.057626
```
Chúng ta hãy quay về trang `index` và `F5` lại một lần nữa và xem log server:
```
Started GET "/companies" for 127.0.0.1 at 2018-07-30 05:09:38 +0700
Processing by CompaniesController#index as HTML
   (0.2ms)  SELECT COUNT(*) AS "size", MAX("companies"."updated_at") AS timestamp FROM "companies"
  ↳ app/controllers/companies_controller.rb:8
Completed 304 Not Modified in 2ms (ActiveRecord: 0.2ms)
```
Như vậy chúng ta cũng chỉ mất 2ms để load lại trang `index` thông qua cache.

### Kết luận:
`HTTP caching` quả thực vô cùng mạnh mẽ vậy còn các các phương pháp cache còn lại thì sao, chúng ta sẽ chào đón ở chương sau nhé.