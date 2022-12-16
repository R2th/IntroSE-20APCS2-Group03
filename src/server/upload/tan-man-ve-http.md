![image.png](https://images.viblo.asia/21371c42-a0d6-4058-a8e1-694259438159.png)
Xin chào, hôm nay mình quay lại cùng với một chủ đề không mấy xa lạ muốn chia sẻ đến các bạn.

Nếu bạn yêu thích lập trình Web, muốn tự mình xây dựng các Web app xịn "như người lớn", thì kiến thức về HTTP là một trong những kiến thức nền tảng không thể thiếu.
Trong bài viết hôm nay, mình sẽ giới thiệu các kiến thức cơ bản, không đi theo chiều sâu, để các bạn có một cái nhìn tổng quát nhất về HTTP.
Nhưng trước hết, đây là những khái niệm bạn cần nắm được vì trong bài viết mình sẽ không sử dụng phần dịch tiếng Việt cho những thuật ngữ chuyên ngành này (nghe khá kì):
- Request: Yêu cầu được gửi đi trong mô hình máy khách - máy chủ (client-server).
- Response: Phản hồi của máy chủ cho các request tới từ máy khách.
- Client: hay máy khách, máy khách có thể là một trình duyệt web, một search engine hay robot. Máy khách sẽ gửi những request chứa thông điệp tới máy chủ và nhận phản hồi từ máy chủ.
- Server: hay máy chủ, nhận những request từ máy khách, xử lí thông điệp gửi tới và gửi lại response cho máy khách.
Vậy là ổn rồi, cùng bắt đầu thôi!

# HTTP là gì?
HTTP là từ viết tắt của Hyper Text Transfer Protocol, hay Giao thức truyền tải siêu văn bản, là một giao thức phi trạng thái, không dựa trên kết nối, bao gồm các quy tắc định nghĩa ra các giao tiếp giữa client-server được kết nối với nhau thông qua giao thức TCP.
Khi kết nối được thiết lập, HTTP sẽ định nghĩa những quy tắc truyền tải tệp tin ví dụ như ảnh, văn bản và các tệp đa phương tiện khác giữa client và server.

# Lược sử HTTP
- HTTP/1.0: Phiên bản đầu tiên của HTTP. Ở phiên bản này, mỗi khi client-server giao tiếp với nhau, một kết nối TCP sẽ được tạo. Điều này ảnh hưởng rất lớn đến hiệu năng khi có nhiều request được gửi cùng lúc tới server, do vậy điểm yếu này đã được khắc phục ở các phiên bản tiếp theo.
- HTTP/1.1: Phiên bản tiếp theo của HTTP, khắc phục được điểm yếu ở phiên bản tiền nhiệm nhờ việc sử dụng cơ chế ống lệnh (pipelining), giúp client và server có thể gửi cùng lúc nhiều tín hiệu qua lại với chỉ một kết nối TCP.
- HTTP/2: Phiên bản kế tiếp này mang tính đột phá trong tốc độ với việc sử dụng ghép kênh (multiplexing), nén dữ liệu (compression), gửi dữ liệu dạng nhị phân và một số cải tiến khác.

# Đặc điểm của HTTP
- Phi trạng thái (stateless): Giữa các request và response gửi đi trên cùng một kết nối TCP không có bất kì liên kết nào.
- Không có kết nối (connection-based): HTTP không phải là giao thức xây dựng trên kết nối nên nó sử dụng giao thức TCP ở tầng giao vận để vận chuyển thông điệp giữa client và server.
- Khi server nhận được thông điệp từ client, nó sẽ xử lí thông điệp và gửi response cho client và đóng kết nối TCP.
Mặc dù là một giao thức phi trạng thái nhưng trong nhiều tình huống, client cần chia sẻ trạng thái giữa các request, để giải quyết vấn đề đó, HTTP sử dụng session và cookie.
Cookie sẽ được trình duyệt gửi cho server thông qua header của mỗi request, giúp chia sẻ trạng thái của session giữa nhiều request.
# Session là gì?
Một session, hay phiên làm việc, là một bộ nhớ tạm trên server, mỗi session sẽ có một ID duy nhất dùng để định danh. Dữ liệu của session được lưu trữ bên phía server, còn ID sẽ được lưu phía client tại trình duyệt mà client sử dụng.
**Đặc điểm của session**
- Session là độc lập và duy nhất đối với mỗi client. Kể cả khi có 3 client tương tác với server tại cùng 1 thời điểm thì cũng sẽ có 3 session được tạo ra bởi server.
- Session được duy trì xuyên suốt các trang của website khi người dùng tương tác.

# Quy trình HTTP
Để hiểu quy trình của HTTP, hãy nghĩ tới một câu hỏi đơn giản: Khi người dùng nhập URL vào trình duyệt và nhấn Enter, trình duyệt liền điều hướng tới website người mong muốn truy cập, điều gì đã xảy ra vậy? Câu trả lời rất đơn giản:
- Client, ở đây là trình duyệt người dùng sử dụng, gửi request đến server mà của website mong muốn thông qua URL.
- Server nhận được request, xử lí và gửi lại response có chứa trang web mong muốn của client.
![image.png](https://images.viblo.asia/fda65f40-50b0-4617-b784-1115825caf67.png)
Quy trình này được gọi là Chu trình gửi - nhận (Request-Response cycle)
Cùng đi sâu hơn 1 chút vào chủ đề này để hiểu rõ hơn nào.
Giả sử chúng ta muốn truy cập vào **hashnode.com** và tới trang Explore:
![image.png](https://images.viblo.asia/8637be5d-0e1b-4751-a0d6-287eaa920001.png)
URL được tạo bởi:
- Protocol (Giao thức): Đây là giao thức được sử dụng trên kết nối, có thể là HTTP hoặc HTTPS, trong trường hợp này là HTTPS.
- Resource (Nguồn): Đích đến mà client mong muốn
- Domain name (Tên miền): Ở đây tên miền là **hashnode.com**, cần chú ý rằng tên miền ở đây không phải là địa chỉ thật của server ta đang kết nối tới, tên miền mà ta nhập vào chỉ như lớp mặt nạ, làm cho chúng ta dễ dàng ghi nhớ và truy cập vào địa chỉ của một server nào đó. Khi gửi request thông qua tên miền **hashnode.com**, client cần phân giải tên miền đó ra địa chỉ thật trên mạng của server để có thể gửi request, và đó sẽ là nhiệm vụ vủa DNS (Domain Name Server, máy chủ phân giải tên miền).
Địa chỉ thực sự của server có dạng như sau:
![image.png](https://images.viblo.asia/43a3d540-f25b-439b-ac97-6b161df52d35.png)
DNS chỉ tìm kiếm địa chỉ dựa trên tên miền khi HTTP request được tạo ra. Khi client khởi tạo một request tới server, nó sẽ thực hiện theo các bước:
1. Khởi tạo một kết nối TCP giữa client và server
2. Khi kết nối được khởi tạo thành công, client gửi HTTP request tới server
3. Sau khi nhận và xử lí HTTP request từ client, server sẽ gửi response cho client
4. Cuối cùng, sau khi server gửi response, kết nối TCP sẽ được đóng.
![image.png](https://images.viblo.asia/84cdc96c-1d96-4e79-a39a-ec2532c4f549.png)

# Thông điệp HTTP
Có hai loại thông điệp HTTP:
- HTTP request được gửi từ client tới server
- HTTP response được server gửi cho client
Chúng ta sẽ lần lượt tìm hiểu về 2 loại thông điệp trên.

# HTTP Request
![image.png](https://images.viblo.asia/9eb12786-b00b-4cf7-837e-629adbae6fd2.png)
HTTP request bao gồm:
- HTTP method: các phương thức này thường là động từ định nghĩa hành động client mong muốn thực hiện với tài nguyên, ví dụ như **GET** hoặc **POST**.
- Request URI: được sử dụng để xác định tài nguyên được HTTP method tác động tới.
- Phiên bản của giao thức HTTP, ở đây là HTTP/1.1
- Request headers: Chứa những thông tin khác về request và client gửi cho server, trong trường hợp này ta có một số trường như:
+ Host: Định nghĩa địa chỉ IP và cổng kết nối của server. Ở đây sử dụng giao thức HTTPS nên cổng mặc định sẽ là 443, còn nếu là HTTP sẽ có cổng mặc định là 80
+ Accept-Language: Chỉ ra ngôn ngữ client có thể hiểu được, ở đây là *"en"* viết tắt cho tiếng Anh
- Body: Đây là phần không bắt buộc, chứa các thông tin client muốn gửi tới tương tác với tài nguyên của server, thường sẽ có ở các method POST, PATCH.
# HTTP Response
![image.png](https://images.viblo.asia/26c16364-2480-499a-9e30-ea66ff2ddfbf.png)
HTTP response gồm có:
- Phiên bản của giao thức HTTP, ở đây là HTTP/1.1
- Status code: trường hợp này code trả về là 200
- Response header: Chứa các thông tin cần thiết về response và server gửi tới client, ở đây ta có các trường sau:
+ Accept-Ranges: được sử dụng bởi server để đưa ra sự hỗ trợ của server về request phân nhỏ
+ Server: Mô tả phần mềm được sử dụng bởi server để xử lí request đến
+ Content-type: Chỉ ra loại tài nguyên response trả về
+ E-tag: Định nghĩa phiên bản của tài nguyên cụ thể
- Body: Trường chứa các thông tin trả về cho client, thường được sử dụng khi server nhận được request tới từ method GET

# Các phương thức của HTTP
HTTP sử dụng các phương thức để định nghĩa hành động tương tác tới nguồn tài nguyên của server. Các phương thức này thường là các động từ, và được sử dụng phổ biến nhất là các phương thức: GET, POST, PUT và DELETE. Mỗi phương thức sẽ trả về response thành công hoặc thất bại phụ thuộc vào tính toàn vẹn của hành động dựa vào status code.
1. GET: Phương thức này thường được dùng để lấy về tài nguyên, nếu thành công sẽ trả về một thực thể trong response, đi kèm với status code 200.
2. POST: Phương thức này sử dụng để gửi lên server dữ liệu, thường được dùng để tạo mới dữ liệu cho tài nguyên, nếu thành công response sẽ có status code là 201.
3. PUT: Phương thức này thường được sử dụng để cập nhật dữ liệu của một thực thể nhất định trong tài nguyên.
4. DELETE: Phương thức này thường được sử dụng để xóa dữ liệu của tài nguyên.

# HTTP Status Codes
Code được server sử dụng để xác định sự thành công hay thất bại của hành động, được gửi cho client kèm theo response.
Status code là số có 3 chữ số, với chữ cái đầu tiên định nghĩa loại code.

**1XX (Informational, thông tin):** Loại code này chứa những thông tin chỉ ra rằng một client nên tiếp tục với request của họ.
- 100 Continue: Client nên tiếp tục request
- 101 Switching protocols: Server sẵn sàng để chuyển đổi giao thức

**2XX (Success):** Loại code này chỉ ra rằng request gửi tới bởi client đã được nhận, xử lí thành công bởi server.
- 200 OK: Tài nguyên request tới được lấy thành công
- 201 Created: Tài nguyên mới được tạo thành công bởi request
- 202 Accepted: Request được chấp nhận nhưng chưa được xử lí bởi server

**3XX (Redirection):** Loại code này chỉ ra những hành động tiếp theo cần có của client để có thể hoàn thành request.
- 301 Moved permanently: Tài nguyên được request tới được dịch chuyển tới một URI mới, URI đó ở trường Location của response
- 304 Not modified: Request thành công nhưng client không chỉnh sửa tài nguyên

**4XX (Client Error):** Loại code này chỉ ra rằng đã có lỗi xảy ra bên phía client khi gửi request đi.
- 400 Bad requests: Server không thể hiểu được request
- 401 Unauthorized: Request cần phải được xác thực
- 404 Not found: Server không tìm thấy tài nguyên client yêu cầu

**5XX (Server Error):** Loại code này chỉ ra rằng đã có lỗi xảy ra bên phía server.
- 500 Internal Error: Server gặp phải một lỗi không mong muốn.
- 503 Service Unavailable: Server không thể xử lí request vì một lí do nào đó tạm thời, ví dụ như đang bảo trì, hoặc đang quá tải

# Lời kết
Vậy là mình đã giới thiệu một lượt về giao thức HTTP, hy vọng các bạn sẽ thấy kiến thức này hữu ích và lấy nó làm nền tảng để có thể phát triển, học tập những kiến thức khác.
Hẹn gặp lại!

# Tham khảo
https://dev.to/kaid00/http-simplified-5eak