> [Series NodeJS căn bản cho người mới bắt đầu](https://viblo.asia/s/nodejs-can-ban-cho-nguoi-moi-bat-dau-7LKXNqXrlV4)

> [Xem bài viết mới - ReactJS -Những câu hỏi phỏng vấn thường gặp - Phần 1](https://viblo.asia/p/reactjs-nhung-cau-hoi-phong-van-thuong-gap-phan-1-Ljy5VDkbZra)
## 1. Query parameters là gì?

Hôm nay chúng ta sẽ tìm hiểu về query parameters trong NodeJS. Vậy nó là gì?

Query parameters là một chuỗi truy vấn được client gửi lên server. Server sẽ nhận các thông tin này để xử lý và trả về một kết quả phù hợp với truy vấn được gửi lên

## 2. Query trong URL

Các chuỗi truy vấn có thể được đính kèm trong một URL. Trong URL, các truy vấn sẽ bắt đầu từ sau dấu ***?*** , mỗi truy vấn là một cặp {key:value}, các cặp ngăn cách nhau bởi kí tự ***&*** tạo thành một object gọi là param và được gửi lên server. Ví dụ:

> Với URL: http://example.com/users?name=viblo&age=20 sẽ được chuyển thành object là:

```javascript
{
    name: "viblo",
    age: "20"
}
```

## 3. Xây dựng chức năng tìm kiếm
### 3.1. Xây dựng chức năng tìm kiếm user theo tên

> Đầu tiên, ta sẽ tạo một route để có thể tìm kiếm user, ở đây mình sẽ tạo một route tại /users/search. Chức năng này để lấy các user phù hợp với truy vấn, nên ta sẽ dùng method là ***get*** . 
```javascript:nodeapp/app.js
app.get('/users/search', (req,res) => {
	// search and return here
})
```

Ở trên mình đã viết hàm theo chuẩn [ES6](https://www.w3schools.com/js/js_es6.asp), các bạn có thể tìm hiểu thêm nhé, hoặc viết như các bài học trước cũng được

> Tạo một form HTML để search, mình sẽ tạo tại trang index của users
```html
form.seach-form(action="/users/search")
  input(name="name", type="text", placeholder="name")
  input(type="submit")
```

![](https://images.viblo.asia/db107640-cdd3-4716-b2eb-5a3eaf0198f2.png)

Nhắc lại một chút kiến thức cũ về HTML  
* Thuộc tính action quy định đường dẫn mà dữ liệu của form sẽ được gửi đến
* Với mỗi thẻ input, thuộc tính name sẽ tương ứng với key, giá trị của mỗi trường input tương ứng value trong mỗi cặp query

Hãy thử nhập một cái tên nào đó, ví dụ "User1", Inspect trang web và chọn tab Network, bạn sẽ thấy một request được gửi lên
![](https://images.viblo.asia/20bee53c-3619-4395-a5d6-0e05ece19410.png)

Bây giờ, ta sẽ xem server đã nhận được request này chưa nhé!!! Đối tượng req cung cấp cho ta một thuộc tính ***query*** để lấy được query mà client gửi lên. Hãy thử in nó ra nhé!!!

```javascript:nodeapp/app.js
app.get('/users/search', (req,res) => {
	console.log(req.query);
})
```

Tại của sổ cmd, bạn sẽ thấy kết quả như sau:
```
{name: 'User1'}
```

Như vậy là server đã nhận được yêu cầu từ client, Bây giờ ta sẽ thực hiện tìm kiếm user. Ở bài trước, mình đã khai báo một mảng array gồm các user trong route '/users'. Để các route khác có thể sử dụng, ta sẽ đưa array này ra ngoài. Mã nguồn file *app.js* bây giờ sẽ như sau:

```javascript:nodeapp/app.js
const express = require('express'); // Require module express vào project
const app = express(); // Tạo một app mới
const port = 8080; // Định nghĩa cổng để chạy ứng dụng NodeJS của bạn trên server

app.set('views', './views'); // Thư mục views nằm cùng cấp với file app.js
app.set('view engine', 'pug'); // Sử dụng pug làm view engine

var users = [
	{name: "User1", email: "user1@gmail.com"}, 
	{name: "User2", email: "user2@gmail.com"}
];

app.get('/', function(req, res){
	res.send("<h2>This is my first app</h2>");
})

app.get('/users', function(req, res){
	res.render('users/index',{
		users: users
	});
})

app.get('/users/search', (req,res) => {
	console.log(req.query);
})

app.listen(port, function(){
    console.log('Your app running on port '+ port);
})
```

Tiếp tục, ta sẽ xử lý việc tìm kiếm. Việc này bây giờ trở nên đơn giản, vì các bạn đã học JavaScript, và đã biết cách tìm "một chuỗi con trong chuỗi cha" rồi. Nên mình sẽ không giải thích chi tiết nữa nhé!!! Phần này các bạn có thể tìm hiểu một cách dễ dàng

```javascript:nodeapp/app.js
app.get('/users/search', (req,res) => {
	var name_search = req.query.name // lấy giá trị của key name trong query parameters gửi lên

	var result = users.filter( (user) => {
		// tìm kiếm chuỗi name_search trong user name. 
		// Lưu ý: Chuyển tên về cùng in thường hoặc cùng in hoa để không phân biệt hoa, thường khi tìm kiếm
		return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1
	})

	res.render('users/index', {
		users: result // render lại trang users/index với biến users bây giờ chỉ bao gồm các kết quả phù hợp
	});
})
```

Như vậy là hoàn thành việc tìm kiếm và trả về kết quả. Ta sẽ hiệu chỉnh lại mã HTML một chút ứng với 2 trường hợp
* Nếu biến users có length > 0, tức là tồn tại user, thì hiển thị các user đó
* Ngược lại, hiển thị "No user to display"

```html:nodeapp/views/users/index.pug
form.seach-form(action="/users/search")
  input(name="name", type="text", placeholder="name")
  input(type="submit")

.users 
  h2 All users
  if users.length > 0
    table
      thead
        tr
          th  Name 
          th  Email 
      tbody
        each user in users
          tr
            td=  user.name 
            td=  user.email
  else
    p No user to display
```

Xong!!! Các bạn hãy thử test chức năng này nhé
![](https://images.viblo.asia/c5770998-0f00-4189-991f-ff1dbf8a601a.png)
### 3.2 Xây dựng chức năng tìm kiếm user theo tên và theo tuổi

> Ta sẽ thêm một trường tuổi vào array users
```javascript:nodeapp/app.js
var users = [
	{name: "User1", email: "user1@gmail.com", age: 31}, 
	{name: "User2", email: "user2@gmail.com", age: 20},
	{name: "User1", email: "user1.2@gmail.com", age: 25}
];
```
Ta sẽ thấy có 2 user cùng có name là "User1", nhưng tuổi (age) khác nhau. Trường email là trường khóa chính, để phân biệt giữa các user

> Hiệu chỉnh lại mã HTML để hiển thị tuổi, cũng như thêm input age để tìm kiếm

```html:nodeapp/views/users/create.pug
form.seach-form(action="/users/search")
  input(name="name", type="text", placeholder="name")
  input(name="age", type="text", placeholder="age")
  input(type="submit")

.users 
  h2 All users
  if users.length > 0
    table
      thead
        tr
          th  Name 
          th  Email
          th  Age 
      tbody
        each user in users
          tr
            td=  user.name 
            td=  user.email
            td=  user.age
  else
    p No user to display
```

> Chỉnh lại chức năng tìm kiếm (thêm điều kiện theo tuổi)

```javascript:nodeapp/app.js
app.get('/users/search', (req,res) => {
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
```

Hãy thử gửi một request mới lên nhé. Nó sẽ bao gồm cả name và age cần tìm kiếm
![](https://images.viblo.asia/1a48445f-1ac2-49a4-a444-6ad05d1352a8.png)

Cuối cùng, chúng ta đã làm được chức năng tìm kiếm. Các bạn có thể tự sáng tạo và nâng cấp chức năng này để hoàn thiện hơn. Thông qua bài này, ta đã học thêm được về ***req.query*** cũng như biết thêm về cú pháp ***if...else*** trong pug

Hẹn gặp lại các bạn trong các bài viết tiếp theo !!!