## **I, Giới thiệu:**<br>
Trong laravel, có 2 kiểu truy vấn với database thường được dùng đó lá: Eloquent và Query builder. Trong bài này chúng ta sẽ cùng tìm hiểu xem chúng khác nhau như thế nào và khi nào nên sử dụng Eloquet hay Query builder
## **II, Định nghĩa**<br>
**1, Eloquent:** Eloquent được laravel cung cấp hỗ trợ lập trình viên thao tác với database một cách đơn giản, dễ hiểu và ngắn gọn. <br>
**2, Query builder:** Query Builder cung cấp 1 giao diện thuận tiện và dễ dàng tạo và chạy những truy vấn từ database. Nó có thể được sử dụng để thực thi hầu hết những thao tác về database trong ứng dụng của bạn và làm việc với tất cả những database được hỗ trợ.
## **III, cách sử dụng:**
**1, Eloquent:** Trong Eloquent mỗi bảng trong database phải ứng với 1 model. Lưu ý là mỗi Eloquent model này đều phải extend 
`
    Illuminate\Database\Eloquent\Model
` class .
Ví dụ:
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    //
    protected $table = 'news';
    protected $guarded = ['id'];

}

```
ví dụ sử dụng Eloquent
```php
    $news = News::all();
```


**2, Query builder:** Query Builder xây dựng lớp DB để thực hiện các câu truy vấn. Do đó, để bắt đầu 1 Query Builder, ta sử dụng hàm table() trong DB facade.
ví dụ: 
```php
    DB::table('news)->get();
```

Truy vấn này sẽ trả về 1 mảng kết quả, trong đó mỗi kết quả là 1 object StdClass của PHP. Bạn có thể truy cập vào giá trị mỗi cột như 1 thuộc tính của object.
## **IV, So sánh**
**1, Tính Bảo mật:**  Query builder và Eloquent đều sử dụng : 'PDO parameter binding' nên sẽ giúp chúng ta tránh được lỗi sql injection.<br>
**2, Tính tương tác:** Bạn có thể sử dụng tất cả các function của Query Builder trong Eloquent nhưng không thể sử dụng các funcation của Eloquent trong Query Builder.<br>
**3, Tính dễ sử dụng:** 
* Eloquent có các hàm được laravel xây dựng sãn nên nó ngắn gọn và dễ hiểu hơn so với Query builder<br>
* Eloquent dễ dàng liên kết giữa các bảng trong database hơn Query builder<br>
* Eloquent chỉ thực hiện được những truy vấn không quá phức tạp, để thực hiện những truy vấn phức tạp cần dùng Query builder<br>

**4, Hiệu suất:** Eloquent thực hiện các thao tác với database châmj hơn so với Query builder<br>

## **V, Một số ví dụ về sử dụng Eloquent và Query builder**
**1, Lấy tất cả các bản ghỉ:** <br>
Query builder:<br> 
```php
    DB::table('news')->get();
```
Eloquent: <br>
```php
    News::all();
```
**2, Lấy số lượng các bản ghi:** <br>
Query builder:<br> 
```php
    DB::table('news')->count();
```
Eloquent: <br>
```php
    News::count();
```
**3, Tìm theo ID:** <br>
Query builder: <br>
```php
    DB::table('news')->where('id', 1)->first();
```
Eloquent: <br>
```php
    News::find(1);
```
**4, Lấy bản ghi theo trường nhất định:** <br>
Query builder: <br>
```php
    DB::table('news')->where('status', 1)->first();
```
Eloquent: <br>
```php
    News::where('status', 1)->first();
```
**5, Insert:** <br>
Query builder: <br> 
```php
    DB::table('news')->insert(
        ['title' => 'Query builder and Eloquent']
    );
```
Eloquent: <br>
```php
    $news = new News;
    $news->title = 'Query builder and Eloquent';
    $news->save();
``` 
Nếu sử dụng hàm create thì ta có 1 số cách viết như sau: <br>
```php
    News::create([
        'title' => 'Query builder and Eloquent'
    ]);
```
hoặc <br>
```php
    News::firstOrCreate([
        'title' => 'Query builder and Eloquent'
    ]);
``` 
**6, Update:** <br>
Query builder: <br>
```php
    DB::table('news')->where('id', 1)->update(['title' => 'Query builder and Eloquent update']);
```
Eloquent<br>
```php
    $news = News::find(1);
    $news->title = 'Query builder and Eloquent update';
    $news->save();
```
hoặc nếu dùng hàm update thì ta sử dụng:<br>
```php
    $news = News::find(1);
    $news->update([
        'title' => 'Query builder and Eloquent'
    ]);
```
**7, Delete:**<br>
Query builder:<br>
```php
    DB::table('news')->where('id', '=', 1)->delete();
```
Eloquent:<br>
```php
    $news = News::find(1);
    $news->delete();
```
hoặc:<br>
```php
    News::destroy(1);
```
## **VI, Kết luận**
  - Từ trên ta thấy, mỗi 1 loại query đều có ưu và nhược điểm khác nhau. Tùy vào mục đích sử dụng thì ta có thể lựa chọn loại query nào cho phù hợp. <br>
 - Tuy nhiên, ở hệ thống cần tính bảo mật cao và cần xử lý data lớn thì nên dùng Query builder.<br>
## **Tài liệu tham khảo:**<br>
- [Eloquent](https://laravel.com/docs/5.6/eloquent) <br>
- [Query builder](https://laravel.com/docs/5.6/queries) <br>
                                                                                                                                    Techtalk