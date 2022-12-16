# 1. Lint là gì?
   Lint là công cụ giúp chúng ta phân tích Code, từ đó đưa ra cho chúng ta những vấn đề đang gặp phải như không tuân thủ coding style, sai coding convention. Ngoài ra lint còn giúp chúng ta phát hiện các lỗi tiềm ẩn như gán biến chưa khai báo, khai báo biến không sử dụng, ...

# 2. ESlint là gì?
   ESlint là một linter (Công cụ review, tìm những lỗi lặt vặt trong cách viết code, đưa đề xuất cải tiến), nó dành cho Javascript và được viết bằng Node.js. ESlint rất hữu dụng trong việc phát hiện những lỗi lặt vặt trong thời gian chạy Project.

# 3. Lợi ích của ESlint

- Giúp chương trình ngăn ngừa một vài loại bug.
- Tiết kiệm thời gian của dev
- Giúp code đẹp hơn, ngon lành hơn
- Dễ sử dụng

# 4. ESlint giúp xử lý các vấn đề gì?

- Vấn đề #1: Code chạy ngon lành cành đào lúc phát triển, còn khi release thì gặp lỗi. Tại sao?. Ví dụ nhé: Giả sử bạn thiếu 1 dấu chấm phẩy, khi chạy chương trình trên browser thì vẫn ổn. Nhưng lúc minified code để đóng gói sản phẩm thì mấy công cụ minification lại không báo cho bạn biết dấu chấm phẩy nào bị thiếu. Khi code đã minified thì trình duyệt không chấp nhận lỗi nào, bao gồm cả lỗi mà nó vốn bỏ qua với code nguyên bản.
- Vấn đề #2: Xung đột phạm vi biến (Scope). Ví dụ nhé: Trong code của bạn sẽ đặt rất nhiều biến như "id", "name", ... Nhưng bỗng dưng ngày đẹp trời, đồng nghiệp trong nhóm của bạn vô tư khai báo biến với var, thế là biến đó có nguy cơ ghi đè giá trị lên biến cùng tên của bạn. Rồi lúc chương trình chạy không biết lỗi này nằm ở đâu. Điều này sẽ xảy ra.

# 5. Cài đặt và cấu hình ESlint.

ESlint có thể cài qua `npm` như sau:
```
npm install --save-dev eslint
```
Ngoài ra ESlint còn cho phép chúng ta cài thêm các plugin để mở rộng hoạt động của nó. Ví dụ plugin cho dự án ReactJS:
```
npm install --save-dev eslint-plugin-react
```
Một linter hoạt động đúng khi chúng ta config nó đúng mà thôi. Ta có thể cấu hình ESlint rất dễ dàng. Có 2 cách để Config ESlint, một là comment trực tiếp trong file `*.js` , hai là sử dụng file config riêng. ESlint sử dụng file config có tên là `.eslintrc.*`. Phần mở rộng có thể là `js`, `json`, `yaml`, `yml`
Tôi sẽ cấu hình trên phần mở rộng là `json`. File config cho ESlint có những thành phần chính như sau:

`plugin`
Đây là những plugin dùng để mở rộng hoạt động của ESlint.
```
{
  "plugins": [
      "react"
  ],
  ...
}
```
`extends`
Đây là những config có sẵn được sử dụng. ESlint có cơ chế giúp chúng ta sử dụng lại những config có sẵn của người khác. Ví dụ tôi muốn sử dụng cấu hình có sẵn `eslint:recommended` (tích hợp sẵn trong eslint), và `react/recommended` (tích hợp sẵn trong plugin) thì tôi config như sau:
```
{
    ...
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    ...
}
```
`rules`
Đây là chính là phần config những quy tắc mà code cần phải tuân theo. Mỗi rules cần được config hai thông số: giá trị ứng với mức độ áp dụng rules (`off`, `warn`, `error` hoặc `0`, `1`, `2`). Ví dụ, rules sau yêu cầu áp dụng single quote `'` cho các string trong code:
```
...
    "rules": {
        "quotes": [
            2,
            "single"
        ]
        ...
    }
    ...
```
Bạn có thể xem toàn bộ rules ESlint tại đây: https://eslint.org/docs/rules/

`parserOptions`
Mặc định, ESLint kiểm tra cú pháp của ES5, nếu sử dụng ES6 hoặc các phiên bản mới hơn, chúng ta phải cấu hình bằng `parserOptions`. Ngoài ra, việc support JSX cũng cần phải cấu hình ở đây.
```
{
    ...
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    ...
 }
```

`env`
Đây là nơi cấu hình môi trường mà code của ta có thể chạy.
```
{
    ...
    "env": {
        "browser": true,
        "es6": true
    },
    ...
}
```

# 6. Áp dụng ESlint vào dự án

Sau khi đã config cho ESLint xong xuôi, công việc còn lại của chúng ta là áp dụng nó vào dự án, làm nó hoạt động đúng như chức năng của một linter.

Trước hết chúng ta cần thêm 1 script vào `package.json`
```
{
    ...
    "scripts": {
        "eslint": "eslint path/to/src",
        ...
    }
    ...
}
```
Việc sử dụng script tùy thuộc vào Project. Sau khi có script rồi thì mỗi khi cần gọi ESLint, chúng ta chỉ cần gọi lệnh `npm run eslint`

# KẾT LUẬN
ESlint là một công cụ tuyệt vời, hãy sử dụng thường xuyên và kết hợp với những công cụ khác, ví dụ như prettier