## Giới thiệu
Hiện nay thì có rất nhiều thư viện hỗ trợ việc tạo bot chat cho facebook, nhưng nếu chỉ luôn dùng các thư viện đó thì chúng ta sẽ không hiểu được nhiều. Nên trong bài viết này mình sẽ hướng dẫn cách tạo một chatbot cho facebook đơn giản nhất. Bài viết mình hướng dẫn tạo bot cho fanpage.
## Cách hoạt động
![](https://images.viblo.asia/817e0ebf-0f76-48b2-8d33-e927c8f653f4.png)
Dựa vào sơ đồ miêu tả hoạt động ở trên chúng ta có thể thấy BOT hoạt động như sau:

1. Đầu tiên khi có người gửi tin nhắn đến bot trên messenger, tin nhắn sẽ đến facebook developer và sau đó đến server bot của chúng ta để ta tiếp tục xử lý.

2. Sau khi xử lý xong, server bot sẽ trả lại tin nhắn cho người dùng thông qua api của Facebook. Và người dùng sẽ nhận lại được tin nhắn phản hồi của bot.


## Các bước để tạo chat bot
**Yêu cầu cần thiết**
1. Cài cài đặt NodeJS và npm (quản lý các package).
2. Tài khoản fb, fb developer.
3. Tài khoản heroku để delpoy server bot lên internet.
4. Phần mềm để soạn code (VS Code, Sublimetext, ...).

**Bước 1:**
- Vào facebook và tạo trang một fanpage.

![](https://images.viblo.asia/2d5d375f-7052-4943-97f4-28a7ab97d83b.png)
- Chọn mục đích của fanpage. Và đặt tên cho fanpage.

![](https://images.viblo.asia/931c1f9b-1dfb-4b7b-bd87-f69d7cdb6248.png)

- Giao diện sau khi tạo được một fanpage

**Bước 2:**
- Đăng ký tài khoản [facebook developer](www.developers.facebook.com) và tạo một ứng dụng

![](https://images.viblo.asia/a8c19702-f5d1-4fc8-8778-0ce4fde61074.png)

- Điền tên và địa chỉ email liên lạc và bấm Create App ID
![](https://images.viblo.asia/5c51d3ec-18bd-4ddb-9e0e-c3de45ec59c2.png)

- Sau khi tạo được một App trên Facebook
![](https://images.viblo.asia/066a1a97-d217-4297-a525-fab6ecec02af.png)

- Tiếp theo chúng ta cần liên kết app này đến fanpage vừa tạo lúc nãy. 
![](https://images.viblo.asia/7dd4f1c1-9b1a-403b-8dff-0d9c256988e0.jpg)
- Tìm phần Token Generation và chọn fanpage vừa tạo. Cần phải xác minh tài khoản để có thể thêm fanpage vào. Sau đó mình sẽ nhận được một token. Token này cần để bot có thể truy cập truy vào fanpage.
![](https://images.viblo.asia/ff309be3-7bc3-45b9-b2d5-8002590352f4.jpg)
Vậy là chúng ta đã kết nối được app của facebook developer đến fanpage. Các thứ còn lại là chúng ta cần tạo một server BOT và kết nối đến app này.

**Bước 3:** Đây là bước tạo server bot. Server này sẽ xử lý các tin nhắn của người dùng gửi đến và sẽ quyết định phản hồi lại. Phần này yêu cầu bạn phải biết về nodejs cũng như npm để có thể viết được server bot.
- Tạo một thư mục để chứa source code và khởi tạo project.
```
mkdir chatbot
cd chatbot
npm init
```
Nhập các thông tin cần thiết như: Tên project, người tạo, ...
- Tạo file server.js (file này dùng để chạy server nodejs).
- Thêm các pagekage cần thiết `npm install --save body-parser config express request`
- File server.js như sau:

```
const APP_SECRET = 'you app_secret';
const VALIDATION_TOKEN = 'TokenTuyChon';
const PAGE_ACCESS_TOKEN = 'your page_access_token';

var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
var server = http.createServer(app);
var request = require("request");

app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});

app.get('/webhook', function(req, res) { // Đây là path để validate tooken bên app facebook gửi qua
  if (req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

app.post('/webhook', function(req, res) { // Phần sử lý tin nhắn của người dùng gửi đến
  var entries = req.body.entry;
  for (var entry of entries) {
    var messaging = entry.messaging;
    for (var message of messaging) {
      var senderId = message.sender.id;
      if (message.message) {
        if (message.message.text) {
          var text = message.message.text;
          sendMessage(senderId, "Hello!! I'm a bot. Your message: " + text);
        }
      }
    }
  }
  res.status(200).send("OK");
});

// Đây là function dùng api của facebook để gửi tin nhắn
function sendMessage(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: PAGE_ACCESS_TOKEN,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: {
        text: message
      },
    }
  });
}

app.set('port', process.env.PORT || 5000);
app.set('ip', process.env.IP || "0.0.0.0");

server.listen(app.get('port'), app.get('ip'), function() {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});
```

Ở đây cần có APP_SECRET, VALIDATION_TOKEN, PAGE_ACCESS_TOKEN. Chúng ta lấy các token này ở đâu
   - APP_SECRET chúng ta lấy ở đây
   
![](https://images.viblo.asia/2ad637ca-a4f9-4fbe-938e-49e2443935f9.jpg)
   - VALIDATION_TOKEN: Đây là token tùy chọn, do mình đặt để xác thực các ứng dụng khi gửi tin nhắn đến server bot
   - PAGE_ACCESS_TOKEN: Để lấy token này chúng ta quay lại chỗ kết nối app trên facebook developer với fanpage. Bạn sẽ thấy token này.

OK. Vậy bây giờ đã chúng ta đã có phần server bot, nhưng vẫn chưa kết nối đến app facebook. Chúng ta cần deploy lên host. Trong bài viết này mình sử dụng host free có hỗ trợ nodejs của heroku. Host này sẽ sleep nếu sau 2h không có tương tác và sẽ tự động wake up nếu có tin nhắn gửi đến.

**Bước 4:** Deploy code lên host heroku
- Vào trang heroku. Và tạo một app. 
- Add heroku git vào project.
```
git init
git remote add heroku https://git.heroku.com/chatbot-facebook-test.git
```
- Push code lên herroku
```
git add .
git commit -m "My Code"
git push heroku master
```
- Đây là log sau khi đã deploy code thành công. Trong phần log này mình sẽ thấy host của mình là `https://chatbot-facebook-test.herokuapp.com/`

![](https://images.viblo.asia/98a59a0b-357c-4a62-afdf-9bf80251e331.png)

Vậy là code của chúng ta đã được deploy lên host.
Tiếp theo chúng ta sẽ kết nối server bot với app facebook.

**Bước 5:** Kết nối app facebook đến server bot của mình
- Vào ứng dụng trong facebook developer. Chọn phần:
![](https://images.viblo.asia/bedc4b00-e076-4cbc-9ed2-bcaf50b605be.png)

- Sau điền địa chỉ của server bot và token của server bot. Và phần Subscription Fields chọn messagesmessages, messaging_postback, messamessagin_optins để server bot có quyền đọc, gửi lại tin nhắn cho người dùng.
![](https://images.viblo.asia/75eadebf-0b53-4a02-80dc-7e399ce7eb7b.png)

- Tiếp theo đăng ký webhook này cho fanpage tạo ở trên. 

![](https://images.viblo.asia/7843ab5a-8bcf-4cd8-bd7d-da816df19894.png)

Vậy chúng ta đã làm xong tất cả các bước để có kết nối app facebook đến server bot của mình. Bậy giờ chúng ta sẽ test thử bot

![](https://images.viblo.asia/6fdb0d75-3f21-4d3c-92a9-98e6a7226d8c.png)

## Kết

Trong bài viết này mình đã hướng dẫn các bạn làm 1 con bot fanpage facebook. Chúc các bạn coding vui vẻ :)

Trong các bài viết sau mình sẽ hướng dẫn các bạn tạo một con bot cá nhân bằng 1 tài khoản facebook không thông qua fanpage nữa. Và áp dùng dialogflow để thêm trí tuệ nhân tạo cho bot.