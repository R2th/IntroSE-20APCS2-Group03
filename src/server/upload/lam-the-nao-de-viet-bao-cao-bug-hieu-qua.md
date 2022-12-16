## Tại sao cần báo  cáo bug hiệu quả?

Nếu báo cáo bug của bạn hiệu quả, thì khả năng fix lỗi của nó sẽ cao hơn. Bởi fix 1 bug phụ thuộc vào cách bạn báo cáo nó có hiệu quả hay không. Báo cáo bug không có gì ngoài kỹ năng và tôi sẽ giải thích làm thế nào để đạt được kỹ năng này.

“Điểm mấu chốt của việc viết báo cáo vấn đề (bug report) là để fix được các bug” _ Cem Kaner. Nếu tester không báo cáo chính xác 1 bug, dev sẽ reject bug này nói rằng nó không thể fix được.

Điều này có thể làm ảnh hưởng đến tinh thần của các tester và đôi khi cũng là cái tôi của họ. (Tôi khuyên bạn không nên giữ bất kỳ cái tôi nào. Kiểu như “tôi đã report bug chính xác”, “Tôi có thể giả lập lại nó”, “Tại sao họ lại reject bug?”, “Nó không phải lỗi của tôi”…)

![](https://images.viblo.asia/dc61207f-ff2f-4a48-aaca-7f3110371b3c.jpg)

## Những đặc trưng của báo cáo bug hiệu quả là gì?

Bất kỳ ai cũng có thể viết 1 bug report. Nhưng không phải ai cũng có thể viết 1 bug report hiệu quả.

Bạn sẽ có thể phân biệt giữa 1 bug report trung bình và 1 bug report tốt. Làm cách nào để phân biệt giữa 1 bug report tốt và chưa tốt? Rất đơn giản, đó là áp dụng các đặc điểm và kỹ thuật sau đây để báo cáo bug.

**Các đặc điểm và kỹ thuật bao gồm:**

### 1. Bug number phải được chỉ rõ ràng:

Luôn luôn gán 1 số duy nhất với mỗi bug report. Điều này sẽ giúp bạn xác định được các bug report. Nếu bạn sử dụng các công cụ bug report tự động thì con số duy nhất này sẽ được tạo tự động trong mỗi lần bạn report các bug.

Lưu lại các số và 1 mô tả ngắn gọn mỗi bug mà bạn đã report.

### 2. Tái hiện:

Nếu bug của bạn không thể tái hiện, thì nó sẽ không bao giờ được fix.

Bạn nên đề cập rõ ràng từng bước để tái hiện lỗi. Đừng phỏng đoán hay bỏ qua bất kỳ bước tái hiện nào. Bug mà được mô tả từng bước chi tiết thì rất dễ để tái hiện và fix chúng.

### 3. Cụ thể hóa:

Đừng viết 1 bài tiểu luận về các vấn đề.

Hãy cụ thể các điểm chính. Cố gắng tóm tắt các vấn đề bằng số, chữ tối thiểu nhưng theo 1 cách hiệu quả. Đừng kết hợp nhiều vấn đề ngay cả khi chúng có vẻ giống nhau. Nên viết các report khác nhau cho mỗi vấn đề.

## Bug report hiệu quả

Bug report là 1 khía cạnh quan trọng của kiểm thử phần mềm. 1 bug report hiệu quả truyền đạt tốt tới các team phát triển và tránh nhầm lẫn hoặc truyền đạt sai.

1 bug report tốt phải rõ ràng và xúc tích mà không thiết xót bất kỳ điểm quan trọng nào. Bất kỳ sự thiếu rõ ràng nào đều dẫn đến sự hiểu lầm và làm chậm quá trình phát triển. Sai xót viết và report là 1 trong những điều quan trọng nhất nhưng chúng lại bị thờ ơ trong các vòng test.

Viết báo cáo tốt thực sự rất quan trọng khi khai báo 1 bug. Điểm quan trọng nhất mà 1 tester cần lưu ý là không sử dụng  giọng điệu chỉ huy trong các report. Điều này làm mất tinh thần và tạo ra mối quan hệ công việc không lành mạnh. Hãy sử dụng những câu từ, ngữ điệu mang tính gợi ý, đề nghị.

Đừng cho rằng các dev đã mắc lỗi và do đó bạn có thể dùng những từ ngữ khó nghe. Trước khi report, điều quan trọng không kém là kiểm tra xem bug đã được report hay chưa.

1 bug trùng lặp là 1 gánh nặng trong chu trình test. Kiểm tra toàn bộ danh sách các bug đã biết. Đôi khi, các dev có thể đã biết vấn đề và bỏ qua cho tới 1 bản release trong tương lai. Các công cụ như Bugzilla tự động tìm kiếm các bug trùng lặp có thể được sử dụng. Tuy nhiên, tốt nhất là tìm thủ công đối với các bug trùng lặp.

Các thông tin quan trọng mà 1 bug report phải truyền đạt là “How?” và “where?”. Các report phải trả lời rõ ràng việc test được thực hiện thế nào và các sai xót chính xác là ở đâu. Người đọc sẽ dễ dàng tái hiện các bug và tìm ra nơi có bug.

Hãy nhớ rằng mục tiêu của việc viết các bug report là để cho phép các dev hình dung về các vấn đề. Họ sẽ hiểu rõ các sai xót từ các bug report. Hãy nhớ cung cấp tất cả các thông tin liên quan mà các dev đang tìm kiếm.

Ngoài ra, cần nhớ rằng 1 bug report sẽ được lưu trữ để sử dụng trong tương lai và cần được viết thật tốt với các thông tin được yêu cầu. Sử dụng các câu đầy đủ ý nghĩa và các từ đơn giản để mô tả các bug của bạn. Đừng sử dụng những phát biểu khó hiểu làm lãng phí thời gian của người xem.

Report mỗi bug như là 1 issue riêng biệt. Trường hợp có nhiều issue trong 1 bug report, bạn không thể đóng nó trừ khi tất cả các issue đã được giải quyết.

Do đó tốt nhất là chia các issue thành các bug tách biệt. Điều này đảm bảo rằng mỗi bug có thể được xử lý tách biệt. 1 bug report được viết tốt giúp cho 1 dev tái hiện bug ở thiết bị đầu cuối của họ. Điều này giúp họ chuẩn đoán issue tốt.

## Làm thế nào để báo cáo 1 bug?

Sử dụng các mẫu bug report đơn giản sau:

Đây là 1 định dạng bug report đơn giản. Nó có thể thay đổi phụ thuộc vào công cụ bug report mà bạn đang sử dụng. Nếu bạn đang viết 1 bug report thủ công thì 1 số trường cần được đề cập cụ thể như bug number, cái mà cần được gán thủ công.

**Reporter**: Tên và địa chỉ email của bạn

**Product**: Sản phẩm mà bạn tìm thấy bug này

**Version**: Version của sản phẩm nếu có.

**Component**: Đây là những sub-module chính của sản phẩm.

**Platform**: Đề cập đến hardware platform mà bạn tìm thấy bug này. Các platform khác nhau như “PC”, “MAC”, “HP”, “Sun”…

**Operating system**: Đề cập đến tất cả các hệ điều hành mà bạn tìm thấy bug. Các hệ điều hành như Windows, Linux, Unix, SunOS, Mac OS. Đề cập đến các version khác nhau của OS như Windows NT, Windows 2000, Windows XP… nếu có.

**Priority**: Khi nào 1 bug cần được fix? Độ ưu tiên thường được đặt từ P1 tới P5. P1 khi “fix bug với độ ưu tiên cao nhất” và P5 khi “Fix khi thời gian cho phép”.

**Severity**: Điều này mô tả tác động của bug.

Các cấp độ nghiêm trọng:

* Blocker: không thể thực hiện công việc test nào nữa.

* Critical: Application crash, mất dữ liệu.

* Major: Thiếu hụt nhiều function.

* Minor: Thiếu hụt 1 vài function.

* Trivial: Cải tiến 1 số UI.

* Enhancement: yêu cầu 1 tính năng mới hoặc cải tiến 1 tính năng hiện có.

**Status**: Khi bạn log bug vào bất cứ hệ thống theo dõi bug nào thì mặc định trạng thái của bug sẽ là ‘New’.

Sau đó, bug qua các giai đoạn khác nhau như fixed, verified. Reopen, won’t fix…

**Assign to**: Nếu bạn biết phần mà dev chịu trách nhiệm cho module cụ thể mà bug đã xảy ra, thì bạn có thể chỉ định email của dev đó. Ngược lại để trống nó vì điều này sẽ gán bug tới chủ sở hữu của module nếu không manager sẽ gán bug tới dev. Có thể bổ sung địa chỉ email của manager trong CC list.

**URL**: URL page mà bug đã xảy ra.

**Summary** :1 bản tóm tắt ngắn gọn của bug trên dưới 60 câu từ. Đảm bảo bản tóm lược của bạn phản ánh được vấn đề là gì và nó ở đâu.

**Description**: mô tả chi tiết về bug.

Sử dụng các trường sau cho trường description:

* Các bước tái hiện: Rõ ràng, đề cập các bước để tái hiện bug.

* Kết quả dự kiến: Ứng dụng sẽ thực thi thế nào trên các bước đã đề cập nêu trên.

* Kết quả thực tế: Kết quả thực tế của việc chạy các bước trên là gì … Hành vi lỗi.

Đây là các bước quan trọng trong bug report. Bạn cũng có thể bổ sung “report type” như 1 trường nữa mà sẽ mô tả bug type.

Các report type bao gồm:
1. Coding error
2.  Design error
3.  New Suggestion
4.  Documentation issue
5.  Hardware problem

## Các điểm quan trọng trong bug report của bạn

Dưới đây là các điểm quan trọng trong bug report của bạn:

### 1. Bug number/id:

1 bug number hay 1 ID number (như swb001) giúp bug được report và tham chiếu dễ dàng hơn. Các dev có thể dễ dàng kiểm tra nếu 1 bug cụ thể đã được fix hay chưa. Nó làm cho toàn bộ quá trình test và retest mượt mà và dễ dàng hơn.

### 2. Bug title:

1 bug title được đọc thường xuyên hơn bất cứ phần nào khác của bug report. Nó sẽ nói tất cả về những gì đến trong bug.

Bug title nên gợi ý vừa đủ mà người đọc có thể hiểu nó. 1 bug title rõ ràng làm nó dễ hiểu và người đọc có thể biết được bug đã được report trước đó hay đã được fix.

### 3. Priority:

Dựa vào mức động nghiêm trọng của bug, có thể đặt mức độ ưu tiên cho bug. Mỗi bug có thể là Blocker, Critial, Major, Minor, Trivial... Có thể đưa ra mức độ ưu tiên của lỗi từ P1-P5 để những bug quan trọng sẽ được ưu tiên trước.

### 4. Platform/Environment:

OS và trình duyệt là điều rất cần thiết cho 1 báo cáo bug rõ ràng. Đây là cách tốt nhất để có thể dễ dàng tái hiện một bug.

Nếu không có platform hoặc môi trường chính xác, thì ứng dụng có thể hoạt động khác đi và bug trên thiết bị của tester sẽ không tái hiện được trên thiết bị của dev. Do đó, tốt nhất nên đề cập rõ ràng đến môi trường phát hiện ra bug.

### 5. Description:

Bug description giúp các dev hiểu bug. Nó mô tả các vấn đề gặp phải. Description nghèo nàn sẽ tạo sự nhầm lẫn và lãng phí thời gian của các dev và các tester.

Cần truyền đạt rõ ràng về ảnh hưởng trong descripton. Cần sử dụng các câu hoàn chỉnh. Nó là 1 thói quen tốt để mô tả mỗi vấn đề 1 cách tách biệt thay vì phá vỡ hoàn toàn chúng. Đừng sử dụng các thuật ngữ như “tôi nghĩ” hay “tôi tin”.

### 6. Các bước để tái hiện:

1 bug report tốt nên đề cập rõ ràng các bước để tái hiện. Các bước nên bao gồm các hành động mà dẫn đến bug. Đừng làm những tuyên bố chung chung. Hãy cụ thể các bước để làm theo.

1 ví dụ điển hình của 1 phương pháp viết tốt được đưa ra dưới đây”

Các bước:
1. Chọn product Abc01.

2. Kích vào add to cart.

3. Kích vào remove để xóa product từ cart.

### 7. Kết quả dự kiến và thực tế.

1 bug description không đầy đủ nếu không có kết quả dự kiến và thực tế. Cần phải phác thảo kết quả của việc test và những gì user sẽ mong đợi. Người đọc sẽ biết kết quả chính xác của việc test là gì. Rõ ràng, đề cập đến những gì đã xảy ra trong quá trình test và kết quả là gì.

### 8. Ảnh chụp màn hình:

1 bức ảnh có thể đáng giá hơn ngàn lời nói. Chụp 1 ảnh màn hình của trường hợp lỗi với chú thích thích hợp để highlight khuyết điểm. Highlight các thông báo lỗi không mong đợi bằng màu đỏ. Điều này thu hút sự chú ý đến các khu vực cần thiết.

## Một số mẹo để viết 1 bug report tốt

Dưới đây là 1 số mẹo bổ sung để viết 1 bug report tốt:

### 1. Report vấn đề ngay lập tức:

Nếu bạn thấy bất kỳ bug nào trong khi test, thì ko cần đợi để viết 1 bug report chi tiết. Thay vào đó viết bug report ngay lập tức. Điều này sẽ đảm bảo 1 bug report tốt và tái hiện được. Nếu bạn quyết định viết bug report sau thì có nhiều khả năng bỏ xót các bước quan trọng trong report của bạn.

### 2. Tái tạo bug 3 lần trước khi viết 1 bug report:

Bug của bạn nên được tái hiện. Chắc chắn rằng các bước của bạn là đủ chính xác để tái hiện bug mà không có bất cứ sự mơ hồ nào. Nếu bug không tái hiện được mọi lúc bạn vẫn có thể gửi 1 đề xuất bug có tính chất định kỳ.

### 3. Test sự xuất hiện của cùng bug trên các module tương tự khác:

Đôi khi các dev sử dụng cùng code cho các module tương tự khác nhau. Vì vậy nhiều khả năng bug trong 1 module xảy ra trong các module tượng tự khác. Bạn thậm chí thử cố tìm các version nghiêm trọng hơn bug bạn đã tìm thấy.

### 4. Viết 1 bug summary tốt:

Bug summary sẽ giúp các dev nhanh chóng phân tích bản chất bug. 1 report chất lượng nghèo nàn sẽ làm tăng thời gian phát triển và test không cần thiết. Cần truyền đạt tốt tóm tắt 1 bug report của bạn. Nhớ rằng bug summary được sử dụng như 1 tài liệu tham chiếu để tìm kiếm bug.

### 5. Đọc lại bug report trước khi ấn nút submit:

Đọc lại tất cả câu chữ và các bước được sử dụng trong bug report. Xem nếu bất kỳ câu nào đang tạo sự mơ hồ mà có thể dẫn đến giải thích sai. Những câu từ gây hiểu lầm nên tránh để có 1 bug report rõ ràng.

### 6. Đừng lạm dụng ngôn ngữ:

Thật tuyệt vời khi bạn đã làm 1 công việc tốt và tìm thấy 1 bug mà không dùng công lao đó để chỉ trích các dev hay công kích bất kỳ cá nhân nào.

## Kết luận

Không còn nghi ngờ nào nữa, bug report của bạn phải là 1 tài liệu chất lượng.

Tập trung vào việc viết các bug report tốt và dành thời gian cho công việc này bởi vì đây là điểm giao tiếp chính giữa tester, dev và các manager. Các manager nên tạo ra nhận thức để team của họ biết rằng việc viết 1 bug report tốt là trách nhiệm chính của bất cứ tester nào.

Nỗ lực của bạn đối với việc viết 1 bug report tốt sẽ không chỉ tiết kiệm nguồn lực của công ty mà còn tạo ra 1 mối quan hệ tốt giữa bạn và các dev.

**Tham khảo**: [https://www.softwaretestinghelp.com/how-to-write-good-bug-report/ ](https://www.softwaretestinghelp.com/how-to-write-good-bug-report/ )