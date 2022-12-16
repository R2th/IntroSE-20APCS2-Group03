Ở phần 1 chúng ta đã hoàn thành phần implement ở mobile, tiếp theo chúng ta implement phần backend.
```
// index.js
var path = require('path');
var Pusher = require('pusher');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var pusher = new Pusher({
  appId: 'PUSHER_ID',
  key: 'PUSHER_KEY',
  secret: 'PUSHER_SECRET',
  cluster: 'PUSHER_CLUSTER',
  encrypted: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/messages', function(req, res){
  var message = {
    text: req.body.text,
    sender: req.body.sender
  }
  pusher.trigger('chatroom', 'new_message', message);
  res.json({success: 200});
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;

app.listen(4000, function(){
  console.log('App listening on port 4000!')
})
```

and packages.json

```
{
  "main": "index.js",
  "dependencies": {
    "body-parser": "^1.16.0",
    "express": "^4.14.1",
    "path": "^0.12.7",
    "pusher": "^1.5.1"
  }
}
```

Bây giờ chúng ta sẽ dùng npm để install, sau đó bạn sẽ nhìn thấy app đã lắng nghe đc port 4000
![](https://images.viblo.asia/572c9711-cdb8-4100-afaf-65f915840148.png)

Bây giờ chúng ta sẽ test app, chúng ta sẽ open info.plist ở Xcode

![](https://images.viblo.asia/67a7f82f-4542-4ccf-89d7-bfbdbd5054c2.png)

Với hướng dẫn này, bạn có thể xây dựng và chạy ứng dụng của mình và ứng dụng sẽ chat trực tiếp với ứng dụng trong web cục bộ của bạn.

Phần kết luận
Trong hướng dẫn này, chúng ta đã hiểu thêm về cách tạo một ứng dụng chat message iOS với thông báo status sent tin nhắn sau khi tin nhắn được gửi cho người dùng khác.
Refrence: https://pusher.com/tutorials/building-message-delivery-status-swift