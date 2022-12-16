#### Chào mọi người, mình là Đại một lập trình viên fullstack và đây cũng là lần đầu tiên mình làm chuyện ấy ở viblo. Hi vọng những kiến thức mà mình chia sẽ qua những bài viết có thể phần nào giúp ích được cho các bạn :grinning:. Hôm nay mình sẽ chia sẽ "Như thế nào để kết hợp reactjs, expressjs, postresql và docker trong một ứng dụng ?". Nào hãy theo dõi bài viết này nhé :pray:
# 1. Chuẩn bị
#### Yêu cầu:
- Đã có kiến thức cơ bản về reactjs, expressjs (lập trình nodejs), một chút về postgresql và docker.
- Đã có kiến thức cơ bản về webpack, babel.
- Môi trường mình sẽ demo:
  - window 10
  - node v8.11.3
  - yarn v1.7.0
  - Docker version 18.09.2, build 6247962
#### Mục đích:
- Từng bước xây dựng một ứng dụng đơn giản với reactjs, expressjs, postgresql và docker.
#### Những phần bỏ qua:
-  Trong quá trình chúng ta thực hiện thì mình sẽ lượt bớt (không giải thích những thuật ngữ và các lệnh cơ bản) nhưng nếu không có cũng không sao, từ từ làm rồi cũng sẽ biết thôi nhé :laughing:
-  Bỏ qua các cấu hình cho môi trường `production`.
-  Cài đặt môi trường.
-  Bỏ qua css, validate, .etc
# 2. Tiến hành
#### Thư mục làm việc cơ bản như sau:
```
repo
  - client
  - server
  - database
  - docker-compose.yml
```
#### client
Đầu tiên chúng ta vào thư mục `client` và bắt đầu khởi tạo project cũng như tạo các file cần thiết.

Tạo file `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>App</title>
</head>
<body>
  <div id="app"></div>
  <script src="bundle.js"></script>
</body>
</html>
```
Tạo file `.babelrc` để chỉ định các  `preset, plugin` cho  `babel-loader`
```javascript
{
  "presets": [
    ["@babel/preset-env", { "modules": false }],
    ["@babel/preset-react", { "development": true }]
  ]
}
```
Tạo file `webpack.config.js` để `bundle`
```javascript
const webpack = require('webpack')
const path = require('path')
const rootDir = path.resolve(process.cwd())
const srcPath = path.resolve(rootDir, 'src')

module.exports = {
  mode: 'development',
  entry: `${srcPath}/app.js`,
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: srcPath,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(`http://localhost:9696/api`),
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 6969,
  },
  devtool: 'eval-source-map',
}
```
Cập nhật file `package.json`
```json
{
  "name": "client",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "axios": "^0.19.0",
    "react": "^16.8.6",
    "react-dom": "^16.8.6"
  },
  "devDependencies": {
    "@babel/core": "^7.4.5",
    "@babel/preset-env": "^7.4.5",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.6",
    "webpack": "^4.34.0",
    "webpack-cli": "^3.3.4",
    "webpack-dev-server": "^3.7.1"
  },
  "scripts": {
    "start": "webpack-dev-server --hot"
  }
}
```
Tạo file `src/app.js`. Ở đây mình chỉ làm một việc đơn giản là hiển thị danh sách sản phẩm thôi nhé :grinning:
```javascript
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const ProductList = ({ list }) => (
  <ul>
    {list.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
)

const App = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    axios({ method: 'get', url: `${API_URL}/products` })
      .then(response => setList(response.data))
      .catch(error => console.error(error))
  }, [])

  return (
    <div>
      <h2>Product list</h2>
      <ProductList list={list} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
```
Tạo file `Dockerfile` để lên kịch bản build `image` cho `client`
```bash
FROM node:10-alpine

RUN mkdir /usr/app
WORKDIR /usr/app
COPY package.json .
RUN yarn
COPY . .

CMD ["yarn", "start"]
```
Sau đó cập nhật file `docker-compose.yml` (Lưu ý khi sử dụng window thì phải setting `Shared Drives` để có thể sử dụng volumes nhé)
```yaml
version: '3.3'
services:
  client:
    build:
      context: ./client
    container_name: app-client
    volumes:
      - ./client/src:/usr/app/src
    ports:
      - 6969:6969
    networks:
      - frontend_network
    environment:
      - CHOKIDAR_USEPOLLING=true
networks:
  frontend_network:
```
Cuối cùng là run nhẹ cái app client này bằng chạy lệnh docker-compose xem nó lên gì nhé :sunglasses:
```bash
docker-compose up client
```
Kết quả
![](https://images.viblo.asia/355762ba-b441-401b-95e1-63724eb7b348.PNG)

Như vậy là đã tạo container thành công !

![](https://images.viblo.asia/8542c3de-4d78-4ea1-93e7-420fd2298547.PNG)

Thành công như mong đợi, các bạn đừng lo lắng về lỗi hiển thị ở console nhé vì mình chưa dựng `server` và `database` lên nữa nên khi gọi api sẽ bị thế :+1:
# 3. Kết luận
Tổng kết qua phần 1 này thì chúng ta đã dựng thành công container cho `client`, trong phần tiếp theo chúng ta sẽ tiếp tục dựng 2 phần còn lại là `server` và `database`. Nhìn lướt qua thì phần source code mình viết ở trên cũng không có gì khó hiểu cho các bạn đã biết cơ bản. Cảm ơn bạn đã đọc bài viết của mình, hi vọng nó mang lai cho bạn thêm một chút kiến thức gì đó và chúng ta sẽ gặp nhau sớm trong phần kế tiếp :pray: :stuck_out_tongue_winking_eye:

Link repo tại đây https://github.com/daint2git/viblo.asia/tree/master/fullstack-reactjs-expressjs-postgresql-docker