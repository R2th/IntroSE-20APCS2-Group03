Thường thì khi một tổ chức, công ty lên kế hoạch và thực hiện một chiến lược kiểm thử tự động hóa (automation), họ tin rằng họ đang thực hiện kiểm thử liên tục (continuous testing). Họ đã lầm.

Kiểm thử tự động hóa chắc chắn là một trong những thành phần quan trọng nhất của kiểm thử liên tục. Nhưng việc triển khai kiểm thử liên tục, bắt đầu với chiến lược kiểm thử nhiều lớp - bao gồm tất cả các loại và mức độ kiểm thử được yêu cầu: Unit, Integration, Functional, Exploratory, và Automated.  Kiểm thử liên tục cũng phải có một chiến lược để kết hợp trong suốt quá trình phát triển liên tục.

Kiểm tra liên tục yêu cầu phân tích rủi ro kinh doanh và kỹ thuật liên tục, cũng như cải tiến quy trình và tự động hóa trong suốt quá trình phát triển. Điều quan trọng không kém là phát triển một nền văn hóa trong đó chất lượng là trách nhiệm chung của mọi thành viên trong team. 

![](https://images.viblo.asia/9c9145f0-04d4-4b1f-a338-05d2e548fec2.png)


Dưới đây là bốn bước chính cho một chiến lược kiểm thử liên tục hiệu quả, cùng với những điều bạn cần biết về mỗi bước.

## 1. Hợp lý hóa quy trình kiểm thử 

Điều này có ba thành phần: tập trung vào rủi ro kinh doanh, xác định và giảm thiểu tắc nghẽn cổ chai, và tối ưu hóa các kiểm thử của bạn.

Mục tiêu quan trọng cuối cùng của DevOps, mục tiêu của kiểm thử liên tục, là giảm thiểu rủi ro kinh doanh, bao gồm cả rủi ro khách hàng và rủi ro tổ chức.

Rủi ro khách hàng liên quan đến việc hiểu quy trình nào trong ứng dụng là quan trọng nhất đối với khách hàng và việc lập kế hoạch kiểm thử rủi ro [(Risk base testing)](https://viblo.asia/p/continuous-testing-la-gi-E375zx0RZGW) của bạn.

Rủi ro tổ chức liên quan đến việc hiểu được sự phức tạp của môi trường kinh doanh cũng như bản thân sản phẩm. Ví dụ, là người đưa ứng dụng dạng này đầu tiên lên kinh doanh, hay là chất lượng, ổn định của sản phẩm được ưu tiên hơn. Khi rủi ro kinh doanh tổng thể được đánh giá chính xác, bạn nên lập bản đồ các yêu cầu, thành phần ứng dụng và các kiểm thử đối với những rủi ro đó.

Điều quan trọng là xác định và giảm thiểu các nút thắt cổ chai; chúng cản trở cả chất lượng lẫn tốc độ. Các ràng buộc đối với quy trình kiểm thử có thể được tìm thấy xuyên suốt, từ các yêu cầu thông qua kiểm tra hậu kỳ. Một ví dụ như là: Tester không nắm rõ được quy trình, requirement của dự án khi không được mời vào các cuộc họp đột xuất hoặc cuộc họp giải quyết các chức năng mới.

## 2. Kiểm thử tự động trong quá trình CI

Kiểm thử liên tục yêu cầu tự động hóa kiểm thử trong suốt quá trình phân phối/delivery. Tự động hóa kiểm thử làm tăng tốc độ triển khai và giảm rủi ro vốn có trong việc phân phối liên tục - đặc trưng của mô hình Agile.

Nhưng tự động hóa trong khuôn khổ kiểm thử liên tục không chỉ đơn thuần là phát triển và duy trì một bộ kịch bản kiểm thử tự động. Trên thực tế, các bộ kiểm thử hồi quy tự động, đặc biệt là những bộ chạy mất nhiều thời gian thường để qua đêm, tạo ra tắc nghẽn trong quá trình triển khai liên tục. Kiểm thử liên tục yêu cầu một chiến lược tự động hóa kiểm thử nhằm nâng cao, thay vì cản trở, quá trình phân phối liên tục.

Kiểm thử tự động vẫn tiếp tục cho tới khi được đưa lên sản phẩm chính thức. Ở giai đoạn này, nó như là chốt chặn để tìm thấy bất kỳ vấn đề nào trước khi Khách hàng tìm ra chúng.

Trong chiến lược kiểm thử liên tục của bạn, tự động hóa phải được thiết kế để chạy hiệu quả trong khi cung cấp kết quả đáng tin cậy, nhất quán, có thể lặp lại. Chiến lược tự động hóa của bạn phải được phát triển tốt, bao gồm kế hoạch bảo trì kiểm thử và lịch trình các kịch bản kiểm thử tự động sẽ chạy tại các thời gian cụ thể tương ứng với các mốc bàn giao, phân phối sản phẩm.

![](https://images.viblo.asia/8114d81f-b0f8-4369-9a11-80e28d11e72c.png)


## 3. Shift left 

Để thực hiện chiến lược kiểm thử liên tục thành công, điều quan trọng là nhóm làm việc phải bám chặt quy trình Shift left testing - chủ trương kiểm thử càng sớm càng tốt trong quá trình phát triển. Kỹ thuật chất lượng là thực hành xây dựng chất lượng trong suốt quá trình phát triển; nó bắt đầu với sự phát triển và tập trung vào việc ngăn ngừa các khiếm khuyết, thay vì tìm ra chúng. Shift left testing cho phép xây dựng kỹ thuật chất lượng và kiểm tra liên tục.

Test-driven development (**TDD**), behavior-driven development (**BDD**), và acceptance test-driven development (**ATDD**) là những kỹ thuật trong Shift left testing.

Trong TDD, Dev và Tester sẽ làm việc cùng nhau để thiết kế cho bộ đề kiểm thử trước, sau đó Dev phát triển ứng dụng sao cho bộ kiểm thử này được PASSED. BDD là TDD với thiết kế tập trung vào hành vi của khách hàng. ATDD tập trung vào thiết kế lấy khách hàng làm trung tâm, trong đó Dev, Tester và Product Owner sẽ chịu trách nhiệm làm việc cùng nhau trong các buổi thiết kế tài liệu. 

Điều quan trọng là việc Shift testing phải được phát triển với những phạm vi như thế nào. Vì nguyên nhân gốc rễ của nhiều vấn đề về hiệu suất và bảo mật có thể được tìm thấy trong thiết kế đầu vào, điều quan trọng là phải sớm tìm ra các lỗi, trước khi thiết kế được hoàn thiện. Khi bạn không tìm thấy những khiếm khuyết đó cho đến khi muộn trong quá trình, chúng sẽ trở nên phức tạp và tốn kém hơn nhiều để sửa chữa.


Tìm hiểu thêm về TDD, BDD và ATDD ở [đây](https://www.browserstack.com/guide/tdd-vs-bdd-vs-atdd).

## 4. Chịu trách nhiệm về chất lượng

Bước này là nền tảng của chiến lược kiểm thử liên tục. Trừ khi tất cả các thành viên trong nhóm chấp nhận vai trò của họ trong việc đảm bảo chất lượng dự án, nếu không sẽ không thể thực hiện thành công các yếu tố khác.

Chịu trách nhiệm về chất lượng đòi hỏi sự thay đổi tư duy phải được dẫn dắt ngay từ đầu. Mỗi thành viên trong nhóm của bạn phải hiểu bản chất của vai trò của họ trong kỹ thuật chất lượng. Ngày nay, việc thay đổi, thích nghi theo mô hình Agile trong các doanh nghiệp, công ty lớn đang là xu thế. Vì thế việc đào tạo, thay đổi tư duy mindset của mọi thành viên là điều tối quan trọng trước khi bắt đầu một dự án thực tế.

![](https://images.viblo.asia/b440d95e-dcd3-4222-9048-2713d72b59e0.jpg)

---
Nguồn tham khảo:

https://techbeacon.com/app-dev-testing/4-elements-highly-effective-continuous-testing-strategy

https://www.browserstack.com/guide/tdd-vs-bdd-vs-atdd

https://viblo.asia/p/shift-left-testing-bi-quyet-cho-phan-mem-thanh-cong-oOVlY14zl8W

https://viblo.asia/p/cicd-pipeline-4P856OXOKY3