Chào mọi người.

Có thể các bạn đang đọc bài viết này có đủ tự tin để nói với mọi người là mình đã làm việc với framework Laravel một cách thuần thục mà không gặp vướng mắc gì.

Nhưng mình cũng dám chắc có thể các bạn không biết hết được hết mọi thứ của Laravel, vì mình cũng từng như vậy =)) . Dưới đây mình xin tổng hợp lại một chút những tính năng rất hay mà không phải ai cũng biết. Let's start :point_down:

## 1. Cho phép 1 số IP truy cập vào project sau khi dùng artisan down

Các lệnh` php artisan down` rất hữu ích để sử dụng khi bạn cần phải đưa project Laravel vào trạng thái bảo trì hoặc khi nâng cấp hệ thống. Tuy nhiên, không sử dụng tùy chọn `--allow`, bạn không kiểm tra được những gì người dùng thông thường đang thấy. Để giải quyết vấn đề này, bạn có thể dùng tùy chọn `--allow=IP`để cho phép các IP có thể truy cập vào sau khi bạn đưa project vào maintain.

Bạn có thể đưa vào nhiều địa chỉ IP hoặc thậm chí là dải IP:
```
php artisan down --allow=127.0.0.1 --allow=192.168.0.0/16
```

Ngoài ra còn một số tùy chọn khác như là:
* **--message = "Upgrading Database"** // hiển thị thông báo đó cho người dùng của bạn trong khi trang web ngừng hoạt động
* **--retry** // giá trị thử lại, giá trị này sẽ được sử dụng cho giá trị header Retry-After HTTP.
Các bạn có thể tham khảo tại đây: [Maintenance Mode](https://laravel.com/docs/6.x/configuration#maintenance-mode)

## 2. Sử dụng truy vấn 'WHERE' nhiều trường?
Giả sử bạn muốn thực hiện truy vấn SQL sau:
```
SELECT * FROM `users`
WHERE
    `name` = 'some_name'
    AND `email` = 'some_email'
LIMIT 1
```
Với câu lệnh đơn giản như này, Laravel đã support sẵn function như là whereNameAndEmail or whereNameOrEmail để query dữ liệu 1 cách nhanh chóng.

```
\App\User::whereNameAndEmail('some_name','some@email')->first(); // Laravel sẽ tự động tìm ra cột mà câu lệnh của bạn đề cập đến
 
// Câu lệnh trên tương đương với:
\App\User::where('name', 'some_name')->where('email', 'som@_email')->first();
// Hoặc tương đương với:
\App\User::where(['name' => 'some_name', 'email' => 'some@email'])->first();
```

Và cũng như `and`, bạn cũng có thể thực hiện `or` như thế này:
```
\App\User::whereNameOrEmail('some_name','some@email')->first();
```
## 3. Eloquent find()có thể chấp nhận nhiều hàng
Thông thường trong quá trình làm việc mình thấy hay sử dụng hàm find để tìm thông tin của 1 record, nhưng 1 tác dụng nữa của hàm find đó chính là truy vấn nhiều records theo dạng mảng:

VD:
```
$rows = EloquentModel::find([1,4,6,11]);
```

Thông thường hàm find 1 id sẽ trả về 1 Model thì find array sẽ trả về 1 collection của các ids đó (tất nhiên là nếu các ids đó tồn tại nếu không sẽ là null).

## 4. Relationship Eloquent belongsTo có thể trả về một model mặc định nếu trả về null?
Chắc chắn nhiều người dùng phương thức belongsTo mà không biết rằng có thể set 1 giá trị default nếu nó trả về null.

Nếu bạn có một quan hệ (`belongsTo`, `MorphOne` hoặc `HasOne`), nó có thể đôi khi trả về null. Trong trường hợp đó, bạn có thể set một giá trị mặc định với phương thức `withDefault()`.

Nó sẽ tự động tìm ra loại object sẽ trả về, nhưng bạn cũng có thể đặt một số thuộc tính mặc định.

Đây là vài ví dụ:
```
public function user(){
    return $this->belongsTo('App\User')->withDefault();
}
 
//or
public function user(){
    return $this->belongsTo('App\User')->withDefault([
        'name' => 'Guest Author',
    ]);
}
 
// or
public function user(){
    return $this->belongsTo('App\User')->withDefault(function ($user) {
        $user->name = 'Guest Author';
    });
}
```
Quá hữu ích khi làm việc phải không nào? :D 

## 5. Lưu cache mãi mãi
Nếu bạn sử dụng tính năng cache, thông thường bạn sẽ gán key lưu giá trị với minutes:
```
$value = Cache::remember('users', $minutes, function () { //set lưu giá trị cache theo minutes 
    return DB::table('users')->get();
});
```

Nhưng bạn có biết, bạn có thể lưu giá trị mãi mãi như này không?
```
$value = Cache::rememberForever('users', function () { //Set giá trị mãi mãi
    return DB::table('users')->get();
});
```
Quả thực  mình cũng không hay dùng  :D

## 6. Eloquent: Tạo 1 model với data duplicate replicate()
Nếu bạn cần sao chép một đối tượng Eloquent, hãy sử dụng:
```
$new = SomeModel::first()->replicate(); // sao chép tất cả các trường
$new->save(); // Lưu lại
```

Phương thức `replicate()` còn cung cấp cho bạn chức năng bỏ qua 1 số thuộc tính chi sao chép bằng `$except = []`, ví dụ:
```
$new = User::first()->replicate(['password']); // sao chép tất cả các trường ngoại trừ trường password
$new->save(); // Lưu lại
````

## 7. Kiểm tra routes hiện tại
Chức năng thông thường sử dụng trong mọi project đó là active menu hiện tại. 

Nếu bạn muốn thêm một `class='active'` thông thường bạn có thể sử dụng `if(request()->is('control-panel') || request()->is('control-panel/change-email') || request()->is('control-panel/edit-profile') { ... }` kiểm tra URI hiện tại.

Tuy nhiên, bạn chỉ có thể sử dụng ký tự đại diện:
```
if (request()->is("control-panel*")) { ... }
```

Bạn có thể sử dụng `routeIs()` theo cách tương tự, nhưng với name của routes.

**Tip nhỏ:** 

Sử dụng `auth()->id()` thay vì `Auth::id()` và `Auth::user()->id`

## 8. Sử dụng simplePaginate thay vì paginate
Thông thường hàm `paginate()` sẽ tính tổng số records có bao nhiêu và tính ra số trang. Khi xử lý big data, đây không phải là một ý tưởng tốt vì sẽ có vấn đề perfomance. 

Bên cạnh đó Laravel cũng cung cấp hàm simplePaginate, nó sẽ chỉ hiển thị một liên kết trước đó và tiếp theo và thực hiện truy vấn nhanh hơn nhiều trên cơ sở dữ liệu của bạn (vì nó không cần đếm tổng số lượng records).

Bạn sử dụng nó theo cách tương tự như phân trang Laravel bình thường, nhưng chỉ cần gọi simplePaginate() thay vì paginate().

```
Product::simplePaginate(2);
Paginator {#318 ▼
  #hasMore: true
  #items: Collection {#322 ▼
    #items: array:2 [▶]
  }
  #perPage: 2
  #currentPage: 1
  #path: "http://domain.test"
  #query: []
  #fragment: null
  #pageName: "page"
}
```
```
Product::paginate(2);
LengthAwarePaginator {#326 ▼
  #total: 203
  #lastPage: 102
  #items: Collection {#311 ▼
    #items: array:2 [▶]
  }
  #perPage: 2
  #currentPage: 1
  #path: "http://domain.test"
  #query: []
  #fragment: null
  #pageName: "page"
}
```
Tôi khuyên bạn nên đọc mọi thứ trên tài liệu nếu bạn sử dụng phân trang), vì có khá nhiều lựa chọn khi sử dụng phân trang dựng sẵn.

## 9. Sử dụng artisan make: với tùy chọn -m
Laravel đã cung cấp sẵn tùy chọn -m để tạo file trong folder:
```
php artisan make:model -m Models/YourModel // Tạo Models/YourModel nếu chưa tồn tại folder Models
```
Sau khi chạy xong thì sẽ sinh ra file app/Models/YourModel.

## 10. Log mọi thứ với logger() và info()
Sử dụng `info("log some info message")` và `logger("log a debug message")`.

Nó sẽ nhìn gọn gàng hơn `app('log')->debug($message)` hoặc `\Log::debug($message)`

## Kết!
Mình chắc chắc rằng không phải ai cũng biết đến một vài tính năng trên mặc dùnó được publish trực tiếp trên trang chủ của Laravel.

Nếu có bất kỳ tính năng nào hay nữa các bạn có thể để lại dưới comment để cùng thảo luận nhé :D Tôi chắc chắn có hàng tấn!

Cảm ơn mọi người đã theo dõi bài viết của mình. See you!
### Tham khảo
1. [https://webdevetc.com/blog/laravel-features-you-may-not-know-about](https://webdevetc.com/blog/laravel-features-you-may-not-know-about)
2. [https://laravel-news.com/](https://laravel-news.com/)