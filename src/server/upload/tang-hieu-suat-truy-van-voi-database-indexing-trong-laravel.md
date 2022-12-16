# 1. Lời mở đầu
* Với những ứng dụng Laravel nhỏ với ít dữ liệu, chúng ta thường không nhận thấy được sự ảnh hưởng rõ rệt của các câu truy vấn mà bạn sử dụng. Tuy nhiên, khi dữ liệu trở lên khổng lồ, bạn sẽ thấy ứng dụng của bạn chạy quá chậm chạp và bạn nghĩ đến ngay phải tối ưu hóa ứng dụng của bạn, đặc biệt là cải thiện hiệu suất của các câu truy vấn đến dữ liệu.
* Trong bài viết này, mình sẽ trình bày một trong những cách để tăng hiệu suất của các câu truy vấn giúp việc truy vấn đến dữ liệu lớn trở lên nhanh hơn, đó là đánh index cho cơ sở dữ liệu (Database Indexing)
# 2. Database Index là gì?
* Nếu bạn chưa từng nghe về  database indexing trước đây, bạn không biết nó là gì, thì có thể bạn sẽ ngạc nhiên khi bạn biết rằng bạn đã sử dụng database index khá nhiều lần. Nếu bạn từng tạo một cái bảng SQL với khóa chính (primary key - thường là cột id) thì MySQL đã thực sự tạo một index cho cột id đó (index này được gọi là PRIMARY)
 * Hãy tưởng tưởng việc bạn đánh chỉ mục cho bảng trong cơ sở dữ liệu của bạn như là bạn đánh số trang tạo mục lục cho 1 quyển sách của bạn. Index sẽ giúp bạn tìm chính xác hàng hoặc các hàng trong bảng một cách nhanh chóng mà không cần phải quét lần lượt các hàng trong toàn bộ bảng mỗi lần.
 * Như đã nói, với các cơ sở dữ liệu nhỏ, hiệu suất đạt được của việc đánh index là thấp, bởi dù sao việc truy vấn các cơ sở dữ liệu nhỏ đã rất nhanh rồi. Tuy nhiên một khi bảng của bạn bắt đầu tăng trưởng về kích thước, lên đến hàng triệu bản ghi, thì bạn sẽ bắt đầu nhận thấy tác động đáng kể đến hiệu suất khi truy vấn mà không đánh chỉ mục.
 * Tuy nhiên, chúng ta cũng cần phải cân nhắc khi đánh index cho cơ sở dữ liệu, không phải lúc nào đánh index cũng đem lại hiểu quả cao. Đối với các bảng nhỏ, khi đánh index có thể sẽ khiến MySQL làm việc vất vả hơn bởi nó phải xử lý các index khi chạy câu query và việc ghi các câu query sẽ chậm hơn do nó phải xây dựng lại các chỉ mục. Do vậy chúng ta chỉ nên thêm vào các index cho một bảng khi bảng đó bắt đầu tăng trưởng về kích thước.
# 3. Trình bày vấn đề
* Ở đây, mình sẽ không trình bày việc tạo một ứng dụng Laravel cơ bản. Giả sử chúng ta đã có một ứng dụng Laravel với Model User, model Task và một relationship đơn giản giữa hai Model là một User có nhiều Task phải làm.
* Hãy tưởng tưởng thêm nữa là bây giờ một User có ~2.4 million task, và chúng ta muốn lấy ra tất cả các task của một User. Với Laravel chúng ta làm thế này:
```php
$user = User::find(1);
$tasks = $user->tasks()->get();
```
* Đầu tiên bạn sẽ nhận thấy là trang web của bạn sẽ không tải được do PHP sẽ hết bộ nhớ. Sẽ có message lỗi thông báo kiểu thế này: "Allowed memory size of X bytes exhausted"
* Đoạn code trên của Laravel sẽ được Laravel generate ra câu query SQL như sau
```
SELECT * FROM `tasks` WHERE `tasks`.`user_id` = 1 AND `tasks`.`user_id` IS NOT NULL
```
Chúng ta thử bê câu query trên vào MySQL Server để chạy thử nhé, và kết quả trên máy của mình chạy sấp sỉ 1s. Không hay cho lắm.
* Để giúp chúng ta debug vấn đề này, chúng ta có thể sử dụng câu lệnh [EXPLAIN](https://dev.mysql.com/doc/refman/8.0/en/explain.html) của MySQL. Nó sẽ giúp chúng ta hiểu rõ cái gì đang xảy ra phía sau. Vẫn dùng câu query bên trên nhưng chúng ta sẽ thêm EXPLAIN vào đầu câu.
```
EXPLAIN SELECT * FROM `tasks` WHERE `tasks`.`user_id` = 1 AND `tasks`.`user_id` IS NOT NULL
```
* Câu truy vấn bên trên sẽ cung cấp cho chúng ta một loạt các thông tin, nhưng chúng ta hãy quan tâm vào các trường quan trọng là `possible_keys` và `key`. Hai trường này cho chúng ta biết các index nào (các key) có sẵn để sử dụng và các index nào đã được sử dụng trong câu query. Trường `rows` cho chúng ta biết bao nhiêu bản ghi đã được quét bởi câu query. Kết quả của việc chạy câu query trên:
![](https://images.viblo.asia/b84d7d81-54b6-4ec3-90a5-7415e17d8bcf.png)

Kết quả cho thấy không index nào được sử dụng và chúng ta phải quét qua tất cả ~2.4 triệu bản ghi. Như vậy chắc hẳn query sẽ mất rất nhiều thời gian.
# Đánh chỉ mục cho Database
* Với vấn đề đặt ra như trên, chúng ta hãy cùng xử lý bằng cách đánh chỉ mục cho cột `user_id` của bảng tasks. Chúng ta sẽ làm trong Laravel bằng cách tạo một migration và add index cho bảng sử dụng phương thức `$table->index()`:
```php
Schema::table('tasks', function (Blueprint $table) {
    $table->index('user_id');
});
```
* Sau khi chạy migration để thêm index, chúng ta hãy chạy lại câu query để xem nó mất bao nhiêu thời gian nhé, xấp xỉ 500ms! Chạy lệnh EXPLAIN để xem cái gì đã diễn ra behind the scenes nhé:
![](https://images.viblo.asia/3e88a4d7-601c-4469-90fd-9cf98e84895a7.png)

* Chúng ta có thể thấy câu query bây giờ sử dụng `possible_key` là `task_user_id_index` mà chúng ta vừa mới tạo. Và với việc sử dụng  index này số lượng các hàng mà câu query quét qua giảm từ 2.4 million xuống ~400,000. Thành công!
* Có một lưu ý khi đánh index. Nếu bạn có nhiều mệnh đề `WHERE` trong câu query thì bạn có thể đánh một index cho nhiều cột, gọi là **compound index**, bao gồm tất cả các trường rong mệnh đề `WHERE`. Ví dụ, câu query của chúng ta như sau:
```
SELECT * FROM `tasks` WHERE `tasks`.`user_id` = 1 AND `tasks`.`created_at` >= '2020-23-08 17:02:00'
``` 

Chúng ta có thể đánh một **compound index** như thế này :
```
Schema::table('tasks', function (Blueprint $table) {
    $table->index(['user_id', 'created_at']);
});
```
Kết quả là có thể cải thiện hiệu suất câu truy vấn khoảng 50% nữa.
*  Một số lưu ý khi đánh chỉ mục.
    * Thêm nhiều index sẽ làm tăng kích thước cơ sở dữ liệu và RAM sử dụng cho cơ sở dữ liệu (MySQL lưu trữ các index trong bộ nhớ).
    * Thứ tự của các trường trong một compound index có thể có tác động đến kết quả. Thông thường, chúng ta sẽ sắp xếp các chỉ mục theo thứ tự sử dụng nhiều nhất đến ít sử dụng nhất. 
# Kết Luận
* Bây giờ chúng ta đã hiểu được cơ bản tại sao đánh chỉ mục cho cơ sở dữ liệu lại quan trong với hiệu suất như vậy và cách chúng ta đánh chỉ mục trong một ứng dụng laravel. Và nếu bạn chưa thực thi nó trong cơ sở của bạn, hãy cân nhắc để sử dụng nhé.
Nếu bạn có góp ý hay bí kíp gì về database indexing, hãy comment chia sẻ với mình nhé.
* Nguồn tham khảo : https://deliciousbrains.com/optimizing-laravel-database-indexing-performance/