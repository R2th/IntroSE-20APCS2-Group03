Trong quá trình làm việc chúng ta rất hay gặp các vấn đề trục trặc khi dùng Callback. Callback cho phép bạn liên kết với các action trong vòng đời của model như create, update, destroy...Với các callback bạn có thể viết các đoạn code mà sẽ chạy bất cứ khi nào đối tượng của ActiveRecord được tạo, cập nhập, xóa, validate hay được load từ trong database. 

Bài viết này sẽ đưa ra cái nhìn cụ thể về 1 số trường hợp sử dụng chúng để tránh gặp các vấn đề trong `Callback`

Đây là những hướng dẫn quy tắc mà tôi sử dụng khi nghĩ đến `Callback` :
1. Bỏ qua khi có thể.
2.  Không đồng bộ theo mặc định (Asynchronous by default)
3.  Dùng after_commit nhiều hơn after_save.
4.  Tránh thực thi có điều kiện.
5.  Không sử dụng để xác thực dữ liệu.

# 1. Bỏ qua khi có thể
Callback đảm bảo rằng bất kì ai cập nhập hay lưu 1 record sẽ không quên thực hiện thêm 1 hành động nào đó nên nó được thực hiên trên #save.

Hầu hết các phần trong ứng dụng đều trực tiếp sửa đổi trên các lớp con của ActiveRecord::Base thay vì sử dụng 1 service để thực hiện thao tác ấy. Chúng ta nên sử dụng service để đóng gói các thao tác thay vì dùng callback.

Cùng xem ví dụ bên dưới:
```
# Bad
class Company < ActiveRecord::Base
  after_commit :send_emails_after_onboarding
 
  private
 
  def send_emails_after_onboarding
    if just_finished_onboarding?
      EmailSender.send_emails_for_company!(self)
    end
  end
end
 
# Good
class Company < ActiveRecord::Base
end
 
class CompanyOnboarder
  def onboard!(company_params)
    company = Company.new(company_params)
    company.save!
    EmailSender.send_emails_for_company!(company)
  end
end
```

Việc đặt logic vào trong 1 service và không gọi callback, chúng ta sẽ không bắt buộc chạy tất cả chúng mỗi lần save. Chúng ta đã có 1 service handle việc đăng kí tạo mới 1 công ty, điều này sẽ giảm mối liên hệ giữa company và EmailSender. Không phải lúc nào cũng gửi mail đến cho công ty, nó chỉ nên thực hiện khi tạo mới
# 2. Không đồng bộ theo mặc định
Bất cứ khi nào ta thêm 1 callback, đoạn mã đó sẽ được thực thi trước khi chúng ta có thể respond trả về request. Nếu 1 class có 20 callback thì đó là 20 đoạn mã code cần phải chạy trước khi trả về cho người dùng. Điều này sẽ gây mất thời gian, sẽ gây cản trở người dùng, hệ thống trở nên chậm chạp.

Do đó nếu bạn phải viết 1 callback, hãy đảm bảo rằng nó thoát khỏi request bằng cách làm cho nó không đồng bộ bằng cách sử dụng sidekiq.

Cùng nhìn vào ví dụ dưới đây:

```
# Bad
class Company < ActiveRecord::Base
  after_commit :create_welcome_notification, on: :create
 
  private
 
  def create_welcome_notification
    # We're incurring an extra database request here, which
    # is something we want to avoid during 
    # critical operations like signing up a 
    # new customer
    notifications.create({ title: 'Welcome to Gusto!' })
  end
end
 
# Good
class Company < ActiveRecord::Base
  after_commit :create_welcome_notification, on: :create
 
  private
 
  def create_welcome_notification
    WelcomeNotificationCreator.perform_async(id)
  end
end
 
class WelcomeNotificationCreator
  include Sidekiq::Worker
 
  def perform(company_id)
    @company = Company.find(company_id)
    @company.notifications.create({ title: 'Welcome to Gusto!' })
  end
end
```

Viết callback 1 cách an toàn bằng cách di chuyển khối logic vào worker. Chúng ta sẽ làm giảm sự phụ thuộc vào model và làm cho các thành phần dễ test hơn.

Nói về test, chúng ta có thể test callback sử dụng Rspec:

```
# spec/models/company_spec.rb
require 'rails_helper'
 
RSpec.describe Company, type: :model do
  describe '#save' do
    subject { company.save }
    let(:company) { build(:company) }
 
    it 'schedules a WelcomeNotificationCreator job' do
      expect {
        subject
      }.to change{ WelcomeNotificationCreator.jobs.size }.by(1)
      last_job = WelcomeNotificationCreator.jobs.last          
      expect(last_job['args']).to eq([subject.id])
    end
  end
end
 
# spec/workers/welcome_notification_creator_spec.rb
require 'rails_helper'
 
RSpec.describe WelcomeNotificationCreator do
  subject { described_class.new.perform(company.id)}
  let(:company) { create(:company) }
 
  it 'creates a notification' do
    expect {
      subject
    }.to change(Notification, :count).by(1)
    expect(Notification.last.title).to eq('Welcome to Gusto!')
  end
end
```

# 3. Dùng after_commit nhiều hơn after_save
Khi viết 1 callback nơi bạn muốn thực thi đoạn code sau save, create hoặc update mặc định chúng ta sử dụng `after_commit`.

`after_commit` là callback duy nhất kích hoạt khi database transaction commit. Không dùng after_commit callback, bạn sẽ có thể gặp lỗi trong Sidekiq như: `Cannot find Company with ID=12345.` Những lỗi này có thể thường xuyên xảy ra và after_commit sẽ giải quyết chúng.

Lỗi gây ra do Sidekiq nhận job trước khi database commit new record vào database. Dẫn đến như new record ấy chưa được tạo => lỗi.

Sử dụng an toàn ta dùng after_commit hơn là after_save hay after_create

Cùng nhìn vào 2 ví dụ dưới đây:


```
# Bad
class Company < ActiveRecord::Base
  after_create :create_welcome_notification
 
  private
 
  def create_welcome_notification
    # The database transaction has not been committed at this point,
    # so there's a chance that the Sidekiq worker will pick up the job
    # before our `Company` has been persisted to the database.
    WelcomeNotificationCreator.perform_async(id)
  end
end
 
# Good
class Company < ActiveRecord::Base
  after_commit :create_welcome_notification, on: :create
 
  private
 
  def create_welcome_notification
    WelcomeNotificationCreator.perform_async(id)
  end
end
```

Note: `_*changed?` helper sẽ k sử dụng được trong after_commit. Nếu bạn cần thực hiện có điều kiện thì hãy sử dụng `previous_changes `. 

Nếu bạn không sử dụng ActiveRecord model, hãy sử dụng perform để chạy sau khi bạn đã chắc chắn transaction đã commit bằng cách:
```
MyWorker.perform_in(5.seconds, 1, 2, 3)

```
Theo cách này, Sidekiq sẽ thử lại đến khi thành công. Lần đầu có thể bị thất bại RecordNotFound nhưng lần retry sẽ thành công.
# 4. Tránh thực thi có điều kiện

Theo nguyên tắc chung: Không viết các callback có điều kiện. Thay vào đó hãy cố gắng tạo callback mà không thay đổi và có thể chạy an toàn nhiều lần. Điều này đặc biệt quan trọng khi bạn bắt đầu move callback logic vào Sidekiq job. (Tham khảo thêm tại [Best practices on Sidekiq](https://github.com/mperham/sidekiq/wiki/Best-Practices))

Nếu bạn muốn thực thi có điều kiện 1 job thì hãy định nghĩa logic trong method body và không gọi lại. Lý do cho điều này là để đảm bảo rằng các condition chỉ tồn tại ở 1 nơi duy nhất. 


```
# Bad
class Company < ActiveRecord::Base
  after_commit :create_welcome_notification, if: -> { should_welcome? && admirable_company? }
 
  private
 
  def create_welcome_notification
    WelcomeNotificationCreator.perform_async(id)
  end
end
 
# Good
class Company < ActiveRecord::Base
  after_commit :create_welcome_notification
 
  private
 
  def create_welcome_notification
    if should_welcome? && admirable_company?
      WelcomeNotificationCreator.perform_async(id)
    end
  end
end
 
# Best
class Company < ActiveRecord::Base
  after_commit :create_welcome_notification
 
  private
 
  def create_welcome_notification
    WelcomeNotificationCreator.perform_async(id)
  end
end
 
class WelcomeNotificationCreator
  include Sidekiq::Worker
 
  def perform(company_id)
    @company = Company.find(company_id)
 
    return unless @company.should_welcome? && @company.admirable_company?
 
    # We passed our check, do the work.
  end
end
```

Nhìn chung, hãy cố găng đẩy logic vào worker.
# 5. Không sử dụng để xác thực dữ liệu
Chúng ta có thể sử dụng callback để xác thực dữ liệu nhưng điều đó nên tránh. ActiveRecord đưa ra các giả định nhất định về cách thức và thời điểm xác thực  sẽ được chạy và việc đưa chúng vào callback sẽ phá vỡ những giả định đó. Thay vào đó ta nên sử dụng [ActiveRecord Validation](https://guides.rubyonrails.org/active_record_validations.html)

# 6. Tổng kết
Với sức mạnh lớn đi kèm với trách nhiệm lớn, các callback Rails cũng không ngoại lệ. Chúng là những tool hiệu quả nhưng cũng đi kèm với những hạn chế. 

Chúng tôi né tránh sử dụng các callback và hướng tới sử dụng service trong ứng dụng nhưng vẫn còn nhiều callback tồn tại. Vẫn còn nhiều việc phải làm nhưng chúng tôi đã thấy đoạn mã tuân theo các nguyên tắc này đòi hỏi ít bảo trì hơn.

Hi vọng bài viết sẽ giúp ích cho bạn!



Nguồn tham khảo:

https://github.com/mperham/sidekiq/wiki/Problems-and-Troubleshooting

https://engineering.gusto.com/the-rails-callbacks-best-practices-used-at-gusto/