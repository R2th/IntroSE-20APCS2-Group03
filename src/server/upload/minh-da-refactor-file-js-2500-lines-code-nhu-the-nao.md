Gần đây mình có tham gia một project là một trang đặt hàng chức năng tương đối đơn giản nhưng js code xử lý cũng khoảng 2500 lines và được ấn hết vào trong cùng 1 file js.
Mình nghĩ đây cũng là thực tế nhiều bạn sẽ gặp phải với các project từ lâu lâu về trước hoặc cũng có thể gần đây nhưng làm ẩu =)).
Ngày càng nhiều yêu cầu thêm vào bạn thử tưởng tượng một file hết từ gọi api đến xử lý logic rồi set dữ liệu vào trong dom nằm trong cùng 1 file, nếu yêu cầu đơn giản thì thôi đành nhắm mắt code tiếp nhưng nếu yêu cầu phức tạp code hoàn thành được 1 yêu cầu chắc cũng muốn đui con mắt. 
Ý tưởng đầu tiên khi nhìn vào đống bùng nhùng đương nhiên là phải tách const riêng, handle gọi api riêng, có thể tách folder và file theo chức năng riêng tùy theo nghiệp vụ. Việc này đối với những bạn đã làm qua reactjs, vuejs... thì chắc cũng không có gì lạ lẫm. That's right, chính là webpack thần thánh 
Từ một file index.js 2500 lines thì mình sẽ tách theo được cấu trúc như này 
![](https://images.viblo.asia/1f1cba76-95ed-45bb-afcf-2f02093170c5.PNG)

Sau đây là vài đường cơ bản để tách nhỏ file
Project này mình sử dụng npm, tạo 1 file package.json như sau

```json
{
  "name": "xxxxx",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode production",
    "build-dev": "webpack --mode development",
    "watch": "webpack --mode none --watch --info-verbosity verbose",
  },
  "author": "hoangcongst",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.12"
  },
  "dependencies": {
    "bind.js": "^1.1.1",
  }
}
```

Như các bạn thấy mình sử dụng webpack để build, có 3 môi trường production, develop và local. Riêng ở local mình sẽ watch để webpack tự nhận thay đổi khi sửa code và build 
Ngoài ra khi tổ chức lại code mình muốn có chức năng two way binding khi thay đổi biến trong js thì html dom cũng thay đổi theo và ngược lại, code lại tất cả html js dùng SPA thì không khả thi vì bài toán ngay từ ban đầu chỉ là refactor lại js code và html css gần như giữ nguyên. Vì vậy mình đã tìm đển lib [bindjs](https://github.com/remy/bind.js) này và sau quá trình refactor thì nó đáp ứng tốt nhu cầu của mình, sử dụng cũng khá đơn giản bạn chỉ cần nghía qua readme 15 phút là dùng ok rồi. Điều này tiết kiệm khá nhiều thời gian và số lines code, nếu cứ sửa logic rồi dùng jquery selector để set lại giá trị mỗi khi thay đổi thì khá cực nhỉ :D

Bước 2: tạo 1 file webpack.config.js
```js
const path = require('path')
const webpack = require('webpack')

module.exports = (env, argv) => {
  return {
    entry: './src/index.js',
    output: {
      filename: 'builtjs.js',
      path: path.resolve(__dirname, 'dist')
    },
    watch: true,
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: /node_modules/
    },
    plugins:[
      new webpack.DefinePlugin({
        process: {
          env: {
            'NODE_ENV': JSON.stringify(argv.mode)
          },
        }
      })
    ],
  }
}
```

Trong project để tách file thì sẽ dùng theo style rất Single Page App =))

Export function, const...
```js
function getConfig() {
    if(process.env.NODE_ENV === 'production') {
        return {
            API_PATH: "http://yyyyy",
        }
    } else if (process.env.NODE_ENV === 'development') {
        return {
            API_PATH: "http://xxxx",
        }
    } else { //local env
        return {
            API_PATH: "http://localhost/",
        }
    }
}

export {getConfig}
```

Import mỗi khi ở đâu bạn cần 
``` js
import Bind from 'bind.js'
import { getConfig } from './config.js'
```

Sau cùng khi đã refactor, chạy 1 lệnh quen thuộc đã định nghĩa trong file package.js 
```
npm run build
```

file build ra nằm trong thư mục dist đã định nghĩa trong file webpack.config.js, cuối cùng trong file html chỉ cần dùng file build ra này. Simple, right?
```
  <script src="/js/builtjs.js"></script>
```

Mình cũng chỉ đá ngang sang code client và từng code qua Vue và react nhưng không có deep knowledge về frontend, mọi người có giải pháp nào ok hơn với bài toán tương tự thì cùng comment nhé. Thank for your reading!!!