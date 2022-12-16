# Design Patterns là gì?
* Design patterns là các giải pháp đã được tối ưu hóa, được tái sử dụng cho các vấn đề lập trình mà chúng ta gặp phải hàng ngày. Nó là một khuôn mẫu đã được suy nghĩ, giải quyết trong tình huống cụ thể rồi.
* Các vấn đề mà bạn gặp phải có thể bạn sẽ tự nghĩ ra cách giải quyết nhưng có thể nó chưa phải là tối ưu. Design Pattern giúp bạn giải quyết vấn đề một cách tối ưu nhất, cung cấp cho bạn các giải pháp trong lập trình OOP.
* Nó không phải là ngôn ngữ cụ thể nào cả. Design patterns có thể thực hiện được ở phần lớn các ngôn ngữ lập trình. Ta thường gặp nó nhất trong lập trình OOP.
# Adapter object là gì?
* Adapter là objects với mục đích tạo lên 1 lớp trừu tượng tập hợp các việc gọi api của bên thứ ba, tác dụng của nó giúp chúng ta tập hợp công việc về api về 1 chỗ, sau này nếu có thay đổi thì sẽ dễ dàng update, và để hiểu hơn về nó thì chúng ta đi qua 1 ví dụ nhỏ nhé
* Giả sử chúng ta có 1 bài toán lấy data api sau đó show ra browse:
* Để fake api trả về data các bạn có thể sử dụng JSON Server để tạo nó có thể tham khảo ở link này: https://github.com/typicode/json-server
* tiếp đến sẽ là việc lấy data đã dake ở trên từ url: http://localhost:3001/posts để show ra view.
## Bad Solution
```
class JobsController < ApplicationController
  def show
    uri = URI.parse "http://localhost:3001/posts"
    http = Net::HTTP.new uri.host, uri.port
    request = Net::HTTP::Get.new uri.request_uri
    request["authorization"] = "token"
    api = http.request request

    @data = if api.code == "200"
      JSON.parse api.body
    else
      JSON.parse api.body["errors"]["messages"]
    end
  end
end
```
* Nếu như gọi api đặt hết trong controller như trên thì nếu như nó được dụng ở nhiều chỗ, code chúng ta sẽ bị lặp, và rất khó để chỉnh sửa sau này,
* Ở đây chúng ta có thể sử dụng service object, tuy nhiên ở đây chúng cần kiểm tra lỗi, đưa ra data, lỗi, ...; nó sẽ phá vỡ quy ước "keep one responsibility per service object" của service object, nghĩa là 1 service chỉ thực hiện 1 nhiệm vụ.
## Solution: Adapter Object
Để giải quyết các vấn đề trên, mình sẽ nén tất cả các tác vụ trên cho vào 1 lớp, và ở controller chỉ cần gọi lại lớp đó.
```
class JobsController < ApplicationController
  def show
    api = Job::InfoAdapter.new token: "token"
    @data = api.success? ? api.data : api.errors_message
  end
end
```
* Controller của mình đã trở nên rất "sạch", mang gần đúng với nhiệm vụ lý tưởng  của nó là điều hướng.
* Và tạo 1 class dặt trong thư mục /app/adapters/...
```
class Job::InfoAdapter
  SOURCE = "http://localhost:3001/posts"
  delegate :success?, :fail?, :data, :status_code,
    :errors_message, to: :handle_response

  def initialize args
    @token = args[:token]
    @response = get_response
  end

  private
  attr_reader :token, :response

  def get_response
    messages = Job::Serializers::Info.new token: token, source: SOURCE
    Net::HTTP.new(messages.uri.host, messages.uri.port).request messages.request
  end

  def handle_response
    Job::Deserializers::Info.new response: response
  end
end
```
* Ở đây sẽ có thêm Deserializers objects và Serializer objects để hỗ trợ giúp aapter trở nên đơn giản hơn.
```
Job::Serializers::Info.new token: token, source: SOURCE
```
```
class Job::Serializers::Info
  attr_reader :token, :source, :uri

  def initialize args
    @token = args[:token]
    @source = args[:source]
    @uri = uri
  end

  def request
    request = Net::HTTP::Get.new uri.request_uri
    request["authorization"] = token
    request
  end

  def uri
    URI.parse source
  end
end
```
* Serializer objects nằm trong /app/adapters/job/serializers
* Nó có nhiệm vụ xử lí request trước khi gửi đến server
```
Job::Deserializers::Info.new response: response
```
```
class Job::Deserializers::Info
  def initialize args
    @response = args[:response]
  end

  def success?
    response.code == "200"
  end

  def fail?
    !success?
  end

  def data
    JSON.parse response.body
  end

  def status_code
    response.code
  end

  def errors_message
    JSON.parse response.body["errors"]["messages"]
  end

  private
  attr_reader :response
end
```
* Deserializers objects đặt trong /app/adapters/job/deserializers
* Nó giúp adapter object nhận response và xử lí nó để đưa ra các data thích hợp
## Kết Luận
* Tóm lại, adapter object không làm cho code chúng ta ngắn đi hay cải thiện performance, thậm chí nó còn làm code dài thêm tuy nhiên nó sẽ có ích khi code sử dụng lại code đó, hay maintainable code, Encapsulated logic, dễ dàng mở rộng code sau này.
## Tài liệu tham khảo
https://github.com/typicode/json-server