#### Chào mấy anh em nhé, năm hết tết đến ai cũng bận rộn việc này việc kia, mình cũng không ngoại lệ :joy: , ngồi nhìn qua nhìn lại anh em ai cũng sử dụng cú pháp `javascript` thông thường hay `flow` mà quên mất `hot trend` đang là `typescript`. Nhân đây mình cũng xin mạo muội chia sẽ cách đơn giản nhất để tạo 1 project với `React và TypeScript sử dụng cả Webpack và Babel` nữa nhé :grinning: .

# 1. Chuẩn bị
#### Kiến thức cần có:
- Đã có kiến thức cơ bản về reactjs.
- Đã có kiến thức cơ bản về webpack, babel.
- Đã có kiến thức cơ bản về typescript (Nếu chưa thì qua bài này rồi anh em chiến vẫn vô tư nhé =))).

#### Môi trường:
  - window 10
  - node v12.14.0
  - yarn v1.7.0
  - visual studio code 1.41.1

#### Bỏ qua:
-  Không giải thích những thuật ngữ và các lệnh cơ bản.
-  Những phần cấu hình không quan trọng, các bạn có thể xem thêm thông qua repo.

# 2. Tiến hành
#### TypeScript là cái gì ?
> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

Hiểu nôm na thì nó là 1 dạng syntax nâng cao của JavaScript và khi biên dịch thì nó trở thành JavaScript.
Một số ưu điểm mình thấy hay:
1. Hướng đối tượng mạnh mẽ (class, abstract, interface, .etc)
2. Tốc độ type-checking siêu nhanh
3. Generics
4. Hỗ trợ các tính năng mới nhất của JavaScript
5. Có thể biên dịch trực tiếp sang ES5 thông qua CLI syntax của chính nó
6. Cách tổ chức source code rõ ràng, chặt chẽ
7. Hầu hết các trình soạn thảo hiện nay đều hỗ trợ
8. Cộng đồng mạnh mẽ

Ngoài ưu thì sẽ có nhược, phần này sau khi làm một thời gian thì các bạn tự đúc kết ra nhé =))

[Trang chủ](http://www.typescriptlang.org/index.html)
#### Các bước
Không luyên thuyên nữa. bây giờ chúng ta bắt đầu nhé.

1. Tạo project
```js
yarn init -y
```

2. Cài đặt 1 số thư viện cần thiết

Mình sẽ sử dụng babel để biên dịch cú pháp `TypeScript` thay vì cách thông thường của nó, đơn giản vì `babel` có nhiều `preset`, `plugin` và config tiện lợi hơn.

`devDependencies`
```bash
yarn typescript --dev
yarn add @babel/preset-typescript --dev
yarn add @types/react @types/react-dom --dev
```

Cài đặt thư viện `typescript` để sử dụng CLI init file cấu hình của nó nhé, ngoài còn nhiều còn nhiều lệnh khác các bạn có thể tham khảo trên trang chủ.

`dependencies`
```bash
yarn add react react-dom
```

File `package.json` hoàn chỉnh
<br>
![](https://images.viblo.asia/94ea6ddd-3b63-4a7d-b2b3-1bf7be2122c5.png)

3. Tạo file config

`.babelrc`
<br>
![](https://images.viblo.asia/319a21f8-f346-4a23-a45f-a61fed3b5b1b.png)


`webpack.config.js`
<br>
![](https://images.viblo.asia/76c4b4c7-7a24-4779-8524-ac03205a90c4.png)

File quan trọng nhất khi làm việc với `TypeScript` là `tsconfig.json`
```bash
yarn tsc --init
```

Các option các bạn có thể tham khảo tại [đây](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
<br>
Nó sẽ ra hàng loạt các cấu hình sau khi init, chúng ta sẽ lượt bớt những thằng không cần thiết.

`tsconfig.json`
<br>
![](https://images.viblo.asia/689bfa6e-33b7-49f6-aeac-270d879e9e53.png)

4. File ví dụ

Có thể sử dụng nhiều file có ext như `tsx, ts, js, jsx` , tùy vào cấu hình của anh em nhé.

Tạo file component
`Hello.tsx`
<br>
![](https://images.viblo.asia/27ef3af0-2b56-46e0-be63-348ba18b4273.png)


`Props` sẽ mô tả các props mà component này sẽ nhận, có rất nhiều `type`
`React.FC` đây là type của thằng `React` mô tả cho `FunctionComponent`

Tạo file root component (cũng là entrypoint được ta cấu hình trong file `webpack.config`)
`App.tsx`
<br>
![](https://images.viblo.asia/127e6e0f-3fa1-41e4-91d6-1a284a3b0d05.png)


5. Chạy

```bash
yarn start
```
![](https://images.viblo.asia/e7b6f050-93ee-4599-9147-468ae2adeb2c.PNG)

Ngon lành cành đào :clap:

Mọi thứ đều rất đơn giản phải không ?
# 3. Kết luận
Đây là cách đơn giản mà mình sử dụng để tạo 1 project `React, Vue` bất kì kết hợp với `TypeScript`.
<br>
Ngoài ra còn rất nhiều thứ thú vị khác, cùng nhau tìm tòi và học hỏi không ngừng khi có thể nhé :+1: .
<br>
Cảm ơn anh em đã đọc bài viết này. Chúc anh em năm mới nhiều thành công nhé :sunglasses: .

[Repo tại đây](https://github.com/daint2git/viblo.asia/tree/master/react-typescript)