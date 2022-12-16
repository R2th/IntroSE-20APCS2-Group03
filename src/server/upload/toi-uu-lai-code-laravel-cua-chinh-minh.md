# 1. Mở đầu
Một ngày đẹp trời bạn nhìn lại những dòng code của bạn 6 tháng hay một năm trước, chắc hẳn nhiều người sẽ phải thốt lên rằng (wtf) sao ngày trước mình có thể những dòng `code` lởm đến vậy.  Nếu bạn cũng đang trong tình trạng này thì cũng đừng quá lo lắng, 6 tháng hay 1 năm nữa bạn nhìn lại những gì bạn cho là `clean code` trước kia thì giờ chúng cũng chỉ là mớ code lộn xộn thôi. 
Lại nói về phong cách code,  mỗi coder chắc chắn đã và đang ảnh hưởng phong cách code của một ai đó. Ví dụ như mình, hồi sinh viên thì ảnh hưởng bởi mấy anh chị dạy video trên `Việt Jack`, `Khoa Phạm`. Đi thực tập thì ảnh hưởng bởi mấy anh cùng công ty. Dù bạn có đang code theo phong cách nào đó thì cũng phải tuân thủ các rules về `convention` . . . 

Dần dần làm việc quen thì mình lại hay tìm tòi ra những `Best Practices`. Mổ xẻ xem cách này đã tối ưu chưa, code có sạch, đẹp hơn không. Ở khuôn khổ bài viết này, mình sẽ lục lại tất cả những đoạn code mà mình cho là lởm nhất mà những người làm quen mới `Laravel` thường sử dụng và đưa ra những cách giải quyết tối ưu hơn.

Một phần để code đẹp hơn nữa là đừng ngại thay đổi và nhờ người khác review code hộ. Ai góp ý hãy suy nghĩ một cách thật nghiêm túc chứ đừng kiểu làm **thế này cũng được mà anh** và tiếp tục dùng những dòng code thối đấy cho những dự án sau. ![](https://images.viblo.asia/89c8102e-046e-4877-88b9-85368e76719a.jpg)


Update phần 2: [Tối ưu lại code Laravel của chính mình(P2)](https://viblo.asia/p/toi-uu-lai-code-laravel-cua-chinh-minhp2-3P0lP0LPlox)

# 2. Tối ưu code
## 2.1 Mass assignment
Mass Assignment là gì? Mass Assignment xuất phát từ ngôn ngữ Ruby on Rails, là tính năng cho phép lập trình một cách tự động gán các tham số của một HTTP request vào các biến hoặc đối tượng trong lập trình. Ví dụ: chúng ta có một form đăng ký người dùng như sau, các tên trường nhập liệu trùng với tên cột trong bảng users trong CSDL. 6 tháng trước mình lưu vào `DB` theo kiểu này
```php
$user = new User;
$user->name = $request->name;
$user->password = $request->password;
$user->role = $request->role;
$user->save();
```
Nhưng nhiều hệ thống còn lấy cả năm sinh, giới tính . . . dài thật dài. Vây là đoạn code của chúng ta cũng dài thật dài. Thực ra có chỉ cần viết như này thôi.
```php
$user = User::create($request->all());
```
Cẩn thận hơn nữa thì có thể dùng `$request->only('name', 'password', 'role')`. Code vừa ngắn vừa dễ hiểu đúng không các bạn. Nhớ là để dùng Mass Assignment chúng ta phải fillable các thuộc tính này trong Model nữa nhé. Tài liệu tham khảo ở  [đây](https://laravel.com/docs/5.6/eloquent#mass-assignment) .
## 2.2 Business logic should be in service class
Nói nôm na là viết riêng class để xử lí phần code logic thôi. Lấy ví dụ tiếp về phần `upload file` trong Laravel nhé.
```php
public function store(Request $request)
{
    if ($request->hasFile('image')) {
        $request->file('image')->move(public_path('images') . 'temp');
    }
    
    ....
}
```
Nhiều bạn kể cả `junior dev` giờ vẫn chơi kiểu này. Viết lai cho đẹp cái nào
```php
public function store(Request $request)
{
    $this->articleService->handleUploadedImage($request->file('image'));

    ....
}

class ArticleService
{
    public function handleUploadedImage($image)
    {
        if (!is_null($image)) {
            $image->move(public_path('images') . 'temp');
        }
    }
}
```
Giải thích một chút thôi nhé. Viết riêng 1 class `ArticleService` rồi  ta sẽ `inject` những `instance` đó vào thông qua `constructor` rồi gọi tới hàm `handleUploadedImage` của class `ArticleService`. Nhìn chuyên nghiệp hơn chưa các bạn.

## 2.3  Eloquent 

Đặt vấn đề chúng ta có 2 bảng `posts` và `categories` có quan hệ một nhiều với nhau được thể hiện qua model ` Post` và `Category`.
Bây giờ trong view Category bạn muốn lấy ra bài viết đầu tiên chẳng hạn. Đơn giản thôi mà 
```php
// Category Model
public function posts()
{
    return $this->hasMany(Post::class);
}
$category->posts->first();
```
Nhìn thuận mắt đấy nhưng nếu viết lại mình sẽ viết như thế này 
```php
$categoty->posts()->first() ;
```
Có sự khác nhau gì ở đây không ? Xin thưa là rất nhiều nhé
* `$category->posts` sẽ query DB để lấy ra **tất cả** các posts thuộc về category hiện tại sau đó dựng các model Post, đưa vào Collection sau đó duyệt từng phần tử của Collection đó để lấy ra bản ghi đầu tiên từ điều kiện first() của ta.
* `$categoty->posts()` thì như định nghĩa ở trên là `return $this->hasMany(Post::class);`, ta có thể thấy nó sẽ trả về instance của Category. Khi ta gọi `$categoty->posts()->first() ` thì nó sẽ lấy 1 bản ghi duy nhất từ tầng `database` ra chứ không lấy tất cả bản ghi như `$category->posts` rồi mới lọc tiếp để lấy ra bản ghi đầu tiên nữa.

Nên nhớ dùng cái gì thì lấy cái đó ra thôi, với bảng vài nghìn bản ghi mà bạn cứ gọi tất ra rồi dùng một cái thì  . . . (facefalm)

## 2.4 XorY methods
Eloquent có khá nhiều hàm kết hợp cả hai method như là "làm X đi, không thì làm Y" ví dụ như `findOrFail` hoặc `firstOrCreate` mà ngày trước mới học Laravel mình chưa biết.
Ví dụ như trước mình hay viết kiểu kiểu 
```php
$user = User::find($id);
if (!$user) { abort (404); }
```
Nô nô, dùng kiểu này đi cho người lớn.
```php
$user = User::findOrFail($id);
```
Thêm một ví dụ nữa mà mình rất rất bị bắt lỗi
```php
$user = User::where('email', $email)->first();
if (!$user) {
  User::create([
    'email' => $email
  ]);
}
```
Giờ cho viết lại mình sẽ viết 
```php
$user = User::firstOrCreate(['email' => $email]);
```
Đấy 6 dòng giờ còn 1 dòng luôn :D
## 2.5 Use eager loading
Cái này thì trong những bài viết của viblo cũng nói đến rất nhiều rồi nhưng có thể một số bạn vẫn chưa biết đến. Bạn có thể đọc thêm tại [đây](https://viblo.asia/p/laravel-beauty-recipes-best-practices-6BAMYk9Evnjz#_van-de-n--1-va-eager-loading-7) 
```php
@foreach (User::all() as $user)
    {{ $user->profile->name }}
@endforeach
```
Câu lệnh này với 100 user thì cần 101 câu truy vấn vào DB.
Còn khi ta sử dụng `with()` hoặc `load()` thì code như sau
```php
//Controller
$users = User::with('profile')->get();

...php
//View
@foreach ($users as $user)
    {{ $user->profile->name }}
@endforeach
```
Khi sử dụng `with()` với 100 user chỉ tốn 2 câu truy vấn thôi.
# 3.Tối ưu convention
Đã bao giờ bạn biết tự hỏi chuẩn đặt tên các file trong `Laravel` ? Câu trả lời sẽ là đây

| Tên  | Chuẩn| Tốt | Chưa Tốt
| -------- | -------- | -------- |  -------- 
| Controller     | Số ít     | ArticleController     | ~~ArticlesController~~  |
| Route     | Số nhiều     | articles/1	     | ~~article/1~~	  |
| Named route     | snake_case với ký hiệu chấm    | users.show_active     | ~~users.show-active, show-active-user~~s  |
| Model     | Số ít     | User     | ~~Users~~  |
| hasOne or belongsTo relationship     | Số ít     | articleComment     | ~~articleComments~~, ~~article_comment~~  |
| All other relationships     | Số nhiều     | articleComments     | ~~articleComment~~, ~~article_comments~~  |
| Table     | Số nhiều   | 	article_comments     | ~~article_comment~~, ~~articleComments~~  |
| Model property    | snake_case   | `$model->created_at`     | `$model->createdAt`  |
| Foreign key     | Số ít  với hậu tố `_id`    | article_id	     | ~~ArticleId~~, ~~id_article~~, ~~articles_id~~  |
| Primary key     | -    |  id     |  ~~user_id~~  |
| Migration     | -     | 2017_01_01_000000_create_articles_table     | ~~2017_01_01_000000_articles~~  |
| Method     | camelCase     | getAll     | ~~get_all~~  |
| Method in resource controller     | -    | store     | ~~saveArticle~~  |
| Variable     | camelCase    | `$articlesWithAuthor `    | `$articles_with_author`  |
| Collection     |Số nhiều, có nghĩa    | `$activeUsers = User::active()->get()`     | `$active, $data`  |
| Object     |Số ít, có nghĩa      | `$activeUser = User::active()->first()`     | `$users, $obj`  |
| Config and language files index     | snake_case    | articles_enabled     | ~~ArticlesEnabled~~; ~~articles~~-~~enabled~~  |
| View     | snake_case   | 	show_filtered.blade.php     | ~~showFiltered.blade.php~~, ~~show-filtered.blade.php~~  |
| Config     | snake_case     | google_calendar.php     | ~~googleCalendar.php~~, ~~google-calendar.php~~  |


Chỉ cần học thuộc bảng cửu chương này code bạn cũng có thể đẹp hơn đấy.
# 4. Tham khảo
Github: [Laravel best practices](https://github.com/alexeymezenin/laravel-best-practices#follow-laravel-naming-conventions)


Viblo: [Laravel Beauty](https://viblo.asia/p/laravel-beauty-recipes-best-practices-6BAMYk9Evnjz#_van-de-n--1-va-eager-loading-7)

Ngoài ra các bạn có thể xem thêm một số bài viết của mình tại [blog cá nhân](https://storyofsu.com/).

Update phần 2: [Tối ưu lại code Laravel của chính mình(P2)](https://viblo.asia/p/toi-uu-lai-code-laravel-cua-chinh-minhp2-3P0lP0LPlox)

Cảm ơn các bạn đã đọc bài viết của mình.

**Donate cho tác giả** : **[Buy me a coffee](https://www.buymeacoffee.com/su.lowkey)**