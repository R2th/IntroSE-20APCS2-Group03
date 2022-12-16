# 1. Giới thiệu

-----


Chào mọi người mình xin phép chia sẻ về **custom collection object trong Elonquent** bài viết này được dịch lại đa phần từ : https://heera.it/extend-laravel-eloquent-collection-object .

khả năng dịch của mình có giới hạn nên dịch có sai xót xin mọi người ném đá nhẹ nhẹ thôi ạ  (bow) .

-----



## 2. Mở rộng đối tượng trong Eloquent? 
- tất cả các tập hợp các kết quả trả về bơi Eloquent thông qua phương thức **Get** hoặc một **relationship** . sẽ trả về một **Collection Object**  ( Một tập hợp các đối tượng) . 
Đối tượng này thực hiện giao diện [IteratorAggregate](https://symfonycasts.com/screencast/oo-ep4/iterator-aggregate) PHP để nó có thể được lặp đi lặp lại như một mảng  . Tuy nhiên, đối tượng này cũng có nhiều phương pháp hữu ích khác để làm việc với các tập kết quả .
### Ví dụ: 
Chúng ta có thể xác định xem một tập kết quả có chứa khóa chính đã cho hay không, bằng  phương thức **contains**:
```
$users = User::all();
```
if ($users->contains(5))
```
{
    // Một bản ghi có sẵn với khóa chính (về cơ bản là id) là 5
}
```
Bạn cũng có thể sử dụng một cái gì đó như thế này:

```
User::all()->each(function($user){
    echo $user->username;
});
```
Hoặc bạn có thể nhận được một mục duy nhất từ ​​bộ sưu tập bằng cách sử dụng chỉ mục đó như:
```
$users = User::all();
// Print username from first record
echo $users->get(0)->username;
// Print username from third record
echo $users->get(2)->username;
```
Lớp cơ sở cho **Collective Object** này là **\Illuminate\Support\Collection.php** và lớp này chứa một loạt các phương thức có thể được áp dụng trên một **Collective Object** ,  lớp này mở rộng cơ sở và lớp con này cũng chứa một số phương thức hữu ích để sử dụng với một đối tượng . Khi chúng ta gọi một cái gì đó giống như **$users = User::all();** chúng ta có một đối tượng bộ sưu tập và đối tượng này là một thể hiện của **\Illuminate\Database\Eloquent\Collection**, nó mở rộng lớp cơ sở **\Illuminate\Support\Collection.php**. 

**Laravel** thực sự là một khung mạnh mẽ và linh hoạt và nó đã cung cấp cho chúng ta rất nhiều cách để mở rộng chức năng cốt lõi. Trong trường hợp này, nếu chúng ta muốn thêm nhiều phương thức trong đối tượng bộ sưu tập, chúng ta có thể làm điều đó bằng cách mở rộng **\Illuminate\Database\Eloquent\Collection.php** và ghi đè **newCollection** phương thức của lớp **\Illuminate\Database\Eloquent\Model.php** trong **Eloquent Model**. Trên thực tế, điều này **Model.php** chịu trách nhiệm cho **Eloquent ORM** và lớp này chứa một phương thức công khai, đó là:
```
public function newCollection(array $models = array() ) {
    return new Collection($models);
}
```
Phương thức này trả về một đối tượng và chúng ta có thể ghi đè phương thức này trong **Eloquent Model** và có thể trả về một đối tượng tùy chỉnh với các phương thức tùy chỉnh của mình trong đó bằng cách mở rộng lớp **\Illuminate\Database\Eloquent\Collection.php** . 
```
<?php namespace Extensions;
```
class CustomCollection extends \Illuminate\Database\Eloquent\Collection {
    // define custom methods here, for example
    public function foo()
    {
        // ...
    }
```
}
```
Bây giờ nếu chúng ta tạo một Eloquent Model :
```
class User extends Eloquent {
    // Override the parent method
    public function newCollection(array $models = Array())
    {
        return new Extensions\CustomCollection($models);
    }
```
}


Nếu chúng ta sử dụng **User::all()->foo()** thì nó sẽ gọi phương thức trong **CustomCollection** vì chúng ta đã trả về lớp **CustomCollection** chứa phương thức này. Bằng cách này, chúng ta có thể thêm các phương thức tùy chỉnh của mình và có thể áp dụng các phương thức đó trên bất kỳ đối tượng Eloquent nào .

Mình đã thực hiện điều này, đã thêm một số phương thức tùy chỉnh vào đối tượng bằng cách mở rộng lớp bộ sưu tập và hoạt động rất tốt. Đây là quá trình từng bước mà mình đã thực hiện, bạn có thể làm theo và thử nó, lúc đầu tạo lớp customCollection, mình đã đặt nó vào **app**  trong thư mục :

```
// app/extensions/customCollection.php
<?php namespace Extensions;
 
class CustomCollection extends \Illuminate\Database\Eloquent\Collection {
    // Added custom method
    public function toTable($options = null)
    {
 $header = $atts = '';
 $items = $this->toArray();
 $header_keys = array_keys($items[0]);
 
 if(!is_null($options)) {
 if(array_key_exists('only', $options)) {
 $header_keys = $options['only'];
 }
 if(array_key_exists('attributes', $options)) {
 $attr = $options['attributes'];
 }
 }
 
 // Thead
 if(is_null($options) || (!isset($options['header']) || isset($options['header']) && $options['header'] != false)) {
 $header = "<thead><tr>";
 foreach ($header_keys as $value) {
 $header .= "<th>" . ucwords(str_replace('_', ' ', $value)) . "</th>";
 }
 $header .= "</tr></thead>";
 }
 
 // Tbody
 $tbody = "<tbody>";
 foreach ($items as $values) {
 $tbody .= "<tr>";
 foreach($header_keys as $key){
 $tbody .= "<td>" . $values[$key] . "</td>";
 }
 $tbody .= "</tr>";
 }
 $tbody .= "</tbody>";
 
 // Build attributes (id, class, style etc)
 if(isset($attr)) {
 foreach ($attr as $key => $value) {
 $atts .= " " . $key . "='" . $value . "'";
 }
 }
 
 // Return only Tbody (if table == false)
 if(!is_null($options) && isset($options['table']) && $options['table'] == false) return $tbody;
 
 // Return table with attributes (class, id, style etc)
 else return "<table $atts>" . $header . $tbody . "</table>";
 }
}
```

Trong composer.json thêm  **"app/extensions"** trong **autoload > classmap** : 
```
"autoload": {
    "classmap": [
        "app/commands",
        // more...
        "app/extensions"
        ]
    }
```


Sau đó, mình đã tạo một class **BaseModel** trong app/models thư mục của mình và tất cả các Eloquent mình đều mở rộng lớp cơ sở này:
```
<?php
class BaseModel extends Eloquent {
 
 public function newCollection(array $models = Array()) {
 return new Extensions\CustomCollection($models);
 }
}
```

Vì vậy, tất cả các mô hình  **Eloquent** của mình đều mở rộng và mình có thể sử dụng **customCollection** , các phương thức trong bất kỳ mô hình nào.
### Ví dụ:  
Mình có một Model User :
```

<?php
 
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;
 
class User extends BaseModel implements UserInterface, RemindableInterface {
    // code here
}
```

 bây giờ mình có thể sử dụng **User::all()->toTable()** , ở đây phương thức **toTable()**  được thêm một lớp **customCollection** của mình và nó là gì, chỉ cần tạo một bảng HTML . 
```
// In a controller
$users = User::all();
$options = array(
    'only' => array('id', 'first_name', 'last_name', 'username', 'email', 'bio'),
    'attributes' => array( 'class' => 'table', 'id' => 'tbl1' )
);

return View::make('user.index')
->with('users', $users)
->with('options', $options);
```

ngoài file view : 
```
@extends('layouts.master')
@section('content')
    {{ $users->toTable($options) }}
@stop
```

![](https://images.viblo.asia/1a8d5f34-3892-4de3-8f0a-3f848ca5a850.png)

phương thức **toTable()**  này chỉ là một phương thức tùy chỉnh để dễ dàng tạo bảng với **eloquent collection** , đây chỉ là một ví dụ về việc thêm nhiều phương thức trong **eloquent collection** .


-----
# 3. Kết thúc 
Có rất nhiều phương thức hữu ích có sẵn trong  Collection  Object mọi người có thể tham khảo thêm ở  [document](https://laravel.com/docs/5.8/collections ) , 

Thanks for watching !