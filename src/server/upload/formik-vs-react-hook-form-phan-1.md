Các lập trình viên Front End đều làm việc rất nhiều với form cùng sự phức tạp của ứng dụng. Do vậy chúng ta cần những thư viện form mạnh mẽ hỗ trợ quản lý các form state, form validation...

Bài viết này giới thiệu 2 thư viện form phổ biến trên đó là [Formik](https://formik.org/) và [React Hook Form](https://react-hook-form.com/).

### Thành phần module

[Formik bao gồm có 9 dependencies khác](https://bundlephobia.com/result?p=formik@1.5.8)

![](https://images.viblo.asia/d0644435-aae3-4708-8fbf-7f5c16d9431e.png)


[React Hook Form thì không có](https://bundlephobia.com/result?p=react-hook-form@3.24.0)

![](https://images.viblo.asia/30af16a9-3f85-4b35-8161-02b5c8fe2f78.png)

### Controlled & UnControlled Component

**Formik** chỉ hỗ trợ **Controlled component** còn **React Hook Form** thì hỗ trợ cả hai.

**Controlled component** lấy các value thông qua props và thông báo nếu có sự thay value  qua 1 callback kiểu như **onChange**. Component cha sẽ "controls" nó sẽ xử lý callback đó và quản lý các state của chính nó và truyền props value mới cho các **Controlled component**.

**[Controlled component với React Hook Form](https://react-hook-form.com/api#Controller)**

**[Controlled component với Formik](https://formik.org/docs/api/field)**

**Uncontrolled component** là nơi quản lý các state nội bộ và khi cần sử dụng thì bạn sẽ truy vấn đế DOM sử dụng ref để tìm các giá trị hiện tại.



| Feature | Uncontrolled | Controlled |
| -------- | -------- | -------- |
| Truy xuất giá trị 1 lần (Ví dụ: on submit)     | :white_check_mark:     | :white_check_mark:     |
| Validating    | :white_check_mark:     | :white_check_mark:     |
| Điều kiện để disable submit button     | :x:     | :white_check_mark:     |
| Mỗi input cho 1 phần của dữ liệu     | :x:     | :white_check_mark:     |
| Dynamic input     | :x:     | :white_check_mark:     |


### Re-rendering

Chúng ta đều cần tránh các re-render không cần thiết càng nhiều càng tốt để đảm hiệu năng khi ứng dụng phát triển lớn hơn.

![](https://images.viblo.asia/1ccb010f-7fc7-4fdb-84c6-27bd9fd9b9e9.jpeg)


### Các fields phụ thuộc

Với **React Hook Form** thì [watch Function](https://react-hook-form.com/api#watch)  sẽ giúp bạn theo dõi các input chỉ định và trả về giá trị của chúng để xác định nội dung cần render.

Với **Formik** thì mặc định đã bật theo dõi tất cả các field, bạn có thể thêm vào hoặc bỏ đi dựa vào các giá trị prop.

### Event

**React Hook Form** sẽ đọc các giá trị form bên trong các event.

*Lưu ý: Hàm **getValues()** sẽ không trigger các re-render hoặc các watch Function để thay đổi giá trị input*

Với **Formik** thì bạn có thể đọc các giá trị form thông qua các prop.

### Tóm tắt



| Feature | Formik | React Hook Form |
| -------- | -------- | -------- |
| Dung lượng     | 12.6kB     | 5.2kB     |
| Tải về hàng tuần    | 1,314,511     | 638,419     |
| Dependencies     | 9     | 0     |
| Các open Issue    | 498     | 6     |
| Hỗ trợ React Native     | :white_check_mark:      |:white_check_mark:      |
| Hỗ trợ TypeScript     | :white_check_mark:     | :white_check_mark:     |
| Dung lượng     | 12.6kB     | 5.2kB     |
| Hỗ trợ TypeScript     | :white_check_mark:     | :white_check_mark:     |
| Hỗ trợ Class component     | :white_check_mark:     | :x:     |
| Tài liệu rõ ràng    | :white_check_mark:     | :white_check_mark:     |
| Khả năng tích hợp    | :white_check_mark:     | :white_check_mark:     |








*Bài viết dịch từ: https://dev.to/doaashafik/formik-vs-react-hook-form-aei*