> CORS, hay Cross-oirigin Resource Sharing.
> Nhiều người nhắc đến, nhưng không phải ai cũng rõ nó là gì.
> Nhiều người biết cách sửa, nhưng không phải ai cũng biết tại sao nó tồn tại.
> Dù sớm hay muộn, là một Frontend Developer, bạn sẽ gặp phải vấn đề này, dù bạn biết cách sửa hay không, thì bạn cũng chả phải là người sửa nó.
> 

### Khi ta dính CORS

Một ngày đẹp trời, ta bắt tay vào một dự án mới. API đã hoàn thiện, chỉ gần gọi và dùng mà thôi, ít nhất thì đó là những gì mà phía backend hứa hẹn.
Ta tiến hành gọi 1 API, và bùm:

```
Cross-Origin Request Blocked: The Same Origin Policy disallows
reading the remote resource at https://some-url-here.
```

Ta tức tốc báo với phía server, họ nhẹ nhàng hỏi domain của ta là gì. Một lát sau, API lại hoạt động bình thường. Uồi!! Lạ thế nhỉ! Thôi kệ chạy được là được.
Và từ đó cors, dù gặp rồi, nhưng cũng chẳng mấy ai bận tâm nó là gì :v

### Đằng sau bức màn bí mật

Cái việc của ông server, thực ra chỉ đơn giản là copy cái domain của ta, rồi điền vào header của cái response, cụ thể cái header ở đây là `access-control-allow-origin`.
Bản chất vấn đề nó là như sau:

- Mỗi trang web sẽ có một `origin`, hay chính là domain của nó, origin ở đây theo đúng nghĩa bọn tây là nguồn gốc xuất xứ (aka. cái trang này đến từ server nào)
- Mỗi server sẽ chỉ cho phép request loại `normal` được gọi từ trang có origin là server khác, tức mọi loại request `abnormal` mà có origin không phải của server hiện tại, thì Bye! Chúng ta ko thuộc về nhau! Tặng bạn 1 cái lỗi cors nhẹ!
- Để cho phép các trang có origin khác gửi các request loại `abnormal` tới 1 server, thì server đó phải liệt kê origin của trang web đó vào cái whitelist, đó chính là cái `access-control-allow-origin` header! 

### Ngày xửa ngày xưa, sao phải khổ thể? Request normal với chả abnormal là sao?

Xưa xửa xừa xưa có 1 cái lỗi bảo mật như thế này, ai cũng biết là cookies được trình duyệt tự động gắn với mỗi request. Tưởng đơn giản nhưng không hề giản đơn, các hắc cờ đã lợi dụng điều này để đi chôm thông tin người dùng như sau:

- Bạn đăng nhập vô 1 trang web A, và tất nhiên là credential để truy cập đến các thông tin cá nhân trên web A đó sẽ được chứa theo cookies.
- Hắc cờ gửi bạn 1 đường link, thấy bảo full HD không che, click đi đừng ngại, và tất nhiên là bạn chả có gì mà phải ngại cả.
- Ngay khi bạn hí hửng click vào đường link, thì cũng chính là lúc bạn request đến server của hắc cơ, và tuyệt nhiên là, bạn đã vô tình gửi cookie của mình cho hắn!

Vì vậy, mặc định là request chỉ được phép thực hiện trong cùng 1 origin, muốn gửi sang origin khác thì phải config bên đấy. Như cái bản chất trên thì những request normal sẽ là những request không vi phạm bảo mật trên:

- request thuộc loại GET, HEAD, POST
- request CHỈ CÓ những header đã được định sẵn (thêm những cái header khác thì khả năng là nó chứa thông tin authentication)

### Kết

Như vậy, dù CORS thực ra cũng không phải là cái gì quá cao siêu, nhưng khi hiểu bản chất thì mọi thứ trở nên sáng tỏ hơn, giúp hệ thống của ta an toàn hơn. Thê nên là với cái hệ thống chứa thông tin authentication mà ông server cài đại là `'access-control-allow-origin': '*'` (ai cũng request được hết), thì bạn phải xem xét lại đó nhá :)