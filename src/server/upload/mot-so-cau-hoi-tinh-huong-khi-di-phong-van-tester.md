## 1. Expected(kết quả mong đợi) trong testcases dựa vào đâu

1. Dựa vào SRS: Software Requirement specification Document(tài liệu đặc tả)
1. Q&A file
1. Ticket của khách hàng trên tool quản lý dựa án vd redmine
1. Dựa vào thay đổi yêu cầu của khách hàng sau mỗi lần họp

## 2. Khi log bug Nếu Dev không cho là bug thì làm thế nào
**Bug là gì?**

"Bug là những error, flaw, failure, hay fault tạo ra một kết quả sai. Kết quả k đúng như yêu cầu đặc tả. Hay nó là chức năng mà bản đặc tả không đề cập đến
Error - Fault - Failure (Defect/Bug):

+ Error:Lỗi xảy ra khi có tác động lên sản phẩm gây ra một kết quả sai lệch.
+ Fault:Lỗi xảy ra khi làm sai các step, process, hoặc chuẩn bị dữ liệu.
+ Failure:Lỗi khi có kết quả sai lệch so với yêu cầu đặc tả.
Errors → Faults → Failures (Defect/Bug)

Answer: Trước hết em sẽ đọc và tìm hiểu lại tài liệu xem có đúng như  những gì mình test và log bug. Sau đó em sẽ review lại lỗi cho dev thấy và trao đổi vs dev.
- Nếu nó k phải là bug thì em sẽ để là feature(Tính năng).
- Nếu là bug mà dev vẫn k công nhận thì em sẽ hỏi ý kiến leader or PM

VD: các trường bắt buộc phải đc gán nhãn * dev bảo k phải là bug vì k có trong tài liệu đặc tả thì p xem lại đặc tả, nếu đúng thì sẽ gán nó là lỗi chức năng chứ k phải bug.
## 3. Usability testing:
Sau khi nhập hết thông tin mã capcha nhập sai thì các thông tin p trên vẫn đc giữ nguyên chỉ có mã capcha đc reload lại.
Hoặc khi nhập thông tin xong mà k muốn đk tài khoản nhấn button Đóng thì hệ thống sẽ p có một thông báo”Bạn có chắc chắn muốn đóng cửa sổ không ”

Usability testing:
Kiểm thử khả năng sử dụng là một loại kiểm thử được thực hiện từ góc độ người dùng cuối để xác định xem hệ thống có dễ sử dụng hay không.
Kiểm tra khả năng sử dụng thường được thực hiện trong suốt các mức của kiểm thử hệ thống và kiểm thử chấp nhận
Security testing:
Kiểm thử bảo mật là một loại kiểm thử phần mềm có ý định phát hiện ra các lỗ hổng của hệ thống và xác đinh rằng dữ liệu và tài nguyên của nó được bảo vệ khỏi những kẻ xâm nhập có thể.
-Có bốn lĩnh vực trọng tâm chính được xem xét trong kiểm thử bảo mật(đặc biệt đối với các trang web/ứng dụng):
+Bảo mật mạng
+Bảo mật phần mềm hệ thống
+ Bảo mật ứng dụng phía máy khách
+ Bảo mật ứng dụng phía máy chủ
=> kiểm thử bảo mật không phải là biện pháp duy nhất(hoặc tốt nhất) về mức độ an toàn của một ứng dụng. Nhưng khuyến khích rằng kiểm thử bảo mật được đưa vào như một phần của quy trình phát triển phần mềm tiêu chuẩn
Ví dụ: 1.Check for SQL injection attacks. Check lỗi SQL injection Ví dụ: Texbox tìm kiếm: truyền vào giá trị tìm kiếm là một đoạn mã javascript Sử dụng câu lệnh SQL để truy cập dữ liệu: var username = request.username; …
error messages Không được tiết lội bất kỳ thông tin nhạy cảm nào.
Ví dụ: Khi user thực hiện đăng nhập không thành công do thông tin không đúng thì không nên hiển thị các error message kiểu như sau:

2.Tên đăng nhập không tồn tại
Mật khẩu không đúng Việc hiển thị error message như trên sẽ giúp hacker có thể đưa ra những phán đoán nhằm xâm nhập vào hệ thống. Trong trường hợp này nên hiển thị error message một cách chung chung như: Tên đăng nhập hoặc mật khẩu không đúng.
3. Chức năng xác mình mã CAPCHA

Compatibility test: test trên nhiều version tính tương thích
## 4.Functional Test
Test nghiệp vụ business (hợp lệ, k hợp lệ, phân quyền: admin truy cập đc chức năng nào, user truy cập đc chức năng nào.)
Test data ví dụ checkbox: số, chữ, xml, html, sql jquery...
Vì sao cần nhập sql jquery: Nếu dev code k cẩn thận thì hệ thống sẽ thực hiện câu lệnh một số hacker có thể lợi dụng để hack tkhoan(Check for SQL injection attacks. Check lỗi SQL injection Ví dụ: Texbox tìm kiếm: truyền vào giá trị tìm kiếm là một đoạn mã javascript Sử dụng câu lệnh SQL để truy cập dữ liệu: var username = request.username; …
error messages Không được tiết lội bất kỳ thông tin nhạy cảm nào.)
## 5. Cách tiếp cận dự án
Trước tiên khi vào 1 dự án cần tìm hiểu vai trò của các member (ai là project leader, ai là PO, ai là QA, Dev... để khi có câu hỏi thì hỏi đúng người)
Cần có cái nhìn khái quát về dự án như khách hàng là ai? sản phẩm phần mềm làm về lĩnh vực gì? ngữ cảnh? nghiệp vụ chung.
  Check description của box hoặc hỏi nx người phụ trách dự án để xác định thông tin:
  + quy trình dự án
  + quy trình test
  + quy trình quản lý & câp nhật spec
  + Các rule hoạt động của dự án
  + folder dự án
  + folder spec
  + folder test
 Xác định được cách thức để thực hiện các công việc dự án (dùng tool hay file? quy trình thực hiện) 
 + Q&A
 + + log ticket
 + daily meeting
 + report
 + cách thức communicate của dự án
 

1. Đọc tài liệu đặc tả yêu cầu hoặc test checklist nếu có
    Em lên redmine đọc các task dev đã implement
Sau đó vừa đọc vừa thử thao tác trên hệ thống, test thử để hiểu hệ thống theo các role
--> Dành ra 2 buổi để đọc và chạy như trên nhé, mục tiêu để hiểu hệ thống trước
Nếu có câu hỏi thì tạo file Q&A trên thư mục chung của dự án
2. Thực hiện liệt kê ra các trường hợp cần test (vận dụng test design technique đã học)
3. Viết test check list hoặc test case (tùy thuộc vào thời gian và resource của dự án)
4. Chú ý báo cáo hàng ngày ( template như nào em xem trên description của box chat)
5. Log bug trên redmine

*Summary:* 

*Pre-condition:*

*Step to-reproduce:* 

*Actual result:*

*Excepted result:*
*References:*
Q&A document #70
7. Khi re test, verify bug trên redmine nhớ có comment
Ví dụ: Verified bug --> pass
           ---> Close bug report
Hoặc
         Verified bug ---> fail
         Comement lý do fail
         ---> Reopen bug report

Comment template to verify ticket:

*PASS:
This bug was fixed on [Staging] env
Context
- Env: Staging
- OS:  Window 10
- Browser:  Chrome Version 71.0.3578.98 (Official Build) (64-bit)
- Date 03/ /2019

*FAIL:
This bug still happens  on [Staging/Dev] env
Actual result:
Expected result:
Context
- Env: Staging
- OS:  Window 10
- Browser:  Chrome Version 71.0.3578.98 (Official Build) (64-bit)
- Date 03/ /2019

*FEEDBACK:
Hi Dev/BrSE/...
Content...
Thanks.
## 6. Làm gì khi log bug xong hôm sau không tái hiện lại được bug nữa

Trong trường hợp sau khi log bug xong (những bug về logic chức năng, giao diện...) mà  phát hiện luôn là không tái hiên được bug nữa, thì comment vào bug là "cannot reproduce" sau đó close bug lại. Không xóa bug đó đi nhé, chỉ close lại thôi nha. Nhưng phải nhớ comment vào bug trc khi close.

Trong trường hợp dev nhận ticket sau đó dev không tái hiện dc bug đó thì bạn dev đó cần comment vào bug là "cannot reproduce this issue" sau đó assign lại cho QA. QA vào check lại lần nữa, nếu đúng là k tái hiện dc thì QA comment vào và close bug. (ng close là QA chứ k phải Dev )

Trong trường hợp nếu do dev fix bug nào đó liên quan khiến cho bug mình log lên không tái hiện dc nữa (trường hợp này là do có một số bug log lên khác nhau nhưng lại cùng 1 root cause gây ra vấn đề, nên fix bug này thì bug khác cũng tự khỏi :)  ) trường hợp này có thể dev comment vào đã fix, chung root cause với bug nào đó, assign lại QA. QA verify lại lần nữa xem còn bị bug hay không. Nếu pass thì close lại.

## 7. Trong quá trình log bug thì bug tâm đắc nhất

1. Đó là trong màn hình tạo plan, sau khi nhập đầy đủ thông tin vào các trường em click liên tục vào button Create thì có nhiều bản ghi giống nhau được tạo ra. Bình thg bug này cta không thể đoán trước được mà nó dựa vào kinh nghiệm của Tester or là không may mình test thì thấy :v. VS bình thường em thường bảo mấy dev là em lấy việc log bug làm niềm vui nên thấy bug là em vui lắm :v. Mn toàn bảo em tạo nghiệp.

2.Phóng to,  Khi thu nhỏ màn hình thì title của bảng kết quả bị chồng chéo lên nhau
3. Trường select show ra sau đó scroll chuột, thì bị overlow
## 8. Khi test xong và đợi dev deploy code mới em làm gì?

Em update Guideline, update TCs, đọc lại các tài liệu xem mình có bỏ sót gì không hoặc test lại một số chức năng chính của hệ thống vì đôi khi em thấy dev fix bug hoặc deploy code mới một số chức năng hay bị lỗi,.
Đọc các ticket trên redmine. đôi khi có một số bug dev fix trong quá trình fix bug khác mà k đổi status cũng như assign cho em thì em sẽ vào cmt và close bug
## 9. Nếu trong đội dự án có ng không thích em

Em sẽ hỏi thêm các thành viên khác trong dự án để hiểu về dự án trước, vì nếu người đó k thích em mà em cứ làm phiền vs hỏi nhiều thì chỉ làm họ khó chịu. Em sẽ làm quen dần dần, có thể trao đổi các vấn đề khác k liên quan đến công việc:  con gái thì cứ nói về mỹ phẩm, quần áo là thích. Lúc mà cả 2 cởi mở vs nhau hơn rồi thì vấn đề trao đổi về công việc sẽ diễn ra thuận lợi hơn.

## 10. Có nên cho dev xem TCs
Tạo sẵn test case và chuyển đến deverloper trước khi coding. Đừng giữ test case cùng với việc đợi đến khi có ứng dụng cuối cùng rồi mới đưa ra test, vì nghĩ rằng bạn có thể đưa ra nhiều lỗi hơn. Hãy để deverloper phân tích kỹ lưỡng các test case để xây dựng lên một ứng dụng chất lượng. Điều này cũng sẽ tiết kiệm được nhiều thời gian làm việc.