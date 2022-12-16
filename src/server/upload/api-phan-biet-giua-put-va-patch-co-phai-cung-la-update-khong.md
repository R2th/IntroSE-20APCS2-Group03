Khi bắt đầu học và làm quen với các khái niệm của API, chắc hẳn các bạn đã rất quen thuộc với các methods được giới thiệu

> RESTful APIs enable you to develop any kind of web application having all possible CRUD (create, retrieve, update, delete) operations - https://restfulapi.net

# RESTfull có những cơ bản sau:

| Method| Semantics | 
| -------- | -------- | -------- |
| POST | Create | 
| GET   | Read/Retrieve |
| PUT/PATCH | Update |
| DELETE  | Delete |
| -------- | -------- | -------- |

ỦA :roll_eyes: Hình như cả PUT và PATCH đều là UPDATE? Vậy thì nó giống nhau hay khác nhau? :thinking:

Đây cũng câu hỏi phỏng vấn phổ biến để hỏi ứng viên về bản chất của kiến thức của API. Chúng ta cùng làm rõ nó để khỏi bị lừa nhé :smiling_imp:

![image.png](https://images.viblo.asia/3fee03fc-c6a2-4bab-9e75-93428c37036b.png)

# What is PUT?
PUT là phương thức để chỉnh sửa resource khi Client gửi data và muốn update toàn bộ resource đó. PUT cũng có thể giống như POST - tạo ra một resource mới nếu như nó không tồn tại.
Nôm na đó là, khi sử dụng PUT để Update chúng ta phải tạo ra một bản ghi đầy đủ các field để yêu cầu cập nhật và nó sẽ thực hiện ghi đè nên các field đã tồn tại.

Ví dụ, mình có một record như sau:

*Method: GET*

![image.png](https://images.viblo.asia/6b237b4d-1f58-4847-8979-ef43f5c40e38.png)

Bây giờ, chúng ta sử dụng method PUT để update "doors" = 5

*Method: PUT *

![image.png](https://images.viblo.asia/76b002e3-18ac-4896-bce9-fc8be8b76157.png)

Sau đó chúng ta cùng xem thông tin đã được cập nhật như thế nào r nhé.

*Method: GET*

![image.png](https://images.viblo.asia/2277b77e-6b81-4d34-9008-0520a0909c7c.png)

Như vậy, "door" đã được cập nhật bằng 5 nhưng lại mất những fields khác vì trong request của method PUT đã không chứa đầy đủ tất cả các fields.

*Chú ý rằng, nếu như ban đầu chúng ta không có sẵn resource mà sử dụng method PUT. Nó sẽ thực hiện chức năng như POST để tạo mới một resource.*

# What is PATCH?

Cũng giống như PUT, PATCH được dùng để thay đổi data thế nhưng nó chỉ thay đổi những field được yêu cầu thay đổi thay vì toàn bộ resource

Lấy tiếp tục ví trên, nếu chúng ta sử dụng method PATH thì sẽ như sau:

*Method: PATCH*

![image.png](https://images.viblo.asia/8d89d8c7-f0d7-4835-b172-d409fad200d7.png)

Sau đó, xem kết quả:

*Method: GET*

![image.png](https://images.viblo.asia/a6dd4ebe-d81b-4e44-964d-aadaa7d86420.png)

Chúng ta có thể thấy rằng, "door" đã update bằng 5 nhưng không bị mất các trường khác. Hơn nữa, chúng ta cũng có thể thêm một field mà không tồn tại:

![image.png](https://images.viblo.asia/d6f63780-d12b-4ef5-9ab6-7ec71cbfd323.png)

*Chú ý rằng, bạn không thể dùng method PATCH cho một resource không tồn tại như PUT (Kết quả sẽ trả về FAIL và không có resource mới được tạo ra)*

Các bạn đã phân biệt được chưa :sunglasses: