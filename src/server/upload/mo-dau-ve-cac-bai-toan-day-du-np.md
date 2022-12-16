# Giới thiệu

Tất cả các thuât toán phổ thông trong chương trình cấp 3 và trong môn Cấu trúc dữ liệu và giải thuật tại Đại học mà chúng ta tìm hiểu đều là các thuật toán thời gian đa thức. Đó là từ đầu vào có kích thước $n$, thời gian thực hiện thuật toán trong trường hợp xấu nhất là $O(n^k)$ với một hằng $k$. Một câu hỏi rất tự nhiên đặt ra là: Tất cả các bài toán có thể giải theo thời gian đa thức không? Câu trả lời tất nhiên là không. Khi người ta bắt đầu nghiên cứu độ phức tạp tính toán một cách nghiêm túc, đã có một số tiến bộ ban đầu trong việc chứng minh rằng một số vấn đề _cực kỳ khó_ không thể giải được bằng các thuật toán. Đối với nhiều bài toán liên quan đến tối ưu hóa, trí tuệ nhân tạo, tổ hợp, logic,... các vấn đề trở nên quá khó để giải quyết và nó vẫn còn bỏ ngỏ kể từ đó. **Big problem** ở đây là ta không biết về các thuật toán thời gian đa thức đối với những vấn đề này, và ta cũng không thể chứng minh rằng không tồn tại thuật toán thời gian đa thức. Ví dụ cụ thể hơn đó là "bài toán treo" (Halting problem) nổi tiếng của Alan Turing không thể giải bởi bất kì máy tính nào, cho dù được được cung cấp bao nhiêu thời gian :) Ngoài ra, có những bài toán có thể giải được nhưng không phải trong thời gian $O(n^k)$ với một hằng $k$. Về cơ bản, ta có thể nói rằng, các bài toán giải được trong thời gian đa thức là các bài toán "dễ trị" và các bài toán yêu cầu thời gian siêu đa thức là "khó trị".

Hầu hết các nhà khoa học máy tính lý thuyết đều tin rằng các bài toán đầy đủ NP đều khó trị. Lý do là nếu có thể giải bất kỳ bài toán đầy đủ NP đơn lẻ nào trong thời gian đa thức thì mọi bài toán đầy đủ NP sẽ có một thuật toán thời gian đa thức. Căn cứ vào phạm vi rộng các bài toán đầy đủ NP được nghiên cứu cho tới nay, mà không có sự tiến bộ nào về phía một giải pháp thời gian đa thức, ta thực sự ngạc nhiên nếu như có thể giải tất cả chúng trong thời gian đa thức.

Trong chuỗi các bài viết về tính đầy đủ NP, ta sẽ đào sâu các khía cạnh của những vấn đề này, điều đó liên quan trực tiếp nhất đến việc phân tích của các thuật toán.

# Đầy đủ NP

Tên Đầy đủ NP (tiếng Anh là NP-complete) là viết tắt của "nondeterministic polynomial-time complete". Trong tên gọi này, "nondeterministic" đề cập đến máy nondeterministic Turing machines, một cách chính thức hóa toán học về ý tưởng của một thuật toán tìm kiếm brute-force. Polynomial-time (thời gian đa thức) đề cập đến khoảng thời gian được coi là "nhanh" đối với thuật toán xác định để kiểm tra một giải pháp duy nhất hoặc để nondeterministic Turing machines thực hiện toàn bộ tìm kiếm. "Complete" đề cập đến thuộc tính có thể mô phỏng mọi thứ trong cùng một lớp phức tạp (Lớp phức tạp là một tập hợp các vấn đề tính toán về độ phức tạp dựa trên tài nguyên có liên quan. Hai tài nguyên thường được phân tích là thời gian và bộ nhớ).

Trong lý thuyết tính toán độ phức tạp, một bài toán được coi là "đầy đủ NP" khi:
- Đó là một vấn đề mà tính đúng của từng giải pháp có thể được xác minh nhanh chóng và thuật toán tìm kiếm "duyệt trâu" thực sự có thể tìm ra giải pháp bằng cách thử tất cả các giải pháp có thể.
- Vấn đề có thể được sử dụng để mô phỏng mọi vấn đề khác mà ta có thể nhanh chóng xác minh rằng một giải pháp là đúng. Theo nghĩa này, đây phải là vấn đề khó nhất trong số các vấn đề có giải pháp để nếu ta thực sự có thể tìm ra giải pháp của một số vấn đề đầy đủ NP thì ta có thể nhanh chóng tìm ra giải pháp của mọi vấn đề khác mà giải pháp đã từng được đưa ra là dễ kiểm tra.

# Lịch sử

Khái niệm đầy đủ NP được đưa ra vào năm 1971. Tại hội nghị STOC năm 1971, đã có một cuộc tranh luận gay gắt giữa các nhà khoa học máy tính về việc liệu các bài toán đầy đủ NP có thể được giải trong thời gian đa thức trên một máy Turing xác định hay không. John Hopcroft đã đưa mọi người tại hội nghị đồng thuận rằng câu hỏi về việc liệu các bài toán đầy đủ NP có thể giải được trong thời gian đa thức hay không nên được tạm dừng để giải quyết vào một thời điểm nào đó sau này, vì không ai có bất kỳ bằng chứng chính thức nào cho tuyên bố của họ theo cách này hay cách khác. Đây được gọi là "câu hỏi liệu P = NP".

Chưa ai có thể xác định một cách chính xác liệu các bài toán NP-đầy đủ có thực sự có thể giải được trong thời gian đa thức hay không, điều này khiến đây trở thành một trong những bài toán lớn chưa giải được của toán học. Viện Toán học Clay sẽ trao phần thưởng 1 triệu đô la Mỹ cho bất kỳ ai có thể chứng minh được P = NP hoặc P ≠ NP.

# Các bài toán đầy đủ NP

Một số bài toán đầy đủ NP phổ biến đó là: 
- Bài toán xếp ba lô
- Bài toán người bán hàng
- Cây Steiner nhỏ nhất
- Chu trình Hamilton
- Bài toán tập đỉnh độc lập
- Clique
- Bài toán thỏa mãn công thức logic
- Bài toán đồ thị con đẳng cấu
- Bài toán tô màu đồ thị

Ta sẽ tìm hiểu sâu hơn một số bài toán đầy đủ NP trong các bài viết sau.


# Giải quyết bài toán đẩy đủ NP

Hiện nay mọi thuật toán cho các bài toán NP-đầy đủ đều đòi hỏi thời gian lớn hơn đa thức của kích thước dữ liệu vào, và cũng không rõ liệu có tồn tại thuật toán nhanh hơn hay không.

Các phương pháp sau đây thường được áp dụng để giải quyết các bài toán tính toán nói chung, và trong nhiều trường hợp dẫn đến thuật toán nhanh hơn.

- Thuật toán xấp xỉ: Thay vì tìm kiếm lời giải tối ưu, chỉ cần tìm một lời giải "gần" tối ưu.
- Thuật toán ngẫu nhiên: Sử dụng bit ngẫu nhiên để giảm thời gian chạy trung bình, và cho phép thuật toán thất bại với một xác suất nhỏ (xem phương pháp Monte Carlo)
- Hạn chế: giải quyết một số trường hợp đặc biệt của dữ liệu vào bằng các thuật toán đặc biệt cho các trường hợp đó (ví dụ như đồ thị phẳng, điểm trong không gian Euclide).
- Độ phức tạp tham số: đưa ra thêm một số tham số, nếu trong trường hợp đặc biệt các tham số này là nhỏ thì thời gian chạy cũng nhanh hơn.
- Heuristic: có những thuật toán làm việc khá tốt trong nhiều trường hợp nhưng chưa thể chứng minh được chúng luôn cho kết quả tốt trong mọi trường hợp.


# Tài liệu tham khảo

1. [Wikipedia](https://en.wikipedia.org/wiki/NP-completeness)
2. Algorithms - Robert Sedgewick, Kevin Wayne
3. [cp-algorithms.com](https://cp-algorithms.com/)
4. Handbook Competitive Programming - Antti Laaksonen
5. Competitve programming 3 - Steven Halim, Felix Halim
6. Giải thuật và lập trình - Thầy Lê Minh Hoàng