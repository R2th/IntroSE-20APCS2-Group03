Trong bài hướng dẫn này giải thích làm sao để cấu trúc lại Ruby on Rail apps sử dụng classes hoăc module thực hiện một việc cụ thể, hay còn gọi là Service Object. Bằng cách viết chúng, bạn sẽ có thể viết cleaner code giúp dễ dàng tổ chức và dễ dàng bảo trì.
## Service Objects
### Service Object as a class
classes là một lựa chọn tốt nếu bạn muốn lưu dữ liệu vào instance variables.
```ruby
class ServiceObject
  def call(arg1, arg2, ...etc)
    new(arg1, arg2, ...etc).call
  end
private
def initialize(arg1, arg2, ...etc)
    @var = arg1
    @var = arg2
    ...etc
  end
def call
   # Logic goes here
  end
end
```
### Service Object as a module
Nếu bạn không muốn lưu dữ liệu vào instance variables, thì một module là một lựa chọn nhẹ nhàng hơn :D
```ruby
module ServiceObject
  def self.call(arg1, arg2, ...etc)
   # Logic goes here
  end
end
```

## Refactor
Khi bạn bắt đầu viết một ứng dụng Ruby on Rails, nó không cần phải module hóa code và tạo quá nhiều Serice Objects. Nhưng khi ứng dụng của bạn lớn hơn, thì nó dẫn đến phức tạp và quá nhiều block code trong Models, VIew và Controllers dẫn đến khó thay đổi sau này.
### Create folders to organise your Service Objects
Hãy suy nghĩ về Service Object mà bạn muốn đạt được. Sau đó nhóm tất chúng lại vào thư mục `app/servies` (Hay tạo nó nếu bạn không có sẵn :grinning:). Các danh mục thư mục có thể là liên quan đến model, tiến trình, loại service chẳng hạn như Search.
```ruby
services/suggestion/builder.rb
services/login/validator.rb
services/search/suggestions_by_tag.rb
...
```
### Use modules to manage the namespace of Service Objects
Khi bạn tạo ngày càng nhiều Serivce Object, chúng có thể nhóm lại vào các namespace thì sử dụng modules.
```ruby
module Suggestion
  module Builder
    def self.call(params)
      # logic goes here
    end
  end
end
```
Bạn hãy chắc chắn rằng đường dẫn tệp khớp với cấu trúc trên mudule của Service Object của bạn!
*Bây giờ bạn định rõ trách nhiệm với mỗi Serice Object, tiếp theo tôi sẽ chỉ cho bạn làm thế nào đê viết vào trong ứng dụng Rails của bạn*
# Extract code from Models, Views and Controllers
Hãy chắc chắn rằng việc viết một Service Object ở một vùng khác với trong ứng dụng của bạn không làm ảnh hưởng đến các chức năng trong ứng dụng của bạn, đây là cách dễ dàng nhất để phát triển phần mền dựa theo test-driven.
### Testing
Hy vọng là code của bạn có unit test cho code của bạn và bạn có thể chuyển vào một test file cho Service Object. Nếu bạn không cần, bạn cần đảm bảo tất cả các new và module sẽ được test. Điều quan trọn nữa là các kiểm thử tích hợp sẽ có thể thay đổi các vùng nằm trong app của bạn khi Service Object là calles.
## Extract code to the Service Object
Phần này sẽ chỉ rõ các chuyển code từ một Controller sang một Service Object, nhưng cùng một nguyên tắc này có thể áp dụng cho các phần khác của ứng dụng Ruby on Rail.
### The original controller
```ruby
class SuggestionController < ApplicationController
  def create
    topic_name = params[:topic_name]
    suggestion_text = params[:suggestion_text]
    topic = Topic.find_by(name: topic_name)
    @suggestion = 
      Suggestion.new(topic: topic, text: suggestion_text)
    if @suggestion.save!
      render(:show)
    else
      redirect_to(:root)
    end
  end
end
```
### The code extracted to a Service Object
```ruby
module Suggestion
  module Builder
    def self.call(params)
      topic_name = params[:topic_name]
      suggestion_text = params[:suggestion_text]
      topic = Topic.find_by(name: topic_name)
      Suggestion.new(topic: topic, text: suggestion_text)
    end
  end
end
```
### An example of a refactored controller using a Service Object
 ```ruby
 class SuggestionController < ApplicationController
  def create
    @suggestion = Services::Suggestion::Builder.call(params)
    if @suggestion.save!
      render(:show)
    else
      redirect_to(:root)
    end
  end
end
```
Giờ bạn đã sẵn sàng tạo một Service Object, bạn có sử dụng chúng để code được rõ ràng hơn thông qua các mệnh đề bảo vệ.
## Guard clauses
Mệnh đề bảo vệ là cách viết mã để bảo vệ logic có thỏa mãn hay không thỏa mãn với điều kiện đề ra hay không.
 ```ruby
 return ACTION if CONDITION
```
Service Objects có thể sử dụng để thiết kế hoặc cấu trúc lại code để logic tách biệt với nhau trong một Ruby on Rails chẳng hạn như Controller.<br>
Trong ví dụ này, bạn có thể thấy được các quản lý bản ghi `user`, `Suggestion` và `view` trả về các hàm xử lý cho Controller bằng Service Object. Dưới đây chúng tôi có thể sử dụng cả hai `ACTION` và `CONDITION` cho mệnh đề bảo vệ.
```ruby
class SuggestionController < ApplicationController
  def create
    return redirect_to(:root) unless 
      Services::User::Validator.call(params)
    @suggestion = 
      Services::Suggestion::Builder.call(params)
    return Services::Suggestion::ViewRenderer.call if
      @suggestion.save!
    redirect_to(:root)
  end
end
```

## Find out more
Bài viết này cung cấp cho bạn một số ý tưởng về cách sử dụng Service Object trong project của bạn.
Nhưng nó cũng có nhiều hơn một nguyên tắc và bạn có thể điều chỉnh cho phù hợp với yêu cầu và design của dự án của bạn.
## Tham khảo
Bài viết được tham khảo từ https://medium.freecodecamp.org/ruby-on-rails-how-to-extract-code-to-service-objects-1c73148cc715?fbclid=IwAR2fVDRHMTBaJHmadGKfa38sWowBaEKBS_7VrbQaehmkSPtLq2cOJCO1qko