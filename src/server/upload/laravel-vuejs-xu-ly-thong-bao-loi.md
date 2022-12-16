## Giới thiệu

![](https://images.viblo.asia/943c4de5-01d8-4027-8755-6e5eb6e5c5ca.png)


Chào các bạn , đây là bài đầu tiên trong loạt series Laravel (6.x) và VueJS mình sẽ chia sẻ trong thời gian sắp tới . Trong chủ đề này , mình sẽ hướng dẫn các bạn sử dụng VueJS ( phía frontend ) để xử lý lỗi từ Laravel trả về ( phía backend ) hay nôm na còn gọi là Server Validation :D . Tất cả những loạt bài này theo mình nghĩ nó là kiến thức cơ bản , nhưng đối với những bạn mới học 2 bộ môn này và muốn kết hợp chúng với nhau chắc sẽ rất cần thiết đấy. Bắt đầu thôi nhể , 

## Cài đặt môi trường

### Laravel Install

```sh
composer create-project --prefer-dist laravel/laravel handle-error
```

Tại thời điểm mình viết bài này là đang thực hiện trên Laravel 6.7 các bạn nhé XD
Tạo file .env và key :D

```sh
cp .env.example .env && php artisan key:generate
```

Các bạn nhớ chỉnh sửa database tại file .env nhé 
Tiếp theo mình sử dụng sẵn lệnh `make:auth` của Laravel để tạo ra các template làm demo cho lẹ , lưu ý là Laravel 6.x trở đi muốn tạo `make:auth` thì các bạn tạo theo cách dưới nhé

```sh
composer require laravel/ui --dev
php artisan migrate
npm install && npm run watch
```

### Chỉnh sửa lại code

Ok tiếp nào, khi các bạn chạy lệnh composer ở trên để cài make:auth ấy , laravel đã gen ra cho các bạn các thành phần cần thiết của Vue rồi 
Các template auth nó nằm trong `resources/views/auth` đó :D
Phần mình demo validate trong tut này sẽ là trang đăng ký của laravel, các bạn để ý thì sẽ thấy 
Nó được xử lý ở trong Controller `app/Controllers/Auth/RegisterController.php` bao gồm cả phần validate luôn rồi 
Giờ mình sẽ sửa lại 1 chút ở `register.blade.php` với `app.js` cho Vue thôi

`app.js`
```javascript
require('./bootstrap');

window.Vue = require('vue');
Vue.component('example-component', require('./components/ExampleComponent.vue').default);

class Errors {
    constructor() {
        this.errors = {};
    }

    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }

    record(errors) {
        this.errors = errors.errors;
    }
}

const app = new Vue({
    el: '#app',
    data: {
        fields: {},
        errors: new Errors(),
    },
    methods: {
        submit() {
            axios.post('/register', this.fields).then(response => {
                console.log('Success');
            }).catch(error => {
                if (error.response.status === 422) {
                    this.errors.record(error.response.data) || {};
                }
            });
        }
    }
});

```

Ở trên mình có tạo ra 1 class Errors để thuận tiện cho việc xử lý cả những errors phức tạp sau này :d , chuẩn hơn các bạn nên tạo nó thành 1 file riêng
Biến fields trong data sẽ lưu trữ tất cả các trường trên form và biến errors là 1 instance của class Errors, mình dùng axios để call api lên nếu như nó bị lỗi mình sẽ ném cục data trả về vào trong biến này.
Ở bên file `register.blade.php` mình sửa lại như sau 

```html
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Register') }}</div>

                <div class="card-body">
                    <form @submit.prevent="submit">
                        @csrf

                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Name') }}</label>

                            <div class="col-md-6">
                                <input type="text" class="form-control" :class="{ 'is-invalid' : errors.get('name') }" v-model="fields.name">
                                <span class="invalid-feedback" role="alert">
                                    <strong>@{{ errors.get('name') }}</strong>
                                </span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input type="text" class="form-control" :class="{ 'is-invalid' : errors.get('email') }" v-model="fields.email">
                                <span class="invalid-feedback" role="alert">
                                    <strong>@{{ errors.get('email') }}</strong>
                                </span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input type="password" v-model="fields.password" class="form-control" :class="{ 'is-invalid' : errors.get('password') }">
                                <span class="invalid-feedback" role="alert">
                                    <strong>@{{ errors.get('password') }} </strong>
                                </span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('Confirm Password') }}</label>
                            <div class="col-md-6">
                                <input type="password" v-model="fields.password_confirmation" class="form-control">
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Register') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

```

Ở trên mình có 1 thẻ span có class là invalid-feedback thẻ này sẽ chứa thông báo lỗi thông qua 
biến errors gọi tới hàm get và truyền vào params bị lỗi đã được định nghĩa ở phần validate của RegsiterController
Lưu ý là ở đây do mình viết vuejs trong file .blade.php nên muốn gọi được các biến của VueJS để không bị nhầm lẫn với của Laravel mình thêm @ ở trước dấu {{ .

Vậy là xong :D Chạy ngay
```sh
php artisan serve
```

và truy cập **localhost:8000/register** để hưởng thụ thành quả nhớ :D 
Đây là kết quả của mình :

![](https://images.viblo.asia/a9db2284-62d6-4702-a96a-e7dfa65a8c90.png)

Các bạn có thể tham khảo source của bài viết tại đây : 
[https://github.com/hieudt/laravel-vuejs-handle-error](https://github.com/hieudt/laravel-vuejs-handle-error)
Chào thân ái và hẹn gặp lại vào các bài chia sẻ sau :D Đừng quên để lại 1 +up vote nếu thấy có ích hoặc có thắc mắc hay đóng góp gì hãy comment bên dưới nhé