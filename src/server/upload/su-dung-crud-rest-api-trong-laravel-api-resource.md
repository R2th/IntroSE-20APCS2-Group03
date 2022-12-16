# Create an API Controller
- Sau khi chúng ta đã tạo một Laravel mới, chúng ta có thể tạo bộ điều khiển API Resource  bằng cách: <br>
```
php artisan make:controller Api/UserController -m User --api
```
1. `Api/UsersController` : Vị trí file `UserController` nằm ở `app/Http/Controllers/Api` <br>
2. `-m User` : Sử dụng `UsersController` cho model `User`<br>
3. `--api`: Tạo `resource controller` không bao gồm các phương thức `create` và `edit`
# Define API route
- Tiếp theo, chúng ta có thể tạo các route API của mình trong `route/api.php` với lệnh sau:
```
use App\Http\Controllers\Api\UserController;
Route::apiResource('users', UserController::class);
```
- Đoạn này sẽ giúp ta render ra những API sau:
```
use App\Http\Controllers\Api\UserController;

Route::get('users', [UserController::class, 'index'])->name('users.index');
Route::post('users', [UserController::class, 'store'])->name('users.store');
Route::get('users/{user}', [UserController::class, 'show'])->name('users.show');
Route::match(['put', 'patch'], 'users/{user}', [UserController::class, 'update'])->name('users.update');
Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');Create API Resource
```
- API resource là một lớp chuyển đổi nằm giữa các mô hình Eloquent của bạn và các phản hồi JSON thực sự được trả lại cho người dùng ứng dụng của bạn.
- Nếu chúng ta phát triển một ứng dụng API, chúng tôi nên sử dụng resource API bằng cách tạo:
```
php artisan make:resource UserResource
php artisan make:resource UserResourceCollection
```
# List action
- Để trả về các bản ghi với các liên kết phân trang và meta về trạng thái của paginator:
 ```
 public function index()
{
    $users = User::paginate();
    return (new UserResourceCollection($users))->response();
}
```
## API
```
curl http://localhost:8080/api/users \
     -H 'Accept: application/json'
```
## Output
```
{
    "data": [
        {
            "id": 1,
            "name": "nguyen van a",
            "email": "nguyen.van.a@example.com",
        },
        {
            "id": 2,
            "name": "nguyen van b",
            "email": "nguyen.van.b@example.com",
        },
        ...
    ],
    "links":{
        "first": "http://example.com/pagination?page=1",
        "last": "http://example.com/pagination?page=1",
        "prev": null,
        "next": null
    },
    "meta":{
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "active": false
            },
            {
                "url": "http://localhost:8080/api/users?page=1",
                "label": "1",
                "active": true
            },
            ...
        ]       
        "path": "http://example.com/pagination",
        "per_page": 15,
        "to": 10,
        "total": 10
    }
}
```
# Get action
- Để lấy thông tin được của 1 record:
```
public function show(User $user)
{
    return (new UserResource($user))->response();
}
```
## API
```
curl http://localhost:8080/api/users/1 \
     -H 'Accept: application/json'
```
## Output
```
{
    "data": {
        "id": 1,
        "name": "nguyen van a",
        "email": "nguyen.van.a@example.com",
    }
}
```
# Create action
- Tạo một `user` với `validation`. Lưu ý API đã tạo phải trả về mã trạng thái `201`:
```
public function store(Request $request)
{
    $request->validate([
        'name' => 'bail|required|string|max:255',
        'email' => 'bail|required|string|max:255|email|unique:users,email',
        'password' => 'bail|required|string|min:8'
    ]);
    $user = new User();
    $user->name = $request->input('name');
    $user->email = $request->input('email');
    $user->password = Hash::make($request->input('password'));
    $user->save();
    Log::info("User ID {$user->id} created successfully.");
    return (new UserResource($user))->response()->setStatusCode(Response::HTTP_CREATED);
}
```
- Laravel sử dụng phương thức `expectsJso`n để xác định xem có nên sử dụng `JSON` response hay không.
```
public function expectsJson()
{
    return ($this->ajax() && ! $this->pjax() && $this->acceptsAnyContentType()) || $this->wantsJson();
}
```
## API
```
curl -X POST http://localhost:8080/api/users \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -d $'{
         "name": "Name",
         "email": "test@email.com",
         "password": "password"
      }'
```
## Output
```
{
    "data": {
        "id": 2,
        "name": "Anh pro",
        "email": "anh.pro@email.com",
    }
}
```
# Response status code
- List — `200`
- Get — `200`
- Created — `201`
- Updated — `200` or `204`
- Deleted — `204`