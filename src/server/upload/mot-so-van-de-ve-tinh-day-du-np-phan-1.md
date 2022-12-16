# Giới thiệu

Trong các bài viết trước về những thuật toán phổ thông, ta đã nghiên cứu và ứng dụng vào những vấn đề cụ thể. Những thuật toán này đều có những kĩ thuật xử lý của riêng chúng. Sẽ thật tuyệt với nều như nếu tất cả các vấn đề đều được giải quyết bằng các thuật toán hiệu quả sao cho các thuật toán này được thiết kế bởi một tập nhỏ các kĩ thuật. Nhưng không phức tạp thì không phải cuộc sống :D Vẫn có rất nhiều vấn đề mà chúng ta khó có thể giải quyết bằng cách áp dụng những kĩ thuật được học từ trước tới nay. Có thể là chúng ta chưa "try hard" đủ nhiều với những vấn đề khoai này, nhưng nếu cho dù có "try hard" thì có khi nào ta vẫn không thể tìm ra được một thuật toán tổng quát hiệu quả cho vấn đề hay không? Trong chuỗi bài viết về tính đầy đủ NP, ta sẽ cùng khám phá những vấn đề này.

# Thời gian chạy của thuật toán

Thời gian chạy của hầu hết các thuật toán mà chúng ta đã thấy cho đến nay đều bị giới hạn bởi đa thức của kích thước đầu vào. Các thuật toán như vậy được gọi là các *thuật toán hiệu quả* và các vấn đề tương ứng là các *vấn đề có thể giải quyết được*. Nói cách khác, chúng ta nói rằng một thuật toán hiệu quả nếu thời gian chạy của nó là $O(P(n))$, trong đó $P (n)$ là một đa thức với $n$ là kích thước đầu vào. Nhớ lại rằng kích thước của đầu vào được định nghĩa là số bit cần thiết để biểu diễn đầu vào đó. Lớp các vấn đề có thể được giải quyết bằng các thuật toán hiệu quả được ký hiệu là $P$ (cho thời gian đa thức). Đây có vẻ là một định nghĩa kỳ lạ :). Dễ thấy rằng, các thuật toán chạy trong thời gian $O(n^{10})$ không hiệu quả theo bất kỳ tiêu chuẩn nào (nếu theo tiêu chuẩn này, các thuật toán chạy trong thời gian $10^7n$ cũng không hiệu quả, mặc dù chúng là tuyến tính). Tuy nhiên, định nghĩa này có giá trị vì hai lý do. Đầu tiên, nó cho phép phát triển lý thuyết mà chúng ta sẽ tìm hiểu sắp tới; thứ hai, và quan trọng nhất, nó chỉ đơn giản là *hoạt động được* trong thực tế. Phần lớn các vấn đề có thể giải quyết được đều có giải pháp thực tế (tất nhiên, sẽ có một số giải pháp tốt hơn). Nói cách khác, thời gian chạy của các thuật toán đa thức mà chúng ta gặp trong thực tế hầu hết là đa thức bậc nhỏ (hiếm khi ở trên bậc hai). Điều ngược lại cũng thường đúng: Các thuật toán có thời gian chạy lớn hơn thời gian đa thức thường không áp dụng được cho các bài toán có đầu vào lớn. 

Có rất nhiều vấn đề mà không có thuật toán thời gian đa thức nào giải được. Một số vấn đề này có thể được giải quyết bằng những thuật toán hiệu quả vẫn chưa được khám phá. Tuy nhiên, chúng ta sẽ suy nghĩ rằng  có thể nhiều vấn đề không thể được giải quyết một cách hiệu quả. Do đó cần xác định các vấn đề như vậy để không phải mất thời gian tìm kiếm một thuật toán không tồn tại.

# Thời gian đa thức
Để bắt đầu nghiên cứu về tính đầy đủ NP, ta hình thức hóa khái niệm về các bài toán giải được theo thời gian đa thức. Các bài toán này thường được xem là "dễ trị". Lý do tại sao lại là một vấn đề về triết học, chứ không phải về toán học. Ta có thể đưa ra ba lý lẽ hỗ trợ.

Thứ nhất, mặc dù có lý khi xem bài toán yêu cầu thời gian $O(n^100)$ là khó trị, song có rất ít bài toán thực tiễn yêu cầu thời gian dựa trên thứ tự một đa thức bậc cao như vậy. Các bài toán tính toán được thời gian đa thức đa thức đã gặp trong thực tế thường yêu cầu ít thời gian hơn nhiều.

Thứ hai, với nhiều mô hình tính toán hợp lý, một bài toán có thể giải trong thời gian đa thức theo một mô hình có thể được giải trong thời gian đa thức theo một mô hình khác. Ví dụ, lớp bài toán giải được trong thời gian đa thức bằng máy truy cập ngẫu nhiên nối tiếp giống như lớp bài toán giải được trong thời gian đa thức trên các máy Turing trừu tượng. Nó cũng giống như lớp bài toán giải được trên một máy tính song song, cho dù số lượng các bộ xử lý tăng trưởng theo đa thức với kích cỡ đầu vào.

Thứ ba, lớp bài toán thời gian đa thức giải được có các tính chất bao đóng chính xác, do các đa thức được đóng dưới phép cộng, phép nhân và phép hợp. Ví dụ, nếu kết xuất của một thuật toán thời gian đa thức được nạp vào đầu vào của một thuật toán khác, thuật toán phức hợp sẽ là đa thức. Nếu một thuật toán thời gian đa thức khác thực hiện một số lệnh gọi không đổi đến các chương trình con thời gian đa thức, thời gian thực hiện của thuật toán phức hợp là đa thức.

# Tài liệu tham khảo

1. Wikipedia
2. Algorithms - Robert Sedgewick, Kevin Wayne
3. [cp-algorithms.com](https://cp-algorithms.com/)
4. Handbook Competitive Programming - Antti Laaksonen
5. Competitve programming 3 - Steven Halim, Felix Halim
6. Giải thuật và lập trình - Thầy Lê Minh Hoàng 
7. Algorithms - Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest