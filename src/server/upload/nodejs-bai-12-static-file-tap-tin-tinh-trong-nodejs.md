> [Series NodeJS căn bản cho người mới bắt đầu](https://viblo.asia/s/nodejs-can-ban-cho-nguoi-moi-bat-dau-7LKXNqXrlV4)  

Ở bài trước, chúng ta đã hoàn thiện phần nhúng Bootstrap vào dự án kết hợp với Template layout. Trên thực tế, dự án của chúng ta hoàn toàn có thể có thêm các tập tin tĩnh (static file). Các static file này có thể là file ảnh, file CSS, JS,..Nó sẽ được sử dụng vào các trang HTML của chúng ta, hay lưu các document dạng word, excel, pdf,... để cho phép người dùng tải về

Ở bài học hôm nay, ta sẽ tìm hiểu về cách lưu tập tin tĩnh và sử dụng nó

> Đầu tiên, mình sẽ tạo 1 thư mục có tên là "assets" trong thư mục "nodeapp". Bên trong thư mục này, mình tạo tiếp thư mục "images" để lưu các ảnh của dự án. Trong thư mục "images", mình sẽ tạo thêm 1 thư mục "users" để quản lý các ảnh liên quan đến "users"

```
|--nodeapp
|----assets
|------images
|--------users
```

Bài toán đặt ra hôm nay, là mỗi users sẽ có thêm 1 thuộc tính có tên là "avatar" để lưu ảnh đại diện. Mình sẽ chỉnh lại mảng thông tin user tại file "controllers/user.js" như sau:
```javascript:nodeapp/controllers/user.js
var users = [
	{id: 1, name: "User111", email: "user1@gmail.com", age: 31, avatar: 'assets/images/users/user1.png'}, 
	{id: 2, name: "User2", email: "user2@gmail.com", age: 20, avatar: 'assets/images/users/user2.png'},
	{id: 3, name: "User1", email: "user1.2@gmail.com", age: 25, avatar: 'assets/images/users/user3.png'}
];
```

Ở trên, mình đã thêm 1 thuộc tính avatar lưu đường dẫn ảnh cho mỗi user. Các bạn hãy lấy 3 bức ảnh bất kì và lưu vào thư mục "assets/images/users" và đặt tên như mảng trên nhé!!!

> Tiếp theo, mình sẽ điều chỉnh lại code HTML trong phẩn table hiển thị danh sách user ở file "users/index.pug" một chút bằng cách thêm 1 thẻ <img> để có thể hiển thị avatar cho từng user nhé
```html:nodeapp/views/users/index.pug
if users.length > 0
  table.table.table-bordered
    thead
      tr.bg-info.text-white
        th Avatar
        th  Name
        th  Email
        th  Age 
        th  Action 
    tbody
      each user in users
        tr
          td.text-center
            img(src=user.avatar, width="50px", height="50px")
          td=  user.name 
          td=  user.email
          td=  user.age 
          td
            a.btn.btn-info(href="/users/" + user.id) View
else
  p No user to display
```
Lúc này, khi các bạn reload lại trang index.pub, các bạn sẽ thấy các ảnh không được hiển thị dù đường dẫn đã đúng. Lý do, là Express chưa hiểu được rằng đường dẫn mà bạn cung cấp chứa 1 tập tin tĩnh, Do đó, nó sẽ hiểu rằng đó là 1 route bình thường, trong khi bạn không hề định nghĩa route cho nó. Do vậy, kết quả không được trả về.   

Với Express JS, ta sẽ cần khai báo thư mục chứa các tập tin tĩnh của chúng ta, để nó có thể gửi đúng dữ liệu mà ta muốn. Để khai báo 1 thư mục chứa tập tin tĩnh, Express cung cấp cú pháp sau:
```javascript
const app = express();
app.use(express.static('folder_name'))
```
Trong đó, biến 'folder_name' ở đây chính là tên folder chứa file tĩnh 
> Ở đây, mình lưu các file tĩnh trong thư mục "assets", do đó, mình sẽ điều chỉnh tập tin "app.js" như sau:
```javascript:nodeapp/app.js
const express = require('express'); // Require module express vào project
const app = express(); // Tạo một app mới
const port = 8080; // Định nghĩa cổng để chạy ứng dụng NodeJS của bạn trên server

// Require user route
const userRoute = require('./routes/user')

app.set('views', './views'); // Thư mục views nằm cùng cấp với file app.js
app.set('view engine', 'pug'); // Sử dụng pug làm view engine

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Khai báo static file
app.use(express.static('assets'))

// Dùng userRoute cho tất cả các route bắt đầu bằng '/users'
app.use('/users', userRoute);

app.get('/', function(req, res){
	res.send("<h2>This is my first app</h2>");
})


app.listen(port, function(){
    console.log('Your app running on port '+ port);
})
```

Các bạn có thể thấy, mình đã thêm dòng lệnh "app.use(express.static('assets'))" để chỉ định thư mục lưu tập tin tĩnh. 

> Các bạn cần lưu ý rằng, Express sẽ tìm kiếm các tập tin tĩnh bên trong thư mục được khai báo, do đó, trong URL của tập tin, bạn cần không được kèm tên của thư mục được khai báo. Như vậy, mình sẽ bỏ đi phần "assets/" trong URL của các avatar ở mảng users
```javascript:nodeapp/controllers/user.js
var users = [
	{id: 1, name: "User111", email: "user1@gmail.com", age: 31, avatar: 'images/users/user1.png'}, 
	{id: 2, name: "User2", email: "user2@gmail.com", age: 20, avatar: 'images/users/user2.png'},
	{id: 3, name: "User1", email: "user1.2@gmail.com", age: 25, avatar: 'images/users/user3.png'}
];
```

Oke, bây giờ, hãy reload lại trang "index.pug" xem sao nhé!!!

![](https://images.viblo.asia/e5f41970-3e31-45df-ab0d-cb78868efae8.png)

Vậy là chúng ta đã thành công trong việc sử dụng các static file trong dự án của mình rồi

Nếu các bạn muốn sử dụng nhiều thư mục để lưu các static file, bạn hoàn toàn có thể định nghĩa thêm cho chúng bằng cú pháp đã nêu ở trên. Ví dụ
```javascript
const app = express();
app.use(express.static('assets'))
app.use(express.static('public'))
app.use(express.static('another_static_folder'))
```

Các bạn cũng lưu ý rằng, khi các bạn định nghĩa nhiều thư mục chứa static file, thì Express sẽ ưu tiên cao hơn cho thư mục được khai báo trước. Tức là tập tin nào được tìm thấy trước thì sẽ được ưu tiên hiển thị nếu các tập tin có cùng đường dẫn (do đường dẫn không được chứa thư mục khai báo nên chuyện các đường dẫn trùng nhau giữa các thư mục là hoàn toàn có thể xảy ra)

Cuối bài học này sẽ là một bài tập nho nhỏ cho các bạn: Hãy tạo thêm các file CSS, JS tĩnh tuỳ ý trong dự án của bạn. Viết 1 vài dòng code vào các file đó. Sau đó, nhúng các file này vào các trang HTML sao cho nó hoạt động như những gì bạn viết trong các file CSS, JS. Làm xong bài tập này, thì hãy thư giãn, và chờ đến bài học tiếp theo nhé. Hẹn gặp lại các bạn