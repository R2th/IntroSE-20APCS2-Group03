### 1. Protocol 
Giả sử: Có 2 người A và B nói chuyện với nhau qua điện thoại, nếu người A hỏi 1 câu rồi im lặng, người B sẽ biết rằng người A đang chờ đợi câu trả lời và đến lượt người B nói. Hai chiếc máy tính cũng giao tiếp 1 cách lịch sự như vậy và được mô tả với cái thuật ngữ “Protocol” – giao thức.
Giao thức chính là những luật lệ được chấp thuận để 2 cái máy tính có thể nói chuyện với nhau.
Tuy nhiên, luật lệ này chặt chẽ hơn rất nhiều so với giao tiếp giữa người với người. Máy tính sẽ không thông minh để có thể nhận biết 2 câu “A là chồng B” hay “B là vợ A” có cùng ý nghĩa. Để 2 máy tính giao tiếp hiệu quả, server phải biết chính xác cách mà client sắp xếp cái message nó gửi lên như thế nào.

Chúng ta đã từng nghe đến những Protocol cho những mục đích khác nhau, ví dụ như Mail có POP hay IMAP, message có XMPP, Kết nối thiết bị: Bluetooth. Trong web thì Protocol chính là HTTP – HyperText Transfer Protocol, và nó là giao thức được dùng cho các API.
### 2. HTTP hoạt động như thế nào?
Cuộc sống của HTTP xoay quanh cái vòng luẩn quẩn: Request và Response. Client gửi request, server gửi lại response là liệu server có thể làm được cái client muốn hay ko. Và API được xây dựng trên chính 2 thành phần: Request và Reponse. Trước tiên, ta phải hiểu cấu trúc của mỗi thành phần.
![](https://images.viblo.asia/bf803f54-035a-47db-b79a-7b9f9b148bc5.gif)
***Request***

Một cái request đúng chuẩn cần có 4 thứ: 
1. URL
2. Method
3. Headers
4. Body


![](https://images.viblo.asia/49059608-3ca1-42da-8377-7fa1e5c6afb2.gif)

Bây giờ chúng ta sẽ đi vào chi tiết:

1. **URL** là 1 cái địa chỉ duy nhất cho 1 thứ (dùng danh từ), có thể là web page, image,hoặc video. API mở rộng cái ý tưởng gốc của URL cho những thứ khác, ví dụ: customers, products. Và như thế client dễ dàng cho server biết cái nó muốn là cái gì, những cái này còn được gọi chung là “resources” – nguồn lực.

2. **Method** là cái hành động client muốn tác động lên “resources”, và nó thường là động từ. Có 4 loại Method hay được dùng:
*  GET: Yêu cầu server đưa lại resource: Hãy tưởng tượng ra cái cảnh vào fb, tay vuốt new feeds.
* POST: Yêu cầu server cho tạo ra 1 resource mới. Ví dụ: đăng ký 1 chuyến đi ở GrabBike.
* PUT: Yêu cầu server cho sửa / thêm vào resource đã có trên hệ thống. Ví dụ: Edit 1 post ở trên fb.
* DELETE: Yêu cầu server cho xóa 1 resourse. Cái này chắc chả cần ví dụ.
3. **Headers**: nơi chứa các thông tin cần thiết của 1 request nhưng end-users không biết có sự tồn tại của nó. Ví dụ: độ dài của request body, thời gian gửi request, loại thiết bị đang sử dụng, loại định dạng cái response mà client có đọc được…
4. **Body**: nơi chứa thông tin mà client sẽ điền. Giả sử bạn đặt 1 cái bánh pizza, thì thông tin ở phần body sẽ là: Loại bánh pizza, kích cỡ, số lượng đặt.

***Response:***

Sau khi nhận được request từ phía client, server sẽ xử lý cái request đó và gửi ngược lại cho client 1 cái response. Cấu trúc của 1 response tương đối giống phần request nhưng Status code sẽ thay thế cho URL và Method. Tóm lại, nó có cầu trúc 3 phần:
1. Status code 
2. Headers
3. Body

Status code là những con số có 3 chữ số và có duy nhất 1 ý nghĩa. Chắc tester mình cũng không còn lạ lẫm với những Error “404 Not Found” hoặc “503 Service Unavailable”. Full list có [ở đây](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
### 3. JSON
Ngày nay, JSON được sử dụng nhiều trong Restful API. Nó được xây dựng từ Javascript, ngôn ngữ mà được dùng nhiều, tương thích với cả front-end và back-end của cả web app và web service. JSON là 1 định dạng đơn giản với 2 thành phần: keys và values.
* Key thể hiện thuộc tính của Object
* Value thể hiện giá trị của từng Key

Ví dụ: 
![](https://images.viblo.asia/ae58571c-8c86-45c2-ba45-ed9aa83dc6f7.jpg)

Trong ví dụ trên, keys nằm bên trái, values nằm bên phải.
![](https://images.viblo.asia/2f827278-272b-4189-a4d1-3c15283ec7b9.jpg)

Có nhiều trường hợp, 1 Key sẽ có Value là 1 dãy key + value. Ví dụ như hình:

![](https://images.viblo.asia/2a715785-f1f3-4250-a899-6b7dcd6ae8aa.jpg)
Trong hình trên Key có tên là Data có Value là 2 cặp Key + value.
### 4. XML
Trong JSON dùng { } và [ ] để dánh dấu dữ liệu. XML thì tương tự như HMTL, dùng thẻ để đánh dấu và được gọi là nodes.

Lấy luôn ví dụ ở trên nhưng viết bằng xml, nó sẽ như thế này:
![](https://images.viblo.asia/2d2c8175-7ae9-4b58-94e2-748d85317aba.jpg)
![](https://images.viblo.asia/2b372cee-24ea-401c-a6ce-614d924e100b.jpg)
### 5. Định dạng dữ liệu được sử dụng như thế nào trong HTTP.
Quay lại mục 3, phần header có chức năng lưu những thông tin mà người dùng không biết, trong đó có 1 thành phần xác định format của data: Content-Type

Khi client gửi Content-Type trong header của request, nó đang nói với server rằng dữ liệu trong phần body của request là được định dạng theo kiểu đó. Khi client muốn gửi JSON nó sẽ đặt Content-Type là “application/json”. Khi bắt đầu nhận request, server sẽ check cái Content-Type đầu tiên và như thế nó biết cách đọc dữ liệu trong body. Ngược lại, khi server gửi lại client 1 response, nó cũng gửi lại Content-Type để cho client biết cách đọc body của response.

Đôi khi client chỉ đọc được 1 loại định dạng, ví dụ là JSON mà server lại trả về XML thì client sẽ bị lỗi. Do đó, 1 thành phần khác ở trong header là Accept sẽ giúp client xử lý vấn đề trên bằng cách nói luôn với server loại nó có thể đọc được. Ví dụ : Accept : “application/json” . Chốt lại: dựa vào 2 thành phần Content-Type và Accept, client và server có thể hiểu và làm việc một cách chính xác. 
### 6. Xác thực danh tính trong thế giới ảo
Giả sử bạn đã đăng ký 1 account ở 1 website, 2 thông tin không thể thiếu là username và password. Những thông tin này còn được gọi là “Giấy thông hành” – Credentials. Và những lần sau, để vào website bạn cần đưa ra cái “Giấy thông hành” đó.

Việc đăng nhập với username và password là 1 ví dụ của quá trình xác định danh tính – Authentication. Khi bạn chứng minh Danh tính với 1 server, bạn cung cấp thông tin mà chỉ có bạn và server biết. (không tính tới trường hợp ngy share account fb của nhau nhé :v). Một khi server biết bạn là ai, nó sẽ tin tưởng và cho phép bạn tiếp cận những thông tin bên trong.

Trong API, có rất nhiều kỹ thuật để xử lý phần Authentication này. Chúng được gọi là Authentication schemes.
### 7. Basic Authentication
Cái ví dụ vừa nói ở trên là cái form cơ bản nhất của Authentication, tên gọi chuẩn là Basic Authentication, hay được viết tắt là “Basic Auth”. Basic Auth thì chỉ yêu cầu username và password thôi. Client nhập 2 thông tin trên rồi gửi chúng qua HTTP header cho server, đây gọi là quá trình xin phép – Authorization.
![](https://images.viblo.asia/a0eebca4-802d-4086-99b8-125c61429b88.gif)
Khi server nhận được 1 request, nó sẽ soi vào Authorization header và so sánh thông tin đó với thông tin Credential mà chúng cất giữ ở DB. Nếu đúng, server sẽ chấp thuận request của client và trả thêm các thông mà client yêu cầu ở phần Body. Nếu không đúng, server sẽ trả lại mã code 401, báo hiệu rằng quá trình xác thực fail và yêu cầu bị từ chối.

Mặc dù Basic Auth là 1 kỹ thuật thường xuyên được sử dụng nhưng trên thực tế việc nó dùng cùng 1 username và password để truy cập đến API và quản lý tài khoản là không lý tưởng. Nó giống như việc 1 khách sạn đưa cho khách cả chùm chìa khóa của cả khách sạn chứ không phải là chìa khóa của 1 phòng.
### 8. API Key Authentication
API Key Authentication là 1 kỹ thuật giúp xử lý điểm yếu của mô hình Basic Auth ở phía trên. Thay vì đưa cả chùm chìa khóa cho khách hàng, chủ khách sạn chỉ đưa cho khách hàng đúng 1 (Key) chìa khóa phòng của họ. Key thông thường là 1 dãy dài số và chữ, là duy nhất và khác biệt với password.

Khi Client xác thực với API Key, server sẽ biết để đồng ý cho client truy cập tới data. Vậy thì API Key sẽ nằm ở vị trí nào trên request. Có thể chúng ta sẽ nghĩ là Key này chắc cũng nằm ở header giống như Basic Auth phía trên. Ơ không, nó nằm ở vị trí mà người lập trình mong muốn vì không có chuẩn nào cả. :v Có thể đặt nó trên header, trên URL (http://example.com?api_key=my_secret_key), hoặc là ở Body. Và cho dù có đặt chúng ở đâu đi chăng nữa, chúng cũng sẽ có cùng 1 tác dụng.

-----
https://www.amazon.com/Introduction-APIs-Brian-Cooksey-ebook/dp/B01MYOBVUA/ref=sr_1_1?ie=UTF8&qid=1495614332&sr=8-1&keywords=an+introduction+to+APIS

https://www.guru99.com/api-testing.html

https://medium.com/aubergine-solutions/api-testing-using-postman-323670c89f6d