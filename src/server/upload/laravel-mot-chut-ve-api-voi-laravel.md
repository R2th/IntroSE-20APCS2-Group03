Chào các bạn, ở [bài viết trước ](https://viblo.asia/p/laravel-crud-voi-laravel-Do754dWX5M6) thì mình có nói qua về CRUD với Laravel nhưng đấy là khi các bạn viết gọn toàn bộ project chỉ với framework Laravel. Nếu có một ngày bạn nhận được yêu cầu của khách hàng muốn viết code backend bằng Laravel nhưng lại muốn giao diện viết bằng ReactJS hoặc VueJS thì sao lúc ấy cần một cầu nối trung gian để 2 framework có thể hiểu và trao đổi dữ liệu với nhau và đấy là lúc các bạn cần đến API.

Để bắt đầu thì cứ phải tạo project đã nhé. <br>
Sau khi cài đặt project Laravel thì sẽ tiền hành tạo Route và Controller.
Ở đây mình sẽ sử dụng luôn resource mà Laravel đã cung cấp để xử lý “CRUD” luôn.  <br>
Sử dụng lệnh sau để tạo resource Controller: <br>
( Mình đặt UserController vào mục Api/ luôn để dễ quản lý nhé)
```
php artisan make:controller Api/UserController --resource
```
Lệnh này sẽ tạo ra UserController tại app/Http/Controller/Api/UserController.php. <br> UserController mới được tạo sẽ chứa sẵn các phương thức tương ứng cho mỗi sự kiện CRUD. <br>
Tiếp theo chúng ta sẽ khai báo route để trỏ đến Controller. Mình sẽ khai báo trong route/api.php luôn :
```
Route::group(['namespace' => 'Api'], function() {
    Route::resource('users', 'UserController');
});
```
Chỉ cần khai báo 1 dòng route resource chúng ta đã định nghĩa được tất cả các url trong việc xử lý CRUD, cụ thể các bạn có thể tham khảo bảng dưới:

|Verb|	URI	|Action|	Route Name|
| -------- | -------- | -------- | -------- | -------- |
|GET|	api/users|	index	|users.index|
|GET|	api/ users/create|	create|	users.create|
|POST|	api/users|	store	|users.store|
|GET	|api/users/{photo}|	show	|users.show|
|GET|	api/users/{photo}/edit	|edit	|users.edit|
|PUT/PATCH|	api/users/{photo}|	update|	users.update|
|DELETE|	api/users/{photo}|	destroy	|users.destroy|

Ở đây mình chỉ muốn viết API để đổ về data nên mình sẽ không sử dụng các function create, edit, chúng ta có thể sửa lại route một chút như sau:
```
Route::group(['namespace' => 'Api'], function() {
    Route::resource('users', 'UserController')->only('index', 'store', 'update', 'destroy');
});
```
Bây giờ cần có bảng users để quản lý nhé, khi build project, Laravel đã tạo sẵn cho chúng ta bảng user và model User rồi nên chúng ta sử dụng luôn, các bạn chạy migrate để tạo bảng.
## Create User
Theo định nghĩa sẵn của resource thì việc xử lý Create đối tượng sẽ thực hiện khi chúng ta gọi đến url “…/users” với method là POST, ở đây mình đặt route trong api.php nên url của mình sẽ là “/api/users” <br>
Khi gửi dữ liệu đến đường dẫn trên với method post, dữ liệu sẽ tự động được chuyển đến và xử lý trong function store của class UserController, chúng ta có thể xử lý đơn giản như sau:<br>
***App/Http/Controller/Api/UserController.php***
```
public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 404);
        }

        $data = $request->only('name', 'email', 'password');
        $data['password'] = Hash::make($request->password);
        $status = User::create($data);

        if ($status)  
        {
            return response()->json([
                'messege' => 'Succsess create new user',
            ], 201);
        } else {
            return response()->json([
                'messege' => 'Create new user not success',
            ], 400);
        }
    }
```
( Có nhiều cách để validate dữ liệu, trên đây chỉ là 1 cách mình sử dụng, các bạn có thể tham khảo bài viết[ Cơ bản về Validation trong Laravel](https://viblo.asia/p/co-ban-ve-validation-trong-laravel-Ljy5VvL95ra) )
Ở đây mình có sử dụng Validator và Hash chưa được khai báo nên các bạn cần khai báo namespace nếu không sẽ có thông báo lỗi trả về.
```
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
```
Bây giờ bật postman lên rồi kiểm tra thử nhé, mình sẽ gửi đi một yêu cầu thêm mới người dùng với dữ liệu như hình:
![](https://images.viblo.asia/c0f594f9-7ebe-4bd8-88eb-31bd84cef990.png)
Chú ý chọn đúng method POST và url là “/api/users” , sau khi gửi dữ liệu sẽ đc xử lý và trả về kết quả là 1 messege thông báo như trên hình, các bạn có thể lên DB để check lại nhé.
## Show Users
Bây giờ mình muốn có 1 api trả về dữ liệu danh sách ngươi dùng để mỗi lần thao tác create, update, delete thì qua đó check chứ không phải lên DB để check lại nữa. Mình sẽ đẩy nó vào hàm index nhé, function index sẽ như sau:
```
 public function index()
    {
        return response()->json([
            'messege' => 'Succsess get list users',
            'data' => User::all(),
        ], 200);
    }
```
Rồi bây giờ quay qua postman xem nó sẽ trả ra những gì nhé. Các bạn gọi url “…/api/users” với phương thức GET
![](https://images.viblo.asia/6d203ed3-25f3-4d9d-80b6-44cebe27d541.png)
Ở đây mình đang trả về toàn bộ user có trong bảng users, nếu các bạn chỉ muốn kiểm tra 1 user xác đinh thì sử dụng function show,  truyền vào id của user muốn kiểm tra và làm tương tự thôi.
## Update User 
Bây giờ chúng ta chỉ cần thực hiện việc xử lý Update trong function update của UserController. Việc update cũng rất đơn giản: lấy ra đối tượng cần update -> cập nhật dữ liệu mới -> trả về thông báo.
```
public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|string|unique:users,email,'.$id,
            'password' => 'required|string|confirmed',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 404);
        }

        $user = User::findOrFail($id);

        $data = $request->only('name', 'email', 'password');
        $data['password'] = Hash::make($request->password);

        $status = $user->update($data);

        if ($status)  
        {
            return response()->json([
                'messege' => 'Succsess edit user',
            ], 200);
        } else {
            return response()->json([
                'messege' => 'Register user not success',
            ], 400);
        }
    }
```
## Delete User
Cái này thì đơn giản nhất rồi, chúng ta xử lý trong function destroy như sau:

  ```
  public function destroy($id) {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json([
            'messege' => 'Succsess delete user',
        ], 200);
    }
```

Xong rồi, các bạn bật Postmant lên chạy thử thôi nhé :) <br>
Theo mình thấy thì viết API cũng gần giống với việc xử lý các tác vụ một cách trực tiếp nhưng thay vì truyền trực tiếp dữ liệu ra giao diện hì chúng ta thay thế nó bằng việc chỉ trả về data dạng json có chứa các thông tin cần thiết, còn việc tiếp nhận, hiển thị và phản hồi như thế nào sẽ giao lại cho bên FE. <br>
Tuy nhiên việc viết API như thế nào để bên FE khi tiếp nhận có thể hiểu và thao tác một cách chính xác cũng là một vấn đề cần phải lưu ý khi xây dựng API. <br>
Ở bài viết này mình đã chia sẻ việc viết API và chạy thử các chức năng cơ bản trên postmant, tuy nhiên thì còn khá nhiều vấn đề khác xung quanh việc viết API như bảo mật, xác thực,... ở bài viết sau thì mình sẽ giới thiệu về việc đăng nhập Laravel qua API nhé. Hi vọng là bài viết sẽ giúp ích được cho các bạn cũng đang tìm hiểu như mình. Nếu có gì cần bổ sung, góp ý các bạn comment lại giúp mình nhé, cảm ơn các bạn đã theo dõi.