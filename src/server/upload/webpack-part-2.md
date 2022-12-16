# Vendor Caching
Như chúng ta đã biết, lưu cach với trình duyệt hiểu đơn giản là khi chúng ta truy cập vào 1 trang web thì nó sẽ mất thời gian để load các thư viện, các thành phần cần thiết. Caching sẽ giúp chúng ta lưu lại sau lần truy cập đầu tiên nhằm giúp tiết kiệm thời gian để load page.
Tương tự Vendor caching sẽ giúp chúng lưu cach vào trình duyệt nó sẽ chứa tất cả các package trong `dependencies`  trong package.json
Ok giờ sẽ tới phần config webpack
Phần trên mình đã tạo ra bundle bundle.js
Nhưng ở đây mình sẽ phân ra làm 2 bundle là: 

-  bundle.js chỉ để load nhưng component => nội dung thay đổi => không thể lưu cache
- Vendor là lưu cache
1. Bạn mỏ file `webpack.config.js` và khai báo các libs trong dependencies
   (Các bạn nhớ delete build folder đi trước nhé)
   ở đây hiện tại mình chỉ có `react` và `react-dom` nên mình sẽ viết như sau:
   ```
   const Vendor = ['react', 'react-dom']
   ```
   Và entry mình sẽ khai báo để load file đó nữa
   ```
   entry: {
    bundle: './src/index.js',
    vendor: Vendor,
   }
   ```
   Ok vậy là như mình đã nói sẽ tạo ra 2 module là `bundle` và `vendor`
   Thêm nữa: phần output. thì input mình thêm 1 bundle. nên ở output mình không thể chỉ output ra 1 file là bundle.js đc nữa. Do vậy chúng ta cần chỉnh sửa cả output như sau
   ```
   output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
   }
   ```
 2. npm run build và kiểm tra lại OK chưa ^^
 
 

# Webpack : CommonsChunkPlugin (webpack 4.0 là splitChunks):
CommonsChunkPlugin: nó cho phép chúng ta chia nhỏ code ra nhiều bundle nhỏ hơn, những cái mà chúng ta có thể tải khi cần hoặc để tải song song. Nó thường được sử dụng để tạo ra những bundle code nhỏ hơn cũng như quản lý vấn đề ưu tiên tải tài nguyên, caí nào tải trước, cái nào tải sau, cái nào tải sau cái nào. Nếu sử dụng đúng cách nó có thể tác động lớn đến tốc độ và thời gian tải.

Để dễ hiểu về thằng commomsChunkPlugin: thì hiện tại khi mình phân chia 2 bundle là bundle.js và vendor.js
Vậy bgio mình có cần phải import thằng vendor.js như thằng bundle.js trong index.html không?
```
<script src="build/bundle.js"></script>
<script src="build/vendor.js"></script>
```
Các bạn có thể test luôn khi refesh lại trang. Rõ ràng là nó vẫn hoạt động khi không cần import?
Chính xác là bundle ở đây nó vẫn load tất cả các component, router, reducer, react, redux vì sao? vì các component khi được load vẫn sử dụng react và redux nên chúng sẽ được load zô bunlde. Vì vậy mà nó ko cần thằng vendor. => Điều này dẫn đến bị dubplicate khi load.

Cái này gọi là **Entry point**: Phân chia thủ công bằng cách cấu hình file entry, file để bắt đầu chạy ứng dụng và từ đó webpack hoạt động => Cái này sẽ bị duplicate.

![](https://images.viblo.asia/c138d389-1ad9-409a-9d70-c0c07e0298e2.png)

Để giải quyết vấn đề này chúng ta dùng đến 1 plugin là CommonsChunkPlugin để khi thằng bundle sẽ không load nhưng cái mà thằng vendor có.
với webpack 3. trở xuống thì chỉ cần 
```
const webpack = require('webpack');
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
  })
]
```
Nhưng ở 4. trở lên lại thì optimize.CommonsChunkPlugin đã bị xóa và thay thế:
```
optimization: {
  splitChunks: {
    chunks: 'all'
  }
}
```
Và giờ `npm run build` để thấy được sự khác biệt 

![](https://images.viblo.asia/fc5b5f0f-6ac0-4bd9-aa61-ec2c27b617e4.png)

Cái này được gọi là **Prevent Duplication**: để xóa những bundle trùng lắp và split ra các chunks nó sẽ giúp loại bỏ việc split ra 2 hoặc nhiều hơn các bundle khác nhau.

# HtmlWebpackPlugin
Đá qua 1 số plugin cho webpack. Mình sẽ giới thiệu vs các bạn plugin HtmlWebpackPlugin
Chúng sẽ tự động copy file html và import các bundle vào trong file html đó.
Vì mình sẽ mã hóa các bundle và thư mục bundle sẽ là thư mục để deploy lên server vậy khi đó nó sẽ chạy file index.html trong thư mục build.

1. Add HtmlWebpackPlugin

    `npm i --save-dev html-webpack-plugin@next`
2. Trong file webpack.config.js chúng ta add plugin và cấu hình nó:
```
const HtmlWebpackPlugin = require('html-webpack-plugin')
....
,
plugins: [
   new HtmlWebpackPlugin()
]
```
3. Giờ thì npm run build và kiểm tra trong thư mục build xem có file index.html không nhé
   ![](https://images.viblo.asia/fa89aa22-7254-487c-a087-56d360d33813.png)
   
Note: nếu bạn muốn giữ template giống file index.html của bạn. Thì hãy chỉ định nghĩa template cho nó:
    ```
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      })
    ]
    ```
# Mã Hóa bunlde
1. Mã hóa

    Để mã hóa các file bunlde chúng ta chỉ cần thêm `chunkHash` trong file name output thôi
    ```
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'build')
    },
    ```
    Or bạn có thể viết 
    ```
    output: {
      chunkFilename: '[name].[chunkHash].js',
      path: path.resolve(__dirname, 'build')
    },
    ```
    Note: Cá
2. npm run build

    ![](https://images.viblo.asia/a1e5d028-8f4b-4d6b-8c48-f569ba19db5c.png)
   
    Ok Chúng ta đã thấy các các file đc tạo ra đã được mã hóa.

3. Test cache
   
   - Các bạn để ý 2 file mình đã mã hóa trên hình nhé
   - Để test Cache mình sẽ thay đổi trên 1 component rồi build lại. Ở đây mình thay đổi nội dung thẻ H1 trên file `index.js` luôn
   ```
   ReactDom.render(
    <h1>React - Webpack - Test Cache</h1>,
    document.getElementById('root')
   )
   ```
   - npm run build
   
   ![](https://images.viblo.asia/7ab16dc6-c4a5-4c09-b5a9-65f3cbe4a862.png)
   
   Kết quả là vendor đã được lưu cache và sẽ không có thêm file nào được tạo ra nữa.
   Nhưng bundle.js được tạo ra khi có thay đổi.
   - Mở file index.html ra xem thì sẽ thấy nó sẽ tự động import bundle.js file mới nhất vào trong
   ![](https://images.viblo.asia/f5244034-1d8c-4c61-b808-97dae90c0e4c.png)
# Clean khi build
Ở phía trên các bạn thấy khi build chúng sẽ tạo ra 1 file mới trong thư mục build. Nếu như vậy sẽ có hàng trăm hàng nghìn file bundle đc sinh ra mất => dẫn đến thư mục build của bạn dễ dàng bị phình ta ra. Nên chúng ta cần phải clean nó trước khi build
1. cài đặt rimraf

   `npm install --save-dev rimraf`
2. Cấu hình lệnh `script` khi build trong `package.json`
   `"build": "rimraf build && webpack --mode development",`
   Note: rimraf build sẽ xóa thư mục build trước khi chạy webpack
3. npm run build
  ![](https://images.viblo.asia/93cecbf1-800d-4dc8-818e-89e15448a459.png)
  
  Rõ ràng các bạn thấy mặc dù xóa đi. nhưng các file nó không thay đổi. Vậy Cache có thể vẫn hoạt động bình thường

4. Để chắc chắn chúng ta thử thay đổi component và build lại xem sao nhé:
   ```
   ReactDom.render(
    <h1>React - Webpack - Test Cache - Test RimRaf</h1>,
    document.getElementById('root')
   )
   ```
5. npm run build
  
![](https://images.viblo.asia/f327133e-d687-448d-b262-a6771e2b4dd5.png)
Ok rõ ràng bundle đã thay đổi và vendor thì vẫn đc giữ nguyên. Quan trọng là trong thư mục build các bundle.js cũ đã được xóa và nó chỉ lưu file bundle.js mới nhất mà thôi.

# Webpack-Serve
Thử tưởng tượng mỗi khi sửa file chúng ta đều phải build lại nó sẽ bất tiện như thế nào? Chúng ta cần config serve để chạy webpack
Có 2 package là `webpack-serve` và `webpack-dev-serve` : thì thằng webpack-serve ra đời 2/2018 nên nó nhanh và dùng để phát triển so với thằng webpack-dev-serve được release 12/2014 chỉ dùng để maintain và chậm hơn tuy nhiên nó sẽ hỗ trợ nhiều version cũ trên browser.
Ở bài này mình triển 1 cái nha đó là webpack-serve thôi
1. Đầu tiên vẫn là cài đặt đã:
  ` npm install webpack-serve --save-dev`
2. add config trong file `webpack.config.js`
   ```
   serve: {
    port: 9000,
    hotClient: true
   }
   ```
3. Thêm script trong package.json
   `"start": "webpack-serve"`
4. chạy npm run start ^^

# 1 số tìm hiểu thông qua dự án
Lúc đầu mình không hiểu j về webpack và khi nhìn vào file webpack.config.js mà khách hàng viết => mình chẳng hiểu j cả. Nhưng khi tự tìm tòi và viết xong mình quay lại đọc và thấy có những chố rất hay.
Những config mình tìm hiểu qua dự án của mình có lẽ 1 số là nâng cao , nhưng cũng là 1 số cơ bản. 

1. Bạn có thể sẽ gặp lỗi 
 `WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.` 
Tất nhiên bạn có thể viết `webpack --mode development` chẳng hạn. Tuy nhiên bạn có thể viết trong file config như sau
```
const mode = process.env.WEBPACK_SERVE ? 'development' : 'production'
const config = {
  mode,
  ...
}
```
Note: Chế độ `development` thực hiện một số ưu tiên riêng:

- Build nhanh
- Ít tối ưu hoá code, nén code hơn.
- Không xoá bỏ các comment trong code.
- Cung cấp thêm thông tin lỗi và gợi ý.
- Cung cấp thêm khả năng debug tốt hơn.

Ngược với development, chế độ `production`
- chậm hơn, 
- tối ưu tốt hơn kết quả đầu ra. 
- Kết quả là file Javascript đầu ra có kích thước nén nhỏ hơn.
2. DefinePlugin Dùng để xác định môi trường production
   ```
   new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
     }
   }),
   ```
   Nó sẽ giúp chúng ta chắc chắn rằng nó đang đc test với production-build được rút gọn.
3. Copy Webpack plugin
   Lấy VD luôn cho dễ hiểu:
   - Các bạn tạo cho mình 1 folder trong project `mkdir public`
   - Copy 1 image vào trong folder public vừa tạo VD: `image.png`
   - Tôi sẽ thử hiển thị ảnh ở index.js
      `<img src="/public/image.png" />`
   - Nếu 1 page tôi có nhiều image thì việc viết được path dài khá là khó chịu phải ko?
   Do vậy tôi sẽ copy thư mục pulic vào thư mục build 
   - Cài đặt copy webpack plugin `npm i -D copy-webpack-plugin`
   - Cấu hình nó
     ```
     new CopyPlugin([{ from: '/public', to: './' }], {
      ignore: ['index.html'],
     }),
     ```
     Dễ hiểu phải không nào? nó sẽ copy mọi thứ trong thư mục public vào thư mục build của webpack
     ignore là nó sẽ bỏ qua file mà bạn không muốn
    - npm run build
    - Sửa `<img src="image.png" />`
    Hiểu quả và ngắn hơn nhiều phải không ^^
 4. Hard source webpack plugin
 
    Lưu Cache sau lần build đầu tiền. Giúp giảm thời gian build
    - Cài đặt `npm install --save-dev hard-source-webpack-plugin`
    - Cấu hình Hard Source Webpack Plugin
      ```
      var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
      ...
      new HardSourceWebpackPlugin();
      ```
    - xem kết quả test: 
    - 
      Khi sử dụng HardSourceWWebpackPlugin
     
      ![](https://images.viblo.asia/db0546d4-ff7a-48d6-b2ae-9596fee57116.png)
     
      khi không sử dụng 
      ![](https://images.viblo.asia/91ccd9ba-c9d6-4546-af16-776e625eb054.png)
      Khá khác biệt phải không nào ^^
 5. Webpack Build Notifier
 
    thông báo  state khi build webpack
    - Cài đặt `npm install webpack-build-notifier --save-dev`
    - Cấu hình Webpack Build Notifier
      ```
      const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
      ...
      new WebpackBuildNotifierPlugin({
        suppressCompileStart: false,
        suppressSuccess: false,
      }),
      ```
   - Giờ thử build lại và xem kết quả xem sao:
   
     ![](https://images.viblo.asia/07bfd943-e2e9-4cea-b605-cc3c8b069948.png)  
  6. UglifyJsPlugin

      Nhằm giúp gọn code js của bạn. Nhằm tạo ra các file nhẹ hơn.
      
      - Cài đặt npm i -D uglifyjs-webpack-plugin
      - Cấu hình
        ```
        const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
        ...
        optimization: {
          minimizer: [
            new UglifyJsPlugin()
          ]
        }
        ```
   7. connect-history-api-fallback
      Ví Dụ và Cài đặt sẽ ở phần Advance Với webpack trong bài viết https://viblo.asia/posts/3P0lPmV45ox này nhé ^^
   8. webpack-serve-waitpage
      Dự án càng lớn thì thời độ phình dự án càng to. Package này sẽ là màn hình hiển thị quá trình building.
      - Cài đặt npm install -D webpack-serve-waitpage
      - Cấu hình
        ```
        const webpackServeWaitpage = require('webpack-serve-waitpage');
        
        ...
        serve: {
          port: 9000,
          hotClient: true,
          open: true,
          add(app, middleware, options) {
            app.use(webpackServeWaitpage(options, { theme: 'dark' }))
            app.use(history())
          },
        },
        ```
        ![](https://images.viblo.asia/3c856dce-7435-435f-b162-fda0c1dbeeaa.png)
# Kết Luận
Có lẽ còn khá nhiều thứ cần phải học và config với webpack. Mình hy vọng bài viết có thể giúp các bạn có thể hiều và config 1 webpack đơn giản.