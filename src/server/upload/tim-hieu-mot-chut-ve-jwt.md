Hello mọi người, trong bài viết hôm nay mình cùng các bạn sẽ cùng tìm hiểu về JWT nhé.

# JWT là gì ?

JWT ( Json Web Token ) là 1 tiêu chuẩn mở  (RFC 7519) định nghĩa cách truyền thông tin một cách an toàn giữa các bên dưới dạng đối tượng JSON.  Thông tin này có thể được xác thực và đánh dấu tin cậy nhờ vào "chữ ký" của nó. Phần chữ ký của JWT sẽ được mã hóa lại bằng **HMAC** hoặc **RSA**.

Nói một cách đơn giản thì nó là một chuỗi các kí tự được mã hóa dứoi định dạng json chứa thông tin cho phép xác minh người gửi giữa các dịch vụ khác nhau.

![](https://images.viblo.asia/d3fec896-9b30-4f31-a78c-4da9accdd3e0.png)

# Khi nào thì nên sử dụng JWT ?
 
* **Authorisation ( Ủy quyền )** :  Đây là trường hợp phổ biến nhất để sử dụng JWT. Với authorisation thì chúng ta xác minh rằng tên người dùng và mật khẩu hợp lệ, sau đó đăng nhập người dùng vào hệ thống. Khi người dùng đã đăng nhập vào hệ thống, các request được gửi đến máy chủ thuộc về người dùng đã có chứa thêm mã JWT, cho phép người dùng này có quyền truy cập vào hệ thống, truy cập vào các routes, services và tài nguyên mà cần phải có sự cho phép nếu có mã Token đó.
* **Trao đổi thông tin** : Chúng ta có thể truyền thông tin an toàn và nhận ra ai là người gửi nhờ vào phần " chữ ký " của nó. Hơn nữa chữ kí của JWT được tạo ra bằng việc kết hợp cả phần header, payload nên chúng ta có thể dễ dàng nhận ra chữ kí đó có là giả mạo hay không.

# Session Id vs JWT
* **Session Id** :
Với các web truyền thống, chúng ta thường sử dụng session để cấp quyền cho người dùng.Khi người dùng đăng nhập vào hệ thống, họ sẽ được cấp cho session id duy nhất. Session Id này được lưu trong một cookie an toàn trong trình duyệt của người dùng và trong bộ nhớ của máy chủ. Chúng ta tiếp tục sử dụng cùng một session với mọi request để máy chủ biết người dùng đang xác thực. Với mọi request,  session id trong cookie được khớp với session id trong bộ nhớ máy chủ để xác minh rằng người dùng được ủy quyền.

![](https://images.viblo.asia/17d13394-a8c9-4110-a487-a80644355ea0.png)


* **JWT** : 
Khi chúng ta triển khai hệ thống với JWT để ủy quyền cho user, một khi user đã truy cập được vào hệ thống , chúng ta sẽ tạo ra một key JWT duy nhất cho user đó. Sau đó lưu JWT ở local storage hoặc cookie của trình duyệt nhưng ko lưu ở phía máy chủ. Với mỗi request được gửi lên server thì request đó sẽ đi kèm theo jwt để được giải mã và xác thực rằng người dùng đó đã được ủy quyền, nếu token đó có gì không đúng , nó sẽ bị rejected ngay lập tức.

![](https://images.viblo.asia/9253f0de-2a7b-435d-8565-69cb35c91ce2.png)
 
 Cách làm này khá là có lợi vì chúng ta có thể làm giảm bớt đi bộ nhớ phía máy chủ, rất thích hợp cho các hệ thống nhỏ.
 
 Vậy điều gì sẽ xảy ra nếu hệ thống của chúng ta trở nên to hơn và cần phải được mở rộng quy mô:
 
** Với Session Id **


 ![](https://images.viblo.asia/e09ba691-5064-4598-aaf6-41f17439d118.png)
 
 Như trong hình trên, điều gì sẽ xảy ra nếu người dùng đã đăng nhập bằng máy chủ 1 và máy chủ này đã lưu session trong bộ nhớ của mình, khi người dùng đó đưa ra mọt request khác và load balancer chuyển hướng request đến máy chủ 2 nhưng máy chủ 2 lại  không lưu thông tin session của người dùng đó.

Người dùng chắc chắn sẽ bị đăng xuất khỏi ứng dụng và được yêu cầu đăng nhập lại, điều này sẽ dẫn đến một trải nghiệm không tốt lắm đối với người dùng. Và để khác phục điều này , chúng ta sẽ sử dụng cache.

![](https://images.viblo.asia/310ccd85-1731-44dd-800d-f3c73e6171f4.png)

Bây giờ thì session đăng nhập sẽ được lưu trong bộ nhớ cache này, cả hai máy chủ có thể kiểm tra xem session này có tồn tại hay không và có thể sử dụng nó để xác minh cũng như cấp cho họ quyền truy cập vào ứng dụng.

Mặc dù bộ nhớ cache đã khắc phục được sự cố trên nhưng giải pháp này trở nên rất tốn kém trong môi trường sản xuất, bởi vì : 
* Cần rất nhiều RAM, CPU, Cache để theo dõi tất cả các session đó cũng như xử lý các request một cách trơn tru.
* Duy trì bộ nhớ cache thường xuyên để đảm bảo không có seesion nào bất hợp lệ.
* Trong trường hợp máy chủ gặp sự cố, tất cả các sesion sẽ bị mất nếu không được đồng bộ hóa với bộ nhớ cache.
* Việc vô hiệu hóa người dùng sẽ trở nên phức tạp hơn.
* Chi phí lưu trữ cao.

**Với JWT**

Thay vì sử dụng session id trong cookie và phải  khớp với session trong bộ nhớ máy chủ, chúng ta sử dụng JWT để làm điều này. Khi người dùng đăng nhập vào ứng dụng, máy chủ sẽ không tạo session id và lưu nó vào bộ nhớ nhưu trước nữa, thay vào đó nó sẽ tạo ra JWT và và mã hóa nó bằng cơ chế mã hóa riêng. Với cách này, máy chủ sẽ biết nếu mã này bị thay đổi thì nó sẽ trở nên không hợp lệ. Điều này luôn được kiểm tra vì nó đã được ký bởi cơ chế mã hóa máy chủ.

![](https://images.viblo.asia/8711d827-6e4a-48c6-be12-0e8e959166e0.png)

Tóm lại thì sẽ như sau : 
**JWT :**

* Không có gì được lưu trên server cả, lưu trữ trong máy khách bên trong JWT.
* Được mã hóa và ký bởi máy chủ.
* Token chứa tất cả thông tin người dùng

![](https://images.viblo.asia/bdb747bc-c1f1-4acc-af1f-97111a6ab1aa.png)

**Session Id:**

* Session Id được lưu trên máy chủ.
* Được mã hóa. 
* Session Id là một tham chiếu đến người dùng.
* Máy chủ cần tra cứu thông tin người dùng và kiểm tra theo yêu cầu.



![](https://images.viblo.asia/1df35ee8-7810-4446-9bec-cde73f3b62af.png)

# Cấu trúc của một JWT

JWT bao gồm ba phần và được phân tách bằng dấu chấm ( . ) :

* Header
* Payload
* Signature

Một JWT thường trông giống như sau.

`xxxxxx.yyyyyyy.zzzzzzzz`

## **Header :**

Header thường bao gồm hai phần:

* Loại token, mặc định là JWT,
* Thuật toán được dùng để mã hóa, chẳng hạn như HMAC SHA256 hoặc RSA.

```
1. {
  "alg": "HS256",
  "typ": "JWT"
}
```

Json này được mã hóa Base64Url để tạo thành phần đầu tiên của JWT.



## Payload : 

Phần thứ hai của mã thông báo là Payload, chứa các claims. Claims là  một thực thể (thường là người dùng) và dữ liệu bổ sung. Có ba loại claims: **registered** , **public** , and **private claims**.

**Registered claims** : Đây là một tập hợp các metadata được định nghĩa trước, không bắt buộc nhưng được khuyến nghị, để cung cấp một tập hợp các claims hợp lệ và đầy đủ thông tin. Một trong số đó là: Iss (issuer), exp (expiration time), sub (subject), aud (audience), ...

```
{
  "iss": "scotch.issss",
  "exp": 1300837232,
  "name": "Son Go Ku",
  "admin": true
}
```

**Public Claims** : Được cộng đồng công nhận và sử dụng rộng rãi.

**Private Claims** : Đây là các claims tùy chỉnh được tạo ra để chia sẻ thông tin giữa các bên đồng ý sử dụng chúng và không phải là registered claims hay public claims.


## Signature : 

Là một chuỗi được mã hóa bởi header, payload cùng với một chuỗi bí mật theo nguyên tắc sau:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

Signature được sử dụng để xác minh thông điệp không bị thay đổi trong quá trình thực hiện, trong trường hợp các token được mã hóa bằng private keys, nó cũng có thể xác minh rằng người gửi JWT là người đó.

# Kết bài :

Bài viết của mình đến đây là hết rồi, nếu thấy hay và bổ ích hãy **Like**, **Share** và **Upvote** nhaaa 

Thanks mọi người