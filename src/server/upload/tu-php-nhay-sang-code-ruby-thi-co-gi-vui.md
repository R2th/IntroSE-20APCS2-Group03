![](https://images.viblo.asia/ccd3facc-d026-48f0-9e87-4d12fd4b753e.png)

# Mở đầu
Chào các bạn, đến hẹn lại lên hôm nay mình sẽ chia sẻ về một chủ đề mình cho rằng khá là thú vị dựa trên những trải nghiệm thực tế của bản thân khi chuyển sang học một ngôn ngữ mới. Nói một chút về cơ duyên này: Mình - 1 thằng coder PHP chính hiệu bỗng một ngày đẹp trời nhận được một lời đề nghị học và làm việc với Ruby. Trên tinh thần học hỏi khám phá mình nhận lời ngay và chẳng một chút ngại ngần gì.  Và mình đến với Ruby từ đó. Chuyển hẳn chỗ ngồi lên tầng 18, tham dự 1 dự án hoàn toàn mới và mọi thứ bắt đầu từ đây....  Mình đã tiếp cận Ruby như thế nào và học Ruby on rails một cách nhanh nhất ra sao để làm dự án mới  - tất cả sẽ được tiết lộ trong phần tiếp theo.... (lol) (Mồi chài tí cho nó ra vẻ hấp dẫn... :smiley:) Bắt đầu nhé...

# Tiếp cận Ruby
Mình là dev từ PHP chuyển sang nên cách tiếp cận Ruby của mình là đi từ PHP. Đến với Ruby bằng PHP có nghĩa là mình sẽ đặt 2 ngôn ngữ lên bàn cân để so sánh, với những gì có trong PHP mình sẽ tìm nó ở trong Ruby hoặc một cái gì đó tương tự như thế ở trong Ruby. Đầu tiên ta sẽ nói về những điểm tương đồng. So với PHP thì Ruby:
* Cũng khai báo biến kiểu động, tức là bạn không cần định nghĩa biến đó thuộc Integer, String hay Array mà đơn giản chỉ cần đặt tên biến là xong
* Có các Class và các Access modifiers giống như PHP: `public`, `protected`, `private`
* Cũng có biến bắt đầu bằng `$` nhưng không phải là tất cả
* Cũng có[ `eval`](http://php.net/manual/en/function.eval.php) như trong PHP
* Bạn cũng có thể sử dụng chuỗi nội suy như trong PHP: `"$foo is a $bar"` => trong Ruby: `"#{foo} is a #{bar}"` và đều phải nằm trong dấu nháy kép `"`
* Ruby cũng có các ngoại lệ như PHP
* PHP hay Ruby đều có 1 hệ thống thư viện rất phong phú. PHP dùng Composer để quản lý package, còn trong Ruby là Gem
* Mảng 1 chiều giống như PHP còn Hashes thì giống như Mảng 2 chiều  vậy. `['a' => 'b']` sẽ thành `{'a' => 'b'}`
* `true` và `false` giống như PHP, còn `null` trong PHP thì Ruby là `nil`
* Ngoài ra PHP và Ruby đều là những ngôn ngữ lập trình web phổ biến nên đi theo đó là một cộng đồng hỗ trợ cực lớn. Gặp vấn đề gì bạn sẽ không phải lo vì đã có rất nhiều anh em sẵn sàng hỗ trợ bạn.

Và bây giờ là những điểm khác biệt:
* Ruby và PHP đều là ngôn ngữ lập trình hướng đối tượng tuy nhiên với Ruby thì mọi thứ đều là đối tượng. Bạn có thể gọi `[1,2,3].max` thay vì `max([1,2,3])`
* Syntax trong Ruby rất linh hoạt, bạn không cần dấu `;` ở cuối mỗi dòng code. Khi gọi 1 hàm bạn có thể để dấu ngoặc đơn hoặc không. Mới tiếp xúc với Ruby mình cứ cảm giác như Ruby gần với ngôn ngữ tự nhiên vậy. Ví dụ sẽ có những cú pháp sau `a = 5 if (condition)` hoặc `a = 0 unless (condition)`
* Ánh xạ là khả năng vốn có của đối tượng, bạn không cần lớp `Reflection` như trong PHP 5
* Các biến đều có thể tham chiếu
* Không có lớp `abstract` hay `interface`
* Hashes và mảng không thể chuyển đổi qua lại cho nhau
* Chỉ có `false` và `nil` là `false`. `0, array(), ""` đều là `true` trong các câu điều kiện: Cái này lúc khi sang Ruby mình rất hay nhầm lẫn bởi thói quen hay viết biểu thức điều kiện trong PHP nhưng khi tìm hiểu thì đây rõ là 1 điểm cần lưu ý khi chuyển từ code PHP sang. :D
* Hàm trong Ruby ta không cần `return`  mà mặc định biến cuối cùng của hàm chính là thứ được trả về của hàm đó. :v 
* Trong PHP biến chỉ có 1 dạng là `$biến` nhưng trong Ruby phân biệt đến 4 loại biến như sau:
    * `variable` Biến cục bộ: giá trị phụ thuộc vào vị trí của biến khi khai báo 
    * `$variable` Biến toàn cục: cái tên nói lên tất cả :D
    * `@variable` Biến đối tượng: Từ php sang thì đây là 1 điểm khác biệt lớn. Biến nằm trong phạm vi của 1 đối tượng riêng lẻ hoặc đối tượng của 1 lớp
    * `@@variable` Biến lớp: Biến được dùng chung cho mọi đối tượng của lớp đó.

Một số so sánh về syntax của PHP và Ruby:


| Type | PHP | Ruby |
| -------- | -------- | -------- |
| Function     | <pre> function method() { <br> //code... <br> }  </pre>   | <pre> def method <br> #code... <br> end  </pre>   |
| For loop | <pre> for (\$i = 0; \$i < 5; \$i ++) { <br>   echo \$i; <br> } </pre> |<pre> for i in 0..5 <br>   puts "Value of local variable is #{i}" <br> end</pre>|
|For each|<pre> foreach (range(0,5) as \$key => \$value) { <br>  echo \$value; <br> } </pre>| <pre> (0..5).each do \|i\| <br>   puts i <br> end  </pre>|
|Comments|Line comments: `// comment here` <br> Block comment: <br> <pre> /** <br>   content <br> **/ </pre>|Line comments: `# comment here` <br> Block comment: <br> <pre> =begin <br>   content <br> =end </pre>|
|if else |<pre> if (condition) { <br> ... <br>} elseif (condition) { <br> ... <br> } else { <br> ... <br> } </pre>|<pre> if condition <br> ... <br> elsif condition <br> ... <br> else <br> ... <br> end</pre>|

Phía trên là một vài so sánh cơ bản về cú pháp khi viết code của PHP và Ruby. Nhìn vào ta thấy rằng code Ruby trông rất gọn gàng và không rườm rà như PHP. Các cú pháp khá là dễ học, mình chỉ mất một chút ít thời gian là đã quen với tất cả. 
Bây giờ sau khi đã học được cú pháp rồi ta sẽ học luôn cách để viết code một cách đúng chuẩn mà ta hay gọi là `Coding convention`. Tất cả đều có trên [Framgia Coding Standards](https://github.com/framgia/coding-standards). Sau khi học xong bộ này mình đã sẵn sàng để bước vào code với Ruby.

Đấy là về ngôn ngữ lập trình. Như vậy chưa đủ để làm việc giờ mình phải học thêm về Framework MVC nữa. Ở PHP mình code với Laravel thì bên Ruby cái mình cần phải mài dùi kinh sử tiếp theo chính là `Ruby on rails`. Tiếp tục thôi... (go)

# Tiếp cận Ruby On Rails
![](https://images.viblo.asia/ab3abfa2-4ade-4329-81b3-1029f6fb3aa1.png)


Cũng như cách mình học Ruby từ PHP thì đến với Ruby on rails mình cũng sẽ học từ Laravel. Mở luôn 2 tab trên trình duyệt: 1 tab là [document của Laravel](https://laravel.com/docs/5.6), 1 tab là [document của Ruby on rails](http://guides.rubyonrails.org/). Và bây giờ chỉ cần soi vào mục lục của Laravel và tìm nó ở cái còn lại thôi (lol) Vừa học vừa đoán chắc chắn nó sẽ có những cái tương tự như nhau. Và quả thật đúng như vậy, không biết là bên nào học hỏi bên nào tuy nhiên mình thấy những gì có ở Laravel thì ROR cũng có =)) Và đó là cách để mình đến với Ruby on rails một cách nhẹ nhàng. Mình không thể liệt kê hết toàn bộ mọi thứ ra đây nên mình xin chỉ điểm một vài tên để các bạn có sự hình dung rõ nhất về sự tương quan giữa 2 framework của 2 ngôn ngữ khác nhau:
* Model: Ở Laravel ta có Eloquent là một ORM (Object Relational Mapping) rất đa dụng và hiệu quả. Còn ở Ruby on rails ta có Active Record. Những gì ở Eloquent có thì Active Record cũng có. Nó bao gồm: migrations, seed, relationships (trong ROR là Associations), Query Builder, ... Chúng hoàn toàn giống nhau về ý nghĩa và mục đích, có chăng chỉ khác đôi chút về cú pháp và cách sử dụng. Ta có nền tảng kiến thức về Eloquent thì khi tiếp xúc với Active Record sẽ rất dễ làm quen.
* View: Ở Laravel ta có Blade template vô cùng lợi hại thì ở Ruby on rails ta cũng có Erb với chức năng tương tự như vậy. Ta có Laravel Collective (đã được gỡ bỏ khỏi Laravel core tuy nhiên ta có thể thêm bằng tay) thực sự là 1 helper hữu dụng để xử lý Html & Form thì ở Ruby on rails ta cũng có Action View Form Helpers có thể đảm nhiệm hoàn toàn các chức năng đó.
* Controller: ở Controller thì cả 2 cũng tương đồng nhau bởi đều chung một tư tưởng từ 1 request đi qua router và xử lý ở controller. Đều có Restful Route, Request, Response... với chức năng giống nhau.
* Và còn cơ số chức năng nữa mình cũng học được từ Laravel sang đó là I18n, Mail, Job, File Storage, Broadcasting (Action Cable trong Rails), Cache, Php artisan vs Rails console... Cũng giống như một vấn đề khó bạn cần 1 keyword để search Google thì ở Laravel bạn đã có sẵn keyword rồi chỉ cần tìm nó trong Rails là kiểu gì cũng có. Xem cách sử dụng có thể nó khác nhau đôi chút tuy nhiên về tư tưởng và cách hoạt động thì chắc chắn luôn luôn có điểm tương đồng...

Và như vậy sau một thời gian ngắn tìm hiểu và học hỏi cả ngôn ngữ mới và framework mới phục vụ công việc mình hoàn toàn tự tin có thể vào code dự án chung với anh em. Một cảm giác vừa tò mò vừa muốn chinh phục đối với mình thực sự thú vị. :smile:

# Kết luận
Qua bài viết này mình muốn chia sẻ đến các bạn cách mà mình đã học và làm việc với Ruby on rails như thế nào. Vì mới tiếp xúc một thời gian ngắn chắc chắn mình chưa thể hiểu rõ sâu sắc mọi ngóc ngách trong Ruby on rails và đây chỉ là những trải nghiệm cá nhân của mình và có thể có sai sót rất mong các bạn góp ý. Và đối với mình trải nghiệm code Ruby giống như một cuộc dạo chơi hấp dẫn và bổ ích. Nó góp phần tăng chỉ số Knowledge của bản thân. Cảm ơn các bạn đã theo dõi bài viết

### Tham khảo
* [Laravel Document](https://laravel.com/docs/5.6)
* [Ruby on Rails Guide](http://guides.rubyonrails.org)
* [Ruby Lang](https://www.ruby-lang.org/vi/)