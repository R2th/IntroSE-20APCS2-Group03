# Mở Đầu
Tiếp tục với series `Nodejs` cơ bản trong bài hôm nay mình sẽ giới thiệu về `Query Parameters` và ứng dụng nó để làm chức năng tìm kiếm. Vậy trước khi đi vào xây dựng chức năng tìm kiếm thì chúng ta cần phải biết `Query Parameters` là gì.

Nói một cách dễ hiểu thì `Query Parameters` là một chuỗi truy vấn thuộc URL(Uniform Resource Locater), nó đi sau dấu `?`. Nó sẽ gửi data lên trên server. server dựa vào các data được gửi lên làm tham số để truy vấn vào cơ sở dữ liệu, lọc ra các kết quả. Trên `Viblo` cũng sử dụng rất nhiều `Query Parameters` ví dụ như :

![](https://images.viblo.asia/9246641d-d0e1-4000-a7a4-084f987b8964.gif)

 Ở đây  đang thực hiện chức năng filter theo ngày và theo tag, các bạn sẽ thấy được trên URL đang hiện như này 
 
 ![](https://images.viblo.asia/a99671fd-f10d-4304-8e7e-d1bb2183b8bb.png)
 
Các truy vấn sẽ bắt đầu từ sau dấu ? , theo từng cặp `key` và `value`,  nếu có nhiều hơn 1 truy vấn thì các truy vấn sẽ cách nhau bởi dấu `&` . Ok vậy là đã hiểu cơ bản về `Query Parameters` bây giờ chúng ta sẽ bắt tay vào làm chức năng tìm kiếm.

# Xây dựng chức năng tìm kiếm
### Ý tưởng 
Ở đây mình định xây dựng chức năng tìm kiếm bài viết theo `id` hoặc theo `title`. Vậy thì cần những gì:
* Trước hết chúng ta cần phải có data để xây dựng trang danh sách bài viết
* Tiếp theo cần có một trang view để hiển thị danh sách bài viết đó
* Và một ô input để có thể nhập `id` hoặc`title` để thực hiện tìm kiếm trong danh sách đó.
### Thực hiện
Đầu tiên là phải có data mà chúng ta chưa học kết nối với cơ sở dữ liệu (mongoDB) nên ở đây mình sẽ tạo ra một array để lưu thông tin của các bài viết. Vì mỗi bài viết là một obj nên ta sẽ có mảng `posts` trong file index.js như sau:
```php
var posts = [
    {id:1, title: 'Nodejs cơ bản'},
    {id:2, title: 'Học vuejs'},
    {id:3, title: 'Javascrip'}
]
```
Vậy là đã xong phần đầu tiên là tạo data, tiếp theo sẽ là xây dựng trang view để hiển thị đống data mà chúng ta vừa tạo ở trên, Bài trước chúng ta đã tạo ra 1 file là `index.pug` nên mình sẽ sử dụng file đó luôn, chỉ cần chỉnh sửa một chút là được, Để bên file `index.pug` có thể nhận được data thì chúng ta cần phần truyền data sang vì thế hàm dùng để `render` file `index.pug` mình sẽ sửa lại như sau để có theer truyền được data sang.
```php
app.get('/', function(req, res){
    res.render('index', {
        posts: posts
    });
})
```
Tiếp theo mình cần sửa bên file `index.pug` để có thể hiện thị được danh sách bài post như sau 
```php
.posts
  head
    style.
      table, th, td {
      border: 1px solid black;
      }
  table
    thead
      tr
        th  Id
        th  Title
    tbody
    each post in posts
      tr
        td=  post.id
        td=  post.title
```
Ở đây có dùng vòng lặp `each` của `pug` để lấy ra hết các phần tử trong mảng `posts`. Muốn lấy giá trị thì chỉ cần `.` đến thuộc tính của nó là được. Đây là kết quả sau khi chạy 

![](https://images.viblo.asia/c2f99e4e-8dab-46ed-81c4-759ab1932877.png)

OK (ngon) thế là chúng ta đã lấy hoàn thành xong trang danh sách bài post. Tiếp theo sẽ là thêm một ô `input` để thực hiện gửi `Query Parameters` lên cho thằng server xử lý.chỉ cần thêm đoạn này vào `file input.pug` là được
```php
 form(action="/search", method="GET")
    input(name="id", type="text", placeholder="id")
    button Search
```

Ok bây giờ là đến việc của server. Ý tưởng của mình sẽ là tạo một router để thực hiện chức năng tìm kiếm bài post theo `id` mà client gửi lên.Router đó phải lấy được `id` từ client gửi lên và dùng hàm `filter` để filter ra những bài post trong mảng `posts` có `id` bằng với `id` dưới client gửi lên. Và cuối cùng là lấy data sau khi đi qua hàm `filter` để render lại ra view. Nếu các bạn chưa rõ về `filter` thì có thể xem lại bài [Một số array method của javascript thường dùng](https://viblo.asia/p/mot-so-array-method-cua-javascript-thuong-dung-jvEla3B6Kkw) này của mình nhé :D
. còn đây là code

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
Bây giờ ra trình duyệt để xem kết quả nhé :D

![](https://images.viblo.asia/bd2939d3-a571-4cd1-83b1-49cc9f416fc2.gif)
Một lưu ý nhỏ là `id` mà mình lấy được từ dưới client gửi lên đang ở kiểu string nên mình cần ép kiểu nó  lại bằng `parseInt` thì mới so sánh được với `id` trong mảng `posts` nhé.

Tương tự với tìm kiếm theo `title`  bạn chỉ cần viết lại hàm tìm kiếm như này 
```php
app.get('/search', function(req, res){
    var title = req.query.title;
	var data = posts.filter(function(item){
        return item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
    });
	res.render('index', {
		posts: data
    });
})
```

Ở đây có dùng hàm `toLowerCase()` để chuyển hết data về chữ thường cho tiện việc so sánh. Và hàm `indexOf()` để kiểm tra xem `title` mà client gửi lên có nằm trong `title` trong mảng `posts` không nếu không thì sẽ trả về `-1`.

# Kết Luận
Như vậy là mình đã giới thiệu cho các bạn về `Query Parameters` và làm thử chức năng tìm kiếm. Tuy nhiên còn cần cải thiện thêm một số chỗ nữa. Mình sẽ để giành ở bài tiếp theo. Mọi người có thắc mắc hay góp ý gì thì hãy comment xuống bên dưới để mình được biết, xin cảm ơn các bạn đã theo dõi.