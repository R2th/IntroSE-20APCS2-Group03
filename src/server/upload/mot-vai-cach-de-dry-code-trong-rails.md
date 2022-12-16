Thuật ngữ DRY chắc không còn xa lạ lắm với các lập trinh viên, và có lẽ nó cũng là 1 nguyên tắc phát triển phần mềm mà các coder phải nên biết vì các lợi ích của nó mạng lại là không hề nhỏ.
## DRY là gì ?
DRY thực chất là viết tắt của câu :
> **Don’t Repeat Yourself**<br>

Hiểu nôm na là chúng ta không nên lặp lại code<br>
Lợi ích DRY mang lại :
* Dễ bảo trì, mở rộng code : Khi chúng ta maintain code có lẽ ai cũng muốn chỉ cần tìm 1 ví trí nút thắt duy nhất để có thể giải quyết toàn bộ 1 issue thay vì chúng ta phải ctrl + shift + F đi mò từng file để sửa hoặc viết những đoạn code giống nhau không ạ :sweat_smile:
* Hạn chế bị bug: Nếu chúng ta copy 1 đoạn code từ chỗ này qua chỗ kia và đến 1 ngày chúng ta phải sửa hết đống code tha đi khắp nơi ấy mà chẳng may lại bị sót mất chỗ nào thì sao :scream:?
### Ví dụ :
Chúng ta đi vào 1 ví dụ quen thuộc trong rails:
```ruby
class MicropostsController < ApplicationController
    def show
        @micropost = Micropost.find_by id: params[:id]
        ...
    end
  
    def edit
        @micropost = Micropost.find_by id: params[:id]
        ...
    end
  
    def update
        @micropost = Micropost.find_by id: params[:id]
        ...
    end
```
Chúng ta có thể thấy `@micropost = Micropost.find_by id: params[:id]` được lặp đi lặp lại ở các methods cảm giác "not cool at all" đúng không ạ.<br>
Để giải quyết thì chúng ta đơn giản là dùng `before_action` :
```ruby
class MicropostsController < ApplicationController
    before_action :load_micropost, only: [:show, :edit, :update]
    def show
        ...
    end
  
    def edit
        ...
    end
  
    def update
        ...
    end
    
    private
    def load_micropost
        @micropost = Micropost.find_by id: params[:id]
    end
```
Đó tuy năng suất và hiệu suất vào như thế nhưng giờ nhìn code thoáng hơn rồi. 
Note: `before_action` thực ra là 1 method được định nghĩa ở **AbstractController::Callbacks::ClassMethods** 
## Module Concern
Gom nhóm các phương thức có thể dùng chung trong nhiều class hoặc module vào chung 1 module và include vào các class hoặc module cần dùng.<br>
Từ phiên bản Rails 4 chúng ta được cung cấp 2 folder:
* app/controllers/concerns/
* app/models/concerns/

Là nơi định nghĩa các phương thức được dùng chung trong nhiều controller hoặc nhiều model (Cái này thuộc về cách tổ chức file thôi chứ không nhất thiết tất cả các phương thức dùng chung phải bắt buộc định nghĩa ở đây ví dụ chúng ta hoàn toàn có thể include UsersHelper trong MicropostsController nhưng nghe vẻ hơi "dây mơ rễ má")<br>
Mẫu module concern:
```ruby
module M
  extend ActiveSupport::Concern

  included do
    scope :disabled, -> { where(disabled: true) }
  end

  class_methods do
    ...
  end
  
  def example
  end
  ...
end
```
* `included` : là 1 callback được gọi ngay khi module concern này được include vào class hoặc module khác
* `class_methods`: nơi define các class method được include vào class/module khác
* `example`: là các instance method được include vào class/module khác

###  Ví dụ:
`app/models/concerns/common_methods.rb` :
```ruby
 module CommonMethods
  extend ActiveSupport::Concern

  included do
    scope :create_asc, -> { order created_at: :asc }
  end

  class_methods do
    def say_hi
      p "hello world"
    end
  end

  def a_instance_method
    p "i'm .... instance method (slap finger)"
  end

end
```

`app/models/user.rb` :
```ruby
class User < ApplicationRecord
  include CommonMethods
end
```

`app/models/micropost.rb` :
```ruby
class Micropost < ApplicationRecord
  include CommonMethods
end
```
Kết quả :<br>
![](https://images.viblo.asia/b74020c9-59d4-4b5e-bdf1-0f7d3c80a3a7.png)<br>
![](https://images.viblo.asia/4558423d-1868-49a5-8ed2-02fca16d8870.png)<br>
![](https://images.viblo.asia/ad5ae4e8-9b75-4b62-b9cc-9566a9e0096d.png)<br>
![](https://images.viblo.asia/3be165af-97cb-4ed5-8315-2abe4b20cdbb.png)<br>
## Phương thức send()
Đây là 1 trong những phương thức rất hay ho trong metaprogramming. Và mình nghĩ là metaprogramming được sinh ra là để giúp đỡ lặp lại code.<br>
Phương thức send thực hiện 1 lời gọi hàm đền 1 phương thức với tham số truyền vào là 1 string, 1 block hoặc 1 symbol
### Ví dụ :
```ruby
class Person
  def initialize name
     @name = name
  end
  
 # def hello
 #   if @name == "dad"
 #     hello_dad
 #   elsif @name == "mom"
 #     hello_mom
 #   elsif @name == "sister"
 #     hello_sister
 #   else
 #     p "Hello"
 #   end
 # end
  
  def hello
    if !@name
      puts "Hello"
    else
      send "hello_#{@name}"
    end
  end
  
  private
  
    def hello_dad
      p "Hi Dad!"
    end
  
    def hello_mom
      p "Hi Mom!"
    end
  
    def hello_sister
      p "Hi Sister!"
    end
end

Person.new("dad").hello
# => "Hi Dad!"
```
## define_method
Trong trường hợp chúng ta cần định nghĩa nhiều methods có độ tương tự cao ví dụ :
### Ví dụ :
```ruby
class Micropost < ApplicationRecord
  enum status: { pending: 0, approve: 1, cancel: 2}
  class << self
    # def microposts_pending
    #   pending.where(content: "pending")
    # end

    # def microposts_approve
    #   approve.where(content: "approve")
    # end

    # def microposts_cancel
    #   cancel.where(content: "cancel")
    # end

    Micropost.statuses.keys.each do |status|
      define_method "microposts_#{status}" do
        send(status).where(content: status)
      end
    end
  end
end
```
![](https://images.viblo.asia/01c16004-efcb-4850-9815-0c0a823be116.png)
## Tổng kết
### Tài liệu tham khảo
https://api.rubyonrails.org/classes/ActiveSupport/Concern.html<br>
https://viblo.asia/p/tim-hieu-ve-metaprogramming-trong-ruby-djeZ1G4Q5Wz