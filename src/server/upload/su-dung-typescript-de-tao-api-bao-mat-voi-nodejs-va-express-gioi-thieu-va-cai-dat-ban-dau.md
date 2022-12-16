Chào các bạn, sau đây mình xin giới thiệu cho các bạn loạt bài viết về việc **Sử dụng TypeScript để viết API bảo mật với Node.js và Express.** Trong khuôn khổ 5 bài có thể sẽ không đầy đủ và sai sót nhiều. Mong các bạn comment góp ý. Mình xin cảm ơn.

### Tổng quan các bài viết
1. **Giới thiệu và cài đặt ban đầu**
2. [Tạo Modeling Data và Services](https://viblo.asia/p/su-dung-typescript-de-tao-api-bao-mat-voi-nodejs-va-express-tao-data-models-va-services-RnB5pxOb5PG)
3. [Tạo Endpoints](https://viblo.asia/p/su-dung-typescript-de-tao-api-bao-mat-voi-nodejs-va-express-endpoints-va-controllers-maGK7qaDlj2)
4. [Bảo mật API](https://viblo.asia/p/su-dung-typescript-de-tao-api-bao-mat-voi-nodejs-va-express-bao-mat-api-Do754bXQZM6)
5. Quản lý quyền

Mình sẽ ra lần lượt các bài.

Trong bài viết đầu tiên **Giới thiệu và cài đặt ban đầu**, mình sẽ hướng dẫn cách  cài đặt TypeScript trong Node.js và Framework Express sử dụng Hot-Module Replacement của webpack.

Tôi sẽ lấy một ví dụ cụ thể về việc làm một trang web mà liên quan đến menu của nhà hàng. Qua đó sẽ tìm hiểu cách **xây dựng API đầy đủ tính năng bằng Node.js, Express và TypeScript**, cho phép client thực hiện các thao tác với data trên các resources (ở đây là menu của nhà hàng). Sử dụng TypeScript với Node.js cho phép bạn truy cập vào việc [kiểm tra kiểu tĩnh](https://vi.wikipedia.org/wiki/H%E1%BB%87_th%E1%BB%91ng_ki%E1%BB%83u) tùy chọn cùng với công cụ mạnh mẽ cho các ứng dụng lớn và các tính năng ECMAScript mới nhất.

Ngoài ra, chúng ta sẽ tìm hiểu cách xác định data models, tạo data service và xây dựng các modular endpoints. Chúng ta cũng có thể sử dụng Auth0 để bảo mật API.

Chúng ta sẽ sử dụng rule trong business để hạn chế quyền truy cập API:
* Bất cứ ai cũng có thể đọc các item trong menu.
* Chỉ admin mới được phép CRUD các item trong menu đó.

Để đơn giản, tôi sẽ lưu data ngay trong RAM.
### Nội dung
1. Cài đặt project với Node.js và Express
2. Cài đặt các dependeccy
3. Khởi tạo TypeScript với Node.js
4. Sử dụng biến môi trường env
5. Tạo Node App với Express sử dụng TypeScript
6. Set Up Hot-Module Replacement (HMR) for TypeScript with Webpack

# 1. Cài đặt project với Node.js và Express
Các bạn tạo thư mục mới tùy ý để chứa project. Mình đặt tên là `typescript-secure-api` và cd vào đó
```php
mkdir typescript-secure-api
cd typescript-secure-api
```
Tiếp theo, khởi tạo một project Node.js mới với file `package.json` mặc định
```php
npm init -y
```
# 2. Cài đặt các dependeccy
Chúng ta cần require một số các dependency để tạo server Express bảo mật với TypeScript.
```php
npm i express dotenv cors helmet
```
* **[Express](https://expressjs.com/)**: Cũng không cần trình bày nhiều. Một framework nhanh, gọn, nhẹ cho Node.js.
* [Dotenv](https://www.npmjs.com/package/dotenv): Dotenv là một module Zero-dependency, nó load các biến môi trường từ file .env vào process.env.
* CORS: Một middleware Express. Các bạn có thể tham khảo [ở đây](https://viblo.asia/p/cors-jvElaBNd5kw).
* [Helmet](https://www.npmjs.com/package/helmet): Một  middleware Express, bảo mật các ứng dụng bằng cách setting các HTTP headers khác nhau, giúp giảm thiểu các attack vectors phổ biến.

Cài đặt typescript như các dependency
```
npm i -D typescript
```
Để sử dụng TypeScript hiệu quả, cần cài đặt định nghĩa kiểu cho các packages trên
```
npm i -D @types/node @types/express @types/dotenv @types/cors @types/helmet
```
Khi một package không có các loại build-in, bạn có thể cài đặt định nghĩa kiểu thông qua @types npm namespace - nơi lưu trữ các định nghĩa kiểu của TypeScript trong project DefiniteTyped. Khi các package được cài đặt, các types sẽ tự động được compiler của TypeScript include vào.
# 3. Khởi tạo TypeScript với Node.js
Để giúp compiler của TypeScript hiểu cấu trúc project, cần tạo file `tsconfig.json` trong folder project bằng câu lệnh sau
```php
npx tsc --init
```
Đó là tất cả những gì bạn cần để định configure project này với các giá trị mặc định.
# 4. Sử dụng biến môi trường env
Thay vì sử dụng các hard-coded configuration variables trong các file, bạn có thể xác định tất cả các biến đó ở một file và import chúng vào các module nếu cần. File này thương có tên là `.env`:
```php
touch .env
```
Trong file, mình định nghĩa PORT của server:
```php
PORT=7000
```
Bằng cách sử dụng package dotenv, trong bất cứ module nào mình cũng có thể sử dụng biến local được định nghĩa trong file .env
> :warning: Chú ý : Trong file .env có thể chứa các thông tin nhạy cảm VD như API keys,... Vì vậy nên thêm file này vào .gitignore.
# 5. Tạo Node App với Express sử dụng TypeScript
Để cho project có cấu trúc tốt, mình sẽ thêm một folder `src`
```php
mkdir src
```
Trong folder `src` mình tạo một file tên là `endtrypoint.ts`
```php
touch src/endtrypoint.ts
```
Dưới đây sẽ là nội dung của file `endtrypoint.ts`.
```php
/**
 * Required External Modules
 */

/**
 * App Variables
 */

/**
 *  App Configuration
 */

/**
 * Server Activation
 */

/**
 * Webpack HMR Activation
 */
```
Tại mỗi phần comment, mình sẽ thêm nội dung như sau:
Phần `Required External Modules`, thêm các dependency đã cài đặt trước đó và load các biến môi trường trong file `.env` bằng cách sử dụng method `dotenv.config()`
```php
/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();
```
Phần `App Variables`, kiểm tra biến môi trường PORT đã được load vào process.env chưa. Nếu ok, sẽ truyền value của nó (dạng number) vào và tạo một instance của Express. Nếu không thì sẽ exit.
```php
/**
 * App Variables
 */

if (!process.env.PORT) {
   process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
```
Phần `App Configuration`, liên kết các function middleware trong packages mà đã import vào module entry point.
```php
/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
```
[`helmet`](https://helmetjs.github.io/) là một collection của 14 middleware function  nhỏ mà nó thiết đặt các HTTP Response Headers. Liên kết `helmet()` không gồm tất cả các middleware function này, nhưng cung cấp các giá trị mặc định như DNS Prefetch Control, Frameguard, Hide Powered-By, HSTS, IE No Open, Don't Sniff Mimetype và XSS Filter.

Chúng ta cho phép các CORS request bằng method `cors()`. Sau đó, parse các request truyền vào dưới dạng JSON bằng method `express.json()`, cái sẽ xác định các `request` object với `body` object gồm các data đã được parse.
Phần `Server Activation`, tạo Express server
```php
/**
 * Server Activation
 */

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
```
# 6. Cài đặt Hot-Module Replacement (HMR) cho TypeScript với Webpack
Quá trình compile TypeScript có thể làm tăng thời gian khởi động. Tuy nhiên, nếu có bất cứ thay đổi nào trong sourcecode, bạn không cần recompile toàn bộ project. Chúng ta có thể thiết lập webpack Hot-Module Replacement (HMR) để giảm đáng kể thời gian khởi động lại khi thực hiện thay đổi.
### Cài đặt Webpack Dependencies cho TypeScript
```php
npm i -D ts-loader webpack webpack-cli webpack-node-externals
```
* [`ts-loader`](https://www.npmjs.com/package/ts-loader): Giúp cho việc tiền xử lý các file TypeScript để bundle ra các file Javascript.
* [`webpack`](https://www.npmjs.com/package/webpack): Một module bundle, có khả năng transforming, bundling, or packaging bất kỳ tresource hoặc asset nào.
* [`webpack-cli`](https://www.npmjs.com/package/webpack-cli): module cung cấp một bộ các lệnh để tăng tốc độ khi cài đặt một webpack project.
* [`webpack-node-externals`](https://www.npmjs.com/package/webpack-node-externals): dễ dàng exclude Node.js module từ webpack bundle.

Trong thư mục project tạo file `webpack.config.ts`
```php
touch webpack.config.ts
```
Với nội dung dưới đây
```php
const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: ["webpack/hot/poll?100", "./src/endtrypoint.ts"],
  watch: true,
  target: "node",
  externals: [
    nodeExternals({
      whitelist: ["webpack/hot/poll?100"]
    })
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  mode: "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "endtrypoint.js"
  }
};
```
Có nhiều điều cần nói trong file config webpack này, nhưng tôi chỉ đề cập đến những task ở high-level cần hiểu:
* Xác định file entry trong project: `./src/endtrypoint.ts` .
* Định nghĩa loader mà webpack cần để compile file source: `ts-loader` cho các file có đuôi là `.ts` và `.tsx`
* Định nghĩa directory, nơi mà webpack sẽ lưu trữ các file source đã compiled: đó là directory `dist`

### Enable Hot-Module Replacement trong ứng dụng Express
Để Enable Hot-Module Replacement (HMR) trong Express server, cần update lại file `endtrypoint.ts`.
Trong file`endtrypoint.ts`, tại phần `Webpack HMR Activation`
```php
/**
 * Webpack HMR Activation
 */

if (module.hot) {
   module.hot.accept();
   module.hot.dispose(() => server.close());
}
```
Bình tĩnh, hãy đọc tiếp phần dưới khi thấy lỗi báo đỏ `hot`.

Ở đây, chúng ta nhận thấy rằng Hot-Module Replacement  đã enable thông qua HotModuleReplocationPlugin cho module được xác định trong `endtrypoint.ts`. Nếu HMR đã enable, trong module sẽ có interface `module.hot`, cái mà có thể sử dụng để thực hiện các thao tác trên module.

Sử dụng interface method accept() để accept các module và các dependency của nó cập nhật. Sau đó, interface method dispose() được thực hiện khi module cuối cùng được thay thế. Các hành động xóa hay thoát sẽ xóa mọi resources đã tạo, VD kết thúc ứng dụng Node.js và thoát tất cả các kết nối hiện có.

Do `module` không được định nghĩa bất kì đâu trong file, nên TypeScript compiler sẽ quăng ra một error: Thuộc tính `hot` chưa được định nghĩa. Để fix, chúng ta sẽ sử dụng `ngxs` - một thư viện quản lý state của Angular

`ngxs` cung cấp một `[hmr-plugin](https://github.com/ngxs/store/blob/master/packages/hmr-plugin/src/symbols.ts)`, cái mà được định nghĩa cho webpack hot module. Hãy update lại phần `Webpack HMR Activation` như sau
```php
/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
```
### Run server Node-Express và TypeScript
Với việc cài đặt HMR, cần cài đặt thêm 2 script trong file `package.json`, đó là `start` và `webpack` (để ý tên file entrypoint.js nhé)
```php
 "main": "entrypoint.js",
 "scripts": {
    "start": "node dist/entrypoint",
    "webpack": "webpack --config webpack.config.ts"
  },
```
`webpack` script sẽ chạy và cấu hình `webpack.config.ts `và bundle ra file `entrypoint.js` trong directory `dist`.

Để chạy, chúng ta sẽ mở 2 cửa sổ terminal, một cái để gọi tới `webpack`
```php
npm run webpack
```
Một cái để gọi tới `start`
```php
npm start
```

Trong terminal chạy `start`, hiển thị message "Listening on port 7000" -> OK.

Như vậy, mình đã xong phần một hướng dẫn **Giới thiệu và cài đặt ban đầu** cho loạt seri về việc **Sử dụng TypeScript để viết API bảo mật với Node.js và Express.** 

Hẹn gặp lại các bạn trong các bài viết tiếp theo.