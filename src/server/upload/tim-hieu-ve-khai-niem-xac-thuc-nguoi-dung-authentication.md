Chắc hẳn khi bắt tay vào làm 1 ứng dụng thì việc đầu tiên mình cần xử lý khi hoàn thành UI đó chính là handle phần sign up/sign in/logout/ confirm password/ forgot password hay còn gọi là handle Authentication ạ. Để hiểu rõ hơn khái niệm Authentication, mình xin chia sẻ một số kiến thức của bản thân ạ.  
Bất kì ứng dụng nào thì việc bảo vệ dữ liệu của người dùng rất quan trọng. Chính vì việc đó việc xác thực người dùng (Authentication) ra đời. 

### Việc xác thực người dùng diễn ra như thế nào ?
Có 2 giải pháp tốt nhất được biết đến cho vấn đề xác thực này là: 
- Dùng OAuth : Tức là authentication bằng cách trang mạng xã hội facebook/google/...
- Dùng JSON Web Token (JWTs) :  Tức là call api để xác thực:
    + Nếu BE viết api thì toàn bộ xử lý backend sẽ handle cho mình việc của mình chỉ cần call API .
    + Dùng các API của dịch vụ bên thứ 3 để xử lý :cognitor,...


### Từ lúc user click nút đăng kí sẽ xảy ra điều gì ?

![](https://images.viblo.asia/19f600c6-b562-43a9-bd48-19f074f096a8.png)


### Phân biệt Authentication vs. Authorization:
Nhiều bạn có thể nhầm lẫn giữa 2 khái niệm này, nó cũng hơi giống nhau và cũng khác nhau như cách phát âm của nó vậy đó :D 

![](https://images.viblo.asia/0660fa4b-ebe2-45e2-8fa8-a701d99b8564.jpeg)

**Authentication**   
Dùng để xác định bạn có phải là user của hệ thống không? 
- Bạn là ai? 
- Diễn ra trước khi Authorization
- Trả về lỗi 401
- Dùng password, OPT, PIN,....
- Ví dụ: Bạn muốn vào công ty, Authentication cần biết bạn phải là nhân viên của công ty đó mới được vô công ty.

**Authorization**    
Nếu đã là user của hệ thống, vậy bạn có những quyền gì trên hệ thống?
Một trong những cách phổ biến nhất hiện nay là sử dụng [JWT (JSON Web Token).](https://jwt.io/)
- Bạn có những quyền gì ?
- Diễn ra sau khi authentication thành công.
- Trả về lỗi 403
- Ví dụ: Khi bạn đã vô được công ty rồi, nhưng mỗi công ty đều có phòng ban khác nhau. Bạn là nhân kế toán sẽ ko vô được phòng server bảo mật công ty. Dù bạn đã được xác nhận là nhân viên công ty nhưng quyền của bạn chỉ làm những việc gì....

### Kết 
Mong rằng bài viết của mình giúp các bạn hiểu thêm một phần nào đó về khái niệm Authentication. Nếu bài viết mình có gì sai sót comment mình phía dưới để mình có thể sửa chữa lỗi lầm của mình. Cảm ơn các bạn. Hẹn gặp lại các bạn trong các bài viết tiếp theo nhé ! ❤️