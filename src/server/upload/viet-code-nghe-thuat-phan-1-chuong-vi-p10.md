## Chương VI: Tạo comment chính xác và gọn gàng
![](https://images.viblo.asia/a0a577d2-d1eb-4885-b504-d79e65f65cb8.png)
<br><br>
Chương trước nói về việc biết được *những gì* bạn nên comment. Chương này nói về *cách* để viết những comment chính xác và gọn gàng.<br>
Nếu bạn đang định viết bất kì một comment nào đó, nó có thể rất *chính xác*—cụ thể và chi tiết nhất có thể. Nhưng mặt khác, các comment chiếm thêm không gian trên màn hình và tốn thêm thời gian để đọc. Vì vậy, comment cũng nên được *gọn gàng*.
> ##### KEY IDEA: 
> ##### ***Các comment nên có tỉ lệ thông-tin/không-gian tốt.***
Phần còn lại của chương này sẽ cho thấy các ví dụ về cách làm điều này.
### Làm cho comment gọn gàng
Đây là một ví dụ về một comment định nghĩa biến:
```
// The Integer is the CategoryType.
// The Float float in the inner pair is the 'score',
// the Float is the 'weight'.
HashMap<Integer, Pair<Float, Float>> ScoreMap;
```
Nhưng tại sao phải sử dụng những ba dòng để giải thích nó, trong khi bạn có thể minh họa nó chỉ trong một dòng?
```
// CategoryType -> (score, weight)
HashMap<Integer, Pair<Float, Float>> ScoreMap;
```
Thực ra có những comment phải cần 3 line để giải thích, nhưng không phải trường hợp này.
### Tránh những đại từ mơ hồ
Giống như tiểu phẩm cổ điển “Who’s on First?” , đại từ có thể làm cho mọi thứ rất khó hiểu.<br>
Thực sự là phải mất thêm công sức để người đọc "giải quyết" một đại từ. Và trong một số trường hợp, không rõ ràng là "it" hay "this" đang đề cập về cái gì. Dưới đây là một ví dụ:
```
// Insert the data into the cache, but check if it's too big first.
```
Trong comment này, "it" có thể đề cập đến data hoặc cache. Bạn có thể có thể xác nhận điều đó bằng cách đọc phần còn lại của code. Nhưng nếu bạn phải làm điều đó, thì comment còn có tác dụng gì nữa?<br>
Điều an toàn nhất là hãy "điền thay thế vào" các đại từ, nếu có bất kỳ khả năng gây nhầm lẫn nào. Trong ví dụ trước, cho rằng "it" là "the data":
```
// Insert the data into the cache, but check if the data is too big first.
```
Đây là thay đổi đơn giản nhất để thực hiện. Bạn cũng có thể cấu trúc lại câu văn để làm cho "it" hoàn toàn rõ ràng:
```
// If the data is small enough, insert it into the cache.
```
### Những câu dài dòng văn tự
Trong nhiều trường hợp, việc đưa ra một comment chính xác hơn sẽ đi đôi với việc làm cho nó nhỏ gọn hơn.<br>
Đây là một ví dụ từ một trình thu thập dữ liệu web (web crawler):
```
// Depending on whether we've already crawled this URL before, give it a different priority.
```
Câu này có vẻ ổn, nhưng so sánh nó với cái này:
```
// Give higher priority to URLs we've never crawled before.
```
Câu này đơn giản hơn, nhỏ hơn và chính xác hơn. Nó cũng giải thích rằng mức độ ưu tiên *cao hơn* được dành cho các URL chưa được crawled. Comment trước đó không có chứa thông tin đó.
### Mô tả chính xác behavior của function
Hãy tưởng tượng bạn vừa mới viết một function đếm số dòng trong một file:
```
// Return the number of lines in this file.
int countLines(String filename) { ... }
```
Comment này không chính xác lắm (thực ra là chưa đầy đủ), có rất nhiều cách để xác định một "line". Đây là một số trường hợp cần suy nghĩ:
* "" (một file rỗng)—0 hay 1 line?
* "hello"—0 hay 1 line?
* "hello\n"—1 hay 2 line?
* "hello\n world"—1 hay 2 line?
* "hello\n\r cruel\n world\r"—2, 3, hay 4 line?

Cách thực hiện đơn giản nhất là đếm số lượng ký tự dòng mới (*\n*). (Đây là cách hoạt động của lệnh *wc* trong Unix.) Đây là một comment tốt hơn để phù hợp với implementation này:
```
// Count how many newline bytes ('\n') are in the file.
int countLines(String filename) { ... }
```
Comment này dài hơn không nhiều so với phiên bản đầu tiên, nhưng lại chứa nhiều thông tin hơn. Nó cho người đọc biết rằng function có thể trả về 0 nếu không có dòng mới. Nó cũng cho người đọc biết rằng *\r* bị bỏ qua.
### Sử dụng các ví dụ Input/Output để minh họa
Khi được đặt trong comment, một ví dụ input/output nếu được lựa chọn cẩn thận thì có thể đáng giá cả ngàn từ.<br>
Ví dụ, ở đây, một function loại bỏ các phần của một string:
```
// Remove the suffix/prefix of 'chars' from the input 'src'.
String strip(String src, String chars) { ... }
```
Nhận xét này không phải là rất chính xác bởi vì nó không thể trả lời những câu hỏi như:
* *Chars* có phải là nguyên một chuỗi cần được loại bỏ hay chỉ là một tập hợp các chữ cái không có thứ tự?
* Điều gì xảy ra nếu có nhiều *chars* ở cuối *src*?

Thay vào đó, một ví dụ được lựa chọn tốt có thể trả lời những câu hỏi đó:
```
// ...
// Example: strip("abba/a/ba", "ab") returns "/a/"
String Strip(String src, String chars) { ... }
```
Ví dụ đã "show" toàn bộ tính năng của *strip()*. Lưu ý rằng một ví dụ đơn giản sẽ không phải là hữu ích, nếu nó không trả lời những câu hỏi trên:
```
// Example: strip("ab", "a") returns "b"
```
Dưới đây là một ví dụ khác về function có thể sử dụng sự minh họa:
```
// Rearrange 'v' so that elements < pivot come before those >= pivot;
// Then return the largest 'i' for which v[i] < pivot (or -1 if none are < pivot)
int partition(Vector<Integer> v, int pivot);
```
Comment này thực sự rất chính xác, nhưng hơi khó để hình dung. Dưới đây là một ví dụ bạn có thể đưa vào để minh họa mọi thứ dễ hơn:
```
// ...
// Example: Partition([8 5 9 8 2], 8) might result in [5 2 | 8 9 8] and return 1
int partition(Vector<Integer> v, int pivot);
```
Có một số point về ví dụ input/output cụ thể mà chúng tôi đã chọn:
* Giá trị pivot bằng với một số phần tử trong vector để minh họa cho edge case.
* Chúng tôi duplicate giá trị 8 trong vector để minh họa rằng đây là một input chấp nhận được.
* Kết quả của vector sau khi phân tách không được sắp xếp lại—vì nếu có, người đọc có thể hiểu sai.
* Vì giá trị trả về là 1, nên chúng tôi đảm bảo rằng 1 cũng không là một giá trị trong vector—điều đó sẽ có thể gây nhầm lẫn.

(mình đang hiểu nôm na là cái method này sẽ trả về vị trí của phần tử có giá trị lớn nhất mà nhỏ hơn pivot sau khi cái vector kia được xử lý phân tách:sweat_smile:)
### Nêu ra ý định của code
Như chúng ta đã đề cập trong chương trước, comment thường là nói cho người đọc biết bạn đang nghĩ gì khi viết code. Thật không may, nhiều comment cuối cùng chỉ mô tả những gì code làm theo nghĩa đen, mà không thêm được nhiều thông tin mới.<br>
Đây là một ví dụ về comment như thế:
```
void DisplayProducts(list<Product> products) {
     products.sort(CompareProductByPrice);
     
         // Iterate through the list in reverse order
         for (list<Product>::reverse_iterator it = products.rbegin(); it != products.rend();
         ++it)
             DisplayPrice(it->price);
         ...
}
```
Những gì comment này làm là chỉ để mô tả dòng dưới của nó. Thay vào đó, hãy cân nhắc comment này:
```
// Display each price, from highest to lowest
 for (list<Product>::reverse_iterator it = products.rbegin(); ... )
```
Comment này giải thích những gì chương trình đang làm ở mức độ cao hơn. Điều này phù hợp hơn nhiều với những gì lập trình viên đã nghĩ khi họ viết code.<br>
Thật thú vị, có một bug trong chương trình này! Function *CompareProductByPrice* (không hiển thị) đã sắp xếp các item có giá cao hơn lên trước rồi. Cách mà code đang làm ngược lại với những gì tác giả dự định.<br>
Đây là một lý do tốt để chứng minh tại sao comment thứ hai là tốt hơn. Mặc dù có bug, comment đầu tiên là đúng về mặt kỹ thuật (vòng lặp không lặp theo thứ tự ngược lại). Nhưng với comment thứ hai, một người đọc có nhiều khả năng nhận thấy rằng ý định của người viết (để hiển thị các mặt hàng có giá cao hơn trước) mâu thuẫn với những gì code thực sự làm. Trong thực tế, các comment hoạt động như một sự *kiểm tra dự phòng*.<br>
Cuối cùng, sự kiểm tra dự phòng tốt nhất chính là unit test *(xem Chương 14, Kiểm tra và Khả năng đọc)*. Nhưng vẫn đáng để có những comment như thế này để giải thích ý định của chương trình của bạn
### Comment cho biến trong function
Giả sử bạn đã thấy một function call như thế này:
```
connect(10, false);
```
Function call này có một chút bí ẩn vì những giá trị integer và boolean được truyền vào.<br>
Bạn có thể thêm vào inline comment để làm rõ:
```
void connect(int timeout, boolean use_encryption) { ... }

// Call the function with commented parameters
connect(/* timeout_ms = */ 10, /* use_encryption = */ false);
```
Lưu ý rằng chúng tôi đã "đặt tên" cho tham số đầu tiên là *timeout_ms* thay vì *timeout*. Vì thực tế thì tham số của function đáng lẽ phải là *timeout_ms*, nhưng vì lý do nào đó, chúng ta không thể thực hiện thay đổi này, đây là một cách thuận tiện để *cải thiện* tên.<br>
Khi nói đến các tham số boolean, viêc đặt / * name = * / ở trước giá trị là đặc biệt quan trọng. Đặt comment đằng sau giá trị thì lại rất khó hiểu.
```
// Đừng làm như này!
Connect( ... , false /* use_encryption */);
// Cũng đừng làm như này luôn!
Connect( ... , false /* = use_encryption */);
```
Trong những ví dụ này, không rõ liệu *false* có nghĩa là "sử dụng encryption" hay là "không sử dụng encryption".<br>
Hầu hết các  function call không cần những comment như thế này, nhưng đó là một cách tiện dụng (và nhỏ gọn) để giải thích những biến mà có cái-nhìn-bí-ẩn.
### Sử dụng dày đặc thông tin
Khi bạn đã lập trình được một vài năm, bạn nhận thấy rằng các vấn đề và giải pháp xuất hiện lặp lại nhiều lần. Thông thường, có những từ hoặc cụm từ cụ thể đã được phát triển để trở thành từ chuyên dụng. Sử dụng những từ này có thể làm cho comment của bạn nhỏ gọn hơn nhiều.<br>
Ví dụ, giả sử bạn comment là:
```
// This class contains a number of members that store the same information as in the
// database, but are stored here for speed. When this class is read from later, those
// members are checked first to see if they exist, and if so are returned; otherwise the
// database is read from and that data stored in those fields for next time.
```
Thay vào đó, bạn chỉ cần nói là:
```
// This class acts as a caching layer to the database.
```
Thêm một ví dụ nữa, một comment như là:
```
// Remove excess whitespace from the street address, and do lots of other cleanup
// like turn "Avenue" into "Ave." This way, if there are two different street addresses
// that are typed in slightly differently, they will have the same cleaned-up version and
// we can detect that these are equal.
```
có thể thay thế thành:
```
// Canonicalize the street address (remove extra spaces, "Avenue" -> "Ave.", etc.)
```
Có rất nhiều từ và cụm từ chứa đựng rất nhiều ý nghĩa, chẳng hạn như “heuristic,” “bruteforce,” “naive solution,”  và những thứ tương tự. Nếu bạn có một comment cảm thấy hơi dài dòng, hãy xem liệu nó có thể được mô tả như một từ khóa trong lập trình không.
### Tổng kết
Chương này nói về việc tạo comment mà có thể đóng gói được nhiều thông tin vào một không gian nhỏ nhất có thể. Dưới đây là những lời khuyên cụ thể:
* Tránh các đại từ như là "it" và "this" vì chúng có thể gây nhầm lẫn
* Hãy mô tả behavior của function với độ chính xác cao.
* Minh họa comment với các ví dụ input/output được lựa chọn cẩn thận.
* Nêu ý định của code ở mức độ cao, thay vì các chi tiết rõ ràng.
* Sử dụng inline comment (ví dụ: function(/ * arg = * / ...)) để giải thích những argument "bí ẩn" của function.
* Làm comment của bạn ngắn gọn bằng cách sử dụng các từ chuyên môn.
<br>
<br>
#### Kết (P10)
Chương VI của phần 1 đến đây là kết thúc, ở phần tiếp theo mình sẽ giới thiệu phần 2 của cuốn sách, hẹn gặp lại các bạn ở phần sau :)
<br> [Series Viết code "nghệ thuật"](https://viblo.asia/s/series-viet-code-nghe-thuat-o754jLL0ZM6)
<br> Tài liệu tham khảo: *The art of readable code by Dustin Boswell and Trevor Foucher*