Thông thường trong 1 ứng dụng Rails, forms được sử dụng để post data đến Create hay Update Action liên quan đến một tài nguyên cụ thể trong ứng dụng. Nhưng chúng ta có thấy rằng, đa số form mà chúng ta cần xây dựng không đơn giản như thế. Chúng có thể cần phải lưu nhiều record hay update nhiều bảng hoặc thậm chí thực hiện thêm một số process (ví dụ như: gửi email, đẩy notification,... ) Và khi yêu cầu càng phức tạp, logic càng nhiều thì controller của bạn sẽ trở nên nặng nề hơn, khó hiểu và khó bảo trì hơn. Hơn nữa, bạn có thể sẽ gặp phải khó khăn với tầng View để truyền parameters chính xác

Với những bạn còn thấy xa lạ với khái niệm design pattern thì các bạn có thể đọc bài viết trước của mình để hiểu rõ hơn: https://viblo.asia/p/basic-design-patterns-in-ruby-on-rails-3P0lPymg5ox
![](https://images.viblo.asia/a8e12b0c-0268-4070-8295-56a88056a52b.png)
## Problem.
Hãy tưởng tượng, bạn đang xây dựng một form dùng để create user nhưng ngoài tạo user đơn thuần, bạn còn phải thực hiện một số công việc như: Đầu tiên, nó sẽ phải tạo 1 bản ghi trong bảng Mesage. Sau đó bạn phải tạo 1 record khác trong bảng Task, và cuối cùng là gửi email đến project manager.

Một số định nghĩa và giả định trước khi chúng ta tiếp tục:

*  Bảng Message dùng cho giao tiếp nội bộ giữa các thành viên trong project
*  Bảng Task dùng để lưu trữ và quản lý tasks giao cho các thành viên trong project
*  Khi một người dùng mới được tạo, chúng tôi muốn gửi một tin nhắn nội bộ và gán một nhiệm vụ mới cho người quản lý dự án.
*  Chúng tôi cũng muốn gửi thông báo qua email cho người quản lý dự án khi một người dùng mới được tạo.

Cách thông thường để xử lý vấn đề này là: Nếu các model có quan hệ với nhau(has_many hoặc belong_to) thì sử dụng nested_attributes và thực hiện gửi mail trong controller hoặc service. Trong trường hợp các models không có quan hệ với nhau, chúng ta phải thực hiện tất cả logic đó trong controller hoặc tách ra thành service. Hoặc chúng ta sẽ sử dụng Form Object và đặt tất cả logic code vào trong Form Object.
vậy thì Form Object là gì?

## What is Form Object and Why?

Form object là kỹ thuật tạo ra một class trung gian mang các attributes của những model cần tác động.

Tại Controller, thay vì khởi tạo đối tượng trực tiếp từ Model, ta sẽ gọi tới class trung gian này.

Việc sử dụng Form object giúp bạn giảm thiểu tình trạng "Fat model" và "Fat Controller", đồng thời giúp code sáng sủa hơn, validates và maintain dễ dàng hơn.

Trên thực tế, nhiều lập trình viên có kinh nghiệm cũng phản đối việc sử dụng accepts_nested_attributes_for và dự đoán nó sẽ bị loại bỏ ở các bản Rails sau này. Về phần mình, mình thấy Nested Attributes vẫn tốt đối với những trường hợp đơn giản vì nó tiện lợi và ít tốn thời gian.

## What a Form Object looks like in practice
Đầu tiên chúng ta có một controller là UserRegistration
```
resource :user_registrations, only: [:create, :update, :new, :edit] 
```
Trong Rails App của tôi, convention mà tôi follow luôn đặt tên form object class luôn là FormObject. Và tên namespace sẽ dựa trên context sử dụng form object đó. Vậy trong trường hợp này, form object của tôi sẽ là UserRegistration::FormObject.
```
module UserRegistration
  class FormObject
    include ActiveModel::Model
    attr_accessor :name
    
    validates :name, presence: true
  end
end
```
Do chúng ta sẽ truyền form object vào helper form_for nên chúng ta cần define tất cả accessor của attribute có trong form, ở đât mình ví dụ mình attribute :name. Chú ý, ở đây tôi include ActiveModel::Model, đoạn này cho phép bạn sử dụng những method của ActiveRecord như validates,.. và thực hiện bất kỳ validate nào bạn muốn như trên active-record.

## Form Object Initialize and Save

Trong trường hợp này, các hành động của form object sẽ được quyết định bởi 2 hàm #initialize và #save. Thì khi ở trên controller, action create của chúng ta sẽ như sau:
```
def create
  @form_object = UserRegistration::FormObject.new(params)
  if @form_object.save
    ... #typically we flash and redirect here
  else
    render :new
  end
end
```
Bạn có thể thấy form object sẽ sẽ trực tiếp thay thế model và giúp cho controller của chúng ta trở nên ngắn gọn và sách sẽ.
Và initialize method sẽ trông như thế này:
```
def initialize(params)
  self.name = params.fetch(:name, '')
  ... # and so on and so forth
end
```
Và hàm save:
```
...
def save
  return false unless valid? #valid? comes from ActiveModel::Model
  User.create(name: name)
  notify_project_manager
  assign_task_to_project_manager
  true
end

private

def notify_project_manager
  ... # here we talk to the Message model
end

def assign_task_to_project_manager
  ... # here we talk to the Task model
end
...
# and so on and so forth
```
Điều quan trọng với phương thức #save là trả về false và true đúng tùy thuộc vào việc việc gửi biểu mẫu có đáp ứng tiêu chí của bạn không, để bộ điều khiển của bạn có thể đưa ra quyết định đúng.

## Recap
I’m a big fan of form objects, and a general rule of thumb for me is to use them whenever I feel things are getting complicated in the controller and view. They can even be used in situations where you’re not dealing directly with the database (like for example interacting with a third party API).

I encourage you, if you haven’t already, to consider how form objects might fit into your app. They will go a long way in ensuring your controllers and models are thin and keeping your code maintainable.

Have you used form objects in your Rails apps? Have they helped or hindered you? How else do you keep your controllers thin? Let me know in the comments section, I’d love to hear what you think.

Referance: https://ducktypelabs.com/how-to-keep-your-controllers-thin-with-form-objects/,
https://viblo.asia/p/form-object-giai-phap-thay-the-cho-active-record-nested-attributes-3OEqGjxNR9bL,
https://robots.thoughtbot.com/activemodel-form-objects