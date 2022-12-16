## Giới thiệu

Webpack là một module bundler. Webpack có thể quản lý gói cùng với một trình chạy task riêng biệt. Tuy nhiên, ranh giới giữa bundler và task đã trở nên mờ nhạt nhờ các cộng đồng phát triển plugin webpack. Đôi khi các plugin này được sử dụng để thực hiện các task thường được thực hiện bên ngoài webpack chẳng hạn như làm sạch thư mục build hoặc triển khai build.

Webpack là một công cụ cho phép bạn biên dịch các module JavaScript, còn được gọi là module bundler. Thay vì nhiều file, nó tạo ra một file (hoặc một vài file) chạy ứng dụng của bạn.

Webpack có thể thực hiện nhiều hoạt động:

* Giúp bạn đóng gói resources của bạn.
* Theo dõi thay đổi và chạy lại các task.
* Có thể chạy biên dịch Babel chuyển sang ES5, cho phép bạn sử dụng các tính năng JavaScript mới nhất mà không phải lo lắng về hỗ trợ trình duyệt.
* Có thể biên dịch CoffeeScript sang JavaScript.
* Có thể chuyển đổi ảnh inline sang data URIs.
* Cho phép bạn sử dụng require() cho các file CSS.
* Có thể chạy một webserver dùng cho development.
* Có thể xử lý hot module replacement.
* Có thể tách các file output thành nhiều file để tránh tải file js lớn trong lần đầu tải trang.
* Có thực hiện tree shaking.

## Đặc điểm

### Webpack dựa trên Modules

Dự án nhỏ nhất bạn có thể bundle với webpack bao gồm input và output . Quá trình bundling bắt đầu từ đầu vào do người dùng xác định . Đầu vào chính là các module và có thể trỏ đến các modules khác thông qua imports.

Khi bạn bundle một dự án bằng cách sử dụng webpack, nó sẽ duyệt qua các lần imports, xây dựng một biểu đồ phụ thuộc của dự án và sau đó tạo output dựa trên cấu hình. Ngoài ra, có thể xác định các điểm phân tách để tạo các bundle riêng biệt trong chính mã dự án.

Webpack hỗ trợ các module ES2015, CommonJS và AMD. Cơ chế loader cũng hoạt động cho CSS, với @import và url() hỗ trợ thông qua css-loader . Bạn cũng có thể tìm thấy các plugin cho các task cụ thể, chẳng hạn như minification, internationalization, HMR, v.v.

### Quy trình thực thi Webpack's

![](https://images.viblo.asia/477a8b47-90ad-4038-9eb7-0227da981257.png)
Webpack bắt đầu công việc của nó từ các đầu vào . Thông thường đây là các module JavaScript nơi webpack bắt đầu quá trình xử lý của nó. Trong quá trình này, webpack đánh giá các kết quả đầu vào phù hợp với các cấu hình của loader cho biết cách webpack chuyển đổi từng hàng.

### Quá trình giải quyết

Một đầu vào chính là một module. Khi webpack bắt gặp một , webpack sẽ cố phù hợp đầu vào với hệ thống file bằng cách sử dụng kết quả cấu hình của đầu vào . Bạn có thể yêu cầu webpack thực hiện tra cứu đối với các thư mục cụ thể ngoài node_modules . Bạn cũng có thể điều chỉnh cách phù hợp webpack với các phần mở rộng file và bạn có thể định nghĩa các bí danh cụ thể cho các thư mục.

Nếu vượt qua mức độ giải quyết, webpack sẽ tăng lỗi runtime. Nếu webpack quản lý để giải quyết một file chính xác, webpack sẽ thực hiện xử lý qua file phù hợp dựa trên định nghĩa của loader. Mỗi loader áp dụng một chuyển đổi cụ thể đối với nội dung module.

Cách loader được khớp với file đã giải quyết có thể được cấu hình theo nhiều cách, bao gồm theo loại file và theo vị trí trong hệ thống file. Tính linh hoạt của Webpack thậm chí cho phép bạn áp dụng một chuyển đổi cụ thể cho một file dựa trên nơi nó được import vào dự án.

Quá trình giải quyết tương tự được thực hiện đối với các loader của webpack. Webpack cho phép bạn áp dụng logic tương tự khi xác định nên sử dụng loader nào. Nếu webpack không thực hiện tra cứu loader, nó sẽ xuất hiện lỗi runtime.

### Webpack giải quyết mọi loại file

Webpack sẽ giải quyết từng module mà nó gặp trong khi xây dựng biểu đồ phụ thuộc. Nếu một đầu vào chứa phụ thuộc, quá trình sẽ được thực hiện đệ quy theo từng phụ thuộc cho đến khi hoàn thành. Webpack có thể thực hiện quá trình này với bất kỳ loại file nào, không giống như các công cụ chuyên dụng như trình biên dịch Babel hoặc Sass.

Webpack cho phép bạn kiểm soát cách xử lý các asset khác nhau mà nó gặp phải. Ví dụ: bạn có thể quyết định chuyển inline assets vào các gói JavaScript của bạn để tránh các request. Webpack cũng cho phép bạn sử dụng các kỹ thuật như CSS Modules để kết hợp với các components và để tránh các vấn đề về kiểu CSS tiêu chuẩn. Tính linh hoạt này làm cho webpack rất có giá trị.

Mặc dù webpack được sử dụng chủ yếu để bundle JavaScript, nhưng nó có thể bắt các asset như hình ảnh hoặc phông chữ và tạo ra các file riêng biệt cho chúng. Đầu vào chỉ là điểm khởi đầu của quá trình bundling. Những gì webpack tạo ra phụ thuộc hoàn toàn vào cách bạn cấu hình nó.

### Quá trình đánh giá

Giả sử tất cả các loader đã được tìm thấy, webpack sẽ đánh giá các loader phù hợp từ dưới lên trên và từ phải sang trái ( styleLoader(cssLoader('./main.css'))) trong khi lần lượt chạy module qua từng loader. Kết quả là, bạn nhận được đầu ra cái mà webpack sẽ đưa vào bundle kết quả.

Nếu tất cả các đánh giá loader hoàn thành mà không có lỗi runtime, webpack bao gồm source trong bundle cuối cùng. Plugin cho phép bạn chặn các sự kiện runtime ở các giai đoạn khác nhau của quy trình bundling.

Mặc dù loaders có thể làm rất nhiều, nhưng chúng không cung cấp đủ quyền cho các task nâng cao. Plugin có thể chặn các sự kiện runtime được cung cấp bởi webpack. Một ví dụ điển hình là khai thác bundle được thực hiện bởi cái MiniCssExtractPlugin mà khi được sử dụng với loader, trích xuất các tệp CSS ra khỏi bundle và vào một file riêng. Nếu không có bước này, CSS sẽ được inlined trong JavaScript kết quả, vì webpack coi tất cả mã là JavaScript theo mặc định.

### Kết thúc

Sau khi mọi module đã được đánh giá, webpack ghi đầu ra . Đầu ra bao gồm một tập lệnh bootstrap với một bảng kê khai mô tả cách bắt đầu thực hiện kết quả trong trình duyệt. File kê khai có thể được trích xuất thành một file của riêng nó. Đầu ra khác nhau dựa trên mục tiêu xây dựng bạn đang sử dụng.

Đó không phải là tất cả để có quá trình bundling. Ví dụ: bạn có thể xác định các điểm phân chia cụ thể trong webpack tạo ra các bundle riêng biệt được tải dựa trên logic ứng dụng. 

## Cài đặt
Webpack có thể cài đặt trên global hoặc local cho từng dự án.

### Cài đặt Global

Nếu bạn cài đặt global để sử dụng bất kì đâu, gõ lệnh với yarn:

`yarn global add webpack webpack-cli`

còn với npm:

`npm i -g webpack webpack-cli`

Một khi hoàn tất bạn có thể chạy lệnh: `webpack-cli`

### Cài đặt Local

Webpack cũng có thể được cài đặt local. Đó là thiết lập được đề xuất, vì webpack có thể được cập nhật theo từng dự án và bạn có ít khả năng sử dụng các tính năng mới nhất chỉ cho một dự án nhỏ thay vì cập nhật tất cả các dự án bạn có sử dụng webpack.

Cài đặt với Yarn:

`yarn add webpack webpack-cli -D`

Với npm:

`npm i webpack webpack-cli --save-dev`

Khi đã cài đặt xong, thêm vào file package.json của bạn:

```
{
  //...
  "scripts": {
    "build": "webpack"
  }
}
```

Sau đó, bạn có thể chạy webpack với lệnh sau trong dự án gốc: `yarn build`

### Cấu hình Webpack

Theo mặc định, webpack (từ phiên bản 4) không yêu cầu bất kỳ cấu hình nào nếu bạn tuân theo các quy ước này:

* Entry point trong ứng dụng của bạn là ./src/index.js
* Output được đưa vào trong  ./dist/main.js.
* Webpack hoạt động trong môi trường production.

Tuy nhiên bạn có thể tùy chỉnh một chút webpack khi bạn cần. Cấu hình Webpack được lưu trong file webpack.config.js, trong thư mục gốc của dự án.

webpack.config.js

```
const webpack = require("webpack");

module.exports = {
  // Where to start bundling
  entry: {
    app: "./entry.js",
  },

  // Where to output
  output: {
    // Output to the same directory
    path: __dirname,

    // Capture name from the entry using a pattern
    filename: "[name].js",
  },

  // How to resolve encountered imports
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },

  // What extra processing to perform
  plugins: [
    new webpack.DefinePlugin({ ... }),
  ],

  // Adjust module resolution algorithm
  resolve: {
    alias: { ... },
  },
};
```

Mô hình cấu hình của Webpack đôi khi có thể cảm thấy không rõ vì file cấu hình có thể xuất hiện nguyên bản. Có thể khó hiểu những gì webpack đang làm trừ khi bạn biết những ý tưởng đằng sau nó.

## Kết luận
Webpack là một công cụ đáng để học hỏi, với thời gian và công sức có thể tiết kiệm được trong thời gian dài. Webpack sẽ không giải quyết mọi thứ. Tuy nhiên, nó giải quyết vấn đề bundling. Đó là một chút lo lắng trong quá trình phát triển. Chỉ sử dụng package.json và webpack có thể đưa bạn đi xa.

Tổng kết:
* Webpack là một module bundler, nhưng bạn cũng có thể sử dụng nó để chạy các task.
* Webpack dựa vào biểu đồ phụ thuộc bên dưới. Webpack đi qua nguồn để xây dựng biểu đồ và nó sử dụng thông tin và cấu hình này để tạo các bundle.
* Webpack dựa vào loaders và plugin. Các loader hoạt động ở cấp độ module, trong khi các plugin dựa vào các hook được cung cấp bởi webpack và có quyền truy cập tốt nhất vào quy trình thực hiện của nó.
* Cấu hình của Webpack mô tả cách chuyển đổi assets của đồ thị và loại đầu ra nào sẽ tạo ra. Một phần thông tin này có thể được bao gồm trong source nếu các tính năng như tách mã được sử dụng.
* Hot Module Replacement (HMR) đã giúp mở rộng gói webpack. Đây là một tính năng có thể nâng cao kinh nghiệm phát triển bằng cách cập nhật mã trong trình duyệt mà không cần refresh lại trang.
* Webpack có thể tạo hash cho tên tệp cho phép bạn vô hiệu hóa các bundle trong quá khứ khi nội dung của chúng thay đổi.

Tài liệu tham khảo: [https://survivejs.com/webpack/what-is-webpack/](https://survivejs.com/webpack/what-is-webpack/)