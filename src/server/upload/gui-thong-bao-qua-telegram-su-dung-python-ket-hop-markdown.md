Ứng dụng **Telegram** là ứng dụng nhắn tin gọi điện miễn phí phổ biến các năm gần đây, hôm nay mình sẽ hướng dẫn mọi người cách gửi thông báo giám sát qua Telegram với ngôn ngữ Python.

**1. Tạo Telegram bot**

Tìm BotFather trên Telegram, nhấn Start nhập /newbot để tạo một bot mới đóng vai trò người gửi thông báo (notification). Sau khi nhập /newbot bạn sẽ được yêu cầu nhập name của bot.

BotFather sẽ thông báo cho bạn đã tạo bot thành công với thông tin về API token.

![image.png](https://images.viblo.asia/b5063b29-d494-4936-8920-6d8b8ae88e0f.png)

![image.png](https://images.viblo.asia/54449c73-8cf7-4bbe-ab94-0b63f816a10a.png)

![image.png](https://images.viblo.asia/334523cc-82ea-4e10-8920-1f91e531f064.png)

**2. Tạo Telegram group**

Bạn tạo một new group với member cần nhận thông báo và member bot vừa tạo. Khi ở trong group này, bạn sẽ thấy group ID ở trong địa chỉ trình duyệt, như vậy bạn đã có  2 thông tin:

**API Token**: *****************
**Chat ID**: 766239967

![image.png](https://images.viblo.asia/1dc08f4b-ec69-46dc-8518-89dc87bac44c.png)

**3. Bạn thực hành test thử như sau**

curl -s -X POST https://api.telegram.org/bot[API Token]/sendMessage -d chat_id=-766239967 -d text="Hello World"

![image.png](https://images.viblo.asia/af9b9013-5917-4424-ac83-c400e765b4fd.png)

**4. Sử dụng Markdown**

Tại sao phải sử dụng Markdown.
Markdown được sử dụng để định dạng văn bản khiến nó trở nên bắt mắt và dễ nhìn hơn, mình thường xuyên sử dụng tính năng **in đậm** để report nhìn sinh động hơn.

Dưới đây là một đoạn code python để gửi thông báo qua Telegram
```
import requests
headers = {'Content-Type': 'application/xml'} # set what your server accepts
sum_price = XYZ
body="📤 Tổng giá trị đơn hàng tạm tính theo ngày: "+"*"+sum_price+"*"
r = requests.post("https://api.telegram.org/bot68292XXXX:AAE5jvi0g1UlRammHViXH9A2vNwn0wLXXXX/sendMessage?text=" + body + "&chat_id=-100154747XXXX"+"&parse_mode=Markdown", headers=headers)
print(r.status_code)
```

Kết quả mình nhận được thông báo như hình dưới.

![image.png](https://images.viblo.asia/13aa38b4-ded4-4853-b897-d64c248f05a6.png)