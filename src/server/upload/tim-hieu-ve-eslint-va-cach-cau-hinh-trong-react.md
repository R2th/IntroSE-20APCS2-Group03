# Eslint là gì ?
Chắc hẳn các bạn nhìn thấy bạn bè mình hoặc đồng nghiệp có những dòng code luôn đẹp ,không warning,không errors, hoặc có thể bạn đã từng ít nhất 1 lần nghe đến từ Eslint,
vậy Eslint được tạo ra để làm gì ?

-----


- ESLint phân tích tĩnh mã của bạn để nhanh chóng tìm ra sự cố. ESLint được tích hợp vào hầu hết các trình soạn thảo văn bản và bạn có thể chạy ESLint như một phần của đường dẫn tích hợp liên tục của mình.
- Nhiều vấn đề mà ESLint tìm thấy có thể được sửa tự động. Các bản sửa lỗi của ESLint có nhận thức về cú pháp, do đó bạn sẽ không gặp phải các lỗi do thuật toán tìm và thay thế truyền thống đưa ra.

-----


==>  ESLint là một công cụ để xác định và báo cáo về các mẫu được tìm thấy trong mã ECMAScript / JavaScript, với mục tiêu làm cho mã nhất quán hơn và tránh lỗi. Theo nhiều cách, nó tương tự như JSLint và JSHint với một vài ngoại lệ: ESLint sử dụng Espree để phân tích cú pháp JavaScript. ESLint sử dụng AST để đánh giá các mẫu trong mã. ESLint hoàn toàn có thể cắm được, mọi quy tắc đều là một plugin và bạn có thể thêm nhiều hơn nữa trong thời gian chạy.

-----


Đọc đến đây thì có lẽ bạn đã hiểu sơ về eslint và cách mà nó được mọi developer tin dùng rồi nhỉ ? để hiểu rõ hơn, chúng ta hãy đi vào thực thế bằng cách cấu hình chúng, ở đây tôi sẽ cấu hình nó với reactjs
# Cấu hình Eslint
### Cài đặt React:
Bạn hãy cài đặt react js trước:
* Bước 1:
> npx create-react-app my-app
* Bước 2:
> cd my-app
* Bước 3:
> npm start
Trước tiên, hãy đảm bảo rằng Node.js (^ 10.12.0 hoặc> = 12.0.0) được xây dựng với hỗ trợ SSL. (Nếu bạn đang sử dụng bản phân phối Node.js chính thức, SSL luôn được tích hợp sẵn.) Bạn có thể cài đặt ESLint bằng npm hoặc yarn:
> npm install eslint --save-dev
* Hoặc có thể dùng :
> yarn add eslint --dev
* Bước 4:
$ npx eslint --init

* Hoặc bạn có thể dùng :

> $ yarn run eslint --init
*  Bước 5: 
> $ npx eslint yourfile.js
* Hoặc là :
> $ yarn run eslint yourfile.js


-----

Tiếp theo, Chúng ta cần phải configuration để làm việc với Eslint
## Configuration
Về cơ bản file conflic sẽ có dạng như sau :
```
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "plugins": [
      "react",
      "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 2016,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "node": true
  },
  "globals": {
      "localStorage": true,
      "ga": true,
      "fetch": true,
      "window": true,
      "document": true,
      "Raven": true,
      "ENV": true
  },
  "rules": {
      "react/prop-types": "off",
      "no-console": 0,
      "react/sort-comp": [1, {
          "order": [
              "type-annotations",
              "static-methods",
              "lifecycle",
              "everything-else",
              "render"
          ]
      }]
  }
}
```

 Đơn giản đúng không nào ?
Hãy cài vào máy và tận hưởng những dòng code xịn xò nhất
# Kết luận :
ESLint là một công cụ tuyệt vời, hãy sử dụng thường xuyên. Hy vọng bài viết sẽ giúp ích phần nào cho các bạn và các bạn code càng ngày càng đẹp hơn.


-----


**Tham khảo : https://eslint.org/docs/user-guide/getting-started