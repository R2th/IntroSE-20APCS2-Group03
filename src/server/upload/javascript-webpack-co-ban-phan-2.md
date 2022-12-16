# Mở bài # 
Chào các bạn, lại là mình đây, mình làm tiếp phần 2 này chủ yếu để các bạn kéo [phần 1](https://viblo.asia/p/javascript-webpack-co-ban-phan-1-gAm5yGNAZdb) đỡ mỏi tay.
Chúng ta tiếp tục nào : à các bạn cấu hình xong có thử chạy chưa nhỉ , nếu chưa chạy được thì mình dừng ở đây và chạy thử để xem thử thành quả suốt từ [phần 1](https://viblo.asia/p/javascript-webpack-co-ban-phan-1-gAm5yGNAZdb) nhé :
 Chúng ta mở file **webpack.config.js** và thêm mới đoạn code này :
```javascript
 const path = require("path"); // import path

module.exports = {
  entry: "./src/index.js", // đường dẫn đến file index.js cần bundle.
  output: {
    path: path.join(__dirname, "/dist"), // thư mục chứa file bundle.
    filename: "index_bundle.js" // tên file bundle.
  }
}
```

Mình setup để gõ nhanh câu lệnh của webpack, chúng ta mở file **package.json** để sửa lại 1 chút :
```go
{
    ...
    "scripts": { // ở ngay đây trong package.json
        "develop": "webpack --mode development", // thêm 
        "build": "webpack --mode production" // thêm
    },
    ...
}
```

với cách setup này chúng ta sẽ chạy webpack ở 2 chế độ **development** và **production**.
tiếp theo, hãy tạo 1 file đúng với **entry** mình cấu hình trên **webpack** 

```javascript
// tạo mớithư mục src trong dự án của bạn nếu chưa có và tạo 1 file index.js
// trong file index đó bạn hãy thử gõ console.log('hello webpack');
entry: "./src/index.js", // đường dẫn đến file index.js cần bundle.
```

Mở **command line** và gõ : **npm run develop** , chạy webpack với mode **development** đúng như đã cấu hình trong  **package.json**.
Sau khi chạy xong, sẽ thấy trong project của bạn có thêm 1 thư mục tên **dist** và 1 file tên **index_bundle.js** đúng như chúng ta đã cấu hình trong **webpack.config.js**.
mở file **index_bundle.js**  và copy toàn bộ code đó, bạn mở chrome lên bật f12, nhảy qua tab Console và paste toàn bộ code vào để chạy thử và so sánh kết quả nhé. 

Chúng ta chạy thử lệnh tiếp lệnh  **npm run build**, chạy webpack với mode **production** đúng như đã cấu hình trong  **package.json**, mở file **index_bundle.js** lên và so sánh với file  **index_bundle.js** khi chạy lệnh  **npm run develop**.

=> khi chạy webpack với mode **production**, file khi **bundler** sẽ được **minified** lại và xóa hết các **comment**, size file chắc chắn sẽ nhỏ hơn.

Nhưng khi mình chỉnh sửa 1 tí thì cứ phải gõ lại lệnh **npm run ...**.

```go
    // mở file package.json và sửa lại như sau.
   // thêm --watch, khi có sự thay đổi trong code, nó sẽ chạy lại.
  "develop": "webpack --mode development --watch", 
```

chạy lại lệnh **npm run develop** để cảm nhận .

## Babel Loader ##

Tiếp theo, dự án mình làm Reactjs nên trong file **index.js** đã nói ở trên  sẽ như sau :
```javascript
import React from 'react'

export default function index() {
    return (
        <div>
            Hello Webpack
        </div>
    )
}
```

 chạy webpack với câu lệnh **npm run develop**, xuất hiện lỗi, theo mình hiểu lỗi này là vì nó không đọc được chuẩn **ES6**, nên ta phải chuyển định dạng từ **ES6** về **ES5**. Vậy ta sẽ dùng **Module loaders** để thực hiện việc này. Mở **webpack.config.js** và thêm vào : 

```javascript
 const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  // Phần chúng ta sẽ thêm vào 
  module: { // khai báo và cấu hình Module cần sử dụng.
    rules: [
      {
        test: /\.js$/, // áp dụng với chỉ file có định dạng js
        exclude: /node_modules/, // Module sẽ bỏ qua thư mục node_modules 
        use: {
          loader: "babel-loader" // Module sử dụng babel-loader.
        },
      },
    ]
  }
  // đến đây
}
```

**babel-loader** : Thành phần này sẽ giúp các babel khác làm việc được với webpack.
Vậy nên ta sẽ có thêm 1 file **.babelrc** để cấu hình cách transpile của babel và xác định **babel loader** webpack sử dụng,
Các bạn sẽ thêm đoạn code này vào file **.babelrc**.

```php
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Bài này mình sẽ không đi sâu vào **babel** nên tạm thời sẽ vậy, chức năng của **preset-env** và **preset-react** các bạn có thể xem lại bài [Phần 1](https://viblo.asia/p/javascript-webpack-co-ban-phan-1-gAm5yGNAZdb) .

Sau đó lưu file lại và chạy lại câu lệnh **npm run develop**.

## SASS Loader ##

Mình thêm 1 file **style.scss**, định dạng là **scss**.
```css
.bg--red{
    background-color: red;
}
```
và **index.js** mình sẽ import **style.scss**.

```javascript
import React from 'react';
// import thêm style.scss
import './style.scss';

export default function index() {
    return (
        <div className='bg-red'>
            Hello Webpack
        </div>
    )
}
```
Tại sao mình lại import file **scss** vào 1 file **js** kiểu vậy ?

- Một component ReactJs có thể sẽ phụ thuộc vào css, nếu ta đóng thành 1 cục,  dễ dàng mang đi sử dụng nơi khác.
- Nếu chúng ta không sử dụng component này, thì đoạn css được import trong component này cũng sẽ không được sử dụng luôn, tránh việc load dư thừa css.
- Nếu có bất kì thay đổi trong css của component này sẽ không ảnh hưởng đến giao diện component không được import file css.

chạy webpack với câu lệnh **npm run develop**, xuất hiện lỗi. bạn có thể thấy **webpack** nó không hiểu  **scss**, mà nếu định dạng là **css**, nó cũng bị lỗi mà thôi vì **webpack** chỉ làm việc thuần với **javascript**, Vậy trước tiên cài một số **loader** để làm việc với **SASS** :

`npm install style-loader css-loader sass-loader node-sass --save-dev`

sau khi install thành công, chúng ta mở **webpack.config.js** để thêm những moduler loader này.

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  module: { 
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: "babel-loader"
        },
      },
      // Thêm multi module loader 
      {
        test: /\.scss$/, // chỉ làm việc với file có định dạng scss
        use: ["style-loader", "css-loader","sass-loader"] // danh sách module loader 
       }
    ],
  }
}
```

Như mình đã nói ở [phần 1](https://viblo.asia/p/javascript-webpack-co-ban-phan-1-gAm5yGNAZdb), các **loader module** này sẽ được thực hiện theo thứ tự :
- **sass-loader** : chuyển đổi Sass thành CSS.
- **css-loader** : load và đóng gói CSS vào JavaScript
- **style-loader** : chèn CSS vào bên trong thẻ `<style>` trong code.

# Thân bài #
## Development Server ##
Với **devServer** của Webpack sẽ cung cấp cho chúng ta việc thiết lập **Development [Web Server](https://vi.wikipedia.org/wiki/M%C3%A1y_ch%E1%BB%A7_web)**, chúng ta sẽ xem được thành quả của dự án đang làm như một người dùng, ngoài ra còn nhiều tính năng các bạn có thể đọc trong  [tài liệu](https://webpack.js.org/configuration/dev-server/). 1 vài tính năng đáng mình thấy đáng chú ý là :
- **Live Reloading --inline** : Khi lưu code lại thì ta có thể thấy nó refesh lại trình duyệt và cập nhật sự thay đổi của bạn, quá ngon luôn không cần sửa tí rồi ra ấn **F5** lại.
- **“Hot Module Replacement” (HMR) --hot** : nó sẽ cập nhật lại cái module thay đổi trong lúc đang chạy mà không cần refresh luôn.

Chúng ta bắt đầu nào, trước tiên bạn cần phải có 1 file **html** để hiển thị giao diện web của bạn, file **index.html** này sẽ nằm trong thư mục **public** trong dự án của bạn.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Start Webpack</title>
    // Thêm thư viện bootstrap
    <link rel="stylesheet"
          href="https://bootswatch.com/4/darkly/bootstrap.min.css">
  </head>
  <body>
  // DOM gốc “root”, mọi thứ bên trong nó sẽ được quản lý bởi React DOM.
    <div id="root"></div>
  </body>
</html>
```
Tiếp theo cần 1 file **js**, nó sẽ thực hiện việc render một React element vào bên trong một DOM gốc “root”, file này sẽ có tên **index.js** và nó sẽ nằm trong thư mục **src** trong dự án của bạn.
```javascript
// Không giải thích nữa vì bài này mình không làm về Reactjs :))).
import React from 'react';
import ReactDOM from 'react-dom';

export default function App() {
    return (
        <div>
            Hello Webpack
        </div>
    )
}

ReactDOM.render(<App />,
  document.getElementById('root'));
```
Đầu tiên cần install **webpack-dev-server** : Nó là 1 công cụ để tạo **Development [Web Server](https://vi.wikipedia.org/wiki/M%C3%A1y_ch%E1%BB%A7_web)**.

`npm install webpack-dev-server --save-dev`

Sau khi **install** xong, chúng ta hãy mở **webpack.config.js**, thực hiện việc config **devServer** :

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  module: { 
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: "babel-loader"
        },
      },
      // Thêm multi module loader 
      {
        test: /\.scss$/, // chỉ làm việc với file có định dạng scss
        use: ["style-loader", "css-loader","sass-loader"] // danh sách module loader 
       }
    ],
  }, 
  Bắt đầu từ đây, cấu hình Development Web Server.
  devServer: {
     // cái contentBase này mình không hiểu ý nghĩa nó lắm, nên tạm thời commemt lại :))
    // contentBase: path.join(__dirname, 'dist'),
    port: 3000, // port mặc định là 8080 nhé các bạn.
    inline: true, // cái này là Live Reloading, thiết lập theo kiểu boolean. 

    hot:true, // cái này là Hot Module Replacement, thiết lập theo kiểu boolean.

    open: true, // Khi chạy lệnh để chạy devServer thì cái trình duyệt sẽ mở chạy luôn, 
    //thiết lập theo kiểu boolean hoặc string là cái trình duyệt bạn muốn mở. 
    //Ví dụ : 'Chrome'..
  },

}
```

**Option "inline" và "hot" chỉ dành riêng cho webpack-dev-server**, nếu bạn dùng công cụ khác để tạo  **Development [Web Server](https://vi.wikipedia.org/wiki/M%C3%A1y_ch%E1%BB%A7_web)** thì cần xem lại option này có không nhé.

Tiếp theo chúng ta cần setup để gõ nhanh câu lệnh của **webpack**, chúng ta mở file **package.json** để sửa lại 1 chút :
```shell
{
    ...
        "scripts": {
            // Thêm đoạn này vào nhé, mình chạy webpack-dev-server, 
            // với cấu hình bằng file webpack.config.js và chạy ở chế độ development, --hot --inline --open mình thêm lại cho chắc.
          "start": "webpack-dev-server --config webpack.config.js --mode development --hot --inline --open",
          "dev": "webpack --mode development",
          "build": "webpack --mode production"
        },
    ...
}
```
Các bạn hãy mở **command line** và gõ : **npm run start** để cảm nhận thành quả nhé.

Cái thiết lập  **“Hot Module Replacement” (HMR) --hot** phải truy cập **http://localhost:3000/webpack-dev-server/** mới hoạt động hay sao ấy mình cũng không rõ cái này lắm, nếu có ai giải thích phần này mình xin **cảm ơn**.

## Plugins ##

**Webpack** có cơ chế **plugin** để hỗ trợ tuỳ biến quá trình xử lý file, theo mình nghĩ **plugin** là bên thứ 3, được sự đóng góp từ nhiều cộng đồng nên sẽ có nhiều **plugin** tùy thuộc vào chức năng riêng của chúng.

**Loader** chỉ thực hiện duy nhất trên 1 file nhất định (js, css, html ...), nó thực hiện trước quá trình tạo ra file **bundle**. Còn với **plugin** thì sẽ thực hiện trên kết quả file **bundle** đó, nó là quá trình cuối tạo ra **bundle** hoàn chỉnh.

Các bạn có thể thấy trong quá trình mình chạy **npm run dev** , trong thư mục **dist** chứa file **bundle** không có file **index.html** để hiển thị giao diện, chỉ có 1 file duy nhất mà mình cấu hình **output** trong **webpack** là **index_bundle.js**.

**Cách 1**: Các bạn có thể copy lại file **index.html** ở thư mục **public**, và **dán** nó vào thư mục **dist** chứa file **bundle**.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Start Webpack</title>
    <link rel="stylesheet"
          href="https://bootswatch.com/4/darkly/bootstrap.min.css">
  </head>
  <body>
    <div id="root" class="container"></div>
  </body>
      // Thêm đoạn này để nó load toàn bộ bundle vào nhé
      <script type="text/javascript" src="index_bundle.js"></script>
  </body>
</html>
```
Vậy là mỗi lần mình chỉnh sửa, cập nhật gì thì đều phải chỉnh lại file **index.html** trong thư mục **dist** này.

vấn đề nếu mình dùng **[hash]** => **index_bundle.[hash].js** để thực hiện việc việc **ouput** file **bundle** , Lúc này, sau khi gõ lệnh  **npm run dev**  thì file output không phải là index_bundle.js nữa mà là index_bundle.[chuỗi các ký tự].js, việc chỉnh lại file **index.html** trong thư mục **dist** này lại càng khó khăn hơn.

```
output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.[hash].js"
    // Việc dùng [hash] như trên được gọi là cache busting. 
    // Vì browser sẽ cache nội dung của static files như css, 
    // js dựa theo file path. Nếu mỗi lần build mà tên file không thay đổi, 
    // ví dụ luôn là style.css. Thì browser vẫn sẽ lấy nội dung có trong cache dựa theo tên cũ. 
    // Vì vậy, việc dùng hash hoặc versioning sẽ giúp browser update lại nội dung của static files.

    // Một điểm thú vị là nếu bạn không thay đổi nội dung trong file css hoặc js thì hash 
    // vẫn sẽ không thay đổi qua mỗi lần build.

  },
```

### html-webpack-plugin ###

**cách 2** :
Đầu tiên, các bạn hãy install **html-webpack-plugin** : 
- Nó giải quyết được vấn đề ở **cách 1**, và tự động hóa quá trình này.
-  giúp tối ưu nội dung file html hơn.
-  [Vào để xem rõ hơn](https://www.npmjs.com/package/html-webpack-plugin)

`npm install html-webpack-plugin --save-dev`

Sau khi  install **html-webpack-plugin**  xong, vào **webpack.config.js** để thực hiện việc cấu hình sử dụng **plugin** này.

```
 const path = require("path");
 // khai báo sử dụng html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.[hash].js"
  },
  module: { 
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: "babel-loader"
        },
      },
      // Thêm multi module loader 
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader","sass-loader"] 
       }
    ],
  }, 
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    inline: true,
    hot:true,
    https: false,
    open: true,
  },
  // khai báo sử dụng plugin
  plugins: [
  // danh sách plugin bạn cần sử dụng sẽ nằm trong này.
  // hiện tại mình đang sử dụng plugin HtmlWebpackPlugin
  // new plugin_sử_dung(cấu hình plugin đó)
    new HtmlWebpackPlugin({ template: './public/index.html',title: 'Start Webpack'})
  ]

}
```
Sau đó các bạn nhớ **lưu** file **webpack.config.js**, tiếp đến các bạn hãy mở **command line** và gõ : **npm run dev** để cảm nhận thành quả nhé.

### autoprefixer ###
Khi CSS3 trở nên phổ biến, tất cả các loại tính năng mới bắt đầu xuất hiện. Thật không may, không phải tất cả chúng đều được hỗ trợ trên tất cả các trình duyệt. Tiền tố (**prefixer**) nhà cung cấp đã giúp các nhà phát triển sử dụng các tính năng mới đó và hỗ trợ chúng ngay lập tức mà không phải chờ đợi mỗi tính năng này có sẵn cho mọi trình duyệt. Kiểu như bạn viết css bên trình duyệt này ngon lành nhưng qua trình duyệt khác nó không hiển thị vậy.

**Tiền tố (prefixer)**

Các trình duyệt chính sử dụng các tiền tố sau:

- -webkit- Chrome, Safari, các phiên bản Opera mới hơn, gần như tất cả các trình duyệt iOS.
- -Moz- Firefox.
- -o- Phiên bản cũ của Opera.
- -ms- Microsoft Edge và Internet Explorer.

Khi sử dụng tiền tố của nhà cung cấp, hãy nhớ rằng chúng chỉ là tạm thời . Rất nhiều thuộc tính cần có tiền tố nhà cung cấp gắn liền với chúng hiện được hỗ trợ đầy đủ và không cần chúng.

ví dụ :

```
.element {
  -webkit-transform: rotate(60deg);
  -ms-transform: rotate(60deg);
  -o-transform: rotate(60deg);
  transform: rotate(60deg);
}
```

Vậy là khi mình viết css thì mình phải kiểm tra từng trình duyệt trong một đống trình duyệt có hỗ trợ code css đó không, không thì phải thêm tiền tố cho đoạn css hỗ trợ từng trình duyệt đó, nghe là thấy mất thời gian rồi, 

Với **autoprefixer**, bạn không cần nghĩ tới việc tạo ra các prefix để tránh bị **bug** trên các trình duyệt nữa. Mọi thứ sau khi được viết gọn gàng trong css sẽ được tự động thêm **prefix**.

Ngược lại, nếu có 1 **prefix** nào đó cũ và không cần trong code source của bạn vì các trình duyệt đều đã hỗ trợ, **autoprefixer** cũng sẽ gỡ bỏ nó.

Trước khi sử dụng được **autoprefixer**, thì mình cần install thêm **PostCSS** , bạn có thể vào [đây](https://webdesign.tutsplus.com/tutorials/postcss-deep-dive-what-you-need-to-know--cms-24535?utm_source=itviec.com&fbclid=IwAR3CWf_1ebUh-pXMCcNeMQ5CwZCR3rcq-MiLWcBn9fQgK9tRYAD-ZfPaKKo) để đọc thêm chi tiết về nó.

`npm install postcss autoprefixer --save-dev`

Đối với **webpack**, **loader** chúng ta sẽ thêm **postcss-loader**.

```
module: {
    rules: [
     ...
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
             // Enables/Disables or setups number of loaders applied 
             // before CSS loader
              importLoaders: 1, 
            },
          },
          // thêm loader postcss-loader
          {
            loader: 'postcss-loader',
            options: { 
              config: {
              // cấu hình đường dẫn đến file postcss.config.js.
                path: __dirname + '/postcss.config.js',
              },
            },
          },
          // kết thúc
          {
            loader: 'sass-loader',
          },
        ],
      },
      ...
    ],
  },
```

Chúng ta tiếp tục tạo thêm 1 file **postcss.config.js** để cấu hình **PostCSS**, và tùy chọn thêm plugin để xử lý css theo yêu cầu bạn mong muốn, nó nằm cùng cấp với file **webpack.config.js** trong thư mục dự án của bạn, 

```
// Khai báo sử dụng autoprefixer
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [ // danh sách plugins
  // sử dụng autoprefixer và cấu hình nó
    autoprefixer({ 
       // xem thêm https://github.com/browserslist/browserslist
       // sẽ thêm tiền tố (prefix) vào 2 phiên bản cuối cùng cho mỗi trình duyệt.
      "browsers": ["last 2 versions"]
    }),
  ],
};
```

Đối với file **style.scss**, các bạn có thể sửa lại :
```
.bg--red{
    display: grid;
    transition: all .5s;
    user-select: none;
    background: linear-gradient(to bottom, white, black);
}
```

Sau đó các bạn nhớ **lưu** file **webpack.config.js**, **postcss.config.js** và  **style.scss**, tiếp đến các bạn hãy mở **command line** và gõ : **npm run start** để cảm nhận thành quả nhé.

![](https://images.viblo.asia/5157c874-4f80-418e-b62c-878ff6dc58a6.jpg)