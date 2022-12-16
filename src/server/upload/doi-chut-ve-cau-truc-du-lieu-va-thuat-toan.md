*Theo anh Phạm Huy Hoàng (toidicodedao) đã viết trong blog của mình là kiến thức trong ngành IT có 2 loại, một là càng để lâu thì càng cũ, lạc hậu và trở lên vô dụng. Hai là càng để lâu thì càng có giá trị thậm chí ngày càng có giá. Các kiến thức thuộc loại 2 ở trên đó chính là các kiến thức nền tảng, những kinh nghiệm lập trình và một trong số đó là cấu trúc dữ liệu và thuật toán.*

Cấu trúc dữ liệu và thuật toán là gì? Theo wikipedia, cấu trúc dữ liệu là một cách lưu dữ liệu trong máy tính sao cho nó có thể được sử dụng một cách hiệu quả. Còn thuật toán  là một tập hợp hữu hạn các hướng dẫn được xác định rõ ràng, có thể thực hiện được bằng máy tính, thường để giải quyết một lớp vấn đề hoặc để thực hiện một phép tính. Các thuật toán luôn rõ ràng và được sử dụng chỉ rõ việc thực hiện các phép tính, xử lý dữ liệu, suy luận tự động và các tác vụ khác.

![Cấu trúc dữ liệu và thuật toán](https://images.viblo.asia/f6239c6c-b7e5-446b-becf-adafc7a62198.jpg)

Như trong định nghĩa, cấu trúc dữ liệu giúp lưu trữ dữ liệu một cách có tổ chức, vì thế sẽ giúp việc lưu trữ, truy xuất,... vào dữ liệu tiết kiệm thời gian hơn rất nhiều. Ngoài ra, việc lưu trữ dữ liệu một cách có tổ chức sẽ giúp việc quản lý dữ liệu được tốt hơn. Còn về thuật toán thì chắc không phải nói gì thêm, một thuật toán tối ưu chắc chắn sẽ cho thời gian xử lý tốt hơn. Nhưng thuật toán thì không bao giờ đi một mình, thuật toán luôn phải đi đôi với cấu trúc dữ liệu. Giải thuật giúp code trong sáng, dễ hiểu, code nhanh, dễ bảo trì, ít lỗi. Cấu trúc dữ liệu giúp tiết kiệm nhân lực, tài lực, giúp bộ máy hoạt động trơn tru. Thông thường, một cấu trúc dữ liệu được chọn cẩn thận, phù hợp sẽ giúp cho thuật toán hiệu quả hơn. Các cấu trúc dữ liệu căn bản thường là ***mảng*** ( array), ***ngăn xếp*** ( stack), ***hàng đợi*** ( queue), ***bảng băm*** ( hash table), ***danh sách liên kết*** ( linked list), ***đồ thị*** ( graph), một số cấu trúc dữ liệu nâng cao hơn như ***hàng đợi ưu tiên*** ( priority queue), ***cây*** ( tree),..

Ngoài ra, khi giải quyết một số bài toán đặc biệt lại có những cấu trúc dữ liệu đặc thù giúp giải quyết các bài toán đó với thời gian tối ưu hơn như cấu trúc dữ liệu ***Disjoint set*** được sử dụng trong thuật toán Kruskal,...  hoặc trong các bài toán riêng các bạn có thể tự định nghĩa ra những cấu trúc dữ liệu của riêng mình sao cho nó phù hợp với bài toán để có thể giải quyết nó với tốc độ nhanh và dễ dàng hơn.

Nếu các bạn muốn tìm hiểu về các cấu trúc dữ liệu có thể xem slide, giáo trình bài giảng của trường Đại Học Bách Khoa Hà Nội ***môn cấu trúc dữ liệu và thuật toán*** [**TẠI ĐÂY**](https://tailieu-bkhn.blogspot.com/2020/12/dsa.html)

Hiện nay, hầu hết tất cả các ngôn ngữ lập trình đều hỗ trợ các thư viện, đối tượng có sẵn hỗ trợ việc xây dựng cấu trúc dữ liệu như ***bộ thư viện chuẩn*** C++, ***Java Collections Framework*** và ***.Net Framework***. Không những thế những giải thuật cơ bản như ***tìm kiếm***, ***sắp xếp***,... cũng được cài đặt sẵn với tốc độ rất nhanh và mọi người khi cần chỉ việc gọi ra và sử dụng. Việc sử dụng rất đơn giản, có thể không cần nắm ý tưởng của giải thuật là gì, ví dụ như giải thuật sắp xếp ta không cần biết nó sắp xếp như nào chỉ cần biết sau khi gọi và sử dụng nó ta được một kết quả trả về là một tập hợp nào đó đã được sắp xếp theo thứ tự giảm dần hoặc tăng dần hay là về cấu trúc dữ liệu ta chỉ cần hiểu qua về cơ chế hoạt động của nó như ngăn xếp thì là last in first out, hàng đợi thì là first in first out thì cũng có thể sử dụng trơn chu để áp dụng vào các bài toán. Vậy tại sao chúng ta còn cần phải học cấu trúc dữ liệu và thuật toán để làm gì? Thậm chí môn này tại một số trường đại học còn dạy cách cài đặt lại từ đầu các cấu trúc dữ liệu này, cài đặt lại các thuật toán này từ sơ khai nhất ( và chắc chắn thứ chúng ta tự cài đặt không thể tối ưu hơn bộ thư viện được cung cấp sẵn), ***vậy việc học và hiểu cấu trúc dữ liệu có cần thiết***? 

Chắc chắn rồi, nó là rất cần thiết. Rõ ràng 1 điều là thư viện có đa năng tới đâu cũng không thể bao quát hết tất cả các trường hợp xảy ra, vậy trong một số bài toán đặc thù có thể bạn sẽ phải thiết kế lại các cấu trúc dữ liệu để phù hợp với bài toán. Việc học và hiểu được cấu trúc dữ liệu cũng sẽ giúp bạn hiểu rõ hơn hoạt động của một số công cụ cũng đang hoạt động trên các ý tưởng này. Và cũng như đã nói ở đầu, các kiến thức này là không bao giờ mất giá trị, thậm chí càng để lâu càng có giá, khi đã nắm bắt được các kiến thức về cấu trúc dữ liệu và thuật toán bạn có thể dễ dàng chuyển đổi giữa các ngôn ngữ lập trình mà không mất quá nhiêu thời gian.

<br />Tham khảo : http://thegioi360.vn/, https://vi.wikipedia.org/, https://toidicodedao.com/