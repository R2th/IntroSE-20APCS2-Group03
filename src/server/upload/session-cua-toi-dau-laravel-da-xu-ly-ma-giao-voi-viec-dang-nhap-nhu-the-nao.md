![](https://images.viblo.asia/cea1338a-6e94-4259-bb9c-75f17ead6b1c.gif)

# 1. Đặt vấn đề

Laravel hiện nay là framework PHP được sử dụng nhiều nhất nhờ vào việc dễ sử dụng, xây dựng theo mô hình MVC, các tính năng dựng sẵn, tính năng bảo mật....Và chắc hẳn khi làm việc với Laravel thì hầu như ai cũng đã từng làm qua chức năng đăng nhập.

Đã bao giờ bạn vào core của Laravel xem họ đã so sánh `email`, `password` trong database và tạo SESSION như thế nào chưa ?

Khi code thì bạn chỉ cần truyền params ví dụ là `email` và `password` vào hàm `attempt()` của Facade `Auth` là được, kiểu như này:

```php
    public function login(AuthRequest $request)
    {
        $authenticated = Auth::attempt([
                'email' => $request['email'],
                'password' => $request['password'],
            ], !empty($request['remember']));

        if ($authenticated) {
            return Redirect::to('/');
        }

        Session::flash('error', 'The login information is incorrect');

        return redirect()->route('login');
    }
```

Chắc hẳn khi làm với PHP thuần thì bạn còn cần phải set `SESSION` cho nó, kiểu như này:

```php
    public function login()
	{
		if(isset($_POST['btnSubmit']))
		{
			$username = $_POST['user'] ?? '';
			$username = strip_tags($username);

			$password = $_POST['pass'] ?? '';
			$password = strip_tags($password);

			if(empty($username) OR empty($password))
			{
				// Redirect login with error
			} else {
				$checkLogin = checkLogin($username, md5($password));
				if(!empty($checkLogin) && isset($checkLogin['id']))
				{
					$_SESSION['id'] = $checkLogin['id'];
					$_SESSION['username'] = $checkLogin['username'];
					// Redirect Dashboard
				} else {
					// Redirect login with fail
				}
			}
		}
	}
```

Ví dụ thôi nhé :sweat_smile::sweat_smile: Vậy, chúng ta sẽ thử đi vào tìm hiểu xem Laravel có những gì ẩn sâu bên trong cơ chế login của nó nhé :scream::scream:

# 2. Mày mò

Lướt qua phần config, chúng ta sẽ thấy có một file `config/auth.php`

```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | This option controls the default authentication "guard" and password
    | reset options for your application. You may change these defaults
    | as required, but they're a perfect start for most applications.
    |
    */

    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Next, you may define every authentication guard for your application.
    | Of course, a great default configuration has been defined for you
    | here which uses session storage and the Eloquent user provider.
    |
    | All authentication drivers have a user provider. This defines how the
    | users are actually retrieved out of your database or other storage
    | mechanisms used by this application to persist your user's data.
    |
    | Supported: "session", "token"
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'token',
            'provider' => 'users',
            'hash' => false,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | All authentication drivers have a user provider. This defines how the
    | users are actually retrieved out of your database or other storage
    | mechanisms used by this application to persist your user's data.
    |
    | If you have multiple user tables or models you may configure multiple
    | sources which represent each model / table. These sources may then
    | be assigned to any extra authentication guards you have defined.
    |
    | Supported: "database", "eloquent"
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        // 'users' => [
        //     'driver' => 'database',
        //     'table' => 'users',
        // ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Resetting Passwords
    |--------------------------------------------------------------------------
    |
    | You may specify multiple password reset configurations if you have more
    | than one user table or model in the application and you want to have
    | separate password reset settings based on the specific user types.
    |
    | The expire time is the number of minutes that the reset token should be
    | considered valid. This security feature keeps tokens short-lived so
    | they have less time to be guessed. You may change this as needed.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_resets',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],
];
```

Hệ thống xác thực Authentication của Laravel được xây dựng dựa trên 2 thành phần cốt lõi - guard và provider.

***Guards***

`Guard` các bạn cứ hiểu như là một cách cung cấp logic được dùng để xác thực người dùng. Trong Laravel, thường hay dùng session guard hoặc token guard. Session guard duy trì trạng thái người dùng trong mỗi lần request bằng cookie. Còn Token guard xác thực người dùng bằng cách kiểm tra token hợp lệ trong mỗi lần request.

Vì vậy, như bạn thấy, guard xác định logic của việc xác thực, và không cần thiết để luôn xác thực bằng cách lấy các thông tin hợp lệ từ phía back-end. Bạn có thể triển khai một guard mà chỉ cần kiểm tra sự có mặt của một thông tin cụ thể trong headers của request và xác thực người dùng dựa trên điều đó.

***Provider***

Nếu `Guards` hỗ trợ việc định nghĩa logic để xác thực thì `Providers` lấy ra dữ liệu người dùng từ phía back-end. Nếu `guard` yêu cầu người dùng phải hợp lệ với bộ lưu trữ ở back-end thì việc triển khai truy suất người dùng sẽ được `providers` thực hiện.Laravel hỗ trợ cho việc người dùng truy suất sử dụng `Eloquent` và `Query Buider` vào database. Tuy nhiên, chúng ta có thể thêm bất kì thay đổi vào . Ví dụ nhé, các bạn đặt model `User` trong namespace App nữa mà các bạn muốn đặt trong namespace `App\Model` thì chúng ta sẽ thay đổi providers tronbg file app/auth.php như sau :

```php
'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        // 'users' => [
        //     'driver' => 'database',
        //     'table' => 'users',
        // ],
    ],
```

Ở bài này sẽ xem laravel xử lý login và lưu session như thế nào nên ở `guards` `web` mình để config `driver` là `session` nên chúng ta sẽ tập trung vào file `vendor/laravel/framework/src/Illuminate/Auth/SessionGuard.php` nhé.

Như đã nói ở đầu bài khi làm chức năng `login` ta chỉ cần truyền `params` vào hàm `attempt()` thì laravel sẽ xử lý cho chúng ta, thế nên tìm hàm `attempt()` ở class `SessionGuard` xem nó làm như thế nào.

Đây là hàm chúng ta cần:

```php
public function attempt(array $credentials = [], $remember = false)
    {
        $this->fireAttemptEvent($credentials, $remember);

        $this->lastAttempted = $user = $this->provider->retrieveByCredentials($credentials);

        // If an implementation of UserInterface was returned, we'll ask the provider
        // to validate the user against the given credentials, and if they are in
        // fact valid we'll log the users into the application and return true.
        if ($this->hasValidCredentials($user, $credentials)) {
            $this->login($user, $remember);

            return true;
        }

        // If the authentication attempt fails we will fire an event so that the user
        // may be notified of any suspicious attempts to access their account from
        // an unrecognized user. A developer may listen to this event as needed.
        $this->fireFailedEvent($user, $credentials);

        return false;
    }
```

`$this->fireAttemptEvent($credentials, $remember);` đoạn này sẽ được thực hiện khi có `event`
```php
        if (isset($this->events)) {
            $this->events->dispatch(new Attempting(
                $this->name, $credentials, $remember
            ));
        }
```

Tiếp theo là nó sẽ truy xuất thông tin người dùng với các thông tin params truyền vào `$this->lastAttempted = $user = $this->provider->retrieveByCredentials($credentials);`

Khi này nó gọi hàm `retrieveByCredentials()` ở `\Illuminate\Contracts\Auth\UserProvider`, chúng ta lại mò vào đây xem hàm này làm gì :thinking:

Khi mò vào thì mới biết `UserProvider` chỉ là `interface` (yaoming), lại mày mò tiếp thì thấy thằng `vendor/laravel/framework/src/Illuminate/Auth/EloquentUserProvider.php` `implements` `UserProvider` thế là cũng biết hàm `retrieveByCredentials` sẽ làm gì, và đây là kết quả của nó :joy:

```php
    /**
     * Retrieve a user by the given credentials.
     *
     * @param  array  $credentials
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveByCredentials(array $credentials)
    {
        if (empty($credentials) ||
           (count($credentials) === 1 &&
            Str::contains($this->firstCredentialKey($credentials), 'password'))) {
            return;
        }

        // First we will add each credential element to the query as a where clause.
        // Then we can execute the query and, if we found a user, return it in a
        // Eloquent User "model" that will be utilized by the Guard instances.
        $query = $this->newModelQuery();

        foreach ($credentials as $key => $value) {
            if (Str::contains($key, 'password')) {
                continue;
            }

            if (is_array($value) || $value instanceof Arrayable) {
                $query->whereIn($key, $value);
            } else {
                $query->where($key, $value);
            }
        }

        return $query->first();
    }
    
    /**
     * Get the first key from the credential array.
     *
     * @param  array  $credentials
     * @return string|null
     */
    protected function firstCredentialKey(array $credentials)
    {
        foreach ($credentials as $key => $value) {
            return $key;
        }
    }
```

Như vậy hàm `retrieveByCredentials` là sẽ là xử lý truy xuất thông tin người dùng với thông tin được truyền vào.

Tiếp theo ở hàm `attempt()` nếu `user` trả về là `null` tức là việc xác thực thất bại thì sẽ trả về `false`, Nếu trả về `user` thì :

```php
if ($this->hasValidCredentials($user, $credentials)) {
            $this->login($user, $remember);

            return true;
        }
```

Nó sẽ xác thực người dùng dựa vào thông tin đã cho, nếu đúng sẽ gọi đến hàm `login()` với tham số truyền vào là `user` và `remember`

Rồi ta lại mò xem hàm `login()` sẽ làm gì ?

```php
 public function login(AuthenticatableContract $user, $remember = false)
    {
        $this->updateSession($user->getAuthIdentifier());

        // If the user should be permanently "remembered" by the application we will
        // queue a permanent cookie that contains the encrypted copy of the user
        // identifier. We will then decrypt this later to retrieve the users.
        if ($remember) {
            $this->ensureRememberTokenIsSet($user);

            $this->queueRecallerCookie($user);
        }

        // If we have an event dispatcher instance set we will fire an event so that
        // any listeners will hook into the authentication events and run actions
        // based on the login and logout events fired from the guard instances.
        $this->fireLoginEvent($user, $remember);

        $this->setUser($user);
    }
        
 protected function updateSession($id)
    {
        $this->session->put($this->getName(), $id);

        $this->session->migrate(true);
    }
```

Hàm `updateSession()` sẽ gọi hàm `put()` và `migrate()` ở file `vendor/laravel/framework/src/Illuminate/Session/Store.php`, lúc này hàm `put` sẽ sinh ra cặp `key` => `value` trong phiên với `key` là `$this->getName()`  và `key` là `$id`, ở giá trị `key` thì sẽ là unique.

```php
/**
     * Get a unique identifier for the auth session value.
     *
     * @return string
     */
    public function getName()
    {
        return 'login_'.$this->name.'_'.sha1(static::class);
    }
```

Hàm `migrate` sẽ sinh ra 1 `session` với độ dài là 40 ký tự, bạn có thể vào `storage/framework/sessions` đếm xem session dài có đúng 40 ký tự không :joy:

```php
/**
     * Get a new, random session ID.
     *
     * @return string
     */
    protected function generateSessionId()
    {
        return Str::random(40);
    }
```

Túm lại là hàm `updateSesssion()` sẽ tạo mới hoặc update session cho chúng ta với độ dài session là 40 ký tự.

Khi người dùng click vào `remember` thì

```php
        if ($remember) {
            $this->ensureRememberTokenIsSet($user);

            $this->queueRecallerCookie($user);
         }
```

Hàm `ensureRememberTokenIsSet()`  sẽ kiểm tra xem `user` đã có `remember_token` chưa, nếu chưa sẽ sinh ra 1 `remember_token` lưu tương ứng với `user`

```php
    protected function ensureRememberTokenIsSet(AuthenticatableContract $user)
    {
        if (empty($user->getRememberToken())) {
            $this->cycleRememberToken($user);
        }
    }
    
    protected function cycleRememberToken(AuthenticatableContract $user)
    {
        $user->setRememberToken($token = Str::random(60));

        $this->provider->updateRememberToken($user, $token);
    }
    
```

Hàm `queueRecallerCookie()` sẽ trả về cookie cho người dùng.

# Chốt tộ

![](https://images.viblo.asia/73f908dd-edce-4440-b459-3bd2082cb0fe.jpg)


- Lú cái đầu, như vậy mình đã chia sẻ xem cách Laravel thực hiện ma giáo việc nó xử lý đăng nhập, lưu session và chức năng remember_me như thế nào.
- Dù nó có ma giáo như nào thì cũng đều xây dựng lên từ PHP thuần nên khi bạn dùng chức năng gì của framework cũng nên mày mò xem nó làm như nào để học hỏi họ làm thế nào mà siêu vậy nhé :joy:
- Hi vọng bài tới mình cũng sẽ mày mò về phần nào đó hay ho tiếp theo của Laravel