### 1. Mô hình MVC

![image.png](https://images.viblo.asia/beb9fe7b-f5c0-4cec-8c80-a82a2e8ce266.png)


- **Model** : là nơi chứa những nghiệp vụ tương tác với dữ liệu hoặc hệ quản trị cơ sở dữ liệu (mysql, mssql… ); nó
 s0ẽbao gồm các class/function xử lý nhiều nghiệp vụ như kết nối database, truy vấn dữ liệu, th• êm –• xóa •– sửa• 
dữ liệu…

- **View** : là nới chứa những giao diện như một nút bấm, khung nhập, menu, hình ảnh… nó đảm nhiệm nhiệm vụ
hiển thị dữ liệu và giúp người dùng tương tác với hệ thống.

- **Controller** : là nới tiếp nhận những yêu cầu xử lý được gửi từ người dùng, nó sẽ gồm những class/ function xử
lý nhiều nghiệp vụ logic giúp lấy đúng dữ liệu thông tin cần thiết nhờ các nghiệp vụ lớp Model cung cấp và
hiển thị dữ liệu đó ra cho người dùng nhờ lớp View.

- Tương tác giữa các thành phần:
    - Controller tương tác với qua lại với View
    - Controller tương tác qua lại với Model
    - Model và View không có sự tương tác với nhau mà nó tương tác với nhau thông qua Controller.

### 2. API
- API viết tắt là Application Programming Interface - giao diện lập trình ứng dụng. Nó cung cấp khả năng giao tiếp trao đổi giữa các ứng dụng thông qua internent.

![image.png](https://images.viblo.asia/83b1d6c3-68a6-49b8-8319-c3acd026d688.png)


- Ở phần trước khi không sử dụng api .net 6 thì ứng dụng sẽ bao gồm phần backend và frontend chung.
![image.png](https://images.viblo.asia/3de2e020-771b-4d51-a498-e639bad3588f.png)

- Khi sử dụng web api thì thường sẽ chia backend ra riêng và frontend ra riêng. Và frontend website sẽ giao tiếp với backend qua API hoặc
có các app mobile sẽ giao tiếp với backend qua API.
 - Ứng dụng web
    
![image.png](https://images.viblo.asia/6032e035-c436-499c-bed2-0ee9d0b54266.png)


  
   - Ứng dụng mobile
   
   ![image.png](https://images.viblo.asia/0f50416d-3ea0-4ad3-a922-13f09802fe82.png)
   
###    3. Restful là gì?

- **RESTful API** là một tiêu chuẩn dùng trong việc thiết kế API cho các ứng dụng web (thiết kế Web services) để tiện cho việc quản lý các resource. Nó chú trọng vào tài nguyên hệ thống (tệp văn bản, ảnh, âm thanh, video, hoặc dữ liệu động…), bao gồm các trạng thái tài nguyên được định dạng và được truyền tải qua HTTP.
   ![image.png](https://images.viblo.asia/0df70364-0159-43cf-bdd7-705076d2cdd6.png)
   
- Các giao thức HTTP:
    -  **GET** (SELECT): Trả về một Resource hoặc một danh sách Resource.
    -  **POST** (CREATE): Tạo mới một Resource.
    -  **PUT** (UPDATE): Cập nhật thông tin cho Resource.
    -  **DELETE** (DELETE): Xoá một Resource.
- Những phương thức hay hoạt động này thường được gọi là CRUD tương ứng với Create, Read, Update, Delete – Tạo, Đọc, Sửa, Xóa.

### 4. Status code
- Khi chúng ta request một API nào đó thường thì sẽ có vài status code để nhận biết sau:

    - 200 OK – Trả về thành công cho những phương thức GET, PUT, PATCH hoặc DELETE.
    - 201 Created – Trả về khi một Resouce vừa được tạo thành công.
    - 204 No Content – Trả về khi Resource xoá thành công.
    - 304 Not Modified – Client có thể sử dụng dữ liệu cache.
    - 400 Bad Request – Request không hợp lệ
    - 401 Unauthorized – Request cần có auth.
    - 403 Forbidden – bị từ chối không cho phép.
    - 404 Not Found – Không tìm thấy resource từ URI
    - 405 Method Not Allowed – Phương thức không cho phép với user hiện tại.
    - 410 Gone – Resource không còn tồn tại, Version cũ đã không còn hỗ trợ.
    - 415 Unsupported Media Type – Không hỗ trợ kiểu Resource này.
    - 422 Unprocessable Entity – Dữ liệu không được xác thực
    - 429 Too Many Requests – Request bị từ chối do bị giới hạn

- Đọc thêm về http code: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

- Tương ứng với trong .NET 6:
    - return Ok(Value) : trả về http code 200 và kết quả.
    - return BadRequest(): trả về http code 400
    - return NotFound(): trả về http code 404
    - return NoContent(): trả về http code 204
    - return new UnsupportedMediaTypeResult(): trả về http code 415

- Trả về HTML
    - Phương thức View() sẽ trả về một ViewResult là một HTML response.
    - Phương thức PartialView() sẽ trả về một phần của View. Sử dụng khi muốn cập nhật 1 phần của view mà không muốn load lại toàn bộ view (hữu ích trong Single Page Application)

- Trả về File
    - FileContentResult: đọc một mảng byte và trả về như một file.
    - FileStreamResult: đọc một luồng stream và trả về một file.
    - VirtualFileResult: đọc nội dung file từ một đường dẫn tương đối trên hosting và trả về cho client.
    - PhysicalFileResult: đọc nội dung file từ một đường dẫn vật lý và trả về cho client.
- Trả về nội dung văn bản
    - Content(value): ActionResult trả về một nội dung cụ thể như một văn bản thuần.
    - new JsonResult(value): ActionResult này trả về dữ liệu định dạng JSON. Có thể chuyển một object sang Json và trả về cho client
    ![image.png](https://images.viblo.asia/85ea52e4-6077-4dfa-a6ba-6851afcdd1cc.png)
    
- Đọc thêm về Json: https://www.w3schools.com/js/js_json_intro.asp  

### 5. Thực hành MVC API

- Tạo 5 api:
    - GET: api/categories
    - GET: api/categories/{id}
    - POST: api/categories
    - PUT: api/categories/{id}
    - DELETE: api/categories/{id}

- Cài đặt postman để test api: https://www.postman.com/downloads/

### 6. Sử dụng Javascript làm frontend để call api

- Tham khảo: https://learn.microsoft.com/vi-vn/aspnet/core/tutorials/web-api-javascript?view=aspnetcore-6.0

- **Bài tập về nhà:** Làm chức năng create new categories, update category và delete category.

### 6. Routing trong .net core
- Routing là quá trình điều hướng các URL request đến đúng các controller và action tương ứng.
![image.png](https://images.viblo.asia/88b3387a-b935-409f-b2c2-42ffa9d498e7.png)

- Route template
    - Để url request tìm đến đúng controller action tương ứng cần có một template đóng vai trò như bản đồ chỉ dẫn.
    - Ví dụ: {controller=Post}/{action=GetByIdl}/{id?}
- Có 2 cách để cài đặt route template:
    - Attribute routing: Ví dụ: [Route("api/[controller]")]
    - Convention Based Routing: https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/routing?view=aspnetcore-6.0

### 7. Environment trong .NET 6

- Development: môi trường cho nhà phát triển
- Staging: môi trường để testing (gần giống production)
- Production: môi trường thực tế khách hàng sử dụng.
- Cấu hình (configuration) trong .net
    - .NET cung cấp appsettings.json file để lưu trữ các cấu hình cho ứng dụng.
    - Ví dụ: lưu trữ cấu hình ConnectionString đến cơ sở dữ liệu, thông tin tham số ứng dụng, đường dẫn thư mục hình ảnh,....
 ![image.png](https://images.viblo.asia/65d7de56-6c05-452e-b9ff-bf30b4df53a3.png)
 
- Cấu hình (configuration) tùy theo môi trường
    -  appsettings.json
    - appsettings.Development.json cho môi trường development.
    - appsettings.Staging.json cho môi trường staging.
    - appsettings.Production.json cho môi trường production.
- launchSettings.json sẽ dựa vào ASPNETCORE_ENVIRONMENT để biết ứng dụng đang chạy môi trường nào.
 ![image.png](https://images.viblo.asia/fead4cd7-539d-44a6-a1ba-21639886447c.png)

### 8. Đọc file cấu hình appsettings.json bằng IConfiguration
![image.png](https://images.viblo.asia/5f4ac9b0-a9ff-413a-8f62-9a60395f9648.png)

- Tham khảo: https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-6.0

- Binding data trong file cấu hình thành object với IOptions
    - Khai báo dependence injection: `builder.Services.Configure<PositionOptions>(builder.Configuration.GetSection("Position"));`
    - Sử dụng IOptions Inject vào constructor:
![image.png](https://images.viblo.asia/251ca1be-f65a-4534-bd9d-5ecc08b01054.png)

- Lấy giá trị connection string từ appsettings.json
![image.png](https://images.viblo.asia/bf6cc87e-ead2-4f29-827c-f216b3cba634.png)



### Tham khảo:

- https://medium.com/@joespinelli_6190/mvc-model-view-controller-ef878e2fd6f5
- https://www.geeksforgeeks.org/benefit-of-using-mvc/
- https://topdev.vn/blog/api-la-gi/
- https://www.guru99.com/what-is-api.html
- https://viblo.asia/p/restful-api-la-gi-1Je5EDJ4lnL
-  https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
-  https://learn.microsoft.com/vi-vn/aspnet/core/tutorials/web-api-javascript?view=aspnetcore-6.0