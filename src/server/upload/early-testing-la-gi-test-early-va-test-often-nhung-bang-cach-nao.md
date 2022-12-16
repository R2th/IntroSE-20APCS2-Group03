# Khái niệm Early Testing
Việc kiểm thử phần mềm nên bắt đầu sớm trong vòng đời phát triển phần mềm (Software Development Life Cycle - SDLC). Việc này giúp nắm bắt được và triệt tiêu sớm những rủi ro và nhược điểm trong phase lấy requirement và phase design trong vòng đời phát triển phần mềm. Việc kiểm thử sớm sẽ giúp giảm thiểu số lượng lỗi và tối ưu công số vào cuối dự án.

Các khía cạnh khác nhau của **Early Testing**  giúp QA Managers và QA Leader trong quá trình phát triển dự án và đưa ra được tài liệu chiến lược Test trong SDLC sẽ được giải thích trong bài viết này.

Việc kiểm thử sớm sẽ mang lại ảnh hưởng rất lớn tới khi bàn giao sản phẩm.

![](https://images.viblo.asia/39c064e1-16b5-42bc-b06b-4dcdb248aea3.png)


**Tới cuối bài viết này, người đọc nói chung, hay QA Manager, QA Leader và các Tester nói riêng sẽ có những hiểu biết nhất định về những khái niệm dưới đây:**
* Tại sao nên tiến hành  Early Testing trong Vòng đời phát triển dự án (Trong dự án hay trong khi Release sản phẩm)
* Scope effort của Early Testing

     ・Kiểm thử sớm những phần nào     
     ・Bắt đầu và kết thúc (Start and Exit)
     
*  Ưu và nhược điểm


Giờ hãy cùng tìm hiểu từng phần một cách chi tiết

# Nguyên tắc Kiểm thử
### Phần 1 - Đơn giản hoá các nguyên tắc kiểm thử

![](https://images.viblo.asia/9219075e-ce32-43f7-ba37-d6b03a32faf4.png)

Đối với release phần mềm hay hệ thống cũng như sản phẩm trong Vòng đời phát triển phần mềm, có nhiều phương pháp cũng như chiến lược rõ ràng cho phần lớn các nguyên tắc kiểm thử dưới đây:

* Kiểm thử là gì?
* Tại sao phải kiểm thử?
* Phải kiểm thử những gì?
* Phương pháp kiểm thử?


Tuy nhiên, một trong số những câu hỏi xuyên suốt mà rất nhiều người đọc, Tester, QA Leader hay cả QA Manager sẽ hỏi hoặc muốn tìm hiểu rõ hơn trong biểu đồ phía trên phần màu xám trong Phần 1

* Khi nào nên bắt đầu test? Trong khi release phần mềm hay nên bắt đầu test trong project?
* Khi nào nên bắt đầu test và khi nào có thể kết thúc việc test?
* Tại sao nên tiến hành kiếm thử sớm trong Vòng đời phát triển phần mềm?
* Và kiểm thử sớm là gì trong khi phát triển phần mềm?

Hiểu một cách đơn giản nhất đối với người đọc, tất cả đã được gói gọn trong 4 câu hỏi kể trên dưới một chiêc ô mang tên **Early Testing**

# Tại sao nên Kiểm thử sớm trong Vòng đời phát triển phần mềm?

Vậy hãy cùng thảo luận về những event và những activity là một phần của quá trình test.

Thông thường, đội Project Manager sẽ assign một Project Manager (PM) cho một release phần mềm hay một Project nhất định. PM sẽ hoạt động với tất cả các bên liên quan bao gồm Marketing, Development, QA và Team Support để cùng đưa ra Release Schedule.

Trong bài viết này, sẽ đề cập tới **Quarterly Release Schedule** - Release Schedule theo hàng quý sử dụng mô hình Waterfall (Thác đổ) để giải thích về concept Kiểm thử sớm một cách chi tiết.

## Software Release Testing Schedule

Phần lớn các công ty và tổ chức vẫn tuân theo mô hình truyền thống là **Time Based Release** (TBR) tức là phần mềm hay sản phẩm sẽ được release theo kế hoạch từng quý hay nửa năm cũng như một năm bàn giao sản phẩm.

Phần lớn, mô hình Waterfall được sử dụng để tiến hành release phần mềm, hay trong một số case là những mô hình release có vòng đời nhỏ hơn, như là  mô hình Agile/Scrum sẽ được sử dụng trong nhứng case này.

### Phần 2 - Quarterly Release Testing Schedule điển hình (Không phải toàn bộ dự án hoặc Release Schedule)

![](https://images.viblo.asia/f2c52f8b-f721-4f46-86ed-f69224bab260.png)

## Tác động rủi ro cao và những lỗi nghiêm trọng 

### Phần 3 - Rủi ro và những lỗi nghiêm trọng điển hình

![](https://images.viblo.asia/b5527666-58be-40d2-8949-9f55f1afe99f.png)

**Chủ yếu**, trong quá trình test, thì được kì vọng rằng

* Những bug rủi ro cao và những lỗi nghiêm trọng sẽ được phát hiện và log bởi các Tester.
* Dev sẽ cần để fix những lỗi đó.
* Sau đó, tester sẽ cần phải xác nhận lãi những lỗi được fix.

**Tiếp theo**, nhiều tổ chức trải qua việc phát triển rất nhiều Sản phẩm và Phần mềm đã thừa nhận rằng việc fix và xác nhận các bug có rủi ro cao và những lỗi nghiêm trọng có một lượng lớn là:
* Bug hiệu năng - Tốn nhiều thời gian để xử lý
* Tốn kém tài nguyên (Do con người cũng như do máy móc)
* Tính phụ thuộc, khi fix các bug có rủi ro cao sẽ chạm tới phần lớn code và phần này bao gồm rất nhiều vùng chức năng khác.

**Cuối cùng**,  nếu lượng lớn các bug có rủi ro cao được phát triện trong giai đoạn cuối khi release, thì một hay nhiều các ảnh hưởng tiêu cực dưới đây sẽ xảy ra.
* Xác xuất cao rằng chu kì Test sẽ rộng hơn.
* Xác suất cao rằng sẽ không đảm bảo deadline release
* Một function có lượng lớn các bug và rủi ro sẽ không được release trong phase đó
* Commiment với khách hàng sẽ không được đảm bảo.

### Vậy còn những ảnh hưởng khác thì sao?

Những ảnh hưởng và bug ưu tiên medium và low được phát hiện sẽ được log bởi các Tester. Sau đó được chuyển tiếp cho phía Dev và team QA tiếp nhận và xử lý. Tổng thể, thì đây là một quá trình cồng kềnh.

### Sẽ không có những Viên đạn bạc

Có một thực tế rằng sẽ không có một quá trình test nào có thể cover cũng như tìm ra được toàn bộ ảnh hưởng và bug của Phần mềm, Sản phẩm cũng như hệ thống có. Đồng nghĩa với việc, sẽ không có kết thúc cho việc test hay là không có lỗi của sản phẩm

Tuy nhiên, từ quan điểm '**Tính tương thích của Service**' trong môi trường cạnh tranh và mô hình tiếp thị, sẽ cần phải phá vỡ mindset trước đây để có thể phát hiện sớm trong vòng đời Release, đặc biệt là phát hiện các bug rủi ro cao và những lỗi nghiêm trọng.

Bất kì hay toàn bộ những phần kể trên đều sẽ gây ảnh hưởng tiêu cực với việc kinh doanh của các công ty và tổ chức. Với kịch bản như vậy thì việc đưa '**Early Testing**' như là **một phần Test độc lập** sẽ mang lại lợi ích tổng thể cho Vòng đời phát triển phần mềm cho Project cũng như Release.

## Phạm vi của Early Testing Effort

Chúng ta đã có những hiểu biết nhất định về mục tiêu của Early Testing từ phần trước '**Tại sao nên kiểm thử sớm?**', vậy hãy cùng thảo luận về '**Phạm vi của Early Testing Effort**' một cách chi tiết.

Như đã đề cập, kiểm thử sớm như một hoạt động mới sẽ được theo dõi riêng trong toàn bộ quá trình test, nên phạm vi test effort sẽ được giải thích theo như dưới đây

**Giả định**:

* Toàn bộ Project hay Software Release schedule được approve và cung cấp cho tất cả các bên liên quan. 
* Tài liệu chiến lược Test tổng quan được phát triển, review và được approve bởi toàn bộ các bên liên quan.
* Các tính năng có độ ưu tiên High, Medium, Low sẽ được test và được lưu lại vào các tài liệu test.
* Test plan và Testcase cho toàn bộ chức năng sẽ được phát triển, review và được approved bởi toàn bộ các bên liên quan.
* Toàn bộ Test plan và Testcase sẽ được upload vào kho lưu trữ chung cho việc tracking việc kiểm thử.
* Toàn bộ nhân lực, thiết bị có sẵn, và các tool đều có sẵn cho việc test và thực hiện theo Test plan.


## Kiểm thử sớm những gì?

### Phần 4 - Tổng quan cách tiếp cận phạm vi kiểm thử sớm

![](https://images.viblo.asia/672493b2-6f0b-47cb-b641-f49177d86d94.png)

**Cách tiếp cận**

* Lấy một **Ví dụ** Release XYZ có 3 chức năng ưu tiên cao là A, B và C, 10 chức năng ưu tiên trung bình và 15 chức năng ưu tiên thấp.
* Những chức năng ưu tiên cao là những tính năng tạo ra doanh thu lớn/ tuân thủ tiêu chuẩn/ bắt kịp đối thủ cạnh tranh/ hoặc tất cả những điều này.
* Các tính năng ưu tiên cao thường bao gồm những xử lý code phức tạp, LOC (Lines of code) lớn.
* LOC càng lớn sẽ đồng nghĩa với việc khả năng cao sẽ ảnh hưởng tới nhiều xử lý.
* Thông thường các tính năng ưu tiên cao và/hoặc những tính năng có LOC lớn sẽ là nhứng ứng viên đầu tiên cho việc Kiểm thử sớm.
* Không cần phát triển một Test Plan riêng biệt cho hoạt động Kiểm thử sớm.
* QA Leader hoặc Tester cùng với Dev Lead hoặc một vài chuyên gia cần cùng nhau thảo luận và đồng thuận trong việc Code/Test của hoạt động test này. 
* Xác định những testcase độ ưu tiên cao một cách thích hợp và thậm chí một số test case có độ ưu tiên trung bình nếu bạn nghĩ đó là cần thiết trong mỗi chức năng thành Test plan A, B và C.
* Một khi đã xác định được các chức năng  và Testcase con thích hợp, hãy đảm bảo rằng chúng có thể được track lại bằng cách sử dụng các Tracking Tools được quy định bởi công ty và tổ chức.

**Hint: Hợp tác chính là chìa khoá!** Trong quá trình kiểm thử sớm thì cả team Dev và QA cần hợp tác chặt chẽ để đảm bảo đạt được các mục tiêu đề ra với một kết quả chất lượng.

## Bắt đầu và kết thúc Kiểm thử sớm (Start và Exit Early Test)

Có một điều rất quan trọng rằng cả team Dev và QA cần động não và đồng nhất với toàn bộ phương pháp tiếp cận của toàn bộ quá trình Kiểm thử sớm bao gồm ngày bắt đầu và kết thúc.

**Tiêu chí đầu vào để Bắt đầu:**
* Tỉ lệ hoàn thành Test tích hợp (Intergration Test)
* Số lượng open bug
* Không có những trở ngaị để bắt đầu Kiểm thử sớm.

**Phase hoạt động**
* Quá trình tracking
* Số lượng code giảm trong quá trình test
* Fix bug
* Tiến hành xác nhận các bug 
* Lưu lại kết quả test

**Tiêu chí kết thúc**
* Bàn giao các hoạt động test để chuyển tới Phase test tiếp theo (Thường là Test chức năng).
* Giải quyết các bug chưa được xử lý trong quá trình Kiểm thử sớm.
* Giải quyết các trở ngại nếu có cho phase test tiếp theo.
* Công bố kết quả Kiểm thử sớm.

## Ưu và nhược điểm

Mỗi phương pháp đều có ưu và nhược điểm khác nhau.

Hãy cùng xem những ưu và nhược điểm của phương pháp này.

**Ưu điểm:**
* Rất phù hợp với mô hình Waterfall (Thác đổ).
* Giúp phát hiện các bug nghiêm trọng sớm trong quá trình test.
* Phát hiện được các bug nghiêm trọng và những rủi ro trong quá trình test.
* Giúp team Dev ổn định sớm code.
* Giúp giảm thiểu những ảnh hưởng khi fix bug.
* Giúp team Dev phát hiện sớm những lỗ hổng của các chức năng có liên quan với nhau sớm hơn.
* Team Manager có thể đưa ra các quyết định kinh doanh phù hợp dựa trên những các bug nghiêm trọng chưa được xử lý và trong bản Release và trong Project đó.
* Giúp mở rộng phạm vi test được cover và những ảnh hưởng của quá trình test.
* Giúp phân chia effort Dev và Test một cách hiệu quả hơn.

**Nhược điểm:**
* Không lý tưởng cho mô hình Agile/Scrum. Tuy nhiên các mô hình như vậy có thể tiến hành kiếm thử sớm trong từng Sprint với scope thích hợp.
* Có khả năng sẽ giảm thời gian test tích hợp (Integration test) bởi đội ngũ Dev.

# Tổng kết
Khách hàng và end user mua hay sử dụng những sản phẩm có tính tương thích cao với service hay một hệ thống cũng như giải pháp. Yêu cầu quan trọng nhất chính là xác thực phần mềm đang chạy có khả năng đáp ứng với hệ thống và sản phẩm có tính tương thích cao với service ấy.

Những phần chính của các nguyên tắc kiểm thử như là Tại sao cần kiểm thử? Cần kiểm thử những gì? Kiểm thử bằng cách nào? đều được định nghĩa. Tuy nhiên, sẽ có những câu hỏi xuyên suốt trong tâm trí người đọc về những concept như Early Testing.

Chấp nhận Kiểm thử sớm như một phần không thể thiếu trong Testing Schedule cho bất kì dự án cũng như hệ thống nào sẽ mang lợi ích vô cùng to lớn tới cho công ty và tổ chức nhằm đem tới một sản phẩm chất lượng tới người dùng.


Nguồn: https://www.softwaretestinghelp.com/early-testing/