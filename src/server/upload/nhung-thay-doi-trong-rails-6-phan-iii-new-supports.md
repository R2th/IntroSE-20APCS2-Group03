![](https://images.viblo.asia/d1e72a84-bec2-452e-ae78-d2c979f6cc50.png)

Chào các bạn, chào các bạn! Để tiếp nối series những thay đổi trong rails 6. Hôm nay các bạn cùng mình tìm hiểu về những supports mới của Rails nha.

## 1. `db:seed:replant` task
**Tại sao cần task?**

Có rất nhiều lần chúng ta cần phải khôi phục seed data trong quá trình làm ở môi trường development hay staging và hơn thế nữa.

Điều này có thể vì những lý do khác nhau như cập nhật seed data, dữ liệu development bị lỗi, trước khi chúng ta có thể khôi phục các seed,  thông thường chúng ta sẽ xóa sạch mọi thứ trong database :D ( ví dụ: `rails db:migrate:reset`). Cách chúng ta thường làm là chạy `rails db:setup`. Điều này rebuilds cấu trúc database cho cả test và development và sau đó chạy `rails db:seed`, đó có thể là điều chúng ta không mong muốn.

Rails 6 thêm một thay thế thuận tiện hơn là: `rails db:seed:replant`.

**Vậy task mới này làm gì?**

Đầu tiên nó truncates tất cả các bảng cơ sở dữ liệu cho môi trường hiện tại và sau đó tải các seeds.

Xem thử ví dụ dưới đây, ta sẽ chạy task với `--trace` và xem nó làm những gì:
```
rails db:seed:replant --trace
```
```
** Invoke db:seed:replant (first_time)
** Invoke db:load_config (first_time)
** Invoke environment (first_time)
** Execute environment
** Execute db:load_config
** Invoke db:truncate_all (first_time)
** Invoke db:load_config
** Invoke db:check_protected_environments (first_time)
** Invoke db:load_config
** Execute db:check_protected_environments
** Execute db:truncate_all
** Invoke db:seed (first_time)
** Invoke db:load_config
** Execute db:seed
** Invoke db:abort_if_pending_migrations (first_time)
** Invoke db:load_config
** Execute db:abort_if_pending_migrations
** Execute db:seed:replant
```
Từ logs ở trên, chúng ta có thể thấy command thực thi theo các sub tasks theo trình tự:

**`db:load_config`**

Load cấu hình database cho môi trường hiện tại.

**`db:check_protected_environments`**

Điều này giúp bảo vệ khỏi việc vô tình chạy job trên các môi trường không phải test/development. Chẳng hạn, điều này ngăn chúng ta vô tình xóa tất cả các dữ liệu trên production. Task sẽ bị hủy bỏ nếu chúng ta cố gắng chạy trong môi trường này.
```
RAILS_ENV=production rails db:seed:replant
```
```
rails aborted!
ActiveRecord::ProtectedEnvironmentError: You are attempting to run a destructive action against your 'production' database.
If you are sure you want to continue, run the same command with the environment variable:
DISABLE_DATABASE_ENVIRONMENT_CHECK=1
/Users/puneetsutar/workspace/chat/bin/rails:9:in `<top (required)>'
/Users/puneetsutar/workspace/chat/bin/spring:15:in `<top (required)>'
bin/rails:3:in `load'
bin/rails:3:in `<main>'
Tasks: TOP => db:seed:replant => db:truncate_all => db:check_protected_environments
(See full trace by running task with --trace)
```

**`db:truncate_all`**

Đây là một rails task mới được thêm vào để hỗ trợ seed replant. Task này sẽ xóa dữ liệu khỏi tất cả các bảng cho một trường hiện tại ngoại trừ các bảng được dử dụng bên trong rails i.e
`schema_migrations` và `ar_internal_metadata`.
Command này cũng có thể được sử dụng riêng như một cách thuận tiện để truncate dữ liệu từ tất cả các bảng.

**`db:seed`**

Lệnh này để seed data.

**`db:abort_if_pending_migrations`**

Ném ra lỗi nếu có bất kỳ migrations nào đang chờ xử lý.

*Túm lại, `rails db:seed:replant` và hỗ trợ của nó `rails db:truncateall` thuận tiện để dọn dẹp development data trong Rails application.*

## 2. `rails notes` comment và `Rails::Command::NotesCommand`
`rails notes` được sử dụng để tìm những comment bắt đầu với keyword đặc biệt.

Rails 6 thêm `Rails::Command::NotesCommand` theo pattern cho Rails::Commands và cũng giới thiệu một số thay đổi hữu ích cho `rails notes` API.

Cách sử dụng `rake notes` cũ đã được sửa đổi để gọi command mới hơn với cảnh báo khi gọi API cũ.

**Trước Rails 6**

Trước đây, người ta phải sử dụng biến môi trường để tìm bình luận bắt đầu bằng custom keywords. Chẳng hạn như, để tìm comment bắt đầu bằng `frozen_string_literal`

```
rails notes:custom ANNOTATION=frozen_string_literal
app/channels/application_cable/channel.rb:
  * [1] true

app/channels/application_cable/connection.rb:
  * [1] true
```
Ngoài ra, chúng ta có thể sử dụng các certain tags trực tiếp. Chẳng hạn như, để tìm comments bắt đầu bằng TODO
```
rails notes:todo

app/controllers/user_controller.rb:
  * [ 56] nhungdt-1833 Pass varialbe to this function
```
**Rails 6**

Với Rails 6, chúng ta có thể sử dụng --annotations argument để search default tags hoặc pass chú thích đặc biệt.

Mặc định, để tìm comments bắt đầu với các default tags (`FIXME`, `OPTIMIZE`, `TODO`)
```
rollers/admin/users_controller.rb:
  * [ 40] [TODO] move business logic to model
  * [144] [FIXME] needs urgent attention for next deployment

lib/school.rb:
  * [ 18] [OPTIMIZE] refactor to a faster sql query
```
Và để tìm chú thích với các custom tags.
```
rails notes --annotations REFACTOR FIXME
app/controllers/products_controller.rb:
  * [ 55] [REFACTOR] need to refactor this controller code

app/controllers/admin/users_controller.rb:
  * [144] [FIXME] needs urgent attention for next deployment
```
Note: `rails notes:custom`, `rails notes:fixme`, `rails notes:todo`, `rails notes:optimize` đã được đánh dấu là không dùng nữa.

Gọi bất kỳ notes command với `rake` thay vì `rails` cũng không được chấp nhận.

## 3. Support for disabling database advisory locks
**3.1. Advisory Lock là gì?**

Databases cung cấp lock modes đa dạng để điều khiển truy cập đồng thời vào các bảng và data.

Advisory Lock cung cấp một cách thuận tiện để có được một khóa, ứng dụng hoàn toàn được thực thi và sẽ không block các thao tác ghi vào bảng.

**3.2. Lock database là gì?**

Khi một tiến trình application khởi động, chúng ta có thể có được một khóa trên một resource và sau đó giải phóng nó khi thoát chương trình. Bằng cách này, chúng ta đảm bảo rằng chương trình không chạy song song, đồng thời không thực sự chặn ứng dụng truy cập database.

Lợi ích của việc này là các bảng không bao giờ thực sự bị khóa để viết. Ứng dụng chính sẽ hoạt dộng bình thường và người dùng sẽ không bao giờ nhận thấy bất cứ điều gì xảy ra trong background.

Thêm chi tiết về Advisory Lock có sẵn trong [tài liệu](https://www.postgresql.org/docs/9.4/explicit-locking.html) Postgresql

**Trước Rails 6**

Mặc định, Active Record sử dụng các tính năng database như các câu lệnh prepare và advisory locks.

Rails sử dụng advisory lock khi cố gắng chạy một migration. Điều này đảm bảo rằng việc migrations đồng thời không kết thúc trên cùng một database.

Điều này tạo ra một số vấn đề khi sử dụng transaction được sử dụng để giảm tải cho các PostgreSQL servers bằng cách sử dụng shared connections.

Advisory locks không được chia sẻ trên các transactions, dẫn đến các vấn đề khi sử dụng các nhóm connection như PgBouncer trong chế độ tổng hợp transaction. Khi Rails kết thúc, điều này dẫn đến một `ActiveRecord::ConcurrentMigrationError` khi thử chạy database migrations khi sủ dụng PgBouncer.

**Trong Rails 6**

Một cách đơn giản để fix là disabling advisory lock. Điều này cho phép có quyền kiểm soát tốt hơn đối với bất kỳ connection nào ở bên ngoài mà chúng ta có thể muốn sử dụng như PgBouncer.

Để disable advisory lock, những gì chúng ta cần làm là chuyển đổi `advisory_locks` trong `database.yml` sang `false`
```
# database.yml
production:
  adapter: postgresql
  advisory_locks: false
```
Mặc định, advisory_locks được set là `true` và được sử dụng trong các phần của application khi chạy migrations.

Trên đây là một số support mình tìm hiểu được, hy vọng sẽ giúp ích cho các bạn. Hẹn gặp lại ở tập tiếp theo nha (bow)