## Giới thiệu

Trong phần trước mình đã giới thiệu về Webpack, các đặc điểm và cách cài đặt của webpack, các bạn có thể tham khảo [tại đây](https://viblo.asia/p/tim-hieu-ve-webpack-LzD5dJEdZjY). Phần tiếp theo mình sẽ giới thiệu các khái niệm cơ bản trong webpack.

## Các khái niệm

Về cốt lõi, webpack là một  static module bundler cho các ứng dụng JavaScript hiện đại. Khi webpack xử lý ứng dụng của bạn, nó sẽ xây dựng một dependency graph để ánh xạ mọi module mà dự án của bạn cần và tạo ra một hoặc nhiều bundles .

Kể từ phiên bản 4.0.0, webpack không yêu cầu tệp cấu hình để gói dự án của bạn, tuy nhiên nó có thể cấu hình đáng kinh ngạc để phù hợp với nhu cầu bạn cần.

Để bắt đầu, bạn cần hiểu các khái niệm cốt lõi của webpack:

* Entry
* Output
* Loaders
* Plugins
* Mode
* Browser Compatibility

### Entry

Trong file webpack.config.js chúng ta thấy có thuộc tính entry, đây chính là điểm bắt đầu khi ứng dụng chạy và cũng chính là điểm bắt đầu để Webpack đọc và phân tích các gói thư viện liên quan, các file liên quan cho việc đóng gói.

Một entry point cho biết module webpack nào sẽ sử dụng để bắt đầu xây dựng dependency graph bên trong của nó . Webpack sẽ chỉ ra các module và thư viện khác mà entry point  phụ thuộc vào (trực tiếp và gián tiếp).

Theo mặc định, giá trị của nó là `./src/index.js`, nhưng bạn có thể chỉ định một (hoặc nhiều entry point) khác nhau bằng cách cấu hình thuộc tính entry trong cấu hình webpack . Ví dụ:

webpack.config.js
```
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

***Các cách để cấu hình entry point***

**Cú pháp Single Entry**

Cách sử dụng: `entry: string|Array<string>`

webpack.config.js

```
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

**Cú pháp Object**

Cách sử dụng: `entry: {[entryChunkName: string]: string|Array<string>}`

webpack.config.js

```
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js'
  }
};
```

### Output

Khi webpack đóng gói tất cả các module liên quan, bạn cần thiết lập cho webpack nơi file kết quả được tạo ra sau khi đóng gói. Webpack sử dụng thuộc tính output trong đối tượng cấu hình.

Các thuộc tính output cho webpack nơi phát hành các bundles nó tạo ra và làm thế nào để đặt tên cho các files. Nó mặc định ./dist/main.js cho tệp output chính và thư mục ./dist cho bất kỳ file được tạo nào khác.

Bạn có thể định cấu hình phần này của quy trình bằng cách chỉ định một trường output trong cấu hình của bạn:

webpack.config.js
```
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

Trong ví dụ trên, chúng ta sử dụng các thuộc tính output.filename và output.path để nói cho webpack là tên file output và đường dẫn nơi đặt file output này.

### Loaders

Ra khỏi box, webpack chỉ hiểu các file JavaScript và JSON. Loaders cho phép webpack xử lý các loại tệp và chuyển đổi chúng thành các modules hợp lệ có thể được ứng dụng của bạn sử dụng và thêm vào dependency graph.

Loader cho phép bạn tiền xử lý một file khi bạn sử dụng câu lệnh require() để tải nó, các loader chuyển đổi file từ các ngôn ngữ khác nhau như TypeScript, CoffeeScript… sang Javascript, nó thậm chí cho phép bạn require() file CSS trong Javascript. Webpack xử lý các file (.css, .html, .scss, .jpg…) như những module, tuy nhiên webpack chỉ hiểu Javascript do đó nó cần các loader.

Lưu ý rằng khả năng import đối với bất kỳ loại module nào, ví dụ: file css, là một tính năng dành riêng cho webpack và có thể không được hỗ trợ bởi các bundlers hoặc trình chạy task khác.

Ở mức cao, loaders có hai thuộc tính trong cấu hình webpack của bạn:

* Các thuộc tính test xác định file hoặc các files cần được chuyển đổi.
* Các thuộc tính use xác định loader nào nên được sử dụng để thực hiện chuyển đổi.

webpack.config.js

```
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};
```

Cấu hình ở trên đã xác định một thuộc tính rules cho một single module với hai thuộc tính bắt buộc: test và use.

Điều quan trọng cần nhớ là khi xác định quy tắc trong cấu hình webpack của bạn, bạn có xác định chúng theo module.rules và không rules. Vì lợi ích của bạn, webpack sẽ cảnh báo bạn nếu điều này được thực hiện không chính xác.

### Plugins

Loader chỉ được sử dụng để thực hiện các chuyển dạng cho các file cần xử lý, plugin thì khác, nó thực hiện các hành động hoặc các chức năng của người dùng trên các compilation hoặc chunk.

Trong khi loaders được sử dụng để chuyển đổi một số loại modules nhất định, các plugin có thể được tận dụng để thực hiện một phạm vi rộng hơn của các nhiệm vụ như tối ưu hóa bundle, quản lý tài sản và thêm các biến môi trường.

Để sử dụng một plugin, bạn cần require() nó và thêm nó vào plugins mảng. Hầu hết các plugin đều có thể tùy chỉnh thông qua các tùy chọn. Vì bạn có thể sử dụng một plugin nhiều lần trong một cấu hình cho các mục đích khác nhau, bạn cần tạo một phiên bản của nó bằng cách gọi nó với toán tử mới.

webpack.config.js

```
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

Trong ví dụ trên, html-webpack-plugin tạo một tệp HTML cho ứng dụng của bạn bằng cách tự động thêm tất cả các bundles được tạo của bạn.

### Mode

Việc thiết lập kịch bản môi trường nhằm tăng thời gian deploy và giảm thời lượng chờ không cần thiết. Bằng cách đặt tham số mode thành một trong hai development, production hoặc none, bạn có thể kích hoạt tối ưu hóa tích hợp sẵn của webpack tương ứng với từng môi trường.

Khi cấu hình, bạn sẽ nhập thêm param mode như ví dụ sau:

```
module.exports = {
  mode: 'development'
}
```

Chế độ development thực hiện một số ưu tiên riêng:

* Build nhanh
* Ít tối ưu hoá code, nén code hơn.
* Không xoá bỏ các comment trong code.
* Cung cấp thêm thông tin lỗi và gợi ý.
* Cung cấp thêm khả năng debug tốt hơn.

Ngược với development, chế độ production chậm hơn, tuy nhiên lại tối ưu tốt hơn kết quả đầu ra. Kết quả là file Javascript đầu ra có kích thước nén nhỏ hơn.

### Browser Compatibility

Webpack hỗ trợ tất cả các trình duyệt tuân thủ ES5 (IE8 trở xuống không được hỗ trợ). Nhu cầu webpack Promise cho import() và require.ensure(). Nếu bạn muốn hỗ trợ các trình duyệt cũ hơn, bạn sẽ cần tải một polyfill trước khi sử dụng các biểu thức này.

## Kết luận

 Bài viết trên đã giới thiệu những khái niệm cơ bản đủ để bạn bắt đầu với webpack. Bây giờ, chúng ta biết sự khác biệt chính giữa task runners và bundlers và bốn khái niệm cốt lõi trong webpack: entry, output, Loaders and plugins.
 
 **Tài liệu tham khảo:** https://webpack.js.org/concepts