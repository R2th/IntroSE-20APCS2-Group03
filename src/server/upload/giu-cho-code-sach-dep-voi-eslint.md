# Linter là gì?
Linter được biết đến như là các công cụ giúp bạn xác định được những vấn đề về convention trong code của mình. 
Bạn có thể biết được rất nhiều điều khi chạy linter cho code của mình:
* Code có tuân thủ theo convention không.
* Code có gặp vấn đề gì không.
* Code có khớp với bộ tiêu chuẩn mà bạn định nghĩa không.
Linter sẽ hiển thị cảnh báo cho bạn hoặc cho công cụ mà bạn đang sử dụng để code, đồng thời nó cũng có thể phân tích và đưa ra giải pháp cho bạn cải thiện code của mình.

# ESLINT
ESlint là một linter dành cho ngôn ngữ lập trình JavaScript được viết bằng Node.js.
ESlint thực sự rất hữu dụng bởi vì JavaScript là một ngôn ngữ thông dịch và được dịch trực tiếp thành mã máy, rất nhiều lỗi chỉ có thể phát hiện được trong thời gian chạy project. ESlint sẽ giúp bạn bắt được những lỗi này. Những lỗi ESlint có thể bắt bao gồm:
* Tránh lỗi lặp vô tận trong các vòng lặp.
* Đảm bảo tất cả các method getter đều trả về cái gì đó.
* Ngăn chặn cú pháp console.log và những cú pháp tương tự.
* Kiểm tra trung lặp case trong switch.
* Kiểm tra các mã trông thể truy cập.
* Kiểm tra tính hợp lệ của JSDoc.
Ngoài ra còn nhiều hơn nữa, bạn có thể tham khảo tại [đây](https://eslint.org/docs/rules/).
ESLint rất linh hoạt, có thể cấu hình tùy chỉnh được, và bạn có thể chọn quy tắc mà bạn muốn kiểm tra, hoặc loại kiểu bạn muốn thực thi. Nhiều quy tắc có sẵn bị tắt và bạn có thể bật chúng trong tệp cấu hình .eslintrc, có thể áp dụng cho toàn bộ hoặc cụ thể cho một số điểm cho dự án của bạn.

# Cài đặt ESlint
Sử dụng [npm](https://flaviocopes.com/npm/) để cài đặt ESlint:
## Global
```
npm install -g eslint

# create a `.eslintrc` configuration file
eslint --init

# run ESLint against any file with
eslint yourfile.js
```
## Locally
```
npm install eslint --save-dev

# create a `.eslintrc` configuration file
./node_modules/.bin/eslint --init

# run ESLint against any file with
./node_modules/.bin/eslint yourfile.js
```

ESlint thường được sủ dụng kèm theo trình soạn thảo mã nguồn (như Sublime Text, Visual Studio Code,...). 
# Những convention thông dụng của ESlint
Như đã nói ở trên, ESlint có thể tùy chỉnh được nên bạn có rất nhiều cách khác nhau để định nghĩa cho convention của mình. Tuy nhiên một linter tốt chỉ có thể hoạt động nếu chúng ta config nó đúng mà thôi. Nếu không, thay vì phục vụ việc nâng cao chất lượng code của chúng ta, nó lại trở thành một trở ngại khi liên tục đưa ra lỗi cho những chỗ dở hơi. Sau đây mình sẽ đưa ra một số tùy chỉnh thông dụng nhất.

## Airbnb Style Guide
Có một thiết lập phổ biến là sử dụng kiểu mã hóa JavaScript [Airbnb](https://github.com/airbnb/javascript) để lint code của bạn.
Đầu tiên, chạy
```
yarn add --dev eslint-config-airbnb
```
hoặc
```
npm install --save-dev eslint-config-airbnb
```
để cài đặt gói cấu hình Airbnb và thêm vào file .eslintrc trong thư mục gốc:
```
{
  "extends": "airbnb",
}
```

## React
Linting code React thì rất đơn giản với React plugin:
```
yarn add --dev eslint-plugin-react
```
hoặc
```
npm install --save-dev eslint-plugin-react
```
sau đó, trong file .eslintrc thêm vào:
```
{
  "extends": "airbnb",
  "plugins": [
      "react"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

## More
Bạn có thể tìm hiểu thêm về các rule của ESlint tại trang chủ của ESlint 
https://eslint.org/docs/user-guide/configuring

Về cơ bản, khi cấu hình xong file .eslintrc sẽ có dạng như sau:
```
{
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        "indent": [
            2,
            2,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "quotes": [
            2,
            "single"
        ],
        "semi": [
            2,
            "always"
        ],
        "curly": [
            2,
            "all"
        ],
        "camelcase": [
            2,
            {
                "properties": "always"
            }
        ],
        "eqeqeq": [
            2,
            "smart"
        ],
        "one-var-declaration-per-line": [
            2,
            "always"
        ],
        "new-cap": 2,
        "no-case-declarations": 0
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "es6": true
    },
    "globals": {
        "arguments": true
    }
}
```
ở đây:
* plugins: là những plugin được sử dụng để mở rộng hoạt động của ESLint.
* extends: là những config có sẵn được sử dụng, chúng ta sẽ mở rộng chúng bằng cách thêm vào những config của riêng mình.
* rules: là chính là phần config những quy tắc mà code cần phải tuân theo.
* parserOptions: mặc định, ESLint kiểm tra cú pháp của ES5, nếu sử dụng ES6 hoặc các phiên bản mới hơn, chúng ta phải cấu hình bằng parserOptions.
* env: là nơi cấu hình môi trường mà code của chúng ta sẽ chạy.
* globals: là nơi chúng ta đưa ra danh sách các biến global dùng trong dự án.

Hi vọng với việc sử dụng ESlint, việc lập trình của bạn sẽ trở nên nhẹ nhàng hơn và code cũng trở nên sạch sẽ, rõ ràng hơn.