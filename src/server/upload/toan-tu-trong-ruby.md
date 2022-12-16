Trong [bài viết trước](https://viblo.asia/p/3-loi-thuong-gap-trong-ung-dung-rails-va-cach-phong-tranh-gAm5yp8Dldb#_2-nomethoderror-undefined-method--for-nilnilclass-1) mình đã giới thiệu về những lỗi thường gặp trong ứng dụng Rails, trong đó có lỗi khi gọi phuơng thức không tồn tại của object `nil`. Ở bài viết này mình sẽ nói kĩ hơn về toán tử `&.` để phòng tránh lỗi trên.

## Bối cảnh

Giả sử bạn có một `account`, trong `account` có chứa thông tin của `owner` và bạn muốn lấy `address` của `owner`. Nếu bạn muốn chương trình chạy một cách an toàn và không bị lỗi `Ruby undefined method ... for nil:NilClass (NoMethodError)` thì phải viết tương tự như sau:

```ruby
if account && account.owner && account.owner.address
...
end
```

Nhìn rất dài dòng và rườm rà! `ActiveSupport` có hỗ trợ phuơng thức `try` có tác dụng tương tự trong trường hợp này

```ruby
if account.try(:owner).try(:address)
...
end
```

Với Ruby 2.3 trở lên, chúng ta có thể sử dụng toán tử `&.` để viết lại ví dụ bên trên cho gọn hơn như sau

```ruby
account&.owner&.address
```

## So sánh

Xét một vài ví dụ dưới đây

- Trong trường hợp account có owner là `nil`, không có gì quá ngạc nhiên, 3 cách xử lý trên có kết quả giống nhau

```ruby
account = Account.new(owner: nil) # account without an owner

account.owner.address
# => NoMethodError: undefined method `address' for nil:NilClass

account && account.owner && account.owner.address
# => nil

account.try(:owner).try(:address)
# => nil

account&.owner&.address
# => nil
```

- Trong trường hợp `owner` là false

```ruby
account = Account.new(owner: false)

account.owner.address
# => NoMethodError: undefined method `address' for false:FalseClass `

account && account.owner && account.owner.address
# => false

account.try(:owner).try(:address)
# => nil

account&.owner&.address
# => undefined method `address' for false:FalseClass`
```

Ta thấy rằng toán tử `&.` chỉ có tác dụng với `nil` object và hoàn toàn không có tác dụng với `false` object.

- Trong trường hợp `owner` không tồn tại method hoặc property `address`

```ruby
account = Account.new(owner: Object.new)

account.owner.address
# => NoMethodError: undefined method `address' for #<Object:0x00559996b5bde8>

account && account.owner && account.owner.address
# => NoMethodError: undefined method `address' for #<Object:0x00559996b5bde8>`

account.try(:owner).try(:address)
# => nil

account&.owner&.address
# => NoMethodError: undefined method `address' for #<Object:0x00559996b5bde8>`
```

Với ví dụ trên ta thấy rằng method `try` không hề check nếu được truyền vào có tồn tại hay không. Nếu muốn check điều này, ta có thể sử dụng `try!`

```ruby
account.try!(:owner).try!(:address)
# => NoMethodError: undefined method `address' for #<Object:0x00559996b5bde8>`
```

- Chú ý khi sử dụng toán tử `&.` với method `nil?`. 

```ruby
nil.nil?
# => true

nil&.nil?
# => nil
```

Ví dụ này mình cũng không biết giải thích thế nào =))

## Kết

Hi vọng qua bài viết nhỏ này, các bạn có thể hiểu hơn về toán tử `&.` và có thể sử dụng nó một cách thích hợp (nhớ là từ Ruby 2.3 trở lên mới có nhá, dự án cũ quá thì chưa support đâu!).