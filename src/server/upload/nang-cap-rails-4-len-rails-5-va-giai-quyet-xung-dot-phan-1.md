### Giới thiệu
Khi làm việc với rails, chắc mọi người cũng đã nhiều lần update rails version nhỏ, các bản patch

`VD: update rails 5.0.1 lên rails 5.0.2`

Việc update những bản patch nhỏ này đa số không có ảnh hưởng gì nhiều cả. 
Nhưng có khi nào bạn thực hiện update 1 version lớn trong Rails chưa

`VD: update rails 4.0.1 lên rails 5.0.1`

Update 1 version lớn nó không giống update 1 bản patch nhỏ. Nó xem như ảnh hưởng toàn bộ hệ thống của bạn. Và việc update 1 version lớn thế này thì ở version mới có rất nhiều thay đổi, tối ưu hơn. 

Cho nên có những đoạn code, config ở version cũ không chạy được ở version mới là điều đương nhiên.
Vậy chúng ta làm thế nào để có thể update suôn sẻ từ version cũ lên version mới .

```
Chú ý: Mỗi 1 phiên bản lớn của rails sẽ có code config khác nhau. 
Cho nên khi update từ version thấp lên version cao ở mỗi version sẽ có update config khác nhau

Trong bài viết này mình sẽ khái quát cách để update rails từ version 4.0.x lên rails version 5.0.x. 
```

### 1: Version ruby
Một điều hiển nhiên, khi nâng cấp rails thì điều kiện đầu tiên chính là version ruby đi kèm với phiên bản rails đó. 

Rails 5 yêu cầu Ruby version lớn hơn hoặc bằng 2.2.2. Vậy nên điều đầu tiên, bạn phải nâng cấp version ruby của mình lên trước đã
```
Rbenv: 
rbenv install 2.3.1
```
```
RVM: 
rvm install 2.3.1
```

### 2: Update gem rails của bạn lên version 5
Bằng cách chỉnh sửa trong Gemfile
- Trước khi sửa
```
gem 'rails', '4.0.11'
```
- Sau khi sửa
```
gem 'rails', '5.0.7'
```
Sau đó chạy
```
bundle update rails
```
để tiến hành update rails lên version 5. Quá trình này thì một số gem trong gem file của bạn cũng sẽ được tự động update version lên luôn, để có thể phù hợp với rails 5. 

- Khi chạy update rails này, nếu may mắn thì sẽ chạy update thành công kèm theo 1 số gem khác sẽ được update cùng
- Nếu xui thì bạn sẽ gặp lỗi không thể update lên rails 5, do có 1 số gem không tương thích với rails 5

**Nguyên nhân :**
1: Do trong Gemfile 1 số gem bạn để cố định là version cũ khi ở rails 4. 
```
VD: gem "roo", "1.12.2"
```
2: Do trong Gemfile có gem dù đã là version mới nhất, nhưng không tương thích với rails 5

**Cách giải quyết**
- Đối với trường hợp 1, bạn xóa version cố định ở phía sau gem đi, rồi chạy update version cho gem đó lên trước rồi sau đó chạy lại update rails
```
VD: gem "roo"
```
- Đối với trường hợp thứ 2, xui tận mạng, thì nên tìm 1 gem khác có chức năng tương tự, hỗ trợ rails 5 để thay thế đi. 

**Note**

Trường hợp của mình, Gemfile có rất nhiều gem, việc chạy và update từng gem sẽ rất mất thời gian. Cho nên mình đã thực hiện như thế này
- Comment hết gem trong Gemfile chỉ để lại gem rails, sau đó chạy update rails, lúc này rails đã update version ok rất suôn sẻ
- Trong Gemfile mình mở comment gem theo cụm, 10 gem hoặc hơn 1 lần rồi chạy bundle, nếu bundle lỗi thì bây giờ chạy theo cụm 10 gem nên cách fix lỗi không install được cũng rất nhanh, vì số lượng gem cần bundle mỗi lần ít

### 3: Update rail binaries và configurations
Chạy lệnh sau để update `model`, `/bin` và `/config`
```
rails app:update
```
Nó sẽ update, và bổ sung thêm những file config mới của rails 5

**Note**

Quá trình này sẽ tiến hành overwrite lại file config của mình, các bạn có thể chọn không overwrite hoặc là sau khi chạy xong thì copy những config cũ vào lại

### 4: Chạy lại schema
Rails 5 có 1 số thay đổi với schema, như đưa khóa ngoại và index vào trong phương thức `create_table` . 

Do đó bạn cần phải chạy lại migrate
```
rails db:migrate
```
### 5: Bổ sung các application class mới
Rails 5 có các application class mới, chưa chắc bạn đã sử dụng nhưng cũng cần tạo chúng, sau này sử dụng thì kế thừa thôi. Các class mới là
- `ApplicationRecord`
- `ApplicationMailer`
- `ApplicationJob`
#### 5.1 ApplicationRecord
Tạo file ApplicationRecord trong model 
```
# app/models/application_record.rb
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
```
Đổi lại model của bạn để kế thừa từ lớp mới
```
# app/models/car.rb
class Car < ApplicationRecord
  belongs_to :person
end
```
#### 5.2 ApplicationMailer
Tạo file ApplicationMailer
```
# app/mailers/application_mailer.rb
class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'
end
```
Tạo 1 template mailler layout
```
# app/views/layouts/mailer.text.erb
<%= yield %>
```
Sau đó thay đổi mailler của bạn kế thừa từ `ApplicationMailer`
#### 5.3 ApplicationJob
Tạo 1 file ApplicationJob
```
# app/jobs/application_job.rb
class ApplicationJob < ActiveJob::Base
end
```
Thay đổi jobs của bạn kế thừa từ lớp mới `ApplicationJob`
### 6: Thay đổi mối quan hệ của belongs_to
Rails 5 đã thay đổi belongs_to làm cho nó default là required, vì vậy required: true đã không được sử dụng nữa. Trường hợp mối quan hệ trong model của bạn không bắt buộc required thì cần bổ sung thêm `optional: true`
```
belongs_to :car, optional: true
```

### 7: Không hỗ trợ mysql
Cơ sở dữ liệu mysql đã bị loại bỏ khỏi rails 5, bạn sẽ phải chuyển qua sử dụng mysql2 thay thế

Có nhiều bạn làm về rails hầu như chưa sử dụng gem mysql bao giờ. Có thể những dự án các bạn tham gia đều là rails version cao, khi vào làm thì tích hợp mysql2 luôn rồi. Chỉ những phiên bản rails <5 mới hỗ trợ mysql. 

Chỉ những dự án siêu lâu đời rồi có thể sẽ sử dụng gem mysql. Khi đó có cần phải thay đổi một số config để có thể làm việc được với gem mysql2 

### Kết
Đến đây cũng tạm ok rồi. Trên đây là 1 số thay đổi của rails 5 và một số kinh nghiệm khi mình thực hiện update lên rails 5 có gặp phải và cách giải quyết. 

Mới có chừng này chưa xong đâu, project của bạn mặc dù đã lên rails 5 rồi nhưng vẫn chưa chạy được ổn định đâu, nó còn có những thay đổi ở Controller, testing ... các kiểu mà mình cần phải update để phù hợp với rails 5 nữa. Những phần đó mình sẽ chia sẻ với các bạn ở bài viết sau. 

Tham khảo: https://guides.rubyonrails.org/upgrading_ruby_on_rails.html