Như các bạn đã biết Rails đi theo khuôn mẫu  `Model-View-Controller` và các nguyên tắc chung của MVC trong rails như sau:
- **Model**: Không cho phép model trở nên quá cồng kềnh
- **Views**: Không được đưa các logic phức tạp, hoặc các query vào Views
- **Controller**: Càng ít code càng tốt
Vậy khi hệ thống quá lớn, chúng ta sẽ cần sử dụng nhiều query nhiều action, vậy chúng ta sẽ phải làm gì để đáp ứng được các nguyên tắc của mô hình MVC trong rails, đó là lúc phải cần đến `Service Object`.
## 1. Giới thiệu về Service Object
Như các bạn cũng đã tìm hiểu về `Object-Oriented Design` thì Service Object sinh ra để phục vụ cho mục đích của OOD. Nó có thể là 1 class hoặc một module để thực hiện một action nào đó, nó cũng có thể là nơi chứa các logic phức tạp hỗ trợ cho việc MVC quá cồng kềnh. Trước khi biết về Service Object thì tất cả các xử lí mình đều để hết trong controller, tuy nhiên sau khi làm dự án thực tế thì điều quan trọng nhất là không được để controller quá nhiều code, controller chỉ có mục đích là nơi điều hướng các trang, việc xử lí logic phải đưa vào model vì thường khi viết rspec chúng ta rất ít khi viết rspec cho controller mà chủ yếu viết model là chính. Tuy nhiên nếu đem hết logic vào model thì lúc này model lại quá cồng kềnh, dưới đây là đoạn code nhỏ khi mình chưa biết áp dụng đến Service Object.
```
class SuggestionController < ApplicationController
def create
    @topic_name = params[:topic_name]
    @suggestion_text = params[:suggestion_text]
    @suggestion = Suggestion.new(topic: Topic.first(name: @topic_name), text: @suggestion_text)
    if @suggestion.save
      flash.notice = 'Suggestion added!'
      render @suggestion
    else
      flash.alert = create_fail_error_message(@suggestion)
      redirect_to :new
    end
  end
end
```
Như các bạn thấy đoạn code trên khá là dài đúng không trong khi nghiệp vụ của nó chỉ là create một `suggestion`, nếu khi method create này sau khi tạo thành công `suggestion` còn phải thực thi nhiều action khác, như vậy controller của chúng ta sẽ rất rối răm. Vì vậy để áp dụng Service Object vào thì chúng ta làm như sau:
- Tạo 1 thư mục services với đường dẫn `app/services`
- Tạo file Service Object, như ví dụ trên sẽ là `suggestion_service.rb`
- Đưa các đoạn code xử lí vào service, ngoài controller chỉ thực thi việc điều hướng

## 2. Tạo Service Object là một class
```
class SuggestionService
    def initialize params
      @topic_name = params[:topic_name]
      @suggestion_text = params[:suggestion_text]
    end
    
    def call
      topic = Topic.find_by(name: @topic_name)
      Suggestion.new(topic: topic, text: @suggestion_text)
    end
end
```

Và lúc này ở controller sẽ như sau:

```
class SuggestionController < ApplicationController
def create
    @suggestion = SuggestionService.new(params).call
    if @suggestion.save
      flash.notice = 'Suggestion added!'
      render @suggestion
    else
      flash.alert = create_fail_error_message(@suggestion)
      redirect_to :new
    end
  end
end
```

Các bạn đã thấy code controller ngắn gọn hơn chưa, nó bây giờ chỉ thực thi việc điều hướng khi thành công và thất bại, ở đoạn code trên có method `create_fail_error_message(@suggestion)`, method này được tất cả controller dùng đến khi 1 thực thi bị raise ra lỗi, vì vậy để các controller đều dùng được chúng ta sẽ đưa hàm này vào `ApplicationController` nhé.

## 3. Tạo Service Object là một module
Cũng tương tự với class, chúng ta tạo 1 module và đưa tất cả các code vào module này
```
module SuggestionService
  class << self
    def create(params)
      topic_name = params[:topic_name]
      suggestion_text = params[:suggestion_text]
      topic = Topic.find_by(name: topic_name)
      Suggestion.new(topic: topic, text: suggestion_text)
    end
  end
end
```

và ở trong controller sẽ như sau:

```
class SuggestionController < ApplicationController
def create
    @suggestion = SuggestionService.create(params)
    if @suggestion.save
      flash.notice = 'Suggestion added!'
      render @suggestion
    else
      flash.alert = create_fail_error_message(@suggestion)
      redirect_to :new
    end
  end
end
```

Vậy là xong phần Service Object, mình sẽ đi ngoài lề một tí. Giờ giả sử khi tạo thành công suggestion bạn phải sẽ tiếp tục tạo Topic, nếu 1 trong 2 bị lỗi sẽ Rollback và quăng ra exception. Mình thấy đa số khi sử dụng service sử dụng về kiểu vừa rồi rất là nhiều, như các bạn đã biết để thực thi được công việc trên, ta phải đưa tất cả các action vào trong 1 `transaction`, mình xử lí như sau

`app/services/suggestion_service.rb`
```
class SuggestionService
    def initialize params, suggestion
      @topic_name = params[:topic_name]
      @suggestion_text = params[:suggestion_text]
    end
    
    def create
      topic = Topic.find_by(name: @topic_name)
      Suggestion.create(topic: topic, text: @suggestion_text)
      Topic.create(name: "new topic")
    end
end
```

và ở `suggestion_controller.rb`
```
class SuggestionController < ApplicationController
def create
    begin
        ActiveRecord::Base.transaction do
          @suggestion = SuggestionService.new(params).create
          flash.notice = 'Suggestion added!'
          render @suggestion
        end
    rescue => e
      flash.alert = e.message
      redirect_to :new
    end
  end
end
```

Như vậy mình đã giới thiệu sơ qua về Service Object có thắc mắc gì các bạn để comment bên dưới nhé
## Tham khảo
- https://medium.freecodecamp.org/service-objects-explained-simply-for-ruby-on-rails-5-a8cc42a5441f