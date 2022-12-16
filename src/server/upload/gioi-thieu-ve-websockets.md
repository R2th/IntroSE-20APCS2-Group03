Ngày nay, các ứng dụng web đã phát triển khác xa so với ngày đầu nó xuất hiện nhờ những kỹ thuật mới được áp dụng để phục vụ cho quá trình này nhằm đem lại trải nghiệm mới mẻ, tiện dụng cho người dùng. **WebSocket** là một trong các kỹ thuật đó và trong  bài viết này, mình sẽ giới thiệu sơ lược với các bạn về **WebsSocket** bao gồm lí do ra đời, cách hoạt động và ứng dụng.
## Lí do WebSocket ra đời
Ban đầu, mạng Internet được xây dựng không phải để hỗ trợ các ứng dụng web động, phức tạp mà nó hướng tới tập hợp các trang HTML, liên kết tới nhau để hình thành nên khái niệm "web" (mạng lưới) lưu trữ thông tin. Phần lớn mọi thứ được xây dựng xoay quanh mô hình *request/response* của HTTP, cụ thể là các client gửi yêu cầu tải trang tới server thông qua một kết nối HTTP thông thường, và công việc của server chỉ là đáp ứng các yêu cầu đó và đóng kết nối, nếu muốn yêu cầu dữ liệu mới thì phải tạo một kết nối mới.

Mô hình này tồn tại và ổn định trong suốt vài năm nhưng với sự ra đời của AJAX trong khoảng năm 2005, nhiều người bắt đầu phát hiện ra khả năng cho phép client và server kết nối hai chiều. Tuy nhiên, tất cả các kết nối HTTP vẫn phải bắt nguồn từ client, yêu cầu người dùng tương tác hoặc thực hiện request định kỳ để lấy dữ liệu mới nhất từ server. Đã có khá nhiều các kỹ thuật cho phép server gửi dữ liệu tới client một cách "chủ động", ví dụ như  Push và Comet. Một trong số những phương pháp phổ biến nhất là *long-polling*, cụ thể là client sẽ giữ một kết nối HTTP (long-lived request) cho tới khi server có dữ liệu để trả về tới client.

![](https://images.viblo.asia/58258d74-59b9-40d2-8cf1-37a5832beb6b.png)

Vấn đề với tất cả những giải pháp trên là chúng bao gồm khá nhiều dữ liệu dư thừa của HTTP. Mỗi lần bạn tạo một HTTP request, một số các *headers* và dữ liệu *cookies* cũng được chuyển tới server. Nó có thể thêm số lượng lớn dữ liệu cần phải truyền, dẫn đến tăng độ trễ. Nếu bạn đang xây dựng những ứng dụng cần độ trễ thấp như game, chat trên trình duyệt, việc giảm thiểu độ trễ là quan trọng để cho mọi thứ hoạt động trơn tru và sự thật thì đa phần các *headers* và *cookies* không thực sự cần thiết cho các client request.

Điều chúng ta thực sự cần là một cách để tạo một kết nối liên tục, độ trễ thấp mà có thể hỗ trợ khởi tạo giao tác bởi cả client hoặc server. Đây chính là điều mà **WebSocket** cung cấp và trong bài viết này, bạn sẽ được học cách sử dụng chúng trong ứng dụng của bạn.
## WebSocket hoạt động như thế nào
**WebSocket** cung cấp một kết nối liên tục giữa client và server mà cả hai bên đều có thể sử dụng để gửi dữ liệu bất cứ lúc nào. Client khởi tạo kết nối *WebSockets* thông qua một tiến trình được biến đến là cơ chế "bắt tay" WebSockets.  

![](https://images.viblo.asia/24f70a43-8309-4397-8ccd-803a5b77c1e6.png)

Tiến trình bắt đầu với việc client gửi một HTTP request như thường lệ tới server nhưng bao gồm thêm `Upgrade` header để thông báo với server rằng client mong muốn thiết lập một kết nối **WebSocket**.
Đây là một ví dụ đơn giản của *headers* trong request khởi tạo.
```http
GET ws://websocket.example.com/ HTTP/1.1 # WebSocket sử dụng giao thức ws thay vì http. Ngoài ra còn có giao thức wss tương ứng với https
Origin: http://example.com
Connection: Upgrade
Host: websocket.example.com
Upgrade: websocket
```


Nếu server hỗ trợ giao thức **WebSocket**, nó sẽ đồng ý nâng cấp và kết nối thông qua `Upgrade` header trong response.
```http
HTTP/1.1 101 WebSocket Protocol Handshake
Date: Wed, 16 Oct 2013 10:07:34 GMT
Connection: Upgrade
Upgrade: WebSocket
```
Bây giờ việc "bắt tay" đã hoàn tất, kết nối HTTP khởi tạo được thay thế bởi một kết nối WebSocket sử dụng cùng một kết nối TCP/IP nền tảng. Tại thời điểm này, hai bên đều có thể bắt đầu gửi dữ liệu.

Với WebSockets, dữ liệu có thể được truyền tuỳ ý mà không cần đến các header dư thừa như trong kết nối HTTP thông thường. Dữ liệu được phân tách, trao đổi qua **WebSocket** gọi là `message`, mỗi `message` bao gồm một hoặc nhiều `frame` bọc lấy dữ liệu được gửi (payload).

Để đảm bảo `message` được cấu trúc lại đúng như ban đầu sau khi đến được đích, mỗi `frame` được thêm 4-12 bytes tiền tố là các mô tả về payload. Sử dụng frame-based message giúp giảm lượng dữ liệu dư thừa đề cập ở trên từ đó độ trễ cũng suy giảm đáng kể. 

Lưu ý là phía client sẽ chỉ nhận biết được `message` mới một khi tất cả các `frame` đã được nhận và `message` ban đầu đã được xây dựng lại.

Dưới đây là mô tả cấu trúc của một `frame`. Các con số ở trên biểu diễn cho số bit. Và một vài trường, ví dụ như Extended payload length không phải lúc nào cũng xuất hiện
```
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|     Extended payload length continued, if payload len == 127  |
+ - - - - - - - - - - - - - - - +-------------------------------+
|                               |Masking-key, if MASK set to 1  |
+-------------------------------+-------------------------------+
| Masking-key (continued)       |          Payload Data         |
+-------------------------------- - - - - - - - - - - - - - - - +
:                     Payload Data continued ...                :
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                     Payload Data continued ...                |
+---------------------------------------------------------------+
```


## Xây dựng Demo
### Client
```html
<!doctype html>
<html lang="en">
<head>
  <title>Websocket Client</title>
</head>
<body>
  <script>
    var exampleSocket = new WebSocket("ws://localhost:2345");
    exampleSocket.onopen = function (event) {
      exampleSocket.send("Can you hear me?"); 
    };
    exampleSocket.onmessage = function (event) {
      console.log(event.data);
    }
  </script>
</body>
</html>
```
### Server
```ruby
require 'socket' # Provides TCPServer and TCPSocket classes
require 'digest/sha1'

server = TCPServer.new('localhost', 2345)

loop do

  # Wait for a connection
  socket = server.accept
  STDERR.puts "Incoming Request"

  # Read the HTTP request. We know it's finished when we see a line with nothing but \r\n
  http_request = ""
  while (line = socket.gets) && (line != "\r\n")
    http_request += line 
  end

  # Grab the security key from the headers. If one isn't present, close the connection.
  if matches = http_request.match(/^Sec-WebSocket-Key: (\S+)/)
    websocket_key = matches[1]
    STDERR.puts "Websocket handshake detected with key: #{ websocket_key }"
  else
    STDERR.puts "Aborting non-websocket connection"
    socket.close
    next
  end


  response_key = Digest::SHA1.base64digest([websocket_key, "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"].join)
  STDERR.puts "Responding to handshake with key: #{ response_key }"

  socket.write <<-eos 
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: #{ response_key }

  eos

  STDERR.puts "Handshake completed. Starting to parse the websocket frame."

  first_byte = socket.getbyte
  fin = first_byte & 0b10000000 
  opcode = first_byte & 0b00001111

  raise "We don't support continuations" unless fin
  raise "We only support opcode 1" unless opcode == 1

  second_byte = socket.getbyte
  is_masked = second_byte & 0b10000000
  payload_size = second_byte & 0b01111111

  raise "All incoming frames should be masked according to the websocket spec" unless is_masked
  raise "We only support payloads < 126 bytes in length" unless payload_size < 126

  STDERR.puts "Payload size: #{ payload_size } bytes"

  mask = 4.times.map { socket.getbyte }
  STDERR.puts "Got mask: #{ mask.inspect }"

  data = payload_size.times.map { socket.getbyte }
  STDERR.puts "Got masked data: #{ data.inspect }"

  unmasked_data = data.each_with_index.map { |byte, i| byte ^ mask[i % 4] }
  STDERR.puts "Unmasked the data: #{ unmasked_data.inspect }"

  STDERR.puts "Converted to a string: #{ unmasked_data.pack('C*').force_encoding('utf-8').inspect }"

  socket.close
end
```

## Kết luận
Trong bài viết này, mình đã giới thiệu các kiến thức cơ bản về giao thức WebSocket và cách sử dụng API để xây dựng ứng dụng thời gian thực. Hi vọng bài viết sẽ giúp ích cho các bạn.

**Tài liệu tham khảo:**

https://blog.honeybadger.io/building-a-simple-websockets-server-from-scratch-in-ruby/
https://blog.teamtreehouse.com/an-introduction-to-websockets