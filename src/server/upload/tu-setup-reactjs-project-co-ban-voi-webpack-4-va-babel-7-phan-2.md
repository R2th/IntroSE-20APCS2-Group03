### Mở Đầu

Trong phần trước **[Tự Setup Reactjs Project Cơ bản Với Webpack 4 và Babel 7 (phần 1)](https://viblo.asia/p/tu-setup-reactjs-project-co-ban-voi-webpack-4-va-babel-7-phan-1-63vKj2pxK2R)**, mình đã giới thiệu đến các bạn các bước cơ bản để tự xây dựng một **react project** hiện đại với các công cụ **webpack** và **babel**. Trong phần tiếp theo mình sẽ giới thiệu tiếp cách xây dựng **project** của chúng ta trở nên hoàn thiện và đầy đủ hơn.

### Production mode và Development mode

Hiện trạng của **project** là ta đã có các thiết lập cơ bản trong **webpack.config.js**, và sau khi chạy lệnh **command**
```
npm start
```
ta nhận được một thư mục **build** bao gồm:
```
/build
    index.html
    bundle.js
```
Đây là kết quả cuối cùng mà ta mong muốn nhận được và trở thành phiên bản **production** sau này. Tuy nhiên trong quá trình phát triển, chúng ta cần thiệt lập môi trường **development** giúp phát triển ứng dụng một cách dễ dàng nhanh chóng hơn, hỗ trợ việc **hot-reload** thay vì phải **build** lại ứng dụng nhiều lần. Để thực hiện công việc, mình sẽ sử dụng **webpack-dev-server**. Đây là **dependencies** mà chúng ta đã cài đặt từ phần trước:
```
npm install --save-dev webpack-dev-server
```
**Webpack-dev-server** hoạt động tương tự **webpack** ở việc giúp tổ chức, **bundle** toàn bộ mã nguồn của **project**, đồng thời tạo một **server** tại môi trường **local** để có thể truy cập trực tiếp tới trang **web** mà chúng ta tạo ra, **webpack-dev-server** cũng cho phép tính năng **hot-reload** giúp cập nhật ngay lập tức những thay đổi trong quá trình phát triển mà không phải **build** lại. **WDS** sẽ giúp chúng ta lo những công việc trên, việc chúng ta cần là thêm một chút nội dung **config**.  
**Config** bên trong **webpack.config.js**:
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = (env) => {
  mode: env.NODE_ENV,
  const configs = {
    entry: path.join(__dirname, 'index.js'),
    output: {
        path: path.join(__dirname, 'build'),
        ...
    },
    module: {...},
    plugins: [...],
   // dev server
    devServer: {
      port: 3002,
    }
  }
  return configs
}
```
**Config** bên trong **package.json**
```js
    script: {
        "start": "webpack-dev-server --env.NODE_ENV=developement",
        "build": "webpack --env.NODE_ENV=production"
    }
```
Bây giờ khi chạy command  
```
    npm run start
```
ta sẽ có một **server development** cho **app** của mình tại đường dẫn: http://localhost:3002. Trong quá trình này, mình có **set** thêm thuộc tính **mode** là **development** và **production** tương ứng với 2 mục đích khi chúng ta **build** ứng dụng của mình, đối với **mode=production**, mã nguồn của chúng ta sẽ được **webpack** xử lý và thu gọn giúp tối ưu về dung lượng và hiệu suất của ứng dụng, ngược lại ở môi trường **mode=development**, **code** sẽ dễ đọc và dễ **debug** hơn phục vụ cho việc phát triển ứng dụng.  Tham khảo thêm về **config** đối với **devServer** tại [đây](https://webpack.js.org/configuration/dev-server)

###  Setup For Styling  
Mình sẽ gợi ý bạn sử dụng **styled-components** làm công cụ **style** cho ứng dụng, ưu điểm của **styled-components** là bạn hoàn toàn viết **style** trong **javascript**, cho phép việc viết **dynamic style** một cách hiệu quả và dễ dàng hơn cũng như không cần thêm **config**. Tuy nhiên nếu bạn vẫn muốn sử dụng **style** bằng **css** sau đó **import** vào bên trong **components** chẳng hạn:
```jsx
import React from 'react'
import './style.css'

class App extends React.Component {
    ...
}
```
Thì ta sẽ cần thêm một chút **config**, bởi bản thân **webpack** chỉ hiểu được **javascript**, đối với các **extensions** khác ta cần sử dụng các **loader** giúp đỡ **webpack** xử lý. Chúng ta đã sử dụng **babel-loader** ở phần trước giúp **webpack** hiểu được mã nguồn **JSX** cũng như **es6+**. Đối với **style** truyền thống với **css**, ta cần cài đặt thêm **style-loader** và **css-loader**.
```
npm install style-loader css-loader
```
Và thêm **config** để **webpack** hiểu và sẽ sử dụng 2 công cụ này đối với **style** bằng **css**:
```js
module.exports = (env) => {
  mode: env.NODE_ENV,
  const configs = {
    entry: path.join(__dirname, 'index.js'),
    output: {...},
    module: {
     rules: [
       ...
       {
         test: /\.css$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" }
           ]
        }
      ]
    },
    plugins: [...],
   // dev server
    devServer: {...}
  }
  return configs
}
```
Ngoài ra **webpack** có đầy đủ các công cụ **loader** nếu cần **config** thêm các **extensions** khác như **scss**, hay sử dụng **css-module**.  
### Mở rộng  
Chúng ta đã xây dựng một **project** **react** cơ bản và đầy đủ, giúp chúng ta hiểu hơn các bước cần thiết và cơ chế hoạt động của một ứng dụng **react** hiện đại sử dụng **webpack** và **babel**. Để **project** hoạt động tối ưu và dễ dàng trong việc phát triển hơn nữa, sẽ cần thêm nhiều **config** và đòi hỏi chúng ta cần tìm hiểu nhiều hơn, như cần thêm **eslint** để hạn chế các lỗi về **syntax** cũng như tối ưu **mã code** trong quá trình phát triển. Nếu bạn muốn sử dụng **redux** hay các **dependencies** hỗ trợ, việc  xây dựng cấu trúc, mã nguồn ban đầu của **project** cũng sẽ đòi hỏi nhiều công sức. Việc sử dụng một bộ **KIT** như **create-react-app** sẽ giảm thời gian **config** cũng như giúp bạn tập trung cho việc xây dựng các **feature** của ứng dụng hơn. Việc tự xây dựng **project** đã giúp mình giải quyết nhiều yêu cầu thay đổi **config** của dự án cũng như hiểu thêm về hệ sinh thái **react**. Mong rằng hai bài chia sẻ của mình vừa qua sẽ hữu ích, cảm ơn các bạn đã theo dõi.