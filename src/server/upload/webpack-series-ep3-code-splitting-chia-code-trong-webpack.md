# Code splitting là gì?

 **Code splitting** có thể là một trong những feature thuyết phục nhất của Webpack, nó cho phép chúng ta chia nhỏ code ra nhiều bundle nhỏ hơn, những cái mà chúng ta có thể tải khi cần hoặc để tải song song. Nó thường được sử dụng để tạo ra những bundle code nhỏ hơn cũng như quản lý vấn đề ưu tiên tải tài nguyên, caí nào tải trước, cái nào tải sau, cái nào tải sau cái nào. Nếu sử dụng đúng cách nó có thể tác động lớn đến tốc độ và thời gian tải.

Có 3 cách tiếp cận để split code hiện tại:
- **Entry point**: Phân chia thủ công bằng cách cấu hình file `entry`, file để bắt đầu chạy ứng dụng và từ đó webpack hoạt động
-  **Prevent duplication** (ở webpack 4.0 là `splitChunks`): Sử dụng `CommonsChunkPlugin` để xóa những bundle trùng lắp và split ra các `chunks`, hiểu nôm na plugin này sẽ giúp loại bỏ việc split ra 2 hoặc nhiều hơn các bundle khác nhau.
- **Dynamic Imports**: Chia code thông qua các function được gọi trong các modules.

## Entry point
Đây là cách đơn giản nhất, trực quan về cách phân chia code. Chúng ta chỉ cần chỉ rõ ra các entries và webpack sẽ dựa vào đó và tạo ra các bundle tương ứng. Mặc dù vậy cách này khá thủ công và cũng tiềm ẩn những rủi ro không hay mà chúng sẽ gặp phải, giờ chúng ta thử cài đặt nào.  

Giả sử máy chúng ta chưa hề cái webpack từ trước nhé.

```js
    mkdir wp-demo
    cd wp-demo
    npm init -y
    npm install webpack -g
    npm i webpack-cli -g
    npm i lodash
    npm i html-webpack-plugin
```
> `npm i` là short command của `npm install`
> `-g` là install global

**Project**

```
wp-demo
    |- package.json
    |- webpack.config.js
    |- /dist
    |- /src
        |- index.js
        |- lib.js
    |- /node_modules
```

Chúng ta sẽ implement ***index.js*** và ***lib.js*** đều sử dụng hàm của **lodash**

**index.js**
```js
import _ from 'lodash';

console.log(
  _.join(['Index', 'module', 'loaded!'], ' ')
);
```

**lib.js**
```js
import _ from 'lodash';

console.log(
  _.join(['Lib', 'module', 'loaded!'], ' ')
);
```

**webpack.config.js**
```js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    lib: './src/lib.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

Run `webpack -d`

```bash
Hash: 4f059d29eff6ead625f4
Version: webpack 4.4.1
Time: 905ms
Built at: 2018-4-4 01:01:03
          Asset       Size  Chunks             Chunk Names
  index.bundle.js   1.36 MiB   index  [emitted]  index
  lib.bundle.js   1.36 MiB     lib  [emitted]  lib
     index.html  251 bytes          [emitted]
```

Như đã nói ở trên cách này có những tiềm ẩn rủi ro là:
- `index.bundle.js` và `lib.bundle.js` đều sử dụng thư viện `lodash` và vì do nó là hai `entry` riêng biệt nên bọn nó không liên quan cũng như không biết thằng còn lại làm gì và cần gì? Nên ai cần cái gì thì import cái đó "chuyện anh anh làm chuyện tui tui làm" do đó 2 bundle đều import thư viện lodash, và đương nhiên cách này là không hề tốt chút nào nếu chúng ta không cẩn thận...
- Nên nếu muốn làm manual như cách này, tốt nhất chỉ nên có một entry nhận import và các entry khác chỉ import từ entry lib này. Ví dụ `lib.js` sẽ export `lodash` và `index.js` sẽ import cái này để xài, nhưng như vậy là không hay tẹo nào, nói chung khá là không thoải mái vì "ta thích gì ở đâu thì ta import vào xài không cần phải phụ thuộc thằng nào đã export expiet gì chưa?".
- Cách này manual nên đương nhiên nó sẽ không linh hoạt để phân chia code một cách tự động.

Và để giải quyết vấn đề của **entry point** chúng ta sẽ áp dụng **Prevent duplication** bằng cách dùng **CommonsChunkPlugin** 
https://webpack.js.org/plugins/commons-chunk-plugin/

## Prevent Duplication
`CommonChunkPlugin` cho phép chúng ta extract ra những hàm, thư viện,... chung vào một entry nào đó hoặc đưa ra 1 chunk mới nào đó. Sử dụng nó để hủy sự trùng lắp trong việc sử dụng thư viện `lodash`.

Thêm `CommonChunkPlugin` vào phần `plugins`.
**webpack.config.js**
```js
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    lib: './src/lib.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
Run thử nào `webpack -d`

Với `CommonsChunkPlugin` chúng ta thấy sự trùng lặp trong việc gọi thư viện `lodash` trong `index.js` và `lib.js` đã được giải quyết bằng việc tạo ra một bundle mới gọi là `common`, và hai enties của chúng ta đã gọi thư viện `lodash` **trực tiếp** từ module `common` này.

```bash
Hash: 70a59f8d46ff12575481
Version: webpack 2.6.1
Time: 510ms
            Asset       Size  Chunks                    Chunk Names
  index.bundle.js  665 bytes       0  [emitted]         index
  lib.bundle.js  537 bytes       1  [emitted]         lib
  common.bundle.js     547 kB       2  [emitted]  [big]  common
```

> **Chú ý**: từ `webpack version 4` thì webpack đã remove plugin `CommonsChunkPlugin` thay vào đó là `optimization.splitChunks`, nếu bạn nào bắt đầu sử dụng `Webpack` ngay thời điểm (version 4) này thì follow theo cách này. Theo như tài liệu của webpack thì `optimization.splitChunks` có nhiều điểm cải tiến hơn `CommonsChunkPlugin` là:
1. Ít sinh ra code hơn
2. Cache tốt hơn
3. Chia nhỏ common chunk hơn => download ít và nhẹ hơn

Bấy giờ chúng ta thêm một file mới là `another.js`, sau đó cài đặt `jquery` và sử dụng nó trong cả `index.js` và `another.js`

```bash
npm i jquery -D
touch src/another.js
```

**another.js**
```js
import * as $ from 'jquery';

$('body')
    .append($('<span>').text('from another'));
```

**index.js**
```js
import _ from 'lodash';
import * as $ from 'jquery';

console.log(
  _.join(['Index', 'module', 'loaded!'], ' ')
);

$('body')
    .append($('<span>').text('from index'));
```

Update lại **webpack.config.js**
```js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        lib: './src/lib.js',
        another: './src/another.js',
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Code Splitting'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```
Run `webpack -p`
```bash
Hash: e87b2ac1bbf030a2de33
Version: webpack 4.4.1
Time: 7157ms
Built at: 2018-4-4 15:02:42
                          Asset       Size  Chunks             Chunk Names
vendors~another~index.bundle.js   85.2 KiB       0  [emitted]  vendors~another~index
    vendors~index~lib.bundle.js   69.3 KiB       1  [emitted]  vendors~index~lib
              another.bundle.js   1.15 KiB       2  [emitted]  another
                  lib.bundle.js   1.16 KiB       3  [emitted]  lib
                index.bundle.js   1.22 KiB       4  [emitted]  index
                     index.html  467 bytes          [emitted]
```

Chúng ta thấy các nó chia nhỏ các common chunk ra:
1. `vendors~another~index.bundle.js`: `index.js` và `another.js` sẽ dùng chung, nó chứa source của `jquery`
2. `vendors~index~lib.bundle.js`: `index.js` và `lib.js` dùng chung, chứa source của `lodash`

Rõ ràng ở mức này việc chia nhỏ code của dự án chúng ta như thế này tưởng đối có thể sử dụng được, nhưng với những dự án lớn hơn, phức tạp hơn cũng như cần sự linh động của việc chia code hơn chúng ta sẽ đi tới phần cuối cùng.

## Dynamic Imports
Theo như spec của `webpack` thì họ support hai kỹ thuật tương tự nhau để chia code tự động là:
1. `import()` syntax dựa theo [ECMAScript proposal](https://github.com/tc39/proposal-dynamic-import) (hàng ngoại nhập theo xu hướng thị trường) - support từ ver 2.xxx (xxx ko nhớ)
2. `require.ensure` systax của webpack định nghĩa ra (hàng nội) - support từ ver1

### sử dụng `import()`

Cập nhât lại các files

**another.js**
```js
import _ from 'lodash';

export const join = function (arr) {
    return _.join(arr, ' ');
}
```

**index.js**
```js
import $ from 'jquery';

$('body')
    .append($('<button>')
        .text('Get lodash function')
        .on('click', () => {
            import(/*webpackChunkName: "another"*/'./another.js').then(another => { // format name của bundle
                const str = another.join(['Used', 'lodash', 'join!']);
                $('body').append($('span').text(str));
            });
        }));

$('body')
    .append($('<span>').text('jquery from index'));
```
Chúng ta sẽ dùng jquery tạo một button và sau khi click button đó, thì sẽ tải module `another.js` và kèm đó là `lodash`, sau đó sử dụng hàm `join` của `lodash` và execute

State của việc này sẽ là như thế này:
1. load `index.js` và vendor của nó là `vendor~index.js`
2. người dùng click button
3. load `another.bundle.js` và `vendors~another.bundle.js` chứa source của `lodash` và sử dụng hàm `join`, sau đó tạo ra 1 thẻ `<span>` và append vào body.

**webpack.config.js**
```js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Code Splitting'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',// format name của bundle
        path: path.resolve(__dirname, 'dist')
    }
};
```

Run `webpack -p`
```bash
Version: webpack 4.4.1
Time: 933ms
Built at: 2018-4-4 17:54:13
                    Asset       Size  Chunks             Chunk Names
vendors~another.bundle.js   69.3 KiB       0  [emitted]  vendors~another
        another.bundle.js  198 bytes       1  [emitted]  another
  vendors~index.bundle.js   85.2 KiB       2  [emitted]  vendors~index
          index.bundle.js   2.14 KiB       3  [emitted]  index
               index.html  261 bytes          [emitted]
```

Các bạn có thể vào `dist/index.html` để chạy thử 

![Trước khi click button](https://i.imgur.com/9fbW946.png) 
![Sau khi click button](https://i.imgur.com/WfkywdG.png)
![Browser hiển thị](https://i.imgur.com/LJD5rf2.png)

Bài viết gốc: https://www.jinhduong.com/2018/04/03/webpack-series-code-splitting/

Phần 1: https://www.jinhduong.com/2017/04/20/2017-04-20-webpack-co-ban/

Phần 2: https://www.jinhduong.com/2017/04/21/2017-04-21-webpack-co-ban-2/

Thanks for watching !