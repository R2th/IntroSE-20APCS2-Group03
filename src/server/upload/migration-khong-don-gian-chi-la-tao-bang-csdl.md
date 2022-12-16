# Lời nói đầu:
Xin chào các bạn, cũng lâu lắm rồi mình mới tiếp tục viết tiếp series về **Laravel** này, hôm nay mình xin giới thiệu về một thứ khá cơ bản và chắc là ai ai cũng phải biết đến khi tìm hiểu về Laravel, đó là [migration](https://laravel.com/docs/5.7/migrations).

<hr>

<br>

Như mình đã nói ở trên thì migration rất là cơ bản (giống như xây nhà phải xây từ móng vậy) cho nên bài viết sẽ không đề cập đến khái niệm migration là gì hay là viết và chạy migration thế nào mà sẽ nói về một số tình huống khá hay ho khi làm việc với **migration**.

<br>

Nếu bạn làm một project nhỏ để học tập, tìm hiểu về Laravel thì sẽ chưa có vấn đề gì xảy ra. Nhưng khi bạn làm một project lớn hơn hoặc là làm với team (điều này là chắc chắn khi đi làm) thì việc sử dụng migration sẽ lên một "**tầm cao**" mới, không còn đơn giản như trước nữa. Và trong bài viết này, mình xin tổng hợp lại một số tình huống mà mình đã gặp và tốn kha khá thời gian để tìm hiểu được. Mong rằng nó sẽ có ích cho ai đó rơi vào một trong những tình huống dưới đây. 

<hr>

# Nội dung:

- Trước khi bước vào nội dung bài viết, mình muốn các bạn `newbie` nhớ lấy `khẩu quyết` là
```
Khi sửa database phải tạo migration mới, không được phép sửa trực tiếp vào file migration cũ!
```
Cứ nói lại cho chắc, vì ngày xưa mình cũng từng có  "quá khứ hào hùng" sửa migration rồi nhận về một màn hình đỏ choét, nhỡ đâu cũng có người mắc phải thì sao. Cẩn tắc vô ưu mà!
## Enum không đơn giản như bạn nghĩ.
### Bài toán đặt ra:
Trước đây khi làm các project nhỏ để thực hành Laravel, mình không chú ý lắm đến trường Enum, vì khi đó mình chỉ tạo ra và dùng nên thấy nó chẳng có gì đặc sắc cả. Và vào một ngày đẹp trời, mình cần update thêm giá trị cho trường Enum.  Ví dụ trong bảng `users` có trường `gender` là Enum với 2 giá trị `male` và `female` nhưng giờ mình muốn thêm 1 giá trị `LGBT` vào thì nó không đơn giản chỉ là [updateColumn](https://laravel.com/docs/5.5/migrations#columns) (nếu không tin bạn có thể thử)
- Khi tạo migration, bạn sẽ viết như sau:
```php
public function up()
{
    Schema::table('user', function ($table) {
        $table->enum('gender', ['male','female']);
    });
}
```
- Và khi update, bạn nghĩ có thể dùng `change()` update như thế này:
```php
public function up()
{
    Schema::table('user', function ($table) {
        $table->enum('gender', ['male','female','lgbt'])->change();
    });
}
```
- Thì xin thưa, câu trả lời là không! Vậy hãy cùng đi tìm hiểu xem phải làm thế nào để có thể update được trường Enum nhé!
### Giải quyết:
- Câu trả lời dành cho bạn là sử dụng method `DB::statement()` thay vì `change()`
```php
public function up()
{
    // các bạn chú ý là đoạn bên trong có thể khác nhau một chút tuỳ vào hệ CSDL (MySQL, Postgres, ...)
    \DB::statement("
        ALTER TABLE user CHANGE COLUMN gender ENUM('male','female', 'lgbt')
    ");
}
```
- Các bạn chú ý là đoạn bên trong có thể khác nhau một chút tuỳ vào hệ CSDL (MySQL, Postgres, ...), ví dụ một vài trường hợp như sau:



|  | Postgre | MySQL |
| -------- | -------- | -------- |
| Kiểu tự động tăng     | serial     | **AUTO_INCREMENT**     |
| Thay đổi kiểu giá trị của trường    | **ALTER COLUMN** column_name **TYPE** new_data_type     | "**MODIFY** column_name **DATA_TYPE**" hoặc "**CHANGE COLUMN** column_name column_name  **DATA_TYPE**"  |


- Các bạn có thể xem cú pháp cụ thể tại [**postgres**](http://www.postgresqltutorial.com/postgresql-alter-table/), [**mysql**](http://www.mysqltutorial.org/mysql-alter-table.aspx), ...
### Update Enum khi đã có bản ghi:
- Ngoài ra, khi bạn thay đổi giá trị của trường Enum mà đã tồn tại bản ghi rồi thì công việc sẽ phức tạp hơn chứ không hề đơn giản chỉ là câu lệnh `ALTER TABLE` như trên nữa. Khi này, công việc của bạn sẽ bao gồm 3 bước:
    - Bước 1: chuyển đổi các giá trị Enum về varchar.
    - Bước 2: tạo các giá trị mới trong trường Enum.
    - Bước 3: chuyển đổi từ giá trị varchar thành Enum.
- Đại ý các bước cần thực hiện sẽ là như thế, mình sẽ cố tìm ví dụ bài toán cụ thể và cả code xử lí nhé.

**UPDATING ...**

<hr>

## Update bản ghi cũ:
### Bài toán đặt ra:
Trường hợp này xảy ra khi mà bạn muốn thêm trường vào một bảng trong CSDL mà đã có sẵn bản ghi.
- Ví dụ bạn đang có một bảng `posts` với các trường `id`, `content`, `user_id`. Giờ bạn muốn thêm 1 trường `status` để phân loại bài viết đang là **public** hay **private** (giống như [facebook](https://www.facebook.com/)) thì những bản ghi trước đây sẽ có giá trị `status` bằng null, khi cột `status` sẽ có 3 giá trị là `null`, `public`, `private` gây ra việc khó phân loại, quản lí bài viết.
- Như vậy, việc cần làm sẽ là cập nhật giá trị trường `status` của những bản ghi cũ thành giá trị public sau khi đã add thêm trường.
### Giải quyết:
Lúc đầu gặp tình huống này mình cứ nghĩ là phải dùng [**Job**](https://laravel.com/docs/5.5/queues#generating-job-classes) với [**Command**](https://laravel.com/docs/5.5/artisan#generating-commands) để thực hiện việc update các bản ghi cũ cơ nhưng rồi mình tìm thấy một cách đơn giản hơn rất nhiều, đó là chạy câu truy vấn update giá trị bản ghi ngay trong migration.

Bạn có thể viết câu truy vấn SQL để chọn ra các bản ghi phù hợp và update giá trị các trường mà mình mong muốn ngay trong file migration. 
```php
public function up()
    {
        // 1. thêm trường status
        Schema::table('post', function ($table) {
            $table->enum('status', ['public', 'private']);
        });

        // 2. Cập nhật bản ghi cũ
        $rows = DB::table('post')->get(['id']);
        foreach ($rows as $row) {
            DB::table('post')
                ->where('id', $row->id)
                ->update(['status' => 'public']);
        }
    }
```

- Khi thực hiện sửa đổi giá trị bản ghi cũ, hãy chú ý cân nhắc thật cẩn thận các trường hợp nhé, vì database là nền móng của một trang web, nếu database có vấn đề thì trang web của bạn cũng không thể chạy tốt được đâu.

<hr>

## Thay đổi primary key: 
### Bài toán đặt ra:
- Ví dụ bây giờ bạn làm một database để quản lí học viên và giáo viên. Ban đầu xác định đối tượng sử dụng là học sinh THPT trở xuống (một học viên có thể muốn học nhiều môn, nhưng một giáo viên chỉ dạy một môn), nên ta chỉ cần một bảng `student_subjects` để lưu lại là học viên đó muốn học môn nào. Cấu trúc của bảng đó sẽ như sau với khoá chính `primary key` là khoá hỗn hợp của 2 trường `student_id` và `subject_id` : 
```php
public function up()
{
    Schema::table('student_subjects', function ($table) {
        $table->unsignedInteger('student_id');
        $table->unsignedInteger('subject_id');
        $table->timestampt();
        $table->primary(['student_id', 'subject_id']);
    });
}
```

- Và bây giờ, khi bạn muốn phát triển hệ thống hơn, đối tượng sử dụng là sinh viên đại học, khi này một giáo viên có thể dạy được nhiều hơn một môn. Vấn đề đặt ra bây giờ là bạn sẽ phải tạo một bảng mới `teacher_subjects` riêng cho giáo viên hay dùng lại bảng cũ. 
    - Nếu bạn lựa chọn tạo bảng mới thì thôi không cần đọc tiếp phần này nữa đâu :D  
    - Nếu bạn lựa chọn cập nhật lại bảng cũ thì hãy cùng xem xem chúng ta cần làm gì nhé.
### Giải quyết:
- Trước hết hãy cùng xác định rõ những việc mà ta cần phải thực hiện nhé:
    - Một: đổi tên bảng (giờ dùng chung bảng cho student và teacher rồi mà), đổi tên cột `student_id` thành `user_id`
    - Hai: thêm 1 trường `user_type` để phân biệt đối tượng là student hay teacher.
    - Ba: thay đổi primary key của bảng thành khoá kết hợp của 3 trường `user_id`, `subject_id` và `user_type`

- Giờ cùng bắt tay vào việc nào:
    ```php
    public function up()
    {
        Schema::table('student_subjects', function ($table) {
            $table->dropPrimary(); //xoá khoá chính cũ
            $table->renameColumn('student_id', 'user_id'); //đổi tên cột 'student_id'
            $table->enum('user_type', ['teacher', 'student'])->after('user_id'); //thêm trường user_type kiểu enum
            $table->primary(['user_id', 'subject_id', 'user_type']); //tạo primary key mới
        });
        
        Schema::rename('student_subjects', 'user_subjects); //đổi tên bảng
    }
    ```
    
- Cũng đơn giản mà phải không, tuy nhiên migration không chỉ đơn giản có vậy. Nếu như các bạn để ý thì từ đầu bài đến giờ, phần code của mình chỉ viết `function up()` mà không có `function down()`.
- Nếu các bạn đã từng tìm hiểu về laravel chắc sẽ biết 2 function này khác gì nhau và chúng dùng để làm gì, còn đối với những **newbie** (series này là viết cho newbie mà :P) thì mình xin giải thích một chút.
    - `function up()`: function này sẽ được thực thi khi bạn chạy lệnh `php artisan migrate` theo thứ tự từ trên xuống dưới, và các file migration cũng sẽ chạy lần lượt từ file cũ nhất đến file mới nhất (tạm hiểu là từ A đến Z)
    - `function down()`:  function này sẽ được thực thi khi bạn chạy lệnh `php artisan migrate:reset` hoặc `php artisan migrate:rollback --step=?`. Và nó sẽ đảo ngược lại tất cả các hành động của `function up()`. Tức là nếu trong function up bạn tạo bảng thì bên trong down bạn sẽ phải xoá bảng. Vì chức năng đảo ngược của mình nên thứ tự thực hiện cũng ngược lại so với up, lần lượt từ file migration mới nhất đến file migration cũ nhất (từ Z đến A).
-  Rồi, giờ thì các bạn hãy thử viết các function down() nhé (phải tự làm thì mới ra được nhiều vấn đề chứ). Nếu chạy migrate mà thu được một màn hình commandline **đỏ chót** thì cũng đừng bất ngờ mà hãy cứ bình tĩnh [**đặt câu hỏi**](https://viblo.asia/questions/ask) để mọi người giúp đỡ! `HÃY RÚT RA BÀI HỌC TỪ CHÍNH NHỮNG SAI LẦM!`
<hr>

# Kết luận:
- Trên đây là một số bài toán mình nghĩ là các bạn sẽ gặp phải khi sửa đổi CSDL bằng migration trong Laravel. Rất mong mọi người góp ý thêm (cách giải quyết/bài toán) để  mình có thể hoàn thiện hơn nữa.
- Nếu có bất cứ vấn đề gì, hãy mạnh chia sẻ vấn đề của bạn bên dưới bài viết này hoặc vào [đây](https://viblo.asia/questions/ask) để được mọi người có thể hỗ trợ cho bạn nhé!
- Trong bài viết tiếp theo trong series, mình sẽ giới thiệu với các bạn về một ứng dụng rất hay để làm việc với CSDL thông qua commandline, đó chính là **Laravel Tinker**.
# Tài liệu tham khảo:
- Cái này thì không phải bàn rồi: https://laravel.com/docs/5.7/migrations
- Một trang hỏi đáp quen thuộc của cộng đồng IT https://stackoverflow.com/questions/