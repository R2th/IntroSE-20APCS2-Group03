# Service Object
Chào các bạn, sau những ngày nghỉ dịch dài hạn chúng ta lại gặp nhau :kissing_smiling_eyes:. Như đã giới thiệu ở cuối [phần 1](https://viblo.asia/p/design-pattern-va-cac-object-co-ban-trong-du-an-api-voi-rails-p1-naQZRLPd5vx), hôm nay mình sẽ viết về một design patterns được sử dụng nhiều nhất trong Rails - Service Object đặc biệt là các dự án với API. Khác với Form Object và Query Object tương tác với model, Service Object thường được sử dụng ở controller, ở đó mọi công việc được xử lý từ A->Z và trả về kết quả bạn mong muốn. 

![](https://images.viblo.asia/fc49ef1a-8208-4946-8675-6676f3d48260.png)

```ruby
class Api::V1::InvitesController < Api::V1::BaseController
    def create
        ActiveRecord::Base.transaction do
            check_permission
            create_company
            create_user
        end
    end
    
    private
    def invite_params
        #do sth
    end
    
    def check_permission
        #do sth
    end
    
    def create_company
        #do sth
    end
    
    def create_user
        #do sth
    end
end
```
Để giúp controller gọn gàng hơn, ta sẽ chuyển 3 hàm check_permission, create_company và create_user vào Service Object. Một Service Object bao gồm hàm `initialize` là nơi khởi tạo tham số nhận được từ controller, đi kèm `attr_reader` để sử dụng params một cách thuận tiện trong private method, tiếp theo là `perform` nơi mọi logic được xử lý và return kết quả cần thiết cho controller.
```ruby
class Api::V1::InviteService < BaseService
  def initialize params
    @params = params
  end
        
  def perform
    ActiveRecord::Base.transaction do
      # do sth
    end
  end
        
  private
  attr_reader :params
    
  def check_permission
    #do sth
  end
    
  def create_company
    #do sth
  end
    
  def create_user
    #do sth
  end
end
```

```ruby
class Api::V1::InvitesController < Api::V1::BaseController
  def create
    Api::V1::InviteService.new(invite_params).perform
  end
  
  private
  def invite_params
    #do sth
  end
end
```
Về cơ bản chúng ta đã áp dụng Service Object vào hệ thống thành công, nhìn chung sử dụng Service Object giống như dịch chuyển code từ controller sang một nơi khác và số lượng line code không thay đổi nhiều là mấy, vậy ý nghĩa của việc này làm này như thế nào :thinking:.
Có vài mục đích chính khá rõ ràng:

* Các tác vụ trong một service được định nghĩa rõ ràng, dễ dàng cho việc đọc hiểu và maintain code.
* Tái sử dụng ở nhiều nơi khác nhau trong hệ thống.
* Code clean và dry

# Tổng kết

Như vậy, việc sử dụng design pattern mang lại lợi ích to lớn trong hệ thống. Tuy nhiên, không có thứ gì là hoàn hảo, bên cạnh những lợi ích nó mang lại cũng tiềm tàng những mối nguy hại - Anti-pattern.
 
 * Trong rails, các hàm của object được gọi theo thứ tự dựa vào method lookup như vậy nếu một Service được tạo ra ở một tầng quá sâu (>3) sẽ làm ảnh hưởng đến performance việc này khá dở và ảnh hưởng nhiều đến quá trình sử dụng. Một ví dụ điển hình ở bài viết trước, mình có nhắc tới nested attributes trong model, Rails khuyến cáo rằng nhiều nhất nên dừng ở tầng thứ 2, lúc sử dụng ở tầng thứ 3 trở đi (sẽ có warning xuất hiện) thuật toán xử lý sẽ trở nên phức tạp làm giảm performance không đáng có.
 * Nếu chúng ta chỉ chăm chăm vào việc tối ưu hóa code mà không tổ chức hệ thống một cách phù hợp, lúc này mọi thứ sẽ đi theo chiều hướng xấu đi, code trở nên khó đọc, khó bảo trì và có những phần không cần thiết được theo vào hệ thống.

Do đó trước khi sử dụng một design pattern nào đó hãy cân nhắc xem có thực sự cần thiết và nên tự đặt ra một tiêu chuẩn riêng để áp dụng các design pattern sao cho hợp lý. Chúc các bạn thành công!

Bài viết tham khảo qua:
* Rails AntiPatterns Refactoring
* Design Patterns For Dummies
* Head First Design Patterns