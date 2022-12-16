> [Series NodeJS căn bản cho người mới bắt đầu](https://viblo.asia/s/nodejs-can-ban-cho-nguoi-moi-bat-dau-7LKXNqXrlV4)

Trong các bài học vừa qua, ta đã biết cách route cho rất nhiều trang HTML cho các chức năng như liệt kê các user, tìm kiếm user, hiển thị thông tin chi tiết user, tạo mới user,...

Điều mình muốn nói đến là, tất cả các dòng lệnh route này mình đều đặt trên một file *app.js* . Vậy nó có tốt???

Để trả lời câu hỏi này, ta hãy dựa vào thực tế một chút: Trong các dự án, ta không chỉ đơn giản là quản lý về user, mà còn có hàng tá, hàng tấn thứ khác. Vi dụ như một trang web bán hàng như Thế giới di động, hay lazada, shopee,... ta sẽ phải quản lý thêm các thông tin về các đối tượng như : ***Sản phẩm, Bình luận, Đơn hàng, Phân loại*** , vân vân và mây mây. 

Do đó, ta sẽ phải có cực kỳ nhiều dòng lệnh route cho mỗi đối tượng. Việc đặt tất cá các dòng lệnh này trong một file *app.js* như thế này thì chương trình vẫn chạy ổn, nhưng việc sửa chửa, nâng cấp và bảo trì sẽ cực kỳ khó khăn. Hãy tưởng tượng file này có thể lên đến cả ngàn dòng thì tìm thôi cũng đủ mệt

Vậy, giải pháp đặt ra là gì? Đó là ta sẽ phân chia các route này theo từng đối tượng. Mỗi đối tượng có một file route riêng, như vậy, việc bảo trì sẽ dễ dàng hơn rất nhiều

Ta sẽ bắt tay vào thực hành việc này với đối tượng user mà ta đã có

> Tạo một folder mới có tên là ***routes*** trong thư mục ***nodeapp*** . Đây sẽ là thư mục chứa các file route của chúng ta

```
|--nodeapp
|----routes
```

> Tiếp theo, tạo một file ***user.js*** để quản lý các route liên quan đến đối tượng user
```javascript:nodeapp/routes/user.js
// route for user here
```

> Để express có thể hiển được, ta sẽ tạo mới một đối tượng route. Express cung cấp cho ta phương thức ***Router()*** để tạo mới một router. Đừng quên require express trước nhé

```javascript:nodeapp/routes/user.js
const express = require('express');
const user_router = express.Router();
```

> Bây giờ, ta sẽ copy toàn bộ array users và các route liên quan đến user từ file *app.js* sang file *user.js* . Sau đó, ta sẽ thay ***app*** bằng ***user_router*** , đồng thời, xóa đi ***/users*** cho tham số đầu tiên của các route (lý do là ta đã quy định đây là route cho user rồi, nên không cần đến ***/users*** nữa

```javascript:nodeapp/routes/user.js
const express = require('express');
const user_router = express.Router();

var users = [
	{id: 1, name: "User1", email: "user1@gmail.com", age: 31}, 
	{id: 2, name: "User2", email: "user2@gmail.com", age: 20},
	{id: 3, name: "User1", email: "user1.2@gmail.com", age: 25}
];

user_router.get('/', function(req, res){
	res.render('users/index',{
		users: users
	});
})

user_router.get('/search', (req,res) => {
	var name_search = req.query.name // lấy giá trị của key name trong query parameters gửi lên
	var age_search = req.query.age // lấy giá trị của key age trong query parameters gửi lên
	var result = users.filter( (user) => {
		// tìm kiếm chuỗi name_search trong user name. 
		// Lưu ý: Chuyển tên về cùng in thường hoặc cùng in hoa để không phân biệt hoa, thường khi tìm kiếm
		return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1 && user.age === parseInt(age_search)
	})

	res.render('users/index', {
		users: result // render lại trang users/index với biến users bây giờ chỉ bao gồm các kết quả phù hợp
	});
})

user_router.get('/create', (req, res) => {
	res.render('users/create');
})

user_router.post('/create', (req, res) => {
	users.push(req.body);
	res.redirect('')
})

user_router.get('/:id', (req, res) => {
	console.log(req.params);
	var user = users.find( (user) => {
		return user.id == parseInt(req.params.id);
	});
	res.render('users/show', {
    	user: user
    })
})
```

Các phần code còn lại không có gì thay đổi, các bạn có thể so sánh giữa 2 file này nhé

Công đoạn cuối cùng, là ta phải export file ***user.js*** này để có thể require nó vào trong file ***app.js***. Vì như mình đã nói ở các bài trước, khi server khởi chạy nó sẽ đọc thông tin từ file app.js. Do đó, ta sẽ phải require file ***user.js*** này để server có thể đọc được

> Thêm module.exports = user_router vào ***cuối*** file user.js
```javascript:nodeapp/routes/user.js
// Exports cho biến user_router
module.exports = user_router;
```

Những bạn nào đã học JavaScript rồi thì sẽ biết về module.exports này. Bạn nào chưa rõ thì có thể tham khảo bài viết này nhé: [Module exports](https://www.tutorialsteacher.com/nodejs/nodejs-module-exports)

> Sau khi exports, ta sẽ require vào file app.js
```javascript:nodeapp/app.js
// Require user route
const userRoute = require('./routes/user')
```

> Sau đó, ta sẽ phải định nghĩa cách dùng route này. Ở đây, ta sẽ định nghĩ các route cho đối tượng user, tức là các đường dẫn bắt đầu bằng '/users' mà ta đã xóa ở trên. 

```javascript:nodeapp/app.js
// Dùng userRoute cho tất cả các route bắt đầu bằng '/users'
app.use('/users', userRoute);
```

Vậy là ta đã hoàn tất việc phân chia route cho đối tượng user, xem lại code của 2 file *app.js* và *user.js* nhé

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

// Dùng userRoute cho tất cả các route bắt đầu bằng '/users'
app.use('/users', userRoute);

app.get('/', function(req, res){
	res.send("<h2>This is my first app</h2>");
})


app.listen(port, function(){
    console.log('Your app running on port '+ port);
})
```

```javascript:nodeapp/routes/user.js
const express = require('express');
const user_router = express.Router();

var users = [
	{id: 1, name: "User1", email: "user1@gmail.com", age: 31}, 
	{id: 2, name: "User2", email: "user2@gmail.com", age: 20},
	{id: 3, name: "User1", email: "user1.2@gmail.com", age: 25}
];

user_router.get('/', function(req, res){
	res.render('users/index',{
		users: users
	});
})

user_router.get('/search', (req,res) => {
	var name_search = req.query.name // lấy giá trị của key name trong query parameters gửi lên
	var age_search = req.query.age // lấy giá trị của key age trong query parameters gửi lên
	var result = users.filter( (user) => {
		// tìm kiếm chuỗi name_search trong user name. 
		// Lưu ý: Chuyển tên về cùng in thường hoặc cùng in hoa để không phân biệt hoa, thường khi tìm kiếm
		return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1 && user.age === parseInt(age_search)
	})

	res.render('users/index', {
		users: result // render lại trang users/index với biến users bây giờ chỉ bao gồm các kết quả phù hợp
	});
})

user_router.get('/create', (req, res) => {
	res.render('users/create');
})

user_router.post('/create', (req, res) => {
	users.push(req.body);
	res.redirect('')
})

user_router.get('/:id', (req, res) => {
	console.log(req.params);
	var user = users.find( (user) => {
		return user.id == parseInt(req.params.id);
	});
	res.render('users/show', {
    	user: user
    })
})

// Exports cho biến user_router
module.exports = user_router;
```

Bây giờ, các bạn hãy khởi động lại server và test lai các chức năng nhé. Nó sẽ hoạt động không khác gì các bài trước. Tuy nhiên, một lần nữa ta đã làm cho code rõ ràng, dễ bảo trì và sửa chửa hơn rất nhiều

Bài học này có phần phức tạp hơn các bài học trước, hy vọng các bạn sẽ làm được. Thử thách cho các bạn để thực hành cho bài học này là: ***Hãy tạo các route cho đối tượng post bao gồm các thông tin là title và content, các route này tương tự các route về user*** . Nếu có thắc mắc gì hãy comment để cùng nhau giải đáp nhé!!!

Bài sau chúng ta sẽ tìm hiểu về ***controller*** . Hẹn gặp lại các bạn