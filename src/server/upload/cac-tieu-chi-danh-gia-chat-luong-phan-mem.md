![](https://images.viblo.asia/6e9126e7-127b-4794-808b-692b5e8cf2fa.png)
## 1. Functional Suitability
Tính phù hợp về chức năng đạt được khi hệ thống cung cấp các chức năng đáp ứng được các yêu cầu đã nêu khi được sử dụng trong các điều kiện quy định. Về cơ bản là liệu hệ thống có làm được những gì mà chúng ta mong muốn nó làm hay không?

Ba thuộc tính được liệt kê:
- Tính đầy đủ của chức năng  (Functional completeness)
- Tính đúng đắn (Functional correctness)
- Tính thích hợp (Functional appropriateness)

Nói cách khác, phù hợp về mặt chức năng là hệ thống đáp ứng tất cả các yêu cầu, bao quát các yêu cầu một cách chính xác và chỉ thực hiện những việc cần thiết và thích hợp để hoàn thành nhiệm vụ.

Một số thử nghiệm thuộc phạm vi kiểm thử chức năng như: Regression testing, System testing, Unit testing, Procedure testing...
 ## 2. Performance Efficiency
Hiệu suất hoạt động liên quan đến cách hệ thống hoạt động trong các tình huống nhất định với các kích thước tải khác nhau. Một hệ thống có hiệu suất cao sẽ nhanh chóng, có thể mở rộng và ổn định ngay cả khi có một số lượng lớn người dùng đồng thời.

Ba thuộc tính được liệt kê:
- Hành vi thời gian (Time behavior)
- Sử dụng tài nguyên (Resource utilization)
- Công suất (Capacity)

Hành vi thời gian (Time behavior) là mức độ đáp ứng và thời gian xử lý cũng như tốc độ thông lượng đáp ứng các yêu cầu. Resource utilization đề cập đến số lượng tài nguyên mà nó sử dụng trong khi hoạt động. Công suất đề cập đến mức độ đáp ứng các giới hạn tối đa của sản phẩm hoặc thông số hệ thống.

Để phân tích các thuộc tính này, có một số loại kiểm tra hiệu suất mà chúng ta có thể thực hiện như: Load tests, endurance, peak, volume testing...
## 3. Compatibility
Khả năng tương thích đề cập đến mức độ mà phần mềm tương thích với phần cứng, trình duyệt, hệ điều hành...

Các thuộc tính được liệt kê bao gồm:
- Sự đồng tồn tại (Co-existence)
- Khả năng tương tác (Interoperability)

Đồng tồn tại có nghĩa là mức độ mà nó có thể hoạt động hiệu quả trong khi chia sẻ môi trường và nguồn lực cùng với các sản phẩm khác, mà không có tác động bất lợi đến bất kỳ sản phẩm nào. Khả năng tương tác có nghĩa là mức độ mà hai hoặc nhiều hệ thống, sản phẩm hoặc thành phần có thể trao đổi thông tin và sử dụng thông tin.

Các thử nghiệm có thể được thực hiện để đảm bảo các thuộc tính chất lượng này là: Compliance. Compatibility, Interoperability và Conversion tests.
## 4. Usability
Khả năng sử dụng được đề cập đến sự dễ dàng mà người dùng tương tác với giao diện.

Các thuộc tính của chất lượng này bao gồm:
- Khả năng hoạt động (Operability - mức độ vận hành và kiểm soát các thuộc tính)
- Khả năng chống lỗi người dùng (User-error protection - giao diện bảo vệ tốt như thế nào và ngăn người dùng mắc lỗi).

Một hệ thống có khả năng sử dụng hệ thống cao nếu người dùng có xu hướng không mắc nhiều lỗi, có thể học cách sử dụng hệ thống nhanh chóng, thực hiện các tác vụ kịp thời và hài lòng với nó về tổng thể.

Kiểm tra khả năng sử dụng bao gồm: UX testing và Accessibility tests ( như Localization và Internationlization)...
## 5. Reliability
Độ tin cậy đề cập đến xác suất hoạt động không có lỗi trong một khoảng thời gian xác định trong một môi trường cụ thể.

Các thuộc tính chất lượng của nó bao gồm:
- Mức độ trưởng thành (Manturity - mức độ đáp ứng các nhu cầu về độ tin cậy)
- Tính khả dụng (Availability - mức độ có thể tiếp cận được)
- Khả năng phục hồi (Recoverability - mức độ có thể trở lại trạng thái mong muốn trước đó sau khi gián đoạn hoặc hỏng hóc)
- Khả năng chịu lỗi (Fault tolerance - mức độ có thể hoạt động và đối phó với các dự hiện diện của lỗi phần cứng hoặc phần mềm).

Một số thử nghiệm trong một kiểm tra độ tin cậy bao gồm: Backup/ recovery testing và disaster recovery testing.
## 6. Security
Bảo mật trong phần mềm là mức độ bảo vệ thông tin, dữ liệu để người dùng hoặc các thực thể khác có mức độ truy cập dữ liệu phù hợp với sự cho phép của họ. Nói cách khác, chỉ những người được phép truy cập dữ liệu mới có thể truy cập nó, ngăn chặn các vụ hack tiềm ẩn.

Các thuộc tính của bảo mật bao gồm:
- Tính bảo mật (Confidentiality)
- Tính toàn vẹn (Integrity)
- Tính không từ chối (Non-repudiation)
- Trách nhiệm giải trình (Accountability)
- Tính xác thực (Authenticity)

Tính bảo mật đề cập đến mức độ dữ liệu chỉ có thể truy cập được đối cới những người có thẩm quyền truy cập dữ liệu đó. Tính toàn vẹn là mức độ mà nó bảo vệ tính bí mật nói trên. Tính không từ chối là mức độ nó có thể chứng minh khi nào và ở đâu một hành động hoặc sự kiện đã diễn ra để không thể từ chối sau này. Trách nhiệm giải trình là mức độ mà các hành động của một đơn vị có thể được truy tìm duy nhất đối với đơn vị. Cuối cùng, tính xác thực là mức độ mà một tài nguyên có thể được chứng minh là những gì nó tuyên bố.

Một số thử nghiệm phân tích các thuộc tính bảo mật này là: Penetration tests, Vulnerability tests, Ethical hacking, Statics analysis.
## 7. Maintainability
Yếu tố chấy lượng này khá đơn giản. Nó đề cập đến mức độ dễ dàng để duy trì hệ  thống bao gồm phân tích, thay đổi và kiểm tra nó.

Các thuộc tính liên quan đến khả năng bảo trì là:
- Tính mô-đun (Modularity)
- Khả năng tái sử dụng (Analyzability)
- Khả năng sửa đổi (Modifiability)
- Khả năng kiểm tra (Testability)

Mô-đun đề cập đến mức độ mà nó được cấu tạo bởi các thành phần rời rạc sao cho sự thay đổi đối với một thành phần có tác động tối thiểu đến các thành phần khác. Khả năng tái sử dụng đề cập đến mức độ mà một tài sản có thể được sử dụng trong nhiều hệ thống hoặc trong việc xây dựng các tài sản khác. Khả năng phân tích đề cập đến mức độ chúng ta có thể đánh giá tác động của một sự thay đổi dự định, để chuẩn đoán các khiếm khuyết hoặc xác định các phần chúng ta nên sửa đổi. Khả năng sửa đổi là mức độ có thể sửa đổi mà không gây ra các khuyết tật hoặc làm giảm chất lượng hiện có. Cuối cùng, khả năng kiểm tra là mức độ có thể thiết lập các tiêu chí kiểm tra và các thử nghiệm có thể được thực hiện để xác định xem các tiêu chí đó đã được đáp ứng hay chưa.

Các thử nghiệm liên quan đến khả năng bảo trì bao gồm: Pair review, Static analysis, Alike checking...
## 8. Portability
Tính di động đề cập đến việc dễ dàng di chuyển ứng dụng từ môi trường này sang môi trường khác, chẳng hạn như chuyển từ Android KitKat sang Lollipop.

Ba thuộc tính được liệt kê:
- Khả năng cài đặt (Installability)
- Khả năng thay thế (Replaceability)
- Khả năng thích ứng (Adaptability)

Kiểm tra khả năng cài đặt được tiến hành để xem nó có thể được cài đặt hoặc gỡ cài đặt tốt như thế nào trong một môi trường cụ thể. Khả năng thay thế là khả năng ứng dụng được sử dụng thay thế ứng dụng khác cho cùng mục đích và trong cùng môi trường. Khả năng thích ứng đề cập đến khả năng thích ứng với các môi trường khác nhau.

***Tham khảo từ:** https://iso25000.com/index.php/en/iso-25000-standards/iso-25010?start=0*