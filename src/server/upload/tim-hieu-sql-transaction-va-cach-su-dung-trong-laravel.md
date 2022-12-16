# Bài toán thực tế
Trước khi tìm hiểu về SQL Transaction là gì và cách sử dụng như thế nào thì bạn cùng xem qua một bài toán dưới đây để hình dung ra cách áp dụng transaction khi nào nhé.

Trong giao dịch ngân hàng:  Tài khoản anh A có  5 tỉ, chị B có 0 đồng :disappointed_relieved: , một ngày đep zời, anh A chuyển cho chị B 2 tỉ để mua máy bay. 

![](https://images.viblo.asia/6c6ec422-c99c-46c3-9fa1-0f621fcd5e99.jpg)

Sẽ có hai phép cập nhật diễn ra trong hệ thống ngân hàng như sau:
* Trừ đi 2 tỉ trong tài khoản anh A
    *  Tài khoản anh A còn 3 tỉ.
    *  Câu lệnh SQL tương ứng: `UPDATE VÍTIỀN SET tiền=3tỉ WHERE tên=anhA`
  
* Cộng thêm 2 tỉ vào tài khoản chị B
    *  Tài khoản chị B lúc này là 2 tỉ.
    *  Câu lệnh SQL tương ứng: `UPDATE VÍTIỀN SET tiền=2tỉ WHERE tên=chịB`

Tuần tự thực hiện là vậy. Tuy nhiên do số đen, lệnh cộng thêm tiền vào tài khoản chị B bị lỗi. Thế là tài khoản anh A thì mất 2 tỉ, còn chị B vẫn 0 đồng nên ko thể mua máy bay đi chơi.

Điều này không thể chấp nhận được vì 2 tỷ bỗng dưng biến mất! Khi thực hiện hai lệnh trên trong một transaction, nó sẽ đảm bảo:

* Hoặc cả hai lệnh update đều được thực hiện thành công. Cả hai tài khoản được cập nhật với số tiền tương ứng.
* Hoặc trong trường hợp giao dịch bị lỗi cả hai lệnh đều không được thực hiện. Hai tài khoản giữ nguyên số tiền như trước khi thực hiện giao dịch  (trước khi anh A chuyển tiền)

Để hệ thống làm được các việc trên, rất đơn giản, cùng mình tìm hiểu SQL Transaction trong bài viết này nhé.

# Transaction là gì?
Transaction trong SQL là một nhóm các câu lệnh SQL, xử lý có tuần tự các thao tác trên cơ sở dữ liệu . Nếu một transaction được thực hiện thành công, tất cả các thay đổi dữ liệu được thực hiện trong transaction được lưu vào cơ sở dữ liệu. Nếu một transaction bị lỗi và được rollback thì tất cả các sửa đổi dữ liệu sẽ bị xóa (dữ liệu được khôi phục về trạng thái trước khi thực hiện transaction).

![](https://images.viblo.asia/3c6e79b1-a489-4e26-9684-e4264a48eb99.jpg)

Transaction có một chuẩn gọi là ACID bao gồm 4 thuộc tính:
* **Atomicity** (Tính tự trị): Đảm bảo tất cả các hành động trong phạm vi một đơn vị transaction là thành công hoàn toàn. Ngược lại, transaction sẽ bị dừng ngay ở thời điểm lỗi, và sẽ phục hồi quay ngược (rollback) lại thời điểm chưa xảy ra sự thay đổi.
* **Consistency** (Tính nhất quán): Đảm bảo tất cả các thao tác trên cơ sở dữ liệu được thay đổi sau khi giao dịch thành công và không xảy ra lỗi.
* **Isolation** (Tính cô lập): Đảm bảo transaction này hoạt động độc lập so với transaction khác. Ví dụ C đang chuyển tiền thì sẽ không liên quan tới D chuyển tiền.
* **Durability** (Tính bền vững): Đảm bảo kết quả hoặc tác động của transaction vẫn luôn tồn tại, kể cả khi hệ thống xảy ra lỗi.


# Xử lý Transaction
Các lệnh sau đây được sử dụng để xử lý transaction:

* **COMMIT**: để lưu các thay đổi.
* **ROLLBACK**: để khôi phục lại các thay đổi.

Các lệnh điều khiển transaction chỉ được sử dụng với các lệnh thao tác dữ liệu DML như: INSERT, UPDATE và DELETE.

Chúng không thể được sử dụng trong lệnh CREATE TABLE hoặc DROP TABLE vì các hoạt động này được tự động được commit trong cơ sở dữ liệu.

# Sử dụng Transaction trong MySQL

Một transaction được bắt đầu với câu lệnh:

```sql
START TRANSACTION;
BEGIN;
```

Nhưng trước khi sử dụng bạn nên sử dụng câu lệnh: SET autocommit = 0 ở trước, mặc định thuộc tính autocommit = 1, Transaction sẽ được tự động hoàn thành mà không cần phải sử dụng COMMIT hoặc ROLLBACK.


Ví dụ:

```sql
SET autocommit = 0;
START TRANSACTION;
BEGIN;
UPDATE VÍTIỀN SET tiền=3tỉ WHERE tên=anhA;
UPDATE VÍTIỀN SET tiền=2tỉ WHERE tên=chịB;
COMMIT;
ROLLBACK;
```


# Sử dụng Transaction trong Laravel
Nếu bạn đang làm việc với Laravel thì việc sử dụng Transaction rất đơn giản :D

Sử dụng phương thức transaction trong DB facade để bắt đầu 1 transaction, kiểu như này

```php
use DB;

......

DB::transaction(function () {
    DB::table('users')->update(['votes' => 1]);

    DB::table('posts')->delete();
});
```

Nếu một exception bị bắn ra từ trong transaction Closure, transaction sẽ tự động được rollback lại. Nếu Closure thực thi thành công, transaction sẽ tự động được commit. Laravel sẽ tự động rollback hoặc commit khi sử dụng hàm transaction nên bạn ko cần lo lắng về 2 thao tác trên (rollback hay commit).


**Xử lí Deadlocks**

Method transaction có thêm 1 tham số thứ 2 là số lần thực hiện lại transaction nếu trình trạng Deadlocks (bế tắc) xảy ra. Khi lặp số lần đấy mà transaction vẫn chưa được commit thì một exception sẽ được bắn ra.

```php
use DB;

...

DB::transaction(function () {
    DB::table('users')->update(['votes' => 1]);

    DB::table('posts')->delete();
}, 5);
```


**Thực hiện transaction thủ công**

Bạn có thể thao tác quản lý transaction một cách thủ công như khi nào mới rollback hoặc khi nào mới commit một cách tùy ý:

```php
// Bắt đầu các hành động trên CSDL
DB::beginTransaction();
...

//Commit dữ liệu khi hoàn thành kiểm tra
DB::commit();
...

//Gặp lỗi nào đó mới rollback
DB::rollBack();
...
```

Một ví dụ đơn giản cho bạn dễ hiểu nhé:

```php
public function doAction()
{
    DB::beginTransaction();
    try {
        DB::table('users')->update(['votes' => 1]);
        DB::table('posts')->delete();
        
        DB::commit();
    } catch (Exception $e) {
        DB::rollBack();
        
        throw new Exception($e->getMessage());
    }
}
```

Trong method doAction:
* Bắt đầu transaction với `DB::beginTransaction();`
* Việc thực hiện câu lệnh SQL `DB::table('users')->update(['votes' => 1]);` và  `DB::table('posts')->delete();` mình bỏ vào khối try catch
* Nếu try thực hiện 2 lệnh thành công thì  `DB::commit();` => Xác nhận transaction hoàn thành và lưu lại các thay đổi trong database từ lệnh SQL update.
* Nếu có lỗi và nhảy vào catch thì  `DB::rollBack();` => Quay lại từ lúc transaction chưa được thực hiện (không lưu các  thay đổi trong database từ lệnh SQL update ) đồng thời bắn ra 1 exception.

Cũng dễ hiểu mà nhẩy. :violin: :dancer: 

# Kết luận
Trên đây mình đã giới thiệu với bạn SQL Transaction là gì? Cách sử dụng trong MySQL và Laravel như thế nào. Hi vọng từ bài viết này bạn có thể hiểu về Transaction và áp dụng vào các bài toán của mình. Nếu có thắc mắc và góp ý bạn comment phía dưới nhé. Cảm ơn bạn.

Tham khảo: https://laravel.com/docs/5.7/database#database-transactions