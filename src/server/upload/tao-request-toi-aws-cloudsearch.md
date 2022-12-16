**AWS** cung cấp dịch vụ **Amazon CloudSearch** giúp quản lý và thay đổi quy mô, giải pháp tìm kiếm một cách đơn giản và tiết kiệm chi phí cho website của bạn. Tương tự như **Elasticsearch**, **Amazon CloudSearch** hỗ trợ 34 ngôn ngữ cùng với các tính năng tìm kiểm phổ biến như làm nổi bật, tự động hoàn thiện và tìm kiếm tọa độ địa lý.
# Các thành phần của một AWS request
Vì lý do bảo mật, phần lớn các request tới AWS được xác thực dựa trên `access key` và `secret access key`. Mỗi một request phải bao gồm các thành phần:
* Endpoint Specification: Xác định địa chỉ DNS của máy tính gửi request
* Action: Chỉ định hành động mà bạn muốn service thực hiện
* Required and Optional Parameters: Các parameters gửi lên
* Date: Có định dạng được quy định theo ISO8601 (một AWS request chỉ có hiệu lực trong 5 phút)
* Authentication Parameters: Chứa đựng các thông tin xác thực cho một request (thuật toán mã hóa, phạm vi xác thực,...)
# Các bước tạo một AWS request

**Xác định các thông tin cần thiết**

Các giá trị bên dưới xác định thông tin cơ bản của một request. Chúng ta sẽ sử dụng **Ruby on Rails** để minh họa cách thức tạo một **Signature Version 4**
```
METHOD = "GET"                           # Phương thức của request
SERVICE = "iam"                          # Tên service
ENDPOINT = "iam.us-east-1.amazonaws.com" # Điểm cuối nhận request
REGION = "us-east-1"                     # Khu vực tìm kiếm
ALGORITHM = "AWS4-HMAC-SHA256"           # Phương thức mã hóa
AWS4_REQUEST = "aws4_request"            # Loại request
SIGNED_HEADERS = "host;x-amz-date"       # Các header key được đăng ký
CANONICAL_URI = "/"                      # Đường dẫn tương đối (có thể chứa thông tin API version)
DATE_TIME_FORMAT = "%Y%m%dT%H%M%SZ"      # Time format theo thiêu chuẩn ISO8601
DATE_FORMAT = "%Y%m%d"                   # Date format theo thiêu chuẩn ISO8601

time_now  = Time.now.utc
amzdate   = time_now.strftime DATE_TIME_FORMAT
datestamp = time_now.to_date.strftime DATE_FORMAT
credential_scope = [datestamp, REGION, SERVICE, AWS4_REQUEST].join("/")
host = Resolv::DNS.new.getresource(RESOURCE, Resolv::DNS::Resource::IN::CNAME).name.to_s
```
**Bước 1: Tạo Canonical Request cho Signature**

Để bắt đầu quá trình gửi request lên AWS, đầu tiên ta phải tạo một chuỗi string chứa đựng các thông tin giống như một request cơ bản để chắc chắn service có thể giải mã và xác thực thông tin sau khi nó nhận được request. Nội dung của `canonical request` sẽ được mã hóa bằng `SHA256`.
```
def request_hash
  canonical_headers = "host:#{host}\nx-amz-date:#{amzdate}\n"
  payload_hash = Digest::SHA256.hexdigest("")
  canonical_request = [METHOD, CANONICAL_URI, request_parameters, canonical_headers, SIGNED_HEADERS, payload_hash].join("\n")
  Digest::SHA256.hexdigest canonical_request
end

def request_parameters
  [
    {"Action": "DescribeRegions"},
    {"Version": "2013-10-15"}
  ].map(&:to_query).join("&")
end
```

**Bước 2: Tạo String to Sign cho Signature**

Chuỗi `string to sign` chứa thông tin của request và nội dung của `canonical request` chúng ta đã tạo ở trên.
```
def string_to_sign
  [ALGORITHM, amzdate, credential_scope, request_hash].join("\n")
end
```
**Bước 3: Tạo Signature**

Chúng sẽ đưa `secret access key` lấy được từ AWS vào biến môi trường `ENV["API_SECRET_KEY"]`. Tạo `signature key` từ `secret access key`, nó được mã hóa nhiều lần dưới định dạng binary:

```
def signature_key
  k_date = OpenSSL::HMAC.digest SHA256, "AWS4#{ENV["API_SECRET_KEY"]}", datestamp
  k_region = OpenSSL::HMAC.digest SHA256, k_date, REGION
  k_service = OpenSSL::HMAC.digest SHA256, k_region, SERVICE
  OpenSSL::HMAC.digest SHA256, k_service, AWS4_REQUEST
end
```
Signature là một chỗi được mã hóa `SHA256` dưới định dạng `hexdigest` được tạo thành từ `signature key` và `string to sign`:
```
def signature
  OpenSSL::HMAC.hexdigest SHA256, signature_key, string_to_sign
end
```
**Bước 4: Thêm Signature vào request**

Chúng ta có thể thêm `signature` vào một request bằng hai cách
* Thêm vào như một HTTP header có tên là Authorization
* Thêm vào chuỗi query string

Trong ví dụ này chúng ta sẽ sử dụng cách thứ nhất để đưa `signature` vào request:
```
def auth_header
  "#{ALGORITHM} Credential=#{ENV["API_ACCESS_KEY"]}/#{credential_scope}, SignedHeaders=#{SIGNED_HEADERS}, Signature=#{signature}"
end
```
Chúng ta sử dụng gem [faraday](https://github.com/lostisland/faraday) để thực hiện request.
```
request_url = "https://#{host}#{CANONICAL_URI}?#{request_parameters}"

faraday_connect = Faraday.new url: request_url do |faraday|
  faraday.request :url_encoded
  faraday.adapter Faraday.default_adapter
end

faraday_connect.get do |request|
  request.headers["X-Amz-Date"] = amzdate
  request.headers["Authorization"] = auth_header
end
```
# Sumary
Như vậy chúng ta đã thực hiện xong việc tạo một request để lấy dữ liệu từ Amazon CloudSearch. Chúng ta  cũng có thể gom những đoạn code trên lại thành một service để thuận tiện cho việc sử dụng. Các bạn có thể tham khảo service đó tại [đây](https://gist.github.com/dongoclam/e36f6560124460c5c932b6a84afbd683).

Blog: https://www.dnlblog.com/posts/tao-request-toi-aws-cloudsearch