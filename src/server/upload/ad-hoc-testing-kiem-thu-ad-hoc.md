### Ad-hoc testing là gì?

![](https://images.viblo.asia/9842fea3-f523-4b21-85ec-231902abcf23.jpg)

Kiểm thử Ad hoc là kiểm thử phần mềm dựa theo kinh nghiệm hoặc "tùy hứng" - không theo một kế hoạch hoặc tài liệu hướng dẫn nào với mục đích là tìm các “điểm chết” của hệ thống. Là phương pháp kiểm thử dạng Black box mà không theo cách thông thường, là một phiên bản của đoán lỗi / kiểm thử thăm dò.

Các thử nghiệm chỉ được chạy một lần, trừ khi có lỗi xảy ra. Kiểm thử ad hoc là phương pháp kiểm thử không chính thống; bị chỉ trích vì không có cấu trúc, khó tái hiện lỗi (vì không có test case) và khó kiểm soát. Tuy nhiên, kiểm thử ad hoc cũng có ưu điểm là những bug quan trọng có thể sẽ được tìm thấy một cách nhanh chóng:
Tester có thể ngẫu hứng, tha hồ test theo ý của mình, phán đoán các case hóc búa nhất, hay xảy ra lỗi nhất, tìm kiếm lỗi bằng bất cứ cách nào thích hợp. Tuy nhiên phương pháp này không thể chắc chắn bao phủ hết các trường hợp và cũng không thể ghi nhớ hết các case mình đã test, do đó có thể khó để tái hiện lỗi. Tuy nhiên - ưu điểm của phương pháp kiểm thử này là nhanh chóng - không bị ràng buộc.

Ad-hoc testing yêu cầu người kiểm thử phải có kiến thức tốt về hệ thống, về ứng dụng đang test và có thể đoán được hầu hết các nguồn của lỗi, vì bản thân cách kiểm thử này gần giống như là việc đoán lỗi.

Adhoc testing có thể được thực hiện khi có một thời gian giới hạn nào đó cho các kiểm thử phức tạp. Thông thường Adhoc testing được thực hiện sau khi đã hoàn thành việc thực thi kiểm thử theo đúng quy trình. Nếu như có thời gian, thì có thể hoàn thành thực hiện Adhoc testing cho hệ thống.

Được dùng nhiều nhất trong kiểm thử ứng dụng hoặc trò chơi. Bất cứ ứng dụng hay trò chơi nào cũng cần đến việc kiểm thử ngẫu nhiên nhằm đoán được đến mức tối đa hành vi của user mà test cases dù có viết kỹ thế nào cũng không thể lường được hết.

![](https://images.viblo.asia/6d6bc879-18cd-4f47-8a80-6b4a0bd108f5.jpg)

### Hãy bắt đầu với ví dụ sau

Dưới đây là một ví dụ về cách chúng ta có thể thực hiện kiểm thử này (Ad hoc) cho UI Wizard - thuật sĩ giao diện người dùng hướng dẫn chúng ta làm một công việc gì đó được chính xác và chuẩn nhất. Nó sẽ hướng dẫn bạn thiết lập từng bước - giúp bạn đơn giản hơn trong việc thực hiện công việc. Có nhiều thuật sĩ : thuật sĩ tìm kiếm, thuật sĩ cài đặt, thuật sĩ thiết lập mạng , ... là chức năng đóng vai trò như 1 người chỉ dẫn bạn "cài cái gì đấy" hay "đang làm cái gì đấy" cần sự hướng dẫn.

Giả sử bạn cần tạo một kế hoạch hoặc một mẫu cho một số nhiệm vụ được thực hiện bằng cách sử dụng thuật sĩ giao diện người dùng (UI Wizard) này. Trình hướng dẫn là một loạt các ô có đầu vào của người dùng như tên, mô tả, v.v. Khi thuật sĩ tiến hành: nói một trong các ô, dữ liệu người dùng sẽ được nhập bao gồm trình hướng dẫn giao diện người dùng để mở hộp thoại pop up thêm ngữ cảnh, dữ liệu liên quan để hoàn tất trình hướng dẫn và triển khai/ kích hoạt trình hướng dẫn.

**Các hướng kiểm thử:**

* Hoàn thành wizard thành công với tất cả dữ liệu hợp lệ và tạo kế hoạch.
* Hủy bỏ wizard giữa chừng.
* Edit kế hoạch đã tạo thông qua wizard.
* Xóa kế hoạch đã tạo và đảm bảo rằng không còn dấu vết của nó.
* Nhập các giá trị không hợp lệ trong wizard và kiểm tra các thông báo lỗi nhìn thấy.

Với ví dụ trên, có thể thực hiện 1 số trường hợp thử nghiệm ad-hoc test sau để phát hiện ra nhiều lỗi nhất có thể :
* Trong khi thêm dữ liệu không hợp lệ, hãy thêm các ký tự đặc biệt mà không bị giới hạn để xem chúng có được xử lý đúng cách hay không. Ví dụ : đôi khi các trình thuật sĩ không hạn chế { hoặc [ nhưng trong một số trường hợp nhất định, điều này có thể xung đột với mã code và gây ra hành vi không đáng tin cậy.
* Một thử nghiệm đặc biệt khác liên quan đến cửa sổ bật lên (pop-up) : làm cho cửa sổ bật lên và sau đó thử nhấn nút backspace trên bàn phím. Vì trong nhiều trường hợp làm như vậy có thể làm cho wizard nền hoàn toàn biến mất và toàn bộ dữ liệu người dùng nhập vào bị mất!

**Đặc điểm của ad-hoc testing :**

Nếu bạn để ý các kịch bản trên, bạn sẽ thấy một số đặc điểm rất khác biệt về loại thử nghiệm này :

* Chúng luôn phù hợp với mục tiêu kiểm tra. Tuy nhiên, một số trường hợp thử nghiệm loại này được thực hiện với mục đích phá vỡ hệ thống.
* Người kiểm thử cần có kiến thức và nhận thức đầy đủ về hệ thống đang được thử nghiệm. Kết quả của thử nghiệm này giúp phát hiện ra các lỗi còn sót lại do sơ hở của việc kiểm thử theo đúng quy trình.
* Ngoài ra, loại kiểm thử này có thể chỉ được thực hiện một lần vì nó không khả thi để kiểm tra lại trừ khi có lỗi liên quan.

### Khi nào thì nên thực hiện kiểm thử ad-hoc?

Thông thường Ad-hoc testing được thực hiện sau khi đã hoàn thành việc thực thi kiểm thử theo đúng quy trình. Nếu như có thời gian, thì có thể hoàn thành thực hiện Ad-hoc testing cho hệ thống. Nhưng cũng có thể thực hiện Ad-hoc testing khi cần thực hiện các kiểm thử phức tạp hoặc quá nhiều tính năng trong một khoảng thời gian giới hạn nào đó. Ad-hoc testing sẽ hiệu quả hơn nếu người thực thi kiểm thử có kiến thức tốt về hệ thống đó, một vòng kiểm thử ad-hoc có thể làm nên điều kỳ diệu với chất lượng sản phẩm và nâng cao nhiều câu hỏi thiết kế.

Vì ad-hoc testing là một kỹ thuật kiểm thử còn hoang dã không cần phải được cấu trúc, nên khuyến cáo chung là nên thực hiện sau khi thực hiện xong việc kiểm thử theo đúng quy trình hiện tại hoặc trong trường hợp khi không thể thực hiện kiểm tra chi tiết được do giới hạn thời gian.

Thử nghiệm ad-hoc có thể được thực hiện gần như bất cứ lúc nào - ngay từ đầu, về phía giữa hoặc cuối cùng. Tuy nhiên, khi kiểm thử ad-hoc phải được thực hiện để đưa ra giá trị tối đa được đánh giá tốt nhất bởi một tester có kinh nghiệm, những người có kiến thức chuyên sâu về hệ thống đang được thử nghiệm.

**Khi nào không nên thực hiện kiểm thử ad-hoc?**

Mặc dù kiểm thử ad-hoc có hiệu quả đến như thế nào đối với người kiểm tra có kỹ năng và có năng lực, thì cũng có thời điểm không nên thực hiện loại test này. Dưới đây là một số khuyến nghị/ví dụ cho các trường hợp khi ad-hoc testing có thể không cần thiết.

* Tránh loại thử nghiệm này khi có một trường hợp thử nghiệm (test case) đang tồn tại lỗi. Trong tình huống như vậy, cần phải ghi lại điểm lỗi của trường hợp thử nghiệm này và sau đó xác minh/kiểm tra lại lỗi khi nó được sửa. Do đó, ad-hoc testing sẽ không được áp dụng ở đây.
* Cũng có thể có một số trường hợp nhất định mà khách hàng (customer hoặc client) được mời thử nghiệm phiên bản beta của phần mềm. Trong những trường hợp như vậy, không nên tiến hành thử nghiệm này.
* Một trường hợp nữa là khi có một màn hình giao diện người dùng rất đơn giản được thêm vào thì thử nghiệm tích cực và tiêu cực truyền thống sẽ đủ để tìm ra các khuyết tật ở mức tối đa.

### Các loại kiểm thử Ad-hoc

Kiểm thử Ad-hoc có thể được phân thành ba loại dưới đây:

**1. Buddy testing:**

Trong hình thức kiểm tra này, sẽ có một thành viên bên đội kiểm thử (QA) và một thành viên bên đội phát triển (dev) sẽ được chọn để làm việc trên cùng một mô-đun. Ngay sau khi dev hoàn thành Unit Test, tester và dev cùng ngồi làm việc để xác định các khuyết tật trong mô-đun đó. Loại thử nghiệm này cho phép xem xét tính năng trong phạm vi rộng hơn cho cả hai bên. Người phát triển (dev) sẽ hiểu được quan điểm test của Tester, nắm bắt tất cả các thử nghiệm khác nhau được chạy để có thể thay đổi thiết kế sớm trong trường hợp cần thiết; đồng thời Tester sẽ hiểu được thiết kế của modul, giúp họ tránh được việc thiết kế các kịch bản không hợp lệ, và phát triển các trường hợp thử nghiệm tốt hơn.

**2. Pair testing:**

Trong thử nghiệm này, hai Tester làm việc cùng nhau trên một mô-đun với cùng một thiết lập thử nghiệm được chia sẻ giữa họ. Ý tưởng đằng sau hình thức thử nghiệm này là để cả hai người cùng suy nghĩ đưa ra ý tưởng và phương pháp để tìm ra lỗi. Cả hai đều có thể chia sẻ công việc kiểm thử và tạo các tài liệu cần thiết cho tất cả các thứ quan sát được.

**3. Monkey testing:**

Kiểm tra ngẫu nhiên sản phẩm hoặc ứng dụng mà không có test cases với mục tiêu phá vỡ hệ thống. Thử nghiệm này chủ yếu được thực hiện ở cấp độ kiểm thử đơn vị. Tester phân tích dữ liệu hoặc kiểm tra theo cách hoàn toàn ngẫu nhiên để đảm bảo rằng hệ thống có thể chịu được mọi sự cố.

### Ưu điểm của kiểm thử Ad-hoc

Giúp cho Tester tự do sáng tạo khi cần thiết. Điều này làm tăng chất lượng thử nghiệm và có các hiệu quả như:

* Ưu điểm lớn nhất nổi bật là Tester có thể tìm thấy nhiều lỗi hơn so với chỉ kiểm thử truyền thống vì có thể áp dụng các phương pháp sáng tạo khác nhau để kiểm tra phần mềm.
* Hình thức kiểm tra này có thể được áp dụng ở bất cứ đâu trong SDLC (vòng đời phát triển phần mềm); và không chỉ giới hạn trong đội kiểm thử. Đội phát triển cũng có thể tiến hành thử nghiệm này, điều này sẽ giúp họ viết mã tốt hơn và cũng dự đoán được vấn đề nào có thể xảy ra.
* Có thể kết hợp với các loại kiểm thử khác để có được kết quả tốt nhất, đôi khi có thể giảm bớt thời gian cần thiết cho việc kiểm tra thường xuyên. Điều này có thể sẽ giúp nâng cao, cải thiện test cases, giúp tạo ra các trường hợp thử nghiệm tốt hơn và giúp chất lượng sản phẩm tốt hơn.
* Không yêu cầu tạo bất kỳ tài liệu nào nên giúp giảm gánh nặng thêm cho Tester. Tester có thể tập trung vào việc thực sự hiểu được kiến trúc cơ bản.
* Trong trường hợp không có nhiều thời gian để kiểm tra, phương pháp này rất có giá trị bao phủ phạm vi kiểm tra và chất lượng.

### Khuyết điểm của kiểm thử Ad-hoc

Vì Ad-hoc không được tổ chức và không có tài liệu bắt buộc, nên người kiểm thử phải nhớ và hồi tưởng tất cả các chi tiết của các kịch bản Ad-hoc trong đầu. Điều này có thể còn khó khăn hơn, đặc biệt là trong các kịch bản có nhiều tương tác giữa các thành phần khác nhau.

* Điều này sẽ có thể dẫn đến việc khó hoặc không thể tái hiện bug trong các lần thử tiếp theo nếu được yêu cầu cung cấp thông tin.
* Một vấn đề quan trọng khác là trách nhiệm giải trình. Vì không được lên kế hoạch / cấu trúc, nên không có cách nào để tính toán thời gian và effort để đầu tư vào loại thử nghiệm này.
* Kiểm thử Ad-hoc chỉ hiệu quả khi được thực hiện bởi một Tester rất am hiểu hệ thống và có tay nghề cao vì nó đòi hỏi sự chủ động và trực giác nhạy bén trong điều kiện tiên đoán các khu vực có khả năng có lỗi.

### Các phương pháp giúp thực hiện Ad-hoc Testing hiệu quả

Nếu không tiếp cận theo cách thích hợp thì Ad-hoc Testing có thể gây tốn kém và lãng phí thời gian thử nghiệm. Dưới đây là một vài gợi ý để thực hiện Ad-hoc Testing hiệu quả:

**1. Xác định các khu vực dễ bị lỗi**

Khi bạn nắm chắc việc thử nghiệm một phần mềm cụ thể, bạn sẽ đồng ý rằng sẽ có một số tính năng dễ bị lỗi hơn các tính năng khác. Nên tập trung vào các tính năng có logic/nghiệp vụ phức tạp, những tính năng chính quan trọng, những tính năng mà trước đó đã xảy ra nhiều lỗi ... Áp dụng Ad-hoc Testing trong những trường hợp này có thể sẽ giúp tìm ra một số lỗi nghiêm trọng rất hiệu quả.
Đặc biệt cần xác định các chức năng quan trọng chính của hệ thống, đây là đối tượng tập trung của Ad-hoc testing. Vì chức năng quan trọng chính là cái mà người dùng sẽ sử dụng và tương tác nhiều nhất, nếu mà để lọt bug trên đó thì sẽ là điều khó mà chấp nhận được.

**2. Nắm chắc nghiệp vụ**

Yếu tố then chốt quyết định phần lớn hiệu quả trong Ad-hoc Testing đó là việc người thực thi kiểm thử hiểu rõ nghiệp vụ của hệ thống đến đâu. Do đó, khi quyết định thực hiện Ad-hoc Testing thì cần phải chắc chắc được rằng bạn đã thông suốt về các ngõ ngách của hệ thống / ứng dụng. Điều này giúp bạn có thể dễ dàng thực hiện được những trường hợp thực tế nhất, trực quan hơn và có thể đoán được các vùng có khả năng xảy ra lỗi nhiều nhất.

**3. Tạo danh mục test**

Khi bạn đã biết danh sách các tính năng cần kiểm tra, hãy dành một vài phút để phân loại các tính năng đó và xác định cách kiểm tra. Ví dụ: bạn nên quyết định thử nghiệm các tính năng dễ thấy nhất và được sử dụng phổ biến nhất đầu tiên, vì điều này có vẻ quan trọng đối với sự thành công của phần mềm. Sau đó, phân loại chức năng / xác định thứ tự ưu tiên của chúng và thực hiện kiểm tra theo phân đoạn đã sắp xếp.

Chú ý quan trọng khác là nếu có sự tích hợp giữa các thành phần hoặc mô-đun. Trong những trường hợp này, có thể có rất nhiều bất thường có thể xảy ra. Sử dụng cách phân loại trên sẽ rất có ích cho việc kiểm tra.

**4. Lập một bản kế hoạch thô**

Điều này có thể gây chút nhầm lẫn hoặc khó hiểu vì như đã nói ở trên thì Ad-hoc Testing là thử nghiệm mà không cần lập kế hoạch hoặc tài liệu. Nhưng ý tưởng ở đây chỉ đơn giản là đôi khi bạn có thể không nhớ hết được tất cả các bài kiểm tra bạn dự định thực hiện. Vì vậy, ghi chúng lại sẽ đảm bảo bạn không bỏ lỡ bất cứ điều gì.

**5. Lưu lại các defect**

Tài liệu không cần phải chi tiết, chỉ là một lưu ý nhỏ để bạn tham khảo tất cả các kịch bản khác nhau được đề cập, độ lệch trong các bước liên quan và ghi lại các lỗi đó cho danh mục tính năng thử nghiệm cụ thể. 
Tất cả các lỗi tìm được từ Ad-hoc testing đều cần phải được lưu lại và gửi cho team dev để fix bug. Các lỗi hợp lệ cần được viết bổ sung và thêm vào trong bộ test case. Cái này thường là do viết test case thiếu, chưa bao phủ được các trường hợp.
Các defect tìm được này chính là những bài học kinh nghiệm, cần phải được xem xét và đánh giá nghiêm túc, rút kinh nghiệm cho các vòng test sau hay những trường hợp, sản phẩm có tính năng tương tự.

Bài viết dịch từ nguồn : https://www.softwaretestinghelp.com/ad-hoc-testing/