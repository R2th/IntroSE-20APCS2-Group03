Chào mừng các bạn tiếp tục với series SOLID Principles của mình. Bài trước mình có giới thiệu với mọi người về nguyên tắc đầu tiên là [Single Responsibility Principle](https://viblo.asia/p/solid-principles-1-single-responsibility-principle-OeVKBRwEKkW). Ngay tiếp theo đây, trong bài viết mình sẽ giớii thiệu tới các bạn nguyên tắc tiếp theo, cùng đón đọc nhé!

# Open/Closed Principle
Định nghĩa:
>a class should be closed for modification but open for extensions.

>Một class "đóng" với việc sửa đổi, nhưng "mở" với việc mở rộng.

Nói cách khác, chúng ta nên mở rộng chức năng của class mà không sửa đổi source code của nó.
Lợi ích là chúng ta không phải lo lắng về code sử dụng các class nguồn bởi vì chúng tôi đã không sửa đổi chúng, vì vậy hành vi của chúng phải giống nhau

Chúng ta nên hãy chú ý vào những ý nghĩa của các chức năng. Trong thực tế, chúng ta phải thật cẩn thận để tránh tạo ra quá nhiều class dẫn xuất, mặc dù  những sửa đổi nhỏ trong class đó thường vô hại. Và đó là lý do chính tại sao chúng ta luôn cần phải viết test case cho các chức năng - để nhận thấy hành vi không mong muốn xảy ra trong code.

# Ví dụ
Chúng ta hãy cùng xem xét ví dụ sau. Chúng ta tạo một service object có chức năng update thông tin người dùng, validate dữ liệu, và một số thao tác khác. 
```ruby
class UserCreateService
  def initialize(params)
    @params = params
  end
  
  def call
    return false unless valid?
    process_user_data
  end
  
  def valid?
    validator = assign_validator
    validator.new(params).validate
  end
  
  def assign_validator
    if some_condition
      AdvancedUserValidator
    else
      SimpleUserValidator
    end
  end
  
  def process_user_data
    ...
  end
end
```
Như đoạn code trên chúng ta thấy ý đồ chuyển các thao tác validation sang các lớp khác để xử lý, nhưng mọi người còn thấy vấn đề gì nữa.
* Việc thêm một validation mới có vẻ khá khó khăn, chúng ta phải trực tiếp sửa code bằng if else condition
* Sửa code nếu validation bị thay đổi logic
* Testing khó khăn, chúng ta phải thực hiện cả việc thực hiện logic và validation ( nhiều trường hợp validate)

Ở đây ta có một giải pháp giúp giải quyết vấn đề như sau:
```ruby
class UserCreateService
  def initialize(params, validator: UserValidator)
    @params = params
    @validator = validator
  end
  
  def call
    return false unless validator.new(params).validate
    process_user_data
  end
  
  attr_reader :params, :validator
  
  def process_user_data
    ...
  end
end
```
Đơn giản chúng ta vất hết công việc validate dữ liệu vào 1 thằng class đảm nhiệm. Cách giải quyết trên được gọi là Dependence Injection. Nếu chúng ta muốn thay đổi cách validate khác cho user, chỉ cần thay đổi class validator truyền vào.

Lưu ý rằng đồng thời chúng ta đã hoàn thành nguyên tắc Single responsibility principle (chúng ta đã chuyển trách nhiệm bổ sung sang một class khác). Bây giờ, chúng ta không phải sửa đổi class gốc nếu chúng ta muốn thêm một class khác để validate dữ liệu. Chúng ta chỉ cần tạo một class thích hợp mới và gọi nó là tham số trong trường hợp phù hợp.

# Kết luận
Chúng ta đã có một giải pháp rất linh hoạt, và đã sẵn sàng thêm các bước validation mới mà không lo lắng đến code ban đầu. Nó có thể mất thêm thời gian hoặc giá cả, nhưng điều khó khiến chúng ta happy và tự hào.  Nếu bạn không bao giờ phải thêm một Validation mới thì điều khó khiến những gì chúng ta làm sẽ mất thêm thời gian và thập chí là thêm chi phí. Nhưng đó là trường hợp các yêu cầu rõ ràng, clear từ đầu. Nhưng trong quá trình phát triển không biết chuyện gì sẽ xảy ra tiếp theo nên chúng ta càng cẩn thận càng tốt.
Tài liệu: https://www.netguru.co/codestories/solid-principles-2