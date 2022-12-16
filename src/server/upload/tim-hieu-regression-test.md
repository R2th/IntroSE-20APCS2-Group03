**1. Regression Test là gì?**

Khi có những thay đổi được thực hiện trong một phần code do sửa lỗi hay thực hiện những yêu cầu thay đổi, có thể vô tình ảnh hưởng đến hoạt động của các phần code khác trong cùng một thành phần, trong các thành phần khác của cùng một hệ thống hoặc thậm chí trong các hệ thống khác. Các thay đổi có thể là thay đổi môi trường, chẳng hạn như phiên bản mới của hệ điều hành
hoặc hệ quản trị cơ sở dữ liệu. Những ảnh hưởng không mong muốn như vậy được gọi là Regressions.
Regression Test bao gồm việc thực hiện các bài kiểm tra để phát hiện các ảnh hưởng không mong muốn như vậy.

**2. Tại sao lại Regression Test?**

![](https://images.viblo.asia/5eb8141e-4e2c-44fd-aa52-55eeba26c77b.jpg)

Regression Test được bắt đầu khi một lập trình viên sửa bất kỳ lỗi nào hoặc thêm code mới cho chức năng mới vào hệ thống.

Đây là một thước đo chất lượng để kiểm tra xem code mới có làm ảnh hưởng đến code cũ không. Hầu hết nhóm kiểm thử thực hiện Regression test  vào thời gian cuối trong kế hoạch phát triển. Trong tình huống như vậy, chỉ cần kiểm tra khu vực ứng dụng bị ảnh hưởng để hoàn thành quá trình kiểm tra đúng hạn.

Kiểm tra này rất quan trọng khi có sự thay đổi, cải tiến liên tục được thêm vào trong ứng dụng. Chức năng mới không được ảnh hưởng tiêu cực đến code hiện có.
Regression Test là cần thiết để tìm các lỗi đã xảy ra do sự thay đổi trong code. Nếu thử nghiệm này không được thực hiện, sản phẩm có thể gặp các vấn đề nghiêm trọng trong môi trường thực tế và điều đó sẽ khiến khách hàng gặp rắc rối.

**3. Khi nào thì thực hiện Regression Test**

Việc thực hiện những thay đổi trong code là chắc chắn xảy trong qua quá trình phát triển hệ thống do đó Regression Test phải là một phần của Chu kỳ phát triển hệ thống và phải được xem xét trong Test Estimation.

Regression Test thường được thực hiện sau khi xác định các thay đổi hoặc chức năng mới nhưng điều này không phải luôn luôn như vậy. Đối với bản phát hành mất nhiều tháng để hoàn thành, Regression Test phải được kết hợp trong quy trình kiểm thử hàng ngày. Đối với các bản phát hành hàng tuần, Regression Test có thể được thực hiện khi Kiểm tra chức năng  đối với các thay đổi.

**4. Regression Test có thể thực hiện thủ công không?**

Để thực hiện việc Regression Test chúng ta có cần một công cụ?
Regression Test được thực hiện như thế nào?
Thử nghiệm này có thể được thực hiện theo cách thủ công không?

Thực hiện kiểm tra là một hành động đơn giản sử dụng các trường hợp thử nghiệm của bạn và thực hiện các bước đó trên AUT, cung cấp dữ liệu thử nghiệm và so sánh kết quả thu được trên AUT với kết quả mong đợi được đề cập trong các trường hợp thử nghiệm.

Tùy thuộc vào kết quả, chúng ta thiết lập trạng thái của trường hợp thử nghiệm đạt hoặc không đạt. Việc thực hiện kiểm tra đơn giản như vậy do đó không bắt buộc phải có công cụ đặc biệt để thực hiện Regression Test.

**5. Công cụ Regression Test tự động**

Regression Test  tự động là lĩnh vực chúng ta có thể tự động hóa hầu hết các công việc kiểm tra. Chúng ta chạy tất cả các trường hợp thử nghiệm đã thực thi trước đó trên một bản dựng mới.

Điều này có nghĩa là chúng ta có sẵn một bộ trường hợp thử nghiệm và việc chạy các trường hợp thử nghiệm này theo cách thủ công rất tốn thời gian. Chúng ta biết kết quả mong đợi, vì vậy việc tự động hóa các trường hợp thử nghiệm này sẽ tiết kiệm thời gian và là một phương pháp Regression Test hiệu quả. Mức độ tự động hóa phụ thuộc vào số lượng các trường hợp thử nghiệm sẽ vẫn áp dụng.

Nếu các trường hợp thử nghiệm thay đổi theo thời gian, phạm vi ứng dụng tiếp tục tăng và khi đó việc tự động hóa quy trình hồi quy sẽ rất lãng phí thời gian.

Hầu hết các công cụ Regression Test là loại ghi và phát lại. Bạn sẽ ghi lại các trường hợp thử nghiệm bằng cách điều hướng qua AUT (ứng dụng đang thử nghiệm) và xác minh xem kết quả mong đợi có đến hay không.

Các công cụ phổ biến kiểm tra chức năng và hồi quy là:
* Selenium
* Katalon Studio
* AdventNet QEngine
* Regression Tester
* vTest
* Watir
* actiWate
* Rational Functional Tester
* SilkTest
* TimeShiftX

**6. Các loại Regression Test**

Dưới đây là các loại Regression Test khác nhau:

* Unit Regression

Unit Regression được thực hiện trong giai đoạn Unit Testing và code được kiểm tra một cách riêng biệt, tức là mọi phụ thuộc vào đơn vị cần kiểm tra đều bị chặn để đơn vị có thể được kiểm tra riêng lẻ mà không có bất kỳ sự khác biệt nào.

* Partial Regression

Partial Regression được thực hiện để xác minh rằng code hoạt động tốt ngay cả khi các thay đổi đã được thực hiện trong code và đơn vị đó được tích hợp với code không thay đổi hoặc code đã tồn tại.

* Complete Regression

Complete Regression được thực hiện khi một thay đổi trong code  được thực hiện trên một số modules  và nếu những thay đổi ảnh hưởng đến những modules khác. Toàn bộ sản phẩm được hồi quy để kiểm tra bất kỳ thay đổi nào do code đã thay đổi.

**7. Kĩ thuật Regression Test**

Dưới đây là các kỹ thuật Regression Test khác nhau.

![](https://images.viblo.asia/2d5804bc-e8dd-4395-9045-d293c1236d38.jpeg)


* Retest all

Như chính tên gọi của nó, toàn bộ test case trong bộ test được thực thi lại để đảm bảo rằng không có lỗi nào xảy ra do thay đổi code. Đây là một phương pháp tốn kinh phí vì nó đòi hỏi nhiều thời gian và nguồn lực hơn so với các kỹ thuật khác.


* Regression Test Selection

Trong phương pháp này, các trường hợp thử nghiệm được chọn từ bộ thử nghiệm để được thực thi lại. Không phải toàn bộ phần mềm được thực thi lại. Việc lựa chọn các trường hợp kiểm thử được thực hiện trên cơ sở thay đổi code trong modules.

Các trường hợp kiểm thử được chia thành hai loại, một là các trường hợp kiểm thử có thể tái sử dụng và một loại khác là các trường hợp kiểm thử lỗi thời. Các trường hợp kiểm thử có thể tái sử dụng có thể được sử dụng trong các chu kỳ hồi quy trong tương lai trong khi các trường hợp lỗi thời không được sử dụng trong các chu kỳ hồi quy sắp tới.

* Test case Prioritization

Các trường hợp kiểm thử có Mức độ ưu tiên cao được thực thi đầu tiên so với các trường hợp có mức độ ưu tiên trung bình và thấp. Mức độ ưu tiên của trường hợp thử nghiệm phụ thuộc vào mức độ nghiêm trọng và tác động của nó đối với sản phẩm cũng như chức năng của sản phẩm được sử dụng thường xuyên hơn.


* Hybrid
Kỹ thuật lai là sự kết hợp giữa Regression Test Selection và Test case Prioritization. Thay vì chọn toàn bộ bộ thử nghiệm, chỉ chọn các trường hợp thử nghiệm được thực thi lại tùy thuộc vào mức độ ưu tiên của chúng.

Phần kết luận
Regression Test là một trong hoạt động kiểm thử quan trọng vì nó giúp cung cấp một sản phẩm chất lượng bằng cách đảm bảo rằng bất kỳ thay đổi nào trong code dù nhỏ hay lớn đều không ảnh hưởng đến chức năng hiện có hoặc cũ.

Rất nhiều công cụ tự động hóa có sẵn để tự động hóa các trường hợp kiểm thử hồi quy, tuy nhiên, một công cụ nên được chọn theo yêu cầu của dự án. Một công cụ phải có khả năng cập nhật bộ kiểm thử vì bộ kiểm tra hồi quy cần được cập nhật thường xuyên.