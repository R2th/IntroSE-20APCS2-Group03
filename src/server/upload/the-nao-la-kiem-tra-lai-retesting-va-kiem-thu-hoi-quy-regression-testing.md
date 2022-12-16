Vào thời điểm bắt đầu học kiểm thử, mình thường bị nhầm lẫn giữa Kiểm tra lại và Kiểm thử hồi quy. Do đó mình nghĩ nhiều tester mới có thể sẽ gặp vấn đề giống như mình. Trong bài này, mình sẽ giải thích hai thuật ngữ này nhé, như: Khi nào sử dụng, và cách sử dụng chúng. Bạn sẽ có được tất cả các câu trả lời sau khi đọc bài này. Bây giờ chúng ta bắt đầu từ Retesting nha.

![](https://images.viblo.asia/b0c47a9b-cb07-4a82-86a8-3a8d0fb4f536.png)

### 1. Kiểm tra lại (Retesting)

Một số bạn có thể bị lẫn lộn với khái niệm "Retesting". Bạn có thể nghĩ rằng Testing là kiểm tra sản phẩm lần đầu tiên, còn Retesting là kiểm thử phần mềm đó lần thứ hai hoặc nhiều lần sau nữa. Nếu nghĩ như vậy thì bạn đã nhầm rồi nhé.

Để hiểu về Retesting, chúng ta hãy cùng xem xét một kịch bản test:

Bạn làm việc trog một công ty với vai trò là kỹ sư kiểm thử phần mềm và bạn phải test một phần mềm. Vì vậy, bạn viết 1000 test case và thực thi tất cả chúng. Trong số 1000 test case đó có 50 test case fail (fail nghĩa là kết quả đầu ra của sản phẩm không đúng với kết quả mong đợi). Vì vậy, bạn sẽ report 50 bug cho Team Lead và Team Lead xác định lại chúng rồi gán cho developer. Sau đó, developer sẽ fix tất cả các lỗi này.

Khi bug được resolved từ developer, sau đó phần mềm đã sẵn sàng để bạn xác minh lại rằng 50 bug bạn báo cáo đã được fix hay chưa. Làm thế nào để xác minh lại 50 bug đã được resolved này? Đương nhiên là bạn phải thực thi lại 50 test case lỗi. Đó chính là Retesting. Một cách khác: "Retesting nghĩa là thực thi lại các test case lỗi để xác minh rằng bug đã được fix".
Tóm lại, tổng 1000 test case. 950 test case pass, 50 test case fail. Retesting nghĩa là test lại 50 test case fail đó.

Vậy: Retesting là một loại thử nghiệm được thực hiện để đảm bảo rằng các test case không thành công chuyển thành thành công trong bản build cuối cùng sau khi được sửa chữa.

### 2. Kiểm thử hồi quy (Regression testing)

Có rất nhiều lúc chúng ta cần sử dụng Kiểm thử hồi quy. Đơn giản như khi thực hiện bất kỳ thay đổi gì trong phần mềm, chúng ta cần thực hiện Kiểm thử hồi quy. Có rất nhiều loại thay đổi sẽ được thực hiện trong phần mềm. 

Vậy thế nào là test hồi quy?

**2.1. Định nghĩa test hồi quy**

Khi một chức năng mới được thêm vào phần mềm, chúng ta cần chắc chắn rằng phần chức năng mới được thêm vào không phá hỏng các phần khác của ứng dụng. Hoặc khi lỗi đã được chỉnh sửa, chúng ta cần chắc chắn rằng lỗi chỉnh sửa không phá hỏng các phần khác trong ứng dụng. Để test điều này chúng ta thực hiện kiểu test lặp đi lặp lại gọi là test hồi quy.

Thử nghiệm hồi quy là một biện pháp kiểm soát chất lượng nhằm đảm bảo hai điều kiện sau đây:

  - Code mới đổi  đạt yêu cầu quy định.
  - Code Unmodified đã không bị ảnh hưởng bởi sự thay đổi như trên.
  
Theo định nghĩa này, hồi quy là lặp đi lặp lại thử nghiệm. Mục tiêu của thử nghiệm hồi quy là xác định lỗi bất ngờ. Những khuyết tật hay lỗi lầm trong khi thay đổi mã, nhà phát triển có thể không hoàn toàn hiểu được những tương quan nội bộ của các mã. Mục tiêu của thử nghiệm hồi quy không chỉ giới hạn kiểm tra tính đúng đắn của một ứng dụng mà còn mở rộng để theo dõi chất lượng đầu ra của nó là tốt.

**2.2. Đặc điểm và tính chất của test hồi quy:**

Test hồi quy không phải là 1 mức kiểm tra. Nó đơn thuần kiểm tra lại PM sau khi có một sự thay đổi xảy ra, để bảo đảm phiên bản PM mới thực hiện tốt các chức năng như phiên bản cũ và sự thay đổi không gây ra lỗi mới trên những chức năng vốn đã làm việc tốt. Regression test có thể thực hiện tại mọi mức kiểm tra.

Test hồi quy là một trong những loại kiểm tra tốn nhiều thời gian và công sức nhất. Tuy nhiên, việc bỏ qua Regression Test là "không được phép" vì có thể dẫn đến tình trạng phát sinh hoặc tái xuất hiện những lỗi nghiêm trọng, mặc dù ta "tưởng rằng" những lỗi đó hoặc không có hoặc đã được kiểm tra và sửa chữa rồi!

Bây giờ chúng ta sẽ xem xét từng cái một và cách thực hiện kiểm thử hồi quy trong tình huống đó.

**Tình huống 1**

Lấy ví dụ như trên. Bạn có 1000 test case và bạn thực hiện tất cả chúng. Có 950 test case pass, 50 test case fail. Khi đó developer sẽ fix chúng, sau đó bạn thực hiện Retesting trên tất cả các test case fail. Nhưng điều gì sẽ xảy ra với 950 test case pass? Chúng ta cần thực hiện lại chúng để  kiểm tra rằng không có bất kỳ bug nào phát sinh vì sửa mã. Những gì developer làm để fix bug, đó là họ thực hiện một vài điều chỉnh trong code để thay đổi một số logic và cố gắng fix bug. Nhưng nó có thể gây ra một bug trong chức năng đang hoạt động khác. Nghĩa là bất kỳ test case đã pass nào cũng có thể trở thành fail khi code bị sửa. Vì vậy, chúng ta cần thực hiện kiểm thử hồi quy để đảm bảo không có bất kỳ tác động nào của việc sửa mã trên phần mềm. Nhìn chung, chúng ta có 1000 test case, 50 test case fail. Với 50 test case fail, chúng ta thực hiện Retesting. Còn với 950 test case pass, chúng ta sẽ thực hiện Regression testing sau khi bug được fix.

**Tình huống 2**:

Khi client muốn thêm chức năng mới vào phần mềm đã phát triển trước đó, tại thời điểm đó chức năng mới cần được tích hợp với phần mềm có thể gây ra bất kỳ tác động xấu đến phần mềm. Do đó chúng ta cần thực thi regression testing trên toàn bộ phần mềm.

 **Tình huống 3**:

Như chúng ta đã biết khách hàng có thể thay đổi requirement ở bất cứ thời điểm nào. Vì thế để thỏa mãn sự thay đổi của khách hàng, developer cần thay đổi logic và code của họ. Sau khi developer thay đổi code, chúng ta cần thực thi regression testing trên tất cả những test case đã pass trước đó.

**Tình huống 4**

Khi client muốn xóa một vài chức năng của phần mềm của họ. Để hoàn thành nó, developer phải đối mặt với nhiều thay đổi trong phần mềm có nhiều module xen kẽ với nhau. Nghĩa là, chúng được kết nối với nhau. Nếu bất kỳ một module kết nối với nhau bị xóa khỏi phần mềm thì những module liên quan phụ thuộc vào nó có thể hoạt động không đúng. Vì vậy sau khi remove một tính năng nào đó, chúng ta phải kiểm tra lại những tính năng còn lại hoạt động có đúng hay không. Do đó, chúng ta cần thực hiện regression testing trên tất cả các module.

**Tóm lại, chúng ta sử dụng kiểm thử hồi quy trong các tình huống sau:**

- Khi fix bug
- Khi thêm tính năng mới
- Khi xóa một tính năng bất kỳ
- Khi thay đổi requirement
- Khi nâng cao hiệu suất

### 3. Sự khác nhau giữa Retesting  và Regression Testing

| Regression Testing | Re-Testing | 
| -------- | -------- | -------- |
| Regresstion Testing được thực hiện nhằm xác nhận một chương trình hoặc một thay đổi mã gần đây không làm ảnh hưởng đến các chức năng hiện có      | Re-testing được thực hiện nhằm đảm bảo các test case bị lỗi đã được pass trong bản build cuối cùng sau khi lỗi được fix    | 
| Mục đích của Regression Testing là những sự thay đổi mã không làm ảnh hưởng đến những chức năng đã tồn tại    | Re-testing  được thực hiện trên cơ sở các bản sửa lỗi    | 
| Xác minh lỗi không phải là một phần của Regression Testing     | Xác minh lỗi là  một phần của Re-testing     | 
| Dựa trên dự án và nguồn lực sẵn có, Regresstion Testing có thể thực hiện song song với Re-testing     | Ưu tiên của Re-testing cao hơn regression testing, vì nó được thực hiện trước khi kiểm thử hồi quy     | 
| Bạn có thể thực hiện kiểm thử tự động trong Regression Testing, manual testing có thể tốn kém và tốn thời gian     | Bạn không thể thực hiện kiểm thử tự động với Re-testing     | 
| Regression Testing là thử nghiệm chung     | Re-testing là thử nghiệm có kế hoạch     | 
| Regression Testing thực hiện trên các test case đã passed     | Re-testing thực hiện trên các test case failed     | 
| Regression Testing  kiểm tra những ảnh hưởng không mong muốn    | Re-testing đảm bảo rằng những lỗi ban đầu đã đúng     | 
| Regression Testing chỉ được thực hiện khi có bất kỳ sự sửa chữa hoặc thay đổi nào được thực hiện trong project hiện có     | Re-testing thực thi một lỗi với dữ liệu và môi trường giống nhau với những đầu vào khác nhau với một bản build mới     | 
| Test case của Regression Testing có thể thu được từ spec, hướng dẫn sử dụng, và báo cáo lỗi liên quan đến những vấn đề đã  sửa     | Test case của Re-testing không thể được xác định trước khi bắt đầu test     | 


Link tham khảo: 

http://www.software-testing-tutorials-automation.com/2016/07/what-is-retesting-and-regression-testing.html

https://www.guru99.com/re-testing-vs-regression-testing.html