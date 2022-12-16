Trong [phần 1](https://viblo.asia/p/cac-ky-thuat-quan-trong-dung-cho-qua-trinh-test-chap-nhan-uat-phan-1-jvElaDX6Zkw), mình đã giới thiệu về định nghĩa test chấp nhận người dùng (UAT) và 2 kỹ thuật đầu tiên liên quan đến quá trình UAT gồm **2.1. User Story Testing** và **2.2 Use Case Testing**. Trong phần này, mình sẽ tiếp tục với các kỹ thuật quan trọng khác liên quan đến UAT.

**2.3. Checklist Based Testing**

Trong những quá trình agile (quá trình phát triển phần mềm linh hoạt), chúng ta sáng tạo một checklist chung và không phụ thuộc vào những câu chuyện người dùng (User Stories). Nếu không có nguy cơ, rủi ro nào đối với User Story, tất cả hoặc một vài mục của checklist này sẽ được áp dụng tương ứng với phạm vi của User Story. Trong quá trình thực thi những bài test này, nếu bạn tìm ra thêm một vấn đề hay lỗi nào đó thì bạn nên mở rộng phạm vi của checklist áp dụng bằng cách thêm những kịch bản lỗi. Theo cách này, chúng ta có thể thêm những mục rủi ro vào checklist.

Bên dưới là một ví dụ đối với một checklist được xây dựng chung:
* Tất cả liên kết trong hệ thống (Web / Mobile) nên làm việc đúng.
* Không có lỗi ngữ pháp trong những chữ viết hệ thống.
* Các kích thước font, các font nên là như được mong đợi.
* Không nên có bất kỳ hình ảnh nào không thể được tải hoặc bị hỏng trong hệ thống.
* Những hình ảnh, dòng văn bản, sự căn lề giữa các thành phần khác nhau phải như mong đợi.
* Tất cả các nút ấn cần hoạt động đúng và đều phải đưa người dùng đến được hoạt động mong muốn.
* Mỗi trang nên có một hình logo trang chính phục vụ mục đích chuyển về trang chính khi chọn vào đó.
* Những thông điệp thông báo, cảnh báo nên được hiển thị đúng định dạng.
* Nếu một trang có tính đáp ứng, nó nên được kiểm tra ở tất cả các độ phân giải khác nhau.
* Tất cả các thành phần trên trang (dropdown, checkbox, ratio button, …) nên làm việc đúng.
* Những điều kiện đặc biệt (Số, chữ số, …) trong các trường đầu vào phải được kiểm tra.
* Những hoạt động không được phép thực hiện nếu các trường yêu cầu bị trống.
* Bất kỳ hoạt động nào trên trang phải không mất nhiều hơn 3 đến 15 giây.
* ...

**2.4. Exploratory Testing**

Điều đầu tiên cần nói là kỹ thuật test thăm dò (Exploratory Testing) không phải là kỹ thuật test bất kỳ (random testing) hay kỹ thuật test mà không có kế hoạch hay tài liệu (ad-hoc testing). Một trong những quan điểm sai lầm lớn nhất về kỹ thuật test này là rằng test thăm dò được hiểu như kỹ thuật test bất kỳ, không có khả năng test, không có khả năng quan sát (random, non-testable, non-observable test technique). Quá trình test thăm dò là một phương thức test dựa trên việc học và việc thăm dò sản phẩm cùng một lúc bằng cách sử dụng kinh nghiệm, kiến thức nền tảng, sự phân tích của người test trong quá trình agile.

Trước khi bắt đầu test thăm dò, một sự chuẩn bị cần được thực hiện. Bất chấp việc lựa chọn phương thức test thăm dò là gì, chúng ta nên chuẩn bị một kế hoạch cho phạm vi của chức năng, những công cụ được sử dụng, dữ liệu test, môi trường test, … Kế hoạch này sẽ hướng dẫn người test trong quá trình thực hiện test. Một điểm quan trọng khác của test thăm dò là tài liệu sẽ chỉ được hoàn thành đầy đủ khi những bài test đã kết thúc. 

Mặc dù không phải bắt buộc, kỹ thuật test dựa trên phiên (session-based testing) nhìn chung được ưa chuộng như một kỹ thuật test thăm dò. Kỹ thuật này bao gồm các bước sau:

**Những hoạt động chính:**
- Thời gian phiên test (Nên là một vài giờ)
- Những hoạt động phiên:
+ Khởi tạo, thiết lập phiên.
+ Thiết kế test và thực thi test.
+ Tìm kiếm lỗi.
+ Báo cáo.
- Những mục đích của mỗi bài test nên được xác định.
- Mục tiêu, đích đến của quá trình test cũng nên được xác định.
- Chức năng được bao gồm trong quá trình test nên được viết.

**Báo cáo test trong và sau quá trình test:**
- Báo cáo test xác định chức năng test.
- Người đã thực hiện test.
- Ngày và thời gian bắt đầu.
- Những chuẩn đo lường quá trình test (Những chuẩn được tập hợp trong quá trình thực hiện test và quá trình tìm lỗi).
- Dữ liệu test.
- Các ghi chú trong quá trình test.
- Các kết quả.
- Các lỗi.

**Các nguồn tài liệu tham khảo:**

http://www.satisfice.com/tools/htsm.pdf (English)
https://www.linkedin.com/pulse/kesfederek-test-yapmak-alper-mermer  (Turkish)

**2.5. Experienced Based Testing**

Kỹ thuật này dựa trên hiểu biết, kỹ năng và kinh nghiệm của người test. Trong kỹ thuật test này, kế hoạch test, chiến lược test, những đầu vào test, những kịch bản test được xác định bởi kinh nghiệm người test. Để yêu thích sử dụng kỹ thuật này cần phải là một người có đủ hiểu biết về kỹ thuật và công việc để thực hiện quá trình test này.

Nó là dễ dàng hơn để hiểu những gì đang đi đúng hướng và những gì đang đi sai hướng dựa trên kinh nghiệm từ những dự án đã được thực hiện trước đó. Người thực hiện kỹ thuật test này có thể sử dụng các kỹ thuật như test thăm dò để dễ dàng hơn trong việc sử dụng hiểu biết và kinh nghiệm có được trước đó. Khi chúng ta có rất ít thời gian test hoặc thiếu tài liệu cần thiết liên quan đến dự án, … thì hãy nhớ đến việc sử dụng kỹ thuật này. Nếu hệ thống cần được test ở mức độ cao để phát hiện những vấn đề nghiêm trọng thì kỹ thuật test dựa trên kinh nghiệm không nên được sử dụng một mình bởi yêu cầu đặt ra là cần test toàn bộ hệ thống. 

**2.6. User Journey Test**

Kỹ thuật test dựa trên hành trình của người dùng (User Journey Test) đưa vào những bản đồ đường đi và những hành trình của một người dùng điển hình khi thao tác trong hệ thống. Trong những bài test này, những hành trình quan trọng nhất mà một người dùng thường thực hiện bên trong trang sẽ được xác định và sau đó những kịch bản của những hành trình này được viết. Do đó, những tương tác của người dùng đối với hệ thống được bao phủ nhiều nhất có thể. Những bài test này thường là những bài test “end to end”, do đó chúng sẽ tốn nhiều thời gian hơn các bài test khác, nhưng phần trăm bao phủ của những bài test này là cao hơn những loại khác. 

Do những bài test “hành trình người dùng” là những bài test bao quát và chuyên sâu, số lượng của chúng là thấp hơn các loại test khác. Hành động được mong đợi nhất ở đây là những kịch bản cơ bản và mang tính tích cực, còn được gọi là “con đường hạnh phúc”, nên được chạy đầu tiên.

Ví dụ như trên trang kariyer.net, có một bài test “hành trình người dùng” quan trọng cần được thực hiện, đó là người dùng vào trang, đăng nhập, sau đó tìm kiếm theo từ khóa “đại diện kinh doanh” (sales representative) và thực hiện công việc đầu tiên đó thành công. “Hành trình” người dùng này bao hàm tất cả các hành động bao gồm mở trang, đăng nhập, tạo một lệnh gọi thành công trên thanh tìm kiếm, mở một trang thông báo liên quan và sau đó thực hiện hành động trên trang thông báo này. Như bạn có thể nhìn thấy ở đây, tính  bao phủ toàn diện của các bài test “hành trình người dùng” này giúp phát hiện ra sớm các vấn đề, lỗi nghiêm trọng trong quá trình phát triển phần mềm trước khi bắt đầu quá trình test mở rộng. Không giống như những bài test “câu chuyện người dùng” (User Story), những bài test “hành trình người dùng” không gắn với những “câu chuyện người dùng”. Khi hệ thống phần mềm thay đổi bởi những câu chuyện người dùng mới, những “hành trình người dùng” sẽ được cập nhật tương ứng với những thay đổi đó. Những câu chuyện người dùng mới hiếm khi làm phát sinh thêm những hành trình người dùng mới. Để điều này xảy ra, những đặc điểm mới phải được thêm vào hệ thống.

**2.7. Risk-Based Testing**

Một trong những chủ đề cơ bản nhất của kỹ thuật test dựa trên rủi ro (risk-based testing) là tìm những lỗi nghiêm trọng nhất và quan trọng nhất trong thời gian sớm nhất có thể và với chi phí thấp nhất. Rủi ro là những thứ chúng ta không biết chính xác khi nào sẽ xảy ra nhưng chúng ra biết chúng có khả năng xảy ra. Mô tả ngắn gọn, chúng là những vấn đề có thể gặp phải. Khi những vấn đề này không được biết rõ, chúng được gọi là những thứ không chắc chắn. Do đó, chúng ta có thể đưa ra một công thức chung để tính mật độ rủi ro (Magnitude of Risk) bằng “khả năng xảy ra các vấn đề” (Likelihood) nhân với “hậu quả của các vấn đề gây ra đối với hệ thống” (Impact). Do đó, trong kỹ thuật test dựa trên rủi ro, chúng ta sẽ ưu tiên test các chức năng có khả năng xảy ra lỗi cao.
**Magnitude of Risk = Likelihood * Impact**

Sự thông qua sớm việc đưa vào những bài test dựa trên rủi ro là quan trọng để giúp phát hiện sớm các vấn đề nghiêm trọng.

Những bước cơ bản nhất của kỹ thuật test dựa trên rủi ro được tóm tắt bên dưới:
* Đầu tiên, những rủi ro phải được chỉ ra và một danh sách các rủi ro theo mức ưu tiên cần được chuẩn bị.
* Tạo một danh sách test tương ứng với danh sách rủi ro theo mức ưu tiên đã được thực hiện trước đó và thực hiện những bài test cho mỗi rủi ro được liệt kê. 
* Như một kết quả của quá trình test, một vài rủi ro sẽ được loại bỏ và một vài rủi ro sẽ tăng lên. Những rủi ro mới sau đó được cân nhắc dựa trên những nỗ lực cần để thực hiện chúng.

Tại thời điểm này, mục tiêu quan trọng nhất của chúng ta sẽ là tìm ra những lỗi quan trọng nhất.

![](https://images.viblo.asia/3b7d69e5-59ac-4b4b-ad80-8fe77874bcbd.png)

Nếu bạn đang nhận trách nhiệm test một sản phẩm với giá trị của lỗi là rất cao, bạn sẽ cần làm một phân tích rủi ro rất chi tiết. Những mô hình tĩnh có thể được sử dụng ở đây. Một trong những mô hình được biết đến nhiều nhất là mô hình FMEA (Failure Mode Effect Analysis).

Một các ngắn gọn, nếu chúng ta tham khảo mô hình FMEA, chúng ta tính toán điểm rủi ro bằng cách lấy 3 chỉ tiêu đo lường cùng với 5 thang khác nhau.

**Severity**

![](https://images.viblo.asia/789081c1-6402-42bd-bdd6-937e783c47ac.png)

**Priority**

 ![](https://images.viblo.asia/c62e3566-588b-4375-9a96-38c4ddab3f12.png)
 
**Likelihood**
 
 ![](https://images.viblo.asia/0f8791cd-f7da-4407-a6af-9b71e8fcd4ff.png)
 
Cả 3 chỉ tiêu liên quan đến chất lượng (Tính nghiêm trọng - Severity, Mức ưu tiên - Priority và khả năng có thể xảy ra - Probability) được tính toán riêng trong bản thân chúng, sau đó những giá trị này sẽ được nhân với nhau để có được một số RPN (Risk Priority Number)
**Risk Priority Number (RPN) = S * P * L**

Dựa trên giá trị RPN này, chúng ta sẽ các định được phạm vi của quá trình test. Giá trị RPN càng thấp thì rủi ro càng cao.

**2.8. Heuristic Risk-Based Testing by James Bach**

Khi mới bắt đầu một dự án, những phân tích rủi ro bạn có thể không thể hoàn thành hoặc không đúng ở một mức độ nào đó vì chúng ta không thể đánh giá mọi thứ 100% ngay từ đầu. Tuy nhiên theo sự phát triển của dự án và sản phẩm, việc phân tích những rủi ro sẽ dần dần mang tính chính xác và thực tế hơn. Do đó theo James Bach, có hai hệ số quan trọng nhất trong việc đánh giá rủi ro là kinh nghiệm và khả năng teamwork. 

Các bạn có thể tham khảo thêm tại liên kết này: http://www.satisfice.com/articles/hrbt.pdf

**3. Liên kết tham khảo**

https://www.swtestacademy.com/software-testing-techniques/