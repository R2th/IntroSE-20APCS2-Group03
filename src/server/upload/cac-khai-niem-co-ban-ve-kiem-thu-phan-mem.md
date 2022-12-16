Chào các bạn, hôm nay mình muốn chia sẻ với các bạn - những người vừa mới bước chân vào nghề kiểm thử như mình hoặc ai đó muốn tìm hiểu qua đôi chút về lĩnh vực này một số khái niệm cơ bản về kiểm thử phần mềm. Bắt đầu thôi nào ;).

## 1. Kiểm thử phần mềm ( Software Testing) 
Kiểm thử phần mềm là quá trình thực thi 1 chương trình với mục đích tìm ra lỗi.

Kiểm thử phần mềm đảm bảo sản phẩm phần mềm đáp ứng chính xác, đầy đủ và đúng theo yêu cầu của khách hàng, yêu cầu của sản phẩm đề đã đặt ra.

Kiểm thử phần mềm cũng cung cấp mục tiêu, cái nhìn độc lập về phần mềm, điều này cho phép việc đánh giá và hiểu rõ các rủi ro khi thực thi phần mềm. 

 Kiểm thử phần mềm tạo điều kiện cho bạn tận dụng tối đa tư duy đánh giá và sáng tạo để bạn có thể phát hiện ra những điểm mà người khác chưa nhìn thấy.
## 2. Kiểm thử hộp đen( Black box testing)
Kiểm thử hộp đen là 1 phương pháp kiểm thử mà tester sẽ chỉ xem xét đến đầu vào và đầu ra của chương trình mà không quan tâm code bên trong được viết ra sao. Tester thực hiện kiểm thử dựa hoàn toàn vào đặc tả yêu cầu . Mục đích của kiểm thử hộp đen là tìm ra các lỗi ở giao diện , chức năng của phần mềm. Các trường hợp kiểm thử sẽ được xây dựng xung quanh đó.
## 3. Kiểm thử hộp trắng( White box testing)
Kiểm thử hộp trắng là phương pháp kiểm thử mà cấu trúc thuật toán của chương trình được đưa vào xem xét. Các trường hợp kiểm thử được thiết kế dựa vào cấu trúc mã hoặc cách làm việc của chương trình. Người kiểm thử truy cập vào mã nguồn của chương trình để kiểm tra nó.
## 4.  Kiểm thử đơn vị( Unit test)
Kiểm thử đơn vị là hoạt động kiểm thử nhỏ nhất. Kiểm thử thực hiện trên các hàm hay thành phần riêng lẻ.

Đây là 1 công việc mà để thực hiện được nó thì người kiểm thử sẽ phải hiểu biết về code, về chương trình, các hàm, ...Nếu bạn đang lo lắng vì bạn không có nhiều kiến thức về code thì không sao cả, vì bạn sẽ không phải thực hiện bước kiểm thử này, lập trình viên sẽ làm nó trước khi giao cho bạn :D.

Mục đích của việc thực hiện kiểm thử đơn vị là cô lập từng thành phần của chương trình và chứng minh các bộ phận riêng lẻ chính xác về các yêu cầu chức năng.
## 5. Kiểm thử tích hợp( Intergration test)
Như chúng ta đã biết, một phần mềm được tạo ra sẽ bao gồm rất nhiều module trong đó, để chắc chắn rằng phần mềm hoạt động tốt thì chúng ta cần phải gom các module lại với nhau để kiểm tra sự giao tiếp giữa các module cũng như bản thân từng thành phần từng module..
Kiểm thử tích hợp bao gồm 2 mục tiêu chính là :
* Phát hiện lỗi giao tiếp xảy ra giữa các Unit

* Tích hợp các Unit đơn lẻ thành các hệ thống nhỏ và cuối cùng là 1 hệ thống hoàn chỉnh để chuẩn bị cho bước kiểm thử hệ thống.
## 6. Kiểm thử hệ thống( System test)
Kiểm thử 1 hệ thống đã được tích hợp hoàn chỉnh để xác minh rằng nó đáp ứng được yêu cầu
Kiểm thử hệ thống thuộc loại kiểm thử hộp đen . Kiểm thử hệ thống tập trung nhiều hơn vào các chức năng của hệ thống . Kiểm tra cả chức năng và giao diện , các hành vi của hệ thống 1 cách hoàn chỉnh, đáp ứng với yêu cầu.
## 7. Kiểm thử chấp nhận( Acceptance test)
Trong kiểu kiểm thử  này, phần mềm sẽ được thực hiện kiểm tra từ người dùng để tìm ra nếu phần mềm phù hợp với sự mong đợi của người dùng và thực hiện đúng như mong đợi. Trong giai đoạn test này, tester có thể cũng thực hiện hoặc khách hàng có các tester của riêng họ để thực hiện.

Có 2 loại kiểm thử chấp nhận đó là kiểm thử Alpha và kiểm thử Beta:

* Kiểm thử Alpha:  là loại kiểm thử nội bộ . Tức là phần mềm sẽ được 1 đội kiểm thử độc lập hoặc do khách hàng thực hiện tại nơi sản xuất phần mềm.

* Kiểm thử Beta: là loại kiểm thử mà khách hàng thực hiện kiểm thử ở chính môi trường của họ. Loại kiểm thử này được thực hiện sau kiểm thử Alpha.
## 8. Kiểm thử chức năng ( Functional testing)
 Kiểm thử chức năng là một loại kiểm thử hộp đen (black box) và các trường hợp kiểm thử của nó được dựa trên đặc tả của ứng dụng phần mềm/thành phần đang test. Các chức năng được test bằng cách nhập vào các giá trị nhập và kiểm tra kết quả đầu ra, và ít quan tâm đến cấu trúc bên trong của ứng dụng (không giống như kiểm thử hộp trắng - white-box testing).
 
Có thể hiểu 1 cách đơn giản, kiểm thử chức năng là xác nhận tất cả các chức năng của hệ thống. Nó đánh giá ứng dụng và xác nhận liệu ứng dụng có đang hoạt động theo yêu cầu hay không.
## 9. Kiểm thử phi chức năng( Non Functional testing)
 Loại kiểm thử này tập trung vào các khía cạnh phi chức năng của ứng dụng. Vậy những khía cạnh phi chức năng là những gì? Hay tôi nên nói những tính năng mà không liên quan đến các chức năng của ứng dụng là gì? Tôi nghĩ nó sẽ bao gồm:
* Kiểm thử chịu tải
* Kiểm thử bảo mật
* Kiểm tra tính tương thích trên từng môi trường,...
## 10. Test cấu hình (Shakeout testing)
Kiểu kiểm thử  này cơ bản là kiểu kiểm thử về khả năng của hệ thống mạng, kết nối dữ liệu và sự tương tác của các module. Thông thường thì kiểu test này là do nhóm quản lý cấu hình chuẩn bị thiết lập các môi trường test thực sự. Họ cũng kiểm tra xem liệu các thành phần chính của phần mềm có hoạt động bất thường không. Kiểu kiểm thử này thực hiện trước khi tiến hành thực hiện trong môi trường test. Sau khi test shakeout, bước kế tiếp là test smoke (kiểu test được thực hiện bởi tester sau khi biên dịch, được tiến hành trong môi trường test).
## 11. Smoke testing
 Smoke Testing là 1 quá trình để kiểm tra liệu bản build có ổn định hay không? Để xem bản build có đủ ổn định để thực hiện test chi tiết hay không (trong trường hợp bản build ko ổn định, lỗi luôn chức năng chính hoặc build bị lỗi thì trả lại Dev, yêu cầu sửa luôn).
 Hay kiểm tra các tính năng quan trọng có đang hoạt động hay không .
 Nó là 1 bài test hồi quy nhỏ đơn giản và nhanh của các chức năng chính, cho thấy sản phẩm đã sẵn sàng cho việc test hay chưa.  

## 12. Ad hoc testing
Thuật ngữ Adhoc testing là phương pháp kiểm thử dạng Black box test mà không theo cách thông thường. Với quy trình test thông thường là phải có tài liệu yêu cầu, kế hoạch test ( test plan), kịch bản kiểm thử. Kiểu test này không theo bất cứ loại kỹ thuật test nào để tạo testcase.
## 13. Monkey testing
Monkey testing được định nghĩa rất ngắn gọn: là một phương pháp kiểm thử với đầu vào ngẫu nhiên, không theo testcase hay một chiến lược test nào.

Chắc hẳn bạn rất tò mò về cái tên Monkey testing này phải không? Tôi sẽ giải thích nó ngay đây ;)

Trong Monkey testing thì các tester ( đôi khi cả developer nữa ) được coi như là 1 con khỉ vậy :D  Bạn thử nghĩ mà xem, nếu 1 con khỉ mà sử dụng máy tính thì nó sẽ làm những gì nhỉ? Tuy loài khỉ rất thông minh nhưng khi cho nó sử dụng máy tính, nó sẽ thực hiện những hành động bất kỳ trên hệ thống , điều mà chính nó cũng không thể hiểu được.
Nó cũng giống như khi tester thực hiện monkey testing, họ sẽ áp dụng các kịch bản kiểm thử ngẫu nhiên trên hệ thống để tìm ra lỗi mà không cần xác định trước.
Trong 1 số trường hợp, Monkey testing chỉ dành cho Unit Testing hoặc GUI Testing( Kiểm thử giao diện người dùng)
## 14. Kiểm thử hiệu suất  (Performance testing)
Trong loại test này, ứng dụng được test dựa vào sức nặng như sự phức tạp của giá trị, độ dài của đầu vào, độ dài của các câu truy vấn…Loại test này kiểm tra bớt phần tải (stress/load) của ứng dụng có thể được chắc chắn hơn.

## 15. Kiểm thử hồi quy (Regression testing)
 Test hồi quy là test lại 1 chức năng đã được code và test xong rồi, đã hết lỗi nhưng do có sự sửa đổi 1 chức năng khác mà lại có ảnh hưởng đến chức năng đã test xong đó, thì việc phải test 1 chức năng này được gọi là kiểm thử hồi quy .
 
 Ví dụ tôi có 3 chức năng A B C đã hoàn thành, 3 chức năng này đều có liên quan đến nhau và chức năng A cần phải sửa đổi thêm về nghiệp vụ. Việc sửa chức năng A này sẽ làm ảnh hưởng đến chức năng B, C . Lúc này, ngoài việc retest chức năng A, chúng ta cần test lại cả chức năng B và C nữa, việc phải test lại chức năng B và C này được gọi là test hồi quy . 
  
Hoặc ngay cả khi re- test để đóng bug, mà thấy chức năng Developer sửa có thể làm ảnh hưởng đến 1 chức năng khác đã xong rồi thì tester cũng nên test hồi quy lại chức năng đó để tránh có lỗi tiềm ẩn mà ko biết. 

Tùy vào từng giai đoạn test cũng như mức độ ảnh hưởng của việc sửa code thì chúng ta sẽ xác định được phạm vi của test hồi quy là test lại 1 phần chức năng hay cần test lại cả hệ thống.
## 16. Re-test
Re-test là thực hiện test để đóng bug/ defect / lỗi sau khi lập trình viên đã được sửa hoặc sửa 1 chức năng nào đó rồi test lại chức năng sửa đó thì gọi là test lại hoặc 1 chức năng cần re -test vài lần cho hết bug 
## 17. Bug
Là một khiếm khuyết trong một thành phần hoặc hệ thống mà nó có thể làm cho thành phần hoặc hệ thống này không thực hiện đúng chức năng yêu cầu của nó, ví dụ như thông báo sai hoặc định nghĩa dữ liệu không đúng. Một bug, nếu gặp phải trong quá trình hệ thống hoạt động, có thể gây ra failure trong thành phần hoặc hệ thống đó.
## 18. Testcase 
 Test case là mô tả một dữ liệu đầu vào, hành động và một kết quả mong đợi (expected result) để xác định một chức năng của ứng dụng phần mềm hoạt động đúng hay không.
 
  Test case thường được viết trên excel. Một file Testcase cơ bản cần có các trường sau: TestcaseID, mục tiêu test,  các bước thực hiện test, và kết quả trả về (expected result) có đúng với yêu cầu test không.Ngoài ra còn có thể có thêm điều kiện tiên quyết và dữ liệu test.
  
  Để viết được testcases có hiệu quả bao phủ hết các trường hợp cần test thì testcases phải có đầy đủ hết các Nghiệp vụ mà hệ thống yêu cầu (các yêu cầu trong tài liệu Đặc tả ko được bỏ sót, sử dụng các kỹ thuật thiết kế test case (các kỹ thuật test hộp đen) để viết được test case có độ bao phủ tối đa.
## 19. Testplan
 Test plan chính là tài liệu tổng quan về việc kiểm thử 1 project: phạm vi kiểm thử, hướng tiếp cận, quy trình kiểm thử, tài nguyên và nhân lực test cần có, các chức năng/ module cần được test, các công cụ và môi trường test cần có. 
 
 Bao gồm cả kế hoạch ai test chức năng nào, khi nào bắt đầu thực hiện viết và hoàn thành testcases, khi nào bắt đầu thực hiện test và kế hoạch hoàn thành test 
 
 Dựa vào kế hoạch chung của dự án để lên kế hoạch cho bên kiểm thử. Trong trường hợp khi làm thực tế thấy có khả năng không đúng như kế hoạch đã lên thì phải báo cáo lại test leader hoặc Quản trị dự án sớm.

Như vậy, trên đây là những khái niệm mà mình đã tìm hiểu khi mình bắt đầu biết đến từ khóa **kiểm thử phần mềm**. Mình viết bài viết này khi mà mình cũng đang tìm hiểu về kiểm thử  nên không thể tránh được những sai sót, nếu có phần nào chưa được đúng lắm thì mong mọi người góp ý để kiến thức của chúng ta ngày càng tiến bộ hơn nhé ! Cảm ơn các bạn <3