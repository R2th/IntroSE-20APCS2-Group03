Đôi khi bạn có một ý tưởng cho một ứng dụng nhưng không thể thu thập đc các dữ liệu mà bạn cần, hoặc có lẽ bạn cần một dịch vụ để bổ sung cho ứng dụng hiện có của mình. Dù lý do có thể là gì, đôi khi bạn chỉ cần tích hợp API của bên thứ ba. Mình sẽ chỉ cho bạn một ví dụ nhanh chóng và dễ dàng về cách sử dụng API để tích hợp vào ứng dụng và lấy về dữ liệu hữu ích. Chúng ta hãy cùng bắt đầu nào!

### Chuẩn bị API

Dự án của mình cần sử dụng API của Gurunavi nên tôi sẽ sử dụng luôn API đó. Tài liệu API có sẵn tại [liên kết này](https://api.gnavi.co.jp/api/manual/) (toàn tiếng Nhật thui nên các bạn chịu khó gg dịch). Để thiết lập API, chúng ta sẽ cần  key id của API được cung cấp cho tài khoản do chúng ta đã đăng ký.

Sau khi tạo ứng dụng, chúng ta sẽ cần thêm 2 gem mới vào Gemfile. Chúng ta cần dotenv-rails, để giữ key id của API dưới dạng biến môi trường (bạn ko muốn nó lộ ra và thành incident đâu) và faraday để gửi các request tới API Gurunavi.

```ruby
gem "dotenv-rails"
gem "faraday"
```

Để thiết lập kết nối và thực hiện việc gửi các request tới API của bên thứ ba, mình đã tạo hai lớp, Connection và Request,  trong thư mục Services/Gurunavi. Code của hai lớp này rất dễ hiểu nên mình sẽ giải thích ngắn gọn thôi nhá:

```ruby
module Gurunavi
  require "faraday"
  require "json"

  class Connection
    def self.api base, key_name, key_value
      Faraday.new(url: base) do |faraday|
        faraday.response :logger
        faraday.adapter Faraday.default_adapter
        faraday.headers["Content-Type"] = "application/json"
        faraday.params[key_name] = key_value //ở đây mình truyền key name vào trong param của request
      end
    end
  end
end
```

Trong lớp Connection, mình đã thêm cấu hình cần thiết để dùng Faraday gửi request kèm theo key id tới API của chúng ta.

```ruby
module Gurunavi
  class Request
    HTTP_OK_CODE = 200

    # rubocop:disable Lint/UriEscapeUnescape //ở đây mình dùng URI.encode để encode đường dẫn của mình (vì nó dùng tiếng Nhật) nhưng nó bị chết rubocop nên mình phải disable, nếu api của bạn ko cần tiếng Nhật thì có thể bỏ đi 
    def initialize root_path, params = {}
      params_string = params.map{|k, v| "#{k}=#{v}"}.join("&")
      @path = params.empty? ? root_path : URI.encode("#{root_path}?#{params_string}") //có thể bỏ URI.encode
    end
    # rubocop:enable Lint/UriEscapeUnescape

    def send request_type //phương thức gửi request, loại request sẽ được quyết định bởi request_type (get, put, post, ...)
      response_json = api.send request_type, path //respone nhận về dưới dạng json
      response = JSON.parse response_json.body
      status = response_json.status
      status == HTTP_OK_CODE ? response : Gurunavi::Errors::ErrorsHandler.raise_error(status, response) //dựa vào status của request để quyết định gửi thành công hay ko
    end

    private

    attr_reader :path

    def api
      Gurunavi::Connection.api "https://api.gnavi.co.jp", "keyid", ENV["GURUNAVI_API_KEY"] //thiết lập connection tới api bằng lớp Connection chúng ta tạo ở trên
    end
  end
end
```

Sau đó, lớp Request sẽ chịu trách nhiệm thực hiện gửi các yêu cầu thực tế tới API Gurunavi. Từ thời điểm này, chúng ta chỉ cần khởi tạo lớp Request, truyền vào đường dẫn api cần gọi và truyền vào tham số, chúng ta sẽ có kết quả trả về là một Hash đẹp đẽ chứa dữ liệu do api gửi về :3

```ruby
module Gurunavi
  module Errors
    class ErrorsHandler < Api::Errors::BaseHandler
      HTTP_ERROR_CODE = {BAD_REQUEST_CODE: 400,
                         UNAUTHORIZED_CODE: 401,
                         NOT_FOUND_CODE: 404, ACCESS_ERROR_CODE: 405,
                         API_REQUSTS_QUOTA_REACHED_CODE: 429,
                         UNKNOW_ERROR_CODE: 500}.freeze

      class << self
        private

        def error_class status_code, response
          case status_code
          when HTTP_ERROR_CODE[:BAD_REQUEST_CODE]
            Api::Errors::BadRequestError.new status_code, response
          when HTTP_ERROR_CODE[:UNAUTHORIZED_CODE]
            Api::Errors::UnauthorizedError.new status_code, response
          when HTTP_ERROR_CODE[:ACCESS_ERROR_CODE]
            Api::Errors::AccessError.new status_code, response
          when HTTP_ERROR_CODE[:NOT_FOUND_CODE]
            Api::Errors::NotFoundError.new status_code, response
          when HTTP_ERROR_CODE[:API_REQUSTS_QUOTA_REACHED_CODE]
            Api::Errors::ApiRequestsQuotaReachedError.new status_code, response
          else
            Api::Errors::Base.new status_code, response
          end
        end
      end
    end
  end
end
```

Bạn nào thắc mắc thằng Gurunavi::Errors::ErrorsHandler.raise_error(status, response) là thằng nào thì nó đây ạ. Đây là lớp tạo lỗi custom mình viết cho riêng API Gurunavi với các mã lỗi mà API có thể trả về. Bạn nên đọc kĩ document của API xem các trạng thái API có thể trả về để thêm vào đây.

### Xử lí Data

Bây giờ chúng ta đã có những gì chúng ta cần để gửi các yêu cầu tới API Gurunavi. Sau khi nghiên cứu API, chúng ta có thể thiết kế cấu trúc lớp cho dữ liệu mà chúng ta cần biểu diễn. Ứng dụng của mình sẽ chỉ tìm kiếm thông tin và hiển thị nhà hàng ra cho người dùng nên mình sẽ không sử dụng model của ActiveRecord như bình thường.

Chúng ta hãy bắt đầu bằng việc tạo lớp Gurunavi::Models::Base với  phương thức khởi tạo mà sẽ được sử dụng cho tất cả các lớp model mà chúng ta sẽ tạo. Mình đặt các lớp này trong folder services/gurunavi/models nhưng bạn có thể đặt chúng ở đâu bạn thấy phù hợp.

```ruby 
module Gurunavi
  module Models
    class Base
      def initialize args = {}
        args.each do |name, value|
          attr_name = name.to_s.underscore
          send("#{attr_name}=", value) if respond_to?("#{attr_name}=") //khi khởi tạo sẽ gắn các data trong args vào attr của class
        end
      end
    end
  end
end
```

Sau khi check spec thì mình sẽ cần một end point cho chức năng tìm kiếm nhà hàng, vì vậy mình sẽ model để lưu kết quả của thằng restaurant.

```ruby
module Gurunavi
  module Models
    class Restaurant < Base
      attr_accessor :id, :update_date, :name, :name_kana, :latitude, :longitude, :category, :url, :url_mobile,
                    :coupon_url, :image_url, :address, :tel, :tel_sub, :fax, :opentime, :holiday, :access,
                    :parking_lots, :pr, :code, :budget, :party, :lunch, :credit_card, :e_money, :flags
    end
  end
end
```

Model này sẽ kế thừa lớp base và có thể khởi tạo ở bất kì đâu, bạn sẽ thấy mình sử dụng ở dưới :3 

Không để mọi người chờ lâu, bây giờ chúng ta sẽ tạo lớp Gurunavi::SearchRestaurant. Lớp này sẽ có hai phương thức để tìm kiếm nhà hàng, search_by_id và search_by, mỗi phương thức sẽ phục vụ mục đích tìm kiếm khác nhau:

```ruby 
module Gurunavi
  class SearchRestaurant
    SEARCH_PATH = "RestSearchAPI/v3/"

    def self.search_by_id id //tìm nhà hàng theo id truyền vào
      return unless id.present?

      response = Request.new(SEARCH_PATH, id: id).send :get
      Models::Restaurant.new response.fetch("rest").first
    end

    def self.search_by query = ào //tìm nhà hàng theo tập điều kiện xác định
      response = Request.new(SEARCH_PATH, query).send :get
      response.fetch("rest").map{|restaurant| Models::Restaurant.new restaurant}
    end
  end
end
```

Như bạn có thể thấy, với mỗi phương thức trên kết quả trả về đều dưới dạng Models::Restaurant. Code ở đây khá đơn giản, vì chúng ta chỉ cần convert dữ liệu trả về từ api.

Chỉ với vài lớp cơ bản chúng ta đã có thể gọi API bên ngoài một cách nhanh chóng chỉ bằng cách gọi câu lệnh dưới ở bất kì đâu bạn muốn :3 
```ruby
Gurunavi::SearchRestaurant.search_by name: "コーンバレー 渋谷"
```

### Kết luận

Mọi người có thể viết test cho các phương thức trên như bình thường bằng cách thực thi và so sánh kết quả trả về. Nhưng việc này khá lâu vì mỗi lần test ta lại phải gọi lại các api. Nên ta có thể sử dụng gem VCR để lưu lại các request thành công và test trên đó. Ta có thể tham khảo tại đây:
https://revs.runtime-revolution.com/unit-testing-with-vcr-5dd2bb5c9012
Nếu bạn muốn cache lại dữ liệu thì có thể tham khảo phần adding cache của bài viết này:
https://revs.runtime-revolution.com/integrating-a-third-party-api-with-rails-5-134f960ddbba

Đây chỉ là phần nền mình sử dụng để gọi external API cho dự án của mình, mong mọi người có thể từ nó phát triển lên một con app tuyệt vời :3