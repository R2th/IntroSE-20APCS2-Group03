Trong thực tế, các ứng dụng thường sẽ yêu cầu chúng ta phải xử lý một số trường hợp đặc biệt như các ngoại lệ (exception), hay các trường hợp biến (variable) có giá trị là null. Cách xử lý dễ dàng nhất là bao chúng lại bằng các điều kiện để đảm bảo chương trình chạy đúng.

Tuy nhiên thì đời không như là mơ :cry: , một khi có khả năng xảy ra thì các trường hợp đó thường lặp lại nhiều, dẫn đến code cũng bị lặp khắp nơi.

Ví dụ như một ứng dụng web cần phải hiển thị tương ứng với trạng thái của người dùng có đăng nhập hay không, nhưng trong phần hiển thị đấy lại bao gồm nhiều phần nhỏ như text, các item liên kết với user hay các nút điều hướng cũng sẽ hoạt động khác nhau.

Vậy làm cách nào để xử lý vấn đề này? Chúng ta sẽ tận dụng tính chất đa hình của OOP, đại diện trường hợp đặc biệt bằng một object độc nhất, từ đó loại bỏ được hàng tá code lặp.

Để dễ hình dung hơn, chúng ta sẽ xét lại ví dụ trên, một ứng dụng web nhiều người dùng và xử lý khác nhau với người dùng ẩn danh và người dùng đăng nhập

## Ví dụ ban đầu
Khi một người tương tác với ứng dụng, trạng thái đăng nhập thường được đại diện bởi "session" object. Ví dụ, đây là một cách xây dựng điển hình của phương thức `#current_user` trong một ứng dụng Ruby on Rails:
```ruby
 def current_user
    if session[:user_id]
        User.find(session[:user_id])
    end
end
```
Công việc của đoạn code trên là tìm kiếm session hiện tại bằng key `:user_id` (thường được lưu trong cookie của trình duyệt người dùng) . Nếu tìm thấy, giá trị của key này được sử dụng để tìm kiếm thông tin người dùng trong database và khởi tạo một `User` object tương ứng. Ngược lại thì phương thức trả về `nil` - chính là trường hợp đặc biệt mà chúng ta cần xử lý

Bây giờ chúng ta sẽ sử dụng `#current_user`, thường thì sẽ lá kiểm tra `nil` trước khi chính thức gọi tới phương thức này. Ví dụ 
```ruby
def greeting
    "Hello, " + current_user ? current_user.name : "Anonymous: + ", how are you today?"
end
```

Một case khác đó là việc hiển thị nút điều hướng dựa vào trạng thái của người dùng
```ruby
if current_user
    render_logout_button
else
    render_login_button
end
```
Hay một số chức năng cần người dùng phải có quyền đặc biệt như admin.
```ruby
if current_user && current_user.has_role?(:admin)
    render_admin_panel
end
```
Giả sử cần hiển thị danh sách gì đó dựa trên người dùng, ta có được ví dụ như thế này:
```ruby
if current_user
    @listings = current_user.visible_listings
else
    @listings = Listing.publicly_visible
end
# ...
```

Thậm chí ứng dụng có thể cần thay đổi thuộc tính của người dùng hiện tại:
```ruby
if current_user
    current_user.last_seen_online = Time.now
end
```

Giỏ hàng cũng là một chức năng không thể thiếu:
```ruby
cart = if current_user
                 current_user.cart
               else
                 SessionCart.new(session)
               end
cart.add_item(some_item, 1)
```

Tất cả những ví dụ trên đều có một điểm chung, đó là không chắc chắn rằng `#current_user` sẽ trả về User object, hay là nil. Kết quả là việc kiểm tra nil bị lặp lại hết lần này đến lần khác :cry: .

## Cùng refactor nào
Thay vì thể hiện một người dùng ẩn danh bằng giá trị nil, hãy viết một class đại diện cho trường hợp này, gọi nó là GuestUser.
```ruby
class GuestUser
    def initialize(session)
        @session = session
    end
end
```

Chúng ta xây dựng phương thức `#current_user`  để trả về một instance của class này khi không có `:user_id` tương ứng nào trong `session` tồn tại. Phương thức này cũng chính là hạt nhân của trong việc refactor.

```ruby
def current_user
    if session[:user_id]
        User.find(session[:user_id])
    else
        GuestUser.new(session)
    end
end
```

Công việc tiếp theo là xây dựng các phương thức cho `GuestUser` tương ứng với `User`, đầu tiền là phương thức `#name`
```ruby
class GuestUser
#...
    def name
        "Anonymous"
    end
end
```

Bây giờ chúng ta rút gọn được phương thức `#greeting`
```ruby
def greeting
    "Hello, #{current_user.name}, how are you today?"
end
```

Cho trường hợp render nút "Login" hay "Log out", chúng ta không thể loại bỏ được điều kiện, bởi viết code xử lý render vào các model object có vẻ hơi sai nguyên tắc. Vậy nên chúng ta sẽ thêm phương thức `#authenticated?` vào cả User và GuestUser

```ruby
class User
    def authenticated?
        true
    end
    #...
end

class GuestUser
    def authenticated?
        false
    end
    #...
end
```

Khi đó ta được:

```ruby
if current_user.authenticated?
    render_logout_button
else
    render_login_button
end
```

Code không gọn đi nhưng mà được cái tường minh hơn :smile: . Tiếp đến là kiểm tra xem liệu user có quyền admin hay không. Hãy thêm phương thức `#has_role?` vào GuestUser. Vì người dùng không đăng nhập chắc chắn không có quyền gì đặc biệt nên cho trả về false luôn.
```ruby
class GuestUser
    #...
    def has_role?(role)
        false
    end
end
```

Điều này giúp đơn giản hóa các đoạn code check quyền.
```ruby
if current_user.has_role?(:admin)
    render_admin_panel
end
```

Tương tự với phương thức `#visible_listing` trong GuestUser

```ruby
class GuestUser
    # ...
    def visible_listings
        Listing.publicly_visible
    end
end
```

Khi đó các đoạn code lấy dữ liệu liên kết với người dùng chỉ còn 1 dòng:
```ruby
@listings = current_user.visible_listings
```

Một nhược điểm là chúng ta phải xây dựng một số phương thức không có ý nghĩa gì cả để chương trình có thể coi `GuestUser` giống như các user khác
```ruby
class GuestUser
    #...
    def last_seen_online=(time)
        # NOOP
    end
end
```

Tuy nhiên nó giúp ta loại bỏ được việc lặp code rất nhiều
```ruby
current_user.last_seen_oneline = Time.now
```

Cuối cùng là giỏ hàng huyền thoại.
```ruby
class GuestUser
    # ...
    def cart
        SessionCart.new(@session)
    end
end
```

Cũng chỉ còn 1 dòng! Không phải kiểm tra điều kiện gì hết cả.
```ruby
current_user.cart.add_item(some_item, 1)
```

Tưởng tượng mỗi đoạn code trên xuất hiện ở một vài chỗ thì tổng lượng code lặp cũng là rất đáng kể, chẳng may có thay đổi spec của trường hợp người dùng ẩn danh thì phải mò cả source code tìm cái đoạn `if current_user` thì nghĩ cũng thấy mệt. Các logic nghiệp vụ bây giờ được gói gọn trong một model, hợp lý hơn rất nhiều :sunglasses: . 

Kết quả cuối cùng của class GuestUser:
```ruby
class GuestUser
    def initialize(session)
        @session = session
    end
    
    def name
        "Anonymous"
    end
    
    def authenticated?
        false
    end
    
    def has_role?(role)
        false
    end
    
    def visible_listings
        Listing.publicly_visible
    end
    
    def last_seen_online=(time)
        # NOOP
    end
    
    def cart
        SessionCart.new(@session)
    end
end
```

## Kết luận
Vậy là chúng ta đã xây dựng một `Special Case object`  để dại diện cho các người dùng không đăng nhập. Nguyên lý chính là xây dựng những phương thức trong object này tương ứng với những phương thức trong object cơ bản (ở ví dụ của chúng ta là `User` model). 

Thật ra thì việc người dùng không đăng nhập không có nghĩa là không có người dùng nào cả,  mà là một dạng đặc biệt, có thể hiểu là người dùng ẩn danh. Nên với việc áp dụng design mới này xét trên phương diện logic cũng có vẻ khớp với thực tế hơn :thinking:.

Theo cảm nhận bản thân thì mình thấy đây là một cách refactor rất hay, code bớt lặp và đẹp hơn nhiều mà logic được gói gọn trong một object. Nhược điểm duy nhất của nó là phải làm sao cho đồng bộ `Specical Case object` này với object chính của ứng dụng. Hi vọng bài viết này giúp ích được cho các bạn ^^.

## Tài liệu tham khảo
https://www.confidentruby.com/