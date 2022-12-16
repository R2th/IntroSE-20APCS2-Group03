Khi thực hiện request đến 1 external API, chắc hẳn các bạn sẽ gặp trường hợp 1 số request với cùng parameter gửi lên thì sẽ có cùng 1 kết quả trả về. Nếu như chúng ta có thể thực hiện việc caching request hoặc response đó lại, thì có thể giảm được các request HTTP, giúp cải thiện performance của hệ thống và có thể tránh được lỗi rate limits khi gửi request.

Gem API Cache là một lựa chọn tốt cho việc cache API request và response bằng việc sử dụng Monata store, như mà Memcache hoặc Redis.
Tuy nhiên không phải lúc nào chúng ta cần đến việc lưu lại toàn bộ request cũng như response của API, hoặc là nó sẽ gặp hạn chế là trong trường hợp có quá nhiều request, dung lượng response lớn, thì khả năng dẫn đến việc tràn bộ nhớ khá là cao, nhất là đối với các hệ thống có lượng truy cập lớn, thì cách này k phải lúc nào cũng tối ưu.

Có 1 cách khác để thực hiện việc này đó là lưu lại request và những gì cần thiết vào database. Bài toán của mình đặt ra chỉ đơn giản là xây dựng một service để lấy dữ liệu từ một API Endpoint như sau:
```
service = RemoteService.new
data = service.get("https://example.com/endpoint")
```

Ở lần chạy đầu tiên, request HTTP sẽ được thực hiện. Request URL và response body sẽ được lưu vào database.
Khi chạy lại service với cùng request URL, thì nếu thoả mãn điều kiện caching,  thì HTTP request sẽ k được thực thi, thay vào đó cache sẽ trả về response đã được lưu lại ở database.

Ở đây mình sẽ dùng API demo của trang này https://reqres.in/ để có thể gọi request mẫu.  Và việc thực hiện cũng khá là đơn giản.
Đây là file migration của mình, tạo một table để lưu lại request url và response
```
class CreateApiRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :api_requests do |t|
      t.text :url
      t.jsonb :response

      t.timestamps
    end

    add_index :api_requests, :url, unique: true
  end
end
```
Việc đánh index giup cải thiện hiệu suất cho việc tìm kiếm và đảm bảo tính duy nhất của url đã request.
Tiếp đến **ApiRequest** model
```
class ApiRequest < ApplicationRecord
  validates :url, presence: true, uniqueness: true

  def self.find url
    hashed_url = Digest::MD5.hexdigest(url)
    find_or_initialize_by(url: hashed_url)
  end

  def cached? expired_at
    return false if new_record?
    expired_at < updated_at
  end
end
```

Ở đây cùng chú ý đến hàm **cached?** nó có nhiệm vụ kiểm tra xem thời hạn cached có nằm trong khoảng thời gian cho phép hay không. Nếu không thì ở service sẽ tiến hành call lại HTTP request và cập nhật lại vào databse.

Và cuối cùng đây là service mình dùng để tiến hành call HTTP request cũng như cache lại request đó
```
class CachingApiRequest
  CACHE_POLICY = lambda { 3.days.ago }

  def initialize http_method, url
    @url = url
    @http_method = http_method
  end
  
  def perform
    req = ApiRequest.find url

    unless req.cached?(CACHE_POLICY.call)
      response = RestClient::Request.execute(method: http_method, url: url)

      if successful?(response.code)
        req.update response: response.body
      end
    end
    req.response
  end

  private
  attr_reader :url, :http_method

  def successful? http_code
    http_code == 200
  end
end
```
Ở đây mình để cache policy của nó là trong vòng 3 ngày. Nghĩa là sau 3 ngày, thì khi gọi lại url đó, thì nó sẽ tiến hành call HTTP request, cập nhật lại response vào databse chứ không tiến hành lấy kết quả từ database ra để trả về nữa. Cache policy này tùy thuộc vào yêu cầu của bạn mà đề ra giá trị cho phù hợp. Đơn giản nó chỉ có vậy mà thôi.

Một số điểm cần chú ý đó là column response_body trong database dùng để lưu response json sử dụng [Postgres' JSONB column.](https://www.postgresql.org/docs/9.6/static/functions-json.html)
Việc url được băm ra nhằm bảo vệ các thông tin nhạy cảm được chứa trong parameter được gửi đi.