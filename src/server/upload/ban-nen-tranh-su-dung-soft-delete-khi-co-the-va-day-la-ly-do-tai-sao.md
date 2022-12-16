**Con người luôn luôn mắc sai lầm**. Vì vậy, việc "lo xa" trước mọi tình huống xấu nhất chưa bao giờ là thừa.

Những trường hợp như sơ suất của người quản trị vô tình xóa lộn, lỗi về logic ở trong mã nguồn, hay khi trang quản trị bị hacker chiếm và cố tình phá hoại,... Trong những trường hợp đó, nếu hệ thống được thiết lập từ trước tính năng **Soft Delete** - hay còn gọi là **xóa mềm** - thì sẽ hạn chế được rất nhiều rủi ro.

Tuy nhiên, liệu có phải việc áp dụng Soft Delete không hề có một điểm trừ? Tại sao **cá nhân mình không thích Soft Delete**, và đến lúc nào thì nó sẽ trở thành **kẻ ngáng đường** trong dự án của bạn? Trong bài này, mình xin được cùng các bạn tìm hiểu sâu hơn về Soft Delete, và hiểu được những điểm mạnh/yếu của nó.

![Bạn nên tránh sử dụng Soft Delete khi có thể, và đây là lý do tại sao](https://images.viblo.asia/013bd278-20d8-4ef2-a774-c5fb8844175c.jpg)

# I. Giải thích sơ qua về Soft Delete
Soft Delete (dịch tiếng Việt sơ sơ là "xóa mềm") dễ hiểu như cái tên gọi của nó vậy. Khi bạn có thực hiện xóa một dữ liệu nào đó (bài viết, tin nhắn,...), thì **thay vì xóa thực sự** trong CSDL, hệ thống sẽ chỉ đơn giản là **"giấu" nó đi**. Điều này thực hiện bằng cách đánh dấu vào một trường trong bảng đó với tên có dạng `is_deleted` (nếu để là boolean) hay `deleted_at` (nếu thích để kiểu null|datetime). Những bản ghi được đánh dấu là đã xóa đó sẽ không được hiện ra bên ngoài nữa.

![Schema của một bảng có sử dụng Soft Delete (xóa mềm)](https://images.viblo.asia/83864dd9-140f-4bd4-ab27-700bee9f0807.jpeg)

Một lý do chủ chốt khiến Soft Delete được ưa chuộng là nó **cực dễ thiết lập** mà không hề tốn công sức là bao. Chỉ cần bổ sung thêm cột `deleted_at` vào bảng muốn xóa mềm là bạn đã xong 90% phần việc, sau đó chỉ cần sửa các chỗ xóa trở thành câu lệnh `UPDATE` đánh dấu vào cột xóa mềm là xong. Mà với các framework web hiện đại thì công đoạn này quá dễ. Laravel đã [hỗ trợ sẵn Soft Delete](https://laravel.com/docs/8.x/eloquent#soft-deleting) ở cấp độ ORM, còn với Ruby on Rails thì chỉ việc cài thêm một gem bổ trợ như [discard](https://github.com/jhawthorn/discard).

# II. Soft Delete "phiền phức" hơn bạn nghĩ!
Ban đầu thì đơn giản thật, nhưng càng về lâu dài, Soft Delete càng có nhiều vấn đề nảy sinh mà bạn cần phải giải quyết:

## Unique Index và Primary key
Một trường hợp khá phiền phức là khi bạn Soft Delete một bản ghi có trường được đánh dấu là **Unique index** trong CSDL. Lấy ví dụ, ở bảng `users` với trường `username` có unique index, vì một số lý do mà tài khoản này bị xóa, và sau đó một người khác muốn đăng ký tài khoản mới với username y hệt. Lúc này, khi người dùng đăng ký tài khoản mới, phía ORM thì sẽ vẫn hiểu là tên tài khoản đó vẫn đăng ký được và **vượt qua quá trình validate** như bình thường. Nhưng vì bản ghi không bị xóa hẳn khỏi CSDL, sẽ có **lỗi trùng index** ở trường username xảy ra ở phía CSDL. 

Có 2 cách để xử lý trường hợp này:
- **Loại bỏ hẳn Unique index** khỏi trường username và phụ thuộc hoàn toàn vào validate từ phía app để đảm bảo username là duy nhất.
- **Tạo multi-column unique index** giữa trường `username` và `deleted_at`.

Cả 2 cách trên đều chẳng đẹp mấy vì hoặc là ảnh hưởng đến mức độ nguyên vẹn, hoặc gây phức tạp, rắc rối hơn cho CSDL.

## Vấn đề xóa cascade
Với gem `discard` của Rails hay tính năng soft delete có sẵn trong Eloquent, bạn có thể kích hoạt soft delete cho bất cứ bảng/model riêng lẻ nào:

``` ruby
class Post < ActiveRecord::Base
  include Discard::Model
end
```

``` php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;
}
```

Nhưng sẽ ra sao nếu **một `Post` lại có nhiều `comments`**? Hiện cả `discard` hay soft-delete của Laravel đều không tự xử lý việc xóa các bản ghi có quan hệ đến. Nhiều vấn đề sẽ nảy sinh, ví dụ như rất khó để **đếm `COUNT`** tổng số bình luận chính xác, hay khi web của bạn có phần "Bình luận mới nhất", cả **bình luận của bài viết đã xóa cũng sẽ xuất hiện** ở đó.

Để xử lý, bạn cần phải thêm Soft Delete cho cả model Comment nữa, và **sử dụng life-cycle hook/callback** ở bảng Post để xóa mềm cả các bình luận sau khi xóa mềm xong bài viết. Để cho thống nhất, một khi đã sử dụng xóa mềm ở một bảng, tốt nhất mọi bảng còn lại trong CSDL của bạn cũng đều nên kích hoạt xóa mềm theo.

Tuy đây là vấn đề giải quyết được, nhưng nó cũng làm tăng thêm mức độ phức tạp không hề nhỏ vào mã nguồn của bạn.

## Các câu lệnh query, `JOIN` khó khăn hơn
Cái này thì khỏi phải nói, nhất là trong trường hợp bạn cần viết cú pháp SQL thuần chứ không sử dụng ORM. Hầu như mọi câu query hay join đều sẽ cần bổ sung `WHERE deleted_at IS NULL`, vừa khiến câu query trông rối rắm, vừa dễ thiếu/nhầm lẫn.

Nhưng lý do "khó query" của mình chỉ là một phần nhỏ của vấn đề lớn hơn: mình thấy khó chịu với sự hiện hữu của trường `deleted_at` trong các bảng, đồng thời ghét việc các bản ghi bình thường và bản ghi đã bị xóa bị trộn lẫn với nhau ngay trong cùng một bảng. Nó có gì đó không khoa học/không "sạch sẽ" và không đúng lắm với cách sử dụng của cơ sở dữ liệu có quan hệ.

## Soft Delete cũng không hoàn toàn đảm bảo an toàn 
Soft Delete sẽ giúp hạn chế rủi ro xóa nhầm và dễ dàng khôi phục lại dữ liệu ngay sau khi xóa, nhưng **không thể chỉ ra được là ai là người thao tác xóa**, trừ khi bạn phát triển thêm tính năng này.

Mặt khác, Soft Delete cũng không để dành cho việc bảo vệ trước những **nhầm lẫn trong quá trình `UPDATE`**.

# III. Liệu có gì thay thế cho Soft Delete?
Khó có giải pháp nào khác thắng được Soft Delete ở mức độ tiện lợi, tuy nhiên mình có thể nghĩ ra được một vài ý tưởng như sau:

## Tạo gấp đôi số lượng bảng
Với mỗi bảng trong CSDL, tạo thêm một bảng khác với schema tương tự, chuyên dùng để lưu các bản ghi đã xóa. Ví dụ, **nếu mình có bảng `users`, mình sẽ tạo thêm bảng nữa là `deleted_users` với schema gần như y hệt**. Khi một user bị xóa, mình sẽ xóa user đó trong bảng `users` và tạo mới lại ở bảng `deleted_users`.

Nhược điểm là số lượng bảng trong CSDL sẽ trở nên nhiều đến gấp đôi, và có thêm sự phức tạp khi phải bảo đảm cho schema của bảng `users` và `deleted_users` phải giống nhau.

## Serialize dữ liệu và lưu lại lịch sử hoạt động
Với cách này, mỗi khi bạn áp dụng thay đổi lên bất cứ bản ghi nào (cho dù là update hay delete) thì tiến hành **serialize lại model, hoặc chuyển các trường trong bản ghi thành dạng JSON** rồi lưu vào một bảng khác với tên có thể là `activities` hay `histories`.

Ưu điểm lớn của cách này là bạn chỉ cần 1 bảng duy nhất để lưu lại các thay đổi, đồng thời bạn xem được lịch sử của từng lần thay đổi/xóa (và có thể lưu kèm cả tác nhân nữa nếu muốn). Tuy nhiên, mặc dù có khả thi, nhưng sẽ khó khăn hơn nhiều so với soft delete thông thường nếu bạn cần restore lại dữ liệu.

# IV. Tham khảo thêm
- [Soft Delete vs Hard Delete](https://abstraction.blog/2015/06/28/soft-vs-hard-delete)
- [Are soft deletes a good idea?](https://stackoverflow.com/questions/2549839/are-soft-deletes-a-good-idea)
- [Why should not we use soft deletes in the models/tables used for authenticating into the application](https://medium.com/@debiprasad/why-we-should-not-use-soft-deletes-in-the-model-table-which-used-for-authenticating-into-the-c350e5f1c2c9)
- [Why soft deletes are evil and what to do instead](https://jameshalsall.co.uk/posts/why-soft-deletes-are-evil-and-what-to-do-instead)