# Zero-knowledge proofs là gì ?
**Zero-knowledge proofs (ZKP) là công nghệ mật mã học (Cryptography)**

Cốt lõi của công nghệ này là truyền tải thông tin đến người nhận thông tin mà không cần phải tiết lộ thông tin thiết yếu về quá trình.

Cốt lõi của mật mã học hiện nay: Toán học, khoa học máy tính, khoa học thông tin.

**Cryptography System**
* Symmetric cipher (Mã đối xứng)
* Asymmetric cipher (Mã không đối xứng)
* Hash functions (Hàm băm)


**zk-SNARKs:** Zero knowledge Succinct NonInteractive Argument of Knowledge: Đối số tri thức không tương tác cô động.

**zk-STARK:** zero-knowledge succinct transparent argument of knowledge: Đối số tri thức không minh bạch cô động

## Quá trình phát triển của zk-Snarks
Zerocoin là một giao thức bảo mật được đề xuất vào năm 2013 bởi giáo sư Matthew D. Green của Đại học Johns Hopkins và các sinh viên tốt nghiệp của ông, Ian Miers và Christina Garman.

Zerocoin sử dụng zero-knowledge proofs cũng giống như giao thức e-cash (e-cash Protocol)

Tuy nhiên, có một số vấn đề cần giải quyết ở Zerocoin:

* Chỉ ẩn danh một số dữ liệu, không ẩn danh được số lượng hoặc các dữ liệu quan trọng trong giao dịch sổ cái nhưng ẩn được địa chỉ gốc.
* Tiền mã hoá sử dụng có mệnh giá cố định.
* Người dùng không thể thanh toán trực tiếp cho nhau bằng Zerocoins.

Để giải quyết các vấn đề trên của cả Bitcoin và Zerocoin, thuật toán Zerocash đã được đề xuất bởi Ben-Sasson et al.

Thanh toán ẩn danh phi tập trung (Decentralized Anonymous Payment) đã ra đời và được giới thiệu ở Zcash cung cấp các chức năng và đảm bảo bảo mật, đồng thời đảm bảo tính ẩn danh mạnh mẽ.

Việc xây dựng giao thức Zcash phụ thuộc vào sự phát triển mạnh mẽ của zero-knowledge proofs (zk-SNARKs)

# Tổng quan về Zero-Knowledge Arguments of Knowledge (zk-Snarks)
NP là một tập hợp các chuỗi L sao cho nếu một chuỗi γ thuộc ngôn ngữ L thì tồn tại một chuỗi α, chứng minh rằng γ thuộc L.

Định nghĩa:

Một thuật toán kiểm chứng V cho ngôn ngữ A là một thuật toán (tất định) sao cho.

* Với mọi chuỗi x trong ngôn ngữ A, tồn tại chuỗi y sao cho V(x,y)=1.
* Với mọi chuỗi x không nằm trong A, V(x,y)=0 với mọi y.
*Thời gian thực thi của V được tính theo tham số là độ dài của x*

*NP được định nghĩa là tập hợp các ngôn ngữ/bài toán có thuật toán kiểm chứng chạy trong thời gian đa thức.

Ngoài ra:
* NP là tập hợp con của EXPTIME, MA.
* NP=PCP(log n, O(1))

Ví dụ:

Phiên bản quyết định của bài toán phân tích số: cho 2 số nguyên n và k, xác định xem có tồn tại 1<f<k sao cho f chia hết n.

Điều đó cho phép xác minh số thành viên của γ thuộc L trong thời gian đa thức. Do đó, chúng ta có thể xác định một quan hệ có thể tính toán theo thời gian đa thức P sao cho P (γ, α) = 1. Nếu γ thuộc L và α là một nhân chứng hợp lệ cho γ.

Một zkSNARK là một đối số tri thức không tương tác của tri thức đối với NP cũng đạt được tính ngắn gọn; nghĩa là, lập luận (tức là bằng chứng) nhỏ gọn và nhẹ về mặt tính toán để xác minh. Tuy nhiên, tính bảo mật của các lược đồ này dựa trên các giả định không thể sai lầm như giả định về kiến thức (trích xuất) hoặc thay vào đó được chứng minh là an toàn trong các mô hình lý tưởng hóa như mô hình nhóm chung.

### Tài liệu tham khảo
- Wikipedia: https://vi.wikipedia.org/wiki/Blockchain
- Arvix: https://arxiv.org/pdf/2008.00881.pdf
- Xem thêm các bài viết về blockchain: https://ngochai.info/blockchain/