Thự sự mình cũng không biết đặt tên bài là gì cho hợp lý, mình chỉ muốn chia sẻ 1 case trong quá trình làm việc về active record validation.
# 1. Vấn đề
Rails hỗ trợ validate rất tốt, viết vài dòng nhìn vừa clear vừa đơn giản là điều không có gì để bàn cãi. Tuy nhiên, nó cũng kéo theo nhiều vấn đề mà bạn phải đau đầu. Gần đây mình đang có một dự án có 1 case khá rắc rối, chỉ đơn giản là 1 user nhưng có validation khác nhau cho những trường hợp tạo khác nhau. 1 số user được import từ hệ thống cũ, 1 api để bên khác gọi và tạo user, lại có một số user mà tự hệ thống mình sinh ra mặc định hoặc được đăng kí bình thường. Nếu được design từ đầu thì chắc việc validate không có gì khó. Nhưng khổ nỗi thỉnh thoảng lại có một trong các bên thay đổi yêu cầu về validate, nay require email, mai thay đổi regex số điện thoại. 
# 2. Giải pháp ban đầu
## 2.1 Validate in controller
Đầu tiên giải pháp đơn giản là viết validate vào controller. Nhưng mà rõ ràng nó cùi quá, vì 2 lý do mà ai cũng biết:

- Validate không tập trung, sau này thay đổi phải đi tìm từng chỗ.
- Validate phải code tay, không thể tận dụng validate có sẵn của rails.

## 2.2 Sử dụng `if:` và `unless:`
Về cơ bản cách này đúng nhưng dùng thế nào lại là việc khác. Đầu tiên khi chỉ có 2 nguồn tạo user, mình tạo thêm 1 biến `:skip_validation` và dùng nó như 1 cái công tắc switch giữa 2 nguồn.
```ruby
attr_accessor :skip_validation

validates :email, allow_blank: true, if: :skip_validation
validates :password, presence: true, unless: :skip_validation
```
Và trước khi save mình thêm việc gán biến `skip_validation` để quyết định xem mình sẽ sử dụng bộ validation nào. Ban đầu khá là ok nhưng khi ngày càng nhiều nguồn tạo user, ngày càng nhiều sự khác biệt giữa các validation, nhưng vẫn có những validation giống nhau, code mình càng phức tạp. Mỗi khi chỉnh sửa lại phải tự test lại hết đống cũ. Test mãi rồi mà vẫn có lỗi. Đây là 1 đoạn code ví dụ xấu mà mình đã code lúc đầu:
```ruby
attr_accessor :skip_validation, :custom_validation, :api_validation

validates :username, presence: true, length: LENGTH_FORMAT, unless: :skip_validation
validate :username_character, unless: :skip_validation
validates :email, allow_blank: true, format: VALID_EMAIL_REGEX, length: {maximum: 255},
  unless: :skip_validation

validates :email, presence: true, if: :custom_validation
validates :password, presence: true, format: PASSWORD_REGEX, length: 6..255,
  confirmation: {case_sensitive: true}, if: :custom_validation

validates :email, presence: true, if: :api_validation
```
Đúng là khi đơn giản chỉ có 2 tập validate khác nhau thì việc code thêm 1 biến đơn giản là đúng, không khiến code bị loằng ngoằng. Nhưng khi nó to ra và thay đổi thường xuyên thì nó vô cùng tệ hại.
# 3. Giải pháp
## 3.1 Code rõ ràng hơn một chút
Tạo ra các bộ validation với các biến để bật tắt cho từng bộ. Đảm bảo code một lần đúng luôn:
```ruby
attr_accessor :register_validation, :import_validation, :api_validation

# register validation
validates :username, presence: true, length: LENGTH_FORMAT, if: :register_validation
validates :email, presence: true, format: VALID_EMAIL_REGEX, if: :register_validation
validates :password, presence: true, format: PASSWORD_REGEX, if: :register_validation

# import validation
validates :username, presence: true, length: LENGTH_FORMAT, if: :import_validation
validates :email, presence: true, format: VALID_EMAIL_REGEX, if: :import_validation

# api validation
validates :username, presence: true, length: LENGTH_FORMAT, if: :api_validation
validates :email, allow_blank: true, format: VALID_EMAIL_REGEX, if: :api_validation
validates :password, presence: true, format: PASSWORD_REGEX, if: :api_validation

```
Đừng ngại lặp lại 1 validate 2 3 lần ở các bộ khác nhau, có thể đó sẽ là phần cần thay đổi trong tương lai. Khi update cũng chỉ cần bật đúng bộ validate mình cần thôi, việc chỉnh sửa cũng không quá nhiều.
```ruby
user = User.new user_param
user.register_validation = true
user.save
```
Hoặc merge vào param cũng được.
```ruby
user = User.find_by(id: params[:id])
user.update user_param.merge(api_validation: true)
```

## 3.2 Cẩn thận hơn một chút
Ngoài các trường khác biệt, các trường có validate thống nhất giữa các bộ cũng cần define tại đây, nhưng cũng nên làm 1 biến `disable_default_validation` để tiện cho việc chỉnh sửa.
```ruby
attr_accessor :disable_default_validation

validates :birth_date, presence: true, unless: :disable_default_validation
validates :address, presence: true, unless: :disable_default_validation
```

# Kết bài
Đây chỉ là 1 case riêng của mình và cách xử lý riêng của mình, nếu bạn có cách nào tốt hơn hay suggest thư viện nào đó thì hãy thoải mái comment. Ít ra mình không có ai comment mấy nên vẫn đọc hết đc.