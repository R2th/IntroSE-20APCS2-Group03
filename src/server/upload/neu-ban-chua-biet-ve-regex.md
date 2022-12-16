## Overview

Regular expressions là một cách để thực hiện khớp mẫu trên văn bản. Các lập trình viên thường bỏ qua và hầu hết họ nghĩ nó là một cái gì đó khó học.

Mặc dù, thực tế Regular expressions rất mạnh mẽ, nhưng rất nhiều lập trình viên đã không thực sự hiểu biết khi nhắc đến nó.

Một trong những ứng dụng rõ ràng nhất của Regex là tìm kiếm đoạn văn bản nhất định trong một codebase lớn. Nếu bạn là một nhà phát triển web, bạn có thể đã sử dụng nó trong việc xác thực dữ liệu người dùng (ví dụ nhu email). Thậm chí, các biểu thức regex có thể được sử dụng để loại bỏ các chuỗi nhất định.

Regular expressions rất mạnh mẽ, và đó thực sự là lý do tại sao nó lại là một điều tốt để làm quen. Để trở thành một lập trình viên giỏi, hiểu biết về Regex là rất cần thiết.

Trong bài viết này, chúng ta sẽ làm quen với những điều cơ bản của Regex. Cùng với lý thuyết, những kiến thức cơ bản về Regex sẽ được thể hiện bằng cách kết hợp các ví dụ.
## Starting
Ví dụ bạn đang muốn tìm một chuỗi nhất định trong văn bản. Để tìm kiếm chuỗi **hij** trong văn bản, chúng ta sử dụng Regex sau: **/hij/**. Lưu ý rằng, chuỗi được bao quanh bởi dấu *forward slashes (/.../)*. Chúng chỉ ra sự bắt đầu và kết thúc của biểu thức Regex.

Như bạn có thể nhìn thấy ở phía dưới, chúng ta có một kết quả phù hợp. Tìm kiếm này có phân biệt chữ hoa, chữ thường và chỉ trả về kết quả phù hợp đầu tiên.
![](https://images.viblo.asia/c1ab1834-f60c-48d3-8b25-4360dc90759f.png)

Bạn muốn làm một thứ gì đó phức tạp hơn một chút so với ví dụ trước. Một trong những điều bạn có thể muốn là tìm kiếm một chuỗi bắt đầu bằng một số ký tự nhất định.

Hãy tạo một Regex khớp với **abc** khi bắt đầu chuỗi. Để làm điều đó, chúng ta sẽ thêm prefix vào biểu thức Regex với một ký tự **^** - Biểu thức Regex sẽ trở thành: **/^abc/**.

![](https://images.viblo.asia/f147092d-38cb-4cc8-a905-2924f101e37f.png)

Chúng ta có thể làm tương tự nếu chúng ta muốn tìm một chuỗi khớp với các ký tự nhất định ở cuối chuỗi - nhưng chúng ta sẽ sử dụng suffix **\$** thay thế cho prefix **^**. Biếu thức Regex như sau: **/xyz$/**.

![](https://images.viblo.asia/1327a29e-7d0f-49ff-82ed-48e698284434.png)

Chúng ta cũng có thể kết hợp cả prefix và suffix để tìm kiếm kết quả khớp chuỗi chính xác:

![](https://images.viblo.asia/ce2ec2d0-49da-41c0-b750-c223b78ab5bf.png)

### Escaping
Có một số ký tự có ý nghĩa đặc biệt trong các biểu thức Regex. Những ký tự đó cần được *escape* trong biểu thực Regex.

Các ký tự đặc biệt:
```
[ \ ^ $ . | ? * + ( )
```

Ví dụ chúng ta cần tìm kiếm dấu **?**. Do dấu hỏi có ý nghĩa đặc biệt trong biểu thức Regex. Vì vậy, chúng ta cần *escape* nó. Sử dụng prefix *backslash* trước ký tự đặc biệt: **\\?**. Điều này cho phép sử dụng một ký tự đặc biệt như một ký tự thông thường:

![](https://images.viblo.asia/f36c7765-6cee-4b99-ba09-7dd93c50b781.png)

> *Để sử dụng ký tự đặc biệt trong biểu thức Regex, cần *escape* nó bằng cách sử dụng một *backslash (\\)**

### Flags
Một biểu thức Regex thường xuất hiện trong một biểu mẫu , trong đó biểu mẫu được phân định bằng  *forward slashes (/.../)*. Để chỉ định một *flag* bạn thêm nó ngay sau ký tự gạch chéo cuối cùng.

Có nhiều *flag* khác nhau, chúng ta sẽ tìm hiểu về các *flag* thường được sử dụng: *Global, Case insensitive, Multi-line*. Chúng ta có thể kết hợp các *flag*.

#### *Global flag*
Global flag sẽ **lấy tất cả các giá trị thỏa mãn biểu thức Regex** thay vì chỉ lấy giá trị đầu tiên tìm thấy: **/e/g**

![](https://images.viblo.asia/b30b4e0f-a356-49b1-8545-8003320497ea.png)

#### *Case insensitive*
Việc tìm kiếm không phân biệt chữ hoa, thường: **/e/i**

![](https://images.viblo.asia/b49d6c5d-9ffc-4be2-809a-ba37b95af6fa.png)

Như đã nói ở trên, chúng ta có thể kết hợp các *flag* với nhau: **/e/gi**

![](https://images.viblo.asia/d0840714-3ea7-4510-9bef-c4d582bda76d.png)

#### *Multi-line*
Khi bạn muốn tìm kiếm một text trên nhiều dòng, sử dụng *multi-line flag*: **/are/m**

![](https://images.viblo.asia/0f00de97-c035-42a9-bbc4-f348c9839b5c.png)


> *g: global - Lấy tất cả các giá trị tìm thấy*
> 
> *i: Case insensitive - Tìm kiếm không phân biệt hoa thường*
> 
> *m: multi-line - Tìm kiếm trên nhiều dòng*

###  Character classes (Lớp ký tự)
Một **character class** là một ký hiệu đặc biệt phù hợp với bất kỳ biểu tượng từ một bộ nhất định. Giả sử chúng ta có một số điện thoại, `+(903)123-4567`, và chúng ta muốn nó chỉ chứa các chữ số.

Để làm điều đó, chúng ta phải loại bỏ bất cứ thứ gì không phải là số. Và đó là một thứ gì đó mà **character class** có thể giải quyết. **\d character class** khớp với bất kỳ chữ số nào, là một ký tự từ 0-9. Điều này hoàn hảo cho trường hợp sử dụng của chúng ta:

![](https://images.viblo.asia/d4ee1ce0-d11c-422a-87fe-485fc37cebc3.png)

Ngoài **\d** chúng ta còn có các **character class** khác.

**\w** sẽ khớp với một ký tự là chữ, số hoặc dấu gạch dưới.

**\s** khớp với một **space symbol** - bao gồm **spaces, tabs và newlines**.

Mặc dù có nhiều **character classes**, nhưng **\d, \w, \s** thường được sử dụng nhất.


#### *Ngịch đảo của các Character class trên*

Mỗi **character class** có một nghịch đảo được biểu thị bằng cũng một chữ cái, nhưng được viết hoa. Ví dụ nghịch đảo của **\d** là **\D**.

> \w - Là một ký tự, số, dấu gạch dưới
> 
> \d - Là ký tự số
> 
> \s - whitespace
> 
**Inverse**
> \W - Không phải là một ký tự, số, dấu gạch dưới
> 
> \D - Không phải là ký tự số
> 
> \S - non whitespace

###  Quantifiers (Bộ định lượng)
Một chủ đề cuối cùng mà chúng ta sẽ thảo luận trong bài viết này là **quantifiers**. Một regex **quantifier** chỉ định tần suất một biểu thức regex.

Có một vài bộ định lượng khác nhau. Chúng ta sẽ lần lượi tìm hiểu.

#### *Zero or one (?)*
Quantifier đầu tiên là **?** - có nghĩa là **0 hoặc 1**. Trong ví dụ sau, chúng ta sử dụng biểu thức regex **/ba?/g**. Biểu thức sẽ kiểm tra cho bất kỳ ký tự **b** nào theo sau là 0 hoặc 1 ký tự **a**.

![](https://images.viblo.asia/44efe1d6-c500-4133-9c5c-44afecfcf8f5.png)

####  *Zero or more (\*)*
Quantifier thứ 2 là **\*** - nghĩa là **0 hoặc nhiều**.

![](https://images.viblo.asia/108eb84c-1d89-4ef7-ac44-f0b8b79d24ae.png)

#### *One or more (+)*
Cũng có bộ định lượng **1 hoặc nhiều**, được biểu diễn bởi **+**.

![](https://images.viblo.asia/6449c18b-4d92-419b-bf03-e143bc2b641a.png)

Chúng ta cũng có thể chỉ định một số lượng xuất hiện cụ thể phải phù hợp với bộ định lượng. Ví dụ, biểu thức regex **/ba{2}/g** sẽ khớp với bất kỳ ký tự **b** nào theo sau là 2 ký tự **a** liên tiếp.

![](https://images.viblo.asia/ea091301-cb4f-4fe0-ad0c-365bfee7f543.png)

Nếu bạn muốn giới hạn một khoảng ký tự liên tiếp, bạn có thể set số thứ hai, phân tách nhau bởi dấu phẩy. Biểu thức regex **/ba{2, 4}/** sẽ khớp với bất kỳ ký tự **b** nào theo sau là 2 đến 4 ký tự **a**.

![](https://images.viblo.asia/c0f05216-4a92-48b2-aa1b-4e5db5209395.png)

Chúng ta có thể làm điều tương tự cho bất kỳ ký tự **b** nào được theo sau bởi ít nhất 2 ký tự **a**. Biểu thức regex sẽ như sau: **/ba{2,}/g**.

![](https://images.viblo.asia/ae041843-7c79-4980-89f7-d9a3af5e45ea.png)

> *a? - Khớp với một ký tự a hoặc không.*
> 
> *a\* - Khớp với không hoặc nhiều ký tự a liên tiếp.*
> 
> *a+ - Khớp với một hoặc nhiều ký tự a liên tiếp.*
> 
> *a{2} - Khớp chính xác 2 ký tự a liên tiếp.*
> 
> *a{2, 4} - Khớp giữa 2 và 4 ký tự a liên tiếp.*
> 
> *a{2,} - Khớp với ít nhất 2 ký tự a liên tiếp.*

## Summary

Chúng ta vừa đi qua những kiến thức cơ bản về các biểu thức Regex, đã đến lúc bạn nên thực hành nó. Và tất nhiên, có nhiều thứ để học khi nói đến biểu thức regex. Nhưng thật sáng suốt khi chúng ta nắm vững những kiến thức cơ bản trước khi học những phần nâng cao hơn.

Cảm ơn các bạn đã đọc.

Tham khảo: https://levelup.gitconnected.com/read-this-if-you-dont-know-enough-about-regex-73141bb0e1a7