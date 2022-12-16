> [Series NodeJS căn bản cho người mới bắt đầu](https://viblo.asia/s/nodejs-can-ban-cho-nguoi-moi-bat-dau-7LKXNqXrlV4)   


Như đã nói, trong bài số 8 này, chúng ta sẽ tìm hiểu về ***controller***, thành phần tiếp theo của mô hình MVC

Trong các bài trước, ta có thể phân chia việc xử lý trong các file route thành 2 phần

- Phần 1: Định nghĩa route cho 1 request
- Phần 2: Viết các câu lệnh xử lý cho route đó

Tuy nhiên, trong thực tế, chúng ta sẽ không làm vậy. Đối với file route chúng ta chỉ thực hiện Phần 1. Còn đối với Phần 2, chúng ta sẽ tách riêng thành các file khác, gọi là ***controller***. Sau đó sẽ liên kết 2 phần này lại với nhau

Việc làm này sẽ giúp chúng ta tuân thủ mô hình MVC. Rõ ràng, đoạn mã xử lý được tách riêng sẽ giúp chúng ta dễ dàng quản lý, nâng cấp hơn, tính tái sử dụng cũng sẽ cao hơn. Bắt tay vào làm ngay nhé:

> Tạo một folder mới có tên là ***controllers*** trong thư mục ***nodeapp*** . Đây sẽ là thư mục chứa các file controller của chúng ta
```
|--nodeapp
|----controllers
```

> Tiếp theo, tạo một file ***user.js*** để xử lý các công việc liên quan đến đối tượng user
```javascript:nodeapp/routes/user.js
// handle user
```

Ở bài trước, ta đã có đoạn routes trang index của users như sau
```javascript:nodeapp/routes/user.js
user_router.get('/', function(req, res){
	res.render('users/index',{
		users: users
	});
})
```

> Bây giờ, ta sẽ tách phần xử lý (chính là function(req,res)) qua tập tin phần controller nhé. Xem đoạn code sau trong file controllers/user.js:
```javascript:nodeapp/controllers/user.js
module.exports = {
    index:  function(req, res){
                res.render('users/index',{
                    users: users
                });
            }
};
```
Ở đây, ta sử dụng module.exports để xuất nội dung, cái này mình đã nói ở các bài trước. Lần này, nội dung của nó là 1 JavaScript Object, là tập hợp các cặp key:value. Cái này các bạn đã được học ở JavaScript

Trong đoạn code trên, bạn có thể thấy mình định nghĩa ***key*** chính là index, còn ***value*** của nó là hàm mà mình tác từ user_routes

> Ồ, nhưng biến users trong đoạn mã trên từ đâu ra nhỉ. À, nó chính là mảng các users ở file routes, ta sẽ chuyển nó qua luôn nhé
```javascript:nodeapp/controllers/user.js
var users = [
	{id: 1, name: "User1", email: "user1@gmail.com", age: 31}, 
	{id: 2, name: "User2", email: "user2@gmail.com", age: 20},
	{id: 3, name: "User1", email: "user1.2@gmail.com", age: 25}
];

module.exports = {
    index:  function(req, res){
                res.render('users/index',{
                    users: users
                });
            }
};
```

> Tiếp theo, ta sẽ liên kết giữa controller và route thông qua phương thức _*require*_
```javascript:nodeapp/routes/user.js
// Require user controller
const user_controller = require('../controllers/user');
```

Như vậy, biến ***user_controller*** bây giờ chính là object mà ta đã export ở file _*controller/user.js*_. Do đó, ta sẽ sửa phần route trang index của users thành như sau:

```javascript:nodeapp/routes/user.js
user_router.get('/', user_controller.index) // Lấy hàm ở key index
```

OK!!! Bây giờ hãy thử khởi động là app.js, và truy cập lại vào [http://localhost:8080/users/](http://localhost:8080/users/) để xem kết quả. Mọi thử vẫn diễn ra bình thường, như vậy, ta đã làm đúng

Cuối cùng, bạn hãy tiếp tục thực hiện tách các đoạn xử lý của user route qua controller cho các route còn lại nhé!!! Bài tập thực hành cho bạn đấy (Lời giải mình sẽ để ở dưới, nhưng hãy tự làm trước khi xem lời giải nha)

> Sau khi thực hiện bài tập trên, ta sẽ có kết quả của 2 file như sau:

```javascript:nodeapp/controllers/user.js
var users = [
	{id: 1, name: "User1", email: "user1@gmail.com", age: 31}, 
	{id: 2, name: "User2", email: "user2@gmail.com", age: 20},
	{id: 3, name: "User1", email: "user1.2@gmail.com", age: 25}
];

module.exports = {
    index:  function(req, res) {
        res.render('users/index',{
            users: users
        });
    },
    search: function(req, res) {
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
    },
    get_create: function(req, res) {
        res.render('users/create');
    },
    post_create: function(req, res) {
        users.push(req.body);
        res.redirect('/users')
    },
    show: function(req, res) {
        var user = users.find( (user) => {
            return user.id == parseInt(req.params.id);
        });
        res.render('users/show', {
            user: user
        })
    }
};
```

```javascript:nodeapp/routes/user.js
const express = require('express');
const user_router = express.Router();

// Require user controller
const user_controller = require('../controllers/user');

user_router.get('/', user_controller.index) // Lấy hàm ở key index

user_router.get('/search', user_controller.search)

user_router.get('/create', user_controller.get_create)

user_router.post('/create', user_controller.post_create)

user_router.get('/:id', user_controller.show)

// Exports cho biến user_router
module.exports = user_router;
```

Như vậy, đoạn code đã trở nên gọn gàng, dễ sử dụng, nâng cấp hơn đúng không nào. Thông qua bài này, hy vọng các bạn đã nắm được về ***controller***. Hẹn gặp lại các bạn trong bài sau