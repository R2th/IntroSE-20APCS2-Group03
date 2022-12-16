### Đặt tên cho biến boolean
Khi đặt tên cho một biến boolean hoặc cho một function mà return boolean, hãy chắc chắn rằng ý nghĩa *true* và *false* được thể hiện một cách rõ ràng.<br>
Đây là một ví dụ "nguy hiểm":
```
boolean read_password = true;
```
Tùy thuộc vào cách bạn đọc nó (không tính việc chơi chữ), thì có hai cách hiểu rất khác nhau:
* Chúng ta *cần* phải đọc password
* password *đã* được đọc rồi
<br>

Trong trường hợp này, tốt nhất là nên tránh từ "đọc", và thay vào đó hãy đặt tên là *need_password* hoặc *user_is_authenticated*.<br>
Nói chung, việc thêm các từ như *is*, *has*, *can* hoặc *should* có thể làm cho boolean rõ ràng hơn.<br>
Ví dụ, một function có tên *spaceLeft()* nghe có vẻ như là trả về một số. Nếu nó được dùng để trả về một boolean, thì một cái tên tốt hơn sẽ là *hasSpaceLeft()*.<br>
Và điều cuối cùng, tốt nhất nên tránh các thuật ngữ phủ định trong tên. Ví dụ, thay vì:
```
boolean disable_ssl = false;
```
thì viết như sau sẽ dễ đọc (và gọn) hơn:
```
boolean use_ssl = true;
```
### Phù hợp với những expectation của người đọc
Một số tên gây hiểu nhầm bởi vì người đọc có một ý tưởng định sẵn về ý nghĩa của tên, mặc dù ý của bạn không phải là như vậy. Trong những trường hợp này, cách tốt nhất là chỉ cần "nhượng bộ" (theo hướng suy nghĩ của người đọc) và thay đổi tên để không bị hiểu nhầm.<br><br>
#### Ví dụ: get*()
Nhiều lập trình viên đã quen với convention rằng các method bắt đầu bằng *get* là "những sự truy cập nhẹ", chỉ đơn giản là trả về một internal member. Đi ngược lại quy ước này có khả năng đánh lừa những người đọc nó.<br>
<br>
Đây là một ví dụ không tốt:
```
public class StatisticsCollector {
    public void addSample(double x) { ... }
    public double getMean() {
    // Iterate toàn bộ samples và return total / num_samples
    }
    ...
}
```
Trong trường hợp này, việc sử dụng *getMean()* là để gộp việc iterate dữ liệu và tính giá trị trung bình. Bước này có thể rất "đắt đỏ" nếu có nhiều dữ liệu! Nhưng một lập trình viên không biết có thể call *getMean()* một cách bất cẩn.<br>
Thay vào đó, nên đổi tên method thành một cái gì đó như *computeMean()*, nghe có vẻ giống như một hoạt động "đắt đỏ" (vì là "compute" cơ mà:grinning:). (Hoặc cách khác, nội dung method nên được viết lại để thể hiện thực sự là một "sự truy cập nhẹ".)<br><br>
#### Ví dụ:  list::size()
Dưới đây là một ví dụ từ Thư viện chuẩn C++. Đoạn mã sau đây là nguyên nhân của một lỗi rất-khó-tìm-ra, khiến một trong các máy chủ của chúng tôi bị chậm khi thu thập dữ liệu:
```
void ShrinkList(list<Node>& list, int max_size) {
 while (list.size() > max_size) {
 FreeNode(list.back());
 list.pop_back();
 }
}
```
"Bug" mà tác giả không biết chính là việc *list.size()* là một *O(n)* operation—nó đếm xuyên qua linked list từng node một, thay vì chỉ trả về số đếm được tính trước, làm cho *ShrinkList()* trở thànhmột *O(n^2)* operation.<br>
Đoạn code về mặt kỹ thuật là "chính xác", và sự thật là nó pass được toàn bộ unit tests của chúng tôi. Nhưng khi *ShrinkList()* được truyền vào 1 list có một triệu phần tử, thì nó phải mất hơn một giờ để hoàn thành!<br>
Có lẽ bạn đang suy nghĩ, "đó là lỗi của người sử dụng nó—anh ta hoặc cô ta nên đọc tài liệu cẩn thận hơn". Điều đó là đúng, nhưng trong trường hợp này, việc *list.size()* là một operation mà không phải là constant-time, là điều đáng-ngạc-nhiên. Tất cả các containers khác trong C++ đều có một method *size()* là constant-time. <br>
Nếu *size()* được đặt tên là *countSize()* hoặc *countElements()*, thì lỗi tương tự sẽ ít xảy ra hơn. Các tác giả của Thư viện chuẩn C++ có lẽ muốn đặt tên method *size()* để tương tự với tất cả các container khác như *vector* and *map*. Nhưng chính vì họ làm thế, nên những lập trình viên sẽ dễ dàng nhầm lẫn nó là một fast operation, cách mà nó thực hiện như ở trong các container khác. Rất may, tiêu chuẩn C++ mới nhất hiện nay bắt buộc *size()* là *O(1)*.<br><br>
#### Ví dụ: *Ai là Wizard?*
Cách đây một thời gian, một trong những tác giả đã cài đặt hệ điều hành OpenBSD. Trong bước disk formatting, một menu phức tạp xuất hiện, yêu cầu disk parameters. Một trong những option là vào chế độ *“Wizard mode”*. Ông cảm thấy nhẹ nhõm khi tìm thấy tùy chọn "thân thiện với người dùng" này và chọn nó. Và thật đắng mề :D , nó thả trình cài đặt (installer) vào một low-level prompt và chờ các lệnh disk formatting thủ công, và không có cách nào rõ ràng để thoát khỏi nó. Hiển nhiên  “wizard” có nghĩa là bạn phải là wizard!
### Ví dụ: Đánh giá những cái tên đang là "ứng viên" để lựa chọn sử dụng
Khi quyết định chọn một cái tên tốt, bạn có thể có nhiều sự lựa chọn mà bạn đang xem xét. Bạn thường phải suy nghĩ về giá trị của những cái tên trước khi đưa ra quyết định chọn lựa cuối cùng. Ví dụ sau đây sẽ minh hoạ quá trình suy nghĩ này:<br>
Các trang web có lưu lượng truy cập cao thường sử dụng các "experiment" để kiểm tra xem một thay đổi đối với trang web có cải thiện khả năng hoạt động của nó hay không. Dưới đây, một ví dụ về file config để điều khiển một số experiment:
```
experiment_id: 100
description: "increase font size to 14pt"
traffic_fraction: 5%
...
```
Mỗi experiment được xác định bởi khoảng 15 cặp attribute/value. Thật không may, khi define một experiment khác tương tự, bạn phải copy và paste hầu hết các dòng đó:
```
experiment_id: 101
description: "increase font size to 13pt"
[các dòng khác giống hệt với experiment_id 100]
```
Giả sử chúng ta muốn khắc phục vấn đề này bằng cách nghĩ ra một giải pháp, để một experiment có thể sử dụng lại các thuộc tính từ một experiment khác. (đây là "prototype inheritance" pattern). Kết quả cuối cùng là bạn sẽ viết kiểu như thế này:
```
experiment_id: 101
the_other_experiment_id_I_want_to_reuse: 100
[thay đổi bất kì thuộc tính nào nếu cần]
```
Câu hỏi ở đây là: *the_other_experiment_id_I_want_to_reuse* nên được đặt tên là gì?<br>
Có 4 cái tên được cân nhắc:
1. template
2. reuse
3. copy
4. inherit

Bất kỳ tên nào trong số này cũng có nghĩa đối với chúng ta, bởi vì chúng ta là những người duy nhất thêm tính năng mới này vào ngôn ngữ cấu hình (config language). Nhưng chúng ta phải tưởng tượng cái tên đó sẽ được hiểu như thế nào đối với người mới đọc code và không biết về tính năng này. Vì vậy hãy phân tích từng cái tên, suy nghĩ về cách ai đó có thể hiểu nhầm về nó.
1. Giả sử chúng ta dùng tên *template*:
```
experiment_id: 101
template: 100
...
```
*template* có một vài vấn đề.  Đầu tiên, nó không rõ ràng trong việc thể hiện là "Tôi là một (attribute) template" hay là "Tôi đang sử dụng một template khác". Thứ hai, từ “template” thường là một cái gì đó *abstract*, nó phải được "điền vào" trước khi nó được sử dụng (vì template là "khuôn mẫu" mà). Và người ta có thể nghĩ rằng, đã là một templated experiment thì không gọi là experiment "thật sự" (vì đã là "khuôn mẫu được điền sẵn" thì còn gì gọi là chức năng "trải nghiệm" nữa :)).<br>

2.  Vậy còn *reuse* thì sao:
```
experiment_id: 101
reuse: 100
...
```
*reuse* là một từ okay, nhưng khi viết ra rồi thì người ta cũng có thể nghĩ nó có nghĩa là “Experiment này có thể được tái sử dụng nhiều nhất là 100 lần.”  Thay đổi tên thành *reuse_id* có thể khá hơn, nhưng một người đọc có thể bối rối và nghĩ rằng *reuse_id: 100* có nghĩa là “Id của thuộc tính reuse là 100 (reuse_id được hiểu là attribute giống experiment_id và không mang ý nghĩa là sử dụng lại ở chỗ khác).”<br>

3.  Thử cân nhắc *copy* nào:
 ```
 experiment_id: 101
copy: 100
```
*copy* là một từ tốt.  Nhưng cũng vì ý nghĩa của nó, *copy: 100* như thể nói rằng "copy experiment này 100 lần", hay  “đây là bản sao thứ 100 của một thứ gì đó “. Để làm rõ mục đích là để refer đến experiment khác, chúng ta có thể thay đổi tên thành *copy_experiment*. Đây có lẽ là cái tên tốt nhất cho đến lúc này.

4.  Và bây giờ đến *inherit*:
```
experiment_id: 101
inherit: 100
...
```
Từ *inherit* khá quen thuộc với hầu hết các lập trình viên, và nó được hiểu là sau khi kế thừa thì bạn có thể tùy biến lại được nội dung. Với class kế thừa, bạn sẽ lấy được toàn bộ method và các member của một class khác và sau đó có thể modify hoặc add thêm thành phần bên trong. Ngay cả trong cuộc sống, khi bạn thừa hưởng tài sản từ người thân, nó đã được hiểu là bạn có thể bán chúng hoặc tự ý làm những việc gì khác trên tài sản đó.<br>
Nhưng một lần nữa, chúng ta hãy làm cho nó rõ ràng rằng, chúng ta đang muốn kế thừa từ một experiment khác. Chúng ta có thể cải thiện tên bằng cách thay đổi tên là *inherit_from* hoặc *inherit_from_experiment_id*<br>
Nhìn chung, *copy_experiment* và *inherit_from_experiment_id* là những cái tên hay nhất, bởi vì chúng mô tả rõ ràng nhất những gì xảy ra và ít có khả năng bị hiểu lầm.
### Tổng kết
* Những cái tên hay nhất là những cái tên mà không thể hiểu sai—người đọc code của bạn sẽ hiểu nó theo cách bạn muốn nói, và không còn hiểu được theo cách nào khác. Thật không may, rất nhiều từ tiếng Anh không rõ ràng khi nói về lập trình, chẳng hạn như *filter*, *length*, và *limit*..
* Trước khi bạn quyết định đặt một cái tên, hãy tưởng tượng tên mà bạn sử dụng có thể bị hiểu lầm như thế nào. Những cái tên tốt nhất có khả năng kháng lại được việc giải thích sai.
* Khi cần xác định giới hạn trên hoặc dưới cho một giá trị, *max* và *min* là tiền tố tốt để sử dụng. Đối với inclusive range, *first* và *last* là tốt. Đối với  inclusive/exclusive range, *begin* và *end* là tốt nhất bởi vì từ đó thể hiện đặc tính rõ rệt
* Khi đặt tên cho một boolean, sử dụng những từ như *is* hoặc *has* để làm cho cho nó rõ hơn việc nó là boolean. Tránh những thuật ngữ phủ định (e.g., *disablessl*).
* Coi chừng những expectation của người đọc về những từ nhất định. Ví dụ: người dùng có thể expect *get()* hoặc *size()* là các "method nhẹ". <br><br>

#### Kết (P5)
Chương III đến đây là kết thúc, ở phần tiếp theo mình sẽ giới thiệu chương IV của cuốn sách, hẹn gặp lại các bạn ở phần sau :)
<br> [Series Viết code "nghệ thuật"](https://viblo.asia/s/series-viet-code-nghe-thuat-o754jLL0ZM6)
<br> Tài liệu tham khảo: *The art of readable code by Dustin Boswell and Trevor Foucher*