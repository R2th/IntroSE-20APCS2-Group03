Đi sâu vào chủ đề chiến lược dự án thử nghiệm và đặc biệt hơn là xung quanh các MTP (Master Test Plan), có 2 điểm mà chúng ta chắc chắn đó là: việc nào là phải làm, là trách nhiệm của người kiểm thử và người quản lý kiểm thử:
# Product Risks và Project Risks

Bước đầu tiên để hiểu đây là 2 thực thể khác nhau: 

**Product Risks** (Rủi ro sản phẩm) là các lĩnh vực trong AUT (Application under test nơi có rủi ro cao mà bạn sẽ tìm thấy (quan trọng hoặc nhiều) lỗi, thường là do thay đổi hoặc các yếu tố nội bộ khác.

**Project Risks** (Rủi ro dự án) là những tình huống có thể xảy ra hoặc không xảy ra (rủi ro), nếu chúng xảy ra, chúng thường gây ra sự chậm trễ trong các mốc thời gian của dự án, và nguồn gốc của những rủi ro này có thể là bên trong hoặc bên ngoài.

# Product Risks (Rủi ro sản phẩm)
Như một người kiểm thử, một trong những nhiệm vụ của chúng tôi là quản lý rủi ro sản phẩm.

Chúng ta được trả tiền (ít nhất là một phần) để nhận thức được tất cả rủi ro sản phẩm, để đảm bảo phần còn lại của nhóm dự án cũng biết về chúng và phối hợp thông tin này với quản lý dự án để đảm bảo lịch trình của chúng tôi đang tính đến những rủi ro này.
Ngoài ra, chúng ta sẽ lập kế hoạch cho chiến lược thử nghiệm dựa trên những rủi ro này, lên lịch thử nghiệm nhiều hơn (và thử nghiệm sớm hơn) ở các khu vực có rủi ro cao hơn để tìm ra các vấn đề này nhanh hơn.

Phương thức để xử lý rủi ro sản phẩm ưa thích của tôi bắt đầu bằng cách liệt kê chúng là một phần của MTP và xem xét chúng với tất cả các bên liên quan của dự án. Trong các đánh giá này, tôi cố gắng đưa các đầu vào liên quan đến rủi ro này, cũng như thông tin về các rủi ro bổ sung mà tôi có thể không biết. Khi dự án bắt đầu, chúng tôi sẽ xem xét và cập nhật tất cả các rủi ro sản phẩm như là một phần của các cuộc họp với nhóm dự án.

Ví dụ về rủi ro sản phẩm là:
- Các tính năng phức tạp ảnh hưởng tới nhiều vùng của sản phẩm hiện tại: như nâng cấp / di chuyển của hệ thống.
- Sử dụng công nghệ mới trong sản phẩm như: máy chủ database mới, ngôn ngữ lập trình mới, tích hợp mới, v.v.
- Các Developer hoặc đội Developer mới, những người có thể thiếu kinh nghiệm và do đó có rủi ro cao hơn đối với sản phẩm hiện có.
- Lịch trình eo hẹp, khiến mọi người làm việc vội vàng và phạm nhiều sai lầm hơn v.v.

# Project Risks (Rủi ro dự án)
Những người phản ứng với rủi ro dự án là người quản lý dự án, chịu trách nhiệm về lịch trình của dự án. QA, là một phần của nhóm chung, là người chịu trách nhiệm về rủi ro dự án trong khu vực làm việc của mình

Rủi ro dự án thường được liệt kê và quản lý trong Excel (hoặc Google Docs).  Đối với mỗi rủi ro, chúng tôi thu thập và quản lý các thông tin sau:
1. Tên rủi ro và mô tả
2. Chỉ số rủi ro ( sử dụng trường này để sắp xếp danh sách rủi ro) - được tính bằng cách nhân xác suất của nó với hệ quả của nó
3. Chủ nhân của rủi ro
4. Ngày liên quan - khi nào rủi ro bắt đầu liên quan và các hành động phòng ngừa có thể bắt đầu diễn ra
5. Hành động phòng ngừa - làm thế nào để tránh rủi ro này
6. Kế hoạch dự phòng - chúng ta sẽ làm gì nếu rủi ro xảy ra

Rủi ro dự án thường liên quan nhất đến công việc QA & Testing là:
- Chậm trễ trong việc bàn giao AUT để thử nghiệm
- Thiếu kiến thức kỹ thuật về các lĩnh vực cụ thể của sản phẩm
- Thiếu môi trường thử nghiệm và/hoặc dữ liệu cái mà mô phỏng hiệu quả việc sử dụng của khách hàng thật v.v.

Rủi ro là một phần lớn của công việc quản lý. Chúng tôi mong muốn sẽ có tầm nhìn cho những điều có thể xảy ra và chuẩn bị cho phù hợp.

Hầu hết các nhiệm vụ liên quan đến quản lý rủi ro không phức tạp nhưng chúng yêu cầu sự hiểu biết tốt về dự án và sản phẩm cũng như cần có sự kỷ luật chặt chẽ để theo dõi và quản lý các rủi ro này trong suốt vòng đời của dự án

Tài liệu tham khảo: https://qablog.practitest.com/the-simple-differences-between-product-risks-project-risks/