[Pry](https://github.com/pry/pry) là gì?

Tôi nghĩ rằng tất cả các Rails developer nên biết về Pry. Mọi người đều có quy trình làm việc riêng để debugging và developing , và [rõ ràng bạn có thể là developer giỏi mà không cần sử dụng trình gỡ lỗi thích hợp](https://tenderlovemaking.com/2016/02/05/i-am-a-puts-debuggerer.html?utm_source=rubyweekly&utm_medium=email), nhưng mọi người đều có thể tận dụng ít nhất một số lợi thế của Pry.  Ngay cả khi chỉ để làm nổi bật cú pháp, mà chính nó là một điểm cộng rất lớn: bạn có thể đọc nhanh dữ liệu liên quan dưới đây?

![](https://images.viblo.asia/d8beb62e-633c-4eef-a391-fb03b4287665.png)

Nói ngắn gọn, nó có thể thay thế cho IRB shell tiêu chuẩn của Ruby, cực kỳ mạnh mẽ và phù hợp để giúp việc develop của chúng ta dễ dàng hơn!

Bài đăng này hướng đến việc thúc đẩy những người không sử dụng Pry hãy sử dụng nó, và để thể hiện các tính năng mạnh mẽ Pry mà có thể các bạn chưa biết hết.

Tôi tình cờ thấy đoạn trích thực sự thú vị này ở đây, và tôi nghĩ nó minh họa một điều chúng ta nên luôn luôn có trong đầu: "đừng cứ liên tục hack đi, nghĩ cách hack **hiệu quả hơn**! (don’t just constantly hack away, think how to hack away **more efficiently**)

**Pry** cung cấp cho chúng ta rất nhiều tính năng nâng cao để hỗ trợ việc này, chẳng hạn như ([lấy từ documnet của Pry](https://github.com/pry/pry)):

* Duyệt mã nguồn
* Duyệt tài liệu
* Hệ thống trợ giúp trực tiếp (Live help system)
* Các phương thức mở trong trình soạn thảo (chỉnh sửa Class#method)
* Syntax highlighting
* Navigation around state (ví dụ như cd, ls, ...)
* Yêu cầu thời gian chạy

Chúng ta sẽ đi qua tất cả các nội dung trong bài viết này.

Để bắt đầu sử dụng Pry, chỉ cần đưa `gem 'pry-rails'` vào Gemfile và chạy `bundle install`! Bây giờ mỗi khi bạn khởi động `rails console`, bạn sẽ có Pry shell làm mặc định thay vì IRB tiêu chuẩn.

Chắc hẳn mọi người đều đã quen thuộc với lệnh `binding.pry`?

Nếu trình thông dịch Ruby đi qua dòng lệnh này, nó sẽ dừng thực thi và bắt đầu REPL (read-evaluate-print-loop), cho phép chúng ta nhập code Ruby, thực thi và trả về kết quả! Thật tuyệt vời!.

Nhưng nó là gì? Hãy cùng thử xem với 1 số lệnh cơ bản trong Ruby trước:

```
$ rails console
pry(main)> text = “sample string”
pry(main)> text.upcase
=> "SAMPLE STRING"
```

Chúng ta đã làm gì ở đây? Chỉ đơn giản là gọi một phương thức trên *object text* của class *String*. Nó tương tự với `binding.pry`:

```
$ rails console
pry(main)> binding
=> #<Binding:0x007fee1297a308>
pry(main)> binding.class
=> Binding
```

Chúng ta có thể thấy rằng `binding` là object của class *Binding*. Nhưng nó là gì? Có phải từ Pry? Hãy kiểm tra trong `rails console` không cần Pry:

```
$ DISABLE_PRY_RAILS=1 rails console
irb(main)> binding
=> #<Binding:0x007fb29c85c4a0>
```

Oh! thật ngạc nhiên nó vẫn có ở đây, vì vậy nó không phải từ Pry. Có phải từ Rails? Hãy khởi động IRB

```
$ irb
irb(main)> binding
=> #<Binding:0x007fce81825f30>
```

Vậy là Ruby có object `binding`? 

**Enter Pry**. Một trong những tính năng rất mạnh của nó là hệ thống lệnh, trong đó bạn có thể thực hiện các lệnh phù hợp với quy trình công việc cá nhân của riêng bạn. Nhưng mà không được đề cập ở đây.

Pry đã có một số lệnh hữu ích để duyệt mã nguồn và có một lệnh tuyệt vời mà chúng ta thực sự có thể sử dụng ngay bây giờ để trả lời câu hỏi của mình. Hãy để thử dùng `show-doc`:

```
pry(main)> show-doc binding
From: proc.c (C Method):
Owner: Kernel
Visibility: private
Signature: binding()
Number of lines: 10
Returns a Binding object, describing the variable and
method bindings at the point of call. This object can be used when
calling eval to execute the evaluated command in this
environment. See also the description of class Binding.
def get_binding(param)
  return binding
end
b = get_binding("hello")
eval("param", b)   #=> "hello"
```

Chúng ta đã sử dụng một trong các lệnh của Pry: `show-doc`. Nó sẽ hiển thị các tài liệu cho bất kỳ method nào trong quá trình thực thi!
Vì vậy, bây giờ chúng ta biết: `binding` thực sự là một đối tượng mô tả một biến và trạng thái của nó tại điểm gọi.

Vậy pry là gì? Hãylàm điều tương tự với pry, chúng ta đã đi đến kết luận đó là một object, phải không? Hãy thử với cách gọi show-doc qua `binding.pry` và xem nó có hoạt động không:

```
pry(main)> show-doc binding.pry
From: (...)/gems/pry-0.10.4/lib/pry/core_extensions.rb @ line 23:
Owner: Object
Visibility: public
Signature: pry(object=?, hash=?)
Number of lines: 18
Start a Pry REPL on self.
If `self` is a Binding then that will be used to evaluate expressions;
otherwise a new binding will be created.
param [Object] object  the object or binding to pry
                        (__deprecated__, use `object.pry`)
param [Hash] hash  the options hash
example With a binding
   binding.pry
example On any object
  "dummy".pry
example With options
  def my_method
    binding.pry :quiet => true
  end
  my_method()
@see Pry.start
```

Nó hoạt động: Trình phân tích cú pháp Pry ván hiểu rằng bạn có thể quan tâm đến việc xem tài liệu cho phương thức mà bạn gọi, chứ không phải đối tượng.

Vì vậy, bây giờ chúng ta biết `pry` thực sự chỉ là một phương thức thông thường bắt đầu một Pry REPL  trên object `binding`.

Khi nhận được `binding.pry` trên `Controller`, `Model` hoặc một số object khác, tất cả những gì chúng ta đang làm là bắt đầu REPL qua `binding`, ví dụ, một đối tượng `ApplicationController` hoặc `ActiveRecord::Base`, sẽ là `self` trong các tài liệu `pry` ở trên. Điều đó có nghĩa là `binding.pry` tương đương với `pry self.send (:binding)` (binding là một private method, vì vậy bạn cần sử dụng `send`.), Trong đó chúng ta bắt đầu một REPL trên liên kết của đối tượng `self` hiện tại.

Vì vậy, bây giờ chúng tôi hiểu ràng buộc là gì và đã học về `show-doc`!

Tôi tự hỏi nếu có bất kỳ tùy chọn nào chúng ta có thể pass `show-doc`? Chúng tôi có thể gọi `help show-doc` để kiểm tra điều này:

```
pry(main)> help show-doc
Usage:   show-doc [OPTIONS] [METH]
Aliases: ?
Show the documentation for a method or class. Tries instance methods first and
then methods by default.
show-doc hi_method # docs for hi_method
show-doc Pry       # for Pry class
show-doc Pry -a    # for all definitions of Pry class (all monkey patches)
-s, --super             Select the 'super' method. Can be repeated to traverse the ancestors
    -l, --line-numbers      Show line numbers
    -b, --base-one          Show line numbers but start numbering at 1 (useful for `amend-line` and `play` commands)
    -a, --all               Show all definitions and monkeypatches of the module/class
    -h, --help              Show this message.
```

Chúng ta có thể gọi `help` bởi chính nó, trong đó sẽ liệt kê cho tất cả các lệnh Pry có sẵn, ngay cả những lệnh bạn tự thực hiện. Nếu bạn kiểm tra nó, có thể thấy một alias  `show-doc` ở dạng`?` , cho phép chúng ta gọi đơn giản`?` `binding.pry` cho cùng một kết quả. 

Vì vậy, điều này có nghĩa là chúng ta có thể pry bất cứ điều gì? Vâng, bất kỳ đối tượng có thể được pry! Hãy thử một ví dụ sau:

```
pry(main)> our_string = "text!"
pry(main)> our_string.pry
pry("text!")>
```

Chúng ta có thể thấy rằng pry context bây giờ là string:

```
pry("some TEXT!")> self
=> "some TEXT!"
pry("some TEXT!")> upcase
=> "SOME TEXT!"
pry("some TEXT!")> lowercase
NameError: undefined local variable or method `lowercase' for "some TEXT!":String
from (pry):32:in `__pry__'
pry("some TEXT!")> ls
(...)
Colorize::InstanceMethods#methods: colorize  colorized?  uncolorize
String#methods:
%  classify    gray     mb_chars  rpartition  to_c
*  clear       grayish  next      rstrip      to_d
+  codepoints  green    next      rstrip!     to_date
(...)
pry("some TEXT!")> ls -G case
String#methods: camelcase casecmp downcase downcase! swapcase  swapcase! titlecase upcase upcase!
pry("some TEXT!")> downcase
=> "some text!"
pry("some TEXT!")> exit
=> nil
pry(main)> self
=> main
```

Chúng ta có thể thấy rằng `self` bây giờ là string của chúng ta, vì vậy bất kỳ method nào chúng ta đang gọi đều nằm trong context của cùng string đó: điều tương tự sẽ xảy ra với bất kỳ đối tượng Pry nào khác. Dường như method `lowercase` không tồn tại, vì vậy tôi đã sử dụng lệnh Pry `ls`, nó liệt kê cho khá nhiều những gì chúng tôi cần biết về một đối tượng: đó là các class method và instance method với các namespaces đã triển khai các phương thức đó, local variable và instance variable... bất cứ điều gì áp dụng cho loại object đó.
Nhưng mà quá nhiều thông tin, vì vậy tôi đã chuyển sang option `-G case` cho `ls`: cho phép đưa ra các method với `case` và nhận được kết quả nhanh hơn: `*case` methods.

Hoặc bạn có thể có một số lựa chọn khác như:

* Thay đổi trình duyệt;
* Có thể bị phân tâm bởi bất cứ điều gì;
* Tập trung lại và đi trên google;
* Tìm kiếm "Ruby lowercase string";
* Nhập stackoverflow / ruby-doc / bất cứ điều gì gần nhất và tìm ra rằng phương thức này là `downcase`.
* Quay lại thiết bị đầu cuối. 

Tất nhiên, đây là một ví dụ rất dễ hiểu, nhưng bạn hiểu ý tôi, bạn càng ít đi ra khỏi bối cảnh đang phát triển thì càng tốt, ngay cả khi bạn không dễ bị phân tâm.
Và để khởi động, bạn học được rất nhiều về Ruby bằng cách tình cờ tìm ra các phương pháp mới mà bạn không biết!
Và sau đó chúng ta `exit` string pry, đưa chúng ta trở lại Pry context thông thường.

Gọi `ls` một mình trong context đó cũng giống như gọi `ls "some TEXT!"` hoặc thậm chí `ls String` trong Pry context thông thường vì nó được gọi từ `self`.

Chúng ta có thể chuyển sang `downcase` thông qua các phương tiện khác bằng cách sử dụng lệnh `find-method`, trong đó tham số đầu tiên là string mà chúng ta đã tạo ra, và thứ hai là đối tượng:

```
pry(main)> find-method case our_string
String
String#camelcase
String#titlecase
String#casecmp
String#upcase
String#downcase
String#swapcase
String#upcase!
String#downcase!
String#swapcase!
```

Bạn đã bao giờ chú ý khi sử dụng bind.pry trong controller hoặc model chưa? Đây là những gì bạn có thể nhận được: `pry(#<PostsController>)>`, bạn chỉ Pry một object của class *PostsController*, trong khi chạy code.
    
Tiếp tục sử dụng lệnh `cd`, bạn có thể pry  vào các đối tượng, giống như `pry`. Bạn có thể sử dụng `pry` cho việc này giống như chúng tôi đã làm, nhưng sử dụng `cd` thì tốt hơn vì nó cung cấp cho chúng ta các tính năng bổ sung, như `nesting`:

```
pry(main)> our_hash = { first: [1, 2, 3], second: "text" }
=> { :first => [1, 2, 3], :second => "text" }
pry(main)> cd our_hash
pry(#<Hash>):1> self
=> { :first => [1, 2, 3], :second => "text" }
pry(#<Hash>):1> cd self[:first]
pry(#<Array>):2> self
=> [1, 2, 3]
pry(#<Array>):2> nesting
Nesting status:
--
0. main (Pry top level)
1. #<Hash>
2. #<Array>
pry(#<Array>):2> jump-to 1
pry(#<Hash>):1> self
=> { :first => [1, 2, 3], :second => "text" }
pry(#<Hash>):1> cd self[:first]
pry(#<Array>):2> nesting
Nesting status:
--
0. main (Pry top level)
1. #<Hash>
2. #<Array>
pry(#<Array>):2> cd ..
pry(#<Hash>):1> self
=> { :first => [1, 2, 3], :second => "text" }
pry(#<Hash>):1> nesting
Nesting status:
--
0. main (Pry top level)
1. #<Hash>
pry(#<Hash>):1> cd /
pry(main)>
```

Bằng cách sử dụng `cd`, bạn có thể truy cập `nesting` cho phép nhảy vào các đối tượng như thể chúng là các thư mục, bạn có thể `jump-to #` giữa `nesting levels`, `cd ..` để quay lại, `cd /` để quay lại context ban đầu hoặc thậm chí `cd` đường dẫn phức tạp cùng một lúc: `cd ../object_1/object_2`

Một lệnh hữu ích khác là `show-source`, cũng có thể truy cập thông qua alias `$`. Gọi nó qua bất kỳ method, class hoặc object nào, sẽ hiển thị định nghĩa của nó:

```
pry(main)> show-source Array
From: (...)/lib/active_support/core_ext/array/access.rb @ line 1:
Class name: Array
Number of monkeypatches: 13. Use the `-a` option to display all available monkeypatches
Number of lines: 64
class Array
  # Returns the tail of the array from +position+.
(...)
pry(main)> show-source Array#second
From: (...)/lib/active_support/core_ext/array/access.rb @ line 33:
Owner: Array
Visibility: public
Number of lines: 3
def second
  self[1]
end
```

Một option hữu ích mà bạn có thể sử dụng với `show-source` là `-a`, nó cũng sẽ liệt kê tất cả các monkeypatches mà object có thể có.

Bạn có thể tự động chỉnh sửa code từ bên trong Pry bằng `edit`, có thể được sử dụng để chỉ xem mã trong editor yêu thích của bạn hoặc thực sự chỉnh sửa code. Hãy thử với class method Array#second:

```
pry(main)> our_array = ["a", "b", "c"]
=> ["a", "b", "c"]
pry(main)> our_array.second
=> "b"
pry(main)> edit Array#second
# Here you are taken to your configured Editor (Vi by default?).
# I replaced Array#second with the following, saved and exited:
#   def second
#     "Woop!"
#   end
pry(main)> our_array.second
=> "Woop!"
pry(main)>
```

Chuyện gì đã xảy ra? Chúng ta đã chỉnh sửa tệp chứa định nghĩa method Array#second và Pry ngay lập tức tải lại mã mới được chỉnh sửa.
Nhưng hãy cẩn thận: **đây là một sự thay đổi vĩnh viễn**. Nếu bạn khởi động lại `rails console`, bạn sẽ phát hiện ra rằng Array#second vẫn trả về Woop!

Bạn có thể thêm flag `-p` vào method `edit` để sửa code hiện đang chạy, nhưng không sửa đổi file thực tế.

Điều gì sẽ xảy ra nếu bạn thích sử dụng Sublime Text hoặc một cái gì đó khác? Bạn có thể. `~/.pryrc` là một tệp đặc biệt mà Pry load mỗi khi nó khởi động (như một số loại ~ / .bashrc) và bạn có thể cấu hình **RẤT NHIỀU** chức năng với nó, cũng như thêm các phương thức và lệnh Pry của riêng bạn. Đây là nơi chúng ta nói với Pry nên sử dụng trình soạn thảo nào.

Cá nhân tôi sử dụng Sublime Text, vì vậy tôi sẽ khởi động dòng này vào tệp và lưu nó: `Pry.editor = "sublime"`
Hãy thực hiện lại lệnh `edit`, chúng ta sẽ được đưa đến Sublime! Phiên Pry sẽ mở lên cho đến khi tệp không được lưu, nhưng đã đóng. Khi nó đóng, Pry phát hiện ra tập tin đó đã thực hiện chỉnh sửa và tải lại.

Bạn cũng có thể sử dụng `hist` để liệt kê lịch sử lệnh phiên hiện tại và thậm chí grep với `-G` hoặc replay với `-r`

```
pry(main)> puts "p"
p
pry(main)> puts "r"
r
pry(main)> puts "y"
y
pry(main)> hist
1: puts "p"
2: puts "r"
3: puts "y"
pry(main)> hist -r 1..3
p
r
y
pry(main)> hist -G y
3: puts "y"
```

Bạn đã bao giờ thấy mình trong một phiên Pry trong bối cảnh ứng dụng rails đang chạy lại các dòng bạn đang dừng hoặc sao chép và dán chúng từ trình soạn thảo của bạn chưa? Hãy thử xem.

```
From: (...)/application_controller.rb @ line 7 ApplicationController#controller_method:
5: def controller_method
    6:   binding.pry
 => 7:   puts "lots of code with"
    8:   puts "nestings and loops..."
    9: end
pry(#<ApplicationController>)> play -l 7..8
lots of code with
nestings and loops...
```

Bạn cũng có thể sử dụng `show-models` hoặc `show-model`để liệt kê tất cả các thuộc tính và các mối quan hệ của chúng và cũng có thể sử dụng option `-G` để grep tên hoặc loại thuộc tính:

```
pry(main)> show-models -G text
Post
  id: integer
  content: text # This will be highlighted due to the "text" grep
  author_name: string
  belongs_to: author
pry(main)> show-models -G auth
Post
  id: integer
  content: text 
  author_name: string # Highlighted due to the "auth" grep
  belongs_to: author # Highlighted due to the "auth" grep
```

Cuối cùng nhưng không kém phần quan trọng, có `show-routes` thực hiện đúng như tên gọi của nó, và cũng lấy cờ -G để grepping.
Không cần mở một shell mới để thực hiện `rake routes | grep login` và chờ cho nó khởi động Rails chỉ để cung cấp cho chúng ta các routes!

```
pry(main)> show-routes -G login
  login GET    /login(.:format)       sessions#index
```

Đây là phần giới thiệu về Pry, và đây chỉ là phần nổi về sức mạnh của nó, nhưng những gì tôi cho là các lệnh hữu ích và hay sử dụng nhất. Bạn nên lấy gì từ điều này?

* `ls` để tìm ra các methods / variables / locals an object / context có.
* `find-method` để tìm kiếm các methods / object có tên mà bạn không nhớ.
* `show-source` để nhanh chóng xem các định nghĩa method của code mà bạn muốn hiểu rõ hơn.
* `show-doc` để xem tài liệu cho các method hoặc Object mà bạn không chắc chắn.
* `show-models` và `show-routes` để kiểm tra models và routes (chỉ dành cho Rails!).
* Hiển thị đẹp hơn lịch sử thao tác đã thực hiện trong phiên Pry và phát lại các dòng bạn muốn
* Nhảy quanh các đối tượng để kiểm tra trạng thái của chúng bằng `cd`.

Rất nhiều trong số các hàm này là các phương thức không rõ ràng và có thể cấu hình mà tôi đã tự thực hiện trên `.pryrc` của mình và được sử dụng thường xuyên. Nhưng khi tôi bắt đầu khám phá Pry, tôi nhận thấy rằng rất nhiều phương thức `.pryrc` hữu ích đã là các tính năng thực tế!

Cảm ơn các bạn đã theo dõi. Bài viết được dịch từ [nguồn](Powering your Ruby & Rails development with Pry)