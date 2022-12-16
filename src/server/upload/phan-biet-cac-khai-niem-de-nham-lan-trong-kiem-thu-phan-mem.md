**Bài viết này sẽ giới thiệu và  làm rõ một số thuật ngữ thường gây nhầm lẫn, khó phân biệt trong lĩnh vực kiểm thử phần mềm (software testing):**

# 1. Error - Fault - Failure (Defect/Bug):

**Error:**
Là hành động của con người dẫn đến kết quả sai.<br>

Ví dụ: Developer đặt tên biến cho 1 function sai cú pháp, dẫn đến khi gọi biến này thì không ra kết quả.

**Fault:**
Lỗi xảy ra khi làm sai các step, process, hoặc chuẩn bị dữ liệu.<br>
Ví dụ: khi bạn test API, bạn muốn login thành công vào 1 app thì sẽ luôn có 1 token được trả về từ server. <br>
Fault => Server không có token trả về, và bạn vẫn login thành công.<br>

**Failure:**
Lỗi khi có kết quả sai lệch so với yêu cầu đặc tả, là sự khác biệt giữa kết quả thực tế trên màn hình và kết quả mong đợi của một thành phần, hệ thống hoặc service nào đó.<br>

Ví dụ: khách hàng yêu cầu server có thể hoạt động tốt khi có 1000 user.<br>

Tuy nhiên trên thực tế server chỉ có thể hoạt động tốt khi có 900 user.<br>

Note: Không phải 100% failure là do bug gây ra, trong quá trình test cấu hình sai, test sai môi trường hoặc làm thiếu bước có thể dẫn đến failure<br>

**BUG:** 
Là một khiếm khuyết trong một thành phần hoặc hệ thống mà nó có thể làm cho thành phần hoặc hệ thống này không thực hiện đúng chức năng yêu cầu của nó, ví dụ như thông báo sai hoặc định nghĩa dữ liệu không đúng. 

Một bug, nếu gặp phải trong quá trình hệ thống hoạt động, có thể gây ra failure trong thành phần hoặc hệ thống đó.

**DEFECT:**
Lỗi trong quá trình phát triển hoặc lỗi logic(coding or logic) làm cho chương trình hoạt động sai yêu cầu đề ra.(Về cơ bản là giống định nghĩa bug).<br>

Ví dụ: Trong quá trình coding, developer nên get data từ A để hiển thị lên màn hình, tuy nhiên developer hiểu sai logic và get data từ C để hiển thị lên màn hình, dẫn đến bug hiển thị sai data<br>

***Tóm lại:*** con người gây ra error, mistake trong code, tài liệu,... => dẫn đến có bug, defect hoặc fault trong code, tài liệu => khi thực thi chương trình thì bắt gặp failure.

# 2. Verification - Validation:
![](https://images.viblo.asia/8c415f4a-c922-4c13-81b0-a139876870bf.png)


**Verification (xác nhận):**<br>
* Xác nhận xem việc thực thi sản phẩm (product) đúng theo yêu cầu đã được chỉ định hay chưa?<br>
* Trả lời cho câu hỏi: "Did we build the system right?"<br>
* Ví dụ: xác nhận theo SRS, design thực hiện ở giai đoạn code review trong team, unit test, integration and system test

**Validation (xác nhận):**
* Xác nhận, kiểm tra xem chức năng (function) cần thiết và mong đợi của khách hàng đã có trong sản phẩm hiện tại hay chưa?<br>
* Trả lời cho câu hỏi: "Did we build the right system, appropriate, fix for use?"<br>
* Ví dụ: xác nhận theo SRS, Requirement prototype xác nhận theo SRS review bởi customer, acceptance test, beta test, hỗ trợ<br>

# 3. Re-testing - Regression testing:
![](https://images.viblo.asia/6bcff9ff-382a-4830-ad7d-df45bee0c292.png)

**Re-testing (kiểm thử lại):**
* Là hành động xảy ra sau khi lỗi (defect) đã được fix, cần re-test lại phần mền (software) để kiểm tra xem lỗi (defect) ban đầu đã được xóa bỏ thành công hay chưa?

* Hay còn gọi là xác nhận (confirmation).

     (Debug (tìm vị trí và fix lỗi (defect)) thuộc quá trình development, không nằm trong quá trình testing)

**Regression testing (kiểm thử hồi quy):**
* Là lặp lại việc kiểm thử trên một chương trình (program) đã được kiểm thử trước đó, sau khi chương trình (program) có sự thay đổi, để khám phá xem có bất cứ lỗi (defect) nào xảy ra sau khi thay đổi hay không?
* Lỗi (defect) xảy ra có thể là lỗi của phần mềm (software) đã kiểm thử trước đó, hoặc có thể thuộc một phần (software component) khác.
* Lỗi (defect) thường xảy ra khi phần mềm (software) hoặc môi trường bị thay đổi.
* Mức độ kiểm thử hồi quy (regression testing) dựa trên nguy cơ (risk) của lỗi (defect) trong phần mềm (software).
* Kiểm thử hồi quy (regression testing) được thực hiện ở mọi giai đoạn kiểm thử (test level), bao gồm cả chức năng (functional), phi chức năng (non-functional) và kiểm thử cấu trúc (structural).
* Bộ kiểm thử hồi quy được sử dụng nhiều lần nên có thể làm chậm quá trình phát triển, vì vậy, nên tối ưu bằng cách sử dụng automation.

**Link refer:**

https://viblo.asia/p/phan-biet-su-khac-nhau-giua-bug-defect-failure-va-error-trong-kiem-thu-phan-mem-Az45bpPoZxY

https://techblog.vn/retesting-va-regression-testing-tester-nen-thuc-hien-regression-testing-bao-nhieu-lan