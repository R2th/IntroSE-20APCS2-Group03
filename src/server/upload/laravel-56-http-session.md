## Giới thiệu 
Từ khi các ứng dụng lập trình có sử dụng giao thức HTTP trở lên "stateless" hơn, thì session cung cấp một cách để lưu trữ thông tin của các user qua nhiều request. 


Để giải thích cho từ "stateless", mình cũng phải đi lần mò theo kiểu what does stateless mean? Rồi, http stateless what is it?... cuối cùng thì cũng cung cấp được cho các bạn thông tin nên hiểu stateless như thế nào. Về mặt cơ bản, hiểu chung chung, thì HTTP stateless nghĩa nó trong mô hình client-sever nói chung, thông qua tương tác HTTP, ví dụ như client gửi (GET http://abcdef.example), thì bên sever sẽ không hề lưu trữ bất kỳ thông tin nào của bên client. Nghĩa là khi nhận được request, bên sever sẽ response trên request đó, nó không quan tâm request đó đến từ đâu, và nó cũng không quan tâm việc có nhiều request từ 1 client. Bài toán đặt ra là, khi mỗi request cần phải authenticate, thì việc đó phải lặp đi lặp lại trên mỗi request, vì phía sever không hề lưu trữ thông tin gì của client, do đó nó cứ phải lặp đi lặp lại việc kiểm tra điều này với mỗi request được gửi đến.


Để hiểu dễ dàng hơn, chúng ta đến với một câu chuyện thực tế, giả sử bạn có người yêu sống tại một khu ký túc xá, mỗi lần đến thăm người yêu của bạn, đến cổng gặp bảo vệ tòa nhà, bạn đều phải gọi người yêu của bạn ra xác thực, rồi mới được vào. Điều này có vẻ không là vấn đề gì lớn, nhưng cụ thể chỉ cần bạn bước một chân khỏi cổng ký túc xá, rồi quay lại hôn tạm biệt người yêu của bạn, thì bạn cần được người yêu xác nhận là đáng tin cậy, để bước vào ký túc. Haiz. Cuộc đời nó mới rắc rối làm sao. 


Như vậy session sinh ra là một cách để bảo vệ nhận diện khuôn mặt của bạn là đáng tin cậy vì đã được người yêu xác nhận một lần rồi, lần sau bạn vào, trong khoảng thời gian còn "đáng được tin cậy" thì bạn có thể ra vào tòa nhà một cách thoải mái. 

Laravel cung cấp một số các cách thức phổ biến để sử dụng session trong back-end là **Memcached** và **Redis**. 

### Configuration
Các config của session trong laravel được lưu trữ ở file **config/session.php**. Bạn có thể xem qua các option trong file này. Mặc định, Laravel sẽ cấu hình session driver là "file", nó hoạt động không được tốt lắm với nhiều ứng dụng, bạn có thể cân nhắc việc sử dụng **memcached** hoặc **redis** để tăng hiệu xuất (performance) của session. 

Các option của Session driver sẽ định nghĩa nơi mà dữ liệu session sẽ được lưu trữ trên mỗi request. Laravel đưa ra một vài driver như sau: 
- file - các sessions được lưu trữ tại **storage/framework/sessions**
- cookie- các session được lưu trữ một các bảo mật, được mã hóa cookies. 
- database- các session được lưu trữ trong một cơ sở dữ liệu quan hệ. 
- memcached/redis - các session được lưu trữ trên bộ nhớ đệm hoặc bộ nhớ cache. 
- array - các session được lưu trữ trong một mảng php và không được duy trì lâu dài. 

:notebook: **array driver** thường được sử dụng trong testing,vì dữ liệu sẽ không tồn tại lâu dài.  

### Driver Prerequisites (Các điều kiện tiên quyết để sử dụng các driver)
#### Database
Khi sử dụng **database** session driver, bạn cần tạo một bảng để lưu trữ các session. Dưới đây là một ví dụ về khai báo cấu trúc một bảng để lưu trữ session:
```shell
Schema::create('sessions', function ($table) {
    $table->string('id')->unique();
    $table->unsignedInteger('user_id')->nullable();
    $table->string('ip_address', 45)->nullable();
    $table->text('user_agent')->nullable();
    $table->text('payload');
    $table->integer('last_activity');
});
```

Bạn có thể sử dụng câu lệnh artisan **session:table** để generate migration trên:
```shell
php artisan session:table
php artisan migrate
```

#### Redis
Trước khi sử dụng **Redis session** trong Laravel, bạn cần cài đặt **predis/predis** package thông qua **Composer**. Bạn có thể cấu hình Redis connection trong file **database conection**, về mặt bản chất thì mọi option cấu hình đều có trong file session.php được đề cập ở trên. 

## Sử dụng Session 

### Retrieving Data
Có hai cách để làm việc với dữ liệu của session trong Laravel: **session** helper và thông qua **Request** cụ thể. Đầu tiên hãy tìm hiểu các sử dụng thông qua một request cụ thể. Rất dễ hiểu thông qua ví dụ sau:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function show(Request $request, $id)
    {
        // Get value in session
        $value = $request->session()->get('key');
        // return value if the key exists in session else null;

        //Get value in session with default value
        $value = $request->session()->get('key', 'default value');
        // return value if the key exists in session else return *default value*
    }
}
```

Mình định viết comment bằng tiếng việt, cho dễ hiểu, nhưng mà thấy nó hơi sai sai, nên comment bằng tiếng anh, mặc dù tiếng anh của mình còn cùi bắp hơn cả tiếng việt. :frowning_face: 
Để giải thích cụ thể, là dùng 
```php
    $value = $request->session()->get('key');
```
để lấy giá trị của 'key' trong session, nếu giá trị 'key' chưa tồn tại trong session, biến **\$value** sẽ nhận giá trị null;
Điều này cũng vẫn ổn, nếu **key** chưa tồn tại trong session, nên có thể không phải lo nghĩ việc **out of index** hay gì đó.

Sử dụng 
```php
    $value = $request->session()->get('key', 'default value');
```
để gán giá trị mặc định khi không có giá trị nào được lưu trữ trong session. Diễn đạt một cách dễ hiểu là, nếu không có giá trị nào đã lưu trước đó trong session, thì **\$value** sẽ nhận giá trị là **default value**, chứ không phải **null** như cách sử dụng ban đầu. Thường thì mình khuyến khích sử dụng thứ hai hơn:
```php
    $value = $request->session()->get('key', 'default value');
```
Kể cả trong trường hợp bạn không muốn gán giá trị mặc đình nào, thì vẫn có thể viết thành:
```php
    $value = $request->session()->get('key', null);
```
Tại sao lại vậy, do quan điểm cá nhân thôi, mình thấy cách thứ hai thì code nó rõ ràng hơn, là giá trị sẽ nhận về là gì, với lại sẽ rất thuận lợi, nếu muốn giá trị trả về không phải là **null** mà là một chuỗi rỗng ('') thì vẫn ổn. Quan điểm cả nhân thôi. 

### Sử dụng session helper 

Laravel có một biến global, sử dụng được ở mọi nơi thì phải. :) 
Sử dụng như sau:
```php
$value = session('key');
$value = session('key', 'default value');
```

Ý nghĩa thì nó giống hai cái bên trên nhé, chỉ có điều không cần sử dụng một request cụ thể nào thôi.

### Retrieving All Session Data

Để lấy mọi giá trị được lưu trữ trong session ta có thể là như sau:

```php
// Via request instance
$allData = $request->session()->all();
// Via session helper
$allData = session()->all();
```

### Lưu trữ dữ liệu vào session (Storing Data)

Để lưu trữ một giá trị vào trong session, thì ta có thể làm như sau:
```php
// Via a request instance...
$request->session()->put('key', 'value');

// Via the global helper...
session(['key' => 'value']);
```
Chú ý 'key' vẫn có thể sử dụng "dot" của laravel. Điều này đồng nghĩa với việc có thể thực hiện thoải mái phân cấp như sau:
```php
// Via a request instance...
$request->session()->put('abc.def.xyz', 'value');

// Via the global helper...
session(['abc.def.xyz' => 'value']);
```

Ngoài hai ví dụ trên, thì ta có thể sử dụng hàm **push**. Mình có thực hiện một số  câu lệnh, nhưng mình chưa biết tại sao nó có **put** rồi, lại có cả **push** nữa để làm gì. Vì cơ bản mình sử dụng thì nó như nhau không à. 
```shell
>>> session()->all();
=> []
>>> session('test');
=> null
>>> session(['abc.def.ghj'=>1]);
=> null
>>> session()->all();
=> [
     "abc" => [
       "def" => [
         "ghj" => 1,
       ],
     ],
   ]
>>> session()->push('user.teams', ['a', 'b', 'c']);
=> null
>>> session()->all();
=> [
     "abc" => [
       "def" => [
         "ghj" => 1,
       ],
     ],
     "user" => [
       "teams" => [
         [
           "a",
           "b",
           "c",
         ],
       ],
     ],
   ]
>>> session(['user.teams' => ['d', 'e', 'f']]);
=> null
>>> session()->all();
=> [
     "abc" => [
       "def" => [
         "ghj" => 1,
       ],
     ],
     "user" => [
       "teams" => [
         "d",
         "e",
         "f",
       ],
     ],
   ]

```

### Retrieving & Deleting An Item
Sử dụng hàm **pull** để nhận giá trị của 'key' và xóa key đó ra khỏi session
```php
// Via requet
$data = $request->session()->pull('key');
$data = $request->session()->pull('key', 'default value');
// Via session helper
$data = session()->pull('key');
$data = session()->pull('key', 'default value');
```
Trở lại với tinker, ta có thể nếm thử lệnh **pull** và kết quả như sau:
```shell
>>> session()->pull('abc');
=> [
     "def" => [
       "ghj" => 1,
     ],
   ]
>>> session()->all();
=> [
     "user" => [
       "teams" => [
         "d",
         "e",
         "f",
       ],
     ],
   ]
>>> 

```

### Flash Data 
Sử dụng flash data cho bài toán, bạn muốn lưu trữ thông tin nào đó trong session cho request sắp tới.
Nghĩa là trong hàng chờ, bạn đang ở request thứ **n**, và muốn lưu trữ thông tin abc nào đó để sử dụng ở request thứ **n+1**, sau đó thông tin abc đó sẽ bị xóa ở request thứ **n+2**. 
Sử dụng như sau:
```php
// Via request 
$request->session()->flash('key', 'value');
```
Trong tài liệu của laravel, có đề cập đến việc , để lưu trữ dữ liệu của kiểu **flash data** trong một vài request, thì sử dụng hàm **reflash**.

```php
request->session()->reflash();
```
:question: Vấn đề là một vài request là bao nhiêu request, giả sử đang ở request thứ **n**, thì nó sẽ tồn tại đến request đến **n + mấy**. 
Cái question này phải thử mình mới biết được, hiện tại là mình cũng không biết. Nếu anh/em có biết thì viết comment, mình update. Hoặc thời gian rảnh khác, mình kiếm tài liệu xem có chỗ nào nói đến việc này không. 

Để lưu trữ một 'key' cụ thể cho các request tiếp theo, chứ không phải toàn bộ **flash data** thì sử dụng:
```php
$request->session()->keep(['username', 'email']);
```

### Delete Data 
Để xóa một dữ liệu trong session, ta thực hiện như sau:
```php
$request->session()->forget('key');
```
Để xóa toàn bộ dữ liệu trong session, ta thực hiện như sau:

```php
$request->session()->flush();
```
Ở trên mình đã đề cập đến hàm **pull**. Hiểu cụ thể thì 
```php
// session()->pull('key', 'defaul value') mean
session()->get('key', 'default value');
session()->forgot('key');
```

### Nguồn tham khảo
Để anh em đọc tốt tiếng anh, thì có thể tham khảo trực tiếp tại trang document của laravel

Tài liệu gốc: [Tài liệu laravel session ](https://laravel.com/docs/5.6/session)