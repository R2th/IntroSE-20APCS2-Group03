### 1. Mở đầu:

MongoDB là một trong những cơ sở dữ liệu mã nguồn mở NoSQL phổ biến nhất được biết bằng C++. Tính đến tháng 2/2015, MongoDB được xếp thứ 4 trong số các hệ thống cơ sở dữ liệu phổ biến nhất. Nó được phát triển bởi công ty 10gen sau này được biết đến với tên MongoDB Inc.

MongoDB là cơ sở dữ liệu hướng tài liệu, nó lưu trữ dữ liệu trong các document dạng JSON với schema động rất linh hoạt. Nghĩa là bạn có thể lưu các bản ghi mà không cần lo lắng về cấu trúc dữ liệu như là số trường, kiểu của trường lưu trữ. Tài liệu MongoDB tương tự như các đối tượng JSON.

Trong MongoDB, dữ liệu được lưu trữ như một document, một tập của các cặp key-value. Bạn có thể định nghĩa nhiều database trong MongoDB và mỗi database có nhiều collections, những collections này đơn giản là tập của các documents được lưu trữ dạng cặp key-value.
 
### 2. Kết nối với MongoDB:

- Cài đặt Mongoose
- Cài đặt mongodb
- Thiết lập mongod nếu bạn chưa biết (đọc bài này)
- Đảm bảo mongodb đang chạy cùng với server localhost
 
### 3. Tạo một schema :

MongoDB là một document database, nó lưu trữ JSON như các object. Model/schema mô tả cái mà các đối tượng này chứa.

schema lên mô tả các trường chúng ta có trong form và chỉ định dữ liệu nó mong đợi

Ví dụ 1 model như sau :

```JS
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  username: {type: String, unique: true, index: true, required: [true, "can't be blank"], match:  [/^[a-zA-Z0-9]+$/, 'is invalid'], minlength:[6, "username more than 6 degits"]},
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  sex: String,
  firstName: String,
  lastName: String,
  birthday: Date,
  image: String,
  isDelete: Boolean,
  createBy: String,
  updateBy: String,
  hash: String,
  salt: String,
  notes: String
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

mongoose.model('User', UserSchema);

```

Ở đây chúng ta có thể quy định các validation cho các dữ liệu của model, như các bạn thấy ở username tôi đã quy định cho nó là required, chỉ được phép chữ và số, và minlength phải là 6 kí tự chẳng hạn


### 4.Insert dữ liệu vào MongoDB:

- Thêm middleware body-parser để parse body của các request đến server
- Tạo POST route cho việc gửi dữ liệu tới server
- Lưu trữ các giá trị được điền vào form và lưu trữ vào db với schema
```JS
let registerUser = function (user) {
  let newUser = new dbUser();
  let encryptResult = encryptPassword(user.password);

  newUser.username = user.username;
  newUser.email = user.email;
  newUser.sex = CONSTANTS.SEX.MALE;
  newUser.firstName = user.firstName;
  newUser.lastName = user.lastName;
  newUser.birthday = user.birthday;
  newUser.image = user.image;
  newUser.notes = user.notes;
  newUser.isDelete = true;
  newUser.createBy = user.createBy;
  newUser.updateBy = user.updateBy;
  newUser.salt = encryptResult.salt;
  newUser.hash = encryptResult.hash;

  return newUser.save();
}
```

### 5. Select dữ liệu từ MongoDB :

```JS
let getUserById = function (id) {
  return dbUser.findById(id);
}
```

### 6. Update dữ liệu MongoDB:

```JS
let updateUser = function (req) {
  return dbUser.findById(req.payload.id).then(function (user) {

    // only update fields that were actually passed...
    if (typeof req.body.user.username !== 'undefined') {
      user.username = req.body.user.username;
    }
    if (typeof req.body.user.email !== 'undefined') {
      user.email = req.body.user.email;
    }
    if (typeof req.body.user.sex !== 'undefined') {
      user.sex = req.body.user.sex;
    }
    if (typeof req.body.user.firstName !== 'undefined') {
      user.firstName = req.body.user.firstName;
    }
    if (typeof req.body.user.lastName !== 'undefined') {
      user.lastName = req.body.user.lastName;
    }
    if (typeof req.body.user.birthday !== 'undefined') {
      user.birthday = req.body.user.birthday;
    }
    if (typeof req.body.user.isDelete !== 'undefined') {
      user.isDelete = req.body.user.isDelete;
    }
    if (typeof req.body.user.notes !== 'undefined') {
      user.notes = req.body.user.notes;
    }
    if (typeof req.body.user.image !== 'undefined') {
      user.image = req.body.user.image;
    }
    if (typeof req.body.user.password !== 'undefined') {
      let encryptResult = encryptPassword(req.body.user.password);
      user.salt = encryptResult.salt;
      user.hash = encryptResult.hash;
    }

    return user.save();
  });
}
```