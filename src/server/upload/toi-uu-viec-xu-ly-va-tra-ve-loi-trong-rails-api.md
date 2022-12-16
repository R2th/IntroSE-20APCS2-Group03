Bạn có mệt mỏi và mệt mỏi khi xử lý các trường hợp ngoại lệ vô tận, viết logic tùy chỉnh để xử lý các yêu cầu API xấu và tuần tự hóa các lỗi tương tự lặp đi lặp lại?
Vậy Làm sao để giải quyết mà vẫn giữ đựoc DRY cho Code của bạn?? Hướng giải quyết của bài viết hôm nay là:
 - Xác định một tập hợp các lỗi tùy chỉnh, phân chúng dưới một lớp cha và cấp cho một mã xử lý và tìm dữ liệu cho mỗi điểm cuối khác nhau để raise ra các errors.
 - Sau đó, chỉ với vài dong code gọi từ parent controller, chúng ta sẽ rescue đựoc bất kì các trường hợp lỗi cảu phân lớp này, đưa ra các phiên bản nối tiếp của các ngoại lệ, do đó bắt đựoc tất cả các llooix từ các điểm cuối riêng lẻ.
## 1. Nhận biết sự lặp lại trong kết xuất phản hồi lỗi API
### API
Trong bài này, chúng ta sẽ mô phỏng trên Rails API sử dụng dữ liệu cho ứng dụng thương mại điện tử của khách hàng. User được xác thực có thể thực hiện các yêu cầu để tra lại các giao dịch mua trước đây và mua hàng, hoặc làm những thứ khác.
Xét các điểm cuối sau:
```
POST '/purchases'
GET '/purchases'
```
Bất kỳ API mạnh mẽ tất nhiên sẽ đi kèm với thông số kỹ thuật.
### API Specs
**Purchases**

*Request*
```
GET api/v1/purchases
```
```
# params
{
  start_date: " ",
  end_date: " "
}
```
*Success Response*
```
# body
{ 
  status: "success",
  data: {
    items: [
      {
        id: 1,
        name: "rice cooker", 
        description: "really great for cooking rice",
        price: 14.95,
        sale_date: "2016-12-31"
      },
      ...
    ]
  }
}
```
```
# headers 

{"Authorization" => "Bearer <token>"}
```
*Error Response*
```
{
  status: "error",
  message: " ",
  code: " "
}
```

![](https://images.viblo.asia/be563278-c9d3-425a-a76a-087d24849b5f.png)
=> truy vấn mua hàng theo phạm vi ngày.

*Request*
```
POST api/v1/purchases
```
```
# params
{
  item_id: 2
}
```
*Success Response*
```
# body
{ 
  status: "success",
  data: {
    purchase_id: 42,
    item_id: 2
    purchase_status: "complete"
  }
}
```
```
# headers 

{"Authorization" => "Bearer <token>"}
```
*Error Response*
```
{
  status: "error",
  message: " ",
  code: " "
}
```

![](https://images.viblo.asia/7a9978bd-40f1-4cc5-9d14-c74a2a4340d0.png)

### Error Code Pattern

Chỉ với một vài thông số kỹ thuật điểm cuối, chúng ta có thể thấy rằng có rất nhiều hành vi được chia sẻ.
Với request `GET /purchases` và  những request `POST /purchases` chúng ta có hai kịch bản lỗi cụ thể. NHƯNG, trong cả hai trường hợp chúng ta cần phản hồi với một lỗi, định dạng phản hồi hoàn toàn giống nhau. Trên đây mới chỉ là `code` và `message` cho các phản hồi của chúng ta cần phải thay đổi.

### API Controllers

```
# app/controllers/api/v1/purchases_controller.rb
module Api
  module V1
    class PurchasesController < ApplicationController
      def index
        if params[:start_date] && params[:end_date]
          render json: current_user.purchases
        else
          render json: {status: "error", code: 3000, message: "Can't find purchases without start and end date"}
        end
      end
 
      def create
        if params[:item_id]
          purchase = Purchase.create(item_id: params[:item_id], user_id: current_user.id)
          render json: purchase
        else
          render json: {status: "error", code: 4000, message: "item_id is required to make a purchase}
        end
      end  
    end
  end
end
```

Cả hai điểm cuối trong ví dụ trên  đều chứa logic kết xuất lỗi và chúng chịu trách nhiệm soạn thảo lỗi được hiển thị.
Điều này lặp đi lặp lại và sẽ gia tăng hơn khi xây dựng các điểm cuối API bổ sung. Hơn nữa, chúng ta không thể quản lý việc tạo lỗi của chúng ở một nơi tập trung. Thay vào đó, tạo các gói JSON lỗi riêng lẻ và gọi bất cứ khi nào cần.
Và để clean đoạn trên, chúng ta sẽ bắt đầu với việc xây dựng tập hợp các lỗi tùy chỉnh, tất cả chúng sẽ kế thừa từ cùng một cha mẹ.

### Custom Error Classes

Tất cả các lớp lỗi tùy chỉnh của chúng tôi sẽ được phân lớp dưới `ApiExceptions::BaseException`
Lớp cơ sở này sẽ chứa bản đồ mã lỗi tập trung. Chúng ta sẽ đặt các lớp lỗi tùy chỉnh trong thư mục `lib /`.
```
# lib/api_exceptions/base_exception.rb

module ApiExceptions
  class BaseException < StandardError
    include ActiveModel::Serialization
    attr_reader :status, :code, :message

    ERROR_DESCRIPTION = Proc.new {|code, message| {status: "error | failure", code: code, message: message}}
    ERROR_CODE_MAP = {
      "PurchaseError::MissingDatesError" =>
        ERROR_DESCRIPTION.call(3000, "Can't find purchases without start and end date"),
      "PurchaseError::ItemNotFound" =>
        ERROR_DESCRIPTION.call(4000, "item_id is required to make a purchase")
    }

    def initialize
      error_type = self.class.name.scan(/ApiExceptions::(.*)/).flatten.first
      ApiExceptions::BaseException::ERROR_CODE_MAP
        .fetch(error_type, {}).each do |attr, value|
          instance_variable_set("@#{attr}".to_sym, value)
      end
    end
  end
end
```

**Phân tích:**

1. Kế thừa `BaseException` từ `StandardError`, để các thể hiện của class có thể được `raised` và `rescued`.
2. Xác định một bản đồ lỗi sẽ gọi một Proc để tạo mã lỗi và thông báo chính xác.
3. Đã tạo các `attr_reader` cho các thuộc tính chúng tôi muốn tuần tự hóa.
4. Đã bao gồm `ActiveModel :: serialization` để các thể hiện của class có thể được tuần tự hóa bởi Active Model serializer.
5. Đã xác định một phương thức` #initialize` sẽ được gọi bởi tất cả các class con lỗi tùy chỉnh. Khi phương thức này chạy, mỗi class con sẽ sử dụng bản đồ lỗi để đặt các giá trị chính xác cho các biến `@status`, `@code` và `@message`.

Bây giờ chúng ta sẽ tiếp tục và xác định các class lỗi tùy chỉnh, như được ánh xạ trong bản đồ lỗi.
```
# lib/api_exceptions/purchase_error.rb

module ApiExceptions
  class PurchaseError < ApiExceptions::BaseException
  end
end
```
```
# lib/api_exceptions/purchase_error/missing_dates_error.rb

module ApiExceptions
  class PurchaseError < ApiExceptions::BaseException
    class MissingDatesError < ApiExceptions::PurchaseError
    end
  end
end
```
```
# lib/api_exceptions/purchase_error/item_not_found.rb

module ApiExceptions
  class PurchaseError < ApiExceptions::BaseException
    class ItemNotFound < ApiExceptions::PurchaseError
    end
  end
end
```
Bây giờ các class lỗi tùy chỉnh đã được xác định, đã sẵn sàng cấu trúc lại bộ điều khiển.

### Refactoring The Controller

Đối với công cụ tái cấu trúc này, chúng ta sẽ chỉ tập trung vào việc áp dụng mẫu mới cho một điểm cuối duy nhất, vì cùng một mẫu có thể được áp dụng lặp đi lặp lại. Xem xét yêu cầu `POST /purchases`, được xử lý bởi `PurchasesController#create`
Thay vì xử lý đăng nhập trực tiếp trong hành động của bộ điều khiển, chúng ta sẽ xây dựng một dịch vụ để xác thực sự hiện diện của `item_id`. Dịch vụ sẽ tăng `ApiExceptions::PurchaseError::ItemNotFound` nếu không có `item_id` trong params.
```
module Api 
  module V1
    class PurchasesController < ApplicationController
      ...
      def create
        purchase_generator = PurchaseGenerator.new(user_id: current_user.id, item_id: params[:item_id])
        render json: purchase_generator
      end
    end
  end
end
```
Dịch vụ của này giống như một mô hình lai dịch vụ( service-model hybrid). Nó tồn tại để thực hiện một công việc cho chúng ta, Google, tạo ra một giao dịch mua, nhưng nó cũng cần xác thực và nó sẽ được đăng theo thứ tự như là cơ quan phản hồi cho yêu cầu API của chúng ta. Vì lý do này, chúng tôi sẽ xác định nó trong `app/models`.
```
# app/models

class PurchaseGenerator
  include ActiveModel::Serialization
  validates_with PurchaseGeneratorValidator
  attr_reader :purchase, :user_id, :item_id
  
  def initialize(user_id:, item_id:)
    @user_id = user_id
    @item_id = item_id
    @purchase = Purchase.create(user_id: user_id, item_id: item_id) if valid?
  end
end
```
Bây giờ, ta xây dựng validator tùy chỉnh để kiểm tra sự hiện diện của `item_id` và đưa ra lỗi nếu không có nó.
```
class PostHandlerValidator < ActiveModel::Validator
  def validate(record)
    validate_item_id
  end

  def validate_item_id
    raise ApiExceptions::PurchaseError::ItemNotFound.new unless record.item_id
  end
end
```
Xác nhận tùy chỉnh thực hiện với phương thức `#valid?` . Vì vậy, mã rất đơn giản trong Purchases Controller sẽ đưa ra lỗi thích hợp nếu cần, mà chúng ta không phải viết bất kỳ luồng điều khiển nào trong chính bộ điều khiển.
*Nhưng, bạn có thể tự hỏi, làm thế nào chúng ta sẽ rescue hoặc xử lý lỗi này và đưa ra lỗi nối tiếp(serialized error)?*

## 2. Universal Error Rescuing and Response Rendering

Với dòng sau trong Application Controller, chúng ta có thể rescue  * mọi lỗi được phân lớp dưới `ApiExceptions::BaseException` :
```
class ApplicationController < ActionController::Base
  rescue_from ApiExceptions::BaseException, 
    :with => :render_error_response
end
```
Dòng này sẽ rescue  bất kỳ lỗi nào như vậy bằng cách gọi phương thức `render_error_response`, chúng sẽ xác định ngay tại đây và chuyển phương thức đó lỗi đã được raised. Tất cả phương thức `render_error_response`  phải thực hiện và hiển thị lỗi đó dưới dạng JSON.
```
class ApplicationController < ActionController::Base
  rescue_from ApiExceptions::BaseException, 
    :with => :render_error_response
  ...

  def render_error_response(error)
    render json: error, serializer: ApiExceptionsSerializer, status: 200
  end
end
```

`ApiExceptionSerializer` của chúng ta rất đơn giản:
```
class ApiExceptionSerializer < ActiveModel::Serializer
  attributes :status, :code, :message
end
```

Và đó là tất cả! Chúng ta đã đạt được các hành động điều khiển siêu sạch không thực hiện bất kỳ luồng điều khiển nào và hệ thống tạo và tuần tự hóa lỗi tập trung.

## 3. Kết Luận
Trong một API, muốn tuân theo một tập hợp các quy ước mạnh mẽ khi đưa ra các phản hồi lỗi. Điều này có thể dẫn đến code controller lặp đi lặp lại và một danh sách các định nghĩa thông báo lỗi không ngừng phát triển và phân tán.
Loại bỏ những vấn đề rất khó chịu này như sau:
1. Xây dựng một nhóm các lớp lỗi tùy chỉnh, tất cả chúng đều thừa hưởng từ cùng một cha mẹ và được đặt tên theo `ApiExceptions` .
2. Chuyển logic controller kiểm tra lỗi ra khỏi các actions và cho vào một model tùy chỉnh.
3. Xác thực model đó bằng trình validation tùy chỉnh làm tăng trường hợp lỗi tùy chỉnh phù hợp khi cần thiết.
4. Xử lý Application Controller  để rescue  bất kỳ trường hợp ngoại lệ nào thừa hưởng từ `ApiExceptions::BaseException` bằng cách hiển thị dưới dạng JSON lỗi, với sự trợ giúp của `ApiExceptionSerializer` .

Hãy nhớ rằng cách tiếp cận cụ thể của việc thiết kế một model tùy chỉnh với validate tùy chỉnh để raise   lỗi tùy chỉnh. Phần áp dụng phổ biến của mẫu này là chúng ta có thể xây dựng các dịch vụ để phát sinh các lỗi cần thiết và kêu gọi các dịch vụ này trong các hành động của bộ điều khiển, do đó giữ cho việc xử lý lỗi và raise hoàn toàn các hành động của bộ điều khiển riêng lẻ.

Trên đây là bài viết bổ ích em muốn chia sẻ cho mọi người. Hi vọng giúp ích cho các bạn :).

Tài liệu tham khảo: [Link bài dịch](https://www.thegreatcodeadventure.com/rails-api-painless-error-handling-and-rendering-2/?fbclid=IwAR3bJbVJJXCtJgc5cdvCEXFkegd1W57lvaz2UwxoSHeB6q4vFfbSgR_Z3EM)