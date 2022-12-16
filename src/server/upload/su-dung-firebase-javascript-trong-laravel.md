Hi mọi người,<br>
Bài viết này mình sẽ chia sẻ cách sử dụng firebase javascript trong laravel với các chức năng cơ bản như thêm, sửa, xóa dữ liệu.
### Step1: Đăng nhập vào firebase bằng tài khoản google
- Truy cập vào link [https://firebase.google.com/](https://firebase.google.com/) và click vào button **Sign in** ở góc trên cùng bên phải màn hình để login vào firebase.<br>
- Nếu đăng nhập thành công thì màn hình bên dưới sẽ được hiển thị và các bạn hãy thao tác các bước như ảnh.<br>
![](https://images.viblo.asia/06cbcb60-6b25-49af-bfaf-5215bb7494e0.png)

### Step2: Tạo config
- Nhập một tên project bất kỳ và đăng ký các bước như ảnh và cuối cùng click vào button Add Firebase.<br>
![](https://images.viblo.asia/8670e865-3f0a-4164-ab56-6d05a072413b.png)<br>

- Tiếp theo click vào button Continue và sau đó click vào biểu tượng có chữ Web nhé.<br>
![](https://images.viblo.asia/b268e6fd-f364-464d-b355-f384c8f9ae56.png)<br>

- Đăng ký các bước bên dưới để tạo  Firebase SDK(cái này mình sẽ dùng để kết nối đến firebase trong code của mình nhé).<br>
![](https://images.viblo.asia/d7a83d3d-40c1-4323-9e59-cb00ea440c24.png)<br>

- Truy cập vào link [https://firebase.google.com/](https://firebase.google.com/) và click vào tên dự án của mình vừa tạo nhé.<br>
- Tạo một database để lưu trữ dữ liệu khi thêm, sửa, xóa dữ liệu.<br>
![](https://images.viblo.asia/0fc190df-dc3e-40b4-a2bb-0b89c9aa86e9.png)
<br>
![](https://images.viblo.asia/67833636-2175-470f-8d24-a7b8161c217f.png)

### Step3: Download thư viện firebase javascript
- Truy cập vào menu Docs=>Reference và chọn Javascript version 8(trong bài này mình sẽ demo trên version 8 nhé).<br>
![](https://images.viblo.asia/5d581586-b4db-4fbc-b9a1-5b7b24cc4d56.png)

- Click vào dropdown Code và download source về máy tính.<br>
![](https://images.viblo.asia/ca54fc0e-e19a-468f-b639-9c3a616f091f.png)

- Giải nén và đổi tên thư mục rồi copy tất cả source code vào thư mục public của laravel nhé.<br>
![](https://images.viblo.asia/97b71dfe-8bd4-4f22-8b80-ccb0561abb04.png)

### Step4: Ví dụ
Đầu tiên mình sẽ click vào dự án mình vừa tạo và click vào icon setting như ảnh.<br>
![](https://images.viblo.asia/c665e0da-1c92-4b76-8fa9-870235a7839a.png)

Ở tab General kéo xuống cuối và copy đoạn config về máy tính của mình.<br>
![](https://images.viblo.asia/af8fd2ff-8461-4fb8-a0b5-00ffba7ec636.png)

**Tạo route trong routes/web.php**
```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
```

**Tạo controller trong App\Http\Controllers\HomeController.php**
```php
<?php
   
namespace App\Http\Controllers;
  
use Illuminate\Http\Request;
use App\Models\User;
use Validator;
   
class HomeController extends Controller
{
    public function index()
    {
        return view('home');
    }
}
```
**Tạo view home.blade trong resources\views\home.blade.php**<br>
**Thêm dữ liệu**
```php
@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Laravel 8</div>
                <div class="card-body">
                    Sử dụng Firebase Javascript trong Laravel
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section('script')
<script src="{{ asset('firebase/firebase-app.js')}}" type="module"></script>
<script src="{{ asset('firebase/firebase-database.js')}}" type="module"></script>
<script type="module">
    const firebaseConfig = {
        apiKey: "AIzaSyAsdmpqt9dEJKr6gFbk8KsOExyk9HiZDj0",
        authDomain: "gentle-platform-234210.firebaseapp.com",
        databaseURL: "https://gentle-platform-234210-default-rtdb.firebaseio.com",
        projectId: "gentle-platform-234210",
        storageBucket: "gentle-platform-234210.appspot.com",
        messagingSenderId: "28582419912",
        appId: "1:28582419912:web:216a88db96253760daf4fd",
        measurementId: "G-N69LDCW4ZN"
    };

    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    function writeUserData(userId, name, email, imageUrl) {
      database.ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
      });
    }

    writeUserData('1', 'Gaucon','test@gmail.com', 'urlxxxx')
</script>
@endsection
```

Sau khi chạy code bên trên,một bản ghi sẽ được thêm vào cơ sở dữ liệu trong Realtime Database.<br>
![](https://images.viblo.asia/d841687d-0d47-4ac8-86fb-8b38ef2b1e30.png)

**Lấy dữ liệu**
```javascript
    var user = firebase.database().ref('users/1');
    user.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
```
**Output:**
```javascript
{email: 'test@gmail.com', profile_picture: 'urlxxxx', username: 'Gaucon'}
```
**Cập nhật dữ liệu**
```javascript
    var postData = {
        username: 'obama',
        email: 'obama@gmail.com',
        profile_picture : 'Urlxxx123'
    };
    var updates = {};
    updates['/users/1'] = postData;
    firebase.database().ref().update(updates);
```
**Output:**<br>
![](https://images.viblo.asia/8204bbdc-f081-4a39-833e-6e48a8376ead.png)

**Xóa dữ liệu**
```javascript
firebase.database().ref('/users/1').remove();
```

Tham khảo: [https://firebase.google.com/docs/database/web/read-and-write](https://firebase.google.com/docs/database/web/read-and-write)