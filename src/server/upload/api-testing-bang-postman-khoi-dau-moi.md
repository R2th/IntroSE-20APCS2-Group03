## 1. Postman là gì?

Hiện này postman là một trong những công cụ thông dụng nhất trong test API. Nó được ra đời từ năm 2012 và được sử dụng để đơn giản hóa việc test và develop dự án về API.
Trong bài viết này, chúng ta sẽ cùng tìm hiểu các cài đặt cũng như sử dụng công cụ này nhé.

## 2. Tại sao lại sử dụng Postman

Với hơn 4 triệu người dùng hiện nay, Postman đã trở thành công cụ được lựa chọn vì những lý do này:

* Tính linh động - Để sử dụng Postman, người ta chỉ cần đăng nhập vào tài khoản của chính họ để dễ dàng truy cập testcase mọi lúc, mọi nơi miễn là ứng dụng Postman được cài đặt trên máy tính.
* Sử dụng Collection - Postman cho phép người dùng tạo collection cho các API của họ. Mỗi collection có thể tạo các thư mục con và chứa nhiều request. Điều này giúp tổ chức các bộ testcase của bạn.
* Cộng tác - Collection và môi trường có thể được import hoặc export giúp dễ dàng chia sẻ testcase. Một liên kết cũng có thể được sử dụng để chia sẻ collection.
* Tạo môi trường - Có nhiều môi trường với mục đích dùng đi dùng lại ở các testcase khác nhau nên người ta có thể sử dụng cùng một collection nhưng khác môi trường.
* Tạo các testcase - Các testcase dùng để xác minh trạng thái phản hồi dữ liệu khi gọi API thành công có thể được thêm vào mỗi request gọi API giúp verify.
* Automation - Thông qua việc sử dụng collecion để chạy hoặc newman, các testcase có thể được chạy trong nhiều lần để tiết kiệm thời gian cho các bài test lặp đi lặp lại.
* Debugging - Bảng điều khiển Postman giúp kiểm tra dữ liệu nào đã được truy xuất giúp dễ dàng gỡ lỗi kiểm tra.
* Continuous Integration - Với khả năng hỗ trợ tích hợp liên tục, các hoạt động phát triển được đảm bảo tốc độ.

## 3. Tải và cài đặt

Là môt công cụ open source, Postman có thể dễ dàng để tải. Ở đây là các bước cài đặt:

**Bước 1** Đi đến [https://www.getpostman.com/downloads/](https://www.getpostman.com/downloads/) và chọn hệ điều hành của bạn (Mac, Windows hay Linux). Click download

![](https://images.viblo.asia/12e61358-fb51-4bda-973d-300984d0793b.png)

**Bước 2** Bắt đầu cài đặt

![](https://images.viblo.asia/87439d99-0c80-450f-bfce-9d7f28c99ffe.png)

**Bước 3** Sau cài đặt xong bạn cần đăng nhập vào tài khoản Postman

**Bước 4** Sau khi login bạn sẽ có màn hình như vậy

![](https://images.viblo.asia/b515d2df-963e-47d6-a3e6-971af21dd69c.png)

## 4. Làm thế nào sử dụng Postman

Bên dưới là workspace của Postman. Hãy khám phá những tính năng của công cụ này nhé

![](https://images.viblo.asia/4c8d504d-1a5f-4a28-9535-5898c5c34f26.png)

1. Tạo mới - Đây là nơi bạn sẽ tạo một request, collection hoặc môi trường mới.
1. Import - Chức năng này được sử dụng để import một collection hoặc môi trường. Có các tùy chọn như import bằng file, thư mục, liên kết hoặc nội dung text.
1. Runner - automation test có thể được thực hiện thông qua collection runner.
1. Mở mới - Mở một tab mới, cửa sổ mới hoặc cửa sổ chạy bằng cách chọn chức năng này.
1. My workspace - Bạn có thể tạo một workspace mới cá nhân hoặc theo nhóm.
1. Invite - Cộng tác trên một workspace bằng cách mời các thành viên trong nhóm.
1. Lịch sử - Các yêu cầu trong quá khứ mà bạn đã gửi sẽ được hiển thị trong Lịch sử. Điều này giúp bạn dễ dàng theo dõi các hành động mà bạn đã thực hiện.
1. Collection - Sắp xếp bộ testcase của bạn bằng cách tạo collection. Mỗi collection có thể có các thư mục con và nhiều request.
1. Request tab - Chức năng này sẽ hiển thị tiêu đề của request bạn đang làm việc. Theo mặc định, "Untitled Request" sẽ được hiển thị nếu không đặt tiêu đề.
1. HTTP Request - Nhấp vào đây sẽ hiển thị danh sách thả xuống của các request khác nhau như GET, POST, COPY, DELETE, v.v. Trong testcase, các request được sử dụng phổ biến nhất là GET và POST.
1. Request URL - Còn được gọi là endpoint, đây là nơi bạn sẽ xác định liên kết đến nơi API.
1. Lưu - Nếu có thay đổi đối với request, nhấp vào lưu sẽ bắt buộc để những thay đổi mới sẽ không bị mất hoặc ghi đè.
1. Params - Đây là nơi bạn sẽ thêm các tham số cần thiết cho một request, chẳng hạn như các giá trị.
1. Authorization - Để truy cập API, cần có quyền. Nó có thể ở dạng username và mật khẩu, bearer token, v.v.
1. Header - Bạn có thể đặt các header như content-type là application/json.
1. Body - Đây là nơi người ta có thể tùy chỉnh chi tiết trong một request thường được sử dụng trong request POST.
1. Pre-request Script - Đây là script sẽ được thực thi trước request. Thông thường, các pre-request script sẽ cài đặt môi trường trước khi gọi để đảm bảo các testcase sẽ được chạy trong môi trường chính xác.
1. Tests - Đây là các kịch bản được thực hiện trong khi request. Điều quan trọng là phải có các testcase vì nó thiết lập các điểm kiểm tra để xác minh xem trạng thái phản hồi có ổn không, dữ liệu được truy xuất như mong đợi và các testcase khác.

## 5. Làm việc với GET request

GET request được sử dụng để lấy thông tin từ 1 URL.

Chúng ta sẽ sử dụng URL sau cho tất cả các ví dụ trong bài này

```
https://5d8614461e61af001471c10d.mockapi.io/api/v1/users
```

Trong workspace

1. Đặt HTTP method của bạn là GET
2. Trong request URL, nhập link
3. Click Send
4. Bạn sẽ nhập được status 200
5. Sẽ trả về danh sách 10 user trong body mà bạn thấy như vậy

![](https://images.viblo.asia/f565beb5-91bd-4db7-ad56-b1075b4b06ab.PNG)

**Chú ý:** Có trường hợp GET request sẽ bị fail. Có thể do URL bị sai hoặc authentication cần phải setup

## 6. Làm việc với POST request

POST request khác với GET request là có truyền data cùng với user được thêm vào. Sử dụng cùng data ở ví dụ trước trong GET request, bây giờ chúng ta sẽ thử thêm dữ liệu của ta

**Bước 1** Click vào đây để thêm 1 request mới

![](https://images.viblo.asia/b43cb49c-ebbc-465c-bf30-472d024ad7e3.PNG)

**Bước 2** Trong new tab

1. Đặt HTTP method là POST
2. Nhập link giống như trên [](https://jsonplaceholder.typicode.com/users)
3. Chuyển qua tab Body

![](https://images.viblo.asia/3d5f3ffa-f7f4-4fd8-9e2a-8e0b02ee68ab.PNG)

**Bước 3** Trong Body

1. Click `raw`
2. Chọn `JSON`

![](https://images.viblo.asia/98293461-a4ab-4310-8eec-d6a342327cc2.PNG)

**Bước 4** Copy và paste 1 user từ GET request trước như bên dưới. Chắc rằng code đã được copy chính xác dấu ngoặt. Đổi id thành 11 và tên bất kỳ. Bạn cũng có thể thay đổi các thông tin khác ví dụ như phone

```
{
    "id": "1",
    "name": "Oanh Nguyen",
    "phone": "(933) 509-4049 x02250",
    "createdAt": "2019-09-20T12:53:44.950Z"
}
```

![](https://images.viblo.asia/f6ea9947-c1e0-457b-8234-0799479bdbd2.PNG)

**Bước 5** Tiếp tục

1. Click Send
2. Status 201 Created sẽ được hiển thị
3. Dữ liệu đã post sẽ được hiển thị ở đây

![](https://images.viblo.asia/f359c3bc-6fd2-4bd4-a935-37562222185e.PNG)

## 7. Làm thế nào để tham số hóa

Tham số hóa dữ liệu là một trong những tính năng hữu ích nhất của Postman. Thay vì tạo cùng một request với dữ liệu khác nhau, bạn có thể sử dụng các biến với tham số. Những dữ liệu này có thể từ một tệp dữ liệu hoặc một biến môi trường. Tham số hóa giúp ta tránh việc lặp lại các test tương tự nhau và có thể được sử dụng để automation test.

Tham số được tạo thông qua việc sử dụng dấu ngoặc kép: `{{sample}}`. Chúng ta hãy xem một ví dụ về việc sử dụng các tham số trong request này:

![](https://images.viblo.asia/f565beb5-91bd-4db7-ad56-b1075b4b06ab.PNG)

Hãy bắt đầu nào

**Bước 1**

1. Chọn HTTP method là GET
1. Nhập link: https://5d8614461e61af001471c10d.mockapi.io/api/v1/users. Thay phần domain ở đầu bằng tham số `{{url}}`. Request url sẽ như vậy `{{url}}/api/v1/users`.
1. Click send. 

![](https://images.viblo.asia/a25db6a4-1815-4fe6-9886-43c3b7a3fc8d.PNG)

**Bước 2** Để sử dụng được tham số, bạn cần phải tạo môi trường

1. Click vào biểu tượng con mắt
1. Click edit để đặt global enviroment để có thể sử dụng ở tất cả các collection.

![](https://images.viblo.asia/7a519bbf-b4ae-45cb-8478-7a238e5d3eb1.PNG)

**Bước 3** Trong phần biến,

1. Đặt tên là `url` và giá trị là `https://5d8614461e61af001471c10d.mockapi.io`
1. click Save.

![](https://images.viblo.asia/a46de731-63a0-4274-8a4f-80070d01d104.PNG)

**Bước 4** Trở lại và chọn send. Bạn sẽ thấy kết quả hiện ra.

![](https://images.viblo.asia/5714a1fa-937c-45f5-90b2-6ba7ba968aac.PNG)

## Tham khảo

* [Postman Tutorial for Beginners with API Testing Example](https://www.guru99.com/postman-tutorial.html)