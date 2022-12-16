Khi làm việc với Eloquent Model trong Laravel, tôi đã tìm thấy một số điều thú vị có thể làm cho code chúng ta ngắn hơn, dễ dàng hơn.

Trong bài viết này, tôi sẽ chia sẻ một số tips mà bất cứ ai sử dụng framework Laravel nên biết để tối ưu hóa Models.

## Đầu tiên, hãy tạo một Model
Khi tạo một Model thông qua command line, chúng ta có thể chỉ định folder - nơi lưu trữ Model được tạo. Chỉ cần thêm tên của folder trước tên của Model.

```
php artisan make:model Models/Product
```

Câu lệnh trên sẽ tạo một Model trong thư mục *app/Models*. Điều này giúp chúng ta tiết kiệm thời gian di chuyển bằng cách thủ công.

### 1. Thuộc tính Casts
Thuộc tính **$cast** cung cấp một cách để chuyển đổi thuộc tính thành một kiểu dữ liệu nhất định.

```
protected $casts = [
    'is_published' => 'boolean'
];
```

Thuộc tính *is_published* sẽ được chuyển sang dạng *boolean* khi truy cập nó, ngay cả khi nó được lưu trữ dạng *integer* ở database.

Có rất nhiều kiểu mà chúng ta có thể chuyển đổi thuộc tính sang như là *date, datetime*.

Một lỗi mà tôi thường thấy với là các thuộc tính *date, datetime* được định dạng trong các Blade template, như thế này:
```
{{ $blog->created_at->format('Y-m-d') }}
```

Trong một vài Blade template, chúng ta có thể thấy định dạng này xảy ra nhiều lần trên cùng một biến (lặp code). Điều này có thể thực hiện đơn giản hơn thông qua thuộc tính **$cast**.
```
protected $casts = [
    'published_at' => 'datetime:Y-m-d',
];
```

Thuộc tính *published_at* sẽ luôn trả về theo định dạng *Y-m-d* và chúng ta không cần phải thực hiện bất kỳ công việc format nào nữa.

### 2. Visibility
Có một vài thuộc tính không nên được chứa trong dữ liệu được lấy ra, ví dụ như thuộc tính *password*. Và đây là trường hợp mà chúng ta có thể sử dụng thuộc tính **$hidden**.
```
protected $hidden = [
    'password'
];
```

Thuộc tính **$hidden** giống như một blacklist cho thuộc tính. Và ngoài ra, chúng ta cũng có thể sử dụng thuộc tính **$visible** được coi là whitelist cho thuộc tính.
```
protected $visible = [
    'first_name',
    'last_name'
];
```

Khi sử dụng thuộc tính **$visible** trong model, thì các thuộc tính không được thiết lập sẽ tự động ẩn. Nó hoạt động giống như **$fillable và $guarded**.

### 3. Accessors
Thỉnh thoảng, chúng ta cần kết hợp nhiều thuộc tính lại thành một ("fake" attribute). Điều này có thể được thực hiện bằng **accessors**.

Giả sử bạn có một model User có thuộc tính *first_name* và *last_name*. Để hiển thị tên đầy đủ (fullname) chúng ta có thể làm như sau:
```
$this->first_name . ' ' . $this->last_name
```
Đây là cách mà đa số các lập trình viên thường sử dụng. Nhưng trong Laravel không khuyến khích sử dụng nó, và sử dụng **accessors** thay thế.

**Accessor** là một phương thức được định nghĩa trong Model với cú pháp sau:
```
get[NameOfAttribute]Attribute
```
**Accessor** cho ví dụ trên sẽ như sau:
```
public function getFullNameAttribute() {
    return "{$this->first_name} {$this->last_name}";
}
```

Và để truy cập giá trị fullname ta sử dụng cú pháp sau:
```
$user->full_name
```

### 4. Mutators
Ngược với **Accessor**, **Mutators** cho phép chúng ta định dạng lại giá trị thuộc tính trước khi lưu vào Database. Có cú pháp giống như sau:
```
public function setLastNameAttribute($value) {
    $this->attributes['last_name'] = ucfirst($value);
}
```

Ví dụ trên sẽ apply hàm *ucfirst()* cho *last_name* và lưu kết quả vào trong *$attributes*:
```
$user->last_name = 'jones'; // Will result in `Jones`
```

### 5. Appending values
Khi một Model có *accessors* và *relations*, theo mặc định chúng sẽ không được thêm vào array và JSON của Model. Để làm điều này, chúng ta phải thêm *accessors* và *relations* vào thuộc tính ***$appends*** của model. Ví dụ với thuộc tính *full_name*:
```
$appends = [
    'full_name'
];
```

*Chú ý: Accessors được thêm vào thuộc tính $append sử dụng snack case chứ không phải camel case.*

Giả sử model User có quan hệ 1 - n với model Blog:
```
public function blogs() {
    return $this->hasMany(App\Blog::class);
}
```

Để thêm blog vào model chỉ cần thêm vào thuộc tính *$appends*:
```
$appends = [
    'full_name',
    'blogs'
];
```

Chúng ta có thể chỉ định thuộc tính thêm vào. Ví dụ, chúng ta muốn thêm thuộc tính blog id và title vào model:
```
$appends = [
    'full_name',
    'blogs:id,title'
];
```

### 6. Touches
Khi một model có mối quan hệ *BelongsTo* hoặc *BelongsToMany* với model khác, như trong trường hợp này:  Comment model thuộc về một Blog, khi bạn sửa một comment và bạn muốn blog liên quan đến comment này cũng sẽ cập nhật lại thời gian, điều này có thể được thực hiện bằng cách thêm mối quan hệ vào thuộc tính *$touches*:
```
class Comment extends Model
{
    protected $touches = ['blog'];

    public function blog()
    {
        return $this->belongsTo(App\Blog::class);
    }
}
```

Khi Comment model được update, thì thuộc tính *updated_at* của Blog model liên quan với comment này sẽ được cập nhật tự động.

## Summary
Trên đây là 7 điều mà tôi muốn chia sẻ với các bạn để tận dụng tối đa chức năng của Model. Hãy để lại nhận xét nếu bạn có bất kỳ câu hỏi nào.

Cảm ơn các bạn đã đọc!