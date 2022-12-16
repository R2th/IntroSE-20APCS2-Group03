### Tổng quan về các kỹ thuật TDD, BDD và ATDD

**TDD, BDD & ATDD** là các thuật ngữ đã cách mạng hóa thế giới của tester trong Agile cũng như giúp cho họ có được động lực trong quá trình làm việc. Việc thay đổi mindset của tester cũng đòi hỏi việc học các kỹ năng mới và quan trọng hơn là việc thay đổi thái độ và cách làm việc.

Không giống như là làm việc trong cô lập, mà các tester cần cộng tác và làm việc cùng với các lập trình viên nữa, điều đó có nghĩa là:

* Chia sẻ về các test cases
* Tham gia vào việc viết các tiêu chí chấp nhận của các story trong dự án
* Cung cấp phản hồi 1 cách liên tục cho các bên liên quan
* Phối hợp để giải quyết các lỗi đúng thời hạn
* Cung cấp các đề xuất và đầu vào để góp phần cải thiện chất lượng của các sản phẩm
* Tự động hóa

![](https://images.viblo.asia/5b670660-1033-4fde-ba05-3a9f2787695e.jpg)

Trước khi thảo luận về sự liên quan của một tester trong các hoạt động này, hãy cùng nhau đi tìm hiểu các khái niệm đằng sau các thuật ngữ này nhé:

### Phát triển phần mềm hướng kiểm thử (Test Driven Development)
Hãy xem xét cách tiếp cận truyền thống của việc phát triển phần mềm trong đó code được viết trước và kiểm thử sau. Phát triển phần mềm hướng kiểm thử hay TDD là một phương pháp tiếp cận được coi 1 sự CÁCH MẠNG chính xác của phát triển truyền thống. Trong phương pháp tiếp cận này, kiểm thử được thực trước, và code được viết sau.

Nghe tới đây bạn có cảm thấy bối rối không nhỉ?!!

Uh huh, quả là ngược đời làm sao? 

Làm thế nào chúng ta có thể kiểm thử một phần mềm chưa được phát triển đây?

Vâng!! Đó là chính là sự phát triển hướng kiểm thử hay TDD.

TDD làm việc theo từng bước nhỏ trong đó:
1. Kiểm thử được viết trước
1. Kiểm thử nghiệm được thực thi - nó sẽ fail (vì lý do rõ ràng)
1. Code được viết (hoặc tái cấu trúc) chỉ để làm cho test case pass
1. Kiểm thử được thực thi lại 

Để tôi thử giải thích nó qua sơ đồ dưới đây:
![](https://images.viblo.asia/e58b4d84-6ce1-4bd0-919c-e63368d5b672.jpg)

Nếu kiểm thử pass, hãy chuyển sang thử nghiệm tiếp KHÔNG pass thì viết lại / chỉnh sửa code để làm cho kiểm thử pass.
 
Bây giờ, chúng ta phải hiểu 1 sự thật là TDD không nói về việc kiểm thử mà các tester làm. Thay vào đó phương pháp tiếp cận này nói về việc kiểm thử mà các lập trình viên làm. =))

Vâng!! Bạn đoán đúng rồi đó!! Nó là **Unit testing.** 

Kiểm thử được viết đầu tiên không phải là do các tester viết mà là unit test được viết bởi các lập trình viên. Vì vậy, tôi sẽ viết lại các bước như sau: 
1. Kiểm thử UNIT được viết đầu tiên
1. Kiểm thử UNIT được thực thi – nó sẽ fail (vì lý do rõ ràng)
1. Code sẽ được viết (hoặc tái cấu trúc) chỉ để làm cho test case pass
1. Kiểm thử UNIT được thực thi lại
1. Nếu kiểm thử pass, hãy chuyển sang thử nghiệm tiếp KHÔNG pass thì viết lại / chỉnh sửa code để làm cho kiểm thử pass

Bây giờ, câu hỏi được nêu ra ở đây là - Liệu TDD là công việc của 1 lập trình viên, vai trò của tester là gì trong phương pháp tiếp cận này đây???

Tốt thôi, nói là TDD là việc của lập trình viên, nhưng nó không có nghĩa là tester không liên quan gì nhé. Tester có thể cộng tác bằng việc chia sẻ các kịch bản kiểm thử bao gồm:
* Các case giá trị biên
* Các test case lớp tương đương
* Các case nghiệp vụ quan trọng Critical business cases
* Các case chức năng dễ bị lỗi
* Các case cấp độ bảo mật

Điều tôi muốn nói là - các tester nên tham gia vào việc xác định các kịch bản unit test và cộng tác với các lập trình viên để thực hiện tương tự như họ làm. Các tester cũng nên cung cấp phản hồi của họ về các kết quả kiểm thử.

Nếu chúng ta muốn triển khai TDD như vậy thì buộc các tester cần nâng cấp kỹ năng của họ. Họ cần phải có nhiều kỹ thuật hơn và tập trung vào việc cải thiện các kỹ năng phân tích và logic của họ.

Tester cũng nên nỗ lực để hiểu được các thuật ngữ kỹ thuật mà các lập trình viên sử dụng, và nếu có thể, phải có một cái nhìn toàn cảnh về code. Theo cách tương tự, các lập trình viên cũng phải đóng vai trò kiểm thử như một tester và cố gắng đưa ra các kịch bản phức tạp hơn mà nó sẽ giúp cho việc kiểm tra đơn vị mạnh mẽ và chắc chắn hơn.

Cả lập trình viên và người kiểm thử đều phải đặt mình vào trò của đối phương, không giống như cách tiếp cận truyền thống cũ, các lập trình viên không đặt nặng vấn đề UNIT test vì họ dựa vào việc tester để tìm lỗi (Đó là lý do mà cứ mỗi khi miss bug là Dev lại quy ra đó là lỗi của Tester không tìm ra mà thôi ^^ ), và tester thì không đam mê việc học các công cụ kỹ thuật bởi vì họ nghĩ rằng công việc của họ kết thúc sau khi tìm thấy các lỗi. 

### Phát triển hướng hành vi
Phát triển hướng hành vi hay BDD là một phần mở rộng cho Phát triển hướng thử nghiệm TDD.

BDD, như cái tên cho ta thấy, nó minh họa các phương pháp phát triển một tính năng dựa trên hành vi của nó. Hành vi được giải thích một cách cơ bản dưới dạng các ví dụ bằng một ngôn ngữ rất đơn giản mà nó có thể hiểu được bởi mọi người trong nhóm chịu trách nhiệm phát triển.

**Một số tính năng chính của BDD:**

1. Ngôn ngữ được sử dụng để định nghĩa hành thì vi rất đơn giản và theo một định dạng duy nhất mà mọi người đều có thể hiểu được - cả những người có kỹ thuật và không có kỹ thuật có liên quan đến việc thực thi
1. Cung cấp một nền tảng mà cho phép lập trình viên, tester và PO / BA cộng tác và hiểu yêu cầu. Xác định một mẫu chung để ghi lại nó
1. Kỹ thuật / phương thức tiếp cận này thảo luận về hành vi cuối cùng của hệ thống hay cách hệ thống hoạt động như thế nào và nó KHÔNG nói về cách hệ thống nên được thiết kế hoặc thực thi
1. Nhấn mạnh vào cả hai khía cạnh của chất lượng:
      * Đáp ứng yêu cầu
      * Phù hợp để sử dụng
      
### Tại sao là BDD?
Chà, chúng ta đều biết rằng việc sửa lỗi ở giai đoạn sau của bất kỳ chu kỳ phát triển nào cũng là khá tốn kém. Việc sửa các lỗi production không chỉ ảnh hưởng đến code mà còn cả thiết kế và các yêu cầu của nó nữa. Khi chúng ta thực hiện việc RCA (Phân tích nguyên nhân gốc) của bất kỳ lỗi nào, hầu hết thời gian, chúng ta kết luận rằng khiếm khuyết thực sự sinh ra bởi việc hiểu sai yêu cầu.

Điều này về cơ bản xảy ra bởi mỗi người có những năng khiếu khác nhau để hiểu các yêu cầu. Do đó, những người có kỹ thuật và không có kỹ thuật có thể diễn giải cùng một yêu cầu theo cách khác nhau, điều này có thể dẫn đến một sản phẩm bị lỗi. Do đó, điều quan trọng là mọi người trong nhóm phát triển phải hiểu yêu cầu theo một cách GIỐNG NHAU và diễn giải nó theo cách GIỐNG NHAU nữa.

Chúng ta cần đảm bảo chắc chắn rằng toàn bộ nỗ lực phát triển được định hướng và tập trung vào việc đáp ứng đúng các yêu cầu. Để tránh bất kỳ loại lỗi kiểu “miss yêu cầu”, thì toàn bộ nhóm phát triển phải căn chỉnh sao cho có thể hiểu yêu cầu đó là phù hợp để sử dụng.

Hướng tiếp cận BDD cho phép nhóm phát triển thực hiện điều đó bằng cách:
* Xác định một cách tiếp cận tiêu chuẩn để xác định yêu cầu bằng tiếng Anh đơn giản
* Cung cấp các ví dụ xác định để mà giải thích các yêu cầu
* Cung cấp giao diện / nền tảng cái mà cho phép những người có kỹ thuật (lập trình viên / tester) và những người không biết kỹ thuật (PO / BA / Khách hàng) cộng tác cùng nhau và ở trên cùng một trang có thể hiểu hiểu và thực thi được các yêu cầu

### Làm thế nào để thực thi BDD? 
Có rất nhiều tool sẵn có trên thị trường cho việc triển khai BDD. Dưới đây là số tool:
* Cucumber
* Fitnesse
* Concordion
* JBehave
* Spec Flow

**Ví dụ:**
Hãy thử cùng nhau hiểu về BDD thông qua 1 ví dụ nhé. Đối với trường hợp của tôi thì tôi sử dụng Gherkin (Cucumber):

Hãy xem xét 1 case đơn giản đó là chúng ta chỉ cho phép những user được xác thực có thể đăng nhập vào site XYZ.

File Gherkin (file tính năng) sẽ như sau:

**Tính năng**: Kiểm thử cổng đăng ký

**Phác thảo kịch bản:** User hợp lệ đã đăng nhập

**Đưa ra:** Khách hàng mở cổng đăng ký

**Khi:** User đăng nhập với username là “user” & password là “password”
    
**Sau đó:** khách hàng có thể xem được form
    
**Ví dụ:**
|user   |password|
    
|user1 |pwd1|
    
|user2 |pwd2|
    
Chúng ta có thể thấy một yêu cầu được viết bằng tiếng Anh đơn giản như thế nào. Lập trình viên, tester và PO / BA có thể làm việc cùng nhau để thiết kế ra các file tính năng và  dữ liệu kiểm thử cụ thể có thể được viết trong phần ví dụ. BDD cung cấp 1 phương tiện đem lại cho các lập trình viên, tester và doanh nghiệp vào một bảng và thiết lập sự hiểu biết chung về các tính năng sẽ được triển khai.
    
Phương pháp tiếp cận BDD giúp tiết kiệm công sức và chi phí và sẽ kiểm tra xem liệu có còn bất kỳ lỗi nào ở trên môi trường production vì sự cộng tác của khách hàng và nhà phát triển trong suốt chu kỳ phát triển của tính năng hay không. 
    
Các nhóm phát triển có thể sử dụng các tệp tính năng này và chuyển đổi chúng thành các chương trình thực thi để kiểm thử một tính năng cụ thể nào đó. 
    
Như thế nào vậy?

Uh huh, bạn cần phải học Cucumber / Fitnesse để làm được nó!!!

### Phát triển hướng kiểm thử chấp nhận

Phát triển hướng kiểm thử chấp nhận hay ATDD là một kỹ thuật trong đó toàn bộ nhóm hợp tác để xác định các tiêu chí chấp nhận của một story trước khi việc thực thi thực sự bắt đầu. Các kiểm thử chấp nhận này được hỗ trợ bởi các ví dụ thích hợp và thông tin cần thiết khác.

Hầu hết thời gian thì BDD và ATDD được sử dụng thay thế cho nhau. Phương pháp tiếp cận ATDD cũng có thể được thực thi bằng cách sử dụng định dạng Given-When-Then , giống như cách chúng ta viết các tính năng trong phương pháp tiếp cận BDD.

Hãy cùng tóm tắt sự khác nhau giữa 3 phương pháp tiếp cận này nhé:

1. TDD mang tính kỹ thuật cao hơn và được viết bằng cùng một ngôn ngữ trong ở nơi mà các tính năng được thực thi. Nếu như tính năng được thực thi bằng Java, chúng ta viết JUnit test case. Trong khi đó BDD & ATDD được viết bằng ngôn ngữ tiếng Anh đơn giản
1. TDD tập trung vào thực thi trên 1 tính năng. Trong khi đó BDD vào hành vi của tính năng và ATDD thì lại tập trung vào việc nắm bắt yêu cầu. 
2. Để thực thi TDD chúng ta cần phải hiểu biết về công nghệ. Trong khi BDD & ATDD lại không yêu cầu bất kỳ công nghệ nào. Cái hay của BDD / ATDD là ở chỗ cả người có kỹ thuật cũng như người không có kỹ thuật đều có thể tham gia vào việc phát triển các tính năng
3. Kể từ khi TDD được phát triển, nó sẽ cung cấp phạm vi để có thể thiết kế một cách tốt đẹp và tập trung vào khía cạnh “Đáp ứng Yêu cầu” của chất lượng. Trong khi đó BDD / ATDD  lại tập trung vào khía cạnh thứ 2 về chất lượng, đó là “Phù hợp để sử dụng”

Tựu chung lại, tất cả các kỹ thuật này cơ bản nói về phương pháp tiếp cận **“test-First”**, không giống như phương pháp tiếp cận **“test-last”** được sử dụng trong các phương pháp phát triển truyền thông.

Khi mà các kiểm thử được viết trước, các tester đóng một vai trò rất quan trọng. Các tester không chỉ cần có một kiến thức nghiệp vụ và lĩnh vực rộng lớn, mà họ còn cần sở hữu các kỹ năng kỹ thuật tốt để có thể tăng thêm giá trị vào quá trình động não trong những cuộc thảo luận giữa lập trình viên, tester và PO / BA.

Đối với các khái niệm như CI (Tích hợp liên tục) và CD (Phân phối liên tục), các tester cần cộng tác tốt với các lập trình viên và đóng góp tương đương vào các lĩnh vực vận hành và phát triển.

Hãy để tôi tóm tắt việc thảo luận này với Kim tự tháp kiểm thử nổi tiếng trong mô hình Agile:
![](https://images.viblo.asia/56e22e6e-b39e-4766-bd27-e710a84432da.jpg)

**Tầng thấp nhất** của kim tự tháp được tạo thành từ tầng kiểm thử unit. Tầng này là tầng nền tảng; do đó nó là là đá rắn. Hầu hết việc kiểm thử cần được đẩy vào tầng này. Tầng thấp nhất này chỉ tập trung vào TDD.

Trong thế giới Agile, người ta nhấn mạnh vào việc làm cho tầng này trở nên mạnh và chắc chắn hơn và nó được nhấn mạnh rằng hầu hết các kiểm thử sẽ đạt được ở tằng này.

*Các công cụ sử dụng trong tầng này toàn bộ là các công cụ Xunit.*

**Tầng giữa** của kim tự tháp là tầng service, giải thích các kiểm thử mức độ service. Tầng này hoạt động như 1 cầu nối giữa giao diện người dùng ứng dụng với các thành phần/đơn vị mức độ thấp hơn.  Tầng này chủ yếu gồm các API mà chấp nhận các yêu cầu từ UI và gửi lại phản hồi. Phương pháp tiếp cận BDD và TTDD sẽ hoạt động trong tầng này của kim tự tháp.

*Các công cụ sử dụng trong tầng giữa của kim tự tháp là Fitnesse, Cucumber, và Robot Framework.*

**Tầng trên cùng** của kim tự tháp là UI người dùng thực tế, nó cho ta thấy rằng tầng này nên chứa ít kiểm thử nhất, hoặc tôi nên nói là nỗ lực kiểm thử ở tầng này nên là tối thiểu. Hầu hết việc kiểm thử các tính năng nên được hoàn thành khi chúng ta đạt tới tầng cao nhất của kim tự tháp.

*Công cụ được sử dụng trong tầng trên cùng là Selenium, QTP, và RFT.*

Kể từ khi mà chúng ta làm việc theo từng bước nhỏ trong Scrum (được gọi là Sprint), thì việc thực thi thủ công của tất cả các phương pháp tiếp cận này là không khả thi. Các phương pháp tiếp cận này đòi hỏi sự can thiệp tự động. Trong trường hợp này thì sự Tự động hóa là rất quan trọng.

Trong thực tế, các cách tiếp cận này thực sự được thực hiện thông qua sự tự động hóa. Vào cuối mỗi sprint, các tính năng mới được thêm vào, vì vậy điều quan trọng là tính năng được thực thi trước đó hoạt động như mong đợi; do đó, sự Tự động hóa trở thành HERO ở đây.

### Kết luận
Đến cuối bài này, hẳn bạn đã hiểu được về việc Các Tester liên quan như thế nào trong các kỹ thuật TDD, BDD & ATDD rồi chứ. 

Nếu bạn là đã, đang và sẽ tiếp tục theo con đường của một Tester thì còn chần chừ gì nữa, hãy học hỏi và bổ sung những kiến thức và kỹ năng cần thiết để có thể làm tốt vai trò của mình các kỹ thuật này nhé!

Chúc may mắn! ^^

**Bài viết được dịch từ link:** https://www.softwaretestinghelp.com/testers-in-tdd-bdd-atdd-techniques/