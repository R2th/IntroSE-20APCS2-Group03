# Lời mở đầu:
"Xin chào tất cả các bạn, tôi đã quay trở lại rồi đây" :D

Trong thời gian vừa qua tôi đã làm việc với một project có sử dụng API. Và vào một ngày đẹp trời, tôi test thử chức năng mới làm và bị lỗi (chuyện thường như cơm bữa đúng không). Vấn đề là tôi không rõ lỗi ấy chỉ nằm ở phần hiển thị hay là do phần xử lí dữ liệu bên API. Thế là tôi đã bắt đầu mày mò và tìm thấy Postman (có thể nhiều bạn biết rồi nhưng với tôi nó giống như vừa tìm ra châu lục mới vậy :D). Nó giúp tôi kiểm tra được API có đang chạy đúng không, nếu có thì lỗi chắc chắn là ở bên hiển thị rồi.

Vậy hãy cùng tôi tìm hiểu xem Postman dùng để làm gì và dùng như thế nào nhé!
## Trước hết cần hiểu, API là gì?
Theo định nghĩa trên wikipedia thì **API** (**Application Programming Interface- giao diện lập trình ứng dụng**) là một giao diện mà một hệ thống máy tính hay ứng dụng cung cấp để cho phép các yêu cầu dịch vụ có thể được tạo ra từ các chương trình máy tính khác, và/hoặc cho phép dữ liệu có thể được trao đổi qua lại giữa chúng. 

Các bạn chú ý nhé, **Interface** ở đây không mang nghĩa giống như **UI** (**User Interface- giao diện người dùng**) đâu nhé, ở đây bạn nên hiểu nó là một chuẩn/phương pháp để các ứng dụng có thể tương tác, làm việc với nhau. Nghe thì có vẻ khó hiểu đúng ko? Để mình nói cho các bạn theo cách hiểu của mình, có thể các bạn sẽ dễ hình dung hơn.

Theo như mình hiểu thì API là một "con" chuyên đảm nhận một nhiệm vụ duy nhất: đó là xử lí dữ liệu (truy vấn, thêm, sửa, xóa). Còn việc hiển thị ra thì sẽ là nhiệm vụ của một "con" khác, có thể là web, có thể là mobile (android, iOS). Điều này giúp cho ta có thể phát triển ứng dụng trên nhiều nền tảng khác nhau mà chỉ cần đổ dữ liệu ra ngoài giao diện.
## API làm việc như thế nào?
Vậy API làm việc như thế nào? Phía người dùng gửi request, API sẽ gửi lại response là liệu có thể làm được cái người dùng muốn hay ko. Và API được xây dựng trên **2 thành phần** chính: **Request** và **Response**.
### Request:
Một cái request đúng chuẩn cần có 4 thứ: 
1. **URL**: là 1 cái địa chỉ duy nhất cho 1 request, thường là đường dẫn tới một hàm xử lí logic.
2. **Method**: là cái hành động người dùng muốn tác động lên dữ liệu. Có 4 loại Method hay được dùng và rất quen thuộc là: **GET**, **POST**, **PUT**, **DELETE**.
3. **Headers**: nơi chứa các thông tin cần thiết của 1 request nhưng người dùng không biết có sự tồn tại của nó. Ví dụ: độ dài của request body, thời gian gửi request, loại thiết bị đang sử dụng, ...
4. **Body**: nơi chứa thông tin mà người dùng sẽ điền. Giả sử bạn đặt 1 cái bánh pizza, thì thông tin ở phần body sẽ là: Loại bánh pizza, kích cỡ, số lượng đặt.
### Response:
Sau khi nhận được request từ phía người dùng,  API sẽ xử lý cái request đó và gửi ngược lại cho người dùng 1 cái response. Cấu trúc của 1 response tương đối giống phần request nhưng Status code sẽ thay thế cho URL và Method. Tóm lại, nó có cầu trúc 3 phần:
1. **Status code**: là những con số có 3 chữ số và có duy nhất 1 ý nghĩa, ví dụ như vài lỗi thần thánh quen thuộc  “**404 Not Found**” hoặc “**503 Service Unavailable**”. Bạn có thể tìm hiểu cụ thể từng loại mã và ý nghĩa của nó [tại đây](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
2. **Headers**: giống với headers trong request.
3. **Body**: tương đối giống với trong request.


## Vì sao phải test API?
+ Như mình có giới thiệu ở phần đầu, phần xử lý API và phần giao diện hiển thị sẽ là 2 "con" độc lập với nhau, và khi xảy ra lỗi, sẽ có trường hợp là lỗi API hoặc lỗi hiển thị hoặc có thể là cả 2. Vì vậy, ta cần test API để biết chính xác vấn đề sinh ra lỗi nằm ở đâu, từ đó giải quyết vấn đề nhanh chóng hơn.
+ Hoặc khi làm hệ thống web services, dự án của mình chỉ viết API cho bên khác dùng, mình sẽ không có phần hiển thị dữ liệu để test giống như các dự án khác nên phải test API hoàn toàn.

## Vậy test API thì phải làm như thế nào?
Đến phần chính của bài viết rồi đây,  khi gặp phải vấn đề đặt ra ở phần mở đầu, mình bắt đầu đi tìm hiểu và tìm thấy một công cụ rất hữu dụng và được khá nhiều người sử dụng khi muốn test API. Đó chính là **Postman**.

**Postman** là 1 công cụ để test API của cty Postdot Technologies được bắt đầu phát triển từ năm 2012. Hiện tại Postman có 3 phiên bản: Postman (miễn phí), Postman Pro (2016) và Postman Enterprise (2017). 

+ Bước đầu tiên chính là tiến hành cài đặt. Bạn có thể tải phần mềm từ [trang chủ](https://www.getpostman.com/) hoặc cũng có thể cài đặt như một [extension trên trình duyệt chrome](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en). Công việc của bạn chỉ là click và chờ đợi thôi.

+ Khi chạy postman, bạn sẽ thấy giao diện như thế này: 
![](https://images.viblo.asia/cba7c839-2304-440f-a859-9ba5daecc5e4.png)

     - Bạn có thể dễ dạng nhìn thấy ở phía trên màn hình có phần để chọn **phương thức** (**GET**/**POST**/...)  và điền **URL** để gửi request đến API. Ngay bên dưới có phần **Authorization** (Oauth1, 2,  Basic Auth) để có thể test những URL bắt buộc xác thực người dùng (đăng nhập) thì mới cho truy cập.

    - Phần chiếm diện tích lớn nhất sẽ làm nhiệm vụ trả lại kết quả mà API trả về. Từ đó bạn có thể biết được API có đang làm việc bình thường hay không và đưa ra phương án giải quyết.

    - Ngoài ra, cột bên tay trái có chứa **History** lưu lại lịch sử những request mà ta từng gửi trước đó và **Collection** là một tập hợp của nhiều request. Những request liên quan tới nhau thì ta gom lại vào chung 1 collection để dễ quản lý hơn.
+ Và đây là hình ảnh minh hoạ khi bản kiểm tra API của github (sử dụng method GET)
![](https://images.viblo.asia/9c03a973-234e-4101-a740-55e8a8712ed2.jpg)
## Ưu, nhược điểm của Postman:
Mình cũng mới tìm hiểu nên cũng không dám chắc chắn, đây chỉ là một số ưu, nhược điểm mà mình cảm nhận sau quá trình sử dụng:
+ **Ưu**:
     - Dễ sử dụng, hỗ trợ cả chạy bằng UI và non-UI.
     - Hỗ trợ cả RESTful services và SOAP services.
     - Có chức năng tạo API document.   
+ **Nhược**:
     - Những bản tính phí mới hỗ trợ những tính năng advance: Làm việc theo team, support trực tiếp…
# Kết:
Trên đây mình đã giới thiệu một số thông tin mà mình tìm hiểu được khi tìm và làm việc với Postman. Tuy ít nhưng mình tin đó là đủ để các bạn có thể thực hiện được mục tiêu đề ra. Đó chính là test API. Có thể có nhiều chức năng hay nữa mà mình chưa biết, hoặc chưa liệt kê ra, các bạn có thể tìm hiểu và chia sẻ với mình nhé.

Mong rằng bài viết sẽ giúp ích cho các bạn newbie, còn với những ai đã có nhiều kinh nghiệm có thể góp ý thêm cho mình để mình có thể hoàn thiện hơn. Rất cảm ơn các bạn đã dành thời gian để đọc bài.
# Tài liệu tham khảo:
http://giangtester.com/api-testing-voi-postman-phan-1/

https://techtalk.vn/nghich-ngom-restapi-voi-postman-goi-api-dau-co-gi-kho.html

https://toidicodedao.com/2017/01/10/goi-rest-api-voi-postman/