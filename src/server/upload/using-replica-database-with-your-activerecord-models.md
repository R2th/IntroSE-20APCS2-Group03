Thỉnh thoảng, chúng ta phải đối mặt với vấn đề: đi cùng với mô hình Mysql thông thường, chúng ta cũng có một replica database.

Replica database này dường như được giữ đồng bộ với database production, nhưng nó không được sử dụng bởi các web servers hay các background workers, mọi thứ trong đó chỉ có thể được sử dụng làm dữ liệu đọc(read-only).

Tại sao chúng ta quan tâm đến nó? Trong các hệ thống lớn ngày nay, thường có các page dashboard, trên đó có một số tính năng làm việc với lượng thông tin dữ liệu lớn như: hiển thị các số liệu thống kê, thông tin về trạng thái của một số modul trong hệ thống... 
Trong các bài toán này, vấn đề sẽ đơn giản nếu chúng ta không phải quan tâm đến các số liệu thống kê realtime, thì chỉ việc truy vấn các dữ liệu trong database và lưu kết quả vào cache.

Mọi việc sẽ trở nên phức tạp nếu chúng ta quan tâm đến các số liệu chính xác theo thời gian thực, chính xác đến từng giây, khi đó vấn đề tối ưu các câu truy vấn nhằm trả về các số liệu nhanh và chính xác nhất là nhiệm vụ then chốt. Đó là lúc các bạn có thể cần đến replica database, và tìm hiểu mô hình kết nối nó với Active Record trong ứng dụng Rails.

Ý tưởng ban đầu của chúng ta là implement trên mỗi table riêng biệt mà chúng ta muốn sử dụng khi truy vấn replica:

```
class Account < ActiveRecord::Base
end
class Account
  class Replica < ActiveRecord::Base
     establish_connection "leadfeeder_replica_#{Rails.env}".to_sym
   end
end
```

Trong đó, config leadfeeder_replica_#{env} được định nghĩa trong file database.yml cho mỗi môi trường mà chúng ta sử dụng(development, test, production...), bằng cách này chúng ta sẽ có được sự linh hoạt trong các câu truy vấn:

```
leadfeeder_replica_production:
  database: dummy_db
  username: user
  password: pass
  host: leadfeederreplica.aws.com
  port: 3306
leadfeeder_replica_development:
  <<: *development
```

Như các bạn có thể thấy, dường như không thực sự DRY để định nghĩa các modul này trong mỗi model. Ngoài ra chúng ta phải nhớ gọi readonly! trên các bản ghi replica để ngăn chăn việc ghi vào database này. Việc này có thể được thực hiện tự động cho mỗi model bằng việc sử dụng callback after_initialize trong active record:

```
class Account
  class Replica < ActiveRecord::Base
     establish_connection "leadfeeder_replica_#{Rails.env}".to_sym
     after_initialize :readonly!
  end
end
```

Nhưng điều này vẫn chưa giải quyết được vấn đề DRY trên các model. Giải pháp được đưa ra là sử dụng ActiveSupport::Concern kết hợp với callback included:

```
module LeadfeederReplica
  extend ActiveSupport::Concern
  included do |klass|
    database_config = "leadfeeder_read_#{Rails.env}".to_sym
    replica = (klass::Replica = Class.new(klass))
    replica.establish_connection(database_config)
    replica.after_initialize(:readonly!)
  end
end
class Account < ActiveRecord::Base
  include LeadfeederReplica
end
### Querying:
Account::Replica.select(:id).first
#  Account::Replica Load (10.4ms)  SELECT  `accounts`.* FROM `accounts`  ORDER BY `accounts`.`id` ASC LIMIT 1
=> #<Account::Replica:0x007f9ec47d16e8 id: 1>
### Persistence:
Account::Replica.first.save
  Account::Replica Load (3.2ms)  SELECT  `accounts`.* FROM `accounts`  ORDER BY `accounts`.`id` ASC LIMIT 1
   (3.7ms)  BEGIN
   (1.7ms)  ROLLBACK
ActiveRecord::ReadOnlyRecord: Account::Replica is marked as readonly
### Bonus:
[21] pry(main)> Account::Replica.new.is_a?(Account)
=> true
```

# Base use cases only

Điều gì sẽ xảy ra khi truy vấn trên các model quan hệ, trên các bảng được join với nhau:

```
class Account < ActiveRecord::Base
  include LeadfeederReplica
  
  belongs_to :user
end
class User < ActiveRecord::Base
  include LeadfeederReplica
  has_many :accounts
end
User::Replica.includes(:account).first.account
```

Thật là không may, trong trường hợp này, nó sẽ không trả về Account::Replica mà chỉ trả về instance Account. Nó cũng query trực tiêp vào database production khi chúng ta sử dụng lazy loading account.

Source:

https://medium.com/@konole/using-replica-database-with-your-activerecord-models-b2a8ce9ef46