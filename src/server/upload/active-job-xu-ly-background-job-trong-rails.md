# 1. Đặt vấn đề
Giả sử bạn muốn gửi email tới các user sau khi đăng ký tài khoản để xác nhận tài khoản ở trang [Sample app](https://www.railstutorial.org/book) (Trang web đa số các bạn học Rails sẽ làm qua)  của bạn. Nếu như đồng thời có tới hàng ngàn User cùng đăng ký tại một thời điểm, bạn sẽ phải đồng thời gửi tới hàng ngàn cái Email với nội dung xác thực tài khoản, điều này sẽ dẫn tới việc phản hồi giữa server và client bị ảnh hưởng đáng kể. 

=> Chúng ta cần phải tìm ra một giải pháp làm sao để xử lý riêng biệt giữa các tác vụ, thì `Background Job` sẽ giúp chúng ta trong việc thực hiện các tác vụ theo một luồng riêng biệt và không ảnh hưởng tới trải nghiệm của người dùng mà các công việc sẽ đều được xử lý hết. => Ở bài viết này thì mình sẽ xử lý việc gửi mail đưa vào `Background Job` nhé :laughing:

# 2. Background Job là gì ?
> **Background job** -  "công việc phía sau" : là những công việc hay tác vụ được xử lý ngoài luồng request - response thông thường trong các ứng dụng web.


Bình thường thì các trang web nhận request từ người dùng và trả về một response nhưng `Background job` thì có khác một ít => Vẫn là từ một request đến Website nhưng đòi hỏi thời gian thực thi lâu hơn so với bình thường (có thể tưởng tưởng như là những request này không thể xử lý ngay lập tức) thì chúng ta sẽ cần sử dụng đến `Background job`, chuyển phần xử lý phức tạp ấy vào Job, nó sẽ xử lý bất đồng bộ trên một luồng riêng biệt, trả về response cho người dùng.

###  Ví dụ 
Chúng ta có một request từ người dùng để cập nhật thông tin quê quán mới của họ :

Các bạn có thể thấy, thời gian bắt đầu từ lúc người dùng submit form cho đến khi server trả về trang người dùng và thông báo update thành công sẽ mất 3.7s

![](https://images.viblo.asia/259634b5-dbfb-49d3-b3a1-a0baae2ba826.jpg)

Khi chúng ta sử dụng Background job thì sao :  quá trình mình nêu ở trên chỉ còn mất 0.3 s, các quá trình như `refresh cache`, `send maild`, `send noti`, `recommend new friends` sẽ được Background job xử lý ở một luồng riêng biệt, kết quả vẫn sẽ trả về như nguời dùng mong muốn :grinning::grinning:

![](https://images.viblo.asia/19911b2e-21bc-4402-9b99-8f8e8b70e5d5.jpg)

# 3. Rails xử lý Backgound Job như thế nào ?
Có khá nhiều cách để xử lý `Background Job `cho ứng dụng Rails của bạn:
1. Sử dụng [Active job](https://guides.rubyonrails.org/active_job_basics.html)
2. Sử dụng [Gem Sidekiq](https://github.com/mperham/sidekiq)
3. Sử dụng [Gem Delayed job](https://github.com/collectiveidea/delayed_job)
4. Sử dụng [Gem Resque](https://github.com/resque/resque)

Mặc định Rails cung cấp cho chúng ta `Active job` (Một framework để xử lý `Background job` mà chúng ta không cần cài thêm bất cứ cái gì :laughing:)  built-in queue process (tích hợp sẵn hàng đợi) .

Điều đáng tiếc là những process trong queue được lưu vào RAM nên nếu server bị shutdown thì những job chưa hoặc đang thực hiện sẽ bị mất, điều này có thể gây ảnh hưởng tiêu cực đến người dùng và dịch vụ của chúng ta, vì vậy nó chỉ thích hợp cho những ứng dụng nhỏ hoặc những công việc không quan trọng.

Tuy nhiên hầu như các ứng dụng lớn đều không muốn điều này xảy ra nên đã sử dụng các `3rd-party adapter` như Sidekiq, Delayed_Job, Resque (sử dụng Redis để lưu các queue, và có những cơ chế riêng để xử lý job khi server bị sập và khởi động lại sẽ không bị mất job :)))
> Ở bài này mình chủ yếu tìm hiểu về Active job để xử lý Background Job, 3 cách còn lại các bạn có thể tìm hiểu thêm ở các bài viết hoặc lên doc của nó để đọc nhé :)))
> 
> Mình cũng đã từng sử dụng Sidekiq (còn 2 cái còn lại thì chưa): ngoài việc xử lý job khá hoàn hảo thì nó cũng có một số khác biệt với các gem khác là Sidekiq sử dụng đa luồng và Redis để xử lý nhiều jobs đồng thời .Sidekiq và Rescue có trang dashboard để quản lý các job, còn Active job và Delayed_job thì không (Delayed_job có thể cài thêm gem để sử dụng trang dashboard). Ngoài ra việc truyền tham số của Sidekiq sẽ khác so với Active job, mình sẽ trình bày phía dưới nhé :))

Để xử lý các job sử dụng các adapter như Sidekiq, Delayed Job, Rescue ta có thể config như sau:

* Thay đổi queue_adapter ở file application.rb
```
module SampleApp
 class Application < Rails::Application
   ...
   config.active_job.queue_adapter = :sidekiq
 end
end
```
* Định cấu hình cho nó ở file ..._job.rb
```
class SendMailJob < ApplicationJob
 self.queue_adapter = :sidekiq

 def perform user
    ...
 end
end
```
* Ngoài ra bạn muốn quản lý rõ ràng hơn hàng đợi mà job sẽ chạy, bạn có thể dùng method #set như sau :
```
SendMailJob.set(queue: :async).perform_later @user
```
# 4. Active Job - Xử lý Background Job trong Rails
> Trước tiên mình sẽ xử lý bài toán đưa phần gửi mail kích hoạt tài khoản người dùng vào job cái đã nhé :stuck_out_tongue_winking_eye:

Trước tiên ta phải tạo ra một job mà bạn muốn sử dụng câu lệnh `rails g job SendMail`
```
rails g job SendMail
  invoke  test_unit
  create  test/jobs/send_mail_job_test.rb
  create  app/jobs/send_mail_job.rb
```
File send_mail_job.rb sẽ như sau:
```
class SendMailJob < ApplicationJob
 queue_as :default

 def perform(*args)
   # Do something later
 end
end
```
Mặc định` Active job `sử dụng  `queue_as :default` tức là adapter sử dụng là `:async` để lưu job , ngoài ra còn có adapter khác là `:inline`, để sử dụng ta phải config ở application.rb như sau:
```
config.active_job.queue_adapter = :inline
```
=> Khi sử dụng `adapter :inline` thì job sẽ thực hiện ngay lập tức trong luồng chính, điều đó chả khác gi so với việc không sử dụng `Background job` cả, nên mình nghĩ là các bạn không nên dùng :)

=> Vậy với `adapter :async` mặc định của Active job thì sao: Job sẽ thực hiện trong nhóm luồng khác, phù hợp với môi trường dev/test vì nó không cần cơ sở hạ tầng bên ngoài, nhưng nó không phù hợp trong môi trường production, vì nó sẽ loại bỏ những công việc đang chờ xử lý khi khởi động lại. Nếu các job cùng sử dụng chung một nhóm luồng, thì các job phía sau phải chờ job đang thực hiện chạy xong (vì vậy nếu job đang chờ mà sever bị reset thì sẽ bị mất.)
> **Note**: Để khắc phục nhược điểm trên thì các bạn có thể config `queue_adapter = :sidekiq` nhé, tất nhiên phải cài thêm `gem sidekiq` rồi :), bật server của sidekiq lên và sài thôi, chắc chắn là job của bạn sẽ không bị mất khi khởi động lại server đâu, mình thử rồi :laughing:

Chúng ta có thể config thêm số luồng `:async `hoạt động như sau :
```
config.active_job.queue_adapter = ActiveJob::QueueAdapters::AsyncAdapter.new \
   min_threads: 1,
   max_threads: 2 * Concurrent.processor_count,
   idletime: 600.seconds
 end
```

Với Active job thì bạn có thể gửi bao nhiêu tham số tùy ý, có thể cả một object, cụ thể :
```
Basic types (NilClass, String, Integer, Float, BigDecimal, TrueClass, FalseClass) / Symbol / Array / Date / Time / DateTime
ActiveSupport::TimeWithZone / ActiveSupport::Duration /Hash (Keys should be of String or Symbol type) / ActiveSupport::HashWithIndifferentAccess
```

> Đối với Sidekiq: các đối số truyền vào phải là các kiểu JSON đơn giản như string, integer, boolean, float, null(nil), hash, array. :laughing:

> Active job có thể truyền được cả 1 hoặc nhiều đối tượng (sidekiq thì không nhé), nó sẽ serialize bất kỳ đối tượng ActiveRecord nào thành chuỗi global_id để lưu vào hàng đợi của bạn. Sau đó tra cứu lại từ chuỗi đó khi công việc bắt đầu. Theo mặc định, chuỗi đó chỉ bao gồm tên ứng dụng, tên Class và id và nó sẽ sử dụng cơ sở dữ liệu của bạn để load model :
> "gid://app/User/1"


Chút nữa lan man sau, giải quyết xong bài toán gửi mail đã nhé :))), chỉ cần thực hiện như sau:
```
#file send_mail_job.rb
class SendMailJob < ApplicationJob
  queue_as :default
  
  def perform user
    @user = user
    user.send_activation_email
  end
end

#file users_controller.rb chỉ cần thay @user.send_activation_email bằng cách gọi job SendMailJob.perform_later và truyền đối tượng @user
class UsersController < ApplicationController

 def create
    @user = User.new user_params
    if @user.save
      # @user.send_activation_email
      SendMailJob.perform_later @user
     ...
  end
end

#instance method send_activation_email trong model user đây nhé
def send_activation_email
    self.activation_token = User.new_token
    update :activation_digest, User.digest(activation_token)
    UserMailer.account_activation(self).deliver_now
end

> Mình mới code ROR được mấy tháng nên code tù lắm, mỏi người thông cảm. hihi
```

> Vậy là xong , dưới đây là phần bonus thêm của mình :kissing_heart::kissing_heart:

### 4.1. Các cách gọi job
Thực hiện job ngay sau khi hàng đợi trống :
```
SendMailJob.perform_later @user
```
Thực hiện sau khoảng thời gian:
```
SendMailJob.set(wait: 2.minutes).perform_later @user
```
Thực hiện job vào buổi trưa ngày mai:
```
SendMailJob.set(wait_until: Date.tomorrow.noon).perform_later @user
```
> Note: Ngoài  `perform_later` còn có `perform_now`, khi bạn sử dụng `perform_now` thì thời gian bạn set để thực hiện job trở nên vô nghĩa.

### 4.2. Callbacks của Active job
Active Job cung cấp các `callbacks `để kích hoạt logic trong vòng đời của một job. Hoạt động tương tự như các `callbacks `khác trong model Rails như sau:
```
before_enqueue
around_enqueue
after_enqueue
```
=> được gọi trước, trong, và sau khi đưa job vào hàng đợi

```
before_perform
around_perform
after_perform
```
=> được gọi tới trước, trong và sau khi job được thực hiện

### 4.3. Xử lý exceptions
Trong lúc thực hiện job không thể lúc nào cũng trơn tru được :))), Active Job cung cấp cho chúng ta các cách để bắt các ngoại lệ được nêu ra trong quá trình thực thi công việc:
1.  Xử lý ngoại lệ trong thân hàm `perform`
```
Class SendMailJob < ApplicationJob
 queue_as :default

 def perform user
   ActiveRecord::Base.transaction do
       ....
     raise ActiveRecord::RecordInvalid
   end

 rescue ActiveRecord::RecordInvalid
   puts "loi roi do"
 end
end
```

2.  **discard_on**(*exceptions)  : Loại bỏ luôn job mà bạn không muốn nó thử lại khi raise exceptions, điều này hữu ích khi record đã bị xóa chẳng hạn
```
class SendMailJob < ApplicationJob
 queue_as :default

 discard_on ActiveRecord::RecordInvalid

 def perform user
 ....
   raise ActiveRecord::RecordInvalid
 end
end
```
2.  **retry_on**(*exceptions, wait: 3.seconds, attempts: 5, queue: nil, priority: nil)

    Lên lịch chạy lại job khi job raise exception, nếu exception tăng lên vượt quá số attempts mà bạn cài đặt => có thể có cơ chế thử lại của riêng exceptions hoặc đặt nó vào hàng đợi để kiểm tra
* :wait - xếp lại job vào hàng đợi vời thời gian dc xét
* :attempts - cho vào lại hàng đợi chờ được xử lý bao nhiêu lần
* :queue - Xếp job vào hàng đợi khác
* :priority - Xếp lại job theo mức độ ưu tiên

```
class SendMailJob < ApplicationJob
 queue_as :default

 retry_on ActiveRecord::RecordInvalid
# retry_on ActiveRecord::RecordInvalid, wait: 5.seconds, attempts: 3

 def perform user
 ...
   raise ActiveRecord::RecordInvalid
 end
end
```

# 5. Tài liệu tham khảo
Bài viết khá dài, tuy nhiên đó là những gì mà mình đã tìm hiểu được về `Active Job ` và mong rằng phần nào đó giúp bạn có cái nhìn tổng quát về `Background job` và cơ chế hoạt động của `Active Job`. Cảm ơn mỏi nguời đã đọc tới đây ạ :relaxed::relaxed:

Guide Active job: 

https://guides.rubyonrails.org/active_job_basics.html

https://api.rubyonrails.org/classes/ActiveJob/Exceptions/ClassMethods.html