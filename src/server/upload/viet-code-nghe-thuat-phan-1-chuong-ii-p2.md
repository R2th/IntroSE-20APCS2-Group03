# PHẦN 1: Những cải thiện ở mức độ surface
Chúng ta sẽ bắt đầu "chuyến tour" của sự dễ đọc bằng thứ mà chúng tôi gọi là những cải thiện ở mức độ surface, như là: chọn những tên(class, method, ...) tốt, viết những dòng comment tốt và format lại code một cách gọn gàng. Những việc làm này rất dễ áp dụng. Bạn chỉ cần "đặt đúng chỗ", mà không cần phải refactor lại code của bạn hoặc thay đổi cách mà chương trình chạy. Bạn có thể làm việc này nhiều dần lên mà không cần phải đầu tư một khoảng thời gian lớn.<br><br>
Những công việc này rất quan trọng vì chúng **ảnh hưởng đến mọi line code trong toàn bộ codebase của bạn**. Mặc dù mỗi thay đổi trông có vẻ nhỏ, nhưng tổng quan thì chúng có thể thực hiện một sự cải tiến rất lớn trong một codebase. Nếu code của bạn có một cái tên(class, method, ...) tốt, những comment được viết chỉnh chu và những whitespace (kí tự khoảng trống) được sử dụng hiệu quả, thì chắc chắn code của bạn sẽ dễ đọc hơn.<br><br>
Tất nhiên, còn nhiều thứ ở phía dưới mức độ surface mà có thể làm tăng khả năng đọc hiểu cho code (và chúng tôi sẽ đề cập đến ở những phần sau). Vì nội dung của phần này có thể được áp dụng rất rộng rãi chỉ với rất ít công sức, nên cũng rất đáng để được tìm hiểu đầu tiên.
## Chương II: Đóng gói thông tin thành tên

![](https://images.viblo.asia/cf8fdf48-9f33-4441-809b-b199810a4032.png)
<br>
<br>
Cho dù khi bạn đang đặt tên biến, tên function hay class thì nhiều nguyên tắc đều có thể áp dụng chung. Ở đây chúng tôi đang nghĩ đến những comment nhỏ, mặc dù khi code của bạn hiện không có nhiều chỗ trống, bạn vẫn có thể truyền đạt rất nhiều thông tin bằng cách chọn một cái tên tốt.
> ##### KEY IDEA: 
> ##### *Đóng gói thông tin thành tên (có ý nghĩa).*

Rất nhiều cái tên mà chúng ta hầu như thường thấy trong các chương trình đều rất mơ hồ, ví dụ như *tmp* (hồi sinh viên mình cũng suốt ngày viết từ này :D). Ngay cả những từ nghe cũng có vẻ hợp lý như *get* hoặc *size*, cũng không có khả năng đóng gói được nhiều thông tin. Chương này sẽ giúp bạn cách để đặt tên có nghĩa hơn.
Chương này bao gồm 6 chủ đề chính:
<br>
* Chọn từ ngữ cụ thể
<br>
* Tránh các tên chung (hoặc biết khi nào nên sử dụng chúng)
<br>
* Sử dụng tên cụ thể thay vì tên trừu tượng
<br>
* Gắn thêm thông tin vào tên, bằng cách sử dụng hậu tố hoặc tiền tố
<br>
* Quyết định độ dài của một tên
<br>
* Sử dụng định dạng tên để đóng gói thông tin bổ sung

### Chọn từ ngữ cụ thể

Một phần của "đóng gói thông tin vào tên" là lựa chọn những từ ngữ cụ thể và tránh những từ ngữ "trống rỗng".
Ví dụ, từ "get" là rất mơ hồ, như trong ví dụ này:
```
void getPage():
  ...
```
Từ "get" không thực sự nói lên điều gì cả. Có phải method này nhận được một page từ local cache, từ một database hay từ Internet? Nếu từ Internet, một tên cụ thể hơn có thể là
*fetchPage()* hoặc *downloadPage()*.
<br><br>
Dưới đây là ví dụ về class BinaryTree:
```
class BinaryTree {
  int size();
  ...
};
```
Bạn đang expect là method *size()* sẽ trả về cái gì? Chiều cao của một cái cây, số lượng các node, hay memory usage của cái cây?
Vấn đề là *size()* không truyền đạt nhiều thông tin. Một cái tên cụ thể hơn sẽ là *height()*, *numNodes()* hoặc *memoryBytes()*.

Ví dụ khác, giả sử bạn có một class Thread:
```
class Thread {
  void stop();
  ...
};
```
Tên stop() thì cũng không sao, nhưng nếu muốn biết chính xác nhiệm vụ của nó là gì, thì ở đây có một số cái tên cụ thể. Ví dụ: bạn có thể đặt tên nó là *kill()* nếu nó thực hiện một tác vụ mà không thể undone. Hoặc bạn có thể đặt tên nó là *pause()* nếu nó có thể được *resume()*.
<br>
<br>
#### Tìm những từ ngữ sinh động hơn

![](https://images.viblo.asia/dd5bb9a1-fbd8-498e-b91c-c92840bf9158.png)
<br>
Đừng ngại sử dụng từ đồng nghĩa, hoặc bạn có thể nhờ một người bạn đề xuất một tên tốt hơn. Tiếng Anh là một ngôn ngữ phong phú, và có rất nhiều từ để bạn lựa chọn.
Dưới đây là một số ví dụ về một từ, cũng như các phiên bản "đầy màu sắc" có thể áp dụng cho trường hợp của bạn:


| Từ gốc | Từ thay thế |
| -------- | -------- |
| send | deliver, dispatch, announce, distribute, route |
| find     | search, extract, locate, recover     |
| start    | launch, create, begin, open     |
| make     | create, set up, build, generate, compose, add, new     |

Tuy nhiên, đừng nên đi xa quá. Trong PHP, có một hàm để *explode()* một string. Đó là một cái tên khá "màu mè", và nó vẽ một bức tranh đẹp về việc phá vỡ một thứ gì đó thành nhiều mảnh, nhưng nó có gì khác biệt với *split()*? (Hai chức năng khác nhau, nhưng thật khó để đoán sự khác biệt của chúng dựa trên tên.)
> ##### KEY IDEA: 
> ##### *Sự rõ ràng và chính xác thì tốt hơn là sự "cute"* .
> 
### Tránh các tên chung như là tmp and retval

Các tên như *tmp*, *retval* và *foo* thường chẳng khác gì "Tôi chả nghĩ ra được cái tên gì cả". Thay vì sử dụng tên rỗng tuếch như thế này, hãy chọn tên mà có thể mô tả giá trị hoặc mục đích của entity.

Ví dụ, đây là một đoạn javascript sử dụng *retval*:
```
var euclidean_norm = function (v) {
 var retval = 0.0;
 for (var i = 0; i < v.length; i += 1)
 retval += v[i] * v[i];
 return Math.sqrt(retval);
};
```

Bạn có thể tạm thời sử dụng *retval* khi bạn không thể nghĩ ra tên tốt hơn cho return value của mình. Nhưng *retval* không chứa nhiều thông tin khác ngoài “Tôi là return value” đâu.
Một tên tốt hơn sẽ mô tả mục đích của biến hoặc value mà nó chứa. Trong trường hợp này, biến được tính là tổng bình phương của *v*. Vì vậy, một tên tốt hơn là *sum_squares*. Điều này sẽ công bố mục đích của biến phía trước và có thể giúp bắt lỗi.
<br><br>
Ví dụ, hãy tưởng tượng nếu bên trong vòng lặp có lỗi:
<br>
`  retval + = v[i];` // Lỗi của thằng nào thế này?!
<br>
Lỗi này sẽ rõ ràng hơn nếu tên là *sum_squares*:
<br>
`  sum_squares + = v[i];` // "Hình vuông" mà chúng ta đang tính tổng? Lỗi!
> ##### ADVICE: 
> ##### *retval không có cả năng đóng gói thông tin. Thay vào đó, hãy sử dụng tên mà mô tả được giá trị của biến.*

Tuy nhiên, có một số trường hợp những tên chung chung mang ý nghĩa đặc thù nào đó. Hãy xem xét thời điểm sử dụng chúng cho phù hợp
<br><br>

#### temp

Hãy xem xét một trường hợp cổ điển của việc hoán đổi hai biến:
```
if (right < left) {
 tmp = right;
 right = left;
 left = tmp;
}
```

Trong trường hợp như này, tên *tmp* là hoàn toàn OK. Mục đích duy nhất của biến là lưu trữ tạm thời, với tuổi thọ chỉ là một vài dòng. Tên *tmp* truyền tải ý nghĩa cụ thể cho người đọc — rằng biến này không có nhiệm vụ nào khác. Nó không được chuyển qua các function khác hoặc được tái sử dụng.
<br><br>
Nhưng đây là một trường hợp mà tmp được sử dụng một cách "lười biếng":
```
String tmp = user.name();
tmp += " " + user.phone_number();
tmp += " " + user.email();
...
template.set("user_info", tmp);
```
Mặc dù biến này có tuổi thọ ngắn, việc lưu trữ tạm thời không phải là điều quan trọng nhất đối với biến này. Thay vào đó, một tên như *user_info* sẽ diễn tả tốt hơn.
<br><br>
Trong trường hợp sau, tên biến cũng chứa từ *temp*, nhưng nó có chủ đích cụ thể:
```
tmp_file = tempfile.namedTemporaryFile()
...
saveData(tmp_file, ...)
```
Lưu ý rằng chúng ta nên đặt tên biến là *tmp_file* chứ không chỉ là *tmp*, bởi vì nó là một file object. Hãy tưởng tượng nếu chúng ta gọi nó là *tmp*:
```
saveData(tmp, ...)
```
Nếu chỉ xem xét một dòng code này, chúng ta sẽ không rõ *tmp* là file hay tên file, hoặc thậm chí là dữ liệu đang được ghi.
> ##### ADVICE: 
> ##### *tên tmp nên được chỉ sử dụng trong trường hợp vòng đời của nó ngắn và sự tạm thời là mô tả chính xác nhất về mục đích biến đó.*
<br>

#### Vòng lặp (Loop Iterators)

Những cái tên như *i, j, iter*: nó thường được sử dụng như các index trong vòng lặp. Mặc dù những cái tên này là chung chung, chúng được hiểu là “Tôi là một iterator”. (Thực tế, nếu bạn sử dụng một trong những tên này cho một mục đích nào khác, nó sẽ gây nhầm lẫn - vì vậy đừng làm điều đó!)

Nhưng đôi khi có những cái tên tốt hơn so với *i, j* và *k*. Ví dụ: các vòng lặp tìm thấy user nào thuộc về club nào:
```
for (int i = 0; i < clubs.size(); i++)
  for (int j = 0; j < clubs[i].members.size(); j++)
    for (int k = 0; k < users.size(); k++)
      if (clubs[i].members[k] == users[j])
        System.out.println ("user [" + j + "] is in club [" + i + "]");
```

Trong mềnh đề *if*, *members*[] và *users*[] đang sử dụng sai index. Lỗi như thế này rất khó phát hiện, nó sẽ rõ ràng hơn chỉ khi được tách ra để "ngẫm":

`if (club[i].members[k] == users[j])`

Trong trường hợp này, việc sử dụng tên chính xác hơn có thể hữu ích. Thay vì đặt tên các loop index *(i, j, k)*, thì một lựa chọn khác sẽ là *(club_i, members_i, users_i)* hoặc ngắn gọn hơn là *(ci, mi, ui)*. Cách tiếp cận này sẽ giúp lỗi nổi bật hơn:

`if (club[ci] .members[ui] == user[mi]) // NG! Các chữ cái đầu tiên không khớp.`

Khi được sử dụng đúng, chữ cái đầu tiên của index sẽ khớp với chữ cái đầu tiên của mảng:

`if (club[ci].members[mi] == user[ui]) // OK. Chữ cái đầu tiên khớp cmnr.`
<br>
<br>
#### Chốt lại cho những cái tên chung
Như bạn đã thấy, có một số tình huống mà tên chung hữu ích.

> ##### ADVICE: 
> ##### *Nếu bạn định sử dụng một tên chung chung như tmp, it, hoặc retval, hãy có lý do chính đáng để làm như vậy.*

Rất nhiều lần, chúng(*tmp*, *retval*, ...) bị lạm dụng từ sự lười biếng thuần khiết (của chúng ta). Điều này có thể hiểu được - khi không nghĩ được cái gì tốt hơn, bạn chỉ cần sử dụng một cái tên vô nghĩa như *foo* và tiếp tục. Nhưng nếu bạn có thói quen dành thêm vài giây để tìm ra một cái tên hay, bạn sẽ thấy "tư duy đặt tên" của bạn được xây dựng lên nhanh chóng.

### Ưu tiên những cái tên "cứng" hơn là những cái tên trừu tượng
![](https://images.viblo.asia/8ef12ab1-26c6-42ef-a31c-560753ef2ebf.png)
<br><br>
Khi đặt tên một biến, function hoặc element khác, hãy mô tả nó một cách chắc chắn hơn là trừu tượng.<br>
Ví dụ, giả sử bạn có một method có tên là serverCanStart() để kiểm tra xem máy chủ có thể lắng nghe trên một TCP/IP port đã cho hay không. Tuy nhiên, tên serverCanStart() có phần trừu tượng (vì có rất nhiều lý do để server-can-start :)). Một tên cụ thể hơn sẽ là canListenOnPort(). Tên này trực tiếp mô tả những gì method sẽ làm.<br>
Hai ví dụ tiếp theo sẽ minh họa khái niệm này sâu hơn.<br><br>
#### Ví dụ: DISALLOW_EVIL_CONSTRUCTORS
Dưới đây là ví dụ từ codebase của Google. Trong C++, nếu bạn không định nghĩa một copy constructor hoặc assignment operator cho class của bạn, thì một default constructor sẽ được cung cấp. Mặc dù nó tiện dụng, nhưng những method này có thể dễ dàng dẫn đến memory leak và các rủi ro khác vì chúng được thực thi ẩn (ở những chỗ bạn có thể chưa biết được).<br>
Kết quả là, Google có một convention để disallow các "evil" constructor (constructor "ác quỷ") này, bằng cách sử dụng macro:

```
class ClassName {
 private:
 DISALLOW_EVIL_CONSTRUCTORS(ClassName);
 public:
 ...
};
```

Macro này được định nghĩa như sau:
```
#define DISALLOW_EVIL_CONSTRUCTORS(ClassName) \
 ClassName(const ClassName&); \
 void operator=(const ClassName&);
```

Bằng việc đặt macro này trong *private:* , hai method này trở thành private và không thể sử dụng chúng.<br>
Tuy nhiên, tên *DISALLOW_EVIL_CONSTRUCTORS* không tốt lắm. Việc sử dụng từ "evil" (ác quỷ) truyền tải lập trường quá mạnh mẽ về một vấn đề. Quan trọng hơn, nó không làm rõ macro disallow cái gì. Nó disallow phương thức *operator=()* và thậm chí đây không phải là "constructor"! <br>
Tên đã được sử dụng trong nhiều năm nhưng cuối cùng đã được Google thay thế bằng một cái gì đó ít trừu tượng và cụ thể hơn:
```
#define DISALLOW_COPY_AND_ASSIGN(ClassName) ...
``` 
<br>

#### Ví dụ: --run_locally

Một trong các chương trình của chúng ta có một optional command-line flag tên là *--run_locally*. Flag này sẽ giúp chương trình in thêm thông tin debugging nhưng sẽ bị chạy chậm hơn. Flag thường được sử dụng khi test ở máy local, như laptop. Nhưng khi chương trình đang chạy trên một remote server, vì performance là rất quan trọng, nên flag đó không được sử dụng. 
<br>
Bạn có thể đã thấy ý nghĩa của *--run_locally*, và đây là một số vấn đề:
<br>
* Một member mới của team không biết nó dùng để làm gì. Anh ta chỉ biết sẽ dùng nó khi chạy ở local, nhưng anh ta không biết vì sao nó lại cần thiết.
<br>
* Thi thoảng, chúng ta cần in ra thông tin debugging khi chạy trên remote server. Việc truyền vào *--run_locally* khi chạy trên remote nhìn có vẻ quái dị và gây nhầm lẫn.
<br>
* Thỉnh thoảng, chúng ta chạy performance test ở local và không muốn logging làm chậm hệ thống. Vì vậy chúng ta sẽ không sử dụng *--run_locally*
<br>

Vấn đề là *--run_locally* được đặt tên theo trường hợp mà nó thường được sử dụng. Thay vào đó, tên flag như *--extra_logging* sẽ chính xác và rõ ràng hơn.<br>
Nhưng nếu *--run_locally* cần phải làm nhiều thứ hơn là chỉ cần logging? Ví dụ, giả sử rằng nó cần setup và sử dụng một local database đặc biệt. Bây giờ tên *--run_locally* dường như "hấp dẫn" hơn bởi vì nó có thể kiểm soát cả hai cùng một lúc.<br>
Nhưng có lẽ đó không phải là một ý tưởng hay, việc sử dụng *--run_locally* cho mục đích đó sẽ mơ hồ và gián tiếp. Giải pháp tốt hơn là tạo một flag thứ hai có tên là *--use_local_database*. Mặc dù bạn phải sử dụng hai flag một lúc, nhưng những flag này sẽ làm rõ ràng hơn nhiều. Chúng cung cấp cho bạn option chỉ cần sử dụng một cái và không nhất thiết phải sử dụng cái kia.

*(còn tiếp)*
#### Kết (P2)
Chương II mình xin phép được tách ra làm 2 topic vì nội dung của nó khá là dài, hẹn gặp lại các bạn ở phần tới :)
<br> [Series Viết code "nghệ thuật"](https://viblo.asia/s/series-viet-code-nghe-thuat-o754jLL0ZM6)
<br> Tài liệu tham khảo: *The art of readable code by Dustin Boswell and Trevor Foucher*