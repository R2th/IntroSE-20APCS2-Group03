Laravel là một framewor rất giàu tính năng. Tuy nhiên, bạn không thể tìm thấy tất cả các tính năng có sẵn trong tài liệu chính thức. Dưới đây là một số tính năng mà bạn có thể không biết.

### 1. Get original attributes

Sau khi thay đổi bản ghi Eloquent, bạn có thể lấy được các attribute gốc ban đầu bằng cách gọi `getOriginal()`

```
$user = App\User::first();
$user->name;                   //John
$user->name = "Peter";         //Peter
$user->getOriginal('name');    //John
$user->getOriginal();          //Original $user record
```

### 2. Kiểm tra xem Model có thay đổi không

Xác định xem Model hoặc Attribute được sửa đổi bằng cách sử dụng `isDirty()`

```
$user = App\User::first();
$user->isDirty();          //false
$user->name = "Peter";
$user->isDirty();          //true
```

Bạn cũng có thể kiểm tra nếu một vài attribute cụ thể được thay đổi.

```
$user->isDirty('name');    //true
$user->isDirty('age');     //false
```


### 3. Lấy giá trị các attribute đã được thay đổi

Truy xuất các attribute đã thay đổi của Model bằng cách sử dụng `getChanges()`

```
$user->getChanges()
//[
     "name" => "Peter",
  ]
```

Lưu ý: Thay đổi sẽ chỉ phản ánh nếu bạn lưu Model hoặc đồng bộ hóa các thay đổi bằng cách sử dụng `syncChanges()`

### 4. Tùy chỉnh column `deleted_at`

Theo mặc định, Laravel xử lý xóa mềm bằng column `deleted_at`. Bạn có thể thay đổi điều này bằng cách define rõ ràng property `DELETED_AT`.

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

Hoặc bằng cách define một accessor.
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


### 5. Lưu Model và relationship

Bạn có thể lưu một Model và relationship tương ứng của nó bằng function `push()`.

```
class User extends Model
{
    public function phone()
    {
        return $this->hasOne('App\Phone');
    }
}
$user = User::first();
$user->name = "Peter";
$user->phone->number = '1234567890';
$user->push(); // This will update both user and phone record in DB
```


### 6. Reload fresh Model

Reload fresh Model từ cơ sở dữ liệu bằng cách sử dụng `fresh()`

```
$user = App\User::first();
$user->name;               // John
// user record get updated by another thread. eg: 'name' changed to // Peter.
$updatedUser = $user->fresh(); 
$updatedUser->name;       // Peter
$user->name;              // John
```

### 7. Reload existing model 

Bạn có thể reload existing model với các giá trị mới từ cơ sở dữ liệu bằng cách sử dụng `refresh()`

```
$user = App\User::first();
$user->name;               // John
// user record get updated by another thread. eg: 'name' changed to // Peter.
$user->refresh(); 
$user->name;              // Peter
```


### 8. Kiểm tra xem các Model có giống nhau không

Xác định xem hai Model có cùng ID và thuộc cùng một bảng bằng cách sử dụng `is()`

```
$user = App\User::find(1);
$sameUser = App\User::find(1);
$diffUser = App\User::find(2);
$user->is($sameUser);       // true
$user->is($diffUser);       // false
```

### 9. Clone Model

Bạn có thể clone một model bằng cách sử dụng `replicate()`. Nó sẽ tạo một bản sao của model thành một instance mới và chưa tồn tại.

```
$user = App\User::find(1);
$newUser = $user->replicate();
$newUser->save();
```

### 10. Chỉ định các thuộc tính trong phương thức find()

Khi sử dụng `find()` hoặc `findOrFail()`, bạn có thể chỉ định các thuộc tính để chọn làm đối số thứ hai.

```
$user = App\User::find(1, ['name', 'age']);
$user = App\User::findOrFail(1, ['name', 'age']);
```

Bài viết được sưu tầm và lược dịch từ: https://medium.com/@JinoAntony/10-hidden-laravel-eloquent-features-you-may-not-know-efc8ccc58d9e