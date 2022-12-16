> [Series NodeJS căn bản cho người mới bắt đầu](https://viblo.asia/s/nodejs-can-ban-cho-nguoi-moi-bat-dau-7LKXNqXrlV4)  


Ở bài trước, ta đã sử dụng method GET để áp dụng vào chức năng liệt kê các user, cũng như thực hiện chức năng tìm kiếm

Ở bài hôm nay, ta sẽ áp dụng method POST - một method để gửi dữ liệu từ client và thêm vào dữ liệu của server để thực hiện chức năng ***tạo mới một user***

Để thực hiện chức năng này, ta gồm các bước sau  
>  Tạo một trang html chứa 1 form tạo mới user để người dùng có thể truy cập trang này và điền các thông tin về user mới và gửi lên server.  

```html:nodeapp/views/users/create.pug
h2 Create new user
form(action="/users/create" method="POST")
	label(id="name")
	input(type="text", placeholder="Your name", name="name")
	label(id="email")
	input(type="text", placeholder="Your email address", name="email")
	label(id="age")
	input(type="text", placeholder="Your age", name="age")
	input(type="submit")
```

> Tất nhiên là ta phải tạo một route GET tới trang này để user có thể truy cập vào trang này
```javascript:nodeapp/app.js
app.get('/users/create', (req, res) => {
	res.render('users/create')
})
```

> Tiếp theo, ta sẽ tạo một route với method là POST để user có thể gửi dữ liệu lên. Route này cũng có địa chỉ là '/users/create' như method GET

```javascript:nodeapp/app.js
app.post('/users/create', (req, res) => {
	// add new user here
})
```

Ta đã thấy được, tại một địa chỉ, có thể có nhiều method khác nhau. Ứng với mỗi method ta sẽ có cách xử lý riêng cho phù hợp

> Với method POST, để có thể nhận được dữ liệu, ta sẽ sử dụng [req.body](https://expressjs.com/en/api.html#req.body). Tuy nhiên, để sử dụng được nó, ta phải config trong file *app.js* như sau:

```javascript:nodeapp/app.js
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
```
> Thử in ***req.body*** ra màn hình console
```javascript:nodeapp/app.js
app.post('/users/create', (req, res) => {
	console.log(req.body)
})
```
 [req.body](https://expressjs.com/en/api.html#req.body) trả về một object tương tự như ***req.query*** . Hãy thử truy cập '/users/create', điền thông tin vào form và gửi lên server, ta sẽ có kết quả tương tự như thế này


```javascript
{
    name: "Your name",
    email: "my_email@gmail.com",
    age: "20"
}
```

> Giờ ta sẽ thêm users mới vào dữ liệu của hệ thống, ở đây sẽ là array users mà ta đã có ở các bài học trước, đồng thời điều hướng người dùng về trang index hiển thị tất cả các user, kể cả user vừa được tạo
 ```javascript:nodeapp/app.js
app.post('/users/create', (req, res) => {
	users.push(req.body);
	res.redirect('/users')
})
```
Mình sẽ bỏ qua phần kiểm tra tính hợp lệ của thông tin được gửi lên (ví dụ như email đã tồn tại,..), phần này mình sẽ hướng dẫn ở các bài viết nâng cao nhé!!! Tạm thời chúng ta quy ước dữ liệu gửi lên là hợp lệ

Và đây là kết quả:
![](https://images.viblo.asia/6cf292e5-1536-4b77-b6ad-96e128bf705c.png)

Ở đây, mình dùng [res.redirect()](https://expressjs.com/en/api.html#res.redirect) để điều hướng người dùng. Tham số của nó đơn giản là URL mà ta muốn điều hướng đến.  Ta sẽ không dùng ***res.render()*** trong trường hợp này, vì hàm này chỉ render ra 1 format HTML mà vẫn ở lại trang hiện tại. Còn đối với ***res.redirect()*** sẽ chuyển người dùng đến một trang khác (mà không reload lại trang)

> Cũng lưu ý rằng, hiện tại, chúng ta đang lưu trữ thông tin các user trong một array javascript, do đó khi F5 lại trang, ta sẽ mất đi những user được tạo động, chỉ bao gồm các user tĩnh mà ta đã thêm vào ở mã nguồn. Trong thực tế, ta sẽ lưu vào database. Phần này mình sẽ hướng dẫn các bạn trong các bài sau

Thông qua bài này, ta đã biết:  
* Cách dùng method POST để gửi dữ liệu lên server và kết hợp nhiều HTTP method trong một địa chỉ web 
* Sử dụng hàm ***res.redirect()***
* Sử dụng thuộc tính ***body*** của đối tượng ***req***

Hẹn gặp lại các bạn!!!