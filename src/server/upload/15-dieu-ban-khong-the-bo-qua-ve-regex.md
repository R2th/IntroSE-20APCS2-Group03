Xin chào, hôm nay mình sẽ giới thiệu về một trong những chủ đề được coi là "khoai" nhất ngành Khoa học máy tính, nói đến đây chắc cũng có nhiều người đoán được mình đang muốn nói về chủ đề gì rồi (hoặc là không :joy:).

Không vòng vo nữa, chủ đề hôm nay mình muốn giới thiệu chính là...
## Regex!
![image.png](https://images.viblo.asia/d8e1cffe-f961-43ce-bb8b-9fd82a40ec34.png)

*<div align="center">Đây chắc hẳn là suy nghĩ của nhiều người (trong đó có mình :laughing:) khi lần đầu biết đến Regex.</div>*

Nhưng để tiếp cận với Regex liệu có cần "công lực" cực kỳ thâm hậu hay không? Cùng tìm hiểu qua phần trình bày dưới đây của mình nhé ;)

Trước khi tìm hiểu mình sẽ đưa ra định nghĩa về Regex cho bạn nào chưa biết đến nó:

*Regex (Regular expression - biểu thức chính quy) là một chuỗi miêu tả một bộ các chuỗi khác, theo những quy tắc cú pháp nhất định. Biểu thức chính quy thường được dùng trong các trình biên tập văn bản và các tiện ích tìm kiếm và xử lý văn bản dựa trên các mẫu được quy định (theo Wikipedia).*

Nói một cách đơn giản, Regex có thể xác định sự xuất hiện của một mẫu chuỗi trong một chuỗi khác chỉ qua những cú pháp đơn giản (sự thật là các cú pháp không hề đơn giản chút nào :joy:, tuy nhiên Regex giúp ta tiết kiệm được rất nhiều công sức code).
# 1. Sử dụng Regex với Javascript
Độ phổ biến của Regex là không thể bàn cãi, vậy nên rất nhiều ngôn ngữ lập trình hỗ trợ Regex, không tin các bạn có thể lên Google gõ **Tên ngôn ngữ lập trình các bạn đang sử dụng + Regex** là sẽ thấy điều kì diệu ;). Ở bài viết này mình chủ yếu đi vào các cú pháp của Regex, vậy nên mình sẽ sử dụng cách đơn giản nhất để có thể chạy được các cú pháp của Regex, đó chính là **sử dụng chính trình duyệt mà bạn đang dùng để đọc bài viết này**. Mặc dù không phải trình duyệt nào cũng hỗ trợ Javascript và kể cả khi được hỗ trợ thì không phải trình duyệt của máy nào cũng đang bật sẵn Javascript, tuy nhiên mình sẽ mặc định là bạn đang sử dụng một loại trình duyệt phổ biến, được hỗ trợ Javascript và đang bật Javascript :sunglasses: Nếu có gì thắc mắc các bạn có thể lên hỏi bác Google hoặc liên hệ trực tiếp với mình :slightly_smiling_face:, giờ thì mở trình duyệt của bạn lên, nhấn phím **F12**, chọn qua tab **Console** và bắt đầu thôi nào!

![image.png](https://images.viblo.asia/c7d6caa7-03e7-4e08-a39b-f24ec4494e28.png)

*<div align="center">Bảng console của trình duyệt Chrome mình đang sử dụng</div>*

Regex trong Javascript được định nghĩa bên trong hai dấu slash (`//`), hoặc là sử dụng lời gọi hàm khởi tạo class RegExp `new RegExp()`, và 3 method của Javascript sử dụng với Regex là `match()`, `test()` và `replace()`:
```cpp
const regex1 = /test/; // sử dụng dấu slash để định nghĩa
const regex2 = new RegExp('123'); // khởi tạo một instance của class RegExp để định nghĩa Regex

const str = 'this is Regex test 123'; // khởi tạo chuỗi để xem xét sự trùng khớp với mẫu

// match() trả về một mảng các chuỗi trùng khớp với mẫu
str.match(regex1); // => ["test"]
str.match(regex2); // => ["456"]

// replace() sử dụng để thay thế chuỗi trùng khớp bằng một chuỗi mới
str.replace(regex2, '456'); // => 'this is Regex test 456'

// test() sử dụng để kiểm tra xem có chuỗi con nào của chuỗi trùng khớp với mẫu hay không
str.test(regex2); // => true
```

# 2. Literals
**Literals** là dạng đơn giản của Regex, nó dùng để biểu diễn một đoạn kí tự chính xác mà ta muốn kiểm tra:
```javascript
const str = 'foo bar 123!';

// Kiểm tra xem chuỗi '123!' có trong str hay không
str.match(/123!/); // => ['123!']
```

# 3. Alternation
**Alternations** được sử dụng để kiểm tra sự trùng khớp của các chuỗi kí tự trước **HOẶC** sau dấu `|` với chuỗi chỉ định:
```javascript
const str = 'foo bar 123!';

// Kiểm tra sự xuất hiện của chuỗi 'hello' hoặc 'bar' trong str
str.match(/hello|bar/); // => ["bar"]
```

# 4. Character Sets
**Character Sets** được sử dụng để định nghĩa một tập các kí tự, sử dụng cặp dấu `[]` để định nghĩa tập kí tự. Nếu một trong các kí tự bên trong `[]` trùng khớp thì mẫu sẽ trùng khớp.

Ngược lại, ta cũng có **Negative Character Sets**, sẽ trùng khớp nếu một trong các kí tự bên trong nó **KHÔNG** được tìm thấy ở chuỗi chỉ định. Bộ kí tự nghịch đảo được kí hiệu với dấu `^` trước tập các kí tự:
```objectivec
const str = "bat cat hat"

str.match(/[fgh]at/); // => ["hat"]

// Nghịch đảo: các kí tự ở chuỗi str kết thúc với 'at' và không bắt đầu bằng 'b', 'd' hoặc 'h'
str.match(/[^bdh]at/); // => ["cat"]
```

# 5. Wildcards
**Wildcards** được kí hiệu bởi dấu `.`, thể hiện bất kì kiểu kí tự nào (chữ cái, chữ số, kí hiệu hoặc khoảng trắng). Nếu muốn sử dụng `.` như một mẫu kí tự để kiểm tra sự trùng khớp thì ta sử dụng dấu *escape* `\` trước dấu `.`:
```javascript
const str = "John has 12 bananas.";

// Hai dấu . đầu tiên biểu diễn wildcards và dấu chấm cuối cùng là mẫu kí tự do sử dụng kèm theo \
str.match(/John has .. bananas\./); // => ["John has 12 bananas."]
```

# 6. Ranges
**Ranges** là cách viết tắt dùng để biểu diễn một dãy tuần tự các kí tự nằm trong khoảng nhất định, khoảng được biểu diễn bởi kí tự đầu và kí tự cuối của dãy tuần tự, ngăn cách nhau bởi dấu `-`. Các khoảng khác nhau, cùng các kí tự độc lập có thể được biểu diễn đồng thời qua một biểu thức chính quy:
```javascript
const str = 'I has 5 bananas';

// Khoảng các kí tự từ 0 đến 9
str.match(/[0-9]/); // => ['5']

// Các khoảng A-Z, a-z, 0-9 và kí tự _ có thể sử dụng đồng thời trong một Regex
str.match(/[A-Za-z0-9_]/); // => ['I']
```

# 7. Shorthand Character Classes
**Shorthand Character Classes** được dùng để biểu diễn các khoảng kí tự được sử dụng rộng rãi ví dụ như lớp kí tự chữ và lớp kí tự số.
Shorthand Character Classes cũng có thể biểu hiện được dạng nghịch đảo, sự trùng khớp sẽ được xác định với các kí tự KHÔNG nằm trong lớp đó.
```javascript
const str = 'foo bar 123!';

// \w biểu diễn các kí tự chữ cái in hoa, in thường, chữ số và dấu '_': [A-Za-z0-9_]
str.match(/\w\w\w/); // => ['foo']

// \W là dạng nghịch đảo, biểu diễn các kí hiệu đặc biệt và khoảng trắng
const str2 = 'foo@#$123!';
str2.match(/\W\W\W/); // => ['@#$']

// \d biểu diễn các kí tự chữ số: [0-9]
str.match(/\d\d\d/); // => ['123']
// \D là dạng nghịch đảo
str.match(/\D\D\D/); // => ['foo']

// \s biểu diễn các kí tự khoảng trắng như space và tab
str.match(/...\s.../); // => ['foo bar']
// \S là dạng nghịch đảo
str.match(/.\S./); // => ['foo']
```

# 8. Groupings
**Groupings** được biểu diễn qua một cặp dấu `()`, được sử dụng để nhóm các phần khác nhau của Regex và tách rời logic của chúng. Khi sử dụng Groupings, kết quả của method `match()` không chỉ trả về mẫu trùng khớp mà còn trả về cả những kí tự bên trong dấu `()`:
```javascript
const str = 'foo bar 123!';

str.match(/(foo|bar) .../); // => ['foo bar', 'foo']
```

# 9. Fixed Quantifiers
**Fixed Quantifiers** cho phép ta chỉ định ra chính xác số lần xuất hiện của kí tự , được kí hiệu bởi cặp dấu `{}` ngay sau kí tự:
```javascript
const str = 'foo bar 123!';

str.match(/\w{3}/); // => ['foo']

// Có thể định nghĩa khoảng tần suất của kí tự với fixed quantifiers theo như dưới đây
// số lần xuất hiện min = 2, max = 4.
// Nó sẽ match với số lần xuất hiện lớn nhất có thể, ở đây là 4
str.match(/\w{2,4}/); // ["foo "]
```

# 10. Optional Quantifiers
**Optional Quantifiers** chỉ ra một hoặc nhiều kí tự trước nó có xuất hiện 0 hoặc 1 lần hay không, được kí hiệu bởi dấu `?`:
```php
const str = 'fo@123';

// Kiểm tra xem 'fo(o)@' có trong chuỗi ban đầu không, chữ o trong ngoặc có thể có hoặc không
str.match(/foo?@/); // => ['fo@']
```

# 11. Kleene Star
**Kleene Star** được đặt theo tên của Stephen Cole Kleene, người phát minh ra các biểu thức chính quy, được sử dụng để biểu diễn việc kí tự đứng trước nó có thể xuất hiện 0 hoặc nhiều lần, được kí hiệu bởi dấu `*`:
```html
const str = 'cat goes meoooooow';

str.match(/meo*w/); // => ['meoooooow']
```

# 12. Kleene Plus
**Kleene Plus** khác với **Kleene Star** ở chỗ kí tự đằng trước nó xuất hiện 1 hoặc nhiều lần, được kí hiệu bởi dấu `+`:
```perl
const str = 'cat goes mew';

str.match(/meo+w/); // => undefined
```

# 13. Anchors
**Anchors** biểu diễn bắt đầu và kết thúc của một chuỗi kí tự, được kí hiệu bởi các dấu `^` và `$` tương ứng. Nếu sử dụng **anchors** thì mẫu sẽ không trùng khớp với chuỗi ở giữa của chuỗi kí tự:
```rust
const str = 'Unhappy cat\nHappy dog';

str.match(/^happy cat$/); // => undefined
str.match(/^Happy dog$/); // ['Happy dog']
```

# 14. Lookaheads và Lookbehinds
**Lookaheads** và **Lookbehinds** là các khái niệm nâng cao hơn của Regex, chúng không trực tiếp khớp các kí tự nhưng chúng giữ một vai trò quan trong việc quyết định sự trùng khớp của một mẫu. **Lookaheads** và **Lookbehinds** sẽ kiểm tra xem một mẫu cụ thể có tồn tại phía trước (ahead) hoặc phía sau (behind) chuỗi kí tự cần xác định hay không.
* **Lookaheads**: kí hiệu bằng `(?=)`, dạng nghịch đảo: `(?!)`
* **Lookbehinds**: kí hiệu bằng `(?<=)`, dạng nghịch đảo: `(?<!)`

**Lưu ý**:
* *Phía trước (ahead):* chỉ các kí tự ở *phía bên phải* của kí tự đang xét (ví dụ: 'ba' thì kí tự ở phía trước của 'b' là 'a').
* *Phía sau (behind):* chỉ các kí tự ở *phía bên trái* của kí tự đang xét (ví dụ: 'ba' thì kí tự ở phía sau của 'a' là 'b').
```javascript
const str = 'foo bar 123!';

// Tìm kiếm xem chuỗi str có chuỗi con nào trùng với mẫu 'b' với 'a' đứng ở bên phải nó không
str.match(/b(?=a)/); // => ['b']
// Nghịch đảo thì ngược lại
str.match(/b(?!a)/); // => undefined

// Tìm kiếm xem chuỗi str có chuỗi con nào trùng với mẫu 'a' với 'b' đứng ở bên trái nó không
str.match(/a(?<=b)/); // => ['a']
// Nghịch đảo thì ngược lại
str.match(/a(?<!b)/); // => undefined
```

# 15. Flags
**Flags** được thêm vào sau của Regex *(có thể có hoặc không)* để chỉ định cách các mẫu được khớp:
```objectivec
const str = 'foo bar 123!';

// Flag 'g' (global matching) nếu được sử dụng sẽ trả về tất cả các chuỗi trùng khớp với mẫu
// mặc định sẽ trả về chuỗi đầu tiên khớp với mẫu
str.match(/\w{3}/g); // => ['foo', 'bar', '123']

// Flag 'i' (case insensitive) nếu được sử dụng sẽ không xét sự không trùng khớp của kí tự in hoa và in thường
str.match(/FOO BAR/i); // => ['foo bar']

// Các cờ 'g' và 'i' cũng có thể kết hợp với nhau
str.match(/[A-Z]{3}/ig); // => ["foo", "bar"]
```

# Lời kết
Vậy là mình đã vừa giới thiệu những kiến thức cơ bản nhất về Regex cho mọi người, bây giờ mọi người đã có thể bình tĩnh ngồi pha một tách cafe rồi nhâm nhi khi gặp một vấn đề cần phải đụng tay đụng chân tới Regex rồi :sunglasses:
Các bạn đã cảm thấy trong người tràn đầy sức mạnh, giống như Thanos, có thể búng tay một cái là thổi bay tất cả các vấn đề liên quan tới Regex chưa?

...

...

...

...

...

...

Tất nhiên là chưa đâu, mình chỉ đùa chút thôi, đừng nghĩ vậy nhé. :laughing:

Mặc dù vậy thì 15 điều trên đủ để các bạn giải quyết được những vấn đề cơ bản của Regex, và cũng đủ để bạn hiểu và thấy Regex không quá "ma giáo" như trước nữa phải không? :eyes:

Hãy thử thực hành ngay bây giờ và cùng đắm chìm trong phép màu của Regex nhé! :nerd_face:

![image.png](https://images.viblo.asia/9de800d6-7cea-4383-94a4-9dd7b272f326.png)

Hi vọng những điều mình vừa chia sẻ trên đây có thể giúp ích được phần nào cho bạn đọc. Hẹn gặp lại vào bài viết tới. :bowing_man:

# Tài liệu tham khảo
https://dev.to/anchobies/15-things-to-know-about-regex-15d2