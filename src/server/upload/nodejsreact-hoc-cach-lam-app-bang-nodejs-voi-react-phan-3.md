Như phần trước ta đã tạo được user thông qua ReactJs, Nodejs và Mongo DB. Giờ phần này ta là tiếp theo ta thực hiện việc kiểm tra và đăng nhập
### Đăng nhập ###
Tiếp tục với file user.js là làm hàm kiểm tra đăng nhập như sau
```nodejs
validateSignIn: function(username, password,callback) {
	    MongoClient.connect(url, (error, client) => {
	    	const db = client.db('Blog');
	        db.collection('user').findOne( { email : username ,password: password}, function (err, result) {
	            if(result==null){
	                callback(false)
	            }
	            else{
	                callback(true)
	            }
	        });
	    });
	}
```
Vậy giờ ta xử lý file index.js phần kiểm tra đăng nhập này
Chúng ta thay phần post(/signin) đã thử ở phần 1 bằng dòng sau:
```nodejs
app.post('/signin', function (req, res) {
  var user_name=req.body.email;
  var password=req.body.password;
  user.validateSignIn(user_name,password,function(result){
    if(result){
      res.send('Thành công')
    }
    else{
      res.send('Đăng nhập sai')
    }
  });
```
### Lưu thông tin đăng nhập ###
Như phần trên chúng ta đã kiểm tra được thông tin đăng nhập đã có trên DB hay chưa, giờ tiếp theo ta cần lưu thông tin này vào session để khi chuyển trang hoặc thực hiện tác vụ khác thì thông tin user đang đăng nhập không bị mất đi. Như tất cả ngôn ngữ lập trình khác để lưu thông tin user đăng nhập ta sử dụng session và ở đây sử dụng **express-session**.
Đầu tiên bạn thêm thư viện trong file package.json
```package.json
"express-session": "1.15.6",
```
Sau đó chạy lệnh npm install để thêm thư viện này.
Đầu tiên ta khai báo biến session
```
var session = require('express-session');
```
Để đảm bảo việc bảo mật thì có hỗ trợ thêm phần secret
```
app.use(session({secret: 'my-secret'}));
```
Để sử dụng session ta dùng như sau: như trong hàm signin
```
sessions=req.session;
sessions.username = user_name;
```

### Trang chủ ###
Giờ ta sẽ làm trang home để khi login vào sẽ vào trang này
Đầu tiên tạo file home.html như sau
```home.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
 
    <title>Trang quản lý Blog bằng ReactJs</title>
    <link href="bootstrap.min.css" rel="stylesheet">
    <link href="jumbotron-narrow.css" rel="stylesheet">
 
     
  </head>
 
  <body>
 
    <div class="container">
      <div class="header clearfix">
        <nav>
          <ul class="nav nav-pills pull-right">
            <li role="presentation" class="active"><a href="#">Trang chủ</a></li>
            <li role="presentation"><a href="#">Thêm mới</a></li>
            <li role="presentation"><a href="#">Đăng xuất</a></li>
          </ul>
        </nav>
        <h3 class="text-muted">Quản lý bài viết</h3>
      </div>
 
      <div class="jumbotron">
       <div class="list-group"> <a href="#" class="list-group-item active"> <h4 class="list-group-item-heading">List group item heading</h4> <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p> </a> <a href="#" class="list-group-item"> <h4 class="list-group-item-heading">List group item heading</h4> <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p> </a> <a href="#" class="list-group-item"> <h4 class="list-group-item-heading">List group item heading</h4> <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p> </a> </div>
      </div>
 
       
      <footer class="footer">
        <p>&copy; 2018 Framgia Việt nam.</p>
      </footer>
 
    </div> 
  </body>
</html>
```
Xử lý thêm tại file index.js
```index.js
app.get('/home', function (req, res) {
  if(sessions && sessions.username){
    res.sendFile(__dirname + '/html/home.html');
  }
  else{
    res.send('unauthorized');
  }
})
```
Tiếp đến giờ mình viết rõ hơn phần đăng nhập để lưu session user
```index.js
app.post('/signin', function (req, res) {
  sessions=req.session;
  var user_name=req.body.email;
  var password=req.body.password;
  user.validateSignIn(user_name,password,function(result){
    if(result){
      sessions.username = user_name;
      res.send('success');
    }
  });
})
```
Sau đó phần xử lý đăng nhập trong file user.js như sau
```user.js
signIn(){
  axios.post('/signin', {
    email: this.state.email,
    password: this.state.password
  })
  .then(function (response) {
    if(response.data == 'success'){
      window.location.assign('http://localhost:7777/home')
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}
```
Xong phần này ta xử lý phần đăng nhập xong. Bài tiếp ta sẽ xử lý phần hiển thị các bài viết và quản lý nó