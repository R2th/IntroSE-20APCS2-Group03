# 1.Mở đầu
Form object là một object dùng để quản lý độ phức tạp của các tác vụ thay đổi dữ liệu vượt quá các chức năng CRUD cơ bản. Thông thường, các tác vụ CRUD cơ bản như thêm user, sửa user, hay xóa user cần số lượng dòng code rất ít nên ta có thể đặt ở controller. Tuy nhiên, độ phức tạp sẽ phát sinh khi chức năng tạo một user còn yêu cầu tạo thêm một organization để thêm user đó vào, hoặc đối với ứng dụng e-commerce, nếu user mua một sản phẩm thì một order và một payment transaction phải được tạo ra cùng một lúc. Vì business logic phưc tạp nên số dòng code cũng như các đối tượng được tạo ra sẽ rất lớn và sẽ đẫn đến tình trạng "fat controller". Và một "fat controller" sẽ rất khó để kiểm thử cũng như bảo trì, logic phức tạp thì sẽ dẫn đến ta phải viết nhiều test case, nhưng thường thì controller còn yêu cầu cả authentication và authorization, vậy nên khi test ta còn cần phải tạo thêm dữ liệu để pass authentication và authorization cho các test case kia, việc này là dư thừa và có thể làm chậm quá trình chạy test

Một nhược điểm khác là các logic nghiệp vụ sẽ không tái sử dụng được ở nơi khác vì nó đã được cố định tại một endpoint. Mặc dù ta có thể tách code logic ra và đưa vào các module concerns tuy nhiên nó vẫn phức tạp hơn sơ với việc sử dụng form object và về cơ bản, việc đưa logic của một class vào trong một đối tượng khác sẽ vi phạm một trong các nguyên tắc của OOP: single responsibility (S trong SOLID). Việc đưa toàn bộ logic vào một class riêng sẽ dễ dàng để tái sử dụng, test và bảo trì hơn.

# 2.Khi nào sử dụng form-object
## Nhiều hơn một resource bị ảnh hưởng
Đây là trường hợp thường gặp nhất, theo convention các controllers và model trong rails là single resource-based. Vì vậy, khi logic nghiệp vụ yêu cầu khởi tạo hoặc sửa, xóa nhiều resource khác, thì lúc này ta nên gom các logic này vào cùng một chỗ để dễ quản lý, cách tốt nhất là sử dụng form object.

## Kết hợp validation cho nhiều resource
Thông thường chũng ta thường định nghĩa các validation bên trong các active-record model. vd:

```
class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  validates :locale, 
inclusion: { in: Language.all.map(&:code).map(&:to_s) }
  validates :time_zone, inclusion: { in: ActiveSupport::TimeZone.all.map(&:name) }
  validates :terms_of_service, :informed_consent, acceptance: true
end
```

Nhưng không chỉ vậy, có một số model không phải active record cũng có thể có validation khi được khởi tạo, giả sử có một class Search, ta cần phải validate presence: true cho thuộc tính search_params, tuy nhiên không phải là một active record model nên nếu thực hiện theo cách thông thường thì phải tự implement, và việc gán thông báo lỗi cho thuộc tính search_params cũng bị hạn chế, chỉ có thể hiển thị ngoài giao diện dưới dạng flash message

```

# Custom validation
module Flight
  class Search
    def initialize(search_params = {})
      missing_required_params = missing_required_params_from(search_params).flatten
      if search_params[:search_id].blank? && missing_required_params.any?
        raise ArgumentError, I18n.t(
          'api.errors.booking.missing_params',
           params: missing_required_params.join(', ')
        )
      end
    end
  end
end
```

Validation có ở khắp nơi trong ứng dụng của chúng ta, nhưng làm sao để xử lý validation cho nhiều model cùng lúc, nếu chỉ có một số validation chỉ cần thiết cho một số trường hợp cụt thể thì việc đặt nó bên trong model thực sự không cần thiết và việc viết test cho các validation này đôi lúc cũng gặp nhiều khó khăn.
# 3.Cách sử dụng form object
## Cấu trúc thư mục
Form object sẽ được đặt bên trong thư mục app

```
├── app
│ ├── assets
│ ├── channels
│ ├── controllers
│ ├── decorators
│ ├── factories
│ ├── forms 👈 
│ ├── helpers
│ ├── jobs
│ ├── mailers
│ ├── models
│ ├── presenters
│ ├── queries
│ ├── searchers
│ ├── services
│ └── views
```

Và class được đặt tên với hậ tố là _form
```
├── forms
│   └── booking
│       └── checkout_payment_form.rb
```

## Tạo một class form

Tạo một class với các thuộc tính bắt buộc

```
class CheckoutPaymentForm
  attr_reader :order
  
  def initialize(booking:, card_id: nil, token: nil)
    @booking = booking
    @card_id = card_id
    @token = token
  end
  # ...
end
```

Class trên so với một class ruby thuong thường thì không có sự khác biệt
## Sử dụng ActiveModel::Model.
Tiếp theo, incluide module ActiveModel::Model để có thể sử dụng các phương thức có trong active model

```
class CheckoutPaymentForm
  include ActiveModel::Model
  
  attr_accessor :order
  
  def initialize(booking:, card_id: nil, token: nil)
    @booking = booking
    @card_id = card_id
    @token = token
  end
  # ...
end
```

nhờ vậy, bây giờ ta có thể sử dụng các phương thức validations methods tương tự như active record model

```
class CheckoutPaymentForm
  include ActiveModel::Model
  
  attr_accessor :order

  validates :token, presence: true, if: -> { card_id.blank? }
 
  def initialize(booking:, card_id: nil, token: nil)
    # ...
  end
end
```

hoặc có thể validate với validation mà mình tự định nghĩa

```
    class BookingPackagesForm
      include ActiveModel::Model
    
      attr_accessor :user, :package_sets, :packages
    
      validates_with BookingPackagesFormValidator
    
      def initialize(user:, package_sets: [], packages: [])
        @user = user
        @package_sets = package_sets
        @packages = packages
      end
      # ...
    end
```

Và bây giờ ta có thể lấy được thông tin error tương tự như làm với active record model, nhờ phương thức valid?

```
pry(main)> booking = Booking.find(10)
pry(main)> booking_package_form = CheckoutPaymentForm.new(booking: booking)
pry(main)> booking_package_form.valid?
=> false
pry(main)> booking_package_form.errors.full_messages
=> ["Token can't be blank"]
```

## Tùy chỉnh các phương thức CRUD
Các phương thức CRUD của form object nên đi theo convention của active record object, như save , update hoặc create (hoặc save!, update! hoặc create! khi cần bắn ra exception) để sử dụng tương tự như một active record object

```
    class BookingPackagesForm
      include ActiveModel::Model
    
      attr_accessor :user, :package_sets, :packages
    
      validates_with BookingPackagesFormValidator
    
      def initialize(user:, package_sets: [], packages: [])
        #...
      end

      def save(params = {})
         return false unless valid?
         
         # rest of persistence logic
      end

  private
      # ...  
end
```

và ở controller ta chỉ việc implement tương tự active record object như sau
```
class BookingPackagesController < ApplicationController
  # ...

  def update
    if @booking_packages_form.save(booking_package_params) 
      # handle happy case 
    else
      # handle unhappy case    
    end
  end 
end
```

## Sử dụng transaction
Vì form object sử dụng để quản lý sự ảnh hưởng của nhiều resource, việc sử dụng transaction là vô cùng cần thiết để bảo đảm tính toàn vẹn cho dữ liệu khi việc cập nhật dữ liệu của một resource nào đó bị lỗi

```
def update(params = {})
  # ... assign params
  return false unless valid?

  ActiveRecord::Base.transaction do
    destroy_removed_package_sets
    save_package_sets
    save_packages

    raise ActiveRecord::Rollback unless errors.empty?
  end

  errors.empty?
end
```
# Kết
Form Object có thể giúp giảm thiểu một số vấn đề khác nhau khi thực hiện các dự án Rails và do đó, nó có thể chứng minh là một công cụ hữu ích cho chúng ta, ngoài ra hiện tại cũng có một gem có thể giúp ta dễ dàng áp dụng form object vào dự án là [reform](https://github.com/trailblazer/reform)

Nguồn: https://nimblehq.co/blog/lets-play-design-patterns-form-objects