# Vì sao caching lại quan trọng 

Các trình duyệt thường sẽ lưu lại các bản copy của các static asset ở local để giảm thời gian tải và tối thiểu hóa lượng dữ liệu phải truyền tải, việc này gọi là caching.

Lấy dữ liệu từ một nguồn nào đó trên mạng luôn lâu hơn việc lấy từ local ra, đây là một điều hiển nhiên vì kết nối từ một máy chủ nào đó ở bên ngoài luôn yếu hơn kết nối ở môi trường local. Vậy nên việc caching sẽ giúp giảm thời gian tải, cùng với đó việc không tải những dữ liệu không cần thiết cũng giúp giảm lưu lượng phải truyền tải.

# Browser caching hoạt động như thế nào ?

### Trường hợp 1: User chưa từng ghé thăm trang web

Trong trường hợp này, browser chưa hề có file cache nào nên nó sẽ tải toàn bộ dữ liệu từ server xuống.

![](https://images.viblo.asia/746c6457-88c1-420e-9592-d5abd94cf7ac.png)

Dưới đây là ảnh chụp các tài nguyên đã được download khi chúng ta ghé thăm trang chủ Wiki lần đầu tiên. Status bar ở dưới thể hiện rằng đã có 265kb được truyền tải đến browser.

![](https://images.viblo.asia/90fe0ecd-be8b-4886-ae14-4177fceb6411.png)

### Trường hợp 2: User đã ghé thăm trang web từ trước

Browser vẫn sẽ tải HTML từ server về, tuy nhiên sẽ cân nhắc việc tải hay không cho những static assets (Javascript, CSS, ảnh)!

[](https://images.viblo.asia/db2cf48a-e00e-4d7e-8f4b-5f4f3647824b.png)

Chúng ta có thể thấy được sự khác biệt khi chúng ta refresh lại trang chủ Wiki:

![](https://images.viblo.asia/54ff2cc8-f4ab-43c0-bfc1-a3a6546eceaa.png)

Lượng dữ liệu truyền tải giảm xuống chỉ còn 928 bytes - tương ứng với 0.3% lượng dữ liệu lúc đầu. Cột Size chỉ ra rằng phần lớn các dữ liệu được lấy từ cache.

> Chrome sẽ lấy file từ cả memory cache và disk cache. Vì chúng ta chưa đóng cửa sổ trình duyệt từ trường hợp 1, vậy nên dữ liệu vẫn còn đang ở trong memory cache.

### Hiển thị cache trong trình duyệt

Trong Chrome, ta có thể truy cập và `chrome://cache` để xem các nội dung cache. Nó sẽ hiển thị các link đến các trang chứa nội dung cache cụ thể của các page.

![](https://images.viblo.asia/74d6fb9b-3455-447d-97f4-48d018082f03.png)

# Làm thế nào để browser biết file nào nên lấy từ cache ?

Browser sẽ kiểm tra header của HTTP response từ server để xem nên tải nội dung nào về. Sẽ có 4 header thường được sử dụng cho việc cache:

* ETag
* Cache-Control
* Expires
* Last-Modified

### ETag

ETag (hoặc Entity Tag) là một chuỗi được sử dụng như là một cache validation token. Nó thường là hash của nội dung file.

Server có thể thêm header ETag vào HTTP response, sau này browser có thể dùng header này trong các request sau (trong trường hợp file đã hết hạn cache) để kiểm tra xem nội dung file đã có gì thay đổi chưa, vì sử dụng hàm hash nên dù nội dung file chỉ có 1 chút thay đổi thì chuỗi ETag cũng sẽ khác.

Nếu chuỗi hash được giữ nguyên, có nghĩa là nội dung tài nguyên không thay đổi, server sẽ trả về mã 304 (Not modified) với một body rỗng. Điều này cho browser biết rằng file vẫn có thể tiếp tục cache.

![](https://images.viblo.asia/897f78ec-cadb-4552-a94a-3dd886bab93d.png)

Lưu ý rằng ETag chỉ được sử dụng trong request khi mà file đã hết hạn cache.

### Cache-Control

Cache-Control header có một số giá trị chúng ta có thể dùng để kiểm soát behavior, expiration và validation của cache. Tất cả những thuộc tính trên của cache có thể cài đặt hỗn hợp lẫn nhau.

**Cache behavior**

```
Cache-Control: public
```

`public` có nghĩa là nội dung tài nguyên có thể được cache bằng bất kỳ loại cache nào (browser, CDN, ...)

```
Cache-Control: private
```

`private` nghĩa là chỉ có trình duyệt được phép cache lại nội dung.

```
Cache-Control: no-store
```

`no-store` nghĩa là nội dung này luôn phải được tải về từ server

```
Cache-Control: no-cache
```

`no-cache` là giá trị gây hiểu lầm nhiều nhất, no **không** có nghĩa là "đừng có cache". Giá trị này nói với browser rằng hãy cache file lại nhưng chỉ sử dụng khi đã validate với server rằng đây là phiên bản mới nhất của file đó. Validation sẽ được sử dụng bằng ETag header.

Giá trị này thường được dùng với các file HTML vì browser thường xuyên phải kiểm tra cho markup mới nhất.

**Expiration**

```
Cache-Control: max-age=60
```

Giá trị này sẽ cài đặt thời gian mà file nên được cache lại. Giá trị sau dấu = được tính theo giây. Vậy nên trong ví dụ phía trên, file sẽ được cache trong 1 phút (60 giây). RFC khuyến cáo rằng giá trị này không nên để vượt quá 1 năm (max-age=31536000)

Ngoài ra, dành cho việc cache trên CDN thì ta có thể cài đặt như sau:

```
Cache-Control: s-max-age=60
```

**Validation**

```
Cache-Control: must-revalidate
```

Giá trị này sẽ yêu cầu trình duyệt luôn luôn validate cache (sử dụng ETag) mà không quan tâm đến giá trị expires.

### Expires

Expires là header từ HTTP 1.0 tuy nhiên vẫn còn khá nhiều trang sử dụng header này. Header này cung cấp một ngày hết hạn cho các file, sau thời gian đó thì các file sẽ trở thành invalid.

```
Expires: Wed, 25 Jul 2018 21:00:00 GMT
```

> Lưu ý, browser sẽ bỏ qua header này nếu như Cache-Control max-age được chỉ định

### Last-Modified

Last-Modified cũng là một header từ HTTP 1.0, nó lưu lại thời gian lần gần nhất mà file được sửa đổi:

```
Last-Modified: Mon, 12 Dec 2016 14:45:00 GMT
```

### HTML Meta Tag

Trước khi có sự ra đời của HTML5, sử dụng meta tag của HTML để kiểm soát Cache-Control cũng là một cách phổ biến:

```
<meta http-equiv="Cache-control" content="no-cache">
```

Tuy nhiên việc sử dụng meta tag như thế này hiện nay là không được phép. Vì với meta tag thì chỉ có browser có thể đọc hiểu và cache dữ liệu lại, còn các intermidate cache sẽ không thể hiểu được.

Vậy nên hãy luôn sử dụng HTTP header cho việc cache.

### HTTP response

Hãy nhìn một ví dụ về HTTP response sau đây:

```
Accept-Ranges: bytes
Cache-Control: max-age=3600
Connection: Keep-Alive
Content-Length: 4361
Content-Type: image/png
Date: Tue, 25 Jul 2017 17:26:16 GMT
ETag: "1109-554221c5c8540"
Expires: Tue, 25 Jul 2017 18:26:16 GMT
Keep-Alive: timeout=5, max=93
Last-Modified: Wed, 12 Jul 2017 17:26:05 GMT
Server: Apache
```

* Dòng 2 cho chúng ta biết max-age là 1 giờ
* Dòng 5 thể hiện rằng file đang xét là một ảnh png
* Dòng 7 gửi về ETag để browser có thể kiểm tra file có bị thay đổi không sau 1 giờ kể từ khi nhận file về
* Dòng số 8 sẽ bị bỏ qua do đã sử dụng Cache-Control max-age
* Dòng số 10 cho thấy lần cuối cùng file được sửa đổi

# Nguồn bài viết

https://medium.com/@codebyamir/a-web-developers-guide-to-browser-caching-cc41f3b73e7c