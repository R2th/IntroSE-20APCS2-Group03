Laravel có rất nhiều function helpers hỗ trợ khi làm việc với paths, arrays và strings. Hầu như chúng ta không thể biết hết tất cả các function helpers. Nhưng có một số functions rất hữu ích mà ta nên tìm hiểu kỹ một chút. Trong bài viết này, mình xin giới thiệu 10 function helpers mà bạn nên biết.

## 1. Logger
Function logger có thể ghi message với một `debug` vào log.

```
logger('Product was changed.', ['id' => $product->id]);
```

Kết quả trong file log sẽ hiển thị dòng sau:
```
[2019-06-22 09:53:22] local.DEBUG: Product was changed. {"id":4}
```

Nếu bạn không thêm bất kỳ giá trị nào vào function `logger`, nó sẽ return về một Logger instance. Điều này cho phép bạn ghi các messages khác nhau vào log. Ví dụ như sau:

```
logger()->error('An error occurred');
```

Kết quả trong file log sẽ có thêm dòng sau:
```
[2019-06-22 09:56:12] local.ERROR: An error occurred
```

## 2. Dividing an array
Phương thức `Arr :: split ()` cho phép bạn chia một mảng thành hai mảng. Phương thức divide trả về hai mảng. Một mảng chứa các keys và mảng kia chứa các values.
```
use Illuminate\Support\Arr;
[$keys, $values] = Arr::divide(['name' => 'James', 'age' => 33]);
```

Kết quả
```
$keys: ['name', 'age']
$values: ['James', 33]
```

## 3. Blank
Function `blank` giúp check một giá trị có phải `blank` hay không! Giá trị `blank` ở đây có nghĩa là *null*,  một string chỉ chứa toàn ký tự *whitespaces* hoặc *empty array*, *empty string*.

> Lưu ý:
> Booleans không phải là giá trị `blank`

Ví dụ
```
blank('');
blank('   ');
blank(null);
blank(collect());
// Kết quả trả về: true

blank(0);
blank(true);
blank(false);
// Kết quả trả về: false
```

Ngược với function `blank` là function `filled` .

## 4. Dumping variables
Hàm `dump` rất tiện dụng trong việc `debug` một hoặc nhiều biến.
```
dump($variable);
```

Trường hợp muốn `dump` nhiều biến thì ta chỉ cần truyền các biến vào trong hàm `dump` :
```
dump($var1, $var2, $var3);
```

Bên cạnh function `dump` này, còn có function `dd`, có nghĩa `dump và die`, hoạt động tương tự như `dump` . Thay vì chỉ dump biến, hàm `dd` sẽ kết thúc việc thực thi tập lệnh.

## 5. Paths
Laravel có nhiều function helper hỗ trợ bạn lấy các đường dẫn đến các thư mục nhất định. Dưới đây là một số function Laravel cung cấp:

* app_path
* base_path
* config_path
* database_path
* public_path
* resource_path
* storage_path

```
echo storage_path();
// Output:
"C:\Path\To\My\Project\storage"
```

Bạn cũng có thể truyền một đối số cho các function helper `path`, ví dụ truyền vào tên file để lấy đường dẫn đến file đó:

```
echo storage_path('attachment.pdf');
// Output:
"C:\Path\To\My\Project\storage\attachment.pdf"
```

## 6. Slug
Nếu bạn muốn custom lại URL từ một chuỗi nhất định, thì bạn có thể dùng `Str::slug`:

```
$slug = Str::slug('Laravel Is Awesome');
$slug: "laravel-is-awesome"
```

Mặc định dấu cách các từ trong slug là dấu '-', nhưng nếu bạn muốn viết lại thì chỉ việc truyền thêm ký tự vào function slug:

```
$slug = Str::slug('Laravel Is Awesome', '&');
$slug: "laravel&is&awesome"
```

## 7. Array has value
Phương thức `Arr:has` có thể check xem một hoặc nhiều items có tồn tại trong array hay không bằng cách sử dụng  ký tự '.' .

Để check nhiều items, chỉ cần truyền vào function một array thay vì một string:

```
use Illuminate\Support\Arr;
$blogs = ['blog' => ['title' => 'My blog', 'published' => true]];
$contains = Arr::has($blogs, 'blog.title'); 
// true
$contains = Arr::has($blogs, ['blog.title', 'blog.published']); 
// true
$contains = Arr::has($blogs, ['blog.title', 'blog.author']); 
// false
```

## 8. UUID
Phương thức `Str::uuid` tạo ra một UUID:

```
use Illuminate\Support\Str;
echo(string) Str::uuid(); // "2ad4abcc-8adc-47b6-b21e-9e5497a8af1b"
```

## 9. Optional

Hàm `optional`  cho phép bạn truy cập các thuộc tính hoặc gọi các phương thức trên một đối tượng mà bạn chuyển qua làm đối số. Bất kỳ đối số nào cũng được chấp nhận bởi function này.

Nếu đối tượng được truyền vào là *null*, các thuộc tính và phương thức sẽ trả về *null* thay vì gây ra error.

```
print optional($blog->author)->full_name;
```

Nếu author tồn tại thì full name của author sẽ được in ra. Trường hợp, không tồn tại author thì sẽ không gây ra error mà trả về *null*.

## 10. Pluck
Phương thức `Arr::pluck` lấy tất cả các value của một key đã cho từ array:

```
$parents = [
    ['parent' => ['id' => 1, 'name' => 'James']],
    ['parent' => ['id' => 8, 'name' => 'Lisa']],
];
Arr::pluck($parents, 'parent.name'); // ['James', 'Lisa']
```


Trên đây là 10 function helper Laravel hữu ích mà mình chia sẻ cho các bạn. Hy vọng các bạn có thể áp dụng trong project của mình. Bài viết được mình tham khảo tại [đây] (https://medium.com/swlh/10-laravel-helpers-that-you-should-know-9edbb78c2b0a) của tác giả Daan.