Các vấn đề liên quan tới hình học trong lập trình thi đấu thường là những bài toán hay và khó. Bên cạnh cần những kiến thức cơ bản về toán hình, bạn còn cần phải có khả năng lập trình, tư duy giải thuật tốt. Trong các cuộc thi về lập trình thi đấu mình nhận ra các bài toán về hình học thường được các team làm cuối cùng cơ bản vì 2 lý do chính: Khó nhìn ra được luôn insight, hướng giải bài toán và nhiều trường hợp testcase phức tạp, rất khó để nhận biết, mà có biết thì cũng khó để xử lý. Để có được cải nhìn tổng quan về các vấn đề hóc búa liên quan tới hình học, bạn hãy tiếp tục theo dõi bài viết nhé :D

# Tổng quan

Nhiều vấn đề liên quan tới hình học đã được các nhà toán học nghiên cứu đầu tiên trong vài thế kỷ qua. Từ những năm 1970, hình học tính toán (computational geometry) đã được công nhận là ngành nghiên cứu có hệ thống các thuật toán hình học và cấu trúc dữ liệu cho phép thực thi chúng một cách hiệu quả. Các thuật toán này giải quyết nhiều vấn đề trong thế giới thực. Thông thường, các cấu trúc dữ liệu và thuật toán được trình bày trong bài viết này "khá" nâng cao" đối với chương trình giảng dạy đại học. Tuy nhiên, các bạn có thể dễ dàng tìm hiểu các cấu trúc này và các nguyên tắc đằng sau các thuật toán, sau đó áp dụng chúng vào các vấn đề không chỉ lập trình thi đấu.

# Phân tích bài toán

Để giải quyết các vấn đề liên quan tới hình học, tư duy cơ bản là ta cần phải phân tích xem vấn đề cho ta những dữ kiện gì để có thể đưa ra những chiến thuật giải quyết phù hợp. Một bài toán tính toán hình học cơ bản gồm các thành phần sau:

- Loại dữ liệu đầu vào
- Yêu cầu tính toán
- Bản chất của tác vụ

Hiểu đơn giản, giống như nấu ăn vậy :D các bạn cần xác định được: Nguyên liệu cho sẵn, xác định kĩ thuật nấu nướng, Hãy cùng mổ xẻ các thành phần này nhé :D

## Dữ liệu đầu vào

Đây chính là nguyên liệu của chúng ta :) Phải xác định nguyên liệu là gì ta mới có thể sử dụng các kĩ thuật nấu ăn phù hợp được. Một số "nguyên liệu" phổ biến trong các bài toán hình học đó là:

- Một tập các điểm trên mặt phẳng 2 chiều.
- Mật tập các đoạn thẳng trên mặt phẳng 2 chiều.
- Một tập các đa giác tùy ý trên mặt phẳng.

Các cấu trúc hai chiều (đường thẳng, hình chữ nhật và hình tròn) có các bản sao ba chiều (mặt phẳng, hình khối và hình cầu) và thậm chí cả các bản sao n chiều (chẳng hạn như siêu mặt phẳng, hypercubes và hyperspheres). Đối với các bài toán hình học nâng cao, loại dữ liệu đầu vào có thể mở rộng đến các chiều lớn hơn.

Thường thì trong kiến thức phổ thông, ta chỉ làm quen các cấu trúc 2 chiều, 3 chiều, còn những cấu trúc có chiều cao hơn thì rất hiếm. Tại sao mình lại đề cập đến các cấu trúc nhiều chiều? Hãy tham khảo một ví dụ thực tế như sau:

https://www.eharmony.com/ là một trang hẹn hò sử dụng các tri thức khoa học máy tính để tìm kiếm những người thích hợp với bạn. Sử dụng Hệ thống Đối sánh Tương thích đã được cấp bằng sáng chế (Bằng sáng chế Hoa Kỳ số 6.735.568), eHarmony dự đoán khả năng hòa hợp lâu dài giữa hai người. Tất cả người dùng của hệ thống (ước tính là 14 triệu người vào tháng 2 năm 2007) điền vào Bảng câu hỏi gồm 436 câu hỏi. Sau đó eHarmony xác định khoảng cách giữa hai người trong một không gian 29 chiều. Báo cáo của eHarmony vào tháng 11 năm 2003 rằng 91% người dùng của họ đã nhận được 10 kết quả phù hợp trở lên.

Dữ liệu đầu hay nguyên liệu đầu vào trong bài toán thực tế trên là một file gồm 14 triệu bản ghi. Mỗi bản ghi gồm 29 trường thông tin dạng số hoặc văn bản. Tất nhiên trong thực tế, dữ liệu thường bị thiếu ở một số trường hoặc bị điền sai.

Đó chính là ứng dụng thực tế của tính toán hình học trong thực tế, rất thú vị phải không :D Vấn đề hình học cơ bản ở đây đơn giản là: Cho một tập gồm 14 triệu điểm trong không gian 29 chiều, tìm điểm gần nhất của mỗi điểm trong tập trên.

## Yêu cầu tính toán

Thường các yêu cầu trong bài toán hình học xoay quanh 3 nhiệm vụ chung sau:

- **Truy vấn**: Chọn các phần tử trong tập đầu vào thỏa mãn điều kiện cho trước (ví dụ: gần nhất, xa nhất).
- **Tính toán**: Thực hiện một loạt các thao tác trên tập hợp đầu vào (ví dụ: đoạn thẳng) để tạo ra một số thành phần, cấu trúc hình học mới (ví dụ: các giao điểm trên các đoạn thẳng này). Kết quả của các thao tác là câu trả lời cho vấn đề được nêu.
- **Tiền xử lý**: Các thông tin ban đầu đề bài cho thường là dạng thông tin thô. Để có thể sử dụng các thuật toán vào các bước sau, ta cần đưa dữ liệu hay thông tin thô vào một hoặc nhiều cấu trúc dữ liệu phù hợp. Từ đó thuận tiện cho việc áp dụng thuật toán.

Dưới đây là một số ví dụ về các yêu cầu tính toán trong hình học cơ bản và ứng dụng trong thực tế:

| Hình học cơ bản                                                                                                                                                 | Ứng dụng thực tế                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tìm điểm gần nhất từ một điểm cho trước. Tìm điểm xa nhất từ ​​một điểm cho trước                                                                               | Từ vị trí của ô tô, hãy tìm trạm xăng gần nhất. Từ một trạm y tế, hãy tìm bệnh viện xa nhất để xác định thời gian di chuyển trong trường hợp xấu nhất.                                                                            |
| Xác định xem một đa giác có được coi là cơ bản hay không (nghĩa là hai cạnh không liên tiếp không được có cùng một điểm chung).                                 | Một con vật thuộc loài có nguy cơ tuyệt chủng được gắn một bộ phát vô tuyến phát ra vị trí của chúng. Các nhà khoa học muốn biết khi nào con vật đi qua con đường của chính nó để tìm những con đường chúng thường xuyên đi qua.  |
| Xác định đường tròn nhỏ nhất bao quanh một tập các điểm. Xác định đường tròn lớn nhất bên trong một tập hợp các điểm và đường tròn này không chứa một điểm nào. | Các nhà thống kê hoặc khoa học dữ liệu sử dụng các kỹ thuật khác nhau khi phân tích dữ liệu. Các vòng tròn bao quanh có thể xác định các cụm, trong khi khoảng trống lớn trong dữ liệu cho thấy dữ liệu bất thường hoặc bị thiếu. |
| Xác định các giao điểm trong một tập hợp các đoạn thẳng hoặc trong một tập hợp các hình tròn, hình chữ nhật hoặc đa giác tùy ý.                                 | Kiểm tra quy tác thiết kế VLSI.                                                                                                                                                                                                   |

## Bản chất của tác vụ

Một tác vụ hay yêu cầu được coi là tĩnh nếu như đầu vào và yêu cầu tính toán không thay đổi. Ngược lại, một tác vụ hay yêu cầu động thường gồm các yếu tố:

- Tập dữ liệu đầu vào có thể thay đổi
- Các yêu cầu tính toán có thể thay đổi trong thời gian thực thi.

# Những bài toán kinh điển

Trong phần này mình sẽ trình bày một số bài toán kinh điển về hình học trong lập trình thi đấu. Để giải quyết những vấn đề này một cách hiệu quả, ta cần phải biết cách kết hợp cấu trúc dữ liệu và sử dụng thuật toán phù hợp.

## Bao lồi

Nội dung bài toán như sau: Cho tập điểm $P$ trên một mặt phảng. Ta định nghĩa Bao lồi là tập lồi nhỏ nhất (theo diện tích, thể tích,…) mà tất cả các điểm đều nằm trong tập đó.

![Bao lồi](https://i.imgur.com/q88EWIg.png)

Bao lồi được tạo thành bởi $h$ đoạn thẳng, trong đó các điểm tạo nên $h$ đoạn thằng này được sắp xếp theo chiều kim đồng hồ $L_0, L_1,...,L_h$. Cho $n$ điểm bất kì, dễ dàng tính được ta có thể tạo **nhiều nhất** $C_n^3$ tam giác. Quan sát ta thấy điểm $p_i \in P$ **không nằm trong các điểm tạo nên bao lồi** nếu điểm đó nằm trong (tính cả nằm trên cạnh) một tam giác bất kì được tạo bởi 3 điểm phân biệt thuộc $P$. Ví dụ với hình trên ta thấy rằng điểm $p_{10}$ nằm trong tam giác được tạo bởi 3 điểm $p_7, p_{12}, p_9$, do đó $p_9$ không thuộc các điểm tạo nên bao lồi. Trong bài viết tiếp theo, mình sẽ trình bày kĩ các cách tiếp cận bài toán này và so sánh các thuật toán.

## Đếm số giao điểm của tập các đoạn thẳng

Bài toán được phát biểu đơn giản như sau: Cho tập các đoạn thẳng $S$ nằm trên một mặt phẳng. Xác định toàn bộ giao điểm của các đoạn thẳng này. Hoặc đơn giản hơn, chỉ cần xác định xem có tồn tại ít nhất một giao điểm trong tập các đoạn thẳng $S$ hay không.

Một suy nghĩ rất tự nhiên để giải bài toán này là ta xét từng cặp đoạn thẳng trong tập $S$ và kiểm tra xem chúng có giao nhau hay không. Có tất cả $C_n^2$ cặp đoạn thẳng, do đó độ phức tạp để thực hiện cách làm này là $O(n^2)$. Tuy nhiên trong bài viết tiếp theo mình sẽ trình bày thuật toán tối ưu hơn với độ phức tạp $O((n+k)\log n)$ trong đó $k$ là số giao điểm của các đoạn thẳng trong tập $S$.

## Bài toán truy vấn hàng xóm gần nhất

Nội dung bài toán như sau: Cho tập điểm $P$ trên một mặt phẳng. Tìm một điểm thuộc $P$ sao cho có khoảng cách với điểm $x$ là nhỏ nhất (tính theo khoảng cách Euclid). Lưu ý rằng điểm $x$ có thể không thuộc tập $P$.

Cho điểm $x$, ta thực hiện so sánh khoảng cách của điểm đó với tất cả các điểm khác trong $P$ để tìm điểm gần nhất. Điều này yêu cầu $O(n)$ bước tuyến tính. Để cải tiến thuật toán, ta có thể sử dụng cây để phân vùng các điểm trong mặt phẳng hai chiều nhằm giảm thời gian tìm kiếm. Chi phí thời gian của việc tiền xử lý tất cả các điểm trong
$P$ thành một cấu trúc hiệu quả sẽ được bù lại sau đó bằng cách tiết kiệm các tính toán truy vấn, độ phức tạp sẽ trở thành $O(\log n)$. Nếu số lượng truy vấn nhỏ, thì cách so sánh $O(n)$ tất nhiên là phù hợp nhất.

## Bài toán truy vấn theo phạm vi

Cho một hình chữ nhật $R$ được xác định bởi $[x_{low}, y_{low}, x_{high}, y_{high}]$ và tập hợp các điểm $P$, hãy tìm xem điểm nào thuộc tập $P$ nằm trong hình chữ nhật $R$?

Dễ dàng nhìn ra được thuật toán brute-force kiểm tra tất cả các điểm trong $P$ có nằm trong hình chữ nhật không với độ phức tạp $O(n)$. Nếu vậy thì đơn giản quá :D Ta đặt ra vấn đề khác là chúng ta có thể xây dựng thuật toán tối ưu hơn không? Đối với bài toán Truy vấn hàng xóm gần nhất, ta có thể tổ chức các điểm thành một kd - tree để xử lý các truy vấn lân cận gần nhất trong thời gian $O (\log n)$. Sử dụng cùng một cấu trúc dữ liệu, ta có thể xử lý vấn đề trên mặt phẳng Đề - các với độ phức tạp $O(\sqrt n + r)$ trong đó $r$ là số lượng điểm trong yêu cầu của truy vấn. Thật vậy, khi tập đầu vào chứa các điểm dữ liệu trong không gian $d$ chiều, giải pháp có thể mở rộng cho bài toán Truy vấn theo phạm vi $d$ chiều với độ phức tạp $O (n^{1-1 / d} + r)$.

# Tổng kết

Vậy trong bài viết mình đã trình bày những vấn đề kinh điển hay và khó trong hình học tính toán. Chính vì hay, khó và nhiều ứng dụng nên các vấn đề này xuất hiện khá nhiều trong các cuộc thi lập trình thi đấu lớn. Bên cạnh việc cài đặt thuật toán để giải quyết, ta cần có sự khéo léo trong việc sử dụng cấu trúc dữ liệu phù hợp. Chi tiết mình sẽ trình bày trong các bài viết sau, các bạn hãy đón đọc nhé :)

# Tài liệu tham khảo

1. Giải thuật và lập trình - Thầy Lê Minh Hoàng
2. [cp-algorithms.com](https://cp-algorithms.com/)
3. Handbook Competitive Programming - Antti Laaksonen
4. Competitve programming 3 - Steven Halim, Felix Halim