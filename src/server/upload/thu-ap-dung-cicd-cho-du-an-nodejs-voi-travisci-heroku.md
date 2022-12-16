Trong bài viết này mình build một node app đơn giản, sau đấy áp dụng thử Travis CI và Heroku
![](https://images.viblo.asia/134ea250-5b85-46db-a33f-b302b36e6987.png)
Đầu tiên, chúng ta cần hiểu CI là cái gì đã?
Hiện giờ các khái niệm về CI/CD khá là nhiều rồi nên mình sẽ không đi vào chi tiết trong bài này, chốt hạ một CI process sẽ có luồng như thế này:
1. Code được push lên repository
2. Lúc này online repository (github, gitlab,...) sẽ trigger một event
3. Code sẽ được pull về, build, chạy unit test,...
4. Kết quả của CI process sẽ được thông báo sau khi chạy xong.

# Tạo basic nodejs app
Tạo nodejs qua npm:
```shell
npm init -y
npm install --save express mocha supertest should
```
Thêm một số script vào package.json nữa :D 
```shell
{
  "name": "travis-demo",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "mocha test.js",
    "start": "node app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "mocha": "^8.0.1",
    "should": "^13.2.3",
    "supertest": "^4.0.2"
  }
}
```
## Tạo main file `app.js`
 ```js
const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
  res.send('Working...')
})

app.listen(process.env.PORT || 3000)
```
*Lưu ý*: Vì code được deploy và chạy trên heroku nên container của heroku sẽ bind PORT vào node process, vì thế chúng ta cần đẩy `process.env.PORT` vào `app.listen()`. Nếu không sẽ dính lỗi ` Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch`
## Tạo unit test
Tiếp theo mình sẽ tạo thêm 1 file sample unit test, với 2 test case đơn giản thôi :D 
```js
const superTest = require('supertest')
const server = superTest.agent('http://localhost:3000')

describe('Sample test', function () {
  it('should return home page - test content type', function (done) {
    server.get('/')
      .expect('Content-type', /text/)
      .end(function (err, res) {
        done()
      })
  })

  it('should return home page - test status', function (done) {
    server.get('/')
      .expect(200)
      .end(function (err, res) {
        done()
      })
  })
})
```
Vậy là xong phần code, lúc này config Travis và git :D
## Đăng ký và dùng thử TravisCI
Vào [](https://travis-ci.com) đăng ký thông qua github account. 
Sau đó vào [](https://travis-ci.com/account/repositories)

![](https://images.viblo.asia/e87fc7de-d590-4ac7-949f-0fb23cf88e77.png)

Bấm `Activate` để kích hoạt và cấp quyền cho TravisCI vào repo bạn muốn
## Config
Tạo file `.travis.yml` đặt tại root project
```yml
language: node_js
node_js:
  - 12
script:
  - echo '*** Starting build ***'
  - echo 'install dependencies'
  - npm install
  - echo 'Running test'
  - npm test
deploy:
  provider: heroku
  api_key: $heroku_key
  app: your-heroku-app-name
```

Trong đó:

* `language`: Định nghĩa ngôn ngữ
* `node_js`: Xác định node runtime version
* `script`: Phần script để chỉ định cho CI cần làm gì. Luồng ở đây sẽ là: Cài đặt dependencies -> chạy unit test

TravisCI sẽ chuyển `npm install` sang `npm ci` nếu `package.json` định nghĩa node support version

Chi tiết hơn các bạn có thể tham khảo docs tại: [Đây](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)

Bản thân TravisCI đã tích hợp sẵn với heroku rồi nên chúng ta chỉ cần define thêm:
* `provider`: Tên dịch vụ cloud
* api_key: API key của account (Biến $heroku_key được định nghĩ ở project setting của Travis)
* app: Tên heroku app

Cách tạo thêm heroku app như thế nào bạn có thể tham khảo tại [đây](https://viblo.asia/p/deploy-nodejs-application-on-heroku-L4x5x4dO5BM)

# Thử nghiệm
Việc setup coi như hoàn thành rồi, lúc này chúng ta chỉ cần push vào repo trên github. Chúng ta vào https://travis-ci.com/dashboard, chọn project

![](https://images.viblo.asia/48626f5b-05f5-4872-a560-57004624d174.png)
Thông tin về bản build

![](https://images.viblo.asia/3f3cec12-29a9-461a-b405-a5df5861cc48.png)
Buiding logs

![](https://images.viblo.asia/5c2d1838-fae5-4873-b083-f3ad599ff87b.png)
Deploy logs

**Đồng thời bạn có thể check luôn tại heroku**

![](https://images.viblo.asia/cf369406-0c89-4927-b958-624d26e1a964.png)

![](https://images.viblo.asia/412c6c14-d134-4848-988b-1a70222c5eba.png)

Trên đây là một ví dụ đơn giản về CI/CD với TravisCI, ngoài ra Travis còn có rất nhiều tính năng khác như cached build, trigger,... Hẹn gặp lại các bạn vào lần tới nhé :D