## Tại sao cần một tiêu chuẩn chung về commit message

- Đội ngũ kĩ thuật đạt hiệu quả tối đa trong giao tiếp
- Giảm tối đa lỗi con người khi cùng làm việc chung trên một mã nguồn
- Lưu giữ đầy đủ thông tin có thể tìm kiếm và kiểm chứng được trong hệ thống


## Nguyên tắc viết commit message

Bắt đầu message title ngắn gọn nhằm tóm tắt được mục đích commit

Ví dụ: **CPS-123**: Add shopping cart api

Trong đó CPS là tên project trong hệ thống quản lý task và 123 là id của task

Tiếp sau message title bằng một động từ ra lệnh mô tả hành động: Add, Drop, Fix, Refactor, Optimize, v.v…

Ví dụ: CPS-123: **Add** shopping cart api

6 nguyên tắc để chuẩn hóa message title theo quy định
- Bắt đầu bằng chữ viết hoa
- Sử dụng tối đa 50 kí tự để mô tả commit message
- Không dùng dấu . để kết thúc
- Phân tách message tittle với message body bằng một dòng trắng
- Sử dụng message body để mô tả thông tin cụ thể hỗ trợ tìm kiếm lại. Nếu mô tả task trong hệ thống quản lý task đã đầy đủ và cụ thể thì chỉ ghi lại các thông tin quan trọng bằng keyword kèm nội dung như (Importance: ..., References: ... , Supersedes: ..., Obsoletes: ..., See-Also: ..., v.v…)

## Các động từ nên dùng trong message title

- Add = Thêm vào mã nguồn. Ví dụ: chức năng, test, thư viện
- Drop = Xóa khỏi mã nguồn. Ví dụ: chức năng, test, thư viện
- Fix = Sửa trong mã nguồn. Ví dụ: lỗi, typo
- Bump = Thay đổi version. Ví dụ: nâng phiên bản một thư viện đang sử dụng
- Make = Thay đổi công cụ hoặc quy trình build liên quan hạ tầng
- Refactor = Sửa đổi nhằm mục đích tái cấu trúc mã nguồn cũ. Ví dụ: Tách logic xử lý trong controller layer về business layer
- Optimize = Sửa đổi nhằm mục đích tối ưu hiệu năng cho mã nguồn cũ. Ví dụ: Tối ưu hiệu năng chức năng tìm kiếm đơn hàng bằng cách sử dụng thêm caching layer để giảm thời gian truy vấn từ cơ sở dữ liệu.
- Reformat = Sửa đổi nhằm mục đích định dạng lại code cũ. Ví dụ: xóa khoảng trắng, dòng trắng sai coding convention
- Rephrase = Sửa đổi liên quan tài liệu trong source code. Ví dụ comment trong source code (TODO / FIXME / …)
- Document = Sửa đổi liên quan đến tài liệu bên ngoài source code. Ví dụ thêm mô tả vào file README.md

Young Tailor Team