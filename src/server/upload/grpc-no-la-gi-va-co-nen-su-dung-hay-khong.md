Nhân một ngày rảnh rỗi, mình ngồi đọc lại RPC cũng như gRPC viết lại để nhớ lâu hơn.

gRPC là một platform dành cho RPC của Google, cái tên của nó nếu viết đầy đủ ra thì không máy tính nào chạy nổi vì bị stack overflow: "gRPC Remote Procedure Call", một cách đặt tên đệ quy quen thuộc với mấy anh em PHP (PHP Hypertext Processor).

Vấn đề là gì và tại sao cần nó ?

RPC có thể được xem là một giao thức request-respone thông thường tuy nhiên nó được dùng cho việc giao tiếp giữa các server với nhau (server-server) nhiều hơn là client-server. Việc này có ý nghĩa rất quan trọng vì trong các hệ thống phân tán (distributed system), application code ở nhiều server hơn là một server. Ví dụ thường thấy nhất chính là kiến trúc Microservices.

Điều này nghĩa là: một request phía client có thể sẽ phải cần nhiều service chạy trên các server này để tổng hợp thông tin rồi mới response cho client. Sự liên lạc giữa các server lúc này sẽ là vấn đề mà trước đó tất cả service chạy trên 1 server thì khoẻ re, vì local call nên chẳng ngại gì cả. Chính xác là khi đó, khi một server muốn "nói chuyện" với server khác sẽ cần phải encode data (JSON, XML), phía nhận cũng phải làm công việc ngược lại là decode data mới hiểu thằng kia nói gì với mình rôi lại phải encode lại tiếp. Việc này tiêu tốn khá nhiều tài nguyên xử lý (CPU) mà lẽ ra chỉ cần làm ở bước đầu và cuối (đầu nhận và trả về cuối cùng).

Tối ưu cho việc "giao tiếp" giữa các server là lý do gRPC ra đời.

Để giải bài toán trên, gRPC đã sử dụng binary để truyền đi thay vì phải encode chúng thành các ngôn ngữ trung gian JSON/XML. Việc này rõ ràng đã làm tăng tốc giao tiếp các servers lên rất nhiều, giảm overhead cho CPUs. Google cũng "tiện tay" làm luôn cả protobuf (protocol buffers), đây là ngôn ngữ mà gRPC dùng như một default serialization format. Implement phần này thật sự phải là tay to lắm nên Google xử dụng protobuf như một script trung gian để generate phần hard core cho các dev ở các ngôn ngữ phổ biến như: C++, C#, Go, Java, Pyhon.

Thứ giúp gRPC giao tiếp binary ngon vậy chính là http/2, đây vốn là giao thức có rất nhiều cải tiến so với http/1.1. Bản thân http/2 cũng được coi như là sự thay thế cho SPDY, giao thức mà cũng chính Google phát triển, open source vào 2012 và ngừng hỗ trợ vào 2015 (http/2 có implement và thay thế rồi).

OK vài dòng note những ý chính cho gRPC cho những ai muốn tìm hiểu nó để build các hệ thống phân tán có throughput cao hơn. Đương nhiên là nên xài quá đi chứ 

Link bài viết gốc tại [đây](https://www.facebook.com/photo.php?fbid=2708402002521235&set=gm.2781946731832362&type=3&theater&ifg=1)