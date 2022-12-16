## SASS: Là gì, tại sao và như thế nào?

SASS là một bộ tiền xử lý CSS, giúp bạn sử dụng các tính năng không tồn tại trong CSS như các biến, lồng nhau, mixins, function, các tính năng tiện lợi khác. Điều này giúp cho code dễ đọc, ngắn gọn, dễ kế thừa và maintain hơn so với cách viết CSS truyền thống.
Khi bạn bắt đầu chạy, nó sẽ lấy tệp Sass của bạn, chuyển đổi và lưu nó dưới dạng tệp CSS bình thường mà bạn có thể sử dụng trong trang web của mình.

## Khởi tạo dự án
Đầu tiên, cần tạo 1 `package.json` giúp quản lý các package version cũng như khởi chạy dự án thông qua npm
```bash
npm init -y
```

Bạn có thể tham khảo cây thư mục dưới đây của mình
```bash
.
├─ node_modules/
├─ public/
│  ├─ styles/
│  ├─ index.html
├─ src/
│  ├─ scss/
package.json
```
> Tại sao phải chia ra 2 thư mục `src/` và `public/`?
Bởi vì source code từ `src/` sẽ được biên dịch và tự động đặt vào thư mục `public/`.
Khi giữ sự tách biệt các thư mục này, bạn có thể chắc chắn rằng mọi thứ bạn cần để đưa web của mình lên môi trường Product đều nằm trong thư mục `public/` và mọi thứ để triển khai phát triển dự án của bạn đều nằm trong thư mục `src/`.

## Cài đặt SASS
Đầu tiên, chúng ta sẽ cài đặt [sass](https://sass-lang.com/dart-sass) , thư viện giúp để biên dịch `.sass` hoặc `.scss` các tệp thành `.css`.

```bash
npm install -D sass
```

Trong file `package.json`, chúng ta sẽ thêm 1 dòng khởi chạy giúp biên dịch SASS.

```json
"scripts": {
  ...
  "start": "sass src/scss:public"
  ...
}
```

> Dòng khởi chạy có dạng `sass <inputPath>:<outputPath>`, chúng ta sẽ khai báo cho sass cần biên dịch bất kỳ file `.scss` nào mà nó tìm thấy (ngoại trừ những tệp bắt đầu bằng dấu gạch dưới) từ thư mục `src/scss` và xuất tới `public/`.

## Viết code
Sau khi đã cài đặt SASS, chúng ta có thể bắt đầu làm việc trên dự án của mình. Chúng ta sẽ bắt đầu bằng cách tạo một file `.scss` trong thư mục `src/scss`.
Tạo một file `_base.scss` trong `src/scss` và import nó vào `src/scss/main.scss`.

```css
// main.scss
@import '_base';

h1 {
    color: tomato;
    font-family: system-ui, -apple-system, Roboto, sans-serif;
}
```
> `_base.scss` là một file chứa tất cả các style cơ bản cho dự án. Đó là một nơi tốt để đặt các style global như màu sắc, phông chữ, kích thước và các style khác được sử dụng trong toàn bộ dự án.

Có 1 số style cơ bản thường dùng như:
```css
// _base.scss
*, *:before, *:after {
  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

html, body, ul, ol, li, figure, blockquote, dl, dd {
  margin: 0;
  padding: 0;
}
```

## Thêm SASS vào HTML
Trình duyệt không thể hiểu SASS. Vì vậy, chúng ta cần thêm file đã biên dịch của SASS (CSS) vào HTML. Chúng ta có thể thêm bằng cách thêm thẻ `<style>` vào trong `<head>`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>    
```
Bây giờ chúng ta có thể chạy `npm run start` tại terminal để chuyển đổi từ `.scss` sang `.css`.

## Môi trường Development và Production
Có 1 vài sự khác biệt khi build ở môi trường development và production.
Nếu ở môi trường Dev, bạn cần giữ code nguyên vẹn, cùng với `source-map` giúp debug và dễ dàng tìm kiếm khi phát sinh lỗi, lỗi ở đâu.
Nếu ở môi trường Prod, bạn cần nén code, loại bỏ `source-map`, những khoảng trống và comment không cần thiết để tăng hiệu suất.

Khi nãy chúng ta đã tạo 1 lệnh giúp build code về CSS, bây giờ hãy tách riêng nó ra 2 phiên bản cho phù hợp với đặc điểm của mỗi môi trường.

```json
"scripts": {
    ...
    "sass:dev": "sass --watch --embed-source-map src/scss:public/styles",
    "sass:prod": "sass --no-source-map --style compressed src/scss:public/styles"
    ...
}
```

**Dev Script**: `--watch` giúp SASS lắng nghe trong thư mục `src/scss` và biên dịch lại nếu phát hiện có sự thay đổi trong file. `--embed-source-map` để tạo ra `source-map` dành cho file CSS đã được biên dịch.

**Prod Script**: Sử dụng `--no-source-map` để không khởi tạo `source-map`. Còn `--style compressed` giúp nén và loại bỏ bất kỳ khoảng trắng không cần thiết nào khỏi file CSS đã biên dịch. Cả hai tùy chọn này sẽ giảm kích thước file và cải thiện hiệu suất khi tải trang.

## Kết luận
* SCSS là một công cụ giúp bạn viết CSS rõ ràng, dễ dàng và ít tốn kém hơn trong một cấu trúc chương trình.
* Trình duyệt không thể hiểu SASS. Vì vậy, chúng ta cần chuyển SCSS sang CSS.
* Trong môi trường Development, việc sử dụng `source-map` cho trình duyệt sẽ tái tạo lại code ban đầu và hiển thị bản gốc đã được tái tạo lại trong trình gỡ lỗi.
* Trong môi trường Production, hãy xóa `source-map` và giảm kích thước tệp để tải trang nhanh hơn, giúp đạt được hiệu suất tốt hơn.