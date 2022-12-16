Xin chào các dev gà mờ, đặc biệt là các dev đang làm việc với php, thì framework Laravel có lẽ là framework phổ biến nhất. Và một trong các điểm mạnh của Laravel đó chính là khả nằng truy xuất cơ sở dữ liệu, lấy dữ liệu ra một cách đơn giản, trong đó có hai cách để chúng ta sử dụng, đó là Eloquent ORM và Query Builder .

Vậy trong trường hợp nào thì chúng ta nên sử dụng Eloquent hay Query Builder. Trong bài viết này, mình sẽ chỉ ra một số mặt của cả hai cách truy vấn trên để bạn thấy được đâu là sự lựu chọn hoàn hảo cho truy vấn cơ sở dữ liệu.

# 1. Query Builder ?
### 1.1 Định nghĩa

Query builder cung cấp một giao thức thuận tiện, linh hoạt cho việc tạo và thực thi các truy vấn dữ liệu. Nó có thể sử dụng để thực hiện hầu hết các tính toán dữ liệu trong ứng dụng của bạn, và làm việc trên tất các các hệ cơ sở dữ liệu được hỗ trợ. Laravel query builder sử dụng PDO parameter binding để bảo vệ ứng dụng của bạn khỏi SQL injection.

Việc thực hiện truy vấn bằng query builder khá đơn giản, chúng ta sẽ sử dụng facade DB để bắt đầu một query builder
### 1.2 Một số truy vấn bằng Query Builde
Lấy ra bản ghi

`$users = DB::table('users')->get(); // Truy vấn lấy toàn bộ bản ghi từ bẳng user`

Phương thức get trả về một Illuminate\Support\Collection chứa các kết quả mà mỗi kết quả là một instance của đối tượng PHP StdClass. Bạn có thể truy cập mỗi cột giá trị bằng cách coi cột như là thuộc tính của một object bằng cách sử dụng vòng lặp để lấy ra các thuộc tính
```php

foreach ($users as $user) {
    echo $user->name;
}
```

Bạn cũng có thể thay get() bằng first() để lấy ra bản ghi đầu tiên phù hợp

Query builder cũng cung cấp một tập hợp các phương thức khác nhau, như là **count**, **max**, **min**, **avg**, và **sum**. Bạn có thể gọi bất kì phương thức nào sau cấu trúc truy vấn:

```php
$users = DB::table('users')->count();
$price = DB::table('orders')->max('price');
```

Đôi khi bạn có thể cần sử dụng một biểu thức trong truy vấn. Những expression này sẽ được đưa vào truy vấn như các chuỗi, vì vậy hãy cẩn thận đừng tạo bất kì lỗi SQL injection nào. Để tạo một raw expression, bạn có thể sử dụng phương thức DB::raw:
```php
$users = DB::table('users')
                     ->select(DB::raw('count(*) as user_count, status'))
                     ->where('status', '<>', 1)
                     ->groupBy('status')
                     ->get();
```
Nói chung là gấn như mọi câu truy vấn đều có thể sử dụng Query Builder để build được hết =))) Quá mạnh 

# 2. Eloquent ORM ?
 ### 2.1 ĐỊnh nghĩa

Đây là trong những tính năng thú vị nhất của framework Laravel, nó giống như một người đại điện cho Laravel để gọi cơ sở dữ liệu ra vậy. Bạn sẽ ko cần thao tác trực tiếp vào cơ sở dữ liệu mà chỉ cần ra lệnh cho Eloquent thôi =)) 

Laravel tương tác với Eloquent thông qua mô hình hướng đối tượng, giúp đơn giản hóa việc tương tác với cơ sở dữ liệu.

 ### 2.2 Cách sử dụng
Việc sử dụng Eloquant của Laravel sẽ thông qua một Model - một lớp đại diện cho một bảng mà ứng dụng Laravel tương tác đến. 
Khởi tạo một Model để truy vấn thử bằng Eloquent
Các bước config ban đầu về Laravel mình sẽ ko đề cập đến nữa, chúng ta sẽ tập trung luôn vào model. Để khởi tạo một model, ta sử dụng câu lênh: php artisan make:model Role
trong đó Role chính là tên model tương ứng với tên bảng, bạn có thể thay tên tùy ý.
![](https://images.viblo.asia/789c314d-fb86-4532-a85b-0906610058ca.png)

Chúng ta sẽ tiếp tục config model Role này để nó có thể tương tác với database.
Có hai thuộc tính cơ bản của một model eloquent đó là $table và $fillable
* $table là để khai báo tên bảng, điều này sẽ ko cần thiết nếu như bạn đã đặt tên model theo đúng chuẩn, ví dụ: nếu tên model là Role thì khi bạn dùng eloquent, nó sẽ tự thêm 's' vào tên model để trở thành tên bảng
* $fillable là để khai báo các trường mà bạn sẽ dùng để điều chỉnh, nếu như bạn ko khai báo thì chúng ta sẽ ko thể insert hay update được các trường tương ứng đó

Ngoài ra nếu bạn chưa cảm thấy eloquent hay thì điều dưới đây sẽ làm cho bạn cảm thấy eloquent thật vi diệu =))
Chúng ta sẽ định nghĩa thêm một số quan hệ cho cái model Role này. Để đỡ lằng nhằng, ta sẽ sử dụng luôn model user có sẵn của Laravel.
![](https://images.viblo.asia/cca3b292-0b69-4b03-a030-4a148bdb06a7.png)

Ở đây chúng ta định nghĩa ra một một quan hệ 1 - n dành cho bảng của bảng roles đối với bảng users, nhưng ở bài viết này mình sẽ ko đi sau vào định nghĩa các mối quan hệ này mà chỉ giải thích sơ quan để bạn hình dung sự vi diệu của eloquent thôi: việc sử dụng belongsToMany với một tham số là tên class User để có thể đặt liên kết khi chúng ta truy vấn sẽ dễ dàng và hiệu quả hơn, nó giúp ta tránh được truy vấn n +1
Và đây là câu truy vấn khi lấy ra tất cả bản ghi của bảng users trong eloquent:

`$users = User::all();`

Qúa ngắn gọn, ko dườm dà như Query Builder, hay chúng ta có thể thử câu lệnh có thêm điều kiện where :

`$user = User::where('id', '=', 1)->get();`

Và tất nhiên, Eloquent chúng ta có thể sử dụng query builder bên trong eloquent bình thường, ví dụ như sau:
```
$user = User::when($haha == 'yes', function($query) {
    $query-orderBy('price', 'desc');
})->get(); // nếu biến $haha bằng giá tri 'yes' thì sẽ sắp xếp theo giá giảm dần
```

Và một ví dụ dùng cho trường hợp truy vấn n + 1

Bình thường, khi có liên kết 1 - n bẳng bảng A và B, khi ta muốn lấy ra tất cả các bản ghi của bảng A có liên kết đến bảng B, t sẽ có **n + 1**  truy vấn, 1 truy vấn lấy ra tất cả bản ghi của bảng A sau đó, sau đó là n truy vấn từ bảng B có id là của bảng A, khi đó ta sẽ được tất cả **n  + 1**  truy vấn =)) nghe như có vẻ ko có gì ghê gớm, nhưng nếu bạn hình dung có 1 triệu truy vấn mà có **n + 1** thì nó gây hao tổn bộ nhớ để xử lý cái đồng truy vấn đó. Và để khắc phục điều này, Eloquent sinh ra hai khái niệm with và load sử dụng relation như chúng ta vừa viết ở model role kia

`$user = Role::with('users')->get();`

hoặc

`$user = Role::all()->load('users');`

Điểm khác biệt duy nhất giữa **with()** và **load()** là **with()** sẽ thực hiện ngay sau khi gặp các câu lệnh như **get()**, **first()**, **all()**, . .  còn **load()** thì sẽ chạy sau khi load xong toàn bộ các bản ghi ra.
# 3. So sánh Eloquent và Query Builder


|  |Eloquent | Query Builder |
| -------- | -------- | -------- |
| Tính bảo mật    | TÍnh bảo mật cao hơn Query Builder, có thể chống Sql Injection do phải thông qua một model ánh xạ     | Tính bảo mật thấp hơn, dễ bị Sql Injection nếu viết raw kém bảo mật     |
| Tính tương tác    | Có thể sử dụng Query Builder bên trong Eloquent     | Ko thể sử dụng Eloquent bên trong Query Builder     |
| Tính thẩm mĩ    | Ngắn gọn    | Rườm rà   |
| Hiệu suất   | Do phải thông qua một lớp ánh xạ và phải yêu cầu nhiều Sql nên hiệu suất chậm   |  Do chỉ chuyển đổi sang Sql nên tốc độ sẽ nhanh hơn  |
| Khả chuyển  | Tương tác với nhiều loại database   |  Sử dụng Raw sẽ khó có khả năng tương thích với một số database  |

# 4. Kết luận
Từ trên ta thấy, mỗi 1 loại query đều có ưu và nhược điểm khác nhau. Tùy vào mục đích sử dụng thì ta có thể lựa chọn loại query nào cho phù hợp.<br>
Với những New Laravel thì chúng ta có thể sử dụng Eloquent để giảm thiểu truy vấn phải viết, tăng tính thẩm mĩ cho code.<br>
Tuy nhiên, ở hệ thống cần tính bảo mật cao và cần xử lý data lớn thì nên dùng Query builder (Miễn sao câu query Raw đủ bảo mật).