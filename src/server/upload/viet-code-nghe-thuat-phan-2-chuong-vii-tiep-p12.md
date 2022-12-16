### Return sớm trong function
Một số lập trình viên tin rằng các function không nên có nhiều câu lệnh *return*. Điều này thật vô nghĩa. Return sớm từ một function là việc hoàn toàn tốt và thường được mong muốn. Ví dụ:
```
public boolean contains(String str, String substr) {
    if (str == null || substr == null) return false;
    if (substr.equals("")) return true;
    ...
}
```
Nếu function này không có “guard clauses” (những đoạn code check điều kiện đơn giản đặt ở trên cùng function) thì code sẽ khó đọc hơn (do phải dùng nhiều if else lồng nhau). <br><br>
Một trong những động lực để muốn có một exit point duy nhất, là đặt tất cả các cleanup code ở dưới cùng của function, để đảm bảo chúng được gọi. Nhưng các ngôn ngữ hiện đại đã cung cấp những cách tinh vi hơn để đạt được sự đảm bảo này:
| Ngôn ngữ | Trigger cleanup code |
| -------- | -------- |
| C++ | destructors |
| Java, Python | try finally |
| Python | with |
| C# | using |
<br>

Trong C thuần túy, không có cơ chế để trigger code cụ thể khi một function kết thúc. Vì vậy, nếu có một function lớn với nhiều cleanup code, việc return sớm có thể khó thực hiện chính xác. Trong trường hợp này, các tùy chọn khác bao gồm refactor function hoặc thậm chí sử dụng hợp lý *goto cleanup;*
### Keyword *goto* nổi tiếng
Trong các ngôn ngữ khác ngoài C, có rất ít nhu cầu sử dụng *goto* vì có rất nhiều cách tốt hơn để hoàn thành công việc. *goto* cũng nổi tiếng là làm cho code khó kiểm soát và theo dõi.<br>
Nhưng bạn vẫn có thể thấy *goto* được sử dụng trong các project C khác nhau, đáng chú ý nhất là nhân Linux (Linux kernel). Trước khi bạn báng bổ việc sử dụng *goto*, rất hữu ích để phân tích lý do tại sao một số cách sử dụng *goto* lại tốt hơn những cách khác.<br>
Cách sử dụng *goto* đơn giản nhất, là sử dụng *exit* ở giữa function:
```
    if (p == NULL) goto exit;
    ...
exit:
    fclose(file1);
    fclose(file2);
    ...
    return;
 ```
Nếu đây là form duy nhất để sử dụng *goto*, *goto* sẽ không gây ra vấn đề lớn lao gì cả. Còn lại hầu hết trường hợp, nên tránh *goto*.
### Giảm thiểu code lồng nhau
Code lồng nhau sâu sẽ khó đọc hiểu. Mỗi cấp độ lồng nhau sẽ thêm một condition vào “mental stack” (ngăn nhớ trong đầu) của người đọc. Khi người đọc nhìn thấy một dấu ngoặc nhọn (*}*), thật khó để có thể "pop" cái stack và nhớ lại những điều kiện nào bên trong nó.<br>
Dưới đây là một ví dụ tương đối đơn giản về điều này, xem xem có phải mỗi khi kết thúc một condition thì bạn đều phải check lại xem mình đang ở block condition nào:
```
if (user_result == SUCCESS) {
    if (permission_result != SUCCESS) {
        reply.writeErrors("error reading permissions");
        reply.done();
        return;
    }
    reply.writeErrors("");
} else {
    reply.writeErrors(user_result);
}
reply.done();
```
Khi bạn thấy thẻ đóng đầu tiên, bạn phải tự nghĩ, *Oh, `permission_result != SUCCESS` vừa kết thúc, vì vậy bây giờ đến `permission_result == SUCCESS`, và cái này vẫn nằm trong block `user_result == SUCCESS`*.<br>
Nhìn chung, bạn phải giữ các giá trị của `user_result` và `permission_result` trong đầu mọi lúc. Và khi mỗi khối `if { }` đóng lại, bạn phải chuyển đổi giá trị tương ứng trong tâm trí của bạn.<br>
Đoạn code này thậm chí còn khó đọc hơn nữa vì nó cứ xen kẽ giữa các tình huống *SUCCESS* và *non-SUCCESS*.
<br><br>
#### Code lồng nhau đã được tích lũy như thế nào
Trước khi chúng ta sửa đoạn code ví dụ trước đó, hãy nói về việc cách nó tạo ra như thế nào. Ban đầu, code rất đơn giản:
```
if (user_result == SUCCESS) {
    reply.writeErrors("");
} else {
    reply.writeErrors(user_result);
}
reply.done();
```
Đoạn code này hoàn toàn rất dễ hiểu, nó chỉ ra error string nào cần được write, và sau đó kết thúc với *reply*.<br>
Nhưng sau đó, lập trình viên đã thêm một operation thứ hai:
```
if (user_result == SUCCESS) {
    if (permission_result != SUCCESS) {
        reply.writeErrors("error reading permissions");
        reply.done();
        return;
    }
    reply.writeErrors("");
...
```
Sự thay đổi này cũng có thể hiểu được là—người lập trình muốn insert vào một đoạn code mới và họ đã tìm thấy nơi dễ nhất để chèn nó. Những khác biệt về sự thay đổi này là rất rõ ràng (đối với họ)—nó trông giống như một sự thay đổi đơn giản.<br>
Nhưng khi người khác bắt gặp đoạn code này sau đó, tất cả bối cảnh đó đã biến mất. Đây là cách nó xảy ra với bạn khi lần đầu tiên đọc đoạn code này, bạn phải xử lý nó ngay lập tức.
> ##### KEY IDEA: 
> ##### *Hãy nhìn vào code của bạn từ một góc nhìn hoàn toàn mới khi bạn thực hiện các thay đổi.*
<br>

#### Loại bỏ code lồng nhau bằng việc return sớm
Okay, hãy cải thiện lại code nào. Code lồng như thế này có thể được loại bỏ bằng cách xử lý "failure case” càng sớm càng tốt và thực hiện return sớm:
```
if (user_result != SUCCESS) {
    reply.writeErrors(user_result);
    reply.done();
    return;
}

if (permission_result != SUCCESS) {
    reply.writeErrors(permission_result);
    reply.done();
    return;
}

reply.writeErrors("");
reply.done();
```
Code này chỉ có một cấp độ lồng, thay vì hai. Nhưng quan trọng hơn, người đọc không bao giờ phải “pop” bất cứ thứ gì từ “mental stack” của mình—mỗi block kết thúc bằng một *return*.
<br><br>
#### Loại bỏ code lồng trong vòng lặp
Kỹ thuật return sớm không phải lúc nào cũng áp dụng được. Ví dụ, ở đây, một trường hợp code được lồng trong một vòng lặp:
```
for (int i = 0; i < results.size(); i++) {
    if (results[i] != NULL) {
        non_null_count++;
        if (results[i]->name != "") {
            cout << "Considering candidate..." << endl;
            ...
        }
    }
}
```
Trong một vòng lặp, kỹ thuật tương tự để return sớm là dùng *continue*:
```
for (int i = 0; i < results.size(); i++) {
    if (results[i] == NULL) continue;
    non_null_count++;
    if (results[i]->name == "") continue;
    cout << "Considering candidate..." << endl;
    ...
}
```
Theo cùng một cách mà cấu trúc *if (...) return;* hoạt động như một “guard clauses” cho một function, thì cấu trúc *if (...) continue;* hoạt động như một “guard clauses” cho vòng lặp.<br>
Nhìn chung, câu lệnh *continue* có thể gây nhầm lẫn, trông giống như một *goto* bên trong vòng lặp. Nhưng trong trường hợp này, mỗi lần lặp của vòng lặp là độc lập (vòng lặp là "for each"), vì vậy người đọc có thể dễ dàng thấy rằng *continue* chỉ có nghĩa là "bỏ qua lần lặp này".
### Bạn có thể follow theo flow của chương trình không?
![](https://images.viblo.asia/52de2a60-a22b-401f-beab-9e8258add03f.png)
<br><br>
Chương này nói về control flow cấp thấp (low-level): làm thế nào để tạo ra các vòng lặp, điều kiện và các jump dễ đọc. Nhưng bạn cũng nên suy nghĩ về “flow" của chương trình của bạn ở cấp độ cao (high-level). Một cách lý tưởng, làm thế nào để follow toàn bộ execution path của chương trình của bạn—bạn sẽ bắt đầu từ *main()* và sẽ từ từ đi qua code, như là một function gọi function khác, cho đến khi thoát khỏi chương trình.<br>
Tuy nhiên, trên thực tế, các ngôn ngữ lập trình và thư viện có các cấu trúc cho phép code thực thi "ngầm" hoặc làm cho người đọc khó theo dõi. Dưới đây là một số ví dụ (C++):
| Cấu trúc | Cách mà chương trình high-level bị che khuất |
| -------- | -------- |
| threading | Không rõ code nào được thực thi khi nào |
| signal/interrupt handlers | Một số code có thể được thực thi bất cứ lúc nào |
| exceptions | Execution có thể "bubble up" thông qua nhiều function call |
| function pointers & anonymous functions | Khó để biết chính xác code nào sẽ chạy bởi vì nó không được xác định tại compile time |
| virtual methods | `object.virtualMethod()` có thể invoke code của một subclass không xác định. |
<br>
Một số cấu trúc này rất hữu ích và thậm chí chúng có thể làm cho code của bạn dễ đọc hơn và ít thừa thãi hơn. Nhưng vì là lập trình viên, đôi khi chúng ta lạm dụng chúng quá mức mà không nhận ra rằng sau này người đọc sẽ khó hiểu code như thế nào. Ngoài ra, các cấu trúc này làm cho bug khó theo dõi hơn nhiều.<br>
Điều quan trọng là không để tỉ lệ code của bạn sử dụng các cấu trúc này quá lớn. Nếu bạn lạm dụng các tính năng này, nó có thể làm cho việc tracing code của bạn giống như trò chơi Three-Card Monte (như trong phim hoạt hình) (mình search youtube không thấy phim này nhưng thấy rất nhiều video nói về ảo thuật Three-Card Monte :D).
<br>

### Tổng kết
Có một số điều bạn có thể làm để giúp cho control flow code của bạn dễ đọc hơn.<br>
* Khi viết một phép so sánh `(while (bytes_expected > bytes_received))`, tốt hơn hết là đặt giá trị động ở bên trái và giá trị tĩnh hơn ở bên phải `(while (bytes_received < bytes_expected))`.
* Bạn cũng có thể sắp xếp lại các khối câu lệnh *if/else*. Nói chung, trước tiên hãy cố gắng xử lý trường hợp positive/dễ hơn/"thú vị" hơn trước. Đôi khi những tiêu chí này mâu thuẫn với nhau, nhưng mà nếu không có mâu thuẫn gì, thì đó là một quy tắc tốt để tuân theo.
* Một số cấu trúc lập trình nhất định, như toán tử ternary operator `(: ?)`, vòng lặp `do/while` và `goto` thường làm cho code khó đọc. Tốt nhất không nên sử dụng chúng,  vì luôn tồn tại các lựa chọn thay thế rõ ràng hơn.
* Các khối code lồng nhau đòi hỏi nhiều sự tập trung để theo dõi chúng. Mỗi lần lồng mới đòi hỏi nhiều bối cảnh hơn để được đẩy lên "mental stack" của người đọc. Thay vào đó, hãy tránh code lồng nhau sâu.
* Return sớm có thể loại bỏ lồng và làm sạch code nói chung. Đặc biệt sử dụng “Guard statements” (những đoạn code check điều kiện đơn giản đặt ở trên cùng function) sẽ rất hữu ích.
<br>
<br>
#### Kết (P12)
Chương VII đến đây là kết thúc, ở phần tiếp theo mình sẽ giới thiệu chương VIII của cuốn sách, hẹn gặp lại các bạn ở phần sau :)
<br> [Series Viết code "nghệ thuật"](https://viblo.asia/s/series-viet-code-nghe-thuat-o754jLL0ZM6)
<br> Tài liệu tham khảo: *The art of readable code by Dustin Boswell and Trevor Foucher*