Screenplay pattern hiện nay đang làm một pattern nổi lên trong ngành Automation Test.

Trong bài viết này, mình sẽ giới thiệu cơ bản nhất về Screenplay pattern. 
Nếu như bạn đã biết về Screenplay pattern, bạn có thể tham khảo các viết kịch bản đầu tiên với Screenplay pattern tại [Viết kịch bản automation test đầu tiên với Serenity Screenplay](https://tech101.xyz/viet-kich-ban-automation-test-dau-tien-voi-serenity-screenplay/)
Thông tin chung về Screenplay Patter
![](https://images.viblo.asia/3bf89b33-6344-460a-8f6a-43288e6d40cf.png)

# Screenplay là gì?
# 
**Screenplay** là một mẫu (pattern) nằm trong thư viện của Senerity BDD.

**BDD** là viết tắt của Behavior-driven Development. BDD là một quá trình phát triển phần mềm dựa trên phương pháp Agile. Đây cách phát triển phần mềm linh hoạt, đặt người dùng làm trọng tâm, tập trung vào phát triển phần mềm theo hướng hành vi.

**Serenity** là một thư viện mã nguồn mở (open-source library). Serenity cung cấp các thư viện giúp các nhà phát triển (developter) viết các các script cho automation test dễ hiểu hơn và có cấu trúc tốt hơn. Senerity có hỗ trợ để test cho REST API và sử dụng BDD tool (Behavior-driven Development).

**Serenity BDD** là một thư viện automation test cho acceptance test giúp biến những ý tưởng ở tài liệu BDD thành sự thật, áp dụng được vào quá trình auto test (trước đây có tên là Thucydides).

Serenity hỗ trợ 3 design pattern:

* PageObject 
* Cucumber
* Screenplay

**Serenity Screenplay** lấy người dùng làm trung tâm

**Screenplay** một cách viết các kịch bản automation test dựa trên các nguyên tắc kỹ thuật phần mềm như: 

* Single Responsibity
* Open-Closed Principle

(Software modules should be closed for modifications but open for extensions)

      + Hạn chế sửa đổi: Không nên chỉnh sửa source code của module hoặc class có sẵn, ảnh hưởng đến tính đúng đắng của chương trình.

      + Ưu tiên mở rộng: Khi cần thêm tính năng mới, nên kế thừa và mở rộng các module/class có sẵn. 

Screenplay sử dụng interface để cấu trúc chương trình, giúp cho trương trình: 
* Easy to read
* Easy to maintain
* Easy to extend

Mô hình của **Screenplay**

Trong quá trình trải nghiệm người dùng, **Screenplay** pattern chia nhỏ các tương tác của người dùng với application thành:

**Goal**: Mục tiêu là miêu tả những gì user cố gắng đạt được.

**Task**: Miêu tả high level các bước user cần phải thực hiện để hoàn thành mục tiêu (goal).

**Action**: Các hành động user tương tác với hệ thống để thực hiện một task cụ thể.
![](https://images.viblo.asia/a7a270d3-8f8a-4708-a392-96bcac6ede92.png)


Mô hình kịch bản sử dụng mô hình lấy Actor làm trung tâm

Miêu tả sơ đồ:

**Actor has ablitites**: actor được coi như là trái tim của screenplay pattern. Mỗi actor có một số "Abilities" (khả năng) Ví dụ như: khả năng mở browse, khả năng add new item. 

**Actors perform tasks:** actor cần thực hiện một số các task để hoàn thành được mục tiêu. Ví dụ như: adding a todo item, sử dụng một số method.

**Actors ask questions**: các Actor có thể hỏi một số câu hỏi về kết quả của test. Giống như việc so sánh actual và expecte. 

# Khi nào sử dụng Screenplay pattern?
# 
**Screenplay** được khuyến khích sử dụng những người có kỹ năng lập trình Java tốt, hiểu rõ về** lập trình hướng đối tượng** (Object-oriented programming). Như vậy, sẽ viết automation test nhanh hơn và dễ dàng maintain trong thời gian dài. Tạo ra một script test có thể tái sử dụng (reusable).

**Screenplay** lấy người dùng làm trung tâm. Do đó, dễ dàng mô hình hóa các tình huống có người dùng tương tác với kịch bản. Screenplay cung cấp layer abstraction để nhìn test dưới góc độ bussiness, không bám chặt vào UI. Đây là diểm khác biệt so với các pattern khác.

Bạn có thể tham khảo thêm tại [Blog](https://tech101.xyz/)

Bạn cũng có thể kết nối với mình qua linkedin: [Van Anh Nguyen](https://www.linkedin.com/in/van-anh-nguyen-31a4731bb/)