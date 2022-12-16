## Chương IV: Thẩm mỹ
![](https://images.viblo.asia/f2e4bd4b-0047-4d3f-a63d-68e13d5e97bf.png)
<br><br>
Có rất nhiều thứ phải suy nghĩ về layout của một cuốn tạp chí. Chiều dài của các đoạn văn, chiều rộng của các cột, thứ tự của các bài báo và những gì thể hiện trên trang bìa. Một cuốn tạp chí tốt  giúp bạn dễ dàng lướt nhanh từ trang này sang trang khác, cũng như đọc từng trang một cách dễ dàng.<br>
Source code tốt nên phải (làm cho người đọc) “dễ chịu khi nhìn vào”. Trong chương này, chúng tôi sẽ chỉ ra cách sử dụng spacing, alignment và ordering tốt để có thể giúp code của bạn dễ đọc hơn.<br>
Cụ thể, có ba nguyên tắc mà chúng tôi sử dụng:
* Sử dụng bố cục nhất quán, với các pattern mà người đọc có thể làm quen.
* Làm cho code có chức năng giống nhau trông giống nhau.
* Nhóm các dòng code liên quan thành các khối.<br><br>
#### Ví dụ: Thẩm mỹ và thiết kế
Trong chương này, chúng tôi chỉ quan tâm đến những cải tiến đơn giản về mặt thẩm mỹ, mà bạn có thể thực hiện thay đối với code của mình. Những loại thay đổi này dễ thực hiện và thường cải thiện khả năng đọc khá nhiều. Đôi khi việc này có thể giúp ích nhiều hơn trong việc refactor những thay đổi lớn trong code của bạn (chẳng hạn như tách ra các function hoặc class mới). Quan điểm của chúng tôi là thẩm mỹ tốt và thiết kế tốt là những ý tưởng độc lập; lý tưởng nhất là bạn nên áp dụng cả hai.
### Tại sao thẩm mỹ là vấn đề?
![](https://images.viblo.asia/a318d94b-3636-4fe8-aa43-b247dc76628d.png)
<br><br>
Tưởng tượng bạn phải dùng class này:
```
public class StatsKeeper {
// A class for keeping track of a series of doubles
// and methods for quick statistics about them
public void add(double d) {}; 
 private int count; /* how many so far */ public double average() { ... };
private double minimum;
private List<Double> past_items
 ;private double maximum;
};
```
Bạn sẽ mất nhiều thời gian để hiểu hơn là:
```
// A class for keeping track of a series of doubles
// and methods for quick statistics about them.
public class StatsKeeper {
    private List<Double> past_items;
    private int count; // how many so far
    private double minimum;
    private double maximum;
    public void add(double d) {};
    public double average() { ... };
};
```
Rõ ràng là làm việc với code mà có thẩm mỹ tốt thì sẽ dễ dàng hơn. Nếu bạn để ý, phần lớn thời gian lập trình của bạn là dành cho việc đọc code! Bạn có thể lướt qua code của mình càng nhanh, thì mọi người sử dụng nó càng dễ.
### Sắp xếp lại các line break để nhất quán và gọn gàng
Giả sử bạn đang viết code Java để đánh giá cách mà chương trình của bạn hoạt động theo các tốc độ kết nối mạng khác nhau. Bạn có một class *TcpConnectionSimulator* có bốn tham số trong constructor:
1. Tốc độ của kết nối - the speed of the connection (Kbps)
2. Độ trễ trung bình (thời gian cần thiết để truyền tải gói tin) - The average latency (ms)
3. Độ trễ thay đổi theo thời gian (giống như ping) - The “jitter” of the latency (ms)
4. Độ mất mát của gói tin - the packet loss (%)

Code của bạn cần ba instance *TcpConnectionSimulator* khác nhau:
```
public class PerformanceTester {
    public static final TcpConnectionSimulator wifi = new TcpConnectionSimulator(
        500, /* Kbps */
        80, /* millisecs latency */
        200, /* jitter */
        1 /* packet loss % */);

    public static final TcpConnectionSimulator t3_fiber =
        new TcpConnectionSimulator(
            45000, /* Kbps */
            10, /* millisecs latency */
            0, /* jitter */
            0 /* packet loss % */);

    public static final TcpConnectionSimulator cell = new TcpConnectionSimulator(
        100, /* Kbps */
        400, /* millisecs latency */
        250, /* jitter */
        5 /* packet loss % */);
}
```
Code ví dụ này cần rất nhiều line break để phù hợp với giới hạn 80 ký tự (đây là coding standard tại công ty của bạn). Thật không may, điều đó làm cho *t3_fiber* trông khác với 2 cái instance còn lại. "Hình bóng" của code này trông lẻ loi và nó thu hút sự chú ý đến *t3_fiber* mà không có lý do. Điều này không tuân theo nguyên tắc rằng "code tương tự nên trông giống nhau".
Để làm cho code trông nhất quán hơn, chúng ta có thể bổ sung các line break (và sắp xếp các comment trong khi chúng tôi thực hiện nó:
```
public class PerformanceTester {
    public static final TcpConnectionSimulator wifi =
        new TcpConnectionSimulator(
            500, /* Kbps */
            80, /* millisecs latency */
            200, /* jitter */
            1 /* packet loss % */);
    public static final TcpConnectionSimulator t3_fiber =
        new TcpConnectionSimulator(
            45000, /* Kbps */
            10, /* millisecs latency */
            0, /* jitter */
            0 /* packet loss % */);
    public static final TcpConnectionSimulator cell =
        new TcpConnectionSimulator(
            100, /* Kbps */
            400, /* millisecs latency */
            250, /* jitter */
            5 /* packet loss % */);
}
```
Code này có một pattern nhìn khá là nhất quán và dễ dàng hơn để có thể lướt qua. Nhưng thật không may, nó sử dụng rất nhiều vertical space. Nó cũng bị lặp mỗi comment ba lần.<br>
Có một cách ngắn gọn hơn để viết class:
```
public class PerformanceTester {
    // TcpConnectionSimulator(throughput, latency, jitter, packet_loss)
    //                          [Kbps]     [ms]     [ms]    [percent]
    
    public static final TcpConnectionSimulator wifi =
        new TcpConnectionSimulator(500, 80, 200, 1);
    
    public static final TcpConnectionSimulator t3_fiber =
        new TcpConnectionSimulator(45000, 10, 0, 0);
    
    public static final TcpConnectionSimulator cell =
        new TcpConnectionSimulator(100, 400, 250, 5);
}
```
Chúng tôi đã chuyển các comment lên trên cùng và sau đó đặt tất cả các tham số trên một dòng. Bây giờ, mặc dù những comment không phải là ở ngay bên cạnh mỗi số liệu, nhưng các “thông số” đã được xếp hàng trong một bảng một cách ngắn gọn súc tích hơn.
### Sử dụng các method để "dọn dẹp" những thứ bất quy tắc
Giả sử bạn có một database nhân sự cung cấp function sau (C++):
```
// Chuyển partial_name như "Doug Adams" thành "Mr. Douglas Adams".
// Nếu không khả thi, 'error' được fill bằng một explanation.
string ExpandFullName(DatabaseConnection dc, string partial_name, string* error);
```
và function này đã được test với một loạt các case:
```
DatabaseConnection database_connection;
string error;
assert(ExpandFullName(database_connection, "Doug Adams", &error)
 == "Mr. Douglas Adams");
assert(error == "");
assert(ExpandFullName(database_connection, " Jake Brown ", &error)
 == "Mr. Jacob Brown III");
assert(error == "");
assert(ExpandFullName(database_connection, "No Such Guy", &error) == "");
assert(error == "no match found");
assert(ExpandFullName(database_connection, "John", &error) == "");
assert(error == "more than one result");
```
Code này không có thẩm mỹ. Một số dòng quá dài đến nỗi chúng wrap sang dòng tiếp theo. "Hình bóng" của code này trông xấu xí và không có tính nhất quán.<br>
Nhưng đây là một trường hợp mà phải tốn khá nhiều công sức để sắp xếp lại các ngắt dòng. Vấn đề lớn hơn là có rất nhiều string lặp đi lặp lại như *“assert(ExpandFullName(database_connection...,”* và *“error”* làm cản trở việc (sắp xếp lại) đó. Để thực sự cải thiện code này, chúng ta cần một helper method để code có thể trông như thế này:
```
CheckFullName("Doug Adams", "Mr. Douglas Adams", "");
CheckFullName(" Jake Brown ", "Mr. Jake Brown III", "");
CheckFullName("No Such Guy", "", "no match found");
CheckFullName("John", "", "more than one result");
```
Bây giờ, rõ ràng hơn là có bốn test case, mỗi test case có các thông số khác nhau. Tất cả các công việc xử lý đều nằm ở trong *CheckFullName()*:
```
void CheckFullName(string partial_name,
 string expected_full_name,
 string expected_error) {
 // database_connection giờ đã trở thành biến toàn cục
 string error;
 string full_name = ExpandFullName(database_connection, partial_name, &error);
 assert(error == expected_error);
 assert(full_name == expected_full_name);
}
```
Mặc dù mục tiêu của chúng ta chỉ là làm cho code trở nên có thẩm mỹ hơn, nhưng việc này lại có một số lợi ích phụ khác:
* Nó lược bỏ những đoạn code bị duplicate, làm cho code trở nên nhỏ gọn hơn.
* Các phần quan trọng của mỗi test case (name và error string) được thể hiện độc lập trong một tầm nhìn rõ ràng. 
*  Thêm các test case mới bây giờ trở nên dễ dàng hơn

Bài học của câu chuyện là làm cho code “trông xinh xắn” thường giúp ích nhiều hơn là chỉ cải tiến surface, nó còn có thể giúp cấu trúc code của bạn tốt hơn.
<br><br>
*(còn tiếp)*
#### Kết (P6)
Chương IV mình xin phép được tách ra làm 2 topic vì nội dung của nó cũng khá là dài, chương này mình cảm thấy khá là khó khăn trong việc dịch một số thuật ngữ nên nếu thấy sai sót thì các bạn có thể để lại comment nhé :sweat_smile:
Hẹn gặp lại các bạn ở phần tới 😃 
<br> [Series Viết code "nghệ thuật"](https://viblo.asia/s/series-viet-code-nghe-thuat-o754jLL0ZM6)
<br> Tài liệu tham khảo: *The art of readable code by Dustin Boswell and Trevor Foucher*