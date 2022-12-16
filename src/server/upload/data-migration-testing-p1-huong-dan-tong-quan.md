### Tổng quan về Data Migration Testing

Chúng ta thường được nghe nói rằng một ứng dụng được chuyển đến một máy chủ (server) khác, công nghệ của ứng dụng được thay đổi, ứng dụng được cập nhật lên phiên bản mới hoặc chuyển sang máy chủ cơ sở dữ liệu (database server) khác ,...
* Điều này thực sự có ý nghĩa gì?
* Những gì được mong đợi từ testing team trong những tình huống này?

Từ quan điểm thử nghiệm, tất cả đều có nghĩa là ứng dụng phải được kiểm tra toàn diện để kết thúc với việc di chuyển từ hệ thống hiện tại sang hệ thống mới thành công.

Kiểm tra hệ thống phải được thực hiện trong trường hợp này với tất cả các dữ liệu, được sử dụng trong một ứng dụng cũ và những dữ liệu mới. Các chức năng hiện tại cần được xác minh cùng với chức năng mới / sửa đổi.

![](https://images.viblo.asia/00c592c4-13a3-42ca-9ac5-a58b90113212.png)

Thay vì chỉ Migration Testing, nó cũng có thể được gọi là Data Migration Testing, trong đó toàn bộ dữ liệu (data) của người dùng sẽ được di chuyển sang một hệ thống mới.

Vì vậy, Migration Testing bao gồm thử nghiệm với dữ liệu cũ, dữ liệu mới hoặc kết hợp cả hai tính năng cũ (các tính năng không thay đổi) và các tính năng mới.

Ứng dụng cũ thường được gọi là ứng dụng ' di sản ' (legacy). Cùng với ứng dụng mới / nâng cấp, nó cũng bắt buộc phải tiếp tục thử nghiệm ứng dụng kế thừa cho đến khi các ứng dụng mới / nâng cấp trở nên ổn định và nhất quán. Migration Testing mở rộng đối với ứng dụng mới sẽ tiết lộ những vấn đề mới không được tìm thấy trong ứng dụng kế thừa.

# Migration Testing là gì?
Migration Testing là một quá trình xác minh sự di chuyển của hệ thống kế thừa sang hệ thống mới với sự gián đoạn / thời gian chết tối thiểu, với sự toàn vẹn dữ liệu và không mất dữ liệu, đồng thời đảm bảo rằng tất cả các khía cạnh chức năng và phi chức năng đã được xác định của ứng dụng đều được đáp ứng, di cư.

Sự đại diện đơn giản của Migration System:

![](https://images.viblo.asia/ef6470a9-56b9-492a-838f-544762d1f12c.jpg)


# Tại sao phải làm Migration Test?
Như chúng ta biết, việc di chuyển ứng dụng sang một hệ thống mới có thể là do nhiều lý do, hợp nhất hệ thống, công nghệ lỗi thời, tối ưu hóa hoặc bất kỳ lý do nào khác.

**Do đó trong khi Hệ thống đang sử dụng cần được di chuyển sang một hệ thống mới, cần đảm bảo các điểm dưới đây:**

1. Bất kỳ sự gián đoạn / sự bất tiện nào gây ra cho người dùng do di chuyển cần phải được tránh / giảm thiểu. Ví dụ: thời gian chết, mất dữ liệu
3. Cần đảm bảo nếu người dùng có thể tiếp tục sử dụng tất cả các tính năng của phần mềm bằng cách gây ra thiệt hại tối thiểu hoặc không có trong quá trình di chuyển. Ví dụ: thay đổi chức năng, loại bỏ một chức năng cụ thể
5. Cũng rất quan trọng để dự đoán và loại trừ, tất cả các trục trặc có thể có / trở ngại có thể xảy ra trong quá trình di chuyển thực tế của hệ thống sống.

Do đó, để đảm bảo sự di chuyển trơn tru của hệ thống sống bằng cách loại bỏ những khuyết điểm đó, điều quan trọng là phải thực hiện Kiểm định Di chuyển trong Lab.

Thử nghiệm này có tầm quan trọng riêng và nó đóng một vai trò quan trọng khi dữ liệu cũ đi vào bức tranh tổng thể của Hệ thống mới.


**Về mặt kỹ thuật, nó cũng phải được thực hiện cho các mục đích dưới đây:**

* Để đảm bảo tính tương thích của ứng dụng mới / nâng cấp với tất cả phần cứng và phần mềm có thể mà ứng dụng cũ hỗ trợ. Ngoài ra, tính tương thích mới cũng nên được thử nghiệm cho phần cứng mới, nền tảng phần mềm là tốt.
* Để đảm bảo tất cả các chức năng hiện có hoạt động như trong ứng dụng kế thừa. Không nên thay đổi cách ứng dụng hoạt động khi so sánh với ứng dụng kế thừa.
* Khả năng có một số lượng lớn bugs, issues, risks do migration gây ra là rất cao. Những vấn đề này thường liên quan đến dữ liệu và do đó những vấn đề này cần được xác định và cố định trong quá trình test.
* Để đảm bảo thời gian đáp ứng của hệ thống của ứng dụng mới / nâng cấp là giống nhau hay nhỏ hơn những gì nó cần cho ứng dụng kế thừa.
* Để đảm bảo kết nối giữa các máy chủ, phần cứng, phần mềm vv, đều là nguyên vẹn và không bị phá vỡ trong khi thử nghiệm. Luồng dữ liệu giữa các thành phần khác nhau không nên phá vỡ dưới bất kỳ điều kiện nào.

# Khi nào Migration Testing là bắt buộc?
Việc kiểm tra phải được thực hiện trước và sau khi migration.

**Các giai đoạn khác nhau của migration testing** được thực hiện ở  môi trường test có thể được phân loại như dưới đây.

1. Pre-Migration Testing
1. Migration Testing
1. Post Migration Testing

Ngoài các điều trên, **các bài test sau đây cũng được thực hiện** như một phần của toàn bộ hoạt động Migration.
1. Xác minh tương thích ngược
1. Rollback Testing

**Trước khi thực hiện MIgration Testing, điều quan trọng mà bất kỳ Tester nào cũng cần hiểu rõ các điểm dưới đây:**

* Những thay đổi xảy ra như một phần của hệ thống mới (máy chủ, giao diện người dùng, DB, giản đồ, luồng dữ liệu, chức năng vv)
* Hiểu được chiến lược migration thực tế do đội đưa ra. Làm thế nào migration xảy ra, từng bước thay đổi xảy ra trong phụ trợ của hệ thống và kịch bản chịu trách nhiệm về những thay đổi này.
* Do đó cần phải nghiên cứu kỹ lưỡng hệ thống cũ và hệ thống mới và sau đó lập kế hoạch và thiết kế các test case và test scenario để được đề cập đến như một phần của các giai đoạn test và chuẩn bị testing strategy.

# Data Migration Testing Strategy

Thiết kế migration testing strategy bao gồm một bộ các hoạt động sẽ được thực hiện và vài khía cạnh sẽ được xem xét. Đây là để giảm thiểu các sai sót và rủi ro xảy ra do migration và để thực hiện migration test một cách hiệu quả.

Các hoạt động trong bài kiểm tra này:

**#1)  Đội hình chuyên môn :**

Thành lập testing team với các thành viên có kiến thức và kinh nghiệm cần thiết và đào tạo liên quan đến hệ thống đang được migration.

**#2)  Phân tích rủi ro kinh doanh, phân tích lỗi có thể :**

Các hoạt động kinh doanh hiện tại không nên bị cản trở sau khi migration và do đó tiến hành các cuộc họp "Phân tích rủi ro Kinh doanh" liên quan đến các bên có quyền lợi liên quan (Test Manager, Business Analysis, Software Arichitect, Product Owner, Business Owner vv.) Và xác định rủi ro và các biện pháp giảm nhẹ có thể thực hiện được. Việc kiểm tra phải bao gồm các tình huống để khám phá những rủi ro đó và xác minh xem liệu các biện pháp giảm nhẹ thích hợp đã được thực hiện hay không.

Tiến hành phân tích 'Các lỗi có thể xảy ra' bằng cách sử dụng thích hợp 'Error Guessing' và sau đó thiết kế test case xung quanh các lỗi này để khai quật chúng trong quá trình test.

**#3) Phân tích và xác định phạm vi migration:**

Phân tích phạm vi rõ ràng của migration testing như khi nào và những gì cần phải được kiểm tra.

**#4) Xác định Công cụ Migration thích hợp:**

Trong khi xác định chiến lược của thử nghiệm này, tự động hoặc thủ công, xác định các công cụ sẽ được sử dụng. Ví dụ: Công cụ tự động để so sánh dữ liệu nguồn và đích.

**#5)  Xác định môi trường thử nghiệm thích hợp cho migration:**

Xác định các môi trường riêng biệt cho môi trường Trước và Sau quá trình migration để thực hiện bất kỳ xác minh nào được yêu cầu như một phần của thử nghiệm. Hiểu và tài liệu các khía cạnh kỹ thuật của Hệ thống cũ và Hệ thống mới, để đảm bảo rằng môi trường thử nghiệm được thiết lập theo như vậy.

**#6) Specs của Migration testing và đánh giá:**

Chuẩn bị tài liệu migration testing trong đó mô tả rõ ràng cách tiếp cận, lĩnh vực test, phương thức test (tự động, bằng tay), phương pháp test (hộp đen, trắng kỹ thuật kiểm tra hộp ), Số chu kỳ thử nghiệm, tiến độ thử nghiệm, phương pháp của việc tạo ra dữ liệu và sử dụng dữ liệu trực tiếp (thông tin nhạy cảm cần được che dấu), đặc tả môi trường thử nghiệm, trình độ xét nghiệm vv, và tổ chức phiên họp với các bên liên quan.

**#7)  Hệ thống sau khi migration được release ra production :**

Phân tích và ghi lại danh sách việc cần làm để di chuyển sản phẩm và xuất bản nó trước

# Tạm kết
Như chúng ta biết rằng Migration có ảnh hưởng rất lớn đến chất lượng ứng dụng, nên toàn bộ nhóm phải nỗ lực để xác minh toàn bộ hệ thống trong tất cả các khía cạnh như chức năng, hiệu suất, bảo mật, khả năng sử dụng, tính khả dụng, độ tin cậy, tính tương thích vv, do đó sẽ đảm bảo thành công 'Migration Testing'.
Hy vọng những phần giới thiệu trên về Migration Testing đã giúp các bạn hiểu được phần nào đó tổng quan về Migration Testing. Những bài tiếp theo sẽ giới thiệu chi tiết về những cách giúp chúng ta thực hiện Migration Testing một cách đúng đắn. Hẹn gặp lại ở những bài sau

Nguồn : http://www.softwaretestinghelp.com/