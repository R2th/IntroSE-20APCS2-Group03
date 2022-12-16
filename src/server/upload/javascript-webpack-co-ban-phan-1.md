# Mở bài #
Chào các bạn. Mình hiện tại đang tìm hiểu vể webpack, bài viết này mình và các bạn cùng hãy cùng giúp nhau tìm hiểu về nó nhé.

Đầu tiên mình xin nói về 2 khái niệm : 
**task runner** và **module bundler** 
## task runner ##
- Nếu bạn đang viết những ứng dụng sử dụng Javascript và đang phát triển 1 trang website, bạn sẽ cần phải sử dụng ít nhất là vài công cụ để giúp bạn một số công 
việc như minify file css, file js, biên dịch file scss -> file css, khi bạn chỉnh sửa sourcecode thì website bạn reload lại để cập nhật những thay đổi đó và còn nhiều chức
năng bạn cảm thấy cần thiết để phát triển website của mình nữa. Tuy nhiên nhiều công cụ vậy, chẳng lẽ nếu mình thêm 1 dòng css thì phải chạy lệnh 1 để build scss -> css,
lệnh 2 để tiếp tục minify file css, lệnh 3 để thực hiện việc reload lại website ? Khi đó xuất hiện các tool thực hiện việc chạy tool đó 1 cách tự động 
=> sự ra đời của **task runner**, **chương trình dùng để gọi các chương trình khác**.
- mình xin giới thiệu vài công cụ như **grunt** và **gulp**. ( mình sẽ cố gắng viết bài về 1 trong 2 cái này ).

## module bundler ##
- **Module** khái niệm đơn giản :  là tập hợp các đoạn code, có thể là một hàm hay một đối tượng, các đoạn code được đóng gói lại với nhau và được giữ Private.
Vì vậy, chỉ các hàm và biến trong module được truy cập và sử dụng lẫn nhau, còn khi nào cần sử dụng **Module** từ bên ngoài gọi vào thì ta sẽ export nó ra. 
Mỗi module thường được khai bảo ở một tập tin riêng rẽ.
Các module hoàn toàn tách biệt độc lập nhau, mỗi module sẽ thực hiện nhiệm vụ của riêng nó mà không ảnh hưởng tới module khác. Khi nào cần sử dụng module nào thì gọi chúng ra và kết hợp các module lại với nhau tùy logic xử lý của bạn.

- **bundler** : Khi chia các Module ra từng file, folder riêng và còn có thể là các Module thư viện của bạn khi import vào để dùng trong dự án.
Kết quả là mỗi file đó sẽ được tham chiếu đến file html của bạn bằng những thẻ <script/>, khi người dùng truy cập trang web của bạn, những <script/> trong từng file riêng biệt đó sẽ được 
tải lần lượt từng file 1, từng file 1. Để giải quyết vấn đề này, chúng ta sẽ đóng gói  **bundler** tất cả các file này thành 1 file lớn để giảm số lượng request.
Nhưng có 1 vấn đề về việc **bundler** này, nếu trong code file A mình cần import code file B  và code file K mình cần import file B thì sao ?
Bài toán dependency này đã được Webpack giải quyết triệt để, chúng ta không cần phải khai báo với webpack thứ tự các file trước hay sau.

# Thân bài #
![](https://images.viblo.asia/ab1fe984-9c49-4c3d-bfc7-54f23186b6ba.png)
## mục tiêu của webpack ##
- **Mọi thứ đều là module**
đối với webpack thì những file như (CSS, Images, HTML) đều có thể trở thành module. Nó không khác gì khi chúng ta sử dụng file js cả. Cũng có những câu lệnh import module như require(“myJSfile.js”) or require(“myCSSfile.css”). Với module thì chúng ta có thể sử dụng nó ở bất kì ở đâu và có thể re-use khi cho ta muốn.
- **Chia môi trường Development và Production.**
Sẽ có những Module riêng biệt để chạy trên môi trường Development, và những Module riêng biệt để chỉ chạy trên Production, hoặc Module để chạy cả 2 môi trường.
Nghe là biết rắc rồi rồi, webpack sẽ hỗ trợ bạn config để chia Module chạy trên môi trường tùy theo bạn muốn.
- **load only module webpack**
Thông thường khi làm việc với javascript, chúng ta sẽ sử dụng nhiều **module** để thực hiện nhiều chức năng công việc khác nhau, vậy nếu gộp tất cả vào cùng 1 file, chắc chắn
file đó có dung lượng rất lớn, điều này chắc chắn sẽ không tốt cho website của bạn, vì khi người dùng request đến sẽ load rất lâu và ảnh hưởng đến trải nghiệm của họ,
webpack hiểu vấn đề này nên có vài tính năng chia nhỏ file bundler ra thành nhiều file khác nhau với từng mục đích sử dụng khác nhau. 
Việc chia nhỏ vậy, giúp chúng ta cần gì sẽ load cái đó.

- **… và còn rất nhiều thứ thú vị khác nữa.**
## Install project ##

Tất cả các project sử dụng trình quản lý gói (npm) phải được khởi tạo. Để khởi tạo chúng ta sử dụng câu lệnh như sau:
```
npm init
```

Sau khi thực hiện dòng lệnh này, trong thư mục dự án của bạn sẽ tạo ra một file tên là package.json
Khi thực hiện npm init sẽ có sẽ có câu hỏi, bạn có thể ấn enter hoặc trả lời để tiếp tục, nhưng đến đoạn yes thì nhớ ấn luôn chữ ' yes ' nhé.

Sau khi hoàn thành thì file package.json sẽ có nội dung như thế này:


```
{
"name": "react-one",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"keywords": [],
"author": "",
"license": "ISC"
}
```

mình sẽ sử dụng Reactjs trong dự án này .

## Tải webpack và webpack-cli ##

 Tất nhiên rồi, việc đầu tiên là phải tải về nó về đã:
 
     Câu lệnh : 
```
 *npm install webpack webpack-cli --save-dev*
```
     
 Và khi vào file package.json :
```
       "devDependencies": {
        "webpack": "^4.41.0",
        "webpack-cli": "^3.3.9"
      }
```
      
  Khi xuất hiện dòng này là đã được install thành công webpack và webpack-cli.
  
  ### webpack-cli ###
  mình chưa hiểu chức năng của thằng này lắm, đọc tài liệu trên mạng thì bảo nó cung cấp công cụ để thiết lập cấu hình và tùy chỉnh webpack bằng những câu lệnh.

## Tải React ##
Tiếp tục install **react** và **react-dom** để có thể triển khai được 1 app reactjs.
```
npm install react react-dom --save
```

Và khi vào file package.json :
```
  "dependencies": {
    "react": "^16.10.1",
    "react-dom": "^16.10.1"
  },
```

 Khi xuất hiện dòng này là đã được install thành công **react** và **react-dom**.
 
 ## Tải về Babel #
 Để React hoạt động, chúng ta cần cài đặt Babel cùng với React. Chúng ta cần Babel để phiên mã ES6 và JSX sang ES5.
 (phần lớn trình duyệt chưa support hết ES6+ và JSX)
 
 Tiếp tục install **babel-core** , **babel-loader**, **babel-preset-env**, **babel-preset-react**..
 
```
 npm install @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```

Và khi vào file package.json :
```
  "devDependencies": {
    "@babel/core": "^7.6.2",
    "@babel/preset-env": "^7.6.2",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.6",
    "webpack": "^4.41.0",
    "webpack-cli": "^3.3.9"
  }
```

 Khi xuất hiện dòng này là đã được install thành công  **babel-core** , **babel-loader**, **babel-preset-env**, **babel-preset-react**.

* **Babel-core** : Nó sẽ biến đổi code viết theo kiểu es6 sang kiểu es5. ( kiểu es5 được trình duyệt  hỗ trợ và đọc được).
*  **babel-loader** : Thành phần này sẽ giúp làm việc được với webpack, đưa ra những cài đặt cho webpack.
*  **babel-present-env** : Preset giúp babel chuyển đổi mã ES6, ES7 và ES8 sang ES5.
*  **babel-present-react** : chuyển jsx thành js.

## Khởi tạo project ##
Trong thư mục của dự án hiện tại mình sẽ tạo thêm 1 thư mục có tên là **src**.

### index.js ###
Tạo một file **index.js** bên trong thư mục src. File **index.js** này sẽ là điểm đầu vào ứng dụng của chúng ta.

Vào edit file **index.js** và thêm console.log
```
console.log("Đây là index.js");
```
### index.html ###
Tạo một file **index.html** bên trong thư mục src, file **index.html** và file **index.js** sẽ ngang cấp với nhau.

Vào edit file **index.html** và thêm:

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>React Demo</title>
</head>

<body>
    <div id="root">

    </div>
</body>

</html>
```

### webpack.config.js ###
Tạo 1 file có tên **webpack.config.js**, file này sẽ nằm trong thư mục gốc **project** của bạn và nó không nằm trong thư mục **src**.

Nghe tên là ta có thể đoán ra file **webpack.config.js** này sẽ làm việc cấu hình webpack rồi nhỉ .

Bạn hãy edit nó và paste nội dung này vào và chúng ta sẽ giải thích nó.

```
const path = require("path");

module.exports = {
  entry: "./src/index.js", //entry chính là input.
  output: { // như cái tên gọi của nó, đây chính là output.
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  }
}
```

- **entry**: Là file webpack sẽ bắt đầu làm việc và thực hiện viêc nạp file để thực hiện việc **bundler**, nó sẽ đi từ file mà bạn chọn từ đây.Nó sẽ import tiếp **module** từ thằng này import rồi thằng khác import từ thằng khác khác nữa từ đó sẽ kéo theo một chuỗi có hệ thống việc load các js **module**.
- **output**: là đầu ra của file sau khi webpack làm việc xong, đây là đóng gói của mọi thứ sẽ nằm trong file **index_bundle.js** bên trong thư mục dist này.

### Module trong webpack ###
Ta đã có **entry** và **output** rồi, tiếp theo chúng ta sẽ có **Module**, Trong **module** được phân ra làm 3 mục nhỏ 
- **preLoaders** :  Các tiền xử lý được nạp trước và chạy trước khi bắt đầu với các **Module loaders**, thường thì trong **preLoaders** các Dev sẽ check syntax của nó với **JSHint** hay **ESLint**, việc này không giúp code chạy nhanh hơn nhưng giúp code dễ đọc hơn, nên sẽ được cấu hình chạy trên môi trường dev là chủ yếu.
- **loaders** : Đây là chỗ khai báo rất quan trọng của webpack, nó sẽ thực hiện việc complie các chuẩn và định dạng trình duyệt chưa hỗ trợ sang các chuẩn và định dạng trình duyệt hỗ trợ vào đọc được, ví dụ như : như đưa less, scss về css có **less-loader**, **scss-loader**, hay chuyển đổi es6, type-script về es5 có **babel-loader** .. và rất nhiều loader khác.
- **postLoaders** : Thằng này sẽ xử lý cuối cùng, mình cũng chưa hiểu nó sẽ xử lý cái gì và như thế nào nên không viết.

```
module: {
    /*Chỉ thị tiền xử lý trước khi chạy loaders*/
    preLoaders: [
      {}
    ],
    loaders: [
      /*Danh sách các loader*/
      {},
      {}
    ]
  },
```

Nhưng từ phiên bản **v2.1-beta.23**   **loaders** sẽ đổi tên thành  **rules** và **preLoaders/postLoaders** sẽ được xác định với thuộc tính **enforce** nếu **loaders** đó là 
**preLoaders** hoặc **postLoaders**.

```
module : {
   loaders : [
     {
         test : /\.jsx?/, // chỉ nạp những file có định dạng jsx.

         exclude: /node_module/, // bỏ qua các thư mục node_module.

          // Áp dụng khi dùng 1 loader
         loader: 'babel-loader', // loader .Ở đây mình chuyển đổi ES6 sang ES5 nên mình sử dụng babel-loader, nó sẽ giúp mình loader những module babel
         
          enforce: "pre", //preLoaders
          enforce: "post", //postLoaders
          
          // thiết lập dành cho loader
          options: {
              presets: ["es2015"]
          },
         
     {
        test: /\.css$/, // chỉ nạp những file có định dạng css
                
         // Áp dụng khi dùng nhiều loader
        use: [
                        "style-loader", 
                        { 
                            loader: { "css-loader" },
                            // tùy chọn và thiết lập
                             options: {
                              / ... /
                             }
                         }
                  ]
     }
  ]
}
```
- **test : value,** : khi phân tích **module loaders** này thì webpack sẽ dựa vào **test** và kiểm tra value của nó dựa trên regex để xác định **module loaders** sẽ nạp chỉ với những file có định dạng như yêu cầu, để chuẩn bị cho quá trình xử lý.
- **exclude : value** : Khi phân tích  **module loaders** này thì webpack sẽ dựa vào **exclude** và kiểm tra value của nó so khớp với file hoặc thư mục của bạn,  **module loaders** sẽ bỏ nạp những file và thư mục này, ( thường sẽ bỏ thư mục node_module ).
- **loader** : đây là thành phần quan trọng nhất, nó chính là các loader module mà bạn cài từ các gói package npm. ( Lưu ý rằng webpack sẽ xử lý các loader theo thứ tự từ cuối cùng đến đầu tiên hay từ phải sang trái).
-  **enforce : value** : Khai báo nếu là **preLoaders** hoặc **postLoaders**, với value theo thứ tự **pre** hoặc **post**.

# Kết bài #

**Xin cảm ơn, nếu có thắc mắc hoặc đóng góp mong các bạn bình luận phía dưới.
mình sẽ viết tiếp phần 2 cho dễ đọc**