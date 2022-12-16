Gần đây tôi đã làm việc trên một ứng dụng trong đó chúng tôi có một `class method / scope` được sử dụng để trả về một nhóm người dùng cụ thể. Điều này là tốt và tốt cho đến khi tôi thấy mình cần phải nắm bắt logic tương tự ở cấp độ instance. Lý tưởng nhất, tôi đã hy vọng có thể tránh trùng lặp logic, và đồng thời giữ cho mọi thứ hiệu quả.

Người dùng trong ứng dụng của tôi có thể được cấu hình để nhận thông báo. Tôi có một phương thức lớp trên model User được sử dụng để truy vấn cho tất cả người dùng có thể nhận thông báo:

```
class User < ApplicationRecord
  def self.can_receive_alerts
    where(receives_sms_alerts: true).
      or(where(receives_email_alerts: true)).
      joins(:alert_configurations).
      distinct
  end
end
```

Nói cách khác, tiêu chí cho can_receive_alerts là người dùng đã bật email hoặc thông báo sms và ít nhất một AlertConfiguration được xác định. Phương pháp này sẽ dẫn đến truy vấn SQL sau:

```
SELECT * FROM users
  INNER JOIN alert_configurations ON alert_configurations.user_id = users.id
  WHERE (users.receives_sms_alerts = 't' OR users.receives_email_alerts = 't');
```


Tôi muốn có thể sử dụng lại logic truy vấn tương tự này ở cấp độ instance, sao cho tôi có thể sử dụng user.can_receive_alerts?. Rất may, tôi có thể tận dụng ưu điểm của `ActiveRecord’s lazy query evaluation`(cái này là gì thì mình sẽ giải thích ở cuối bài) và xây dựng dựa trên mối quan hệ được trả về từ `class method`: 

```
class User < ApplicationRecord
  # class method
  def self.can_receive_alerts
    where(receives_sms_alerts: true).
      or(where(receives_email_alerts: true)).
      joins(:alert_configurations).
      distinct
  end

  # new instance method
  def can_receive_alerts?
    self.class.can_receive_alerts.where(id: id).exists?
  end
end
```

`Intance method` mới này, can_receive_alerts?, trực tiếp sử dụng lại logic truy vấn từ `class method`, có thể sử dụng với đối tượng user. Bằng cách sử dụng điều kiện `where(id: id)`, và sau đó sử dụng `exists?` để tạo ra một truy vấn SQL hiệu quả tối ưu:

```
SELECT 1 AS one FROM users
  INNER JOIN alert_configurations ON alert_configurations.user_id = users.id
  WHERE (users.receives_sms_alerts = 't' OR users.receives_email_alerts = 't')
  AND users.id = 1
  LIMIT 1;
```

Trước đây, tôi có thể đã sao chép logic ở cấp độ instance (và chắc chắn là chúng không đồng bộ hóa) hoặc có thể được sử dụng `scope` để quét toàn bộ người dùng. Thay vào đó, tôi có một truy vấn chính xác sẽ chỉ trả về dữ liệu tối thiểu tuyệt đối cần thiết, trong khi sử dụng lại trực tiếp logic truy vấn từ scope.

-----

`ActiveRecord’s lazy query evaluation`

Sử dụng User.find (1) sẽ trả về một đối tượng không rõ ràng - nó sẽ tìm người dùng có ID = 1 và đưa nó cho bạn dưới dạng đối tượng Ruby. Nhưng hành vi này thực sự là bất thường. Hầu hết các truy vấn không thực sự trả về một đối tượng Ruby, mà chỉ giả mạo nó. Ví dụ:

```
User.where(id: 1)
```

Có thể trông giống như nó trả về một mảng có chứa một đối tượng User như:

```
[#<User id: 1, email: "foo@bar.com">]
```

Nhưng hãy thử chạy User.where (id: 1).class và bạn sẽ thấy rằng đó không phải là một Array, nó thực sự là một instance của ActiveRecord :: Relation. `Relation` nhìn thì trong giống `array` nhưng nó có thể làm được nhiều thứ mà `array` không làm được.

Truy vấn ActiveRecord hoạt động và trả lại `relation`. Ở đó, về cơ bản, không có lý do gì để thực sự yêu cầu cơ sở dữ liệu thực hiện truy vấn cho đến phút cuối cùng có thể. Điều gì sẽ xảy ra nếu bạn thực sự không bao giờ cần phải sử dụng truy vấn đó? Điều gì nếu bạn muốn làm cho nó phức tạp hơn trước khi thực hiện nó? `Relation` mang lại cho bạn sự linh hoạt và sử dụng hiệu quả hơn nhiều so với cơ sở dữ liệu của bạn.

`Relation` chỉ được thực hiện khi thật sự cần thiết để biết những gì bên trong chúng. Vì vậy, nếu `controller` lấy 5 `posts` trên `blog` bằng cách sử dụng `@posts = Post.limit(5)`, thì nó sẽ chuyền cho `view` 1 `relation`. Nó chỉ có khi code trong `view` thực sự gọi một phương thức trên `@posts` (như `@posts.first.title`) rằng truy vấn sẽ được chạy và mối quan hệ sẽ được lưu trữ dưới dạng đối tượng Ruby thực trong bộ nhớ.

Hành vi này có thể hơi khó quan sát nếu bạn sử dụng một cái gì đó như Rails Console để kiểm tra chúng, bởi vì các truy vấn sẽ thực sự được chạy ngay trong console vì nó chạy ngầm một cái gì đó như phương thức `.inspect` trên các `relation`, đòi hỏi các truy vấn được chạy. Nhưng hãy thử với việc xây dựng một truy vấn như ở trên và kiểm tra `class` của nó, bạn sẽ sẽ thấy nó trả lại ActiveRecord :: Relation.