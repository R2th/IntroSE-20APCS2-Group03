Trong bài viết này mình sẽ đi thử làm phần đăng ký, đăng nhập và đăng xuất trong một single page app sử dụng Laravel và VueJS.

Ở bên Server, dùng JWT (JSON Web Tokens) để thực hiện đăng nhập và trả về token. Về phía client mình có tìm hiểu được một thư viện giúp bạn có thể thực hiện xác thực cho trang cuả mình cực dễ dàng [Vue Auth](https://github.com/websanova/vue-auth)

Giờ mình cùng thực hiện từng bước một nhé.
# Server
Cũng như các bài hướng dẫn khác việc đầu tiên là tạo và setup cho một project mới.
> composer create-project --prefer-dist laravel/laravel authentication-spa
> 
Sau đó là setup file .env để kết nối với database
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=YOUR_DB_NAME
DB_USERNAME=YOUR_MYSQL_USERNAME
DB_PASSWORD=YOUR_MYSQL_PASSWORD
```

Với ví dụ này thì mình cũng chỉ cần sử dụng cấu trúc bảng user có sẵn của laravel là được, cho nên mình chỉ cần chạy câu lệnh dưới để generate ra các bảng
> php artisan:migrate
> 
## Route
Vì là SPA nên các đường dẫn sẽ được define sử dụng vue-router, và mình chỉ cần định nghĩa ra một cái route chung nhất để khi gọi đến bất kì link nào, sẽ trả về một blade chung bên laravel đã có gọi vue trong đó, việc còn lại là bên Vue với vue-router sẽ lấy ra component tương ứng mà thôi. Mình có thấy đã có một bài viết về phần vue-router này, các bạn tham khảo kỹ hơn tại đây nhé: https://viblo.asia/p/su-dung-vue-router-tao-single-page-trong-laravel-yMnKMJWNZ7P.

Vì bài viết này tập trung phần authentication hơn nên phần server và phần vue mình sẽ không đi giải thích cụ thể về vue-router đó nữa mà chỉ đưa code để mọi người áp dụng

```web.php
Route::get('/{any}', 'SinglePageController@index')->where('any', '.*');
```

Tất nhiên mình cũng cần định nghĩa api cho phần đăng ký đăng nhập và đăng xuất để bên vue còn gọi đến
```api.php
Route::group(['prefix' => 'auth'], function () {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
});
```
## Controller
### SinglePageController
Phần singlepage controller này chỉ đơn giản sẽ trả về một blade của laravel. blade này dùng để sử dụng vue
```SinglePageController.php
<?php

namespace App\Http\Controllers;

class SinglePageController extends Controller
{
    public function index()
    {
        return view('app');
    }
}
```
### Đăng ký
Các bước khởi tạo đã xong, việc kế đến là thực hiện thêm mới một user vào cơ sở dữ liệu khi và bên vue gửi request đăng ký.

Tạo một controller mới là AuthController.php. Hàm register() trong controller này sẽ đảm nhận nhiệm vụ đăng ký nhé.

```AuthController.php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return response()->json(['user' => $user], Response::HTTP_OK);
    }
}
```
Khi ta nhận request thực hiện validate, nếu các param đều đã đúng theo validate thì đơn giản mình dùng nó để tạo mới một user và thêm nó vào cơ sở dữ liệu.
### Đăng nhập
Như đã nói ở bên trên, đăng nhập và đăng xuất sẽ sử dụng JWT. Mình đã có một bài viết hướng dẫn cụ thể hơn về phần này, hãy tham khảo tại đây [JWT](https://viblo.asia/p/jwt-json-web-tokens-trong-laravel-57-1VgZvoaOlAw) để thực hiện việc setup JWT trong laravel, sử dụng trong model.

Phần login trong controller sẽ được thực hiện như dưới đây
```AuthController.php
public function login()
{
    $credentials = request(['email', 'password']);
    if (!$token = auth('api')->attempt($credentials)) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    return response()->json(auth('api')->user())->header('Authorization', $token);
}
```
Mình nhận email và password được gửi lên dùng JWT để xác thực, nếu thành công thì phần token sẽ được đưa vào header trả về phía client để client sử dụng
### Đăng xuất
```AuthController.php
public function logout()
{
    auth('api')->logout();

    return response()->json(['message' => 'Successfully logged out']);
}
```
### Thông tin user đang đăng nhập
Mình cũng cần thêm một function để lấy thông tin của thằng đang đăng nhập, thông tin trả về sẽ được vue-auth sử dụng
```AuthController.php
public function user()
{
    return response()->json(auth('api')->user());
}
```
## Blade
Như ở phần SinglePageController phía trên thì mình cần một file app blade để sử dụng vue
```app.blade.php
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Laravel</title>

        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">

        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link href="{{ asset('css/custom.css') }}" rel="stylesheet">
    </head>
    <body>
        <div id="app"></div>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>

```
# Client
Về phía VueJS mình sẽ sử dụng vue-router và websanova/vue-auth. Cài đặt các thư viện này với câu lệnh
> npm install @websanova/vue-auth
> 
> npm install vue-router
> 

Phần router đã có bài khác hướng dẫn rồi nên mình không nói kỹ nữa. Tất cả các route mình sẽ tách ra làm một file riêng: route.js, và phần config cho để sử dụng vue-auth cũng sẽ tách ra một file riêng là auth.js để dễ dàng sử dụng và chỉnh sửa. Phần js chính được thực hiện trong file app.js
## Webpack Mix
Mix file js và style vào folder public, mình cũng muốn sử dụng đường dẫn để truy cập đến các component Vue dễ dàng hơn nên mình sẽ dử dụng alias
```
const mix = require('laravel-mix');

mix.webpackConfig({
   resolve: {
      extensions: ['.js', '.vue'],
      alias: {
         '@': __dirname + '/resources/js',
      }
   }
})

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .sass('resources/sass/custom.scss', 'public/css');

```
Như vậy khi truy cập các component vue trong thư mục resoure/js thì chỉ cần thay thế bởi đường dẫn @/ là xong
## Router
```
import VueRouter from 'vue-router';
import Login from '@/components/auth/LoginComponent';
import Register from '@/components/auth/RegisterComponent';
import Dashboard from '@/components/DashboadComponent';

const routes = [
    // path for determined page
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta: {
            auth: false
        }
    },
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'dashboard',
        meta: {
            auth: true
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

export default router;
```
Với ví dụ này thì khi truy cập vào dashboard sẽ cần đến sự xác thực của user.
## Config vue-auth
Bây giờ config phần đăng ký đăng nhập đăng xuất bên vue
```auth.js
import bearer from '@websanova/vue-auth/drivers/auth/bearer';
import axios from '@websanova/vue-auth/drivers/http/axios.1.x';
import router from '@websanova/vue-auth/drivers/router/vue-router.2.x';

const config = {
    auth: bearer,
    http: axios,
    router: router,
    tokenDefaultName: 'auth-token',
    tokenStore: ['cookie'],
    notFoundRedirect: {
        path: '/home'
    },
    registerData: {
        url: '/api/auth/register',
        method: 'POST',
        redirect: null,
    },
    loginData: {
        url: '/api/auth/login',
        method: 'POST',
        redirect: '/home',
        fetchUser: true,
    },
    logoutData: {
        url: '/api/auth/logout',
        method: 'POST',
        redirect: '/login',
        makeRequest: true
    },
    fetchData: {
        url: '/api/auth/user',  
        method: 'GET',
        enabled: true
    },
    parseUserData (data) {
        return data || {}
    },
};

export default config;
```
Trong file config này ta có thể thấy notFoundRedirect  có path là /home (trang dashboard). Ví dụ, khi bạn đã hoàn thiện đăng nhập vào hệ thống mà tiếp tục cố gắng truy cập lại vào trang login nó sẽ redirect về trang Dashboard.  

Tiếp theo phần registerData sẽ gồm ba thành phần, url, method, và redirect. Cái này là khi RegisterComponent gọi đến hàm register bởi vue-auth, request sẽ gửi lên đường dẫn là url, method là phương thức trong method, và sau khi đăng ký thành công xong trang sẽ chuyển hướng đến redirect. Nếu bạn không muốn chuyển hướng thì để redirect là null như phía trên.  

Cũng tương tự để config cho phần login, logout nhé.

Lưu ý một xíu về phần fetchData, khi đã đăng nhập thành công, để truy xuất user bên vue mình sử dụng $auth.user(). Đó chính là dữ liệu lấy được từ hàm fetchData. Và tùy theo cấu trúc dữ liệu trả về từ server như thế nào mà mình sẽ lấy ra được đúng user bằng hàm parseUserData(data).

Ví dụ như trên server mình trả về luôn user rồi thì phần parseData chỉ cần viết như trên là được.
## App
File js cuối cùng mình cần thực hiện là app.js,  nó sẽ sử dụng AppComponent là component chung cho tất cả các trang.

```app.js
import './bootstrap';
import Vue from 'vue';
import router from './route';
import App from '@/components/AppComponent'
import VueAuth from '@websanova/vue-auth';
import axios from 'axios';
import VueAxios from 'vue-axios';
import auth from './auth';
import VueRouter from 'vue-router';

Vue.use(VueAxios, axios);

Vue.router = router;
App.router = Vue.router;
Vue.use(VueRouter);


Vue.use(VueAuth, auth);

new Vue(App).$mount('#app');
```
Vue sẽ sử dụng route, auth bên trên để tạo vào đưa vào element có id là app (chính là div id=app trong blade app). Nhớ cần đến VueAxios thì trang mới redirect được khi chưa đăng nhập nhé.

## Components
Cuối cùng là các componet đã gọi ở phía trên
### AppComponent
Tạo một file AppComponent, vì nó là component chung nên mình sẽ gọi vue-router trong đây luôn
```AppComponent.vue
<template>
  <div class="panel panel-default">
    <div class="panel-heading" v-if="$auth.check()">
      <top-menu></top-menu>
    </div>
    <div class="panel-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopMenu from '@/components/layouts/TopMenuComponent'

export default {
  components: {
    TopMenu
  }
}
</script>
```
Cần thêm một cái component TopMenu để xem người hiện tại đang đăng nhập và thực hiện phần đăng xuất. Top menu này chỉ có khi hệ thống đã được xác thực bằng hàm v-if="$auth.check()"
```TopMenuComponent.vue
<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="logo">
      <router-link :to="{}" class="navbar-brand">SPA-Vue</router-link>
    </div>
    <div class="my-2 my-lg-0 dropdown navbar-right">
      <a class="nav-link dropdown-toggle"
        href="#" id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        {{ $auth.user().name }}
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a class="dropdown-item text-black" href="#" @click="logout">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout: function () {
      this.$auth.logout()
    }
  }
}
</script>


<style lang="scss">
.navbar {
  a {
    font-weight: bold;
    color: white !important;
  }

  a:hover {
    text-decoration: none;
  }

  .text-black {
    color: black !important;
  }

  .dropdown-menu {
    margin-top: 7px;
  }
}
</style>
```
### RegisterComponent
``` RegisterComponent.vue
<template>
  <div class="container">
    <div class="card card-default">
      <div class="card-header">Register</div>
      <div class="card-body">
        <div class="alert alert-danger" v-if="error && !success">
          <p>here was an error, unable to complete registration.</p>
        </div>
         <div class="alert alert-success" v-if="success">
          <p>Registration completed. You can now <router-link :to="{name:'login'}">sign in.</router-link></p>
        </div>
        <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">
          <div class="form-group" v-bind:class="{ 'has-error': error && errors.email }">
            <label for="name">Name</label>
            <input type="text" id="name" class="form-control" v-model="name">
            <span class="help-block" v-if="error && errors.name">{{ errors.name }}</span>
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': error && errors.email }">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email">
            <span class="help-block" v-if="error && errors.email">{{ errors.email }}</span>
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': error && errors.password }">
            <label for="password">Password</label>
            <input type="password" id="password" class="form-control" v-model="password">
            <span class="help-block" v-if="error && errors.password">{{ errors.password }}</span>
          </div>
          <button type="submit" class="btn btn-default">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      name: '',
      email: '',
      password: '',
      error: false,
      errors: {},
      success: false
    }
  },
  methods: {
    register: function () {
      var app = this
      this.$auth.register({
        url: '/api/auth/register',
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
      })
    }
  }
}
</script>
```


### LoginComponent
LoginComponent sẽ nhận email và password và sử dụng function có sẵn của vue-auth là $auth.login để request lên server. Nếu phần đằng nhập xảy ra lỗi thì một biến error được gán lại là true và thông báo lỗi được hiển thị ra. Nếu đăng nhập thành công đơn giản là nó sẽ redirect về trang mà mình đã config trong file auth.js (/home)
```LoginComponent.vue
<template>
  <div class="container">
    <div class="card card-default">
      <div class="card-header">Sign In</div>
      <div class="card-body">
        <div class="alert alert-danger" v-if="error">
          <p>Sign in fail. Please try again!</p>
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
          <button type="submit" class="btn btn-default">Sign In</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data: function () {
    return {
      email: null,
      password: null,
      error: false
    }
  },
  methods: {
    login: function () {
      var app = this
      this.$auth.login({
        params: {
          email: app.email,
          password: app.password
        },
        success: function (response) {},
        error: function () {
          app.error = true
        },
      })
    }
  }
}
</script>
```
### DashboardComponent
Cuối cùng là DashboardComponent. Khi login xong, website sẽ chuyển hướng đến trang này
```DashboardComponent.vue
<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>

```
Bây giờ bạn có thể thử chạy và xem kết quả rồi. Chúc bạn thành công

# Tài liệu tham khảo
> https://medium.com/@ripoche.b/create-a-spa-with-role-based-authentication-with-laravel-and-vue-js-ac4b260b882f