# Lời nói đầu

BDD, hẳn là dev nào cũng đã nghe nói qua rồi nhỉ. Với xu hướng hiện nay, code không đơn thuần chỉ là dựa trên design mà được phát triển theo hướng khác: phát triển từ test. Quy trình hiện tại là viết test trước xong rồi viết code để pass tất cả các test đã viết trước. Và thế là hoàn thành. Để hiểu rõ hơn thì hôm nay trong bài viết này mình xin chia sẻ một số ý mà mình hiểu được về BDD nhé!

# Behavior-Driven Development (BDD) là gì?

Về định nghĩa thì có rất nhiều cách nói. Nhưng theo mình hiểu thì:

* BDD là một quá trình phát triển phần mềm dựa trên phương pháp Agile dựa theo phương pháp tiếp cận hợp tác nhằm thu gọn khoản cách giữa business owner và dev.
* BDD là sự mở rộng của TDD (Test driven development). Thay vì tập trung vào phát triển phần mềm theo hướng kiểm thử, BDD tập trung vào phát triển phần mềm theo hướng hành vi.
* BDD giúp cho việc tạo requiment mà có thể nắm bắt dễ dàng bởi bất kì ai. Đưa ra ví dụ được thực hiện bằng hành vi cụ thể nhằm cụ thể hóa các vấn đề, từ đó nhanh chóng phát hiện ra những sự hiểu lầm không đáng có. BDD tập trung vào phòng ngừa lỗi hơn ra tìm ra chúng.

Trên đây là định nghĩa về BDD, tuy nhiên bài viết này mình sẽ không đi vào phân tích khái niệm cũng như đánh giá ưu nhược điểm. 
Bây giờ thì chuyển sang cách vận dụng BDD thôi.


# Viết kịch bản bằng ngôn ngữ tự nhiên

Đâu là bước đầu tiên, viết kịch bản test. Đây là bước mà bạn ngồi với business owner để clear requiment. Cách nhanh nhất để các bên cùng hiểu yêu cầu là đưa ra ví dụ cụ thể. Tuy nhiên, việc đưa ra ví dụ cũng cần phải có một kịch bản rõ ràng để từ đó, ai cũng có thể hiểu và nắm được. Kịch bản BDD dựa trên cú pháp gồm 3 từ khóa chính đó là Given - when - then

À mà trước hết chúng ta cần một bài toán và thường thì những bài toán về ngân hàng là có nhiều case nhất nên mình sẽ sử dụng luôn nhé. 

```
User Story 1 - Tạo một khoản vay

Là một người cần vay tiền
Tôi muốn khoản vay của mình được tạo
Qua đó tôi biết được thông tin chi tiết việc thanh toán định kì cho khoản vay của mình

Acceptance Criteria
* Tôi có thể chỉ định số tiền cần vay và thời hạn chi trả
* Khoản vay được tính từ ngày làm việc hành chính sau ngày hôm nay.
* Việc trả nợ định kì hàng tháng được chỉ định vào cùng một ngày cho các tháng
** Việc thanh toán số dư hàng tháng sẽ được thực hiện cùng một ngày. Tuy nhiên nếu nó không phải là ngày làm việc hành chính thì nó sẽ được thực hiện vào ngày làm việc tiếp theo.
** Khoản thanh toán hàng tháng là giống nhau, ngoại trừ khoản thanh toán cuối cùng (có thể chênh lệch do khoản chia được làm tròn số)
```


Với yêu cầu này, chúng ta hoàn toàn có thể hiểu được. Tuy nhiên có một số điểm có thể gây hiểu lầm ví dụ như ngày thanh toán hay số tiền thanh toán tháng cuối cùng thì chúng ta cần một vài ví dụ cụ thể. Đó là cách tốt nhất để hiểu rõ ràng. Vậy tiếp theo, ta cần đưa ra một kịch bản với những con số cụ thể đó, và tất nhiên là áp dụng cú pháp given - when - then

```
Scenario: vay trả trong vòng 1 tháng
Given: ngày đi vay 23/09/2019
When: tôi muốn vay 10 triệu trong 1 tháng
Then: tôi mong đợi khoản vay sẽ được tạo với thông tin sau
| Payment date | Amount |
| 23/10/2019 | 10.000.000 VND |

Scenario: Tạo khoản vay 10 triệu đồng trong vòng 12 tháng
Given: ngày đi vay 23/09/2019
When: tôi muốn vay 10 triệu trong 12 tháng
Then: tôi mong đợi khoản vay sẽ được tạo với thông tin sau
| 23/10/2019 | 833.000 VND |
| 23/11/2019 | 833.000 VND |
.....
| 23/09/2020 | 837.000 VND |
```

bạn có thể thêm nhiều trường hợp khác nếu thích tuy nhiên ở bàn viết này thì 2 kịch bản này là đã đủ dùng. Chỉ với 2 kịch bản này mình dám chắc là ai cũng hình tượng rõ ràng yêu cầu bài toán đa cần những gì. Đó là lợi ích của bước thứ nhất: giúp cho tất cả mọi người hiểu requiment


#  Tạo file test từ kịch bản đã dựng

Đây là bước tiếp theo khi đã hoàn thành xong kịch bản và nắm rõ requiment. Bước này ta thực hiện việc viết unit test hoàn toàn viết theo kịch bản đã đề ra ở trên. Nghĩa là bước này đã được code rồi đó, và vì là làm ví dụ nên mình sẽ code theo ngôn ngữ lập trình make by me nhé. Chứ mình không focus vào ngôn ngữ nào đâu ;)

Tạo unitest đầu tiên cho khoản vay 10 triệu trả trong 1 tháng

```
[TestCase]
public ScenarioALoanFor1Month() {
    givenTheDateIs(23, 10, 2019);
    whenIRequestALoanFor(10000000).toBePaidOverTermOfMonths(1);
    thenIExpectThePaymentsToBeCreated( [ Date(23, 10, 2019), 10000000 ] );
}
```

và tiếp theo cho khoản vay 10 triệu trả trong 2 tháng

```
[TestCase]
public ScenarioALoanFor1Month() {
    givenTheDateIs(23, 10, 2019);
    whenIRequestALoanFor(10000000).toBePaidOverTermOfMonths(1);
    thenIExpectThePaymentsToBeCreated( [ { Date(23, 10, 2019), 5000000 } , { Date(23, 11, 2019), 5000000 } ] );
}
```

Biến những gì viết trong kịch bản thành code. Đó là những gì cần làm. Các testcase hiện tại chưa thể chạy do chưa định nghĩa các phương thức như givenTheDateIs, whenIRequestALoanFor... không sao. Chúng ta sẽ tạo ra các phương thức này, không cần phải code xử lý này nọ. Chỉ cần khai báo phương thức với input đầu vào. Như là

```
private void givenTheDateIs(int day, int month, int year) { }
private void whenIRequestALoanFor(int loanAmount) { }
private void thenIExpectThePaymentsToBeCreated(Array<Date, int> expectedRepayment) { }
```

Đến đây, chúng ta tiếp tục implement các phương thức trên để cho testcase có thể chạy một cách thường. Mục tiêu lúc này không phải là test pass hay fail, mà là test có thể chạy được. Và một khi chạy được tất nhiên là nó không thể nào mà đúng ngay được. Phải có case fail và step tiếp theo, chính là việc hoàn thiện nó. Nghe rất giống TDD phải không nào, thử xem lại định nghĩa xem, BDD hoàn toàn dựa trên TDD đấy. Nhưng điểm khác biệt lớn nhất chính là BDD thực hiện test theo hành vi, hay hiểu đơn giản hơn, nó là test một tập hợp các chức năng. Với TDD, chúng ta chỉ test theo đơn vị 1 function, thì với BDD, nó là nhiều function từ nhiều service. Chính vì thế, với những phương thức dùng để test ở trên, ta cần lên một thiết kế sơ bộ về những gì mình còn thiếu, chẳng hạn như:

* Nếu như thực hiện givenTheDateIs thì nó sẽ set Date cho cái gì?
* Nếu như thực hiện whenIRequestALoanFor nó sẽ lưu giá trị này ở đâu?
* Khoản vay được tính toán ở đâu để có giá trị theo đúng như đã đưa ra ở  thenIExpectThePaymentsToBeCreated
* ...

Cứ hỏi và trả lời, ta sẽ có được một đáp án là những cái mình đang còn thiếu và phương hướng giải quyết. Chẳng hạn:

* Cần một object để lưu lại ngày đi vay, khoản vay, thời hạn vay... Ta tạm gọi nó là LoanCreationRequest
* Để tạo thông tin chi tiết thanh toán khoản vay, chúng ta cần một controller đảm nhận việc create. Nó sẽ là POST (dùng để create theo REST API)
* Chúng ta cần thêm một service để lấy ngày thanh toán là ngày làm việc, tính toán lãi suất dựa trên thời gian vay... và cả repository dùng để lưu dữ liệu vào DB

Và tất nhiên không thể thiếu phần lưu ý: 

* việc thực thi test đối với kịch bản BDD hoàn toàn dựa trên logic code đã được implement. Việc mockup chỉ thực hiện đối với thao tác database. Test sẽ chạy trên toàn bộ code. Nghĩa là tương đương với integration test. Thực tế thì integration test là một phần của BDD.
* Việc triển khai các API, service để xử lý các chức năng thì chúng cũng cần phải được thực hiện bằng test first, tức là phải dùng TDD cho các chức năng nhỏ và kết hợp bằng BDD. Phần tiếp theo tất nhiên là mình sẽ tiếp tục ví dụ việc triển khai các chức năng đã được phân mảnh với TDD


# Lời kết

Hi vọng bài viết này sẽ mang đến cho bạn một cách nhìn mới về cách triển khai code thông qua BDD. Bài viết này dừng ở mức ban đầu là tạo kịch bản và chuyển thể thành testcase trên code. Phần tiếp theo, mình sẽ tiếp tục xây dựng và triển khai các chức năng khác bằng TDD, một phần không thể thiếu của BDD. Mong gặp lại các bạn ở bài viết tiếp theo.

Chúc một ngày tốt lành.