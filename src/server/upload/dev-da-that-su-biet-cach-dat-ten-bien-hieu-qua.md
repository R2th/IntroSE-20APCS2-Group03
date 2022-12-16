**Trong suốt quãng thời gian làm Dev, chắc hẳn cũng bị ít lần bị Senior Dev chửi sấp mặt trong việc đặt tên biến, tên hàm quá chuối. Nếu vẫn còn đang trong thời kỳ “căng não” như vậy , thì đây chính là bài viết dành cho bạn. Nếu bạn đã rút ra được các kinh nghiệm hay ho khác, thì hãy góp ý thêm cho mình ở bình luận bên dưới nhé.**

**Tên hiện diện ở khắp mọi nơi trong phần mềm. Chúng ta đặt tên cho các biến, hàm, tham số, lớp,.... Chúng ta đặt tên cho các tập tin jar, các tập tin war và ear. Chúng ta đặt tên, đặt tên và không ngừng đặt tên. Bởi vì phải làm nhiều và liên tục như vậy, nên hãy đảm bảo là bạn sẽ làm thật tốt việc này.
Sau đây là 10 nguyên tắc cơ bản giúp bạn có thể đặt tên hiệu quả, dễ dàng.**

## 1. SỬ DỤNG TÊN CÓ MỤC ĐÍCH
Tên của một variable (biến), function (hàm) hoặc class (lớp), nên trả lời được tất cả các câu hỏi sau:
-	Tại sao nó tồn tại?
-	Nó làm nhiệm vụ gì?
-	Nó được sử dụng như thế nào?

Xem xét hai ví dụ sau:
```java
int d;  // elapsed time in days
int elapsedTimeInDays;
---------------------------------------------------------------------
List<int[]> flaggedCells = new ArrayList<int[]>();
List<Cell> flaggedCells = new ArrayList<Cell>();
```
Nếu bạn phải bổ sung comment để làm rõ ý nghĩa, thì tên đó không tiết lộ được ý định của nó.
## 2.	TRÁNH THÔNG TIN SAI LỆCH
Cẩn thận với việc sử dụng tên chỉ có một chút ít khác biệt. Mất bao lâu để chúng ta nhận ra sự khác biệt giữa *YZControllerForEfficientHandlingOfStrings* và *XYZControllerForEfficientStorageOfStrings*?

Với những IDE ngày nay, chúng đều cung cấp chức năng tự động điền code (automatic code completion). Sẽ rất hữu ích nếu các tên được sắp xếp theo thứ tự abc và có sự khác biệt rõ ràng, bởi vì một Developer có xu hướng chọn object theo tên hơn là để ý mô tả của nó.
## 3.	TẠO SỰ KHÁC BIỆT CÓ Ý NGHĨA
Hai điều nên tránh:
-	Bổ sung dãy số vào tên
-	Thêm các từ ngữ gây mất tập trung

Đặt tên theo dãy số (*a1, a2, .. aN*) trái ngược với nguyên tắc **đặt tên có mục đích**.

Từ ngữ gây mất tập trung tạo ra sự phân biệt vô nghĩa. Bạn đang có một class là *Product*. Bạn có thêm một class khác là *ProductInfo* hoặc *ProductData*, các class đã được đặt tên khác nhau nhưng lại không làm cho ý nghĩa khác biệt gì. Từ *variable* không bao giờ nên xuất hiện trong một tên biến. Cũng như từ *table* không bao giờ nên xuất hiện trong tên bảng của database.
## 4.	TÊN CÓ THỂ PHÁT ÂM ĐƯỢC
```java
private Date genymdhms;
private Date generationTimestamp;
```
Lưu ý hai biến trên đều có cùng ý nghĩa, nhưng biến nào dễ đọc và rõ ràng hơn?
## 5.	TÊN DỄ DÀNG TÌM KIẾM
Nếu một biến hoặc hằng số được sử dụng ở nhiều nơi, thì bắt buộc phải đặt cho nó một cái tên dễ dàng tìm kiếm. Một lần nữa hãy so sánh hai đoạn code sau:
```java
for (int j=0; j<34; j++) {
	s += (t[j]*4)/5;
}
--------------------------------------------------------------------------------------
for (int j=0; j < NUMBER_OF_TASKS; j++) {
    int realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
    int realTaskWeeks = (realdays / WORK_DAYS_PER_WEEK);
    sum += realTaskWeeks;
}
```
Đặt tên biến theo cách này có thể làm cho hàm dài hơn, nhưng hãy xem xét việc tìm kiếm *WORK_DAYS_PER_WEEK* sẽ dễ dàng hơn rất nhiều so với việc tìm tất cả các vị trí nơi số *“5”* được sử dụng.
## 6.	TÊN CLASS
Các Class (lớp) và Object (đối tượng) nên có tên là danh từ hoặc cụm danh từ, ví dụ: *Customer, WikiPage, Account,* và *AddressParser*
## 7.	TÊN METHOD
Các Method (phương thức) nên có tên động từ hoặc cụm động từ như: *postPayment()*, *deletePage()* hoặc *savePage()*.
Ngoài ra, sử dụng các method cũng là một cách tốt để miêu tả các tham số trong Constructor
```java
Complex fulcrumPoint = new Complex(23.0);
Complex fulcrumPoint = Complex.FromRealNumber(23.0); //cleaner code
```
## 8.	CHỌN MỘT TỪ CHO MỖI KHÁI NIỆM
Chỉ chọn một từ cho một khái niệm và luôn gắn bó với nó. Chẳng hạn, thật khó hiểu khi *retrieve* và *get* là những method có chức năng tương tự nhau lại được dùng la liệt ở những class khác nhau. Làm thế nào để bạn nhớ tên method nào đi với class nào? 
Vì vậy, hãy luôn **nhất quán**.
## 9.	KHI NÀO LÀ VẤN ĐỀ?  VÀ ĐÂU LÀ GIẢI PHÁP?
Hãy nhớ rằng những người đọc code của bạn sẽ là những Lập trình viên (dev). Vì vậy, cứ tự nhiên khi sử dụng các thuật ngữ khoa học máy tính (CS), tên thuật toán, tên mẫu, thuật ngữ toán học, v.v. 

Phân loại khái niệm nào là giải pháp, khái niệm nào là vấn đề là một phần công việc của một lập trình viên và nhà thiết kế giỏi. Code có liên quan nhiều tới vấn đề nên có tên được rút ra từ vấn đề đó.
## 10.	INTERFACE VÀ IMPLEMENTATIONS
Giả sử như bạn đang có một Interface miêu tả Shape. Bạn nên đặt tên cho chúng là gì? *IShape hay Shape*? Nếu tôi phải thêm ký hiệu cho Interface hay Implementations, tôi sẽ chọn Implementations: *ShapeImpl*
## KẾT LUẬN
Điều khó nhất khi chọn một tên tốt là nó đòi hỏi kỹ năng mô tả tốt.

Thực hiện theo một số quy tắc này và xem liệu điều này có giúp cải thiện khả năng đọc code của mình hay không. Nếu bạn đang phải maintain code của người khác, hãy sử dụng refactor tool để giúp giải quyết các vấn đề này. Nó sẽ mất thời gian đấy nhưng sẽ mang lại lợi ích lâu dài.

>*Bài viết dựa trên cuốn Clean Code – Robert C. Martin Series*