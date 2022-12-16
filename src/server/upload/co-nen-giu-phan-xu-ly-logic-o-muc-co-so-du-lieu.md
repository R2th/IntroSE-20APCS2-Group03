# Giới thiệu

Trong các ứng dụng tương tác với cơ sở dữ liệu quan hệ, thường phải cập nhật một số dữ liệu nhất định khi một số dữ liệu khác bị thay đổi, và Rails cung cấp cho chung ta **ActiveRecord callback** để xử lý các trường hợp này. Tuy nhiên, trong 1 vài trường hợp, ta cần phải đưa phần xử lý này vào trong cơ sở dữ liệu. Lý do đơn giản nhất là để tối ưu hoá, giảm tải cho ứng dụng và cải thiện hiệu suất tổng thể của ứng dụng.

Một ví dụ khác về sự cần thiết cho việc đưa phần xử lý logic vào cơ sở dữ liệu là khi dữ liệu được sử dụng cho nhiều ứng dụng khác nhau, khi này việc sử dụng ActiveRecord callback sẽ không đảm bảo phần xử lý logic cho tất cả các ứng dụng. Ý tưởng tồi tệ hơn là viết các phần xử lý logic tương ứng cho các ứng dụng cho tất cả ứng dụng, việc này làm cho việc phát triển ứng dụng trở nên bất tiên, logic bị phân tán. Đó là lý do tại sao nên giữ phần xử lý callback ở mức cơ sở dữ liệu.

## Trigger vs ActiveRecord callback

### ActiveRecord callback
* Tập hợp tất cả phần xử lý logic trong model khiến cho việc bảo trì dễ dàng hơn.
* Có thể sử dụng các ActiveRecord helper do Rails cung cấp.
* Viết code Ruby dễ viết, dễ đọc hơn là viết các câu lệnh SQL.
* Dễ dàng debug.
### Trigger
* Hiểu quả với dữ liệu lớn, tốc độ thực thi nhanh hơn callback.


**Bạn nên sử dụng callback nếu bạn quan tâm tới việc code ngắn gọn, dễ đọc, dễ viết, còn nếu bạn quan tâm tới hiệu suất thì nên sử dụng trigger.**


# ActiveRecord migration

Trong các ứng dụng Rails có một công cụ tiêu chuẩn để quản lý cấu trúc cơ sở dữ liệu  (ActiveRecord :: Migration). Ngoài việc xác định cấu trúc, nó cho phép thực thi SQL thô. Điều đó có nghĩa là bạn có thể thêm, chỉnh sửa hoặc xóa các trigger, store procedures, v.v ... Cách tiếp cận này có một số nhược điểm:

* Đầu tiên, bất kỳ thay đổi trigger hoặc store procedures nào cũng phải migrate lại.
* Thứ hai, khi bạn muốn sửa các  trigger hoặc store procedures liên quan đến logic, bạn phải tìm kiếm trong số các lần migrate trước đó, nơi các phần liên quan đến logic không phải luôn nằm cạnh nhau.
* Thứ ba, nếu phần xử lý callback là một phần logic của ứng dụng thì nó sẽ dễ quản lý hơn nếu để nó ở cùng với phần còn lại.

# Khắc phục nhược điểm

Để xử lý các nhược điểm trên, bạn có thể tạo folder sql để lưu trữ các file sql với các trigger và store procedures. Sẽ tốt hơn nếu nhóm các file sql này lại với nhau thay vì để chúng chồng chất cùng các file khác trong thư mục db/migrates

```
app/
    assets/
    controllers/
    models/
    sql/
    views/
```

Khi đã tạo folder sql xong, bạn cần tìm cách để thực thi các file này với cơ sở dữ liệu. Để làm được điều này, bạn có thể viết rake task để xử lý phần này.

```
task :import_sql do
    # The logic of importing sql to database
end
```

Có vài vấn đề, mỗi lần bạn sửa lại file sql thì phải chạy lại rake. Bạn cần thông báo tới các người lập trình khác về cái task này. Một phương pháp đơn giản hơn dựa trên thực tế là có thể đặt các rake task có cùng tên với nhau, chúng sẽ được xếp lần lượt chứ không ghi đè lên nhau, vì vậy chúng ta có thể sử lại thành như sau:

```
namespace :db do
  task :migrate do
    # The logic of importing sql to database
  end
end
```

Với cách này, bạn không cần thay đổi tập lệnh triển khai của mình - deploy-scripts (chạy migrate tkhi triển khai là một điều rất phổ biến). 
Tiếp theo, bạn cần thực hiện nhập các file sql vào cơ sở dữ liệu, đoạn code sẽ tương tự như sau:

```
Dir[Rails.root + "/app/sql/*.sql"].each do |file|
     sql = File.read(file)  
     ActiveRecord::Base.connection.execute(sql)
end
```

Với đoạn code như trên, ứng dụng sẽ đọc từng file sql, bạn có thể tối ưu hơn nếu gộp các file sql lại thành 1 rồi mới tiến hành nhập vào cơ sở dữ liệu. Thât may, công cụ cần thiết để thực hiện điều này đã được cung cấp bởi cộng đồng Rails, bạn có thể xử lý các file này tương tự như assests, tức là bạn có thể gộp các file sql này lại với sự trợ giúp của Sprockets.

# Tổng kết

Tóm lại, các bước đầy đủ để giải quyết vấn đề này:

1.  Tạo folder sql trong folder app:
```
app/
  sql/
    application.sql
    user.sql
    product.sql
```

File application.sql trông giống như thế này:
```
/*
  *= require user.sql
  *= require product.sql
*/
```

2.  Tạo rake-task với cấu trúc như sau:
```
namespace :db do
      task :migrate do
            environment = Sprockets::Environment.new do |env|
                              env.register_mime_type('text/sql', '.sql')
                              env.register_processor('text/sql', Sprockets::DirectiveProcessor)
                              env.append_path 'app/sql'
                            end
             ActiveRecord::Base.connection.execute environment['application.sql'].to_s
      end
end
```

Và đấy là tất cả cách bước cần thiết.

Tuy nhiên, có một nhược điểm nhỏ của việc quản lý logic ở mức cở sở dữ liệu trong một ứng dụng Rails với cách tiếp cận này. Trước khi khai báo một function, trigger hay store proceduce phải có **DROP (FUNCTION / TRIGGER)** của riêng mỗi   function, trigger, store proceduce, hoặc sử sụng **CREATE OR REPLACE**. Các file sql sẽ không được quản lý bởi cơ chế migration, vì vậy ứng dụng sẽ không biết các file sql đã được chạy trước đó hay chưa, nên mỗi khi sử dụng lệnh rake db:migrate thì các file sql này sẽ được thực thi lại.

# Bonus

Ngoài cách trên, cộng đồng Rails cũng cung cấp gem hair-trigger để giải quyết vấn đề tương tự như này. Gem hair-trigger giúp bạn tạo và quản lý các triggers một cách ngắn gọn và hiệu quả. Tất cả công việc bạn cần làm chỉ là khai báo trigger trong model, sau đó chạy rake task để thực thi các trigger đó.

Trước tiên, bạn cần cài đặt gem hair-trigger cho ứng dụng trước đã:
```
gem 'hairtrigger' #hoạt động ổn định với các phiên bản Rails 5.0 trở đi
```

Sau đó, chạy bundle install.

Khi đã cài đặt xong gem hair-trigger, việc bạn cần làm tiếp theo là khai báo các trigger trong model.

VD:

```
class AccountUser < ActiveRecord::Base
      trigger.after(:insert) do
            "UPDATE accounts SET user_count = user_count + 1 WHERE id = NEW.account_id;"
      end

      trigger.after(:update).of(:name) do
            "INSERT INTO user_changes(id, name) VALUES(NEW.id, NEW.name);"
      end
end
```

Sau đó chạy lệnh rake db:db:generate_trigger_migration để tiến hành migration các triggers. Nếu bạn sử dụng MySQL thì kết quả sẽ tương tự như này:

```
CREATE TRIGGER account_users_after_insert_row_tr AFTER INSERT ON account_users
FOR EACH ROW
BEGIN
    UPDATE accounts SET user_count = user_count + 1 WHERE id = NEW.account_id;
END;

CREATE TRIGGER account_users_after_update_on_name_row_tr AFTER UPDATE ON account_users
FOR EACH ROW
BEGIN
    IF NEW.name <> OLD.name OR (NEW.name IS NULL) <> (OLD.name IS NULL) THEN
        INSERT INTO user_changes(id, name) VALUES(NEW.id, NEW.name);
    END IF;
END;
```

## Trigger group
Hair-trigger cho phép bạn nhóm các triggerlại với nhau. Điều này rất quan trọng, vì MySQL phiên bản hiện tại chỉ hỗ trợ 1 trigger trên 1 bảng cho cùng 1 hành động tại và cùng 1 thời điểm.

VD:
```
trigger.after(:update) do |t|
  t.all do # every row
    # some sql
  end
  t.of("foo") do
    # some more sql
  end
  t.where("OLD.bar != NEW.bar AND NEW.bar != 'lol'") do
    # some other sql
  end
end
```

Đây là một vài kiến thức cơ bản để sử dụng hải-trigger, để biết thêm chi tiết bạn có thể tìm hiểu tại: https://github.com/jenseng/hair_trigger

Tham khảo: https://anadea.info/blog/sql-as-app-part