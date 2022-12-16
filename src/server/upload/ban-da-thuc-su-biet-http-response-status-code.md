<div align="center">

# Lời nói đầu
    
</div>

Trong thời đại "công nghệ 4.0" như hiện nay thì việc truy cập, sử dụng các website gần như là hoạt động hàng ngày không thể thiếu của một người. Bạn có thể lên web đọc báo, nghe nhạc, xem phim, tán gẫu với bạn bè .... Và chắc hẳn những hình ảnh này cũng không phải quá xa lạ đối với các bạn phải không nào?

![](https://images.viblo.asia/9cce28dd-f0d1-48c1-9246-59f3e12b847c.jpg)

![](https://images.viblo.asia/b94351a3-b71d-4538-840e-573be3ede8fc.png)

Đây có lẽ là 2 status code phổ biến nhất mà người dùng gặp phải. Liệu bạn có bao giờ tự hỏi, ngoài 2 trường hợp này ra thì liệu có còn những mã nào nữa không? Và câu trả lời cho bạn là **CÓ**, trong bài viết này chúng ta sẽ tìm hiểu thêm một số status code khác nhé!

Nếu bạn không phải dân kỹ thuật, cũng đừng rời đi vội nhé, trang bị thêm kiến thức có bao giờ là thừa đâu, nhất là kiến thức về một thứ mà bạn đang sử dụng hàng ngày, hàng giờ.

<div align="center">
    
# Nội dung
    
</div> 

<div align="center">
    
## Http request và response
    
</div>

- Khi bạn truy cập vào một website thông qua địa chỉ URL (`www.xxxxxx.xyz`) tức là bạn đã gửi một `Http request` lên server và server sẽ trả về cho bạn một `Http response` về cho bạn. 
- Response đó chứa rất nhiều thông tin nhưng trong phạm vi bài viết này, chúng ta sẽ chỉ quan tâm đến status code thôi nhé, và dựa vào những code này, bạn có thể biết được server có xử lí thành công request của bạn hay không, hoặc nếu lỗi thì là lỗi do `server` hay do phía `client` (người dùng).

<div align="center">
    
## Các response status code thường gặp
    
</div>

<div align="center">
    
### Information responses (1xx)
    
</div>

> Nhóm mã này thông báo request đã được server tiếp nhận và đang trong quá trình xử lí

- **100 Continue:** Request đã được gửi nhưng server chỉ nhận được một phần của request, client cần gửi tiếp phần còn lại (ví dụ server mới chỉ nhận được phần header, client cần gửi tiếp body) để server tiếp tục xử lí.
- **101 Switching Protocol:** Client gửi lên request thay đổi giao thức (protocol), nếu server đồng ý thì sẽ trả về response có status code là 101.
- ... 

<div align="center">
    
### Successful responses (2xx)
    
</div>

> Nhóm mã này thông báo request đã được server tiếp nhận và xử lí thành công

- **200 OK:** Request của client gửi lên đã được xử lý thành công và không có lỗi ở cả server và client. Các method HTTP khác nhau sẽ có định nghĩa `xử lí thành công` khác nhau:
    - Method **GET**: tài nguyên được tải về và được truyền trong message body.
    - Method **POST/PUT**: tài nguyên trả về mô tả kết quả của hành động (thường là tạo mới/sửa) và được truyền trong message body.
- **201 Created:** Request đã được xử lý thành công, và kết quả là tài nguyên đã được tạo thành công. Mã này thường trả về sau requests có phương thức POST, hoặc vài requests phương thức PUT.
- **202 Accepted:** Request đã được chấp nhận nhưng chưa được thực thi. Mã này thường không phổ biến.
- ...


<div align="center">
    
### Redirects (3xx)
    
</div>

> Nhóm mã này thông báo client cần có thêm hành động để có thể hoàn thành request

- **300 Multiple Choice:** Request  gửi lên có nhiều hơn một response và người dùng sẽ phải chọn một trong số chúng. Không có một cách chuẩn nào để lựa chọn response, nhưng thường sẽ sử dụng `HTML link` để cho người dùng chọn.
- **301 Moved Permanently:** URL của tài nguyên được request đã được thay đổi vĩnh viễn, và URL mới sẽ được trả về trong response.
- **302 Found:** Mã này thông báo rằng URI của tài nguyên được requests đã được thay đổi tạm thời, trong tương lai sẽ có thể có thêm những thay đổi về URI. Vì vậy, URI này nên được sử dụng cho những requests trong tương lai.
- **303 See Other:** response trả về cho request của client có thể tìm thấy ở một URL khác với phương thức **GET**.
- ...


<div align="center">
    
### Client errors (4xx)
    
</div>

> Nhóm mã này thông báo request gửi lên có chứa cú pháp không đúng hoặc không có quyền thực thi, và như tên của nó thì đây là lỗi do client gửi lên (nhóm này có vẻ là nhiều mã nhất)

- **400 Bad request:** Request của client gửi lên bị sai cú pháp, dẫn đến việc server không thể hiểu và xử lý request.
- **401 Unauthorized:** Yêu cầu phải xác thực người dùng mới có thể nhận được response trả về. 
- **402 Payment Required:** Mã này dự kiến được sử dụng trong tương lai. Mục đích tạo ra nó để sử dụng cho hệ thống thanh toán kỹ thuật số (**digital payment systems**).
- **403 Forbidden:** Client không có quyền truy cập nên server từ chối trả về tài nguyên. Khác với lỗi **401** thì trường hợp này là người dùng đã xác thực rồi nhưng không có quyền.
- **404 Not Found:** Cái này thì là huyền thoại rồi :scream::scream::scream:. Server không thể tìm thấy tài nguyên mà người dùng yêu cầu. Đối với trình duyệt là do URL không được công nhận, còn đối với API thì là endpoints hợp lệ nhưng tài nguyên không tồn tại. Trong một vài trường hợp, server có thể trả về **404** thay cho **403** để giấu tài nguyên.
- **405 Method Not Allowed:** Method được sử dụng trong request không hợp lệ. . Ví dụ Một GET request đến một POST resource.
- **408 Request Timeout:** Request gửi lên chờ quá thời gian timeout mà vẫn chưa được server xử lý 
- ...

<div align="center">
    
### Server errors (5xx)
    
</div>

> Nhóm mã này thông báo server không thể xử lý request gửi lên, đây là lỗi ở phía server

- **500 Internal Server Error:** Thông báo về việc server bị lỗi, dẫn tới việc không thể xử lý được request. Thông báo này không cung cấp thông tin lí do gây ra lỗi.
- **501 Not Implemented:** Method của request gửi lên không được server hỗ trợ, vì vậy server không thể xử lý request. 
- **502 Bad Gateway:**  Mã này thông báo rằng server khi làm việc như một gateway để lấy response cần thiết cho xử lý request thì lại nhận về một response không hợp lệ.
- **503 Service Unavailable:** Server không sẵn sàng để xử lý request. Trong trường hợp này có thể là do server đang bảo trì hoặc đang bị quá tải.
- **504 Gateway Timeout:** Mã này thông báo server khi làm việc như một gateway để lấy response thì bị quá thời gian timeout mà không nhận được response.
- **505 HTTP Version Not Supported:** phiên bản HTTP được sử dụng trong request không được server hỗ trợ.
- ...

- Ngoài ra thì bên dưới là khả năng tương thích của các trình duyệt trên cả máy tính và điện thoại:
 ![](https://images.viblo.asia/c8f2a24f-c3d9-4527-9c47-ab917799fa1a.png)


<div align="center">

# Tổng kết
    
</div>

Hy vọng sau bài viết này thì các bạn sẽ hiểu thêm về http response status code và nếu bạn là một web developer thì mình tin rằng nó sẽ hỗ trợ rất nhiều cho các bạn trong quá trình làm việc sau này. 

Nếu thấy bài viết này hay và hữu ích, hãy upvote/clip bài viết ủng hộ mình nhé.

Còn nếu có bất cứ điều gì thắc mắc hoặc cách diễn đạt trong bài viết chưa ổn, đừng ngần ngại comment xuống phía dưới để những bài viết sau của mình có thể ngày càng tốt hơn, đóng góp 1 phần nhỏ vào cộng đồng chia sẻ kiến thức IT [Viblo](https://viblo.asia/) nhé!

Bạn cũng đừng quên sự kiện [VIBLO MAYFEST](https://mayfest.viblo.asia/) đang diễn ra trong tháng 5 này, hãy tham gia chia sẻ kiến thức và nhận về những phần quà "độc quyền" của Viblo nhé.

<div align="center">

# Tài liệu tham khảo
    
</div>

-  https://developer.mozilla.org/en-US/docs/Web/HTTP/Status