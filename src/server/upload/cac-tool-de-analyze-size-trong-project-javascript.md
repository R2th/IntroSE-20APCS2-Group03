# I> Lời mở đầu:
Hôm nay, mình sẽ tìm hiểu các cách thống kê dung lượng các file .js chiếm dung lượng như thế nào trong project để có thể có cái nhìn tổng quan của project đang làm, cũng như làm giảm dung lượng nếu có thể.

![](https://images.viblo.asia/c88cf234-bf46-4a7b-aece-acfbcfe6fa22.png)


# II> Bắt đầu tìm hiểu nào:
### 1> Một số tool trong webpack:
Đầu tiên mình sẽ tìm hiểu 1 số tool kết hợp với webpack để có thể thống kê các file .js
### a. webpack-bundle-analyzer:
![](https://cloud.githubusercontent.com/assets/302213/20628702/93f72404-b338-11e6-92d4-9a365550a701.gif)

  - Đây là tool phổ biến nhất, nó có giao diện trực quan và mạnh mẽ. Nó sẽ tạo ra một treemap tương tác với nội dung tất cả các module trong project, nhìn vào ta có thể thấy được tổng quan project đang làm.

  -  Lợi ích, nhờ vào các tool này, ta có thể nhận ra được :
      -   Các  file và module nào đang chiếm dung lượng lớn. Có thể do đang import sai hay không
     - Những file nào đang có lỗi trùng lặp trong import gây ra kích thước lớn
     - Optimize nó nếu có thể

- Cách sử dùng:

Đầu tiên ta cài đặt vào project:

```js
# NPM
npm install --save-dev webpack-bundle-analyzer
# Yarn
yarn add -D webpack-bundle-analyzer
```
Cấu hình vào webpack:
``` js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin(
        analyzerPort: ....
        //mặc định  analyzerMode là server
    )
  ]
}
```
-  Các tùy chọn thêm:
Mặc định nó sẽ mở ra 1 route tùy vào cấu hình analyzerPort. Nếu bạn muốn đổi cách nó report:
   
   - Tạo ra 1 file report html:
        ```js
       analyzerMode: "html",
        reportFilename: "report.html"
   
      ```
      Nội dung bên trong cũng giống như mode analyzerMode, tuy nhiên nó sẽ tạo ra 1 file html
      
   - Tạo ra 1 file report json:
        ```js
       analyzerMode: "json",
        reportFilename: "report.json"
   
      ```
      ==> Tạo ra 1 file report json có nội dung, ví như sau:
  ```json
 [{"label":"abc.js","isAsset":true,"statSize":337525,"groups":[{"id":0,"label":"multi /workspace/test-wepack/node_modules/webpack-dev-server/client/index.js?http://localhost:8080 ./app.js","path":"./multi /workspace/test-wepack/node_modules/webpack-dev-server/client/index.js?http://localhost:8080 ./app.js","statSize":40},{"id":"./app.js","label":"app.js","path":"./app.js","statSize":118},{"label":"node_modules","path":"./node_modules","statSize":314
 .....     {"id":"./node_modules/webpack/hot/log.js","label":"log.js","path":"./hot/log.js","statSize":1372}],"parsedSize":0,"gzipSize":0}]}]
   ```
   
   ### b. source-map-explorer:
   
 ![](https://images.viblo.asia/d7574a71-e144-46f3-b2c3-7b00d7a68261.png)
Tool này cũng tương tự, nó sẽ tạo ra trang report các bundle với giao diện bên trên (giao diện đơn giản hơn, không sinh động bằng webpack-bundle-analyze) 

- Cách sử dụng:
Đầu tiên là cài đặt vào project:
```js

npm install -g source-map-explorer
```

Sau đó ta sử dụng vào project, ta cấu hình vào file package.json:
 ```js
 "scripts": {
    "analyze": "source-map-explorer 'build/static/js/*.js' --html result.html"
  },
```
==> Muốn tạo report: 
```
npm run analyze
```


### c.webpack-visualizer:
![](https://images.viblo.asia/340b89d5-60b0-4ac0-9a31-6226e0431254.png)
Nó sẽ tạo ra 1 trang report như trên. Đây là 1 project khá cũ, hãy cẩn thận nếu dùng nó:
- Cách sử dụng:
Đầu tiên là cài đặt vào project:
```js

npm install webpack-visualizer-plugin
```
Sau đó ta sử dụng vào project, ta cấu hình vào file webpack:
 ```js
const Visualizer = require('webpack-visualizer-plugin');

plugins: [new Visualizer({
  filename: './statistics.html'
})],
```

### d.webpack-dashboard:

Đây cũng là 1 pluin hay dùng, nhưng mình thấy không phổ biến bằng cách thèn trên


- Cách sử dụng:
Đầu tiên là cài đặt vào project:
```js
npm install --save-dev webpack-dashboard
# ... or ...
yarn add --dev webpack-dashboard
```
Sau đó ta sử dụng vào project, ta cấu hình vào file webpack:
 ```js
const DashboardPlugin = require("webpack-dashboard/plugin");


// If you aren't using express, add it to your webpack configs plugins section:
plugins: [new DashboardPlugin()];

// If you are using an express based dev server, add it with compiler.apply
compiler.apply(new DashboardPlugin());

```



# III> Kết luận: 
Nhờ vào các tool, ta có thể tra thông tin kích thước các gói trong project của mình như thế nào nhờ đó để cải thiện ứng dụng. 
Có rất nhiều tool đang được xây dựng, tùy vào sở thích và project mà ta có thể sử dụng các tool cho phù hợp.

Bài viết này mình sẽ cập nhật nếu biết thêm tool gì hay ho, cảm ơn mọi người đã đọc...