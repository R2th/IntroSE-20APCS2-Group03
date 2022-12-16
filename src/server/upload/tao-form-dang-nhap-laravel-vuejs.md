## **I. Chuẩn bị** 
- Tạo project laravel  **lara-vue-auth** bằng câu lệnh sau:
    ```
    composer create-project laravel/laravel lara-vue-auth --prefer-dist
    ```
- Sau khi tạo được project **lara-vue-auth** ta di chuyển vào thư mục gốc và cài đặt `npm`
    ```
    cd lara-vue-auth
    npm install
    ```
- Chỉnh sửa file **.env** kết nốt database và chạy lệnh migrate để tạo bảng *users*, *password_resets *:
    ```
    php artisan migrate
    ```
- Cài đặt một vài thư viện vue cần thiết với câu lệnh:
    ```
    npm install --save-dev vue-axios vue-router vue-loader vue-template-compiler
    ```

## **II. Vue component**
- Tạo file **App.vue** trong thư mục **resource/assets/js/** với nội dung:
    ```HTML
    <template>
        <div class="panel panel-default">
            <div class="panel-heading">
                <nav>
                    <ul class="list-inline">
                        <li>
                            <router-link :to="{ name: 'home' }">Home</router-link>
                        </li>
                        <li class="pull-right">
                            <router-link :to="{ name: 'login' }">Login</router-link>
                        </li>
                        <li class="pull-right">
                            <router-link :to="{ name: 'register' }">Register</router-link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="panel-body">
                <router-view></router-view>
            </div>
        </div>
    </template>
    ```
- Tạo một file khác với tên **Home.vue** nhưng ở trong thư mục **resources/assets/js/components** với nội dung:
    ```HTML
    <template>
        <h1>Laravel 5 Vue SPA Authentication</h1>
    </template>
    ```
- Tiếp theo ta update file **resource/assets/js/app.js**:
    ```JS
   import Vue from 'vue';
    import VueRouter from 'vue-router';
    import App from './App.vue';
    import Home from './components/Home.vue';

    Vue.use(VueRouter);

    const router = new VueRouter({
        routes: [
            {
                path: '/',
                name: 'home',
                component: Home
            },
        ]
    });

    new Vue({
        el: '#app',
        router: router,
        render: app => app(App)
    });
    ```
- Ta thay đổi nội dung **resources/views/welcome.blade.php** thành như sau:
    ```HTML
   <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel</title>

        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">

    </head>
    <body>
        <div class="container">
            <div id="app"></div>
        </div>
        <script src="/js/app.js"></script>
    </body>
    </html>
    ```
- Trước khi test thử ta cần compile file **app.js** bằng câu lệnh:
    ```
    npm run dev
    ```
- Đến đây ta sẽ chạy 1 server để test thử:
    ```
    php artisan serve
    ```
- Truy cập vào đường link `http://localhost:8000` trên trình duyệt để xem kết quả.
- Tiếp đến ta sẽ tạo component vue với tên **Register.vue** trong thư mục **resources/assets/js/components**:
    ```
    //Register.vue

    <template>
        <div>
            <div class="alert alert-danger" v-if="error && !success">
                <p>There was an error, unable to complete registration.</p>
            </div>
            <div class="alert alert-success" v-if="success">
                <p>Registration completed. You can now <router-link :to="{name:'login'}">sign in.</router-link></p>
            </div>
            <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">
                <div class="form-group" v-bind:class="{ 'has-error': error && errors.name }">
                    <label for="name">Name</label>
                    <input type="text" id="name" class="form-control" v-model="name" required>
                    <span class="help-block" v-if="error && errors.name">{{ errors.name }}</span>
                </div>
                <div class="form-group" v-bind:class="{ 'has-error': error && errors.email }">
                    <label for="email">E-mail</label>
                    <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email" required>
                    <span class="help-block" v-if="error && errors.email">{{ errors.email }}</span>
                </div>
                <div class="form-group" v-bind:class="{ 'has-error': error && errors.password }">
                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" v-model="password" required>
                    <span class="help-block" v-if="error && errors.password">{{ errors.password }}</span>
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
    </template>
    ```
- Tạo thêm một file nữa cũng trong thư mục trên với tên **Login.vue**:
    ```HTML
    <template>
        <div>
            <div class="alert alert-danger" v-if="error">
                <p>There was an error, unable to sign in with those credentials.</p>
            </div>
            <form autocomplete="off" @submit.prevent="login" method="post">
                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" v-model="password" required>
                </div>
                <button type="submit" class="btn btn-default">Sign in</button>
            </form>
        </div>
    </template>
    ```
- Và tạo thêm file cuối **Dashboard.vue**:
    ```HTML
    <template>
        <h1>Laravel 5 – Our Cool Dashboard</h1>
    </template>
    ```
- Cài đặt thư viện `@websanova/vue-auth`:
    ```
    npm install @websanova/vue-auth
    ```
- Thư viện này hỗ trợ việc xác thực ở phía client với một số hàm `register`, `login`, `logout`, `user`
- Đến đây ta cần update lại file **resources/assets/js/app.js**:
    ```JS
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    import axios from 'axios';
    import VueAxios from 'vue-axios';
    import App from './App.vue';
    import Dashboard from './components/Dashboard.vue';
    import Home from './components/Home.vue';
    import Register from './components/Register.vue';
    import Login from './components/Login.vue';
    Vue.use(VueRouter);
    Vue.use(VueAxios, axios);
    axios.defaults.baseURL = 'http://localhost:8000/api';
    const router = new VueRouter({
        routes: [{
            path: '/',
            name: 'home',
            component: Home
        },{
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                auth: false
            }
        },{
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                auth: false
            }
        },{
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                auth: true
            }
        }]
    });
    Vue.router = router
    Vue.use(require('@websanova/vue-auth'), {
       auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
       http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
       router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    });
    App.router = Vue.router
    new Vue(App).$mount('#app');
    ```
- Trong đoạn code ở trên ta đã include thư viện vừa cài đặt và cho phép một số cấu hình làm việc với nó:
    ```
    auth: require(‘@websanova/vue-auth/drivers/auth/bearer.js’)
    ```
- Dòng cấu hình  *vue-auth* bên trên sử dụng bearer dirver để thêm authe token vào header request và đọc, parse token từ server trả về.
- Ngoài ra *vue-auth* còn sử dụng axios http driver và vue-router:
     ```
     http: require(‘@websanova/vue-auth/drivers/http/axios.1.x.js’)
     router: require(‘@websanova/vue-auth/drivers/router/vue-router.2.x.js’)
     ```
 - Bạn có thể tìm hiểu thêm về thư viện `@websanova/vue-auth` [tại đây](https://github.com/websanova/vue-auth).
- Chạy npm run watch và thử truy cập vào [dashboard](http://localhost:8000/#/dashboard) từ trình duyệt, nó sẽ tự động chuyển đến trang login.

## **III. Server laravel**
### 1. Jwt-auth
- Cài đặt thư viện **jwt-auth** bằng composer
    ```
    composer require tymon/jwt-auth
    ```
- Thêm provider và facade vào **config/app.php**:
    ```PHP
     ...
    'providers' => [
        ...
        Tymon\JWTAuth\Providers\JWTAuthServiceProvider::class,
    ]
    ...
    'aliases' => [
        ...
        'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class,
    ]
    ```
- Và ta cần publish thư viện **jwt-auth** bằng câu lệnh:
    ```
    php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\JWTAuthServiceProvider"
    ```
- Tạo key publish với lệnh:
    ```
    php artisan jwt:generate
    ```
- Nếu gặp lỗi `JWTGenerateCommand::handle() does not exist` thì bạn chỉ cần thêm phương thức *handle()* vào file **vendor/tymon/jwt-auth/src/Commands/JWTGenerateCommand.php**
    ```PHP
    public function handle() {
        $this->fire();
    }
    ```
- Thêm route *jwt.auth* và *jwt.refresh* vào **app/Http/Kernel.php**
    ```PHP
    protected $routeMiddleware = [
        ...
        'jwt.auth' => \Tymon\JWTAuth\Middleware\GetUserFromToken::class,
        'jwt.refresh' => \Tymon\JWTAuth\Middleware\RefreshToken::class,
    ];
    ```
    
### 2. Registration
- Tạo AuthController:
    ```
    php artisan make:controller AuthController
    ```
- Và thêm route vào file **routes/api.php**:
    ```
    Route::post(‘auth/register’, ‘AuthController@register’);
    ```
- Tạo requestForm để thực hiện validate khi đăng ký user
    ```
    php artisan make:request RegisterFormRequest
    ```
- Và sửa nội dung file **RegisterFormRequest.php** thành như sau:
    ```PHP
    ...
    class RegisterFormRequest extends FormRequest
    {
        public function authorize()
        {
             return true;
        }
        public function rules()
        {
            return [
                'name' => 'required|string|unique:users',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:6|max:10',
            ];
        }
    }
    ```
- Tạo phương thức *register* trong **AuthController.php**:
    ```PHP
    ...
    use App\User;
    use App\Http\Requests\RegisterFormRequest;
    ...
    
    public function register(RegisterFormRequest $request)
    {
        $user = new User;
        $user->email = $request->email;
        $user->name = $request->name;
        $user->password = bcrypt($request->password);
        $user->save();
        return response([
            'status' => 'success',
            'data' => $user
           ], 200);
     }
    ```
- Đến đây ta cần thêm đoạn code vue gọi đến phương thức trên vào cuối file **Register.vue**:
    ```HTML
    <script> 
        export default {
            data(){
                return {
                    name: '',
                    email: '',
                    password: '',
                    error: false,
                    errors: {},
                    success: false
                };
            },
            methods: {
                register(){
                    var app = this
                    this.$auth.register({
                        params: {
                            name: app.name,
                            email: app.email,
                            password: app.password
                        }, 
                        success: function () {
                            app.success = true
                        },
                        error: function (resp) {
                            app.error = true;
                            app.errors = resp.response.data.errors;
                        },
                        redirect: null
                    });                
                }
            }
        }
    </script>
    ```
- Giờ ta có thể chạy `npm run watch` và đăng ký thử một user
### 3. Login
- Trở lại file **AuthController** ta thêm phương thức *login*:
    ```PHP
    ...
    use JWTAuth;
    use Auth;
    ...
   
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if ( ! $token = JWTAuth::attempt($credentials)) {
                return response([
                    'status' => 'error',
                    'error' => 'invalid.credentials',
                    'msg' => 'Invalid Credentials.'
                ], 400);
        }
        return response([
                'status' => 'success'
            ])
            ->header('Authorization', $token);
    }
    ```
- Thêm 2 phương thức *user()* và *refresh()*:
    ```PHP
    public function user(Request $request)
    {
        $user = User::find(Auth::user()->id);
        return response([
                'status' => 'success',
                'data' => $user
            ]);
    }
    public function refresh()
    {
        return response([
                'status' => 'success'
            ]);
    }
    ```
- File **route/api.php** sẽ cần update thêm:
    ```PHP
    Route::post('auth/login', 'AuthController@login');
    Route::group(['middleware' => 'jwt.auth'], function(){
      Route::get('auth/user', 'AuthController@user');
    });
    Route::group(['middleware' => 'jwt.refresh'], function(){
      Route::get('auth/refresh', 'AuthController@refresh');
    });
    ```
- Cuối cùng là thêm phần kết nối vue với controller vào cuối file **Login.vue**:
    ```HTML
    <script>
      export default {
        data(){
          return {
            email: null,
            password: null,
            error: false
          }
        },
        methods: {
          login(){
            var app = this
            this.$auth.login({
                params: {
                  email: app.email,
                  password: app.password
                }, 
                success: function () {},
                error: function () {},
                rememberMe: true,
                redirect: '/dashboard',
                fetchUser: true,
            });       
          },
        }
      } 
    </script>
    ```
### 4. Logout
- Ta thêm phương thức *logout* vào **AuthController**
    ```PHP
    public function logout()
    {
        JWTAuth::invalidate();
        return response([
                'status' => 'success',
                'msg' => 'Logged out Successfully.'
            ], 200);
    }
    ```
- Phương thức *logout* chỉ được gọi khi user thực sự login vào hệ thống, nên ta sẽ đặt route như sau:
    ```PHP
    Route::group(['middleware' => 'jwt.auth'], function(){
       ...
       Route::post('auth/logout', 'AuthController@logout');
    });
    ```
- Và **App.vue** sẽ update như sau:
    ```HTML
    <template>
        <div class="panel panel-default">
            <div class="panel-heading">
                <nav>
                    <ul class="list-inline">
                        <li>
                            <router-link :to="{ name: 'home' }">Home</router-link>
                        </li>
                        <li v-if="!$auth.check()" class="pull-right">
                            <router-link :to="{ name: 'login' }">Login</router-link>
                        </li>
                        <li v-if="!$auth.check()" class="pull-right">
                            <router-link :to="{ name: 'register' }">Register</router-link>
                        </li>
                        <li v-if="$auth.check()" class="pull-right">
                            <a href="#" @click.prevent="$auth.logout()">Logout</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="panel-body">
                <router-view></router-view>
            </div>
        </div>
    </template>
    ```
- Trước khi test bạn nhớ chạy câu lệnh compile `npm run watch ` nhé.
- Mình cũng đã tạo thành công và up source code lên github: [Lara-vue-auth](https://github.com/Giangnv2014/lara-vue-auth)
- Hy vọng bài viết sẽ giúp ích được bạn, nếu bạn có gặp khó khăn gì trong lúc thực hiện hãy liên hệ với mình hoặc tài liệu tham khảo bên dưới.
    
> **Tài liệu tham khảo**
> 
> [API Authentication in Laravel-Vue SPA using Jwt-auth](https://codeburst.io/api-authentication-in-laravel-vue-spa-using-jwt-auth-d8251b3632e0)