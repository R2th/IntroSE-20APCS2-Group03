> [Series NodeJS căn bản cho người mới bắt đầu](https://viblo.asia/s/nodejs-can-ban-cho-nguoi-moi-bat-dau-7LKXNqXrlV4)   

Ở bài trước, chúng ta đã tìm hiểu về ***controller***. Hôm nay, chúng ta sẽ nghỉ giải lao, không học thêm nội dung mới, mà mình sẽ giới thiệu cho các bạn một package, nó sẽ giúp cho các bạn tiết kiệm thời gian hơn trong việc lập trình NodeJS. Package này có tên là ***Nodemon***

Trước đây, khi bạn thay đổi một đoạn code, bạn sẽ phải thực hiện thao tác khởi động lại server thông qua lệnh "node app.js" để server nhận code mới. Điều này sẽ mất khá nhiều thời gian cho các bạn.

Với Nodemon, bạn sẽ không cần làm điều đó, server sẽ tự động làm cho bạn. Trang github của nodemon có địa chỉ tại đây: [https://github.com/remy/nodemon](https://github.com/remy/nodemon)

> Bây giờ, mình sẽ cài đặt nodemon cho project thông qua lệnh ***npm install --save-dev nodemon***
```
C:\User\DucPhuc> npm install --save-dev nodemon
> nodemon@2.0.3 postinstall D:\nodeapp\node_modules\nodemon
> node bin/postinstall || exit 0

Love nodemon? You can now support the project via the open collective:
 > https://opencollective.com/nodemon/donate

npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@~2.1.2 (node_modules\chokidar\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.3: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN nodeapp@1.0.0 No repository field.

+ nodemon@2.0.3
added 118 packages from 54 contributors and audited 386 packages in 10.685s

9 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Ở đây, các bạn thấy có một từ khoá mới đó là ***--save-dev***.  Vậy nó khác từ khoá ***--save*** ở các bài trước như thế nào?

- ***--save***: Tạo ***dependencies*** trong tập tin _*package.json*_, và nó sẽ được cài đặt trên cả 2 môi trường là development và production
- ***--save-dev***: Tạo ***devDependencies*** trong tập tin _*package.json*_, và chỉ được cài đặt trên cả môi trường là development

Mình chỉ muốn dùng nodemon cho môi trường development, nên mình sẽ dùng ***--save-dev*** nhé

> Tiếp theo, ta sẽ thêm vào key  ***scripts***_ trong file _*manifest.json*_ một cặp ***key: value*** như sau: ***"start": "nodemon app.js"***
```
{
  "scripts": {
    "start": "nodemon app.js", // Khởi động và đọc app.js cùng với npm
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Duc Phuc",
  "license": "ISC",
}
```

> Cuối cùng, vào cửa sổ cmd và gõ lệnh: ***npm start***
```
C:\User\DucPhuc> npm start
> nodeapp@1.0.0 start D:\nodeapp
> nodemon app.js

[nodemon] 2.0.3
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
Your app running on port 8080
```
Xong, như vậy là các bạn không cần phải tự tay khởi động lại server nữa nhé!!! Hãy thử chỉnh sửa email của một user nào đó và reload lại trình duyệt để xem có thay đổi như mong muốn không nha!!! Hẹn gặp lại các bạn trong bài sau