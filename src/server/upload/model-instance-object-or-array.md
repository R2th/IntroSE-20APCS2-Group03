# 1. Đặt vấn đề
Một ngày đẹp trời bạn thực hiện câu lệnh quen thuộc để lấy ra tất cả bản ghi trong bảng `users`. Câu chuyện hết sức đơn giản nếu bạn sử dụng `Eloquent` trong `Laravel` là xong.
```php
//get all user
$users = User::first();

```
Thay vì trả về một collection model như hàm `all()`, hàm `first()` này trả về một `model instance`.

Để lấy ra thuộc tính name của `model instance` trên cũng đơn giản thôi. Bạn dùng câu lệnh
```php
$user->name;
// hoặc
$user['name'];
```
Bài toán đã được giải quyết nhưng chờ một chút, ta chợt nhận ra `model instance` kia vừa gọi theo kiểu object được vừa gọi theo kiểu array được. Vậy nó là object hay array?
# 2. Object và array trong PHP
Để khẳng định nó là object hay array thì ta đi qua một chút về hai khái niệm này trong PHP.

Array(Mảng) là danh sách  các phần tử có cùng kiểu dữ liệu và nó là một trong các kiểu dữ liệu trong php có độ phức tạp tính toán cao. Có 2 loại mảng là mảng một chiều hoặc mảng nhiều chiều. Riêng với PHP thì các phần tử của mảng có thể không cùng kiểu dữ liệu, và các phần tử của mảng được truy xuất thông qua các chỉ mục(vị trí) của nó nằm trong mảng.

Khởi tạo và gọi tới 1 phần tử trong array có rất nhiều cách để đơn giản ta sử dụng cú pháp sau:
```php
$array = [];
$array['foo'] = 'bar';
$array['baz-bar'] = 'science';
 
echo $array['foo']; //bar
echo $array->foo; //Fail
```
Còn với object việc khởi tạo và gọi ra như sau

```php
$object = {};
$object->foo = 'bar';
$object->{'baz-bar'} = 'science'
 
echo $object->foo; //bar
echo $object['foo'] // Fail 
```
Như kết quả ta thấy khi ta gọi đến thuộc tính trong object mà sử dụng cú pháp **[]** sẽ thông báo lỗi ngay. Vậy điều gì đã khiến `model instance` trong laravel có thể sử dụng cả cú pháp gọi của `object` và `array` ?
# 3. Tìm hiểu về ArrayAccess
Cùng đi vào phân tích một chút xem `Laravel` đã làm gì để biến một `model instance` linh hoạt đến vậy.

   Đầu tiên có thể thấy model `User extend` từ `Authenticatable` và class này lại extend  `Model` trong thư mục vendor. Túm váy lại là khi ta gọi đến `User::first()` thực tế là gọi hàm `first()` trong class `Model` trong thư mục `Illuminate\Database\Eloquent\Model.php`. Không, mọi thứ không đơn giản như thế. Chẳng có hàm `first()` nào trong `Model` cả. Nó được gọi thông qua một `magic fucntion __callStatic` rồi lại gọi đến `magic function __call`.
```php
    public function __call($method, $parameters)
    {
        if (in_array($method, ['increment', 'decrement'])) {
            return $this->$method(...$parameters);
        }

        return $this->newQuery()->$method(...$parameters);
    }
```
Ở đây một `Builder` được tạo ra rồi gọi đến `$method` ở đây là `first`. Tiếp tục vào thư mục `Illuminate/Database/Eloquent/Builder.php` tìm vẫn không thấy hàm `first` ?? wtf ??

May quá nhìn ở đâu class `Builder` nó có sử dụng `Trait` với tên là `BuildsQueries` mò vào đây ta mới thấy được hàm `first()` (metghe).

 Chúng ta đừng vội quan tâm đến hàm `first` vì nó không phải chìa khóa để trả lời câu hỏi mà đầu bài chúng ta đã nêu ra. Hãy nhìn phần đầu của class `Model` nó `implements ArrayAccess`. Nếu bạn hay đọc code `php` thuần thì chắc chắn đã nhận ra vẫn đề nằm ở đây rồi nhỉ?

PHP thuần cung cấp cho ta một số `class` và `interfaces` được xây dựng sẵn. Các class và interfaces này cho phép nhà phát triển PHP thêm các tính năng vào ngôn ngữ, thường được dành riêng cho những `framework`.

Lên `document` của php đọc thì ta thấy nó cung cấp cho ta 4 `abstract  method`
```php

abstract public bool offsetExists ( mixed $offset )
abstract public mixed offsetGet ( mixed $offset )
abstract public void offsetSet ( mixed $offset , mixed $value )
abstract public void offsetUnset ( mixed $offset )
```
Vì `Model` của chúng ta được `implements` từ `ArrayAccess`  nên khi `implements` sẽ cần phải `@override` lại 4 `method` trên.

Mò xuống code thì đúng là `Laravel` đã làm như vậy. Nhưng điều chúng ta quan tâm ở đây là chuyện gì đã xảy ra khi chúng ta **cố tình** gọi thuộc tính của 1 `object` theo cú pháp của một `array` khi sử dụng `model instance` của Laravel.
```php
$user['name'];
```
Khi chúng ta gọi như vậy, bằng 1 cách `magic` của nhà phát triển, mặc định chúng ta đã gọi đến `abstract method offsetGet`. Tôi đã thử `debug` ra kết quả là như vậy.

Cùng xem hàm này sau khi `override` lại từ `ArrayAccess interface` đã xử lí gì nhé.

```php
public function offsetGet($offset)
{
    return $this->getAttribute($offset);
}
```
nó truyền vào 1 `param` khi `dump` ra bạn sẽ nhận được giá trị là key của 1 mảng. Cụ thể ở đây là `name`. Tìm tiếp vào hàm `getAttribute($offset)` xem nó làm gì.

Tôi đã lục tung cả class Model ra mà không thể tìm thấy hàm `getAttribute()`. Class `Model` cũng không `extend` class nào khác, tưởng như đã đi vào đường cụt thì tôi nhìn thấy cú pháp này trong phần đầu của class `Model`
```php
 use Concerns\HasAttributes,
        Concerns\HasEvents,
        Concerns\HasGlobalScopes,
        Concerns\HasRelationships,
        Concerns\HasTimestamps,
```
Không còn nghi ngờ gì nữa, `Model` ở đây đã sử dụng `Trait` ([Tìm hiểu về Trait](https://viblo.asia/p/traits-in-php-and-laravel-l0rvmxzQGyqA)).  Kiên nhẫn một chút tôi đã tìm thấy hàm `getAttribute()` trong thư mục `Illuminate\Database\Eloquent\Concerns\HasAttributes.php`.
```php
    public function getAttribute($key)
    {
        if (! $key) {
            return;
        }
        
        if (array_key_exists($key, $this->attributes) ||
            $this->hasGetMutator($key)) {
            //Nhảy vào đây
            return $this->getAttributeValue($key);
        }
        
        if (method_exists(self::class, $key)) {
            return;
        }

        return $this->getRelationValue($key);
    }
```
Ở hàm này logic sẽ nhảy vào hàm if thứ 2 tức là tồn tại `key` trùng với `attributes`
```php
        if (array_key_exists($key, $this->attributes) ||
            $this->hasGetMutator($key)) {
            //Nhảy vào đây
            return $this->getAttributeValue($key);
        }
```
Sau đó gọi đến các hàm `getAttributeValue()` và dừng lại ở hàm `getAttributeFromArray()`.
Ở đây ta có thể tìm được đáp án của câu hỏi ta đặt ra ở đầu bài. Nó trả về 1 `value` của mảng `attributes` trong model `User` với `key` = `name` cụ thể là `name` của bảng `users` như `Nguyễn Văn A` chẳng hạn.
```php
    /**
     * Get an attribute from the $attributes array.
     *
     * @param  string  $key
     * @return mixed
     */
    protected function getAttributeFromArray($key)
    {
        if (isset($this->attributes[$key])) {
            return $this->attributes[$key];
        }
    }
```
# 4. Tổng kết
Vậy là sau một hồi suy luận ta đã hiểu được tại sao `model instance` nó lại linh hoạt sử dụng được cú pháp của array. Thực ra `model instance` trả về 1 object nhưng vì implements ArrayAccess  nên có thể sử dụng cú pháp array. Bài viết đồng thời được đăng trên [blog cá nhân](https://storyofsu.com/) của mình.

Lời cuối xin cảm ơn các bạn đã đọc bài viết của mình. Bài tiếp theo mình sẽ chỉ ra xem Laravel đã kết nối với DB như thế nào?
# 5. Tài liệu tham khảo
1.[Document PHP](http://php.net/manual/en/class.arrayaccess.php)

2.[Array access](https://alanstorm.com/php_array_access/)