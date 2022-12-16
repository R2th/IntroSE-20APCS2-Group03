# 1. Sự khác nhau giữa Fuzz Testing và Monkey Testing
* Về mặt kỹ thuật, thử nghiệm Monkey đề cập đến các hành động ngẫu nhiên được thực hiện trong khi thử nghiệm ứng dụng
* Kiểm tra Fuzz đề cập đến việc sử dụng dữ liệu ngẫu nhiên khi kiểm tra ứng dụng để xem liệu chúng có gặp lỗi không
* Đây là hai loại thử nghiệm khác nhau
* Tuy nhiên, trong một khoảng thời gian, các tên này đã được sử dụng thay thế cho nhau và Monkey testing được dùng để chỉ cách kiểm tra nói chung
2. Cách thực hiện Monkey Testing
Có nhiều cách khác nhau để kiểm tra Monkey có thể được thực hiện. Một số kỹ thuật phổ biến được đưa ra dưới đây.
* Dumb Monkey Testing

Trong Dumb Monkey Testing , người quản lý kiểm thử / trưởng nhóm kiểm tra chỉ định một người kiểm tra không biết về mô-đun / ứng dụng để kiểm tra sản phẩm. Người thử nghiệm được yêu cầu kiểm tra ứng dụng một cách trực quan và nhập dữ liệu ngẫu nhiên mà người thử nghiệm cảm thấy phù hợp.

Trong trường hợp này, hành vi của người kiểm tra có thể giống như một người dùng không hiểu biết nhiều về kỹ thuật nhưng đang cố gắng sử dụng ứng dụng.

Người thử nghiệm có thể kiểm tra ứng dụng theo sự hiểu biết của họ và nhập dữ liệu không hợp lệ.
Hành vi của các ứng dụng sau đó được ghi nhận để xem liệu nó có hoạt động như mong đợi hay không.
Loại thử nghiệm này rất hữu ích vì những người thử nghiệm biết ứng dụng có thể có xu hướng nhập dữ liệu hợp lệ khi thử nghiệm, làm theo các bước thích hợp và có thể không kiểm tra các điều kiện khác với những điều kiện họ đã nghĩ trước đó.
* Smart Monkey Testing

Trong Smart Monkey Testing , trưởng nhóm hoặc người quản lý thử nghiệm chỉ định một người thử nghiệm hiểu ứng dụng để kiểm tra ứng dụng.

Vì họ biết về sản phẩm, họ sẽ nhập dữ liệu ngẫu nhiên để kiểm tra ứng dụng mà họ biết là không hợp lệ và thực hiện các hành động ngẫu nhiên.
Điều này có lợi trong việc thử nghiệm ứng dụng một cách nhanh chóng.
Điều này đảm bảo rằng ứng dụng hoạt động như mong đợi trong các điều kiện hợp lệ và xử lý dữ liệu không hợp lệ đúng cách.
* Brilliant Monkey Testing

Trong thử nghiệm Brilliant Monkey , người thử nghiệm có kiến ​​thức nghiệp vụ, được trưởng nhóm hoặc người quản lý chỉ định kiểm tra ứng dụng.

Nhà phát triển hoặc người kiểm tra không có kiến ​​thức về nghiệp vụ có thể mong đợi trình tự các bước được thực thi theo một cách nhất định và họ có thể có hiểu biết cụ thể về dữ liệu đang được nhập.

Tuy nhiên, trong thực tế, người dùng cuối có chuyên môn về nghiệp vụ thực sự có thể đang thực hiện các tác vụ theo một trình tự khác với dữ liệu khác nhau. Ví dụ : Người kiểm tra có kiến ​​thức về lĩnh vực Ngân hàng có thể được yêu cầu nhập dữ liệu ngẫu nhiên để kiểm tra ứng dụng ngân hàng.

Do đó, việc kiểm tra ứng dụng bởi một người có kiến ​​thức về nghiệp vụ là có lợi vì họ sẽ nhập dữ liệu ngẫu nhiên từ góc độ nghiệp vụ.

# 3. Sử dụng Monkey Testing

Monkey Testing cũng có thể được tự động hóa bằng cách sử dụng phần cứng hoặc tốt hơn là phần mềm để bắt chước hành động của một con khỉ nhập dữ liệu ngẫu nhiên.
Dữ liệu ngẫu nhiên và được biên dịch trước có thể được sử dụng để kiểm tra ứng dụng cho các vấn đề OWASP.
Nó có thể được sử dụng để kiểm tra cơ sở dữ liệu bằng cách bắt đầu một giao dịch và nhập dữ liệu ngẫu nhiên hoặc thực hiện các hành động ngẫu nhiên và sau đó quay lại để xem liệu nó có bị lỗi hay không hoặc có bất kỳ lỗi nào của cơ sở dữ liệu xảy ra không.

# 4. Sự khác biệt giữa thử nghiệm Monkey và thử nghiệm Adhoc

Monkey Testing tương tự như Adhoc Testing và có thể được coi là một loại thử nghiệm adhoc. Đây là hai kỹ thuật kiểm tra khác nhau. Khi mã hóa hoàn tất, thử nghiệm adhoc được thực hiện bởi nhà phát triển hoặc người thử nghiệm dựa trên kiến ​​thức của họ về phần mềm.

Không có sự chuẩn bị hoặc lập kế hoạch nào được thực hiện trước khi thực hiện thử nghiệm adhoc. Các trường hợp thử nghiệm không được tham chiếu trong quá trình thử nghiệm adhoc.

Họ chủ yếu kiểm tra xem chương trình cơ bản có hoạt động mà không bị treo hay không.


| Monkey Testing | Adhoc Testing | 
| -------- | -------- | -------- |
| Loại - Các trường hợp thử nghiệm không được sử dụng trong Monkey Testing vì đây là bản chất ngẫu nhiên     | Loại - Thử nghiệm Adhoc cũng là ngẫu nhiên và không dựa vào hoặc sử dụng các trường hợp thử nghiệm.    |
|Mục tiêu - Kiểm tra được thực hiện ngẫu nhiên với dữ liệu ngẫu nhiên hoặc không hợp lệ để kiểm tra xem ứng dụng có bị treo không   | Mục tiêu - Mục đích của người thử nghiệm trong thử nghiệm Adhoc là làm hỏng ứng dụng hoặc tìm ra lỗi bằng cách sử dụng ứng dụng một cách ngẫu nhiên   |
| Thông thường tester sẽ không có kiến ​​thức về ứng dụng và họ không test theo một đường dẫn cụ thể. Họ kiểm tra ngẫu nhiên bằng cách nhấp vào các đối tượng ngẫu nhiên và nhập dữ liệu ngẫu nhiên để kiểm tra xem ứng dụng có báo lỗi không     | Người thử nghiệm kiểm tra bất kỳ điều gì họ nghĩ là cần thiết theo kiến ​​thức của họ về ứng dụng, trong thử nghiệm Adhoc   |
|Monkey Testing có thể được thực hiện bởi bất kỳ ai, ngay cả những cá nhân không quen thuộc với máy tính hoặc ứng dụng  | Thử nghiệm Adhoc được thực hiện bởi nhà phát triển hoặc người thử nghiệm có kiến ​​thức tốt về ứng dụng.    |

# 5. Công cụ thực hiện Monley Testing

Có một số công cụ giúp tự động hóa quá trình Monkey Testing. Điều này giúp thực hiện Monley Testing một cách hiệu quả.
Các công cụ để thực hiện Monley Testing được phát triển để tạo dữ liệu ngẫu nhiên hoặc sử dụng dữ liệu ngẫu nhiên được điền sẵn và nhập nó vào ứng dụng. Chúng cũng được lập trình để có thể thực hiện các hành động ngẫu nhiên. Sau đó, họ quan sát và báo cáo kết quả đầu ra của ứng dụng.
Việc thiết lập một công cụ kiểm tra Monkey đòi hỏi một số nỗ lực nhưng sau khi thiết lập xong, việc tự động hóa sẽ giúp kiểm tra khỉ hiệu quả.
* Công cụ MonkeyRunner dành cho Android

Công cụ MonkeyRunner được sử dụng để thử nghiệm một ứng dụng Android.

Bạn có thể cài đặt, thực thi một chương trình Android, gửi dữ liệu / tổ hợp phím và ghi lại ảnh chụp màn hình và lưu trữ trên máy tính - tất cả điều này có thể được thực hiện thông qua chương trình Python với MonkeyRunner.

Bạn có thể điều khiển thiết bị hoặc trình giả lập Android bằng cách sử dụng API do công cụ Monkeyrunner cung cấp.

Mặc dù công cụ Monkeyrunner được phát triển để thực hiện kiểm tra chức năng và kiểm tra mức khung của ứng dụng hoặc thiết bị, nó có thể được sử dụng để chạy các bộ thử nghiệm và để kiểm tra ngẫu nhiên.
* Giao diện người dùng / Người tập ứng dụng Monkey trên Android

UI Practiceiser Monkey khác với công cụ Monkeyrunner. Công cụ MonkeyRunner điều khiển thiết bị Android từ bên ngoài mã android trong khi UI Practiceiser Monkey chạy trong ADB Shell bên trong thiết bị hoặc trình mô phỏng.

UI Practiceiser Monkey có thể được sử dụng để tạo các sự kiện của hệ thống và người dùng trong một luồng giả ngẫu nhiên.

Monkey Testing không được sử dụng rộng rãi trong toàn ngành do nhiều lý do như thiếu thời gian, nguồn lực, ưu tiên cao hơn cho các hình thức thử nghiệm khác mang lại kết quả và lợi tức đầu tư tốt hơn.

Bạn nên thực hiện các hình thức kiểm tra khác trước để đảm bảo tính ổn định của ứng dụng trước khi sử dụng Monkey Testing.

# Kết Luận
Bài viết này mình muốn chia sẻ về kỹ thuật monkey testing mà mình đã tìm hiểu được mong rằng có thể giúp ích cho mọi người ! 

Nguồn tham khảo: http://tryqa.com/what-is-monkey-testing-advantages-and-disadvantages/