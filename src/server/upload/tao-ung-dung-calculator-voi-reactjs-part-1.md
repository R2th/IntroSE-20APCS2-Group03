Chào mọi người, trong bài viết lần này mình sẽ cùng các bạn xây dựng ứng dụng `Calculator` với `ReactJS`

Đầu tiên, mọi người xem qua sản phẩm tí nhỉ :D

![](https://images.viblo.asia/54693f5a-36af-431a-b7a4-edd7a57eb24b.gif)

Đây là ứng dụng `Calculator` với chức năng tính toán đơn giản và cơ bản. Bây giờ bắt đầu xây dựng `Calculator` nào. Let's start:

## Phân tích giao diện
Như tiêu đề của bài viết thì ứng dụng sẽ được phát triển với `React` và nó được tạo ra từ các `component`. Chúng ta có thể thấy một giao diện người dùng được chia nhỏ thành nhiều phần riêng lẻ được gọi là các `Component` hoạt động độc lập và hợp nhất tất cả chúng trong một `Component` chính sẽ là giao diện người dùng cuối cùng của chúng ta. Bây giờ, chúng ta sẽ chia nhỏ giao diện ứng dụng `Calculator`. Chúng ta sẽ có các thành phần sau khi chia nhỏ giao diện ứng dụng `Calculator`:
- Calculator Tilte: Đây là phần hiển thị tiêu đề của ứng dụng.
- Output Screen: Đây là phần hiển thị đầu ra của chúng ta. 
    -  Question Ouput: Phần hiển thị đầu vào người dùng nhập.
    -  Answer Ouput: Phần hiển thị kết quả tính toán từ đầu vào người dùng nhập.   
-  Buttons: là các nút bấm để người dùng bấm chọn đầu vào để tính toán.

![](https://images.viblo.asia/6c72786d-c597-4935-8855-4f1869ac4401.jpg)

Các thành phần phía trên là là các thành phần nhỏ nhất mà mình có thể chia nhỏ giao diện của ứng dụng Calculator. Vì vậy nên mình sẽ tạo các `Component` và xây dựng ứng dụng dựa vào các thành phần trên. Nào, bây giờ, chúng ta cùng bắt tay vào xây dựng `Calculator` thôi nào :v: 
## Xây dựng ứng dụng

Đầu tiên, chúng ta tạo ứng dụng `React` của chúng ta bằng `Command`:
```
npx create-react-app calculator
```
Sau khi chạy lệnh trên thì sẽ tạo cho chúng ta một thư mục có tên là `calculator`. Thư mục này sẽ chứa tất cả các file của ứng dụng. Ảnh dưới đây là các file mặc định ban đầu khi tạo mới ứng dụng `React`:

![](https://images.viblo.asia/2f6987fc-cd9a-45ad-b290-400ac36b3ce4.jpg)

Chúng ta vào file `index.html` sẽ thấy:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```
file này chúng ta sẽ giữ nguyên và không thay đổi gì. Trong file này thì `<div id="root"></div>` chính là nơi để render `Component` chính để hiển thị ứng dụng của chúng ta

Tiếp theo, chúng ta sẽ tạo ra một thư mục có tên là `components`, nơi sẽ chứa các `component` thành phần để xây dựng ứng dụng của chúng ta. Sau đây là các `component` trong ứng dụng `Calculator`:
- Calculator: đây sẽ là component chính,  và sẽ là nơi đại diện cho ứng dụng `Calculator` của chúng ta
- CalculatorTilte: đây là component được sử dụng để render ra tiêu đề của ứng dụng
- OutputScreen: đây là component được sử dụng để render phần chứa phần hiển thị đầu vào người dùng nhập và kết quả tính toán của đầu vào
- OutputScreenRow: đây là component được sử dụng cho đầu vào người dùng nhập cũng như kết quả tính toán của đầu vào
- Buttons: đây là component sẽ cho chung ta tất cả các button trong ứng dụng
Sau khi tạo thư mục và các component trên thì chúng ta có cấu trúc ứng dụng của chúng ta như sau:

![](https://images.viblo.asia/e4fb7015-8d37-419d-af05-be4a17f29ea2.jpg)

## Kết luận
Trong bài viết lần này mình mới giới thiệu qua về ứng dụng Calculator, phân tích giao diện để tạo ra các `component` sử dụng trong ứng dụng và cấu trúc thư mục sau khi tạo các `component`. Trong bài viết tiếp theo(https://viblo.asia/p/tao-ung-dung-calculator-voi-reactjs-part-2-yMnKMABgK7P) chúng ta cùng nhau bắt tay vào viết code cho các component và xây dựng hoàn thiện ứng dụng Calculator của chúng ta. :v: