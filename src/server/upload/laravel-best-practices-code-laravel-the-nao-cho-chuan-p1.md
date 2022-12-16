## 1. Nguyên tắc ĐƠN TRÁCH NHIỆM - Single responsibility principle

Một lớp hay class chỉ nên có 1 trách nhiệm duy nhất. Đây là 1 trong các nguyên tắc của SOLID. Bạn có thể tham khảo ở [đây](https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)

**BAD**
```
public function getFullNameAttribute()
{
    if (auth()->user() && auth()->user()->hasRole('client') && auth()->user()->isVerified()) {
        return 'Mr. ' . $this->first_name . ' ' . $this->middle_name . ' ' . $this->last_name;
    } else {
        return $this->first_name[0] . '. ' . $this->last_name;
    }
}
```

**GOOD**
```
public function getFullNameAttribute()
{
    return $this->isVerifiedClient() ? $this->getFullNameLong() : $this->getFullNameShort();
}
 
public function isVerifiedClient()
{
    return auth()->user() && auth()->user()->hasRole('client') && auth()->user()->isVerified();
}
 
public function getFullNameLong()
{
    return 'Mr. ' . $this->first_name . ' ' . $this->middle_name . ' ' . $this->last_name;
}
 
public function getFullNameShort()
{
    return $this->first_name[0] . '. ' . $this->last_name;
}
```
## 2. Models mập, Controllers gầy - Fat models, skinny controllers
Đặt tất cả các logic liên quan đến DB vào các Eloquent model hoặc vào các lớp Repository nếu bạn đang sử dụng Query Builder hoặc raw Query.

**BAD**
```
public function index()
{
    $clients = Client::verified()
        ->with(['orders' => function ($q) {
            $q->where('created_at', '>', Carbon::today()->subWeek());
        }])
        ->get();
 
    return view('index', ['clients' => $clients]);
}
```
**GOOD**
```
public function index()
{
    return view('index', ['clients' => $this->client->getWithNewOrders()]);
}
 
class Client extends Model
{
    public function getWithNewOrders()
    {
        return $this->verified()
            ->with(['orders' => function ($q) {
                $q->where('created_at', '>', Carbon::today()->subWeek());
            }])
            ->get();
    }
}
```

## 3. Validation - Kiểm tra dữ liệu đầu vào
Di chuyển phần validation từ controller vào class Request.
**BAD**
```
public function store(Request $request)
{
    $request->validate([
        'title' => 'required|unique:posts|max:255',
        'body' => 'required',
        'publish_at' => 'nullable|date',
    ]);
 
    ....
}
```
**GOOD**
```
public function store(PostRequest $request)
{    
    ....
}
 
// php artisan make:request PostRequest
class PostRequest extends Request
{
    public function rules()
    {
        return [
            'title' => 'required|unique:posts|max:255',
            'body' => 'required',
            'publish_at' => 'nullable|date',
        ];
    }
}
```

## 4. Logic nghiệp vụ nên đặt trong các lớp dịch vụ(vd: gửi email, lưu file,...)
Một controller chỉ nên có 1 nhiệm vụ, vì thế di chuyển các logic nghiệp vụ vào trong lớp dịch vụ để xử lí
**BAD**
```
public function store(Request $request)
{
    if ($request->hasFile('image')) {
        $request->file('image')->move(public_path('images') . 'temp');
    }
     
    ....
}

```
**GOOD**
```
public function store(Request $request)
{
    $this->articleService->handleUploadedImage($request->file('image'));
 
    ....
}
 
 
// laravel/app/Services/ArticleService.php
class ArticleService
{
    public function handleUploadedImage($image)
    {
        if (!is_null($image)) {
            $image->move(public_path('images') . 'temp');
        }
    }
}
 
// laravel/app/Providers/AppServiceProvider.php
public function register()
{
    $this->app->bind('App\Services\ArticleService');
}
```

## 5. Đừng lặp lại nhiều lần
Tái sử dụng code bất cứ khi nào có thể. Áp dụng SRP để tránh trúng lặp. Ngoài ra, hãy tái sử dụng template blade(template mặc định của laravel), sử dụng trong phạm vi của Eloquent
**BAD**
```
public function getActive()
{
    return $this->where('verified', 1)->whereNotNull('deleted_at')->get();
}
 
public function getArticles()
{
    return $this->whereHas('user', function ($q) {
            $q->where('verified', 1)->whereNotNull('deleted_at');
        })->get();
}
```
**GOOD**
```
public function scopeActive($q)
{
    return $q->where('verified', 1)->whereNotNull('deleted_at');
}
 
public function getActive()
{
    return $this->active()->get();
}
 
public function getArticles()
{
    return $this->whereHas('user', function ($q) {
            $q->active();
        })->get();
}
```

## 6. Ưu tiên sử dụng Eloquent hơn là sử dụng Query Builder và raw SQL queries. Ưu tiên collections hơn là arrays
Element cho phép bạn đọc viết và duy trì, sửa chữa code sau này. Ngoài ra, Elequent có rất nhiều các built-in tools(công cụ kèm theo) như soft deletes, events, scopes, etc.

Collection trong Laravelbao hàm cả array trong đó và cả các function hỗ trợ: dùng map, chunk, pop, push, pipe,...
**BAD**
```
SELECT *
FROM `articles`
WHERE EXISTS (SELECT *
              FROM `users`
              WHERE `articles`.`user_id` = `users`.`id`
              AND EXISTS (SELECT *
                          FROM `profiles`
                          WHERE `profiles`.`user_id` = `users`.`id`) 
              AND `users`.`deleted_at` IS NULL)
AND `verified` = '1'
AND `active` = '1'
ORDER BY `created_at` DESC
```
**GOOD**
```
Article::has('user.profile')->verified()->latest()->get();
```

## 7. Gán giá trị hàng loạt(Mass assignment)
**BAD**
```
$article = new Article;
$article->title = $request->title;
$article->content = $request->content;
$article->verified = $request->verified;
// Add category to article
$article->category_id = $category->id;
$article->save();
```
**GOOD**
```
$category->article()->create($request->validated());
```
## Nguồn tham khảo
https://github.com/alexeymezenin/laravel-best-practices