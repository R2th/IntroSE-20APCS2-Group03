# 1. Cài đặt
##  1.1.  Cài nodejs

B1: Bạn chỉ cần vào link bên dưới chọn tải về, rồi next, next để chạy thôi
[LINK](https://nodejs.org/en/)

B2: Bạn kiểm tra version, để xem cài oke chưa
```
node -v
npm -v
```

![image.png](https://images.viblo.asia/8c99980c-599b-4f7b-b3bf-bd58b33031ed.png)

## 1.2 Cài SASS

```
npm install -g sass
```

OKE vậy là cài xong môi trường nha! :D
# 2. Biên dịch SCSS sang CSS

Tạo 1 file scss  `style.scss`  có nội dung như đoạn code bên dưới. 
```
$primary__color: blue;
$background__color: #f1f1f1;
section {
  background-color: $background__color;
  h2 {
    color: $primary__color;
  }
}
```

Để biên dịch bạn vào thư mục chứa file `style.scss`, chạy lệnh này.
```
sass style.scss style.css
```
kết quả, nó sẽ tạo ra hai file mới đó là style.css và style.css.map
![image.png](https://images.viblo.asia/71e0d07e-d939-44b4-81bf-c3d6985b74d9.png)


> Có một vấn đề là ở css, code xong chỉ cần save file rồi reload trang là oke, nhưng mà giờ muốn tự động save thì sao ? Tôi thích câu hỏi của bạn? <3


Quá đơn giản mình cài đặt npm trong thư mục `SCSS` (vì mình tạo tên thư mục là `SCSS` nha, còn bạn đặt tên gì cũng được nghe :D)
# 3. Cài đặt SCSS trong npm project

B1: Chạy lệnh sau, thì nó sẽ tạo ra file `package.json`
```
npm init
```

B2: Cài đặt gói `node-sass`, chạy lệnh sau. Có bạn sẽ hỏi, phần 1.2 cài sass rồi mà giờ còn cài giề nữa :D,
tới đây thì mình hơi sorry nha, vì đã bắt bạn làm Phần 2 :(, mình chỉ muốn bạn hiểu hơn. là scss sẽ render phần code đã viết về css. còn mình dùng node-sass này thì nó auto render cho mình luôn nha :D.

```
npm install node-sass
```
Okay, sau khi chạy xong thì cấu trúc thư mục sẽ như hình bên dưới.

![image.png](https://images.viblo.asia/eceec866-13f8-419e-b965-1fa91416694d.png)

B3: Giờ bạn vào trong file `package.json` tìm và thay thế đoạn code bên dưới.

```
  "scripts": {
    "scss": "node-sass --watch style.scss -o css"
  }
```

Thay xong thì nó sẽ như này.

![image.png](https://images.viblo.asia/f785c47a-fd4a-44f0-a8c6-839e7b4f8a5e.png)


Cuối cùng muốn biên dịch tự động thì run command này

```
npm run scss
```
Oke, giờ muốn test thì tạo một file html, liên kết đến cái file `/css/style.css` được tạo ra khi bạn run dòng lên `npm run scss` là xong.
Được rồi giờ bạn, chỉnh scss đi, rồi save lại thì nó sẽ auto change nha. Tận hưởng đi :D.
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Title</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <link rel="stylesheet" href="./css/style.css" />
  </head>
  <body>
    <h1 class="title">Hello world! I'm comming</h1>
  </body>
</html>
```
Kết quả đây nha !
![image.png](https://images.viblo.asia/b481d9c4-b3cd-41d4-9dda-33989df8ba67.png)

Cảm ơn bạn đã đi cùng HoaL :). Bye, see you next time !