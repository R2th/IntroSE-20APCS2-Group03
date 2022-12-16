## Chương III: Những cái tên mà không thể hiểu lầm được
![](https://images.viblo.asia/8f1d7faa-3fdc-4605-8567-3c0139308efe.png)
<br><br>
Trong chương trước, chúng tôi đã giới thiệu cách để gói được rất nhiều thông tin vào tên. Trong chương này, chúng ta tập trung vào một chủ đề khác: coi chừng những cái tên có thể bị hiểu lầm.
> ##### KEY IDEA: 
> ##### ***Chủ động xem xét kỹ lưỡng tên của bạn bằng cách tự hỏi, "Còn những ý nghĩa nào mà người khác có thể suy diễn ra từ tên này không?" .***
Hãy cố gắng sáng tạo, tích cực tìm kiếm “sự giải thích sai”. Bước này sẽ giúp bạn chỉ ra những cái tên mơ hồ đó rồi bạn có thể thay đổi chúng.
Đối với những ví dụ trong chương này, chúng ta sẽ "nghĩ lớn" bằng việc thảo luận về sự giải thích sai của mỗi cái tên chúng ta thấy, và sau đó chọn những cái tên tốt hơn.<br>
### Ví dụ: Filter()
Giả sử bạn đang viết code để thao tác một tập hợp các kết quả từ database:<br>
```results = objectRepository.getAll().filter("year <= 2011")```
<br><br>
*results* chứa cái gì vậy?<br>
* Những objects mà có year <= 2011?
* Những objects mà có year không phải <= 2011?
<br>

Vấn đề là *filter* là một từ không rõ ràng. Không rõ liệu nó có nghĩa là "chọn ra" hay là "loại bỏ". Tốt nhất là tránh tên *filter* vì nó dễ dàng bị hiểu sai.<br>
-- *(cũng giống như hồi mình mới bắt đầu học java8 stream có hàm filter() khá là mơ hồ :sweat_smile:)*<br>
Nếu bạn muốn “chọn ra”, một tên tốt hơn là *select()*. Nếu bạn muốn "loại bỏ", một tên tốt hơn là *exclude()*.<br>
### Ví dụ: clip(text, length)
Giả sử bạn có một function để clip nội dung của một văn bản:
```
// Loại bỏ đoạn cuối của text, rồi appends "..."
String clip(text, length) {
 ...
}
```
Có hai cách mà bạn có thể tưởng tượng cách mà *clip()* hoạt động:<br>
* Từ phía cuối cùng của *`text`*, nó sẽ remove một đoạn text có độ dài *`length`*
* Khi đến vị trí *`length`* tối đa, nó sẽ bắt đầu truncate text

Cách thứ hai (truncate) là có khả năng đúng nhất, nhưng bạn không thể chắc chắn. Thay vì để người đọc có bất kỳ "bối rối" nào, tốt hơn bạn nên đặt tên là *truncate(text, length)*.<br><br>
Tuy nhiên, biến *length* cũng thế. Nếu nó là *max_length*, thì sẽ rõ ràng hơn.<br>
Nhưng chúng ta vẫn chưa xong đâu. Tên *max_length* vẫn để lại nhiều cách diễn giải:<br>
* Một số lượng byte
* Một số lượng ký tự
* Một số lượng từ
<br>

Như bạn đã thấy trong chương trước, đây là trường hợp mà đơn vị cần phải được gắn vào tên. Trong trường hợp này, ý của chúng tôi là là "số ký tự", nên thay vì *max_length*, nó phải là *max_chars*.<br><br>
-- *ở phần biên dịch dưới sẽ xuất hiện thuật ngữ "inclusive" và "exclusive", nếu dịch sang tiếng Việt thì có nghĩa là "bao gồm" và "không bao gồm" (hoặc có thể hiểu "inclusive" là `>=`, `<=` còn "exclusive" là `>`, `<`), nhưng mình xin phép giữ nguyên tiếng Anh để biên dịch cho hợp lý* 
### Ưu tiên dùng min và max đối với (inclusive) limit

Giả sử ứng dụng shopping cart của bạn không cho phép mọi người mua hơn 10 món hàng cùng một lúc:
```
private static final int CART_TOO_BIG_LIMIT = 10;
if (shoppingCart.numItems() >= CART_TOO_BIG_LIMIT) {
    error = "Too many items in cart.";
}
 ```
Đoạn code trên có một bug "off-by-one" cơ bản. Chúng ta có thể sửa đổi chúng dễ dàng từ `>=` thành `>` (hoặc bạn có thể define lại *CART_TOO_BIG_LIMIT* thành 11):<br>
```if (shopping_cart.num_items() > CART_TOO_BIG_LIMIT) {```
<br><br>-- *Mình xin note luôn ở đây: bug off-by-one là lỗi mà coder rất hay thường gặp khi thực hiện một vòng lặp, trong đó mắc lỗi khi xét initial value để thực hiện là 0 hay 1, hoặc sử dụng dấu > hay >= không chính xác trong trường hợp so sánh một giá trị* :)<br><br>
Nhưng vấn đề gốc là *CART_TOO_BIG_LIMIT* là một tên mơ hồ — không rõ liệu bạn có ý nghĩa là “tối đa” hay là “tối đa và bao gồm”.

> ##### ADVICE: 
> ##### *Cách rõ ràng nhất để đặt một limit là đặt max_ hoặc min_ trước thứ mà bị giới hạn.*

Trong trường hợp này, tên nên là *MAX_ITEMS_IN_CART*. Code mới sẽ trông đơn giản và rõ ràng:
```
private static final int MAX_ITEMS_IN_CART = 10;
if (shoppingCart.numItems() > MAX_ITEMS_IN_CART) {
    error = "Too many items in cart.";
}
```
### Ưu tiên dùng first và last đối với "inclusive ranges"
![](https://images.viblo.asia/0e7de0ce-7015-4df2-86ca-c768fcedb0b6.png)
<br><br>
Dưới đây là một ví dụ khác mà bạn không thể biết đó là "tối đa" hay "tối đa và bao gồm":
```
int start = 2;
int stop = 4;
System.out.println(integerRange(start, stop));
// có phải nó in ra [2,3] hay là [2,3,4] (hay là thứ khác)?
```
Mặc dù *start* là một tên parameter hợp lý, nhưng *stop* có thể được diễn giải theo nhiều cách.<br>
Đối với các *inclusive* range như những ví dụ này (trong đó range phải bao gồm cả hai điểm giới hạn), một lựa chọn tốt là first/last. Ví dụ:
```
String first = "Bart";
String last = "Maggie";
setKeys(first, last);
```
Không giống như *stop*, từ *last* có nghĩa rõ ràng là được-bao-gồm.<br>
Ngoài *first/last*, tên *min/max* cũng có thể hoạt động cho các phạm vi "bao gồm", chúng cũng “nghe có vẻ đúng” trong ngữ cảnh trên.
### Ưu tiên dùng begin và end đối với "inclusive/exclusive ranges"
![](https://images.viblo.asia/2b156614-a12c-4930-b2eb-39d74924c21d.png)
<br><br>
Trong thực tiễn, việc sử dụng inclusive/exclusive ranges thường làm cho chúng ta cảm thấy thuận tiện hơn (để code). Ví dụ: nếu bạn muốn print tất cả các sự kiện đã xảy ra vào ngày 16 tháng 10, chúng ta sẽ thấy viết như này:<br>
```
printEventsInRange("OCT 16 12:00am", "OCT 17 12:00am")
```
sẽ dễ hơn là viết như này:<br>
```
printEventsInRange("OCT 16 12:00am", "OCT 16 11:59:59.9999pm")
```
Vậy một cặp tên tốt cho các parameter này là gì? Vâng, convention lập trình điển hình để đặt tên cho một inclusive/exclusive range là *begin/end*<br>
Nhưng từ *end* (trong tiếng Anh nói chung) có một chút mơ hồ. Ví dụ, trong câu “I’m at the end of the book,” , từ *end* là inclusive (chứ không phải là exclusive). Thật không may, tiếng Anh không có từ ngắn gọn cho “just past the last value.” ("chỉ cần bỏ qua giá trị cuối cùng").<br>
Bởi vì *begin/end* cũng thể hiện ý nghĩa khá rõ rệt rồi, nên đó là tùy chọn tốt nhất.
<br><br>
*(còn tiếp)*
#### Kết (P4)
Chương III mình xin phép được tách ra làm 2 topic vì nội dung của nó cũng khá là dài, từ chương này mình cảm thấy khá là khó khăn trong việc dịch một số thuật ngữ nên nếu thấy sai sót thì các bạn có thể để lại comment nhé :sweat_smile:
Hẹn gặp lại các bạn ở phần tới 😃 
<br> [Series Viết code "nghệ thuật"](https://viblo.asia/s/series-viet-code-nghe-thuat-o754jLL0ZM6)
<br> Tài liệu tham khảo: *The art of readable code by Dustin Boswell and Trevor Foucher*