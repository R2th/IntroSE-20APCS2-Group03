Trong bài viết trước, mình đã giới thiệu cho các bạn về lý thuyết trò chơi và hai ví dụ kinh điển trong Zero-Sum Games. Trong bài viết này, mình sẽ tiếp tục trình bày các ví dụ về loại trò chơi khác đó là Nonzero-Sum Games.

# Nonzero-Sum Games

## Bài toán hai tù nhân

Bài toán như sau, hai tù nhân (người chơi 1 và 2) phạm tội cùng nhau và bị thẩm vấn riêng. Mỗi tù nhân chỉ có hai lựa chọn: Anh ta có thể ‘hợp tác’ (C) có nghĩa là ‘không phản bội đồng đội của mình’ hoặc anh ta có thể ‘không hợp tác’ (D), có nghĩa là ‘phản bội đồng đội của mình’. Hình phạt cho tội ác là 10 năm tù. Phản bội làm giảm 1 năm cho kẻ phản bội. Nếu một tù nhân không bị phản bội, anh ta sẽ bị kết án 1 năm.

Ta có thể thiết lập bảng giá trị như sau:

| |C|D|
|--|--|--|
|C|-1, -1|-10, 0|
|D|0, -10|-9, -9|

Nếu đã đọc bài viết trước, bạn sẽ thấy bảng giá trị này được thiết lập tương tự, nhưng bây giờ có hai phần thưởng ở mỗi vị trí. Theo quy ước, số đầu tiên là phần thưởng cho người chơi 1 (người chơi tính theo hàng) và số thứ hai là phần thưởng cho người chơi 2 (người chơi tính theo cột). Dễ thấy trò chơi không còn là tổng bằng không và chúng ta phải viết ra cả hai số ở mỗi vị trí bảng giá trị.

Đối với cả hai người chơi, C là một lựa chọn bị **chi phối mạnh**. Quan sát bảng giá trị D luôn tốt hơn C, cho dù người chơi còn lại chọn bất cứ lựa chọn nào. Vì vậy, một cách suy luận rất tự nhiên rằng kết quả của trò chơi này sẽ là cặp lựa chọn (D, D), dẫn đến phần thưởng (-9, -9). Do sự tồn tại của các lựa chọn bị chi phối mạnh, bài toán hai tù nhân rất dễ cho ta phân tích.

Nhưng quan sát trò chơi, ta thấy rằng việc cùng chọn D không phải là một lựa chọn tối ưu cho cả 2 người chơi. 2 người chơi hoàn toàn có thể cùng chọn C (hợp tác). Tuy nhiên, nếu xét trên phương diện cá nhân, thì việc chọn cặp (C,C) vô cùng hên xui vì ta không biết được rằng đối phương sẽ chọn cách nào :D Ứng dụng của trò chơi này được mở rộng ra cho rất nhiều bài toán kinh tế, liên quan đến việc hợp tác, rất thú vị phải không :) 

## Trận chiến giữa một cặp đôi

Nội dung trò chơi như sau, một người đàn ông và một người phụ nữ muốn đi chơi cùng nhau, đi xem một trận đấu bóng đá hoặc một buổi biểu diễn ba lê. Người đàn ông thích xem bóng đá và người phụ nữ thích xem múa ba lê. Cơ mà, họ đã quên thỏa thuận xem sẽ đi đâu vào tối hôm đó :D. Hai địa điểm xem bóng đá và biểu diễn ba lê ở hai nơi khác nhau và họ phải tự quyết xem đi đâu. Người đàn ông và người phụ nữ không có phương tiện giao tiếp. Nhưng đi đâu không quan trọng, điều quan trọng là họ được ở bên nhau :D

Ta thiết lập được bảng giá trị mô phỏng tình huống của trò chơi này như sau:

| |Bóng đá|Ba lê|
|--|--|--|
|Bóng đá|2,1|0,0|
|Ba lê|0,0|1,2|

Quan sát ta thấy không có người chơi nào có lựa chọn bị chi phối. Vấn đề là hai người chơi phải phối hợp mà không thể giao tiếp. Bây giờ giả sử là hôm trước họ đã nói chuyện về bóng đá rất lâu. Hai người chơi nhớ điều này và cũng có thể nghĩ rằng người kia nhớ điều này, khi đó khả năng cao là họ cùng đi xem bóng đá :D Trong trường hợp mà họ không có đề cập gì tới chuyện đi xem bóng đá hay ba lê trước đó, thật khó để đưa ra một dự đoán duy nhất cho trò chơi này. Tuy nhiên, ta có nhận xét rằng sự kết hợp (Bóng đá, Bóng đá) và (Ba lê, Ba lê) là lựa chọn tốt nhất cho hai người. Nếu người đàn ông chọn bóng đá (hoặc ba lê), thì người phụ nữ chọn bóng đá (hoặc Ba lê) là tối ưu. Trong lý thuyết trò chơi, các kết hợp lựa chọn như vậy được gọi là cân bằng Nash. Khái niệm cân bằng Nash là khái niệm giải pháp chính được phát triển trong lý thuyết trò chơi. Bài toán Trận chiến giữa một cặp đôi mô phỏng cho các vấn đề liên quan tới sự phối hợp. 

## Hai công ty

Hai công ty cùng sản xuất một sản phẩm giống nhau. Giá thị trường của sản phẩm này bằng $p = 1 - Q$ hoặc bằng 0 (nếu $Q$ lớn hơn $1$), trong đó $Q$ là tổng số lượng được sản xuất. Giả định không tính chi phí sản xuất.

Ta coi hai công ty là hai người chơi 1 và 2. Mỗi người chơi $i = 1,2$ chọn một lượng $q_i \ge 0$ và thu được lợi nhuận $K_i(q_1, q_2) = q_i(1-q_1-q_2)$ (hoặc bằng $0$ nếu $q_1+q_2 \ge 1)$. 

Giả sử người chơi 2 sản xuất $q_2 = 1/3$. Sau đó người chơi 1 tối đa hóa lợi nhuận của mình $q_1(1-q_1-1/3)$ bằng cách chọn $q_1 = 1/3$. Ngược lại: Nếu người chơi 1 chọn $q_1 = 1/3$ thì $q_2 = 1/3$ tối đa hóa lợi nhuận cho người chơi 2. Sự kết hợp của các chiến lược này là tối ưu cho cả 2 và được gọi là cân bằng Nash. Tuy nhiên, đây vẫn chưa phải là tối ưu toàn cục. Nếu cả hai người chơi cùng sản xuất một lượng là $1/4$ thì sẽ tốt hơn.


# Tổng kết

Vậy là trong bài viết này, mình đã trình bày 3 ví dụ cơ bản về Nonzero-Sum Games. Ý tưởng cũng giống như Zero-sum Games là ta thiết lập được bảng giá trị hay các ma trận phân tích, khả năng có thể xảy ra. Trong Nonzero-Sum Games không hoàn toàn mang tính cạnh tranh, mà ta có thể cùng phối hợp, hợp tác để mang đến kết quả tối ưu cho đôi bên. Việc cần thiết là tìm được điểm cân bằng hoặc tối ưu. Các ví dụ trên đều mô phỏng cho những vấn đề kinh điển liên quan tới hợp tác trong kinh tế. 

Trong các bài viết sau mình sẽ đề cập những loại game khác cùng các ví dụ. Hãy tiếp tục đón chờ nhé :D

# Tài liệu tham khảo

1. Giải thuật và lập trình - Thầy Lê Minh Hoàng
2. [cp-algorithms.com](https://cp-algorithms.com/)
3. Handbook Competitive Programming - Antti Laaksonen
4. Competitve programming 3 - Steven Halim, Felix Halim
5. Game Theory - Giacomo Bonanno