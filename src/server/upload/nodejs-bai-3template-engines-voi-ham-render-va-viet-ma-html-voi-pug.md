> [Series NodeJS căn bản cho người mới bắt đầu](https://viblo.asia/s/nodejs-can-ban-cho-nguoi-moi-bat-dau-7LKXNqXrlV4) 

Ở bài trước, các bạn đã có thể dùng hàm ***send()*** để trả về một mã HTML khi client gửi request
```javascript:nodeapp/app.js
app.get('/', function(req, res){
	res.send("<h2>This is my first app</h2>");
    // res.send("Hello World");
})
```

Bây giờ, ta xét một ví dụ mới như sau: **Khi user truy cập vào địa chỉ có dạng: '/users', ta sẽ hiển thị danh sách các users hiện có trên hệ thống ra trình duyệt**


> Đầu tiên, ta sẽ phải thêm một route đến '/users' để server nhận biết được đường dẫn này
```javascript:nodeapp/app.js
app.get('/users', function(req, res){
	// do something here
})
```

> Giả sử chúng ta có 2 users có name và email là {name: user1, email: user1@gmail.com} và {name: user2, email: user2@gmail.com}. Ta có đoạn code HTML sau để hiển thị 2 user này
```html
<div class="users">
	<table>
        <thead>
          <tr>
                <th> Name </th>
                <th> Email </th>
          </tr>	
        </thead>
        <tbody>
          <tr>
              <td> User1 </td>
              <td> user1@gmail.com </td>
          </tr>
          <tr>
            <td> User2 </td>
            <td> user2@gmail.com </td>
          </tr>
        </tbody>
  </table>	
</div>	
```

> Thêm đoạn code HTML trên vào method ***send()*** để server có thể trả về cho client
```javascript:nodeapp/app.js
app.get('/users', function(req, res){
	res.send('<div class="users"><table><thead><tr><th> Name </th><th> Email </th></tr></thead><tbody><tr><td> User1 </td><td> user1@gmail.com </td></tr><tr><td> User2 </td><td> user2@gmail.com </td></tr></tbody></table></div>')
})
```

Và đây là thành quả khi truy cập vào [localhost:8080/users](http://localhost:8080/users)

![](https://images.viblo.asia/9f511131-af84-4ffa-9943-31f25946a2a4.png)

Như vậy, yêu cầu của bài toán được giải đáp. Tuy nhiên, ta có thể thấy, trong hàm ***send()*** , ta phải truyền vào toàn bộ code HTML. Nhược điểm của nó, chính là nếu code HTML quá dài, việc làm như thế sẽ làm cho code lẫn lộn giữa JavaScript và HTML. Khi gặp lỗi hay muốn nâng cấp sẽ cực kỳ khó khăn

Do đó, giải pháp được đặt ra, là ta sẽ tạo một file HTML riêng, và render file này

> Tạo một thư mục views bên trong nodeapp, sau đó, tạo thêm một thư mục users để quản lý các view liên quan đến đối tượng users (việc này sẽ giúp các bạn thuận tiện hơn trong việc quản lý mã nguồn cũng như logic mô hình MVC, mình sẽ nói đến mô hình này sau ).
```
|--nodeapp
|----views
|------users
```

> Tiếp theo là việc quản lý mã HTML. Trong Express, ta sẽ sử dụng một module là ***pug*** để viết mã HTML.  
  
Tại sao phải dùng pug??? ta vẫn có thể viết HTML bình thường, tuy nhiên, để render file này, ta sẽ dùng phương thức [sendFile()](https://expressjs.com/en/api.html#res.sendFile) trên đối tượng ***res***. Đối số của nó là một đường dẫn tuyệt đối đến file HTML. Đây lại là một nhược điểm cực lớn nữa khi quản lý mã nguồn, sửa lỗi và nâng cấp.  

[Pug](https://pugjs.org/api/getting-started.html) là một module giúp ta viết mã HTML một cách cực kì đơn giản. Bạn có thể tham khảo cú pháp ở [đây](https://pugjs.org/api/getting-started.html), học sẽ rất nhanh các cú pháp chính

Bạn nào chưa quen với cú pháp này, có thể sử dụng [Convert HTML to Pug](https://html2jade.org/) để chuyển mã HTML sang Pug nhé. 

Giờ ta sẽ sử dụng pug cho project của mình

> Cài đặt module pug cho project bằng lệnh: ***npm install pug --save***

> Thêm một số cấu hình cho server hiểu về plugin và cây thư mục view của bạn
```javascript:nodeapp/app.js
app.set('views', './views'); // Thư mục views nằm cùng cấp với file app.js
app.set('view engine', 'pug'); // Sử dụng pug làm view engine
```

Thêm một file có tên là *index.pug* vào thư mục users, chuyển mã HTML dạng pug vào file này

```html:nodeapp/views/users/index.pug
.users
  table
    thead
      tr
        th  Name 
        th  Email 
    tbody
      tr
        td  User1 
        td  user1@gmail.com  
      tr
        td  User2
        td  user2@gmail.com 
```

> Ta sẽ sử dụng hàm ***render()*** thay cho hàm ***send()*** . Chi tiết về hàm này các bạn có thể tham khảo tại: [res.render()](https://expressjs.com/en/api.html#res.render). Ở đây, mình dùng cú pháp đơn giản nhất, tham số sẽ là đường dẫn tương đối đến file bạn muốn render, tính từ thư mục ***views***
```javascript:nodeapp/app.js
app.get('/users', function(req, res){
	res.render('users/index');
})
```

Restart lại server và truy cập vào [localhost:8080/users](http://localhost:8080/users) bạn sẽ thấy kết quả vẫn như dùng hàm ***send()*** . Tuy nhiên, code của chúng ta đã gọn, dễ hiểu, dễ quản lý, sửa chữa, nâng cấp hơn rất nhiều

Hãy làm cho web của chúng ta trở nên dynamic hơn một chút. Mình sẽ có một array object lưu thông tin về các user  như sau:
```javascript
 var users = [{name: "User1", email: "user1@gmail.com"}, {name: "User2", email: "user2@gmail.com"}]
```

> Bây giờ, mình sẽ truyền array này vào hàm render để có thể sử dụng được ở trên view
```javascript:nodeapp/app.js
app.get('/users', function(req, res){
    var users = [{name: "User1", email: "user1@gmail.com"}, {name: "User2", email: "user2@gmail.com"}]
	res.render('users/index',{users: users});
})
```
Như vậy, hàm render sẽ nhận thêm 1 tham số nữa. Đây được gọi là các local variable, các biến được khai báo trong tham số này có thể sử dụng ở view. Ở đây mình định nghĩa 1 biến có tên là ***users*** và giá trị của nó là array object ***users*** mình khai báo ở trên

> Tiếp theo, ta điều chỉnh mã HTML một chút. Thay vì viết từng user tĩnh như lúc trước, ta sẽ duyệt qua các phần tử của biến ***users*** và in nó ra
```html
.users
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
```

Ta thấy vòng lặp ***each user in users*** được sử dụng, đây là cú pháp của pug, các bạn có thể tìm hiểu thêm nhé. Trong pug, để hiển thị một giá trị, ta sử dụng dấu "=" sau tên thẻ, theo sau đó là giá trị chúng ta muốn hiển thị

Xem kết quả nào
![](https://images.viblo.asia/9f511131-af84-4ffa-9943-31f25946a2a4.png)

Kết quả vẫn hiển thị như mong muốn

Thông qua bài này, ta đã biết thêm về render HTML trong NodeJS Express, cũng như sử dụng plugin pug để viết mã HTML. Hãy nhớ học về pug để thuận tiện cho các bài học sau nhé... Hẹn gặp lại các bạn!!!