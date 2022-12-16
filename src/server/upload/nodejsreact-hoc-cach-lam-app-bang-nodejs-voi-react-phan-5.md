Như ở các phần trước ta đã làm được việc tạo mới cũng như hiển thị danh sách các blogs, ở bài cuối này ta sẽ làm việc sửa đổi và xóa các bài viết.
### Thêm icon ###
Để sửa bài viết thì việc đầu tiên ta thêm icon sửa bài viết và xóa cho phần list các bài viết ở phần trước.
Trong đoạn view hiển thị ta thêm đoạn sau 
```html
<td>
  <span className="glyphicon glyphicon-pencil"></span>
</td>
<td>
       <span className="glyphicon glyphicon-remove"></span>
</td>
```
Như vậy với mỗi bài viết ta sẽ kèm theo 2 icon là edit và delete
### Sửa bài viết ###
Giờ ta thêm sự kiện khi click vào nút sửa bài viết như sau
```html
<span onClick={this.updatePost.bind(this,post._id)} className="glyphicon glyphicon-pencil"></span>
```
Tiếp đến ta khai báo link cho phần sửa bài viết
```javascript
updatePost(id){
  hashHistory.push('/addPost/' + id);
}
<Route component={AddPost} path="/addPost(/:id)"></Route>
```
 trước phần xử lý sửa bài viết ta làm cần làm phần hiển thị chi tiết thông tin để cho việc lấy thông tin vào form sửa đổi bài viết
```javascript
getPostWithId(){
  var id = this.props.params.id;
  var self = this;
  axios.post('/getPostWithId', {
    id: id
  })
  .then(function (response) {
    if(response){
      self.setState({title:response.data.title});
      self.setState({subject:response.data.subject});  
    }
  })
  .catch(function (error) {
    console.log('error is ',error);
  });
}
```
Đồng thời xử lý phần view 
```html
<div className="form-group">
    <input value={this.state.title} type="text" onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required />
</div>
                
<div className="form-group">
    <textarea value={this.state.subject} className="form-control" onChange={this.handleSubjectChange} type="textarea" id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
</div>
```
Giờ ta khai báo phần nhận dữ liệu và truyền dữ liệu về server
```javascript
app.post('/getPostWithId', function(req,res){
  var id = req.body.id;
  post.getPostWithId(id, function(result){
    res.send(result)
  })
})
```
và phần lấy dữ liệu đẻ hiển thị viết như sau
```javascript
getPostWithId: function(id, callback){
    MongoClient.connect(url, function(err, db){
         db.collection('post').findOne({
            _id: new mongodb.ObjectID(id)
         },
         function(err, result){
            assert.equal(err, null);
            if(err == null){
                callback(result)
            }
            else{
                callback(false)
            }
        });
    })
}
```
Vì ta sử dụng chung 1 form cũng như 1 nguồn nên để nhận biết việc đang sửa đổi hay thêm mới ta cần thêm thuộc tính id.
```javascript
app.post('/addpost', function (req, res) {
  var title = req.body.title;
  var subject = req.body.subject;
  var id = req.body.id;
  if(id == '' || id == undefined)
    post.addPost(title, subject ,function(result){
      res.send(result);
    }); 
  }
  else{
    post.updatePost(id, title, subject ,function(result){
      res.send(result);
    }); 
  }
})
```
Như phần trên ta thấy sẽ có phần kiểm tra có id hay ko, nếu không có sẽ tự động đưa vào hàm addPost còn nếu có id thì đưa vào function editPost.
Vậy phần xử lý edit post như sau
```javascript
updatePost: function(id, title, subject, callback){
    MongoClient.connect(url, function(err, db) {
        db.collection('post').updateOne( 
            { "_id": new mongodb.ObjectID(id) },
            { $set: 
                { "title" : title,
                  "subject" : subject 
                }
            },function(err, result){
            assert.equal(err, null);
            if(err == null){
                callback(true)
            }
            else{
                callback(false)
            }
        });
    });
}
```

### Xóa bài viết ###
Tương tự như phần sửa bài viết ta cũng làm như xóa bài viết. đầu tiên thêm sự kiện click, sau đó khai báo thêm route và rồi phương thức truyền lên server, cuối cùng là thực hiện việc xóa bài viêt.
Để thêm sự kiện là làm như sau
```html
<span onClick={this.deletePost.bind(this,post._id)} className="glyphicon glyphicon-remove"></span>
```
Ta thêm 1 alert box để xác thực việc xóa bài viết
```javascript
deletePost(id){
  if(confirm('Are you sure ?')){
    // Delete Post API call will be here !!
  }
}
```

Sau đó thêm phương thức gửi phần xóa bài viết
```javascript
app.post('/deletePost', function(req,res){
  var id = req.body.id;
  post.deletePost(id, function(result){
    res.send(result)
  })
})
```
Và cuối cùng là phần xử lý phía server cho việc xóa bài viết
```javascript
deletePost: function(id, callback){
 
    MongoClient.connect(url, function(err, db){
         db.collection('post').deleteOne({
            _id: new mongodb.ObjectID(id)
         },
         function(err, result){
            assert.equal(err, null);
            console.log("Deleted the post.");
            if(err == null){
                callback(true)
            }
            else{
                callback(false)
            }
        });
    })
}
```
Như vậy ta đã làm xong việc xóa bài viết. nhưng ta cần thêm 1 bước khi xóa rồi thì cần load lại danh sách bài viết, do đó cần sửa lại như sau
```javascript
deletePost(id){
  if(confirm('Are you sure ?')){
    var self = this;
    axios.post('/deletePost', {
      id: id
    })
    .then(function (response) {
      self.getPost();
    })
    .catch(function (error) {
      console.log('Error is ',error);
    });
  }
}
```

Như vậy ta đã thực hiện được các chức năng cơ bản là Thêm - Sửa - Xóa bài viết. Cũng như phần đăng nhập, tạo tài khoản.
Bài viết chủ yếu mình lấy từ 1 bài hướng dẫn có thêm chút sửa đổi rất mong được góp ý.
Bản quyền thuộc về Framgia VN