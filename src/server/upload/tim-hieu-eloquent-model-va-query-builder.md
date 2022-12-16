# I. Giới thiệu

Laravel hiện nay đang sử dụng 2 kiểu truy vấn phổ biến với database là Eloquent ORM và Query Builder. Sau đây, chúng ta sẽ đi tìm hiểu xem 2 kiểu truy vấn này là gì, và chúng khác nhau như thế nào.
# II. Định nghĩa

## 1. Query Builder là gì?

Query Builder cung cấp 1 giao diện thuận tiện và dễ dàng tạo và chạy những truy vấn từ database. Nó có thể được sử dụng để thực thi hầu hết những thao tác về database trong ứng dụng của bạn và làm việc với tất cả những database được hỗ trợ.

## 2. Eloquent ORM là gì?

Eloquent ORM đi kèm với Laravel cung cấp ActiveRecord đầy đủ, đẹp đẽ và đơn giản để làm việc với database. Mỗi bảng của database sẽ được ánh xạ qua ‘Model’, và model này được sử dụng để tương tác với bảng.
# III. So sánh

## 1. Tính dễ sử dụng

* Eloquent ORM dễ sử dụng hơn trong việc truy xuất, thay đổi cơ sở dữ liệu, cú pháp ngắn gọn, đơn giản hơn QueryBuilder.
* Eloquent ORM dễ dàng kết nối với database hơn QueryBuilder.
* Về độ phức tạp của một câu SQL mà Eloquent ORM chưa thể đáp ứng thì chúng ta phải sử dụng DB::raw hoặc QueryBuilder.

## 2. Hiệu suất

Query Builder có hiệu suất truy vấn dữ liệu nhanh hơn Eloquent ORM bởi vì Eloquent phải thêm một lớp trong ứng dụng và yêu cầu nhiều truy vấn SQL. Đối với các database mà có ít bản ghi hiệu suất của chúng không có quá là nhiều sự chênh lệch, vậy nên đối với những database này tôi khuyên các bạn nên sử dụng Eloquent ORM vì cú pháp đơn giản và ngắn gọn của chúng.

# IV. Magic function trong php và ứng dụng trong Eloquent
## 1. Magic function
Trong PHP có hỗ trợ chúng ta 15 `magic function` với từng chức năng khác nhau, ở bài viết này mình sẽ chỉ nêu qua về khái niệm của từng `magic funtion` chứ không đi sâu:

+ `__construct()`: gọi khi khởi tạo đối tượng.

+ `__destruct()`: gọi khi hủy đối tượng.

+ `__set()`: gọi khi ta truyền dữ liệu cho một thuộc tính không được phép truy cập.

+ `__get()`: khi đọc dữ liệu từ một thuộc tính không được phép truy cập.

+ `__isset()`: được gọi khi gọi hàm isset() hoặc empty() trên một thuộc tính không được phép truy cập.

+ `__unset()`: được gọi khi hàm unset() được sử dụng trong một thuộc tính không được phép truy cập.

+ `__call()`: được gọi khi ta gọi một phương thức không được phép truy cập trong phạm vi của một đối tượng.

+ `__callStatic()`: được kích hoạt khi ta gọi một phương thức không được phép truy cập trong phạm vi của một phương thức tĩnh.

+ `__toString()`: phương thức này giúp class chỉ định xem sẽ in ra cái gì khi nó được dùng.

+ `__invoke()`:phương thức này được gọi khi một lệnh cố gắng gọi một đối tượng như một hàm.

+ `__sleep()`: được gọi khi serialize() một đối tượng.

+ `__wakeup`: được gọi khi unserialize() đối tượng.

+ `__set_state()`: được sử dụng khi chúng ta var_export một object. 

+ `__clone()`: được sử dụng khi chúng ta clone một object.

+ `__debugInfo()`: được gọi khi chúng ta sử dụng hàm vardump().
## 2. Ứng dụng magic function trong Eloquent
Ở trên chúng ta đã có khái niệm về các magic function rồi phần này mình sẽ giới thiệu về 4 magic function được dùng trong Eloquent laravel:

+ `__get()`
+ `__set()`
+ `__call()`
+ `__callStatic()`

Như mọi người đã biết thì hàm `__get()` sẽ được gọi khi chúng ta truy xuất vào 1 thuộc tính không được phép truy cập hoặc không tồn tại trong class, vậy khi ta truy xuất vào 1 thuộc tính trong Eloquent thì laravel sẽ xử lí ra sao,  Hãy xem source code của Laravel với hàm `__get()`

```php
namespace Illuminate\Database\Eloquent;

abstract class Model implements ArrayAccess, Arrayable, Jsonable, JsonSerializable, QueueableEntity, UrlRoutable
{

...

    /**
     * Dynamically retrieve attributes on the model.
     *
     * @param  string  $key
     * @return mixed
     */
    public function __get($key)
    {
        return $this->getAttribute($key);
    }

...

}

```


Như các bạn thấy, khi người dùng truy cập đến 1 property của Model, Laravel sẽ gọi đến hàm `getAttribute()`

```php
namespace Illuminate\Database\Eloquent\Concerns;

trait HasAttributes
{

...

    /**
     * Get an attribute from the model.
     *
     * @param  string  $key
     * @return mixed
     */
    public function getAttribute($key)
    {
        if (! $key) {
            return;
        }

        // If the attribute exists in the attribute array or has a "get" mutator we will
        // get the attribute's value. Otherwise, we will proceed as if the developers
        // are asking for a relationship's value. This covers both types of values.
        if (array_key_exists($key, $this->attributes) ||
            $this->hasGetMutator($key)) {
            return $this->getAttributeValue($key);
        }

        // Here we will determine if the model base class itself contains this given key
        // since we don't want to treat any of those methods as relationships because
        // they are all intended as helper methods and none of these are relations.
        if (method_exists(self::class, $key)) {
            return;
        }

        return $this->getRelationValue($key);
    }

...

}

```

Mỗi model có một property là `$attributes` trong đó lưu giá trị của tất cả các trường. Ngay cả khi bạn muốn truy cập đến một property không có trong mảng `$attributes`, bạn vẫn còn có cơ hội tìm thấy giá trị đó thông qua `Accessor` hoặc `relationValue`. Với `Accessor`, bạn có thể định nghĩa hàm để lấy bất cứ giá trị nào thông qua một quy tắc chung. Với `relationValue`, bạn có thể lấy giá trị từ các bảng liên quan thông qua việc định nghĩa quan hệ.


Điều tương tự cũng làm được với hàm `__set()` khi ta truyền dữ liệu cho 1 thuộc tính không được phép truy cập hoặc trong tồn tại trong class

```php
namespace Illuminate\Database\Eloquent;

abstract class Model implements ArrayAccess, Arrayable, Jsonable, JsonSerializable, QueueableEntity, UrlRoutable
{

...

    /**
     * Dynamically set attributes on the model.
     *
     * @param  string  $key
     * @param  mixed  $value
     * @return void
     */
    public function __set($key, $value)
    {
        $this->setAttribute($key, $value);
    }

...

}

```

```php
namespace Illuminate\Database\Eloquent\Concerns;

trait HasAttributes
{

...

    /**
     * Set a given attribute on the model.
     *
     * @param  string  $key
     * @param  mixed  $value
     * @return mixed
     */
    public function setAttribute($key, $value)
    {
        // First we will check for the presence of a mutator for the set operation
        // which simply lets the developers tweak the attribute as it is set on
        // the model, such as "json_encoding" an listing of data for storage.
        if ($this->hasSetMutator($key)) {
            return $this->setMutatedAttributeValue($key, $value);
        }

        // If an attribute is listed as a "date", we'll convert it from a DateTime
        // instance into a form proper for storage on the database tables using
        // the connection grammar's date format. We will auto set the values.
        elseif ($value && $this->isDateAttribute($key)) {
            $value = $this->fromDateTime($value);
        }

        if ($this->isJsonCastable($key) && ! is_null($value)) {
            $value = $this->castAttributeAsJson($key, $value);
        }

        // If this attribute contains a JSON ->, we'll set the proper value in the
        // attribute's underlying array. This takes care of properly nesting an
        // attribute in the array's value in the case of deeply nested items.
        if (Str::contains($key, '->')) {
            return $this->fillJsonAttribute($key, $value);
        }

        $this->attributes[$key] = $value;

        return $this;
    }

...

}

```

Laravel cung cấp `Accessor` và `Mutator` cho phép bạn tùy biến phương thức `__get()`, `__set()`, qua đó giúp cho model được sử dụng linh hoạt hơn và ngắn gọn hơn. Là một người làm việc với Laravel, tôi rất mong các bạn có thể sử dụng thuần thục `Accessor` và `Mutator` qua đó giúp code trở nên đẹp hơn.


-----


Ở phía trên khi so sánh về hiệu suất thì mình có nói là `Eloquent` chậm hơn `Query Builder` vậy chúng ta cùng tìm hiểu nguyên nhân nhé.

Bình thường chúng ta vẫn sử dụng các thao tác với database như: thêm, sửa, xóa, ...Tương ứng với các thao tác trên thì ta hay sử dụng các hàm như: insert, update, delete.

Nếu mọi người dùng Query Builder để thao tác trực tiếp với database thì ta sẽ tìm thấy các hàm trên trong Query Builder.

Nhưng nếu dùng Eloquent thì các hàm trên sẽ không tìm thấy trong source code Eloquent, vậy laravel đã dùng cách nào để xử lí vấn đề trên khi ta dùng Eloquent truy xuất đến các hàm trên.

Đầu tiên chúng ta sẽ quay lại về định nghĩa 2 hàm magic function:
+ `__call()`: được gọi khi ta gọi một phương thức không được phép truy cập hoặc không tồn tại trong class qua một đối tượng.
    ```php
    $post = new Post();

    $post->where('id', '>', 5)->get();
    ```
+ `__callStatic()`: được gọi khi ta gọi một phương thức không được phép truy cập hoặc không tồn tại trong class qua một phương thức tĩnh.
    ```php
    Post::where('id', '>', 5)->get();
    ```

Vậy khi gọi đến phương thức không tồn tại trong `Model` qua một đối tượng thì hàm `__call()` sẽ được gọi, hãy xem source code của laravel với hàm `__call()`

```php
namespace Illuminate\Database\Eloquent;

abstract class Model implements ArrayAccess, Arrayable, Jsonable, JsonSerializable, QueueableEntity, UrlRoutable
{

...

    /**
     * Handle dynamic method calls into the model.
     *
     * @param  string  $method
     * @param  array  $parameters
     * @return mixed
     */
    public function __call($method, $parameters)
    {
        if (in_array($method, ['increment', 'decrement'])) {
            return $this->$method(...$parameters);
        }

        return $this->newQuery()->$method(...$parameters);
    }
    
...

}

```

Vậy là có thể thấy, các hàm không có ở `Eloquent` sẽ được tự động chuyển đến gọi thông qua kết quả của `newQuery()`. Xin được nói thêm rằng `newQuery()` trả lại `Eloquent Builder`. Vậy `Eloquent Builder` có liên quan gì đến `Query Builder` mà chúng ta nói ở trên không.

Câu trả lời là bản thân `Eloquent Builder` khi khởi tạo đã được inject vào một thực thể của `Query Builder` thông qua cơ chế của DI. Qua đó, `Eloquent Builder` có thể dễ dàng thực hiện các hàm của `Query Builder`.

Còn khi gọi đến phương thức không tồn tại trong `Eloquent` qua phương thức tĩnh thì hàm `__callStatic()` sẽ được gọi, tiếp tục xem source code của laravel với hàm `__callStatic()`

```php
namespace Illuminate\Database\Eloquent;

abstract class Model implements ArrayAccess, Arrayable, Jsonable, JsonSerializable, QueueableEntity, UrlRoutable
{

...

    /**
     * Handle dynamic static method calls into the method.
     *
     * @param  string  $method
     * @param  array  $parameters
     * @return mixed
     */
    public static function __callStatic($method, $parameters)
    {
        return (new static)->$method(...$parameters);
    }
    
...

}

```

Trong hàm này cách laravel xử lí là sẽ khởi tạo 1 đối tượng của lớp gọi nó (new static) và tiếp tục gọi đến phương thức đó. Đến đoạn này thì nếu phương thức đó không tồn tại trong Model thì hàm `__call()` tiếp tục được gọi, luồng xử lí lại quay lại như gọi hàm `__call()` mình đã giải thích ở trên.

Ok, vậy là bạn đã hiểu được cách `Eloquent Model` sử dụng `__call()` và `__callStatic()` cũng như con đường thực hiện một hàm khá phổ biến của nó. Sự phức tạp là điều có thể thấy rõ ở đây. Câu hỏi đặt ra là tại sao lại phải phức tạp như vậy, tại sao không chỉ dùng 1 class, hay tại sao phải dùng đến hàm static mà chung quy lại quay lại hàm non-static.

Thứ nhất, việc chia `class` ra khiến cho kiến trúc của Laravel trở nên rõ ràng. `Eloquent Model` đảm nhiệm các thao tác cơ bản với model là `CRUD` (Creat-Read-Update-Delete) và các thao tác liên quan đến quan hệ giữa các bảng (`relationship`). `Query Builder` đóng vai trò làm việc trực tiếp với `database` thông qua các truy vấn SELECT, UPDATE,... Có thể nói `Query Builder` là tầng dưới của `Eloquent Model`. 2 tầng này liên kết với nhau thông qua `Eloquent Builder`. 1 kiến trúc mới nhìn có vẻ phức tạp nhưng lại khá rõ ràng và mạch lạc. Qua đó giúp cho source code của Laravel trở nên mềm dẻo, dễ dàng thích ứng với các thay đổi. Bạn cũng không phải định nghĩa các hàm của `Query Builder` ở `Eloquent Model` bởi đã có các `magic function` thực hiện công việc kết nối cho bạn.

Thứ hai, việc bổ sung gọi hàm `static` khiến cho `model` của Laravel hoạt động hết sức tiện lợi. Các thao tác được gọi ngắn nhất có thể thông qua `method chaining`. Bạn không phải tạo ra một `instance` của `class` để gọi `method`, mà có thể gọi trực tiếp thông qua cách gọi `static`. Tôi thực sự rất thích cách tổ chức code này.

# Tài liệu tham khảo
* https://viblo.asia/p/laravel-and-php-magic-methods-157G5o7ORAje
* https://techtalk.vn/so-sanh-eloquent-orm-va-query-builder-trong-laravel.html
* http://php.net/manual/en/language.oop5.magic.php