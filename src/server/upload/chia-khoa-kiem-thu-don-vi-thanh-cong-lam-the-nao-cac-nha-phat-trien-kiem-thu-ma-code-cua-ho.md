**Người kiểm thử Hộp đen** không quan tâm đến kiểm thử đơn vị. Mục tiêu chính của họ là xác thực ứng dụng so với các yêu cầu mà không cần đi sâu vào chi tiết triển khai. Nhưng như một sự tò mò hoặc **suy nghĩ Out of the box**, bạn đã bao giờ tự hỏi làm thế nào các nhà phát triển kiểm thử code của họ? Họ sử dụng phương pháp nào để kiểm tra trước khi phát hành code để kiểm tra? Kiểm thử nhà phát triển quan trọng như thế nào trong một quy trình agile? Câu trả lời cho tất cả những điều này là Unit Testing. Tôi muốn chia sẻ với các bạn về tầm quan trọng của kiểm thử đơn vị để các nhóm phát triển và đội kiểm thử có thể hợp tác hơn để thiết kế, kiểm tra và phát hành một ứng dụng xuất sắc.
Ai biết được trong tương lai một số bạn thậm chí có thể chuyển sang kiểm thử hộp trắng và sử dụng các kỹ thuật để xác nhận và cải tiến code này!
![](https://images.viblo.asia/51aa59eb-d30f-49aa-bdba-527b60c92627.PNG)
## **Kiểm Thử Đơn Vị Là Gì?**
Kiểm thử đơn vị (Unit Testing) không phải là một khái niệm mới. Thông thường, các nhà phát triển và đôi khi là người kiểm thử Hộp trắng thiết kế các bài kiểm thử đơn vị để cải thiện chất lượng mã code bằng cách xác minh mọi đơn vị code được sử dụng để thực hiện các yêu cầu chức năng (còn gọi là test drove development TDD hoặc test - first development).

Hầu hết chúng ta biết đến kiểm thử đơn vị với định nghĩa: “Kiểm thử đơn vị là kỹ thuật kiểm thử phần mềm trong đó một nhóm các thành phần hoặc mô-đun chương trình phần mềm được kiểm tra riêng lẻ. Kỹ thuật này giúp ích một cách hiệu quả trong việc xác nhận tính chính xác của một phần code bằng cách xem xét các đoạn code, đối tượng giả (mock objects), drivers và các unit test frameworks”. Nếu mục đích hoặc yêu cầu không thành công thì bài kiểm thử đơn vị đã không thành công.
Nói một cách đơn giản, nó có nghĩa là viết một đoạn code (đơn vị kiểm thử) để xác minh code (đơn vị) được viết để thực hiện các yêu cầu. 

Trong SDLC (Software Development Life-cycle - Vòng đời phát triển phần mềm), STLC (Software Testing Life Cycle - Quy trình kiểm thử phần mềm), V Model (Mô hình chữ V), kiểm thử đơn vị là cấp độ kiểm thử đầu tiên được thực hiện trước khi kiểm thử tích hợp. 
 ![](https://images.viblo.asia/7a81df30-8526-4c7f-ae0d-5999d182a94a.png)
## **Kiểm thử đơn vị trong SDLC**
 ![](https://images.viblo.asia/d411ba31-e4f0-4073-adc3-2a91dc683c8e.png)
 
Trong kiểm thử đơn vị, các nhà phát triển sử dụng *kiểm thử thủ công* hoặc *tự động* để đảm bảo rằng mỗi đơn vị trong phần mềm đáp ứng yêu cầu của khách hàng. Đơn vị này có thể là một chức năng, đối tượng, phương pháp, thủ tục hoặc mô-đun riêng lẻ trong phần mềm đang được kiểm thử.
 Kiểm thử đơn vị để kiểm thử các đơn vị riêng lẻ làm cho việc kiểm thử toàn diện dễ dàng hơn vì tất cả các đơn vị được ghép lại với nhau. Trong quá trình phát triển phần mềm, nó được thực hiện như là mức kiểm thử đầu tiên.
## **Tầm quan trọng của thiết kế kiểm thử đơn vị**
Kiểm thử đơn vị được sử dụng để thiết kế các thành phần phần mềm, giúp duy trì code và loại bỏ các vấn đề trong đơn vị code. Tất cả chúng ta đều biết tầm quan trọng của việc tìm kiếm và sửa chữa các lỗi trong giai đoạn đầu của chu trình phát triển phần mềm. 
Nó là một phần không thể thiếu của quá trình phát triển phần mềm Agile. Nếu bất kỳ kiểm thử đơn vị nào không thành công thì nhóm QA không nên chấp nhận xác minh build đó.
Nếu chúng ta đặt đây là một quy trình tiêu chuẩn, nhiều lỗi sẽ được phát hiện trong giai đoạn đầu của chu kỳ phát triển, giúp tiết kiệm nhiều thời gian kiểm thử.
## **Phương pháp kiểm thử đơn vị**
Có thể được thực hiện theo 2 cách:
1.	Manual Testing (Kiểm thử bằng tay)
2.	Automated Testing (Kiểm thử tự động)

Trong *Kiểm thử thủ công*, người kiểm thử thực hiện các trường hợp kiểm thử theo cách thủ công mà không sử dụng bất kỳ công cụ tự động hóa nào. Ở đây, mỗi giai đoạn của kiểm thử được thực hiện theo cách thủ công. Kiểm thử thủ công đôi khi rất tẻ nhạt, đặc biệt là đối với các bài kiểm thử lặp đi lặp lại và đòi hỏi nhiều nỗ lực hơn để tạo và thực hiện các trường hợp kiểm thử. Kiểm thử thủ công không yêu cầu kiến thức về bất kỳ công cụ kiểm thử nào. Có một thực tế là không thể thực hiện được 100% tự động hóa và do đó sẽ luôn có một số mức độ kiểm thử thủ công được thực hiện.

Trong *kiểm thử tự động*, các công cụ tự động hóa kiểm thử phần mềm được sử dụng để tự động hóa các bài kiểm thử/ trường hợp kiểm thử. Công cụ tự động hóa có thể ghi lại và lưu bài kiểm thử của bạn và nó có thể được phát lại nhiều lần nếu cần mà không cần bất kỳ sự can thiệp nào của con người.
Những công cụ này thậm chí có thể nhập dữ liệu kiểm thử vào hệ thống đang được kiểm thử cũng như nó có thể so sánh kết quả mong đợi với kết quả thực tế và tự động tạo báo cáo. Tuy nhiên, chi phí ban đầu để thiết lập các công cụ tự động hóa kiểm thử là cao.
## **Các kỹ thuật trong kiểm thử đơn vị**
### 1) Kiểm thử hộp trắng:
Trong kiểm thử hộp trắng, người kiểm thử biết cấu trúc bên trong của phần mềm bao gồm code và có thể kiểm thử nó so với thiết kế và các yêu cầu. Do đó, kiểm thử hộp trắng còn được gọi là kiểm thử trong suốt .
![](https://images.viblo.asia/576c4637-5c86-4c13-a808-22d6592c47c1.png)

### 2) Kiểm thử hộp đen:
Trong kiểm thử hộp đen, người kiểm thử không biết cấu trúc bên trong hoặc code của phần mềm.
 ![](https://images.viblo.asia/33fd2ecd-893e-4f9b-88f0-61d5582406d4.png)

### 3) Kiểm thử hộp màu xám:
Đây cũng được gọi là kiểm thử kỹ thuật bán minh bạch ( semi-transparent technique testing) có nghĩa là người kiểm thử chỉ nhận thức được một phần về cấu trúc, chức năng và thiết kế bên trong cùng với các yêu cầu. Gỡ lỗi được thực hiện bằng đầu vào thực tế từ front-end để có được dữ liệu chính xác trong back-end. Do đó kiểm thử hộp xám được coi là sự kết hợp giữa kỹ thuật kiểm thử hộp đen và hộp trắng.
 ![](https://images.viblo.asia/ce35be64-482c-4690-965e-880badef5b9f.png)

* Kiểm thử hộp xám bao gồm các loại kiểm thử sau:
* Matrix Testing (Kiểm thử ma trận).
* Pattern Testing (Kiểm thử mẫu).
* Orthogonal Pattern Testing (Kiểm thử mẫu trực giao).
* Regression Testing (Kiểm thử hồi quy).
## **Ai thực hiện kiểm thử đơn vị?**
Kiểm thử đơn vị là một kỹ thuật kiểm thử WhiteBox thường được thực hiện bởi Devs. Tuy nhiên, trên thực tế do giới hạn về thời gian hay một số trường hợp đặc biệt mà các Devs không thực hiện quá trình này, kỹ thuật kiểm tra hộp trắng này được thực hiện bởi các kỹ sư QA. (Quality Assurance/Tester).
## **Lợi ích của kiểm thử đơn vị**
1.	Quá trình trở nên “Agile: Để thêm các chức năng hoặc tính năng mới vào phần mềm hiện có, chúng ta cần thực hiện các thay đổi đối với code cũ. Nhưng việc thay đổi mọi thứ sang code đã được kiểm thử có thể rủi ro cũng như tốn kém.
2.	Chất lượng mã code cải thiện: Chất lượng code tự động được cải thiện khi kiểm thử đơn vị được thực hiện. Các lỗi được xác định trong quá trình kiểm thử này được sửa trước khi nó được gửi cho giai đoạn kiểm thử tích hợp. Dẫn đến thiết kế và phát triển mạnh mẽ khi các nhà phát triển thiết kế các trường hợp kiểm thử bằng cách hiểu các thông số kỹ thuật trước.
3.	Phát hiện lỗi sớm: Khi các nhà phát triển chạy các bài kiểm thử đơn vị, họ phát hiện lỗi sớm trong vòng đời phát triển phần mềm và giải quyết chúng. Điều này bao gồm các sai sót hoặc các phần bị thiếu trong đặc tả cũng như các lỗi trong quá trình thực hiện của lập trình viên.
4.	Thay đổi dễ dàng hơn và tích hợp đơn giản hơn: Thực hiện kiểm thử đơn vị giúp nhà phát triển dễ dàng cấu trúc lại code, thực hiện thay đổi và duy trì code. Nó cũng làm cho việc kiểm thử code sau khi tích hợp dễ dàng hơn nhiều. Khắc phục sự cố trong kiểm thử đơn vị có thể khắc phục nhiều sự cố khác xảy ra trong các giai đoạn phát triển và kiểm thử sau này.
5.	Tính khả dụng của tài liệu: Các nhà phát triển đang xem xét chức năng ở giai đoạn sau có thể tham khảo tài liệu kiểm thử đơn vị và có thể dễ dàng tìm thấy giao diện kiểm thử đơn vị và sửa chữa hoặc hoạt động nhanh chóng và dễ dàng.
6.	Quá trình gỡ lỗi dễ dàng: Nó giúp đơn giản hóa quá trình gỡ lỗi. Nếu kiểm thử không thành công ở bất kỳ giai đoạn nào, code cần được gỡ lỗi hoặc nếu không thì quá trình có thể được tiếp tục mà không gặp bất kỳ trở ngại nào.
7.	Chi phí thấp hơn: Khi lỗi được phát hiện và giải quyết trong quá trình kiểm thử đơn vị, chi phí và thời gian phát triển sẽ giảm xuống. Nếu không có kiểm thử này, việc theo dõi và giải quyết các lỗi giống nhau được phát hiện ở giai đoạn sau sau khi tích hợp code sẽ trở nên khó khăn hơn, gây tốn kém hơn và tăng thời gian phát triển.
8.	Tính hoàn chỉnh của code có thể được chứng minh bằng cách sử dụng kiểm thử đơn vị:  Điều này hữu ích hơn trong quy trình agile. Người kiểm thử không nhận được các build chức năng để kiểm thử cho đến khi quá trình tích hợp hoàn tất. Việc hoàn thành code không thể được chứng minh bằng cách cho thấy rằng bạn đã viết và kiểm thử code. Nhưng chạy Unit tests có thể chứng minh tính hoàn chỉnh của code.
9.	Tiết kiệm thời gian phát triển: Việc hoàn thành code có thể mất nhiều thời gian hơn nhưng do ít lỗi hơn trong kiểm thử Hệ thống và Chấp nhận, nên có thể tiết kiệm thời gian phát triển tổng thể.
10.	Độ bao phủ code có thể được đo lường được.
## **Quy trình kiểm thử đơn vị được thực hiện trong 4 giai đoạn:**
* Creating test cases
* Reviewing test cases
* Baselining test cases
* Executing test cases
## **Quá trình kiểm thử đơn vị bao gồm:**
![](https://images.viblo.asia/29f794b0-2edc-4e71-8fe4-e9ed92176b2d.jpg)

* Devs viết code trong ứng dụng để kiểm tra chức năng
* Đoạn code sau đó được các Devs cô lập để xác nhận sự phụ thuộc giữa code và các đơn vị khác. Cách cô lập code này giúp xác định và loại bỏ các phần phụ thuộc.
* Devs sử dụng đáng kể các Unit test frameworks hoặc các tools kiểm thử đơn vị để phát triển các trường hợp kiểm thử tự động.
* Trong khi thực hiện các trường hợp kiểm thử, các frameworks kiểm thử đơn vị giúp gắn cờ và báo cáo các trường hợp kiểm thử không thành công. Ngoài ra, dựa trên các lỗi trong các trường hợp thử nghiệm, các frameworks kiểm thử đơn vị giúp dừng thử nghiệm liên quan.
## **Làm thế nào để thiết kế kiểm thử tốt?**
* Kiểm thử Đơn vị nên được thiết kế để xác minh một đơn vị code chứ không phải tích hợp.
* Các bài kiểm thử đơn vị nhỏ và biệt lập, ngoài ra cách đặt tên rõ ràng sẽ giúp bạn thiết kế và bảo trì dễ dàng hơn.
* Việc thay đổi một phần khác của phần mềm sẽ không ảnh hưởng đến Unit test nếu chúng được tách biệt và được viết cho một đơn vị code cụ thể.
* Một bài kiểm thử đơn vị nên được sử dụng lại.
## **Khung kiểm thử đơn vị**
Các khung Unit Testing hầu hết được sử dụng để giúp viết các unit test một cách nhanh chóng và dễ dàng. Hầu hết các ngôn ngữ lập trình không hỗ trợ kiểm thử đơn vị với trình biên dịch có sẵn. Các công cụ thương mại và mã code nguồn mở của bên thứ ba có thể được sử dụng để làm cho việc kiểm thử đơn vị trở nên thú vị hơn.
Danh sách các công cụ Kiểm thử Đơn vị phổ biến cho các ngôn ngữ lập trình khác nhau:
1.	Khung Java - JUnit
2.	Khung PHP - PHPUnit
3.	Các khung C ++ - UnitTest ++ và Google C ++
4.	.NET framework - NUnit
5.	Khung Python - py.test
## **Những quan niệm sai lầm và sự thật**
* Mất nhiều thời gian hơn để thiết kế code với các trường hợp kiểm thử đơn vị và chúng tôi không có thời gian cho việc đó - Trên thực tế, nó sẽ tiết kiệm thời gian phát triển của bạn về lâu dài.
* Kiểm thử đơn vị sẽ tìm thấy tất cả các lỗi – Không chính xác, vì mục đích của kiểm thử đơn vị không phải là tìm lỗi mà là phát triển các thành phần phần mềm mạnh mẽ sẽ có ít lỗi hơn trong các giai đoạn sau của SDLC.
* Mức độ phủ mã code 100% nghĩa là phạm vi kiểm thử 100% - Điều này không đảm bảo rằng code không có lỗi.
## **Làm thế nào để chấp nhận kiểm thử đơn vị?**
Kiểm thử đơn vị tốt có thể được thực hiện trong 3 phần cơ bản.
1.	Thiết kế code kiểm thử đơn vị
2.	Chạy code kiểm thử đơn vị để kiểm thử xem nó có đáp ứng yêu cầu hệ thống không
3.	Thực thi code phần mềm để kiểm thử bất kỳ lỗi nào và code có đáp ứng yêu cầu hệ thống hay không.

Sau khi thực hiện 3 bước trên, nếu code xuất hiện chính xác thì bài kiểm thử đơn vị được cho là đã đạt. Và nếu nó không đáp ứng các yêu cầu hệ thống thức là kiểm thử không thành công. Trong trường hợp này, nhà phát triển cần kiểm thử lại và sửa code.
Trong một số trường hợp, cần phải tách code để thực hiện kiểm thử này chính xác hơn.
## **Thực hành tốt nhất**
**Để tạo code tốt nhất trong quá trình kiểm thử này, hãy xem xét các điểm dưới đây:**
* Code phải mạnh: Có những trường hợp kiểm thử không thành công hoặc trong trường hợp xấu nhất là không thực hiện được nếu code bị hỏng.
* Dễ hiểu và hợp lý: Code phải dễ hiểu. Điều này giúp nhà phát triển dễ dàng thiết kế code và ngay cả những nhà phát triển khác sẽ làm việc trên code sau đó sẽ thấy dễ dàng gỡ lỗi.
* Nên là trường hợp duy nhất: Rất phức tạp để làm việc với các kiểm thử xác định nhiều trường hợp trong một. Vì vậy, thiết kế một code trường hợp duy nhất là phương pháp hay nhất, giúp code dễ hiểu và dễ gỡ lỗi hơn.
* Cho phép kiểm thử tự động: Các nhà phát triển nên đảm bảo rằng kiểm thử chạy ở dạng tự động. Nó phải nằm trong một quá trình phân phối liên tục hoặc quá trình tích hợp.

**Các điểm khác cần lưu ý như sau:**
* Thay vì tạo các trường hợp kiểm thử cho tất cả các điều kiện, hãy tập trung vào kiểm thử ảnh hưởng đến hành vi của hệ thống.
* Có khả năng lỗi tái diễn do bộ nhớ cache của trình duyệt.
* Các trường hợp kiểm thử không được phụ thuộc lẫn nhau.
* Cũng chú ý đến điều kiện vòng lặp.
* Lập kế hoạch cho các trường hợp kiểm thử thường xuyên hơn.
## **Phần Kết Luận**
Kiểm thử đơn vị dễ hình dung hơn khi nó được yêu cầu kiểm thử từng chức năng riêng biệt. Việc phát hiện và sửa lỗi trong quá trình kiểm thử này là hợp lý và tiết kiệm thời gian và chi phí hơn là tìm ở giai đoạn sau của quá trình phát triển phần mềm.
Mặc dù nó mang lại nhiều lợi thế, nhưng cũng có những hạn chế liên quan đến việc sử dụng nó. Kỷ luật nghiêm ngặt và tính nhất quán là cần thiết trong suốt quá trình phát triển phần mềm để khắc phục những hạn chế và đạt được những lợi ích mong muốn.

Nguồn tham khảo: https://www.softwaretestinghelp.com/unit-testing