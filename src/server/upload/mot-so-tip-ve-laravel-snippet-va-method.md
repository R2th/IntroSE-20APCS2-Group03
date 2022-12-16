Hôm nay mình sẽ giới thiệu một số Snippet và Method trong laravel mà có lẽ mọi người không hay để ý đến. Cùng tìm hiểu nhé!

### 1. Kiểm tra bản ghi tạo từ firstOrCreate có phải là bản ghi mới không
```php
$post = Post::firstOrCreate(...);

if ($post->wasRecentlyCreated()) {
    // bài post mới
} else {
    // bài post đã tồn tại
}
```
### 2. Tìm các ID liên quan đến relationship BelongsToMany  
```php
$user->roles()->allRelatedIds()->toArray();
```
### 3. abort_unless()
```php
// Thay vì dùng
public function edit($item) {
    if (// User không được edit) {
        return false;
    }
    
    // else: được edit
}

// Ta có thể làm như sau
public function edit($item) {
    abort_unless(Gate::allows('do-something', $item), 403);
    
    // Actual logic
}

// Ví dụ khác: Đảm bảo user đã đăng nhập 
abort_unless(Auth::check(), 403);
```
### 4. Model Keys
```php
// cách bình thường chúng ta hay dùng
User::all()->pluck('id')->toArray();

// Cách viết gọn

User::all()->modelKeys();
```
### 5. throw_if
```php
throw_if(
    !Hash::check($data['current_password'], $user->password),
    new Exception(__("That isn't your old password.")
);
```
### 6. Dump tất cả các cột của bảng
```php
Schema::getColumnListing('table')
```
### 7. Redirect đến các domain ngoài
```php
return redirect()->away('https://www.youtube.com');
```
### 8. Request exists() với has()
```php
// http://example.com?popular

$request->exists('popular') // true
$request->has('popular') // false

http://example.com?popular=foo

$request->exists('popular') // true
$request->has('popular') // true
```
### 9. array_wrap
```php
// cách thông thường
$posts = is_array($posts) ? $posts : [$posts];

// Cách ngắn gọn :)
$posts = array_wrap($posts);
```
### 10. optional()
optional() cho phép truy cập các thuộc tính hoặc gọi các method trên một đối tượng. 

Nếu đối tượng đã cho là null, các thuộc tính và phương thức sẽ trả về null thay vì gây lỗi.
```php
// User 1 tồn tại và có tài khoản
$user1 = User::find(1);
$accountId = $user1->account->id; // 1

// User 2 tồn tại và không có tài khoản
$user2 = User::find(2);
$accountId = $user2->account->id; // PHP Error: Trying to get property of non-object

// Fix không dùng optional()
$accountId = $user2->account ? $user2->account->id : null; // null
$accountId = $user2->account->id ?? null; // null

// Fix dùng optional()
$accountId = optional($user2->account)->id; // null
```
### 11. data_get()
data_get() cho phép lấy giá trị từ một mảng hoặc đối tượng có ký tự dấu chấm. Hàm này  hoạt động tương tự giống hàm array_get(). 

Tham số thứ ba tùy chọn được sử dụng để cung cấp giá trị mặc định nếu không tìm thấy key.
```php
// array
$array = ['posts' => ['comments' => ['count' => 44]]];
$count = data_get($array, 'posts.comments.count'); // 44
$avgCost = data_get($array, 'posts.comments.avg_cost', 0); // 0

// object
$object->posts->comments->count = 44;
$count = data_get($object, 'posts.comments.count'); // 44
$avgCost = data_get($object, 'posts.comments.avg_cost', 0); // 0
```
### 12. push()
Dùng để lưu một model và các relation tương ứng của nó.
```php
$user = User::first();
$user->name = "Hero";

$user->posts->content = 'I am Viblo';

$user->push(); // Update bản ghi của cả user and posts vào DB
```
### 13. @forelse
```php
@if ($users->count() > 0)
    @foreach ($users as $user)
        <li>{{ $user->name }}</li>
    @endforeach
@else
    <p>No users</p>
@endif

// thay bằng
@forelse ($users as $user)
    <li>{{ $user->name }}</li>
@empty
    <p>No users</p>
@endforelse
```
### 14. @each
```php
@foreach ($users as $user)
    @include('components.userdetail', ['user' => $user])
@endforeach

//thay bằng 
@each ('page.user_detail', $users, 'user')
    // hoặc
@each ('page.user_detail', $users, 'user', 'page.user_notfound')
```
### 15. @json
```php
<script>
    var users = {!! json_decode($users) !!};

    // thay bằng
    var users = @json($users);
</script>
```
### 16. @verbatim
```php
<div class="content">
    Hello, @{{ name }}.
    Date, @{{ date }}
</div>

// thay bằng 
@verbatim
    <div class="content">
        Hello, {{ name }}.
        Date, {{ date }}
    </div>
@endverbatim
```
### 17. @isset & @empty
```php
@if (isset($records))
        // $records dc định nghĩa và không null
    @endif

@if (empty($records))
    // $records là rỗng
@endif

// thay bằng
@isset ($records)
    // $records dc định nghĩa và không null
@endisset

@empty ($records)
    // $records là rỗng
@endempty
```
### 18. @php
```php
@php
    // chạy hàm php trong view
@endphp
```
### 19. @push & @stack
```php
<body>
    @stack('scripts')
</body>

 // trong view con
@push('scripts')
    <scripts src="/example.js"></scripts>
@endpush
```
### 20. @inject
```php
 // Inject bất kỳ dịch vụ nào từ Service Container
@inject('metrics', 'App\Services\MetricsService')

<div>
    Monthly Revenue: {{ $metrics->monthlyRevenue() }}
</div>
```
### 21. @includeWhen
```php
@if ($viewSection)
    @include('page.section', ['some' => 'data'])
@endif

// thay bằng
@includeWhen($viewSection, 'page.section', ['some' => 'data'])
```
### 22. @hasSection
```php
// Kiểm tra nếu 1 section có mặt trong view con
@hasSection('navigation')
    <div class="pull-right">
        @yield('navigation')
    </div>

    <div class="clearfix"></div>
@endif
```
Trên đây là một số Snippet và Method trong laravel, mong rằng sẽ giúp ích được cho mọi người!

Thanks for reading:sparkling_heart: