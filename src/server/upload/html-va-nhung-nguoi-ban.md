HTML là ngôn ngữ đầu tiên mà một developer phải học. Vậy nhưng đối với CSS và JavaScript chúng ta sớm đã có các công cụ để hổ trợ như Sass cho CSS hoặc Babel đối với JavaScript, trong khi đối với HTML thì khác.

Vì nhiều người học HTML là người mới bắt đầu, nên việc giới thiệu các công nghệ mới có thể sẽ cảm thấy quá sớm gây bối rối khi mới bắt đầu học. Điều này dẫn đến các hệ thống được sử dụng để cải thiện và hổ trợ HTML bị loại khỏi chương trình giảng dạy và nhiều developer từ sơ cấp đến trung cấp có thể không nhận ra các công cụ có sẵn. Nên bài viết này mình muốn chia sẻ những người bạn là những người mà có thể hổ trợ cho HTML. Cùng bắt đầu nào!

### 1. Những vấn đề HTML thuần gặp phải

HTML là viết tắt của Ngôn ngữ đánh dấu siêu văn bản và là ngôn ngữ đánh dấu, nó không có chức năng của ngôn ngữ lập trình thông thường. Ngôn ngữ đánh dấu được thiết kế để con người chúng ta cũng như máy móc có thể dễ đọc và sử dụng các tag để xác định các thành phần trong tài liệu.

Nhưng điều làm cho HTML thuần dễ đọc cũng là một trong những hạn chế của nó như:
- Không thể thêm các sự kiện mới như sự kiện onclick.
- Không đơn giản để thêm dữ liệu động vào.
- Nếu muốn tạo các phần tử lặp sẽ không có các phím tắt được xây dựng hổ trợ dưới dạng vòng lặp. Cũng như sẽ không có phương thức được xây dựng để xử lý các điều kiện.
- HTML thuần không cho phép người dùng xác định các loại tag mới, có thể sử dụng lại.

Cuối cùng, mặc dù HTML đơn giản để đọc nhưng nó có thể viết nhanh hơn. Việc mở và đóng tag thật phiền phức khi chúng ta phải gõ đi gõ lại và các phần của HTML thật dài dòng.

Ví dụ:
```html
<button type="button" />
```

Không có công cụ hoặc cú pháp nào giống như HTML giải quyết được tất cả các vấn đề trên - một phần bởi vì không cần HTML trở thành một ngôn ngữ lập trình hoàn chỉnh. Nhưng những người bạn (template engine) này sẽ làm cho việc viết HTML nhanh hơn và tuyệt hơn!

### 2. Pug

![](https://images.viblo.asia/c83b2531-8a14-479e-8853-8309768b57a1.png)

Pug là trọng tâm chính của bài viết này vì nó được xây dựng dựa trên JavaScript - ngôn ngữ phát triển web và là lựa chọn phổ biến hiện nay!

Markup khi sử dụng Pug.js đơn giản hơn nhiều so với HTML thuần, nhưng có thể mất một chút thời gian để có thể làm quen. Phần khiến cho Pug đơn giản khi sử dụng đó là ngắt và thụt dòng.

Vì vậy, trong khi nhiều ngôn ngữ cho phép chúng ta vẫn hoạt động chính xác khi thoát khỏi định dạng không chuẩn thì đối với Pug là không. Thay đổi các thụt dòng sẽ làm thay đổi chức năng của code. Chúng ta cùng xem một đoạn code Pug thế này:
```
article#main
  h1 The Title
  h2 The Sub-title 
  div(class="article-body")  
    p The main body.
 ```
Với HTML là sẽ như thế này:
```html
<article id="main">
  <h1>The Title</h1>
  <h2>The Sub-title</h2>
  <div class="article-body">
    <p>The main body</p>
  </div>
</article>
```
Ví dụ nhỏ trên cho thấy `Pug.js` chiếm ít không gian hơn và không có dấu mũ hoặc tag đóng nên việc viết nhanh hơn rất nhiều. Muốn tìm hiểu về Pug tốt nhất hãy ghé [tại đây](https://pugjs.org/api/getting-started.html), nhưng chúng ta hãy cũng tìm hiểu qua một vài tính năng hữu ích để bạn có thể dễ dàng lựa chọn nhé!
#### Loops
Pug cho phép chúng ta sử dụng inline JavaScript code, được phân định bằng cách sử dụng `-` , `=` and `!=` tuỳ thuộc chúng ta muốn sử dụng vào trường hợp nào.
Ví dụ, chúng ta có thể sử dụng vòng lặp for để tạo một danh sách đơn giản gồm 3 mục và đánh số chúng cho phù hợp:
```
- for (let x = 0; x < 3; x++)
  li= 'Item ' + (x + 1)
```
Tương đương với html:
```html
<li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li>
```
Hoặc chúng ta có thể sử dụng để lặp qua các item trong một array:
```
- var colors = ["Red", "Yellow", "Green", "Blue"]
  each item in colors
    li= item
```
Tương đương với html:
```html
<li>Red</li>
<li>Yellow</li>
<li>Green</li>
<li>Blue</li>
```
#### Conditionals
Một tính năng hữu ích khác là khả năng sử dụng các điều kiện trong markup. Chúng ta có thể render một trong hai lựa chọn thay thế bằng cách sử dụng một boolean đơn giản, chẳng hạn như:
```
- var isTrue = true
  if isTrue
    p Boolean is TRUE
  else
    p Boolean is FALSE
```
Hoặc có thể sử dụng như thế này đối với một ví dụ phức tạp hơn:
```
- var raceResult = 7
case friends
  when A
    p You won the race!
  when 1
    p You were the runner up!
  default
    p You finished the race after #{raceResult - 1} other runners!
```
### 2. HAML

![](https://images.viblo.asia/7710baae-7e82-4dfc-92ce-29115ffbf237.jpeg)

Ngôn ngữ nền tảng: Ruby

HAML là viết tắt của Ngôn ngữ đánh dấu trừu tượng HTML. Giống như Pug, HAML sử dụng cách viết thụt dòng để xác định các phần tử lồng nhau. Nó được phát triển thay thế cho Ruby’s ERB, nhưng nó cũng có thể được sử dụng thay thế cho PHP, ASP và tất nhiên cả HTML thuần.

Sự khác biệt chính giữa HAML và Pug.js là việc lập trình trong HAML được thực hiện thông qua Ruby. Vì vậy, nếu muốn sử dụng dựa trên JavaScript, Pug có thể là lựa chọn an toàn hơn. HAML code trông như thế này:
```
- (1..10).each do |i|
  %div #{i}
```

Câu lệnh trên sẽ in các số từ 1 đến 10, mỗi số trong một div riêng biệt.

Hoặc để chứng minh một điều kiện đơn giản, chúng ta có thể sử dụng như sau:
```
- isSunny = false
- if isSunny
  %p Let's go outside!
- else
  %p I'd rather stay inside.
```
>  Lưu ý rằng tất cả logic đầu dòng có dấu gạch ngang `-`
### 3. Slim

Ngôn ngữ nền tảng: Ruby

Slim là một lựa chọn phổ biến khác và có rất nhiều điểm chung với HAML: đó là vì cả hai đều dựa trên Ruby. Giống như HAML, có thể nhúng JavaScript vào Slim và trở nên khó khăn về việc có nên chọn cái này hơn cái kia nên được coi là một chủ đề tranh luận cho cộng đồng Ruby!

Nhìn bề ngoài, Slim dường như sử dụng cú pháp tối giản hơn một chút so với HAML. Có lẽ sự khác biệt đáng kể nhất về cú pháp là Slim sử dụng `|` cho mỗi block, trong khi HAML sử dụng `%` trước mỗi tag.

```
/ Slim
tag(attr= “value”)
  | text
-# HAML
%tag{attr: “value”}
  text
```
### 4. Markdown

Cuối cùng, hãy tìm hiểu đến Markdown. Bạn này không giống như các công cụ khác được thảo luận cho đến nay, vì nó không đi kèm với bất kỳ khả năng ngôn ngữ lập trình nào và chúng ta đã gần như chắc chắn gặp phải nó trước đây. Hầu hết các tệp README trên GitHub được viết bằng Markdown (sử dụng phần mở rộng tệp .MD).

Mặc dù Markdown thiếu các tính năng lập trình như vòng lặp và điều kiện, nhưng bạn ấy vượt trội hơn so với HTML thuần bởi cả hai cách viết cực kỳ đơn giản và dễ đọc. Markdown cũng dễ đọc hơn rất nhiều so với .txt, phần mở rộng tệp thường được sử dụng cho READMEs.
Trong Markdown `h1`, `h2` và `h3` được viết là `#,` `##` và `###`. Một dòng mã được phân biệt bằng cách sử dụng `' ` trong khi một khối mã sử dụng  `'''` và các liên kết được viết bằng cách sử dụng kết hợp dấu ngoặc vuông  và dấu ngoặc đơn. Muốn tham khảo danh sách đầy đủ các phím tắt, hãy xem bảng cheat chính thức [tại đây](https://www.markdownguide.org/).

### 5. Tổng kết

Trong bài viết này, chúng ta đã khám phá bốn trong số các công cụ tạo khuôn phổ biến nhất cho HTML. Sau khi đọc bài viết hy vọng bạn sẽ tìm được lý do tại sao bạn có thể chọn sử dụng các công cụ đó. Và bạn có thể trang bị một số tùy chọn để viết HTML nhanh hơn, ngắn gọn hơn trong các dự án của mình, cho dù ngôn ngữ lập trình của bạn là JavaScript, Ruby hay thứ gì khác. Bài viết được tham khảo [tại đây](https://medium.com/@bretcameron/so-you-think-you-know-html-7813c03f8ff6).

Cảm ơn bạn đã dành thời gian đọc bài viết!