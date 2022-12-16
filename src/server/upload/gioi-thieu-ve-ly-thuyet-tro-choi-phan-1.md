Thời gian gần đây nổi lên một bộ phim rất nổi tiếng của Hàn Quốc là Squid Game. Bộ phim đang là cơn sốt trên toàn thế giới, ắt hẳn bạn cũng là người đã xem bộ phim đó chứ :) Đã chơi game thì ai cũng muốn dành chiến thắng :D Tất nhiên, trong bất cứ game nào cũng vậy, luôn có những tips và tricks để bạn gia tăng khả năng thắng trò chơi. Trong lập trình thi đấu, vấn đề về các trò chơi được khai thác dưới những bài toán hết sức thú vị và gần gũi. Điều này làm cho việc lập trình trở nên bớt khô khan hơn rất nhiều :) Chủ đề về trò chơi trong lập trình thi đấu với các bài toán được trải từ dễ đến khó. Nói là trò chơi nhưng tất cả cũng quy về một vấn đề đó là **đưa ra lựa chọn và chiến lược tối ưu nhất**. Nắm được điều này thì bạn sẽ trở thành "vua trò chơi" trong một ngày không xa :D

# Tổng quan

Những bài toán trò chơi trong lập trình thi đấu thường sử dụng những nguyên tắc cơ bản trong **Lý thuyết trò chơi**. Một cách hàn lâm, ta định nghĩa Lý thuyết trò chơi nghiên cứu các tình huống cạnh tranh và hợp tác giữa các bên liên quan bằng cách sử dụng các phương pháp toán học. Đây là một định nghĩa rộng nhưng nó phù hợp với số lượng lớn các ứng dụng trong đời sống. Những ứng dụng này bao gồm từ các câu hỏi chiến lược trong chiến tranh đến tìm hiểu cạnh tranh kinh tế, đặc biệt lý thuyết trò chơi còn xuất hiện trong chính trị, ví dụ như: Hệ thống bỏ phiếu chính trị,...

Lý thuyết trò chơi là một ngành toán học chính thức nhưng nó được phát triển và áp dụng hầu hết bởi các nhà kinh tế học. Trong khuôn khổ bài viết này, mình sẽ tập trung nói về chủ đề lý thuyết trò chơi trong lập trình thi đấu. Để cách tiếp cận trở nên đơn giản hơn, mình sẽ trình bày dưới hình thức những ví dụ nha :D Những ví dụ này chưa cần phải code nhiều mà sẽ là những chiến lược sử dụng toán học. Khi nắm được những chiến lược này thì việc triển khai code sẽ không quá khó khăn.

Trong series giới thiệu về lý thuyết trò chơi, mình sẽ trình bày 5 ví dụ về các loại trò chơi như: Zero-Sum Games, Nonzero-Sum Games, Extensive Form Games, Cooperative Games (trò chơi hợp tác), Bargaining Games (trò chơi đàm phán). 


# Zero-Sum Games

## Trận chiến trên biển Bismarck

Ví dụ đầu tiên được dựa trên một tình huống quân sự diễn ra trong Thế chiến thứ hai.

Trò chơi lấy bối cảnh ở Nam Thái Bình Dương vào năm 1943. Đô đốc Imamura người Nhật phải vận chuyển quân vượt biển Bismarck đến New Guinea và đô đốc người Mỹ Kenney muốn ném bom những tàu vận tải này. Imamura có hai sự lựa chọn có thể xảy ra: Tuyến đường ngắn phía Bắc (2 ngày) hoặc tuyến đường dài phía Nam (3 ngày) và Kenney phải chọn một trong các tuyến đường này để đưa các máy bay của mình. Nếu chọn sai đường, Kenny có thể gọi lại các máy bay và chuyển hướng chúng theo con đường khác, nhưng số ngày ném bom giảm đi 1. Ta giả định rằng số ngày ném bom có lợi cho đội quân của Kenny và mang thiệt hại cho đội quân của Imamura. 

Trận chiến trên biển Bismarck có thể được mô hình hóa bằng cách sử dụng bảng sau:

| |Bắc|Nam|
|--|--|--|
|Bắc|2|2|
|Nam|1|3|

Bảng này đại diện cho một trò chơi có hai người chơi, đó là Kenney và Imamura, rất thú vị phải không :D. Mỗi người chơi có hai sự lựa chọn khả thi; Kenney (người chơi 1) chọn một hàng, Imamura (người chơi 2) chọn một cột và những lựa chọn này phải được thực hiện độc lập và đồng thời. Những con số đại diện cho **phần thưởng** của Kenney. Ví dụ: Kết quả 2 ở góc trên bên trái có nghĩa là nếu Kenney và Imamura đều chọn Bắc, phần thưởng cho Kenney là 2 và phần thưởng cho Imamura là -2 (giá trị âm thể hiện sự thiệt hại). Do đó, ta quy ước là các giá trị biểu thị cho **các khoản thanh toán** từ người chơi 2 (chọn cột) đến người chơi 1 (chọn hàng). Như ví dụ trên, Imamura đã phải thanh toán cho Kenny một giá trị là 2. Trò chơi này là một ví dụ về *trò chơi có tổng bằng không* vì tổng giá trị của các phần thưởng từ tất cả người chơi luôn luôn bằng không.

Trong ví dụ này, mục tiêu đối với Kenny là có số phần thưởng lớn nhất, còn với Imamura là tối thiểu số thiệt hại phải nhận. Quan sát bảng giá trị ở trên, dễ thấy rằng, bằng cách chọn hướng Bắc, Imamura sẽ có tổng thiệt hại ít nhất. Vì vậy, ta đánh giá an toàn khi Imamura chọn Bắc. Tất nhiên với Kenney, khả năng cao ông ta cũng suy luận được điều này, sau đó cũng sẽ chọn Bắc, vì đó là câu trả lời tốt nhất cho lựa chọn hướng Bắc của Imamura. Quan sát bảng giá trị, dễ thấy rằng, dù Kenny có chọn hướng nào thì việc chọn hướng Bắc vẫn là tốt nhất cho Imamura.

Một cách khác, tại vị trí (Bắc, Bắc) với giá trị 2 là cực đại trong cột của nó $(2 \ge 1)$ và nhỏ nhất trong hàng của nó $(2 \ge 2)$. Vị trí như vậy trong ma trận được gọi là **điểm yên ngựa**. Dễ thấy rằng, tại điểm yên ngựa, người chơi theo hàng (Kenny) *tối đa hóa phần thưởng tối thiểu* của mình (vì $2 = min\{2, 2\} \ge 1 = min\{1, 3\}$), và người chơi theo cột (Imamura) *giảm thiểu thiệt hại tối đa* mà ông ta sẽ đối mặt (vì $2 = max\{2,1\} \le 3 = max\{2, 3\}$). Giá trị phần thưởng '2' từ người chơi 2 đến người chơi 1 được gọi là **giá trị của trò chơi**.

## Đồng xu

Trò chơi được mô tả như sau: Hai người chơi đều có một đồng xu và thực hiện tung. Nếu 2 đồng xu cùng sấp hoặc cùng ngửa, người chơi 2 đưa đồng xu của mình cho người chơi 1. Ngược lại, người chơi 1 đưa đồng xu của mình cho người chơi 2.

Dễ thấy đây là một Zero-Sum game, từ đó ta có bảng giá trị phần thưởng với người chơi 1 theo hàng, người chơi 2 theo cột như sau: 

| |Sấp|Ngửa|
|--|--|--|
|Sấp|1|-1|
|Ngửa|-1|1|

Ta có nhận xét rằng trong trò chơi này, không có lựa chọn chi phối đến từ 1 trong 2 người chơi như ở ví dụ đầu tiên. Ngoài ra, trò chơi này không có **điểm yên ngựa**, tức là không có vị trí nào trong bảng giá trị mà tại đó đồng thời đạt giá trị nhỏ nhất trong hàng và giá trị lớn nhất trong cột. Vì vậy, rõ ràng không có một cách tự nhiên để giải quyết trò chơi. Một cách xử lý vấn đề này là để cho người chơi chọn ngẫu nhiên sấp ngửa đồng xu của họ: Đồng xu của người chơi 1 có xác suất sấp là $p$ và tất nhiên xác suất ngửa sẽ là $1-p$. Khi đó, người chơi 2 có xác suất đồng xu sấp là $q$ và ngửa là $1-q$ tương ứng. Xét tính đối xứng, ta dự đoán xác suất chọn sấp hoặc ngửa của người chơi 1 là $1/2$. Khi đó, **kì vọng phần thưởng** cho người chơi 1 sẽ là: $1/2 * [q * 1 + (1-q) * -1] + 1/2 * [q * -1 + (1-q) * 1]$. Quan sát ta thấy giá trị kì vọng bằng 0, độc lập với $q$. Vì vậy, bằng cách chọn ngẫu nhiên giữa hai lựa chọn, người chơi 1 có thể đảm bảo nhận được 0 trong kỳ vọng (tất nhiên, kết quả thực sự nhận được luôn là -1 hoặc 1). Tương tự, người chơi 2, bằng cách chọn sấp hoặc ngửa với xác suất $1/2$, sẽ nhận được 0 trong kỳ vọng như người chơi 1. Do đó, giá trị 0 đóng một vai trò tương tự như một điểm yên ngựa. Ta có thể nói rằng 0 là giá trị của trò chơi này.


# Tổng kết

Vậy là trong bài viết này, mình đã trình bày 2 ví dụ cơ bản về Zero-Sum Games, cũng như các khái niệm cơ bản khi bạn nghiên cứu về lý thuyết trò chơi. Ý tưởng chính là ta thiết lập được bảng giá trị hay các ma trận phân tích, phán đoán các nước đi đối phương, khả năng có thể xảy ra. Zero-Sum Games xuất hiện rất nhiều trong thực tế, đặc biệt là trong kinh tế, thương mại, tài chính. Ví dụ, hai doanh nghiệp hoạt động trên một thị trường có dung lượng cố định (tổng nhu cầu, doanh thu không đổi). Trong tình huống này, một trong hai doanh nghiệp chỉ có thể tăng doanh thu và thị phần của mình bằng cách làm giảm doanh thu và thị phần của đối thủ cạnh tranh một cách tương ứng. Một ví dụ khác là trong các trò chơi liên quan đến cờ bạc, cá cược,... đây là những trò chơi mà nhà nước chủ trương nghiêm cấm. 

Okay cũng khá dài rồi! Trong các bài viết sau mình sẽ đề cập những loại game khác cùng các ví dụ. Hãy đón chờ nhé :D

# Tài liệu tham khảo

1. Giải thuật và lập trình - Thầy Lê Minh Hoàng
2. [cp-algorithms.com](https://cp-algorithms.com/)
3. Handbook Competitive Programming - Antti Laaksonen
4. Competitve programming 3 - Steven Halim, Felix Halim
5. Game Theory - Giacomo Bonanno