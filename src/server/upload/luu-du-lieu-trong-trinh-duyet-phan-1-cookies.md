# Cookies
Cookies là một chuỗi dữ liệu nhỏ được lưu trực tiếp ở trình duyệt. Chúng là một phần của giao thức HTTP, được đặc tả bởi [RFC 6265](https://tools.ietf.org/html/rfc6265) .

Khi một máy chủ web gửi một trang web tới trình duyệt, kết nối sẽ bị ngắt và máy chủ sẽ quên mọi thứ về người dùng.

Cookies được phát minh để giải quyết vấn đề "làm thế nào để ghi nhớ thông tin về người dùng":

Khi người dùng truy cập một trang web, tên của họ có thể được lưu trữ trong cookie.
Lần tới khi người dùng truy cập trang, cookie sẽ "nhớ" tên của họ.

Javascript có thể tạo, đọc và xóa cookies với `document.cookie`.

## Đọc cookie

Sử dụng : `document.cookie`

Giá trị của `document.cookie` bao gồm các cặp `name = value`, được phân tách bằng `;`. Mỗi cái là một cookie riêng.

Để tìm một cookie cụ thể, chúng ta có thể chia `document.cookie` theo` ;`, và sau đó tìm đúng tên. Chúng ta có thể sử dụng một biểu thức chính quy hoặc các hàm mảng để làm điều đó.

## Tạo cookie

Chúng ta có thể tạo cookie, nhưng nó không phải là thuộc tính dữ liệu mà chỉ là accesstor(getter/setter).

```
document.cookie = "user=John"; // update only cookie named 'user'
alert(document.cookie); // show all cookies
```

Nếu chạy nó, thì có lẽ bạn sẽ thấy nhiều cookie. Điều đó bởi vì `document.cookie =` hoạt động không ghi đè lên tất cả các cookie. Nó chỉ set cookie `user` được đề cấp đến.

### Đường dẫn (path)

 **`path=/mypath`**

Cookies được truy cập cho các trang với đường dẫn trên, mặc định nó là đường dẫn hiện tại.

Nếu cookie set `path=/admin` , nó xuất hiện trên các trang `/admin` và `/admin/somthing` .

### domain(tên miền)

**`domain=site.com`**

Tên miền là nơi cookie có thể truy cập. Trong thực tế, có những hạn chế, chúng ta không thể set bất kỳ tên miền nào.

Theo mặc định, cookie chỉ có thể truy cập tại tên miền set nó. Vì vậy, nếu cookie được set bởi `site.com`, chúng ta sẽ không nhận được nó tại  `other.com`.


```
// at site.com
document.cookie = "user=John"

// at forum.site.com
alert(document.cookie); // no user
```

Không có cách nào để cho phép một cookie có thể truy cập được từ 2 tên miền khác nhau, vì vậy `other.com` sẽ không bao giờ nhận được cookie được set tại `site.com`.

Đó là một hạn chế an toàn để cho phép trình duyệt lưu những dữ liệu nhạy cảm trong cookie.

Nhưng nếu chúng ta muốn cho phép các subdomain như `forum.site.com` có thể xem được cookie, thì điều đó có thể xảy ra. Khi set cookie tại `site.com`, chúng ta nên đặt tùy chọn tên miền thành tên root domain: `domain = site.com`:

```
// at site.com
// make the cookie accessible on any subdomain *.site.com:
document.cookie = "user=John; domain=site.com"

// later

// at forum.site.com
alert(document.cookie); // has cookie user=John
```

### Bảo mật

Mặc định, khi chúng ta set cookies tại `http://site.com` , sau đó nó sẽ xuất hiện trên `https://site.com` và ngược lại.

**XSRF attack**

Hãy tưởng tượng, bạn đã đăng nhập vào trang web `bank.com` và có một authentication(xác thực) cookie từ trang web đó. Trình duyệt của bạn gửi nó đến `bank.com` với mọi request(yêu cầu), để trang web nhận ra bạn và thực hiện tất cả các hoạt động giao dịch.

Bây giờ, khi duyệt web trong một cửa sổ khác, bạn vô tình đến một trang web khác `evil.com`. Trang web đó có javaScript code gửi form  `<form action = "https://bank.com/pay">` tới `bank.com` và bắt đầu giao dịch vào tài khoản `hacker` .

Trình duyệt gửi cookie mỗi khi bạn truy cập trang web `bank.com`, ngay cả khi biểu mẫu được gửi từ `evil.com`. Vì vậy, ngân hàng tưởng rằng bạn và thực sự thực hiện thanh toán.

![](https://images.viblo.asia/c0d12dd6-0ee4-40e0-ac3e-1fb76da94642.png)

Cách thức tấn công này được gọi là **Cross-Site Request Forgery** (XSRF).

Tất nhiên các ngân hàng được bảo vệ khỏi nó. Tất cả các biểu mẫu được tạo bởi` bank.com` đều có một trường đặc biệt, được gọi là **XSRF protection token**, một trang mà không thể tạo hoặc trích xuất từ một trang khác từ xa (nó có thể gửi biểu mẫu ở đó, nhưng không thể lấy lại dữ liệu ). Và trang web `bank.com` kiểm tra token với mọi biểu mẫu nó nhận được.

Nhưng việc bảo vệ như vậy cần có thời gian để thực hiện: chúng ta cần đảm bảo rằng mọi biểu mẫu gởi đến đều có token và chúng ta cũng phải kiểm tra tất cả requests.

### Third-party cookies(bên thứ 3)

Một cookie được gọi là bên thứ ba, nếu nó được đặt bởi tên miền khác với trang người dùng trang đang truy cập.

Ví dụ:

1. Trang `site.com` load banner từ một trang khác ` <img src="https://ads.com/banner.png">`.
2.  Cùng với banner, máy chủ từ xa tại `ads.com` có thể set `Set-Cookie` header với cookie như `id = 1234`. Cookie này bắt nguồn từ tên miền `ads.com` và sẽ chỉ hiển thị tại `ads.com`:

![](https://images.viblo.asia/ecb58003-fcae-4282-88af-4b320f56d828.png)

3. Lần tiếp theo khi `ads.com` được truy cập, server từ xa sẽ nhậ `id` cookie và nhận ra người dùng:

![](https://images.viblo.asia/96ec7cf8-e4ff-40a7-bb69-f0df6a70a389.png)

4. Điều quan trọng hơn nữa, khi người dùng chuyển từ `site.com` sang một trang khác `other.com` cũng có banner, sau đó `ads.com` lấy cookie, vì nó thuộc về `ads.com`, do đó nhận ra khách truy cập và theo dõi anh ta khi anh ta di chuyển giữa các trang web:

![](https://images.viblo.asia/c8cefcb2-1d55-4a8a-b0bf-acabd287e3eb.png)

Cookie của bên thứ ba được sử dụng cho việc theo dõi và quảng bá dịch vụ, do tính chất của chúng. Chúng bị ràng buộc với tên miền ban đầu, vì vậy `ads.com` có thể theo dõi cùng một người dùng giữa các trang web khác nhau, nếu nó có thể đều truy cập vào cookie.

Đương nhiên, một số người không thích theo dõi, vì vậy các trình duyệt cho phép vô hiệu hóa các cookie như vậy.

Ngoài ra, một số trình duyệt hiện đại sử dụng các chính sách đặc biệt cho các cookie như sau:

* Safari hoàn toàn không cho phép cookie của bên thứ ba.
* Firefox đi kèm với một `black list`(danh sách đen) domain của bên thứ 3 nơi nó chặn cookie của bên thứ ba.

Thank mọi người đã đọc, trong bài tiếp theo mình sẽ giới thiệu về **LocalStorage**, **sessionStorage**