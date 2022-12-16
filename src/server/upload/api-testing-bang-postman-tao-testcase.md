Trở lại với chủ đề về "API Testing bằng Postman", ở phần trước, chúng ta đã tìm hiểu cách hoạt động của Postman, làm thế nào để dùng Postman để gọi một API hay làm sao để tham số hóa một API.
Lần này chúng ta sẽ tiếp tục với chủ đề làm thế nào để tạo được một testcase bằng Postman.

### 1. Tạo testcase

Postman Tests sử dụng Javascript thêm vào mỗi request để giúp chúng ta verify kết quả trả về thành công hay thất bại, so sánh với kết quả mong đợi ,...Đoạn mã thường bắt đầu bằng `pm.test`. Chúng có thể được dùng như các assert, verify command ở các công cụ khác.

Hãy bắt đầu tạo một test đơn giản với request mà chúng ta đã tạo ra ở bài trước

**Bước 1)** Đi đến GET request từ bài hướng dẫn trước

1. Chuyển qua tab `Tests`. Ở phía bên phải chọn snippet codes
2. Từ snippets, chọn "Status code: Code is 200"

Tại editor nó sẽ tự hiển thị thế này

![](https://images.viblo.asia/bb65e8b8-f220-429e-9397-7bec65071c2a.png)

**Bước 2)** Bây giờ click `Send`. Test result sẽ hiển thị

![](https://images.viblo.asia/66feb079-d8d3-414e-b5fa-05bf82dd155f.png)

**Bước 3)** Trở lại tests tab và thêm một test khác. Lần này chúng ta sẽ so sánh kết quả mong đợi với kết quả thực tế.

Từ snippets, click vào "Response body: JSON value check". Chúng ta sẽ kiểm tra nếu user đầu tiên là `Oanh Nguyen`

![](https://images.viblo.asia/5409628b-fa4e-40e3-80f8-ecf6989f5706.png)

**Bước 4)**

1. Đổi tên "Your Test Name" thành "Check first user is Oanh Nguyen" đây chính xác là tên của test case mà chúng ta muốn test
2. Đổi `jsonData.value` thành `jsonData[0].name`. Đến lấy thông tin, kiểm tra body của kết quả mới nhất trả về. "Oanh Nguyen" là user đầu tiên, `jsonData` của kết quả đầu tiên bắt đầu bằng số 0. Nếu bạn muốn lấy kết quả thứ 2 thì có thể sử dụng `jsonData[1]`
 và tập trung vào mong muốn của mình.
 3. Trong phương thức `eql`, nhập "Oanh Nguyen"
 
```
pm.test("Check first user is Oanh Nguyen", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData[0].name).to.eql("Oanh Nguyen");
});
```

![](https://images.viblo.asia/f3fca2d7-4fd9-46bb-a217-3f9527c722c7.png)

**Bước 5)** Click send. Chúng ta sẽ thấy có 2 test đã pass sau khi request thực hiện

![](https://images.viblo.asia/e8725834-6670-4b11-ae6d-2966c4da39ad.png)

**Chú ý:** Có nhiều loại test khác có thể tạo bởi Postman. Thử khám phá nhiều hơn để thấy những gì bạn cần

### 2. Tạo collection

Collection có vai trò quan trọng trong việc tổ chức test suite. Nó có thể được import và export dễ dàng để chia sẻ collection giữa các team member. Trong bài hướng dẫn này, chúng ta sẽ học làm thế nào để tạo và chạy được collection

Hãy bắt đầu tạo một collection:

**Bước 1)** Click vào button tạo mới ở góc trái màn hình

![](https://images.viblo.asia/a3c8dbc2-6a2d-4e71-963d-ab1a580851cd.png)

**Bước 2)** Chọn Collection. Cửa sổ tạo collection sẽ hiện lên

![](https://images.viblo.asia/61ecfb59-5f0b-448b-bcf1-ec5cb524385b.png)

**Bước 3)** Nhập tên collection và mô tả, tiếp theo click tạo. Một collection mới sẽ được tạo ở đây

![](https://images.viblo.asia/7fa89456-6721-47e2-8664-8fa87874b00a.png)

**Bước 4)** Trở lại Get request, click Save

![](https://images.viblo.asia/fd6d79ec-773d-416d-93ee-44098b9716e6.png)

**Bước 5)** 

1. Chọn "User collection"
2. Click `Save to "User collection"`

![](https://images.viblo.asia/bfa172bf-ed7c-4d86-a69a-514eb36b0184.png)

**Bước 6)** "User collection" bây giờ sẽ chứa request đã thêm vào

![](https://images.viblo.asia/578b690e-8843-4332-bbe0-26624c9dba36.png)

**Bước 7)** Lặp lại bước 4-5 của Post request bây giờ collection của chúng ta sẽ có 2 request

![](https://images.viblo.asia/6fc2bfc3-e7f7-4c7c-9f96-fc6e0fd57832.png)

## Tham khảo

- [Postman Tutorial for Beginners with API Testing Example](https://www.guru99.com/postman-tutorial.html)