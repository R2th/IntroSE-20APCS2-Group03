# Mở đầu 
Xin chào mọi người ở bài trước mình đã giới thiệu về [Kết nối với cơ sở dữ liệu (mysql) trong nodejs](https://viblo.asia/p/ket-noi-voi-co-so-du-lieu-mysql-trong-nodejs-L4x5xaOYKBM). Vì thế ở trong bài viết lần này chúng ta cần sửa lại một chút ở trang hiện thị danh sách sản phẩm để nó có thể lấy được data từ trong cơ sở dữ liệu hiển thị ra ngoài, và sửa lại chức năng thêm mới. Cùng bắt đầu ngay nhé :D.
# Thực hiện 
Ở bài trước thì chúng ta đã tạo ra một table `posts` và chưa có 1 record nào, vì thế mình sẽ giới thiệu luôn cách `insert` vào bảng trong mysql để chúng ta có data thực hiện chức năng hiển thị danh sách sản phẩm.
Đầu tiên chúng ta cần truy cập vào mysql, chỉ cần gõ lệnh 
```php
mysql -u root -p
```
rồi nhập pass (nếu bạn để pass).
Tiếp theo lệnh 
```php
show databases;
```
à cái này là để mình xem lại tên databases mà mình cần dùng trong trường hợp không nhớ tên `databases` :v . Còn bạn đã nhớ rồi thì chỉ cần gõ lệnh 
```php
use dbTest;
```
`dbTest` ở đây là tên databases mà bạn muốn sử dụng.
Tiếp theo là phần insert vào table. bạn chỉ cần gõ lệnh 
```php
 insert into [tên bảng](các colunm trong bảng) values(giá trị );  
```
như ở đây mình insert cho bảng `posts` có 2 trường là `id` và `title` với `id` là khóa chính và tự động tăng thì câu lệnh của mình sẽ là 
```php
 insert into products(title) values('hoc git');  
 ```
 **Lưu ý**: với các bảng có nhiều cột cần insert thì các gía trị sẽ cách nhau bởi dấu ",". Sau khi các bạn chạy lệnh trên mà nó hiện dòng
 chữ   **Query OK, 1 row affected (0.01 sec)**  là đã insert thành công nhé. Đây là kết quả của mình sau khi insert 
 ![](https://images.viblo.asia/8c2b5496-7ceb-40e9-b754-65ed9066f61f.png)

OK bầy giờ chúng ta cần sửa lại trong file `index.js` để nó có thể lấy được data từ databases nhé.
hàm `app.get('', function(req, res)` bây giờ chúng ta sẽ sửa lại thành như thế này 
```php
app.get('', function(req, res){

    var sql='SELECT * FROM posts';
    conn.query(sql, function (err, data, fields) {
        res.render('index', {
            posts: data
        });
    });
})
```
bây giờ mở trình duyệt ra để xem kết quả nhé. 
![](https://images.viblo.asia/d4cf32ce-2c54-4313-99ca-372b1e516d61.png)

data hiển thị giống với trong database đúng không.Vậy là đã xong phần hiển thị danh sách rồi . Bây giờ chúng ta sẽ thực hiện sửa lại chức năng thêm mới. À quên mất là chúng ta có thể xóa được mảng `posts` rồi nhé. :D

Tiếp theo là sửa lại chức năng thêm mới, đơn giản thôi bạn chỉ cần thay hàm 
```php
app.post('/create', function (req, res) {
    products.push(req.body)
    res.redirect('/');
})
```
bằng hàm 
```php
app.post('/create', function (req, res) {
    var params =req.body.title;
    var sql = `insert into products(title) values('${params}');`;
    conn.query(sql, function (err, result) {
        if (err)    console.log(err);
        console.log("1 record inserted");
      });
    res.redirect('/');
})
```
là được. Giải thích qua một chút, ở hàm này mình thực hiện gán `title` do người dùng nhập vào được client gửi lên cho biến `params` và thực hiện câu lệnh insert tương tự như lúc nãy chúng ta làm chỉ khác là giá trị `title` được lấy từ `req.body.title` chứ không phải được truyền trực tiếp vào.Rồi thực hiện nếu có lỗi thì thực hiện `log` lỗi ra nếu không thì log ra thông báo `1 record inserted` và
`redirect` về trang hiển thị danh sách. À còn một lưu ý nhỏ nữa là bảng `posts` mình đã để trường id là tự động tăng nên khi tạo một `posts` không cần phải nhập trường `id` nữa nhé, vì thế mình sẽ vào trong file `creat.pug` và bỏ thẻ input  id đi. Cùng xem kết quả nhé :D

![](https://images.viblo.asia/b057578c-dacb-4f3f-ae36-73a885771aa8.gif)

Bây giờ thì các bạn có thể `F5` thoải mái mà không sợ mất data mà mình vừa thêm vào :v.
# Kết luận
Vậy là mình hoàn thành hiện thị danh sách sản phẩm để nó có thể lấy được data từ trong cơ sở dữ liệu hiển thị ra ngoài, và sửa lại chức năng thêm mới. Ở bài tiếp theo mình sẽ thực hiện chức năng xóa, sửa và xem chi tiết một bài `post`. Bài viết còn phần nào thiếu sót rất mong các bạn comment xuống bên dưới để mình được bổ sung, nếu thấy bài viết hữu ích thì hãy cho mình một upvote nhé 😃 , Ấn follow để có thể theo dõi được những bài viết mới nhất của mình nhé. Cảm ơn các bạn đã đón đọc.