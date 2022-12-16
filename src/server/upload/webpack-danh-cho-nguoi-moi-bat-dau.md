# 1. Giới thiệu
Hiện nay khái niệm SPA ngày càng phổ biến trong giới làm web, nhờ sự xuất hiện của hàng ngàn thư viện và công cụ giúp cho việc viết JS trở nên JS và dễ quản lý hơn. Có thể kể đến một số tên tuổi lớn như ReactJS, VueJS, Angular,... Nhưng các thư viện này đều có một chuẩn cú pháp riêng và trình duyệt không thể đọc hiểu trực tiếp các ngôn ngữ này, và một dự án có hàng trăm file thì trình duyệt sẽ quản lý như thế nào và làm thế nào để biết load cái nào trước cái nào sau. Từ những yêu cầu như trên Webpack đã ra đời, vậy thì Webpack là gì? Làm thế nào để cấu hình Webpack cho dự án? Trong bài viết này tôi sẽ giúp bạn giải đáp những thắc mắc đó.

Let's go...

# 2. Tại sao nên sử dụng Webpack
Để làm trả lời cho câu hỏi này chúng ta cùng nhau quay trở lại trước khi trên thế giới tồn tại thứ gọi là Webpack này. Có hai cách để chúng ta có thể chạy JavaScript trên trình duyệt. Cách thứ nhất là gộp tất cả các hàm vào cùng một file JS. Cách thứ hai là mỗi hàm sẽ là một file JS. Cả hai cách này đều có nhược điểm là rất khó để bảo trì, để đọc, ảnh hưởng đến performance, có thể dẫn đến tình trạng bottleneck network, ngoài ra việc tái sử dụng rất là phức tạp và khó khăn.

# 3. Webpack là gì?
Theo trang chủ của Webpack
> At its core, webpack is a static module bundler for modern JavaScript applications.

Có thể hiểu ở đây Wepack là công cụ giúp bạn compile các module JS. Hay Webpack được gọi là "module bundler" tĩnh. Webpack sử dụng cơ chế xây dựng một đồ thị phụ thuộc (Dependency graph) ánh xạ tất cả module mà dự án cần và khởi tạo một hoặc nhiều bundles (thông thường là một)
![Screen Shot 2021-09-14 at 16.33.58.png](https://images.viblo.asia/87c0e6e0-0bd1-4099-9499-aa78dff4cf6c.png)
# 4. Cài đặt
Tương tự như cách cài đặt thư viện JS khác nếu bạn sử dụng `npm` thì có thể sử dụng như sau:
```sh
$ npm i -g webpack
```
hoặc nếu muốn cài đặt trong một dự án cụ thể nào đó
```sh
$ npm i --save-dev webpack
```
# 5. Cấu hình Webpack
Sau khi cài đặt thành công Webpack bạn cần có file cấu hình để cấu hình cho Webpack có thể chạy được. Bạn cần tạo file có tên là ```webpack.config.js``` ở root của thư mục dự án và webpack sẽ tự động hiểu nó. Nếu bạn muốn sử dụng file khác thì cần sửa lại lệnh trong file **package.json** như sau:
```
"scripts": {
  "build": "webpack --config [TÊN_FILE]"
}
```
Wepack hỗ trợ rất nhiều tuỳ chọn cài đặt để nhằm nâng cao performance cho dự án của bạn. Nhưng có 5 trường bạn bắt buộc phải có trong file config.

## 4.1. `entry`
Là tên của file đầu vào để Webpack biết đâu sẽ là module đầu tiên để xây dựng đồ thị phụ thuộc. Webpack sẽ tự động tìm kiếm những module hoặc thư viện mà entry point thụ thuộc (trực tiếp hoặc gián tiếp). Mặc định thì sẽ là file `./src/index.js`, bạn có thể thay đổi file này bằng cách cài đặt trong file config. Ví dụ,

**webpack.config.js**
```
module.exports = {
	entry: '[ĐƯỜNG_DẪN_ĐẾN_ENTRY_FILE]'
}
```
hoặc,

**webpack.config.js**
```
module.exports = {
	entry: {
        main:  '[ĐƯỜNG_DẪN_ĐẾN_ENTRY_FILE]',
    }
}
```
Với cách thứ hai trông có vẻ sẽ dài dòng hơn,  tuy nhiên đây là dễ mở rộng nhất để xác định entry point trong ứng dụng của bạn. [Đọc thêm](https://v4.webpack.js.org/concepts/entry-points/#scenarios)

## 4.2 `output`
Thuộc tính `output` để chỉ ra nơi mà cách file sau khi bundle lưu trữ và tên của các file này. Mặc định là `./dist/main.js`. Bạn cũng có thể thay đổi giá trị này trong file config. Ví dụ,

**webpack.config.js**
```
module.exports = {
	entry: '[ĐƯỜNG_DẪN_ĐẾN_ENTRY_FILE]',
    output: '[ĐƯỜNG_DẪN_OUTPUT_FILE]',
}
```
hoặc,

**webpack.config.js**
```
const path = require('path');

module.exports = {
	entry: '[ĐƯỜNG_DẪN_ĐẾN_ENTRY_FILE]',
    output: {
    	path: path.resolve(__dirname, '[THƯ_MỤC_OUTPUT]'),
   		filename: '[TÊN_FILE_OUTPUT]'
  	},
}
```
**Lưu ý**, với `entry` thì chúng ta có thể sử dụng multiple entry nhưng với `output` thì chỉ có một cấu hình duy nhất được chỉ định. Vậy nếu bạn vẫn muốn cài đặt multiple output thì có thể tìm hiểu thêm tại [đây](https://v4.webpack.js.org/concepts/output/#multiple-entry-points).

## 4.3. `loader`
Webpack chỉ có thể hiểu được file JS và JSON. `loader` giúp webpack hiểu được những loại file khác và thêm nó vào trong ứng dụng của bạn. `loader` có hai phương thức:
1. `test` chỉ ra file sẽ được chuyển đổi
2. `user` chỉ ra loader được sử dụng để chuyển đổi

Ví dụ,

**webpack.config.js**
```
module.exports = {
	entry: '[ĐƯỜNG_DẪN_ĐẾN_ENTRY_FILE]',
    output: '[ĐƯỜNG_DẪN_OUTPUT_FILE]',
    rules: [
  		{
 			test: /\.txt$/,
			use: 'raw-loader'
 		},
  	]
}
```

Một số loader hay dùng
* [babel-loader](https://v4.webpack.js.org/loaders/babel-loader): transpile ES2015 code sử dụng Babel
* [ts-loader](https://github.com/TypeStrong/ts-loader) hoặc [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader): load file Typescript
* [css-loader](https://v4.webpack.js.org/loaders/css-loader): load file CSS
* [style-loader](https://v4.webpack.js.org/loaders/style-loader): Add exports of a module as style to DOM
* [file-loader](https://v4.webpack.js.org/loaders/file-loader): Emits the file into the output folder and returns the (relative) URL
* [html-loader](https://v4.webpack.js.org/loaders/html-loader): Exports HTML as string, require references to static resources

Ngoài ra, bạn có thể tham khảo thêm [danh sách các loaders.](https://v4.webpack.js.org/loaders/)

## 4.4. `plugins`
Trong khi `loader` để chuyển đổi một số loại modules nhất định, thì `plugins` được sử dụng để làm những nhiệm vụ lớn hơn như tối ưu bundle, quản lý assets và đưa vào các biến môi trường.
Để sử dụng được một plugin bạn cần `require()` nó và thêm nó vào mảng các plugins. Ví dụ,

**webpack.config.js**
```
const HtmlWebpackPlugin = require('html-webpack-plugin') // tạo file html và tự động inject các file sau khi bundle
module.exports = {
	entry: '[ĐƯỜNG_DẪN_ĐẾN_ENTRY_FILE]',
    output: '[ĐƯỜNG_DẪN_OUTPUT_FILE]',
    rules: [
  		{
 			test: /\.txt$/,
			use: 'raw-loader'
 		},
  	],
 	plugins: [ new HtmlWebpackPlugin() ]
}
```
Xem thêm [danh sách cách plugins](https://v4.webpack.js.org/plugins/)

## 4.5. `mode`
Webpack cung cấp 3 chế độ cho từng môi trường là `development`, `production` và `none`. Mặc định thuộc tính sẽ nhận giá trị là *production*. Ví dụ,

**webpack.config.js**
```
const HtmlWebpackPlugin = require('html-webpack-plugin') // tạo file html và tự động inject các file sau khi bundle
module.exports = {
	mode: 'development'
	entry: '[ĐƯỜNG_DẪN_ĐẾN_ENTRY_FILE]',
    output: '[ĐƯỜNG_DẪN_OUTPUT_FILE]',
    rules: [
  		{
 			test: /\.txt$/,
			use: 'raw-loader'
 		},
  	],
 	plugins: [ new HtmlWebpackPlugin() ]
}
```

# 6. Kết luận
Ở bài viết này chúng ta đã tìm hiểu về Webpack là gì? Tại sao lại sử dụng Webpack? Cách cài đặt và cấu hình Webpack đơn giản? Còn rất nhiều phương thức config khác mà bạn có thể tham khảo trong [tài liệu của Webpack](https://v4.webpack.js.org/concepts/). Ở bài viết tiếp theo chúng ta sẽ bắt tay vào tìm hiểu cấu hình Webpack cho một dự án sử dụng ReactJS. Cảm ơn các bạn đã dành thời gian tìm hiểu. Hẹn gặp lại ở những bài viết tiếp theo.

## Tài liệu tham khảo
* [Webpack documentation](https://v4.webpack.js.org/concepts/)