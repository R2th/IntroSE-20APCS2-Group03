# 1. Đặt vấn đề
Thông thường, khi chúng ta tạo ra một JSON Response trong Laravel, chúng ta sẽ sử dụng Model.
```php
class User
{
    protected $fillable = [
        'name', 'email', 'address', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
}
```
Giả sử chúng ta muốn lấy User đầu tiên dạng JSON, thì có lẽ chúng ta sẽ sử dụng một cách nào đó như sau.
```php
$user = User::find(1);
return $user;
```
Boom! Bạn nhận JSON response của user đầu đã đăng ký. Nhưng nếu Model thay đổi trong tương lai (ví dụ: đổi address thành user_address) => JSON response cũng thay đổi. Các bên sử dụng API của bạn cũng phải thay đổi theo. Do vậy ta cần một cách khác phù hợp hơn, câu trả lời đó là dùng Transformer. 
# 2. Transformer
Về cơ bản transformers cho bạn tạo định JSON response một cách linh động. Ngoài ra ta còn có thể phân trang kết quả, lồng các quan hệ/dữ liệu. Nếu bạn sử dụng[ Dingo API](https://github.com/dingo/api/wiki) thì [Fractal](http://fractal.thephpleague.com/installation/) Transformers được tích hợp sẵn.
Giả sử mình chỉ muốn trả về name và email mà không có address. 
```php
class UserTransformer extends TransformerAbstract
{
    public function transformWithoutAddress(User $user)
    {
        return [
            'id'            => (int) $user->id,
            'name'          => (string) $user->name,
            'email'         => (string) $user->email,
        ];
    }
}
```
Sử dụng: 
```php
$user = User::find(1);
return (new UserTransformer)->transformWithoutAddress($user);
```
OK, mọi thứ đều ổn. Nhưng nếu ta muốn trả lại cả address thì sao? Chỉ cần tạo thêm một transformer nữa trong UserTransformer 
```php
public function transformWithAddress(User $user)
{
    $data = ['address' => (string) $user->address];
    return array_merge($data, $this->transformWithoutAddress($user));
}
```
Great! Nếu bây giờ bạn thay đổi thuộc tính của User từ address thành user_address thì ta chỉ việc thay đổi trong Transformer và các bên sử dụng API của ta không bị ảnh hưởng gì cả. 
# 3. Kết luận
Trong bài viết này mình đã đề cập đến tạo JSON response từ Transformer. Một trong những tính linh hoạt của việc sử dụng transformer là nó không phải là trực tiếp bắt nguồn từ các models. Do đó, phiên bản API hoặc tạo transformer cho cùng một model với các mục đích khác nhau sẽ dễ dàng hơn.
# 4. Tài liệu tham khảo 
https://medium.com/@haydar_ai/how-to-start-using-transformers-in-laravel-4ff0158b325f