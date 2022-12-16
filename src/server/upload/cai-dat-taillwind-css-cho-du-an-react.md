Trong bài viết cùng mình tìm hiểu cách cài đặt tailwind css cho một dự án React sẵn có.

> Tailwind là một utility-first framework với một đống class kiểu ``flex, pt-4, text-center`` và ``rotate-90`` được sử dụng trực tiếp thay vì phải suy nghĩ cách đặt tên CSS, custom class có sẵn...

Bài viết này tập trung vào việc cài đặt tailwind lên một dự án React đã có sẵn cho nên mình sẽ bỏ qua việc khởi tạo ứng dụng React ban đầu và bắt tay vào cài đặt tailwind luôn.

Tại thư mục gốc của project chúng ta chạy lệnh:
`yarn add tailwindcss postcss-cli autoprefixer -D`

Sau đó dùng lệnh sau để tạo một file cấu hình mặc định:
`npx tailwind init tailwind.js --full`

Sau khi chạy thì một file tailwind.js sẽ được tạo.

Tiếp theo chúng ta tạo một file postcss.config.js, với nội dung sau:
```javascript
const tailwindcss = require('tailwindcss');
module.exports = {
    plugins: [
        tailwindcss('./tailwind.js'),
        require('autoprefixer')
    ],
};
```

> PostCSS là một công cụ tiền xử lý, nhưng nó linh hoạt và mạnh mẽ hơn Sass hoặc Less ở chỗ nó có thể hỗ trợ chúng ta tạo plugin và sử dụng lại plugin của người khác. Tức là chúng ta có thể sử dụng CSS ở dạng mô-đun. Với PostCSS, chúng ta có thể dễ dàng chọn bộ tiền xử lý muốn sử dụng trong dự án.

Tiếp theo tạo một file taillwind.css tại ./src/assets, với nội dung sau:

```javascript
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

Sau đó thay đổi file package.json như sau:
```javascript
"scripts": {
    "start": "yarn watch:css && react-scripts start",
    "build": "yarn build:css && react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "build:css": "postcss src/assets/tailwind.css -o src/assets/main.css",
    "watch:css": "postcss src/assets/tailwind.css -o src/assets/main.css"
  },
```

Một file main.css trong thư mục src/assets sẽ được sinh ra mỗi khi chúng ta start app.
Bây giờ chúng ta chỉ việc import file CSS đó vào App.js là xong.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import './assets/main.css';
import App from "./App";
ReactDOM.render(<App />, document.getElementById("root"));
```

Cảm ơn bạn dành thời gian cùng mình tìm hiểu <3.

*Nguồn nè: https://dev.to/raphaelmansuy/how-to-add-taillwindcss-to-an-existing-react-project-gap*