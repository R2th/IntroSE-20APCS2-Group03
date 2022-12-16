###### Trong quá trình phát triển và deploy một project lên các môi trường khác nhau, mỗi môi trường sẽ có một số thông tin ví dụ như `API_ENDPOINT`, `BASE_URL`, `UPLOAD_URL`, ... cho môi trường develop, staging, production là khác nhau.

###### Và một số thông tin cần bảo mật như `API_KEY`, `GOOGLE_MAP_KEY`, `ENCRYPT_SECRET`, ... những thông tin này chúng ta không nên commit lên git mà nên lưu giữ những thông tin này thông qua các file biến môi trường như .env, .env.development, .env.staging, .env.production.

###### Với cách lưu những loại thông tin phụ thuộc môi trường như trên, chúng ta sẽ quản lý, bảo mật và triển khai cho các môi trường khác nhau một cách dễ dàng. Và sau đây mình sẽ hướng dẫn cho các bạn cách setup, truy cập các file biến môi trường .env trong một dự án `ReactJS`.

#### Tạo file .env
Đầu tiên chúng ta cần tạo file `.env` và đặt ở root folder của project.

Cấu trúc một file biến môi trường `.env` bao gồm các cặp key/value theo format `KEY=VALUE`

Ví dụ:
```
API_ENDPOINT=https://hostname.com/api/v1
BASE_URL=https://hostname.com
UPLOAD_URL=https://hostname.com/upload
GOOGLE_MAP_KEY=xxxxxxxxxxxxxxxxxxxxxxx
```

### Config bằng create-react-app
`create-react-app` đã support biến môi trường thông qua `.env` by default. Nhưng chúng ta cần phải thêm prefix `REACT_APP_` phía trước tên key.

Ví dụ:
```
REACT_APP_API_ENDPOINT=https://hostname.com/api/v1
REACT_APP_GOOGLE_MAP_KEY=xxxxxxxxxxxxxxxxxxxxxxx
```

Như vậy là ta đã có thể sử dụng những biến môi trường này trong code bằng cách `process.env.REACT_APP_API_ENDPOINT`.

### Config bằng webpack
`Webpack` là một build tool mà đa số các dự án `ReactJs` đều dùng; `create-react-app` hay `react-boilerplate` cũng sử dụng
`webpack` làm build tool chính. Mình cũng khuyên các bạn nên dùng `webpack` nếu muốn setup manual một base project. `Webpack` có thể làm rất nhiều thứ từ copy, convert assets, build, compile, optimized, ... Nhưng bây giờ mình sẽ hướng dẫn cách config `webpack` đọc biến môi trường từ file `.env`

##### Đầu tiên chúng ta cần cài đặt plugin `dotenv-webpack`
```
npm install dotenv-webpack --save-dev

// or

yarn add dotenv-webpack --dev
```


##### Tiếp theo chúng ta cần import plugin này vào trong file `webpack` config
```js
// webpack.config.js
const Dotenv = require('dotenv-webpack');
 
module.exports = {
  ...
  plugins: [
    new Dotenv({
        path: './some.other.env' // default is .env
    })
  ]
  ...
};
```

##### Và sau khi đã config xong thì chúng ta sẽ sử dụng các biến môi trường bằng cách `process.env.KEY_NAME`
```js
// file.js
console.log(process.env.API_ENDPOINT);
```

### .gitignore
Và điều quan trọng chúng ta không nên commit, public file `.env` này lên git repo. Để tránh việc này chúng ta cần ignore chúng vào trong file `.gitignore`

```
.env
.env.production
.env.staging
```

### Deploy
Sau khi đã hoàn thành và đến giai đoạn deploy code lên server staging, production thì chúng ta chỉ việc tạo 1 file `.env` và fill các value tương ứng theo mỗi môi trường.

Như vậy việc tạo thêm files `.env.staging` `.env.production` là có thể không cần thiết, việc này chỉ giúp cho chúng ta tường minh rõ hơn về file name thôi, chứ mỗi môi trường thì value của các biến môi trường là khác nhau trong file `.env`.


Hy vọng bài viết này sẽ giúp đỡ mọi người khi bắt tay vào setup một react project, cám ơn mọi người đã đọc bài!