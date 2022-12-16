![image.png](https://images.viblo.asia/a77290a0-a493-46dc-93de-eb545309e4ed.png)

Từ khi Internet ra đời, sự phát triển về các giao thức trao đổi thông tin và dữ liệu giữa các máy tính là điều tối cần thiết. HTTP (Hyper Text Transfer Protocol) chắc chắn sẽ là giao thức nổi tiếng nhất, trang web các bạn đang xem chính là sử dụng HTTP đấy.

![image.png](https://images.viblo.asia/be56680e-3545-439e-9283-e475c87d1d59.png)

## Giới thiệu giao thức HTTP
HTTP ra đời vào năm 1989 bởi Timothy Berners-Lee. Đây là giao thức chuẩn để World Wide Web hoạt động, đóng vai trò giúp các máy tính người dùng (client) giao tiếp với các máy chủ trên toàn thế giới (server). Giả sử nếu bạn cần xem một nội dung website, bạn chỉ cần gõ đường dẫn lên trình duyệt web rồi enter. Khi đó máy tính của bạn sẽ thực hiện một giao thứ HTTP để “lấy” được nội dung bạn cần ở server. Cơ chế này được biết đến với với tên gọi kiến trúc Client & Server hay Request & Response.

![image.png](https://images.viblo.asia/ae63137c-c9e9-4755-8259-f8b45b0d20d0.png)

Hồi thời khai sinh HTTP (cụ thể đến v0.9), HTTP chỉ support mỗi một method duy nhất là GET. Kiểu trả về cũng chỉ duy nhất Hypertext mà thôi. Thậm chí nó cũng không có Header luôn.

Nhìn trông đơn giản vậy thôi mà không phải vậy. Đó sẽ là cả một tiến trình đi qua khá nhiều network layer như hình dưới đây:

![image.png](https://images.viblo.asia/d6a67e62-15ef-4d5c-91e2-fab2314554de.png)

Như vậy HTTP bản chất là một layer on-top layer TCP.

## HTTP hoạt động như thế nào?
Thông thường mỗi HTTP Request sẽ sử dụng một kết nối TCP (TCP Connection). Các bước sẽ trải qua đại khái như sau:

1. Phía client sẽ khởi tạo một kết nối TCP đến server.
2. Sau khi kết nối thành công, client sẽ gởi request đến server.
3. Server tiếp nhận request, tiến hành tìm kiếm và trả về cho client thông qua kết nối TCP ở bước 2.
4. Client tiếp nhận response từ server.
5. Client đóng kết nối TCP.
6. Nếu client cần thêm các object từ server, mỗi object sẽ cần thực hiện lại các bước 1 đến 5.

![image.png](https://images.viblo.asia/3051cf99-2000-4c72-9dec-a45cdaf2ca09.png)

Ở đây chúng ta cần lưu ý rằng, bản chất TCP Connection khi được thiết lập sẽ cần 3 bước được biết đến với tên gọi: TCP 3-Way Handshake Process. Tức là giữa client và server cần trao đổi (gởi và nhận) 3 messages trước khi kết nối được thiết lập. Tương tự khi kết nối đóng lại cũng cần thực hiện lại quy trình 3 bước này.

![image.png](https://images.viblo.asia/addd2dfc-7948-44e3-8fd3-a6dd4dcb1900.png)

Việc phải thực hiện đi thực hiện lại quy trình kết nối 3 bước là một điểm yếu rất lớn của HTTP 0.9 và 1.0. Đây là một trong những lý do thúc đẩy sự phát triển lên HTTP 1.1

## Giao thức HTTP/1 (v1.1)
Giao thức HTTP sau đó được phát triển lên HTTP/1 (version 1.1) vào năm 1999. Có lẽ ở thời điểm này, giao thức HTTP chính thức được sử dụng rộng rãi hơn do rất rất nhiều vì không những cho Web mà còn cả các đầu thiết bị khác. Từ v1.1, HTTP đã có đầy đủ “đồ chơi” như nhiều method hơn (`GET` , `HEAD` , `POST` , `PUT` , `DELETE` , `TRACE` , `OPTIONS`), đã có HEADER và quan trọng nhất đó là TCP Connection có thể được giữ lại (keep-alive hay persistent connection) để phục vụ các request tiếp theo.

### HTTP Pipelining
Đây là tính năng giúp HTTP 1.1 có thể tận dụng được một connection cho nhiều request. Phía client cứ gọi liên tiếp các request mà không cần đợi response. Server sẽ nhận một loạt các request này để xử lý rồi trả về sau.

![image.png](https://images.viblo.asia/45ff2045-b761-4b6c-b5c9-38a78b21dd9f.png)

Tuy nhiên cơ chế này mang đến một phiền phức khác. Giả sử nếu các request đến đồng thời và xử dụng chung một connection, các response trả về không theo thứ tự sẽ khiến client không thể phân biệt được response nào của request nào. Vì thế quy tắc là request thứ tự ra sao thì phải trả về đúng theo thứ tự đó.

Thêm vào đó, nếu request có gói tin bị thất lạc (có thể là do gói tin lớn hoặc chất lượng đường truyền kém) sẽ khiến toàn bộ các request đang nối đuôi theo sau bị chặn lại cho tới khi request đó được giải quyết. Vấn đề này được biết với tên TCP Head-of-line blocking (HOL).

### HTTP persistent connection (HTTP keep-alive)
Thay vì gởi một lượt các request vào một connection rồi đợi về một mớ response lộn xộn. Chúng ta có thể dùng HTTP keep-alive để gởi từng cặp request/response.

![image.png](https://images.viblo.asia/3cac81ce-dca7-4d12-9249-1e66a31643b5.png)

Ở đây có thể là một connection hoặc nhiều connection được tái sử dụng. Đây là giải pháp mà hầu hết các server đang áp dụng cho HTTP 1.1

### Hỗ trợ Compression/Decompression (Encoding)
Đây là chức năng cho phép Client và Server tối ưu được tốc độ và băng thông khi trao đổi thông tin. Cơ chế compress (nén) phổ biến nhất là gzip và Deflate.

![image.png](https://images.viblo.asia/9d932448-e478-4da2-8b42-2de015bd9442.png)

```
GET / HTTP/1.1
Host: www.example.com
Accept-Encoding: gzip, deflate
```

Nếu server có hỗ trợ cơ chế compress và client mong muốn thì sẽ trả về như sau:

```
HTTP/1.1 200 OK
Date: mon, 26 June 2016 22:38:34 GMT
Server: Apache/1.3.3.7 (Unix)  (Red-Hat/Linux)
Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT
Accept-Ranges: bytes
Content-Length: 438
Connection: close
Content-Type: text/html; charset=UTF-8
Content-Encoding: gzip
```

## Giao thức SPDY
SPDY (đọc là “speedy”) được phát triển bởi Google bắt đầu từ năm 2009 (v1) và 2012 (v2). Mục đích giao thức này ra đời để tăng tốc độ tải trang và tính bảo mật cho website.

![image.png](https://images.viblo.asia/458c6d00-696b-4996-af20-0b1a39daea8f.png)

Một số vấn đề từ HTTP/1 mà SPDY ra đời để giải quyết:

* Single request per connection. HTTP chỉ có thể tải về từng resource với từng request, mỗi cái là một connection tương ứng. Việc này gây làm tăng delay (thời gian chờ) cũng như không tận dụng được băng thông. SPDY cho phép một connection có thể xử lý được đồng thời nhiều request.
* Client-initiated requests. HTTP hoạt động theo kiểu “hỏi-đáp”, client request dữ liệu nào thì được server trả về dữ liệu nấy. Với SPDY, server có thể chủ động “push” dữ liệu về client mà không cần client gởi request đến.
* Redundant headers. HTTP headers là những metadata mô tả cách thức vận hành của một request HTTP. Trong nhiều trường hợp, rất nhiều request với những header lập đi lập lại giống nhau. SPDY có thể loại bỏ những header không cần thiết này để giải lượng băng thông cần thiết.
* Uncompressed data. Compression (nén) sẽ giúp dữ liệu có dung lượng nhỏ hơn khi trao đổi thông tin, với HTTP thì nó là optional (không bắt buộc). SPDY bắt buộc sử dụng nén dữ liệu cho mọi request.
## Giao thức HTTP/2
Tính ưu việt từ SPDY đã thu hút rất nhiều sự quan tâm từ các nhà phát triển giao thức và trình duyệt web hàng đầu. Vào thời điểm này, nhóm phát triển SPDY cho biết họ đang chuẩn hoá giao thức. Các bên đã đi đến thống nhất là phát triển hẳn lên HTTP/2 với công nghệ lõi từ SPDY.

Kết quả, năm 2015, HTTP/2 đã được công bố thông qua RFC 7540.
![image.png](https://images.viblo.asia/f650c53c-749b-41c4-95db-104a498b28b0.png)
Một số tính năng nổi bật của HTTP/2

### HTTP/2 sử dụng binary thay cho dạng văn bản
Binary Protocol (giao thức nhị phân) sẽ hiệu quả hơn để phân tích (parse), gọn nhẹ hơn để giao tiếp và quan trọng nhất là chúng sẽ ít bị lỗi hơn so với dạng text (văn bản). Đơn giản là bởi vì dữ liệu nhị phân không cần xử lý những trường hợp như khoảng trắng, in hoa, xuống dòng, dòng trống, emoji,…

![image.png](https://images.viblo.asia/21ee8b15-12f2-42a5-9c8e-886ac51d9124.png)

### Request Response Multiplexing
Trong HTTP/1, cụ thể là Pipelining, khi client muốn tối ưu connection bằng cách thực hiện nhiều request một lượt rồi đợi response trả về. Điểm hạn chế chúng ta đã biết response phải đúng thứ tự so với request. Việc này gây hiện tượng HOL.

Để khắc phục việc này, HTTP/2 sử dụng Multiplexing cho cả Request và Response. Có thể tạm hiểu rằng chúng được định danh để biết được response nào của request nào. Từ đó chúng có thể hoạt động độc lập mà không cần tuân thủ thứ tự như trước. Trên thực tế phương thức này chia dữ liệu giữa Client và Server thành từng data frame xen kẽ. Phía nhận sẽ có nhiệm vụ “lắp ghép” chúng lại để có được toàn bộ dữ liệu hoàn chỉnh.

![image.png](https://images.viblo.asia/530a1597-fda2-40c6-be6e-5ff0a81be69c.png)

### Streams
Kết nối HTTP/2 sẽ bao gồm nhiều Stream (luồng dữ liệu). Các streams này chứa một dãy các Data Frame cần giao tiếp giữa client và server. Các Data Frame có thể được đặt xen kẽ bất kể chúng từ đâu đến. Mặc dù là vậy, thứ tự của Data Frame vẫn rất quan trọng và phía nhận sẽ phải xử lý theo đúng thứ tự này. Ở cả 2 phía nhận và gởi data đều có thể đóng hoặc khởi tạo một stream mới. Khi Stream mới được thiết lập, nó sẽ có ID là một số nguyên (integer).

![image.png](https://images.viblo.asia/a7f053ea-b60a-412e-8cf0-d514867b1b15.png)

### Stream Prioritization
HTTP/2 cho phép client cung cấp mức độ ưu tiên cho các luồng dữ liệu cụ thể (stream). Mặc phía server không bị ràng buộc phải tuân theo ưu tiên này, nhưng cơ chế này cho phép server tối ưu hóa việc phân bổ tài nguyên dựa trên các yêu cầu của người dùng cuối.

![image.png](https://images.viblo.asia/b04b3a66-e2c6-4c98-b367-5d87078836d4.png)

### Stateful Header Compression
Trong lúc client thực hiện các request đến server sẽ có vô số các header bị dư thừa và lặp đi lặp lại. HTTP/2 sử dụng HPACK như một cách tiếp cập đơn giản và an toàn để compress (nén) các header này. Ở cả client và server đều phải lưu trữ các head đã được sử dụng trước đó, từ head đã được nén, chúng sẽ tra cứu thông tin và tiến hành khôi phục lại header đầy đủ. Việc này mang lại hiệu năng cao và tối ưu băng thông đáng kể.

![image.png](https://images.viblo.asia/6e82398a-e5c6-4bfd-8e7c-a2157e9fa98a.png)

### Server Push
Trong HTTP/2 server có thể gởi về nhiều response với chỉ một request từ client. Cơ chế này gọi là Server Push, giúp trình duyệt tiết kiệm được các requests không cần thiết.

![image.png](https://images.viblo.asia/68fb4f6d-27d8-4c7e-bc22-3d21b61ecf79.png)

## Mô phỏng tải hình ảnh với HTTP/1 và HTTP/2
![image.png](https://images.viblo.asia/36e24fc3-7f13-4441-85a2-85ae75b9e967.png)

Trong ví dụ trên, bức ảnh lớn được chia làm nhiều file nhỏ. Với HTTP/1 ta có thể thấy rằng các ảnh nhỏ được tải tải lên tuần tự, hết ảnh này rồi mới đến ảnh khác. Với HTTP/2 thì kết nối TCP chia thành nhiều stream, mỗi stream chịu trách nhiệm load một ảnh nhỏ, chúng có thể bất đồng bộ đan xen lẫn nhau và không cần thiết phải đợi theo thứ tự.

Từ đó HTTP/2 sẽ load lên đủ ảnh lớn nhanh hơn đáng kể. Nếu bạn inspect xem network request cũng sẽ thấy rằng dung lượng header rất nhỏ, vì chúng đã được nén lại.

Nguồn: https://edu.200lab.io/blog/giao-thuc-http2-la-gi-so-sanh-http1-va-http2