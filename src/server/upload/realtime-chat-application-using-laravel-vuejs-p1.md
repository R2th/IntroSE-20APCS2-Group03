Dự án sắp tới của mình có làm tính năng chat giữa các user với nhau. Nên mình tìm hiểu & giới thiệu luôn. Để thực hiện việc chat real-time thì ta sẽ cần sử dụng 1 bên thứ 3 làm cầu nối giữa server & browser. Đó chính là `Pusher`

# Pusher là gì
Bạn truy cập vào [pusher](https://pusher.com/) sẽ thấy nó được định nghĩa như sau
> Pusher is a simple hosted API for quickly, easily and securely integrating realtime bi-directional functionality via WebSockets to web and mobile apps, or any other Internet connected device.
> 
Nói đơn giản, pusher là một dịch vụ cloud, tạo ra một server trung gian giúp chúng ta có thể xử lý các tác vụ thời gian thực. Dữ liệu được gửi tới pusher, và pusher lại gửi nó đi tới các client đã subscribe (đăng ký) và các channel.
![](https://images.viblo.asia/76ff5b28-36d1-4ef0-8c86-446ec687c5e2.png)

Rất may là laravel cũng support pusher. Bạn có thể vào [đây](https://laravel.com/docs/5.6/broadcasting#driver-prerequisites) để xem chi tiết

Đầu tiên ta phải cài Pusher PHP SDK
> composer require pusher/pusher-php-server "~3.0"
> 

`Pusher` có nhiệm vụ là đẩy thông tin tới các client. Vậy ở client ta sẽ cần phải có 1 cái gì đó để nhận thông tin này. Và đó chính là `Laravel-Echo`

# Laravel Echo
Laravel Echo là một bộ thư viện Javascript giúp cho việc đăng kí các `channel` dễ dàng & lằng nghe các sự kiện được phát bởi Laravel. Ta cài đặt thông qua npm
> npm install --save laravel-echo pusher-js
> 

Bạn vào [đây](https://dashboard.pusher.com/accounts/sign_in) để đăng kí tài khoản & app pusher nhé
Sau bước đăng kí ta sẽ có `app_id`, `key`, `secret`, `cluster`. Bạn điền những thông tin này vào file .env & đổi `BROADCAST_DRIVER=pusher`

# Design DB
Ta sẽ có những tính năng sau
* Hiển thị danh sách bạn bè
* Chọn 1 người bạn để chat
* Thông báo những bạn bè nào đang online
* Thông báo khi nhận được message của bạn bè

Vì thế ta sẽ thiết kế DB như sau ![](https://images.viblo.asia/4d93b6ab-1dc9-4c09-a3a7-ecf50ff5e5a0.png)

`users` hasMany với `friends` thông qua 2 foreign_key: `user_id` & `friend_id`. `friends` sẽ lưu quan hệ giữa 2 user với nhau

`users` hasMany với `chat_rooms` thông qua 2 foreign_key: `user_id` & `friend_id`. `chat_rooms` lưu nội dung chat giữa 2 user

# Implement
## List Friend
Đầu tiên ta sẽ hiển thị danh sách bạn bè của user đang online. Bạn bè ở đây được định nghĩa là user đó là bạn của user khác & ngược lại. Ta sẽ định nghĩa relation kĩ hơn trong Model

Liệt kê tất cả bạn bè của mình
```php
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function friendsOfMine()
    {
        return $this->belongsToMany(User::class, 'friends', 'user_id', 'friend_id');
    }
```

Liệt kê tất cả những user mà mình là bạn của họ
```php
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function friendOf()
    {
        return $this->belongsToMany(User::class, 'friends', 'friend_id', 'user_id');
    }
```
Và danh sách bạn bè của ta sẽ là kết hợp của 2 relation này. Để làm được điều này ta phải dùng đến `merge` trong laravel
```php
    /**
     * @return mixed
     */
    public function friends()
    {
        return $this->friendsOfMine->merge($this->friendOf);
    }
```
Sau khi đã định nghĩa relation giữa `users` & `friends`. Ta chỉ việc gọi hàm `friends` từ controller
```php
    public function index()
    {
        $friends = Auth::user()->friends();
        return view('chat-room.index', compact('friends'));
    }
```
Để phục vụ cho việc chat real-time nên ta sẽ sử dụng view-engine là VueJs đã được tích hợp sẵn trong Laravel
Ở file app.js ta sẽ khai báo thêm 1 component là `list-friend`
```javascript
// app.js
Vue.component('list-friend', require('./components/chat-room/ListFriend.vue'));
```
Tất nhiên là ở file `index.blade.php` ta cũng sẽ phải gọi đến component đó
```php
// index.blade.php
<list-friend :list_friend="{{$friends}}" :onlineusers="onlineusers"></list-friend>
```
```javascript
// ListFriend.vue
<template>
    <ul class="list-group">
        <li class="list-group-item"  v-for="friend in list_friend">
            <img class="avt-friend" :src="friend.avatar" alt="">
            {{friend.name}}
            <online-user :friend="friend" :onlineusers="onlineusers"></online-user>
        </li>
    </ul>                
</template>
<script>
    export default {
        props: ['list_friend'],
    }
</script>
```
Và đây là kết quả của chúng ta

![](https://images.viblo.asia/89da1805-ae50-4758-9991-08359e6a1eed.png)

Ở phần tiếp theo ta sẽ dùng `laravel-echo` & `pusher` mà ta đã tìm hiểu ở đầu bài viết để thực hiện việc chat real-time giữa 2 user với nhau