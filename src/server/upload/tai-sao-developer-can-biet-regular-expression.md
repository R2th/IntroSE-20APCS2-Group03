![](https://images.viblo.asia/c46ec76f-53eb-4d50-bbfd-90d975d693cf.jpeg)


Regular Expressions hay còn được gọi với cái tên ngắn gọn là Regex là một trong những công cụ mạnh mẽ nhất và được áp dụng rộng rãi nhất trong việc lập trình.

Mọi chuyện từ đơn giản tới phức tạp đều có thể giải quyết bởi Regex, có thể kể tới như là kiểm tra xem email có hợp lệ hay không, hay khó hơn như refactor một block code phức tạp, tìm kiếm và thay thế một số pattern cụ thể nào đó, etc.

Chỉ chừng đó thôi chúng ta có thể đủ thấy rằng Regex là một công cụ cực kì mạnh mẽ, có thể dùng trong code, có thể dùng chung với editor, và nếu bạn là một developer thực thụ thì nó là thứ không thể thiếu trong hành trang của bạn.

Hầu hết những developer có dính líu đến thế giới *nix đều thân thuộc với Regex hơn là developer ở mảng khác, bởi vì họ sẽ phải thường xuyên sử dụng những lệnh như sed/awk.

Ngày trước trong quá trình đi làm tôi có một câu chuyện vui như thế này. Tôi và một anh làm chung công ty pair-programming với nhau.

```
Tôi> **tay múa trên bàn phím, nhập Regex và ấn Enter**
Anh kia> **mắt nhìn láo liêng, chưa hiểu chuyện gì xảy ra**
Anh kia> “Ê ku, sao mày làm được vậy?”
Developer1> “Ủa làm cái gì anh?”
Anh kia> “Thì mày vừa replace hết đống code cùng một lúc kìa, anh thấy mày có gõ gì đâu?”
Tôi> “Dùng Regex đó anh, editor nó có hỗ trợ replace bằng Regex mà!”
```

Thế là anh đó dành hết nguyên cả một buổi chiều để hỏi tôi về Regex, và tôi thì cả buổi chiều đó không thể làm được gì ngoài ngồi hướng dẫn anh kia.

Câu chuyện này nói lên điều gì?

Vẫn có khá nhiều developer mù mờ về Regex, một số người copy những đoạn Regex bỏ vào trong code của mình mà không hề biết đó là Regex, một số khác dù biết sự hiện diện của Regex nhưng lại không quan tâm cách để viết ra nó.

Quan điểm của tôi là thứ gì cũng vậy, đã sử dụng nó thì phải hiểu nó, và đó là lý do tôi viết bài viết này.

## Regex là cái gì?

Hiểu một cách ngắn gọn và đơn giản thì Regex là cách để diễn tả một đoạn mẫu phức tạp dùng để tìm kiếm (search pattern) bằng một chuỗi. Ví dụ như bạn có thể check chuỗi bao gồm chữ hoặc số, hay bạn có thể đi sâu hơn là kiểm tra số lượng kí tự, vị trí của kí tự, chữ hoa, chữ thường, và nhiều hơn nữa.

## Học một lần xài ở đâu cũng được!

Regex có thể được sử dụng trong hầu hết tất cả các ngôn ngữ. Học Regex cơ bản thì khá đơn giản, các bạn chỉ cần học những expressions cơ bản rồi kết hợp chúng lại là được. Chi tiết thì chắc tôi sẽ không giải thích từng expression ở bài viết này. Các bạn có thể vào https://regexr.com/, để tìm hiểu và thử ngay tại chỗ. Tôi nghĩ chỉ cần khoảng 30 phút thôi là các bạn đã có thể tự viết cho mình một đoạn Regex đơn giản rồi.

Ví dụ:
```
^[0-9]+$
```

Để tôi giải thích cho các bạn từng thứ một nhé.

* ^: Đây là expression thể hiện việc bắt đầu một dòng
* [0-9]: Đây là expression thể hiện việc kí tự tồn tại trong khoảng 0 đến 9
* +: Đây là expression thể hiện việc tồn tại 1 hay nhiều kí tự phù hợp với expression trước đó
* $: Đây là expression thể hiện việc kết thúc một dòng

Tóm lại đoạn Regex trên dùng để tìm kiếm dòng chỉ có tồn tại kí tự số.

## Sử dụng thực tế như thế nào?

Sau đây là một ví dụ thực tế mà tôi hay dùng Regex. Tôi có một file data dạng như sau.

```
Max, Dog
Lucy, Dog
Charlie, Horse
Molly, Cat
Buddy, Cat
Daisy, Fish
```

Bây giờ tôi muốn insert đống data này vào một bảng trong database tên Pet với hai trường dữ liệu là name và kind dạng như sau.

`INSERT INTO Pet (name, kind) VALUE ('Max', 'Dog');`

Cách thông thường sẽ là ngồi gõ dòng code insert rồi copy cho những dòng còn lại, giả sử file có 10000 dòng chắc copy tới tết luôn.

Nếu dùng Regex tôi sẽ dùng như sau.

```
Search: ^(.*), (.*)\n
Replace: INSERT INTO Pet (name, kind) VALUE ('$1', '$2');\n
```

![](https://images.viblo.asia/15bf1e4c-cf50-4f6b-b596-b10fc9d98258.gif)

## Sẽ vẫn có những trường hợp không cần sử dụng tới Regex

Mặc dù tôi rất thích Regex, nhưng phải nói thật là để học Regex một cách cơ bản thì khá dễ, nhưng nếu bạn muốn nhiều hơn thì thật sự khó, rất khó. Và các bạn sẽ phải dụng tới những vấn đề khá đau đầu như character classes, quantifiers, alternation, etc, mà thôi, tôi sẽ không viết nó ở đây.

Các bạn chỉ cần nhớ trong đầu câu này.

> Mục đích của việc sử dụng Regex là giúp các bạn tiết kiệm thời gian và công sức. Nếu các bạn mất nhiều thời gian để debug một cái Regex hơn là sử dụng cách thông thường thì các bạn nên dừng lại, dùng cách thông thường sẽ tốt hơn.

Regex là một công cụ hữu dụng, nhưng không có nghĩa là lúc nào chúng ta cũng sử dụng nó.

Nếu có tồn tại một cách đơn giản hơn hay không cần tới Regex thì đừng cố gắng sử dụng Regex để tỏ ra thông minh hơn. Bởi vì Regex là thứ khó đọc, khó debug, cũng như có thể tồn tại một số edge cases mà nếu các bạn không hiểu rõ Regex các bạn có thể gặp phải.

Và việc quá lạm dụng Regex sẽ là cách dễ nhất để làm đồng nghiệp của bạn nổi nóng.

## Tóm lại
Hy vọng qua bài viết này các bạn đã có một cái nhìn khác về Regex. Nếu các bạn muốn trở thành một developer thật thụ hãy bắt đầu tìm hiểu về Regex ngay từ bây giờ. Nếu các bạn đã biết về Regex và có quen một ai đó chưa biết về Regex, hãy dạy họ.

Ngoài ra, mình cũng xin giới thiệu một [bài viết khác](https://thefullsnack.com/posts/regex.html?t=1508797552961) cũng khá hay về việc Developer nên biết về Regex của blog [TheFullSnack](https://thefullsnack.com/) mà các bạn cũng nên đọc vì có hình minh hoạ tác giả tự vẽ khá sinh động.

Bài gốc: [Codeaholicguy](https://codeaholicguy.com/2017/10/31/tai-sao-developer-can-biet-regular-expression/)