# Giới thiệu chút
Với các bạn học Laravel, chắc chẳng ai xa lạ gì với Migration rồi, thậm chí các bạn học các ngôn ngữ khác cũng biết về Migration rồi, nhưng bài này mình sẽ chỉ nói về migation của Laravel thôi nhé, để đồng nhất các ví dụ mình đưa ra, và để tránh việc ko hiểu rõ các ngôn ngữ khác mà lại nói "xàm" vơ vào chung khiến các bạn nhầm lẫn nhé. Migration hỗ trợ chúng ta rất nhiều, bạn nào cũng ngờ ngợ thế, nhưng khi mình hỏi thử các thực tập sinh mới vào tại chỗ của mình, thì trả lời cho câu hỏi: "Migration dùng để làm gì?", thì hầu như các bạn đều ấp úng nghĩ nghĩ 1 chút rồi trả lời: "Để giúp tạo bảng cho Database ạ??", chứ cũng không nói được giúp gì ngoài việc tạo bảng và thêm sửa cột của bảng. Nhưng thực ra Migration còn hỗ trợ 1 vài thứ hay ho khác nữa cơ, giúp chúng ta "Quản lý phiên bản Cơ sở dữ liệu - như Git cơ bản vậy :D. Đi kèm theo đó sẽ là vài yêu cầu cho chúng ta, nhưng vì không hiểu công dụng nên khi bảo làm theo yêu cầu các bạn sẽ hơi khó chịu, vì nghĩ chả để làm gì. Vậy đọc bàu dưới để biết vì sao phải làm vậy nhé :) 
# Bắt đầu vào tìm hiểu nào
## Tên của migration
Mọi người mới tải Laravel về sẽ thấy có 2 migration được tạo sẵn, đó là Tạo bảng User và Tạo bảng Reset password. Tuy nhiên là 2 file tạo bảng này ko chỉ có tên đơn giản là CreateUser mà tên khá dài: `2014_10_12_000000_create_users_table.php` Vậy tại sao tên nó lại lằng nhằng vậy, mỗi lần migrate lẻ bảng là lại phải đi copy - paste tên dài dằng dặc đó cho mệt người? Trên thực tế, bạn có thể đặt tên cho file đó là gì cũng được, chạy đúng câu lệnh thì bên trong vẫn tạo được bảng bình thường. Nhưng nếu thử auto tạo file migration của Laravel với nhiệm vụ tạo bảng User chẳng hạn
```bash
php artisan make:migration create_users_table --create=users
```
< Tham khảo: https://laravel.com/docs/5.6/migrations >
Thì bạn sẽ thấy nó tạo 1 cái tên lằng nhằng như trên kia, chỉ khác số thôi. Những con số đầu tiên chính là thời điểm bạn tạo file, nó khiến cho bạn chỉ cần nhìn tên file sẽ thấy thời điểm của nó được tạo, cũng như biết thứ tự ưu tiên mà migration sẽ làm. Điều này sẽ có ích nếu như bạn có 2 file cùng với nội dung là `edit_users_table` ấy. 1 cái bạn tạo trước để thay đổi cấu trúc bảng User, sau đó lâu lâu bạn lại cần thay đổi gì đó, nhờ vào cái time này sẽ biết cái nào edit trước, cái nào edit sau khi nhìn lại code.

Còn cái thứ 2 trong tên file thì khỏi nói cũng biết, là tên bạn muốn đặt cho file. Tên này nên tường minh để sau này nhìn tên file là có thể biết file làm nhiệm vụ gì, vì vậy nên đặt theo thứ tự: 
```
<action>_<tên bảng thao tác tới>_table
```
Action sẽ bao gồm: Create, Edit/Update, Delete để biết nội dung hành động của file.
Còn các tham số còn lại thì nhìn là biết rồi nhỉ :D
> KL nguyên tắc 1: đặt tên file cho đúng cách.
## Bảng migration trong database
Nếu để ý bạn sẽ thấy, khi bạn migrate lần đầu thì đồng thời ngoài các bảng bạn chỉ định tạo, sẽ có thêm 1 bảng nữa được sinh ra: **migrations**. Và đồng thời mỗi khi bạn chạy lệnh migration tiếp theo, bảng này cũng sẽ được update.

Vậy nhiệm vụ của bảng này là để làm gì? Nhìn qua 1 chút về cấu trúc bảng nhé
![](https://images.viblo.asia/f9c05e10-75f4-4c40-a6ae-da696f9046d4.jpg)
Bảng migration chính là công cụ hỗ trợ "Quản lý phiên bản database" trên máy của bạn.

Bảng này có 3 cột: id, migration và batch

Cột id thì khỏi nói, ai cũng biết. Cột migration sẽ lưu tên các file đã được migrate. Mỗi khi bạn chạy lệnh migrate, Laravel sẽ check cái bảng này, đối chiếu tên của file migration trong folder của bạn với các file migration trong bảng, xem đã tồn tại file này chưa, nếu file đã có tên trong bảng, nó sẽ bỏ qua không thao tác gì vào file đó, đồng nghĩa với việc bạn đừng có tự ý đổi tên file migrate đấy nhé :D. Ngoài ra, một file khi đã bị "ghi vào sổ", cho dù bạn có thay đổi lung tung trong file thì có chạy `php artisan:migrate` bao nhiêu lần thì cũng chả apply được vào database của bạn đâu. Khi đó nhiều bạn bảo: em refresh cái là xong :v. Nếu bạn tự làm PJ cho vui thì bạn làm gì cũng được, vì vậy nên các bạn hay thấy rằng lệnh refresh giải quyết được tất cả. Nhưng lưu ý là lệnh này cũng sẽ xóa hết dữ liệu bạn đã lưu vào bảng nhé (Xóa bảng được nhiên là xóa luôn dữ liệu rồi =))). Hồi trước mình cũng ngây ngô nghe xúi dại, lúc đấy bị mắc migration không được, thế là đi hỏi, xong bị xúi: refresh đi em. Mặc dù đã thấy có gì đó nguy hiểm, nhưng vì tin người đi trước nên đã refresh, rồi mất hết đống dữ liệu mình mất công nhập vào cho PJ luôn (facepalm). Vậy nên đừng có dại mà tùy tiện refresh nhé, nếu là dữ liệu của khách bị mất là ăn chửi sấp mặt đấy.

> KL nguyên tắc 2: Đừng thay đổi tên file sau khi đã migrate.
> 
> KL nguyên tắc 3: Đừng chỉnh sửa các file đã được migrate

Tiếp theo là cột Batch. Cột này sử dụng để cho biết lượt chạy migrate của file đó. Batch = 1 tức là lần chạy `php artisan:migrate` đầu tiên đã xử lý những file này, lần lượt Batch 2, 3,... là những lần bạn chạy migrate tiếp theo. Nhờ vậy, migration có thể giúp bạn quản lý được phiên bản của Cơ sở dữ liệu của bạn. Ngoài việc cho biết thứ tự các lần chạy migration cho các file nào ra, thì cột Batch này còn là cơ sở cho việc roll back nữa. Các bạn đều biết, lệnh 
```bash
php artisan migrate:rollback
```
sẽ đưa CSDL quay về thời điểm trước lệnh migrate cuối cùng. Hay lệnh
```bash
php artisan migrate:rollback --step=3
```
sẽ đưa CSDL về thời điểm trước 3 lần migrate cuối cùng ấy. Thì việc xác định xem đâu là những file cần back lại chính là dựa vào batch. Các file có số batch lớn nhất chính là các file được migrate cuối cùng, đếm ngược lại sẽ có biết được các file cần roll back lại mỗi migrate. Vậy nên nếu không nhớ lần những lần migrate trước đã xử lý đến file nào để có thể rollback mọi người có thể nhìn bảng này để biết nhé.
> Tips: Dựa vào cột Batch trong bảng migration để chắc chắc cách lượt migrate và rollback chính xác

## Nội dung các file migrate
Dễ thấy rằng, khi các bạn sử dụng command để tạo file migration, sẽ thấy được viết sẵn 2 function `up()` và `down()` trong đó.

Function `up()` thì ai cũng biết, đây là nơi bạn viết nội dung bạn muốn file này thao tác tới database. Tuy nhiên function down() thì không phải ai cũng biết nó để làm gì.

Nếu sử dụng command để tạo bảng
```bash
php artisan make:migration create_posts_table --create=posts
```
bạn sẽ thấy mặc định function `up()` có nội dung là
```php
public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        //smt there
    });
}
```
và function `down()` sẽ có nội dung là
```php
public function down()
{
    Schema::dropIfExists('posts');
}
```
Tuy nhiên khi tạo migration dạng update table thì function `down()` mặc định lại không có gì cả. Nhiều bạn chỉ lo function `up()`, mà do ko biết nhiệm vụ của function `down()` nên cũng kệ nó trống luôn :v. 

Function `up()` sẽ phục vụ cho việc chúng ta migrate, tức là khi chạy `php artisan:migrate` thì function `up()` sẽ được gọi tới và thực hiện nội dung bên trong. Còn `down()` thì lại để làm ngược lại. Tức là ngược với function `up()` là chạy migrate, function `down()` sẽ được gọi đến khi chạy lệnh rollback. Không phải tự nhiên mà lệnh rollback có thể giúp ta "đảo chiều - revert" lại những gì chúng ta đã thực hiện trong function `up()`, mà khi đó, nó sẽ gọi đến các function `down()` tương ứng trong các file cần rollback, theo đúng thứ tự. Bạn viết gì trong `down()` thì rollback sẽ chạy cái đó, thế nên các bạn cần phải viết function `down()` là những gì đảo ngược của `up()` nhé. Ví dụ như ở `up()` là thêm cột, thì ở down phải là xóa cột nhé, nhưng nếu `up()` là tạo bảng kèm 1 lô các cột, thì `down()` chỉ cần drop cột là xong, ko cần phải xóa tựng cột xong mới drop bảng, nhanh gọn :D. 

Giờ thì ở ví dụ này sẽ có vài bạn nghĩ là: tên cột bị sai, có rollback lại thì tên nó vẫn được sửa lại thành đúng cũng chẳng sao cả, vì dù sao migrate này cũng là sửa sai thành đúng mà, nên chả cần viết `down()` là sửa lại về tên bị sai làm gì cả, thậm chí bỏ luôn function `down()` đi. Suy nghĩ này mình thấy nhiều bạn mắc phải. Điều này không được nhé. Bình thường các bạn chạy theo chiều xuôi sẽ không sao, function `down()` chưa có làm gì cả. Nhưng thử 1 ví dụ nhé: 
* Function `up()`: Bạn rename cột `name` thành `fullname`, bỏ qua việc revert lại cái này ở function `down()`.
 * Sau đó bạn cần phải rollback, sau đấy migrate lại 1 vài file, trong đó có file này. Đoán xem chuyện gì nào? Function `up()` của file được lệnh là tìm tới cột tên là `name`, sau đó đổi lại thành `fullname`, nhưng mà hiện tại chả có cột nào trong bảng tên là `name` cả, chỉ có cột `fullname` thôi. Vậy là "bùm", lỗi đỏ choét hiện ra command báo lỗi không tìm thấy cột `name` để mà thao tác. Vậy là tất cả các dòng lệnh, file phía sau xếp hàng chờ đến lượt bị dừng lại, không được thực hiện. Giờ mới hối hận ko viết function `down()`, phải đi fix thôi. Nếu là code ko phải bạn viết mà thằng khác viết bạn còn ngớ ra mất thời gian đi tìm nguyên nhân rồi fix cơ, xong ngồi chửi nó :D. 

Vậy đấy, nên là các bạn cứ gặp lỗi mới thấm được cái lỗi này vớ vẩn đến thế nào. Nên là nhớ rằng:
> KL nguyên tắc 3: Không được bỏ qua function `down()`, Không được bỏ qua function `down()`, Không được bỏ qua function `down()`

Điều quan trọng nhắc lại 3 lần :D
> KL nguyên tắc 4: Function `down()` phải là nghịch đảo chính xác của function `up()`

À đến đoạn giải thích này thì có vài đứa nói với mình rằng: Em refresh chắc không sao đâu mà. Nhưng đừng quên bản chất của việt refresh chính là: rollback lại toàn bộ, sau đó migrate lại từ đầu toàn bộ. Nên vẫn lỗi bình thường thôi nhé. 
## Kết
Sau một thời gian làm Project thực, với nhiều lần migrate báo lỗi mình mới rút ra được những gì trên kia, nên các bạn đừng thấy ngạc nhiên vì sao mình chưa biết mấy cái đấy. Phải làm nhóm, team mate lớ ngớ để mình dính lỗi, rồi mình làm lỗi cho team mate bị dính, vài lần là nhớ ngay :D. Mình chỉ là chia sẻ sớm cho các bạn hiểu vì sao phải theo mớ quy tắc lằng nhằng, rồi ngồi ấm ức vì rule vớ vẩn mà không được chấp nhận code, chứ ko nói sớm thì sau này bạn cũng sẽ dính lỗi và tự biết thôi :D, nhưng mà lúc đấy có đi kèm hậu quả ra sao thì cũng khó nói lắm =)).