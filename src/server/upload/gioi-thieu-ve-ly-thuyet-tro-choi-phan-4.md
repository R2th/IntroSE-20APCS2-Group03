Trong bài viết này mình sẽ giới thiệu về trò chơi liên quan tới sự hợp tác (Cooperative games) Khác với 3 loại trò chơi mà mình giới thiệu trong các bài viết trước cần có sự cạnh tranh giữa các người chơi để tối ưu phần thưởng cho từng cá nhân. Trong trò chơi có sự hợp tác, trọng tâm ở đây là cần kết hợp lại với nhau để thu được phần thưởng lớn nhất cho các bên. Cụ thể hãy xem các ví dụ bên dưới nhé :)

# Cooperative Games

## Sự hợp tác của ba thành phố

Các thành phố 1, 2 và 3 muốn được kết nối với nguồn điện gần đó. Các đường dây truyền tải điện và chi phí của chúng được thể hiện trong hình dưới. Mỗi thành phố có thể thuê bất kỳ đường dây truyền tải điện nào. Nếu các thành phố hợp tác trong việc thuê các đường dây truyền tải điện thì họ sẽ tiết kiệm được chi phí thuê (các đường dây có dung lượng không giới hạn).

![Imgur](https://imgur.com/V5t3ZcN.png)

Ta có thể mô hình hóa bài toán trên. Những người chơi trong bài toán này là ba thành phố. Ta kí hiệu ba người chơi bằng tập $N = {1,2,3}$. Những người chơi này có thể tạo thành một _liên minh_: Bất kỳ tập con $S$ nào của $N$ thì được gọi là liên minh. Bảng dưới mô tả chi phí cũng như số tiền tiết kiệm được của mỗi liên minh.

| $S$    | $\{1\}$ | $\{2\}$ | $\{3\}$ | $\{1,2\}$ | $\{1,3\}$ | $\{2,3\}$ | $\{1,2,3\}$ |
| ------ | ------- | ------- | ------- | --------- | --------- | --------- | ----------- |
| $c(S)$ | 100     | 140     | 130     | 150       | 130       | 150       | 150         |
| $v(S)$ | 0       | 0       | 0       | 90        | 100       | 120       | 220         |

Chi phí $c(S)$ được tính bằng tổng chi phí nhỏ nhất cho đường dây truyền tải nối các thành phố trong liên minh $S$ với nguồn điện. Số tiền tiết kiệm $v(S)$ được xác định bởi công thức: $v(S) = \sum_{i \in S}c({i})-c(S)$ với mỗi $S \subset N$, $S$ khác tập rỗng. Cặp $(N, v)$ được gọi là _cooperative game_.

Các câu hỏi cơ bản trong cooperative game $(N,v)$ đó là:

- Những liên minh như nào sẽ được thành lập?
- Phần thưởng thu được của liên minh đó nên chia như nào giữa các thành viên?

Để thành lập liên minh, cần có sự đồng ý của mọi thành viên, nhưng có khả năng người chơi tham gia vào một liên minh phụ thuộc vào những gì người chơi nhận được trong liên minh đó. Trong bài viết này mình sẽ tập trung giải quyết câu hỏi 2. Do vậy, ta giả sử rằng liên minh $N$ được thành lập và vấn đề được rút gọn thành _phân phối giá trị $v(N)$_ cho các thành viên trong liên minh. Trong ví dụ trên, dễ thấy rằng 3 thành phố hợp tác với nhau thì tổng số tiền tiết kiệm được là lớn nhất ($v(N) = 220$). Vấn đề bây giờ là phần tiết kiệm được thì tính như nào cho 3 thành phố. Nói một cách khác, ta cần tìm một vector **x** $=(x_1, x_2, x_3) \in \R^3$ sao cho $x_1 + x_2 + x_3 = 220$ trong đó người chơi $i \in \{1,2,3\}$ tiết kiệm được $x_i$. Một cách suy nghĩ ngây thơ là $x_1 = x_2 = x_3 = 220/3$, nhưng cách này không phản ánh đúng thực tế bất đối xứng về số tiền tiết kiệm của các thành phố (các liên minh khác nhau có số tiền tiết kiệm khác nhau). Có 3 giải pháp cho vấn đề này có tên là _core_, _Shapley value_ và _nucleolous_.

Với giải pháp core, ta phân phối giá trị $x_1, x_2, x_3$ trong liên minh $N$ (tối ưu nhất) sao cho không liên minh nào khác tốt hơn. Điều đó có nghĩa là ta có các vector $(x_1,x_2,x_3)$ sao cho $x_1+x_2+x_3 \ge 220, x_1,x_2,x_3 \ge 0, x_1+x_2 \ge 90, x_1+x_3 \ge 100, x_2+x_3 \ge 120$. Tập các vector thỏa mãn điều kiện trên rất lớn và ta không thể coi đây là một đáp án cho bài toán.

Ngược lại, với Shapley value, mỗi thành phố nhận được _đóng góp trung bình_ của mình vào giá trị tiết kiệm của liên minh. Chính xác hơn, hãy tưởng tượng lần lượt từng thành phố bước vào ‘phòng thương lượng’, giả sử bắt đầu từ thành phố đầu tiên đến thành phố thứ 2 và cuối cùng là thành phố thứ 3. Khi thành phố 1 bước vào, thành phố này sẽ tự thành lập một liên minh, liên minh có số tiền tiết kiệm bằng 0. Khi thành phố 2 vào phòng thương lượng, liên minh sẽ thành $\{1,2\}$, do đó số tiền tiết kiệm được mà thành phố 2 đã đóng góp là $v(\{1,2\}) - v(\{1\}) = 90-0=90$. Cuối cùng, khi thành phố 3 vào, liên minh sẽ thành $\{1,2,3\}$, đây là liên minh lớn nhất. Thành phố 3 tiếp tục đóng góp $v(N) - v(\{1,2\}) = 220 - 90 = 130$ vào số tiền tiết kiệm được của liên minh. Do vậy, ta thu được vector phần thưởng là $(0, 90, 130)$. Okay :) giờ đây ta tính Shapley value bằng cách thay đổi thứ tự thành phố vào phòng thương lượng. Có tất cả 6 cách thay đổi thứ tự. Sau đó lấy giá trị trung bình của sáu vector phần thưởng. Trong ví dụ này, kết quả là phân phối $(65, 75, 80)$, một vector duy nhất :D.

Giải pháp nucleolus cũng cho ta một vector kết quả duy nhất. Trong ví dụ này, đó là vector $(56 \frac{2}{3}, 76 \frac{2}{3}, 86 \frac{2}{3})$. Giải pháp nucleolus khá phức tạp để định nghĩa và tính toán. Do vậy, trong khuôn khổ bài viết chỉ dừng ở việc giới thiệu, mình sẽ trình bày kĩ hơn về nucleolus cũng như 2 giải pháp trên trong bài viết sau nhé :)

## Trò chơi găng tay

Giả sử có 3 người chơi 1,2 và 3. Người chơi 1 và 2 mỗi người có một chiếc găng tay bên phải, trong khi người chơi 3 có một chiếc găng tay bên trái. Một đôi găng tay có giá trị bằng 1. Những người chơi này hợp tác để tạo thành những đôi găng tay :). Đôi găng tay ở đây được coi là phần thưởng của trò chơi.

Ta có bảng giá trị của các liên minh như sau:

| $S$    | $\{1\}$ | $\{2\}$ | $\{3\}$ | $\{1,2\}$ | $\{1,3\}$ | $\{2,3\}$ | $\{1,2,3\}$ |
| ------ | ------- | ------- | ------- | --------- | --------- | --------- | ----------- |
| $v(S)$ | 0       | 0       | 0       | 0         | 1         | 1         | 1           |

Sử dụng giải pháp core và nucleolus cho ta chính xác 1 vector phân phối phần thưởng. Sử dụng Shapley value cho ta vector phân phối phần thưởng là $(1/6,1/6,2/3)$.

## Trò chơi hoán vị

Ông Adam, bà Benson và ông Halley có các cuộc hẹn với nha sĩ lần lượt vào thứ Hai, thứ Ba và thứ Tư. Do nhiều yếu tố, họ có các lợi ích khi đến nha sĩ vào các ngày khác nhau. Cụ thể các lợi ích này được phần thưởng hóa :) trong bảng sau

|        | Mon | Tue | Wed |
| ------ | --- | --- | --- |
| Adam   | 2   | 4   | 8   |
| Benson | 10  | 5   | 2   |
| Halley | 10  | 6   | 4   |

Ví dụ này dẫn đến một trò chơi trong đó các liên minh có thể đạt được phần thưởng bằng cách thay đổi thời gian các cuộc hẹn của họ. Ví dụ: Adam (người chơi 1) và Benson (người chơi 2) có thể đổi thời gian đến nha sĩ cho nhau và nhận được tổng số phần thưởng là 14 thay vì 7. Bảng phần thưởng lớn nhất của các liên minh được mô tả như sau

| $S$    | $\{1\}$ | $\{2\}$ | $\{3\}$ | $\{1,2\}$ | $\{1,3\}$ | $\{2,3\}$ | $\{1,2,3\}$ |
| ------ | ------- | ------- | ------- | --------- | --------- | --------- | ----------- |
| $v(S)$ | 2       | 5       | 4       | 14        | 18        | 9         | 24          |

Áp dụng giải pháp core, ta thu được kết quả phân phối phần thưởng là bao lồi của các vector $(15,5,4), (14,6,4). (8,6,10)$ và $(9,5,10)$. Với giải pháp Shapley value, ta thu được vector phân phối phần thưởng là $(9 \frac{1}{2}, 6 \frac{1}{2}, 8)$. Cuối cùng, nucleolus cho ta vector $(11 \frac{1}{2}, 5 \frac{1}{2}, 7)$

## Trò chơi bỏ phiếu

Hội đồng Bảo an các quốc gia bao gồm 5 thành viên thường trực (Hoa Kỳ, Nga, Anh, Pháp và Trung Quốc) và mười thành viên khác. Các thay đổi phải được ít nhất 9 thành viên, bao gồm tất cả các thành viên thường trực chấp thuận. Tình huống này dẫn đến một trò chơi bình chọn 15 người chơi được gọi là $(N,v)$ với $v(S) = 1$ nếu liên minh $S$ chứa 5 thành viên thường trực và ít nhất 4 thành viên không thường trực, và $v(S) = 0$ nếu ngược lại. Trò chơi có giá trị 0 hoặc 1 cũng được gọi là trò chơi đơn giản. Các liên minh có giá trị bằng 1 được coi là thắng, các liên minh khác được coi là thua.

Giải pháp cho một trò chơi biểu quyết như vậy được hiểu là đại diện cho sức mạnh của một người chơi, chứ không phải là phần thưởng hoặc lợi ích như 3 ví dụ trước.

# Tổng kết

Vậy bản chất của Cooperative games đó là các lựa chọn phương án tối đa lợi ích cho liên minh (những người chơi hợp tác với nhau). Sau đó phân phối phần thưởng này cho từng thành viên trong liên minh. Phân phối phần thưởng được tìm bằng cách sử dụng các giải pháp core, Shapley value và nucleolus. Cooperative games xuất hiện rất nhiều trong cuộc sống :) Bạn hãy thử tìm hiểu xung quanh mình nhé :D. Mình đã kết thúc series giới thiệu về lý thuyết trò chơi. Trong các bài viết về lý thuyết trò chơi sau, mình sẽ tập trung trình bày về các chiến lược tư duy trong trò chơi, cùng các định nghĩa và xây dựng phương án. Cùng đón chờ nhé :D

# Tài liệu tham khảo

1. Giải thuật và lập trình - Thầy Lê Minh Hoàng
2. [cp-algorithms.com](https://cp-algorithms.com/)
3. Handbook Competitive Programming - Antti Laaksonen
4. Competitve programming 3 - Steven Halim, Felix Halim
5. Game Theory - Giacomo Bonanno