## Tip 36 Default Model
Bạn có thể gán một giá trị mặc định cho mối quan hệ *belongsTo* để tránh các trường hợp lỗi xảy ra như khi gọi {{ $post->user->name }} mà {{ $post->user }} không tồn tại 
```php
/**
* Get the author of the post.
*/
public function user()
{
     return $this->belongsTo('App\User')->withDefault();
}
```

## Tip 37 Tạo nhiều object trong quan hệ hasMany 
Nếu bạn có quan hệ **hasMany()** bạn có thể sử dụng **saveMany** để tạo nhiều đối tượng con cùng lúc. 
```php
$post = Post::find(1);
$post->comments()->saveMany([
    new Comment(['message' => 'First comment']),
    new Comment(['message' => 'Second comment']),
]);
```

## Tip 38 Thuận tiện vào convient với DD
Thay vì sử dụng *dd($result)* bạn có thể sử dụng *->dd()* .
```php
// Thay vì sử dụng
$users = User::where('name', 'Taylor')->get();
dd($users);
// Có thể sử dụng
$users = User::where('name', 'Taylor')->get()->dd();
```

## Tip 39 Sử dụng Map với những kết quả của câu query 
Sau khi query ra kết quả là những collection, bạn có thể sử dụng *map()* để thay đổi mỗi dòng. 
```php
$users = User::where('role_id', 1)->get()->map(function (User $user) {
    $user->some_column = some_function($user);
    return $user;
});
```

## Tip 40 Custom validation error message 
Bạn có thể tùy biến các validation message, bở tên trường, rule và ngôn ngữ nhưng sau. 
Tạo một file **resources/lang/xx/validation.php**
```php
return [
    'accepted' => 'test accepted',
];
```

## Tip 41 Không nên chạy *composer update*
Không riêng gì laravel, thường thì không nên chạy *composer update* trên production, vì nó rất là chậm, và nó có thể gây lỗi cho repository. Hãy luôn luôn chạy *composer update* trên local, sau đó commit file composer.lock lên, rồi chạy *composer install* trên server. 

## Tip 42 biến $loop trong blade. 
Ngay cả khi bạn có vòng lặp ở 2 level, bạn vẫn có thể sử dụng biến $loop ở level 2 để truy cập đến vòng lặp ở level 1, nhờ $loop->parent 
```php
@foreach ($users as $user)
    @foreach ($user->posts as $post)
        @if ($loop->parent->first)
        This is first iteration of the parent loop.
        @endif
    @endforeach
@endforeach
```

## Tip 43 Route Model Binding: Bạn có thể định nghĩa một key khác cho model. 
Thông thường, model binding sẽ lấy trường id của model để làm key binding model đó. Ví dụ như users/1 với Route::get('users/{user}', function (User $user) { ...}) thì 1 ở đây được hiểu là id của User trong database. Tuy nhiên, chúng ta có thể sử dụng function getRouteKeyName() để định nghĩa lại khi binding một trường khác trong model với route.
```php
public function getRouteKeyName() {
    return 'username';
}
```
Nhớ viết function này trong model. Ví dụ viết trong model User có trường 'username'. 
Ở các phiên bản cao gần đây, mà mình không nhớ rõ, có thể từ laravel 6x, thì có thể binding custom key như sau 
```php
Route::get('api/posts/{post:slug}', function (App\Post $post) {
    return $post;
});
```

## Tip 44 Redirect đến chính xác một method trong Controller
Hàm *redirect* không chỉ có nhận tham số url hay route name, mà nó cũng có thể chỉ định chính xác một method trong controller nào đó để thực thi
```php
return redirect()->action('SomeController@method',
['param' => $value]);
```

## Tip 45 Auth::once() 
Bạn có thể sử dụng Auth::once để login 1 lần duy nhất với 1 request, và nó không login được với request thứ 2. Không có session, cookies được lưu. 
```php
if (Auth::once($credentials)) {
//
}
```
## Tip 46 Eager Loading với chính xác cột nào
Trong Laravel Eager Loading, chúng ta có thể chỉ định chính xác cột nào bạn muốn lấy trong relationship
```php
$users = App\Book::with('author:id,name')->get();
```

Ngòai ra, cũng có thể dùng deep relationship với những relationship ở level thứ 2. 
```php
$users = App\Book::with('author.country:id,name')->get();
```
## Tip 47 Validate ngày tháng với "now" hoặc "yesterday"
Bạn có thể validate ngày tháng bằng sử dụng các rules "after/before" và đưa vào một string giống như là một tham số, như tomorrow, now, yesterday. 
```php
$rules = [
    'start_date' => 'after:tomorrow',
    'end_date' => 'after:start_date'
];
```

## Tip 48 Cập nhật updated_at của parent. 
Nếu bạn muốn khi cập nhật một record, và cũng muốn cập nhật trường updated_at của record cha , thì bạn có thể sử $touches = [''post']; trong model con. 
```php
class Comment extends Model
{
/**
* All of the relationships to be touched.
*
* @var array
*/
    protected $touches = ['post'];
}
```
Trong ví dụ trên, thì mỗi khi comment được updated (cập nhật) trường updated_at của record post mà nó thuộc về cũng được cập nhật theo.

## Tip49 Truy vấn nhanh file Controller từ route
Thay vì sử dụng 
```php
Route::get('page', 'PageController@action');
```
Bạn có thể sử dụng Controller như một class: 
```php
Route::get('page', [\App\Http\Controllers\PageController::class, 'action']);
```

Điều này có lợi thế là khi bạn dùng IDE như phpStorm thì có thể click đển function của Controller tương ứng, không cần thiết phải tìm bằng tay như cách thông thường. 

## Tip 50 Luôn luôn check xem relationships có tồn tại không. 
Không nên sử dụng $model->relationship->field mà không có check relationship object có tồn tại hay không. 
Điều này có một tip bên trên đã có thể tránh được đó là sử dụng withDefault, tuy nhiên, tốt hơn hết là hãy luôn kiểm tra xem relationship có tồn tại object rồi hãy chỉ đến field tương ứng của object được chỉ định
Nguồn: https://laraveldaily.com/