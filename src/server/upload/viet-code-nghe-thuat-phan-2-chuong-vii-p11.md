# PHẦN 2: Đơn giản hóa các vòng lặp và logic
Trong Phần I, chúng tôi đã đề cập đến những cải thiện ở mức độ surface—các cách đơn giản để cải thiện khả năng đọc của code, có thể áp dụng tại những chỗ mà không gặp nhiều risk hoặc tốn nhiều effort.<br>
Trong phần tiếp theo này, chúng ta sẽ đi sâu hơn và thảo luận về “các vòng lặp và logic" trong chương trình của bạn:  control flow, logical expressions và các biến, những thứ làm cho code của bạn hoạt động. Vẫn như mọi khi, mục tiêu của chúng tôi là làm cho các phần code của bạn trở nên dễ hiểu hơn.<br>
Chúng tôi làm điều này bằng cách cố gắng để giảm thiểu "mental baggage" (nôm na là những thứ mà phải đau đầu suy nghĩ) trong code của bạn. Mỗi khi bạn nhìn thấy một vòng lặp phức tạp, một biểu thức khổng lồ hoặc một số lượng lớn các biến, điều này sẽ thêm vào "mental baggage" trong đầu bạn. Nó đòi hỏi bạn phải suy nghĩ nhiều hơn và nhớ nhiều hơn. Điều này hoàn toàn trái ngược với việc "dễ dàng để hiểu". Khi code chứa quá nhiều "mental baggage", các bugs trở nên khó được phát hiện hơn, code trở nên khó thay đổi hơn và sẽ kém vui hơn khi làm việc với code như vậy.
## Chương VII: Làm cho Control Flow dễ đọc
![](https://images.viblo.asia/dac7346b-9913-4d70-b531-6fcb75d3defb.png)
<br>
<br>
Nếu code không có điều kiện, vòng lặp hoặc bất kỳ *control flow* statement nào khác, nó sẽ rất dễ đọc. Còn jump và branch là những thứ mà code có thể gây nhầm lẫn nhanh chóng. Chương này sẽ nói về việc làm control flow trong code của bạn dễ đọc.
> ##### KEY IDEA: 
> ##### *Thực hiện tất cả các điều kiện, vòng lặp và các thay đổi khác trong control flow càng "tự nhiên" càng tốt—viết theo cách mà không làm cho người đọc phải dừng lại và đọc lại code.*

### Thứ tự của các tham số trong điều kiện
Code nào dễ đọc hơn:
```
if (length >= 10)
```
hay là
```
if (10 <= length)
```
Đối với đa số lập trình viên, code đầu tiên dễ đọc hơn. Nhưng đối với trường hợp này thì sao:
```
while (bytes_received < bytes_expected)
```
hay là
```
while (bytes_expected > bytes_received)
```
Một lần nữa, code đầu tiên dễ đọc hơn. Nhưng tại sao? Rule là gì? Làm thế nào để bạn quyết định `a > b` sẽ tốt hơn là `b > a`? <br>
Dưới đây là một guideline chúng tôi đã tìm thấy, khá hữu ích:
| Vế trái| Vế phải |
| -------- | -------- |
| Những biến có value động | Giá trị được compare, thường có value tĩnh |
<br>
Guideline này tương ứng với cách sử dụng Tiếng Anh—Sẽ là bình thường nếu nói "Nếu bạn kiếm được ít nhất 100k đô la 1 năm" hoặc "Nếu bạn có tối thiểu 18 tuổi". Nó sẽ bất thường nếu nói "Nếu 18 tuổi nhỏ hơn hoặc bằng tuổi bạn".<br>
Điều này giải thích tại sao `while (bytes_received < bytes_expected)`dễ đọc hơn. `bytes_received` là giá trị đang được check và nó tăng lên mỗi khi vòng lặp thực thi. *bytes_expected* là giá trị "ổn định" hơn khi được so sánh.
<br><br>

#### Ví dụ: “YODA NOTATION” (đảo thứ tự trong mệnh đề if): Có còn hữu ích không?
Trong một số ngôn ngữ, sẽ là hợp lệ khi đặt một assignment trong một điều kiện if:
```
if (obj = NULL) ...
```
Rất có thể đây là một bug và ý của lập trình viên thực ra là:
```
if (obj == NULL) ...
```
Để ngăn chặn các bug như thế này, nhiều lập trình viên đã **thay đổi thứ tự của tham số:**
```
if (NULL == obj) ...
```
Bằng cách này, nếu `==` vô tình viết thành`=`, biểu thức `if (NULL = obj)`thậm chí sẽ không được compile.<br>
Thật không may, chuyển đổi thứ tự như vậy sẽ làm cho code khó đọc hơn. Nhưng rất may là các compiler hiện nay đều có warn các code như `if (obj = NULL)`, vì vậy *Yoda Notation* đã trở thành dĩ vãng.
### Thứ tự của các khối if/else
![](https://images.viblo.asia/39bff37b-fd03-48e4-a053-3daf487f045e.png)
<br>
<br>
Khi viết một *if/else* statement, bạn thường có quyền tự do trao đổi thứ tự của các khối. Chẳng hạn, bạn có thể viết nó như sau:
```
if (a == b) {
     // Case One ...
} else {
     // Case Two ...
}
```
hoặc là
```
if (a != b) {
     // Case Two ...
} else {
     // Case One ...
}
```
Bạn có thể không nghĩ nhiều về điều này trước đây, nhưng trong một số trường hợp, có những lý do chính đáng để lựa chọn một order:
* Ưu tiên xử lý trường hợp *khẳng định* thay vì phủ định, ví dụ:  *if (debug)* thay vì *if (!debug).*
* Ưu tiên xử lý các trường hợp *đơn giản* trước để giải quyết vấn đề. Cách tiếp cận này cũng có thể cho phép cả *if* và *else* hiển thị trên màn hình cùng một lúc, điều này rất tốt.
* Ưu tiên xử lý trường hợp *thú vị* (đặc biệt) hơn hoặc dễ thấy hơn trước.

Đôi khi những phương pháp này mâu thuẫn, và bạn phải thực hiện một sự lựa chọn. Nhưng trong nhiều trường hợp, sẽ có một sự lựa chọn "chiến thắng" rõ ràng.<br>
Ví dụ, giả sử bạn có một web server đang xử lý một *response* dựa trên việc URL chứa query parameter là *expand_all*:
```
if (!url.hasQueryParameter("expand_all")) {
     ...
} else {
    for (int i = 0; i < items.size(); i++) {
        items[i].expand();
    }
    ...
}
```
Khi người đọc liếc vào dòng đầu tiên, não họ ngay lập tức nghĩ về trường hợp *expand_all*. Nó giống như khi ai đó nói, “Đừng nghĩ về một con voi màu hồng.” Bạn không thể không nghĩ về nó—từ “đừng” bị lấn át bởi thứ đặc biệt hơn là “con voi màu hồng.”<br>
Ở đây, *expand_all* là con voi màu hồng của chúng tôi. Bởi vì nó là trường hợp thú vị hơn (và nó cũng là trường hợp khẳng định), vậy nên hãy xử lý nó trước:
```
if (url.hasQueryParameter("expand_all")) {
    for (int i = 0; i < items.size(); i++) {
        items[i].expand();
    }
    ...
} else {
    ...
}
```
Mặt khác, đây là một tình huống mà trong đó trường hợp phủ định là trường hợp đơn giản và thú vị/nguy hiểm hơn, vì vậy chúng tôi xử lý nó trước:
```
if (!isFile(path)) {
    // Log the error ...
} else {
    // ...
}
 ```
 Một lần nữa, phải phụ thuộc vào detail thì bạn mới có thể đưa ra được quyết định cuối cùng (là chọn cách nào).<br>
Nói tóm lại, lời khuyên của chúng tôi chỉ đơn giản là phải chú ý đến những trường hợp mà *if/else* đang có trật tự không ổn.
### Biểu thức điều kiện ?: (hay còn gọi là “Ternary Operator”)
Bạn có thể viết biểu thức điều kiện `cond ? a : b` như là một cách viết ngắn gọn cho `if (cond) { a } else { b }.` <br>
Ảnh hưởng của nó đến khả năng đọc hiện đang gây tranh cãi. Những người đề xướng nghĩ rằng đó là một cách hay để tóm gọn một cái gì đó trong một dòng mà nếu không thì sẽ cần nhiều dòng. Những người phản đối lập luận rằng nó có thể gây nhầm lẫn khi đọc và khó debug.<br>
Đây là một trường hợp mà ternary operator dễ đọc và nhỏ gọn:
```
time_str += (hour >= 12) ? "pm" : "am";
```
Nếu không dùng ternary operator, bạn có thể viết là:
```
if (hour >= 12) {
    time_str += "pm";
} else {
    time_str += "am";
}
```
Viết như cách dưới thì nhìn có chút dư thừa. Trong trường hợp này, ternary operator có vẻ hợp lý.<br>
Tuy nhiên, biểu thức này có thể nhanh chóng trở nên khó đọc:
```
return exponent >= 0 ? mantissa * (1 << exponent) : mantissa / (1 << -exponent);
```
Ở đây, ternary operator không còn chỉ là lựa chọn giữa hai giá trị đơn giản. Động lực để viết code như thế này thường là để "vắt kiệt mọi thứ trên một dòng" (bất chấp mọi thứ:sweat_smile:).
> ##### KEY IDEA: 
> ##### *Thay vì giảm thiểu số lượng dòng, lựa chọn tốt hơn là giảm thiểu thời gian cần thiết để ai đó hiểu nó.*
> 


Tách logic bằng câu lệnh *if/else* làm cho code trở nên tự nhiên hơn:
```
if (exponent >= 0) {
    return mantissa * (1 << exponent);
} else {
    return mantissa / (1 << -exponent);
}
```
> ##### ADVICE: 
> ##### *Mặc định, hãy sử dụng if/else. Ternary Operator chỉ nên được sử dụng cho những case đơn giản nhất.*
> 
### Tránh sử dụng do/while
![](https://images.viblo.asia/35e12ced-6d73-4261-a207-db763b1fc674.png)
<br>
<br>
Nhiều ngôn ngữ lập trình, có một vòng lặp `do { expression } while (condition)`, *expression* được thực hiện ít nhất một lần. Dưới đây là một ví dụ:
```
// Search through the list, starting at 'node', for the given 'name'.
// Don't consider more than 'max_length' nodes.
public boolean ListHasNode(Node node, String name, int max_length) {
    do {
        if (node.name().equals(name))
            return true;
        node = node.next();
    } while (node != null && --max_length > 0);
    
    return false;
}
```
Điều lạ lùng về vòng lặp *do/while* là một block code có thể được hoặc không được thực thi dựa trên một điều kiện bên dưới nó. Thông thường, các điều kiện logic nằm trên code mà chúng bao quát—đây là cách nó hoạt động với *if*, *while* và *for* loop. Bởi vì bạn thường đọc code từ trên xuống dưới, điều này làm *do/while* hơi "không được tự nhiên". Nhiều người đọc đã phải đọc code hai lần mới hiểu.<br>
*while* loop dễ đọc hơn vì bạn biết điều kiện lặp trước khi bạn đọc block code bên trong. Nhưng sẽ thật ngớ ngẩn khi duplicate code chỉ để xóa một *do/while*:
```
// Imitating a do/while — DON'T DO THIS!
body

while (condition) {
    body (again)
}
```
May mắn thay, trong thực tế, hầu hết các vòng lặp *do/while* có thể được viết như vòng lặp *while*:
```
public boolean ListHasNode(Node node, String name, int max_length) {
    while (node != null && max_length-- > 0) {
            if (node.name().equals(name)) return true;
            node = node.next();
    }
    return false;
}
```
Phiên bản này cũng có lợi ích là nó vẫn hoạt động nếu *max_length* là 0 hoặc nếu *node* là *null*.<br>
Một lý do khác để tránh dùng *do/while* là câu lệnh *continue* có thể gây nhầm lẫn. Ví dụ, đoạn code này làm gì?
```
do {
    continue;
} while (false);
```
Nó lặp đi lặp lại mãi mãi hay chỉ một lần? Hầu hết các lập trình viên phải dừng lại và suy nghĩ về nó. (Nó nên lặp lại một lần.)<br>
Nhìn chung, Bjarne Stroustrup, cha đẻ của C ++, đã nói rằng (trong *The C++ Programming Language*):<br>
*"Theo kinh nghiệm của tôi, do-statement là một nguyên nhân gây ra lỗi và nhầm lẫn. Tôi thích điều kiện mà "tôi có thể nhìn thấy nó ở phía trước". Do đó, tôi có xu hướng tránh các do-statement."*
<br><br>
*(còn tiếp)*
#### Kết (P11)
Chương VII mình xin phép được tách ra làm 2 topic vì nội dung của nó cũng khá là dài, hẹn gặp lại các bạn ở phần tới 😃 
<br> [Series Viết code "nghệ thuật"](https://viblo.asia/s/series-viet-code-nghe-thuat-o754jLL0ZM6)
<br> Tài liệu tham khảo: *The art of readable code by Dustin Boswell and Trevor Foucher*