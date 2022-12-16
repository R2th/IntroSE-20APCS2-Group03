## Giới thiệu
Chào các bạn lại là mình đây, hôm nay mình sẽ giới thiệu về Prettier và eslint dùng trong ứng dụng ReactJS. 
Eslint thì chắc các bạn đã khá quen thuộc rồi, vậy còn prettier thì sao? và tại sao bạn nên sử dụng cả 2 thứ này trong các ứng dụng ReactJS của bạn kể cả những ứng dụng mà bạn tự xây để học?

Prettier là một tool format code dùng cho JS JSX, Angular, Vue, CSS, SCSS…  thậm chí cả JSON, GraphQL, YAML. Vì là 1 tool hỗ trợ bạn format code nên nó giúp bạn format lại 1 đoạn code hoặc có thể là toàn bộ dự án theo đúng kiểu format mà bạn quy định như sử dụng tab/space hoặc cả 2 khi code, số lượng tham số được phép trên 1 dòng...

Eslint thì như bạn đã mường tượng, nó là tool để xác định và báo cáo các lỗi pattern gặp phải khi bạn code JS sao cho đúng chuẩn chung của dự án, như việc khai báo biến chưa sử dụng, khai báo biến ở phạm vi global… Không giống như Prettier tập trung vào các kiểu format code, Eslint tập trung vào quality của code.

Mình đi vào ví dụ cụ thể về việc cài đặt và sử dụng Prettier và Eslint trong ứng dụng luôn để củng cố, cũng như hiểu hơn về 2 thứ này nhỉ.

## Ví dụ
**Khỏi tạo nhanh ứng dụng với create-react-app nào**:

`create-react-app prettier-and-eslint`
Trước khi vào cài đặt thêm các dependencies khác mình chạy cd đến thư mục  prettier-and-eslint vừa tạo bởi create-react-app và chạy npm run eject để expose ra tất cả những config của ứng dụng, khi mà trước đó facebook đã gói lại và ẩn đi, và giờ mình hoàn toàn control việc config dự án.

Tiếp đó mình cài thêm các dependencies:
`npm i -D prettier eslint-config-prettier eslint-plugin-prettier `
Do create-react-app đã cài sẵn giúp mình eslint rồi nên mình không cần cài thêm nó nữa.
Về **eslint-plugin-prettier** thì nó dùng để chạy prettier như là eslint rules 
còn **eslint-config-prettier** dùng để tắt các rules không cần thiết hoặc gây conflict với prettier.

Ở file package.json mình thêm vào scripts để run eslint và fix eslint
```
    "lint": "eslint './src/**/*.{js,jsx}'",
    "lint:fix": "eslint './src/**/*.{js,jsx}' --fix"
```

**Cấu hình eslint và prettier:**

Ở ngoài cùng thư mục, mình thêm file .eslintrc để cấu hình eslint :
Đầu tiên mình xác định môi trường cấu hình eslint, ở đây mình cho phép chạy trên cả browser đồng thời enable es6:
```
"env": {
      "browser": true,
      "es6": true
  },
```

Tiếp đó mình thêm lệnh này để extend thêm cấu hình mặc định từ prettier, react-app
```
"extends": ["react-app", "prettier"],
```
và sử dụng môi trường prettier cùng với React để run
```
"plugins": ["react", "prettier"],
```
Tiếp đó là sử dụng phiên bản ecmaVersion 2018 để làm tuỳ chọn phân tích cú pháp code:
```
"parserOptions": {
      "ecmaVersion": 2018
  },
```
Cuối cùng là add rule cho prettier, eslint ở rules
```
"rules": {
     "prettier/prettier": [
         "error",
         {
             "printWidth": 80,
             "trailingComma": "es5",
             "semi": false,
             "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
             "no-unused-vars": ["error"]
         }
     ]
 }
```
ở đây mình chỉ add rule như **printWidth** 80 để set max length của line code, **no-mixed-spaces-and-tabs** để set sử dụng cả tab lẫn space, **semi** để bỏ dấu **;** ở sau cùng mỗi line…

Đây là file .eslintrc đầy đủ:
```
{
  "env": {
      "browser": true,
      "es6": true
  },
  "extends": ["react-app", "prettier"],
  "plugins": ["react", "prettier"],
  "parserOptions": {
      "ecmaVersion": 2018
  },
  "rules": {
      "prettier/prettier": [
          "error",
          {
            "printWidth": 80,
            "trailingComma": "es5",
            "semi": false,
            "singleQuote": true,
            "no-mixed-spaces-and-tabs": ["error", "smart-tabs"]
          }
      ],
      "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
  }
}
```
Ngoài ra bạn có thể tìm hiểu thêm những config khác ở trang chủ của eslint, prettier

Cuối cùng bạn cài global eslint: `npm i -g eslint` và install extension của eslint trên VSCode để nó check lỗi hiệu quả nhất.

**Xem thành quả thôi nào**:

Khi chạy npm start lên bạn sẽ thấy báo lỗi thừa dấu ; ở các file như **App.js, index.js **do mình đã set **"semi": false** ở file .eslintrc
![](https://images.viblo.asia/8b7f3a5f-68d4-4772-b4dd-44830304b9d8.png)

Để fix tất cả các file này, ở terminal, mình run **npm run lint:fix** đã thêm ở trên để fix lỗi ở tất cả các file này, hoặc bạn có thể hover chuột vào vị trí lỗi để show lỗi và chọn cách fix
![](https://images.viblo.asia/8daf2cad-ee08-4390-8d16-2edee35821d1.png)

## Kết luận
Cảm ơn các bạn đã đọc, hẹn gặp lại ở bài sau nhé.