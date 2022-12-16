## Chain of Responsibility
*Hay còn được biết đến là **CoR, Chain of Command***

### Tư tưởng
`Chain of Responsibility` là một `behavioral parttern`, nó cho phép bạn chuyển các yêu cầu theo một chuỗi các trình xử lý. Khi nhận được yêu cầu, mỗi trình xử lý quyết định xử lý yêu cầu hoặc chuyển nó đến trình xử lý tiếp theo trong chuỗi.
![](https://images.viblo.asia/84e6e219-c7bf-4152-bd01-93b251e5b25d.png)

### Đặt vấn đề
Hãy tưởng tượng rằng bạn làm việc trên một hệ thống đặt hàng trực tuyến. Bạn muốn hạn chế quyền truy cập vào hệ thống để chỉ người dùng được xác thực mới có thể tạo đơn hàng. Ngoài ra, người dùng có quyền quản trị phải có quyền truy cập đầy đủ vào tất cả các đơn đặt hàng.

Sau một chút lập kế hoạch, bạn nhận ra rằng các kiểm tra này phải được thực hiện tuần tự. Ứng dụng có thể cố gắng xác thực người dùng với hệ thống bất cứ khi nào nhận được yêu cầu có chứa thông tin xác thực người dùng. Tuy nhiên, nếu những thông tin đó không đúng và xác thực không thành công, thì không có lý do gì để tiến hành bất kỳ kiểm tra nào khác.
![](https://images.viblo.asia/b934354a-5cde-4329-9422-44536e3d0402.png)

Vài tháng sau, bạn đã thực hiện thêm một số kiểm tra.
* Một trong những đồng nghiệp của bạn đề nghị rằng nó không an toàn để truyền dữ liệu thô đến hệ thống đặt hàng. Vì vậy, bạn đã thêm một bước xác thực bổ sung để vệ xử lý liệu trong yêu cầu.
* Sau đó, một số người nhận thấy rằng hệ thống dễ bị bẻ khóa mật khẩu. Để phủ nhận điều này, bạn đã nhanh chóng thêm một kiểm tra rằng các bộ lọc lặp lại các yêu cầu thất bại đến từ cùng một địa chỉ IP.
* Một số người khác cho rằng bạn có thể tăng tốc hệ thống bằng cách trả về kết quả được lưu trong bộ nhớ cache cho các yêu cầu lặp lại có chứa cùng một dữ liệu. Do đó, bạn đã thêm một kiểm tra khác cho phép yêu cầu chuyển qua hệ thống chỉ khi không có phản hồi được lưu trong bộ nhớ cache phù hợp.
![](https://images.viblo.asia/90ab0ebd-8132-4329-b65c-71d79fbec8e3.png)

Đoạn mã kiểm tra vốn trông giống như một mớ hỗn độn, ngày càng trở nên cồng kềnh khi bạn thêm từng tính năng mới. Thay đổi một kiểm tra đôi khi ảnh hưởng đến những kiểm tra khác. Tệ nhất là, khi bạn cố gắng sử dụng lại các kiểm tra để bảo vệ các thành phần khác của hệ thống, bạn phải sao chép một số code vì các thành phần đó yêu cầu một số kiểm tra, nhưng không phải tất cả chúng.

Hệ thống trở nên rất khó để hiểu và tốn kém để duy trì. Bạn vật lộn với code trong một thời gian, cho đến một ngày bạn quyết định cấu trúc lại toàn bộ.

### Giải pháp
Giống như nhiều `behavioral parttern` khác, `chain of responsibility` dựa trên việc chuyển đổi các hành vi cụ thể thành các đối tượng độc lập được gọi là trình xử lý. Trong trường hợp trên, mỗi kiểm tra nên được trích xuất sang `class` riêng của nó bằng một `method` duy nhất để thực hiện kiểm tra. Các yêu cầu cùng với dữ liệu của nó, được truyền cho `method` này như là một đối số.

`Pattern` khuyến khich bạn nên liên kết các trình xử lý lại với nhau. Mỗi trình xử lý đã được liên kết sẽ lưu trữ thông tin để biết được là tiếp theo sẽ là trình xử lý náo. Ngoài việc xử lý các yêu cầu, trình xử lý chuyển tiếp yêu cầu đến trình xử lý tiếp theo và cứ như vậy cho đến khi không còn trình xử lý nào nữa.

Phần hay nhất là mỗi trình xử lý có thể quyết định không chuyển yêu cầu đến trình xử lý tiếp theo và dừng việc kiểm tra ngay lập tức nếu yêu cầu đó không thỏa mãn các kiểm tra trong trình xử lý đó.

Trong ví dụ trên với các hệ thống đặt hàng, một trình xử lý thực hiện việc xử lý và sau đó quyết định xem có nên chuyển yêu cầu đến trình xử lý tiếp theo không. Giả sử yêu cầu chứa dữ liệu phù hợp, tất cả các trình xử lý có thể thực hiện hành vi của nó, cho dù đó là kiểm tra xác thực hay bộ đệm.
![](https://images.viblo.asia/e8312b1c-9108-4e16-8b35-9bb9e2b728c2.png)

### Ứng dụng
![](https://images.viblo.asia/3dc3610f-98a2-45d0-9a0c-69eee90e4b26.png)

Bạn vừa mới mua và cài đặt một phần cứng mới trên máy tính của mình. Kể từ khi bạn là một geek, máy tính có một số hệ điều hành được cài đặt. Bạn thử khởi động tất cả chúng để xem phần cứng có được hỗ trợ hay không. Windows phát hiện và kích hoạt phần cứng tự động. Tuy nhiên, Linux yêu quý của bạn từ chối làm việc với phần cứng mới. Với một chút hy vọng, bạn quyết định gọi số điện thoại hỗ trợ kỹ thuật được ghi trên hộp.

Điều đầu tiên bạn nghe thấy là giọng nói robot của trả lời tự động. Nó gợi ý chín giải pháp phổ biến cho các vấn đề khác nhau, không có giải pháp nào phù hợp với trường hợp của bạn. Sau một thời gian, robot kết nối bạn với một người điều khiển trực tiếp.

Than ôi, nhà điều hành không thể đề xuất bất cứ điều gì cụ thể. Anh ấy liên tục trích dẫn những đoạn trích dài từ hướng dẫn, từ chối lắng nghe ý kiến của bạn. Sau khi nghe cụm từ "bạn đã thử tắt máy tính chưa?" lần thứ 10, bạn cần được kết nối với một kỹ sư phù hợp.

Cuối cùng, nhà điều hành chuyển cuộc gọi của bạn đến một trong những kỹ sư, người có lẽ đã mong chờ một cuộc trò chuyện của con người trong nhiều giờ khi anh ta ngồi trong phòng máy chủ cô đơn của mình trong tầng hầm tối tăm của một tòa nhà văn phòng. Kỹ sư cho bạn biết nơi tải xuống trình điều khiển thích hợp cho phần cứng mới của bạn và cách cài đặt chúng trên Linux. Cuối cùng là giải pháp! Bạn kết thúc cuộc gọi, vỡ òa trong niềm vui.

### Example code
```
# The Handler interface declares a method for building the chain of handlers. It
# also declares a method for executing a request.
class Handler
  # @abstract
  #
  # @param [Handler] handler
  def next_handler=(handler)
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end

  # @abstract
  #
  # @param [String] request
  #
  # @return [String, nil]
  def handle(request)
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end

# The default chaining behavior can be implemented inside a base handler class.
class AbstractHandler < Handler
  # @return [Handler]
  attr_writer :next_handler

  # @param [Handler] handler
  #
  # @return [Handler]
  def next_handler(handler)
    @next_handler = handler
    # Returning a handler from here will let us link handlers in a convenient
    # way like this:
    # monkey.next_handler(squirrel).next_handler(dog)
    handler
  end

  # @abstract
  #
  # @param [String] request
  #
  # @return [String, nil]
  def handle(request)
    return @next_handler.handle(request) if @next_handler

    nil
  end
end

# All Concrete Handlers either handle a request or pass it to the next handler
# in the chain.
class MonkeyHandler < AbstractHandler
  # @param [String] request
  #
  # @return [String, nil]
  def handle(request)
    if request == 'Banana'
      "Monkey: I'll eat the #{request}"
    else
      super(request)
    end
  end
end

class SquirrelHandler < AbstractHandler
  # @param [String] request
  #
  # @return [String, nil]
  def handle(request)
    if request == 'Nut'
      "Squirrel: I'll eat the #{request}"
    else
      super(request)
    end
  end
end

class DogHandler < AbstractHandler
  # @param [String] request
  #
  # @return [String, nil]
  def handle(request)
    if request == 'MeatBall'
      "Dog: I'll eat the #{request}"
    else
      super(request)
    end
  end
end

# The client code is usually suited to work with a single handler. In most
# cases, it is not even aware that the handler is part of a chain.
def client_code(handler)
  ['Nut', 'Banana', 'Cup of coffee'].each do |food|
    puts "\nClient: Who wants a #{food}?"
    result = handler.handle(food)
    if result
      print "  #{result}"
    else
      print "  #{food} was left untouched."
    end
  end
end

monkey = MonkeyHandler.new
squirrel = SquirrelHandler.new
dog = DogHandler.new

monkey.next_handler(squirrel).next_handler(dog)

# The client should be able to send a request to any handler, not just the first
# one in the chain.
puts 'Chain: Monkey > Squirrel > Dog'
client_code(monkey)
puts "\n\n"

puts 'Subchain: Squirrel > Dog'
client_code(squirrel)
```

**Output**
```
Chain: Monkey > Squirrel > Dog

Client: Who wants a Nut?
  Squirrel: I'll eat the Nut
Client: Who wants a Banana?
  Monkey: I'll eat the Banana
Client: Who wants a Cup of coffee?
  Cup of coffee was left untouched.

Subchain: Squirrel > Dog

Client: Who wants a Nut?
  Squirrel: I'll eat the Nut
Client: Who wants a Banana?
  Banana was left untouched.
Client: Who wants a Cup of coffee?
  Cup of coffee was left untouched.
```