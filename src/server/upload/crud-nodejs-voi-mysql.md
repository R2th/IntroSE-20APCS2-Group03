# Mở Đầu
Xin chào các bạn tiếp tục với series Nodejs cơ bản, bài hôm nay mình sẽ tiếp tục làm thêm các chức năng xem chi tiết và sửa và xóa sản phẩm. À quên ở bài trước sau khi thực hiện kết nối với mysql thì chúng ta vẫn chưa sửa lại chức năng tìm kiếm, vậy nên ở bài viết này mình sẽ thực hiện sửa lại chức năng tìm kiếm luôn. Cùng bắt đầu ngay nhé
# Thực Hiện
## Sửa chức năng tìm kiếm
Đơn giản thôi bạn chỉ cần sửa lại hàm 
```php
app.get('/search', function(req, res){
    var id = req.query.id;
	var data = posts.filter(function(item){
        return item.id === parseInt(id)
    });
	res.render('index', {
		posts: data
    });
})
```
thành như thế này là được
```php
app.get('/search', function(req, res){
    var id = req.query.id;
    var sql=`SELECT * FROM posts where id = '${id}'`;
    conn.query(sql, function (err, data, fields) {
        res.render('index', {
            products: data
        });
    });
})
```
Ở bài trước là chúng ta thực hiện `filter` theo id để lấy ra các phần tử thỏa mãn điều kiện trong mảng, còn bây giờ thì đơn giản là chúng ta lấy ra danh sách sản phẩm rồi where theo id được gửi lên từ client.

##  Detail 
Trước hết chúng ta cần phải sửa lại trang index.pug một chút để chúng ta có thể thực hiện xem chi tiết, sửa, xóa. Mình có trang index.pug như sau: 
```php
.products
  head
    style.
      table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
      margin: 10px 30px;
      }
      th, td {
        padding: 5px;
        text-align: left;
      }
  form(action="/search", method="GET")
    input(name="id", type="text", placeholder="id")
    button Search
  table
    thead
      tr
        th  Id
        th  Title
        th(colspan='3') Action
    tbody
    each pro in products
      tr
        td=  pro.id
        td=  pro.title
        td
          a(href=`/detail?id=${pro.id}`) Detail
        td
          a(href=`/edit?id=${pro.id}`) Update
        td
          a(href=`/delete?id=${pro.id}`) Delete
  a(href='/create') New
```
nhìn bên ngoài thì nó sẽ như thế này 
![](https://images.viblo.asia/04342d9e-dae0-4b20-ae03-4dd0bb2cacda.png)

Ý tưởng là khi mình bấm vào `Detail` thì sẽ chuyển sang trang detail vì thế mình cần có một trang là `detail.pug` như sau: 
```php
h1 Detail
each data in products
  p id:
    span= data.id
  p title:
    span= data.title
a(href='/') Go to home
```
Và hàm trong `index.js` để chuyển từ trang index sang trang detail như sau: 
```php
app.get('/detail', function (req, res) {
    var id = parseInt(req.query.id);
    var sql=`SELECT * FROM products where id = '${id}'`;
    conn.query(sql, function (err, data, fields) {
        res.render('detail', {
            products: data
        });
    });
})
```
OK vậy là chúng ta đã lm xong chức năng xem chi tiết
![](https://images.viblo.asia/ecb9ad80-67cd-4fa3-a58d-ae4353e3236a.gif)

## Delete 
Chức năng delete thì sẽ đơn giản hơn bạn chỉ cần gọi đến hàm delete truyền id vào và redirect về lại trang chủ là được. hàm delete như sau: 
```php
app.get('/delete', function (req, res) {
    var id = parseInt(req.query.id);
    var sql=`Delete FROM products where id = ${id}`;
    conn.query(sql, function (err, data, fields) {
    });
    res.redirect('/');
})
```
Đây là kết quả 
![](https://images.viblo.asia/04ed014b-f51c-4cb3-a2f6-aa8f13591980.gif)

# Update
Chức năng update thì mình sẽ thực hiện như sau: Đầu tiền là sẽ tạo một trang để có thể hiển thị data mà nguời dùng muốn sửa. Ở trang đó sau khi người dùng sửa xong ấn vào nút update thì mình sẽ gọi đến hàm update để tiến hành update lại sản phầm và trả về trang danh sách sản phẩm.

Đầu tiên sẽ là hàm  để gọi đến trang update sản phẩm 
```php
app.get('/edit', function (req, res) {
    var id = parseInt(req.query.id);
    var sql=`SELECT * FROM posts where id = '${id}'`;
    conn.query(sql, function (err, data, fields) {
        res.render('update', {
            posts: data
        });
    });
})
```
Hàm này cũng tương tự như hàm gọi đến trang chi tiết sản phẩm, ở đây mình gọi đến trang update. Mình có trang update.pug như sau:
```php
h1 Update
each data in posts
    form(action="/edit" method="POST")
        input(type="text", placeholder="id", name="id" value=`${data.id}` readonly)
        br
        label(id="title")
        input(type="text", placeholder="title", name="title" value=`${data.title}`)
        br
        button Update
```
Ở đây mình cho hiển thị sản phầm mà người dùng muốn sửa và vì thuộc tính id mình để là khóa chính và tự động tăng vì thế mình sẽ để thẻ input của id có thuộc tính là `readonly` để không cho người dùng sửa id. Sau khi người dùng sửa xong `title`và ấn `Update` thì sẽ gọi đến hàm update để tiến hành update data. Hàm update như sau :

```php
app.post('/edit', function (req, res) {
    var params =req.body;
    var sql = `update posts set title = '${params.title}' where id = ${params.id};`;
    conn.query(sql, function (err, result) {
        if (err)    console.log(err);
        console.log("1 record update");
      });
    res.redirect('/');
})
```
Ở hàm này thì mình lấy data từ trang update.pug gửi lên và tiến hành update lại giữ liệu và cuối cùng là trả về trang hiển thị danh sách sản phẩm thôi.

Đây là kết quả :

![](https://images.viblo.asia/b54bb623-8f68-4611-9143-bd0f0e77cd59.gif)

# Kết Luận
Như vậy là mình đã hoàn thành chức năng tìm kiếm, xem chi tiết và cập nhật và xóa sản phầm, Bài tiếp theo mình sẽ nói về phần validate. À quên bài viết có tiêu đề là  `CRUD Nodejs với mysql` mà lại không thấy phần `Create` đâu  :D, thì phần create mình đã nói ở bài trước nên mình xin phép không nói lại, mọi người có thể xem lại phần ở [đây](https://viblo.asia/p/post-method-voi-body-parser-trong-nodejs-thu-lam-chuc-nang-them-moi-Az45b4YwZxY) nhé :). Bài viết còn phần nào thiếu sót rất mong các bạn comment xuống bên dưới để mình được bổ sung, nếu thấy bài viết hữu ích thì hãy cho mình một upvote nhé 😃 , Ấn follow để có thể theo dõi được những bài viết mới nhất của mình nhé. Một lần nữa xin cảm ơn các bạn !!!
## Lưu ý 
Sau khi public bài viết thì mình đã được một  người anh chỉ ra lỗ hổng trong code :D đó là dễ bị tấn công SQL Injection.  Nếu chưa rox SQL Injection là gì thì mọi người có thể tham khảo bài viết  [này](https://viblo.asia/p/sql-injection-va-cach-phong-chong-OeVKB410lkW) cũng là của một người anh mình hệ hệ.

Thì nói qua về SQL injection thì `SQL injection`  là một kỹ thuật cho phép những kẻ tấn công lợi dụng lỗ hổng của việc kiểm tra dữ liệu đầu vào trong các ứng dụng web và các thông báo lỗi của hệ quản trị cơ sở dữ liệu trả về để tiêm vào và thi hành các câu lệnh SQL bất hợp pháp.

code ở trên mình đang viết 
```php
var id = req.query.id;
``` 
như thế này và mình sẽ sửa lại 
```php
var id = parseInt(req.query.id);
```
Để ràng buộc kiểu dữ liệu cho trường `id`. Do bài series này mình đang nói về những thứ cơ bản cho người mới bắt đầu vì thế mình đang sử dụng câu lệnh SQL thuần nên sẽ dễ bị tấn công hơn. Còn trên thực tế hiện nay thì hầu như chúng ta thường sử dụng các framework để phát triển nên cũng hạn chế được tấn công `SQL injection` vì các framework đều đã được test cẩn thận để phòng tránh các lỗi. Vì thế nên cách tốt nhất là chúng ta nên sử dụng  các framework thay vì code thuần. Một lần nữa cảm ơn các bạn ;)