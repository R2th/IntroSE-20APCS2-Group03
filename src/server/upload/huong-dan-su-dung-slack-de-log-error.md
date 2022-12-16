Tham gia viblo đã lâu nhưng đây là lần đầu em viết bài trên này. Có gì sai sót mong được các bác chỉ giáo :D

Vừa rồi thấy ông anh trong công ty làm 1 con app để log lỗi về Slack. Trông cũng trực quan và thú vị hơn đọc mail. Tranh thủ tớ tạt qua la liếm và về viết 1 bài.


## Cơ chế hoạt động

Cơ chế khá đơn giản: Slack cho ta tạo app trong workspace. Từ app này tạo ra 1 đường dẫn webhook tới 1 channel. Khi bắn 1 post request theo định dạng của Slack yêu cầu thì Slack sẽ gửi tin nhắn đến cho channel ấy

![Flow](https://minhphong306.files.wordpress.com/2018/09/slack-api-architecture.png)

## Thực hiện
### Tạo slack app
Đầu tiên, ta cần tạo slack app. Truy cập vào trang chủ Slack API: https://api.slack.com/, click vào **Start building**. Một hộp thoại hiện ra như hình dưới.

![create slack app](https://minhphong306.files.wordpress.com/2018/09/create-slack-app.png)

Bạn điền tên app mà bạn muốn tạo + chọn workspace cho app rồi bấm submit.

Màn hình tiếp theo này Slack liệt kê ra khá nhiều tính năng. Ở phạm vi bài này, chúng ta chỉ tạo 1 con bot để log error đơn giản. Do vậy chỉ dùng tới tính năng **Incoming webhook**. Bạn click vào **Incoming webhook**
![setup incoming webhook](https://minhphong306.files.wordpress.com/2018/09/set-up-incoming-webhook.png)

Bạn sẽ được chuyển tới màn hình bên dưới. Gạt thanh trạng thái để bật active incoming webhook.
![Turn on incoming webhook](https://minhphong306.files.wordpress.com/2018/09/gat-thanh-trang-thai-de-bat-incoming-webhook.png)

Kéo xuống dưới, click vào **Add new webhook to workspace**. Bạn được chuyển tới trang **Authorize**. Tại đây, chọn channel mà bạn muốn nhắn tin tới sau đó click **authorize**
![Choose channel and authorize](https://minhphong306.files.wordpress.com/2018/09/click-chon-channel-va-authorize.png)

Lúc này Slack sẽ generate ra cho bạn 1 URL webhook để bạn có thể gửi message.
![Copy webhook url](https://minhphong306.files.wordpress.com/2018/09/coppy-webhook-url.png)

Thử sử dụng postman để test:
![Test send message in postman](https://minhphong306.files.wordpress.com/2018/09/test-gui-message-tren-post-man.png)

Về cơ bản thì tới đây bạn đã có thể tạo cho mình 1 con app đơn giản để log error. Lúc nào gặp lỗi thì tạo 1 POST request bắn vào cái URL kia message lỗi (lỗi do thằng nào, dòng bao nhiêu, chi tiết tin nhắn lỗi là gì,... blah... blah) rất trực quan. Đỡ phải đọc đống log trong cmd muốn lòi con mắt :facepalm:
Tuy nhiên thì bạn có thể tham khảo thêm phần định dạng tin nhắn và mention phía dưới để việc log error fun hơn nữa :))

### Định dạng tin nhắn
Để tin nhắn trông sinh động, dễ nhìn hơn thì bạn có thể sử dụng format tin nhắn trong slack. Tớ hay sử dụng định dạng tin nhắn như này để log lỗi:

```json
{
    "attachments": [
        {
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#36a64f",
            "pretext": "Error when get sexy girl from API",
            "author_name": "From: minhphong306 API",
            "author_link": "http://flickr.com/bobby/",
            "author_icon": "http://static.minhphong306.com/images/daicaphong/me.jpg",
            "title": "Open error detail",
            "title_link": "https://api.slack.com/",
            "text": "See error detail",
            "fields": [
                {
                    "title": "Priority",
                    "value": "High",
                    "short": false
                }
            ],
            "image_url": "http://my-website.com/path/to/image.jpg",
            "thumb_url": "http://example.com/path/to/thumb.png",
            "footer": "Slack API",
            "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            "ts": 1537641882
        }
    ]
}
```
Tin nhắn của bạn trông như này
![message](https://minhphong306.files.wordpress.com/2018/09/error-formating.png)

Bạn có thể đọc thêm ở đây để custom thêm các định dạng khác thú vị và phù hợp hơn:

https://api.slack.com/docs/message-formatting

### Mention trong slack
Thi thoảng, để tập trung làm việc thì tớ chỉ bật thông báo đối với các tin nhắn có mention. Thế nên thi thoảng tớ bị miss một số lỗi fatal :( . Để khắc phục tình trạng này thì ta sử dụng chức năng mention thông qua user id với các lỗi fatal.

Để lấy ID của 1 người, đầu tiên click vào **View Profile** -> **More Action** -> **Coppy MemberID** để lấy ID

![Get id to mention](https://minhphong306.files.wordpress.com/2018/09/lay-id-de-mention.png)

Để tự lấy ID của chính bạn thì tớ đếch biết lấy thế nào nữa, nên cách dễ nhất là nhờ thằng khác coppy cái ID của bạn rồi gửi lại cho bạn cho nó nhanh :v

Thêm mention ID của người này vào trong slack ta sử dụng <@user_id>.
Như vậy với ID là UC0CE05JP thì message của tớ trông như này

```json
{
    "attachments": [
        {
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#36a64f",
            "pretext": "Đại ca <@UC0CE05JP> ơi, có phốt rồi :facepalm:",
            "author_name": "From: minhphong306 API",
            "author_link": "http://flickr.com/bobby/",
            "author_icon": "http://static.minhphong306.com/images/daicaphong/me.jpg",
            "title": "Open error detail",
            "title_link": "https://api.slack.com/",
            "text": "See error detail",
            "fields": [
                {
                    "title": "Priority",
                    "value": "High",
                    "short": false
                }
            ],
            "image_url": "http://my-website.com/path/to/image.jpg",
            "thumb_url": "http://example.com/path/to/thumb.png",
            "footer": "Slack API",
            "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            "ts": 1537641882
        }
    ]
}
```

Và kết quả trông như này:
![mention message](https://minhphong306.files.wordpress.com/2018/09/ket-qua-khi-su-dung-mentioon.png)

Hi vọng bài viết giúp ích được cho bạn.
Nếu trong bài có gì sai sót hoặc bạn cần support do gặp lỗi, hãy comment cho tớ biết nhé ^^
Thanks for reading ^^

Nguồn bài viết từ blog của tớ: https://minhphong306.wordpress.com/2018/09/22/huong-dan-su-dung-slack-de-log-error/

minhphong306 10-05-2020