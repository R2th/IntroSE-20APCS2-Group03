Nếu đã từng tham gia các cuộc thi lập trình thi đấu như ACM ICPC, Google Code Jam, Facebook Hacker Cup,... hay là trải qua những kì thi chọn học sinh giỏi tin các cấp, kiểu gì thì kiểu, các bạn đều gặp phải ít nhất một bài toán sử dụng kĩ thuật quy hoạch động. Hồi năm nhất mình có tham gia cuộc thi ICPC của trường. Mình và hai "chiến hữu" gặp phải một bài toán chắc chắn rằng solution là chuẩn rồi nhưng bị dính TLE (time limit exceeded) mấy lần liền. Tầm này, chúng mình nghĩ tới sử dụng quy hoạch động, cơ mà chẳng ai trong team thạo món này cả. Về cơ bản, ba thành viên chỉ nắm được tư tưởng của quy hoạch động là lưu giá trị của bài toán nhỏ sau đó kết hợp để giải bài toán lớn, từ đó tối ưu được về mặt thời gian. Nhưng, điều đó là chưa đủ với một cuộc thi lập trình. Mỗi bài quy hoạch động đều có rất nhiều cách để xử lý, ý tưởng cốt lõi thì đơn giản đấy nhưng rồi áp dụng sao?

# I. Một số điều lưu ý trước khi bắt tay tìm hiểu quy hoạch động

## 1. Đừng ngây thơ!

Trước khi tìm hiểu về quy hoạch động, chắc bạn đã nghe về **Brute force** và **Backtracking** rồi chứ :D Đặc điểm của hai cách này là duyệt các trường hợp có thể xảy ra. Đây là một cách tiếp cận rất tự nhiên (và ngây thơ) khi ta lần đầu nhìn vào một bài toán lập trình. Nhưng khi tham gia các cuộc thi lập trình thì đây thường là cách làm rất tệ hại do mất rất nhiều thời gian xử lý (vì duyệt qua hết tất cả các trường hợp một cách tuyến tính). Để hiểu sâu về brute force và backtracking các bạn có thể tìm đọc các bài viết trên Viblo nha!

## 2. Đừng tham lam!

Không ngây thơ như hai cách tiếp cận trên, thuật toán tham lam tối ưu hơn bằng cách chọn một giải pháp tốt nhất tại thời điểm hiện tại, từ các giải pháp đó dẫn tới giải pháp cuối cùng. Thuật toán tham lam không quay lại các lựa chọn trước đó để xét (như brute force và backtracking) mà cái gì tốt nhất thì nó lấy :D. Đến đây các bạn biết vấn đề của "tham lam" rồi chứ! Đó là:

- Có đúng là lựa chọn tốt nhất tại thời điểm hiện tại thì cũng là tốt nhất cho toàn bộ bài toán hay không?
- Làm như nào để chứng minh thuật toán tham lam được áp dụng là đúng đắn?

## 3. Đừng lặp lại!

"Không phát minh lại cái bánh xe!" nhưng các thuật toán đệ quy đang làm điều đó :D Bản chất của giải thuật đệ quy là phân tách một bài toán lớn thành những bài toán nhỏ hơn và dễ giải hơn, sau đó tìm cách kết hợp lời giải của các bài toán nhỏ lại thành lời giải cho bài toán lớn ban đầu (tư tưởng quy nạp trong toán học). Vấn đề là sẽ xảy ra trường hợp một bài toán có nhiều bài toán con, khi tính toán cho một trường hợp mới, ta lại phải giải bài toán con của trường hợp đó, rồi lại phải giải tiếp bài toán con của bài toán con,... việc lặp lại rất mất thời gian. Cảm giác bắt bạn phải giải lại một bài toán mà bạn vừa làm xong trước đó rồi vậy :D

# Okay giờ quy hoạch động là gì?

Các thuật toán trên có ưu điểm dễ cài đặt, tuy nhiên do bản chất, các chương trình này thường kéo theo những đòi hỏi lớn về không gian bộ nhớ và một khối lượng tính toán khổng lồ. Quy hoạch động ra đời để giải quyết các vấn đề đó :D

Quy hoạch động (Dynamic Programming) là một kĩ thuật nhằm đơn giản hóa việc tính toán các công thức truy hồi bằng cách lưu trữ toàn bộ hay một phần kết quả tính toán tại mỗi bước với mục đích sử dụng lại.

Quy hoạch động tương tự như đệ quy ở chỗ, việc tính toán các trường hợp cơ sở (trường hợp con) cho phép chúng ta xác định một cách tự nhiên giá trị cuối cùng. Cách tiếp cận từ dưới lên (Bottom - up) này hoạt động tốt khi giá trị mới chỉ phụ thuộc vào các giá trị được tính toán trước đó. Nhưng khác ở chỗ thay vì tính toán lại các trường hợp con, các kết quả này được lưu lại và sử dụng cho tính toán sau.

Một điều quan trọng rằng để giải quyết một vấn đề bằng Quy hoạch động là bạn phải nhìn ra được Công thức truy hồi trong bài toán đó.

Hiểu và áp dụng được Quy hoạch động không phải là chuyện đơn giản, mặc dù ý tưởng cơ bản là chỉ có vậy, thách thức là các bài toán mà áp dụng được Quy hoạch động lại rất đa dạng.

# Kĩ thuật quy hoạch động

## Các khái niệm

- Bài toán giải theo phương pháp Quy hoạch động gọi là **Bài toán quy hoạch động**.
- Công thức phối hợp nghiệm của các bài toán con để có nghiệm của bài toán lớn gọi là **Công thức truy hồi** của quy hoạch động.
- Tập các bài toán nhỏ nhất có ngay lời giải để từ đó giải quyết các bài toán lớn hơn gọi là **cơ sở quy hoạch động**.
- Không gian lưu trữ lời giải các bài toán con để tìm cách phối hợp chúng gọi là **bảng phương án quy hoạch động**.

## Điều kiện áp dụng

Điều kiện áp dụng Quy hoạch động:

- Bài toán lớn **phân rã** được thành nhiều bài toán con.
- **Sự phối hợp** lời giải của các bài toán con trên cho ta lời giải của bài toán lớn.
- Quy hoạch động là đi **giải tất cả** các bài toán con, nên nếu không đủ không gian lưu trữ lời giải (bộ nhớ, đĩa,...) để phối hợp chúng thì phương pháp quy hoạch động cũng không thể thực hiện được.
- Quá trình từ bài toán cơ sở tìm ra lời giải bài toán ban đầu phải qua hữu hạn bước.

## Các bước áp dụng

1. Giải tất cả các bài toán cơ sở (thông thường rất dễ), lữu trữ lời giải vào bảng phương án.
2. Dùng công thức truy hồi phối hợp những lời giải của những bài toán nhỏ đã lưu trong bảng phương án để tìm ra lời giải của những bài toán lớn hơn và lưu chúng vào bảng phương án. Cho tới khi bài toán ban đầu tìm được lời giải.
3. Dựa vào bảng phương án, truy vết tìm ra nghiệm tối ưu.

# Kết luận

Vậy là mình đã trình bày cho các bạn những concept cơ bản nhất của quy hoạch động. Tất nhiên đọc xong bài này chắc chắn chưa thể áp dụng để thực hành được ngay. Do đó, để hiểu sâu hơn cách áp dụng thực tế như nào các bạn đọc phần tiếp theo nhé!

# Tài liệu tham khảo

1. Giải thuật và lập trình - Thầy Lê Minh Hoàng
2. [cp-algorithms.com](https://cp-algorithms.com/)
3. Handbook Competitive Programming - Antti Laaksonen