Bài trước chúng ta đã tìm hiểu, [cài đặt và sử dụng react router v4.](https://viblo.asia/posts/Az45bn6w5xY/edit) , bài tiếp theo chúng ta sẽ cùng tìm hiểu sử dụng JWT xác thực người dùng.
### Cài đặt JWT
```
composer require tymon/jwt-auth
```
##### Cập nhật config/app.php file.
```
'providers' => [
	....
	Tymon\JWTAuth\Providers\JWTAuthServiceProvider::class,
],
'aliases' => [
	....
	'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class,
],
```

##### Tiến hành publish file config JWT run command :
```
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\JWTAuthServiceProvider"
```
> Sau khi run command thành công config/jwt.php được tạo ra.

##### Tạo ra JWT Token  run command
```
php artisan jwt:secret
```
##### Nếu bạn run command trên sảy ra nỗi trong terminal. Lỗi này xảy ra trong phiên bản 5.5 laravel. Gải pháp cho nó như sau:
```
[ReflectionException]
Method Tymon\JWTAuth\Commands\JWTGenerateCommand::handle() does not exist
```
>  Cần cài đặt new dev version of tymon/jwt-auth package. 
```
composer require tymon/jwt-auth:dev-develop --prefer-source
```
> Sau khi cài đặt xong tiến hành thay thế config/app.php và thay thế providers cũ providers mới.

```
'providers' => [
    ....
    Tymon\JWTAuth\Providers\JWTAuthServiceProvider::class to Tymon\JWTAuth\Providers\LaravelServiceProvider::class
],
 ```
##### Tiếp theo chạy command tạo ra jwt key.
```
php artisan jwt:secret
```
##### Tạo middleware cho JWT command:
```
php artisan make:middleware AuthJWT
```
##### Cập nhật AuthJWT:
```
namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;

class AuthJWT
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
                return response()->json(['error'=>'Token is Invalid']);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return response()->json(['error'=>'Token is Expired']);
            }else{
                return response()->json(['error'=>'Something is wrong']);
            }
        }
        return $next($request);
    }
}
```
##### Đăng ký Middleware
Mở app/Http/Kernel.php cập nhật.
```
    protected $routeMiddleware = [
        ...
        'jwt-auth' => \App\Http\Middleware\AuthJWT::class,
    ];
```

##### Tạo database laravel_reatjs
> Cập nhật file .env

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_reactjs
DB_USERNAME=root
DB_PASSWORD=
```

##### Chạy migrate tạo table users.

```
php artisan migrate
```
Tao dữ liệu người dùng cho đăng nhập.  UserFactory.
```
$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => 'user@gmail.com',
        'password' => \Hash::make('secret'), 
        'remember_token' => str_random(10),
    ];
});
```

##### Cập nhật DatabaseSeeder.php 
```
  public function run()
    {
//         $this->call(UsersTableSeeder::class);
        factory(App\User::class)->create();
    }
 ```
##### Đăng ký dữ liệu test run comand.
 ```
 php artisan db:seed
```
##### Tạo  ApiController command sau:
```
php artisan make:controller ApiController
```
##### Cập nhật ApiController
```
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use JWTAuth;
use JWTAuthException;
use App\User;

class ApiController extends Controller
{

    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        $token = null;
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'invalid_email_or_password',
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'failed_to_create_token',
            ]);
        }
        return response()->json([
            'response' => 'success',
            'result' => [
                'token' => $token,
            ],
        ]);
    }
}
```
##### Tạo giao diện đăng nhập.
```
import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

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
    }

    handleChangeEmail(e) {
        this.setState({email: e.target.value});
    }

    handleChangePassword(e) {
        this.setState({password: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let uri = '/login';
        axios.post(uri, this.state).then((response) => {
            if (response.data.result) {
                localStorage.setItem('jwt', response.data.result);
                this.props.history.push('/');
            }
        })
    }
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading ">Login</div>
                <div className="panel-body">
                    <form onSubmit={this.handleSubmit}>
                        <label>User name</label>
                        <input type={'text'} className="form-control" onChange={this.handleChangeEmail}/>
                        <label>Password</label>
                        <input type={'password'} className="form-control"
                               onChange={this.handleChangePassword}/>
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={this.handleSubmit}>Đăng nhập</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Login
```

##### Cập nhật Example.js.
```
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Link, Redirect} from 'react-router-dom';
import RouterPath from '../routes/RouterPath';

export default class Example extends Component {
    render() {
        let login = localStorage.getItem('jwt');
        if (!login) {
            console.log('here');
            return (
                <HashRouter>
                    <div>
                        <Redirect to='login'/>
                        <RouterPath/>
                    </div>
                </HashRouter>
            )
        }
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/topic'}>Topic</Link>
                        </li>
                        <li>
                            <Link to={'/about'}>About</Link>
                        </li>
                    </ul>
                    <RouterPath/>
                </div>
            </HashRouter>
        )
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(
        <Example/>,
        document.getElementById('example'));
}
```
##### Cập nhật routes/api.php
```
Route::post('/login', 'ApiController@login');
```
##### Cửa sổ cmd gõ lệnh sau:
```
npm run dev
```
> Nó sẽ biên dịch các file trong assets and copy đến public >> js >> app.js file.
> 
Xem kết quả tại: http://localhost/blog/public sẽ tự động chuyển đến màn login tiến hành nhập thông tin đã đăng ký ở trên tiến hành đăng nhập. Đăng nhập thành công  chuyển đến màn hình home.

##### Cảm ơn các bạn đã xem nguồn :

https://laravelcode.com/post/restful-api-in-laravel-55-using-jwt-authentication

https://www.techiediaries.com/react-router-dom-v4/       

http://jwt-auth.readthedocs.io/en/develop/