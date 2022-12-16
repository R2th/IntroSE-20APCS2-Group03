## Giới thiệu
Laravel là 1 framework PHP mạnh mẽ và ẩn chứa nhiều điều thú vị. Khi làm việc với Laravel, chắc hẳn bạn sẽ phải sử dụng Eloquent ORM thường xuyên. Eloquent ORM giúp cho việc query, thao tác với database trở nên đơn giản và đẹp mắt hơn rất nhiều so với việc viết query thông thường. Document của Laravel cung cấp khá đầy đủ về vấn đề này tuy nhiên 10 tips dưới đây chưa chắc bạn đã tìm thấy. Nào chúng ta cùng tìm hiểu nhé!!!
### 1. Get original attributes

Sau khi thay đổi các thuộc tính trong 1 model, bạn có thể nhận được các thuộc tính ban đầu bằng cách sử dụng **getOriginal()**

```
$user = App\User::first();
$user->name;                   //Sang
$user->name = "Duong";         //Duong

$user->getOriginal();          //Giá trị ban đầu của tất cả thuộc tính trong Model
$user->getOriginal('name');    //Có thể truyền vào tên thuộc tính để lấy ra giá trị ban đầu
```

### 2. Kiểm tra xem Model có thay đổi hay không

Chúng ta có thể kiểm tra xem Model hoặc thuộc tính đã được sửa đổi hay chưa bằng cách sử dụng **isDirty()**

```
$user = App\User::first();
$user->isDirty();          //false

$user->name = "Sang";
$user->isDirty();          //true
```

Bạn cũng có thể kiểm tra nếu một thuộc tính cụ thể được thay đổi.

```
$user->isDirty('name');    //true
$user->isDirty('age');     //false
```


### 3. Danh sách các thuộc tính được thay đổi
Để kiểm tra danh cách các thuộc tính được thay đổi sau khi update Model chúng ta sử dụng **getChanges()**
```
$data = [
    'name' => 'Kaozizi',
    'age' => '23',
];

$user = App\User::first();
$user->update($data);
$user->getChanges(); //Kết quả chắc hẳn bạn sẽ đoán được
```

### 4. Thay đổi cột deleted_at trong Soft Delete

Theo mặc định, Laravel sử dụng cột deleted_at cho việc Soft Delete để lưu lại thời gian xóa model. Một ngày nọ bạn không thích cái tên deleted_at nữa thì có thể custom bằng 2 cách sau

```
class User extends Model
{
    use SoftDeletes;

     * The name of the "deleted at" column.
     *
     * @var string
     */
    const DELETED_AT = 'is_deleted';
}
```

hoặc là sử dụng Accessor

```
class User extends Model
{
    use SoftDeletes;

    public function getDeletedAtColumn()
    {
        return 'is_deleted';
    }
}
```
### 5. Update Model và mối quan hệ cùng một lúc

Bạn có thể lưu một Model và các mối quan hệ tương ứng của nó bằng method **push()**

Định nghĩa mối quan hệ:

```
class User extends Model
{
    public function phone()
    {
        return $this->hasOne('App\Phone');
    }
}
```
Update một model
```
$user = User::first();

$user->name = "Sang";
$user->phone->number = "0969696969";

$user->push(); // Những thay đổi về user và phone sẽ được update cùng lúc trong DB
```

### 6. Reload fresh model

Để lấy ra 1 model vừa được thay đổi trong database bởi 1 tác vụ khác ta sử dụng **fresh()**

```
$user = App\User::first();
$user->name;               // Sang

// Model đã bị thay đổi bởi 1 tác vụ khác. Ví dụ: thay đổi thuộc tính name

$updatedUser = $user->fresh(); 
$updatedUser->name;       // Duong
$user->name;              // Sang
```

### 7. Reload existing model

Bạn có thể reload 1 model hiện có với các giá trị mới từ database bằng cách sử dụng **refresh()**

```
$user = App\User::first();
$user->name;               // Sang

// Model đã bị thay đổi bởi 1 tác vụ khác. Ví dụ: thay đổi thuộc tính name

$user->refresh(); 
$user->name;              // Duong
```


Lưu ý: **fresh()** và **refresh()** dễ gây nhầm lẫn khi sử dụng. Method **refresh()** sẽ update model vừa lấy ra với các giá trị mới nhất. 

### 8. Kiểm tra các model có giống nhau hay không

Để xác định xem hai model có cùng ID và thuộc cùng một bảng bằng cách sử dụng **is()**

```
$user = App\User::find(1);
$sameUser = App\User::find(1);
$diffUser = App\User::find(2);

$user->is($sameUser);       // true
$user->is($diffUser);       // false
```

### 9. Nhân bản (clone) một model
Bạn có thể clone một model bằng cách sử dụng **replicate()**. Nó sẽ tạo ra một bản sao của mô hình và tất nhiên không tồn tại trong database

```
$user = App\User::find(1);
$newUser = $user->replicate();
$newUser->save(); // Lúc này bản sao sẽ được lưu vào db với ID mới
```

### 10. Chỉ định các thuộc tính với method find()

Khi sử dụng method **find()** hoặc **findOrFail()**, chúng ta có thể chỉ định lấy ra những thuộc tính cần lấy bằng cách truyền vào 1 mảng trong đối số thứ 2 của method

```
$user = App\User::find(1, ['name', 'age']);
$user = App\User::findOrFail(1, ['name', 'age']);
```

## Tổng kết

Trên đây là 10 tính năng ẩn trong Laravel Eloquent. Hy vọng sẽ giúp ích cho các bạn trong quá trình làm việc với Laravel. Cảm ơn các bạn đã đọc bài và nếu có sai sót thì các bạn hãy comment phía dưới nhé!