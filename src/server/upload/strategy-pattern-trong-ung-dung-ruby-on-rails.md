## I. Giới thiệu
Dựa trên cuốn sánh "Design Patterns: Elements of Reusable Object-Oriented Software" của bộ tứ tác giả Erich Gamma, Richard Helm, Ralph Johnson và John Vlissides (GoF) Strategy được tổng quát như sau:
* Strategy design pattern là 1 pattern thuộc nhóm Behavioral patterns, Mục đích là định nghĩa và bao bọc các thuật toán có cùng mục đích trong những lớp có giao diện chung. Làm cho sự thay đổi thuật toán trở lên linh động và độc lập với khách hàng.
* Được biết đến với tên khác Policy
Để  hiểu hơn chúng ta cần một ví dụ thực tế về  Strategy pattern khi làm việc với một thư viện phổ biến Ruby.
![](https://images.viblo.asia/9896a88c-92de-4e10-b16c-949046b6c348.jpeg)

## II. Tổng quan ngắn gọn về Strategy Pattern

Điều thú vị về các patterns là, các mô tả trừu tượng về chúng luôn nghe có vẻ không thể hiểu được và đáng sợ. Nếu bạn muốn đi sâu hơn, hãy xem [bài viết Wikipedia tuyệt vời ](https://en.wikipedia.org/wiki/Strategy_pattern).

Tóm lại, Strategy pattern hữu ích nhất khi bạn muốn cung cấp nhiều cách xử lý yêu cầu, không có kiến thức hard-coding về các phương thức khác nhau đó vào đối tượng xử lý request.

Để có một ví dụ thực tế, chúng ta sẽ xem xét Devise, và một trong những dependencies của nó, Warden.

## III. Strategy Pattern trong gem Warden
Warden là một Ruby gem mà cung cấp authentication cho các úng dụng Rack. Nó là một dependency của Devise, Cái mà sủ dụng Warden dưới hood để  xác thực các request.

Warden cung cấp các cơ chế để xác thực một session, nhưng nó vẫn còn "bất khả tri" về cách chính xác để thực hiện xác thực; nó để nó lên đến mã máy khách. Ví dụ, Devise cung cấp một DatabaseAuthenticatable strategy cho phép phòng chống một việc luôn phải sử dụng người dùng và mật khẩu để đăng nhập, và thay vì như thế một strategy '*Rememberable*' được để xác nhận một cookie session tồn tại từ trước. 

Đây là nơi chúng ta thấy Strategy pattern làm việc; bằng cách giữ các thuật toán xác thực tách biệt với mã thực hiện xác thực, các thuật toán mới có thể được sử dụng mà không cần sửa đổi chính Warden và Warden có thể chọn *“winning” strategy* khi chạy mà *không cần biết thuật toán hoạt động như thế nào*.

Khái niệm về *multiple strategies* này có lẽ là một bước ngoặt nhỏ trên Strategy pattern cổ điển; thay vì chọn một thuật toán duy nhất trong thời gian chạy dựa trên các đặc tính của yêu cầu gửi đến, Warden lặp lại tất cả các Strategy đã chọn cho đến khi nó tìm ra một chiến lược hoạt động.

## IV. Hãy xem một chút code
Luôn rất hữu ích khi thấy các pattern này được triển khai như thế nào. Hãy đi sâu hơn vào Warden!

*Warden::Strategies::Base* cung cấp một giao diện trừu tượng chung cho tất cả các strategies kế thừa từ đó. Mỗi strategy chỉ cần thực hiện xác thực của chính nó! và Warden sẽ lo phần còn lại.

Ví dụ, đây là cái mà Devise’s DatabaseAuthenticatable strategy biểu hiện:


```ruby
module Devise
  module Strategies
    # Default strategy for signing in a user, based on their email and password in the database.
    class DatabaseAuthenticatable < Authenticatable
      def authenticate!
        resource  = password.present? && mapping.to.find_for_database_authentication(authentication_hash)
        hashed = false

        if validate(resource){ hashed = true; resource.valid_password?(password) }
          remember_me(resource)
          resource.after_database_authentication
          success!(resource)
        end

        mapping.to.new.password = password if !hashed && Devise.paranoid
        fail(:not_found_in_database) unless resource
      end
    end
  end
end
```

Ở đây, chúng ta tìm kiếm tài nguyên “*authenticatable*” (thường là người dùng) sau khi xác minh rằng mật khẩu đã được cung cấp. Sau đó, chúng ta xác nhận mật khẩu và gọi #success !, Warden định nghĩa trong lớp cha. Nếu strategy không thành công - tức là nếu mật khẩu không hợp lệ - chúng ta #fail strategy và cho phép Warden thử phương thức xác thực khác.

Điều này trông như thế nào từ quan điểm của Warden? Khi yêu cầu xác thực được kích hoạt, nó được xử lý bởi *Warden :: Proxy*.

Trong *#runstrategiesfor*, chúng ta lặp qua các strategies được thiết lập cho tài nguyên và xác định xem có bất kỳ strategy nào trong số đó sẽ cung cấp quyền truy cập hay không:
```ruby
# Run the strategies for a given scope
def _run_strategies_for(scope, args) #:nodoc:
  self.winning_strategy = @winning_strategies[scope]
  return if winning_strategy && winning_strategy.halted?

  # ...
  
  (strategies || args).each do |name|
    strategy = _fetch_strategy(name, scope)
    next unless strategy && !strategy.performed? && strategy.valid?

    strategy._run!
    self.winning_strategy = @winning_strategies[scope] = strategy
    break if strategy.halted?
  end
end
```

 Strategy pattern đi vào hoạt động trên dòng 12 ở trên; *strategy.run!* cuối cùng gọi *#authenticate!* trong strategy class.

Chúng ta có thể thấy rằng code trong *#runstrategiesfor* có liên quan đến một điều: tìm ra strategy nào đó trong các strategies tiềm năng sẽ xác thực thành công yêu cầu. Hãy tưởng tượng phương pháp này sẽ trông như thế nào nếu nó cũng chứa logic từ những strategies đó. Hãy tưởng tượng khó khăn như thế nào để thêm một cái mới!

## V. Separation of Concerns
Ở đây, Strategy pattern cung cấp một giao diện thực sự tốt đẹp giữa Warden, Devise và ứng dụng của bạn và cho phép mỗi thành phần tập trung vào một trách nhiệm duy nhất. Warden quan tâm đến chính nó với các chi tiết "đẫm máu" của các handling sessions trong Rack. Phát triển móc vào Rails để cung cấp *user flows* và các thành phần khác. Các Strategies cung cấp một giao diện plug-and-play giúp giữ những Separation of Concerns.

## VI. Kết luận
Sử dụng Strategy patter trong code của riêng bạn có thể là một cách hiệu quả để quản lý sự phức tạp. Nó bao gồm tính đa hình và cho phép code của bạn tập trung vào việc gửi tin nhắn thay vì chuyển đổi kiểu. Nó cũng nhấn mạnh sự separation of concerns;  client code của bạn không cần phải quan tâm chính nó với nội bộ của nhiều thuật toán.

## Tài liệu tham khảo
https://medium.com/rubyinside/design-patterns-in-ruby-strategy-pattern-17e2fa191d9c