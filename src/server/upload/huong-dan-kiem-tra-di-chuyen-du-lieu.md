# Tổng quan về kiểm tra di chuyển dữ liệu:

Người ta thường nghe nói rằng một ứng dụng được chuyển đến một máy chủ khác, công nghệ được thay đổi, nó được cập nhật lên phiên bản tiếp theo hoặc chuyển sang máy chủ cơ sở dữ liệu khác, v.v.

**Điều này thực sự có ý nghĩa gì?**

Điều gì được mong đợi từ nhóm thử nghiệm trong những tình huống này?
Từ quan điểm thử nghiệm, tất cả có nghĩa là ứng dụng phải được kiểm tra kỹ lưỡng từ đầu đến cuối cùng với việc di chuyển từ hệ thống hiện tại sang hệ thống mới thành công.

Kiểm tra hệ thống phải được thực hiện trong trường hợp này với tất cả dữ liệu, được sử dụng trong một ứng dụng cũ và dữ liệu mới. Chức năng hiện tại cần được xác minh cùng với chức năng mới / được sửa đổi.

![](https://images.viblo.asia/e3b36840-5db2-43c1-bf0f-abe7ed01e05d.jpg)

Thay vì chỉ Kiểm tra di chuyển, nó cũng có thể được gọi là Kiểm tra di chuyển dữ liệu, trong đó toàn bộ dữ liệu của người dùng sẽ được di chuyển sang một hệ thống mới.

Vì vậy, thử nghiệm Di chuyển bao gồm thử nghiệm với dữ liệu cũ, dữ liệu mới hoặc kết hợp cả hai, các tính năng cũ (tính năng không thay đổi) và các tính năng mới.

Ứng dụng cũ thường được gọi là ứng dụng ‘di sản. Cùng với ứng dụng mới / được nâng cấp, cũng bắt buộc phải tiếp tục thử nghiệm ứng dụng cũ cho đến khi ứng dụng mới / nâng cấp trở nên ổn định và nhất quán. Thử nghiệm di chuyển mở rộng trên ứng dụng mới sẽ phát hiện những vấn đề mới không được tìm thấy trong ứng dụng cũ.

# Kiểm tra di chuyển là gì?

Kiểm tra di chuyển là một quá trình xác minh di chuyển hệ thống cũ sang hệ thống mới với sự gián đoạn / thời gian chết tối thiểu, với tính toàn vẹn dữ liệu và không mất dữ liệu, trong khi đảm bảo rằng tất cả các khía cạnh chức năng và phi chức năng cụ thể của ứng dụng đều được đáp ứng sau khi di chuyển dữ liệu.

Biểu diễn đơn giản của hệ thống di chuyển:

![](https://images.viblo.asia/b92a4782-1b10-4643-aacd-78ffa73be27f.jpg)

# Tại sao phải kiểm tra di chuyển?

Như chúng ta biết, việc di chuyển ứng dụng sang một hệ thống mới có thể vì nhiều lý do, hợp nhất hệ thống, công nghệ lạc hậu, tối ưu hóa hoặc bất kỳ lý do nào khác.

**Do đó, trong khi Hệ thống đang sử dụng cần được chuyển sang một hệ thống mới, điều cần thiết là phải đảm bảo các điểm dưới đây:**

1. Bất kỳ sự gián đoạn / bất tiện nào gây ra cho người dùng do di chuyển cần phải tránh / giảm thiểu. Vd: thời gian chết, mất dữ liệu
2. Cần đảm bảo nếu người dùng có thể tiếp tục sử dụng tất cả các tính năng của phần mềm bằng cách gây ra thiệt hại tối thiểu hoặc không có trong quá trình di chuyển. Ví dụ: thay đổi chức năng, loại bỏ một chức năng cụ thể
3. Nó cũng quan trọng để dự đoán và loại trừ, tất cả các trục trặc / cản trở có thể xảy ra trong quá trình di chuyển thực tế của hệ thống sống.

Do đó để đảm bảo di chuyển trơn tru hệ thống sống bằng cách loại bỏ các lỗi đó, điều cần thiết là phải thực hiện Kiểm tra di chuyển trong phòng thí nghiệm.

Thử nghiệm này có tầm quan trọng riêng của nó và nó đóng một vai trò quan trọng khi dữ liệu đi vào hình ảnh.

**Về mặt kỹ thuật, nó cũng được yêu cầu thực hiện cho các mục đích dưới đây:**

* Để đảm bảo khả năng tương thích của ứng dụng mới / được nâng cấp với tất cả các phần cứng và phần mềm có thể có mà ứng dụng cũ hỗ trợ. Ngoài ra, khả năng tương thích mới cũng cần được kiểm tra cho phần cứng, nền tảng phần mềm mới.
* Để đảm bảo tất cả các chức năng hiện có hoạt động như trong ứng dụng cũ. Không có thay đổi trong cách ứng dụng hoạt động khi so sánh với ứng dụng cũ.
* Khả năng một số lượng lớn các khiếm khuyết do di chuyển là rất cao. Nhiều khiếm khuyết thường sẽ liên quan đến dữ liệu và do đó những khiếm khuyết này cần được xác định & sửa chữa trong quá trình thử nghiệm.
* Để đảm bảo thời gian phản hồi của Hệ thống của ứng dụng mới / được nâng cấp là bằng hoặc thấp hơn thời gian ứng dụng kế thừa.
* Để đảm bảo nếu kết nối giữa các máy chủ, phần cứng, phần mềm, v.v., tất cả đều nguyên vẹn và không bị hỏng trong khi thử nghiệm. Luồng dữ liệu giữa các thành phần khác nhau không được phá vỡ trong bất kỳ điều kiện.
# Khi nào kiểm tra này là bắt buộc?
Kiểm tra phải được thực hiện cả trước và sau khi di chuyển.

Các giai đoạn khác nhau của thử nghiệm Di chuyển sẽ được thực hiện tại Phòng thí nghiệm thử nghiệm có thể được phân loại như dưới đây.

1. Kiểm tra trước khi di chuyển 
2. Kiểm tra di chuyển
3. Kiểm tra di chuyển bài

Ngoài các cách trên, các thử nghiệm sau đây cũng được thực hiện như một phần của toàn bộ hoạt động Di chuyển.

1. Xác minh tương thích ngược
2. Kiểm tra rollback

**Trước khi thực hiện Kiểm tra này, điều cần thiết đối với bất kỳ Người kiểm tra nào là phải hiểu rõ các điểm dưới đây:**

1. Những thay đổi xảy ra như là một phần của hệ thống mới (máy chủ, giao diện người dùng, DB, lược đồ, luồng dữ liệu, chức năng, v.v.)
2. Để hiểu chiến lược di chuyển thực tế được đặt ra bởi nhóm. Làm thế nào di chuyển xảy ra, từng bước thay đổi xảy ra trong phần phụ trợ của hệ thống và các tập lệnh chịu trách nhiệm cho những thay đổi này.

Do đó, điều cần thiết là phải nghiên cứu kỹ lưỡng hệ thống cũ và mới, sau đó lên kế hoạch và thiết kế các trường hợp thử nghiệm và các kịch bản thử nghiệm được đưa vào như một phần của các giai đoạn thử nghiệm và chuẩn bị chiến lược thử nghiệm.

# Chiến lược kiểm tra di chuyển dữ liệu

Thiết kế chiến lược thử nghiệm để di chuyển bao gồm một tập hợp các hoạt động sẽ được thực hiện và một số khía cạnh được xem xét. Điều này là để giảm thiểu các lỗi và rủi ro xảy ra do di chuyển và để thực hiện kiểm tra di chuyển một cách hiệu quả.

**Các hoạt động trong thử nghiệm này:**

1. Đội hình chuyên biệt:

Thành lập nhóm thử nghiệm với các thành viên có kiến thức và kinh nghiệm cần thiết và cung cấp đào tạo liên quan đến hệ thống đang được di chuyển.

2. Phân tích rủi ro kinh doanh, phân tích lỗi có thể xảy ra:

Việc kinh doanh hiện tại không nên bị cản trở sau khi di chuyển và do đó tiến hành meetings Các cuộc họp Phân tích rủi ro kinh doanh liên quan đến các bên liên quan (Quản lý kiểm tra, Phân tích kinh doanh, Kiến trúc sư, Chủ sở hữu sản phẩm, Chủ doanh nghiệp, v.v.) và xác định các rủi ro và giảm thiểu có thể thực hiện được. Việc kiểm tra nên bao gồm các kịch bản để phát hiện ra những rủi ro đó và xác minh xem các biện pháp giảm thiểu thích hợp đã được thực hiện hay chưa.

Tiến hành Phân tích lỗi có thể xảy ra bằng cách sử dụng thích hợp Lỗi đoán các phương pháp tiếp cận và sau đó thiết kế các kiểm tra xung quanh các lỗi này để khai quật chúng trong quá trình kiểm tra.

3. Phân tích và xác định phạm vi di chuyển:

Phân tích phạm vi rõ ràng của kiểm tra di chuyển là khi nào và những gì cần phải được kiểm tra.

4. Xác định Công cụ thích hợp để Di chuyển:

Trong khi xác định chiến lược của thử nghiệm này, tự động hoặc thủ công, hãy xác định các công cụ sẽ được sử dụng. Ví dụ: Công cụ tự động để so sánh dữ liệu nguồn và đích.

5. Xác định môi trường thử nghiệm thích hợp cho việc di chuyển:

Xác định các môi trường riêng biệt cho các môi trường Di chuyển trước và sau để thực hiện bất kỳ xác minh nào được yêu cầu như một phần của thử nghiệm. Hiểu và ghi lại các khía cạnh kỹ thuật của Di sản và hệ thống Di chuyển mới, để đảm bảo rằng môi trường thử nghiệm được thiết lập theo đó.

6. Tài liệu và đánh giá kiểm tra di chuyển Tài liệu và đánh giá:

Chuẩn bị tài liệu Đặc tả thử nghiệm di chuyển mô tả rõ ràng phương pháp thử nghiệm, lĩnh vực thử nghiệm, phương pháp thử nghiệm (tự động, thủ công), phương pháp thử nghiệm (hộp đen, kỹ thuật thử nghiệm hộp trắng), Số chu kỳ thử nghiệm, lịch trình thử nghiệm, phương pháp tạo dữ liệu và sử dụng dữ liệu trực tiếp (thông tin nhạy cảm cần được che dấu), đặc tả môi trường thử nghiệm, trình độ người kiểm tra, v.v. và chạy phiên đánh giá với các bên liên quan.

7. Khởi động sản xuất hệ thống di chuyển:

Phân tích và ghi lại danh sách việc cần làm để di chuyển sản xuất và xuất bản trước

(Còn tiếp)

Nguồn: https://www.softwaretestinghelp.com/data-migration-testing/