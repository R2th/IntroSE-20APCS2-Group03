## Mở đầu 
* Trong rails, một association giúp kết nối giữa 2 hoặc nhiều model
* Nó giúp việc truy vấn cơ sở dữ liệu đơn giản và dễ dàng hơn, code ngăn gọn hơn. 
![](https://images.viblo.asia/997d7a34-d2fb-4bf8-b9c0-424b73c0f826.png)

*this is example for use or not active record*
## The Types of Associations
Rails hỗ trợ 6 loại assocications: 
* belongs_to 
* has_one 
* has_many 
* has_many :through 
* has_one :through 
* has_and_belongs_to_many

Ở bài viết này mình sẽ giới thiệu qua về các associations: has_many :through, has_one :through, has_and_belongs_to_many và các options.
### The has_many :through Association
Ví dụ ta có ba bảng như sau:
![](https://images.viblo.asia/7c952164-58bb-46f3-8689-d9ffed9059f7.png)

1 company có nhiều job, và 1 job thì có nhiều apply, vậy nghĩa là 1 company sẽ có nhiều apply, ta sẽ khai báo như sau trong model company:
```
class Company < ApplicationRecord
  has_many :jobs
  has_many :applies, through: :jobs
end
```
* Khi muốn lấy các applies của company, ta chỉ cần viết`@company.applies`
* Chúng ta có thể dễ dàng nhận thấy nó  sử dụng option through, vì bản chất của through như toán tử join trong sql.
### The has_and_belongs_to_many Association
Để nói về association này mình sẽ đưa ra 1 ví dụ khác như sau:
![](https://images.viblo.asia/8f23913e-6522-462f-9477-cb861bfc6f6a.png)

Đối với quan hệ nhiều nhiều, chúng ta có hai cách thể hiện thông qua active record:
* Cách 1: Sử dụng has_and_belongs_to_many, không cần model trung gian (lưu ý: chỉ không cần model, db vẫn phải lưu table trung gian)
```
class Assembly < ActiveRecord::Base
  has_and_belongs_to_many :parts
end

class Part < ActiveRecord::Base
  has_and_belongs_to_many :assemblies
end
```
* Cách 2: Sử dụng model trung gian như chúng ta vẫn hay sử dụng:
```
class Assembly < ActiveRecord::Base
  has_many :assemblies_parts
  has_many :parts, through: :assemblies_parts
end

class Part < ActiveRecord::Base
  has_many :assemblies_parts
  has_many :assemblies, through: :assemblies_parts
end

class AssembliesParts < ActiveRecord::Base
  has_many :assembly
  has_many :part
end
```
Nhận xét:
* Đối với cách 1 làm code ngắn gọn, đơn giản hơn.
* Đối với cách 2 vì có model trung gian nên có thể thêm attributes và sử dụng validation, callback.
## Self Joins
Là khi model có relation với chính nó, để hiểu rõ self joins mình sẽ giới thiệu nó qua 2 ví dụ, trong trường hợp quan hệ 1-n và n-n
1. Trường hợp quan hệ 1-n: một nhân viên có nhiều người quản lí, và 1 người quản lí cũng sẽ có nhiều nhân viên, nhân viên và quản lí đều nằm trong 1 bảng user

 ![](https://images.viblo.asia/d9cef863-d639-46cf-a993-fc2caea49bfa.png)
 ```
 class User < ApplicationRecord
   has_many :subordinates, class_name: User.name, foreign_key: :manager_id
   belongs_to :manager, class_name: User.name
 end
 ```
* Lấy các nhân viên của 1 quản lý: `@user.subordinates`
* Lấy người quản lý của 1 nhân viên: `@user.manager`

Nhận xét:
* Ở đây xuất hiện option class_name và foreign_key, vậy tác dụng của nó là gì?
* class_name sẽ nói cho rails biết bạn belongs_to đến model nào
* foreign_key sẽ belongs_to đến model theo key nào.
2.  Trường hợp quan hệ n-n: trong trường hợp add friends, thì một user sẽ có nhiều người gửi kết bạn đến, đồng thời nó cũng đang gửi kết bạn cho nhiều người, trường hợp này ta cần 1 table trung gian, chứa sender_id và accepter_id.
```
class  User < ApplicationRecord
  has_many :active_friends,  class_name: Friend.name, foreign_key: :sender_id
  has_many :sending, through: :active_friends, source: :accepter
  has_many :passive_friends, class_name: Friend.name, foreign_key: :accepter_id
  has_many :accepting, through: :passive_friends, source: :sender
end
```

```
class Friend < ApplicationRecord
  belongs_to :sender, class_name: User.name
  belongs_to :accepter, class_name: User.name
end
```

* Lấy danh sách người user đang gửi kết bạn đến: `@user.accepting`
* Lấy danh sách người mà user đang gửi kết bạn: `@user.sending`
* Ở đây xuất hiện thêm 1 option đó là source, source nó sẽ xác định tên source cho quan hệ has_many:through.
##  Polymorphic Associations
polymorphic nghĩa là đa hình, nó được sử dụng để 1 model có thể belongs_to đến nhiều model khác thông qua 1 association.
Ví dụ ta có model notifications làm nhiệm vụ lưu thông báo  cho cả model apply và model job
```
class Notification < ApplicationRecord
  belongs_to :event, polymorphic: true
end
```
```
class Apply < ApplicationRecord
  has_many :notifications, as: :event
end
```
```
class Job < ApplicationRecord
  has_many :notifications, as: :event
end
```
Trường hợp này table notification sẽ có 2 field event_type và event_id.
* lấy các thông báo của apply: `@apply.notifications`
* lấy các thông báo của job: `@job.notifications`
* Ở đây xuất hiện thêm option as, trong trường hợp này nó giúp xác định điều kiện where trong câu lệnh sql sinh ra
 ```
 SELECT `notifications`.* FROM `notifications` WHERE `notifications`.`deleted_at` IS NULL AND `notifications`.`event_id` = 2 AND `notifications`.`event_type` = 'Apply'
 ```
##  Kết luận
Trong bài viết này mình đã giới thiêu một số association cũng như các options liên quan, mong nó sẽ có ích với các bạn :D
## Tài liệu tham khảo
http://guides.rubyonrails.org/association_basics.html#polymorphic-associations

**(TO BE CONTINUES)**