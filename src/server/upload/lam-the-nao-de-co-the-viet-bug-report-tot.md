## Tại sao cần bug report thật tốt?

Nếu bug report của bạn hiệu quả, thì cơ hội để nó được fix sẽ cao hơn. Bởi vậy việc fix 1 bug phụ thuộc vào cách bạn report nó ra sao. Việc report 1 bug chỉ là 1 kỹ năng và tôi sẽ giải thích làm thế nào để đạt được kỹ năng này.

“Mục đích của việc viết bug report là để các bug được fix”  - theo Cem Kaner. Nếu 1 tester report bug không chính xác, thì rất có thể dev sẽ từ chối bug này và nói rằng nó không thể tái hiện được nó.
Điều này có thể làm tổn thương tinh thần của các tester và đôi khi cũng là lòng tự trọng. (Tôi gợi ý không nên giữ những kiểu tự trọng giống như “ tôi đã report bug chính xác”, “tôi có thể tái hiện được nó”, “tại sao cô ấy/ anh ấy lại reject bug”, “nó không phải là lỗi của tôi”….)

![](https://images.viblo.asia/9569b6d9-bc1f-4618-b7a4-90a072b8b138.jpg)https://images.viblo.asia/9569b6d9-bc1f-4618-b7a4-90a072b8b138.jpg

## Các đặc tính của 1 software bug report tốt là gì?

Ai cũng có thể viết 1 bug report. Nhưng không phải ai cũng có thể viết 1 bug report hiệu quả.

Bạn sẽ có thể phân biệt giữa 1 bug report mức trung bình và 1 bug report tốt. Làm thế nào phân biệt giữa 1 bug report tốt và không tốt? Nó rất đơn giản, áp dụng theo các đặc điểm kỹ thuật sau để report 1 bug.

Các đặc điểm kỹ thuật bao gồm:

**1) Có 1 số lượng bug xác định rõ ràng:**

Luôn gán 1 con số duy nhất cho mỗi bug report. Con số này, lần lượt theo thứ tự, sẽ giúp bạn nhận diện các bug report. Nếu bạn đang sử dụng công cụ bug-report tự động nào đó thì con số duy nhất này sẽ được tự động tạo ra lần lượt mỗi khi bạn report các bug. (Ví dụ như bạn sử dụng redmine thì con số đó chính là id)

Lưu ý số và 1 mô tả ngắn gọn về mỗi bug mà bạn đã report.

**2) Khả năng tái hiện**

Nếu bug của bạn không thể tái hiện, thì nó sẽ không bao giờ được fix.

Bạn nên nêu rõ các bước để tái hiện bug. Đừng phỏng đoán hay bỏ qua bất kỳ bước tái hiện nào. 1 bug được mô tả step by step sẽ dễ dàng tái hiện và dễ dàng cho cả việc fix.

**3) Cụ thể hóa**

Đừng viết 1 bài luận về các issuse.

Cụ thể hóa tới các issuse chính. Cố gắng tóm tắt các issuse trong 1 vài câu theo cách hiệu quả nhất. Đừng kết hợp nhiều issuse ngay cả khi chúng có vẻ tương tự nhau. Viết các report khác nhau cho mỗi issuse.

## Bug report hiệu quả

Bug report là 1 khía cạnh quan trọng của software testing. 1 bug report hiệu quả truyền đạt tốt tới development team và tránh sự nhầm lẫn hoặc hiểu sai.

1 bug report tốt cần phải rõ ràng và súc tích mà không có bất cứ lỗi nghiêm trọng nào. Bất cứ sự thiếu rõ ràng nào dẫn đến sự hiểu lầm và nó cũng làm chậm quá trình tiến triển.Viết và báo cáo thiếu là 1 trong những vấn đề nghiêm trọng thường bị bỏ quên trong quá trình test.

Việc viết tốt là rất quan trọng cho việc lưu trữ 1 bug. Điểm quan trọng nhất mà 1 tester nên lưu ý không sử dụng 1 giọng điệu chỉ huy trong report. Việc này gây mất tinh thần và tạo ra 1 mối quan hệ công việc căng thẳng. Sử dụng 1 ngữ điệu đề xuất.

Đừng cho rằng các developer đã có 1 lỗi sai và do đó bạn có thể sử dụng những câu nói gay gắt. Trước khi reporting, điều quan trọng không kém là kiểm tra xem liệu bug đó đã được report hay chưa.

1 bug lặp là 1 gánh nặng trong quá trình test. Kiểm tra toàn bộ danh sách các bug đã biết. Đôi khi các developer đã biết các vấn đề và giữ nó cho 1 bản release trong tương lai. Các công cụ như Bugzilla sẽ tự động tìm kiếm các bug lặp nên bạn cũng có thể được sử dụng. Tuy nhiên, tốt nhất là bạn nên tìm kiếm thủ công với bất cứ bug lặp nào.

Các thông tin mà 1 bug report buộc phải truyền đạt là “làm thế nào?” và “ở đâu?” Report cần phải trả lời rõ ràng các test đã được thực hiện và nơi chính xác xảy ra lỗi. Người đọc sẽ dễ dàng tìm thấy bug và tìm ra bug ở đâu.

Lưu ý rằng các đối tượng của việc viết bug report là để cho phép các developer. Họ sẽ hiểu rõ lỗi từ các bug report. Phải nhớ cung cấp tất cả các thông tin liên quan mà developer đang tìm kiếm.

Ngoài ra, phải nhớ rằng 1 bug report sẽ được giữ để sử dụng trong tương lai và cần được viết thật tốt với những thông tin cần thiết. Sử dụng các câu súc tích và đơn giản để mô tả các bug của bạn. Đừng sử dụng những câu khó hiểu làm lãng phí thời gian của người review.

Report mỗi bug như là 1 issue riêng biệt. Trong trường hợp nhiều issue trong 1 bug report, bạn không thể close nó trừ khi tất cả các issue đã được giải quyết.

Do đó tốt nhất là chia các issue vào các bug riêng biệt. Việc này đảm bảo rằng mỗi bug có thể được xử lý tách biệt. 1 bug report được viết tốt giúp 1 developer tái hiện bug ở terminal của họ. Điều này giúp họ phán đoán issuse tốt hơn.

## Làm thế nào để report 1 bug?

Sử dụng các mẫu report bug đơn giản sau:

Đây là 1 định dạng bug report đơn giản. Nó có thể khác tùy thuộc vào công cụ bug report mà bạn sử dụng. Nếu bạn viết thủ công 1 bug report thì 1 số trường cần được đề cập cụ thể như Bug number, cần được gán thủ công.

**Reporter:**

Tên của bạn và địa chỉ email

**Product:**

Sản phẩm mà bạn tìm thấy bug này

**Version:**

Version của sản phẩm nếu có

**Component:**

Đây là các sub-module chính của sản phẩm.

**Platform:**

Đề cập đến nền tảng phần cứng mà bạn tìm thấy bug này. Các nền tảng khác nhau như “PC”, “MAC”, “HP”, “SUN”…

**Operating system:**

Kể ra tất cả các hệ điều hành mà bạn đã tìm thấy bug. Các hệ điều hành như Windows, Linux, Unix, Sun OS, Mac OS. Kể ra các phiên bản OS khác nhau như Windows NT, Windows 2000, Windows XP…nếu có.

**Priority:**

Khi nào 1 bug sẽ được fix? Priority thường được thiết lập từ P1 tới P5. P1 là “fix bug với priority cao nhất” và P5 là “fix khi thời gian cho phép”.

**Severity:**

Phần này mô tả ảnh hưởng của bug.

Các loại severity:

* Blocker: Việc test không thể tiếp tục thực hiện.
* Critical: crash ứng dụng, mất dữ liệu.
* Major: thiếu function lớn.
* Minor: thiếu function nhỏ.
* Trivial: Cải tiến 1 vài UI
* Enhancement: Yêu cầu 1 số tính năng mới hoặc cải tiến tính năng hiện có.

**Status:**
Khi bạn log bug vào bất cứ hệ thống theo dõi bug nào thì mặc định trạng thái của bug sẽ là “New”.
Sau đó, bug trải qua các giai đoạn khác nhau như fixed, verified, ropen, won’t fix…

**Assign to:**

Nếu bạn biết developer chịu trách nhiệm cho mô đun mà bug đã xảy ra, thì bạn có thể ghi chú địa chỉ email của developer đó. Nếu không thì để trống nó bởi việc này sẽ gán bug tới chủ sở hữu của mô đun nếu không manager sẽ gán bug tới các developer. Có thể bổ sung địa chỉ email của manager trong danh sách CC.

**URL:**

Trang URL mà bug đã xảy ra trên đó.

**Summary:**

1 bản tóm tắt về bug trong vòng 60 từ trở xuống. Đảm bảo tóm tắt của bạn phản ánh vấn đề là gì và nơi nó xảy ra.

**Description:**

1 mô tả chi tiết về bug.

Sử dụng các trường sau cho trường description:

* Các bước tái tạo: đê cập các bước tái tạo lỗi thật rõ ràng.
* Kết quả mong đợi: Làm thế nào ứng dụng hoạt động từ các bước nêu trên.
* Kết quả thực tế: Kết quả thực tế của việc chạy các bước trên, tức là trạng thái lỗi.

Đây là các bước quan trọng trong bug report. Bạn cũng có thể bổ sung “report type” giống như 1 trường mới mà sẽ miêu tả bug type.

Các loại report type bao gồm:

1.  Coding error
2. Design error
3. New suggestion
4. Documentation issue
5. Hardware problem

## Các điểm quan trọng trong bug report của bạn

Dưới đây chỉ ra 1 vài điểm quan trọng trong các bug report:

### 1) Bug number/id

1 bug number hay 1 số nhận diện (giống như swb001) làm cho việc report bug và tham chiếu tới 1 bug dễ dàng hơn nhiều. Developer có thể dễ dàng kiểm tra 1 bug đã được fix hay chưa. Nó làm cho toàn bộ quá trình test và retest trở nên mượt mà và dễ dàng hơn.

### 2) Bug title

1 bug title được đọc nhiều hơn bất kỳ phần nào của bug report. Nó nên diễn đạt tất cả mọi thứ có trong bug.

Bug title cần có tính gợi ý đầy đủ để người đọc có thể hiểu nó. 1 bug title rõ ràng làm nó dễ hiểu và người đọc có thể biết được bug đã được report trước đó hay đã được fix chưa.

### 3) Priority

Dựa trên các mức độ nghiêm trọng (severity) của bug, 1 priority có thể được thiết lập cho nó. 1 bug có thể là Blocker, Critical, Major, Minor, Trivial, hoặc 1 suggestion. 1 bug priority từ P1 tới P5 có thể được đưa ra để những vấn đề quan trọng được xem xét trước.

### 4) Platform/environment

Cấu hình của OS và browser là cần thiết. Đó là cách tốt nhất để chia sẻ cách mà bug có thể được tái hiện.

Nếu không có platform và environment chính xác, các ứng dụng có thể chạy khác nhau và các bug của tester có thể không thể tái hiện được. Bởi vậy tốt nhất là chỉ ra rõ ràng môi trường mà bug được phát hiện.

### 5) Description

Bug description giúp các developer hiểu bug. Nó mô tả các vấn đề đã gặp phải. Description không tốt sẽ tạo ra sự hiểu nhầm và lãng phí thời gian của các developer cũng như các tester.

Nó là cần thiết để truyền đạt 1 cách rõ ràng về các ảnh hưởng trong description. Nó luôn luôn hữu ích khi sử dụng các câu hoàn chỉnh. Đó là 1 cách truyền đạt tốt để mô tả mỗi vấn đề 1 cách riêng biệt thay vì bỏ mặc tất cả. Không sử dụng các cụm như “tôi nghĩ” hay “tôi tin”.

### 6) Các bước tái hiện

1 bug report tốt cần đề cập rõ ràng các bước tái hiện. Các bước nên bao gồm các hành động, cách thức mà dẫn đến bug. Không đưa ra các mô tả chung chung. Hãy cụ thể hóa trong các bước để dev dễ dàng làm theo.

Hãy xem xét 1 ví dụ về quy trình viết các bước tái hiện bug dưới đây:

Các bước:
1. Lựa chọn sản phẩm Abc01
3. Chọn Add to cart
4. Chọn remove để remove sản phẩm từ cart.

### 7) Kết quả mong đợi và thực tế

1 bug description là không hoàn chỉnh nếu không có kết quả mong đợi và thực tế. Nó là cần thiết để phác thảo kết quả của việc test là gì và user mong đợi điều gì. Người đọc sẽ biết chính xác kết quả của việc test là gì. Đưa ra kết luận rõ ràng, chuyện gì đã xảy ra trong suốt quá trình test và kết quả là gì.

## 8) Screenshot

1 bức ảnh đáng giá ngàn lời nói. Đưa ra ảnh chụp màn hình của trường hợp lỗi với chú thích thích hợp để highlight lỗi. Highlight các bản tin lỗi không mong đợi với màu đỏ nhạt. Điều này thu hút sự chú ý đến khu vực cần thiết.

## 1 số mẹo để viết 1 bug report thật tốt 

Dưới đây đưa ra 1 số mẹo bổ sung để viết 1 bug report thật tốt:

### 1) Report các vấn đề ngay lập tức

Nếu bạn tìm thấy bất kỳ bug nào trong khi test, thì không cần đợi để viết 1 bug report chi tiết. Thay vào đó viết bug report ngay lập tức. Điều này sẽ đảm bảo 1 bug report tốt và có thể tái tạo. Nếu bạn quyết định viết bug report sau thì có nguy cơ cao bỏ sót các bước quan trọng trong report của bạn và cũng rất có thể bạn không nhớ được cách tái hiện lại bug.

### 2) Tái tạo bug 3 lần trước khi viết 1 bug report

Bạn nên tái hiện lại bug trước khi viết bug report. Đảm bảo các bước của bạn chắc chắn để tái hiện bug mà không có bất cứ sự mơ hồ nào. Nếu bug của bạn không thể tái hiện lại bạn có thể vẫn trình lên 1 bug và đưa ra bản chất định kỳ của bug.

### 3) Test cùng 1 bug xảy ra trên các mô đun tương tự khác

Đôi khi developer sử dụng code giống nhau cho các mô đun tương tự khác. Vì vậy có nhiều khả năng bug trong 1 mô đun cũng xảy ra trong các mô đun tương tự khác. Thậm chí bạn có thể thử tìm phiên bản có bug nghiêm trọng hơn những gì bạn đã tìm thấy.

### 4) Viết 1 bản tóm tắt bug tốt

Bug summary sẽ giúp các developer nhanh chóng phân tích bản chất lỗi. 1 report chất lượng kém sẽ làm tăng thời gian code và test 1 cách không cần thiết. Truyền đạt tốt với bug report summary của bạn. Hãy nhớ rằng bug summary được sử dụng làm tài liệu tham khảo để tìm kiếm bug trong bug inventory.

### 5) Đọc bug report trước khi nhấn nút submit

Đọc tất cả các câu, các từ và các bước được sử dụng trong bug report. Để ý nếu có bất kỳ câu nào đang tạo sự mơ hồ mà có thể dẫn đến hiểu sai. Tránh các từ hay các câu sẽ gây hiểu lầm để có 1 bug report thật rõ ràng.

### 6) Đừng lạm dụng ngôn ngữ

Thật tuyệt khi bạn đã làm tốt 1 công việc và tìm thấy 1 bug nhưng đừng sử dụng ảnh hưởng này để chỉ trích developer hay công kích bất kỳ cá nhân nào.

## Kết luận

Không nghi ngờ gì nữa bug report của bạn phải là 1 tài liệu chất lượng cao.

Tập trung vào việc viết các bug report thật tốt và dành 1 chút thời gian cho việc này vì đây là điểm giao tiếp chính giữa tester, developer và manager. Các manager sẽ đưa nhận thức tới team của họ rằng việc viết 1 bug report tốt là trách nhiệm chính của bất cứ tester nào.

Nỗ lực của bạn để viết 1 bug report tốt sẽ không chỉ tiết kiệm tài nguyên cho công ty mà còn tạo 1 mối quan hệ tốt giữa bạn và các developer.

Tham khảo: [https://www.softwaretestinghelp.com/how-to-write-good-bug-report/](https://www.softwaretestinghelp.com/how-to-write-good-bug-report/)