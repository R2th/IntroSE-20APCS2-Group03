# Postman là gì?
Postman là một App Extensions, cho phép làm việc với các API, nhất là REST, giúp ích rất nhiều cho việc testing. Hỗ trợ tất cả các phương thức HTTP (GET, POST, PUT, DELETE, OPTIONS, HEAD ...) Postman cho phép lưu lại các lần sử dụng. Sử dụng cho cá nhân hoặc team lớn.
# Cài đặt
Là một công cụ mã nguồn mở (Open Source), Postman có thể dễ dàng tải về. Truy cậo trang chủ [link](https://www.getpostman.com/) và chọn nền tảng muốn cài đặt như cho Mac, Windows hoặc Linux rồi tiến hành cài đặt.
# Cách sử dụng
## Làm việc với request get
Request GET được sử dụng để truy vấn thông tin được truyền vào từ URL. Điều này sẽ không làm thay đổi gì với endpoint.
Chúng ta sẽ sử dụng URL bên dưới cho các ví dụ trong bài này:
> https://jsonplaceholder.typicode.com/users

Trong workspace
1. Thiết lập request HTTP của bạn là GET
2. Trong trường URL yêu cầu, nhập vào link
3. Kích nút Send
4. Bạn sẽ nhìn thấy message là 200 ok
5. Sẽ hiển thị kết quả 10 người dùng trong phần Body của bạn.

![](https://images.viblo.asia/30633904-0058-4121-a4ce-ea27abdd45ac.png)

* Chú ý: Có thể có nhiều trường hợp request GET không thành công. Nó có thể là do URL của request không hợp lệ hoặc do chứng thực không thành công(authentication).
### Hướng dẫn pass authentication
Như các bạn cũng biết, khi sử dụng một ứng dụng nào đó thì chúng ta hay phải tạo một tài khoản để có thể đăng nhập vào ứng dụng đó. 

Khi vào một trang web bán hàng chẳng hạn, khi bạn muốn thực hiện chức năng thêm vào giỏ hàng thì yêu cầu bạn phải đăng nhập mới có thể thực hiện chức năng đó. Đúng vậy có những chắc năng mà bạn phải đăng nhập mới có thể thưc hiện được.

Để có thể test một chức năng trên postman mà yêu cầu bạn phải đăng nhập thì postman cho phép bạn truyền lên header của nó một biến Authorization có value là dạng chuối mã hóa Base64. Giá trị này chính là giá trị access_token của user khi user đó đăng nhập vào hệ thống.

Thực hiện: Chuyến đến tab header, thêm key Authorization và giá trị access_token của user đang đăng nhập.

![](https://images.viblo.asia/9b04f55b-2f87-4616-ae04-94e6eb28a2f2.png)
### Hướng dẫn pass basic authen

### Phân biệt Authorization và Authentication
Authentication và Authorization hai khái niệm này liên quan chặt chẽ đến nhau. Trong khi Authentication cho phép hệ thống biết bạn là ai thì Authorization là quá trình cho phép hoặc từ chối ai đó truy cập vào một cái gì khi mà Authentication được thực hiện.

Chắc hẳn khi làm việc trong các dự án, khi các bạn test trên môi trường staging có lẽ đã gặp trường hợp phải pass qua basic authen.

Basic Access Authentication(Xác thực truy cập cơ bản) là loại đơn giản và cơ bản nhất hiện có. Nó chỉ kiểm tra ủy quyền của 1 người nào đó (đó là lí do tại sao chúng ta gọi xác thực truy cập cơ bản).

### Hướng dẫn pass basic authen trong postman
Sử dụng endpoint: https://postman-echo.com/basic-auth với GET request

Tạo một request GET với endpoint: https://postman-echo.com/basic-auth và nhấn nút create ta sẽ thấy trả về Unauthorized.

![](https://images.viblo.asia/a4080cb0-7e0e-4a1a-873c-ede2d6edc3dd.png)

Bây giờ chúng ta sẽ xác thực bằng mã hóa postman.

Chọn tab Authorization và click Basic Auth

![](https://images.viblo.asia/ddfd7e5c-27a5-44da-a2ba-ab599f6e3ea5.png)

Nhập username là postman và pasword là pasword sau đó click Preview Request. Sau đó click Send. Bạn sẽ thấy kết quả trả về  "authenticated": true Vậy là chúng ta đã pass basic authen trong postman.

![](https://images.viblo.asia/a4d0df6c-17ed-4de3-b356-faf5637fdb77.png)
## Làm việc với request post
Request post khác với request get ở chố request post có thao tác dữ liệu.
Bước 1: Kích dấu + để thêm mới một tab cho request mới:
![](https://images.viblo.asia/bba1969c-bfc5-45c0-95d4-beb492dace7d.png)

Bước 2: Trong tab mới
1. Thiết lập request HTTP là POST
2. Nhập vào link với url: https://jsonplaceholder.typicode.com/users
3. Chuyển tới tab Body
![](https://images.viblo.asia/8602b938-ac2b-4ad1-9bb2-e7b454b6ae45.png)

Bước 3: Trong tab Body
1. Click chọn raw
2. Select JSON

![](https://images.viblo.asia/3df70364-3fda-473a-b9e4-856185254cba.png)

Bước 4: Copy và paste chỉ một user từ kết quả request trước như bên dưới. Đảm bảo rằng mã đã được sao chép chính xác với các dấu đóng mở. Thay đổi id thành 11 và đặt name bất kỳ tên nào bạn muốn. Bạn cũng có thể thay đổi các trường khác như address.
```
[
    {
        "id": 11,
        "name": "Krishna Rungta",
        "username": "Bret",
        "email": "Sincere@april.biz
	",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    }
]
```
![](https://images.viblo.asia/558931d7-339c-44d0-b34d-57500a7a2c6f.png)

* Chú ý: Request POST nên đúng định dạng để đảm bảo dữ liệu được yêu cầu sẽ được tạo. Kinh nghiệm để check dữ liệu JSON đúng định dang hay không, bạn có thể sử dụng tool như: https://jsonformatter.curiousconcept.com/

![](https://images.viblo.asia/731bc546-aa35-42fd-a678-06d47ebe43f6.png)

Bước 5: 
1. Kích nút Send
2. Status: 201 Created được hiển thị
3. Dữ liệu Post được hiển thị trong tab Body
![](https://images.viblo.asia/615e8c50-2d81-4f22-b58c-9a5c531b6e7f.png)
## Các thiết lập các tham số Request
Tham số hóa dữ liệu là một trong những tính năng hữu ích nhất của Postman. Để tạo cùng một request với dữ liệu khác nhau, bạn có thể sử dụng các biến với tham số. Những dữ liệu này có thể từ một tệp dữ liệu hoặc biến môi trường. Tham số hóa giúp tránh lặp lại các thử nghiệm tương tự  và có thể sử dụng để kiểm thử tự động.

Các tham số được tạo thông qua việc sử dụng dấu ngoặc kép: {{sample}}. Chúng ta hãy xem một ví dụ về việc sử dụng các tham số trong request trước đây
![](https://images.viblo.asia/85e4f48f-ec19-4e2a-9dee-06320931ec7d.png)

Bây giờ hãy tạo một tham số cho request

Bươc  1:
1. Thiết lập request HTTP là GET
2. Nhập vào 1 link: https://jsonplaceholder.typicode.com/users. Thay thế phần đầu tiên của link bằng một biến như {{url}}. URL request lúc này sẽ là {{url}}/users.
3. Kích nút Send

Không nhận đựoc giá trị nào vì chúng ta chưa đặt giá trị cho biến này.
![](https://images.viblo.asia/5ff5bb5c-6739-45ef-93a4-4fdc5ca7637e.png)

Bước 2: Để sử dụng biến này bạn cần thiết lập môi trường
1. Kích vào biểu tượng mắt
2. Kích Edit để thiết lập biết cho sử dụng toàn cục mà sẽ được sử dụng trong tất cả các collection
![](https://images.viblo.asia/78b4ca0e-0bc0-411a-83b6-15681c65491a.png)

Bước 3:
1. Thiết lập tên url: https://jsonplaceholder.typicode.com
2. Kích nút Save
![](https://images.viblo.asia/dde11aca-106b-49b2-b3c4-ff03b5d3a74b.png)

Bước 4: Kích Close nếu bạn muốn đóng màn hình này
![](https://images.viblo.asia/4ad77ab8-c20f-4fd6-a07c-67fa421a136c.png)

Bước 5: Trở lại request GET và kích nút Send. Bạn sẽ nhìn thấy kết quả của bạn
![](https://images.viblo.asia/1862d767-02f6-4554-b4a8-1dc42ed0db93.png)

## Cách tạo colection
Collection đóng một vai trò quan trọng trong việc tổ chức các bộ thử nghiệm. Nó có thể được import và export để dễ dàng chia sẻ các collection giữa các nhóm. Trong hướng dẫn này, chúng ta sẽ tìm hiểu cách tạo và thực hiện một bộ sưu tập.

Bắt đầu tạo một collection:

Bước 1: Click vào nút New ở góc trái của trang:

![](https://images.viblo.asia/08cd97b7-4e8f-47c1-8c32-d32ea706ec20.png)

Bước 2: Chọn Collection, Cửa sổ tạo Collection sẽ hiển thị ra:

![](https://images.viblo.asia/4dbcf31c-88f3-4db3-8256-689452525240.png)

Bước 3: Nhập vào tên Collection và mô tả. Sau đó nhấn nút Create, sau đó 1 collection sẽ được tạo ra:

![](https://images.viblo.asia/82097175-1fec-4d41-b7b0-c78548c59c83.png)

Bước 4: Trở lại request GET lần trứoc và kích nút Save:

![](https://images.viblo.asia/d5c89f56-bb21-45df-92e7-c99d450c017b.png)

Bước 5: 
* Chọn Postman Test Collection.
* Kích nút Save to Postman Test Collection

![](https://images.viblo.asia/300d140d-b7f3-4075-931c-6fa77c9de4d3.png)

Bước 6: Postman test collection bấy giờ sẽ chứa một request

![](https://images.viblo.asia/4c5ba82b-f18b-412f-8804-94c99e83eeb6.png)

Bước 7: Lặp lại Bước 4-5 cho request POST phần trước. Collection bây giờ sẽ có hai request.

![](https://images.viblo.asia/c600abae-d820-4e45-9585-77ac6f938570.png)

## Cách chạy Collection sử dụng Runner
Có hai cách để chạy một collection đó là sử dụng Collection Runner và  Newman. Hãy bắt đầu thực thi collection bằng Collection Runner.

Bước 1: Kích nút Runner ở góc trên bên cạnh nút Import

![](https://images.viblo.asia/7d9a1018-93a0-4f28-9ad0-c3be77267a2f.png)

Bước 2:  Trang Collection Runner sẽ xuất hiện như ở bên dưới. Theo các mô tả ở các trường bên dưới.

![](https://images.viblo.asia/8c6178be-4e53-4cd1-988e-b66d700cb857.png)

Bước 3: Chạy Postman Test Collection bằng cách thiết lập sau:

- Chọn Postman test collection- Thiết lập Iterations là 3
- Thiết lập Delay là 2500 ms
- Kích nút Run Postman Test…

![](https://images.viblo.asia/50e578bd-a147-4da5-a4b3-92b5f745ce21.png)

Bước 4 Trang kết quả chạy sẽ được hiển thị sau hi kích nút Run. Phụ thuộc và delay, bạn sẽ nhìn thấy kết quả mà chúng thực hiện.

- Khi test kết thúc, bạn có thể nhìn thấy trạng thái nếu nó Passed hoặc Failed và kết quả mỗi lần lặp (iteration).
- Bạn nhìn thấy trạng thái Pass cho các request GET
- Khi chúng ta không có bất kỳ thử nghiệm nào cho POST, sẽ có một message hiển thị “This request did not have any tests”.

![](https://images.viblo.asia/43a97878-8632-417f-ad0b-7381c718040f.png)

Bạn có thể thấy tầm quan trọng của việc có các test trong các requesst để bạn có thể xác minh trạng thái HTTP nếu thành công và dữ liệu được tạo hoặc truy xuất.
# Kết luận
Bài viết trên đây cho bạn biết cách sử dụng cơ bản của POSTMAN, một công cụ rất tuyệt vời giúp cho các developer khi cần test cách truyền params hoặc kết quả respond từ API trả về.
# Tham khảo
https://www.guru99.com/postman-tutorial.html

https://www.toolsqa.com/postman/basic-authentication-in-postman/