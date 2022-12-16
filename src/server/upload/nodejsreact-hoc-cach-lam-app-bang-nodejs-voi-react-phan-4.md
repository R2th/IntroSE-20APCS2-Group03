Như phần trước ta đã làm phàn đăng nhập và lưu session, giờ phần này ta sẽ làm liên quan đến Blog, tức là các bài viết. 
### Danh sách các bài viết ###
Đầu tiên đường dẫn mặc định vào list các bài viết sẽ là /home và chỉ dành cho các thành viên sau khi đăng nhập. Vậy ta xử lý đoạn đó như sau
```user.js
app.get('/home', function (req, res) {
  if(sessions && sessions.username){
    res.sendFile(__dirname + '/html/home.html');
  }
  else{
    res.send('unauthorized');
  }
})
```
Vậy như bài trước sau khi đăng nhập thành công ta cho hiển thị thông báo thì giờ ta sẽ cho tự chuyển sang link /home như sua
```usser
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

Ta sẽ tạo thêm 1 file home với data demo để xử lý phần này.
```home.jsx
class ShowPost extends React.Component {
    constructor(props) {
      super(props);
    }
     
    render() {
      return (
          <div className="list-group"> 
            <a href="#" className="list-group-item active">
              <h4 className="list-group-item-heading">Tiêu đề tin 1</h4>
              <p className="list-group-item-text">Nội dung vắn tắt tin 1</p>
            </a>
            <a href="#" className="list-group-item">
              <h4 className="list-group-item-heading">Tiêu đề tin 2</h4>
              <p className="list-group-item-text">Nội dung vắn tắt tin 2</p>
            </a> 
            <a href="#" className="list-group-item">
              <h4 className="list-group-item-heading">Tiêu đề tin 3</h4>
              <p className="list-group-item-text">Nội dung vắn tắt tin 3</p>
            </a> 
          </div>
      )
    }
}
```

Giờ ta tạo file html riêng cho phần này với tên là home.html như sua
```home.html
<!DOCTYPE html>
<html lang="en">
 
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
 
    <title>React Blog App</title>
    <link href="bootstrap.min.css" rel="stylesheet">
    <link href="jumbotron-narrow.css" rel="stylesheet">
    <script src="https://fb.me/react-15.1.0.js"></script>
    <script src="https://fb.me/react-dom-15.1.0.js"></script>
    <script src="https://npmcdn.com/react-router@3.0.2/umd/ReactRouter.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/babel-core@5.8.38/browser.min.js"></script>
 
</head>
 
<body>
 
    <div class="container">
        <div class="header clearfix">
            <nav>
                <ul class="nav nav-pills pull-right">
                    <li role="presentation" class="active"><a href="#">Home</a></li>
                    <li role="presentation"><a href="#">Add</a></li>
                    <li role="presentation"><a href="#">Logout</a></li>
                </ul>
            </nav>
            <h3 class="text-muted">React Blog App</h3>
        </div>
 
        <div id="app" class="jumbotron">
 
        </div>
 
    </div>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script type="text/babel" src="home.jsx">
    </script>
</body>
 
```

### Thêm mới bài viết ###
Để có thể bổ sung bài viết vào trang home thì ta cần tạo các bài viết. sau đây ta sẽ thực hiện thao tác tạo các bài viết.
Đầu tiên phần xử lý view cho thêm bài viết, tương tự như phần login ta làm như sau
```home.jsx
class AddPost extends React.Component {
    render() {
      return (
        <div className="col-md-5">
          <div className="form-area">  
              <form role="form">
              <br styles="clear:both" />
                <div className="form-group">
                  <input type="text" className="form-control" id="title" name="title" placeholder="Title" required />
                </div>
                
                <div className="form-group">
                <textarea className="form-control" type="textarea" id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
                </div>
                   
              <button type="button" id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
              </form>
          </div>
        </div>
      )
    }
}
```

Sau đó xử lý data gửi đi sau khi bấm submit
```home.jsx
addPost(){
  axios.post('/addPost', {
    title: this.state.title,
    subject: this.state.subject
  })
  .then(function (response) {
    console.log('response from add post is ',response);
    hashHistory.push('/')
  })
  .catch(function (error) {
    console.log(error);
  });
}
```

Tiếp đến phần xử lý db ta tạo 1 file là post.js như sua
```post.js
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/Blog';
 
module.exports = {
    addPost: function(title, subject, callback){
        MongoClient.connect(url, function(err, db) {
            db.collection('post').insertOne( {
                "title": title,
                "subject": subject
            },function(err, result){
                assert.equal(err, null);
                console.log("Saved the blog post details.");
                if(err == null){
                    callback(true)
                }
                else{
                    callback(false)
                }
            });
        });
    }
}
```

Vậy để thêm mới bài viết ta chỉ cần thêm thuộc tính post cho việc post bài như sau:
```app.js
app.post('/addpost', function (req, res) {
  var title = req.body.title;
  var subject = req.body.subject;
  post.addPost(title, subject ,function(result){
    res.send(result);
  });
})
```

Như vậy việc thêm mới bài viết đã hoàn thành. Phần sau ta xử lý xóa bài viết và hiển thị ra phần home