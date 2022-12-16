Sau quá trình một thời gian nghiên cứu về những ứng dụng hay ho của ứng dụng **LINE**.
Hôm nay, tôi sẽ làm bài hướng dẫn làm thế nào để xây dựng một Line Chat Bot đơn giản cho ứng dụng Line Message. Chúng ta cùng bắt đầu nhé!!

## Tìm hiểu về LINE bot
**LINE** là một trong những ứng dụng nhắn tin phổ biến nhất trên khắp châu Á. LINE cung cấp cho chúng ta một bot API mạnh mẽ với nhiều SDK và tích hợp đơn giản.

Khi bạn xây dựng một ứng dựng bot bằng ngôn ngữ nào cũng sẽ sử dụng LINE Messaging API để kết nối với kênh và liên lạc với người dùng thông qua tin nhắn văn bản, tin nhắn sticker, tin nhắn hình ảnh, v.v.. 

API sẽ truyền dữ liệu giữa bot của bạn và LINE. Người dùng gửi tin nhắn đến tài khoản bot LINE của bạn.
Sau đó LINE gửi một sự kiện webhook đến máy chủ bot của bạn, nó truyền một phản hồi theo các định nghĩa bạn đã thiết lập cho hành vi bot của bạn như: follow, unfollow, message, postback, v.v..
## Thiết lập một Line Bot mới
### Đăng ký Messaging API
1.  Đăng nhập [Developer LINE](https://developers.line.biz/) và lựa chọn "**Add new provider**"
2. Chọn "**Create New Provider**" và nhập tên Provider.

![](https://images.viblo.asia/23ed2584-41f9-4955-9cd3-b36d0e16f3df.png)

3. Tạo một channel **Messaging API**

![](https://images.viblo.asia/b72ecab4-cdc6-4dbe-9f79-a97bfd1e7f81.jpg)

4. Lựa chọn Channel vừa tạo và di chuyển xuống tab **Messaging settings** lựa chọn **Issue** để đăng ký một **Channel access token** mới. Những thông tin bắt buộc để có thể cấu hình cho một LINE bot mới bao gồm:
* Channel ID
* Channel secret
* Channel access token
### Kích hoạt LINE Webhook
1. Kích hoạt **Use webhooks**
2. Nhập Webhook URL của bạn (yêu cầu sử dụng https://...)
3. Xác nhận verify để kiểm tra Webhook URL đã hoạt động được hay chưa?
![](https://images.viblo.asia/7f2a07fa-5324-4f7b-ae22-1d33f5b3124c.jpg)
### Kiểm tra Chat bot
Thực hiện follow thử Line bot vừa tạo để kiểm tra xem line bot đã hoạt động hay chưa bằng cách quét mã QR và lựa chọn Thêm bạn hoặc Theo dõi.

![](https://images.viblo.asia/574addd1-8501-4141-b7f4-e3ddf34fd689.jpg)

## Tạo ứng dụng Node JS với Line bot SDK
### Cài đặt ứng dụng Node JS
1. Khởi tạo ứng dụng node với  `npm init` & `npm install`
2. Chúng ta sẽ sử dụng **Express** framework để tạo ứng dụng

```
npm install express --save
```
3. Cài đặt thư viện Line bot SDK

```
npm install @line/bot-sdk --save
```
### Tạo Server Webhook
Tạo server đơn giản http://localhost:3000/

```JS
const express = require('express')

const app = express()

app.post('/webhook', (req, res) => {
  res.json({})
})

app.listen(3000)
```
Chúng ta sẽ mở cổng 3000 để luôn lắng nghe và phản hồi các sự kiện từ `POST /webhook`.
### Import `middleware`
Import thư viện `middleware` để bảo vệ ứng dụng của mình và xử lý lỗi `Error handling` cho server webhook như sau:

```JS
const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed

const app = express()

app.use(middleware(config))

app.post('/webhook', (req, res) => {
  res.json(req.body.events) // req.body will be webhook event object
})

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature)
    return
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw)
    return
  }
  next(err) // will throw default 500
})

app.listen(3000)
```
Có 2 kiểu lỗi được ném ra bởi `middleware` là `SignatureValidationFailed` và `JSONParseError`.
* `SignatureValidationFailed` xảy ra khi một request thiếu signature.
* `SignatureValidationFailed` xảy ra khi một request sai signature.
* `JSONParseError` xảy ra khi yêu cầu không thể được phân tích cú pháp dưới dạng JSON.

### Khởi tạo `Client`
```JS
// CommonJS
const Client = require('@line/bot-sdk').Client;

// ES6 modules or TypeScript
import { Client } from '@line/bot-sdk';
```
```JS
const client = new Client({
  channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
  channelSecret: 'YOUR_CHANNEL_SECRET'
});
```
### Bắt sự kiện từ Webhook

Ví dụ: Khi người dùng nhắn tin cho Line Bot của bạn tham số nhận được bao gồm:
```JSON
{
  "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
  "type": "message",
  "timestamp": 1462629479859,
  "source": {
    "type": "user",
    "userId": "U4af4980629..."
  },
  "message": {
    "id": "325708",
    "type": "text",
    "text": "Hello, world!"
  }
}
```
Lúc này chúng ta cần phân tích message như sau:
```JS
const event = req.body.events[0];

if (event.type === 'message') {
  const message = event.message;

  if (message.type === 'text' && message.text === 'hello') {
    client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Can I help you?',
      });
  }
}
```
###  Phân tích và tạo workflow
Khi chúng ta nhận được sự kiện từ `webhook` chúng ta sẽ phân tích dạng các dạng event như: message, follow, unfollow, join, v.v.. để có thể tạo ra một bộ dữ liệu cho ứng dụng Line Bot của mình.
Ví dụ như sau:
```JS
const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed

const app = express()

const config = {
  channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
  channelSecret: 'YOUR_CHANNEL_SECRET'
}

const client = new line.Client(lineConfig);
app.use(middleware(config))

app.post('/webhook', (req, res) => {
  const event = req.body.events[0];

  switch (event.type) {
    case 'join':
    case 'follow':
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Hello, Wellcome you!'
      });   
    case 'message':
      switch (event.message.type) {
          case 'text':
            switch (event.message.text) {
              case 'hello':
                return client.replyMessage(event.replyToken, {
                  type: 'text',
                  text: 'Can we help you?'
                });
              case 'I want book ticket':
                return client.replyMessage(event.replyToken, {
                  type: 'text',
                  text: 'Where do you want to book tickets?'
                });
            }
      }
  }
})

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature)
    return
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw)
    return
  }
  next(err) // will throw default 500
})

app.listen(3000)
```
### Chạy server webhook
Chúng ta có thể dựng ứng dụng của mình lên một server có **https://** để chạy thử ứng dụng của mình hoặc tham khảo tài liệu xây dựng ứng dụng với [Heroku](https://www.heroku.com/).

## Kết luận
Như vậy với hướng dẫn trên, chúng ta đã có thể xây dựng được một Line Bot cơ bản để  có thể hiểu hơn về cách thức hoạt động của Line Bot. Hy vọng mọi người sẽ có nhiều đóng góp để tôi có thể hoàn thiện hơn trong những bài chia sẻ sau. Chuyên sâu hơn và hiểu hơn về Chat Bot. Cảm ơn đã theo dõi!!!!

Tham khảo: 
> https://developers.line.biz/
> 
> https://developers.line.biz/en/reference/messaging-api/#message-event
> 
> https://developers.line.biz/en/docs/messaging-api/line-bot-sdk/