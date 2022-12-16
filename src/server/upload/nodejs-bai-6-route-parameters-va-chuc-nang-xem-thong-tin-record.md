> [Series NodeJS căn bản cho người mới bắt đầu](https://viblo.asia/s/nodejs-can-ban-cho-nguoi-moi-bat-dau-7LKXNqXrlV4)

Ở bài trước chúng ta đã có thể tạo mới một user, hôm nay, chúng ta sẽ xây dựng chức năng xem chi tiết thông tin về user

> Như bài trước mình đã nói, mỗi user có một email khác nhau để phân biệt. Tuy nhiên, trong thực tế, khi thông tin được lưu trong CSDL, vẫn sẽ có một trường ***id*** cho mỗi record (ở đây là user). Ta sẽ thêm trường này vào users array mà ta đã có

```javascript:nodeapp/app.js
var users = [
	{id: 1, name: "User1", email: "user1@gmail.com", age: 31}, 
	{id: 2, name: "User2", email: "user2@gmail.com", age: 20},
	{id: 3, name: "User1", email: "user1.2@gmail.com", age: 25}
];
```

Ngoài ra, ở trang index, khi thông tin về một record quá nhiều, ta không thể hiển thị hết thông tin, mà chỉ hiển thị thông tin cơ bản nhất. Sau đó, với mỗi record, ta sẽ có một trang riêng để hiển thị chi tiết toàn bộ các thông tin

Các trang này được đánh dấu theo một quy ước đường dẫn chung nào đó. Ví dụ có thể là [http://localhost/8000/users/id]() . Trong đó ***id*** là trường id của record. Với users array như trên, ta có thể có các đường dẫn như sau:

```
User1 sẽ có đường dẫn là: http://localhost/8000/users/1
User2 sẽ có đường dẫn là: http://localhost/8000/users/2
User3 sẽ có đường dẫn là: http://localhost/8000/users/3 
```

Lúc đó, quy ước đường dẫn với một user sẽ là:
```
"http://localhost/8000/users/" + user.id
```

> Bây giờ, ta sẽ điều chỉnh mã HTML, để ở trang index của users, ta chỉ hiển thị tên của user đó. Sau đó, tạo một link dẫn đến trang xem chi tiết thông tin, mình sẽ gọi là trang ***show***

```html:nodeapp/views/users/index.pug
h2 Searching
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
          th  Action 
      tbody
        each user in users
          tr
            td=  user.name 
            td
              a(href="/users/" + user.id) View
  else
    p No user to display

a(href="/users/create") Create new user
```

Như vậy, mình tạo thêm một thẻ ***<a></a>*** có thuộc tính ***href*** là đường dẫn như quy ước ở trên. Hãy thử inspect element ta sẽ thấy các đường dẫn này

![](https://images.viblo.asia/0e01377a-9c6f-4607-8a2e-d263cd1afe41.png)

Như thường lệ, tiếp theo, ta sẽ tạo một route đến trang show.  Bây giờ ta thấy, có tổng cộng 3 users, với các kiến thức đã học ở bài trước, ta sẽ phải tạo 3 route như sau

```javascript
app.get('/users/1', (req, res) => {
    // do some thing here
})
app.get('/users/2', (req, res) => {
    // do some thing here
})
app.get('/users/3', (req, res) => {
    // do some thing here
})
```

Tuy nhiên, giả sử có 100 user, ta sẽ phải tạo 100 route như thế này, và tất nhiên, chẳng ai làm thế

Trong bài học này, ta đã thấy một điểm khác biệt khi route, đó là đường dẫn bây giờ không còn cố định như các đường dẫn '/users', '/users/search,...mà nó sẽ là đường dẫn động. Tùy vào chúng ta chọn user nào, thì đường dẫn sẽ dẫn đến trang chi tiết của user đó

Express hiểu được nhược điểm đó, và cung cấp cho chúng ta một loại route được gọi là ***Route parameters***. Ta có thể quy định phần quy ước chung thành một biến, giá trị biến này sẽ được xác định dựa vào parameters và đưa đến trang phù hợp. 

> Ta định nghĩa route này như sau:

```javascript:nodeapp/app.js
app.get('/users/:id', (req, res) => {
	// do some thing here
})
```
Ta thấy có dấu hai chấm ( : ) ở tham số url trong hàm get(). Ý nghĩa của nó là cho user biết rằng, id ở đây không phải là chữ ***id*** đơn thuần nữa, mà nó là một ***biến*** có giá trị thay đổi tùy theo parameters mà client gửi lên. vậy làm sao để ta có thể đọc được parameters này?

Express cũng cung cấp cho chúng ta thêm một thuộc tính mới của đối tượng ***req*** , đó là ***params*** . Hãy thử in nó ra xem thế nào

```javascript:nodeapp/app.js
app.get('/users/:id', (req, res) => {
	console.log(req.params);
})
```

Vào trang index users, click vào ***View***  của User1, và vào màn hình console, bạn sẽ thấy như sau:

```javascript
{id: '1'}
```

Tương tự, nếu click vào View của User2 hoặc User3, bạn sẽ thấy giá trị của nó sẽ là '2' hoặc '3'
Giá trị này, chính là giá trị của biến ***:id*** trong đường dẫn mà ta đã nói ở trên

> Nhiệm vụ tiếp theo, là ta sẽ lấy giá trị ***id*** này ra, tìm kiếm user có id tương ứng, và render trang ***show***

```javascript:nodeapp/app.js
app.get('/users/:id', (req, res) => {
    // Tìm user phù hợp với params id
	var user = users.find( (user) => {
		return user.id == parseInt(req.params.id);
	});
    
    // Render trang show, với một biến user được định nghĩa là user vừa tìm được
	res.render('users/show', {
    	user: user
    })
})
```

> Cuối cùng, ta sẽ tạo trang show như sau:

```html:nodeapp/views/users/show.pug
h2 Show user

p
	span User name: 
	span= user.name
p
	span User email:
	span= user.email
p
	span User age:
	span= user.age
```

Tại sao ta chỉ tạo 1 trang show, mà không phải là 3 trang tương ứng với số user? Cũng giống như việc route, ta không thể tạo 100 trang show cho 100 user. Đó là lý do tại sao ta định nghĩa một biến user có giá trị là user tìm được ở param id khi render trang show. Như vậy. khi view user nào, thì biến user sẽ là của user đó, từ đó việc hiển thị sẽ chính xác theo từng user. 

Hãy thử nghiệm bằng cách trở lại trang users index, và click vào nút View cho mỗi user, bạn sẽ thấy kết quả tương ứng với mỗi user trong users array

![](https://images.viblo.asia/5f85dfc2-9992-4d99-acfe-e081082c2b19.png)


***Tổng kết*** : Qua bài này, ta đã biết thêm được về *Route parameters*, cách tạo một route động và trang HTML động, cũng như biết thêm về thuộc tính ***params*** của đối tượng ***req***

Sẽ còn rất nhiều điều thú vị trong khóa học này, hẹn gặp lại các bạn trong cái bài viết tiếp theo