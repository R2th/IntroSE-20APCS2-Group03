- Xin chào tất cả các bạn, bài viết này mình xin chia sẻ một chút kiến thức mình tìm hiểu được về Lambda, Closure và callback trong PHP, mong mọi người theo dõi.
### 1 Lambda
**1.1) Lambda là gì**

- **Lambda** là một **anonymous function** (hàm ẩn danh) nó có thể khai báo,định nghĩa ở bất kỳ đâu và không có khả năng tái sử dụng.
- **Lambda** chỉ tồn tại trong phạm vi mà nó định nghĩa, vì vậy nếu như sử dụng nó ngoài phạm vì thì hàm này sẽ không còn tác dụng nữa
- **Lambda** có thể gán vào 1 biến để sử dụng

**1.2) Cú pháp**

- Khai báo hàm thông thường trong PHP:

```php
function sayHello() {
  return "Xin chào!";
}
echo sayHello();
```

- Để khai báo **lambda** trong PHP chúng ta sử dụng cú pháp:
```php
function (argument)
{
    //code
}
```


- Hoặc có thể sử dụng hàm **create_function()** trong PHP

```php
create_function('', argument);
```

- Trong đó **argument** là các tham số bạn muốn truyền vào tham số ẩn danh.

- Các hàm thông thường muốn thực hiện được chúng ta cần gọi đến tên của nó, còn **lambda** thì là hàm nặc danh nên để gọi được thì ta sẽ gán nó với một biến hoặc truyền nó như một tham số

```php
$hello = function () {
  return "Xin chào!";
} 
// Gọi hàm này
echo $hello();
// Xin chào!
```

- Ở trên chúng ta đã gán **lambda** với một biến, còn nếu ta muốn truyền nó như một tham số sẽ như sau

```php
function speak($message){
  echo $message();
}

// Gọi hàm
speak(function(){
  return "Xin chào";
});
```

- Sử dụng hàm nặc danh hay **Lambda** là rất hữu ích khi các chức năng chúng ta chỉ cần sử dụng một lần duy nhất.
- Thông thường, chúng ta sẽ cần một hàm nào đó để làm một công việc, nhưng nó không có nghĩa là chúng ta sẽ dùng nó trong phạm vi global. Thay vì có một hàm sử dụng một lần và sau đó không dùng ở đâu nữa, chúng ta có thể sử dụng một hàm ẩn danh để thay thế.

### 2) Closure
**2.1) Closure là gì**
- **Closure** cơ bản cũng giống một **lambda**, nhưng **closure** có thêm chức năng là có thể sử dụng các biến bên ngoài phạm vi mà nó được tạo ra.
- Một đặc điểm nhận dạng **Closure** function là nó sẽ có từ khoá **use** phía sau tên của hàm.

**2.2) Cú pháp**

-Để khai báo **closure** trong PHP chúng ta sẽ sự dụng cú pháp:
```php
function (argument) use (scope) {
    //code
}
```


- Trong đó:
     - **argument** là các tham số các bạn muốn truyền vào trong **closure**
     - **scope** là danh sách các biến phía ngoài **closure** mà các bạn muốn sử dụng trong **closure**.

**Ví dụ:**

```php
$name = 'Dau Xanh';

$sayHello = function () use ($name) {
    return "Xin chào $name";
};

echo $sayHello();
//Kết quả: Xin chào Dau Xanh
```

- Trong ví dụ trên bạn có thể thấy **Closure** có thể truy xuất biến **$name** vì nó được khai báo trong từ khóa **use** trong phần định nghĩa **closure**. Giả sử nếu ta thay đổi giá trị của biến **$name** trong **closure** thì nó không hề ảnh hưởng gì đến giá trị gốc của biến **$name** ở ngoài, Để có thể thay đổi được giá trị của biến **$name** ở ngoài thì ta cần phải truyền tham chiếu (**&$name**) của biến đó vào trong từ khóa **use**

**Ví dụ**

```php
$i = 0;

$closure = function () use ($i){ 
    // ở đây mình tăng biến $i lên
   ++$i; 
};
// Sau đó gọi hàm
$closure();
// Kết quả $i ở ngoài không thay đổi
echo $i; 
// 0

$i = 0;
// Tăng biến $i trong phạm vi Closure nhưng sử dụng con trỏ tham chiếu &
$closure = function () use (&$i){ 
   ++$i; 
};
// Gọi hàm
$closure();
// Biến $i ở ngoài đã thay đổi
echo $i;
// 1
```

- **Closure** là rất hữu dụng khi sử dụng các hàm PHP mà chấp nhận một hàm **callback** kiểu như **array_map**, **array_filter**, **array_walk**...
- Ví dụ tiếp theo chúng ta sử dụng hàm **array_map** để nhân các phần tử với một hệ số được khai bao trước

**Ví dụ**

```php
// hệ số nhân
$multiplier = 2;

$arr = [1, 2, 3, 4, 5];

$newArr = array_map(function($item) use ($multiplier) {
    return $item * $multiplier;
}, $arr);


var_dump($newArr);
```

- Kết quả:

```
array(5) {
  [0]=>
  int(2)
  [1]=>
  int(4)
  [2]=>
  int(6)
  [3]=>
  int(8)
  [4]=>
  int(10)
}
```

- Trong ví dụ trên, chúng ta thấy rằng không cần thiết phải tạo ra một hàm chỉ để nhân hai số với nhau, do đó chúng ta sử dụng **Closure** để thực hiện công việc như thế này và sau đó không bao giờ dùng đến nó.
- **Closure** là một khái niệm rất hay dùng trong các framework PHP hiện nay, việc sử dụng **Lambda** và **Closure** để thực hiện các công việc nhỏ mà không làm ảnh hưởng đến **namespace** của dự án và đặc biệt sử dụng nó rất tốt trong **callback**.
- Ví dụ trong Laravel

```php
Route::get('user/(:any)', function ($name) {
  return "Xin chào " . $name;
});
```

### 3 Callback

**3.1) Callback là gì**

- **Callback** là khái niệm một hàm được truyền vào một hàm khác như một tham số để nó có thể được thực hiện trước hoặc sau một sự kiện hoặc một thay đổi trạng thái.

**Ví dụ**

```php
function sayHello($callback) {
    echo "Xin chào!</br>";
    // code
    // ...
    $callback();
}
function sayGoodbye() {
    echo "Tạm biệt!";
}

sayHello('sayGoodbye');
```

- Phía trên mình có định nghĩa hai hàm **sayHello** và **sayGoodbye** sau đó mình truyền hàm **sayGoodbye** vào hàm **sayHello** dưới dạng là tham số, trong hàm **sayHello** thì mình có thể code các thứ gì đó, sau đó cuối cùng mình sẽ gọi đến phần **$callback** (chính là hàm **sayGoodbye**) ở cuối cùng rồi kết thúc
- Trên là một ví dụ đơn giản về callback trong PHP, hàm **sayGoodbye** được truyền vào hàm **sayHello** như một tham số.
- Ví dụ trên đây khá dễ hiểu nhưng chưa nói đến việc sử dụng kết quả của hàm gọi trong hàm được gọi, mình sẽ đi qua một ví dụ sau

**Ví dụ**

```php
function sayHello($first_name, $last_name, $callback) {
    $full_name = $first_name . ' ' . $last_name;
    $callback($full_name);
}
function formatName($full_name) {
    echo "<h2>Xin chào $full_name <h2>";
}

sayHello('Dau', 'Xanh', 'formatName');
```

- Trong ví dụ trên thì khi gọi đến hàm **callback** thì đồng thời mình cũng truyền cho hàm **callback** giá trị** $full_name** vào trong hàm **callback**
- Bản chất của $callback(full_name) là gọi đến một hàm được xây dựng sẵn trong PHP đó là **call_user_func**, như vậy callback(full_name) tương đương với call_user_func(callback,full_name). Sử dụng **callback** có thể có lỗi xảy ra nếu chúng ta **callback** đến một hàm chưa được định nghĩa, vì vậy chúng ta cần kiểm tra xem có tồn tài **callback** hay không trước khi sử dụng

```php
function sayHello($first_name, $last_name, $callback) {
    $full_name = $first_name . ' ' . $last_name;
    if (is_callable($callback)) {
        call_user_func($callback, $full_name);
    }
}
function formatName($full_name) {
    echo "<h2>Xin chào $full_name <h2>";
}

sayHello('Dau', 'Xanh', 'formatName');
```

- **Callback** thường được sử dụng khi ứng dụng cần thực hiện một hàm khác dựa trên ngữ cảnh hoặc trạng thái, hay nói một cách khác là muốn thực hiện một việc gì đó khi một sự kiện xảy ra.

    - Sử dụng với các hàm nặc danh (anonymous function) hoặc với **Closure**.
    - Lập trình đa luồng (multiple thread).

**Lời kết**

- Như vậy mình đã trình bày xong đến mọi người về hàm ẩn danh lambda, closure và callback trong PHP. Cám ơn mọi người đã theo dõi bài viết của mình

**Nguồn tham khảo**

- https://www.php.net/manual/en/functions.anonymous.php
- https://allaravel.com/