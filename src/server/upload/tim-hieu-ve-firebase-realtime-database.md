# Firebase Realtime Database là gì?
Realtime Database một service của Firebase. Theo định nghĩa trong tài liệu của firebase thì Realtime Database là:
> Store and sync data with our NoSQL cloud database. Data is synced across all clients in realtime, and remains available when your app goes offline.
> 
> The Firebase Realtime Database is a cloud-hosted database. Data is stored as JSON and synchronized in realtime to every connected client. When you build cross-platform apps with our iOS, Android, and JavaScript SDKs, all of your clients share one Realtime Database instance and automatically receive updates with the newest data.

Dịch nôm na thì nó có nghĩa là một cơ sở dữ liệu NoSQL lưu và đồng bộ dữ liệu trên mây. Dữ liệu được đồng bộ trên tất cả clients trong thời gian thực, và vẫn khả dụng khi ứng dụng offline.

Firebase Realtime Database là cơ sở dữ liệu lưu trữ trên mây. Dữ liệu được lưu trữ và đồng bộ hóa theo thời gian thực với mỗi client được kêt nối. Khi bạn xây dựng ứng dụng đa nền tẩng với iOS, Android, và javascript SDK, tất cả các client của bạn chia sẽ một thể hiện Realtime Database và tự động tiếp nhận các thay đổi với dữ liệu mới nhất.

# Các khả năng chính của Realtime Database
*  Realtime:

Firebase Realtime Database sử dụng đồng bộ dữ liệu mối khi dữ liệu có thay đổi, mọi thiết bị được kết nối sẽ nhận được thay đổi trong vài mili giây.
* Offline:

Khi người dùng ngoại tuyến, dữ liệu sẽ được lưu trên bộ nhớ cache của thiết bị và tự động đồng bộ khi bạn trực tuyến. Tất cả là tự động

* Accessible from Client Devices

Firebase Realtime Database có thể truy cập từ một thiết bị mobile hoặc trình duyệt web. Nó không cần một ứng dụng server nào cả. Bảo mật và xác thực dữ liệu có thể thông qua các Rule bảo mật của Firebase Realtime Database, các rule được thực thi khi dữ liệu được đọc hoặc ghi.

# Cài đặt Realtime Database trong Javascript

Bạn phải chỉ định Realtime Database URL khi cài đặt lên JavaScript trong ứng dụng của bạn

Bạn có thể tìm thấy Realtime Database URL trong tab Database trong Firbase console. Nó sẽ có dạng như https://<databaseName>.firebaseio.com.
Chúng ta sử dụng code sau để  import:
```

<script src="https://www.gstatic.com/firebasejs/5.4.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "APIkey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://databaseName.firebaseio.com",
    projectId: "projectId",
    storageBucket: "bucket.appspot.com",
    messagingSenderId: "messagingSenderId"
  };
  firebase.initializeApp(config);
</script>
```
Các thông tin kết nối thì chúng ta có thể lấy ở đây 
```
https://console.firebase.google.com/u/0/
```
rồi chọn dự án bạn đã tạo.. ở tab Overview khung bên phải bạn sẽ thấy "Add firebase to your web app" như thế này
![](https://images.viblo.asia/bfe2f58a-4b15-47ce-9802-a456efecd4d8.png)

click vào đó để  thấy thông tin kết nối nhé

OK.. sẵn sàng để sử dụng nào :))
# CRUD dữ liệu trong FRD 

vì là demo nên mình chỉ chạy trên cửa sổ console của trình duyệt của ứng dụng web

## Thêm dữ liệu vào FRD:

**set(value, onComplete)**

```
function writePost(postId, title, content) {
    firebase.database().ref('post/' + postId).set({
        title: title,
        content: content
      })
}
```
writePost(1, 'demo realtime database', 'tim hieu realtime database')

sau khi chạy ta check trên database firebase thì sẽ có kq như thế này:
![](https://images.viblo.asia/4ca52faf-9ac0-4fd1-813d-4273a6a4ec9a.png)

Hàm set là hàm viết dữ liệu vào database, và cũng viết đè lên bất cứ dữ liệu trùng nào có sẵn

Việc truyền null cho value ở param tương đương với việc gọi remove (); cụ thể là, tất cả dữ liệu tại vị trí này và tất cả các vị trí con sẽ bị xóa.

**push(value, onComplete)**

Tạo ra một vị trí con mới bằng cách sử dụng một unique key và trả về  Reference của nó.

Đây là function phổ biến nhất để thêm dữ liệu vào một tập hợp các mục.

Nếu bạn truyền value để push(), value sẽ được ghi vào vị trí đã tạo. Nếu bạn không truyền value, không có gì sẽ được ghi vào Database và child vẫn trống (nhưng nó vẫn trả về Reference bạn có thể sử dụng nó vào nơi khác).

Unique key được tạo bởi push() được sắp xếp theo thời gian hiện tại, do đó danh sách các mục sẽ được sắp xếp theo thứ tự thời gian. Các key cũng được thiết kế để không thể  đoán được (chúng chứa 72 bit ngẫu nhiên của entropy)

##  Update dữ liệu

**update(values, onComplete)**

Để update các giá trị của node, các bạn sử dụng hàm update đơn giản như sau
```
var updates = {};
updates['posts/' + 'key-của-record-1'] = 'new value';
updates['posts/' + 'key-của-record-2'] = 'new value';
...
//ở đây bạn có thể update nhiều giá trị
firebase.database().ref().update(updates);
```

## Delete dữ liệu 
**remove(onComplete)**
```
firebase.database().ref('post/key-can-xoa').remove()
```

## Đọc dữ liệu

Đối với việc đọc dữ liệu, chúng ta cũng có 2 cách:

**on(eventType, callback, cancelCallbackOrContext, context)**

 Đọc và hiển thị lại mỗi khi có dữ liệu thay đổi, sử dụng method on (Gặp nhiều trong các ứng dụng realtime như chat hay notification)
 
 eventType bao gồm các kiểu:
 
 ```
 eventType: "value", "child_added", "child_changed", "child_removed", or "child_moved."
 ```
 
 Handle khi có một giá trị mới:
 
```
ref.on('value', function(dataSnapshot) {
  ...
});
```

Handle khi có một child mới:
```
ref.on('child_added', function(childSnapshot, prevChildKey) {
  ...
});
```
Handle child removal:
```
ref.on('child_removed', function(oldChildSnapshot) {
  ...
});
```
Handle child data changes:
```
ref.on('child_changed', function(childSnapshot, prevChildKey) {
  ...
});
```

Handle child ordering changes:
```
ref.on('child_moved', function(childSnapshot, prevChildKey) {
  ...
});
```
**once(eventType, successCallback, failureCallbackOrContext, context)**

Đọc 1 lần duy nhất và không đọc lại lần nữa thì chúng ta sẽ sử dụng method once (Thường được áp dụng khi khởi tạo dữ liệu)
```
firebase.database().ref().once('value')
  .then(function(dataSnapshot) {
    // handle read data.
  });
```
# Lời kết
Trên đây là những kiển thức cơ bản về Realtime database. Bài viết của mình còn nhiều thiếu sót. Mong các bạn góp ý thêm cho mình. Cảm ơn sự quan tâm, theo dõi của các bạn.

Tài liệu tham khảo: 
https://firebase.google.com/docs/database/