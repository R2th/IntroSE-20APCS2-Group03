![](https://images.viblo.asia/7bd195ec-3364-4287-b5d7-2025ba339a1e.jpg)

Thuật ngữ **`REFACTORING`** (tái cấu trúc) chủ yếu được sử dụng để *cleanup* ("*dọn dẹp*") hoặc *redesign* (thiết kế lại) các đoạn mã (code).

Trong bài viết này, chúng ta sẽ đi tìm hiểu tổng quan về **REFACTORING**, sự cần thiết của **Code Refactoring** và xem xét tác động, sự ảnh hưởng của nó đối với các thành viên trong đội phát triển dự án. Đặc biệt, chúng ta sẽ cùng nhau trao đổi về câu hỏi: "*Với một Tester/QA thì tại sao cần biết về Code refactoring?*"

## Refactoring code là gì?
Đầu tiên, chúng ta cần hiểu REFACTORING là gì?

**Refactoring** về cơ bản nó là một quá trình cải thiện code, có thể cải thiện cả cơ sở dữ liệu trong khi vẫn duy trì các chức năng hiện có. Ý tưởng là chuyển đổi code không hiệu quả, hay code phức tạp thành code hiệu quả hơn, đơn giản, tốt hơn và dễ dàng hơn.

 Vậy "*Tại sao chúng ta cần quan tâm đến việc Code refactoring?"* trong khi chúng ta luôn duy trì chức năng ban đầu của ứng dụng hay module đó. Có một vài lý do mà một module hay một đoạn code cụ thể cần được tái cấu trúc lại, như:
- Code smells (code "*lởm*")
- Technical debt ("*nợ*" kỹ thuật)

### Code smells
**Code smells** cho thấy có những dấu hiệu nghiêm trọng có thể xảy ra với những đoạn code hiện có.

Một số code smells phổ biến:
- Vẫn còn những đoạn code dư thừa hoặc giống hệt nhau
- Khai báo ra những biến (variables) nhưng chúng lại không được sử dụng ở bất cứ đâu trong chương trình
- Thiết kế code quá phức tạp và dài dòng
- Sự tồn tại của quá nhiều điều kiện và vòng lặp, có khả năng "đập đi xây lại" khi có điều kiện thay đổi
- Xây dựng đoạn code có khả năng bị thay đổi khi có những thay đổi từ đoạn code hay module khác
- ...

Code smells càng rõ ràng hơn trong thời gian phát triển về sau của dự án. Khi ứng dụng hoặc hệ thống càng phát triển, đến cuối cùng các smell code này sẽ ảnh hưởng đến việc phát triển và bảo trì code của chương trình, thậm trí ảnh hưởng đến hiệu năng của hệ thống, hoặc những tình huống "tồi tệ" hơn mà chưa thể lường trước được.

### Technical debt
**Technical debt**: thể hiện nỗ lực cần thiết để khắc phục các sự cố /lỗi còn tồn tại trong code khi ứng dụng được phát hành. Nói một cách đơn giản - đó là sự khác biệt (về lỗi) giữa những gì được mong đợi và những gì được giao.

Trong quá trình phát triển phần mềm, với sự giới hạn về mặt thời gian và nguồn lực có sẵn, thông thường chúng ta sẽ sử dụng cách ngắn nhất để nhanh chóng đạt được kết quả mong muốn.

Ví dụ cụ thể:
Giả sử 1 tính năng được thêm vào một Module hiện có.
Sau khi trao đổi và thảo luận, đội dự án  thu hẹp và đưa ra 2 cách tiếp cận để phát triển tính năng này
- Cách tiếp cận A: dành 2 sprint để deliver, đây sẽ là phương pháp đáp ứng được mục tiêu dài hạn và được phê duyệt
- Cách tiếp cận B: chỉ mất 5 ngày có thể deliver được tính năng này, bằng cách hard-code để thiết kế và hoàn thành module và phục vụ được chỉ trong thời gian ngắn

Nếu đội phát triển đang chịu áp lực giới hạn về mặt thời gian thì có thể chọn theo cách tiếp cận B ở thời điểm hiện tại, và về lâu dài thì sẽ áp dụng cả cách tiếp cận A cho những phần còn tồn đọng. Với cách này, đội phát triển chỉ có tạo ra các khoản "Nợ kỹ thuật - Technical debt" cho chính họ mà thôi.

Nói một cách đơn giản "Nợ kỹ thuật" trong phát triển phần mềm đề cập đến việc bổ sung làm lại (rework) hoặc chi phí cần thiết để đưa ra các bản sửa lỗi phù hợp hoặc thực hiện mọi thứ theo đúng cách thức.

Những hệ thống kế thừa theo thời gian những "khoản *Nợ kỹ thuật*" thường có xu hướng ngày càng khổng lồ. điều này khiến ứng dụng dễ bị lỗi, khó hỗ trợ và bảo trì.

## Vậy vì sao QA lại cần biết về Code Refactoring?
### Unit Testers/ Developers
Trong quá trình refactor code, code mới đang được thêm vào, code cũ bị thay thế hay chỉnh sửa đi, vì vậy những Unit tests hiện tại có thể fail. Ngoài ra với những hệ thống cũ, có thể không có Unit test được thực hiện cả, vậy nên Unit test sẽ được tạo và thực hiện từ đầu trong chương trình.
### Testers
Khi 1 tính năng (feature) đang được refactor (không thêm bất kỳ tính năng mới nào), hiểu rằng sau khi những thay đổi cần thiết được thực hiện, hầu hết các chức năng chính cho người dùng cuối sẽ được giữ nguyên.
- Với 1 Tester, việc tái cấu trúc mã sẽ chuyển thành việc kiểm thử chuyên sâu (in-depth testing) và kiểm thử hồi quy (regression testing). Trong kiểm thử chuyên sâu, cần kiểm thử tất cả các luồng người dùng hiện có để đảm bảo rằng tất cả chức năng vẫn hoạt động ổn định như trước. Kiểm thử hồi quy của toàn bộ ứng dụng (hoặc các khu vực bị ảnh hưởng) là cần thiết để đảm bảo rằng việc nâng cấp các module không vô tình phá vỡ hay làm ảnh hưởng tới chức năng của các module khác.
- Kiểm thử chấp nhận người dùng (User acceptance test) là rất quan trọng, và các kiểm thử này cần phải vượt qua trước khi ững dụng sẵn sàng được phát hành.
- Ngoài ra, bất kỳ kiểm thử nào khác được yêu cầu như Kiểm thử độ chịu tải (Load test), Kiểm thử hiệu năng (Performance test), Kiểm thử bảo mật (Security test), ... cũng sẽ được thực hiện.
### Automation Test Engineer
Refactoring code có thể khiến các đoạn automation scripts chức năng (functional) và phi chức năng (non-functional) bị lỗi.
Điều này có thể xảy ra do một số nguyên nhân sau:
- Nếu có những thay đổi nhỏ, nó sẽ chuyển hướng những thay đổi đã được thêm hoặc xóa trong quá trình refactor code, và các tập automation scripts sẽ fail khi chạy và cần được cập nhật lại.
- Trong quá trình refactor code, nếu các đối tượng (objects) bị thay đổi, thì các automation scripts dựa vào đối tượng đó cũng sẽ fail và cần được cập nhật lại.

Lời khuyên dành cho chúng ta rằng, các tập functional automation scripts chỉ được thiết lập khi một tính năng đã ổn định, nếu không nó sẽ dẫn đến rất nhiều thay đổi khi tính năng đó phát triển. Là một kỹ sư kiểm thử tự động, các kiểm thử viên cũng cần suy nghĩ như một nhà phát triển (developers) nhằm tạo ra code "*sạch*" và dễ bảo trì.

### Test Leaders/ QA Leaders
- Test Leader/ QA Leader có thể được yêu cầu làm việc cùng với các thành viên của đội dự án bao gồm các nhà phát triển, nhà phân tích sản phẩm, và thậm chí là các bên liên quan để đảm bảo rằng việc Lập kế hoạch kiểm thử cho các dự án đó được thực hiện cẩn thận.
- Điều quan trọng nhất là phải hiểu rõ các chức năng hiện có, dựa vào đó với luồng người dùng, luồng nghiệp vụ và Kiểm thử chấp nhận người dùng cần phải được ghi lại thành tài liệu. Khi refactor code, tất cả các kịch bản này cần được xác nhận lại cùng với Kiểm thử hồi quy các khu vực bị ảnh hưởng, hay thậm chí là Kiểm thử toàn bộ chương trình.
- Hãy chủ động trong khi Lập kế hoạch mục tiêu kiểm thử và Lập kế hoạch kiểm thử. Nếu bạn dự đoán được yêu cầu của nhiều môi trường kiểm thử và nhiều công cụ kiểm thử mới thì hãy gửi yêu cầu sớm để ngăn chặn bất kỳ vấn đề gì khi giai đoạn kiểm thử bắt đầu.
- Đừng *ngần ngại* trao đổi/ góp ý với các thành viên dự án về các vấn đề có thể xảy ra.


### Tài liệu tham khảo
1, [Code Refactoring: What You Need to Know About It](https://www.softwaretestinghelp.com/code-refactoring/)

2, [Refactoring](https://refactoring.guru/refactoring)