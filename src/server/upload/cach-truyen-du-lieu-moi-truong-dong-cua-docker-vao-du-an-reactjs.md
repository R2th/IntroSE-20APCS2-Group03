Bài viết này sẽ hướng dẫn mọi người cách đưa dữ liệu môi trường ENV của docker vào trong dự án reactjs mà không cần phải rebuild lại image hay dùng docker-compose. Do đây là bài viết đầu tiên nên mong mọi người ủng hộ và đồng hành với mình trong quá trình học code

# Mục tiêu bài viết:
- Gói image sẽ không cần build lại mỗi khi chạy
- Yêu cầu chỉnh sửa code thấp nhất
- Cho phép truy cập đồng bộ các biến môi trường
- Đơn giản hoá phương thức thực hiện
- dễ dàng đưa vào 1 project đang phát triễn mà ít gây ảnh hưởng nhất

## Module react-inject-env cho phép người dùng ngay lập tức truy cập các dử liệu môi trường sau khi build xong file react
nói vắn tắt là khi ta truyền dữ liệu **env** từ **docker** vào thì **react-inject-env** sẽ bỏ vào trong  1 file `env.js` sau khi được tạo build trong folder `/build`,  thì khi chạy dữ liệu sẽ được xuất ra bởi hàm `window`

## Đây là cách sử dụng

### 0. cấu trúc thư mục cơ bản
![image.png](https://images.viblo.asia/e5e320bb-4c37-4842-90d4-9b73b28fa832.png)

### 1. cài module react-inject-env
`npm install react-inject-env --save-dev`
hoặc
`yarn add react-inject-env --dev`

### 2. thêm vào file `index.html` tạo trong thư mục src
`<script src='/env.js'></script>`

### 3. trong thư mục src tạo thêm 1 file `env.js`
`export const env = { ...process.env, ...window.env }`

### 4. giờ ta có thể thay thế tất cả từ khoá `window.env` hoặc `process.env` bằng `env`
```javascript
import { env } from './env'

export const App = () => {
return (
  <div style={{backgroundColor: env.REACT_APP_COLOR}}>
    <span>{env.REACT_APP_MAIN_TEXT}</span>
  </div>
  )
}
```

### 5. kế đến chúng ta có thể build gói react bằng lệnh `npm run build` hoặc `react-scripts build` tuỳ thuộc vào dự án của các bạn như  thế nào

### 6. chạy thử lệnh set giá trị 
[trong trường hợp dùng giá trị từ env] `npx react-inject-env set`

`REACT_APP_COLOR=blue REACT_APP_MAIN_TEXT="Blue Background" npx react-inject-env set`

nếu dung window 
`set REACT_APP_COLOR=navy&& set REACT_APP_MAIN_TEXT=Navy Background&& npx react-inject-env set`

### 7. mở file build/env.js để xem thành quả

![image.png](https://images.viblo.asia/a4754899-34e0-4c33-a8d8-2f67da37bccb.png)

nếu xuất hiện đúng giá trị bạn truyền vào thì bạn đã thành công ! chúc mừng bạn

##  Xong hết rồi , chỉ thế thôi, giờ làm sao để sử dụng nhỉ ? truyền giá trị môi trường vào như thế nào ??

### Đối với .env / dotenv
react-inject-env sẽ tự động xác định giá trị `.env` và truyền vào file build 
xin lưu ý: các giá trị trong file `.env` sẽ luôn được ưu tiên sử dụng bất kể bạn có set giá trị bằng lệnh `npx react-inject-env set` thế nào đi nữa

### Đối với Typescript
bạn hãy tạo 1 file `env.ts` thay vì `env.js` như ban đầu tại thư mục `/src` và chỉ định giá trị truyền vào
```css
declare global {
  interface Window {
    env: any
  }
}

// change with your own variables
type EnvType = {
  REACT_APP_COLOR: string,
  REACT_APP_MAIN_TEXT: string,
  REACT_APP_LINK_URL: string,
  REACT_APP_LOGO_URL: string
}
export const env: EnvType = { ...process.env, ...window.env }
```

sau khi chạy lệnh build, typescript của bạn sẽ sinh ra 1 file trong như thế này 

![image.png](https://images.viblo.asia/0a1de5b4-5081-4546-b4e2-603d01cdb1d2.png)

(nếu các bạn không chạy được thì thêm dòng "baseUrl": "." nhé)
### Cuối cùng chúng ta sẽ build Dockerfile
có rất nhiều bài viết hướng dẫn truyền vào ARG hay docker-component nhưng điều đó vô cùng bất tiện nếu như bạn muốn build 1 image và đem đi sử dụng ở nhiều thiết bị khác nhau , nên mình sẽ hướng dẫn các bạn build dockerfile

![image.png](https://images.viblo.asia/0f2d9111-84ac-4381-812d-23dd05aa880b.png)

giờ thì build thử thôi 
`docker build -t test . `

//run image test với giá trị env REACT_APP_FBOX_IP=172.10.1.243
`docker run -d -e REACT_APP_FBOX_IP=172.10.1.243 --name test test `

//truy cập vào container
`docker exec -it test /bin/sh`

//kiểm tra file env.js
`cat /usr/share/nginx/html/env.js`

![image.png](https://images.viblo.asia/df71becf-d6c6-4d42-bdbf-abf6bbb2c23c.png)

nếu xuất hiện thì chúc mừng bạn bạn đã làm được rồi đấy, vào trang web chạy thử 1 lệnh console log xem sao 
![image.png](https://images.viblo.asia/bd129e18-0af9-4361-bf6d-fb9815d26212.png)
thành công rồi giá trị gán vào đã được tìm thấy

# Kết luận
react-inject-env là 1 module giúp bạn giải quyết các vấn đề truyền giá trị bên ngoài vào trong project react, mong qua bài viết này có thể giúp mọi người hiểu rõ phương thức và cách thức để làm và thành công, xin cảm ơn

## reference
https://dev.to/eslynn/how-to-dynamically-change-your-react-environment-variables-without-re-building-55el
https://www.npmjs.com/package/react-dotenv
https://www.folkstalk.com/tech/restart-nginx-in-alpine-linix-with-code-examples/
https://github.com/codegowhere/react-inject-env/tree/develop/sample/v2