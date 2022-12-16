### Tổng quan hoàn chỉnh về quy trình QA testing phần mềm từ đầu đến cuối:

*Lưu ý - Chúng tôi đang xuất bản lại bài đăng hữu ích này với nội dung được cập nhật.*

Công việc của một Tester phần mềm không phải là một công việc dễ dàng. Nó chứa đầy những thách thức, cũng nhiều đòi hỏi không kém. Tester có nghĩa vụ phải cảnh giác và nhiệt tình trong từng giai đoạn của vòng đời ứng dụng.

Mặc dù có những thách thức, có một vài cơ hội lớn cũng như tìm hiểu và khám phá các khía cạnh khác nhau của phương pháp testing, quy trình và tất nhiên là phần mềm một cách chi tiết.

Vai trò của một tester bắt đầu từ rất sớm. Và ngay từ khi khái niệm hóa dự án, tester đã tham gia vào các cuộc thảo luận với product owner, người quản lý dự án và các bên liên quan (stakeholders) khác nhau.

| **Hình 1** | 
| -------- | 
| ![](https://images.viblo.asia/97d3428d-2e8f-4757-bbd1-ef75a687ade5.jpg)| 

***Hướng dẫn này về “Software Testing Process flow / Flow quy trình testing ”, cung cấp cho một cái nhìn tổng quan hoàn chỉnh về các giai đoạn khác nhau trong STLC (Chi tiết mô tả ở “Hình 2” ) cùng với các thách thức liên quan và thực tiễn tốt nhất để vượt qua những thách thức đó một cách dễ hiểu.***

| Bạn sẽ học những gì ở bài này: | |
| -------- | -------- | 
|***A_Requirement to Release – A Complete Overview***<hr> *(Từ yêu cầu cho đến phát hành_Tổng quan hoàn chỉnh)*| #1) Requirement *(Yêu cầu của product owner)* <hr> #2) Test Strategy  *(Chiến lược test)* <hr> #3) Test Planning *(Lập kế hoạch test)* <hr> #4) Testing  <hr> #5) Before Release *(Những việc cần làm trước khi phát hành)* <hr> #6) Release *(Phát hành)* |
|***B_QA Testing Process on a Real Project – Waterfall Method***  | *(Quy trình QA testing trên một dự án thực tế)* |
|***C_Steps in Requirements to Release*** | *(Các giai đoạn từ Yêu cầu cho đến Phát hành)* |
|***D_Conclusion***  |*(Kết luận)*  |

#  A_Requirement To Release – A Complete Overview

| **Hình 2** | 
| -------- | 
| ![](https://images.viblo.asia/2d83900f-8067-4433-a134-f6cebad28752.jpg)  | 

**Ngay từ Yêu cầu cho đến Phát hành, từng giai đoạn được giải thích rõ ràng. Hãy xem xét chi tiết chúng.**

## #1) Requirement

Một dự án không thể bắt đầu mà không có yêu cầu rõ ràng. Đây là giai đoạn quan trọng nhất mà các ý tưởng cần được viết trong một tài liệu dễ hiểu và được tài liệu hoá (document). Nếu bạn là một phần của dự án bạn đang tham gia vào giai đoạn thu thập yêu cầu, thì hãy coi mình là người may mắn.

Tự hỏi tại sao? Đó là bởi vì bạn đang chứng kiến một dự án làm từ đầu. Mặc dù đó là niềm tự hào từ, nó cũng đi kèm với một số trách nhiệm và thách thức.

### Challenges

Người ta không thể tưởng tượng tất cả các yêu cầu để thu thập trong một lần ngồi thảo luận với nhau. Hãy kiên nhẫn.

Rất nhiều cuộc thảo luận sẽ xảy ra, một số trong đó lúc bắt đầu có thể đơn giản là không liên quan đến dự án nhưng cuối cùng sau đó thậm chí chúng có thể chứa một số thông tin quan trọng cho dự án của bạn. Đôi khi tốc độ thảo luận có thể vượt quá khả năng nắm bắt của bạn hoặc đơn giản là bạn sẽ không chú ý đến product owner.

**Hình dưới đây nêu các bước quan trọng liên quan đến thu thập yêu cầu:**

| **Hình 3** | 
| -------- | 
| ![](https://images.viblo.asia/8be418fe-02e3-4de8-ac90-f014b70eec74.jpg) | 

**Mỗi thông tin bị bỏ lỡ đều có tác động rất lớn đến sự hiểu biết và thử nghiệm chung của dự án. Để khắc phục điều này, đây là một số thực hành tốt nhất nên được tuân theo trong giai đoạn này.**

### Best Practices

* Giữ suy nghĩ của bạn được mở và chú ý đến từng lời của product owner.
* Không chỉ nghe, mà con phải làm rõ những nghi ngờ của bạn dù chỉ là một vấn đề nhỏ
* Luôn luôn sử dụng sổ ghi chú để ghi chú nhanh. Bạn nên sử dụng máy tính xách tay, chỉ khi bạn thực sự có thể gõ với tốc độ hợp lý.
* Lặp lại các câu và làm cho chúng rõ ràng từ product owner về những gì bạn hiểu.
* Vẽ sơ đồ khối (**block diagrams**), liên kết văn bản,... để làm cho các yêu cầu rõ ràng hơn trong một khoảng thời gian sau đó.
* Nếu các team ở các địa điểm khác nhau, hãy cố gắng làm nó thành một bản ghi WebEx hoặc tương tự. Nó sẽ luôn luôn hỗ trợ tốt nhất khi bạn có một nghi ngờ sau khi các cuộc thảo luận kết thúc.

Mặc dù không có bức tường riêng biệt như vậy cho từng giai đoạn, nhưng các yêu cầu thay đổi thậm chí rất muộn trong quá trình phát triển. Vì vậy, ý tưởng là để lấy hầu hết các yêu cầu và tài liệu này đúng.

Khi nó đã được ghi nhận với tất cả các điểm cần thiết, hãy phân tích và thảo luận về tất cả với các bên liên quan để mọi đề xuất hoặc thay đổi được nắm bắt sớm và trước khi tiếp tục, mọi người đều ở trên cùng một trang.

## #2) Test Strategy

Testers được cho là đưa ra một chiến lược testing không chỉ đủ để kiểm tra phần mềm tốt hơn mà còn tạo niềm tin cho mọi bên liên quan về chất lượng sản phẩm.

| **Hình 4** | 
| -------- | 
| ![](https://images.viblo.asia/c4336769-397c-450c-bb1b-6d15ee2c6196.jpg)| 

### Challenges

Khía cạnh quan trọng nhất của giai đoạn này là tạo ra một chiến lược mà khi làm việc sẽ cung cấp một sản phẩm phần mềm không có lỗi, bền vững và được người dùng cuối chấp nhận.

Chiến lược testing là thứ bạn sẽ không thay đổi mỗi ngày. Trong một số trường hợp, bạn cũng cần thảo luận về chiến lược testing của mình với khách hàng. Vì vậy, phần này nên được xử lý với tầm quan trọng cao.

### Best Practices

* Dưới đây là một số thực tiễn tốt nhất, khi được thực hiện có thể cung cấp cho bạn một hỗ trợ tuyệt vời và kết quả là testing suôn sẻ.
* Đi qua các tài liệu yêu cầu một lần nữa. Làm nổi bật các điểm quan trọng đối với môi trường của phần mềm đích.
* Lập danh sách các môi trường nơi phần mềm sẽ thực sự được triển khai.
* Môi trường có thể được hiểu là một loại Hệ điều hành hoặc Thiết bị di động.
* Nếu Windows là hệ điều hành, hãy liệt kê tất cả các phiên bản của Windows nơi bạn sẽ test phần mềm của mình. Nếu các phiên bản Windows 7, Windows 10 hoặc Windows Server (s) vẫn chưa được xác định trong tài liệu yêu cầu, sau đó là thời điểm cần thiết và thích hợp để những điều này nên được thảo luận.
* Trên một lưu ý tương tự, hãy lấy các trình duyệt đích với các phiên bản được thảo luận và ghi lại nếu AUT là một hệ thống dựa trên web.
* Lập danh sách tất cả các phần mềm bên thứ ba mà ứng dụng sẽ cần (Nếu cần / được hỗ trợ). Chúng có thể bao gồm Adobe Acrobat, Microsoft Office, bất kỳ tiện ích bổ sung nào, ...

Ở đây, ý tưởng đằng sau là giữ cho mọi nền tảng, thiết bị và phần mềm cần thiết và bắt buộc mà ứng dụng của chúng ta sẽ cần phải hoạt động trước để có thể xây dựng một chiến lược toàn diện.

**Hình dưới đây sẽ giúp bạn hiểu được phác thảo của chiến lược testing nếu bạn đang làm việc trong một dự án nhanh:**

| **Hình 5** | 
| -------- | 
| ![](https://images.viblo.asia/3ac36d70-0897-4d30-bd2f-b3d77d9ab0a2.jpg)| 

## #3) Test Planning

Sau khi những Tester được trang bị tất cả các thông tin liên quan đến AUT, giai đoạn lập kế hoạch là nơi Chiến lược được thực hiện.

Giống như chiến lược testing, lập kế hoạch testing cũng là một giai đoạn quan trọng.

| **Hình 6** | 
| -------- | 
| ![](https://images.viblo.asia/5b08ba56-50a3-4ceb-9d6d-5fd9b0fe7398.jpg)| 

### Challenges

Vì sự thành công (hoặc thất bại) của AUT phụ thuộc phần lớn vào cách các thử nghiệm được thực hiện, giai đoạn này trở thành một khía cạnh quan trọng của toàn bộ vòng đời testing.
Tại sao? Bởi vì một phần của testing được xác định trong giai đoạn này.

Để vượt qua một số thách thức, những thực hành tốt nhất này thực sự có thể hữu ích.

### Best Practices

* Luôn luôn ghi nhớ, không để lại bất kỳ cản trở nào khi nói đến việc testing ứng dụng của bạn.
* Nó là thời gian để xây dựng chiến lược testing.
* Tạo một ma trận của môi trường để phần mềm được test trên tất cả các nền tảng.
* Giống như, Windows 10 + Internet Explorer 11 + Windows Office 2010 + ...
* Giống như trình duyệt Chrome 4.2.2+ Android
* Nếu ứng dụng của bạn hoạt động với nhiều cơ sở dữ liệu (Nếu được ghi lại), hãy giữ cơ sở dữ liệu (MySQL, Oracle, SQLServer) trong ma trận testing theo cách chúng được tích hợp với một số thử nghiệm.
* Định dạng cấu hình máy test phù hợp và đặt tên cho chúng là SetUp1, SetUp2,...
* SetUp1 sẽ có Windows 7 + IE 10 + Office 2007 +...
* SetUp2 có thể có Windows 10 + IE Edge + Office 2013 +...
* SetUp3 có thể cài đặt điện thoại Android với tệp .apk của bạn.
* Thiết lập test của bạn đã sẵn sàng và bạn cũng đã bao gồm mọi sự kết hợp có thể có của các nền tảng mà ứng dụng của bạn sẽ hoạt động.

Một công cụ như **TestRail** có thể giúp bạn ghi lại các trường hợp test và tạo các kế hoạch test và chạy hiệu quả hơn nhiều so với sử dụng tài liệu Word hoặc mẫu Excel - đặc biệt nếu bạn làm việc trong một nhóm. Với TestRail, bạn thậm chí có thể thêm các bước chi tiết, tệp dữ liệu, kết quả mong đợi và ảnh chụp màn hình vào định nghĩa trường hợp test của bạn.
Nhưng TestRail không chỉ dành cho lập kế hoạch test. Nó cung cấp quản lý trường hợp test toàn diện, dựa trên web để giúp các nhóm tổ chức nỗ lực testing và hiểu biết sâu sắc về thời gian thực hiện hoạt động testing.
Bạn có thể theo dõi trạng thái của các test case và chạy thử riêng lẻ và đo lường tiến trình với bảng điều khiển thông tin và báo cáo hoạt động. So sánh kết quả trên nhiều lần chạy thử, cấu hình và các mốc quan trọng.

Theo dõi khối lượng công việc của nhóm để điều chỉnh công việc và resource và làm việc hiệu quả hơn với danh sách công việc, bộ lọc và thông báo email được cá nhân hóa. Bạn có thể tìm hiểu thêm về TestRail và dùng thử miễn phí 30 ngày trên trang web của họ ([Bạn có thể tìm hiểu chi tiết hơn về TestRail và nhận bản dùng thử 30 ngày](https://www.softwaretestinghelp.com/testrail-testing-practical)).

## #4) Testing

| **Hình 7** | 
| -------- | 
| ![](https://images.viblo.asia/7f2d19f0-9756-41a1-aa81-a5160476b1aa.jpg)| 

Cuối cùng, bản dựng ứng dụng của bạn đã ra và bạn đã sẵn sàng để tìm lỗi! Bây giờ, thời gian để làm việc lên kế hoạch kiểm tra và tìm ra càng nhiều lỗi càng tốt. Sẽ có một số giai đoạn ở giữa nếu bạn làm việc trong môi trường nhanh nhẹn, sau đó chỉ cần làm theo các phương pháp scrum đó.

**Dưới đây biểu đồ mô tả phân loại của các loại thử nghiệm khác nhau:**

| **Hình 8** | 
| -------- | 
| ![](https://images.viblo.asia/60ab5fbc-2bce-4f5a-93aa-83f66774acd8.jpg)| 

### Challenges

Testing là một quá trình rườm rà mà bản thân nó dễ bị lỗi! Người ta tìm thấy nhiều thách thức trong khi testing một ứng dụng. Đưa ra dưới đây là một số thực hành tốt nhất để giải cứu.

### Best Practices

Vui lên! Bạn đang cố gắng tìm lỗi trong code. Bạn cần chú ý đến hoạt động chung của phần mềm.
* Luôn luôn khuyên bạn nên nhìn vào ứng dụng với một cái nhìn mới mẻ, MÀ KHÔNG ĐI QUA CÁC TEST CASE.
* Thực hiện theo đường dẫn điều hướng của phần mềm của bạn (AUT).
* Làm quen với AUT.
* Bây giờ hãy đọc các test case (Tất cả) của bất kỳ module cụ thể nào (Có thể bạn chọn).
* Bây giờ hãy đến AUT và đối chiếu các kết quả với những phát hiện được đề cập trong phần dự kiến của các test case.
* Ý tưởng đằng sau là test mọi tính năng được đề cập trên mọi nền tảng được hỗ trợ.
* Ghi chú của mọi sai lệch tuy nhiên có vẻ không quan trọng.
* Viết các bước làm thế nào bạn đạt được bất kỳ sai lệch, chụp ảnh màn hình, ghi nhật ký lỗi, nhật ký máy chủ và bất kỳ tài liệu hỗ trợ nào khác có thể chứng minh sự tồn tại của lỗi.
* Không ngần ngại hỏi. Mặc dù bạn có tài liệu yêu cầu, sẽ có lúc bạn sẽ nghi ngờ.
* Tiếp cận với phía phát triển (nếu họ ngồi cạnh bạn hoặc họ có thể truy cập được) về nghi ngờ của bạn trước khi bạn liên lạc với Product owner. Hiểu quan điểm của phía phát triển về hoạt động của phần mềm. Nếu bạn cảm thấy việc thực hiện này không theo yêu cầu, thì hãy thông báo cho test manager.

## #5) Before Release

Trước khi chúng ta phát hành bất kỳ sản phẩm nào ra thị trường, chất lượng của sản phẩm phải được đảm bảo. Phần mềm được phát triển một lần nhưng chúng thực sự đã được test cho đến khi chúng được thay thế hoặc gỡ bỏ.

### Challenges

Một phần mềm phải được test nghiêm ngặt đối với nhiều thông số của nó.

Các thông số có thể không giới hạn ở:

* Chức năng / Hành vi (Functionality /Behavioral)
* Hiệu suất (Performance).
* Khả năng mở rộng (Scalability).
* Tương thích với các nền tảng được biết.

Thách thức cũng là để dự đoán tỷ lệ thành công của một ứng dụng phụ thuộc vào nhiều lần lặp lại của testing được thực hiện.

### Best Practices

* Đảm bảo rằng tất cả các tính năng trên tất cả các nền tảng đều được test.
* Làm nổi bật các khu vực không được test hoặc khu vực cần nhiều thời gian test hơn.
* Giữ một ma trận của tất cả các kết quả test trước khi phát hành. Ma trận testing sẽ đưa ra một bức tranh tổng thể về sự ổn định của sản phẩm. Nó cũng sẽ giúp quản lý thực hiện cuộc gọi vào ngày phát hành.
* Cung cấp đầu vào / đề xuất của bạn cho nhóm về trải nghiệm của bạn trong khi test sản phẩm.
* Đầu vào của bạn mà bạn cân nhắc mình là người dùng cuối sẽ có lợi cho phần mềm nhất.
* Do thời gian khủng hoảng hoặc bất kỳ tình huống nào khác, chúng ta bỏ lỡ một số testing hoặc không đi sâu vào vấn đề này. Không ngần ngại nói tình trạng testing cho người quản lý của bạn.
* Xuất trình thẻ y tế của ứng cho các bên liên quan. Thẻ y tế nên có con số của tất cả các khiếm khuyết đã logged, mở, đóng, không liên tục với mức độ nghiêm trọng và mức độ ưu tiên của chúng.
* Soạn thảo một tài liệu phát hành và chia sẻ điều này trên toàn team.
* Làm việc trên các tài liệu phát hành đã chuẩn bị.
* Cải thiện các lĩnh vực được đề xuất bởi ban quản lý / team.

**Hình dưới đây cho thấy bản đồ vòng đời phát hành phần mềm:**

| **Hình 9** | 
| -------- | 
| ![](https://images.viblo.asia/b59da441-43e2-4e32-a3c1-fd90bd634444.jpg)| 

## #6) Release

Cuối cùng, đã đến lúc chúng ta phải giao sản phẩm cho người dùng dự định. Tất cả chúng ta là một team đã làm việc chăm chỉ để phát hành sản phẩm và để phần mềm giúp đỡ người dùng sử dụng nó.

### Challenges

Các kỹ sư kiểm thử phần mềm chịu trách nhiệm chính cho việc phát hành bất kỳ phần mềm nào. Hoạt động này đòi hỏi quy trình làm việc phải theo đúng quy trình. Dưới đây là một số thực hành tốt nhất có liên quan trong giai đoạn này.

### Best Practices

* Luôn nhớ rằng, bạn không làm việc trên tài liệu phát hành vào ngày PHÁT HÀNH THỰC TẾ.
* Luôn lập kế hoạch hoạt động phát hành trước ngày phát hành thực tế.
* Chuẩn hóa tài liệu theo chính sách của công ty.
* Tài liệu phát hành của bạn nên cố gắng thiết lập những kỳ vọng tích cực từ phần mềm.
* Đề cập đến tất cả các yêu cầu phần mềm và phần cứng cụ thể cho các phiên bản của chúng rõ ràng trong tài liệu.
* Bao gồm tất cả các khiếm khuyết mở và mức độ nghiêm trọng của chúng.
* Không che giấu các khu vực bị ảnh hưởng lớn do khiếm khuyết mở. Cung cấp cho họ một vị trí trong tài liệu phát hành.
* Nhận tài liệu được xem xét và chữ ký số [có thể khác nhau theo chính sách công ty].
* Hãy tự tin và gửi tài liệu phát hành cùng với phần mềm.

# B_QA Testing Process On A Real Project – Waterfall Method

Một câu hỏi thú vị, Làm thế nào testing được thực hiện trong một công ty, tức là trong một môi trường thực tế?
Những người vừa mới ra trường và bắt đầu tìm kiếm việc làm có sự tò mò này - làm thế nào sẽ là môi trường làm việc thực tế trong một công ty?
Ở đây tập trung vào quá trình làm việc thực tế của Testing Software trong các công ty.

| **Hình 10** | 
| -------- | 
|![](https://images.viblo.asia/0c127538-5bd5-4162-b2ca-e988097e86d1.jpg)| 

Bất cứ khi nào nhận được bất kỳ dự án mới, có một cuộc họp làm quen dự án ban đầu. Trong cuộc họp này, về cơ bản chúng ta sẽ thảo luận về khách hàng là ai? thời gian thực hiện dự án là bao lâu? và khi nào giao cho khách hàng? Tất cả những ai tham gia vào dự án, ví dụ : Manager, Tech leads, QA lead, DEV, Tester, ...?

Từ kế hoạch dự án SRS (software requirement specification / đặc tả yêu cầu phần mềm) được phát triển. Trách nhiệm của tester là tạo ra một kế hoạch testing phần mềm từ SRS và kế hoạch dự án này. DEV bắt đầu code từ thiết kế. Công việc dự án được chia thành các module khác nhau và các module dự án này được phân phối giữa các DEV.

Trong khi đó, trách nhiệm của tester là tạo test scenario và viết test case theo các module được chỉ định. Chúng ta cố gắng bao gồm hầu hết các test case chức năng từ SRS. Dữ liệu có thể được duy trì thủ công trong một số template test case excel hoặc các công cụ theo dõi lỗi.

Khi DEV hoàn thành các module riêng lẻ, các module đó được assign cho Tester. Smoke testing được thực hiện trên các module này và nếu chúng thất bại trong phần test này, các module được trả lại cho các DEV tương ứng để khắc phục.

Đối với các module được thông qua, Manual testting được thực hiện từ các test case bằng văn bản. Nếu phát hiện thấy bất kỳ lỗi nào thì assign DEV phụ trách module và được log vào công cụ theo dõi lỗi. Về sửa lỗi, Tester thực hiện test lỗi và test hồi quy của tất cả các module liên quan. Nếu lỗi vượt qua xác minh, nó được đánh dấu là đã xác minh và được đánh dấu là đã đóng. Mặt khác, chu trình lỗi được đề cập ở trên được lặp lại. 

Cách test khác nhau được thực hiện trên các module riêng lẻ và test tích hợp (Integration testing) về tích hợp module. Cách test này bao gồm test Tương thích (Compatibility testing), tức là ứng dụng test trên các phần cứng khác nhau, phiên bản hệ điều hành, nền tảng phần mềm, các trình duyệt khác nhau, ...

Load và Stress testing cũng được thực hiện theo SRS. Cuối cùng, System testing được thực hiện bằng cách tạo môi trường máy khách ảo. Khi tất cả các test case được thực thi, một test report được chuẩn bị và quyết định được đưa ra để phát hành sản phẩm!

# C_Steps In Requirements To Release

Dưới đây là chi tiết của từng bước testing được thực hiện trong từng vòng đời chất lượng phần mềm và vòng đời testing được chỉ định bởi các tiêu chuẩn của IEEE và ISO:

**1. Review SRS (Đánh giá SRS):** Đánh giá các thông số kỹ thuật yêu cầu phần mềm

**2. Objectives (Mục tiêu)** được đặt cho các bản phát hành chính

**3. Target Date (Ngày mục tiêu)** được lên kế hoạch cho các bản phát hành

**4. Detailed Project Plan (Kế hoạch dự án chi tiết)** được xây dựng. Điều này bao gồm quyết định về Thông số kỹ thuật thiết kế

**5. Develop Test Plan (Xây dựng kế hoạch kiểm tra)** dựa trên thông số kỹ thuật thiết kế

**6. Test Plan (Kế hoạch test) :** Điều này bao gồm các mục tiêu, phương pháp được áp dụng trong khi thử nghiệm, các tính năng cần kiểm tra và không được kiểm tra, tiêu chí rủi ro, lịch trình thử nghiệm, hỗ trợ đa nền tảng và phân bổ tài nguyên để thử nghiệm.

**7. Test Specifications (Thông số kỹ thuật test)**
Tài liệu này bao gồm các chi tiết kỹ thuật (Yêu cầu phần mềm) được yêu cầu trước khi testing.

**8. Writing of Test Cases (Tạo Test Cases)**
* Smoke (BVT) test cases
* Sanity Test cases
* Regression Test Cases 
* Negative Test Cases
* Extended Test Cases

**9. Development (Phát triển)** - Các module được phát triển từng cái một

**10. Installers Binding (Trình cài đặt Binding):** Cài đặt được xây dựng xung quanh các sản phẩm riêng lẻ.

**11. Build procedure (Quy trình xây dựng) :** Bản dựng bao gồm Trình cài đặt các sản phẩm có sẵn - nhiều nền tảng.

**12. Testing**

Smoke Test (BVT): Test ứng dụng cơ bản để đưa ra quyết định test thêm

* Test các tính năng mới
* Test đa trình duyệt và đa nền tảng
* Stress testing và Test rò rỉ bộ nhớ.

**13. Test Summary Report (Báo cáo tóm tắt thử nghiệm)**

* Báo cáo lỗi và các báo cáo khác được tạo

**14. Code freezing (Đóng băng code)**

* Không có thêm tính năng mới được thêm vào thời điểm này.

**15. Testing**

* Xây dựng và test hồi quy (Regression testing).

**16. Decision to release the product (Quyết định phát hành sản phẩm)**

**17. Post-release scenario for further objectives (Kịch bản sau phát hành cho các mục tiêu tiếp theo.)**

Đây là một bản tóm tắt của một quá trình thử nghiệm thực tế trong môi trường công ty.

# D_Conclusion

Công việc của software tester đầy thách thức, nhưng là một công việc thú vị. Điều này dành cho một người nhiều phần đam mê, có động lực và tràn đầy nhiệt huyết. Tìm lỗi ở ai đó không phải lúc nào cũng dễ dàng! Điều này đòi hỏi rất nhiều kỹ năng và có con mắt luôn dò tìm đến khuyết điểm.

Bên cạnh tất cả các phẩm chất, một tester cũng nên được định hướng theo quy trình. Giống như tất cả các ngành công nghiệp khác, các dự án trong CNTT hoạt động theo từng giai đoạn, trong đó mọi giai đoạn đều có một số mục tiêu được xác định rõ. Và mọi mục tiêu đều có một tiêu chí chấp nhận được xác định rõ. Một Tester phải mang nhiều trách nhiệm của chất lượng phần mềm trên vai.

Trong khi làm việc trong bất kỳ giai đoạn nào của phần mềm, Tester được cho là tuân theo các thực tiễn tốt nhất và phải phù hợp với quy trình liên quan đến các giai đoạn tương ứng. Thực hiện theo các thực tiễn tốt nhất và quy trình được xây dựng tốt không chỉ giúp tester dễ dàng làm việc mà còn giúp đảm bảo chất lượng của phần mềm.

### Nguồn Tham khảo:
https://www.softwaretestinghelp.com/what-is-actual-testing-process-in-practical-or-company-environment/#more-74