Bài viết được dịch từ nguồn: https://hackernoon.com/how-to-combine-a-nodejs-back-end-with-a-reactjs-front-end-app-ea9b24715032

Trong bài này, tôi muốn show ra cách build front end và backend website sử dụng NodeJS làm backend. Chúng ta dùng server node để tạo endpoint, dữ liệu trả về có dạng JSON. Frontend sẽ dùng ReactJS.

Trong ví dụ này, ta sẽ làm một ứng dụng giới thiệu sách (guestbook), user có thể để lại các message với name của họ. Bởi vì user không cần login, ta không cần lưu giữ cái gì trong session cả. Sau đây là cách mà ứng dụng hoạt động:
![](https://images.viblo.asia/52681784-7782-4353-a9d9-b98f836ca401.png)

Về cơ bản, chúng ta cần có trong page là form để submit message đối với những book được giới thiệu. Để cho hệ thống chạy được, chúng ta bặt đầu bằng việc tạo ra endpoint đối với những POST, GET requests. Ta sẽ setup database, deploy nó, lúc đó ta có thể tạo React app, app này sẽ lấy data từ online API.

Đây là thứ tự những thứ tôi muốn làm. Bạn có thể làm với những phương pháp mà bạn cảm thấy tốt hơn, quen thuộc hơn. Các bước này theo tôi là tốt, bới vì mỗi step build dựa trên những bước trước đó.

![](https://images.viblo.asia/38be8d56-aeb6-417b-b591-169b79bf6673.png)

Link sau là project hoành chỉnh:

http://ethan.jarrell.webdeveloper.surge.sh/GuestBook

# Path 1
## Step 1

Database của ta sẽ gồm 2 trường:
1. Tên của user
2. Message mà user viết

Nếu bạn chưa thực hiện bước này, hãy bắt đầu bằng việc install MongoDB, và chạy ở post 27017. Trên command line, ta sẽ tạo database.

```
> Show dbs
> Use signatures
switched to db signatures
> show collections
> db.createCollection(guest_signatures)
```

Giờ chúng ta đã có table trong database, bây giờ sẽ tạo model cho database (dùng text editor)

## Step 2
Dùng command line để tạo mới express app. Tạo mới thư mục, sau đó chạy npm init để tạo app. Lệnh này sẽ auto tạo pkg.JSON file.

App của chúng ta dang ở dạng rất sơ bộ (very basic app), ta cần thêm 2 file khác nữa. Một file là routes, file còn lại là model/schema. Ta sẽ là modle file trước.

```
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const signatureSchema = new Schema({
  guestSignature: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  message: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
})

const Signature = mongoose.model('Signature', signatureSchema);

module.exports = Signature;
```

## Step 3
Trước khi tạo endpoint, hãy bắt đầu bằng việc list những thứ cần require. Chúng ta không cần phải require quá nhiều

```
//====LIST DEPENDENCIES===//

const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const Signature = require('./models/signature.js')
const app = express();
const url = 'mongodb://localhost:27017/signatures';

//=========================//
```

Không nhất thiết phải connect với mongoose, bạn có thể dùng MongoClient. Ta có thể dùng Signature schema vừa được khởi tạo từ bước trước.

Bây giờ sẽ tạo endpoint. Chúng ta chỉ có 1 model, và chỉ cần đọc và ghi nó, vì vậy ta sẽ tạo 2 endpoints.

1. Root directory '/', ta sẽ redirect đến API của chúng ta.
2. '/api/signatures', ta sẽ dùng để read và write

Đối với API endpoint, ta sẽ dùng method GET và POST. Ta sẽ connect database, sử dụng find(), create() cho GET, POST method. Response sẽ cần JSON format, fontend dùng React sẽ dễ dàng sử dụng hơn.

```
//====ROOT DIRECTORY===//
app.get('/', function(req, res) {
  res.json('you did it');
});
//==========================//
//====GET ALL SIGNATURES===//
app.get('/api/signatures', function(req, res) {
  Signature.find({}).then(eachOne => {
    res.json(eachOne);
    })
  })
//==========================//
//====POST NEW SIGNATURE===//
app.post('/api/signatures', function(req, res) {
  Signature.create({
    guestSignature: req.body.SignatureOfGuest,
    message: req.body.MessageofGuest,
  }).then(signature => {
    res.json(signature)
  });
});
//==========================//
```

Điều duy nhất tôi không đề cập đến ở đây là req.body.SignatureOfGuest và req.body.MessageofGuest. Những thứ khác trong section này refer đến những thứ ta đã làm ở các bước trước, database, collections và models.

## Step 4

Bây giờ, ta phải connect database:

```
const url = 'mongodb://username:password@ds79234.mlab.com:9234/signatures';
```

Ta thêm function

```
//====MONGOOSE CONNECT===//
mongoose.connect(url, function (err, db) {
 if (err) {
   console.log('Unable to connect to the mongoDB server. Error:', err);
 } else {
   console.log('Connection established to', url);
 }
});
//==========================//
```

Để chắc chắn mọ thứ hoạt động hoàn hảo, ta cần thêm app.listen ở cuối file.

Tại đây, sẽ tốt hơn nếu ta dừng lại 1 tẹo và chắc chắn rằng endpoint và local connection hoạt động. Ta có thể test bằng việc sử dụng Postman đế tạo các GET, POST request. Nếu endpoint và connection không hoạt động, ta có thể nhận được response lỗi. Nếu mọi thứ hoạt động tốt, ta có thể đọc và ghi data.

Khi mọi thứ hoạt động tốt, ta có thể setup trong acount Heroku và Mlab.

Phần 2 mình xin phép trình bày sau tại link https://viblo.asia/p/how-to-combine-a-nodejs-back-end-with-a-reactjs-front-end-app-path-2-bJzKm72kl9N, cảm ơn và hi vọng bài viết có ích cho công việc của bạn