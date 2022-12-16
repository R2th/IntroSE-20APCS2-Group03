![](https://images.viblo.asia/00ea1f44-6099-4fb2-a12b-583ab68eb72d.png)

# Mở đầu
Tiếp tục với series Nodejs cơ bản trong bài hôm nay mình sẽ giới thiệu về `Post method`  cùng với `Body Parser` và ứng dụng nó để làm chức năng thêm mới. OK vậy bắt tay vào việc luôn nhé :D
# Thực Hiện
### Ý tưởng
Để thực hiện được chức năng thêm mới :
 * Phía client: phải có một form để người dùng điền thông tin, và phía client phải gửi data mà người dùng nhập lên để phía server tiến hành xử lý.
 * Phía server: phải làm sao đó để bắt được data mà client gửi lên và thực hiện chức năng thêm mới. 
 
      Cơ mà vấn đề ở đây là server sẽ lấy data từ dưới client gửi lên kiểu gì  :v, Như ở bài [trước](https://viblo.asia/p/query-parameters-trong-nodejs-thu-lam-chuc-nang-tim-kiem-Do754eWVKM6) của mình thì là dùng `req.query` để lấy được data ở url được client gửi lên thế thì cái này thì có cái nào tương tự không nhỉ, đáp án là có đó chính là `req.body`,  Nhưng để dùng được `req.body` thì chúng ta cần phải cài một moudule tên là `body parser` mình sẽ nói về module này sau, bây giờ chúng ta cần tạo một file view để người dùng có thể nhập thông tin cho bài viết mới. Mình sẽ tạo một file có tên là `create.pug` với nội dung như sau:
```php
head
style.
	label, input, button {
	margin: 10px;
	}
h1 Create Post
form(action="/create" method="POST")
	label(id="id")
	input(type="text", placeholder="id", name="id")
	br
	label(id="title")
	input(type="text", placeholder="title", name="title")
	br
	button Create
```
Bên file `index.js` thì khai báo một router để render file `create.pug`vừa tạo ở trên 
```php
app.get('/create', function(req, res){
    res.render('create', {
    });
})
```
Ok vậy là đã xong bên client bây giờ chúng ta mở trình duyệt xem thử nhé

![](https://images.viblo.asia/d645a445-c69a-45a9-8b9d-923eb074aae9.png)

hiện ra như thế này là oki rồi nhé :D. Tiếp theo sẽ là xử lý bên server, như đã nói ở trên chúng ta cần cài đặt module `body-parser`. Như mọi khi thôi để cài đặt module thì chỉ cần chạy lệnh 

   ```php
 yarn add body-parser --save
  ```
   là được.
   Sau khì cài đặt xong thì chúng ta sẽ khai báo trong file `index.js` như sau:
   ```php
 const bodyParser = require('body-parser')
 app.use(bodyParser.urlencoded({ extended: true }))
 ``` 
 Các bạn muốn hiểu rõ hơn thì có thể lên [đây](http://expressjs.com/en/5x/api.html#req.body)  để đọc thêm. Tiếp theo mình sẽ log ra xem như thế nào nhé. đây là code 
 ```php
 app.post('/create', function (req, res) {
    console.log(req.body)
})
```
Mình  nhập vào input như thế này và ấn `Create`

![](https://images.viblo.asia/f1316d91-3f4b-43c8-8a6c-bc83d93d6e43.png)

Đây là kết quả log mình nhận được 
![](https://images.viblo.asia/7f5a43f5-dbe9-409a-9c01-d542ee70d196.png)

Bây giờ chúng ta sẽ lưu data vừa nhận được nhé, bạn chỉ cần sửa lại `post method` vừa viết ở trên như sau: 
```php
app.post('/create', function (req, res) {
    posts.push(req.body)
    res.redirect('/');
})
```
ở đây mình sẽ lưu data lấy từ `req.body` vàng mảng `posts` sau đó sẽ `redirect` về trang hiển thị danh sách `posts`. Ở trang danh sách `posts` mình thêm một thẻ `a` để có thể chuyển về trang thêm mới. Đây là kết quả 

   ![](https://images.viblo.asia/e20198c4-58aa-46ab-a9dd-36dde2f51b40.gif)
   
   Hoặc bạn có thể đưa thông tin vừa nhận được ra một trang mới như thế này 
   ![](https://images.viblo.asia/aeedddc5-ef3c-425c-b4ff-720978229592.gif)
   
   bằng cách thêm một file `new-post.pug` với nội dung như sau :
   ```php
   h1 New Product
p id:
    span= data.id
p title:
    span= data.title
a(href='/create') New
```
và sửa lại  `post method` như thế này :
```php
app.post('/create', function (req, res) {
    res.render('new-post', {
        data: req.body
    });
})
```
# kết Luận
Như vậy là mình đã giới thiệu đến các bạn `Post method với Body Parser trong Nodejs, thử làm chức năng thêm mới` Tuy nhiên có một số lưu ý ở bài viết này đó là dữ liệu người dùng nhập vào chưa được validate trước khi submit, và data được lưu vào mảng nên khi f5 lại sẽ bị mất, Những vẫn đề này sẽ được giải quyết ở những bài tiếp theo. Bài viết dựa trên quan điểm cá nhân nên mọi người có thắc mắc hay góp ý gì thì hãy coment xuống bên dưới để mình được biết, cảm ơn các bạn đã đón đọc.