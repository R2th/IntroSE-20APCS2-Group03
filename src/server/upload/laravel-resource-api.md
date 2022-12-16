### Giới thiệu
&nbsp; &nbsp; &nbsp; Trong quá trình làm việc mình có gặp trường hợp viết API bằng Laravel và cần data cuối cùng cần trả về sẽ là JSON và ẩn bớt một vài thông tin không cần thiết đi để phục vụ cho ứng dụng một cách tốt nhất. Hôm nay mình sẽ chia sẻ kiến thức và cách mà mình đã làm cho mọi người nhé.

### Đặt vấn đề
Mình có hàm show() như sau:
```php
public function show(Book $book)
{
    return response()->json([
        'data' => [
            'title' => $book->title,
            'description' => $book->description,
            'author' => $book->author->name
        ]
    ]);
}
```
Hm, trc khi chúng ta response data thì lại cần format lại data. <br>
Thế nếu chúng ta cần thêm 1 attribute nữa thì làm thế nào? <br>
Sau đó nhiều hàm mình cũng dùng lại nó thì sẽ như thế nào?
<br> Hm, suy nghĩ đã?

Tiếp theo mình có hàm update():
```php
public function update(Request $request, Book $book)
{
    $book = $book->update($reques->all());
    return response()->json([
        'data' => [
            'title' => $book->title,
            'description' => $book->description,
            'author' => $book->author->name
        ]
    ]);
}
```

Hum, lại phải format lần nữa. Mất công quá nhỉ?
Một ngày đẹp trời khác mình lại không muốn show cái author ra nữa thì làm thế nào? vào tìm rồi sửa từng  đoạn code hả? Căng nhỉ? Liệu có cách nào ngắn gọn hay hơn không?

### Laravel Resource là gì?
&nbsp; &nbsp; &nbsp; Khi xây dựng API, bạn có thể sẽ cần một lớp chuyển đổi nằm từ Model Eloquent sang dạng dữ liệu cuối cùng là Json cho người dùng. Laravel Resource giúp chúng ta chuyển đổi một cách dễ dàng từ model collections sang Json. <br>
Laravel sẽ giải quyết bài toán trên một cách dễ dàng và nhanh gọn với Resource API. <br>
&nbsp; &nbsp; &nbsp;  Laravel resource API được giới thiệu ở phiên bản 5.5 trở đi vì vậy các bạn cần phiên bản >= 5.5 nhé. <br>
### Cách thực hiện
Chúng ta có data của user như sau:
```json
   {
        "id": 909,
        "name": "Nguyen Danh LOi",
        "email": "nguyen.danh.loi@sun-asterisk.com",
        "code": "123456",
        "birthday": "2010-10-10",
        "gender": 1,
        "phone": null,
        "mission": "Developer",
        "avatar": "avatar.png",
   }
```
Chúng ta không cần lấy các field: code, misson, email nữa. Các bước làm như sau: <br>
Sau khi cài Laravel. Chúng ta sẽ tạo 1 resource như sau:
Vd: UserResource
```php
php artisan make:resource UserResource
```
Sau khi chạy lệnh trên chúng ta sẽ thấy xuất hiện thêm thư mục app\Http\Resources <br>
Chúng ta sẽ thấy có UserRessource như sau:
```php
class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
```
Như đã giới thiệu, Resource này sẽ có tác dụng là chuyển đổi sang kiểu Json để response về data cuối cùng. <br>
Ta thấy có method toArray(), method sẽ return các attributes về kiểu Array để convert về JSON sau đó response về. <br>

Chúng ta sẽ sửa lại thành như sau:
```php
class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'birthday' => $this->birthday,
            'gender' => $this->phone,
            'phone' => $this->phone,
            'mission' => $this->misson,
            'avatar' => $this->avatar
        ];
    }
}
```

Cách dùng thì sẽ như sau:
```php
Route::get('/user', function () {
    return new UserResource(User::find(1));
});
```
hoặc:
```php
Route::get('/user', function () {
    return UserResource::collection(User::find(1));
});
```
Data trả về sẽ như sau:
```json
{
    "data": [
        {
            "id": 1,
            "name": "Nguyen Danh Loi",
            "bỉthday": "2010-10-10",
            "gender": 1,
            "phone": null,
            "mission": "Developer",
            "avatar": "avatar.png",
        }
    ]
}
```
Thêm 1 attribute nữa thì sao:
```php
class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'birthday' => $this->birthday,
            'gender' => $this->phone,
            'phone' => $this->phone,
            'mission' => $this->misson,
            'avatar' => $this->avatar,
            'status' => 'dep trai'
        ];
    }
}
```
Nếu có quan hệ nữa thì sao:
```php
class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'birthday' => $this->birthday,
            'gender' => $this->phone,
            'phone' => $this->phone,
            'mission' => $this->misson,
            'avatar' => $this->avatar,
            'status' => 'dep trai',
            'post' => PostResource::collection($this->posts),
        ];
    }
}
```
nếu bạn muốn chỉ thêm trường posts khi mà quan hệ đã được load thì dùng method `whenLoaded`:
```php
'post' => Post::collection($this->whenLoaded('posts'))
```
Mặc định khi data trả về sẽ được wrapping trong 1 mảng data. Để không bị wrap bạn làm như sau:
vào `app/Provider/AppServiceProvider/`  
```php 
function boot()
    {
        Resource::withoutWrapping();
    }
 ```
 
Trên đây mình đã giới thiệu qua về Resource API. Mong rằng sẽ giúp ích cho các bạn! Cảm ơn các bạn đã đọc bài viết của mình.