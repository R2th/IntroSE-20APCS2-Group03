# 1. What is Postman?

Postman là một tool dùng để kiểm tra API trong testing, nó tích hợp nhanh vào CI/ CD. Nó ra đời vào năm 2012 để đơn giản hóa qui trình làm việc API trong testing và development. API là viết tắt của Application Program Interface (Giao diện chương trình ứng dụng), chương trình cho phép các ứng dụng phần mềm giao tiếp với nhau thông qua lệnh gọi API.
Và một điểm tôi muốn nhấn mạnh Application Program Interface nghe tên thì có đề cập đến giao diện nhưng API testing là test logic, test function...chứ không phải là test GUI.

# 2. Why Use Postman?

Với hơn 4 triệu người dùng hiện nay, Postman đã trở thành một công cụ được lựa chọn vì những lý do sau:

- Khả năng truy cập - Để sử dụng Postman, người ta chỉ cần đăng nhập vào tài khoản của chính họ để dễ dàng truy cập các tệp mọi lúc, mọi nơi miễn là ứng dụng Postman được cài đặt trên máy tính.
- Sử dụng Bộ sưu tập - Cho phép người dùng tạo bộ sưu tập cho các lệnh gọi API của họ. Mỗi bộ sưu tập có thể tạo các thư mục con và nhiều yêu cầu. Điều này giúp ích cho việc testsuite của bạn.
- Cộng tác - Bộ sưu tập và môi trường có thể được import hoặc export giúp dễ dàng chia sẻ tệp. Một liên kết trực tiếp cũng có thể được sử dụng để chia sẻ bộ sưu tập.
- Tạo môi trường test - Có nhiều môi trường hỗ trợ ít lặp lại bộ testcase vì người ta có thể sử dụng cùng một bộ sưu tập nhưng cho nhiều môi trường khác nhau. Đây là nơi tham số hóa sẽ diễn ra mà chúng ta sẽ thảo luận trong các bài học tiếp theo.
- Tạo các trường hợp cần test - Các quan điểm test như xác minh trạng thái phản hồi HTTP thành công có thể được thêm vào mỗi lệnh gọi API giúp đảm bảo phạm vi test.
- Test tự động - Thông qua việc sử dụng Bộ sưu tập chạy hoặc Newman, bộ testcase có thể được chạy trong nhiều lần lặp lại để tiết kiệm thời gian cho việc test các chức năng lặp đi lặp lại.
- Gỡ lỗi - Bảng điều khiển Postman giúp kiểm tra dữ liệu nào đã được truy xuất giúp dễ dàng gỡ lỗi.
- Tích hợp liên tục - Với khả năng hỗ trợ tích hợp liên tục, các hoạt động phát triển được duy trì.

# 3. Một số Request thường gặp
## 3.1. GET Request

GET request được sử dụng để lấy thông tin từ URL đã cho. Sẽ không có thay đổi được thực hiện đến điểm cuối.

Chúng ta sẽ sử dụng URL sau cho tất cả các ví dụ trong bài viết này

> https://reqres.in/api/users?page=2

![](https://images.viblo.asia/59fba373-f704-4829-8b5f-99f0e7c132ac.png)

Trong không gian làm việc

1. Đặt yêu cầu HTTP thành GET.
2. Trong trường URL yêu cầu, liên kết đầu vào
3. Click [Send] button
4. Bạn sẽ thấy Status: 200 OK
5. Kết quả thử nghiệm bên dưới trả về cho thấy testcase của bạn đã pass

```
{
    "page": 2,
    "per_page": 6,
    "total": 12,
    "total_pages": 2,
    "data": [
        {
            "id": 7,
            "email": "michael.lawson@reqres.in",
            "first_name": "Michael",
            "last_name": "Lawson",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg"
        },
        {
            "id": 8,
            "email": "lindsay.ferguson@reqres.in",
            "first_name": "Lindsay",
            "last_name": "Ferguson",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg"
        },
        {
            "id": 9,
            "email": "tobias.funke@reqres.in",
            "first_name": "Tobias",
            "last_name": "Funke",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg"
        },
        {
            "id": 10,
            "email": "byron.fields@reqres.in",
            "first_name": "Byron",
            "last_name": "Fields",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg"
        },
        {
            "id": 11,
            "email": "george.edwards@reqres.in",
            "first_name": "George",
            "last_name": "Edwards",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/mrmoiree/128.jpg"
        },
        {
            "id": 12,
            "email": "rachel.howell@reqres.in",
            "first_name": "Rachel",
            "last_name": "Howell",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg"
        }
    ],
    "ad": {
        "company": "StatusCode Weekly",
        "url": "http://statuscode.org/",
        "text": "A weekly newsletter focusing on software development, infrastructure, the server, performance, and the stack end of things."
    }
}
```

## 3.2. POST Requests

POST requests khác với GET request vì có thao tác dữ liệu với người dùng thêm dữ liệu vào điểm cuối. Cùng sử dụng một dữ liệu trong request GET trước đó, bây giờ thì hãy cùng thêm người dùng vào thông qua POST request nhé các bạn.

Step 1) Click a new tab to để tạo 1 request mới

Step 2) Trong new tab:

  2.1. Set HTTP request to POST
  2.2. Nhập link URL giống trong GET
  https://reqres.in/api/users
  2.3. Chuyển qua tab [Body]
  
Step 3) Trong [Body] tab
  
1. Click raw
2. Select JSON

Step 4) 
Copy và paste kết quả của 1 user từ request GET trước đó sau đó sửa thành như bên dưới. Đảm bảo rằng code đã được copy đúng. Thay đổi id thành 11 và thay đổi tên bằng bất cứ tên nào bạn muốn. Hoặc thay đổi các giá trị khác nữa là Avatar.

```
[
        {
            "id": 11,
            "email": "DuyenMy.bluth@reqres.in",
            "first_name": "Duyen",
            "last_name": "My",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"
        }
 ]
```

*Note:  POST request phải có định dạng chính xác để đảm bảo rằng dữ liệu được yêu cầu sẽ được tạo. Đó là một cách thực hành tốt để sử dụng GET trước để kiểm tra định dạng JSON của request.*

Step 5) 
1. Click Send.
2. Status: 201 Created should be displayed
3. Data post được hiển thị trong body

![](https://images.viblo.asia/d084f92d-b160-41b7-81fe-1e322bde198d.png)


# Làm thế nào để tham số hóa các yêu cầu

Tham số hóa dữ liệu là một trong những tính năng hữu ích nhất của Postman. Thay vì tạo cùng một yêu cầu với dữ liệu khác nhau, bạn có thể sử dụng các biến với tham số. Những dữ liệu này có thể từ một tệp dữ liệu hoặc một biến môi trường. Tham số hóa giúp tránh lặp lại các testcase tương tự và lặp lại có thể được sử dụng để test auto.

Các tham số được tạo thông qua việc sử dụng dấu ngoặc kép: {{sample}}. Chúng ta hãy xem một ví dụ về việc sử dụng các tham số trong yêu cầu trước nhé:

Bây giờ hãy cùng tôi tạo một tham số GET request nhé:

Step 1)

1. Set HTTP GET request
2. Nhập link: https://reqres.in/api/users?page=2. 
Thay đổi phần đầu tiên trong link với 1 tham số giống như {{url}}. Request url bây giờ trở thành {{url}}/api/users?page=2
4. Click send.

Kết quả: Không có phản hồi bởi vì chưa đặt nguồn tham số.

![](https://images.viblo.asia/07b66a51-9f7f-4ee4-b5ba-74f717157024.png)

Step 2) Để sử dụng tham số bạn cần đặt môi trường

1. Click vào biểu tượng con mắt
2. Click edit để set biến môi trường bạn sử dụng cho tất cả các bộ sưu tập

![](https://images.viblo.asia/64704c8f-18ab-45ad-bdab-75034e95ff95.png)

Step 3) Trong variable
1. Đặt tên đến url như là: https://reqres.in
2. Click Save.

![](https://images.viblo.asia/4c14f031-ed00-4601-a224-d75ccc0b3a5f.png)

Step 4) 
Click close if you see the next screen

![](https://images.viblo.asia/3f275ef5-8b46-434c-9aa3-b0ed40ce9c78.png)


Step 5) 
Trở lại GET request -> Click [Send] button. Trả về kết quả cho request của bạn.

![](https://images.viblo.asia/25d65131-49b8-4977-b3d9-4834e8828c07.png)

*Lưu ý: Luôn đảm bảo rằng các tham số của bạn có nguồn như biến môi trường hoặc tệp dữ liệu để tránh lỗi.*

# KẾT LUẬN:

Trên đây là một số khái niệm cơ bản về API testing để các bạn hình dung ra tại sao cần test API và 2 request thường gặp khi sử dụng postman để test API. Trong bài hôm sau tôi sẽ giới thiệu tiếp việc làm thế nào để tạo postman cho việc test, cách tạo bộ sưu tập và đóng gói bộ sưu tập thành file JSON.

Bài viết có tham khảo từ nguồn:
https://www.guru99.com/postman-tutorial.html