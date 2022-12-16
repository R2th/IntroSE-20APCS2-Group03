Ruby là một ngôn ngữ luôn luôn bổ sung các syntax mới để tạo thuận tiện cho các lập trình viên trong việc lập trình. Ở Ruby 2.3.0 đó là Toán tử Điều hướng An toàn (`&.`). Vậy nó là gì?<br>
## Tình huống<br>
Giả sử bạn có một user với address và trong address đó bạn muốn lấy city. Tuy nhiên vì không muốn mạo hiểm xử lí các trường hợp nil, nhiều người sẽ viết như trong Rails Tutorial như sau:<br>
```ruby
if user && user.address && user.address.city
...
end
```
Tuy nhiên cách code này rất rườm rà và khó chịu. Ngay cả công cụ linting như rubocop cũng khuyên bạn không nên code như vậy. Thực tế, ActiveSupport cũng cung cấp một method `try` để viết gọn lại với ý nghĩa tương tự(tuy có khác một vài điểm sẽ được giải thích ở sau):
```ruby
if user.try(:address).try(:city)
...
end
```
Cả hai phương pháp đều đưa ra kết quả tương tự nhau: sẽ trả về `city` hoặc `nil` nếu một trong ba giá trị trong chuỗi trên là `nil`. Thậm chí, trong một số trường hợp nếu lỡ ai đó đặt `address` là `false` thì giá trị trả về sẽ là `false`.

## Sử dụng toán tử điều hướng an toàn (&.)
Chúng ta có thể viết lại ví dụ trên bằng cách sử dụng toán tử điều hướng án toàn:
```ruby
user&.address&.city
```
Syntax nhìn có vẻ kì tuy nhiên đây cũng là cách mà rubocop khuyên dùng! Có lẽ vì nó làm cho code gọn đi rất nhiều.
## Một số ví dụ khác
Thử so sánh 3 phương pháp một cách chi tiết. Ta thấy:
```ruby
user = User.new(address: nil) #user không có address

user.address.city
# => NoMethodError: undefined method `city' for nil:NilClass

user && user.address && user.address.city
# => nil

user.try(:address).try(:city)
# => nil

user&.address&.city
# => nil
```

Mọi thứ có vẻ ổn. Tuy nhiên nếu như đã nói ở trên, nếu giá trị của `address` là `false` thì sao?
```ruby
user = User.new(address: false)

user.address.city
# => NoMethodError: undefined method `city' for false:FalselClass

user && user.address && user.address.city
# => false

user.try(:address).try(:city)
# => nil

user&.address&.city
# => undefined method `city' for false:FalseClass`
```

Như vậy toán tử `&.` chỉ bỏ qua `nil` tuy nhiên lại nhận giá trị `false`. Điều này là khá nguy hiểm trong các trường hợp các trường nhận giá trị boolean như `gender` chả hạn.

Còn nếu như address tồn tại nhưng không phản hồi đến `city` thì sao?
```ruby
user = User.new(address: Object.new)

user.address.city
# => NoMethodError: undefined method `city' for #<Object:0x00559996b5bde8>

user && user.address && user.address.city
# => NoMethodError: undefined method `city' for #<Object:0x00559996b5bde8>

user.try(:address).try(:city)
# => nil

user&.address&.city
# => NoMethodError: undefined method `city' for #<Object:0x00559996b5bde8>
```
Ngay cả `try` cũng không kiểm tra xem `user` có phản hồi với các method truyền vòa hay không. Đó là lí do tại sao chúng ta nên sử dụng strict version của `try` là `try!`:
```ruby
user.try!(:address).try!(:city)
# => NoMethodError: undefined method `city' for #<Object:0x00559996b5bde8>
```
## Lưu ý
```ruby
nil.nil?
# => true

nil&.nil?
# => nil
```
## Kết luận
Toán tử này thực sự là một bổ sung tốt cho `try`. Tuy nhiên mình không thích cả 2 phương pháp này, bởi việc nối(chain) quá nhiều method lại với nhau bằng `&.` hay `try` sẽ đi ngược lại Law of Demeter. Lúc thích hợp nhất để sử dụng có lẽ là những trường hợp tương tự ví dụ huyền thoại trong Rails Tutorials:
```ruby
if @user && @user.authenticate(params[:session][:password]
# Cách viết gọn hơn
if @user&.authenticate(params[:session][:password]
```