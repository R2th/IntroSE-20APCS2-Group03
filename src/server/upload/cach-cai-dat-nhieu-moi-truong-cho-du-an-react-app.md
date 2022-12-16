Khi phát triển bất kì React App nào, thì developer chỉ có thể sử dụng đến 2 môi trường chính đó là 

1. **Development**  **NODE_ENV=development** là phát triển ứng dụng trên môi trường local

2. **Production** **NODE_ENV=production** khi build ứng dụng cho end user 

Khi chúng ta sử dụng [create-react-app](https://github.com/facebook/create-react-app), file package.json có các lệnh sau 

```
"scripts": {
  "start": "react-scripts start", // NODE_ENV=development as default
  "build": "react-scripts build", // NODE_ENV=production as default
}
```


Nếu sử dụng [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate) thì file package.json cũng chỉ có các lệnh sau

```
"scripts": {
 "start": "cross-env NODE_ENV=development node server",
 "start:production": "npm run test && npm run build && npm run start:prod",
}
```


Trên thực tế khi phát triển 1 ứng dụng React App chúng ta thường có nhiều hơn 2 môi trường phát triển phải kể đến đó là

1. ***Development***
1. ***Testing***
1. ***Staging***
1. ***Production***

Nếu dùng [react-scripts](https://www.npmjs.com/package/react-scripts)  hay  [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate) mới chỉ support 2 môi trường cơ bản là **development** and **production**. Câu hỏi đặt ra là làm sao chúng ta có thể setup được nhiều môi trường

Để làm được điều này ngoài cách config trong `webpack` ra, chúng ta còn có 1 cách khác cũng khá đơn giản đó là dùng [env-cmd](https://www.npmjs.com/package/env-cmd). Package **env-cmd** cho phép chúng ta sử dụng `env` như một biến phụ thuộc vào từng môi trường.

Để dùng được **env-cmd** chúng ta cần cài đặt bằng lệnh sau 

```
npm install env-cmd --save

```

App chúng ta chạy trên 4 môi trường mà các endpoint api lại khác nhau, để setup được với **env-cmd** chúng ta làm như sau.

Công việc đầu tiên sau khi cài đặt xong là bạn tạo ra  file `.env.*` 

1. File `.env` với nội dung như sau
```
REACT_APP_NAME = "my-app"

```
2. File `.env.development` api cho môi trường development 

```
REACT_APP_API_ENDPOINT = "https://api-dev.endpoint.com/"

```

3.   File `.env.testing` api cho môi trường testing 
```
REACT_APP_API_ENDPOINT = "https://api-testing.endpoint.com/"
```

4.   File `.env.staging` api cho môi trường staging
```
REACT_APP_API_ENDPOINT = "https://api-staging.endpoint.com/"
```

5.   File `.env.production`  api cho môi trường production

```
REACT_APP_API_ENDPOINT = "https://api.endpoint.com/"

```

Chú ý rằng tiền tố `REACT_APP_` là bắt buộc cho việc custom variable trong react app.

Tiếp theo công việc trở nên nhẹ nhàng rồi, mở file `package.json` lên và chỉnh sửa đoạn `script` cũ thay thế bằng đoạn code sau 

```
scripts: {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "build:testing": "env-cmd -f .env.testing react-scripts build",
  "build:staging": "env-cmd -f .env.staging react-scripts build",
  "build:production": "env-cmd -f .env.production react-scripts build",
}
```

Bây giờ nếu muốn run app với môi trường nào thì chúng ta chỉ cần run với các hậu tố như `testing`, `staging`, `production`

Ví dụ muốn test app với với môi trường `testing`

```
npm run build:testing
```

`staging`

```
npm run build:staging

```

`production`

```
npm run build:production

```

Công việc config nhiều môi trường phát triển cho react-app với `env-cmd` cũng đơn giản phải không? 

Hi vọng bài viết cung cấp một giải pháp cho những ai đang cần config nhiều môi trường cho react-app.

Link tham khảo [medium](https://medium.com/better-programming/managing-environments-for-provisional-builds-with-react-app-1fb411e3597)