![image.png](https://images.viblo.asia/162547b2-0c05-4dc3-960f-a742d44765f7.png)

Mình là **TUẤN** hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Visual Studio Code đã trải qua một chặng đường dài để trở Code Editor ưa thích và đáng tin cậy của các bạn Dev hiện nay. Javascript, TypeScript, Go, Python và các ngôn ngữ khác có một lượng lớn các Developer hiện đang code bằng VSCode, một phần nhờ vào hệ sinh thái khổng lồ của các tiện ích mở rộng giúp nâng cao và phong phú trải nghiệm trong VS Code, biến nó thành một Code Editor siêu thông minh với khả năng IDE-ish trong khi vẫn nhanh và nhẹ một cách khó tin.

Không có gì ngạc nhiên khi VSCode cũng có thể dùng đề code Java, và nhiều Champions và Diễn giả về Java đã chọn nó cho các buổi LAI TRYM của họ.

Đây là hướng dẫn đầy đủ cho tới năm 2019 dành cho các Developer Java sử dụng Visual Studio Code để phát triển, chạy, gỡ lỗi và triển khai (deloy) các ứng dụng.

Nếu bạn chưa tải xuống Visual Studio Code, hãy [**cài đặt ngay bây giờ**](https://code.visualstudio.com/?WT.mc_id=medium-blog-brborges) **.** Phần còn lại của hướng dẫn này mình xem như là bạn đã cài đặt ít nhất Java 8, mặc dù nó cũng hoạt động với Java 11. Ae cũng có thể bỏ qua hoàn toàn hướng dẫn này và chỉ cần truy cập trang tài liệu dành cho [Java trong Visual Studio Code](https://code.visualstudio.com/docs/languages/java?WT.mc_id=medium-blog-brborges) . Nhưng hãy xem hướng dẫn này bên dưới nếu bạn muốn một bản tóm tắt ngắn gọn về những thứ cần thiết nhất để code Java bằng VSCode.

Thiết lập ban đầu
=================

Có một tập hợp các phần mở rộng (Extension) là yêu cầu tối thiểu để được hỗ trợ Java Core trong VS Code. bạn hãy đi sâu vào từng extension nhé.

[Java Extension Pack, của Microsoft](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack&WT.mc_id=medium-blog-brborges)
------------------------------------------------------------------------------------------------------------------------------------------------

Gói Java Extension Pack này bao gồm 5 tiện ích mở rộng bên dưới được giải thích chi tiết và nó sẽ giúp bạn bắt đầu mà không cần đào sâu quá nhiều.

[Language Support for Java, của Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java&WT.mc_id=medium-blog-brborges)
---------------------------------------------------------------------------------------------------------------------------------------

Đây là tiện ích mở rộng duy nhất bạn được yêu cầu cài đặt để có hỗ trợ Java. Tất cả các tiện ích mở rộng khác đều bổ sung, nhưng hãy xem xét chúng dựa trên các loại dự án bạn sẽ thực hiện.

Sau khi cài đặt **Language Support for Java**, bạn có thể đọc và chỉnh sửa code nguồn Java. Bắt đầu bằng cách tạo tệp HelloWorld.java và mở trên VS Code (hoặc tạo tệp ở bên trong vscode thư mục hiện tại của bạn).

![image.png](https://images.viblo.asia/f3b787c0-46cc-43d2-bd05-60e15abcd06c.png)

![image.png](https://images.viblo.asia/f17bfaaa-cf59-47e1-9fc3-474b82ade125.png)

![image.png](https://images.viblo.asia/1c8a0cad-23f8-4eda-a829-954e10f07491.png)

Các mẫu đoạn code Java: **_class_** _,_ **_main_** _,_ **_sysout_**

![image.png](https://images.viblo.asia/4367513d-548b-49e4-9034-fb99ecf76e98.png)

Hoàn thành chương trình Hello World bằng Java

Sau khi hoàn tất, bạn có thể mở terminal - trên Mac OS, gõ ⌘ + \`- rồi nhập `javac HelloWorld.java` để biên dịch tệp.

![image.png](https://images.viblo.asia/0410cfc4-eeea-466d-9345-8100fadc6f0d.png)

Thiết bị đầu cuối được nhúng trên code VS

Thao tác này sẽ tạo tệp **HelloWorld.class**. Sau đó hãy chạy nó với lệnh `java HelloWorld`.

Phần mở rộng **Language Support for Java** mang đến hỗ trợ Java thông qua việc sử dụng Giao thức Máy chủ Ngôn ngữ Eclipse. [Tìm hiểu thêm về Eclipse LSP](https://www.eclipse.org/community/eclipse_newsletter/2017/may/article4.php) .

Các tính năng khác của Language Support for Java
------------------------------------------------

Tiện ích mở rộng **Language Support for Java** bổ sung nhiều khả năng khác sẽ giúp bạn điều hướng, viết, cấu trúc lại và đọc code nguồn Java khá nhanh.

![image.png](https://images.viblo.asia/22234f1f-01ad-40eb-90cf-39ca42663021.png)

Test [trang tổng quan](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) để biết danh sách đầy đủ các tính năng của nó và các phím tắt hữu dụng.

[Debugger for Java, của Microsoft](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug&WT.mc_id=medium-blog-brborges)
-----------------------------------------------------------------------------------------------------------------------------------------------

Khi bạn đã nắm được những kiến ​​thức cơ bản về cách viết và đọc code Java trên Visual Studio Code, bước tiếp theo chắc chắn là chạy và gỡ lỗi. Phần mở rộng này cung cấp chính xác điều đó. Nó sẽ sử dụng biến JAVA\_HOME mặc định trên máy tính của bạn, hoặc bạn có thể tùy chỉnh tùy ý. [Về việc cài đặt biến JAVA\_HOME thì mình có một bài viết khác về vấn đề này các bạn có thể tham khảo](https://tuan200tokyo.blogspot.com/2022/10/blog8-cach-cai-at-bien-javahome-tren.html).

![image.png](https://images.viblo.asia/535cfdcb-90c8-4053-b815-53a7e98b0887.png)

Nó có tất cả các khả năng của một tính năng gỡ lỗi Java IDE thông thường và nó cho phép tùy chỉnh và kiểm soát tốt hơn cách mọi thứ được thực thi và cách trình gỡ lỗi được kết nối với JVM (Java Virtual Machine).

Khi phần mở rộng này được cài đặt, bạn sẽ thấy hai siêu liên kết phía trên method **main**, giống như trong hình trên. Ae có thể nhấp vào **Run**, và code sẽ được biên dịch và thực thi. Ae cũng có thể đặt một điểm ngắt và nhấn **Debug**.

![image.png](https://images.viblo.asia/5427c1a9-28b7-46ed-9bd9-b420b6313328.png)

Như bất kỳ IDE gỡ lỗi nào, bạn có thể xác định phạm vi các biến, theo dõi ngăn xếp **(stack trace)** và thậm chí thực hiện các thay đổi đối với nội dung biến trong thời gian thực thi.

![image.png](https://images.viblo.asia/f993d4df-889b-4e97-a83f-97be0a3ca400.png)

Thay đổi các biến Java trong khi gỡ lỗi trên VS Code

Xong bạn với những cái ở trên bạn thấy đó Visual Studio Code có thể đọc, viết, chạy và gỡ lỗi Java.

Thiết lập trung gian (Intermediary Setup)
=========================================

Khi bạn đã quen với những điều cơ bản về Java, bạn sẽ sớm cần phải làm việc với các thư viện, phụ thuộc, classpath, v.v. Cách tốt nhất để cải thiện điều đó trên Visual Studio Code là thêm hai phần mở rộng sau:

1.  [Java Dependency Viewer](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency&WT.mc_id=medium-blog-brborges)
2.  [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven&WT.mc_id=medium-blog-brborges)

Bạn hãy xem xét từng cái một nhé.

[Trình xem phụ thuộc Java, của Microsoft](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency&WT.mc_id=medium-blog-brborges)
-----------------------------------------------------------------------------------------------------------------------------------------------------------

Extension này sẽ cung cấp cho bạn hai khả năng cốt lõi. Khái niệm chính là khái niệm "Project", mà bạn có thể sử dụng để thêm các thư viện (JAR) vào nó theo cách thủ công. Điều thứ hai là nó cho phép bạn trực quan hóa đường dẫn **classpath** mà project của bạn hiện đang được thiết lập, ngay cả khi đó là một Maven Project (xem Maven Extension cho Java ở phần tiếp theo).

Mở bảng lệnh (Shift + ⌘ + P) và nhập **_create java_ :**

![image.png](https://images.viblo.asia/96976a28-e4bd-4550-a8f1-c56d93c329f2.png)

Thao tác này sẽ hỏi bạn một vị trí nơi dự án sẽ được tạo. Một dự án bao gồm một thư mục có cùng tên với tên dự án (nó sẽ là câu hỏi tiếp theo khi bạn chọn một vị trí, ví dụ: _myworkspace_ ).

Sau khi dự án được tạo, VS Code sẽ mở thư mục mới này trên một cửa sổ mới.

![image.png](https://images.viblo.asia/0299d120-34c6-4f72-848b-7d6e5881106e.png)

Như bạn thấy, dự án có cấu trúc cơ bản với các thư mục bin và src. Bên trong src, bạn sẽ tìm thấy một lớp Java cơ bản để bắt đầu. Nếu bạn là một Developer Java có kinh nghiệm, bạn sẽ nhanh chóng nhận ra rằng Extension này sử dụng định dạng của dự án Eclipse, đơn giản vì nó hoạt động tốt với Giao thức máy chủ ngôn ngữ Eclipse (Eclipse Language Server Protocol) và các Extension khác.

**Thêm thư viện**
-----------------

Bạn có thể thêm thư viện bằng cách chỉnh sửa tệp **.classpath** với các mục nhập tùy chỉnh của JAR có thể được đặt ở bất kỳ đâu, ví dụ như được đặt ở **thư mục lib**. Các Extension sẽ tự động tải các thư viện đó trong **classpath** và bạn có thể chạy code của mình.

![image.png](https://images.viblo.asia/b9786609-aea8-4151-b130-28b4b335a405.png)

Chỉnh sửa **.classpath** để thêm các thư viện bổ sung.

[Maven for Java, của Microsoft](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven&WT.mc_id=medium-blog-brborges)
---------------------------------------------------------------------------------------------------------------------------------------

Maven là công cụ quản lý phụ thuộc và xây dựng dự án được sử dụng rộng rãi nhất trong hệ sinh thái Java. Vì vậy, phần **extension** này cuối cùng đã đưa bạn đến một điểm mà bạn có thể làm việc trên khá nhiều dự án Java, dưới bất kỳ hình thức nào, thông qua Visual Studio Code.

Asẽ có thể tạo và khởi động các dự án Maven thông qua các archetypes (skeletons) của Maven, sau đó quản lý các phần phụ thuộc và kích hoạt các mục tiêu của Maven, đồng thời chỉnh sửa với file pom.xml.

![image.png](https://images.viblo.asia/394f9a47-e552-46fb-8c12-b7fb749fbb72.png)

Hãy cùng xem:

*   Mở lại ngăn lệnh (command pallet - **Shift + ⌘ + P**) và nhập _**Maven**_.
*   Chọn **_Generate_** _từ **Maven Archetype**._
*   Chọn _**maven-archetype-quickstart**_.

Phần mở rộng sẽ yêu cầu một thư mục đích, nơi thư mục dự án sẽ được tạo. Nó sẽ đưa bạn đến **terminal**, nơi bạn sẽ phải nhập các tham số vào Maven command-line, nhưng đừng lo lắng vì nó sẽ được hướng dẫn.

Sau khi dự án được tạo, ngay từ terminal, hãy gọi `code <folder name>`.

hoặc là nó sẽ tự động mở **window vscode** mới.

![image.png](https://images.viblo.asia/8d40c986-d92a-4192-9d34-52700fb1cca4.png)

Mở thư mục mới tạo trên VS Code

Được rồi, bạn sẽ mở dự án Maven của mình trên VS Code. Điều rất cơ bản bạn có thể làm là **run** code của bạn. Và có hai lựa chọn ở đây:

1.  Chạy với siêu liên kết **Run** bên trong **class App** bên cạnh method **main**, như bạn đã học trước đó.
2.  Tất nhiên là sử dụng Maven.

Nếu bạn sử dụng trình kích hoạt **Trình gỡ lỗi** cho Java extension ( _Run | Debug_ ), thì tiện ích mở rộng sẽ sử dụng đường dẫn nối do Maven tạo ra, để đảm bảo tất cả các phụ thuộc được thêm đúng vào đường dẫn nối.

Tuy nhiên, để chạy với Maven, bạn có thể sử dụng Terminal như bình thường hoặc mở Command Pallet và nhập _Maven Execute Commands_ .

![image.png](https://images.viblo.asia/227f8e77-93e1-49b5-a24f-6c8e0cb4c107.png)

Nó sẽ yêu cầu bạn chọn một dự án. Vì bạn chỉ có một, hãy nhấn Enter trên đó. Tiếp theo những gì bạn sẽ thấy là danh sách tất cả các mục tiêu Maven cốt lõi mặc định. Nhấn **package** để tạo tệp JAR.

![image.png](https://images.viblo.asia/0cc31ca5-a9c7-4b22-bdbd-53958fd044d3.png)

Nếu bạn muốn chạy các mục tiêu tùy chỉnh, chẳng hạn như những mục tiêu được kế thừa từ plugin Maven, bạn có thể sử dụng chế độ xem Maven:

![image.png](https://images.viblo.asia/62e26369-8f35-4efc-a966-37325f7b133c.png)

Khi bạn chỉnh sửa tệp **pom.xml** của mình để thêm các phần phụ thuộc, VS Code sẽ tự động tải lại đường dẫn **classpath** và bạn sẽ có thể nhập các lớp và gói từ các phần phụ thuộc mới của mình. Sang xịn mịn luôn. 😍 **Java** này nó hơi phức tạp hơn **Javascript** nên mình khuyên bạn nên làm theo sai đâu sửa đó chứ chỉ đọc ko thôi thì có vẻ ko ăn thua.

[Java Test Runner, của Microsoft](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test&WT.mc_id=medium-blog-brborges)
---------------------------------------------------------------------------------------------------------------------------------------------

Bước cuối cùng là update thêm một tý về cách mà bạn **run**, **debug** và trực quan hóa kết quả của các bài test đơn vị (**unit test**) của bạn. Extension này thêm các siêu liên kết vào các unit test (hỗ trợ JUnit và TestNG) có thể được thực thi riêng lẻ và bạn có thể xem báo cáo ngay bên trong Visual Studio Code, như trong ví dụ bên dưới.😁

![image.png](https://images.viblo.asia/668690ff-463e-447a-a2ce-df0a4fcdc196.png)

Chạy thử nghiệm đơn vị trong VS Code

Extension này cũng sẽ kích hoạt chế độ xem Test Explorer, vì vậy bạn có thể tập trung vào các unit test của mình và viết phần mềm theo phong cách TDD hơn. 😊 [(](https://tuan200tokyo.blogspot.com/2022/10/blog9-cach-test-ung-dung-bang-jest.html)[Test-driven development - Về chủ đề này mình cũng có nhắc đến trong một bài viết khác của mình. Bạn có thể tham khảo bài này để biết thêm về Test và TDD)](https://tuan200tokyo.blogspot.com/2022/10/blog9-cach-test-ung-dung-bang-jest.html)

![image.png](https://images.viblo.asia/989c9e5a-a7ac-4f93-8476-80ea5fc3e810.png)

Extension này hiện chỉ hoạt động với các dự án Maven, vì vậy hãy đảm bảo rằng bạn cũng đã cài đăt Maven Extension for Java.

Thiết lập nâng cao
==================

Nếu bây giờ bạn cảm thấy thoải mái với việc sử dụng VS Code cho Java, đã đến lúc up level của bạn. Dưới đây là danh sách một số tiện ích mở rộng (extension) sẽ nâng cao trải nghiệm của bạn trong công việc hàng ngày.

Đây chỉ là một gợi ý về một số tiện ích mở rộng hay ho có thể giúp bạn happy hơn với coding.

[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
------------------------------------------------------------------------------

![image.png](https://images.viblo.asia/02457927-7255-4859-9fde-6fe101c5fa02.png)

Hy vọng rằng bạn đang sử dụng Git, cho dù thông qua GitHub hay bất kỳ dịch vụ hoặc môi trường nào khác. Tiện ích mở rộng này sẽ cung cấp cho bạn thông tin chi tiết về ông nào đã thay đổi code ngay trong source code của bạn quá tiện, chẳng hạn như '**ai đã thêm hàm này và khi nào**'.

[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
------------------------------------------------------------------------------------

Nếu bạn là Developer đang xây dựng các API REST, đây là tiện ích mở rộng phải có trên môi trường code Visual Studio của bạn (Anh em tính gạch đã mình là bạn xài postman chứ gì. Kệ bạn mình thích cái này). Với nó, bạn sẽ có thể chỉnh sửa các tệp **.http** có chứa các cuộc gọi **HTTP**. Trình chỉnh sửa sẽ cung cấp các đoạn code và mẫu nhanh chóng, đồng thời cung cấp cho bạn các siêu liên kết kỳ diệu trong đó khi được nhấp vào, nó sẽ kích hoạt lệnh gọi **HTTP** và mở kết quả ngay bên cạnh nó. 

![image.png](https://images.viblo.asia/00ad73a5-7c43-4cf2-a9db-706b8850916f.png)

[IntelliCode, của Microsoft](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
------------------------------------------------------------------------------------------------------------------------

Một tiện ích mở rộng bổ sung tuyệt vời để nhắc code cho bạn. Tiện ích mở rộng này sử dụng công nghệ máy học (machine learning) dựa trên các dự án code nguồn mở được lưu trữ trên GitHub để tìm ra các hàm và lệnh gọi được sử dụng phổ biến nhất dựa trên code hiện có của bạn để cung cấp cho bạn đề xuất tự động hoàn thành code tốt hơn. (Dạo này có thêm ông **Tabnite** và ông **Copilot** cũng bá đạo không kém bạn nào thích có thể thử.)

![image.png](https://images.viblo.asia/89707cea-db61-4f74-b8d1-209bb1022646.png)

Ok vậy là bạn đã cài đặt sơ bộ Visual Studio Code đủ hoàn chỉnh cho bất kỳ loại Project Java nào.

Cuối cùng
=========

Đây là một [extension](https://marketplace.visualstudio.com/items?itemName=naco-siren.gradle-language) giúp bạn viết các tệp build.gradle.

Như mọi khi, mình hy vọng bạn thích bài viết này và học được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog7-su-dung-visual-studio-code-e-code.html