Trong bài viết này mình xin giới thiệu cho các bạn biết làm sao để phân quyền trong laravel + vuejs.
Vuejs sử dụng html và js để viết code dưới fontend, nên những hàm php thông thường của laravel không thể sử dụng được trong file .vue, vậy làm sao để ẩn, hiện button ngoài fontend ?


## In Fontend

- Trong file .blade các bạn khai báo như sau:

```javascript
<script>
    window.Laravel = <?php echo json_encode([
        'permissions' => Auth::user()->permissions()
    ]); ?>
</script>
```

Trong đó hàm permissions của mình được viết trong Model của User

dữ liệu json trả ra sẽ như sau:

```json
{
	"dashboard": "all",
	"customers": "read",
	"advertisements": "write",
	"tracking-link": "all",
	"banners": "all",
	"products": "all",
	"contract-report": "all",
	"statistic-tracking-link": "all",
	"contract": "all",
	"withdrawal": "all",
	"points": "all",
	"help": "all",
	"privacy-policy": "all",
	"news": "all",
	"users": "all",
	"roles": "all",
	"ads-type": "all",
	"payment-requests": "all",
	"admin-customers": "all",
	"admin-users": "all",
	"admin-products": "all"
}
```

> `dashboard` là tên menu, `all` là action của users này, users này có quyền truy cập vào tất cả menu `dashboard`.
> action ở đấy có thể là bất cứ như nào bạn muốn `all, read, write, delete ...`, hoặc cũng có thể là dạng số ...

Trong file main js của các bạn thêm vào như sau:

```javascript
import Vue from 'vue'

Vue.directive('check', {
    inserted(el, binding, vnode) {
        let resource = binding.value.resource;
        let permission = Laravel.permissions[resource];
        let action = binding.value.action;

        if (permission !== 'all' && permission !== action) {
            vnode.elm.parentElement.removeChild(vnode.elm); // xóa thẻ html đó đi nếu users không có quyền truy cập
        }
    }
});
```

Trong file .vue chúng ta gọi như sau:

```html
<div class="col-md-8 text-right" v-check="{resource: 'news', action: 'write'}">
    <router-link :to="{ name: 'NewsCreate', params: {id: 'create'}}">
        <button type="button" class="btn btn-sm btn-primary">
            <i class="fa fa-plus"></i>
            <span class="bold">{{ $t('label.news.add_new') }}</span>
        </button>
    </router-link>
</div>
```

Bạn chú ý đến đoạn code sau:

```javascript
v-check="{resource: 'news', action: 'write'}"
```

Đó chính là đoạn check xem users này có quyền tạo tin tức hay không, nếu users không có quyền nó sẽ không hiển thị buttton `add_new` này ra.

Như vậy là chúng ta check xong phần fontend, nhưng mà nếu người dùng edit console lên sửa dữ liệu thì sao, nó có show ra hay không ?, câu trả lời là có show button đó ra. Vậy làm sao để check quyền được hoàn toàn ? Chúng ta sẽ tiếp tục ở phần 2 ngay sau đây.

## In backend

Như phần trước chúng ta chỉ check ẩn hiện content của fontend, nhưng nếu người dùng sửa dữ liệu console của js nó vẫn show ra, nên chúng ta cần check thêm ở trong backend nữa, bất cứ request nào đến server cũng sẽ phải check lại. Không thể tin bất cứ thứ gì mà users nhập vào.

Tạo một file có tên là `Permission.php` trong folder `app/Http/Middleware` có nội dung như sau:

```php
<?php
namespace App\Http\Middleware;

use Help;
use Closure;

class Permission

    // không check nếu users truy cập vào những đường link này
    protected $allow = [
        'me', // xem thông tin của chính user đó
        'logout',
        'login',
    ];

    public function handle($request, Closure $next)
    {
       // do có middware là auth rồi nên không cần phải check user đó có login hay không 
      if (!\Auth::check()) {
         return $next($request);
      }

      if (in_array($request->segment(3), Help::getAllMenusConfig())) {
            $permissions = $this->getPermissions($request);

            if (!$permissions) {
                throw new \Exception('Unauthenticated', 403);
            }

            return $next($request);
       }
    }

    private function getPermissions($request)
    {
        $method = $request->getMethod();
        $model = $request->segment(3);

        if (in_array($model, $this->allow)) {
            return true;
        }
        
        // check permission o day
       
        return false;
    }
}
```

> $request->segment(3) cái này chính là getURL của trình duyệt, tham số thứ 3 xem nó là gì, các bạn nên đổi sao cho phù hợp với url của mình
> $allow sẽ không check ở một số đường link, bất của ai cũng có thể truy cập, hoặc chỉ truy cập dc thông tin của users đang login

trong file `app/Http/Kernel.php` thêm vào phần `$middlewareGroups` nội dung như sau:

```php
 'admin' =>[
    \App\Http\Middleware\Permission::class,
     // có thể thêm bất cứ  Middleware nào ở đây
],
```

Trong `web.php` cần nhóm tất cả route nào các bạn muốn check vào nhóm admin để nó chạy qua file  Permission.php vừa tạo bên trên

```php
Route::group(['middleware' => ['admin', 'auth'], 'prefix' => 'api/v1', 'namespace' => 'Api\V1'], function () {
  // tất cả route cần viết ở đâu
});
```

> Phần này mình check 2 cái 1 là admin vừa tạo ở trên, 2 là auth mặc định của laravel
> `prefix` và `namespace` các bạn điều chỉnh sao cho phù hợp hoặc có thể xóa đi nếu không muốn dùng

Nếu bay h chạy thì nó đã check thành công rồi, nhưng cần phải bắt exeption cho nó đã.

Trong file `app/Exceptions/Handler.php` sửa hàm `render` như sau:

```php
    public function render($request, Exception $exception)
    {
        if ($request->segment(1) == 'api' && (!$exception instanceof ValidationException)) {

            $response = [
                'errors' => 'Sorry, something went wrong.'
            ];

            if (config('app.debug')) {
                $response['exception'] = get_class($exception);
                $response['message'] = $exception->getMessage();
                $response['trace'] = $exception->getTrace();
            }

            $status = $exception->getCode();
            if (!$status) {
                $status = 500;
            }

            return response()->json($response, $status);
        }

        return parent::render($request, $exception);
    }
```

> Đoạn check if mình chỉ bắt nếu nó bắt đầu là `api` và không phải là dữ liệu validate
> `config('app.debug')` nếu debug còn bật thì show thông tin lỗi lên

Trong file main js cần viết code để bắt exeption như sau:
đoạn này sẽ bắt tất cả exeption được trả ra, chúng ta chỉ nên bắt exeption có code là 403, 404 và 500 thôi, ko nên bắt những exception khác vì nó có thể liên quan đến redicrect, validate của laravel nữa

```javascript
axios.interceptors.response.use(null, function (error) {
    console.log(error.response);
    let statusCode = error.response.status;

    if (statusCode === 403) {
        // đẩy người dùng về page403
        router.push({name: 'Page403'});
    }

    if (statusCode === 404) {
        router.push({name: 'Page404'});
    }
    //alert(error.response.data.errors);

    return Promise.reject(error);
});
```

để chắc chắn không bị hack, các bạn có thể check thêm permision trong phần `request` của laravel nữa:

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // check permisson ở đây
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'email|required|unique:customers,email',
            'phone' => 'required|numeric|unique:customers,phone|max:99999999999',
        ];
    }
}

```

Đó là toàn bộ nội dung của mình muốn chia sẻ, nếu có bất kì thắc mắc nào, xin vui long để lại comment phía dưới.