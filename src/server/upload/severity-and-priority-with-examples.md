# 1. Severity  - Mức độ nghiêm trọng 
Mức độ nghiêm trọng là mức độ mà lỗi có thể ảnh hưởng đến phần mềm. Hay nói cách khác mức độ nghiêm trọng xác định tác động của 1 bug đối với hệ thống.

Ví dụ: App hoặc trang web gặp sự cố khi một link từ xa được click,  việc người dùng click vào link là rất hiếm nhưng tác động của nó tới ứng dụng là nghiêm trọng. Vậy nên bug này có severity là cao nhưng priority là thấp

Mức độ nghiêm trọng có thể được chia thành các loại như dưới đây:
- Critical: Lỗi dẫn đến dừng hẳn  một hệ thống hoàn chỉnh hoặc 1 hoặc nhiều thành phần của hệ thống  và là nguyên nhân gây ra tham nhũng data trên diện rộng. Chức năng bị lỗi không thể sử dụng được và không có phương pháp thay thế chấp nhận được để đạt được kết quả mong muốn thì mức độ nghiêm trọng là Critical.
- Major: Lỗi dẫn đến dừng hẳn  một hệ thống hoàn chỉnh hoặc 1 hoặc nhiều thành phần của hệ thống  và là nguyên nhân gây ra tham nhũng data trên diện rộng. Chức năng bị lỗi không thể sử dụng được nhung có phương pháp thay thế chấp nhận được để đạt được kết quả mong muốn thì mức độ nghiêm trọng là Major.
- Moderate: Lỗi không dẫn đến dừng hệ thống, nhưng là nguyên nhân làm cho hệ thống làm ra kết quả không chính xác, không đầy đủ hoặc không đồng nhất thì mức độ nghiêm trọng là Moderate
- Minor: Lỗi không dẫn dến dừng hệ thống và không làm ảnh hưởng đến khả năng sử dụng của hệ thống sau khi fix bug thu được kết quả như mong muốn thì mức độ nghiêm trọng được ở đây là minor.
- Cosmetic: Lỗi liên quan đến sự cải thiện của hệ thống . Trong đó các chỉ thay đổi về giao diện hay và các trường thì mức độ nghiêm trọng ở đây là Cosmetic
# 2. Priority  - Mức độ ưu tiên
Priority xác định thứ tự mà chúng ta sẽ xử lý bugs. Chúng ta có thể fix nó luôn hay đợi để fix sau? QA/tester sẽ setting  trạng thái priority để dev có thể xác định được khung thời gian fix bugs. Nếu  trạng thái priority càng cao thì dev càng phải ưu tiên fix sớm.  Trạng thái priority được setting dựa trên yêu cầu của khách hàng

Ví dụ: Khách hàng cần release trang web vào ngày mai, nhưng tên trang web đang bị sai, thì bug đó được gắn độ ưu tiên cao, mặc dù mức độ nghiêm trọng thấp.

Priority có các loại sau:
- Low: Lỗi là một sai sót nhỏ cần được fix, nhưng việc fix bug có thể bị hoãn lại cho đến khi các lỗi nghiêm trọng hơn được fix xong 
- Medium: Lỗi cần được fix trong quá trình phát triển, và nó có thể đợi đến khi build bản mới 
- High: Lỗi cần phải được giải quyết sớm nhất có thể, vì lỗi làm ảnh hưởng đến ứng dụng hoặc trang web khiến cho hệ thống không thể sử dụng được cho đến khi fix xong

# 3. Ví dụ một số trường hợp liên quan đến Priority và Severity

- High Priority & High Severity:  Có một lỗi xảy ra trong chức năng cơ bản của ứng dụng và không cho người dùng sử dụng
Ví dụ: Trang web đọc báo, không cho phép người dùng click xem chi tiết nội dung một link báo thì bug này là High Priority & High Severity

- High Priority & Low Severity: Các lỗi chính tả ở trang bìa hoặc title của 1 app, ứng dụng 

- High Severity & Low Priority: Lỗi này xảy ra là khi người dùng không thể truy cập được vào chức năng thông qua một linktext mà hầu như người dùng không bao giờ sử dụng

- Low Priority and Low Severity: bất kì giao diện hoặc chính tả nào trong 1 đoạn hoặc nội dung không phải trên trang bìa hoặc tiêu đề

nguồn: http://tryqa.com/what-is-the-difference-between-severity-and-priority/