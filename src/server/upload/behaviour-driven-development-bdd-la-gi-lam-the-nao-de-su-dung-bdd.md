# BDD là gì? 

Behaviour Driven Development (BDD) là một quá trình phát triển phần mềm có nguồn gốc từ Test Driven Development (TDD). BDD sử dụng các ví dụ để minh họa hành vi của hệ thống được viết bằng ngôn ngữ dễ đọc và dễ hiểu đối với tất cả mọi người tham gia vào quá trình phát triển. Những ví dụ này bao gồm: 

- Chuyển đổi thành thông số kỹ thuật thực thi. 
- Được sử dụng làm kiểm thử chấp nhận (acceptance test) 

# BDD - Các tính năng chính

Behavior Driven Development tập trung vào: 

* Cung cấp một quy trình và công cụ được chia sẻ để giao tiếp giữa các lập trình viên, các BAs và các bên liên quan để cộng tác phát triển phần mềm, với mục tiêu cung cấp sản phẩm có giá trị kinh doanh.

* Hệ thống nên làm và không nên làm cái gì dựa trên việc làm thế nào để thực hiện nó. 

* Cung cấp khả năng đọc và khả năng hiển thị tốt hơn.

* Xác minh không chỉ hoạt động của phần mềm mà còn đáp ứng được sự mong đợi của khách hàng.


# Nguồn gốc của BDD
Chi phí để khắc phục lỗi sẽ tăng lên gấp bội nếu lỗi không được phát hiện vào đúng thời điểm và được sửa  ngay khi được phát hiện. Hãy xem xét ví dụ sau.

![](https://images.viblo.asia/66083fa4-4b63-43bb-b519-9780a1ed8799.jpg)

Điều này cho thấy rằng trừ khi các yêu cầu được thu thập chính xác, sẽ rất tốn kém để sửa chữa lỗi do sự hiểu lầm các yêu cầu ở giai đoạn sau. Hơn nữa, sản phẩm cuối cùng có thể không đáp ứng được kỳ vọng của khách hàng.

Vậy phương pháp phát triển cần phải:  

*  Dựa trên các yêu cầu.

* Tập trung vào các yêu cầu trong suốt quá trình phát triển.

*  Đảm bảo rằng các yêu cầu được đáp ứng.

Một phương pháp phát triển có thể giải quyết các yêu cầu nêu trên là BDD. Do đó, BDD có thể: 

- Lấy ví dụ về các hành vi được mong đợi khác nhau của hệ thống.

- Cho phép viết các ví dụ bằng ngôn ngữ sử dụng các thuật ngữ nghiệp vụ  để đảm bảo sự hiểu biết dễ dàng của tất cả mọi người tham gia vào việc phát triển bao gồm cả khách hàng.

- Nhận các ví dụ được phê duyệt với khách hàng theo thời gian bằng các cuộc hội thoại.

- Tập trung vào các yêu cầu của khách hàng (ví dụ) trong suốt quá trình phát triển.

- Sử dụng ví dụ như kiểm thử chấp nhận (acceptance tests) 

# Nguyên tắc của BDD

Thông thường, việc xác định các hành vi trong BDD được thực hiện thông qua các user story. Đây là những kịch bản được viết ra bao gồm một số tiêu đề cơ sở tóm tắt ý định, một phần tường thuật mô tả ai và những gì cần tham gia trong việc đạt được yêu cầu story này và phần kịch bản mô tả một loạt các kịch bản cụ thể .
Mặc dù BDD không thực thi bất kỳ cú pháp hoặc định dạng cụ thể nào cho các user story, nhưng BDD đề xuất rằng nênchuẩn hóa một định dạng để tuân theo. Điều này sẽ đảm bảo rằng nhóm của bạn có thể tiếp tục thảo luận và sửa đổi các story một cách dễ dàng và nhiều thành viên trong nhóm có thể tạo ra những story mà không cần phải làm việc chặt chẽ với nhau.

Dưới đây là một định dạng user story điển hình được sử dụng trong các dự án BDD, theo đề xuất của Dan North, người được coi là sáng lập của BDD 

![](https://images.viblo.asia/4fbf80c9-fe01-41e8-98da-5b9705402b03.png)

Mở rộng trên mẫu này, Mr North cung cấp một ví dụ về user story đã sử dụng trong bài viết Giới thiệu BDD của ông:


![](https://images.viblo.asia/aef88796-b305-4d88-a899-e09e4bd1f960.png)

## Ubiquitous Language- Ngôn ngữ phổ biến

BDD tập trung nhấn mạnh tầm quan trọng của ngôn ngữ phổ biến, ngôn ngữ tham khảo chung như ngôn ngữ đặc tả (domain-specific language- DSL) . DSL phải được xác định rõ ràng và được sự đồng ý của tất cả các thành viên trong giai đoạn đầu của vòng đời phát triển. DSL cho phép dễ dàng giao tiếp về nghiệp vụ của dự án, và phải đơn giản và đủ mạnh để hỗ trợ thảo luận giữa tất cả các loại nhân sự, từ lập trình viên và trưởng nhóm cho khách hàng và giám đốc điều hành doanh nghiệp.

## Sử dụng công cụ chuyên dụng

BDD được hỗ trợ rất nhiều bởi các công cụ chuyên dụng hỗ trợ việc tạo và thực hiện các bộ kiểm thử ( testing suits) . Cũng giống như các công cụ kiểm tra tự động được sử dụng trong phát triển theo hướng kiểm thử (TDD) , các công cụ BDD sẽ thực hiện tương tự các kiểm thử tự động nhằm mục đích hợp lý hóa quy trình phát triển. Tuy nhiên, sự khác biệt lớn giữa các công cụ kiểm tra TDD và BDD là các công cụ BDD được liên kết chặt chẽ với DSL đã được xác định cho dự án. Như vậy, các đặc điểm kiểm tra bên trong các công cụ kiểm tra BDD điển hình sẽ nhằm sao chép trực tiếp ngôn ngữ và cụm từ từ các user story DSL đã được xác định.

Nhìn lại scenario 1 từ Dan North’s Account Holder withdraws cash dưới đây, chúng ta có thể hiểu được làm thế nào chuyển đổi kịch bản từ thực tế thành mã kiểm thử tự động ( sử dụng ngôn ngữ lập trình Ruby) 

![](https://images.viblo.asia/dced68ea-b831-45f6-85d3-a764d386f1d0.png)


Và dưới đây là giả mã kiểm thử kịch bản trong Ruby ( sử dụng Cucumber syntax) 


![](https://images.viblo.asia/96f4465c-b19c-4c0c-bb95-b3cd7bb298fa.png)


# Lợi ích của BDD 

- **Giảm lỗi hồi quy**: Với một bộ đầy đủ kiểm thử ( test suits) liên tục được thực hiện, và với kiểm thử mới luôn được bổ sung, BDD làm giảm đáng kể khả năng xảy ra lỗi hồi quy, vì  ở trạng thái giám sát và kiểm tra liên tục.
- **Cải thiện giao tiếp nhóm**: Sự phụ thuộc vào ngôn ngữ / DSL phổ biến được xác định rõ ràng có nghĩa là BDD có thể thường xuyên cải thiện giao tiếp trên toàn bộ nhóm, hoặc thậm chí giữa các tổ chức, vì có một cấu trúc chung cho các cụm từ và thuật ngữ khi thảo luận dự án.
# Bất lợi khi sử dụng BDD
- **Yêu cầu đặc tả trước khi phát triển**. BDD yêu cầu nhóm ngồi xuống và viết ra cả DSL và user story cho mỗi kịch bản riêng biệt hoặc tính năng trước khi viết code bắt đầu. Đối với rất nhiều nhóm, đặc biệt đối với các dự án lớn, điều này có thể là hạn chế, hoặc đối với nhóm nhỏ và dự án phát triển gấp, sẽ mất nhiều công sức và yêu cầu có thể khó khăn hơn. 
- **Dựa trên phản hồi liên tục từ bên ngoà**i: Việc giữ liên lạc với người dùng, khác hàng, chuyên gia có thể không phải là vấn đề đối với một số nhóm nhưng đối với một số tổ chức, việc yêu cầu liên hệ thường xuyên với bên ngoài có thể tác động tiêu cực đến thời gian phát triển. Trong trường hợp thông tin phản hồi được yêu cầu để đưa ra user story hoặc kịch bản mới trước khi kiểm thử được viết thì việc phát triển có thể bị ngừng trệ. 


Bài viết được dịch lại từ nguồn: 
- https://www.tutorialspoint.com/behavior_driven_development/behavior_driven_development_quick_guide.htm
- https://airbrake.io/blog/software-design/behavior-driven-development