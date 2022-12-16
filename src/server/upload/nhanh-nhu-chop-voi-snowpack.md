![](https://images.viblo.asia/eaa007eb-883b-4ce9-ae72-de90829218d0.png)

# Snowpack là gì?
Snowpack là một công cụ xây dựng giao diện người dùng nhanh chóng, được thiết kế cho web hiện đại. Nó là một giải pháp thay thế cho các `bundlers` nặng hơn, phức tạp hơn như `webpack` hoặc `Parcel` trong quy trình phát triển của bạn. Snowpack thúc đẩy hệ thống native modules của JavaScript để tránh các công việc không cần thiết và duy trì tốc độ cho dù dự án của bạn phát triển lớn hay mở rộng đến đâu

Theo trang chủ của snowpack thì nếu bạn đã thử nó một lần thì khả năng bạn sẽ ghiền nó, khi sử dụng nó bạn có thể không muốn quay lại dùng các `bundler` mà bạn đã dùng nữa =)) 

Vậy snowpack có những cung cấp những tính năng gì?
# Tính năng
## Instant startup
 - Máy chủ phát triển web unbundled `khởi động trong 50ms hoặc nhỏ hơn` và vẫn nhanh trong các dự án lớn
 ## Build once, cache forever
 - Snowpack không bao giờ build cùng một tệp hai lần. Được hỗ trợ bởi `JavaScript’s native module system (ESM)` trong trình duyệt
 ## HMR feat. Fast Refresh
 - Không cần làm mới. Xem các thay đổi được phản ánh ngay lập tức trong trình duyệt với Hot Module Replacement (HMR) + Fast Refresh cho React, Preact & Svelte.
 - HMR: là khả năng cập nhật nội dung các file khi có sự thay đổi vào trình duyệt mà chúng ta không cần refresh lại trang. Ví dụ đơn giản như trong 1 file css chúng ta sửa màu chữ từ đỏ sang xanh thì trên trình lập tức cập nhật màu chữ sang màu xanh mà chúng ta không cẩn resfresh trang
 - Với khả năng của `snowpack` thì khi build các file đơn gần như ngay lập tức, chỉ cần 10-25ms để tải và cập nhật trên trình duyệt
 - Ngoài HMR thì `snowpack` hỗ trợ `Fast Refresh` cho các framework hay thư viện phổ biến như react, Preact và Svelte. 
## Out-of-the-box support
Snowpack được cung cấp với hỗ trợ tích hợp cho các loại tệp sau, không yêu cầu cấu hình:
- JavaScript (.js, .mjs)
- TypeScript (.ts, .tsx)
- JSON (.json)
- JSX (.jsx, .tsx)
- CSS (.css)
- CSS Modules (.module.css)
- Images & Assets (.svg, .jpg, .png, etc.)
- WASM (.wasm)
## Optimize for production
- Xây dựng cho môi trường production với các tính năng tối ưu hóa tích hợp sẵn và hỗ trợ plugin cho các gói yêu thích của bạn.
## Plugins? Plugins!
- Bạn có thể kết nối tới các plugin mà mình yêu thích như `babel`, `SASS`, .... hoặc có thể tự tạo cho mình một plugin 
# Snowpack hoạt động như thế nào?
- Với `unbundled development` của snowpack vẫn được hỗ trợ như `bundled builds` mà chúng ta đã sử dụng cho production
- Khi chúng ta xây dựng ứng dụng cho production, chúng ta có thể cài cắm các `bundler` mà mình thích như Webpack,... thông qua plugin chính thức của snowpack 
- Với snowpack thì chúng ta không cần cấu hình bundler phức tạp mà nó đã xử lý bản build cho chúng ta
- Snowpack giúp bạn tận dụng tối đa: phát triển nhanh, unbundled development với hiệu suất được tối ưu hóa trong các bản production của chúng ta.

Dưới đây là hình ảnh cách làm việc của snowpack và webpack:

![](https://images.viblo.asia/2d56e939-ad9f-42ad-8985-72e22f871007.png)

## Unbundled development
- Unbundled development là ý tưởng chuyển các file riêng lẻ đến trình duyệt trong quá trình chúng ta phát triển ứng dụng. Các file vẫn có được xây dựng bằng các công cụ như `ts`, `babel`,... và sau đó được tải riêng lẻ trong trình duyệt với các phần dependencies theo cú pháp `import` và `export`. Bất kỳ khi nào chúng ta thay đổi nội dung file, Snowpack chỉ cần build lại file đó

- Lợi thế của `Unbundled development` so với `bundled development` truyền thống:
    - Single-file builds nhanh chóng
    - Single-file builds có tính xác định
    - Single-file builds dễ dàng để debug
    - Kích thước dự án không ảnh hưởng tới tốc độ phát triển
    - Các tệp riêng lẻ được lưu vào bộ nhớ cache tốt hơn.

Chung quy lại thì Unbundled development: Mỗi file được tạo riêng lẻ và được lưu vào bộ nhớ cache vô thời hạn. Ở môi trường phát triển thì chỉ build file một lần và trình duyệt sẽ không tải lại file đó lần thứ 2, ngoại trừ khi chúng ta thay đổi nội dung của file. 
## Sử dụng NPM dependencies
- Các gói NPM chủ yếu được publish sử dụng cú pháp module nên không thể chạy trên web mà không có một vài tiến trình build. Việc muốn dùng một package nào sẽ được chúng ta phải quay lại với `bundled development`
- Snowpack có cách tiếp cận khác: thay vì đóng gói toàn bộ ứng dụng của chúng ta cho một yêu cầu, Snowpack xử lý các dependencies của chúng ta một cách riêng biệt
Ví dụ:
```
node_modules/react/**/*     -> http://localhost:8080/web_modules/react.js
node_modules/react-dom/**/* -> http://localhost:8080/web_modules/react-dom.js
```

Nó sẽ hoạt động như sau:
1. Snowpack sẽ quét ứng dụng của bạn cho tất cả các packages npm được sử dụng
2. Snowpack sẽ đọc các dependencies đã được cài đặt từ thư mục node_modules
3. Snowpack gói tất cả despendencies của chúng ta một cách riêng biệt thành các file JavaScipt riêng lẻ
Ví dụ: 
`react` và `react-dom` sẽ được chuyển đổi sang `react.js` và `react-dom.js` tương ứng
4. Mỗi file kết quả có thể được chạy trên trình duyệt và được import thông qua ESM `import`
5. Bởi vì các dependencies của chúng ta hiếm khi thay đổi, nên Snowpack hiếm khi cần phải build lại chúng.

Sau khi Snowpack build các dependencies của chúng t, bất kỳ gói nào cũng có thể được import và chạy trực tiếp trên trình duyệt mà không cần thêm gói hoặc công cụ nào
## Demo
Qua các mục lý thuyết như vậy thì thực hành dùng nó sẽ như thế nào. 
### Cài đặt snowpack
Các bạn tạo một folder rồi sử dụng lệnh sau để init project với npm:
```
npm init
```
Sau đó cd vào thư mục dự án để install snowpack:
```
# npm:
npm install --save-dev snowpack
# yarn:
yarn add --dev snowpack
# pnpm:
pnpm add --save-dev snowpac
```

Ở đây có thể nhiều bạn chưa biết về `pnpm` các bạn có thể tham khảo bài viết này của mình về [pnpm](https://viblo.asia/p/nhanh-hon-voi-pnpm-1VgZv6rMZAw)

### Thực hành

Sau đó bạn vào root của dự án tạo một file `index.html` với nội dung đơn giản như sau:
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Demo Snowpack App" />
        <title>Demo Snowpack App</title>
    </head>
    <body>
        <h1>Demo Snowpack App</h1>
    </body>
</html>
```

sau đó bạn vào file `package.json` thêm dòng sau:
```json
"scripts": {
    "dev": "snowpack dev",
    ...
  },
```

Bây giờ chúng ta thử `start` nó lên xem thế nào :D `npm run dev`!

ở terminal của chúng ta sẽ như sau:

![](https://images.viblo.asia/f9c6b0b4-8f83-494d-9335-53fb611e12b7.png)

chúng ta có thể thấy được thời gian nó start là 32ms

Sử dụng JavaScript:
Chúng ta tạo một file `index.js` và `app.js` như sau:
```index.js
import {app} from './app';

app();
```
```app.js
export function app() {
    console.log('App snowpack');
}
```
ở `index.html` chúng ta thêm:
```index.html
...
<script type="module" src="/index.js"></script>
...
```

Bây giờ bạn thử thay đổi nội dung file, rồi quan sát ở terminal sẽ thấy hiển thị file nào thay đổi và số lần file đó thay đổi
# Kết luận
Trong bài viết này thì mình đã giới thiệu về snowpack và thực hành tạo một project để tìm hiểu cách hoạt động của nó. Trong bài viết tiếp theo chúng ta cùng tìm hiểu về cách sử dụng npm package, adding css, build cho môi trường production và development. Cảm ơn các bạn đã theo dõi bài viết

Các bài viết khác với snowpack:
- [Tạo project React với snowpack](https://viblo.asia/p/build-project-react-voi-snowpack-aWj53j6bl6m)

## Tài liệu tham khảo:

Trong bài viết của mình sử dụng nội dung và tham khảo tại trang tài liệu chính thức của snowpack
- snowpack.dev