# Mở đầu

Bản thân mình đã đi làm vài năm mà vẫn chưa biết viết unit test. Cũng đã qua cái thời trẻ con viết testcase chỉ để sao cho pass, nhưng code mình viết ra vẫn là cả một mớ hỗn độn. Đưa demo cho sếp mà chẳng tự tin. Lập trình viên hạ đẳng như mình còn rất nhiều. Có rất nhiều lý do cho việc bạn chưa biết viết unit test, do dự án các bạn đã làm không yêu cầu, bạn làm việc cho công ty nhỏ, công việc quá nhiều và bạn chẳng có thời gian để design, test cho tử tế, vân vân và mây mây. "TDD is not about Design, not Testing". Trong đầu óc non nớt của junior developer thì unit test là thứ gì đó để mình có thể tốt lên, chẳng vĩ đại được thì cũng bớt ngu đi.

Mình tìm thấy khóa này rất tuyệt vời <a href="https://www.udemy.com/professional-android-unit-testing/">https://www.udemy.com/professional-android-unit-testing/</a>, nhưng thôi đọc sách free, quyển đầu tiên tìm được là The art of unit testing.

Chương đầu tiên:
<ul>
 	<li>Định nghĩa về unit test</li>
 	<li>Phân biệt giữa Unit testing và integration testing</li>
 	<li>Hiểu về Test-driven development</li>
</ul>

# Nghệ thuật unit test

## Những điều cơ bản
Luôn có bước đầu tiên: Lần đầu tiên bạn viết một chương trình, lần đầu tiên bạn thất bại trong một dự án, lần đầu tiên bạn thành công. Bạn không bao giờ quên lần đầu tiên ấy, và tôi hi vọng rằng bạn sẽ không quên những tests đầu tiên của bạn. Có thể bạn đã từng viết một vài tests, và bạn nhớ rằng chúng tồi tệ, vụng về, chậm chạp và không thể bảo trì. (Hầu hết mọi người). Hãy lạc quan lên bạn đã có trải nghiệm tốt với unit tests, và bạn đang đọc những dòng này để nhìn thấy được nhiều hơn những thứ mà bạn đã bỏ lỡ
Trong chương này sẽ phân tích định nghĩa đơn giàn về unit test và so sánh với khái niệm integration test. Điều này có thể gây bối rối một chút. Sau đó chúng ta sẽ xem ưu nhược điểm của unit testing so với integration test và thế nào là "good" unit test. Chúng ta sẽ kết thúc bằng việc tìm hiểu về test drivent development, bởi vì nó sẽ thường xuyên được nhắc tới cùng với unit testing. Thông qua chương này, tôi sẽ chạm tới các khái niệm nhằm giải thích các phần khác trong cuốn sách.
Nào hãy bắt đầu.

### 1.1. Định nghĩa unit test, step by step

Unit testing không phải một khái niệm mới trong phát triển phần mềm. Nó đã trôi nổi từ những ngày sớm của Smalltalk programming language những năm 70, và nó tự chứng minh được rằng nó là cách tốt nhất để cải thiện chất lượng code, hiểu sâu được các yêu cầu chức năng của hệ thống của các class hay các phương thức.
Kent Beck giới thiệu khái niệm về unit testing trong Smalltalk, và nó đã bao gồm nhiều ngôn ngữ khác nhau, làm cho unit testing là cực kỳ hữu dụng trong việc lập trình phần mềm. Trước đây tôi đã đi xa hơn, Tôi cần định nghĩa unit testing tốt hơn. Đây là định nghĩa cơ bản từ wikipedia, Nó đã lạc hậu, định nghĩa cuối cùng sẽ xuất hiện trong mục 1.4.
<blockquote>A unit test is a piece of a code (usually a method) that invokes
another piece of code and checks the correctness of some assumptions afterward. If the assumptions turn out to be wrong, the unit test has failed. A unit
is a method or function.</blockquote>
Unit test là các đoạn code (thường là một phương thức) gọi tới một đoạn code khác để kiểm tra tính đúng đắn của vài giả định sau đó. Nếu giả định mà sai, unit test là failed. Một unit test là một phương thức hoặc một hàm.

Thứ mà bạn sẽ test gọi là system under test (SUT)
<blockquote>SUT viết tắt cho system under test, một vài người gọi là CUT (class under test hoặc code under test). Khi bạn test, bạn sẽ phải refer tới thứ mà bạn đang test chính là SUT.</blockquote>
Tôi đã feel (Đúng thể feel. Không có khoa học trong cuốn sách này, chỉ có nghệ thuật). Định nghĩa này đúng về mặt kĩ thuật, nhưng qua một vài năm, ý tưởng về <em>unit</em> đã thay đổi. Với tôi, một unit là viết tắt cho "unit of work" hay "use case" trong hệ thống.
<blockquote>Definition
A unit of work is the sum of actions that take place between the invocation of a public
method in the system and a single noticeable end result by a test of that system. A
noticeable end result can be observed without looking at the internal state of the system and only through its public APIs and behavior. An end result is any of the following:
■ The invoked public method returns a value (a function that’s not void).
■ There’s a noticeable change to the state or behavior of the system before and
after invocation that can be determined without interrogating private state.
(Examples: the system can log in a previously nonexistent user, or the system’s
properties change if the system is a state machine.)
■ There’s a callout to a third-party system over which the test has no control, and
that third-party system doesn’t return any value, or any return value from that
system is ignored. (Example: calling a third-party logging system that was not
written by you and you don’t have the source to.)</blockquote>
Ý tưởng về unit of work nghĩa là, một unit có thể là một phương thức cũng có thể nhiều class các hàm để đạt được mục đích của nó.

Bạn có thể cảm thấy rằng bạn muốn tối giản kích cỡ của một unit of work để test. Tôi cũng hiểu theo cách này. Nhưng giờ thì không. Tôi tin rằng nếu bạn có thể tạo ra một unit of work lớn hơn, và bạn có thể faking một vài dòng và kết quả cuối cùng là public API thay vì việc <em>train stops on the way to the main station</em> (người dịch không hiểu lắm). Tôi sẽ giải thích nhiều hơn trong một topic về overspecification trong cuốn sách (hầu hết trong chương 8)
<blockquote>UPDATED DEFINITION 1.1 A unit test is a piece of code that invokes a unit of
work and checks one specific end result of that unit of work. If the assumptions on the end result turn out to be wrong, the unit test has failed. A unit
test’s scope can span as little as a method or as much as multiple classes.</blockquote>
Ngôn ngữ lập trình bạn sử dụng không phải là vấn đề, vấn đề ở đây là định nghĩa một unit test sao cho tốt.
<h5>Một điểm quan trọng để viết good unit test</h5>
Thế nào là unit of work không đủ

Hầu hết mọi người cố gắng unit test những dòng code của họ mà bỏ qua một số điểm họ không thực sự perform. Thay vào đó họ dựa vào hệ thống và integration test để perform nhiều hơn sau đó trong vòng đời sản phẩm hoặc họ nhờ tới việc test bằng tay bằng việc sử dụng sản phẩm cuối mà học phát triển để invoke code của chúng.

Không có lý do nào để viết ra các unit test tồi, trừ khi bạn đang học cách viết một cái tốt hơn và đó là bước đi đầu tiên của bạn. Nếu bạn đang dự định viết một unit test tồi tệ mà không nhận ra nó, tốt hơn là không viết nó để cứu được các rắc rối sau này, nó sẽ là cản trở quá trình bảo trì và time schedules. Bằng cách định nghĩa một good unit test, bạn đảm bảo rằng bạn không bắt đầu một thứ gì đó sai trái với mục đích của bạn.

Để hiểu thế nào là một unit test, bạn hãy xem các lập trình viên làm khi mà họ testing thứ gì đó.

Vậy bạn chắc như thế nào rằng code sẽ làm việc hôm nay?
<h5>Tất cả chúng ta đều đã từng viết unit test</h5>
Bạn có lẽ ngạc nhiên khi biết điều này, nhưng bạn đã từng viết một vài unit test rồi. Bạn cũng gặp những lập trình viên không test code của họ trước khi bàn giao nó? Well tôi cũng thế.

Bạn đã từng sử dụng console application gọi rất nhiều phương thức trong một class hay component và có lẽ đã tạo một WinFroms hay Web Forms UI và kiểu tra chức năng của một class hoặc component, hay có lẽ kiểm thử bằng tay bằng việc chạy để performs vài hành động với giao diện. Kết quả là bạn biết được là code đã hoạn động đủ tốt hay chưa.<img class="alignnone size-full wp-image-249" src="http://35.196.17.90/blog/wp-content/uploads/2019/04/UI-Test-manualy.png" alt="" width="529" height="273" />

Phần lớn lập trình viên test theo cách này. Khi UI thay đổi, có thể trông sẽ khác nhưng mẫu này thường giống nhau: sử dụng manual external tool để kiểm tra các công việc lặp lại hoặc chạy ứng dụng bằng tay.

Cách test này có thể hữu dụng nhưng chúng ta cần đi xa hơn thế, tôi sẽ định nghĩa một good unit test trong cuốn sách này.

Cái gì là unit test và cái gì không phải?

### 1.2. Thuộc tính của một good unit test

Một unit test nên có các đặc trưng dưới đây.
<ul>
 	<li>Nó có thể tự động và lặp lại</li>
 	<li>Nó nên dễ dàng implement</li>
 	<li>Nó nên liên quan tới ngnafy mai</li>
 	<li>Bất kỳ ai cũng có thể chạy nó bằng cách nhấn nút</li>
 	<li>Nó nên chạy nhanh</li>
 	<li>Nó nên consistent trong kết quả (Nó thường trả về cùng một kết quả nếu bạn không thay đổi bất cứ thứ gì khi chạy)</li>
 	<li>Nó nên có toàn quyền điểu khiển của Unit under test</li>
 	<li>Nó nên độc lập (chạy mà không phụ thuộc vào các test khác)</li>
 	<li>Khi thất bại, nó nên dễ dàng phát hiện ra điểm gây ra vấn đề</li>
</ul>
Nhiều người bối rối về việc testing với khái niệm unit test. Vậy hãy bắt đầuhỏi chính bạn các câu hỏi dưới đây.
<ul>
 	<li>Tôi có thể chạy và lấy kết quả từ một unit test Tôi đã viết 2 tuần hoặc 2 tháng hay 2 năm</li>
 	<li>Có bất kỳ thành viên nào trong team mình chạy và lấy kết quả từ unit test tôi viết 2 tháng trước</li>
 	<li>Tôi có thể chạy tất cả các unit test Tôi đã viết không quá vài phút</li>
 	<li>Tôi có thể chạy tất cả unit test bằng việc nhấn một nút</li>
 	<li>Tôi có thể viết một test cơ bản không quá vài phút</li>
</ul>
Nếu bạn trả lời không trong bất kỳ câu hỏi nào, khả năng cao là bạn đang implement thứ không phải unit test. Chắc chắn có vài loại test khác, và quan trọng như unit test, nhưng so sánh chúng sẽ giúp bạn trả lời yes tất các các câu hỏi.

Vậy tôi đã làm gì trước đây? Có lẽ bạn đang hỏi. Điều bạn đã làm là integration testing.

### 1.3. Integaration tests

Test nào không đủ nhanh và consitent và sử dụng một hoặc nhiều dependencies trong units under test. Ví dụ, nếu test sử dụng real system time, real filesystem, hay real database, nó sẽ là integration testing.

Nếu một test không điều khiển system time, ví dụ nó đang sử dụng current DateTime.Nơ trong khi test code, sau đó sau mỗi lần thực thi, trong các test khác nhau bởi vì nó sử dụng thời gian khác nhau. Và nó không consistent.

Nó không phải là thứ gì đó tồi tệ. Tôi nghĩ integration test là phần quan trọng, nhưng chúng nên được chia nhỏ để có thể cảm thấy an toàn, cái mà được chia sẻ ở phần sau (OK phần sau ngoài việc học cách viết unit test, học cách viết good unit test, còn học cách viết integration test sao cho tốt).

Nếu một test sử dụng real database, mà không running on memory, trong thực tese nó sẽ khó xóa hơn khi sử dụng only in-memory fake data. Test sẽ không chạy nữa, trong thực tế nó không điều khiển được. Unit test nên nhanh. Integration test thường chậm. Khi bạn bắt đầu có vài trăm test thường chỉ mất nửa giây.

Integration test làm tăng rủi ro của các vấn đề khác: Test quá nhiều thứ trong một lần.

Bạn sẽ làm gì khi xe bạn bị hỏng? Bạn sẽ tìm hiểu xem vấn đề là gì và thử sửa chữ nó một mình như thế nào? Một động cơ bao gồm rất nhiều hệ thống con làm việc cùng nhau, mỗi thứ lại dựa vào một cái khác để đạt được kết quả cuối cùng: Một moving car. Nếu chiếc xe dừng lại, lỗi có thể ở bất cứ hệ thống con nào - có thể nhiều hơn một. Tích hợp nhiều hệ thống con (nhiều tần lớp) giúp xe di chuyển. Bạn có thể nghĩ xe chạy chính là integration test cuối cùng. Nếu test fails tất cả các phần của fail. nếu nó success tất cả các phần success.

Cũng như thế trong phần mềm. Cách mà hầu hết các lập trình viên test chức năng của họ là thông qua chức năng cuối cùng UI. Click một vài nút thông qua hàng loạt sự kiện - các classes và các components hoạt động cùng nhau để làm ra kết quả cuối cùng. Nếu test fails, tất các cả components hệ thống fail như một đội và nó rất khó để hình dung được thất bại của toàn hệ thống.

Như định nghĩa The Complete Guide to Software Testing by Bill Hetzel (Wiley, 1993), integration testing là "“an orderly progression of testing in which software and/or hardware elements are combined and tested until the entire system has been integrated". Dưới đây là một định nghĩa tốt hơn về Integration testing
<blockquote>DEFINITION Integration testing is testing a unit of work without having full control over all of it and using one or more of its real dependencies, such as time,
network, database, threads, random number generators, and so on.</blockquote>
Để tổng kết: một integration test sử dụng các real dependencies, Unit test là độc lập với các unit of work. vì thế chúng là consistent về kết quả và có thể dễ dàng điều khiển và giả lập các hành vi của unit.
<h5>Nhược điểm của integration test không tự động so với tự động</h5>
Hãy áp dụng các câu hỏi trong phần 1.2 để integration test và cân nhắc cái mà bạn muốn dành được trong các unit test thực tế.

<em>Tôi có thể chạy và lấy kết quả từ các test tôi đã viết từ 2 tuần 2 tháng hay 2 năm cách đây?</em>

Nếu bạn không thể, bạn biết được bạn đã phá vỡ một tính năng bạn đã tạo trước đây? Code thay đổi trong suốt vòng đời của ứng dụng, và nếu bạn không thể chạy lại test cho tất cả các phần trước sau khi thay đổi code, bạn có thể đã làm hỏng nó mà không biết.Tôi có thể gọi nó là "accidental bugging" (các lỗi tình cờ) và nó dường như xuất hiện ờ gần cuối của một dự án phần mềm, khi phát triển và dưới sswc ép để fix các bugs đã tồn tại. Thỉnh thoảng chúng được giới thiệu như là new bug mà vô tình chúng đã được resolve.
<blockquote>DEFINITION A regression is one or more units of work that once worked and
now don’t.</blockquote>
<em>Bất kỳ thành viên nào cũng có thể chạy và lấy kết quả từ test mà tôi viết trong 2 tháng trước đây?</em>

Bạn muốn chắc chắn không làm hòng những dòng code của người khác khi bạn thay đổi vài thứ. Rất nhiều lập trình viên sợ thay đổi code của hệ thống cũ.

Nếu bạn đã biết rằng bạn đã phá vỡ bất cứ thứ gì, bạn đỡ lo sợ hơn.

Good tests có thể được truy cập và run bởi bất kỳ ai
<blockquote>DEFINITION Legacy code is defined by Wikipedia as “source code that relates to
a no-longer supported or manufactured operating system or other computer
technology,” but many shops refer to any older version of the application currently under maintenance as legacy code. It often refers to code that’s hard to
work with, hard to test, and usually even hard to read.</blockquote>
<em>Tôi có thể chạy tất cả các test không quá vài phút?</em>

Nếu bạn không chạy các test một cách nhanh chóng (một vài dây tốt hơn vài phút), bạn sẽ chạy chúng ít thường xuyên hơn (hàng ngày hay hằng tuần hoặc hằng tháng một vài chỗ). Vấn đề là khi bạn thay đổi code, bạn có thể lấy feedback sớm để nhìn thấy rằng bạn có thể làm hỏng vài chỗ.

Good test should run quickly.

<em>Tôi có thể chạy tất ả các test bằng cách nhất một nút?</em>

Good tests should be easily executed in their original form, not manually.

Tôi có thể viết một test cơ bản không quá vài phút.

### 1.4. Cái gì tạo nên good unit tests.

Bây giờ tôi đã covered các thuộc tính qua trọng mà unit test nên có, Tôi sẽ định nghĩa lại unit test lần nữa cho tất cả
<blockquote>UPDATED AND FINAL DEFINITION 1.2 A unit test is an automated piece of code
that invokes the unit of work being tested, and then checks some assumptions
about a single end result of that unit. A unit test is almost always written using
a unit testing framework. It can be written easily and runs quickly. It’s trustworthy, readable, and maintainable. It’s consistent in its results as long as production code hasn’t changed.</blockquote>
bỏ qua bỏ qua ...

### 1.5. Viết một unittest.

(Để cho việc viết hướng dẫn cho tử tế, từ việc cấu hình, chạy unit test, xem pass hay failed, mình xin được làm một bài viết khác. Bày này thuần lý thuyết. Chúng ta cần một bài viết để khai sáng. Còn code ngoài kia đâu chả có. Đọc code viết code cả ngày rồi đàm đạo chút không tốt sao.)

### 1.6. Test-driven development.

Bạn đã viết tét có cấu trúc, dễ bảo trì, solid test với một unit testing framework. câu hỏi tiếp theo là khi nào thì nên viết test. Nhiều người cảm thấy rằng tốt nhất để viết unit test là sau khi chương trình được viết ra, nhưng số khác lại cho rằng nên viết code trước khi viết sản phẩm. Điều này được gọi là test first hay test driven development (TDD).

Nhiều định nghĩa khác nhau về TDD. Một vài nói rằng nó là test first development, và một vài lại nói rằng nó nghĩa là a lot of tests. Một vài nói rằng nó là cách thiết kế, số khác có thể hiểu là cách để drive your code ;s behavior with only some design. Trong cuốn sách này TDD nghĩa là test first development, với thiết kế là vài trò thứ hai trong kĩ thuật này (Cái mà sẽ không thảo luận trong cuốn sách này).

<img class="alignnone size-full wp-image-250" src="http://35.196.17.90/blog/wp-content/uploads/2019/04/traditional_writing_UT.png" alt="" width="583" height="276" />

TDD là một cách khác của quá trình phát triển truyền thống. Bạn bắt đầu bằng viết viết một test và thất bại. bạn thay đổi production code và nhìn test pass, và tiếp tục refactor your code hay tạo một failing test.

Cuốn sách sẽ tập trung vào kĩ thuật viết good unit tests, hơn là TDD, nhưng tôi là một big fan của TDD. Tôi viết một vài ứng dụng và frameworks sử dụng TDD, phải quản lý teams và sử dụng chúng, và dạy hàng trăm khóa học, workshop về TDD và kĩ thuật UT. Qua sự nghiệp của tôi, tôi tìm thấy TDD giúp cho việc tạo ra chất lượng code, chất lượng test, và thiết kế tốt cho code tôi đang viết. Tôi thuyết phụ rằng tôi có thể làm việc cho lợi ích của bạn, nhưng không phải là không vì tiền (thời gian để học, thời gian đẻ implement và hơn thế). Nó chắc chắn rất giá trị

<img class="alignnone size-full wp-image-251" src="http://35.196.17.90/blog/wp-content/uploads/2019/04/TDD.png" alt="" width="622" height="379" />

Nó là quan trọng để nhận ra rằng TDD không đảm bảo sự thành công của dự án hay test là mạnh mẽ hay dễ bảo trì.

Kĩ thuật của TDD là đơn giản:
<ul>
 	<li>Viết một failing test để kiểm tra việc thiếu chức năng của sản phẩm cuối (failing test có vẻ như là unit test khi mà chưa implement ở phần product code. Nên nhớ rằng chúng ta viết test trước khi implement trong code.)</li>
 	<li>Tạo test pass bằng cách viết production code</li>
 	<li>Refactor your code</li>
</ul>

### 1.7. Ba kĩ Năng của TDD

Để successful trong TDD bạn cần 3 tập kĩ năng: biết cách viết good tests, viết test-first, và thiết kế chúng tốt.

### 1.8. Tổng kết

<ul>
 	<li>Trong chương này, tôi định nghĩa một good unit test:</li>
 	<li>Nó là các độan code invoke các phương thức khác nhau sau đó kiểm tra một vài giả định trên các method hoặc class</li>
 	<li>Nó được viết sử dụng một unit testing framework</li>
 	<li>Nó có thể được viết một cách dễ dàng</li>
 	<li>Nó chạy nhanh</li>
 	<li>Nó có thể được thực thi lặp đi lặp lại bởi bất kì ai trong team</li>
</ul>
Trong chương tiếp theo bạn sẽ bắt đầu viết Unit test đầu tiên sử dụng NUnit.
<h2>Kết thúc