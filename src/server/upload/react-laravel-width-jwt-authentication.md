### I. Tìm hiểu về json web token (JWT)
#### JSON Web Token là gì?

> JSON Web Token (JWT) là 1 tiêu chuẩn mở (RFC 7519) định nghĩa cách thức truyền tin an toàn giữa các thành viên bằng 1 đối tượng JSON. Thông tin này có thể được xác thực và đánh dấu tin cậy nhờ vào "chữ ký" của nó. Phần chữ ký của JWT sẽ được mã hóa lại bằng HMAC hoặc RSA. 

![](https://images.viblo.asia/cbaaf973-7f99-4152-aaea-c54d72858ea3.jpeg)

### Cấu trúc của JSON Web Token:
JSON Web Token bao gồm 3 phần, được ngăn cách nhau bởi dấu chấm (.):

* Header
* Payload
* Signature (chữ ký)

Tổng quát thì nó có dạng như sau:

```xxxxx.yyyyy.zzzzz```

Để biết chi tiết hơn bạn đọc 1 số bài viết sau nhé:

* Tìm hiểu về json web token (JWT)

   https://viblo.asia/p/tim-hieu-ve-json-web-token-jwt-7rVRqp73v4bP

* 5 bước đơn giản để hiểu về JWT (JSON Web Tokens)

    https://viblo.asia/p/5-buoc-don-gian-de-hieu-ve-jwt-json-web-tokens-L4x5xwQqlBM

* Tại sao phải sử dụng JSON Web Token (JWT) để bảo mật API

   https://viblo.asia/p/tai-sao-phai-su-dung-json-web-token-jwt-de-bao-mat-api-maGK787AZj2
   
 Sau đây chúng ta sẽ đi vào cụ thể cách cài đặt cũng như cách sử dụng.
 
### II. Setup Laravel (api)

#### STEP 1: Create new laravel project 
```php
composer create-project --prefer-dist laravel/laravel laravel-jwt-auth
```

#### STEP 2: Install tymon/jwt-auth
```php
 cd laravel-jwt-auth/
 ```
 Chỉnh sửa file `composer.json` Thêm `"tymon/jwt-auth": "^1.0.0-rc.2"` 
 
 ```
 "require": {
        "php": "^7.1.3",
        "fideloper/proxy": "^4.0",
        "laravel/framework": "5.7.*",
        "laravel/tinker": "^1.0",
        "tymon/jwt-auth": "^1.0.0-rc.2"
    },
 ```
 ```php
 cp .env.example .env
 php artisan key:generate
 php artisan migrate
 composer install & composer update
 ```
#### STEP 3: config/app.php file

```php
<?php
'providers' => [
            ....
            Tymon\JWTAuth\Providers\LaravelServiceProvider::class,
],
'aliases' => [
          ....
         'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class,
         'JWTFactory' => Tymon\JWTAuth\Facades\JWTFactory::class
],
```

#### STEP 4: Xuất file config jwt bằng command:

```php
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
// Publishing complete, Copied File [/vendor/tymon/jwt-auth/src/config/config.php] To [/config/jwt.php]
```
Khi run ok, nó sẽ tạo ra file config trong foder: ` config/jwt.php `

#### STEP 5: Create jwt key
```
php artisan jwt:secret
// jwt-auth secret [fXN7pRaztYFXMP577Fa4IdVHYiftIPok] set successfully.
```
#### STEP 6: Create middleware `JwtMiddleware.php`
Cmd
```php
php artisan make:middleware JwtMiddleware
```

File `JwtMiddleware.php`
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\JWTAuth;

class JwtMiddleware
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

        } catch (\Exception $e) {
            if ($e instanceof TokenInvalidException) {
                return $next($request);
                return response()->json(['error'=>'Token is Invalid']);
            } else if ($e instanceof TokenExpiredException){
                return $next($request);
                return response()->json(['error'=>'Token is Expired']);
            } else {
                return $next($request);
                return response()->json(['error'=>'Something is wrong']);
            }
        }

        return $next($request);
    }
}

```

#### STEP 7: Khai báo jwtMiddleware trong file app/Http/kernel.php :

```php
<?php
namespace App\Http;
use Illuminate\Foundation\Http\Kernel as HttpKernel;
class Kernel extends HttpKernel
{
    ....
    protected $routeMiddleware = [
        ....
        'jwt-auth' => \App\Http\Middleware\jwtMiddleware::class,
        'api-header' => \App\Http\Middleware\API::class,
    ];
}
```
#### STEP 8: Tiếp theo chúng ta sẽ tạo UserController

```php
<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    private function getToken($email, $password)
    {
        $token = null;
        //$credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt(['email'=>$email, 'password'=>$password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token'=> $token
                ]);
            }
        } catch (JWTException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }

        return $token;
    }

    public function login(Request $request)
    {

        $user = User::where('email', $request->email)->get()->first();

        if ($user && Hash::check($request->password, $user->password)) // The passwords match...
        {

            $token = self::getToken($request->email, $request->password);
            $user->auth_token = $token;
            $user->save();

            $response = ['success'=>true, 'data'=>['id'=>$user->id,'auth_token'=>$user->auth_token,'name'=>$user->name, 'email'=>$user->email]];
        }
        else
            $response = ['success'=>false, 'data'=>'Record doesnt exists'];

        return response()->json($response, 201);
    }

    public function register(Request $request)
    {
        $payload = [
            'password'=>\Hash::make($request->password),
            'email'=>$request->email,
            'name'=>$request->name,
            'auth_token'=> ''
        ];

        $user = new User($payload);
        if ($user->save()) {

            $token = self::getToken($request->email, $request->password); // generate user token

            if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);

            $user = User::where('email', $request->email)->get()->first();

            $user->auth_token = $token; // update user token

            $user->save();

            $response = ['success'=>true, 'data'=>['name'=>$user->name,'id'=>$user->id,'email'=>$request->email,'auth_token'=>$token]];
        } else
            $response = ['success'=>false, 'data'=>'Couldnt register user'];


        return response()->json($response, 201);
    }

}

```
#### 9. edit User model

```php
<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class  User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'auth_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}

```
#### 10. add route API

```php
<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['jwt.auth','api-header']], function () {

    // all routes to protected resources are registered here
    Route::get('users/list', function(){
        $users = App\User::all();

        $response = ['success'=>true, 'data'=>$users];

        return response()->json($response, 201);
    });
});
Route::group(['middleware' => 'api-header'], function () {
    Route::post('user/login', 'UserController@login');
    Route::post('user/register', 'UserController@register');
});
```

### III. Creating The React App (Front-end)
**STEP 1: Create react app with create-react-app command**
Sử dụng cmd:
```php
npx create-react-app react-frontend
cd react-frontend
npm install react-router-dom && npm install jquery && npm install axios
npm start
```
> Note: npx comes with npm 5.2+ and higher.

Cấu trúc thư mục của React App 
![](https://images.viblo.asia/a5cc9308-7212-4028-987c-bd026167a7e2.png)

**STEP 1: Chỉnh sửa component index.js**
`index.js`
```js
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

import axios from "axios";
import $ from "jquery";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {}
        };
    }
    _loginUser = (email, password) => {
        $("#login-form button")
            .attr("disabled", "disabled")
            .html(
                '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
            );
        var formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        axios
            .post("http://localhost:8000/api/user/login/", formData)
            .then(response => {
                console.log(response);
                return response;
            })
            .then(json => {
                if (json.data.success) {
                    alert("Login Successful!");
                    const { name, id, email, auth_token } = json.data.data;

                    let userData = {
                        name,
                        id,
                        email,
                        auth_token,
                        timestamp: new Date().toString()
                    };
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };
                    // save app state with user date in local storage
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isLoggedIn: appState.isLoggedIn,
                        user: appState.user
                    });
                } else alert("Login Failed!");

                $("#login-form button")
                    .removeAttr("disabled")
                    .html("Login");
            })
            .catch(error => {
                alert(`An Error Occured! ${error}`);
                $("#login-form button")
                    .removeAttr("disabled")
                    .html("Login");
            });
    };

    _registerUser = (name, email, password) => {
        $("#email-login-btn")
            .attr("disabled", "disabled")
            .html(
                '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
            );

        var formData = new FormData();
        formData.append("type", "email");
        formData.append("username", "username");
        formData.append("password", password);
        formData.append("phone", 123456789);
        formData.append("email", email);
        formData.append("address", "address ");
        formData.append("name", name);
        formData.append("id", 89);

        axios
            .post("http://localhost:8000/api/user/register", formData)
            .then(response => {
                console.log(response);
                return response;
            })
            .then(json => {
                if (json.data.success) {
                    alert(`Registration Successful!`);
                    const { name, id, email, auth_token } = json.data.data;
                    let userData = {
                        name,
                        id,
                        email,
                        auth_token,
                        timestamp: new Date().toString()
                    };
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };
                    // save app state with user date in local storage
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isLoggedIn: appState.isLoggedIn,
                        user: appState.user
                    });
                    // redirect home
                    //this.props.history.push("/");
                } else {
                    alert(`Registration Failed!`);
                    $("#email-login-btn")
                        .removeAttr("disabled")
                        .html("Register");
                }
            })
            .catch(error => {
                alert("An Error Occured!" + error);
                console.log(`${formData} ${error}`);
                $("#email-login-btn")
                    .removeAttr("disabled")
                    .html("Register");
            });
    };

    _logoutUser = () => {
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        // save app state with user date in local storage
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
    };

    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            console.log(AppState);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
        }
    }

    render() {
        console.log(this.state.isLoggedIn);
        console.log("path name: " + this.props.location.pathname);
        if (
            !this.state.isLoggedIn &&
            this.props.location.pathname !== "/login" &&
            this.props.location.pathname !== "/register"
        ) {
            console.log(
                "you are not loggedin and are not visiting login or register, so go to login page"
            );
            this.props.history.push("/login");
        }
        if (
            this.state.isLoggedIn &&
            (this.props.location.pathname === "/login" ||
                this.props.location.pathname === "/register")
        ) {
            console.log(
                "you are either going to login or register but youre logged in"
            );

            this.props.history.push("/");
        }
        return (
            <Switch data="data">
                <div id="main">
                    <Route
                        exact
                        path="/"
                        render={props => (
                            <Home
                                {...props}
                                logoutUser={this._logoutUser}
                                user={this.state.user}
                            />
                        )}
                    />

                    <Route
                        path="/login"
                        render={props => <Login {...props} loginUser={this._loginUser} />}
                    />

                    <Route
                        path="/register"
                        render={props => (
                            <Register {...props} registerUser={this._registerUser} />
                        )}
                    />
                </div>
            </Switch>
        );
    }
}

const AppContainer = withRouter(props => <App {...props} />);
// console.log(store.getState())
render(
    <BrowserRouter>
        <AppContainer />
    </BrowserRouter>,

    document.getElementById("root")
);


```

**STEP 2: Create the Register component**
FIle `Register.js`

```js
import React from "react";
import { Link } from "react-router-dom";

const Register = ({ history, registerUser = f => f }) => {
    let _email, _password, _name;

    const handleLogin = e => {
        e.preventDefault();

        registerUser(_name.value, _email.value, _password.value);
    };
    return (
        <div id="main">
            <form id="login-form" action="" onSubmit={handleLogin} method="post">
                <h3 style={{ padding: 15 }}>Register Form</h3>
                <input ref={input => (_name = input)}  autoComplete="off" id="name-input" name="name" type="text" className="center-block" placeholder="Name" />
                <input ref={input => (_email = input)} autoComplete="off" id="email-input" name="email" type="text" className="center-block" placeholder="email" />
                <input ref={input => (_password = input)}  autoComplete="off" id="password-input" name="password" type="password" className="center-block" placeholder="password" />
                <button type="submit" className="landing-page-btn center-block text-center" id="email-login-btn" href="#facebook" >
                    Register
                </button>

                <Link  to="/login">
                    Login
                </Link>
            </form>
        </div>
    );
};

export default Register;
```


**STEP 3: Create the Login component**
File `Login.js`

```js
import React from "react";
import { Link } from "react-router-dom";

const Login = ({ history, loginUser = f => f }) => {
    let _email, _password;
    const handleLogin = e => {
        e.preventDefault();
        loginUser(_email.value, _password.value);
    };
    return (
        <div id="main">
            <form id="login-form" action="" onSubmit={handleLogin} method="post">
                <h3 style={{ padding: 15 }}>Login Form</h3>
                <input ref={input => (_email = input)}  autoComplete="off" id="email-input" name="email" type="text" className="center-block" placeholder="email" />
                <input ref={input => (_password = input)}  autoComplete="off" id="password-input" name="password" type="password" className="center-block" placeholder="password" />
                <button type="submit" className="landing-page-btn center-block text-center" id="email-login-btn" href="#facebook" >
                    Login
                </button>
            </form>
            <Link  to="/register" >
                Register
            </Link>
        </div>
    );
};

export default  Login;
```
**STEP 4: Create the Home component**
File `Home.js`

```js
import React from "react";
import axios from "axios";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: JSON.parse(localStorage["appState"]).user.auth_token,
            users: []
        };
    }

    componentDidMount() {
        axios
            .get(`http://localhost:8000/api/users/list?token=${this.state.token}`)
            .then(response => {
                console.log(response);
                return response;
            })
            .then(json => {
                if (json.data.success) {
                    this.setState({ users: json.data.data });
                    //alert("Login Successful!");
                } else alert("Login Failed!");
            })
            .catch(error => {
                alert(`An Error Occured! ${error}`);
            });
    }

    render() {
        return (
            <div style={styles}>
                <h2>Welcome Home {"\u2728"}</h2>
                <p>List of all users on the system</p>
                <ul>{this.state.users.map(user => <ol style={{padding:15,border:"1px solid #cccccc", width:250, textAlign:"left",marginBottom:15,marginLeft:"auto", marginRight:"auto"}}><p>Name: {user.name}</p><p>Email: {user.email}</p></ol>)}</ul>
                <button
                    style={{ padding: 10, backgroundColor: "red", color: "white" }}
                    onClick={this.props.logoutUser}
                >
                    Logout{" "}
                </button>
            </div>
        );
    }
}
```

DEMO:

Register
![](https://images.viblo.asia/26bbdb5e-c201-4a52-a12d-cab678536cea.png)

Login 
![](https://images.viblo.asia/40512c7d-f067-422e-9fd6-5d16a04a40e4.png)
List user
![](https://images.viblo.asia/cb81e3f8-e388-4237-8ee4-88e3a44cf84d.png)

Vậy là mình đã hướng dẫn xong, hy vọng sẽ giúp ích được cho mọi người, Thank you !!!

Source:

API: https://github.com/tuanvh/laravel-jwt

Front-end: https://github.com/tuanvh/react-fontend

Nguồn tham khảo: https://medium.com