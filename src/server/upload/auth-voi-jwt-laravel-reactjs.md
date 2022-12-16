## Introduction
Hello ae, Hôm nay mình sẽ cùng build một mô hình Auth, register/login/logout bằng Laravel + Reactjs sử dụng JSON Web Token hay còn gọi là JWT 

 JWT là một token mà mình trong bài này sẽ generate ra để xác thực một user đã login hay chưa. Và thường được sử dụng cho những trang web có sử dụng Single Sign On,..
 Luồng xử lý sẽ như thế này!
![](https://images.viblo.asia/641a8d3d-d045-455a-862b-b2f92372e00b.jpg)

1. Client gửi request đến sever kèm theo username + password
2. Sever sẽ Auth và  generate JWT và trả về cho client 
3. Client lưu lại JWT và gửi các request sau đó kèm theo JWT với Authorization header hoặc truyền trực tiếp trên thanh address bar
4. Sever check JWT và trả response về cho client

**Về cấu trúc của JWT**
JWT gồm các thành phần như ở dưới đây:
![](https://images.viblo.asia/9cb2815a-90e9-4ab4-a92f-e7c5fc54007b.png)
Cấu trúc của nó gồm 3 phần chính **Header, Payload và Signature** và ở trong này này mình sẽ quan tâm nhất đến phần Payload sẽ được thể hiện ở phần code phía sever và bài này mình chọn laravel.
Ae có thể sử dụng cái này để generate một cái JWT mà mình muốn https://jwt.io/

**Các phiên bản mình sử dụng trong bài của mình:**
1. Laravel 5.7, PHP 7.3
2. jwt-auth package https://github.com/tymondesigns/jwt-auth dev version
3. ReactJs 16.2.0
4. Mysql

![](https://images.viblo.asia/f020bcaa-fedc-4c7f-a736-eb1b8e843dc8.png)

## Let's make an example

### 1. Building BackEnd (Cài đặt laravel, database, jwt-auth)
1. Laravel 5.7, nếu sử dụng package jwt-auth ở trên ae không nên cài bản laravel mới nhất vì thời điểm mình làm demo này thì package này chưa hỗ trợ tốt bản laravel mới nhất, có thể gây ra lỗi rất khó chịu:
```shell
 $ composer create-project laravel/laravel="5.7.*" JWTSample
```
Di chuyển terminal vào thư mục của app 
```shell
 $ cd ./JWTSample
```
Chọn view ReactJs cho Laravel
```shell
$ php artisan preset react
```
Setup databse
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_name
DB_USERNAME=db_user
DB_PASSWORD=db_user_pasword
```
Migrate bảng users
```shell
php artisan migrate
```
**Chú ý:** khi dùng package jwt-auth ta cần tạo thêm một row trong bảng users để lưu JWT token.
```shell
php artisan make:migration Add_jwt_token_to_user_table --table=users
```
Trong file ta thêm:
```php
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->text('auth_token')->nullable();
        });
    }

```

**Seed dữ liệu**

 Trong file `database/factories/UserFactory.php`
```php
$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => 'asd@gmail.com',
        'password' => \Hash::make('123456'), 
        'remember_token' => str_random(10),
    ];
});
```

Đăng ký trong file seed: `database/seeds/DatabaseSeeder.php`

```php
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        factory(App\User::class)->create();
    }

```

Migrate lại bằng `php artisan migrate`
Seed database : `php artisan db:seed`

Cài đặt package jwt-auth
```shell
$ composer require tymon/jwt-auth:dev-develop --prefer-source
```

Config jwt trong thư mục `/config/app.php`

```php
'providers' => [
            ....
            Tymon\JWTAuth\Providers\LaravelServiceProvider::class,
],
'aliases' => [

          ....
          'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class,
],
```

Generate JWT key cho app 
```shell
php artisan jwt:secret
```

Thêm function của package  vào User model 
```php
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
```
Tạo một middleware để Auth user.
```shell
php artisan make:middleware JWTAuthMiddleware
```

Trong file `/app/Http/Middleware/JWTAuthMiddleware.php` ta viết đoạn sau đây: 

```php
<?php
namespace App\Http\Middleware;
use Closure;
use JWTAuth;
use Exception;
class JWTAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::toUser($request->input('token'));
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return $next($request);
                return response()->json(['error'=>'Invalid_Token']);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return $next($request);
                return response()->json(['error'=>'Token_Expried']);
            }else{
                return $next($request);
                return response()->json(['error'=>'Unknown_Error']);
            }
        }
        return $next($request);
    }
}
```

Như thường lệ, để một middleware có thể chạy ta cần đăng ký nó vào trong `/app/Http/Kernel.php`

```php
    protected $routeMiddleware = [
        ...
        'jwt-auth' => \App\Http\Middleware\jwtMiddleware::class,
    ];

```
Ta sẽ tạo một `UserController `để handle các request register và login 
```shell
php artisan make:controller UserController
```

với nội dung dưới đây: 

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use JWTAuthException;
use Validator;

class UserController extends Controller
{
    private function getToken($email, $password)
    {
        $token = null;
        try {
            if (!$token = JWTAuth::attempt( ['email'=>$email, 'password'=>$password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token'=>$token
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Cannot create token',
            ]);
        }
        return $token;
    }

    public function register(Request $request)
    {   
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $payload = [
            'password'=>\Hash::make($request->password),
            'email'=>$request->email,
            'name'=>$request->name,
            'auth_token'=> ''
        ];

        $user = new User($payload);
        if ($user->save())
        {

            $token = self::getToken($request->email, $request->password);
            if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);

            $user = User::where('email', $request->email)->get()->first();

            $user->auth_token = $token; 
            $user->save();
            $response = ['success'=>true,'auth_token'=>$token];        
        }
        else
            $response = ['success'=>false, 'data'=>'Register Failed'];

        return response()->json($response, 201);

         }
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->get()->first();
        if ($user && \Hash::check($request->password, $user->password))
        {
            $token = self::getToken($request->email, $request->password);
            $user->auth_token = $token;
            $user->save();
            $response = ['success'=> true, 'auth_token'=>$user->auth_token];           
        }
        else 
          $response = ['success' => false,'data' => 'User doesnt exist'];

        return response()->json($response, 201);
    }

```

Ta thấy ở trong method` getToken()` có gọi đến `JWTAuth::attempt( ['email'=>$email, 'password'=>$password])`
Ở đây mình sử dụng package jwt-auth và khi gọi đến hàm này ta có truyền 2 params là `'email'=>$email` và `password'=>$password]` , theo đúng như tên gọi của nó JSON Web token, mình luôn phải truyền params theo kiểu json, cụ thể là mình đang truyền `['email'=>$email, 'password'=>$password]` vào phần **Payload** trong JWT.
Nhắc lại cấu trúc của JWT 1 chút ở đây: 
![](https://images.viblo.asia/9cb2815a-90e9-4ab4-a92f-e7c5fc54007b.png)
Cũng vì mình sử dụng package nên  mình không cần quan tâm đến phần header hay Signature nữa, chỉ cần truyền payload vào => done! 

Mỗi một lần login khác nhau chúng ta sẽ có một JWT khác nhau. Nhăc lại về luồng chạy:

> Browser Login (OK) => Sever generate token => lưu token vào database 
> => trả về cho client.
> Client gửi request kèm theo header với jwttoken =>Sever check và 
> gửi về responses


Tiếp theo ta sẽ update routes trong file `/routes/api.php`

```php
Route::post('user/login', 'UserController@login');
Route::post('user/register', 'UserController@register');
```

Vậy là đã tạm xong phần backend. Bây giờ chúng ta sẽ chuyển tiếp sang phần Frontend nhé.

### 2.Let's create some views (ReactJS)
 Step #1: Update file welcome trong file `/resources/views/welcome.blade.php` với nội dung sau đây
```html
<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel 5.5 - ReactJS Example</title>
        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
        <script type="text/javascript">
            window.Laravel = {!! json_encode([
                'baseUrl' => url('/'),
                'csrfToken' => csrf_token(),
            ]) !!};
        </script>
    </head>
    <body>
        <div id="app"></div>
        <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
```
Ở đây ta có  `window.Laravel` từ javascript tiếp nhận các giá trị được truyền từ laravel vào và ta sẽ tiến hành append tất cả nội dung vào thẻ div có id là `app`

Tiếp theo ta sẽ sử dụng và import React Router v4 bằng command sau: 
```shell
npm install --save react-router-dom@4.2.2
```
Và ta sẽ sử dụng history để quản lý lịch sử của browser
```shell
npm install --save history
```

Step #2: Chúng tiếp tục tiến hành tạo các components của ReactJs như dưới đây

Trong thư mục `/resources/js/components` tạo các components sau đây và mình sẽ fill nội dung sau.

```
--auth
     --Login.js
     --Register.js
--page
     --App.js
--users
     --Page.js
```

Tiếp tục tạo 1 file `/resources/js/Http.js` để thêm 1 vài options khi sử dụng axios  để gửi request lên sever.
Bắt đầu đi vào phần nội dung của các components:

Step #3: Fill nội dung component app.
Đầu tiên với file Http.js
```js
import axios from 'axios'

let token = document.head.querySelector('meta[name="csrf-token"]');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;

axios.interceptors.response.use(
    response => response,
    (error) => {
        if(error.response.status === 401 ) {
            console.log('401');
        }
        return Promise.reject(error);
    }
);
export default axios;
```

Giống như một instance của axios. Chúng ta sẽ tạo thêm option cho Http khi chúng ta access vào các route chạy qua middleware Auth Jwt bằng cách thêm Authentication vào header trông như thế này.
`Http.defaults.headers.common['Authorization'] = 'Bearer ' + auth_token;`

File `/resources/js/components/app.js`

```javascript
require('./bootstrap');

import React from 'react'
import { render } from 'react-dom'
import {
  Router,
  Route,
  Switch
} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Page from './components/users/Page'

const history = createBrowserHistory();
render (
  <Router history={history}>
    <Switch>
       <App>
           <Route path='/' exact component={Page} />
           <Route path='/login' exact component={Login} />
           <Route path='/register' exact component={Register} />
      </App>
    </Switch>
  </Router>, document.getElementById('app'))
```

File app này chúng ta đã tiến hành import các components, định nghĩa route cho để điều hướng ứng dụng.

Step #4: Trở về định nghĩa route cho laravel:
Trong file `routes/web.php` chúng ta sẽ thêm dòng dưới đây để bắt tất cả các request về file `welcome.blade.php`  => bắt tất cả các request sang sử dụng react router.
```php
Route::view('/{any}', 'welcome')
    ->where('any', '.*');
```


Thêm một route` /api/user` trả về thông tin user để chốc nữa sẽ sử dụng ở trang profile  => hơi lười viết nên viết luôn thế này cho nhanh.
```php
Route::post('user/login', 'UserController@login');
Route::post('user/register', 'UserController@register');
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
```

Như ở đây  ae có thể thấy `/api/user ` sẽ chạy qua middleware của jwt-auth mà chúng ta định nghĩa. Và khi cần chạy vào route này chúng ta sẽ cần thêm option Authentication vào header của request.

Step #5: Fill nội dung cho các components còn lại 

1. Component `App.js` để tạo background cho trang:
```js
import React, { Component} from 'react'

class App extends Component {

    render () {
        return (
            <div>
                <div className="container main-page">
                  {this.props.children}
                </div>
            </div>
        )
    }
}
export default App
```
Ở đây ta đã có một Component cha để bắt tất cả mấy thằng con vào` {this.props.children}`

2. Component `Page.js`

```js
import React, {Component} from 'react';
import Http from '../../Http'
import { Link } from "react-router-dom";

class Page extends Component {

    constructor(props){
        super(props)
        this.state = {userName: '', isLoggedIn: false}
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        if(localStorage['auth_token']){
            this.getProfile();
        } 
    }

    getProfile() {
        Http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage['auth_token'];
        Http.get('api/user').then((response) => {
          if (response.data.name) {
            this.setState({ userName: response.data.name, isLoggedIn: true})
          }
        }).catch((error) => {
          console.log(error.response.status)
        })
    }

    logout () {
         this.setState({isLoggedIn: false, userName: ''})
         localStorage.removeItem('auth_token');
    }

    user () {
        return (
            <>
             <h1> Welcome { this.state.userName}</h1>
              <button onClick={this.logout}>Log out</button>
            </>
        )
    }

    guest () {
        return (
                <h2>Please <span><Link to='/login'>Login</Link></span></h2>
        )
    }

    render() {
        return (
            <>
                {this.state.isLoggedIn ? this.user() : this.guest() }
            </>
        )
    }
}
export default Page
```
Ở method `getProfile()` chúng ta có một dòng
```js
Http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage['auth_token']
```
Trước khi chúng ta send request sử dụng để pass qua middleware auth user mà chúng ta đã định nghĩa ở phía backend.

5. Fill nội dung vào component `Register.js`

```js
import React, {Component} from "react";
import { Link } from "react-router-dom";
import Http from "../../Http"

class Register extends Component {

    constructor (props) {
      super(props)
      this.state = {
        name: '',
        email: '',
        password: '',
        confirm_password: ''

      }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName (e) {
      this.setState({name: e.target.value});
    }

    handleChangeEmail(e) {
      this.setState({email: e.target.value});
    }

    handleChangePassword(e) {
      this.setState({password: e.target.value});
    }

    handleChangeConfirmPassword(e) {
      this.setState({ confirm_password: e.target.value });
    }

    handleSubmit (e) {
      e.preventDefault()
      if (this.state.password == this.state.confirm_password){
        let uri = 'api/user/register'
        let userData = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }
        Http.post(uri, userData).then((response) => {
          if (response.data.success) {
            alert("Register Success")
            this.props.history.push('/')
          } else {
            alert(response.data.success)
          }
        });
      } else {
        alert("Password not matched")
      }

    }

  render() {
    return (
        <form id="register-form" onSubmit={this.handleSubmit} method="post">
          <h3 style={{ padding: 15 }}>Let's become a member.</h3>
          <p name="name" style={styles.label} className="center-block">Name<span style={styles.asterisk}>*</span></p>
          <input  style={styles.input} onChange={this.handleChangeName} id="name-input" name="name" type="text" className="center-block" placeholder="Name" />
          <p name="email" style={styles.label} className="center-block">Email<span style={styles.asterisk}>*</span></p>
          <input  style={styles.input} onChange={this.handleChangeEmail} id="email-input" name="email" type="email" className="center-block" placeholder="Email" />
          <p name="password" style={styles.label} className="center-block">Password<span style={styles.asterisk}>*</span></p>
          <input  style={styles.input} onChange={this.handleChangePassword} id="password-input" name="password" type="password" className="center-block" placeholder="Password" />
          <p name="confirm-password" style={styles.label} className="center-block">Confirm password<span style={styles.asterisk}>*</span>{this.state.password !== this.state.confirm_password ? (<span style={styles.asterisk}> Password not matched</span>) : (<span>ok</span>)}</p>
          <input  style={styles.input} onChange={this.handleChangeConfirmPassword} id="confirm-password-input" name="confirm-password" type="password" className="center-block" placeholder="Confirm password" />          
          <button type="submit" style={styles.button} className="landing-page-btn center-block text-center" id="email-login-btn" href="#facebook" >
            Register
          </button>
        </form>
    );
  }
}
const styles = {
  asterisk: {
    color: '#FF5733',
  },
  input: {
    backgroundColor: "white",
    border: "1px solid #cccccc",
    padding: 15,
    marginBottom: 15,
    float: "left",
    clear: "right",
    width: "100%",
  },
  label: {
    float: "left",
  },
  button: {
    height: 44,
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
    border: "none",
    backgroundColor: "green",
    float: "left",
    clear: "both",
    width: "100%",
    color: "white",
    padding: 15
  },
  link: {
    width: "80%",
    float: "left",
    clear: "both",
    textAlign: "center"
  }
};
export default Register;
```
Màn Register của chúng ta sẽ như thế này.
![](https://images.viblo.asia/a6ae75a4-cd88-4d58-839c-7d55c707e828.png)

Fill nội dung component `Login.js`
```javascript
import React, {Component} from 'react';
import axios from 'axios';
import Http from '../../Http'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Auth = new AuthService();
    }

    handleChangeEmail(e) {
        this.setState({email: e.target.value});
    }

    handleChangePassword(e) {
        this.setState({password: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let uri = 'api/user/login';
        Http.post(uri, this.state).then((response) => {
            if (response.data.success) {
                localStorage.setItem('auth_token',response.data.data.auth_token)
                Http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.data.auth_token;
                this.props.history.push('/')
            }
        })
    }

    render() {

        return (
            <form id="register-form" onSubmit={this.handleSubmit} method="post">
                  <h3 style={{ padding: 15 }}>Welcome Back </h3>
                  <p name="email" style={styles.label} className="center-block">Email<span style={styles.asterisk}>*</span></p>
                  <input  style={styles.input} onChange={this.handleChangeEmail} id="email-input" name="email" type="email" className="center-block" placeholder="Email" />
                  <p name="password" style={styles.label} className="center-block">Password<span style={styles.asterisk}>*</span></p>
                  <input  style={styles.input} onChange={this.handleChangePassword} id="password-input" name="password" type="password" className="center-block" placeholder="Password" />    
                  <button onClick={this.handleSubmit} style={styles.button} className="landing-page-btn center-block text-center" id="email-login-btn" href="#facebook" >
                    Login
                  </button>
            </form>
        )
    }
}

const styles = {
  asterisk: {
    color: '#FF5733',
  },
  input: {
    backgroundColor: "white",
    border: "1px solid #cccccc",
    padding: 15,
    marginBottom: 15,
    float: "left",
    clear: "right",
    width: "100%",
  },
  label: {
    float: "left",
  },
  button: {
    height: 44,
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
    border: "none",
    backgroundColor: "green",
    float: "left",
    clear: "both",
    width: "100%",
    color: "white",
    padding: 15
  },
  link: {
    width: "80%",
    float: "left",
    clear: "both",
    textAlign: "center"
  }
};
export default Login

```
Màn login của chúng ta sẽ như thế này
![](https://images.viblo.asia/f020bcaa-fedc-4c7f-a736-eb1b8e843dc8.png)

Đăng nhập bằng tài khoản 
```css
username: asd@gmail.com
password: 123456
```
Màn hình khi login thành công :
![](https://images.viblo.asia/29788f5a-b9e1-4ea2-b823-73c46c4f6579.png)

### Chúc ae thành công