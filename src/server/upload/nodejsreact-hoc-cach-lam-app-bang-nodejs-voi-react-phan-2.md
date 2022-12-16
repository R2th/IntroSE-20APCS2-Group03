Ở [bài trước](https://viblo.asia/p/nodejsreact-hoc-cach-lam-app-bang-nodejs-voi-react-phan-1-RQqKLzzpl7z) chúng ta tìm hiểu được sơ qua về chức năng login, hiểu được việc gửi data từ view lên server như thế nào. Ở bài này ta tiếp tục tìm hiểu về việc đăng ký tài khoản mới.
### Cài đặt database ###
Để tạo được người dùng thì việc đầu tiên ta cần là thiết lập database. Ở đây ta sẽ sử dụng MongoDb. Để cài đặt Mongo trên máy bạn có thể tham khảo [tại đây](https://docs.mongodb.com/manual/administration/install-community/) . Sau đó ta cài đặt thư viện mongo cho dự án của chúng ta bằng lệnh
`npm install mongodb`
Sau đó ta tạo 1 file `user.js` để khai báo về connection đến Db như sua
```user.js
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/Blog';
```

Chúng ta có thể kiểm tra kết nối đến MongoDb như sau
```user.js
module.exports = {
    signup: function(name, email, password){
        MongoClient.connect(url, function(err, db) {
            console.log('connected')
        });
}
```

### Thiết lập sự kiện cho trang đăng ký ###
Giờ ta quay lại file `/view/signin.js` để thêm việc bắt sự kiện thay đổi các field
```siginin.js
handleNameChange(e){
    this.setState({name:e.target.value})
}
handleEmailChange(e){
    this.setState({email:e.target.value})
}   
handlePasswordChange(e){
    this.setState({password:e.target.value})
}
```

Trước đó ta cần khai báo các biến local của Class Signup
```signin.js
constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
}
```

Và setup giá trị mặc định
```signin.js
this.state = {
  name:'',
  email:'',
  password:''
```

Giờ ta sử dụng thư viện **axios** để gửi data từ view lên server như sau
```signin.js
signUp(){
    axios.post('/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
```

Như vậy ta đã có giá trị của name, email, password thông qua axios, giờ ta sẽ thêm user mới vào db qua file user.js tạo ở trên
Đầu tiên ta import file user.js đã tạo như sua
```signin.js
var user = require('./user')
```

### Làm việc với database ###
Giờ ta xử lý việc thêm user vào MongoDb ở file user.js
Để thêm 1 user ta viết như sau
```user.js
db.collection('user').insertOne( {
    "name": name,
    "email": email,
    "password": password
},function(err, result){
    assert.equal(err, null);
    console.log("Saved the user sign up details.");
});
```

Như vậy file user.js sẽ như sau
```user.js
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017';

module.exports = {
     signup: function(name, email, password){
       MongoClient.connect(url, (error, client) => {
       	const db = client.db('Blog');
		  	db.collection('user').insertOne( {
				"name": name,
				"email": email,
				"password": password
			},function(err, result){
				assert.equal(err, null);
		    	console.log("Saved the user sign up details.");
			});
		});
    }
}

```

Giờ ta xử lý từ file signin.js như sau cho việc lưu user vào db
```signin.js
app.post('/signup', function (req, res) {
  var name=req.body.name;
  var email=req.body.email;
  var password=req.body.password;
 
  if(name && email && password){
      user.signup(name, email, password)
  }
  else{
    res.send('Failure');
  }
})
```
### Cài đặt MongoDB trên win ###
Để lưu được db, các bạn cần phải cài MongoDB server để có thể connect được mongo DB.Khi sử dụng trên win bạn down MongoDb tại [đây](https://docs.mongodb.com/manual/installation/).
Sau khi cài đặt xong, để chạy được bạn cần vào folder của Mongo DB. Cụ thể ở đây của mình là "C:\Program Files\MongoDB\Server\3.6\bin". Sau đó bạn bật cmd lên rồi chạy mongod.exe và khi đó server mongo db đã được chạy và chờ việc mình thực thi việc thêm user ở trên.

Như vậy ta đã có thể tạo được User để lưu vào DB.