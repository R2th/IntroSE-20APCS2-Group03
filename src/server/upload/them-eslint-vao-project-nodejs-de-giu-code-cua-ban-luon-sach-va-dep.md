Bài viết gốc tại [Thêm ESLint vào Project NodeJS để giữ code của bạn luôn "sạch" và "đẹp"](https://www.tuann.dev/2022/09/them-eslint-vao-project-nodejs-de-giu-code-sach-dep.html)

Để giữ code của mình theo một phong cách nhất quán cũng như để người khác dễ "dọn dẹp" sau đó thì chúng ta cần đặt ra một quy chuẩn cho code.

Ở đây mình sử dụng ESLint cho project NodeJS của mình.

![](https://images.viblo.asia/afa41481-751d-4d63-af4d-c5cd3cbaa5c0.gif)

# 1. Cài đặt môi trường
Đầu tiên, bạn hãy mở mục Extensions trong VS Code rồi tìm kiếm ESLint và cài đặt nó.

![](https://images.viblo.asia/483ab788-bd9d-43ca-886c-39d0ae41ce75.png)

Tiếp theo đó, chúng ta mở CMD để tạo project NodeJS và mở nó bằng VS Code:

`mkdir node-eslint && cd node-eslint && npm init -y && code .`

Tiếp theo, mở Terminal trong VS Code và chạy lệnh init ESLint:

`npm init @eslint/config`

![](https://images.viblo.asia/86b09ce4-2c50-4c35-b4a1-a54e4ad9a649.png)

Chọn `To check syntax, find problems and enforce code style`.

![](https://images.viblo.asia/8b5c2100-7de3-4beb-b52c-55ac121fe37e.png)

Chọn tiếp `CommonJS (require/exports)`.

![](https://images.viblo.asia/bee51f06-304d-4599-b78e-6dc19b725232.png)

Chọn `None of these`.

![](https://images.viblo.asia/e79a8c64-0f5f-4c2c-8d94-804d57617558.png)

Ở đây minh không sử dụng Typescript nên chọn tiếp vào `No`.

![](https://images.viblo.asia/6693afeb-2bd9-4a49-b117-9ae7eeb6a744.png)

Mục tiêu chỉ chạy NodeJS nên mình bỏ tick `Browser` và tick vào `Node`.

![](https://images.viblo.asia/55622fec-6f68-45a5-a095-c1ffce9cff98.png)

Chọn `Use a popular style guide`.

![](https://images.viblo.asia/a414d974-201f-4d74-93f9-d72d3275e92b.png)

Tiếp theo chọn `Standard` thay vì `Airbnb` vì mình thấy nó "xịn" hơn.

![](https://images.viblo.asia/1b6a16ce-abcc-4096-abfc-a3d4d811edc2.png)

Chọn định dạng của file config, ở đây mình chọn `Javascript`.

![](https://images.viblo.asia/ff495667-89bb-4a32-b9fa-5b45dfbbb801.png)

Chọn `Yes` để cài đặt các package hỗ trợ cho ESLint.

![](https://images.viblo.asia/4859b1a7-f1f1-4091-a500-8d35a7a4fc9e.png)

Chọn `npm` hoặc `yarn` tùy thích với các bạn, ở đây mình chọn `yarn`.

![](https://images.viblo.asia/b880c652-1427-4c68-9f51-6ea1377c0bd5.png)

Sau khi chạy xong, chúng ta sẽ có được file `.eslintrc.js` chứa các config và rules của project.

![](https://images.viblo.asia/f780997b-0663-4a56-b26b-3d9d4edb8d97.png)

# 2. Sử dụng ESLint
Có 2 cách phổ biến để bạn có thể sử dụng ESLint cho project của mình là:
* Sử dụng lệnh trong Terminal
* Sử dụng command của VS Code
## 2.1. Sử dụng lệnh trong Terminal
Để chạy lệnh thuận tiện thì chúng ta có 2 cách.

Cách 1: Chạy trực tiếp lệnh sau ở Terminal

`eslint --fix ./*.js`

Cách 2: Thêm lệnh vào scripts trong file `package.json`.

`"lint:fix": "eslint --fix ./*.js"`

![](https://images.viblo.asia/0d8fec8b-ed5c-4175-999f-f839b9954b8d.png)

Sau đó chạy nó trong Terminal

![](https://images.viblo.asia/5485c4f1-6ac2-437a-a9de-2cc55a68d2c5.png)

Sau khi chạy một trong hai cách trên, nó sẽ tự động sửa các lỗi đang có trong project của bạn.
## 2.2. Sử dụng command của VS Code.
Trong VS Code, chúng ta sử dụng command sau để bật tính năng của ESLint

`Ctrl + Shift + P`

sau đó nhập vào:

`ESLint: Fix all auto-fixable Problems`

và enter, ESLint sẽ tự động sửa lỗi trong file `.js` mà bạn đang mở.

![](https://images.viblo.asia/459c1ad7-d4cc-400b-8659-e57e329d9a80.png)

Và đây là kết quả:

![](https://images.viblo.asia/1297c47b-9bbe-4bd1-9b73-e31e4b1533b3.png)

Kết luận
Cảm ơn các bạn đã ghé thăm, hi vọng sau khi áp dụng ESLint vào thì sẽ không để "thằng" code sau bạn vừa code vừa "chửi thằng code trước" nữa. hia hia