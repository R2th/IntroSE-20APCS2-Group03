# Mục tiêu
Làm một server và client kết nối với nhau đơn giản sử dụng sockets

# Giới thiệu

## Cơ bản về mối quan hệ giữa client và server

Trong bài viết này, chúng ta sẽ cùng nhau tập trung vào cả 2 phía: client và server.  Client sẽ gửi một vài dữ liệu lên server, kèm theo các yêu cầu và nhiệm vụ của Server là thực hiện yêu cầu đó và gửi phản hồi lại cho phía Client. Server là nơi sẽ liên tục chờ đợi các tín hiệu yêu cầu và dữ liệu từ Client để thực thi và gửi lại kết quả. Một cách sử dụng phổ biến cho mô hình này mà chúng ta vẫn thường thấy đó là cách hoạt động giữa trình duyệt (World Wide Web Browser) và phía máy chủ (World Wide Web Server). Khi một người dùng thực hiện yêu cầu đi tới 1 trang web thông qua trình duyệt của họ (Client application), một yêu cầu sẽ được gửi lên máy chủ (Server application). Cuối cùng, sau khi xử lý, một trang HTML sẽ được phía Server gửi lại cho trình duyệt.

## Các khái niệm cơ bản

### Socket
- Socket là một cổng logic mà một chương trình sử dụng để kết nối với một chương trình khác chạy trên một máy tính khác trên Internet. Chương trình mạng có thể sử dụng nhiều Socket cùng một lúc, nhờ đó nhiều chương trình có thể sử dụng Internet cùng một lúc.
- Socket là tầng trung gian giữa các tiến trình của ứng dụng phía người dùng (Application Process) và Tầng giao vận( Phương thức truyền tin TCP hoặc UDP)
- Socket tượng trưng cho 1 kết nối giữa 2 tầng ứng dụng khác nhau (Network Applications) 
- Socket có tính chất 2 chiều, vậy nên cả 2 phía kết nối đều có khả năng gửi và nhận dữ liệu.

### Dịch vụ TCP
- Phương thức truyền tin đảm bảo theo các bytes từ một tiến trình này sang tiến trình khác
![](https://images.viblo.asia/32bfba65-8e76-49dd-a4ad-f5fac1642e4d.png)

### Cổng (Port)
- Cổng không phải là một thiết bị vật lý cụ thể, một thiết bị có thể có rất nhiều cổng. Ở đây, chúng ta sẽ sử dụng cổng như là một cách để tạo ra một kết nối riêng, một đường đi riêng giữa Server và Client.

### Các Class Sockets trong Ruby
- Nếu bạn đã từng lập trình về các kết nối mạng ở các ngôn ngữ C/C++, bạn sẽ thấy điều đó đơn giản hơn rất nhiều với Ruby. Ruby có đầy đủ và đa dạng các lớp về Sockets cho lập trình viên có thể sử dụng một cách tiện lợi và dễ dàng. 
- Thừa kế thứ bậc của Socket class trong Ruby:

![](https://images.viblo.asia/7d8608f7-b577-4d8a-a388-5fe6d7939345.jpg)

-Trong Ruby, rất nhiều các class được kế thừa từ **IO**, điều đó có nghĩa là chúng ta có thể sử dụng các phương thức quen thuộc của IO một cách rất dễ dàng.  
- Class TCPServer hỗ trợ chúng ta trong việc tạo một TCP server. Ngoài ra, class này cũng hỗ trợ chúng tạo tạo ra 1 luồng kết nối giữa server và client. Và để sử dụng trong Ruby, bạn đơn giản chỉ cần: **require 'socket'**

# Xây dựng một kết nối đơn giản
- Chúng ta sẽ thử xây dựng 1 kết nối đơn giản và y hệt như hầu hết tất cả mô hình hiện nay: Client sẽ gửi lên trên server 1 số bất kỳ. Sau đó, Server nhận số này, gấp nó lên 10 lần rồi trả lại cho Client. Điểm giống nhau đó là phía Client sẽ không phải thực hiện bất cứ 1 công việc tính toán nào, họ chỉ gửi lên rồi nhận lại kết quả. Toàn bộ quá trình tính toán, tiêu hao công sức sẽ do phía Server đảm nhận.

### Về phía server
```
require 'socket'

server = TCPServer.new 'localhost', 2345
client = server.accept  

loop do
  if @x = client.gets
    @y = 10*@x.to_i
    client.puts "#{@y}"
  end
end 
```
- Ở đây, chúng ta sẽ sử dụng trên localhost với cổng 2345. Khai báo một TCPServer sẽ giúp chúng ta có một Server và kèm theo 1 luồng kết nối.
- Tiếp đó chúng ta sẽ chấp nhận cho các kết nối đến với server bằng dòng lệnh server.accept
- Như đã nói ngay từ ban đầu, Server luôn luôn hoạt động để đợi yêu cầu từ client và xử lý. Vì vậy, một vòng lặp vô hạn được thiết lập ra cho server luôn chạy.
- Trong vòng lập, bất cứ khi nào client đẩy lên một giá trị (client.gets khác nil), server sẽ nhân nó lên 10 lần rồi trả lại cho Client bằng phương thức client.puts

### Về phía Client

```
require 'socket'

s = TCPSocket.new 'localhost', 2345
s.puts 5 #Số mà chúng ta muốn gửi
if result = s.gets 
  puts result        
end
s.close
```
- Tại đây, chúng ta cũng cần khơi tạo 1 TCPSocket với địa chỉ và cổng y hệt. Nên lưu ý rằng, nếu như khai báo cổng phía Server và Client khác nhau, chúng sẽ không được kết nối. Cụ thể ở đây là localhost và cổng 2345
- Chúng ta sẽ đẩy lên server 1 số nguyên bất kỳ (Ở đây là 5) với phương thức puts
- Và nếu như có kết quả trả lại ta sẽ in nó ra màn hình

### Kết quả
- Lưu ý, khi chạy, chúng ta sẽ chạy server trước, sau đó mới chạy client

![](https://images.viblo.asia/4f186a33-fd7c-4636-b5bc-f6ea88216e84.png)
![](https://images.viblo.asia/2d937ba2-1b27-4bfe-beef-7b8186f13da9.png)

# Kết
- Trong bài viết này, chúng ta đã cùng nhau tìm hiểu về các khái niệm trong lập trình Socket, và các sử dụng nó bằng ngôn ngữ lập trình Ruby. Chúng ta đã tìm hiểu về các class TCPSocket, Socket trong Ruby và xây dựng được 1 kết nối đơn giản giữa 2 phía Client và Server để hiểu về mô hình hoạt động của chúng trong thực tế.
- Hy vọng qua bài viết, sẽ giúp các bạn hiểu hơn về lập trình Socket và từ đó có thể tạo ra nhiều ứng dụng thực tế hơn theo mô hình này.
- Tham khảo: 

https://ruby-doc.org/stdlib-1.9.3/libdoc/socket/rdoc/Socket.html

http://ruby-doc.org/stdlib-1.9.3/libdoc/socket/rdoc/TCPSocket.html