Bài viết này hy vọng hữu ích cho những kiểm thử viên đang tìm kiếm phương pháp để thực hiện kiểm thử kết hợp tất cả các cặp, nhằm giảm số lượng test cases, tiết kiệm thời gian và cover được tất cả các trường hợp cần kiểm thử.

Có phải kiểm thử càng nhiều test case càng tốt? Quan trọng là đầy đủ tất cả các trạng thái và biến có thể kết hợp, đảm bảo tìm thấy tất cả các lỗi. Thực tế, không có đủ thời gian hoặc effort để kiểm thử mọi sự kết hợp của tất cả các biến. 

Vậy làm thế nào để xác nhận rằng sản phẩm đã sẵn sàng để phát hành trong thời gian và chi phí hợp lý? Một giải pháp là sử dụng phương pháp kiểm thử hiệu quả, được hỗ trợ bởi các công cụ thích hợp.

### 1. All pairs Testing là gì?

All pair testing (Kiểm thử tất cả các cặp) hay còn gọi là pairwise testing, là một phương pháp test được thực hiện để kiểm thử các phần mềm sử dụng phương pháp tổ hợp. Đó là một phương pháp để kiểm tra tất cả các kết hợp rời rạc có thể có của các thông số liên quan, phương pháp test ít nhất sao cho chất lượng tốt nhất. 

Thực tế quan sát cho thấy, hầu hết lỗi do kết hợp của 2 yếu tố/tham số  => Kiểm thử tất cả các cặp sinh bộ kiểm thử chứa tất cả các cặp giá trị cần kiểm thử của các biến. Giảm đáng kể số lượng testcase mà vẫn hiệu quả trong việc phát hiện lỗi (50-90%).

Giả sử có một chức năng của phần mềm được kiểm thử: Có 10 trường đầu vào và 10 giá trị cho từng trường đầu vào ==> có 10 ^ 10 đầu vào có thể được kiểm tra. Trong trường hợp này, kiểm tra toàn diện là không thể thực hiện được.

### Ví dụ:

Một ứng dụng với list box đơn giản với 10 phần tử ( 0,1,2,3,4,5,6,7,8,9) cùng với một checkbox, radio Button, Text Box và OK Button. Các ràng buộc cho ô Text là nó có thể chấp nhận các giá trị chỉ từ 1 đến 100. Dưới đây là những giá trị mà mỗi một trong số các đối tượng giao diện có thể thực hiện:

* List Box - 0,1,2,3,4,5,6,7,8,9
* Check Box - Checked hoặc Unchecked
* Radio Button - ON hoặc OFF
* Text Box - Bất kỳ giá trị từ 1 đến 100

**Sự kết hợp đầy đủ các ứng dụng được tính như sau:**

* List Box = 10 giá trị
* Check Box = 2 giá trị
* Radio Button = 2 giá trị
* Text Box = 100 giá trị

==> Tổng số testcase khi sử dụng phương pháp Cartesian, nghĩa là khi ta kiểm tra đầy đủ tất cả các trường hợp là 10 x 2 x 2 x 100 = 4000 testcase.

==> Tổng số testcase bao gồm những trường hợp tiêu cực có thể > 4000

Như vậy, sẽ mất rất nhiều thời gian để kiểm tra đầy đủ.

**Ý tưởng để làm giảm số lượng test case là cố gắng tìm ra số lượng các trường hợp theo các kỹ thuật kiểm thử phần mềm thông thường.**

Ta xét các giá trị

* List box: chia thành 2 vùng kiểm tra 0 và những giá trị khác (others) (1,2,3,4,5,6,7,8,9).
* Check box: giữ nguyên 2 giá trị là Checked hoặc Unchecked
* Radio Button: giữ nguyên 2 giá trị là ON hoặc OFF
* Text Box: Bất kỳ giá trị từ 1 đến 100 có thể được chia thành ba đầu vào (Integer hợp lệ là trong khoảng từ 1 đến 100, Integer không hợp lệ là ngoài khoảng 1 đến 100 và các kí tự đặc biệt không phải là số nguyên).

==> Số lượng các testcase sử dụng kỹ thuật kiểm thử phần mềm đã giảm xuống còn 2 x 2 x 2 x 3 = 24

Ứng dụng kỹ thuật All pairs testing...

Số test case = (số value max - 1)(số biến max - 1) ==> Số Test case trong ví dụ này là: 2x3 = 6

**Bước 1.** Sắp xếp biến có nhiều vùng giá trị nhất sắp xếp đầu tiên và biến có số lượng vùng giá trị ít nhất được để ở cuối cùng.

**Bước 2.** Điền các vùng giá trị tương ứng vào bảng theo cột. Bắt đầu từ List box (cột thứ 2), có thể lấy 2 giá trị: 0 và others.

| Text Box | List Box | Check box |Radio Button |
| -------- | -------- | -------- |-------- |
|      |   0   |      |      |
|      |  others    |      |      |
|      |   0   |      |      |
|      |  others    |      |      |
|      |   0   |      |      |
|      |  others    |      |      |

**Bước 3.** Tiếp tục điền vùng giá trị cho cột Check box: nhận 2 giá trị là check và uncheck.

Chú ý đảm bảo rằng đã bao phủ tất cả các trường hợp kết hợp giữa List box và Check box.

| Text Box | List Box | Check box |Radio Button |
| -------- | -------- | -------- |-------- |
|      |   0   | check     |      |
|      |  others    |  uncheck    |      |
|      |   0   |  uncheck    |      |
|      |  others    |  check    |      |
|      |   0   |   check   |      |
|      |  others    |   uncheck   |      |

**Bước 4.** Tiếp tục điền giá trị cho cột Radio Button: có 2 giá trị là ON hoặc OFF.

| Text Box | List Box | Check box |Radio Button |
| -------- | -------- | -------- |-------- |
|      |   0   | check     |   ON   |
|      |  others    |  uncheck    |   OFF   |
|      |   0   |  uncheck    |   OFF   |
|      |  others    |  check    |  ON    |
|      |   0   |   check   |   OFF   |
|      |  others    |   uncheck   |    ON  |

**Bước 5.** Xác minh để đảm bảo tất cả các cặp giá trị đều được bao phủ như trong bảng dưới đây.

| Text Box | List Box | Check box |Radio Button |
| -------- | -------- | -------- |-------- |
|   Valid Int   |   0   | check     |   ON   |
|  Valid Int    |  others    |  uncheck    |   OFF   |
|  InValid Int    |   0   |  uncheck    |   OFF   |
|   InValid Int   |  others    |  check    |  ON    |
|  AlphaSpecialCharacter    |   0   |   check   |   OFF   |
|    AlphaSpecialCharacter  |  others    |   uncheck   |    ON  |

### So sánh kết quả
Kết quả kết hợp đầy đủ trong> 4000 test cases.
Kết quả kỹ thuật thông thường kiểm thử phần mềm 24 test cases.
Kết quả kỹ thuật Pair Wise Kiểm thử phần mềm chỉ trong 6 test cases.

### 1.1. Thực hiện tất cả các cặp thử nghiệm
Nếu kiểm tra tất cả các kết hợp có thể có của giá trị là không cần thiết, thì làm thế nào để xây dựng cách kiểm tra tất cả các cặp.

Có một số ứng dụng cho phép nhập vào các biến và tạo ra các bài kiểm tra. Tuy nhiên, nó là hữu ích để thử xây dựng các trường hợp kiểm thử bằng tay một lần hoặc hai lần để hiểu chính xác tất cả các cặp thử nghiệm hoạt động như thế nào.

### 1.2. Nhận xét về lập bảng kết hợp dùng phương pháp All-Pairs
* PICT (Pairwise Independent Combinatorial Testing Tool) đây là một phần mềm dễ sử dụng và có nhiều chức năng của công ty Microsoft.
* Đây là phần mềm miễn phí dùng để tạo testcase kết hợp dễ dàng.
    + http://www.pairwise.org/tools.asp
    + Sinh ra tất cả các cặp với số test case ít nhất.
* Sử dụng pairwise khi cần thiết

    + Rất nhiều biến/tham số và lỗi xảy ra sẽ nghiêm trọng.
    + Giảm đáng kể số ca kiểm thử.

### 2. Pair Testing
* Nếu bạn là một kiểm thử phần mềm, bạn có thể tìm thấy chính mình trong một trong các tình huống sau đây:
* Bạn đang miệt mài để tìm lỗi trong một hệ thống lớn và không thể test được tất cả mọi thứ trong phạm vi deadline. Bạn đã tìm ra một số bug tốt và nghĩ rằng bug có nhiều tại đó, nhưng đến deadline và các phần mềm được phát hành. Một tuần sau đó, một khách hàng lớn tìm thấy một vấn đề nghiêm trọng với bản phát hành mới. Khi đó, bạn bắt đầu suy nghĩ về những gì đã xảy ra và làm thế nào bạn có thể cải thiện phương pháp kiểm thử của mình.
* Một lần phỏng vấn xin việc, bạn nhận được yêu cầu làm thế nào để kiểm tra một sản phẩm, đặc biệt là khi có quá nhiều việc phải làm trong thời gian quá ít.
* Leader đặt ra những kỳ vọng không thực tế để bạn "kiểm thử mọi thứ" với độ bao phủ 100%, bao gồm cả kiểm thử tất cả các đầu vào có thể, từ tất cả các trường, các màn hình, từ tất cả các đường dẫn truy cập vào hệ thống, tất cả các kết quả đầu ra có thể. Bạn biết đây là những yêu cầu vô lý, và bạn bắt đầu suy nghĩ về phương pháp kiểm thử thay thế.
* Kiểm thử theo cặp là quá trình kiểm thử bởi hai tester với cùng một thời gian và địa điểm, liên tục trao đổi ý tưởng.
* Khi kết hợp, hai tester sử dụng một máy tính hoặc cùng chung thiết bị test. Trong một phiên, cho những ý tưởng hoặc cách kiểm thử, chú ý và ghi chép, lắng nghe, đặt câu hỏi, lấy tài liệu tham khảo khác nhau,...
* Cặp tester nên giải quyết một công việc kiểm thử duy nhất, có cùng một mục tiêu chung, làm việc cùng nhau...Một checklist, bản test case hoặc tập hợp các ý tưởng kiểm thử sẽ là một điểm khởi đầu tốt.
* Cặp tester nên trao đổi nhiều hơn khi họ kiểm thử để có được chia sẻ, sự hiểu biết về những gì họ đang làm, và quan trọng hơn, tại sao họ đang làm nó.

### 2.1. Ưu điểm của Pair testing khi làm việc
* Sáng tạo cao
    + Làm việc theo từng cặp để cùng trao đổi ý tưởng, tranh luận, giúp tăng hiệu quả, tập trung tốt hơn và phát hiện nhiều ý tưởng hơn.
    + Áp dụng các thông tin và cách nhìn nhận của cả hai cho cùng một vấn đề chắc chắn sẽ dễ dàng hơn một người làm việc một mình và là nạn nhân của tầm nhìn đường hầm.
   + Ghép cặp để cùng tiếp xúc, tạo mối quan hệ thân thiết, tìm hiểu về nhau và thực hành kỹ năng giao tiếp, giải quyết vấn đề.
* Năng suất cao
    + Mỗi người phải tập trung vào các công việc và nâng cao tinh thần làm việc của đối tác.
    + Ghép cặp thúc đẩy họ suy nghĩ mà không dừng lại để ghi chép hoặc tìm thông tin tham khảo, tăng độ hiểu biết.
* Kỹ thuật Đào tạo
    + Một ghép cặp mạnh là bổ sung cho nhau, khắc phục điểm yếu của nhau. Đây là một cơ hội để mọi người học hỏi lẫn nhau.
    + Ghép cặp giúp người mới học tập, tích lũy tốt hơn, cũng rất hữu ích cho các tester có kinh nghiệm, giải đáp thắc mắc cho người mới cũng là động lực để họ học hỏi, tìm hiểu thêm kiến thức.

### 3. Kết luận
* Kiểm thử tất cả các cặp đảm bảo kiểm tra phù hợp mà không cần thử nghiệm mọi sự kết hợp có thể.
* Kiểm thử tất cả các cặp có thể giảm >=75% số lượng test case. Cùng với đó tiết kiệm thời gian nên tester có thể dành nhiều thời gian phát triển các test case phức tạp.
* Giúp cải thiện khả năng quản lý effort cho kiểm thử. Sẽ dành nhiều thời gian tập trung vào kiểm thử thực tế và yên tâm hơn về chất lượng phần mềm khi giải quyết được thắc mắc "liệu kiểm thử đã đủ case chưa?"

Bài viết được tham khảo và dịch từ:
https://www.tutorialspoint.com/software_testing_dictionary/all_pairs_testing.htm
http://katrinatester.blogspot.nl/2015/05/pair-testing.html
http://www.slideshare.net/ushakannappan/all-pairs-testing-technique