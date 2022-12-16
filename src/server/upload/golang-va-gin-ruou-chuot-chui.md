### Gin - gin-gonic trong Go là gì?
![image.png](https://images.viblo.asia/c7ddbc52-439f-4475-9a5d-7ac83c1c41d6.png)

À không phải tên này là cái này cơ

![image.png](https://images.viblo.asia/be1750ff-f4e6-4b6e-abf4-f95c7a6733d2.png)

Trỗi dậy trong vài năm trở lại đây ở quốc tế và đặc biệt là ở Việt Nam, nguồn nhân lực Golang đang được khai thác hết mức nhất là các bạn giỏi về mảng Go Backend, Go Blockchain đang được các HR xinh đẹp dễ thương săn đuổi nồng nhiệt.

Và để được săn đón nồng nhiệt thì trước tiên các developer chúng ta phải khai thác chú chuột chũi nhà Google này đã. Theo đó, một trong những cái tên làm mưa làm gió ở cộng đồng Golang là Gin, một framework tuyệt vời và không thể thiếu khi bạn lập trình với Go.
### Gin framework

> Gin is a HTTP web framework written in Go (Golang). It features a **Martini**-like API, but with performance **up to 40 times faster** than Martini. If you need smashing performance, get yourself some Gin.

 Đó là những gì mà các developers của Gin đã khẳng định. Martini( có vẻ gia đình Go khá thích uống rượu) là một trong những framwork đời đầu tuy nhiên không còn được phát triển nữa. Tuy nhiên các framework ngày nay vẫn luôn lấy cảm hứng từ những tính năng của Martini, mạnh mẽ và tiện lơi.

*Fact: Cho bạn nào chưa biết thì Martini là cocktail được tạo ra từ Vermouth và Gin, nhân vật chính của chúng ta, nên có lẽ vì vậy là Gin phát triển một cách thành công nhất 😆*

Gin hay Gin-Gonic là một trong những dự án như vậy. Hậu bối của Martini sử dụng một phiên bản tùy biến httprouter, điều này làm cho Gin gần như hoàn hảo để phát triển API hiệu xuất cao. Song đó nó cũng cấp các trình xử lý cho nhiều trường hợp như: middleware, file uploading, logging, binding fronend HTML component với cấu trúc dữ liệu Backend,..

![image.png](https://images.viblo.asia/97ecb60d-8769-4df6-841d-fd6f772a0c1b.png)
Gin-Gonic là web framework được dùng nhiều nhất trong nhà Go.
![image.png](https://images.viblo.asia/f8aad7dd-48bf-43a5-a967-f27c986fa634.png)
So sánh giữa Gin và Mux( một framework phổ biến mà bạn có thể dễ dàng tìm kiếm với từ khóa api golang).
### Thực chiến

Lý thuyết phải đi đôi với thực hành, ta đã biết Gin rồi giờ thì đến lúc trải nghiệm thôi hehe.

Ta có thể cài đặt package của Gin thông qua câu lên sau trên terminal:

```
go get github.com/gin-gonic/gin
```
Có package rồi thì ta tiến hành khởi tạo dự án thôi :D:

Tạo thư mục chứa dự án
```
mkdir gin-gonic
cd gin-gonic
```
      
Sau đó ta tạo module cho dự án nhé:
```
go mod init gin-gonic
```
Và tạo file main.go
```
touch main.go
```
Vậy là xong phần khởi tạo. Tiếp đến ta đặt vào file main.go vài dòng code:
![image.png](https://images.viblo.asia/66343db0-4300-4867-a499-68fa11d75899.png)

Trong đó dòng `	router := gin.Default()
` là cách mặc định để tạo 1 router với gin. Sau đó chúng ta sẽ tạo một group đường dẫn có tên là "/api" để tiện cho việc quản lý các api khác nhé. Sau đó ta tạo một phương thức Get với trả về 1 JSON với content: "message":"ping pong successful" và gửi request đến port 8080 nhé.

***Kiểm thử kết quả trả về***

Kiểm thử bằng lệnh curl như này:
    `curl localhost:8080/api/ping`

Kết quả trả về:
![image.png](https://images.viblo.asia/c5be3ccb-1bcf-42f9-8b6a-42dcf1eb79ee.png)

Hoặc bằng Postman như mình: 
![image.png](https://images.viblo.asia/57d75019-c281-45a7-945e-4bcc4f41d523.png)
### Một số ví dụ khác
![image.png](https://images.viblo.asia/620529fc-4696-45dd-b06c-a710f54cb3a5.png)
### Tóm lại
Golang và Gin thật sự thú vị, ở trên chỉ là một phần nhỏ của Gin, các bạn có thể tìm hiểu thêm bằng cách tìm kiếm các keyword liên quan hoặc các bài viết tham khảo đính kèm bên dưới. Hy vọng bài viết của mình có thể giúp bạn hứng thú hơn với Golang cũng như Gin. Chúng ta sẽ cùng khai thác Go Gin ở các bài viết sau nhé. Cảm ơn các bạn đã dành thời gian cho bài viết này. Have a nice day <3.

Các bài viết đã tham khảo:

Github Gin: https://github.com/gin-gonic/gin

BẮT ĐẦU VỚI GIN-GONIC FRAMEWORK: https://sinhnx.dev/lap-trinh/bat-dau-voi-gin-gonic

GIN Introduction: https://medium.com/@tinhuynh1/gin-introduction-23fb8c32a1c1