Chào các bạn! Để tiếp tục với bài viết [Webpack core concept - part 1](https://viblo.asia/p/webpack-core-concept-part-1-QpmleEgMlrd) lần trước, hôm nay mình sẽ nói về loader và plugin trong webpack. Bài hôm nay là bài viết tiếp của bài Webpack core concept - part 1 trước nên mọi setup project mình sẽ không nói lại nữa, tránh mất thời gian của các bạn.
## Loader.
Trên document của trang chủ webpack định nghĩa webpack như sau:
> Loaders are transformations that are applied on the source code of a module. They allow you to pre-process files as you import or “load” them.
> 
Hiểu nôm na là loader chuyển đổi code của bạn trước khi webpack import hoặc load các file đó. Ví dụ ta có thể dùng loader sass-loader để complie một file .sass sang file .css, hoặc có thể dùng loader babel-loader để complie code js viết theo syntax của es6 sang es5.
### Example
Bây giờ mình sẽ sử dụng babel-loader để complie một file js viết theo syntax của es6 sang es5 cho các bạn dễ hình dung nhé.

Edit lại nội dung của file webpack.config.js trong part 1 lại như sau:
```javascript
const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```
Tương tự edit nội dung file home.js thành:
```javascript
export default function (arr = []) {
    let result = 0
    arr.forEach((val, index) => {
        console.log(`${index} => ${val}`)

        if (!isNaN(val)) {
            result += val
        }
    })

    return result;
}
```
Các bạn chú ý nhé, ở đây mình dùng các syntax trong es6 arrow function, let và template string.
Tiếp tục đổi edit nội dung file app.js thành:
```javascript
import sumArr from './home'

let arr = [1, 3, 5, 7, webpack]

let result = sumArr(arr)
console.log(result)
```
Bây giờ các bạn chạy lệnh:
> npm run dev 

Sau khi biên dịch song mở file `dist/main.js` tìm `!isNaN` các bạn sẽ thấy file function export ở file home.js được biên dịch thành:
```javascript
function (arr = []) {\n    let result = 0\n    arr.forEach((val, index) => {\n        console.log(`${index} => ${val}`)\n\n        if (!isNaN(val)) {\n            result += val\n        }\n    })\n\n    return result};
```
Các bạn thấy sau khi được biên dịch xong nhưng những syntax của es6 mình nói ở trên vẫn còn. Nếu bây giờ bạn mở file index.html trên trình duyệt hỗ trợ es6 thì trong console.log sẽ như sau:
![](https://images.viblo.asia/d6af827c-63fd-4468-bdf1-d0b406e3d4e8.png)

Nhưng nếu bạn mở file index.html bằng trình duyệt IE11 thì sẽ báo lỗi cú pháp vì IE11 không support arrow function.
Vấn đề là ở đây. Nếu bạn muốn viết cú pháp của es6 nhưng muốn sau khi biên dịch code của bạn sẽ thành cú pháp es5 và chạy được trên các browser hỗ trợ es5(es5 được đa số browser hỗ trợ). Để giải quyết vấn đề ta cần loader, cụ thể ở đây là babel loader(các bạn tham khảo ở [đây](https://babeljs.io/docs/en/)).

Bây giờ chúng ta cài package babel-loader bằng lệnh sau:
> npm install --save-dev babel-loader@next @babel/core @babel/preset-env

Edit lại file webpack.config.js thành:
```javascript
const path = require('path');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
};
```

Lưu lại và chạy lệnh:
> npm run dev

Bây giờ vào file dist/main.js vào tìm '!isNaN' thì sẽ thấy function export trong file home.js được biên dịch như sau:
```javascript
function () {\n  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n  var result = 0;\n  arr.forEach(function (val, index) {\n    console.log(\"\".concat(index, \" => \").concat(val));\n\n    if (!isNaN(val)) {\n      result += val;\n    }\n  });\n  return result;\n}
```

Các bạn để ý thấy arrow function được chuyển thành function trong es5, tương tự template string cũng không còn thay vào đó là console.log(\"\".concat(index, \" => \").concat(val)), let được chuyển thành var.
Giờ các bạn mở file index.html trên trình duyệt hổ trợ es5 hoặc es6 đèo cho kết quả như nhau.

Trên đây là bài viết nói về loader(theo mình nghỉ là quan trọng nhất) trong webpack cũng như ví dụ cụ thể . Ở bài sau mình sẽ đẩy code lên github cho các bạn tham khảo nhé. Thân chào và hẹn gặp lại cả nhà.