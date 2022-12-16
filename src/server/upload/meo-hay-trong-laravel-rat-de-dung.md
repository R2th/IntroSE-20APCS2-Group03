Hôm nay mình sẽ tổng hợp một số mẹo hay thường được sử dụng trong Laravel để dễ dàng tìm kiếm lại khi cần. Có những thứ mình sử dụng rất thường xuyên nhưng vẫn bị quên, hay đôi khi deadline căng quá trong lúc fix bug gấp mà kiếm tìm không ra thì đã có dữ liệu được lưu lại để tiện tra cứu cũng tốt phải không nào. Ok chúng ta bắt đầu nhé :violin: 

### 1. Những Scopes kinh điển

- Get dữ liệu mới nhất anh em sử dụng như sau:

`User::latest()->get();`

Nhưng anh em đừng quên scope này để lấy danh sách user theo `created_at` sắp xếp giảm dần nha, chứ không phải `updated_at` đâu.

- Lấy danh sách users mới nhất theo một thuộc tính bất kì: `last_login_at`

`User::latest('last_login_at')->get();`


- Kết quả trả về với random order:

`User::inRandomOrder()->get();`


- Trả về dữ liệu với một điều kiện bất kì:

```
User::when($request->query('sort'), function ($query, $sort) {
   if ($sort == 'new') {
      return $query->latest();
   }
   
   return $query;
})->get();
```


### 2. Custom Request Validate

Nhiều lúc mình hay kiểm tra dữ liệu gửi request ngay trong Controller như sau:

```
public function store(Request $request)
{
    $validatedData = $request->validate([
        'title' => 'required|unique:posts|max:255',
        'body' => 'required',
    ]);
    // The blog post is valid...
}
```

Nhưng cho tới lúc Controller này chứa quá nhiều logic và coding nó sẽ trở nên khó trong việc maintain về sau này. Vậy nên cách làm tốt hơn là hay chia tách làm sao cho phần code logic trong controller trở nên ít hơn và từ đó mình đã đẩy phần xử lý validate những request sang một class khác chuyên để thực hiện công việc này. 

Laravel đã chuẩn bị sẵn cho bạn nếu bạn muốn thực thi theo cách này rồi đó :D Chúng ta xem sẽ phải làm như nào nha:

`php artisan make:request StoreArticlePost`

Khi run command này thì class **StoreArticlePost** có chức năng kiểm tra request khi tạo 1 post article sẽ được lưu ở đường dẫn sau :  `app/Http/Requests/`

Thêm phần validate vào class này như sau :

```
class StoreArticlePostRequest extends FormRequest
{
   public function authorize()
   {
      return $this->user()->can('create.posts');
   }
public function rules()
   {
       return [
         'title' => 'required|unique:posts|max:255',
         'body' => 'required',
       ];
   }
}
```

Bây giờ chúng ta không khai báo việc sử dụng Illuminate\Http\Request trong controller nữa mà thay vào đó là 

```
use App\Http\Requests\StoreArticlePostRequest;
public function store(StoreArticlePostRequest $request)
{
    // The blog post is valid...
}
```

Cần bổ xung thêm đôi chút để giống như trường hợp sử dụng trong project thật. 

**Bổ sung 1:**

Bạn để ý lại hàm `authorize()` ở trong **StoreArticlePostRequest** thì hàm này sẽ trả về error 403 nếu fail điều kiện, vậy nên mình cần sửa lại một chút trong hàm **render** của `app/Exceptions/Handler.php`

```
public function render($request, Exception $exception)
{
   if ($exception instanceof \Illuminate\Auth\Access\AuthorizationException) {
      //
   }
return parent::render($request, $exception);
}
```

**Bổ sung 2:**

Khi xử lý lỗi request thì cần trả về messages thông báo cho nên trong request **StoreArticlePostRequest** cần thêm hàm `messages()` như sau:

```
class StoreArticlePostRequest extends FormRequest
{
   public function authorize()
   {
      return $this->user()->can('create.posts');
   }
public function rules()
   {
       return [
         'title' => 'required|unique:posts|max:255',
         'body' => 'required',
       ];
   }
public function messages()
   {
      return [
        'title.required' => 'The title is required.',
        'title.unique' => 'The post title already exists.',
        ...
      ];
   }
}
```

**Ứng dụng:**

Sử dụng trong form validate như  sau :

```
<input type="text" name="title" />
@if ($errors->has('title'))
   <label class="error">{{ $errors->first('title') }}</label>
@endif
```

### 3. Lưu trữ data trong configs

Thông thường chúng ta hay xử lý data static trong configs như sau:

Mình có model **BettingOdds.php**

```
class BettingOdds extends Model
{
   ...
}
```

Có phần configs như sau **config/bettingOdds.php**

```
return [
   'sports' => [
      'soccer' => 'sport:1',
      'tennis' => 'sport:2',
      'basketball' => 'sport:3',
      ...
   ],
];
```

**Khi sử dụng** : `config(’bettingOdds.sports.soccer’);`

**Cách làm thay thế TỐT HƠN :**

`BettingOdds.php`

```
class BettingOdds extends Model
{
   protected static $sports = [
      'soccer' => 'sport:1',
      'tennis' => 'sport:2',
      'basketball' => 'sport:3',
      ...
   ];
}
```

**Khi sử dụng :**

`BettingOdds::$sports['soccer'];`

**Tại sao?**

*Bởi vì nó dễ dàng trong việc quản lý và xử lý logic mới như ví dụ này:*

```
class BettingOdds extends Model
{
   protected static $sports = [
      'soccer' => 'sport:1',
      'tennis' => 'sport:2',
      'basketball' => 'sport:3',
      ...
   ];
public function scopeSport($query, string $sport)
   {
      if (! isset(self::$sports[$sport])) {
         return $query;
      }
      
      return $query->where('sport_id', self::$sports[$sport]);
   }
}
```

**Sử dụng scope:** `BettingOdds::sport('soccer')->get();`

Và như vậy bạn có thể mở rộng nó đến như nào là tùy vào yêu cầu tiếp theo của project.

### 4. Sử dụng Collection thay vì Array 

Một ví dụ nhỏ về Array như sau: 

```
$fruits = ['apple', 'pear', 'banana', 'strawberry'];
foreach ($fruits as $fruit) {
   echo 'I have '. $fruit;
}
```

Chúng ta có một yêu cầu cần loại bỏ táo ra khỏi lô hàng nếu có. Để thực hiện yêu cầu này tuy là có nhiều cách làm nhưng thử đặt vấn đề nếu bạn chuyển array thành collection thì xử lý có dễ dàng hơn không nhé ?

```
$fruits = collect($fruits);
$fruits = $fruits->reject(function ($fruit) {
   return $fruit === 'apple';
})->toArray();
```

**Kết quả:**

`['pear', 'banana', 'strawberry']`

Hàm **reject** chỉ là một trong hơn 100 hàm có sẵn của collection để thuận tiện trong việc xử lý chuỗi dữ liệu theo từng yêu cầu. Bạn có thể tìm hiểu và sử dụng extensive collection.

### 5. Tổng kết

Trên đây mình trình bày một số mẹo hay trong Laravel cùng với những ví dụ thực tế, hy vọng bài viết mang lại hữu ích cho những bạn đang tìm kiếm cách làm tốt cho yêu cầu của project đang làm hay những bạn mới tìm hiểu về Laravel. Nếu như bạn đang có những cách làm hay thì đừng ngần ngại bổ sung dưới comment để mình cập nhật thêm và tham khảo bạn nha. Happy Coding !