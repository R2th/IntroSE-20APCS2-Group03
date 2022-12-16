![](https://images.viblo.asia/57ac01ea-e5d0-4666-b9bd-0bdbcfb946ef.jpg)
# Giới thiệu Rails ActiveSupport

Sau khi cài Rails, bạn sẽ thấy một số thư viện sau được cài kèm theo (kiểm tra bằng lệnh gem list):

* actionmailer
* actionpack
* actionview
* activejob
* activemodel
* activerecord
* activesupport
**ActiveSupport** ( gọi tắt là AS) là gì?

Theo quảng cáo:
> 
> Active Support is the Ruby on Rails component responsible for providing Ruby language extensions, utilities, and other transversal stuff.
> 
> It offers a richer bottom-line at the language level, targeted both at the development of Rails applications, and at the development of Ruby on Rails itself.

Có nghĩa AS là tập hợp các hàm tiện ích được Rails nhúng thẳng vào lớp của thư viện chuẩn của Ruby (như Array, String, Hash). Nhờ tính năng reopen của Ruby, việc nhúng này rất dễ dàng, mang lại cảm giác các hàm này có sẵn trong bản thân ngôn ngữ (vì thư viện chuẩn của ngôn ngữ nào cũng được coi là một phần của ngôn ngữ ấy).

Các tiện ích trong AS quá hay, đến nỗi nhiều người cứ tưởng các chúng là tính năng của Ruby, góp phần tạo nên triệu chứng biết Rails mà không biết Ruby!

Bạn nên lục lọi tài liệu của AS : http://guides.rubyonrails.org/active_support_core_extensions.html , sẽ tìm thấy rất nhiều thứ thú vị. Để dùng các hàm này trong chương trình Ruby bình thường (không phải là Rails), chỉ cần require 'activesupport' một cách tường minh.

# Ví dụ về một số hàm tiện ích
Dưới đây là vài ví dụ nhằm tạo hưng phấn để bạn có hứng lục lọi tài liệu ở trên. Để thử nghiệm các đoạn mã ví dụ, nên dùng irb, nhớ require 'activesupport' trước.

## Support thư viện về string, array
Một vài thư viện được liệt kê ra sau đây:
* at (String)
* from and to (String)  [ tương tự slice (Array) ]
* first and last (String)
* each_char (String)
* starts_with? and ends_with? (String)
* to_time and to_date (String)
* transformations! (String) ví dụ chuyển danh từ sang số nhiều, số ít (String)

```
"post".pluralize             # => "posts"
"octopus".pluralize          # => "octopi"
"sheep".pluralize            # => "sheep"
"words".pluralize            # => "words"
"the blue mailman".pluralize # => "the blue mailmen"
```
* to_sentence (Array)
```
%w[a b c].to_sentence                            # => "a, b, and c"
%w[a b c].to_sentence(:connector => '&')         # => "a, b, & c"
%w[a b c].to_sentence(:skip_last_comma => true)  # => "a, b and c"
```

* to_param (Array)
* to_s (Array)
* to_xml (Array)
* in_groups_of (Array)
```
>> %w[1 2 3 4 5 6 7].in_groups_of(3) { |g| p g }
["1", "2", "3"]
["4", "5", "6"]
["7", nil, nil]
```

* split (Array)
```
>> %w[Tom Jerry and Mickey and Pluto].split('and')
=> [["Tom", "Jerry"], ["Mickey"], ["Pluto"]]  
>> %w[Chris Mark Adam Tommy Martin Oliver].split { |name| name.first == 'M' }
=> [["Chris"], ["Adam", "Tommy"], ["Oliver"]]
```

## Support thư viện về Numeric, Day
* bytes (Numeric)
```
>> 100.bytes
=> 100
>> 5.kilobytes
=> 5120
>> 10.megabytes
=> 10485760
```

* days/ months/ years/ ... (Numeric)
>> 2.months
```
=> 5184000
>> 17.years
=> 536479200
>> 2.days.ago
=> Sat Dec 16 00:34:49 -0800 2006
>> 2.days.ago(Time.now - 3.days)
=> Wed Dec 13 00:34:55 -0800 2006
>> 4.weeks.since("1985-03-13".to_time)
=> Wed Apr 10 00:00:00 UTC 1985 
```
## blank? (Object)
```
>> 0.blank?
=> false
>> " ".blank?
=> true
>> [].blank?
=> true
>> {}.blank?
=> true
>> nil.blank?
=> true 
```
Ứng dụng:
```
# Thay vì viết (hay gặp trong view)
if !address.nil? && !address.empty?
# Viết ngắn được thành
if !address.blank?
```

## attr_accessor_with_default
```
class Homework
  # Đỡ phải viết initialize
  attr_accessor_with_default :sucks, true 
end

assignment = Homework.new
assignment.sucks  # => true
```

## cattr*, mattr*, class_inheritable_accessor
Chắc bạn đã quen với attr_accessor của Ruby. AS cung cấp thêm cattr_accessor để khai báo accessor cho lớp. cattr_accessor tạo ra một biến chung cho tất cả lớp cùng cây thừa kế, còn class_inheritable_accessor tạo biến riêng cho từng lớp.

```
class P1
  cattr_accessor :val
end

class C1 < P1
end

P1.val      # => nil
C1.val      # => nil
P1.val = 8
C1.val      # => 8

class P2
  class_inheritable_accessor :val
end

class C2 < P2
end

P2.val      # => nil
C2.val      # => nil
P2.val = 8
C2.val      # => nil
```

## returning (Object)
Giúp code sáng sủa hơn vì làm rõ giá trị trả về là gì. 2 đoạn code sau, cái sau sáng sủa hơn vì cho biết hàm sẽ trả về cái gì.

```
def change_state(object_id, new_state)
  object = find(object_id)
  object.state = new_state
  object.save
  object
end

def change_state(object_id, new_state)
  returning find(object_id) do |object|
    object.state = new_state
    object.save
  end
end
```
Với returning, ban đầu ta khởi tạo đối tượng sẽ trả về, rồi sửa (modify) dần dần nó cho đến khi được cái ưng ý.

* Còn nhiều hàm tiện ích khác mà mình chưa thể kể hết được trong bài viết, mọi người có thể tham khảo thêm trong [doc](http://guides.rubyonrails.org/active_support_core_extensions.html) của Rails để tránh nhầm lẫn giữa hàm của Ruby và Rails nhé.