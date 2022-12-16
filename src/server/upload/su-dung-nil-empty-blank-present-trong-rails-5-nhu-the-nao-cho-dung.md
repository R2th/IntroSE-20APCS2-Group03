![](https://images.viblo.asia/e33d01df-63ae-4ad3-92cb-d244782088e4.jpeg)

Các phương thức của Ruby có vẻ khá đáng ngại đối với một lập trình viên mới và biết khi nào nên sử dụng cái nào có thể cảm thấy giống như một lỗ đen khổng lồ. Tôi muốn kết hợp một cheatsheet  nhanh và hướng dẫn sử dụng một số phương pháp phổ biến nhất trong Ruby và Rails `.nil? .empty? .blank? and .present?`

![](https://images.viblo.asia/2f7af743-fe19-430b-ab05-2f019d3892c2.png)

# 1. .nil? [RUBY]
Hãy nhớ ngày đầu tiên học Ruby khi bạn được thông báo rằng hầu hết mọi thứ đều là một đối tượng? Vâng, `nil` cũng là class của nó. Nếu kiểm tra `.nil?` sẽ chỉ trả về `true` nếu đối tượng là `nil`. Điều đó có nghĩa là một chuỗi rỗng KHÔNG phải là `nil` và một mảng trống là KHÔNG phải `nil`.

```
nil.class
=> NilClass
nil.nil? 
=> true 
"".nil? 
=> false
false.nil? 
=> false
[].nil? 
=> false
```

Để biết thêm thông tin về `.nil` và `NilClass`, hãy xem bài viết hướng dẫn Ruby tại [link](https://www.rubyguides.com/2018/01/ruby-nil/) này!

# 2. .empty? [RUBY]
`.empty` có nghĩa là đối tượng độ dài mà bạn đang cố gắng đánh giá == 0. Nó chủ yếu được sử dụng cho `hashs, strings` và `array`.

```
nil.empty? 
NoMethodError: undefined method `empty?' for nil:NilClass
false.empty? 
NoMethodError: undefined method `empty?' for false:FalseClass
"".empty? 
=> true
" ".empty? 
=> false
[].empty? 
=> true
[ ].empty? 
=> true
```

# 3. .blank? [RAILS]
`.blank?` là một method của Rails và giải quyết vấn đề về lỗi xấu mà bạn gặp phải khi kiểm tra nếu một cái gì đó trống rỗng. Đây là một phương thức ActiveRecord tồn tại cho bất kỳ đối tượng Rails nào và sẽ trả về `true` cho `nil`, `false`, `empty` hoặc `chuỗi khoảng trắng`.

```
nil.blank?
=> true
false.blank?
=> true
 
"".blank? 
=> true 
" ".blank? 
=> true (different from .empty?)
[].blank? 
=> true
{}.blank?
=> true
```

# 4. .present? [RAILS]
Ngoài ra, một method của Rails, `.present?` ngược lại với` .blank?`
Nói cách khác : `!object.blank? == object.present?`

# Tham khảo
https://medium.com/le-wagon/how-to-use-nil-blank-present-exists-in-rails-5-fe03e78ab979