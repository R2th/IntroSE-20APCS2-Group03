# Giới thiệu
Javascript là thành phần không thể thiếu của bất kỳ một web app hiện đại nào, đặc biệt là các web app ở dạng SPA (Single Page Application). Việc hiểu được flow thực hiện cũng như các hàm của client sẽ giúp ta có cái nhìn sâu sắc hơn cho về app. Tuy nhiên, với sự phát triển của các công cụ bundle, uglify, minify khiến việc đọc code js trở thành cơn ác mộng.  Cho dù các browser đã có trang bị những công cụ debugger mạnh mẽ nhưng vẫn còn những hạn chế. Trong bài viết này, mình xin phép trình bày các hướng tiếp cận của mình với một case study cụ thể là __Chatwork__.

# Bài toán
![](https://images.viblo.asia/62f8052a-5ae2-4238-a24d-cd031e1b0c40.png)

Như những người dùng của __[Chat++ for Chatwork](https://chrome.google.com/webstore/detail/chat%20%20-for-chatwork/amhfnpimdfcdcpnchjionbddjjbmofnl?hl=en)__, một extension vô cùng hữu ích giúp nâng cao hiệu quả công việc, đã biết, chúng ta có thể dùng phím `S` để scroll xuống cuối box và đọc toàn bộ tin nhắn. Liệu có cách nào chúng ta có thể đọc toàn bộ box mà không cần phải scroll xuống cuối ko?. Cùng nghiên cứu nào #challenge_accepted

# Javascript của Chatwork
- Frontend của  Chatwork được viết (lại) bằng `React`.
- Tất cả js của Chatwork được bundle lại vào thành một file duy nhất ở địa chỉ: [https://front.chatwork.com/biwa/all/app/index.js](https://front.chatwork.com/biwa/all/app/index.js).
- Javascript được bundle bằng __Webpack__ ?, nghĩa là tất cả sẽ được đưa thành các `ESModule` và được load vào. Tuy nhiên, Chatwork vẫn có gán một số object global như `CW` (object chính của app ), `CS`, `RM` (object của room hiện tại mà ta đang làm việc),... gán vào `window`, điều này cho phép chúng ta thao tác được với app Chatwork từ javascript.

![](https://images.viblo.asia/9f03340e-5c5f-4a34-8b3d-adc751a8211e.png)

# Các bước tiếp cận

## Làm đẹp code JS

Bước đầu tiên chúng ta cần tải file JS to tổ chảng kia về, dùng các tool, ví dụ __[Prettier](https://www.prettifier.net/)__ để format code dễ nhìn hơn. Phần lớn thì tên biến đã được rút ngắn, nhưng về cơ bản thì phần lớn vẫn giữ nguyên và có comment ở đầu mỗi thư viện, nên ta vẫn đọc được. Sau khi format thì được một file dài khoảng __127K+__ dòng :cold_sweat:

## Load file JS local thay vì file từ server

Bước này chúng ta sẽ điều hướng browser để thay vì load file js từ địa chỉ `https://front.chatwork.com/biwa/all/app/index.js` thì load file local, khi đó, logic chương trình vẫn sẽ hoàn toàn giống như cũ, nhưng file js giờ đã do ta quản lý, ta có thể:
- Thêm `debugger` để breakpoint debug script (cái này thì Chrome cũng đã hỗ trợ sẵn)
- Thêm `console.log` tuỳ ý
- Chỉnh sửa logic, hardcode giá trị thoải con gà mái :smile:

Để làm được việc này ta cần 2 thứ:

- Server chạy HTTPS để host file JS ở local
- Công cụ giúp tự động điều hướng link JS trên trình duyệt về server local

### 1. Server chạy HTTPS để host file JS ở local

Tại sao phải là HTTPS? vì chatwork chạy qua HTTPS, nếu ta link đến một file JS thông qua HTTP sẽ dẫn đến lỗi `mix-content` trên Chrome. Ngoài ra, ,may mắn cho chúng ta, Chatwork không có CSP Header (__Content Security Policy__, bạn có thể đọc thêm tại [đây](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)) nên ta có thể load JS từ source bất kỳ. Nếu có thì mọi việc sẽ trở lên rắc rối hơn rất nhiều :joy:

Mình dùng một script python đơn giản để chạy https server:

```python
#!/usr/bin/env python3

# Ported to Python 3 by Telmo "Trooper" (telmo.trooper@gmail.com)
#
# Original code from:
# http://www.piware.de/2011/01/creating-an-https-server-in-python/
# https://gist.github.com/dergachev/7028596
#
# To generate a certificate use:
# openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes

from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl

separator = "-" * 80
port = 4443
httpd = HTTPServer(("", port), SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(
    httpd.socket,
    keyfile="/Users/nguyen.anh.tien/lab/dev_tools/local-cert-generator/server.key",
    certfile="/Users/nguyen.anh.tien/lab/dev_tools/local-cert-generator/server.crt",
    server_side=True
)

print(separator)
print("Server running on https://localhost:" + str(port))
print(separator)

httpd.serve_forever()
```

Certificate thì ta có thể tự gen hoặc follow bài viết [https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/](https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/) để có thể chạy https trên localhost.

Đi vào thư mục chứa file js chúng ta đã lưu và chạy script lên chúng ta được:

```
Server running on https://localhost:4443
```

Ở đây mình chạy self-sign cert nên cần vào sẵn localhost và accept việc trust cert, nếu không ta sẽ bị lỗi `CERT_INVALD` khi truy cập link.

### 2. Tự động điều hướng link JS trên trình duyệt

Để làm việc này thì có rất nhiều cách và tool như __[Fiddler](https://www.telerik.com/fiddler)__, __Burp Suite__, nhưng để cho đơn giản, mình dùng luôn một extension cho Chrome là: __[Requestly](https://www.requestly.in/)__ cho phép chỉnh sửa các request từ trình duyệt. Chúng ta thêm một rule như sau và save lại:

![](https://images.viblo.asia/de55fb69-55d7-4b19-bbed-6ddc15c55600.png)

Giờ thì reload lại trình duyệt và kiểm tra (Nhớ chọn sẵn __Disable cache__ để ):

![](https://images.viblo.asia/2a7e45ff-21d2-4e6f-bf02-416440e86c51.png)

vậy là đã tráo hàng thành công :stuck_out_tongue:. Giờ ta có thể thêm debug thoải mái. Ví dụ, với webpack, thì tất cả các module sẽ được đưa vào một mảng rồi đưa vào hàng dưới.
![](https://images.viblo.asia/0043c6a2-b902-4294-9018-6ae94c53bdc7.png)

Ở đây `t` sẽ là object chứa toàn bộ các module, và hàm `n` sẽ tương đương với `require`. `o` là index của module (ở bản build development, `o` sẽ là tên của module, còn ở build production, `o` là số). Thêm dòng debug như trên ta có thể check thử:

![](https://images.viblo.asia/6da4ca98-7120-4dd1-b874-435bca5f34c3.png)

## Nghiên cứu tính năng read của Chatwork

Bước tiếp theo là nghiên cứu cách Chatwork xử lý việc đọc tin nhắn như thế nào. Ta bật network lên và vào thử một room bất kỳ rồi đọc. Khi đó thấy có request:

![](https://images.viblo.asia/aaf575a7-3dbf-4590-b06b-cbe48aa1e2f2.png)

vớ tham số:
```
myid: 657237
_v: 1.80a
_av: 5
ln: ja
room_id: 150077264
mid: 328590021
last_chat_id: 1242011046768562176
unread: 0
```

vậy là Chatwork sẽ gửi một `POST` request để cập nhật thông tin. Ta chú ý đến `last_chat_id`, đây chính là id của chat message cuối cùng mà chúng ta đã đọc. Vậy nếu thay đổi id này thành id cuối cùng của box, ta sẽ giải quyết được bài toán :heart_eyes:?

Tìm kiếm thử các từ khoá `read`, `readAll`, `post`, `last_chat_id`, thấy có một số đoạn `post("read",` và dẫn ta đến hai hàm khả nghi:
![](https://images.viblo.asia/5f1e68ef-5694-4cac-b6fb-b3ce48dabf77.png)

và

![](https://images.viblo.asia/aa912001-f244-4152-bcac-7cd3202f5c27.png)

Test thử thì hàm số 1 chính cái chúng ta cần tìm.

![](https://images.viblo.asia/88a60d4c-9ba8-4df4-a131-e279c133b34a.png)

vậy ta có thể chạy đoạn update script kiểu kiểu:

```
abc.post("read", {room_id: xxx, mid: yyy, last_chat_id: zzz, unread: 0}, {});
```

nếu như `abc` được expose ra global, giờ ta cần tìm thử xem `abc` là gì và có được expose ra để cho ta dùng hay không?

Đào bới tiếp trong "biển code" thì phát hiện class này được extend ra từ `APIService` và có tên `readAPIService`. Có thể thêm `console.trace();` để sinh ra stack call đến hàm được gọi.

Cuối cùng, kiểm tra lại object global `CW` thì cái chúng ta cần tìm đây rồi:

![](https://images.viblo.asia/a7f9d689-7a60-4850-b056-9e924fa3003c.png)

## Payload cuối cùng

```javascript
CW.application.domainAPIServiceContext.readAPIService.post(
  "read", {
    room_id: RM.id,
    mid: RM.mid,
    last_chat_id: RM.timeline.chat_list[RM.timeline.chat_list.length-1].id,
    unread: 0
  },
  {}
);
```

Với `RM` là của room hiện tại, đồng thời ta chũng lấy ra được `id` và `mid` cũng như chat message id cuối cùng của room để đọc, Hãy vào room có hơn 1000 message, bật F12 lên, paste đoạn kia vào xem có điều kỳ diệu nào ko nhé :hugs:. Hi vọng các Chat++ Contributor sớm đưa tính năng này vào bản cập nhật tiếp theo :sunglasses:

# Tổng kết
Với cách này ta có thể debug được file js và giải quyết được bài toán. Tuy nhiên vẫn còn vài vấn đề:
- Với những script được split thành các chunk sẽ rắc rối hơn
- Việc tìm hiếm property của của object đang khá mất công, ta gặp may vì nó ko nesting nhiều lắm. Cần có công cụ giúp chúng ta duyệt qua tất cả các thuộc tính cũng như `__proto__` để tìm kiếm dễ dàng hơn
- Giữa rất nhiều module như vậy, việc phân biệt giữa code thư viện và code thực sự của app là không dễ
- Xử lý cho trường hợp có header CSP

Mình vẫn đang tìm hiểu về vấn đề này, hi vọng sẽ có tiếp những tips hay ho để chia sẻ với mọi người. See ya!