![](https://images.viblo.asia/f7a2c6c8-23b0-4a58-8156-532b9ed158a2.jpeg)
Angular CLI giúp dễ dàng tạo một ứng dụng đã hoạt động, ngay lập tức. Nó là một công cụ tuyệt vời, nhưng bạn chưa bao giờ nghĩ: "Nó hoạt động như thế nào? Làm thế nào tôi có thể xây dựng một ứng dụng mà không có CLI?"

## Trong bài viết này, bạn sắp tìm hiểu:
- Cách thiết lập ứng dụng cơ bản Angular 7, từ đầu
- Cách cấu hình webpack cho development mode
- Cách cấu hình webpack cho production mode

### Angular 7: Thiết lập một ứng dụng cơ bản
Tạo một file package.json mới và thêm các dòng sau để cài đặt Angular và các phụ thuộc của nó.

```
"dependencies": 
  "@angular/animations": "~7.0",
  "@angular/common": "~7.0",
  "@angular/compiler": "~7.0",
  "@angular/compiler-cli": "~7.0",
  "@angular/core": "~7.0",
  "@angular/forms": "~7.0",
  "@angular/http": "~7.0",
  "@angular/platform-browser": "~7.0",
  "@angular/platform-browser-dynamic": "~7.0",
  "@angular/platform-server": "~7.0",
  "@angular/router": "~7.0",
  "@angular/upgrade": "~7.0",
  "core-js": "~2.5",
  "rxjs": "~6.3",
  "zone.js": "~0.8"
}
```

Tạo một folder src mới và các folders/files bên trong nó. Tất cả Angular app business logic có trong thư mục này.

```
src
|__ app
    |__ modules
        |__ menu
            |__ components
                |__ menu
                    |__ menu.component.html
                    |__ menu.component.scss
                    |__ menu.component.ts
            |__ menu.module.ts
            |__ menu-routing.module.ts
|__ shared
         |__ components
             |__ home
                 |__ home.component.html
                 |__ home.component.scss
                 |__ home.component.ts
|__ app.component.html
        |__ app.component.scss        
        |__ app.component.ts
        |__ app.module.ts
        |__ app-routing.module.ts
|__ index.html
|__ main.ts
```

Mỗi ứng dụng có ít nhất một module Angular . Module *root* mà bạn bootstrap để khởi chạy ứng dụng. By convention, nó thường được gọi là *AppModule*. Tôi tạo 1 module khác , *MenuModule* để cho bạn thấy làm thế nào bạn có thể sử dụng lazy loading trong project của bạn.

**Một số điểm quan trọng:** 
- `index.html`
Thêm *<base href=”/”>* cho Angular router cách soạn URL điều hướng. Dòng này có nghĩa là ứng dụng của bạn sẽ bắt đầu từ thư mục gốc, tức là cục bộ, nó sẽ xem xét *localhost:3000/* và trên máy chủ, nó sẽ xem xét thư mục gốc.
- `app-routing.module.ts`
Có ba bước chính để thiết lập tính năng module lazy loaded
 + Tạo feature module
 + Tạo feature module routing module
 + Cấu hình các routes

### Cấu hình TypeScript
Thêm các dòng sau vào file package.json của bạn:

```json
"devDependencies": {
  "@types/core-js": "~2.5",
  "@types/node": "~10.12",
  "typescript": "~3.1"
}
```

Tạo trong thư mục dự án gốc của bạn một file tsconfig.json:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true,
    "lib": ["es6", "dom"],
    "typeRoots": ["node_modules/@types"]
  },
  "exclude": ["node_modules"]
}
```

Đây là file cấu hình TypeScript cơ bản. Nó rất cần thiết để cài đặt định nghĩa các loại *node* và *core-js* 

### Cấu hình Webpack cho development mode (Just-in-Time compilation)
Trước hết, biên dịch có nghĩa là gì? Nó không có nghĩa là biên dịch các file TypeScript thành JavaScript, điều này không liên quan đến Angular. Bản thân Angular cần biên dịch HTML templates của bạn thành JavaScript và điều này có thể xảy ra ở 2 thời điểm khác nhau:
- Sau khi ứng dụng của bạn được tải xuống trong Trình duyệt (JiT)
![](https://images.viblo.asia/f5a8f6f3-5ded-46d5-9e2b-975b22325520.jpeg)
- Ngay sau khi phát triển, tại thời điểm build, trước khi ứng dụng của bạn được tải xuống trong Trình duyệt (AoT)
![](https://images.viblo.asia/099b0746-df5d-41c9-8de0-1e19af97505f.jpeg)

**Webpack là gì?**

Theo Wikipedia:

*Webpack là 1 gói module JavaScript mã nguồn mở. Mục đích chính của nó là gói các file JavaScript để sử dụng trong trình duyệt, tuy nhiên, nó cũng có khả năng biến đổi, đóng gói hoặc đóng gói bất kỳ resource hoặc asset nào. Webpack nhận các module với các phụ thuộc và tạo các assets tĩnh đại diện cho các module đó. Nó có một bộ đóng gói module chủ yếu cho JavaScript, nhưng nó có thể biến đổi các front-end assets như HTML, CSS, thậm chí là hình ảnh nếu các plugin tương ứng được bao gồm.*

   Để cho webpack biết cách gói ứng dụng, chúng ta phải cấu hình những gì chúng ta gọi là khái niệm cốt lõi (*Core Concepts*):

  **Entry —**  Điểm vào cho biết webpack module nào sẽ sử dụng để bắt đầu xây dựng biểu đồ phụ thuộc nội bộ của nó. Webpack sẽ chỉ ra các module và thư viện khác mà điểm vào phụ thuộc vào (trực tiếp và gián tiếp).

  **Output —**  Thuộc tính output cho webpack biết nơi phát ra các gói mà nó tạo và cách đặt tên cho các file này. Nó mặc định là ./dist/main.js cho file output chính và vào thư mục ./dist cho bất kỳ file nào được tạo khác.

  **Loaders —** Ở mức cao, trình tải có hai thuộc tính trong cấu hình webpack của bạn:
       - Thuộc tính kiểm tra xác định file hoặc files nào sẽ được chuyển đổi.
       - Thuộc tính sử dụng cho biết bộ nạp nào sẽ được sử dụng để thực hiện chuyển đổi.

  **Plugins —** Trong khi các trình tải được sử dụng để chuyển đổi một số loại module nhất định, các plugin có thể được tận dụng để thực hiện một phạm vi rộng hơn của các nhiệm vụ như tối ưu hóa gói, quản lý tài sản.

Tất cả những thứ này phải được thiết lập trong file cấu hình webpack
`webpack.config.js.`


**Cấu hình webpack**

Trong thư mục *src* chúng ta cần tạo thêm 2 file:
   - *vendor.ts* chỉ nhập các module bên thứ ba của ứng dụng.
   - *polyfills.ts* để chạy ứng dụng Angular trong hầu hết các trình duyệt.

Tạo một thư mục *config* mới và các file sau bên trong:
`webpack.config.common.js`: cấu hình mà chúng ta sẽ sử dụng để phát triển và sản xuất.

 **Entry —** Đối với ứng dụng này, chúng ta có 3 điểm nhập khác nhau: *vendor.ts* *polyfills.ts* và *main.ts.*
```json
entry: {
    vendor: './src/vendor.ts',
    polyfills: './src/polyfills.ts',
    main: './src/main.ts'
}
```

**Loaders —** tải các file .html với html-loader khá chuẩn nhưng file .scss hơi khó khăn 1 chút.
Trước hết, chúng ta phải tải các file sass bằng cách sử dụng hai trình tải sass-loader và css-loader. Nếu bạn muốn làm cho việc gỡ lỗi trở nên dễ dàng, đặc biệt là trong chế độ phát triển, điều đó thực sự quan trọng để thêm sourceMap: true làm tùy chọn. Trong một ứng dụng Angular, chúng ta thêm các styles vào component bằng cách chuyển một đường dẫn file tới mảng styleUrls như sau styleUrls: ["./path/styles.scss"] nhưng chúng ta cần có kiểu như một chuỗi và to-string-loader sẽ làm điều đó cho chúng ta và chuyển đầu ra thành một chuỗi.
```json
{
    test: /\.html$/,
    loader: 'html-loader'
},
{
    test: /\.(scss|sass)$/,
    use: [
        'to-string-loader',
        { 
            loader: 'css-loader', 
            options: { 
                sourceMap: true 
            } 
        },
        { 
            loader: 'sass-loader', 
            options: { 
                sourceMap: true 
            } 
        }
    ],
    include: helpers.root('src', 'app')
}
```

**Plugins —** *CleanWebpackPlugin* sẽ remove/clean folder build của bạn trước khi bạn build lại. Plugin* HtmlWebpackPlugin* sẽ tạo một tệp HTML5 cho bạn bao gồm tất cả các gói webpack của bạn trong phần body bằng các thẻ script. Nó chỉ yêu cầu đường dẫn đến template.
```json
new CleanWebpackPlugin(
    helpers.root('dist'),
    {
        root: helpers.root(),
        verbose: true
    }
),
new HtmlWebpackPlugin({
    template: 'src/index.html'
})
```

- `webpack.config.dev.js` là cấu hình webpack mà chúng ta sẽ chỉ sử dụng cho development mode

```
mode: "development"
```

Trong webpack 4, chế độ được chọn cho webpack sử dụng tối ưu hóa tích hợp sẵn của nó.

```
devtool: 'cheap-module-eval-source-map'
```

Tùy chọn này kiểm soát nếu và cách tạo bản đồ nguồn. Bằng cách sử dụng *cheap-module-eval-source-map* Source Maps từ các trình tải được xử lý để có kết quả tốt hơn. Tuy nhiên, Bản đồ nguồn của trình tải được đơn giản hóa thành một mapping trên mỗi dòng.

```json
output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
}
```

*output* key chứa một tập hợp các tùy chọn hướng dẫn gói webpack về cách thức và nơi nó sẽ xuất các gói, assets của bạn và bất cứ thứ gì khác mà bạn gói hoặc tải với gói webpack. Ở đây chúng ta nói với webpack để xuất các gói của chúng ta vào thư mục *dist*.
```json
optimization: {
    noEmitOnErrors: true
}
```

Bỏ qua pha phát ra bất cứ khi nào có lỗi trong khi biên dịch. Điều này đảm bảo rằng không có assets lỗi được phát ra. *optimization* key có nhiều tùy chọn khác được đặt theo mặc định tùy thuộc vào chế độ cấu hình gói web của bạn (development/production). 
```json
{
    test: /\.ts$/,
    loaders: [
        'babel-loader',
        {
            loader: 'awesome-typescript-loader',
            options: {
                configFileName: helpers.root('tsconfig.json')
            }
        },
        'angular2-template-loader',
        'angular-router-loader'
    ],
    exclude: [/node_modules/]
}
``` 

*angular-router-loader* là một trình tải webpack cho phép tải module dựa trên chuỗi với Angular Router.

*angular2-template-loader* là một trình tải theo chuỗi nối tiếp tất cả các kiểu html và style trong các components Angular.

*awesome-typescript-loader* là trình tải webpack TypeScript nhanh hơn. Nó sử dụng độ phân giải phụ thuộc để xây dựng biểu đồ phụ thuộc module. Điều này tương đối tăng tốc quá trình build.

*babel-loader* cho phép dịch các tệp JavaScript.

```json
devServer: {
    historyApiFallback: true,
    stats: 'minimal'
}
```

Khi sử dụng HTML5 History API, trang index.html có thể sẽ phải được phục vụ thay cho bất kỳ phản hồi 404 nào. Vì vậy, chúng ta cần kích hoạt *historyApiFallback.*

*stats* tùy chọn cho phép bạn kiểm soát chính xác những thông tin gói được hiển thị. Đây có thể là một nền tảng tốt đẹp nếu bạn muốn một số thông tin gói, nhưng không phải tất cả.

**Thêm scripts**

Thêm các dòng sau vào tệp package.json của bạn:

```json
"scripts": {
  "build:dev": "webpack-dev-server --inline --hot --progress --port 8080"
}
```

*--hot* cho phép webpack Hot Module Replacement (HMR). Nó trao đổi, thêm hoặc xóa các module trong khi một ứng dụng đang chạy mà không cần tải lại đầy đủ. Điều này có thể tăng tốc đáng kể sự phát triển theo một số cách:

- Giữ lại trạng thái ứng dụng bị mất trong quá trình tải lại đầy đủ.

- Tiết kiệm thời gian phát triển có giá trị bằng cách chỉ cập nhật những gì mà Thay đổi.

- Các sửa đổi được thực hiện cho CSS / JS trong mã nguồn dẫn đến một bản cập nhật trình duyệt tức thì gần như tương đương với việc thay đổi kiểu trực tiếp trong các công cụ dev của trình duyệt.


Bây giờ bạn đã thiết lập xong! Bạn có thể chạy `npm run build:dev` mở trình duyệt của bạn và điều hướng đến `localhost:8080.`


### Cấu hình Webpack cho production mode (Ahead-of-Time compilation)

**Ưu điểm của việc biên soạn AoT**

- Với AoT, trình duyệt tải xuống phiên bản được biên dịch sẵn của ứng dụng. Trình duyệt tải mã thực thi để nó có thể hiển thị ứng dụng ngay lập tức mà không cần chờ biên dịch ứng dụng trước. 

- Trình biên dịch nội tuyến các mẫu HTML bên ngoài và style sheets  CSS trong JavaScript ứng dụng, loại bỏ các yêu cầu AJAX riêng cho các tệp nguồn đó.

- Ở đó, không cần phải tải xuống trình biên dịch Angular nếu ứng dụng đã được biên dịch. Trình biên dịch gần bằng một nửa Angular, vì vậy bỏ qua nó làm giảm đáng kể tải trọng ứng dụng.

- Trình biên dịch AoT phát hiện và báo cáo các lỗi liên kết template trong bước build trước khi người dùng có thể nhìn thấy chúng.

- AoT biên dịch các templates và thành phần HTML thành các file JavaScript từ lâu trước khi chúng được phục vụ cho máy khách.


**Cấu hình Webpack**

Trong thư mục *config* của bạn, tạo một file mới `webpack.config.prod.js`

```
mode: 'production'
```

Trong gói web 4, chế độ được chọn cho webpack sử dụng tối ưu hóa tích hợp sẵn của nó.

```json
output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
}
```

Các chuỗi này được sử dụng để đính kèm thông tin cụ thể vào đầu ra. Những thứ có giá trị nhất là:

*[id]* trả về id chunk.

*[path]* trả về file path.

*[name]* trả về file name.

*[ext]* trả về phần mở rộng. *[ext]* hoạt động cho hầu hết các lĩnh vực có sẵn.

*[hash]* trả về build hash. Nếu bất kỳ phần nào của bản dựng thay đổi, điều này cũng thay đổi.

*[chunkhash]* trả về hàm chunk-specific hash. Mỗi mục được xác định trong cấu hình sẽ nhận được một hàm hash của riêng nó. Nếu bất kỳ phần nào của mục thay đổi, hash cũng sẽ thay đổi. [chunkhash] theo định nghĩa chi tiết hơn [hash].

*[contenthash]* trả về hàm hash được tạo dựa trên nội dung. Nó tốt nhất chỉ nên sử dụng hash và chunkhash đặc biệt cho sản xuất vì hash là không cần thiết trong quá trình phát triển.


```json
optimization: {
    noEmitOnErrors: true,
    splitChunks: {
        chunks: 'all'
    },
    runtimeChunk: 'single',
    minimizer: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true
        }),
         new OptimizeCSSAssetsPlugin({
             cssProcessor: cssnano,
             cssProcessorOptions: {
                 discardComments: {
                     removeAll: true
                 }
             },
             canPrint: false
         })
    ]
}
```

- `chunks: ‘all’` chỉ ra khối nào sẽ được chọn để tối ưu hóa. Cung cấp *tất cả* có thể đặc biệt mạnh mẽ, , bởi vì điều đó có nghĩa là các khối có thể được chia sẻ ngay cả giữa các khối async và non-async.

- Các module nhập khẩu được khởi tạo cho từng đoạn thời gian chạy riêng. Như webpack gợi ý, trong khi làm việc với một dự án có nhiều điểm nhập bạn muốn chỉ có một thể hiện thời gian chạy. Vì vậy, bạn cần phải đặt nó thành ‘single’.

- `UglifyJsPlugin` sử dụng `uglify-js` để thu nhỏ các tệp JavaScript của bạn. Chúng ta thiết lập *cache* và *parallel* thuộc tính đến *true* để kích hoạt bộ đệm ẩn tập tin và sử dụng chạy song song nhiều quá trình để cải thiện tốc độ build.

- `OptimizeCSSAssetsPlugin` sẽ tìm kiếm các CSS assets trong quá trình build gói webpack và sẽ tối ưu hóa và giảm thiểu nó. Bộ xử lý CSS được sử dụng để tối ưu hóa là *cssnano*. Tất cả các bình luận sẽ bị xóa khỏi CSS rút gọn của chúng ta và không có tin nhắn nào được in ra bàn điều khiển.


```json
module: {
    rules: [
        {
            test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
            loader: '@ngtools/webpack'
        }
    ]
}
plugins: [
    new ngw.AngularCompilerPlugin({
        tsConfigPath: helpers.root('tsconfig.aot.json'),
        entryModule: helpers.root('src', 'app', 'modules', 'app', 'app.module#AppModule')
    })
]
```


`@ngtools/webpack` là plugin chính thức mà AoT biên dịch các thành phần và module Angular của bạn. Trình tải hoạt động với plugin webpack để biên dịch TypeScript của bạn. Nó rất quan trọng để bao gồm cả hai và không bao gồm bất kỳ trình tải trình biên dịch TypeScript nào khác.


**Thêm file main.aot.ts**

Trong thư mục src thêm file main.aot.ts:

```javascript
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './app/app.module.ngfactory';
enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
```

Mục chính của bạn là một chút khác nhau trong production mode và biên dịch AoT: 

- Import `enableProdMode` để tắt chế độ phát triển Angular, giúp tắt các xác nhận và kiểm tra khác trong framework.

- Import `platformBrowser` VÀ KHÔNG `platformBrowserDocate` vì trong quá trình biên dịch AoT, ứng dụng của bạn được chuyển đến trình duyệt đã được biên dịch trong khi trong quá trình biên dịch JiT, nó xảy ra ở cấp trình duyệt.

- Thay vì Import `AppModule`, bạn cần nhập `AppModuleFactory`, đây là ứng dụng được biên dịch của bạn được tạo bởi trình biên dịch Angular của chúng ta.


**Thêm scripts**

Thêm các scripts sau vào tệp *package.json* của bạn:

```
"webpack-prod": "cross-env NODE_ENV=production webpack --mode production"
"build:prod": "npm run build:clean && ngc && npm run webpack-prod && npm run build:clean"
"build:clean": "del-cli 'src/**/*.js' 'src/**/*.js.map' 'src/**/*.ngsummary.json' 'src/**/*.metadata.json' 'src/**/**/*.ngfactory.ts' 'src/**/*.ngstyle.ts' 'src/**/*.shim.ts'"
"serve": "lite-server"
```

 - `build:clean:`  trình biên dịch Angular tạo ra nhiều tệp để biên dịch ứng dụng của bạn. Để giữ sạch trong dự án, chúng tôi xóa tất cả các tệp này trước khi biên dịch và sau khi tạo các gói.

- `build:prod:` chạy trình biên dịch Angular với lệnh *ngc* và sau đó chạy webpack trong production mode để tạo các gói của bạn.

- `serve: ` sử dụng lite-server để phục vụ ứng dụng của bạn


Bây giờ, bạn có thể chạy `npm run build:prod` để biên dịch ứng dụng Angular của bạn và build các gói của bạn. Sau đó, chạy `npm run serve` để phục vụ ứng dụng của bạn cho trình duyệt.


Nguồn tham khảo : https://github.com/samteb/Angular-7-webpack-4-boilerplate