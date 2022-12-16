## Rest là gì?
REST (REpresentational State Transfer) là một dạng chuyển đổi cấu trúc dữ liệu, một kiểu kiến trúc để viết API.
Nó sử dụng phương thức HTTP đơn giản để tạo cho giao tiếp giữa các máy. Vì vậy, thay vì sử dụng một URL cho việc xử lý một số thông tin người dùng, REST gửi một yêu cầu HTTP như GET, POST, DELETE, vv đến một URL để xử lý dữ liệu.
Rest Api thường không được xem là công nghệ, mà nó là giải pháp giúp tạo ra những ứng dụng web services chuyên dụng để thay thế cho nhiều kiểu khác như: SOAP, WSDL,...

![image.png](https://images.viblo.asia/fcf0418f-a671-48ba-86c6-2ec77a7239bb.png)

## Restful API? 
RESTful API (còn được gọi là REST API) là một tập hợp các tiêu chuẩn dùng trong việc xây dựng và thiết kế API cho web services để việc quản lý các Resource trở nên dễ dàng hơn. 
Có thể dễ dàng nhận thấy rằng RESTful API chú trọng vào tài nguyên của hệ thống, những Resource này thường được định dạng sẵn và sử dụng HTTP để truyền tải đi.

![image.png](https://images.viblo.asia/7a008cbd-5c10-4ae4-bee6-0ae8d0f7ced5.png)


## RESTful hoạt động như thế nào?
REST hoạt động chủ yếu dựa vào giao thức HTTP. Các hoạt động cơ bản nêu trên sẽ sử dụng những phương thức HTTP riêng.

- GET (SELECT): Trả về một Resource hoặc một danh sách Resource.
- POST (CREATE): Tạo mới một Resource.
- PUT (UPDATE): Cập nhật thông tin cho Resource.
- DELETE (DELETE): Xoá một Resource.
Những phương thức hay hoạt động này thường được gọi là CRUD tương ứng với Create, Read, Update, Delete – Tạo, Đọc, Sửa, Xóa.

Ở thời điểm hiện tại, JSON được rất nhiều lập trình viên sử dụng làm format (định dạng) để viết RESTful API

## Authentication và dữ liệu trả về
RESTful API không sử dụng session và cookie, nó sử dụng một **access_token** với mỗi request. Dữ liệu trả về thường có cấu trúc như sau:
```
{
    "data":  {
        "id": 1,
         "name" : "Hana"
   }
}
```

## Ý nghĩa của các Status code
**200 OK** – Trả về thành công cho những phương thức GET, PUT, PATCH hoặc DELETE.     
**201 Created** – Trả về khi một Resouce vừa được tạo thành công.    
**204 No Content** – Trả về khi Resource xoá thành công.     
**304 Not Modified** – Client có thể sử dụng dữ liệu cache.    
**400 Bad Request** – Request không hợp lệ   
**401 Unauthorized** – Request cần có auth.      
**403 Forbidden** – bị từ chối không cho phép.      
**404 Not Found** – Không tìm thấy resource từ URI      
**405 Method Not Allowed** – Phương thức không cho phép với user hiện tại.     
**410 Gone** – Resource không còn tồn tại, Version cũ đã không còn hỗ trợ.     
**415 Unsupported Media Type** – Không hỗ trợ kiểu Resource này.     
**422 Unprocessable Entity** – Dữ liệu không được xác thực       
**429 Too Many Requests** – Request bị từ chối do bị giới hạn       

## Authorization
Hiện tại có 3 cơ chế Authorize chính:
- HTTP Basic
- JSON Web Token (JWT)
- OAuth2