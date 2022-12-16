Trong bài viết này sẽ tập trung nói về 2 định nghĩa: Proofs Of Space (PoS) và Proofs Of Replacation (PoRep).

**Lưu ý rằng:** PoS trong bài viết là Proofs Of Space chứ không phải Proofs Of Stake, chúng đều viết tắt là PoS.

# Proofs of Space
Theo Filecoin, Ben Fisch: “Chúng tôi xây dựng một bằng chứng không gian (Proofs Of Space – PoS) thực tế cụ thể với tính bảo mật chặt chẽ tùy ý dựa trên đồ thị độ sâu xếp chồng và bộ mở rộng mức độ không đổi (constant-degree expander graphs). Bằng chứng về không gian (PoS) là một hệ thống bằng chứng tương tác, trong đó nó đang liên tục sử dụng không gian để lưu trữ thông tin”

Proof-of-space (PoS) đã được đề xuất như một giải pháp thay thế cho Proof-of-work (PoW) cho các ứng dụng như ngăn chặn SPAM, tấn công DOS và Sybil Resistance trong các cơ chế đồng thuận dựa trên blockchain. Một số dự án trong ngành đang được tiến hành để triển khai các loại tiền điện tử tương tự như Bitcoin sử dụng bằng chứng không gian (proof-of-space) thay vì bằng chứng công việc (proof-of-work). Proof-of-space có nhiều ưu điểm hơn Proof-of-work và thân thiện với môi trường hơn vì nó có khả năng ASIC-Resistance và không tiêu tốn tài nguyên của nó (không gian thay vì năng lượng – space instead of energy), mà là tái sử dụng nó.

PoS là một giao thức tương tác giữa **người chứng minh (prover) và người xác minh (verifier)**, trong đó, **người chứng minh (Prover)** sử dụng một lượng không gian tối thiểu để tiến hành vượt qua **bài xác minh (pass verifier)**. Giao thức phải có sự thoả hiệp của **người chứng minh (prover)** để dẫn đến hiệu quả xác minh. PoS tồn tại lâu dài nếu các cuộc kiểm tra lặp đi lặp lại buộc **người chứng minh (prover)** phải sử dụng không gian này trong một khoảng thời gian.

### Một số công nghệ áp dụng Proofs Of Space ở thời điểm hiện tại (6/2021)
Chia Network: https://www.chia.net/

Spacemesh: https://spacemesh.io/

Filecoin: https://filecoin.io/

# Proofs Of Replication
Theo Filecoin, BenFisch: “Bằng chứng về không gian (Proofs Of Space) là điều cần thiết cho bằng chứng sao chép (Proofs Of Replication – PoRep), là bằng chứng có thể kiểm chứng công khai rằng các tài nguyên duy nhất để lưu trữ một hoặc nhiều bản sao có thể truy xuất của một tệp. Cấu trúc PoS chính của chúng tôi có thể được sử dụng như một PoRep, nhưng việc trích xuất dữ liệu không hiệu quả như tạo bản sao. Chúng tôi giới thiệu một biến thể thứ hai của cấu trúc có tên ZigZag PoRep có khả năng trích xuất dữ liệu nhanh / có thể song song hóa so với tạo bản sao và duy trì cùng độ chặt chẽ về không gian trong khi chỉ tăng số cấp lên khoảng một hệ số của 2.”

Proof-of-replication (PoRep) là một kết hợp lai giữa PoS với bằng chứng về khả năng truy xuất proof-of-retrievability (PoR). PoR chứng minh rằng **người chứng minh (Prover)** có thể truy xuất một tệp dữ liệu cụ thể mà **người xác minh (Verifier)** quan tâm, hoặc đã được **người xác minh (verfier)** biết đến, được cam kết công khai hoặc được xử lý trước bởi khách hàng tạo thẻ xác minh cho tệp đó. Một PoRep chứng minh rằng **người chứng minh (prover)** đang dành các nguồn tài nguyên duy nhất để lưu trữ một bản sao có thể truy xuất tệp và do đó là một bằng chứng hữu ích về không gian (Proofs of space). Do đó, nó đã được đề xuất như một cơ chế Sybil-Resistance, ASIC-Resistance và thân thiện với môi trường mà còn có một tác dụng hữu ích: nó cung cấp khả năng lưu trữ tệp trên dữ liệu thực. Hơn nữa, vì người chứng minh có thể chạy một số PoRep độc lập cho cùng một tệp mà mỗi tệp yêu cầu tài nguyên duy nhất, PoReps có thể được sử dụng như một bằng chứng có thể xác minh công khai về việc sao chép/nhân đôi dữ liệu (replication/duplication)

### Tài liệu tham khảo
Tight Proofs of Space and Replication: https://eprint.iacr.org/2018/702.pdf

An Elementary Construction of Constant-Degree Expanders: http://www.math.tau.ac.il/~asafico/expander.pdf

Xem thêm các bài viết về blockchain: https://ngochai.info/blockchain