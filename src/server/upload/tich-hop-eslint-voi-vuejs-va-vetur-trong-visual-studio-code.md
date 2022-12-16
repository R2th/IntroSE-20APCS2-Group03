> EsLint là gì, đó là một công cụ để xác định và báo cáo về các mẫu được tìm thấy trong mã ECMAScript / JavaScript, với mục tiêu làm cho mã trở nên nhất quán hơn và tránh các lỗi, kiểm tra định dạng mã, các biến không sử dụng, v.v.

Thông qua công cụ này, chúng ta sẽ biết liệu chúng ta có đang sử dụng định dạng chính xác cho dự án hay không, liệu `{}` có ở đúng vị trí hay không, có dấu chấm phẩy ở cuối dòng hay không, có biến không được sử dụng hay không. Ngoài việc kiểm tra `Coding convention` thì Eslint còn kiểm tra lỗi sai cú pháp hay style của code.

ESlint là công được sử dụng nhiều với các `Node.js` package, và có thể cấu hình cho nhiều code style. Cấu hình này có thể phức tạp, vì vậy chúng ta có thể sử dụng một mẫu đã có đầy đủ những gì chúng ta cần. Hãy để sử dụng vue-cli để tạo một dự án bằng cách sử dụng  webpack với Node 8 trở lên.

# Cài đặt Project

Đầu tiên chúng ta chạy:
```
npx vue-cli init webpack myProject
```

Nếu bạn chưa từng nghe về npx, thì bây giờ là lúc để tìm hiểu về nó. Nó có một trình chạy Node packages, chịu trách nhiệm chạy các Node package mà không cần phải cài đặt nó trên toàn cầu. Nói cách khác, bạn không cần phải chạy `npm install -g <pack>`.

Sau khi cài đặt xong chúng ta vào project:
```
cd myProject
npm install
code .
```

Lệnh `npm` sẽ cài đặt tất cả các package cần thiết, bao gồm các package nằm trong devDependencies. `code .` lệnh sẽ mở Visual Studio Code trong thư mục hiện tại.

# Cấu hình Eslint cho VsCode
Khi bạn cài đặt xong và ở trong Visual Studio Code, hãy mở thư mục `src/App.vue`. Bạn sẽ nhận thấy rằng không có tô sáng cú pháp, như được hiển thị trong hình sau:
![](https://images.viblo.asia/bc8f15a9-c2c1-4d6d-a743-5ea50784ee05.png)

Visual Studio Code sẽ cảnh báo bạn, ở góc dưới bên phải, có các phần mở rộng cho Vue. Dưới đây là một số tiện ích mở rộng tốt giúp ích cho chúng ta sử dụng Vue:
* Vue
* Vue 2 Snippets
* Vue Peek
* Vetur
* ESLint
* Editorconfig for VSCode

Sau khi cài đặt các tiện ích mở rộng này và khởi động lại VSCode, chúng tôi có tô sáng cú pháp.

Để ESLint hoạt động chính xác, bạn phải thay đổi tùy chọn VSCode. Chuyển đến `File > Preferences > Settings` hoặc gõ `[Ctrl+,]` và chỉnh sửa `User Settings file`, thêm cấu hình sau:

```json
{
 "eslint.validate": [
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "javascript",
      "autoFix": true
    }
  ]
}
```

Với cấu hình này, VSCode sẽ thực hiện xác thực cho ba loại tệp này: vue, HTML và JavaScript. Bây giờ hãy quay lại tệp `src/App.vue` và nhấn `ctrl + alt + f` trên Windows hoặc `ctrl + shift + i` trên Linux hoặc `ctrl + shift + f` trên Mac OS để thực hiện định dạng code. ESLint sẽ xác nhận code và hiển thị một số lỗi trên màn hình.
![](https://images.viblo.asia/10362ea5-c3fe-44a9-bc28-8a95ec3baebe.png)
Những lỗi này có thể được sửa tự động và không cần phải sửa từng lỗi một cách thủ công. Để thực hiện việc này, bạn có thể nhấn `ctrl + shift + p` và chọn ESLint:  Fix all:

Chúng ta có thể tối ưu hóa ESLint bằng cách định cấu hình nó để thực hiện định dạng mã mỗi khi chúng ta save. Để làm điều này, thêm cấu hình như sau:

```Json
{
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "javascript",
      "autoFix": true
    }
  ],
}
```

Cài đặt này, `eslint.autoFixOnSave`, cho phép tự động sửa khi save. Bạn phải khởi động lại Visual Studio Code để áp dụng thay đổi này.

Chúng ta có một vấn đề xảy ra giữa việc định dạng code và lưu code. Điều này xảy ra vì ESLint không chạy khi chúng ta định dạng code. Vấn đề ở đây:
![](https://images.viblo.asia/07b062b9-b890-4cba-89a1-5b108874bdea.gif)

Như bạn có thể thấy từ gif trên, chúng ta thực hiện luân phiên lệnh để format code và save. Lệnh format code chưa sử dụng ESLint, nó sử dụng công cụ format riêng của VSCode, (hoặc một công cụ khác như Prettier). Bây giờ, khi VSCode save, ESLint sẽ được thực thi, nhờ `eslint.autoFixOnSave`.

Để giải quyết vấn đề này, chúng tôi cần một số cài đặt bổ sung liên quan đến tiện ích mở rộng Vetur. Đó là:

```
 "vetur.format.defaultFormatter.js": "vscode-typescript",
 "vetur.format.defaultFormatter.html": "js-beautify-html",
 "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
 ```
 Với ba cài đặt này, giờ đây chúng tôi có cấu hình chính xác cho ESLint để tự động sửa lỗi cho bạn. Theo cách này, chúng ta có thể viết code và khi có một số lỗi format, ESLint sẽ tự động sửa chúng.
 
 Giờ chúng ta thêm vào cài đặt của VsCode
 
 ```json
 {
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "javascript",
      "autoFix": true
    }
  ]
}
```

Trên đây là một Cách tích hợp Eslint vào VSCode mong có thể giúp ích được cho các bạn trong việc viết code chuẩn `coding convention` và cấu hình từng format code cho từng dự án.

# Tài liệu tham khảo
* https://eslint.org/docs/rules/
* https://toidicodedao.com/2018/05/15/viet-code-tot-hon-voi-linter-eslint-visual-studio-code/