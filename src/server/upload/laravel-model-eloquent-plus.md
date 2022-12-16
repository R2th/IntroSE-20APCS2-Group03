Hiiii, comeback một chút.

Trong quá trình làm việc cùng Laravel không dài cũng không ngắn, chắc hẳn ai cũng sẽ động vào Model & Eloquent ít nhất 1 lần hoặc nhiều hơn cả thở hàng ngày. Kiểu gì thì chúng ta cũng sẽ cảm thấy nếu chỉ dừng lại ở `$table`, `$fillable`, hay `hasMany`, `belongsToMany`... đại loại vậy để mô tả một bảng và quan hệ trong DB thì nó hơi nhạt và không có nhiều tác dụng lắm đúng không. 

Hôm nay mình sẽ chia sẻ một số điều thú vị khi làm việc với Model & Eloquent giúp cho cuộc sống của bạn nhẹ nhàng hơn, và tận dụng được nhiều hơn từ Laravel.

# 1. Đương nhiên bắt đầu sẽ là tạo Model 
Khi tạo Model bằng command, bạn có thể chỉ định thư mục lưu Model bằng cách nhập tên thư mục trước tên Model. Mình cũng là một người không lưu Model trong thư mục *app* mặc định bao giờ nên điều này rất hữu ích.
```
    php artisan make:model Models/Product
```
Command trên sẽ tạo Model *Product* trong thư mục *app/Models*.

# 2. Casting attributes
Chắc chắn thứ 2 sẽ dành cho `$cast`.

`$cast` cung cấp cho chúng ta cách để biến đổi kiểu dữ liệu của các thuộc tính trong DB dù được lưu theo kiểu nào cũng có thể thay đổi được.

```php
// Model Product
protected $casts = [
    'is_published' => 'boolean'
];
```
Giá trị của `$cast` là một mảng với *key* là tên thuộc tính, *value* là kiểu dữ liệu chúng ta muốn nhận được. Ví dụ như trên, thuộc tính `is_published` sẽ luôn trả về kiểu `boolean` dù trong DB được lưu theo kiểu `integer`.

Các kiểu dữ liệu để cast được hỗ trợ bao gồm: `integer`, `real`, `float`, `double`, `string`, `boolean`, `object`, `array`, `collection`, `date`, `datetime`, và `timestamp`. 

Có một lỗi thường hay mắc phải, đó là các thuộc tính kiểu `date` hoặc `datetime` được format trong Blade:
```php
{{ $product->created_at->format('Y-m-d') }}
```
Việc này đôi khi do lười hoặc chưa tìm được cách viết nào ngắn hơn nên có thể sẽ bị lặp ở nhiều chỗ khác nhau sử dụng đến nó. Tuy nhiên sẽ hiệu quả hơn khi sử dụng `$cast`:
```php
protected $casts = [
    'created_at' => 'datetime:Y-m-d',
];
```
Từ giờ bạn sẽ không cần format mỗi khi trả về giá trị `created_at` trong Blade nữa, vì `$cast` đẫ giải quyết cho bạn rồi.

Tương tự nếu DB bạn lưu dữ liệu theo định dạng JSON. Hãy sử dụng `$cast` theo kiểu `array` để đơn giản công việc hơn xem sao nhé.

# 3. Visibility
Có những thuộc tính không nên được trả về cùng mảng hay chuỗi JSON của Model, điển hình nhất là khi F12 trình duyệt lên xem response chuỗi JSON chi tiết của 1 user khác chúng ta lại thấy cả username lẫn password(dù đã được mã hoá hay chưa) của người ta đúng k  =))

Đó là lúc thuộc tính `$hidden` được sử dụng. 
```php
protected $hidden = [
    'password'
];
```
`$hidden` giống như việc chúng ta tạo ra một danh sách đen cho các thuộc tính muốn ẩn đi. Ngược lại, nếu muốn một danh sách trắng (whitelist =)) ), chúng ta có thể khai báo `$visible` theo cách tương tự.
```php
protected $visible = [
    'first_name',
    'last_name'
];
```
Khi `$visible` được khai báo trong Model, mặc định tất cả các thuộc tính còn lại sẽ bị ẩn đi giống như cách hoạt động của `$fillable` hay `$guarded`.

# 4. Accessors
Đôi khi bạn muốn định dạng lại kiểu dữ liệu, nhưng không đơn giản như `$cast` hay giống như vậy nhưng lại không thích dùng `$cast`, như kiểu trong Model User lỡ định nghĩa 2 thuộc tính `first_name` và `last_name` nhưng khách hàng cứ thích hiển thị full name ra cơ. Chả nhẽ chỗ nào cũng nối chuỗi :|
```php
$this->first_name . ' ' . $this->last_name
```

Ví dụ vui vui vậy thôi, tuy nhiên với những yêu cầu tương tự, Laravel giúp bạn thực hiện đơn giản hơn nhiều bằng cách tạo ra *accessor*: phương thức trong Model giúp định nghĩa thuộc tính và dữ liệu trả về cho thuộc tính đó, theo cú pháp:

*get[TênPhươngThức]Attribute*

Và đây là câu trả lời cho ví dụ full name bên trên:
```php
public function getFullNameAttribute() {
    return "{$this->first_name} {$this->last_name}";
}
```

Đương nhiên khi nào cần hiển thị full name thì bạn sẽ phải gọi thế này nhé:
```php
$user->full_name
```

# 5. Mutators
Mutators tương tự cách hoạt động của Acessors, tuy nhiên ngược lại, nó giúp bạn thao tác với giá trị của các thuộc tính trong Eloquent Model. 

Ví dụ DB bạn nhận được yêu cầu hiển thị tên User theo kiểu viết hoa chữ cái đầu. Tuy nhiên sao mà bắt người dùng nhập kiểu đó đây =))
Có những hướng giải quyết như format phía frontend khi hiển thị ra hoặc trước khi gửi request, hoặc backend xử lý trước khi lưu vào DB. Nhìn chung để tránh rủi ro thì lưu thẳng vào DB là cách tốt nhất, tuy nhiên chúng ta có thể chọn cách làm để đơn giản nhất và dễ bảo trì nhất, như Mutators chẳng hạn.
```php
public function setLastNameAttribute($value) {
    $this->attributes['last_name'] = ucfirst($value);
}
```
Hãy nhớ cấu trúc tên phương thức mutator là *set[TênPhươngThức]Attribute* nhé

# 6. Appending values
Khi Model của bạn có chứa các phương thức accessors và các relations, chúng không được add vào array hay JSON mặc định của Model. Để làm được điều này, hãy thêm chúng vào trong thuộc tính `$appends` của Model đó. 

Quay lại với ví dụ accessor `getFullNameAttribute`, nhét nó vào `$appends` thôi:
```php
$appends = [
    'full_name'
];
```
Còn với relations thì sao? Giả sử một User có nhiều Blog, khi đó trong Model User chúng ta có relation như này:
```php
public function blogs() {
    return $this->hasMany(Blog::class);
}
```
Và bây giờ khi lấy ra User nếu muốn lấy thêm thông tin `blogs`, hãy định nghĩa relation như trên và nhét thêm `blogs` vào `$append` là được.
```php
$appends = [
    'full_name',
    'blogs'
];
```
Đặc biệt hơn, khi bạn chỉ cần mỗi `id` và `title` của Blog chẳng hạn, hãy làm thế này cho nhẹ nhàng:
```php
$appends = [
    'full_name',
    'blogs:id,title'
];
```

# 7. Touches 
Khi Model chứa những relations dạng `BelongsTo` hay `BelongsToMany` với Model khác, điển hình trong trường hợp Comment `BelongsTo` Blog. Chỉ là đôi khi, bạn muốn nếu thằng con update thì thằng cha cũng sẽ được cập nhật thời gian update. Khi đó `$touches` sẽ giúp bạn thực hiện điều này theo cách cực kỳ đơn giản.

Đó là trong Model con là Comment, bạn định nghĩa relation ra và thêm nó vào `$touches`
```php
class Comment extends Model
{
    protected $touches = ['blog'];

    public function blog()
    {
        return $this->belongsTo(App\Blog::class);
    }
}
```
Khi Comment được cập nhật, thì nó sẽ tự động cập nhật giá trị của trường `updated_at` trong Blog cha luôn.

# Kết
Trên đây là một số điều mình tìm hiểu được về Model và Eloquent, chắc chắn có những điều các bạn đã biết hoặc biết hết rồi cũng nên =)) Khi đó mong rằng những giải thích hay ví dụ có thể giúp các bạn điều gì đó. Cảm ơn đã theo dõi.

Tham khảo:

https://laravel.com/docs/5.8/eloquent

https://blog.pusher.com/advanced-laravel-eloquent-usage/

https://itnext.io/7-things-you-need-to-know-to-get-the-most-out-of-your-laravel-model-4f915acbb47c