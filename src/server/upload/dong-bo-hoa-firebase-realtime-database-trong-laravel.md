# Giới thiệu
Trong quá trình sử dụng Firebase, sẽ có lúc bạn cần đồng bộ dữ liệu của mình lên firebase mỗi khi có sự thay đổi. 
Bạn muốn mỗi khi có sự thay đổi ở bảng users trên DB của mình thì sự thay đổi đó cũng được thực hiện trên firebase. Việc thay đổi này là cần thiết vì firebase cho phép chúng ta tạo ra ứng dụng realtime thì thông tin được thay đổi sẽ cập nhật ngay lập tức.
Ví dụ: trong ứng dụng chat realtime thì mỗi khi người dùng cập nhật tên, avatar thì ở màn hình chat, bạn cũng phải cập nhật tên, avatar của member đang chat đúng không nào?

Hôm nay, mình xin giới thiệu với các bạn cách đồng bộ hóa các Eloquent model của bạn với [Firebase Realtime Database](https://firebase.google.com/docs/database/) một cách đơn giản.

# Bắt đầu
Với các bạn chưa từng làm việc với Firebase, bạn có thể bắt đầu thử nghiệm với Firebase bằng cách tạo dự án trên [Firebase Console](https://firebase.google.com/console/).
Sau khi bạn đăng nhập bằng tài khoản Google của mình, hãy tạo một dự án mới.
![](https://images.viblo.asia/c61d47b9-d46d-4879-9206-8db8ea421d7d.png)

![](https://images.viblo.asia/b4896f7c-6532-4b5a-8769-434b67c105f2.png)

Khi dự án được tạo thành công, hãy nhấn "**Add Firebase to your web app**" và sẽ xuất hiện cửa sổ hiển thị cho bạn thông tin đăng nhập API mà bạn sẽ sử dụng để truy cập vào Firebase.
![](https://images.viblo.asia/df1aaa1a-f26f-41ae-9551-14990e3352f2.png)

![](https://images.viblo.asia/a138d868-2bfb-4bc0-8321-7648d5916682.png)

Ứng dụng Laravel của bạn sẽ cần phải được xác thực với Firebase để có quyền ghi dữ liệu vào nó, bạn cần copy **Database Secrets** lấy từ "**Project settings / Service accounts / Database Secrets**".

![](https://images.viblo.asia/2fd5ba84-abd7-4b72-8a4f-a9e15d33b375.png)

Bây giờ bạn đã thu thập tất cả các thông tin cần thiết từ Firebase, chúng ta sẽ tiếp tục với việc tích hợp vào Laravel.

# Chuẩn bị
Trong bài viết này, mình sẽ ví dụ việc đồng bộ lên Firebase với bảng `users` (mặc định trong Laravel) có các thông tin như sau:
```php
Schema::create('users', function (Blueprint $table) {
        $table->increments('id');
        $table->string('name');
        $table->string('email')->unique();
        $table->string('password');
        $table->rememberToken();
        $table->timestamps();
});
```

# Triển khai
Cài đặt Firebase Sync bằng lệnh:
```sh
composer require mpociot/laravel-firebase-sync
```
Tiếp theo, trong file config/services.php, chúng ta thêm 1 array mới với các thông tin của firebase.
```php
'firebase' => [
    'api_key' => env('FIREBASE_API_KEY'),
    'auth_domain' => env('FIREBASE_AUTH_DOMAIN'),
    'database_url' => env('FIREBASE_DATABASE_URL'),
    'project_id' => env('FIREBASE_PROJECT_ID'),
    'storage_bucket' => env('FIREBASE_STORAGE_BUCKET'),
    'messaging_sender_id' => env('FIREBASE_MESSAGING_SENDER'),
]
```
Các thông tin này mình sẽ lưu lại tại file `.env`:
```
FIREBASE_API_KEY=AIzaSyC5UJQnSMK17rvCf-gDCfvvSccNWOyoYoU
FIREBASE_AUTH_DOMAIN=sync-project-e8ed9.firebaseapp.com
FIREBASE_DATABASE_URL=https://sync-project-e8ed9.firebaseio.com
FIREBASE_PROJECT_ID=sync-project-e8ed9
FIREBASE_STORAGE_BUCKET=sync-project-e8ed9.appspot.com
FIREBASE_MESSAGING_SENDER=121873760342
```
Tạo model user trong file app/User.php (nếu chưa có vì mặc định Laravel đã tạo cho mình rồi), sau đó thêm `use SyncsWithFirebase` trong model vào:
```php
<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Mpociot\Firebase\SyncsWithFirebase;

class User extends Authenticatable
{
    use Notifiable, SyncsWithFirebase;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
```
Thông qua việc use trait SyncsWithFirebase vào model, việc tạo mới, cập nhật và xóa sẽ được đồng bộ với Firebase Realtime Database.

# Thao tác
## Thêm dữ liệu
Mình sẽ demo việc thêm 1 user mới và nó sẽ đồng bộ lên firebase.
```php
Route::get('/', function () {
    \App\User::create([
        'name' => 'Tien Dat Duong',
        'email' => 'duong.tien.dat@framgia.com',
        'password' => bcrypt('123456'),
     ]);
});
```
Đây là kết quả sau khi mình thêm dữ liệu, ngoài việc dữ liệu sau khi tạo mới sẽ được thêm vào DB của mình thì nó còn được đồng bộ lên firebase như thế này:

![](https://images.viblo.asia/1d12462d-234b-4a11-9b5a-5081982dc2ef.png)

*Dữ liệu trên DB thật*

![](https://images.viblo.asia/f134a987-ae0e-4c34-90a0-cd97da470f5e.png)

*Dữ liệu trên Firebase Realtime Database*

## Sửa dữ liệu
```php
Route::get('/', function () {
    $user = \App\User::where('email', 'duong.tien.dat@framgia.com')->first();
    $user->name = 'Updated';
    $user->save();
});
```
![](https://images.viblo.asia/77812997-1acc-4456-b62e-6dcba375d53c.png)

*Dữ liệu trên DB thật*

![](https://images.viblo.asia/b14a3b08-97b3-4037-900e-589ea6204eb2.png)

*Dữ liệu trên Firebase Realtime Database*

## Xóa dữ liệu
```php
Route::get('/', function () {
    \App\User::find(3)->delete();
});
```
![](https://images.viblo.asia/ce47f67c-ccf8-4fb3-a7e7-2ae86a550a37.png)

*Bản ghi đã bị xóa trên DB thật*

![](https://images.viblo.asia/95375236-5ce7-4dbd-b43e-3abfdb4de223.png)

*Bản ghi đã không còn tồn tại trên Firebase Realtime Database*

# Ứng dụng
Mình sẽ làm 1 ví dụ cụ thể mà việc đồng bộ hóa từ Laravel lên Firebase áp dụng được vào. Đó là mỗi khi có user được thêm/sửa/xóa thì sẽ hiển thị realtime lên màn hình show bên phía client. Mình viết ứng dụng nhỏ này nó bằng VueJS để các bạn tham khảo.

## Cài đặt
Để client nhận được dữ liệu từ Firebase, chúng ta cần cài firebase:
```sh
npm install firebase
```
## Thêm route
`routes/web.blade.php`
```php
Route::get('/test', function () {
    return view('test');
});
```
## Coding
* Truyền config của firebase từ Laravel sang JS
`resources/views/test.blade.php`:
```html
<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        {{ Html::style(asset('css/app.css')) }}
    </head>
    <body>
        <div id="app" class="flex-center position-ref full-height">
            <example-component></example-component>
        </div>

        <script type="text/javascript">
            // Initialize Firebase
            window.firebaseConfig = {
                apiKey: "{{ config('services.firebase.api_key') }}",
                authDomain: "{{ config('services.firebase.auth_domain') }}",
                databaseURL: "{{ config('services.firebase.database_url') }}",
                storageBucket: "{{ config('services.firebase.storage_bucket') }}",
            };
        </script>
        {{ Html::script(asset('js/app.js')) }}
    </body>
</html>
```
* Template
`resources/assets/js/app.js`
```js

require('./bootstrap');

window.Vue = require('vue');

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app'
});
```
`ExampleComponent.vue`
```js
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-12">
                <h1>Users</h1>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users">
                            <td>
                                {{ user.name }}
                            </td>
                            <td>
                                {{ user.email }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        data () {
            return {
                users: [] // mảng users chứa thông tin của các user lấy từ firebase về
            }
        },
        mounted() {
            firebase.initializeApp(window.firebaseConfig);
            // Khởi tạo firebase realtime database.
            firebase.database().ref('users/').on('value', (snapshot) => {
                this.users = snapshot.val(); // Mỗi khi dữ liệu của users trên Firebase thay đổi, sẽ cập nhật vào mảng users.
            });
        }
    }
</script>
```
Sau khi code xong file js, bạn cần chạy `npm run dev` hoặc `npm run watch` để js hoạt động.
## Kết quả
Kết quả mà mình nhận được sẽ là bảng hiển thị dữ liệu của các users được đồng bộ hóa với Firebase Realtime Database. 

Khi bạn lấy dữ liệu từ 1 địa chỉ tham chiếu (reference) từ firebase, nó sẽ luôn giữ kết nối với server của firebase và trả về dữ liệu mới nhất qua `snapshot`. Mỗi khi có sự thay đổi dữ liệu trên firebase, mình đã gán dữ liệu từ `snapshot` của firebase vào biến `users` của **VueJS**.
VueJS luôn tự động cập nhật giá trị của 1 biến ngay lập tức khi biến đó có sự thay đổi. Do đó cho phép chúng ta cập nhật users vào bảng ngay lập tức mỗi khi firebase trả dữ liệu realtime về.

Bạn có thể test bằng cách mở 2 tab trên trình duyệt, 1 tab thao tác việc thêm/sửa/xóa user như mình đã làm ở thao tác bên trên, 1 tab theo dõi sự thay đổi của dữ liệu thông qua bảng.

![](https://images.viblo.asia/b2f295ea-3fd8-4df2-936f-2ceac822f407.png)

Các bạn có thể tham khảo [toàn bộ source code của mình trên Github tại đây](https://github.com/mrduong92/firebase-sync).
# Kết luận
Simple enough! Quá đơn giản phải không nào? Việc của bạn chỉ đơn giản là use trait `SyncsWithFirebase` trong model mà bạn cần đồng bộ là xong. Với việc này, bạn sẽ có dữ liệu ở cả 2 cơ sở dữ liệu - một cơ sở dữ liệu realtime của Firebase và cả dữ liệu trong mySQL của bạn để sử dụng với Laravel Eloquent ORM.

Nhưng cái gì cũng có nhược điểm của nó. Có 1 lưu ý rằng đây không phải là "đồng bộ hóa" thực sự, vì dữ liệu được xử lý trong Firebase sẽ không được đồng bộ hóa trở lại ứng dụng Laravel của bạn (đồng bộ hóa 1 chiều `Server -> Firebase`).

Nếu bạn muốn đồng bộ hóa chiều còn lại từ `Firebase -> Server` thì mình nghĩ các bạn cần 1 server NodeJS, chạy background 24/7 và lắng nghe mọi sự thay đổi của Firebase.
Firebase đã cung cấp các event để xử lý việc lắng nghe các thay đổi ([child_added](https://firebase.google.com/docs/database/admin/retrieve-data#child-added), [child_changed](https://firebase.google.com/docs/database/admin/retrieve-data#child-changed), [child_removed](https://firebase.google.com/docs/database/admin/retrieve-data#child-removed), [child_moved](https://firebase.google.com/docs/database/admin/retrieve-data#child-moved)) và bạn có thể dựa vào đó để đồng bộ dữ liệu ngược lại từ Firebase lên Server.

Hy vọng, bài viết của mình sẽ giúp ích cho các bạn trong các dự án mà các bạn triển khai. Cám ơn các bạn đã dành thời gian đọc bài viết của mình!

# Tham khảo
https://github.com/mpociot/laravel-firebase-sync

http://marcelpociot.de/blog/2016-06-20-synchronise-laravel-eloquent-models-with-firebase