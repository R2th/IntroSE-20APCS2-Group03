Automation testing - Kiểm thử tự động hiện nay là một mảng nổi bật và rất nhiều QA có nhu cầu/ mong muốn tìm hiểu. Chúng ta có thể tham gia học tại các cơ sở đào tạo hoặc tự học trên mạng. Tuy nhiên tài liệu học đa phần đều là tiếng anh. Với mong muốn học về selenium tôi cũng tìm kiếm và tìm đọc các bài viết nhưng thường sẽ không đầy đủ hoặc theo trình tự hợp lý. Sau 1 thời gian đào bới tôi đã thấy một series bài hướng dẫn từ cơ bản đến nâng cao - http://www.softwaretestinghelp.com/selenium-tutorial-1/. Tôi sẽ hỗ trợ các bạn dịch phần nào các nội dung này. Hy vọng sẽ giúp các bạn có thể hiểu các khái niệm và các gói của Selenium một cách chi tiết với các ví dụ thực tế dễ hiểu.

## Lời của tác giả - Shruti Shrivastava, maresh Dhal, and Pallavi Sharma:

Các bài hướng dẫn Selenium sẽ hữu ích với những người mới bắt đầu, cho tới những người đã biết ở cấp độ cao hơn. Bắt đầu từ những khái niệm cơ bản, chúng ta sẽ dần dần chuyển tới những chủ đề nâng cao như tạo Framework, Selenium Grid và Cucumber BDD

**Chúng ta bắt đầu học Selenium như thế nào?**

Đây là thời gian tốt nhất để bắt đầu học kiểm thử tự động Selenium của riêng bạn với sự trợ giúp của loạt bài viết hướng dẫn này. Hãy đọc từng bài viết, thực hành các ví dụ và đưa ra các câu hỏi ở phần bình luận với từng bài viết cụ thể (http://www.softwaretestinghelp.com/selenium-tutorial-1/). Chúng tôi sẽ giải đáp tất cả các câu hỏi như vậy.

Các chuyên gia Selenium có kinh nghiệm sẽ giúp bạn, ngoài ra bạn có thể tham gia vào loạt bài viết này bằng cách đặt câu hỏi hoặc trả lời các câu hỏi của bạn đọc khác.

## Giới thiệu Selenium
Chúng tôi rất vui mừng được giới thiệu loạt bài hướng dẫn khác về lĩnh vực kiểm thử phần mềm. Với hy vọng, sau việc giới thiệu loạt hướng dẫn này sẽ giúp các bạn sớm trở thành chuyên gia của một trong các giải pháp kiểm thử tự động - đó là Selenium.

Trong loạt bài tới đây, chúng ta sẽ chú ý tới các khía cạnh khác nhau của Selenium. Selenium không chỉ là 1 tool, nó còn là một bộ của các tool độc lập. Chúng ta sẽ xem xét một vài tool một cách chi tiết với các ví dụ thực tế khi có thể áp dụng.
## Tại sao là Selenium?
Xu hướng công nghiệp hiện nay đã chỉ ra rằng kiểm thử tự động đang dần trở thành một phong trào. Do đó, một lượng các kịch bản kiểm thử thủ công phải làm đi làm lại đã làm tăng nhu cầu tự động hóa các kịch bản thủ công này.

**Một vài các lợi ích khi thực hiện kiểm thử tự động, hãy cùng chú ý:**
* Hỗ trợ thực hiện lặp lại các bộ test case.
* Trợ giúp trong kiểm thử một ma trận test lớn.
* Cho phép thực hiện song song.
* Khuyến khích thực hiện mà không cần giám sát.
* Cải thiện độ chính xác do đó giảm thiểu lỗi do con người tạo ra.
* Tiết kiệm thời gian và tiền bạc.

**Các lợi ích này sẽ dẫn tới những điều sau:**
* ROI ((Return On Investment - tỷ lệ lợi nhuận) cao
* Goto market nhanh hơn

Có một số các lợi ích của kiểm thử tự động được hiểu và nhắc đến rộng rãi trong lĩnh vực kiểm thử tự động.
Một trong những câu hỏi phổ biến đi kèm với nó :
* Tool nào tốt nhất cho tôi để có thể tự động test?
* Có chi phí liên quan đến tool đúng không?
* Nó có dễ thích ứng không?

Một trong những câu trả lời tốt nhất cho các câu hỏi trên cho việc tự động hóa các ứng dụng dạng web là Selenium. Bởi vì: 
* Selenium có dạng open source
* Selenium được sử dụng rộng rãi và có cộng động trợ giúp
* Nó thích ứng với nhiều trình duyệt và nền tảng
* Phát triển kho Active.
* Hỗ trợ nhiều ngôn ngữ: java, c#, python...
## Tổng quan Selenium
Selenium là một trong những bộ kiểm thử tự động phổ biến nhất. Selenium được thiết kế giống như một cách để hỗ trợ và khuyến khích kiểm thử tự động về mặt chức năng của ứng dụng dạng web và một loạt các trình duyệt, nền tảng. Do Selenium sử dụng mã nguồn mở nên nó trở thành một trong những tools được chấp nhận sử dụng nhất của các chuyên gia kiểm thử.

*Selenium hỗ trợ nhiều trình duyệt, kỹ thuật và nền tảng.*

![](https://images.viblo.asia/deeb8270-85eb-477c-9a8a-d7dca2eaf2da.jpg)

## Thành phần của Selenium
Selenium không phải là một tool hay một tiện ích đơn thuần, hơn thế nó là một package - gói - với một vài tool test, do đó nó giống một một bộ hơn. Mỗi tool được thiết kế nhằm phục vụ các mục đích kiểm thử khác nhau và các yêu cầu về môi trường kiểm thử.
Gói phần mềm bao gồm các tool sau:
* Selenium Integrated Development Environment (IDE).
* Selenium Remote Control (RC).
* Selenium WebDriver.
* Selenium Grid.

Selenium RC và WebDriver, khi kết hợp với nhau được biết đến với tên Selenium2. Selenium RC khi độc lập được gọi là Selenium 1.
![](https://images.viblo.asia/a0b4ecaf-dddd-4ca9-8bb0-356b49303d8c.jpg)

### Giới thiệu tóm tắt về các tool Selenium
### **1. Selenium Core**

Selenium là kết quả từ sự nỗ lực không ngừng của một kỹ sư tên Jason Huggins từ ThoughtWorks. Là người chịu trách nhiệm của ứng dụng nội bộ Time and Expenses, ông nhận thấy nhu cầu về một tool test tự động để loại bỏ các công việc thủ công lặp đi lặp lại mà không ảnh hưởng đến chất lượng và độ chính xác.

Kết quả là ông đã xây dựng một chương trình JavaScript với tên "JavaScriptTesstRunner" vào trước năm 2004. Nó có thể tự động kiểm soát các hoạt động của trình duyệt tương tự như chính người dùng tương tác với trình duyệt.

Kể từ đó, Jason bắt đầu demo tool này với một lượng lớn khán giả. Cuối cùng, buổi thảo luận được tổ chức để phân loại tool này và danh sách loại có mã nguồn mở và tiềm năng của nó sẽ phát triển như một framework test tái sử dụng cho các ứng dụng web khác.

Sau nay tool được đón nhận với cái tên "Selenium Core".

### **2. Selenium IDE (Selenium Integrated Development Environment)**

Selenium IDE được phát triển bởi Shinya Kasatani. Trong khi nghiên cứu về Selenium Core, ông đã nhận ra rằng code của JavaScript có thể mở rộng để tạo ra một môi trường phát triển tích hợp -  integrated development environment (IDE). Với nó, người dùng có thể tích hợp vào trình duyệt Mozilla Firefox. IDE có khả năng ghi và chạy lại các hành động của người dùng trên trình duyệt Firefox - đã được tích hợp IDE. Sau này, Selenium IDE trờ thành một phần của gói Selenium vào năm 2006. IDE có giá trị và tiềm năng lớn cho cộng đồng. 

Selenium IDE là tool đơn giản và dễ sử dụng nhất trong tất cả các tool của gói Selenium. Tính năng record và play back làm nó đặc biệt đơn giản để học đối với những người đã biết chút về bất kỳ ngôn ngữ lập trình nào. Bên cạnh những điểm ưu việt nổi bật, một vài nhược điểm đi kèm của Selenium IDE làm nó không thích hợp để sử dụng trong trường hợp các kịch bản test thường thay đổi hoặc nâng cấp.
![](https://images.viblo.asia/ff26741e-f8ad-4c4b-ab85-dbc1fade0987.jpg)

**Ưu và nhược điểm của Selenium IDE**
|Ưu điểm|Nhược điểm|
|--|---|
|Dễ dàng ghi và chạy lại các thao tác | Chỉ có thể tích hợp trên trình duyệt Firefox|
|Có khả năng chuyển đổi test với html, C#, Java và các ngôn ngữ khác| Không hỗ trợ lặp lại và các câu lệnh có điều kiện|
|Không cần kinh nghiệm lập trình| Không hỗ trợ sửa lỗi|
|Có khả năng ghi log bằng việc sử dụng file logging plug-in trên Firefox| Không hỗ trợ test các kịch bản độc lập hoặc theo nhóm|
|Có thể debug và set breakpoints| Không hỗ trợ test database|
|Linh hoạt và có khả năng mở rộng||

Nhược điểm của IDE không thực sự là nhược điểm của Selenium. Hơn thế, đó chỉ là những hạn chế của IDE. Các hạn chế này có thể được khắc phục bằng cách sử dụng Selenium RC hoặc WebDriver.

### **3. Selenium RC (Selenium Remote Control)**

Selenium RC là 1 tool được viết bằng Java, cho phép người dùng xây dựng kịch bản tes cho các ứng dụng dạng web với các ngôn ngữ lập trình mà họ chọn. Selenium RC là kết quả sau khi khắc phục được các hạn chế của Selenium IDE/ Core.

Lỗ hổng và hạn chế là những thứ luôn tồn tại khi sử dụng Selenium Core, nó gây khó khăn cho người dùng để tận dụng hết lợi ích của tool này. Do đó, nó làm cho quá trình test trở thành nhiệm vụ cồng kềnh và có ảnh hưởng sâu rộng.

Một trong những hạn chế chủ yếu là Chính sách Same Origin.

**Các vấn đề với Same Origin Policy:**

Đó là không cho phép truy cập DOM của một tài liệu từ một nguồn khác với nguồn mà chúng ta đang cố truy cập tài liệu. 

Origin là một sự kết hợp tuần tự của lược đồ, máy chủ, cổng của Url. Ví dụ, có 1 url http://www.seleniumhq.org/projects/, nguồn là sự kết hợp của HTTP, seleniumhq.org, 80.

Do đó, Selenium Core không thể truy cập các phần tử - elements từ một nguồn khác với nguồn mà nó được khởi chạy.

Ví dụ: nếu tôi khởi chạy 1 chương trình JavaScript từ "“http://www.seleniumhq.org/", sau đó tôi có thể truy cập trang ddos với cùng domain như “http://www.seleniumhq.org/projects/” hoặc “http://www.seleniumhq.org/download/”. Các domain khác như google.com, yahoo.com không thể truy cập được.

Do đó, để test với bất kỳ ứng dụng nào mà sử dụng Selenium Core, người ta phải cài đặt toàn bộ ứng dụng đó trên Selenium Core như một server để khắc phục các vấn đề về chính sách Same origin.

![](https://images.viblo.asia/eeac9310-9590-48ea-9456-8ca9fa38c3c6.jpg)

Vì vậy, để điều chỉnh chính sách Same origin mà không cần tạo một bản sao chép ứng dụng để test trên Selenium Core, Selenium Remote Control được đề xuất. Trong khi Jason Huggins đang demo selenium, một đồng nghiệp khác ở ThoughtWWorks tên là Paul Hammant đã gợi ý một cách giải quyết cho chính sách Same Origin và một công cụ có thể được kết nối với một ngôn ngữ lập trình mà họ đã chọn. Do đó, Selenium RC ra đời.

Không giống Selenium IDE, Selenium RC hỗ trợ nhiều trình duyệt và nền tảng.

![](https://images.viblo.asia/e262b709-3371-4bd6-b405-af1784087f61.jpg)

**Mô tả luồng thực hiện**

* Người dùng tạo ra kịch bản test bằng ngôn ngữ lập trình mong muốn.
* Với từng ngôn ngữ lập trình, sẽ có thư viện client riêng.
* Thư viện này sẽ xuất các câu lệnh test tới server selenium.
* Server selenium giải mã và chuyển đổi câu lệnh test sang lệnh JavaScript và gửi tới trình duyệt.
* Trình duyệt thực thi các câu lệnh bằng Selenium Core và gửi kế quả trở lại server Selenium.
* Server Selenium chuyển kết quả test cho thư viện client.

**Các điều kiện tiên quyết cần thiết đặt trước khi tạo kịch bản Selenium RC:**

* Ngôn ngữ lập trình: Java, C#, Python...
* Môi trường phát triển tích hợp: Eclipse, Netbeans...
* Framework testing (tùy chọn): JUnit, TestNG...
* Selenium RC: setup off.

**Ưu và nhược điểm của Selenium RC:**

|Ưu điểm|Nhược điểm|
|--|---|
|Hỗ trợ ngôn ngữ lập trình và cấu trúc | Kịch bản test không tương tác trực tiếp với trình duyệt, server Selenium RC cần dược chạy để có thể tương tác.|
|Hỗ trợ đa trình duyệt và đa nền tảng| Người sử dụng buộc phải biết ngôn ngữ lập trình|
|Hỗ trợ tạo các tiện ích người dùng như Generics/ Exceptions để tùy chỉnh Framework|Không thể xử lý cảnh báo và điều hướng hiệu quả |
|Hỗ trợ xử lý lỗi và kiểm tra Database| Không hỗ trợ test các ứng dụng có nền tảng WAP (iphone/android) |
|Hỗ trợ test Data driven testing|Nhanh hơn selenium IDE nhưng chậm hơn WebDriver |
|Hỗ trợ ghi log và chụp màn hình|Không hỗ trợ triển khai|
|Hỗ trợ Framework testing giống như TestNG và JUnit|Không thể xử lý tốt gọi Ajax|

![](https://images.viblo.asia/67f7b1ce-8773-4ff6-916b-b3474e339601.jpg)

### **4. Selenium Grid**

Với Selenium RC, Tester cảm thấy tích cực và thuận lợi cho đến khi các xu hướng mới được đưa ra, yêu cầu thực hiện các kịch bản giống hoặc khác nhau trên nhiều nền tảng và trình duyệt, đồng thời để đạt được thực hiện kiểm thử phân tán, kiểm thử ở nhiều môi trường khác nhau và tiết kiệm đáng kể thời gian thực hiện. Vì vậy, Selenium Grid được đưa vào nhằm phục vụ các mục đích trên.

Selenium Grid được giới thiệu bởi Pat Lightbody để giải quyết các nhu cầu cho việc thực hiện các bộ test trên nhiều nền tảng cùng một lúc.

### **5. Selenium WebDriver**

Selenium WebDriver được tạo bởi kỹ sư khác tại ThoughtWorks tên là Simon Stewart vào năm 2006. WebDriver thì cũng là tool test web nhưng có sự khác biệt với Selenium RC. Ở thời điểm tool được xây dựng ở mức cơ bản, client cô lập đã được tạo ra cho mỗi trình duyệt; không cần nâng cấp JavaScript Heavy. Điều này dẫn tới việc phân tích sự tương thích giữa Selenium RC và WebDriver. Do đó, một tool tự động mạnh mẽ ra đời - được gọi là Selenium2. 

WebDriver rõ ràng và là một framework hướng đối tượng. Nó sử dụng tính tương thích của các trình duyệt để tự động hóa mà không sử dụng bất cứ các thực thể ngoại vi nào. Với các nhu cầu ngày càng cao, nó trở nên phổ biến và có nhiều người sử dụng.

**Ưu và nhược điểm của Selenium WebDriver:**

|Ưu điểm|Nhược điểm|
|--|---|
|Không yêu cầu có server selenium để chạy kịch bản |API phức tạp.|
|Tương tác trực tiếp với trình duyệt| Người sử dụng cần có kiến thức về lập trình|
|Giao diện hướng đối tượng|Không hỗ trợ test mobile |
|Hỗ trợ công cụ tìm kiếm động| Việc migrate từ selenium RC sang WebDriver là một quá trình mệt mỏi|
|Cung cấp tiện ích và class hỗ trợ trong việc xử lý cảnh báo, điều hướng, gọi Ajax và dropdowns |Không thể test ứng dụng có sử dụng đối tượng flash/flex|
|Hỗ trợ test các ứng dụng WAP (iphone/ android)||
|Hỗ trợ thực thi của người dùng||
|Nhanh hơn Selenium RC||

![](https://images.viblo.asia/ddfa3515-bbf5-476e-9b1a-8b23761485fd.jpg)

### **6. Selenium 3**

Selenium 3 là phiên bản nâng cấp của Selenium 2. Nó tập trung vào tự động hóa cho các ứng dụng mobile và web. Hỗ trợ test mobile, ý của chúng tôi là API WebDriver được mở rộng để giải quyết các nhu cầu về test ứng dụng mobile. Tool này được kỳ vọng sẽ sớm được đưa ra thị trường.

**Environment và Technology Stack**

Với sự ra đời và bổ sung của từng tool mới trong bộ Selenium, môi trường và công nghệ trở nên tương thích hơn. Đây là một danh sách đầy đủ về môi trường và công nghệ được Selenium hỗ trợ. 

***Trình duyệt hỗ trợ***

![](https://images.viblo.asia/115bb7b8-b01b-4cb6-8fad-c70f0525b122.jpg)

***Ngôn ngữ lập trình hỗ trợ***

![](https://images.viblo.asia/1e7d6bbf-da65-4b08-a19f-b93fb85efa80.jpg)

***Hệ điều hành hỗ trợ***

![](https://images.viblo.asia/bdf1fa3d-af70-44cd-8949-f315d75450c1.jpg)

***Framework hỗ trợ***

![](https://images.viblo.asia/7c9f2814-22be-43b7-996a-16d8ee32a369.jpg)

## Kết luận

Trong chuỗi hướng dẫn này, chúng tôi cố gắng giúp các bạn làm quen với bộ Selenium bằng cách mô tả các thành phần, cách sử dụng, các ưu điểm của từng tool.

**Điểm mấu chốt của bài viết này: **

* Selenium là một bộ các tool kiểm thử tự động, mỗi tool sẽ phục vụ các nhu cầu test khác nhau.
* Tất cả các tool này đều sử dụng mã nguồn mở và chỉ hỗ trợ kiểm thử dạng web.
* Bộ Selenium bao gồm 4 tool thành phần: Selenium IDE, Selenium RC, WebDriver và Selenium Grid.
* Người dùng được kỳ vọng chọn đúng tool Selenium mà họ cần.
* Selenium IDE được phân phối dưới dạng plug-in của Firefox và khá dễ dàng để cài đặt và sử dụng. Người dùng không bắt buộc phải có kiến thức lập trình. Selenium IDE là một tool lý tưởng cho người dùng naive.
* Selenium RC là một server cho phép một người dùng tạo ra kịch bản test với ngôn ngữ lập trình mong muốn. Tool cũng cho phép thực hiện các kịch bản test trong phạm vi rộng của các trình duyệt.
* Selenium Grid đưa ra tính năng bổ sung vào Selenium RC bằng cách phân phối các kịch bản trên nhiều nền tảng và trình duyệt để thực hiện cùng một lúc, do đó thực hiện theo kiến trúc master-slave.
* WebDriver là một tool khác hoàn toàn, có nhiều ưu điểm hơn Selenium RC. Sự kết hợp của Selenium RC và WebDriver được biết đến với cái tên Selenium 2. WebDriver tương tác trực tiếp với trình duyệt web và sử dụng khả năng tương thích gốc để tự động hóa.
* Selenium 3 là sản phẩm được dự đoán nhiều nhất trong bộ Selenium nhưng chưa được đưa ra thị trường. Selenium 3 được khuyến khích dùng trong kiểm thử mobile.

Trong bài viết tiếp theo, chúng ta sẽ thảo luận về nội dung cơ bản của Selenium IDE như cách cài đặt và các tính năng. Chúng ta sẽ chú ý tới các thuật ngữ và danh pháp (một hệ thống các tên gọi hay thuật ngữ, các quy tắc hay quy ước được sử dụng để tạo ra các tên gọi) của Selenium IDE.

## Thông tin tác giả:

Shruti Shrivastava (tác giả chính), Amaresh Dhal và Pallavi Sharma giúp đỡ chúng tôi mang tới loạt bài viết này tới độc giả

Shruti hiện làm việc như một Kỹ sư kiểm thử cao cấp với hơn 4 năm kinh nghiệm về test tự động. Cô ấy  là một chuyên gia chứng chỉ ISTQB và cũng lầ một blogger năng động, luôn thích giải quyết các vấn đề liên quan đến kiểm thử.

Amaresh có hơn 5 năm kinh nghiệm test tự động và thủ công với chuyên môn trong WebDriver, Grid và Frameworks.

Pallavi Sharma có hơn 7 năm kinh nghiệm làm việc trong lĩnh vực kiểm thử tự động vơi kinh nghiệm thực hiện Selenium và Java.
**********************************


List of Selenium Online Training Tutorials

**Selenium Basics:**

Tutorial #1 – Selenium Testing Introduction (Must Read)

Tutorial #2 – Selenium IDE Features, Selenium Download, and installation

Tutorial #3 – My first Selenium IDE script (Must Read)

Tutorial #4 – Creating script using Firebug and its installation

Tutorial #5 – Locator Types: ID, ClassName, Name, Link Text, Xpath

Tutorial #6 – Locator Types: CSS Selector

 Tutorial #7 – Locating elements in Google Chrome and IE
  
**Selenium WebDriver:**

Tutorial #8 – Selenium WebDriver Introduction (Must Read)

Tutorial #9 – Selenium WebDriver Installation with eclipse

Tutorial #10 – My first Selenium WebDriver script (Must Read)

Tutorial #11 – Introduction to JUnit

Tutorial #12 – Introduction to TestNG (Must Read)

Tutorial #13 – Handling Drop-downs

Tutorial #14 – Looping and Conditional commands

Tutorial #15 – Explicit and Implicit Waits

Tutorial #16 – Handling Alerts/popups

Tutorial #17 – Commonly used commands

Tutorial #18 – Handling Web Tables, Frames, Dynamic Elements

Tutorial #19 – Exception Handling

**Selenium Framework:**

Tutorial #20 – Most popular Test Automation frameworks (Must Read)

Tutorial #21 – Selenium Framework Creation & Accessing Test Data from Excel (Must Read)

Tutorial #22 – Creating Generics and Testsuite

Tutorial #23 – Using Apache ANT

Tutorial #24 – Setting up Selenium Maven Project

Tutorial #25 – Using Hudson Continuous integration tool

**Advanced Selenium:**

Tutorial #26 – Logging in Selenium

Tutorial #27 – Selenium Scripting Tips and Tricks

Tutorial #28 – Database Testing using Selenium WebDriver

Tutorial #29 – Selenium Grid Introduction (Must Read)

Tutorial #30 – Automation Testing Using Cucumber and Selenium Part -1

Tutorial #31 – Integration of Selenium WebDriver with Cucumber Part -2

**Selenium Tips and Interview Preparation:**

Tutorial #32 – Selenium project test effort estimation

Tutorial #33 – Selenium Interview Questions and Answers

**********************************