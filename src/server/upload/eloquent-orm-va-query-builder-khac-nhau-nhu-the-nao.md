## I. Giới thiệu
Như mọi người đã biết, một ứng dụng luôn phải tương tác với cơ sở dữ liệu. Đối với Laravel thì có 2 kiểu truy vấn phổ biến, đó là Eloquent ORM và Query Builder.
Tại sao cùng với mục đích là truy vấn database lại có những kiểu truy vấn khác nhau, điểm khác nhau giữa chúng là gì. Khi nào thì nên sử dụng Eloquent, ngược lại khi nào dùng Query Builder? Chúng ta cùng tìm hiểu nhé.

## II. Định nghĩa
### 1. Query Builder
Trong Laravel, Query Builder cung cấp giao diện để chạy các truy vấn CSDL. Nó có thể được sử dụng để thực hiện tất cả, từ kết nối DB cơ bản, CRUD, aggregates...

Query Builder sử dụng PDO (PHP Data Object, hệ thống API có sẵn của PHP để kết nối đến các CSDL thông dụng), bản thân API PDO đã bảo vệ chúng ta trước các tấn công SQL Injection, do đó khi xử dụng Query Builder không cần lo lắng xử lý dữ liệu trước khi chèn vào database

Việc thực hiện truy vấn bằng query builder khá đơn giản, chúng ta sẽ sử dụng facade DB để bắt đầu một query builder, ví dụ như sau:

`$users  =  DB::table('users')->get();`

### 2. Eloquent ORM
ORM (Object Relative Mapper) là 1 kỹ thuật lập trình giúp ánh xạ các bản ghi dữ liệu trong hệ quản trị CSDL sang dạng đối tượng đang định nghĩa trong các class. Eloquent ORM cho phép chúng ta có thể dễ dàng thao tác hơn với DB, ở đây chính là tương tác thông qua "Model". Hiểu một cách đơn giản nhất, với ORM thì một Model sẽ đại diện cho một table trong DB, và ORM sẽ cung cấp các kĩ thuật giúp tương tác với các bản ghi trong table một cách dễ dàng nhất.

## III. Cách sử dụng
### 1. Query Builder

Query Builder xây dựng lớp DB để thực hiện các câu truy vấn. Do đó, để bắt đầu 1 Query Builder, ta sử dụng hàm table() trong DB facade. Ví dụ:

`$users  =  DB::table('users')->get();`

Truy vấn này sẽ trả về 1 mảng kết quả, trong đó mỗi kết quả là 1 object StdClass của PHP. Bạn có thể truy cập vào giá trị mỗi cột như 1 thuộc tính của object.

#### 2. Eloquent ORM
Do trong Eloquent ORM, mỗi bảng của database tương ứng với 1 model nên để bắt đầu sử dụng được nó, ta cần tạo Eloquent model trong thư mục app. Lưu ý là mỗi Eloquent model này đều phải extend `Illuminate\Database\Eloquent\Model` class.

Ví dụ về Eloquent Model:
```
<?php

namespace  App;

use  Illuminate\Database\Eloquent\Model;

class  Product  extends  Model
{
        /**

         * The table associated with the model.

         *

         * @var string

         */

        protected  $table  =  'products';
}
```

Ví dụ về query sử dụng Eloquent ORM:

`$users  =  User::all();`

Kết quả trả về là 1 eloquent collections, trong đó mỗi kết quả là 1 User object.

## IV. Một số query cơ bản
Về cơ bản, các câu lệnh query của Eloquent ORM có 1 chút thay đổi so với Query Builder, khiến câu lệnh trông ngắn gọn và đẹp đẽ hơn:

### 1. Lấy tất cả các bản ghi
Ví dụ lấy tất cả bản ghi trong table users.

**Query Builder:**

`$users  =  DB::table('users')->get();`

**Eloquent ORM:**

`$users  =  User::all();`

### 2. Lấy bản ghi theo id

**Query Builder:**

`$user  =  DB::table('users')->where('id',  1)->first();`

**Eloquent ORM:**

`$user  =  User::find(1);`

### 3. Lấy 1 bản ghi theo 1 trường cụ thể

**Query Builder:**

`$user  =  DB::table('users')->where('name', 'Jonny')->first();`

**Eloquent ORM:**

`$user  =  User::where('name',  'Jonny')->first();`

### 4. Aggregates

**Query Builder:**

`$users  =  DB::table('users')->count();`

**Eloquent ORM:**

`$users = User::count();`

### 5. Insert

**Query Builder:**

```
DB::table('users')->insert(
    ['email'  =>  'jonny@gmail.com']
);
```

**Eloquent ORM:**

```
$user = User::create(['email' => 'jonny@gmail.com']);
$user = User::firstOrCreate(['email' => 'jonny@gmail.com']);
$user = User::firstOrNew(['email' => 'jonny@gmail.com']);
```

Trên đây mình chỉ giới thiệu một vài câu query cơ bản và ngắn gọn nhất, để tìm hiểu kĩ hơn thì mọi người có thể vào đây nhé (version Laravel tùy các bạn chọn, ở đây mình chọn 5.8)

https://laravel.com/docs/5.8/queries

https://laravel.com/docs/5.8/eloquent

## V. So sánh
### 1. Tính dễ sử dụng

Các câu lệnh của Eloquent ORM là ngắn gọn, dễ hiểu và dễ sử dụng hơn so với các câu lệnh khá dài dòng của Query Builder. Hơn nữa, sử dụng Eloquent ORM cũng dễ dàng hơn trong việc kết nối giữa các bảng với nhau. Tuy nhiên, với 1 số truy vấn phức tạp, không sử dụng được Eloquent ORM thì vẫn cần sử dụng Query Builder để cho kết qủa chính xác nhất.

### 2. Hiệu suất
QueryBuilder có hiệu suất truy vấn dữ liệu nhanh hơn Eloquent ORM bởi vì Eloquent phải thêm một lớp trong ứng dụng và yêu cầu nhiều truy vấn SQL. Đối với các database mà có ít bản ghi hiệu suất của chúng không có quá là nhiều sự chênh lệch, vậy nên đối với những database này mình khuyên các bạn nên sử dụng Eloquent ORM vì cú pháp đơn giản và ngắn gọn của chúng.

**Ví dụ:** Để chèn 1000 hàng cho một bảng đơn giản Eloquent mất 1,2 giây và trong trường hợp đó QueryBuilder chỉ mất 800 mili giây (ms). Vậy tại sao lại phải sử dụng Eloquent? Có cần thiết không?

Câu trả lời là có, bởi vì:

Tạo ra một mối quan hệ tốt hơn và nhận được kết quả với nhiều cú pháp đơn giản. Có lẽ nhiều người bảo rằng các cú pháp của QueryBuilder gần giống với MS SQL, Mysql mà các bạn đã được học ở trường nên dễ gây thiện cảm hơn khi học, nhưng không Eloquent ORM tuy cú pháp có khác nhưng mà nó đơn giản và ngắn gọn hơn rất nhiều theo mình thì nó hợp với những bạn không có nhiều kiến thức về truy vấn SQL như các bạn sinh viên sắp và mới ra trường,...

Phần quan trọng nhất là nếu chúng ta muốn thay đổi cơ sở dữ liệu khác , thì DB::raw sẽ gây đau đầu cho chúng ta và trong trường hợp đó Laravel Eloquent sẽ giải quyết tất cả các vấn đề một cách đơn giản. Nó có thể xử lý các loại Database khác nhau.

### 3. Tính tương tác

Chúng ta có thể sử dụng tất cả các function của Query Builder trong Eloquent nhưng không thể sử dụng các funcation của Eloquent trong Query Builder.

### 4. Tính bảo mật

Eloquent ORM có tính bảo mật cao hơn QueryBuilder trong việc phòng chống SQL Injection.

## VI. Kết luận
Như vậy, trong bài viết này chúng ta đã tìm hiểu về 2 kiểu truy vấn trong Laravel. Mỗi loại đều có những ưu điểm và nhược điểm riêng, vi vậy tùy vào mục đính sử dụng các bạn hay chọn kiểu truy vấn cho phù hợp nhé.