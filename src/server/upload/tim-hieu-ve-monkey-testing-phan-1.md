# 1. Monkey Testing là gì ?

Monkey testing là một kỹ thuật được sử dụng trong kiểm thử phần mềm để kiểm tra ứng dụng hoặc sản phẩm bằng cách cung cấp dữ liệu ngẫu nhiên và quan sát xem hệ thống hoặc ứng dụng có gặp sự cố hoặc xuất hiện lỗi hay không. Monkey testing đôi khi còn được gọi là Fuzz Testing
* Trong Monkey testing, dữ liệu ngẫu nhiên được nhập vào ứng dụng để kiểm tra hành vi của ứng dụng và xem liệu nó có lỗi không
* Trong Monkey testing, tester hoặc đôi khi developer cũng được coi như một con khỉ giả định rằng nếu một con khỉ sử dụng máy tính thì nó sẽ nhập một số dữ liệu ngẫu nhiên mà không cần bất kỳ kiến thức hoặc hiểu biết nào
* Ở đây, các bài kiểm tra được thực hiện rất ngẫu nhiên và nó có thể không chính xác
* Monkey testing không tuân theo bất kỳ trường hợp thử nghiệm nào
* Do thử nghiệm ngẫu nhiên như vậy, tester có thể không tạo lại được các vấn đề hoặc lỗi
# 2. Nguồn gốc của Monkey Testing

Monkey testing lần đầu tiên được sử dụng vào năm 1983 trên Mac để kiểm tra MacWrite và MacPaint.
Macintosh ban đầu có 128K byte bộ nhớ và sau khi cấp phát bộ nhớ cho hệ thống và hiển thị chỉ còn lại 90K bộ nhớ cho các ứng dụng.
MacWrite và MacPaint phải sử dụng bộ đệm ngoài màn hình nhưng kích thước gấp 3 lần màn hình để hoạt động. Cần phải kiểm tra các ứng dụng này trong điều kiện bộ nhớ thấp để kiểm tra xem chúng có bị sập hay không. Tuy nhiên, rất khó để tái tạo các điều kiện dẫn đến sự cố.

Vì vậy, Steve Capps và nhóm đã sử dụng “The Monkey”, một chương trình mà họ nghĩ ra để nhập các sự kiện ngẫu nhiên vào MacWrite và MacPaint. Monkey có thể được chạy song song / đồng thời với các chương trình khác, nhập dữ liệu và thực hiện các hành động trong các chương trình khác.
Điều này sẽ hoạt động nhanh hơn so với người dùng thông thường. Điều này tương tự như một con khỉ đập bàn phím bằng cách nhấn các phím ngẫu nhiên, nhấp và kéo chuột một cách ngẫu nhiên.

Nhóm đã phát triển nó để tạo ra một tỷ lệ phần trăm cụ thể của các lệnh, nhấp chuột vào menu, sự kiện cửa sổ, v.v. trong số tất cả các sự kiện ngẫu nhiên để họ có thể nhắm mục tiêu thử nghiệm theo yêu cầu của họ.
Là một bộ máy thử nghiệm, The Monkey hoạt động khá hiệu quả và nhóm nghiên cứu cảm thấy thú vị khi xem các bản vẽ do The Monkey tạo ra mặc dù các chữ viết vô nghĩa.
Lúc đầu, The Monkey rất giỏi trong việc làm hỏng các ứng dụng nhưng một khi các lỗi nổi bật đã được sửa, nó khiến The Monkey khó tìm ra các khiếm khuyết hơn.

# 3. Ưu điểm của Monkey Testing
* Monkey testing là một cách tiếp cận rất tốt để tìm ra một số lỗi mới có thể không thực hiện được từ các tình huống đã nêu.
* Monkey testing cũng có thể là một cách tốt để thực hiện stress testing và load testing từ các kịch bản thử nghiệm nói chung là ngẫu nhiên và Adhoc .
* Nó rất dễ thực thi vì nó chỉ yêu cầu một số dữ liệu ngẫu nhiên để chạy với một số thử nghiệm ngẫu nhiên.
* Chi phí thực thi các trường hợp thử nghiệm và thiết lập môi trường là rất ít với monkey testing.
* Bằng cách sử dụng các công cụ, quá trình kiểm tra Monkey có thể được tự động hóa.
* Monkey testing có thể được thực hiện cho các ứng dụng máy tính để bàn, ứng dụng web cũng như ứng dụng di động.

# 4. Nhược điểm của thử nghiệm Monkey
* Thử nghiệm được thực hiện trong quá trình monkey test là ngẫu nhiên đến mức không thể hoặc rất khó để tạo lại bất kỳ lỗi nào.
* Rất khó và tốn thời gian để phân tích các vấn đề bất ngờ được tìm thấy trong quá trình monkey test
* Tester gặp khó khăn trong việc xác định các kịch bản thử nghiệm chính xác và họ cũng không thể đảm bảo tính chính xác của các trường hợp thử nghiệm.
* Monkey test có thể tiêu tốn rất nhiều thời gian trước khi tìm ra lỗi vì nó không có bất kỳ thử nghiệm xác định trước nào.

# 5. Ví dụ / Các loại thử nghiệm Monkey
Có ba loại thử nghiệm Monkey:

* Dumb monkey tests:

Trong khi kiểm thử Dumb monkey, người kiểm tra không có kiến thức về sản phẩm hoặc ứng dụng.
Họ không có bất kỳ ý tưởng nào trong đầu họ cho dù nó hợp lệ hay không hợp lệ.
* Smart monkey tests:

Trong khi kiểm thử smart monkey, người kiểm tra có ý tưởng tốt về hệ thống hoặc ứng dụng.
Họ biết chính xác chức năng của sản phẩm.
Họ cung cấp các đầu vào hợp lệ để thực hiện kiểm tra.
* Brilliant monkey tests:

Trong kiểm thử Brilliant monkey, những người thử nghiệm có ý tưởng công bằng về cách người dùng sử dụng sản phẩm.
Họ thực hiện thử nghiệm của họ với quan điểm của người dùng.

6. Sự khác biệt giữa Fuzz Testing and Monkey Testing
* Về mặt kỹ thuật, thử nghiệm Monkey đề cập đến các hành động ngẫu nhiên được thực hiện trong khi thử nghiệm ứng dụng
* Kiểm thử Fuzz đề cập đến việc sử dụng dữ liệu ngẫu nhiên khi kiểm tra ứng dụng để xem liệu chúng có gặp lỗi không
* Đây là hai loại thử nghiệm khác nhau. Tuy nhiên, trong một khoảng thời gian, các tên này đã được sử dụng thay thế cho nhau và thử nghiệm Monkey được sử dụng để chỉ phong cách thử nghiệm nói chung.

Kết Luận

Bài viết này mình muốn chia sẻ về kỹ thuật monkey testing mà mình đã tìm hiểu được mong rằng có thể giúp ích cho mọi người ! Hẹn gặp mọi người ở bài chia sẻ phần 2. 

Nguồn tham khảo: http://tryqa.com/what-is-monkey-testing-advantages-and-disadvantages/