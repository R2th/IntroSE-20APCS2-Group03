Một trong những đối tượng chính của programming là `string`. Khi tiếp cận với bất cứ ngôn ngữ nào mới, thứ tự học của bạn có lẽ sẽ theo trình tự như sau: variable, assignment, string, operators... Rõ ràng xử lý chuỗi là việc không thể thiếu trong công cuộc kiếm cơm của dev chúng ta :)

Có 1 số tác vụ xử lý chuỗi thường gặp như: check match, replace,... Trong số đó có 1 vấn đề chung cần giải quyết là phải tìm cách xác định được 1 pattern nào đó trong string, tìm ra được phần mà bạn cần tương tác. Nhiều khả năng khi mới học lập trình bạn đã giải quyết vấn đề đó như thế này:

```C
int checkMatchStubPattern(char* string) {
    for(int i = 0; i < strlen(string); i++) {
        // logic for checking string pattern
        ...
    }
    return ...
}
```

Tất nhiên, không ai có thể thể nói cách làm của bạn không đúng - miễn là bạn có thể giải quyết vấn đề :)) Tuy nhiên trong thực tế những pattern trên string khá đa dạng và cần nhiều xử lý đặc biệt (VD: thay các địa chỉ email trong văn bản bằng ***). Bạn sẽ phải code nhiều hơn, tương đương với nguy cơ nhiều bug hơn, khó maintain hơn,... Và người ta đã tạo ra `Regular Expression - Regex` để giải quyết vấn đề trên. Có thể nói đây là một phát minh lớn giúp thay đổi hoàn toàn cách mà chúng ta tương tác với string. Dẫn chứng đơn giản nhất thể hiện sự tuyệt vời của nó là hầu như mọi ngôn ngữ hiện tại đều support sử dụng regex trong xử lý string.

>Biểu thức chính quy (tiếng Anh: regular expression, viết tắt là regexp, regex hay regxp) là một chuỗi miêu tả một bộ các chuỗi khác, theo những quy tắc cú pháp nhất định. Biểu thức chính quy thường được dùng trong các trình biên tập văn bản và các tiện ích tìm kiếm và xử lý văn bản dựa trên các mẫu được quy định. (nguồn từ Wikipedia)

Regex quả là 1 cách hiệu quả để giải quyết vấn đề liên quan đến string, thế nhưng regex lại đi kèm đến một vấn đề khác là nó thực sự khó tiếp cận (có lẽ do bản thân các pattern trên string khá phức tạp, bạn có thể nhận ra phần nào dựa vào ví dụ dưới đây).

![Đoạn regex để kiểm tra 1 chuỗi có phải là url hay không](https://i.imgur.com/nMveuD7.png)

Cú pháp rối mắt; khó đọc và khó hiểu là lý do lớn cản trở đến việc sử dụng regex. Chưa kể đến việc số lần cần sử dụng regex trong công việc là tương đối ít; chi phí RoI (return-on-investment) là quá lớn. Đến 80% những chuỗi regex thường hay sử dụng đều có thể tìm thấy dễ dàng trên mạng (mật khẩu, url, ip,...). Liệu bạn có sẵn sàng bỏ ra 1 vài tuần để học 1 thứ mà bạn biết là sẽ cực kỳ ít sử dụng và nhiều khả năng có thể tìm thấy câu trả lời ở trên internet không? Duy trì tư duy đó dẫn đến đa số việc các lập trình viên có xu hướng đi copy các đoạn regex sẵn có để sử dụng trong dự án của mình; ngay cả khi chuỗi đó không tồn tại trên mạng thì cũng cố gắng tìm 1 chuỗi gần đúng với yêu cầu nhất và sửa lại cho phù hợp với nhu cầu của mình. Thậm chí có trường hợp mất từ vài tiếng đến cả ngày trời tìm ra được 1 đoạn regex gần giống và sửa lại thay vì mất 1 tiếng tập trung nghiên cứu và tự viết đoạn regex phù hợp với yêu cầu của mình.

![In every angel a demon hides...](https://i.imgur.com/j3G9xyP.png)

Để giải quyết vấn đề đó thì có 1 cách khác hiệu quả hơn là [`Verbal Expressions`](http://verbalexpressions.github.io/); đây là 1 thư viện giúp đơn giản hoá việc xây dựng, hoặc có thể nói là thay thế cho việc viết regex. Thư viện mã nguồn mở hỗ trợ hầu hết các ngôn ngữ phổ biến (Java, C, JS...); và được cộng đồng đánh giá rất cao (JSVerbalExpressions có trên 10k stars trên github). 

```javascript
VerEx()
.startOfLine()
.then('http')
.maybe('s')
.then('://')
.anythingBut(' ')
.endOfLine();
``` 

Công dụng của đoạn code trên có lẽ các bạn đều đã hiểu; đầu tiên là 1 dòng mới và `http`, có thể có `s` hoặc không (vì `http` hay `https` đều được), cần thêm `://`, sau đó bất kỳ ký tự nào miễn không phải khoảng trống. Vậy là ta đã có thể match được 1 đoạn url rồi. Regex được sinh ra từ đoạn code trên là `/^(?:http)(?:s)?(?:\:\/\/)(?:[^ ]*)$/`, tuy có khác với đoạn regex ban đầu nhưng công dụng hoàn toàn như nhau.

VerbalExpressions đã giải quyết được vấn đề lớn nhất của regex là khó đọc, khó nhớ. Tiện lợi cũng như chúng ta chuyển từ viết query SQL sang dùng ORM vậy. Bên cạnh đó cú pháp đơn giản, dễ dùng và rất quen thuộc với lập trình viên; giúp người sử dụng có thể viết được đoạn code sinh ra regex cần thiết chỉ sau ít phút làm quen với VerbalExpressions.

Tuy nhiên VerbalExpressions có 1 nhược điểm là cần phải import thư viện vào mới sử dụng được; việc này có thể khá mất công nếu chỉ có 1 đoạn nhỏ cần xử lý. Chưa kể đối với những dự án mà khách hàng kiểm tra dependency sát sao thì có thể sẽ không được dùng. Trong trường hợp đó các bạn có thể sử dụng [VerbalRegex](https://verbalregex.com/) để code và sinh ra regex, sau đó sử dụng thư viện regex mặc định của ngôn ngữ là vấn đề sẽ được giải quyết.

![Công cụ online hỗ trợ xây dựng xây dựng regex](https://i.imgur.com/w0uMzYE.png)

Các bạn có thể sử dụng tool trên tại [verbalregex.com](https://verbalregex.com/).

VerbalExpressions không thể thay thế cho regex, cũng giống như ORM không thể thay cho những câu query được. Chúng ta vẫn cần phải sử dụng regex cho những trường hợp phức tạp. Tuy nhiên VerbalExpressions là 1 cách sử dụng regex gián tiếp hiệu quả và dễ dùng, đơn giản hoá việc xây dựng những đoạn regex "lạ" mà chúng ta "không may" gặp phải.