# **I. Giới thiệu**

Laravel hiện nay đang sử dụng 2 kiểu truy vấn phổ biến với database là **Eloquent ORM** và **Query Builder**. Sau đây, chúng ta sẽ đi tìm hiểu xem 2 kiểu truy vấn này là gì, và chúng khác nhau như thế nào.

# **II. Định nghĩa**
**1. Query Builder là gì?**


Query Builder cung cấp 1 giao diện thuận tiện và dễ dàng tạo và chạy những truy vấn từ database. Nó có thể được sử dụng để thực thi hầu hết những thao tác về database trong ứng dụng của bạn và làm việc với tất cả những database được hỗ trợ.
        
**2. Eloquent ORM là gì?**

Eloquent ORM đi kèm với Laravel cung cấp **ActiveRecord** đầy đủ, đẹp đẽ và đơn giản để làm việc với database. Mỗi bảng của database sẽ được ánh xạ qua ‘Model’, và model này được sử dụng để tương tác với bảng.

# **III. So sánh**
**1. Tính bảo mật**

Eloquent ORM có tính bảo mật cao hơn QueryBuilder trong việc phòng chống ***SQL Injection***.

**2. Tính dễ sử dụng**

* Eloquent ORM dễ sử dụng hơn trong việc truy xuất, thay đổi cơ sở dữ liệu, cú pháp ngắn gọn, đơn giản hơn QueryBuilder.
* Eloquent ORM dễ dàng kết nối với database hơn QueryBuilder.
* Về độ phức tạp của một câu SQL mà Eloquent ORM chưa thể đáp ứng thì chúng ta phải sử dụng `DB::raw` hoặc QueryBuilder.

**3. Hiệu suất**

* **QueryBuilder** có hiệu suất truy vấn dữ liệu nhanh hơn **Eloquent** **ORM** bởi vì Eloquent phải thêm một lớp trong ứng dụng và yêu cầu nhiều truy vấn SQL. Đối với các database mà có ít bản ghi hiệu suất của chúng không có quá là nhiều sự chênh lệch, vậy nên đối với những database này tôi khuyên các bạn nên sử dụng Eloquent ORM vì cú pháp đơn giản và ngắn gọn của chúng.

    * **Ví dụ**: Để chèn 1000 hàng cho một bảng đơn giản Eloquent mất 1,2 giây và trong trường hợp đó QueryBuilder chỉ mất 800 mili giây (ms).  Vậy tại sao lại phải sử dụng Eloquent? Có cần thiết không?
    * Câu trả lời là **có**, bởi vì: 

        *  Tạo ra một mối quan hệ tốt hơn và nhận được kết quả với nhiều cú pháp đơn giản.
        
        *  Có lẽ nhiều người bảo rằng các cú pháp của QueryBuilder gần giống với `MS SQL, Mysql` mà các bạn đã được học ở trường nên dễ gây thiện cảm hơn khi học, nhưng không Eloquent ORM tuy cú pháp có khác nhưng mà nó đơn giản và ngắn gọn hơn rất nhiều theo mình thì nó hợp với những bạn không có nhiều kiến thức về truy vấn SQL như các bạn sinh viên sắp và mới ra trường,...         
        *  **Phần quan trọng nhất** là nếu chúng ta muốn thay đổi cơ sở dữ liệu khác , thì `DB::raw` sẽ gây đau đầu cho chúng ta và trong trường hợp đó Laravel Eloquent sẽ giải quyết tất cả các vấn đề một cách đơn giản. Nó có thể xử lý các loại Database khác nhau.   
       
       
**4.Kết luận**        

* Từ trên ta thấy, mỗi 1 loại query đều có ưu và nhược điểm khác nhau. Tùy vào mục đích sử dụng thì ta có thể lựa chọn loại query nào cho phù hợp.
* Tuy nhiên, ở hệ thống cần tính bảo mật cao và cần xử lý data lớn thì nên dùng Query builder.

# **IV.Một số câu truy vấn thường dùng**
1.Lấy tất cả các bản ghi.
* QueryBuilder 
```php
$users = DB::table('users')->get();
```
* Eloquent ORM
```php
$users = User::all();
```
2.Lấy một bản ghi theo id.
* QueryBuilder 
```php
$users = DB::table('users')->where('id', 1)->first();
```
* Eloquent ORM
```php
$users = User::find(1);
```
3.Lấy một trường của một bản ghi .
* QueryBuilder 
```php
//lấy ra trường name có id user = 1
$name = DB::table('users')->where('id', 1)->value('name');
```
* Eloquent ORM
```php
$name = User::where('id', 1)->value('name');
```
4.Lấy một trường của tất cả bản ghi .
* QueryBuilder 
```php
//lấy ra trường name có id user = 1
$name = DB::table('users')->lists('name');
```
* Eloquent ORM
```php
$users = Users::lists('name');
```
5.Lấy số lượng bản ghi cho phép .
* QueryBuilder 
```php
//lấy ra 100 user
$users = DB::table('users')->chunk(100, function($users) {
    foreach ($users as $user) {
         //
    }
});
```
* Eloquent ORM
```php
User::chunk(100, function ($users) {
     foreach ($users as $user) {
         //
     }
});
```
6.Insert
* QueryBuilder
```php
addUser = DB::table('users')->insert(
    ['email' => 'test@gmail.com']
);
```
* Eloquent ORM
```php
$user = new User;
$user->email = 'test@gmail.com';
$user->save();
```
7.Update
* QueryBuilder
```php
editUser = DB::table('users')->where('id', 1)->update(['name' => 'nameTest']);
```
* Eloquent ORM
```php
$user = User::find(1);
$user->name ='nameTest';
$user->save();
```
8.Delete
* QueryBuilder
```php
deleteUser = DB::table('users')->where('id', '=', '1')->delete();
```
* Eloquent ORM
```php
// nếu là 1 câu truy vấn
$user = User::find(1);
$user->delete();
//hoặc nếu không phải 1 câu truy vấn
$user->destroy();
```
9.Aggregates
* QueryBuilder
```php
$users = DB::table('users')->count();

$price = DB::table('orders')->max('price');
```
* Eloquent ORM
```php
$count = User::where('name', '%a%')->count();

$max = Order::where('name', '%a%')->max('price');
```
# **V. Tài liệu tham khảo**
https://laravel.com/docs/5.6/queries

https://laravel.com/docs/5.6/eloquent

https://stackoverflow.com/questions/38391710/laravel-eloquent-vs-query-builder-why-use-eloquent-to-decrease-performance