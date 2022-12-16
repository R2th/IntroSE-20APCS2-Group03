# 1. Tại sao cần sử dụng $appends với Accessors trong Eloquent ? 
Eloquent là một tính năng được gọi là Accessors . Bạn có thể xác định các trường tùy chỉnh của riêng của bạn trong cơ sở dữ liệu . Nhưng có  $appends trong Eloquent , chúng ta có nên sử dụng nó không ? Và sự khác biệt là gì ? 
# 2. Đầu tiên là cách thức hoạt động của Accessors 
Đối với những người không biết hoặc đã quên: ví dụ: nếu bạn có mô hình User model và fields là  first_name và last_name trong  DB , thì bạn có thể tạo một hàm trong **app\User.php** :
```php
function getFullNameAttribute() {
  return $this->first_name . ' ' . $this->last_name;
}
```
Sau đó, bạn có quyền truy cập vào thuộc tính full_name (trong tên hàm là CamelCase và tên thuộc tính là dấu gạch dưới _), ví dụ như sau:
```php
echo User::find(1)->full_name;
```
Nhưng nếu bạn chỉ trả về đối tượng User , nó sẽ không chứa full_name :
```php
dd(User::find(1)->toJSON());
```
Kết quả sẽ trông giống như thế này: 
```json
{
  "id":1,
  "first_name":"Quang",
  "last_name":"Anh",
  "email":"quang.anh@sun-asterisk.com",
  "created_at":"2019-06-19 08:16:58",
  "updated_at":"2019-06-19 19:48:09"
}
```
# 3. Đây là nơi $appends xuất hiện 
Bây giờ  trong model User của bạn, bạn có thể thêm thuộc tính $appends và liệt kê các trường sẽ tự động được nối thêm:
```php
class User extends Model
{
        protected $appends = ['full_name'];
}
```
Bây giờ thuộc tính đó sẽ được tự động thêm vào JSON trước đó:
```json
{ 
  "id":1,
  "first_name": "Quang",
  "last_name": "Anh",
  "email": "quang.anh@sun-asterisk.com",
  "created_at": "2019-06-19 08:16:58",
  "updated_at": "2019-06-19 19:48:09", 
  "full_name": " Quang Anh" 
}
```
Vì vậy, các trường **Accessor** sẽ hoạt động chỉ bằng cách mô tả các phương thức **getAbcAttribution()** , nhưng nếu bạn muốn chúng cũng được trả về trong danh sách, thì hãy thêm chúng vào thuộc tính **$appends** .
# 4. Kết luận

Thông tin thêm về Accessors trong [document](https://laravel.com/docs/5.8/eloquent-mutators)  :scream::kissing_heart::kissing_heart::kissing_heart::kissing_heart: