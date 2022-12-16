# Lời mở đầu
Đối với những lập trình viên đang sử dụng framework Rails để phát triển ứng dụng web, có rất nhiều hàm tiện dụng mà chỉ cần nhìn tên là đã biết chức năng của nó là gì. Tuy nhiên không phải tất cả những method đó đều có sẵn trong ruby, mà thường là những hàm được tạo ra từ thư viện mà framework Rails đưa vào. Gem "active_support" là một trong những gem rails require nhằm trợ giúp cho quá trình phát triển ứng dụng của lập trình viên. Trong bài viết này chúng ta sẽ cùng tìm hiểu một số hàm thường xuyên được các lập trình viên sử dụng trong quá trình phát triển web, cũng như trong những dự án web cụ thể nào đó.
# Extension methods for Object class
Đây là những methods được `active_support` tạo ra để gọi trực tiếp trên class `Object`, có nghĩa là những hàm dưới này có thể được gọi vào hầu hết bất cứ thứ gì trong ruby, vì hầu hết các class đều inherit từ class Object này.

### `blank?` và `present?`

Thông thường, developer sẽ sử dụng `blank?` và `present?` để kiểm tra sự tồn tại của một object trong rails. Thực tế, hai method này không được hỗ trợ bởi ruby mà là do rails đã require thư viện active_support/core_ext. 
Method `blank?` trả về giá trị **true** cho những trường hợp dưới đây: 
* nil và false
* String rỗng hoặc string chỉ có các ký tự khoảng trắng
* Array rỗng, hash rỗng
* Một số loại object khác có thể gọi được method `empty?` và không có phần tử bên trong  

Điều đặc biệt ở đây là `blank?` không chỉ check string rỗng `""` mà còn kiểm tra xem một string có tồn tại kí tự thật hay chỉ bao gồm khoảng trắng. Nếu string chỉ chứa khoảng trắng thì method `blank?` cũng sẽ trả về giá trị false.
```
nil.blank? # => true
false.blank? # => true
"      ".blank? # => true
"".blank? # => true
[].blank? # => true
{}.blank? # => true
[nil].blank? # => false
```

Chú ý rằng ở trên có một ví dụ về **Array**, mảng `[nil]`. Tại sao giá trị bên trong của mảng là `nil` mà mảng này khi gọi method `blank?` vẫn trả về false? Lý do là vì mảng này có một phần tử, và chỉ cần một phần tử thì mảng đó sẽ trả về true cho method `blank?`, bất kể giá trị bên trong mảng là `nil` hay không. Tương tự đối với hash, khi một hash check `blank?` thì giá trị trả về là true chỉ khi hash đó không có cặp key-value nào, còn lại thì đều hợp pháp.

### presence

Nếu như object gọi hàm `present?` và trả về **true** thì gọi hàm presence sẽ trả về chính object đó. Nếu không thì sẽ trả về `nil`. 

```
nil.presence # => nil
"string".presence # => "string"  
```

### try

Method try sẽ cho phép object "thử" gọi đến một method nào đó (được truyên vào qua argument dưới dạng symbol). Nếu như object có respond tới mehod được đưa ra, object sẽ thực hiện gọi method đó. Nếu object mà không `respond_to?` method đó, giá trị trả về sẽ là nil 

```
"string".keys # => NoMethodError: undefined method 'keys' for "string":String
"string".try(:keys) # => nil
```

Vì nil cũng có thể  sử dụng `try`, nên trong lúc code bạn cũng có thể sử dụng nhiều lần hàm `try` để lấy ra dữ liệu cần thiết, nhất là khi xử lý association. Để gọi được một attribute của một associated record mà bạn chưa chắc record đó có tồn tại hay không, `try` sẽ trả về `nil` cho bạn thay vì báo lỗi:

```
 user = User.first
 user.posts.first.title # => NoMethodError: undefined method 'title' for nil:NilClass
 user.posts.first.try(:title) # => nil
```

### with_options

Khi liên tục gọi một methods với chung một options thì bạn có thể sử dụng hàm `with_options` để tránh lặp đi lặp lại việc khai báo options bên trong từng lần gọi hàm:

```
class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :friends, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
end
```

Có thể thấy method `has_many` của class User đang sử dụng options `dependent: :destroy` nhiều lần, vì vậy ta có th1ể đưa vào chung một block `with_options` như sau:

```
class User < ApplicationRecord
  with_options dependent: :destroy do |association|
    association.has_many :posts
    association.has_many :friends
    association.has_many :comments
    association.has_many :likes
  end
end
```

# Extension methods for String class

## Output safety
  Khi làm việc với các phần tử bên trong HTML, dev sẽ phải cân nhắc đến tính security khi đụng đến phần này. Không thể sử dụng data với những ký tự dữ liệu đặc biệt. Khi đưa những ký tự đặc biệt lên HTML mà không escape thì khả năng cao trang web của bạn sẽ bị tấn công XSS (cross-site scriptiing). Ví dụ như ký tự "&" thì trong HTML phải escape thành "&amp;". 
  Safe strings:
  Một string thông thường được active_support coi như *unsafe*. Để được chấp nhận là một safe string thì có thể sử dụng hàm html_safe của active_support như sau:
```
s = "string"
s.html_safe? # => false
s = "string".html_safe
s.html_safe? # => true
```

  Chú ý rằng hàm `html_safe` không thực hiện escape một ký tự nào bên trong string cả, mà chỉ khiến cho đoạn string đấy safe với HTML. Vì vậy bạn phải tự mình escape những ký tự bên trong đoạn string đó. 
  
```
s = "<script>...</script>.html_safe
s.html_safe? # => true
s            # => "<script>...</script>"
```

Ngoài ra, nếu bạn thực hiện nối string với một string "safe", thì string được nối vào sẽ được escape: 

```
"".html_safe + "<" # => "&lt;"
```

## Thay đổi string:

### squish
Loại bỏ toàn bỏ toàn bộ các dấu khoảng trắng thừa ở trước và sau string (cả những khoảng trắng thừa ở giữa những ký tự). Như vậy giữa mỗi ký tự trong string chỉ còn lại một khoảng trắng: 

```
" \n  foo\n\r \t bar \n".squish # => "foo bar"
```

### truncate

Đối với những string quá dài, bạn có thể giới hạn độ dài của string đó bằng hàm `truncate` và phần còn lại sẽ được thay bằng dấu ba chấm:

```
"Oh dear! Oh dear! I shall be late!".truncate(20)
 # => "Oh dear! Oh dear!..." 
```

Bạn nên sử dụng hàm này khi lấy data và hiển thị lên views trong Rails. Trong một số trường hợp, string quá dài và bạn không thể sử dụng CSS để break-word hay word-wrap, layout của bạn sẽ bị tràn. Chẳng hạn như string đó không có khoảng trắng và là một chuỗi rất dài thì sẽ không thể xuống dòng được. Khi đó `truncate` sẽ giới hạn lại số lượng kí tự để bạn có thể kiểm soát độ dài hiển thị trên trang web. 

## Thay đổi form của từ tiếng Anh
Ruby là một ngôn ngữ đặc biệt ở chỗ hầu hết các câu lệnh, toán tử đều sử dụng tiếng Anh để giúp lập trình viên dễ dàng và nhanh chóng tiếp cận với các syntax cơ bản của ngôn ngữ. Không những vậy, các methods được định nghĩa bởi ruby cũng giúp lập trình viên chỉ cần đọc tên là cũng hiểu được phần nào chức năng của nó là gì. Chính vì thế active_support cung cấp một số hàm xử lý đối với những từ tiếng Anh như sau:

### pluralize

Trả về từ dạng số nhiều của từ trong string

```
"account".pluralize # => "accounts"
"ruby".pluralize # => "rubies"
"tooth".pluralize # => "teeth"
```

### singularize

Ngược với `pluralize`, `singularize` trả về dạng số ít của một từ trong string:

```
"customers".singularize # => "customer"
"wolves".singularize # => "wolf"
```

### camelize

Thay đổi từ trong string thành dạng CamelCase (viết hoa chữ cái đầu tiên của mỗi từ, các từ được viết sát nhau):
"constant".camelize # => "Constant"
"admin user".camelize # => "AdminUser"

Method này rất hữu ích trong việc bạn muốn tạo ra một class name từ một string. Vì tất cả tên các class đều có kiểu CamelCase

Ngoài ra, camelize cũng cho phép truyền vào một arguments để chỉ định chữ cái đầu tiên của từ có viết hoa hay không:

```
  "visual_effect".camelize(:lower) # => "visualEffect"
```
 
Cách viết này thường là để sử dụng cho tên hàm trong javascript.

### classify

Cụ thể hơn camelize, chức năng của `classify` là chuyển đổi một string thành dạng class name. Có thể chuyển đổi cả những string dạng số nhiều, có underscore: 

```
  "name_errors".classify # => "NameError"
  "customer_account".classify # => "CustomerAccount"
```

### constantize

Tạo ra một constant tưowng ứng với tên constant bên trong string. Nếu như không có constant nào được khai báo thì sẽ raise lỗi *NameError*. Như vậy hàm này tốt nhất nên sử dụng sau khi đã `classify` string.

```
"Integer".constantize # => Integer
"UndefinedConstant".constantize
```

# Kết luận
Trên đây là một số method mà các lập trình viên web thường sử dụng trong quá trình làm việc. Có rất nhiều method khác, cho từng class khác nhau nhưng tính ứng dụng của chúng vào dự án thực tế là không nhiều lắm nên không được đưa vào trong đây. Hi vọng bài viết sẽ giúp ích cho các bạn trong quá trình phát triển dự án của mình. Xin cảm ơn!