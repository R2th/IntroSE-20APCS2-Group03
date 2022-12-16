## Giới thiệu
Bạn đã bao giờ phải hiển thị một tổ hợp các cột dữ liệu từ bảng hoặc xử lý dữ liệu trước khi lưu nó vào cơ sở dữ liệu. Câu trả lời có lẽ là có với tất cả những developer như chúng ta. Đây là ví dụ mà khái niệm Accessor và Mutators có ích.
Vậy thì bây giờ chúng ta sẽ cùng đi tìm hiểu ý nghĩa của hai khái niệm này và cách chúng hoạt động nhé.

## Accessors
Giả sử chúng ta có hai trường trong bảng users là first_name và last_name, và mặc dù hai trường này có thể được sử dụng khi cần, nhưng đôi khi chúng ta cần kết hợp cùng lúc hai trường này để hiển thị tên đầy đủ dưới dạng một trường duy nhất, thông thường cách để lấy toàn bộ hai trường này sẽ như sau:

`{{ $user->first_name . ' ' . $user->last_name }}`

Với Accessors trong Laravel, chúng ta có thể thực hiện yêu cầu trên bằng cách thêm một thuộc tính cho model như sau.

`{{ $user->full_name }}`

```
public function getFullNameAttribute()
{
    return $this->first_name . " " . $this->last_name;
}
```

Như các bạn đã thấy, ở đây chúng ta tạo ra một hàm với tên là `getFullNameAttribute`, hàm này phải được viết theo kiểu camelCase để thực hiện việc lấy full name mỗi khi gọi đến thuộc tính full_name. Vậy thuộc tính full_name này ở đâu ra? Có lẽ đọc từ đầu bài đến đây thì các bạn đoán rằng thuộc tính này do function getFullNameAttribute tạo ra cho model User, ok các bạn đoán đúng rồi đấy.

### Định nghĩa một Accessors
Qua ví dụ trên chúng ta có thể hiểu rằng, nếu muốn tạo một accessors trong một model bất kỳ, thì function của chúng ta phải có có có quy tắc như sau `get[property_name]Attribute`, nghĩa là function phải có tiền tốt `get` rồi đến `tên thuộc tính` và hậu tố là `Attribute`.

Rõ ràng Accessors là một khái niệm rất tiện lợi khi làm việc với model, nhưng có một nhược điểm là bạn không thể sử dụng tên thuộc tính này trong các truy vấn với query builder trong Eloquen như bất kỳ trường nào khác, bạn chỉ có thể sử dụng thuộc tính này khi bạn đã có một `collection` (mình cũng không biết gọi như thế nào cho chuẩn nữa nhưng gọi collection thì mình nghĩ cũng không sai đâu :)) ) nhưng không phải trên các truy vấn trực tiếp trong Eloquent mà là sau khi ta đã có các trường của bảng, các bạn xem ví dụ bên dưới để rõ hơn.

Cho ví dụ:

1. `$users = User::orderBy('full_name')->get();`

Đoạn code trên sẽ không thể chạy được.

2. `$users = User::all()->sortBy('full_name');`

Đoạn code ở ví dụ thứ 2 sẽ hoạt động vì sau khi có được collection của đối tượng user, chúng ta có thể sắp xếp với thuộc tính `full_name` bằng cách sử dụng hàm sortBy ().

## Mutators
Nếu bạn đã làm việc với bất kỳ ngôn ngữ hướng đối tượng nào, bạn sẽ quen thuộc với các phương thức `getter` và `setter`. Vì vậy, có thể xem các `accessor là phương thức getter` và `mutators là phương thức setter`.

Giả sử chúng ta có một trường `company_name` và muốn nó được viết hoa khi được lưu trữ vào cơ sở dữ liệu. Chúng ta có thể làm được điều đó bằng cách sử dụng khái niệm Mutators như sau:

```
public function setCompanyNameAttribute($value)
{
    $this->attributes['company_name'] = strtoupper($value);
}
```
Và sau đó chúng ta có thể sử dụng như thế này:
```
$user->company_name = Input::get('company');
$user->save();
```
### Định nghĩa một Mutators
Cũng tương tự như `Accessors` nhưng ngược lại, khi định nghĩa một `Mutators` thì chúng ta khai báo một function với tiền tố thay vì `get` là `set`, tiếp theo là `property_name` và hậu tố là `Attribute` với tên function được viết theo kiểu `camelCase` => `function set[property_name]Attribute`.

## Kết thúc
Hai khái niệm Accessors và Mutators này được sử dụng khá nhiều trong các project Laravel, hy vọng bài viết này mang lại thông tin hữu ích cho các bạn, cảm ơn các bạn đã đọc và hẹn gặp lại ở bài viết tiếp theo.