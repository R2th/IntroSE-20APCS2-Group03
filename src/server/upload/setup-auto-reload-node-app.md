Bài viết này tôi sẽ hướng dẫn các bạn cách setup node app auto reload.

Chúng ta sẽ sử dụng express framework và dùng express generator để scafold project.
```
npx express-generator -p express --view=ejs myapp
```

Tôi thường sử dụng npx để install các package như  `create-react-app`, `express-generator` thay vì install global bằng câu lệnh `npm i -g`.

Sau khi scalfold project với `express-generator` ta sẽ sử dụng `nodemon` để auto reload. Nodemon sẽ tự động watch file change và reload server.

Mở file  `package.json` và thêm script sau.

```
script: {
    "start:dev": "nodemon ./bin/www -ext ejs,js"
}
```

Nodemon sẽ watch thay đổi ở các file với extension `ejs`, `js`. Bạn có thể thay `ejs` bằng các extension khác nếu bạn sử dụng view engine khác `ejs`.

Với setup ở trên nodemon sẽ tự động restart lại server mỗi khi ta thay đổi file. Tuy nhiên để có thể tự động hot reload ở client (browser) ta sẽ sử dụng thêm `reload` package. `reload` sẽ setup websocket connect ở port default `9856`.

```
npm i reload
```

Thêm dòng lệnh sau vào file `app.js` ngay sau tất cả các route. `reload(app)`. Bạn nhớ require `reload`.

Sau cùng chúng ta sẽ require 1 script ở file `index.ejs` để setup websocket connect. Thêm dòng lệnh sau vào file `index.ejs`.

```
<script src="/reload/reload.js"></script> 
```

Các bước setup đã xong. Giờ ta chạy câu lệnh `npm run start:dev` . Mở trình duyệt và access url `localhost:3000` bạn thử thay đổi file và sẽ thấy sự thay đổi ở browser.

Happy coding.