![](https://images.viblo.asia/8c546b54-0bff-4892-95cb-e94dc442f65b.png)

Với xu hướng lập trình mà business và phần lớn xử lý đều nằm ở tầng phía front-end với gánh nặng càng ngày càng đè lên vai chàng dũng sĩ javascript tội nghiệp, thì các công cụ hỗ trợ cho anh ấy (ahihi) như typing, task runner, test tools,... tè le tà la hết, nói chung là không thể thiếu được với 1 front-end dev. Hôm nay mình muốn giới thiệu **Webpack** một **module loader** cho javascript một cách cơ bản nhất.

**Webpack** hiện đang là module loader được sử dụng rộng rãi nhất hiện nay với cộng động support to lớn và những chức năng vô cùng mạnh mẽ. 

## Vậy Module loader là gì?

* Một cách đơn giản là ngày xưa chúng ta thường add những thư viện (3th parties) như `jquery, moment, select2, dtpicker,sticky,...` vào thẻ `script` để khi web load lên xong thì những thư viện này sẽ được execute và xử lý. Nhưng không còn như những ngày xưa chỉ vài dòng `jquery` là đủ dùng, sau này do việc code dưới front-end càng ngày càng phìng to nên việc quản lý code bằng `javascript` càng ngày càng tõ rõ sự quan trọng nên từ đó khái niệm **module loader** ra đời.

* Có khá nhiều thư viện từ nhỏ đến to ra đời cho việc này: *Tiny Loaders (curl, LABjs, almond), RequireJS, Browserify, SystemJs*, **`Webpack`** và gần đây đang nổi lên là RollupJs.

* Nếu bạn nào có xài *SystemJs, Browserify* rồi thì thấy thật ra **`Webpack`** ra đời từ thừa hưởng những thành quả và kinh nghiệm từ những thư viện đó và phát triển lền một tầm mới tốt hơn cho công việc quản lý module.

### Ví dụ cơ bản

Chúng ta sẽ có 2 file `.js`
```
//xinchao.js
export default function xinchao(name){
    console.log('xin chao '+ name);
}
```

```
//index.js
import xinchao from './xinchao';

xinchao('xin chao');
```
Thì ` import xinchao from './xinchao' `chính là chỗ mà **`Webpack`** sẽ làm việc cho chúng ta.
> `import` và `export` hiện tại chưa được support cho đa phần các browser. Và khi bạn viết như thế này thì browser cũng ếu hiểu bạn đang muốn làm cái gì? Và đó là lúc các `module loader` xuất hiện.

Với 2 file `.js` ở trên chúng ta sẽ dùng **`Webpack`** để bundle và xem kết quả như thế nào nhé?

Tạo file `webpack.config.js` để config cho **`Webpack`**.

```
//webpack.config.js
module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  }
}
```
- **entry**: là file mà chúng ta sẽ bắt đầu chạy bằng **`webpack`**. Nói chung nó là bắt nguồn của chiến tranh. Nó import từ thằng khác rồi thằng khác import từ thằng khác khác nữa từ đó sẽ kéo theo một chuỗi có hệ thống việc load các js module. Ở đây là file `index.js` ở trên.
- **output-filename**: là đầu ra của file sau khi **`webpack`** làm việc xong.
Cuối cùng một file html đơn giản để chạy script này:
```
<html>
  <head>
    ...
  </head>
  <body>
    ...
    <script src="bundle.js"></script>
  </body>
</html>;
```
### Cài đặt
Dùng lệnh npm hoặc yarn để cài đặt

`npm install --save-dev webpack`

hoặc

`yarn add --save-dev webpack`

### Cấu trúc thư mục

![](https://images.viblo.asia/7bfd4449-5655-4115-89a3-5e57a8077a1d.png)

Dùng lệnh `webpack` để chạy

![](https://images.viblo.asia/4dc6fbc5-b387-4a89-a10f-657ea7cab924.png)

Chúng ta sẽ thấy file `bundle.js` được tạo ra và sau khi chạy file `index.html `sẽ xuất ra dòng log `xin chao`

## Nâng cao
**Code splitting** (chia nhỏ code) là một trong những tính năng làm nên tên tuổi của Webpack. Và với riêng bản thân mình thấy thì đây chính là tính năng có giá trị nhất của webpack.
### Code splitting là gì?
Như cái tên của nó. Nó cho phép chung ta chia nhỏ code ra và chỉ thật tải và execute khi cần đến. Một ví dụ đơn giản là chúng ta sử dụng thư viện nào đó mà bản thân nó là 1 library khá nặng và đương nhiên đa phần các page trong dự án của bạn ko cần đến nó, chỉ một vài trang cần và Webpack sẽ detect được khi nào bạn cần và sẽ tách nó ra 1 file riêng để khi nào cần thì gọi. Cái goal ở đây là ngoài việc chúng ta kiếm soát được việc **quản lý library** thì bên cạnh đó **perfomance cũng được cải thiện** ở browser thấy 1 thì ở mobile sự cải thiện sẽ rõ rệt hơn rất nhiều vì trên mobile phần cứng đa phần bị giới hạn hơn so với máy tính.

### Các loại splitting
Có 3 loại splitting cơ bản gồm:

* Css Splitting
* Libraries Splitting
* Async code splitting

Tham khảo thêm tại [đây](https://webpack.js.org/guides/code-splitting/)

### CSS Splitting
Để bundle file css bằng css thì chúng ta cũng chỉ cần import vào `file .js` giống như cách import 1 module bình thường.

Ví dụ
Chúng ta add `bootstrap` vào file `index.js`

`npm install bootstrap --save-dev`

Sau đó add vào file` index.js`

```;
//index.js
import 'bootstrap/dist/css/bootstrap.css';
```
Cài đặt `css-loader` and `style-loader`

`npm install --save-dev css-loader style-loader`

Update file `webpack.config.js`

```
 entry: './index.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
```
Nào run webpack để chạy. Sau khi chạy bạn sẽ thấy cái lỗi này.

![](https://images.viblo.asia/b550f867-fe17-49df-91e4-bf9140c20dff.png)

Lý do là bootstrap import những file như `.eot,.svg,.ttf...`

![](https://images.viblo.asia/66484371-ae2f-420b-9943-6c6ecd32f5d8.png)

Có hai lỗi xảy ra ở đây là **`webpack`** không có loader cho `file` và loader cho `url` nên tới cái chỗ require file font và require cái gì svg gì trên url như trong hình nên webpack nó không bundle được.

![](https://images.viblo.asia/ef92a14f-ae10-47ef-b2e1-597b9b9040b1.png)

Giờ chúng ta install 2 loader là `url-loader` và `file-loader` vào

`npm i --save-dev file-loader url-loader`

Sau khi install xong chúng ta update lại file `webpack.config.js`

```
module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    }
}
```

Giờ chúng ta chạy lệnh **`webpack`** để run nhé.

![](https://images.viblo.asia/4d39890e-900e-45f4-8d5c-f1382592c860.png)

Thì sau khi bundle nó sẽ tạo ra 2 file là `bundle.js` và 1 file `.svg`. Thì `.svg` chứa bộ icon của bootstrap thôi. Để ý file `bundle.js` thì **`webpack`** sẽ include luôn css của bootstrap trong file `bundle.js` luôn. Và sau khi script loaded xong thì nó sẽ inject cái đống css này vào tag `<style>`
    
![](https://images.viblo.asia/9c7a6352-812a-47c9-aa98-0157e43c4b60.png)
    
Vậy cái bất lợi của cái kiểu này là như thế nào. Đó là bạn không thể sử dụng khả năng load **bất đồng bộ hay song song (asynchronously and parallel)** của các browser được mà phải đợi script loaded xong rồi mới load css được.

Và rồi **`webpack`** cung cấp cho chúng ta một plugin để giải quyết này bằng việc chia nhỏ các file css ra. Plugin đó là **ExtractTextWebpackPlugin**.

Đầu tiền chúng ta install nó thôi.

`npm install --save-dev extract-text-webpack-plugin`

Chúng ta update lại file **webpack.config.js**

```
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, "dist"), // root để bundle
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('site.css'),
    ]
}
```
Các bạn để ý mình có require thêm cái `path = require('path')` để tạo define đường dẫn các file bundle vào folder dist, vì giờ nó tạo tới tận 3 file lận để ngoài root nó nằm lung tung quá.
   
Ok gõ `webpack` để run nào.

![](https://images.viblo.asia/17752712-8106-4545-9a93-b17650073c4c.png)

Các bạn có thể đọc thêm về webpack tại trang chủ của nó https://webpack.js.org/