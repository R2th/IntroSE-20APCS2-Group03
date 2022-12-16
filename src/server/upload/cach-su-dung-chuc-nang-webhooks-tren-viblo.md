Nếu bạn để ý sẽ thấy một vài điều chỉnh nhỏ trên Viblo. Một trong số đó là chức năng Webhooks. Bây giờ hãy cùng mình khám phá chức năng `Webhooks` mới này của Viblo nhé! :wink:

## Webhooks

Một chức năng mới được thử nghiệm trên Viblo không lâu đó là [`Webhooks`](https://viblo.asia/settings/webhooks). Bạn sẽ thấy mục cài đặt `Webhooks` xuất hiện trên menu của trang `Preferences`, khi truy cập lần đầu sẽ thấy có giao diện như sau:

![](https://images.viblo.asia/7d0a1dd0-aa34-4390-965a-0546f3071d4e.png)

Nếu được kích hoạt, chức năng này sẽ giúp gửi một thông báo tới web server của bạn (hoặc một service nào đó bạn dùng) ngay khi có một sự kiện nhất định nào đó xảy ra trên Viblo.

Trong đó, **New post** là sự kiện đầu tiên được Viblo Team chọn để đưa vào thử nghiệm ban đầu. Sự kiện này xảy ra ngay sau khi một Author mà bạn đang `follow` đăng tải công khai một bài viết. Payload bạn nhận được sẽ có Content-Type là `application/json` và có cấu trúc như sau:
```json:New_post_payload
{
    "action": "new_post",
    "receiver": {
        "id": 1,
        "username": "username",
        "name": "fullname"
    },
    "data": {
        "post": {
            "url": "https://viblo.asia/p/hash_post",
            "title": "this is post title",
            "author": {
                "id": 1,
                "username": "username",
                "name": "fullname"
            },
            "published_at": 1576719727000
        }
    }
}
```

Bạn có thể nhấn vào `JSON payload` dưới tiêu đề để xem và copy chúng khi cần nhé! :)

## Kích hoạt webhook trên Viblo

Để kích hoạt chức năng webhook, bạn nhấn chuột vào công tắc bật/tắt ở phái bên phải. Một biểu mẫu ngắn sẽ hiển thị ra ngay sau đó, bạn cần điền giá trị cho mục `Target URL` và nhấn nút `Update` để hoàn tất việc cài đặt webhook. Trông nó sẽ có giao diện như hình dưới đây:

![](https://images.viblo.asia/def6ac72-590d-4487-a215-543c10468f21.png)

### Webhook form

![](https://images.viblo.asia/f7ea638d-3cd2-4473-b5c8-12c5fb9f1d3b.png)

Trong biểu mẫu ở hình trên:
- `Target URL`: Là đường link API dẫn tới web server mà bạn sử dụng để nhận payload từ Viblo. Mục này là bắt buộc.
- `Secure token`: Là giá trị của API Token cho `Target URL` ở trên. Mục này là không bắt buộc. Nếu có hệ thống sẽ gửi kèm header `X-API-KEY: <YOUR_SECURE_TOKEN>`.
- `Secure token header`: Được sử dụng làm header key cho `Secure token`. Mặc định, nếu bạn không điền, header key cho secure token sẽ là `X-API-KEY`. Ví dụ nếu bạn đổi thành `Authorization` thì hệ thống sẽ gửi kèm header: `Authorization: <YOUR_SECURE_TOKEN>`.
- `Use basic auth`: Bật tắt `Basic Authentication` cho API nếu bạn cần.


### Basic Authentication

Nếu `Target URL` (hay webhook) của bạn có xác thực `Basic Authentication` thì bạn cần bật `Use basic auth` và nhập `username`, `password` nữa nhé! :wink:

![](https://images.viblo.asia/0ea26212-e617-4351-9ffb-3d3c14c67541.png)


## Viblo + Chatwork Forwarder

Viblo Team sẽ lấy một ví dụ về việc sử dụng Webhooks trên Viblo để gửi thông báo **New post** về box chat trên [`Chatwork`](https://chatwork.com) thông qua một dịch vụ miễn phí có tên là ***Chatwork Forwarder*** mới được tác giả @quachphuc giới thiệu trên Viblo trong bài viết *Chatwork forwarder - Giải pháp cho sự lười biếng*. Bạn có thể đọc thêm [tại đây](https://viblo.asia/p/chatwork-forwarder-giai-phap-cho-su-luoi-bieng-maGK7qN9lj2), còn bây giờ hãy cùng bắt đầu tích hợp với Viblo nhé!

### Chatwork API Token

Chúng ta cần chuẩn bị Chatwork API Token để có thể gửi được message từ Chatwork Forwarder về Chatwork.

Bạn đăng nhập vào [Chatwork](https://chatwork.com), sau đó nhấn vàu User Menu ở góc trên bên phải chọn *Thiết lập API*.

![](https://images.viblo.asia/c9139718-2ec4-4ad4-aa51-6d7dabf71296.png)

Cửa sổ mới hiện ra, nhập mật khẩu và nhấn *Display* để hiển thị API Token. Bạn copy API Token này nhé! :wink:

### Cấu hình Chatwork Forwarder

Truy cập website của Chatwork Forwarder tại đây https://cw-forwarder.sun-asterisk.vn sau đó đăng nhập bằng tài khoản Google để tiếp tục nhé bạn.

#### Tạo Bot

Tiếp tục, bạn truy cập trang này https://cw-forwarder.sun-asterisk.vn/bots/create để tạo một con Bot, sẽ dùng nó để gửi message về Chatwork.

![](https://images.viblo.asia/1f38cbfa-358a-447f-bdcc-36a0af6bba50.png)

Hãy điền đầy đủ `Bot name` và `Bot Key` để hoàn tất. Trong đó:
- Bot name là tên của con Bot
- Bot key là Chatwork API Token mà bạn vừa copy ở trên

#### Tích hợp webhook

Sau khi tạo bot là xong 50% rồi! :) Bây giờ bạn chỉ cần vào mục tích hợp Viblo + Chatwork Forwarder bằng cách vào menu Webhooks > Create hoặc vào link trực tiếp tại https://cw-forwarder.sun-asterisk.vn/webhooks/create.

Bạn nhập tên webhook để sau này dễ dàng nhận biết được nó dùng để làm gì. Chọn con Bot bạn vừa thêm, tên box sẽ nhận thông báo. Rồi nhấn Create để tạo mới webhook.

![](https://images.viblo.asia/c6eb7c5d-9d37-46a4-9d86-672e8e7c54b6.png)

Cuối cùng, chúng sẽ cần hình một tẹo để biến JSON payload của Viblo thành một message dạng text gửi về Chatwork. Chúng ta thực hiện thêm ***Payload*** cho cái webhook vừa tạo theo mẫu sau.

![](https://images.viblo.asia/89dad0be-892f-44f0-8007-47578ef6dfa1.png)

Trong đó, Viblo Payload chính là mẫu payload mà Viblo cung cấp trong trang https://viblo.asia/settings/webhooks. Còn `Content` chính là message sẽ gửi về Chatwork.

Chúng ta cần copy payload cho Chatwork Forwarder để nó biết được cấu trúc payload và parse payload để đưa nó thành biến `$params` mà bạn có thể thấy mình sử dụng trong phần Content trong ảnh trên.

Nhấn Save là việc cài đặt Chatwork Forwarder đã hoàn tất.

### Cấu hình Viblo Webhooks

Bây giờ, kích hoạt Webhook trên Viblo là mọi thứ sẽ hoàn tất. Chúng ta chỉ cần copy Webhook URL bạn vừa tạo:

![](https://images.viblo.asia/9dce96ce-ee6e-41ce-8ac7-799e9fb9cb99.png)

![](https://images.viblo.asia/ca8a8bc0-ac54-4e83-bf4c-d9f6ef68a65a.png)

Nhấn Update & Test để lưu lại và test thử. Viblo sẽ gửi payload mẫu về webhook mà bạn vừa thêm.

![](https://images.viblo.asia/9bb0c7bd-bc15-46a1-b115-1021fcb7e601.png)

Mọi thứ đều hoạt động ổn, bây giờ bạn có thể sử dụng chức năng này để ngay lập tức nhận được thông báo từ Viblo nha!

Sử dụng Chatwork Forwarder chỉ là một cách để Viblo Team dùng và giới thiệu tới bạn đọc. Còn bạn vẫn có thể tùy biến, tạo webhook của riêng mình để gửi về Slack, Skype... nhé! :laughing:

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***