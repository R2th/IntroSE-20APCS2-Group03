Cookie là những phần dữ liệu được web server gửi vào lần đầu tiên trình duyệt truy cập website hoặc khi không tìm thấy trong request của trình duyệt gửi lên. Sau đó cookie được lưu lại trên máy người dùng bởi trình duyệt và sẽ được trình duyệt gửi lại server theo mọi request theo header.

Mặc dù cookie thường được set bởi trình duyệt nhưng nó cũng có thể đưọc tạo ra/thao tác bởi Client bằng việc sử dụng Javascript. Tuy vậy, nếu các cookies được gắn `HttpOnly` thì chỉ server có quyền thao tác đến các cookies này. 

### Khởi tạo cookie

Khi người dùng truy cập vào trang web lần đầu tiên, header mà trình duyệt gửi lên sẽ có dạng sau:

```http
GET /index.html HTTP/1.1
Host: www.example.org
```

Đồng thời, lúc này server không tìm thấy cookie trên request người dùng, chính vì vậy nó sẽ khởi tạo cookie bằng cách gửi lại header như sau:

```http
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: theme=light
Set-Cookie: sessionToken=abc123; Expires=Wed, 09 Jun 2021 10:18:14 GMT
Set-Cookie: status=active; Max-Age: 300
Set-Cookie: name=tien; Expires=Wed, 09 Jun 2021 10:18:14 GMT; Max-Age: 300
```

Có thể thấy có 2 cookie được tạo ra:

- Cookie `theme` không có **Expires**, có nghĩa là nó sẽ bị mất sau khi đóng trình duyệt.
- Cookie `sessionToken` có thêm **Expires**, có nghĩa là nó sẽ chỉ bị mất khi hết thời gian hoặc bị xóa bơi người dùng.
- Cookie `status` có trường **Max-Age**, có nghĩa là cookie sẽ bị mất sau: 300 giây.
- Trong trường hợp cả **Expire** và **Max-Age** đều có trong cookie thì **Max-Age** sẽ được ưu tiên hơn.

### Cách server tiếp nhận cookie

Sau khi cookie được khởi tạo trên trình duyệt người dùng, các request khác của người dùng lên server sẽ có header dạng như sau:

```http
GET /spec.html HTTP/1.1
Host: www.example.org
Cookie: theme=light; sessionToken=abc123
```

Khi cookie được tạo ra không chỉ có key/value, nó còn có thêm 1 vài giá trị nữa: Domain, Path, Expires,... Tuy nhiên nó không được trình duyệt gửi lại cho server mà chỉ key và value được gửi lại. 

### Domain và Path

2 giá trị này dùng để nói cho trình duyệt biết nơi cookie thuộc về. Vì lý do bảo mật nên cookie chỉ được set domain là domain hiện tại mà trình duyệt truy cập. 

Nhìn vào cookie được server gửi cho trình duyệt dưới đây:

```http
HTTP/1.0 200 OK
Set-Cookie: LSID=DQAAAK…Eaem_vYg; Path=/accounts; Expires=Wed, 13 Jan 2021 22:23:01 GMT; Secure; HttpOnly
Set-Cookie: HSID=AYQEVn…DKrdst; Domain=.foo.com; Path=/; Expires=Wed, 13 Jan 2021 22:23:01 GMT; HttpOnly
Set-Cookie: SSID=Ap4P…GTEq; Domain=foo.com; Path=/; Expires=Wed, 13 Jan 2021 22:23:01 GMT; Secure; HttpOnly
```

Với dòng đầu tiên có cookie `LSID`, ta có thể thấy rằng:

- Không có trường **Domain**, trường `Path=/accounts`. Điều này có nghĩa là **Domain** sẽ tự được lấy từ request
- Dòng thứ 2 và dòng thứ 3 có `Domain=.foo.com` hay `Domain=foo.com` và có cùng `Path=/`. Điều này có nghĩa là domain `foo.com` hay bất cứ sub-domain nào dạng: `sub.foo.com` hay `tien.foo.com` đều có quyền thao tác đến cookie này.

### Expire và Max-Age


```http
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: theme=light
Set-Cookie: sessionToken=abc123; Expires=Wed, 09 Jun 2021 10:18:14 GMT
```

Có thể thấy có 2 cookie được tạo ra:

- Cookie `theme` không có **Expires**, chính vì vậy nó sẽ bị mất sau khi đóng trình duyệt.
- Cookie `sessionToken` có thêm **Expires**,chính vì vậy nó sẽ chỉ bị mất khi hết thời gian hoặc bị xóa bơi người dùng.

### Secure and HttpOnly

Hai trường **Secure** hay **HttpOnly** đều không có giá trị xác định, nó được cho vào cookie để xác nhận cookie có sử dụng nó hay không.

- **Secure** có tác dụng làm cho trình duyệt phải sử dụng kết nối `secure/encrypted` tức là kết nối bảo mật, được mã hóa. Tuy vậy, nó chỉ hoạt động khi server có sử dụng SSL(HTTPs). Tuy vậy, không nên truyền các thông tin bảo mật bằng Cookie vì cơ chế này vốn dĩ không an toàn và kể cả có **Secure** đi chăng nữa thì ko có nghĩa là thông tin nào cũng được mã hóa hoặc không thể truy cập bởi bên thứ 3.
- **HttpOnly** có tác dụng làm cho cookie chỉ được thao tác bởi server mà không bị thao tác bởi các script phía người dùng.

Nguồn: Wikipedia