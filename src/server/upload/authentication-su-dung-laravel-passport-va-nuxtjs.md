Xin chào các bạn, vậy là mình đã xuống núi sau những ngày dài ẩn cư để luyện công. Và trời cũng không phụ lòng người, cuối cùng mình cũng đã luyện thành bí kíp **NuxtJS** rất là nổi tiếng trong giới coding :)<br>
Và hôm nay mình xin mạn phép được chia sẻ với các bạn một tuyệt kỹ mình rất tâm đắc đó là **Authentication với Laravel và NuxtJS**. Bây giờ hãy cùng nhau nghiên cứu nào.<br>
# Tâm pháp cần nắm
Tất nhiên để luyện được võ công thì chúng ta cần phải nắm vững một số tâm pháp cần thiết nếu không lúc ra chiêu sẽ chỉ có hình mà không có ý :v:. Và với tuyệt kỹ này cũng vậy, các bạn cần nắm vững các loại tâm pháp dưới đây để tránh trường hợp chỉ copy + paste mà không hiểu gì cả :)<br>
* Laravel: đây là tâm pháp cơ bản để các bạn xây dựng nên một server (nơi sẽ cung cấp các api cho ứng dụng NuxtJS gọi đến). Các bạn có thể vào [đây](https://laravel.com/docs/7.x) để tự luyện tâm pháp này.
* NuxtJS: tâm pháp này sẽ giúp các bạn dựng nên phần giao diện người dùng (User Interface) sử dụng VueJS. Tương tự các bạn cũng có thể vào [đây](https://vuejs.org/v2/guide/) để luyện.
* Do trong bài viết này mình có sử dụng thêm [Element UI](https://element.eleme.io/#/en-US/component/installation) để tiện cho việc dựng giao diện cũng như lười code CSS (đây mới là nguyên nhân chính :)) nên các bạn cũng có thể tự nghiên cứu thêm nếu muốn.

# Chuẩn bị
Để luyện được võ công thì đầu tiên ta cần phải có "đất" dụng võ. Và "đất" ở đây có nghĩa là các bạn cần phải chuẩn bị 2 project mới toanh về Laravel và NuxtJS.
## Tạo và thiết lập project Laravel
### Tạo mới
Để tạo mới một project Laravel (ở đây mình dùng phiên bản 7.x nhé) các bạn sử dụng lệnh sau ở màn hình terminal.
```
composer create-project --prefer-dist laravel/laravel:^7.0 <tên project>
```
Sau khi đã tạo xong thì các bạn tự thêm các tham số cho database dựa theo tài liệu mình đã đưa ở trên nhé. Mình không đào sâu vào những thứ cơ bản này nữa.
### Thiết lập
Trong  bài này mình sử dụng package Laravel passport để giúp cho việc sử dụng OAuth 2.0 với Laravel trở nên dễ dàng hơn. Các bạn cần cài đặt package này thông qua composer bằng combo sau:<br>
```
composer require laravel/passport "~9.0"
```
Tiếp đó các bạn có thể tự tham khảo thêm các thiết lập cơ bản cho package này tại [đây](https://laravel.com/docs/7.x/passport).<br>
## Tạo và thiết lập project NuxtJS
### Tạo mới
Để tạo mới project NuxtJS thì các bạn chỉ cần chạy lệnh :
```
yarn create nuxt-app <tên project>
```
Yêu cầu để có thể sử dụng được NuxtJS đó là Node version của các bạn thấp nhất phải là **v10.13**. Mình khuyên các bạn nên cài thẳng version LTS mới nhất của nó về cho lành :)
### Thiết lập
Như đã nói từ trước, thì mình sẽ dùng 2 package là @nuxtjs/auth và @nuxtjs/axios để thực hiện việc authenticate. Và package element-ui để dựng giao diện.
Các bạn dùng lệnh sau để cài đặt các package nêu trên nhé:
```
yarn add @nuxtjs/auth @nuxtjs/axios element-ui
```
Sau khi đã cài đặt xong thì các bạn tạo một file `element-ui.js` trong thư mục `plugins` cho mình và add đoạn code phía dưới vào.
```js
import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Element, { locale })
```
Tiếp đó các bạn tìm đến file `nuxt.config.js` và paste đoạn code này vào thay cho code cũ nhé.
```js
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'my_app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/auth',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://localhost:8000/api/v1'
  },
  auth: {
      strategies: {
        local: {
          endpoints: {
            login: { 
              url: '/login',
              method: 'post',
              propertyName: 'data.access_token'
            },
            user: {
              url: '/user',
              method: 'get',
              propertyName: 'data.user'
            },
            logout: false
          }
        },
      }
  },
  router: {
      middleware: ['auth']
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/, '@nuxtjs/auth']
  }
}
```
Các bạn cần chú ý cho mình 2 endpoints là login và user. Mỗi endpoint mình đều thiết lập các thuộc tính url, method và propertyName cho nó. Ý nghĩa của mỗi thuộc tính được giải thích như sau:<br>
* url: đây sẽ là đường dẫn API mà mình sẽ gọi tới. Các bạn thấy ở đây mình chỉ để là /login, hoặc /user mà không để full url thì lý do là vì mình đã thiết lập `baseURL` cho `axios` là `http://localhost:8000/api/v1`. 
* method: chính là method của API mà mình sẽ gọi tới.
* propertyName: cái này mới là cái nguy hiểm nhất nè. Ở đây thì mình sẽ dựa vào kết quả trả về của API để thiết lập thuộc tính này. Theo như mình đã thiết lập thì với endpoint là login mình sẽ lấy kết quả ở `data.access_token`. Còn với endpoint là user thì mình sẽ lấy kết quả ở `data.user`. Nói thì trừu tượng vậy thôi chứ tý nữa vào giai đoạn luyện công mình sẽ giải thích rõ hơn cho các bạn.<br>

Còn một yếu tố nữa các bạn cần phải nhớ kỹ đó là cái endpoint login sẽ được dùng để thực hiện việc login, còn cái endpoint user sẽ được tự động chạy ngay sau khi login để lấy dữ liệu của user. Vì vậy các bạn không cần phải gọi cả 2 đâu nhá :) <br>
# Luyện công
Sau khi đã trải qua giai đoạn chuẩn bị ở trên thì các bạn đã có thể bắt đầu luyện công được rồi.<br>
## Laravel
Với Laravel thì đơn giản các bạn chỉ cần tạo các API trả về kết quả dạng json cho phía Nuxt mà thôi. Các API cụ thể cần dùng ở đây sẽ là: login, register, user và logout. Cụ thể thì các bạn làm theo các bước sau:
### Định nghĩa các api
Các bạn mở file routes/api.php lên và thêm đoạn code sau vào.
```php
Route::group(['prefix' => 'v1', 'namespace' => 'Api\V1'], function () {
    Route::post('register', 'Auth\AuthController@register')->name('register');
    Route::post('login', 'Auth\AuthController@login')->name('login');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('logout', 'Auth\AuthController@logout')->name('logout');
        Route::get('user', 'Auth\AuthController@me')->name('me');
    });
});
```
### Viết controller
Các bạn tạo một file Api\V1\Auth\AuthController.php với code như dưới. Ở đây là mình tạo ở đường dẫn Api\V1\Auth cho giống với những gì đã định nghĩa ở api.php. Các bạn muốn đặt tên file hoặc đặt tên url như thế nào cũng được nhé. Quan trọng là mọi thứ phải mapping với nhau là ok :)
```php
<?php

namespace App\Http\Controllers\Api\V1\Auth;

use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Http\Controllers\Controller;

/**
 * Class AuthController
 * @package App\Http\Controllers\Api\V1\Auth
 */
class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        $user = $this->authService->register($request->all());

        if (!$user) {
            return response()->json([
                'data' => [
                    'message' => 'Register failed!',
                ],
            ]);
        }

        return response()->json([
            'data' => [
                'user' => $user,
                'message' => 'Register successfully!',
            ],
        ]);
    }

    public function login(Request $request)
    {
        $result = $this->authService->login($request->only(['email', 'password']));

        if (empty($result)) {
            return response()->json([
                'data' => [
                    'message' => 'Login failed!',
                ],
            ]);
        }

        return response()->json([
            'data' => [
                'access_token' => $result['access_token'],
                'message' => 'Login successfully!',
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json([
            'data' => [
                'message' => 'Logout successfully!',
            ],
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'data' => [
                'user' => $request->user(),
            ],
        ]);
    }
}
```
###  Viết Service
Thật ra phần code ở service này các bạn có thể gom thẳng ra luôn ngoài controller cũng được. Nhưng mình muốn làm thêm một cái service như thế này để nó SOLID tý thôi mặc dù cũng chưa được SOLID cho lắm do thiếu thêm một vài thứ nữa :)<br>
Tương tự các bạn cũng tạo một file App\Services\AuthService.php rồi thêm mớ code này vào.
```php
<?php

namespace App\Services;

use App;
use Auth;
use Config;
use Request;
use App\User;
use Exception;

/**
 * Class AuthService
 * @package App\Services
 */
class AuthService
{
    public function requestToken($passportConfig)
    {
        $token = Request::create('/oauth/token', 'POST', $passportConfig);
        $response = App::handle($token);

        if ($response->getStatusCode() != 200) {
            return [];
        }

        return json_decode($response->getContent(), true);
    }

    public function register(array $inputs = [])
    {
        try {
            $user = User::create([
                'name' => $inputs['name'],
                'email' => $inputs['email'],
                'password' => bcrypt($inputs['password']),
            ]);
        } catch (Exception $e) {
            report($e);
            $user = null;
        }

        return $user;
    }

    public function login(array $inputs = [])
    {
        $passportConfig = Config::get('services.passport');
        $passportConfig['username'] = $inputs['email'];
        $passportConfig['password'] = $inputs['password'];

        if (!Auth::attempt($inputs)) {
            return [];
        }

        return $this->requestToken($passportConfig);
    }
}
```
Đến đây thì đã xong phần việc của Laravel rồi. Cùng đến với Nuxt nào.
## Nuxt
Với Nuxt thì các bạn chủ yếu tự thiết kế giao diện cho hợp lý là được. Quan trọng là có đủ những field cơ bản như email, password đối với login hay name, email, password đối với register.<br>
Chỉ có một chú ý nhỏ là các bạn nên tạo một file `store\index.js` (để trống cũng được) để kích hoạt vuex nhé.
### Login
Các bạn tạo một file login\index.vue trong thư mục pages để Nuxt tự tạo cho chúng ta router `/login` nhé. <br>
Phần code js sẽ có dạng như thế này.
```js
export default {
        data() {
            return {
                userForm: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            async userLogin() {
                try {
                    await this.$auth.loginWith('local', { data: this.userForm });
                    this.$router.push('/');
                } catch (err) {
                    this.$notify.error({
                        title: 'Error',
                        message: 'Sai email hoặc mật khẩu'
                    })
                }
            }
        }
    }
```
Các bạn chú ý thì khi dùng `loginWith()` nó sẽ gọi đến endpoint login rồi mới đến endpoint user đã thiết lập ở file `nuxt.config.js` nhé.
### Register
Tương tự thì các bạn cũng tạo file `register\index.vue` trong thư mục pages và sử dụng js như thế này.
```js
export default {
        auth: false,
        data() {
            return {
                userForm: {
                    name: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            async register() {
                try {
                    await this.$axios.post('register', this.userForm)
                    this.$notify.success({
                        title: 'Success',
                        message: 'Đăng ký thành công'
                    });
                    this.$router.push('/login');
                } catch (err) {
                    this.$notify.error({
                        title: 'Error',
                        message: 'Đăng ký thất bại'
                    })
                }
            }
        }
    }
```
Lúc register thì mình chỉ dùng axios để gọi đến Laravel server và tạo user thôi. Nếu tạo thất bại thì hiển thị notification thông báo đăng ký thất bại.
### Logout
Để logout thì đơn giản các bạn chỉ cần gọi `this.$auth.logout()` là được. Cụ thể sẽ như sau:
```js
export default {
        name: 'Header',
        methods: {
          async logout() {
              await this.$axios.post('logout')
              this.$auth.logout();
          }
        }
    }
```
Ở đây mình có dùng axios để gọi đến api logout nhằm mục đích revoke() cái token() hiện đang đăng nhập đi rồi mới tiến hành logout bằng `this.$auth.logout()`
# Tổng kết
Trên đây là những chia sẽ của mình về cách sử dụng Laravel passport cùng với @nuxtjs/axios và @nuxtjs/auth để authenticate. Xin cảm ơn các bạn đã cố gắng theo dõi đến tận cuối bài. Nếu có gì thắc mắc hoặc góp ý thì các bạn có thể comment phía dưới để mọi người cùng trao đổi nhé. Dưới đây là phần demo nhẹ nhẹ của mình, giao diện nó hơi lởm tý nên mọi người có thể mắt nhắm mắt mở để xem nhé :)<br>

![](https://images.viblo.asia/0b351251-a760-4c6e-9b68-5957bd78b874.gif)