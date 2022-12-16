## Mở đầu
Với những sinh viên công nghệ thông tin trên ghế nhà trường thì chắc hẳn không ai xa lạ gì với môn học **"Cấu trúc dữ liệu và giải thuật"** cả. Đây là một môn học (theo mình đánh giá thì) khá là khó, và thường xuyên là "ác mộng" với nhiều người :joy: (trong đó có mình). Một phần cũng bởi nó chứa nhiều kiến thức mới và rộng, một phần nữa là khi học đôi khi nhiều bạn không hiểu được "học cái này để làm gì" :joy_cat: Và thực tế, khi mọi người bắt đầu đi thực tập, rồi thì khi tốt nghiệp đi làm thì phần lớn đều không dùng đến các kiến thức về thuật toán đã học. Với một vị trí công việc là Web Developer, Mobile Developer, mọi người rất ít khi phải viết một hàm đệ quy, rất ít khi phải implement một giải thuật quy hoạch động ... Đi phỏng vấn ở nhiều công ty thì cũng không hề có câu hỏi về phần Algorithm, hoặc nếu có thì chỉ dừng ở mức tượng trưng cho có. Điều đó khiến cho các kiến thức về thuật toán, cũng như các kỹ năng về thiết kế giải thuật của mọi người cũng ngày một mai một.

Tuy nhiên, có một thực tế là ở nhiều công ty lớn trên thế giới, thì Coding Interview vẫn luôn là một phần phỏng vấn bắt buộc, và đóng một vai trò quan trọng. Nó không chỉ giúp đánh giá khả năng tư duy của ứng viên, mà còn giúp công ty lọc được ra những ứng viên phù hợp một cách dễ dàng. Ở những công ty lớn như thế, họ cần xây dựng những sản phẩm lớn, có performance tốt và có thể mở rộng. Đó là nơi họ cần những người có tư duy về giải thuật tốt, cũng như có những hiểu biết cơ bản về thiết kế giải thuật.

Mặc dù lâu lắm rồi cũng chưa có được bài chia sẻ nào trên Viblo, nhưng lần này nhân dịp sự kiện [Viblo May Fest](https://viblo.asia/announcements/chuc-mung-viblo-tron-6-tuoi-khoi-dong-su-kien-thuong-nien-mayfest-QpmleNVV5rd) được tổ chức, mình cũng cố gắng tìm kiếm xem có chủ đề nào phù hợp để viết thành một series cho hoàn thành được challenge của May Fest không. Nhìn chung thì giờ Viblo đã có rất nhiều bài viết về đủ các thể loại chủ đề khác nhau, nên tìm kiếm được một đề tài mà có thể sẽ hấp dẫn nhưng lại mới có ít người viết thì đúng là rất khó (^^;). Loay hoay tính đi tính lại, cuối cùng mình quyết định chọn lấy chủ đề về Algorithm này :D Hy vọng có thể ít nhiều giúp ích cho các bạn đang hoặc chuẩn bị học bộ môn "Cấu trúc dữ liệu và giải thuật" ở trên trường :joy:, cũng như các bạn sinh viên đã học xong, hay thậm chí là cả những bạn đã tốt nghiệp đi làm rồi nhưng nhiều kiến thức giờ không còn nhớ rõ nữa.

## Thuật toán là gì?
Trước khi đi vào các kỹ thuật thiết kế giải thuật cụ thể, ở bài đầu tiên này, chúng ta cùng tìm hiểu qua về các khái niệm cơ bản sẽ được đề cập nhiều trong series lần này nhé.

Đầu tiên là khái niệm về thuật toán, một cụm từ mà chắc hẳn mỗi sinh viên, mỗi lập trình viên đều từng nhắc đến nhiều lần trong quá trình học tập & làm việc của mình :joy:  Vậy thuật toán là gì?

Theo định nghĩa trên wikipedia thì:

> Trong toán học và khoa học máy tính, một thuật toán, còn gọi là giải thuật, là một tập hợp hữu hạn các hướng dẫn được xác định rõ ràng, có thể thực hiện được bằng máy tính, thường để giải quyết một lớp vấn đề hoặc để thực hiện một phép tính. Các thuật toán luôn rõ ràng và được sử dụng chỉ rõ việc thực hiện các phép tính, xử lý dữ liệu, suy luận tự động và các tác vụ khác.

Đúng là definition trên wikipedia có khác, đọc khá hàn lâm và khó hiểu :joy: 

Mình thì rất thích phần định nghĩa của [Robert Sedgewick](https://en.wikipedia.org/wiki/Robert_Sedgewick_(computer_scientist)) trong cuốn sách kinh điển [Algorithms](https://www.amazon.com/Algorithms-4th-Robert-Sedgewick/dp/032157351X) của ông:

> When we write a computer program, we are generally implementing a method that has been devised previously to solve some problem. This method is often independent of the particular programming language being used—it is likely to be equally appropriate for many computers and many programming languages. It is the method, rather than the computer program itself, that specifies the steps that we can take to solve the problem. The term algorithm is used in computer science to describe a finite, deterministic, and effective problem-solving method suitable for implementation as a computer program. Algorithms are the stuff of computer science: they are central objects of study in the field.

Tạm dịch

> Khi viết một chương trình máy tính, chúng ta thường cài đặt một phương pháp đã được nghĩ ra trước đó để giải quyết một số vấn đề. Phương pháp này thường là độc lập với ngôn ngữ lập trình cụ thể đang được sử dụng — nó hầu như thích hợp như nhau cho nhiều máy tính và nhiều ngôn ngữ lập trình. Chính là phương pháp, chứ không phải bản thân chương trình máy tính, là thứ chỉ định các bước mà chúng ta có thể thực hiện để giải quyết vấn đề. Thuật ngữ "thuật toán" được sử dụng trong khoa học máy tính để mô tả một phương pháp giải quyết vấn đề mang tính hữu hạn, xác định và hiệu quả, và phương pháp đó phù hợp để có thể được cài đặt như một chương trình máy tính. Thuật toán chính là "chất liệu" của khoa học máy tính, chúng là đối tượng nghiên cứu trung tâm của lĩnh vực này.

Hy vọng là định nghĩa này giúp các bạn hiểu rõ về khái niệm "thuật toán" hay "giải thuật"

## Cấu trúc dữ liệu là gì?
> Algorithms + Data Structures = Programs

Tức **Giải thuật + Cấu trúc dữ liệu = Chương trình máy tính**.

Đây là tên một cuốn sách được viết bởi [Niklaus Emil Wirth](https://vi.wikipedia.org/wiki/Niklaus_Wirth), một nhà khoa học máy tính nổi tiếng, cha để của ngôn ngữ lập trình Pascal. Và cũng chính nó đã tạo nên một công thức cực kỳ nổi tiếng vẫn hay được nhắc đến khi nói về mối quan hệ của "cấu trúc dữ liệu" và "giải thuật". Có lẽ nó cũng góp phần vào giải thích cho việc sao có nhiều sách vở, giáo trình, môn học lại hay nhắc đến 2 khái niệm này cùng với nhau như vậy. :joy: 

![](https://images.viblo.asia/810d24dd-56fe-40f0-9ae7-649497da42bb.jpg)

Về cơ bản thì **giải thuật** phải ánh phương pháp xử lý vấn đề, hay cụ thể là các phép tính toán, còn đối tượng để tính toán bởi máy tính chính là **dữ liệu**. Dữ liệu biểu diễn các thông tin của bài toán, từ thông tin đầu vào, cho đến kết quả đầu ra. Dữ liệu có thể ở các dạng đơn giản như số nguyên, số thực, ký tự, boolean … Hoặc dữ liệu cũng có thể có cấu trúc phức tạp, gồm nhiều thành phần dữ liệu được liên kết với nhau theo một cách nào đó. 

Các kiểu dữ liệu được tạo thành từ nhiều kiểu dữ liệu khác được gọi là kiểu dữ liệu có cấu trúc. Và trong khoa học máy tính, việc nghiên cứu về cấu trúc dữ liệu là nghiên cứu về cách lưu trữ và tổ chức dữ liệu sao cho chúng có thể được sử dụng một cách hiệu quả.

Một số cấu trúc dữ liệu (data structure) cơ bản, thường được sử dụng nhiều trong các chương trình máy tính (và thường được hỏi nhiều trong các buổi Coding Interview nữa :joy:) có thể kể ra là:

- Mảng (array)
- Danh sách liên kết (linked list)
- Ngăn xếp (stack)
- Hàng đợi (queue)
- Bảng băm (hash table)
- Cây (tree)
- Đống (heap)
- Đồ thị (graph)

Trong những bài tiếp theo, khi đề cập đến một số giải thuật, với ví dụ cụ thể, chúng ta sẽ dần ôn lại về các kiến thức về một số cấu trúc dữ liệu ở trên.

## Đánh giá thuật toán?
### Độ phức tạp của thuật toán (Complexity)

Khi đánh giá về chất lượng của một thuật toán, có thể mọi người sẽ đứng trên rất nhiều phương diện để nhìn nhận, ví dụ như tính dễ hiểu, dễ đọc, hay dễ implement... Trong đó thì yếu tố quan trọng nhất, thường được đưa ra nghiên cứu, chính là **độ hiệu quả của thuật toán**. Hiệu quả ở đây có thể xét trên 2 phương diện:
- Hiệu quả về mặt thời gian (chạy nhanh)
- Hiệu quả về mặt bộ nhớ (dung lượng bộ nhớ cần dùng để lưu dữ liệu vào, dữ liệu ra, và các kết quả trung gian khi thực hiện thuật toán). 

Liên quan đến dung lượng bộ nhớ mà thuật toán đòi hỏi, người ta sử dụng một thước đo để đánh giá, gọi là **độ phức tạp không gian (Space Complexity)** của thuật toán. Còn để đánh giá thời gian chạy của thuật toán, người ta dùng khái niệm **độ phức tạp thời gian (Time Complexity)**.

Ngày nay thì ta thường chú trọng đến Time Complexity hơn là Space Complexity. Trong nhiều tài liệu, giáo trình, khi phân tích về độ phức tạp của thuật toán, chúng ta cũng thường dừng lại ở Time Complexity chứ không đi sâu vào phân tích Space Complexity.

Ngoài ra, khi đánh giá về độ phức tạp của thuật toán, người ta cũng thường xét nó trong các trường hợp nhất định là: **best case** (trường hợp tốt nhất), **worst case** (trường hợp tồi nhất) và **average case** (trường hợp trung bình). Các trường hợp này xảy ra có thể tùy thuộc vào tính chất, hay cách tổ chức của dữ liệu đầu vào (ví dụ như với bài toán sắp xếp một dãy từ nhỏ đến lớn thì ngay từ đầu dữ liệu đầu vào đã được sắp xếp luôn từ nhỏ đến lớn, hoặc được sắp xếp luôn từ lớn đến nhỏ chẳng hạn). Thường thì trong thực tế chúng ta khó có thể kỳ vọng vào trường hợp tốt nhất (hay xấu nhất) sẽ xảy ra thường xuyên được, thế nên về cơ bản thì average-case complexity là yếu tố tốt hơn để đánh giá về hiệu quả của thuật toán. Và khi không nhắc đến trường hợp nào đặc biệt, thì chúng ta ngầm hiểu chúng ta đang nhắc đến Space Complexity hay Time Complexity ở average case.

### Khái niệm O lớn
Đương nhiên là khi so sánh hiệu quả về mặt thời gian giữa các thuật toán thì chúng ta không thể so một thuật toán được cài đặt bằng ngôn ngữ lập trình C, chạy trên máy tính với CPU là core i9 đời mới, xung nhịp một nhân là 4GHz, 64GB RAM, với một thuật toán được cài đặt bằng Ruby, chạy trên máy tính với chip i3 đời cũ, 4GB RAM được. Trong khoa học máy tính, chúng ta có một cách tiếp cận để có thể giúp kết luận về thời gian chạy của một thuật toán mà nó không phụ thuộc vào cách thức thuật toán được cài đặt, ngôn ngữ lập trình được sử dụng, hay môi trường máy tính mà trên đó thuật toán được chạy. Cách thức đó được tạo ra trên nền tảng toán học. Chúng ta thường dùng đến một khái niệm gọi là **O Lớn** (Big O)

Ta nói $f(n) = O(g(n))$, với $f(n)$ và $g(n)$ là các hàm thực không âm của đối số nguyên dương $n$, nếu tồn tại hằng số dương $C$ và $n_0$ sao cho $f(n) <= Cg(n)$ với mọi $n >= n_0$. Điều đó đồng nghĩa với việc hàm $f(n)$ bị chặn trên bởi hàm $g(n)$ với một hằng số $C$ nào đó (đem nhân với $g(n)$), khi $n$ đủ lớn.

Trong lĩnh vực khoa học máy tính, thì O lớn có thể được định nghĩa là:

> Ký hiệu O lớn dùng để mô tả hành vi thuật toán, về mặt thời gian tính toán hoặc lượng bộ nhớ cần dùng, khi kích thước dữ liệu thay đổi. Ký hiệu O lớn mô tả các hàm theo tốc độ tăng của chúng: các hàm khác nhau có cùng tốc độ tăng có thể được mô tả bởi cùng một ký hiệu O lớn. 

Tức về cơ bản thì O lớn giúp chúng ta có một cái nhìn toàn cảnh về việc khi lượng dữ liệu đầu vào tăng lên, thì thời gian chạy của thuật toán sẽ thay đổi ra sao. Mô tả hàm bằng ký hiệu O lớn thường chỉ cung cấp cho chúng ta **một chặn trên cho tốc độ tăng của hàm** (chứ nó không cho ra một con số cụ thể).

### Một số hàm O lớn thường gặp 
Khi đánh giá thời gian chạy của thuật toán bằng khái niệm O lớn, chúng ta thường biểu diễn nó dưới dạng $O(f(n))$, với $f(n)$ là một cận trên của thời gian chạy, và không thể tìm được một hàm $g(n)$ nào khác cũng là cận trên của thời gian chạy, mà lại tăng chậm hơn hàm $f(n)$.

Dưới đây là một số hàm O lớn chúng ta thường gặp khi phân tích về thuật toán, được sắp xếp theo thứ tự tốt dần:
- $O(1)$: Tức thời gian chạy của thuật toán bị chặn trên bởi một hằng số nào đó, hay nói cách khác thì thuật toán có thời gian chạy là hằng, và không phụ thuộc vào kích thước dữ liệu. Ví dụ như phép insert trong Stack hoặc Queue, hay phép search với cấu trúc Hash Table có độ phức tạp là $O(1)$
- $O(logn)$: Ví dụ như phép search trong cây nhị phân tìm kiếm (Binary Search Tree)
- $O(n)$: Tức thời gian chạy của thuật toán bị chặn trên bởi một hàm tuyến tính, hay ta nói thời gian chạy của thuật toán là tuyến tính. Ví dụ như phép tìm kiếm trong một mảng.
- $O(nlogn)$: Ví dụ như các thuật toán Quicksort, Mergesort
- $O(n^2)$: Ví dụ như các thuật toán Buble sort, Selection sort, Insertion sort. Hay Quicksort ở worst case.
- $O(n^3)$
- $O(2^n)$
- $O(n!)$

![big o complexity](https://images.viblo.asia/1dd9e734-5096-4571-9c56-a0842434e895.png)

(Biểu đồ thệ hiện mức tăng về thời gian theo một số hàm thường gặp. Source: https://www.bigocheatsheet.com/)

## Kết
Như vậy là trong bài viết đầu tiên này, chúng ta đã ôn lại về các khái niệm cơ bản về thuật toán, cấu trúc dữ liệu, Big O ... Trong các bài tiếp theo, chúng ta sẽ đi dần vào cách kỹ thuật thiết kế thuật toán cơ bản, để có thể tạo ra được thuật toán có thời gian chạy hiệu quả với những bài toán được giao. 

Cụ thể, chúng ta sẽ tìm hiểu về khái niệm, cũng như thử làm một số ví dụ về một số algorithm design strategies như sau: 
- Brute Force (giải thuật vét cạn)
- Greedy (giải thuật tham lam)
- Recursion (giải thuật đệ quy)
- Backtracking (giải thuật quay lui)
- Divide and Conquer (giải thuật chia để trị)
- Branch and Bound (giải thuật nhánh và cận) 
- Dynamic Programming (giải thuật quy hoạch động)

Hẹn gặp lại mọi người ở những bài tiếp theo trên Viblo nhé ;)

## Tài liệu tham khảo
- [Big O Cheatsheet](https://www.bigocheatsheet.com/)
- [Cấu trúc dữ liệu - Wiki](https://vi.wikipedia.org/wiki/C%E1%BA%A5u_tr%C3%BAc_d%E1%BB%AF_li%E1%BB%87u)
- [Thuật toán - Wiki](https://vi.wikipedia.org/wiki/Thu%E1%BA%ADt_to%C3%A1n)
- [How is Algorithm Design Applied?](https://online.wlu.ca/news/2019/02/12/how-algorithm-design-applied)
- [Algorithms (4th Edition)](https://www.amazon.com/Algorithms-4th-Robert-Sedgewick/dp/032157351X) 
- [Cracking the Coding Interview 6th Edition](https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850)
- Cấu trúc dữ liệu và giải thuật - Đỗ Xuân Lôi