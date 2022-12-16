Ngày nay, webpack là công cụ **module bundle** cho react, vuejs và hầu hết các thư viện hoặc framework khác đều sử dụng nó. Khi nghiên cứu về webpack sẽ có rất nhiều điều gây ra cho chúng ta khó hiểu, hôm nay mình viết bài viết này để giúp giải đáp những vấn đề thường nhầm lẫn khi sử dụng webpack. Đối với beginer, khi nhìn vào file config của webpack đối với mình đó là một ác mộng, đa phần toàn là những khái niệm mới, gây ra không ít phiền toái cho người mới bắt đầu. Những khái niệm và triết lý mới đã làm cho webpack nổi tiếng chăng, hôm nay mình sẽ "tẩy não" một cách nhìn mới khi sử dụng webpack. Bài viết này rất hữu ích cho người bắt đầu (cheer).
## Triết lý cốt lõi của webpack
1. **Mọi thứ đều là module**- khi làm việc với js, chúng ta thường tạo module ứng với 1 hoặc nhiều file js gộp lại. Thì đối với webpack thì những file như (CSS, Images, HTML) đều có thể trở thành module. Nó không khác gì khi chúng ta sử dụng file js cả. Cũng có những câu lệnh import module như **require(“myJSfile.js”)** or **require(“myCSSfile.css”)**. Với tính cách module thì chúng ta có thể sử dụng nó ở bất kì ở đâu và có thể re-use khi cho ta muốn.
2. **Load only “what” you need and “when” you need**- Thông thường khi làm việc với js, chúng ta sử dụng rất nhiều module khác nhau. Với wepback sẽ gộp tất các cái module đó thành một file **"bundle.js"**. Trong các ứng dụng thực tế file "bundle.js" có dung lượng lên đến **"10MB-15MB"**, đều này không tốt khi sử dụng cho website. Khi client request sẽ load rất lâu dẫn đến trải nghiệm người dùng đối với ứng dụng không tốt. Webpack hiểu ra điều đó nên webpack có vài tính năng chia nhỏ file "bundle" thì nhiều file khác nhau ứng với từng mục đích khác nhau. Việc chia nhỏ vậy, sẽ giúp chúng ta cần load những gì và khi nào cần sử dụng nó.
Có thể coi đây là hai triết lý cốt lõi khi sử dụng webpack, bây giờ chúng ta tìm hiểu những vấn đề thường nhầm lẫn khi sử dụng webpack nào.
## 1. Môi trường Development Vs Production
Một điều lưu ý là khi sử dụng webpack sẽ có rất nhiều chức năng (module). Một vài chức năng sử dụng riêng biệt cho môi trường phát triển và môi trường production hoặc cũng có thể là chức năng nó dùng cho cả hai môi trường trên.
![](https://images.viblo.asia/707b239f-e98e-4b0a-8ba2-d060bc499a21.png)
Đối với các ứng dụng lớn, việc nhồi nhét vào file cầu hình config của webpack sẽ vô cùng rối, thường thì sẽ tách ra 2 file config riêng cho ứng với từng môi trường khác nhau. Chẳng hạn như:
```
 “scripts”: {
  //npm run dev cho môi trường production
  “build”: “webpack --config webpack.config.prod.js”,
  //npm run dev cho môi trường phát triển
  “dev”: “webpack-dev-server”
 }
```
## 2.webpack CLI Vs webpack-dev-server
Một điều lưu ý nữa à, sau khi cài đặt webpack chúng ta sẽ có 2 cách để sử dụng nó:
1. **Webpack CLI tool** : đây là tool mặc định khi cài đặt webpack.
2. **Webpack-dev-server tool**: đây là  server Node.js hay nói cách khác đó là công cụ được cài đặt riêng biệt và cách thức hoạt động khác hoàn toàn với Webpack CLI tool .
### webpack CLI 
Webpack CLI thích hợp cho môi trường **production**. Webpack CLI nhận những option từ command line hoặc từ file config (mặc định là webpack.config.js) để bundle module.
Cách sử dụng:
```
Cách 1:
 
 // Cài đặt global
 npm install webpack-dev-server --save
 // Sử dụng ở khắp nơi mà bạn muốn
 webpack //<-- Sẽ tạo file bundle mà sử dụng webpack.config.js
 
 Cách 2:
 // Cài đặt local
 npm install webpack --save
 
“scripts”: {
 “build”: “webpack --config webpack.config.prod.js -p”,
 ...
 }
npm run build

```
### Webpack-dev-server
Webpack-dev-server thích hợp cho môi trường **development**. Webpack-dev-server chạy trên nền của Express node.js server và chạy port 8080. Lợi ích của webpack-dev-server là nó cung cấp vài chức năng thích hợp để phát triển đó là **“Live Reloading”** và **“Hot Module Replacement” (HMR)**.
Cách sử dụng:
```
OPTION 1:
//Cài đặt global
npm install webpack-dev-server --save
//Sử dụng ở terminal
$ webpack-dev-server --inline --hot
OPTION 2:
// Add câu lệnh trên vào file package.json

“scripts”: {
 “start”: “webpack-dev-server --inline --hot”,
 ...
 }
// thực hiện câu lệnh
$ npm start
//Mở brower ở địa chỉ bên dưới để truy cập
http://localhost:8080
```
> Option "inline" và "hot" chỉ dành riêng cho webpack-dev-server 
### webpack-dev-server CLI options Vs config options
Một điều lưu ý nữa là chúng ta có thể truyền option cho webpack-dev-server theo 2 cách:
1. Thông qua webpack.config.js
2. Thông qua câu lệnh command
```
// Thông qua CLI
webpack-dev-server --hot --inline
// Hoặc thông webpack.config.js
$devServer: {
 inline: true,
 hot:true
 }
```
> Khi bạn thêm option đến file **devServer** config **webpack.config.js** là (hot:true and inline:true). Thỉnh thoảng lại không hoạt động như mong muốn. Lời khuyên bạn nên thêm trực tiếp vào CLI thông qua package.json sẽ tốt hơn.
```
//package.json
{
scripts: 
   {“start”: “webpack-dev-server --hot --inline”}
}
```
### Khác nhau giữa 2 option “hot” và “inline” trong webpack-dev-server
Option **"Inline"** là tính năng **"Live reloading"** cho toàn bộ trang nếu có sự thay đổi ở source code. Option **"hot"** là tính năng chỉ load những thành phần thay đổi mà thôi thay vì load toàn bộ trang web. Nếu sử dụng đồng thời cả hai option này thì sao. Đầu tiền webpack sẽ lắng nghe (`watch`) sự thay đổi của source code, webpack-dev-server sẽ thực hiện HMR đầu tiên, nếu nó không hoạt động sẽ thực hiện **"Inline"** là reload toàn bộ trang. Webpack thật tuyệt vời phải không? Việc reload sự thay đổi thì webpack-dev-server sẽ lo điều này, công việc của dev chỉ tập trung vào phát triển mà thôi :D
```
//1. Không reload trang web
$ webpack-dev-server
//2. reloads toàn bộ trang web
$ webpack-dev-server --inline
//3. reloads module(HMR), or if HMR thực hiện lỗi, sẽ reload toàn bộ trang
$ webpack-dev-server  --inline --hot
```
## 3. “entry” — String Vs Array Vs Object
Thuộc tính **"Entry"** trong file **webpack.config.js** là input cho webpack hay nói cách đây là nơi cấu hình **root module**. Thuộc tính **"Entry"** nhận 3 loại giá trị (String, Arrray hoặc Object). Điều này có thể gây ra một số nhầm lẫn khi sử dụng chúng.
![](https://images.viblo.asia/303fe92b-a15e-444a-8979-7c47304138d6.png)
### entry — Array
Nếu bạn muốn `append` nhiều file thành một file **(bundle.js)** mà những file đó **không phụ thuộc lẫn nhau**. Bạn có thể sử dụng format là Array.
Ví dụ: bạn muốn sử dụng "googleAnalytics.js" trong HTML, mà Google Analytic là module độc lập. Khi bạn chạy webpack nó sẽ `append` đến dòng cuối cùng của **bundle.js**.
![](https://images.viblo.asia/e191258b-7fa2-4976-b31c-b0301919efcf.png)
### entry — object
Tưởng tượng úng dụng website của bạn có nhiều trang HTML(index.html, profile.html...). Mỗi trang HTML sẽ có 1 file js tương ứng. Nếu bạn muốn tạo nhiều **"bundle"** file thì format "entry" là object sẽ thích hợp trong ngữ cảnh này.
Ví dụ bạn muốn tạo ra 2 file js: file  indexEntry.js cho index.html và profileEntry.js sử dụng cho profile.html thì bạn cấu hình như sau:
![](https://images.viblo.asia/870591ab-b4f5-4ad9-86e5-42f30691cd85.png)
### entry — combination
Khi sử dụng "entry " là object thì thuộc tính của entry cũng có thể là array. Ví dụ, bạn muốn tạo ra 3 file js: vendor.js (sẽ gộp module file ứng với value của array), index.js và project.js
![](https://images.viblo.asia/7a4982d1-54ce-4e21-91e5-2d66fd3902f2.png)
## 4. output — “path” Vs “publicPath”
Thuộc tính "output" nói với webpack rằng đây thư mục là nơi để lưu kết quả **bundle** file. Sẽ có hai thuộc tính là "path" và publicPath" có thể gây bạn rối khi sử dụng.
"Path" cấu hình để lưu đường dẫn kết quả trả về, còn thuộc "publicPath" sử dụng để plugin của webpack cập nhập url bên trong CSS, HTML khi build trên môi trường **production**.
![](https://images.viblo.asia/cc1faa53-3575-4388-8438-4e4ae49ba99a.png)
Ví dụ, khi làm việc với file CSS, thường load background-image  bằng url, chúng ta thường load **'./test.png'** trên localhost. Trong môi trường production, đâu phải lúc nào hình ảnh cũng được đặt ở trên server mình. Nếu hình ảnh được ở CDN nào đó thì sao, chẳng lẽ chúng ta đi tìm từng file css thành thế đường dẫn để trỏ đến CDN nào đó hay sao. Điều này không hay tí nào. Rất may webpack có thuộc tính **"publicPath"** giúp chúng ta làm điều đó.
![](https://images.viblo.asia/587751c2-40c5-4683-b59b-94419291a2ef.png)
```
// Development: Both Server and the image are on localhost
.image { 
  background-image: url(‘./test.png’);
 }
// Production: Server trên Heroku nhưng hình ảnh ở CDN nào đó
.image { 
  background-image: url(‘https://someCDN/test.png’);
 }
```
## 5. Chaining Loaders ( works right to left)
> webpack enables use of loaders to preprocess files. This allows you to bundle any static resource way beyond JavaScript.

Đây là khái niệm về loader. Ví dụ, bạn có thể sử dụng **babel-loader** để chuyển đồi ES6 thành ES5 trình duyệt có thể hiểu được.
```
module: {
 loaders: [{
  test: /\.js$/, ←Test for ".js" file, if it passes, use the loader
  exclude: /node_modules/, ←Exclude node_modules folder
  loader: ‘babel’ ←use babel (short for ‘babel-loader’)
 }]
```
### Chaining Loaders ( works right to left)
Khi bạn muốn sử dụng nhiều loader trên một loại file thì thứ tự thực hiện sẽ là từ phải sang trái và được ngăn cách với bằng dấu **!**.
Ví dụ, chúng ta có một file css "myCssFile.css" và bạn muốn chèn nôi dung vào bên trong thẻ <style> Nôi dung CSS <style>. Để làm được điều này chúng ta phải sử dụng hai loader: css-loader và style-loader.

```
module: {
 loaders: [{
  test: /\.css$/,
  loader: ‘style!css’ <--(short for style-loader!css-loader)
 }]
```
Cách thức hoạt động:
![](https://images.viblo.asia/24629bf7-0834-4997-bfe2-da71ec6bf190.png)
1. Webpack sẽ coi như file css là dependencies trong module nếu bạn sử dụng câu lệnh **"require(myCssFile.css)"**. Webpack kiểm tra lọai file require nếu css thì webpack chuyển file css đến "css-loader" để *preprocess*.
2. **css-loader** load tất cả nội dung file css và return về JSON. Webpack sẽ truyền kết quả đến "style-loader".
3. **style-loader** sẽ lấy JSON như tham số truyền vào và append đó tag <style> sau đó insert đến file index.html.

## 6. File .babelrc
Babel-loader sử dụng "presets" để nhận biết để chuyển đổi ES6 thành ES5 hoặc chuyển file JSX của React thành JS. Để làm được điều đó bạn cần thêm thuộc tính "query->presets" như sau:
```
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }
  ]
}
```
Đối với ứng dụng lớn, file **webpack.config.js** sẽ rất nhiều cấu hình khác nhau, việc kiểm soát chúng vô cùng khó khăn để khắc phục điều đó thì bạn nên tạo file **.babelrc** để thực hiện cấu hình. Babel-loader sẽ tự động load file **"babelrc"** nếu file đó toàn tại để thực hiện preprogress.
```
//webpack.config.js 
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }
  ]
}

//.bablerc
{
 “presets”: [“react”, “es2015”]
}
```
## 7. Plugins
Plugin thực chất là **module nodejs**. Lấy kết quả của file **"bundle"** rồi xử lý.
Ví dụ **uglifyJSPlugin** lấy file "bundle.js" để tối ưu nội dung để giảm kích thước của file hoặc **extract-text-webpack-plugin** sử dụng **css-loader** và **style-loader** để tập hợp nội dung CSS sau đó append nội dung đến file tách biệt nào đó **(style.css)**.
```
//webpack.config.js
//Take all the .css files, combine their contents and it extract them to a single "styles.css"
var ETP = require("extract-text-webpack-plugin");

module: {
 loaders: [
  {test: /\.css$/, loader:ETP.extract("style-loader","css-loader") }
  ]
},
plugins: [
    new ExtractTextPlugin("styles.css") //Extract to styles.css file
  ]
}
```
## 8. Loaders Vs Plugins
Như các bạn đã biết, Loader chỉ thực hiện trên một file nhất định (js, html, css..) nó thực hiện trước quá trình tạo file **"bundle"**.
Còn với Plugin thực hiện trên kết quả của file bundle. Hay nó cách khác là nó thực hiện ở cuối quy trình tạo ra file **"bundle"**.
## 9. Resolving File Extensions
Khi chúng ta require một file nào đó mà chúng ta không nhập thành phần mở rộng của file **(require("./myJSFile")** thì webpack sẽ giúp chúng ta import file mà không cần khai báo extension.
```
{
 resolve: {
   extensions: [‘’, ‘.js’, ‘.jsx’]
 }
}
```
## Wrap up
Mình đã giới thiệu những khái niệm dễ gây ra sự nhầm lẫn khi sử dụng webpack. Việc nắm bắt kiến thức cơ bản này sẽ tạo tiền đề để thành thạo webpack cũng như giúp mình đưa ra những sản phẩm tốt nhất đến end user. Webpack là công cụ khá tuyệt vời các bạn còn chừng chừ gì mà không áp dụng ngay vào trong real-project, có cộng động support vô cùng hùng hậu :D. **Happy coding!**