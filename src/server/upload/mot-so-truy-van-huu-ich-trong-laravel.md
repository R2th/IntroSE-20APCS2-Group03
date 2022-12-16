Mình hiện đang tham gia trong một dự án Laravel + Reactjs. Vì là dự án đã release và bây giờ đang là thời gian maintain nên cơ bản là mình không được làm việc nhiều với Laravel. Thời gian đầu chủ yếu mình đọc tài liệu về React, Redux bởi vì đây là những thứ mới mà mình chưa từng tìm hiểu trước đấy. Tuy nhiên, dạo này dự án đang làm chức năng mới đồng nghĩa với việc sẽ có việc cần làm với Backend, với Laravel. Đây là lúc mình bắt đầu cảm thấy bối rối với những kỹ thuật của Laravel được áp dụng. Dự án ngày càng lớn hơn thì đồng nghĩa với việc các câu truy vấn CSDL sẽ ngày càng phức tạp hơn. Thế là cái bản chất yếu về CSDL đi cùng với việc không áp dụng được hết Query Builder cũng như Eloquent lộ rõ cái yếu kém của mình. Lan man một tí thế thôi, chủ yếu là để giới thiệu trong bài này mình sẽ lướt qua một số phương thức truy vấn hữu ích trong Laravel.
# all() với get()
```php
$users = App\Models\User::all();
```
![](https://images.viblo.asia/be7fee1f-9979-42ba-812c-0af688cd7867.png)
```php
// or
$users = App\Models\User::get()
```
![](https://images.viblo.asia/e88806ce-a31c-42e4-9b4a-cd9ec4794a2f.png)

Cả 2 đều cho kết quả giống nhau đều chỉ là lấy toàn bộ các dữ liệu trong bảng users. Tuy nhiên đối với việc sử dụng `get()` thì bạn có thể sử dụng thêm các câu truy vấn khác của Query Builder như là điều kiện để lọc kết quả hay như trong trường hợp dùng Eager Loading. 
```php
$users = App\Models\User::where('id', '>', '10')->get();
// Eager Loading
$userImage = App\Models\User::whereId(1)->with('image')->get();
```
Mặt khác, nếu bạn dùng `all()` thì ta không thể đưa các điều kiện khác vào để kiểm soát các kết quả được đưa ra vì nó sẽ mặc định lấy toàn bộ kết quả. Đấy chính là lý do mà trong dự án việc sử dụng `get()` sẽ là chủ đạo. 
# Lấy một kết quả
Thường sẽ là sử dụng `find()` hoặc `first()` để lấy một kết quả ở trong model. Việc sử dụng chúng tương tự như `all()` và `get()` ở trên.
```php
$user = App\Models\User::find(1);
// or
$user = App\Models\User::where('id', '>', 10)->first();
```
Đấy vẫn là những cách mà ngày xưa mình ngây thơ vẫn thường sử dụng. Nhưng trường hợp mà không có user nào có id là 1 (mình đang ví dụ với câu truy vấn dùng `find()` ở trên) nhưng trong code vẫn lấy thuộc tính `name` như bình thường. OMG! Màn hình báo bug `Trying to get property 'name' of non-object on line 1`. Tất nhiên là mình đang chạy ở chế độ dev thì mới có cái màn hình đen nhảy ra nhé :v.

Đọc một hàng nữa ngay ở dưới doc của chính cái `find()` kia thì chúng ta đã có thể giải quyết vấn đề. Hãy dùng `finfOrFail()` một cách thông mình. Lúc này chỉ cần để vào `try ... catch` thì mọi chuyện sẽ êm đẹp `Illuminate\Database\Eloquent\ModelNotFoundException with message 'No query results for model [App\Models\User] 23'`. Giờ thì bạn hãy dùng catch để xử lý nó thôi.
# Sử dụng where
Sử dụng where có rất nhiều cái hay và nhiều quá nên có cái mình còn chưa đọc đến. Tiện thể đọc một loạt mấy cái thấy hay hay.

**Dùng where với tên cột trong bảng**: Mọi người có thấy mấy cái ví dụ trên mình có dùng `whereId` không nhỉ. Mình chỉ nhớ là đã đọc về nó ở đâu rồi và bây giờ thì không nhớ chính xác tên nó là gì. Chỉ là đấy là cách mà bạn có thể viết tắt câu truy vấn sử dụng where với cấu trúc `whereColumnName` là bạn có thể truy vấn trong bảng có columnName tương ứng.
```php
// Lấy người có id = 1
$user = App\Models\User::whereId(1)->get();
// Lấy người có name = 'Hieu Bui'
$user = App\Models\User::whereName('Hieu Bui')->get();
```
**Sử dụng where với thời gian**: Để thực hiện truy vấn với những cột có dạng dữ liệu là timestamp thì Laravel cung cấp một số phương thức đặc thù như `whereDate / whereMonth / whereDay / whereYear / whereTime`. 
```php
$userDate = App\Models\User::whereDate('created_at', '2018-03-08')->get();
$userMonth = App\Models\User::whereMonth('created_at', '3')->get();
$userDay = App\Models\User::whereDay('created_at', '8')->get();
$userYear = App\Models\User::whereYear('created_at', '2018')->get();
$userTime = App\Models\User::whereTime('created_at', '=', '20:08:36')->get(); // Bắt buộc phải có 3 tham số truyền vào
```
**So sánh giá trị của 2 cột**: Lần đầu đọc doc đến đây :v. Cái này dùng để so sánh giá trị của 2 cột truyền vào có bằng nhau hay không, hay như xem thời gian cập nhật có sớm hơn thời gian tạo mới không :v.
```php
$users = App\Models\User::whereColumn('first_name', 'last_name')->get();
$users = App\Models\User::whereColumn('updated_at', '>', 'created_at')->get();
```
**Where Exists**: Phương thức này mình mới sử dụng trong một câu truy vấn dùng để đếm số lượng bản ghi có sự liên kết ràng buộc với nhiều bảng khác. Mình sẽ ví dụ truy vấn lấy ra toàn bộ các người dùng trong bảng `users` với điều kiện ràng buộc có ảnh trong bảng `images` (quan tâm đến 2 trường của `images` là `imageable_id` - `id` của người dùng, `imageable_type` - loại ảnh là gì ở đây là 'user').
```php
$users = App\Models\User::whereExists(function ($query) {
    $query->select(DB::raw(1))
        ->from('images')
        ->whereRaw('images.imageable_id = users.id and images.imageable_type = "user"');
    })
    ->get();
```
Với việc dùng câu truy vấn trên thì chỉ những người dùng có ảnh lưu trong bảng `images` mới được lấy ra.

# Điều kiện
Có khi nào bạn gặp trường hợp nếu điều kiện đùng thì thực hiện truy vấn này còn điều kiện sai thì sử dụng truy vấn khác. Bình thường thì mình sẽ nghĩ đến `if ... else` đấy. Nhưng trong một phút thử tìm kiểm xem Laravel có hỗ trợ cái gì khác hay ho không thì mình tìm ra `when`.

Hãy thử với một ví dụ là `if` trước nhé: Lấy ra các người dùng có `level = 2` nếu điều kiện đúng.
```php
$level = 2;
$condition = true;
$users = App\Models\User::when($condition, function ($query) use ($level) {
    return $query->where('level', $level);
})
->get();
```
Còn trong trường hợp `if ... else` thì ta chỉ cần truyền thêm 1 Closure vào làm tham số thứ 3 của `when` là có thể thực hiện được.
```php
$condition = true;
// $condition = false;
$users = App\Models\User::when($condition, function ($query) use ($level) {
    return $query->where('level', $level)->orderBy('name');
}, function ($query) {
    return $query->orderBy('level');
})
->get();
```
Với mỗi giá trị `$condition` thì sẽ cho ra những kết quả khác nhau.
# Truy vấn với Relationship
**Truy vấn nếu Relationship tồn tại**: Như ở trên mình có một ví dụ dùng `whereExists` để lấy ra kết quả là những người dùng có ảnh lưu trong bảng `images`. Thực ra thì trong model `User` mình đã có định nghĩa liên kết với `Image` là một liên kết `morphOne`. Để cho đơn giản thì chúng ta có thể dùng câu truy vấn sau đây để cho ra kết quả tương tự.
```php
$users  = App\Models\User::has('image')->get();
```
Thêm nữa, để thêm điều kiện với số lượng bao nhiêu kết quả từ relation thì mới lấy kết quả ra bạn có thể thực hiện như sau. Ở ví dụ này, mình áp dụng cho model `Product` có liên kết `morphMany` với `Image` và chỉ lấy ra những sản phẩm có ít nhất 2 ảnh. Để tiện so sánh thì mình sẽ dùng `count()` để đếm số lượng kết quả.
```php
$allProducts = App\Models\Product::has('images')->count(); // 52

$conditionProducts = App\Models\Product::has('images', '>=', 2)->count(); // 9
```
**Đếm số Relationship**: Nếu bạn muốn đếm số lượng các relationship mà không cần lấy toàn bộ kết quả thì bạn nên dùng `withCount()`. Ví dụ đếm số lượng ảnh của từng sản phẩm:
```php
$products = App\Models\Product::withCount('images')->get();
foreach ($products as $product) {
    echo $product->images_count . '</br>';
};
```
# Kết luận
Để áp dụng hết Eloquent cũng như Query Builder thì buộc lòng bạn phải gặp phải tham gia vào những dự án thực tế có số lượng bảng tương đối lớn cũng như số lượng liên kết và các liên kết giữa các bảng phải gọi rất chi là rối rắm. Vì như tiêu đề là mình chỉ đưa ra một số câu truy vấn mình thấy hay và mình đã gặp phải nên là không thể đi hết hàng trăm phương thức truy vấn trong doc của Laravel được. Chúc bạn đọc tìm được những phương thức truy vấn hay trong Laravel để áp dụng cho dự án của mình. Mình lại đi đọc doc đây (seeyou).