## Giới thiệu

Ở bài viết này chúng ta tìm hiểu các xây dựng một ứng dụng đếm số người online mà không cần phải tải lại trang.  Để xây dựng ứng dụng chúng ta tử dụng Laravel và Pusher. 
Vậy pusher là gì?

pusher là một dịch vụ cloud, tạo ra một server trung gian giúp chúng ta có thể xử lý các tác vụ thời gian thực. Dữ liệu được gửi tới pusher, và pusher lại gửi nó đi tới các client đã subscribe (đăng ký) và các channel.

![](https://images.viblo.asia/fa2d9654-350d-4432-8a66-4000defecfe8.png)

### Ưu và nhược điểm của pusher
* Ưu điểm: Thời gian xây dựng ứng dụng ngắn để có thể tạo ra 1 ứng dụng realtime sử dụng pusher mà không cần biết quá nhiều kiến thức.
* Nhược điểm: Sử dụng qua sever trung gian nên tương tác sẽ chậm hơn 1 chút nhưng không đáng kể.
* Đối với những ứng dụng có số lượng người dùng cao hay lượng request trong ngày cao thì cần phải nâng cấp hoặc sử dụng công nghệ khác tối ưu hơn.

## Cài đặt một ứng dụng mới trên Pusher

Đăng kí tài khoảng trên Pusher ([link](https://dashboard.pusher.com/accounts/sign_up))

![](https://images.viblo.asia/9c7c3ae1-9a69-4495-b4f4-da794f411fb9.png)

## Tạo project laravel và cài đặt Pusher SDK, Echo
Tạo một project laravel 

> laravel new realtime-counter-laravel-pusher

Tiếp theo, Tiếp theo sử dụng composer để cài đặt Pusher PHP SDK 

> composer require pusher/pusher-php-server

Tiếp theo cài đặt npm 

> npm install

Tiếp theo cài đặt 2 thư viện  Laravel Echo and Pusher JS

*Laravel Echo là thư viện JavaScript nó dùng để đăng ký kênh và lắng nghe event events broadcast bởi Laravel. Do vậy cần phải cài Echo qua NPM package manager. Trong ví dụ này, chúng ta còn cài đặt  pusher-js vì chúng ta cần sử dụng Pusher broadcaster:*

> npm install --save laravel-echo pusher-js

Tiếp theo run

> php artisan make:auth

## Cấu hình project

Đầu tiên tạo giá trị cho `APP_ID`, `APP_KEY`, `APP_SECRET` và `APP_CLUSTER` trong file .env

```
# .env

BROADCAST_DRIVER=pusher

PUSHER_APP_ID=your-pusher-app-id
PUSHER_APP_KEY=your-pusher-app-key
PUSHER_APP_SECRET=your-pusher-app-secret
PUSHER_APP_CLUSTER=your-pusher-app-cluster
```

Tiếp theo ở cuối file` resources/assets/js/bootstrap.js` thêm đoạn code:

```javascript
import Echo from "laravel-echo"

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'your-pusher-app-key',
    cluster: 'ap2',
    encrypted: true
});
```

## Online users

Ở ứng dụng này, Hiển thị số người online trên trang khi có bất cứ người dùng nào truy cập trang hoặc thoát khỏi trang ứng dụng đều cập nhập số người online.

Để lắng nghe sự kiện người dùng truy cập hoặc thoát khỏi trang thì cần sử dụng hàm `listen`
```javascript
listen() {
    Echo.join('counter')
        .here(users => this.count = users.length)
        .joining(user => this.count++)
        .leaving(user => this.count--);
}
```
* **Join** : khi người dùng truy cập
* **here** : Cung cấp một danh sách người dùng hiện đang truy cập 
* **joining**: thực thi khi các người dùng khác tham gia kênh
* **leaving**: thực thi khi người dùng rời khỏi kênh

## Authorization
Mỗi kênh hiện diện là một kênh riêng, trong BroadcastServiceProvider chúng ta sẽ thiết lập các quyền cho kênh. Để xác thực cho phép người dùng lắng nghe một kênh cụ thể thì trong `routes/channels.php` thêm đoạn code:
```php
Broadcast::channel('video', function ($user) {
    return [
        'id' => $user->id,
        'name' => $user->name,
    ];
});
```

Như chúng ta thấy return không phải là true hay false. Nếu người dùng xác thực lắng nghe trên kênh thì sẽ return một mảng giá trí bao gồm id và name của user.

Tuy nhiên chúng ta có thể viết một logic khác tùy thuộc vào mỗi yêu cầu cụ thể của từng ứng dụng chẳng hạn như:
```php
Broadcast::auth('video', function ($user) {
    if ($user) {
        return [
            'id' => $user->id,
            'name' => $user->name
        ];
    }
    
    return false;
});
```

## Vue Component

Ở trên chúng ta đã cài đặt và cấu hình, tiếp theo là hiển thị số người đang online trên page bằng vuejs

```javascript
<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Realtime Counter</div>

                    <div class="panel-body">
                        <p class="lead text-center">Online Now</p>
                        <h1 class="text-center">{{ this.count }}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: 0
            }
        },
        mounted() {
            this.listen();
        },
        methods: {
            listen() {
                Echo.join('counter')
                    .here(users => this.count = users.length)
                    .joining(user => this.count++)
                    .leaving(user => this.count--);
            }
        }
    }
</script> 
```

Dưới đây là minh họa số người  đang truy cập.

![](https://images.viblo.asia/256d94f0-8bb3-4231-bb87-771e4c0958e0.gif)

## Kết luận
Trên đây là bài viết tạo một ứng dụng đếm số người online trên page. Bài viết đã giới thiệt về các khái niệm cơ bản cũng như các cài đặt cấu hình để xây dựng ứng dụng bằng laravel ở phía BE và vue ở phía FE.

## Tài liệu tham khảo 
https://pusher.com/tutorials/counter-laravel