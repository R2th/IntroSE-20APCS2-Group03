### Đính kèm thông tin vào tên
![](https://images.viblo.asia/188df5e9-68e6-4862-8f4d-f757906bfb56.png)
<br><br>
Như chúng tôi đã đề cập trước đó, tên của một biến giống như một comment nhỏ. Mặc dù không có nhiều chỗ (để đính kèm thông tin vào biến), nhưng bất kỳ thông tin bổ sung nào bạn chèn vào tên sẽ được nhìn thấy mỗi khi biến được nhìn thấy.<br>
Vì vậy, nếu có điều gì đó rất quan trọng về một biến mà người đọc phải biết, thì nó đáng để gắn thêm một "từ" vào tên. Ví dụ: giả sử bạn có một biến chứa chuỗi thập lục phân (hexadecimal string):
```
String id; // Example: "af84ef845cd8"
```
Thay vào đó, bạn có thể đặt tên nó là *hex_id*, nếu điều quan trọng là người đọc phải nhớ định dạng của *id*.<br><br>
#### Giá trị và đơn vị
Nếu biến của bạn là một số đo (chẳng hạn như số lượng thời gian hoặc số byte), thì việc encode các đơn vị thành tên biến sẽ rất hữu ích.
Ví dụ: dưới đây là một đoạn mã JavaScript đo thời gian load trang web:
```
var start = (new Date()).getTime(); // top of the page
...
var elapsed = (new Date()).getTime() - start; // bottom of the page
document.writeln("Load time was: " + elapsed + " seconds");
```
Thực ra là không có vấn đề gì với đoạn code này, nhưng nó sai ý nghĩa, bởi vì *getTime()* trả về milliseconds, không phải seconds.
Bằng cách thêm *_ms* vào các biến, chúng ta có thể làm cho mọi thứ rõ ràng hơn:
```
var start_ms = (new Date()).getTime(); // top of the page
...
var elapsed_ms = (new Date()).getTime() - start_ms; // bottom of the page
document.writeln("Load time was: " + elapsed_ms / 1000 + " seconds");
```
Bên cạnh thời gian, có rất nhiều đơn vị khác trong lập trình. Dưới đây là một số biến giữ chức năng làm đơn vị và các cải thiện tốt hơn:
| Biến chức năng | Đổi tên biến kèm đơn vị cụ thể |
| -------- | -------- |
| start(int delay) | delay → delay_secs |
| createCache(int size)     | size → size_mb     |
| throttleDownload(float limit)    | limit → max_kbps    |
| rotate(float angle)      | angle → degrees_cw     |
<br>

#### Biến đổi các thuộc tính quan trọng khác
Kỹ thuật đính kèm thông tin vào tên không bị giới hạn bởi các giá trị với các đơn vị. Bạn nên làm điều đó bất cứ lúc nào cảm thấy có vấn đề "nguy hiểm" đối với các biến (dễ gây nhầm lẫn, làm sai chức năng của function,...).<br>
Ví dụ, nhiều khai thác bảo mật đến từ việc bạn không nhận ra rằng một số dữ liệu mà chương trình của bạn nhận được chưa ở trạng thái an toàn. Đối với điều này, bạn có thể muốn sử dụng các tên biến như *untrustedUrl* hoặc *unsafeMessageBody*. Sau khi gọi các function lọc input không an toàn, các biến kết quả có thể là *trustedUrl* hoặc *safeMessageBody*.<br>
Dưới đây là các ví dụ bổ sung khi thông tin cần được đính kèm vào tên:

| Tình huống | Tên biến | Tên tốt hơn |
| -------- | -------- |-------- |
| Mật khẩu đang ở trạng thái "plaintext" và phải được mã hóa trước khi tiếp tục xử lý | password | plaintext_password | 
| Comment do người dùng cung cấp cần escape trước khi được hiển thị *(theo mình hiểu là tránh được lỗi cross-site scripting)* | comment | unescaped_comment| 
| Byte html đã được chuyển đổi thành UTF-8 | html | html_utf8 | 
| Dữ liệu đang đến đã được “url encoded” | data | data_urlenc | 

Bạn không nên sử dụng các thuộc tính giống như *unescaped_* hoặc *_utf8* cho **mọi biến** trong chương trình của mình. Chúng chỉ quan trọng nhất ở những nơi mà một lỗi có thể dễ dàng xảy ra nếu ai đó nhầm lẫn về ý nghĩa, trạng thái của biến đó, đặc biệt là biến đó có thể gây quả nghiêm trọng, như một lỗi bảo mật. Về cơ bản, nếu thông tin đó là điều quan trọng cần phải biết, hãy đặt nó vào tên.<br><br>
#### Ví dụ: *Đây có phải là HUNGARIAN NOTATION?*
*Hungarian Notation* là một hệ thống naming được sử dụng rộng rãi trong Microsoft. Nó encode "loại" của mỗi biến vào prefix của tên. Dưới đây là một số ví dụ: <br>
*(mình xin phép để nguyên văn đoạn này vì các thuật ngữ IT dịch ra tiếng Việt sẽ khó hiểu hơn là tiếng Anh)*
| Tên | Ý nghĩa |
| -------- | -------- |
| pLast | A pointer (p) to the last element in some data structure |
| pszBuffer | A pointer (p) to a zero-terminated (z) string (s) buffer  |
| cch | A count (c) of characters (ch)   |
| mpcopx | A map (m) from a pointer to a color (pco) to a pointer to an x-axis length (px)  |
<br>
Nó thực sự là một ví dụ về "Đính kèm thông tin vào tên." Nhưng đó là một hệ thống chính thức và nghiêm ngặt hơn, tập trung vào encode một tập hợp các thuộc tính cụ thể.<br>
Những gì chúng tôi đang hướng đến trong phần này là một hệ thống rộng hơn, thân thuộc hơn: xác định mọi thuộc tính quan trọng của một biến và encode chúng một cách rõ ràng, nếu chúng cần thiết. Bạn có thể gọi nó là "English Notation".

### Độ dài của tên nên là bao nhiêu?
![](https://images.viblo.asia/deb55344-612a-460d-95e9-625beb5b5a8c.png)
<br><br>
Khi chọn một tên tốt, có một ràng buộc ngầm rằng tên không được quá dài. Không ai thích làm việc với những identifier như thế này:
```
newNavigationControllerWrappingViewControllerForDataSourceOfClass
```
Cái tên càng dài thì càng khó nhớ, và càng tốn diện tích trên màn hình, có thể tạo thêm wrap line.<br>
Mặt khác, các lập trình viên có thể bị đi xa quá trong việc thực hiện việc(tối giản tên) này, họ chỉ đơn thuần sử dụng các từ đơn (hoặc chữ cái lẻ). Vậy bạn nên quản lý sự cân bằng này như thế nào? Làm thế nào để bạn quyết định giữa việc đặt tên biến là *d*, *days* hoặc *days_since_last_update*? <br>
Câu trả lời tốt nhất phụ thuộc vào chính xác cách mà biến đó đang được sử dụng. Nhưng đây là một số hướng dẫn để giúp bạn quyết định.
<br><br>
#### Tên ngắn hơn được chấp nhận cho scope ngắn hơn
Khi bạn đi du lịch ngắn ngày, bạn thường đóng gói ít hành lý hơn nếu bạn đi nghỉ dài ngày. Tương tự, nếu những identifier có “phạm vi” nhỏ (được đánh giá theo tiêu chí có bao nhiêu dòng code khác có thể refer tên này), thì không cần mang theo nhiều thông tin. Tức là, bạn có thể lấy tên ngắn hơn vì tất cả thông tin đó (loại biến là gì, initial value của nó, cách nó bị destroy) rất dễ thấy:
```
if(debug) {
 Map<String, Integer> m;
 lookUpNamesNumbers(m);
 System.out.println(m);
}
```
Mặc dù *m* không đóng gói bất kỳ thông tin nào, nhưng đó không phải là vấn đề, bởi vì người đọc đã có tất cả thông tin mà họ cần để hiểu mã này.

Tuy nhiên, giả sử *m* là một biến toàn cục (global variable) và bạn thấy đoạn mã này:
```
 lookUpNamesNumbers(m);
 System.out.println(m);
```
Mã này khó đọc hơn vì không rõ type hoặc mục đích của *m* là gì.<br>
Vì vậy, nếu một identifier có một phạm vi rộng lớn, tên cần phải mang theo đủ thông tin để làm cho nó rõ ràng.<br><br>
#### Nhập tên dài - không còn là vấn đề nữa
Có nhiều lý do chính đáng để tránh những cái tên dài, nhưng việc "vì chúng khó hơn để viết" không còn là một trong số những lý do nữa. Mỗi IDE mà chúng tôi đã thấy đều có tính năng "word completion" được xây dựng sẵn. Đáng ngạc nhiên, hầu hết các lập trình viên đều không biết tính năng này. Nếu bạn chưa thử tính năng này trên IDE của mình, vui lòng tạm dừng việc đọc bài này ngay bây giờ và dùng thử: (Thề với các bạn là mình viết đến đây cũng mở Eclipse vs Intellij ra thử luôn :D)
1. Nhập một vài ký tự đầu tiên của tên.
2. Kích hoạt lệnh "word completion" (xem bên dưới).
3. Nếu từ đã hoàn thành không chính xác, hãy tiếp tục kích hoạt lệnh cho đến khi tên chính xác xuất hiện
<br>

Nó chính xác một cách đáng ngạc nhiên. Nó hoạt động trên bất kỳ loại file nào, bằng bất kỳ ngôn ngữ nào. Và nó hoạt động cho bất kỳ token nào, ngay cả khi bạn đang nhập comment.
| Editor | Command |
| -------- | -------- |
| Vi | Ctrl-p |
| Emacs | Meta-/ (hit ESC, then /) |
| Eclipse | Alt-/ |
| IntelliJ IDEA | Alt-/ |
| TextMate | ESC |
<br>

#### Từ viết tắt và chữ viết tắt
Đôi khi các lập trình viên sử dụng từ viết tắt và chữ viết tắt để giữ tên của chúng nhỏ — ví dụ, đặt tên cho lớp BEManager thay vì BackEndManager. Sự rút gọn này có đáng để gây bối rối một cách tiềm ẩn không? <br>
Theo kinh nghiệm của chúng tôi, những chữ viết tắt trong dự-án-cụ-thể thường là một ý tưởng tồi. Sự xuất hiện của chúng gây sự "bí ẩn" và "đáng sợ" cho những người mới tham gia dự án. Cho đến một thời gian nào đó, chúng cũng gây sự "đáng sợ" và "bí ẩn" cho chính tác giả của chúng.<br>
Vì vậy, quy tắc của chúng tôi là: một member mới có hiểu tên của nó không? Nếu có, thì là OK.<br>
Ví dụ, nó khá phổ biến cho các lập trình viên sử dụng *eval* thay vì *evaluation*, *doc* thay vì *document*, *str* thay vì *string*. Vì vậy, một đồng đội mới nhìn thấy *formatStr()* có lẽ sẽ hiểu điều đó có nghĩa là gì. Tuy nhiên, họ có thể sẽ không hiểu *BEManager* là gì.
<br><br>

#### Vứt bỏ những từ ngữ không cần thiết
Đôi khi các từ bên trong tên có thể bị xóa mà không làm mất bất kỳ thông tin nào. Ví dụ: thay vì *convertToString()*, tên *toString()* nhỏ hơn và không làm mất bất kỳ thông tin nào. Tương tự, thay vì *doServeLoop()*, tên *serveLoop()* cũng đủ rõ ràng rồi.

### Sử dụng định dạng tên để truyền tải ý nghĩa
Cách bạn sử dụng dấu gạch dưới, dấu gạch ngang và viết hoa cũng có thể đóng gói thêm thông tin trong tên. Ví dụ: dưới đây là một số mã C++ tuân theo các quy ước format được sử dụng cho các open source project của Google:
```
static const int kMaxOpenFiles = 100;
class LogReader {
 public:
 void OpenFile(string local_file);
 private:
 int offset_;
 DISALLOW_COPY_AND_ASSIGN(LogReader);
};
```
Các format khác nhau cho các entity khác nhau giống như một hình thức làm nổi bật cú pháp — nó giúp bạn đọc code dễ dàng hơn.<br>
Hầu hết các format trong ví dụ này là khá phổ biến - sử dụng *CamelCase* cho tên class và sử dụng *lower_separated* (chữ thường kèm dấu phân cách) cho các tên biến. Nhưng một số convention khác có thể khiến bạn ngạc nhiên.<br>
Ví dụ: các hằng số có dạng *kConstantName* thay vì *CONSTANT_NAME*. Kiểu này có lợi ích khi dễ dàng phân biệt với biến khai báo trong *#define*, đúng ra phải là *MACRO_NAME* theo convention.<br>
Biến toàn cục giống như biến thông thường, nhưng phải kết thúc bằng dấu gạch dưới (như là *offset_*). Lúc đầu, quy ước này có vẻ lạ, nhưng việc có thể phân biệt ngay lập tức các biến toàn cục so với các biến khác thì là rất tiện dụng. Ví dụ: nếu bạn đang lướt qua code của một method lớn và thấy dòng:
```
stats.clear();
```
Bạn có thể tự hỏi, liệu *stats* có thuộc về class này không? Code này có thay đổi trạng thái bên trong của class không? Nếu convention *member_* được sử dụng, bạn có thể nhanh chóng kết luận: Không, *stats* chắc chắn là biến cục bộ, nếu không thì nó sẽ được đặt tên là *stats_*. *(Mình thấy trong java dùng từ khóa "this" rồi nên có thể không cần dùng "_" :))*<br><br>

#### Những format convention khác
Tùy thuộc vào ngữ cảnh của dự án hoặc ngôn ngữ bạn dùng, có thể có các format convention khác mà bạn có thể sử dụng để đặt tên chứa nhiều thông tin hơn.<br>
Ví dụ, trong *JavaScript: The Good Parts (Douglas Crockford, O’Reilly, 2008)*, tác giả đề nghị rằng "constructor" nên được bắt đầu bằng chữ hoa và các function bình thường nên bắt đầu bằng một chữ thường:
```
var x = new DatePicker(); // DatePicker() là "constructor" function
var y = pageHeight(); // pageHeight() là function thường
```

Dưới đây là một ví dụ JavaScript khác: khi gọi hàm thư viện jQuery (có tên là ký tự \$), một convention hữu ích là prefix jQuery với \$:

```
var $all_images = $("img"); // $all_images là một jQuery object
var height = 250; // height thì không phải
```
Xuyên suốt code, sẽ rõ ràng rằng *\$all_images* là một jQuery object.<br><br>
Dưới đây là ví dụ cuối cùng, lần này về HTML/CSS: khi đưa vào HTML tag một attribute *id* hoặc *class*, cả dấu gạch dưới và dấu gạch ngang là các ký tự hợp lệ để sử dụng trong giá trị. Một convention có thể là sử dụng dấu gạch dưới để phân tách các từ trong các *id* và dấu gạch ngang để phân tách các từ trong các *class*:

```
<div id="middle_column" class="main-content"> ...
```

### Tổng kết
Chủ đề duy nhất cho chương này là: **Đóng gói thông tin thành tên**. Bằng cách này, chúng tôi mong muốn rằng người đọc có thể trích xuất được rất nhiều thông tin chỉ bằng cách đọc tên chỉ mục.<br>
Dưới đây là một số tip cụ thể mà chúng tôi đã khái quát:
* **Sử dụng các từ ngữ cụ thể** — ví dụ: thay vì *Get*, các từ như *Fetch* hoặc *Download* có thể tốt hơn, tùy thuộc vào ngữ cảnh.
* **Tránh các tên chung như là *tmp* và *retval***, trừ khi có lý do cụ thể để sử dụng chúng.
* **Sử dụng những cái tên "cứng" để mô tả mọi thứ chi tiết hơn** — tên *serverCanStart()* là mơ hồ so với *canListenOnPort()*.
* **Đính kèm các chi tiết quan trọng vào tên biến** — ví dụ: thêm *_ms* vào biến mà có giá trị bằng milliseconds hoặc thêm *raw_* vào biến chưa được xử lý escape(HTML).
* **Sử dụng tên dài hơn cho scope lớn hơn** — không sử dụng tên một hoặc hai chữ cái khó hiểu cho các biến trải dài trên nhiều nơi; tên ngắn hơn là tốt hơn cho các biến chỉ trải dài một vài dòng.
* **Sử dụng viết hoa, dấu gạch dưới, v.v. theo cách có ý nghĩa** — ví dụ, bạn có thể nối thêm “_” vào các biến toàn cục để phân biệt chúng với các biến cục bộ. (Một lần nữa mình khuyến khích trong java dùng từ khóa *this* thay cho dấu gạch dưới :D)
<br><br>

#### Kết (P3)
Chương II đến đây là kết thúc, ở phần tiếp theo mình sẽ giới thiệu chương III của cuốn sách, hẹn gặp lại các bạn ở phần sau :)
<br> [Series Viết code "nghệ thuật"](https://viblo.asia/s/series-viet-code-nghe-thuat-o754jLL0ZM6)
<br> Tài liệu tham khảo: *The art of readable code by Dustin Boswell and Trevor Foucher*