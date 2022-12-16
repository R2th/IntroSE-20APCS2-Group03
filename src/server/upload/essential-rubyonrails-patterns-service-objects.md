# Design Patterns : Service Objects
Xin chào tất cả các bạn, hôm nay mình xin giới thiệu với các bạn về chủ đề như tiêu đề mình đã nhắc đến, đó là Service Object trong Ryby on Rails.

## Service object là gì?
Service Objects là một mô hình trong phát triển Ruby on Rails, nó giúp giảm tính xử lý trong models và controllers, giúp cho code trong models và controller rõ ràng và dễ đọc hơn.

## Khi nào nên sử dụng Service objects?
Đây là một pattern đơn giản và mạnh mẽ nên nó có thể trở nên dễ bị lạm dụng; nó đặc biệt hữu dụng khi chúng ta cần nơi để định nghĩa các action phức tạp, các quy trình với nhiều bước, các callbacks hoặc phải tương tác với nhiểu models. Service objects cũng thường được sử dụng để giảm thiểu các vấn đề với các model callbacks tương tác với các lớp bên ngoài.

## Làm thế nào để tận dụng tối đa Services Objects?

### 1. Sử dụng một quy ước đặt tên nhất quán
Một trong những vấn đề khó khăn trong lập trình là chỉ định những thứ đúng, tên tự giải thích. Có một cách phổ biến là đặt tên các service objects với các từ kết thúc là “or”, ví dụ: `UserCreator`, `TwitterAuthenticator`,... Đôi khi đặt tên như vậy có thể trở nên hơi lúng túng, ví dụ: `OrderCompleter`. Vì vậy, tôi tìm thấy cách đặt tên service object sau action để dễ hiểu hơn. `CreateUser`, `AuthenticateUsingTwitter`, `ObfuscateCode`, `CompleteOrder` - nó là rõ ràng những gì một service object nhất định chịu trách nhiệm. Không nên trộn lẫn nhiều quy ước đặt mà hãy sử dụng một quy ước nhất quán.

### 2. Không khởi tạo trực tiếp service object
Chúng ta thường gọi một service objest bằng việc thực thi một phương thức `call`. Hãy xem xét việc sử dụng trừu tượng dưới đây để rút ngắn ký hiệu của service object đang gọi: 
```
module Callable
  extend ActiveSupport::Concern
  class_methods do
    def call(*args)
      new(*args).call
    end
  end
end
```
Include module này sẽ cho phép bạn đơn giản hóa các ký hiệu `CreateUser.new (params).call` hoặc `CreateUser.new.call(params)` vào `CreateUser.call(params)`. Nó ngắn hơn và dễ đọc hơn. Nó để lại một tùy chọn để khởi tạo service object, điều này khá hữu ích khi chúng ta cần lấy lại trạng thái bên trong của nó.

### 3. Sử dụng một cách gọi service object nhất quán
Trong khi cá nhân tôi thích sử dụng phương thức `call`, nhưng mà cũng không có lý do nào mà không sử dụng một phương thức khác (`perform`, `run` or `execute`). Điều quan trọng là luôn luôn làm điều đó theo cùng một cách, như tên class đã thể hiện trạng thái của class là gì - không cần phải làm cho nó rõ ràng hơn nữa. Cách tiếp cận này sẽ giúp bạn giảm bớt gánh nặng khi nghĩ về tên đúng mỗi khi bạn thực hiện một service object mới và cũng sẽ rõ ràng đối với các lập trình viên khác mà không cần phải nhìn vào bên trong.

### 4. Giữ một trách nhiệm cho mỗi service object
Quy tắc này được thực thi bằng cách gắn với một cách gọi một service object. Trong khi các service objects nổi trội trong việc phối hợp nhiều actions, chúng ta phải đảm bảo rằng chỉ có một tập các actions như vậy được thực thi. Một anti-pattern ở đây có thể là để giới thiệu, ví dụ: `ManageUser` service object, sẽ chịu trách nhiệm tạo và xóa người dùng. Thứ nhất, “Quản lý” không nói nhiều; cũng không rõ cách kiểm soát action nào nên được thực hiện.

### 5. Giữ cho service objects constructors đơn giản
Đó là một ý tưởng tốt để giữ cho các constructors đơn giản trong hầu hết các class chúng tôi thực hiện. Tuy nhiên, khi gọi service bằng cách gọi class method, nó có thể hiệu quả hơn để làm cho constructor chịu trách nhiệm chỉ lưu arguments trong các biến service instance. 
```
class DeleteUser
  include Callable
  def initialize(user_id:)
    @user = User.find(user_id)
  end
  
  def call
    #…
  end
end
```

versus

```
class DeleteUser
  include Callable  
  
  def initialize(user_id:)
    @user_id = user_id
  end
  def call
    #…
  end
  private
  attr_reader :user_id
  def user
    @user ||= User.find(user_id)
  end
end
```

Chúng ta không chỉ có thể tập trung vào việc test call method chứ không phải là hàm khởi tạo, mà cũng có thể vẽ một đường rõ ràng giữa những gì có thể tồn tại trong constructor và những gì không thể.

### 6. Giữ các arguments của các call methods đơn giản
Nếu có nhiều hơn một đối số được cung cấp cho service object, có thể hợp lý khi xem xét các keywords arguments để làm cho các arguments đó toàn diện hơn. Ngay cả khi service object chỉ chấp nhận một đối số, việc sử dụng keyword argument cũng có thể làm cho nó dễ đọc hơn, ví dụ:

```
UpdateUser.call(params[:user], false)
```

versus

```
UpdateUser.call(attributes: params[:user], send_notification: false)
```

### 7. Trả lại kết quả thông qua trạng thái người đọc
Bạn sẽ hiếm khi cần truy xuất thông tin từ các service object của mình. Trong trường hợp bạn cần làm như vậy, có một vài cách bạn có thể tiếp cận vấn đề này. Một service object có thể trả về kết quả từ phương thức call của nó - ví dụ, trả về `true` sẽ cho biết thực hiện thành công, trong khi trả về `false` sẽ cho biết thất bại. Mặt khác, bạn có thể tạo ra giải pháp linh hoạt hơn nhiều khi bạn thực hiện phương thức gọi trả về chính service object, ví dụ:

```
update_user = UpdateUser.call(attributes: params[:user])
unless update_user.success?
  puts update_user.errors.inspect
end
```

Trong một số trường hợp, sẽ có hiệu quả hơn trong việc truyền đạt các case không có khả năng xảy ra bằng cách ném ra các ngoại lệ, ví dụ:

```
begin
  UpdateUser.call(attributes: params[:user])
rescue UpdateUser::UserDoesNotExistException
  puts “User does not exist!”
end
```

### 8. Tập trung vào khả năng đọc của call method
Phương thức `call` là trung tâm của service object. Đó là một bài thực hành tốt để tập trung vào việc làm cho nó dễ đọc nhất có thể - tốt nhất là chỉ bằng cách mô tả các bước liên quan và giảm logic ở mức tối thiểu. Như một option, chúng ta cũng có thể kiểm soát luồng của các bước cụ thể bằng cách sử dụng `and` và `or`, ví dụ:

```
class DeleteUser
  #…
  def call
    delete_user_comments
    delete_user and 
      send_user_deletion_notification
  end
private
  #…
end
```


### 9.Consider wrapping call methods in transactions
Đôi khi nhiều bước liên quan đến việc thực hiện trách nhiệm của một service object, có thể là một ý tưởng hay bao gồm các bước trong một transaction, để nếu bất kỳ bước nào không thành công, chúng ta luôn có thể khôi phục các thay đổi được thực hiện trong các bước trước.

### 10. Nhóm các service objects vào namespaces
Sớm hay muộn chúng tôi sẽ kết thúc với hàng chục service object. Cách thực hành tốt là nhóm các service objects phổ biến vào các namespaces. Những namespaces này có thể nhóm các service object bằng các external services, các tính năng cấp cao mà chúng ta có thể nghĩ đến. Tuy nhiên, chúng ta cần lưu ý rằng mục tiêu chính là giữ cho tên service object và vị trí dễ dàng và dễ đọc.

## Summary
Một service object là một design pattern đơn giản và mạnh mẽ, dễ kiểm tra. Sự dễ dàng thực hiện nó cũng là một mối đe dọa để giữ cho việc thực hiện nó được kiểm soát. Sử dụng quy ước ngắn gọn khi đặt tên các service object, gọi và nhận kết quả của chúng một cách nhất quán theo cách tương tự cũng như giữ cho các lớp service object đơn giản và dễ đọc sẽ đảm bảo rằng codebase của bạn sẽ được hưởng lợi từ pattern này.
Bài này mình tham khảo tại: https://medium.com/selleo/essential-rubyonrails-patterns-part-1-service-objects-1af9f9573ca1