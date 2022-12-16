## Mở đầu 
 **Vấn đề**: Để thực hiện các thao tác CRUD 1 resource có nhiều cách xây dựng và để tạo thuận lợi cho việc tái sử dụng thì phải có các tiêu chuẩn chung. Các tiêu chuẩn này (hay còn được gọi là Web API hoặc HTTP API) quy định một cách thống nhất việc quản lý các resource của web. RESTful là một trong số đó. Chúng ta sẽ cùng nhau đi tìm hiểu về RESTful cũng như ứng dụng của nó trong Laravel.
### 1. RESTful API là gì?

* **REST (Representational State Transfer)**: là một loạt hướng dẫn và dạng cấu trúc dùng cho việc chuyển đổi dữ liệu dựa trên giao thức không trạng thái ( thường là HTTP) để tương tác
* **API (Application Programming Interface)** : phương thức kết nối với các thư viện và ứng dụng khác 

  **=> Vậy RESTful API là những API đi theo cấu trúc REST.**
### 2. HTTP method theo chuẩn RESTful API:
* **GET** : truy xuất tài nguyên (READ) 
* **POST** : tạo tài nguyên mới ( CREATE)
* **PUT / PATCH**: cập nhật, sửa đổi tài nguyên (UPDATE)
* **DELETE** : xóa tài nguyên ( DELETE)

### 3. RESTful API trong Laravel:
- Các route theo chuẩn RESTful API được viết trong file routes/api.php
 
    Ví dụ nhanh:
    
    ![](https://images.viblo.asia/4ebb04c1-b050-4d75-b305-f3ca643121b3.png)
    
    Kết quả: test với route http://127.0.0.1:8000/api/users với method GET để lấy ra toàn bộ User
    
    ![](https://images.viblo.asia/2034c0c1-2916-407a-89f7-0d5a7c26ded2.png)
    
     Nhận xét: Dữ liệu trả về dưới dạng JSON. 
* Laravel cung cấp route resource để xây dựng RESTful API.
* Lệnh artisan tạo REST controller: 
`php artisan make: controller controller_name --resource`

  Lúc này, controller vừa tạo sẽ tự động render ra các phương thức:
  
 
    | METHOD | Ý NGHĨA | 
    | -------- | -------- |
    | index()     | Hiển thị danh sách tài nguyên     |
    | create() | Thêm mới |
    | store() | Lưu trữ 1 tài nguyên mới|
    |show($id)| Hiển thị 1 tài nguyên theo tham số truyền vào |
    | edit($id) | Sửa 1 tài nguyên theo tham số truyền vào |
    | update(Request $quest, $id) | Cập nhật 1 tài nguyên theo tham số truyền vào |
    | destroy($id) | Xóa 1 tài nguyên theo tham số truyền vào |


**Ví dụ**: 

![](https://images.viblo.asia/6165d81c-a93f-499e-9c47-73225040e579.png)

Trong Laravel ta có thể gom các route này bằng 1 câu duy nhất: 
```
Route::resource('users', 'Admin\UserController);
```

Method **index()** trong Controller:

![](https://images.viblo.asia/1ac82441-878b-4ecd-87b9-e95598608fc6.png)

Test route: http://127.0.0.1:8000/api/users/ với phương thức GET

![](https://images.viblo.asia/652b3c82-cc4d-4acf-b9fb-9a95a0633792.png)

Method **store()** trong Controller:

![](https://images.viblo.asia/679712af-1560-486d-904b-5b8762df1980.png)

Test route: http://127.0.0.1:8000/api/users/ với phương thức POST

![](https://images.viblo.asia/1d89c417-b42c-46b8-929e-e351c59aa545.png)

Method **update()** trong Controller:

![](https://images.viblo.asia/7ef9e519-d4eb-4243-a96f-85388684a75f.png)

Test route: http://127.0.0.1:8000/api/users/ với phương thức PUT

![](https://images.viblo.asia/49ef32f2-610a-471d-a60c-ed35ab12133d.png)


### Lời kết

Bài viết này mình đã giới thiệu qua về RESTful API nói chung cũng như ứng dụng trong Laravel nói riêng. Bằng những ví dụ cơ bản phía trên hy vọng các bạn có thể hiểu và xây dựng được API theo mong muốn. Cảm ơn các bạn đã đọc bài. Nếu có sai sót các bạn hãy comment ở phía dưới nhé ;)

Nguồn tham khảo:
* https://www.toptal.com/laravel/restful-laravel-api-tutorial
* https://blog.pusher.com/build-rest-api-laravel-api-resources/