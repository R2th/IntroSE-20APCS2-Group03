# Tổng quan
Khi Client gửi một request tới Server thì bên Server sẽ tiếp nhận làm việc với dữ liệu trong request và gửi lại response cho Client.  Để có thể thực hiện được điều này thì cả Server và Client phải kết nối tới một thành phần trung gian gọi là Socket. Khi cả client và server tạo mối liên kết tới Socket thì khi đó server sẽ lắng nghe thông qua socket để có thể tiếp nhận request từ client.
Có thể hiểu về cơ chế hoạt động như hình bên dưới
![](https://images.viblo.asia/887a43db-a6f4-45f0-a0f5-db5df8f5aeb2.gif)
Sau khi kết nối được tạo ra lúc này cả server và client để đọc và ghi dữ liệu thông qua socket mà đã được liên kết đó.
# Blocking IO
Trong trường hợp này khi một client gửi một request tới server thì khi đó luồng xử lý dữ liệu cho liên kết giữa client và server sẽ bị khóa lại cho đến khi nào request đó được thực hiện xong hoàn toàn (chẳng hạn như lấy data từ database thì phải có dữ liệu trả về, hoặc thêm sửa xóa dữ liệu thì cũng phải có phản hồi trả về cho việc hoàn thành công việc từ phía server). Trong thời gian này nếu có một request khác được gửi đến server thì bắt buộc phải chờ cho đến khi tác vụ trước đó được hoàn thành. Việc xử lý cho trường hợp có nhiều request gửi tới server thì cũng khá tốn kém. Trước tiên ứng với mỗi request thì cần phải tạo ra một luồng riêng cho request đó, nếu luồng đó tới sau một luỗng dữ liệu khác thì nó bắt buộc phải chờ cho tới lượt.
Các bước mô tả cho hoạt động của Blocking IO được mô tả như sau
- Trước tiên cần tạo ra một Server Socket tương ứng với cổng của server đó để lắng nghe và tiếp nhận request
```
ServerSocket serverSocket = new ServerSocket(portNumber);
```
Sau khi tạo server socket tương ứng với cổng server chúng ta có một socket để có thể lắng nghe request từ client như sau
![](https://images.viblo.asia/51166bbf-2a49-40eb-b2d5-5b47147ed489.png)
- Bây giờ chúng ta gọi hàm accept() để server bắt đầu chờ client tạo kết nối, và khi client tạo một request thì nó sẽ chấp nhận và return về một socket để tương tác với client 
![](https://images.viblo.asia/ba5f1e77-2a87-427d-8c69-08c1f9d527fb.png)
- Sau đó chúng ta có một socket riêng cho request đó để tương tác với nhau
![](https://images.viblo.asia/9e5f6901-649b-41dd-898b-88c35f08a2a1.png)
- Sau khi đã hoàn tất việc kết nối thì chúng ta có để đọc ghi dữ liệu thông qua soket được tạo ra đó 
```
BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

PrintWriter out =
new PrintWriter(clientSocket.getOutputStream(), true);
```
Trường hợp nhiều request tới thì chúng ta có thể xem như thế này 
![](https://images.viblo.asia/7fb8edec-cf32-496d-b8d9-9917c9bb8a81.png)

Một số nhược điển của phương thức này như sau
- Mỗi luồng xử lý dữ liệu của từng request yêu cầu cấp bộ nhớ stack cho nó, cho nên việc có nhiều luồng như vậy sẽ chiếm rất nhiều bộ nhớ, khiến nó trở nên cồng kềnh và khó khăn trong việc chuyển đổi qua lại giữa các luồng.
- Ở mỗi thời điểm thì chỉ có mỗi một luồng được xử lý còn tất cả các luồng còn lại phải chờ, điều này làm cho lãng phí bộ nhớ không cần thiết khi mà chúng ta phải cấp quá nhiều bộ nhớ cho việc đứng chờ như vậy.
# Non Blocking IO
Với Nonblocking IO thì chúng ta có thể sử dùng luồng đơn để xử lý cho trường hợp có nhiều liên kết đồng thời. 
Có một số điểm khác nhau về các đọc và ghi dữ liệu trong NIO, Thay vì ghi dữ liệu vào out stream và đọc dữ liệu từ input stream chúng ta sẽ đọc và ghi dữ liệu vào bộ nhớ đệm. chúng ta có thể hiểu bộ nhớ đệm ở đây là một bộ nhớ tạm thời thay vì tương tác trực tiếp. 
Chennal là một thành phần trung gian để giúp chúng ta chuyển một khối lượng lớn dữ liệu vào và ra khỏi bộ nhớ đệm. Lưu ý ở đây là data dùng để đọc và ghi này đều phải được encode với ByteBuffer.
Để hiểu rõ việc hoạt động như thế nào chúng ta sẽ tìm hiều về cách thức hoạt động của Selector, nghe cái tên thì chúng ta có thể hình dung ra nó kiểu như một cái gì đó dùng để lựa chọn những liên kết đạt yêu cầu. Ở đây Selector cho phép một luồng đơn được phép kiểm tra tất cả các sự kiện  trên nhiều kênh, do vậy selector có thể kiển tra được việc một kênh nào đó có sẵn sàng cho việc đọc và ghi data hay không. Nhiều kênh khác nhau có thể đăng ký với một đối tượng Selector với SelectionKey để phân biệt.
![](https://images.viblo.asia/304df35b-4594-4615-a940-e121ebfdd90e.png)
Một số bước để tạo một NIO đơn giản 
- Tạo một selector để xử lý nhiều kênh và đồng thời để cho phép server có thể tìm tất cả các liên kết mà đã sẵn sãng cho việc nhận output và gửi input
```
Selector selector = Selector.open();
```
- Tạo một server socket channel để có thể chấp nhận kết nối mới

```
ServerSocketChannel serverChannel = ServerSocketChannel.open();
serverChannel.configureBlocking(false)
```
- Sau đó chúng ta có thể liên kết server socket channek với host và post của server
```
InetSocketAddress hostAddress = new InetSocketAddress(hostname, portNumber);
serverChannel.bind(hostAddress);
```
- Bây giờ chúng ta cần đăng ký server socket channel này với selector và "SelectionKey.OP_ACCEPT" tham số để thông báo cho selector để lắng nghe tới kết nối mới. "OP_ACCEPT" có thể hiểu rằng server socket channel đã sẵn sàng để chấp nhận kết nối mới từ client.
```
serverChannel.register(selector, SelectionKey.OP_ACCEPT);
```
- Chúng ta dùng hàm select() của selector để đếm số lượng channel mà đã có để tương tác
```
while (true) {
   int readyCount = selector.select();
   if (readyCount == 0) {
      continue;
   }
   // process selected keys...
}
```
- Trong trường hợp selector tìm thấy một channel đã sẵn sàng , hàm selectedKeys() trả về tập hợp các key mà đã sẵn sàng, tương ững mỗi key cho mỗi channel mà chúng ta có thể tương tác 
```
// process selected keys...
Set<SelectionKey> readyKeys = selector.selectedKeys();
Iterator iterator = readyKeys.iterator();
while (iterator.hasNext()) {
  SelectionKey key = iterator.next();
  // Remove key from set so we don't process it twice
  iterator.remove();
  // operate on the channel...
}
```
- Nếu key mà acceptable thì có nghĩa là client yêu cầu một kết nối
```
// operate on the channel...
 // client requires a connection
    if (key.isAcceptable()) {
     ServerSocketChannel server = (ServerSocketChannel)  key.channel();    
      // get client socket channel
      SocketChannel client = server.accept();
      // Non Blocking I/O
      client.configureBlocking(false);
      // record it for read/write operations (Here we have used it for read)
      client.register(selector, SelectionKey.OP_READ);
      continue;
    }
```
- Nếu key là readable thì chúng ta có thể đọc data từ client
```
// if readable then the server is ready to read 
    if (key.isReadable()) {

      SocketChannel client = (SocketChannel) key.channel();

      // Read byte coming from the client
      int BUFFER_SIZE = 1024;
      ByteBuffer buffer = ByteBuffer.allocate(BUFFER_SIZE);
      try {
        client.read(buffer);
      }
      catch (Exception e) {
        // client is no longer active
        e.printStackTrace();
        continue;
      }
```
- Nếu key là writable thì có nghĩa là server đã sẵn sàng để gửi dữ liệu lại cho client
```
if (key.isWritable()) {
  SocketChannel client = (SocketChannel) key.channel();
  // write data to client...
}
```
 Bây giờ chúng ta cần tạo ra một client đơn giản để kết nối tới server
 - Trước tiên cần tạo ra một socket channel để kết nối tới server (với host và port của server đó)
 ```
 SocketAddress address = new InetSocketAddress(hostname, portnumber);
SocketChannel client = SocketChannel.open(address);
 ```
 
 - Bây giờ thay vì dùng tới socket input và output stream thì chúng ta sẽ ghi data vào chính channel. Đương nhiên trước khi ghi thì chúng ta cần encode dạng ByteBuffer như đã đề cập phía trên.
 ```
 ByteBuffer buffer = ByteBuffer.allocate(74);
 buffer.put(msg.getBytes());
buffer.flip();
client.write(buffer);
 ```
# Tài liệu tham khảo
https://www.baeldung.com/java-nio-selector
https://docs.oracle.com/javase/tutorial/networking/sockets/definition.html
https://medium.com/coderscorner/tale-of-client-server-and-socket-a6ef54a74763