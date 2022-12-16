Trong quá trình phát triển app mobile đôi lúc server lăn đùng ra chết hoặc đường dây mạng trong công ty có vấn đề, bạn phải chờ cho đến khi phục hồi được server hoặc đường truyền ổn định mới có thể test và code tiếp. Quá lãng phí thời gian phải không? Để giải quyết vấn đề này thì tạo mock api chính là giải pháp giúp chúng ta tránh được việc phụ thuộc vào response từ server trả về. Bài viết này sẽ giới thiệu về JSON Server giúp chúng ta tạo mock api một cách đơn giản và nhanh chóng.

# Cơ bản


Cài đặt json-server bằng câu lệnh sau  
`npm install -g json-server`

Tạo một json database và đặt tên db.json như mẫu dưới đây:
```
{
  "users": [
    {
      "id": 1,
      "userId": 101,
      "name": "Alice"
    },
    {
      "id": 2,
      "userId": 102,
      "name": "Bob"
    },
    {
      "id": 3,
      "userId": 103,
      "name": "Carol"
    }
  ]
}
```
Khởi tạo server với database vừa tạo  
`json-server --watch db.json`

Bạn đã có thể request tới server theo link sau:

`curl http://localhost:3000/users`


Lệnh GET request sẽ trả về dữ liệu đã tạo trong file json database.  Ta hãy thêm mới dữ liệu vào database bằng lệnh POST như sau:

`curl -d "userId=104&name=Dan" http://localhost:3000/users`

# Custom Routes

Nếu bạn muốn tạo các route khác nhau hay tạo package.json như sau:
```
{
  "name": "json-server-test",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "devDependencies": {
    "json-server": "^0.14.0"
  }
}
```
và một server.js như sau: 
```
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);
server.listen(port);
```

Với server.js ta sẽ tạo server, thiết lập database và router và sử dụng default middlewares. 

Để mở rộng route ta cần thêm rewriter.

```
server.use(jsonServer.rewriter({
  '/api/users': '/users'
}));
```


# POST Routes

Để tuỳ chỉnh route cho lệnh POST ta cần sử dụng bodyParser  

`server.use(jsonServer.bodyParser)`

```
server.post('/post/user', (req, res) => {
  if (req.method === 'POST') {
    let userId = req.body['userId'];
    if (userId != null && userId >= 0) {
      let result = db.users.find(user => {
        return user.userId == userId;
      })

      if (result) {
        let {id, ...user} = result;
        res.status(200).jsonp(user);
      } else {
        res.status(400).jsonp({
          error: "Bad userId"
        });
      }
    } else {
      res.status(400).jsonp({
        error: "No valid userId"
      });
    }
  }
});
```
Như vậy, điểm khác biệt duy nhất ở đây đó là ta lấy body từ request thay vì query. Nếu bạn không sử dụng bodyParse thì phần body sẽ không được định nghĩa
`curl -d "userId=101" http://localhost:3000/post/user`

Kết quả :
![](https://images.viblo.asia/9b1cdc1f-9659-47d1-b160-e553963c2523.png)
# Tạo dữ liệu Fake
Phần tạo moke api đã xong, nhưng giả sử bạn cần rất nhiều dữ liệu trong database hàng ngàn record chẳng hạn. Khi đó, việc tạo dữ liệu thủ công tỏ ra không hiệu quả. Faker sẽ giúp chúng ta giải quyết vấn đề này
Cài đặt Faker 

`npm install --save faker`

Tạo và chạy một js như sau 
```
var faker = require('faker');

function generateData () {
  var messages = [];
  for (var id = 0; id < 10; id++) {
    let priority = faker.random.number({min: 1, max: 2});
    let date = faker.date.between("2018-01-01", "2018-07-31").toISOString().split("T")[0];
    let fromId = faker.random.number({min: 1000, max: 9999})
    let message = faker.hacker.phrase();
    let status = faker.random.number(1);
    messages.push({
      "id": id,
      "from_userId": fromId,
      "date_sent": date,
      "priority": priority,
      "message": message,
      "status": status
    });
  }

  return {messages};
}

module.exports = generateData;
```
`json-server generate-data.js`

Kiểm tra dữ liệu vưa tạo bằng lệnh GET

![](https://images.viblo.asia/d909e5dc-ed07-42c9-acce-8a55fc2e94f6.png)
# Hosting  JSON Server trên Heroku
Ngoài việc lưu server trên máy local bạn hoàn toàn có thể đưa mock api server của mình lên Heroku https://www.heroku.com/ rất dễ dàng và miễn phí bằng tài khoản cá nhân
# Reference
Bài viêt này được dịch từ https://spin.atomicobject.com/2018/10/08/mock-api-json-server/