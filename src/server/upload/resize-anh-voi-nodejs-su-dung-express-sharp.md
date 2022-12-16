## Mô tả
Resize ảnh là 1 task rất phổ biến trong một dự án phần mềm. Ví dụ như khi hiển thị trên mobile ta cần những bức ảnh nhỏ hơn để tối ưu kích thước dung lượng request trả về và tăng tốc độ giúp cải thiện trải nghiệm người dùng. Hoặc bức ảnh đó bạn dùng vào nhiều mục đích (làm thumbnail 400x300, avatar 50x50 hay full screen 1920x1080).

Bạn sẽ cần bức ảnh với nhiều kích thước khác nhau. 

Mình tìm kiếm khá nhiều và tìm được 1 giải pháp khá hay. Đó chính là sự kết hợp giữa Amazon S3, AWS Lambda và Amazon API Gateway(bạn có thể tham khảo từ bài viết này: https://aws.amazon.com/blogs/compute/resize-images-on-the-fly-with-amazon-s3-aws-lambda-and-amazon-api-gateway/).  Vì hiện nay các bức ảnh chủ yếu được lưu trữ trên Amazon S3 và để giảm tải việc xử lý cho server. 

![](https://images.viblo.asia/4e82fe43-8e73-44f1-8418-658dad6d9b82.png)

Nhưng mình đọc mãi bài viết đó không làm được :D. Về cơ bản thì follow của nó như này:

- Khi user request một resized image (bức ảnh nén) qua 1 static hostting. Bucket được config để có thể redirect sang API resize ảnh cho những bức ảnh không tồn tại (chưa được resize).   
- Vì bức ảnh đó không tồn tại nên redirect và request đến hàm resize ảnh thông qua API Gateway.
- API Gateway method được config để trigger đến một Lambda function để xử lý request đó. 
-  Lambda function sẽ download orriginal image từ S3 bucket. Và resize nó, upload bức ảnh resize lên bucket với key từ original request key. 
-  Khi Lambda function hoàn thành, API Gateway redirect user đến file được lưu ở S3.
-  Giờ thì user đã hoàn toàn có thể lấy bức ảnh đã được resize từ S3 bucket. Lần sau khi có request đến bức ảnh resize thì nó sẽ trả về trực tiếp bức ảnh đã được resize mà không cần chạy hàm resize. Nếu bức ảnh resize bị xóa, thì sẽ lặp lại các bước trên và tạo lại bức ảnh resize và thay thế lên S3 bucket. 



Ở bài này mình sẽ  code một ứng dụng để có thể resize ảnh với Node.js sử dụng thư viện Sharp (https://github.com/lovell/sharp). 
Bài tiếp theo, mình sẽ tạo AWS Lambda function và config hệ thống giống như bài viết hướng dẫn trên. Chúng ta sẽ đi từng bước một nhé!


## Cài đặt project với Express
Đầu tiên, tạo một folder và khởi tạo nó với Node.js:
```
// terminal
mkdir resize-image && cd resize-image && yarn init
```


Tạo 2 file: 
- server.js
- resize.js
```
// terminal
touch server.js resize.js
```

Cài đặt `express` và `sharp`: 
```
# terminal
npm install express --save
npm install sharp --save
# hoặc bạn có thể cài đặt với yarn:
yarn add express
yarn add sharp
```


## Tạo server Express cơ bản

```
// server.js
const express = require('express')
const server = express()
server.listen(3000, () => {
    console.log('Server is running on port 3000!')
})
```

```
# terminal
node server.js
```

Mình vừa khởi tạo server runtime đơn giản với Express  :D 
## Xử lý request, response ảnh
Bước tiếp theo, chúng ta sẽ tạo một request `image/png` trả về một bức ảnh. 

Bạn cần có một file image để test và copy vào folder của project. Ở đây mình có 1 bức ảnh logo Node.js, bạn cũng có thể dùng nó: https://github.com/oNguyenVanThinh/resize-image/blob/master/images/normal/nodejs.png

```
// resize.js
const fs = require('fs')

module.exports = function resize(path, format, width, height) {
    const readStream = fs.createReadStream(path)
    return readStream
}
```

```
// server.js
const express = require('express')
const server = express()
const resize = require('./resize')

server.get('/', (req, res) => {
    res.type('image/png')
    resize('nodejs.png').pipe(res)
}

server.listen(3000, () => {
    console.log('Server is running on port 3000!')
})
```

Và bạn đã có 1 request có type là `image/png`   trả về bức ảnh logo Node.js: 
http://localhost:3000


## Resize ảnh sử dụng thư viện Sharp
![](https://images.viblo.asia/8c92af33-1111-40f1-b71f-d1f6058cc0fe.png)

Giờ thì cần sử dụng Sharp để resize bức ảnh đó và trả về với kích thước (width, height) với định dạng format (png hay jpg). 
```
// resize.js
const fs = require('fs')
const sharp = require('sharp')

module.exports = function resize(path, format, width, height) {
  const readStream = fs.createReadStream(path)
  let transform = sharp()
  if (format) {
    transform = transform.toFormat(format)
  }
  if (width || height) {
    transform = transform.resize(width, height)
  }
  return readStream.pipe(transform)
}
```


```
// server.js
const express = require('express')
const server = express()
const resize = require('./resize')

server.get('/', (req, res) => {
  const widthStr = req.query.width
  const heightStr = req.query.height
  const format = req.query.format
  let width, height
  if (widthStr) {
    width = parseInt(widthStr)
  }
  if (heightStr) {
    height = parseInt(heightStr)
  }
  res.type(`image/${ format || 'png' }`)
  resize('images/normal/nodejs.png', format, width, height).pipe(res)
})

server.listen(3000, () => {
    console.log('Server is running on port 3000!')
})
```


Giờ thì vào đường link này, chúng ta sẽ có 1 bức ảnh với kích thước là 50x50:
http://localhost:3000?format=png&width=50&height=50


## Kết quả
Mình đã thử resize bức ảnh logo Node.js bằng một công cụ online đó là http://www.picresize.com/ với kích thước 50x50 và được 1 bức ảnh dung lượng 2.8kb. Nhưng với ứng dụng của chúng ta thì bức ảnh resize 50x50 chỉ có kích thước 2.5kb. Thật tuyết vời. 

Và tốc độ xử lý cũng rất nhanh gần như sau khi request thì nó trả về tức thì. 

## Một vài lưu ý
Bạn có thể đọc bài viết này để hiểu thêm về `Node.js Streams`: 
https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93

Một bài viết rất hay đấy! :D

## Tóm lược
Mình mong bài viết này sẽ hữu cho các bạn đang tìm hiểu về resize ảnh với Node.js. Và chúc các bạn code vui vẻ :smiley: 
Source code: https://github.com/oNguyenVanThinh/resize-image



Bài viết tham khảo từ: 
https://malcoded.com/posts/nodejs-image-resize-express-sharp