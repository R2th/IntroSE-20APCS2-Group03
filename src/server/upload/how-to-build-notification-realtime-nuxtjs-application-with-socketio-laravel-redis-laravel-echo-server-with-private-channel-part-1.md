*Learning anything related to the library or framework is extremely important. One of them, in order to increase the efficiency of the fastest performance for learning new things, and 'keep running first and digging back'.*

*As the title of the article, I also provide to you a tutorial relevant. Hope you will read and integrate with your project.*

*If you have any suggestions for more common bugs, please leave a comment so I can make this article better.*

## Base Setup
First, We install laravel project:

`composer create-project --prefer-dist laravel/laravel laravel-nuxt-realtime-example` 

After that, We install `predis`, `cors`, `jwt` package into laravel and modify `composer.json`: 
```json
"require": {
        "barryvdh/laravel-cors": "^0.11.3",
        "predis/predis": "^1.1",
        "tymon/jwt-auth": "^1.0.0-rc.3"
}
```

Make sure run `composer install` :grinning:

I config my project with `laradock` and enable `https`, so my URL: `https://laravel1.test`

## Config
### .env
In file `.env` 
```env
APP_URL=https://laravel1.test

BROADCAST_DRIVER=redis
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

REDIS_HOST=redis
```
if using database must create jobs table in document laravel 5. `php artisan queue:work` both of them should work and send message after run event broadcast
`QUEUE_CONNECTION=redis` -> not 127.0.0.1 if using docker because there is different IP
### config jwt authenticate and cors

in `providers`
```config/app.php
-        // App\Providers\BroadcastServiceProvider::class,
+        App\Providers\BroadcastServiceProvider::class,
+        Tymon\JWTAuth\Providers\LaravelServiceProvider::class,
```

in `aliases`
```config/app.php
+        'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class,
+        'JWTFacyory' => Tymon\JWTAuth\Facades\JWTFactory::class
```

make sure config API auth change this to jwt

```config/auth.php
        'api' => [
-               'driver' => 'token',
+               'driver' => 'jwt',
                'provider' => 'users',
        ],
```

The jwt-auth composer package has a config file that we can publish:

```terminal
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```
the result for this :scream:
```config/jwt.php
<?php
 /*
 * This file is part of jwt-auth.
 *
 * (c) Sean Tymon <tymon148@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
 return [
     /*
    |--------------------------------------------------------------------------
    | JWT Authentication Secret
    |--------------------------------------------------------------------------
    |
    | Don't forget to set this in your .env file, as it will be used to sign
    | your tokens. A helper command is provided for this:
    | `php artisan jwt:secret`
    |
    | Note: This will be used for Symmetric algorithms only (HMAC),
    | since RSA and ECDSA use a private/public key combo (See below).
    |
    */
     'secret' => env('JWT_SECRET'),
     /*
    |--------------------------------------------------------------------------
    | JWT Authentication Keys
    |--------------------------------------------------------------------------
    |
    | The algorithm you are using, will determine whether your tokens are
    | signed with a random string (defined in `JWT_SECRET`) or using the
    | following public & private keys.
    |
    | Symmetric Algorithms:
    | HS256, HS384 & HS512 will use `JWT_SECRET`.
    |
    | Asymmetric Algorithms:
    | RS256, RS384 & RS512 / ES256, ES384 & ES512 will use the keys below.
    |
    */
     'keys' => [
         /*
        |--------------------------------------------------------------------------
        | Public Key
        |--------------------------------------------------------------------------
        |
        | A path or resource to your public key.
        |
        | E.g. 'file://path/to/public/key'
        |
        */
         'public' => env('JWT_PUBLIC_KEY'),
         /*
        |--------------------------------------------------------------------------
        | Private Key
        |--------------------------------------------------------------------------
        |
        | A path or resource to your private key.
        |
        | E.g. 'file://path/to/private/key'
        |
        */
         'private' => env('JWT_PRIVATE_KEY'),
         /*
        |--------------------------------------------------------------------------
        | Passphrase
        |--------------------------------------------------------------------------
        |
        | The passphrase for your private key. Can be null if none set.
        |
        */
         'passphrase' => env('JWT_PASSPHRASE'),
     ],
     /*
    |--------------------------------------------------------------------------
    | JWT time to live
    |--------------------------------------------------------------------------
    |
    | Specify the length of time (in minutes) that the token will be valid for.
    | Defaults to 1 hour.
    |
    | You can also set this to null, to yield a never expiring token.
    | Some people may want this behaviour for e.g. a mobile app.
    | This is not particularly recommended, so make sure you have appropriate
    | systems in place to revoke the token if necessary.
    | Notice: If you set this to null you should remove 'exp' element from 'required_claims' list.
    |
    */
     'ttl' => env('JWT_TTL', 60),
     /*
    |--------------------------------------------------------------------------
    | Refresh time to live
    |--------------------------------------------------------------------------
    |
    | Specify the length of time (in minutes) that the token can be refreshed
    | within. I.E. The user can refresh their token within a 2 week window of
    | the original token being created until they must re-authenticate.
    | Defaults to 2 weeks.
    |
    | You can also set this to null, to yield an infinite refresh time.
    | Some may want this instead of never expiring tokens for e.g. a mobile app.
    | This is not particularly recommended, so make sure you have appropriate
    | systems in place to revoke the token if necessary.
    |
    */
     'refresh_ttl' => env('JWT_REFRESH_TTL', 20160),
     /*
    |--------------------------------------------------------------------------
    | JWT hashing algorithm
    |--------------------------------------------------------------------------
    |
    | Specify the hashing algorithm that will be used to sign the token.
    |
    | See here: https://github.com/namshi/jose/tree/master/src/Namshi/JOSE/Signer/OpenSSL
    | for possible values.
    |
    */
     'algo' => env('JWT_ALGO', 'HS256'),
     /*
    |--------------------------------------------------------------------------
    | Required Claims
    |--------------------------------------------------------------------------
    |
    | Specify the required claims that must exist in any token.
    | A TokenInvalidException will be thrown if any of these claims are not
    | present in the payload.
    |
    */
     'required_claims' => [
        'iss',
        'iat',
        'exp',
        'nbf',
        'sub',
        'jti',
    ],
     /*
    |--------------------------------------------------------------------------
    | Persistent Claims
    |--------------------------------------------------------------------------
    |
    | Specify the claim keys to be persisted when refreshing a token.
    | `sub` and `iat` will automatically be persisted, in
    | addition to the these claims.
    |
    | Note: If a claim does not exist then it will be ignored.
    |
    */
     'persistent_claims' => [
        // 'foo',
        // 'bar',
    ],
     /*
    |--------------------------------------------------------------------------
    | Lock Subject
    |--------------------------------------------------------------------------
    |
    | This will determine whether a `prv` claim is automatically added to
    | the token. The purpose of this is to ensure that if you have multiple
    | authentication models e.g. `App\User` & `App\OtherPerson`, then we
    | should prevent one authentication request from impersonating another,
    | if 2 tokens happen to have the same id across the 2 different models.
    |
    | Under specific circumstances, you may want to disable this behaviour
    | e.g. if you only have one authentication model, then you would save
    | a little on token size.
    |
    */
     'lock_subject' => true,
     /*
    |--------------------------------------------------------------------------
    | Leeway
    |--------------------------------------------------------------------------
    |
    | This property gives the jwt timestamp claims some "leeway".
    | Meaning that if you have any unavoidable slight clock skew on
    | any of your servers then this will afford you some level of cushioning.
    |
    | This applies to the claims `iat`, `nbf` and `exp`.
    |
    | Specify in seconds - only if you know you need it.
    |
    */
     'leeway' => env('JWT_LEEWAY', 0),
     /*
    |--------------------------------------------------------------------------
    | Blacklist Enabled
    |--------------------------------------------------------------------------
    |
    | In order to invalidate tokens, you must have the blacklist enabled.
    | If you do not want or need this functionality, then set this to false.
    |
    */
     'blacklist_enabled' => env('JWT_BLACKLIST_ENABLED', true),
     /*
    | -------------------------------------------------------------------------
    | Blacklist Grace Period
    | -------------------------------------------------------------------------
    |
    | When multiple concurrent requests are made with the same JWT,
    | it is possible that some of them fail, due to token regeneration
    | on every request.
    |
    | Set grace period in seconds to prevent parallel request failure.
    |
    */
     'blacklist_grace_period' => env('JWT_BLACKLIST_GRACE_PERIOD', 0),
     /*
    |--------------------------------------------------------------------------
    | Cookies encryption
    |--------------------------------------------------------------------------
    |
    | By default Laravel encrypt cookies for security reason.
    | If you decide to not decrypt cookies, you will have to configure Laravel
    | to not encrypt your cookie token by adding its name into the $except
    | array available in the middleware "EncryptCookies" provided by Laravel.
    | see https://laravel.com/docs/master/responses#cookies-and-encryption
    | for details.
    |
    | Set it to true if you want to decrypt cookies.
    |
    */
     'decrypt_cookies' => false,
     /*
    |--------------------------------------------------------------------------
    | Providers
    |--------------------------------------------------------------------------
    |
    | Specify the various providers used throughout the package.
    |
    */
     'providers' => [
         /*
        |--------------------------------------------------------------------------
        | JWT Provider
        |--------------------------------------------------------------------------
        |
        | Specify the provider that is used to create and decode the tokens.
        |
        */
         'jwt' => Tymon\JWTAuth\Providers\JWT\Lcobucci::class,
         /*
        |--------------------------------------------------------------------------
        | Authentication Provider
        |--------------------------------------------------------------------------
        |
        | Specify the provider that is used to authenticate users.
        |
        */
         'auth' => Tymon\JWTAuth\Providers\Auth\Illuminate::class,
         /*
        |--------------------------------------------------------------------------
        | Storage Provider
        |--------------------------------------------------------------------------
        |
        | Specify the provider that is used to store tokens in the blacklist.
        |
        */
         'storage' => Tymon\JWTAuth\Providers\Storage\Illuminate::class,
     ],
 ];
```

Next step is to create a secret key. We can use this command to generate

```
php artisan jwt:secret
```

In file .env
```.env
......
......
......
JWT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx //here this command generate 
```

config `Kernel.php` type api, and enable 'cors'

```app/Http/Kernel.php
        protected $middleware = [
            ...
+           \Barryvdh\Cors\HandleCors::class,
        ];

        'api' => [
                'throttle:60,1',
                'bindings',
+                \Barryvdh\Cors\HandleCors::class,
        ],
        
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
+       'subscribed' => \App\Http\Middleware\VerifyStoreIsSubscribed::class,
+       'jwt.auth' => \App\Http\Middleware\VerifyJWTToken::class,
+       'jwt.refresh' => Tymon\JWTAuth\Middleware\RefreshToken::class,
+       'cors' => \Barryvdh\Cors\HandleCors::class,
    ];
```

```app/Http/Middleware/VerifyJWTToken.php
<?php
namespace App\Http\Middleware;
use Closure;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
class VerifyJWTToken
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
            $user = JWTAuth::toUser($request->token);
        } catch (JWTException $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                return response()->json(['token_expired'], $e->getStatusCode());
            } elseif ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return response()->json(['token_invalid'], $e->getStatusCode());
            } else {
                return response()->json(['error'=>'Token is required']);
            }
        }
        return $next($request);
    }
}
```

add `JWTSubject` for `User.php`

```app/User.php
use Tymon\JWTAuth\Contracts\JWTSubject;
class User extends Authenticatable implements JWTSubject
{
     use Notifiable;
    
     /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
  
```

We support all origins and disable share credentials.

```config/cors.php
<?php
 return [
     /*
    |--------------------------------------------------------------------------
    | Laravel CORS
    |--------------------------------------------------------------------------
    |
    | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
    | to accept any value.
    |
    */
   
    'supportsCredentials' => false,
    'allowedOrigins' => ['*'],
    'allowedOriginsPatterns' => [],
    'allowedHeaders' => ['*'],
    'allowedMethods' => ['*'],
    'exposedHeaders' => [],
    'maxAge' => 0,
 ];
```

### API
I create some Api to authenticate, I dont need file `routes/web.php` :rofl: , you can delete this if you want

```routes/api.php
-   Route::middleware('auth:api')->get('/user', function (Request $request) {
+   Route::middleware('jwt.auth')->get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('login', 'API\LoginController@login');
    Route::middleware('jwt.auth')->group(function () {
        Route::get('mes', 'API\LoginController@getMes');
        Route::get('registerchannel/auth', 'API\LoginController@registerChannel');
        Route::post('registerchannel/auth', 'API\LoginController@registerChannel');
    });
```


Wait, we haven't migrated the database yet :fearful:

```
php artisan migrate
```

You can fake 1 account into database, this seeder, factory... I think it is very easy, so i dont write this.


Next, I have some function into controller:

```app/Http?Controllers/API/LoginController.php
<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;
use DB;
use App\User;
use Tymon\JWTAuth\Exceptions\JWTException;

class LoginController extends Controller
{
        public function login(Request $request) {
                // get information from request send
                $credentials = $request->only('email', 'password');
                
                try {
                       // check information
                       if (! $token = JWTAuth::attempt($credentials)) {
                           return response()->json(['error' => 'invalid_credentials'], 401);
                       }
                   } catch (JWTException $e) {
                       // Exception 
                       return response()->json(['error' => 'could_not_create_token'], 500);
                   }
                   $user = auth()->user();
                   
                   // success and send information to client and store this into vuex, cookie or localstorage
                   return response()->json(['token' => $token, 'email' => $user->email, 'id' => $user->id, 'name' => $user->name]);
                }
        }
}
```

### Broadcast in Laravel
please readmore document for this https://laravel.com/docs/5.8/broadcasting

Create Event to listen:

```
php artisan make:event PrivateMessage
```

Now We can see file privateMessage in Events folder, let me modify this:

```app/Events/PrivateMessage.php
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

use App\User;

class PrivateMessage implements ShouldBroadcast
{
        public $message;
        public $user;
        public $channelId;
        
        /**
         * Create a new event instance.
         *
         * @return void
         */
        public function __construct($message, User $user, $channelId)
        {
                $this->message = $message;
                $this->user = $user;
                $this->channelId = $channelId;
        }
        
        /**
         * Get the channels the event should broadcast on.
         *
         * @return \Illuminate\Broadcasting\Channel|array
         */
         
         public function broadcastOn()
        {
                return new PrivateChannel('notification-' . $this->channelId);
        }
}
```

using `jwt middleware for BroadcastServiceProvider`

```app/Providers/BroadcastServiceProvider.php
-        Broadcast::routes();
+        Broadcast::routes([ 'middleware' => [ 'jwt.auth' ]]);
```

we have channel `notification-{id}` to listen event.
```routes/channels.php
Broadcast::channel('notification-{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
```

I create 1 function into controller to run event PrivateMessage
``` app/Http/Controllers/API/LoginController.php
use JWTAuth;
use App\Events\PrivateMessage;
use Illuminate\Broadcasting\BroadcastController;
use Illuminate\Support\Facades\Broadcast;

public function getMes(Request $request) {
       $user = JWTAuth::toUser($request->token);
       broadcast(new PrivateMessage('somethingbullshit', $user, $user->id));

       return response()->json(['status' => 'ok']);
}
```

## Conclusion
Next Part 2, I will create laravel-echo-server config and basic nuxt.js to listen notification.

Here is [part2](https://viblo.asia/p/how-to-build-notification-realtime-nuxtjs-application-with-socketio-laravel-redis-laravel-echo-server-with-private-channel-part-2-6J3ZgwgLZmB)
 :grinning::grinning::grinning:
 
 facebook: https://www.facebook.com/quanghung997