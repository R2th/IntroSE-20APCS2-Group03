# Thống kê các thuật toán Sorting

Chúng ta đã xem xét nhiều thuật toán sắp xếp, cơ mà bạn có bao giờ tự hỏi mình nên sử dụng thuật toán sắp xếp nào không :). Việc biết thuật toán nào là tốt nhất có thể phụ thuộc nhiều vào chi tiết của ứng dụng và cách triển khai. Trong bài viết này mình sẽ tổng kết các thông tin của các thuật toán sắp xếp giúp cho bạn có cái nhìn tổng quan về các thuật toán này. 

Bảng thống kê bên dưới là tóm tắt các đặc điểm quan trọng của các thuật toán sắp xếp phổ biến. Trong mọi trường hợp, ngoại trừ shell sort (trong đó độ phức tạp chỉ là ước tính), insertion sort (trong đó độ phức tạp phụ thuộc vào thứ tự của các input key) và cả hai phiên bản của quicksort (trong đó độ phức tạp là theo xác suất và có thể phụ thuộc vào phân phối các giá trị input key), nhân các độ phức tạp này với các hằng số thích hợp cho ta một cách hiệu quả để dự đoán thời gian chạy. Các hằng số liên quan phụ thuộc một phần vào thuật toán (ví dụ: Heap sort sử dụng gấp đôi số lượng so sánh như merge sort và cả hai đều thực hiện nhiều thao tác truy cập mảng hơn quicksort) nhưng chủ yếu phụ thuộc vào việc triển khai, trình biên dịch Java và máy tính của bạn được quyết định bởi số lượng lệnh máy được thực hiện và thời gian mà mỗi lệnh yêu cầu. Quan trọng nhất, vì chúng là hằng số, bạn thường có thể dự đoán thời gian chạy cho $N$ lớn bằng cách chạy thử nghiệm cho $N$ nhỏ hơn và ngoại suy, sử dụng giao thức nhân đôi tiêu chuẩn.

|Algorithms | stable?| in place? |running time |extra space| notes|
|---|---|---|---|---|---|
|selection sort| no| yes| $N^2$ | $1$| |
|insertion sort| yes| yes| between $N$ and $N^2$| $1$| depends on order of items|
|shellsort| no| yes| $N \log N$ ? $N^{6/5}$ ?| $1$| |
|quicksort| no| yes| $N \log N$| $\lg N$| probabilistic guarantee|
|3-way quicksort| no| yes| $N$ and between $N \log N$| $\lg N$| probabilistic, also depends on distribution of input keys|
|mergesort| yes| no| $N \log N$| $N$||
|heapsort| no| yes| $N \log N$ |$1$||

Tuy nhiên, trong đa phần các tình huống phải thực hiện sắp xếp. Chúng ta đều thấy Quicksort được gọi tên nhiều nhất :D Hãy tìm hiểu lý do tại sao nhé!

![img](https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif)

**Đặc điểm**: Quicksort là thuật toán sắp xếp cho những mục đích chung (nghĩa là những bài toán tổng quát) nhanh nhất.

**Bằng chứng**: Giả thuyết này được hỗ trợ bởi vô số triển khai của quicksort trên vô số hệ thống máy tính kể từ khi phát minh ra thuật toán này cách đây nhiều thập kỷ. Nói chung, lý do mà quicksort nhanh nhất là nó chỉ có một vài lệnh trong vòng lặp bên trong (và thuật toán hoạt động tốt với bộ nhớ cache vì thường tham chiếu dữ liệu một cách tuần tự nhất) để thời gian chạy là ~ c $N \lg N$ với giá trị của c nhỏ hơn các hằng số tương ứng cho các loại sắp xếp tuyến tính khác.

Vì vậy, trong hầu hết các tình huống thực tế, quicksort là phương pháp được lựa chọn. Tuy nhiên, với phạm vi phân loại rộng rãi và nhiều loại máy tính và hệ thống, một tuyên bố phẳng như thế này rất khó để chứng minh. Ví dụ có một ngoại lệ đáng chú ý đó là nếu sự ổn định là quan trọng và có sẵn không gian bộ nhớ, merge sort có thể là tốt nhất. Có lẽ cách tốt nhất để giải thích *đặc điểm trên* là nói rằng bạn chắc chắn nên xem xét nghiêm túc việc sử dụng quicksort trong bất kỳ ứng dụng sắp xếp nào mà thời gian chạy là quan trọng. 

Hệ thống sắp xếp trong Java. Hãy xem xét phương pháp hệ thống sắp xếp chính của Java, *java.util.Arrays.sort()*. Với việc nạp chồng (overloading) các kiểu đối số, tên phương thức này đại diện cho một tập hợp các phương thức:

- Những phương thức khác nhau cho từng kiểu dữ liệu nguyên thủy
- Phương thức dành cho kiểu dữ liệu triển khai *Comparable*
- Phương thức sử dụng *Comparator*

Các nhà lập trình hệ thống của Java đã chọn sử dụng quicksort (với phân vùng 3 chiều) để triển khai các phương thức kiểu nguyên thủy và kết hợp để tham khảo -type các phương pháp. Ý nghĩa thực tế chính của những lựa chọn này, như vừa thảo luận, là đánh đổi tốc độ và việc sử dụng bộ nhớ (đối với kiểu nguyên thủy) để ổn định (đối với kiểu tham chiếu).

Các thuật toán và ý tưởng mà ta đang xem xét là một phần thiết yếu của nhiều hệ thống hiện đại, bao gồm cả Java. Khi phát triển các chương trình Java để giải quyết một ứng dụng, bạn có thể thấy rằng các triển khai *Arrays.sort()* của Java sẽ đáp ứng nhu cầu của bạn, điều đó tương đương với việc bạn sẽ sử dụng quicksort 3 chiều hoặc merge sort, cả hai thuật toán cổ điển đã được chứng minh.

# Tóm tắt một số ứng dụng của các thuật toán sắp xếp

Các ứng dụng sắp xếp trực tiếp rất quen thuộc, phổ biến và quá nhiều để có thể liệt kê tất cả. Bạn sắp xếp nhạc của mình theo tên bài hát hoặc tên nghệ sĩ, email hoặc cuộc gọi điện thoại của bạn theo thời gian hoặc ảnh của bạn theo ngày. Các trường đại học sắp xếp tài khoản sinh viên theo tên hoặc ID. Các công ty thẻ tín dụng sắp xếp hàng triệu hoặc thậm chí hàng tỷ giao dịch theo ngày hoặc số lượng. Các nhà khoa học không chỉ sắp xếp dữ liệu thí nghiệm theo thời gian hoặc các định danh khác mà còn cho phép mô phỏng chi tiết thế giới tự nhiên, từ chuyển động của các hạt hoặc thiên thể đến cấu trúc của vật liệu. Thậm chí là các tương tác và mối quan hệ xã hội. Thật vậy, rất khó để tìm một ứng dụng tính toán không liên quan đến việc sắp xếp! Để giải thích rõ hơn về điểm này, trong phần này mình sẽ mô tả các ví dụ về những ứng dụng phức tạp của thuật toán sắp xếp.

**Tin học trong thương mại**. Thế giới tràn ngập thông tin. Các tổ chức chính phủ, tổ chức tài chính và doanh nghiệp thương mại tổ chức phần lớn thông tin này bằng cách phân loại nó. Cho dù thông tin là tài khoản được sắp xếp theo tên hoặc số, giao dịch được sắp xếp theo ngày hoặc số tiền, thư được sắp xếp theo mã bưu điện hoặc địa chỉ, tệp được sắp xếp theo tên hoặc ngày hoặc bất cứ điều gì, việc xử lý dữ liệu đó chắc chắn sẽ liên quan đến một thuật toán sắp xếp ở đâu đó trên đường đi. Thông thường, thông tin như vậy được tổ chức trong cơ sở dữ liệu khổng lồ, được sắp xếp theo nhiều khóa (key) để tìm kiếm hiệu quả. Một chiến lược hiệu quả được sử dụng rộng rãi là thu thập thông tin mới, thêm nó vào cơ sở dữ liệu, sắp xếp nó trên các khóa quan tâm và hợp nhất kết quả đã sắp xếp cho mỗi khóa vào cơ sở dữ liệu hiện có. Các phương pháp mà chúng ta đã thảo luận đã được sử dụng một cách hiệu quả từ những ngày đầu của máy tính để xây dựng một cơ sở hạ tầng khổng lồ về dữ liệu được sắp xếp và các phương pháp xử lý nó làm nền tảng cho tất cả các hoạt động thương mại này. Mảng có hàng triệu hoặc thậm chí hàng tỷ mục nhập được xử lý thường xuyên ngày nay — nếu không có thuật toán sắp xếp tuyến tính, ta không thể sắp xếp được các mảng như vậy.

**Tìm kiếm thông tin**. Tổ chức dữ liệu theo thứ tự được sắp xếp giúp bạn có thể tìm kiếm thông qua nó một cách hiệu quả bằng cách sử dụng thuật toán tìm kiếm nhị phân kinh điển. Bạn cũng sẽ thấy rằng việc sắp xếp này giúp bạn dễ dàng xử lý nhanh nhiều loại truy vấn khác. Có bao nhiêu mục nhỏ hơn một mục nhất định? Những mục nào nằm trong một phạm vi nhất định? 

**Hoạt động nghiên cứu**. Lĩnh vực nghiên cứu hoạt động (OR) phát triển và áp dụng các mô hình toán học để giải quyết vấn đề và ra quyết định. Giả sử trong bài toán lập lịch, chúng ta có $N$ công việc cần hoàn thành, trong đó công việc $j$ yêu cầu thời gian xử lý $t_j$ giây. Chúng ta cần hoàn thành tất cả các công việc nhưng muốn tối đa hóa sự hài lòng của khách hàng bằng cách giảm thiểu thời gian hoàn thành trung bình của các công việc. Quy tắc đầu tiên về thời gian xử lý ngắn nhất, trong đó ta lập lịch công việc theo thứ tự thời gian xử lý tăng dần. Do đó, chúng ta có thể sắp xếp các công việc theo thời gian xử lý hoặc đặt chúng vào một hàng đợi ưu tiên được định hướng tối thiểu. Với nhiều ràng buộc và hạn chế khác, chúng ta gặp nhiều vấn đề về lập lịch trình khác, thường phát sinh trong các ứng dụng công nghiệp và đã được nghiên cứu kỹ lưỡng. Một ví dụ khác, hãy xem xét vấn đề cân bằng tải, trong đó chúng ta có $M$ bộ xử lý giống hệt nhau và $N$ công việc cần hoàn thành. Mục tiêu của chúng ta là lên lịch cho tất cả các công việc trên bộ xử lý sao cho thời gian mà công việc cuối cùng hoàn thành sớm nhất là khả thi. Bài toán cụ thể này là NP-hard nên chúng ta không kỳ vọng sẽ tìm ra một cách thực tế để tính toán một lịch trình tối ưu. Một phương pháp được biết đến để tạo ra một lịch trình tốt là *quy tắc đầu tiên về thời gian xử lý dài nhất*, trong đó ta xem xét các công việc theo thứ tự thời gian xử lý giảm dần, chỉ định từng công việc cho bộ xử lý khả dụng trước. Để thực hiện thuật toán này, trước tiên ta cần sắp xếp các công việc theo thứ tự ngược lại. Sau đó, duy trì một hàng đợi ưu tiên gồm $M$ bộ xử lý, trong đó mức độ ưu tiên là tổng thời gian xử lý các công việc của nó. Tại mỗi bước, ta xóa bộ xử lý có mức ưu tiên tối thiểu, thêm công việc tiếp theo vào bộ xử lý và lắp lại bộ xử lý đó vào hàng đợi ưu tiên. 

**Mô phỏng theo hướng sự kiện**. Nhiều ứng dụng khoa học liên quan đến mô phỏng, trong đó mục đích của tính toán là mô hình hóa một số khía cạnh của thế giới thực để có thể hiểu rõ hơn về nó. Trước khi máy tính ra đời, các nhà khoa học không có nhiều lựa chọn ngoài việc xây dựng các mô hình toán học cho mục đích này; các mô hình như vậy hiện đã được bổ sung đầy đủ bởi các mô hình tính toán. Thực hiện mô phỏng một cách hiệu quả có thể là một thách thức và việc sử dụng các thuật toán thích hợp chắc chắn có thể tạo ra sự khác biệt giữa việc có thể hoàn thành mô phỏng trong một khoảng thời gian hợp lý và bị mắc kẹt với lựa chọn chấp nhận kết quả không chính xác. Hoặc một đánh đổi về thời gian là ta có thể phải đợi mô phỏng thực hiện tính toán cần thiết để có được kết quả chính xác.

**Tính toán số**. Tính toán khoa học thường quan tâm đến độ chính xác (chúng ta tiến gần đến câu trả lời thực sự như thế nào :) ?). Độ chính xác là cực kỳ quan trọng khi chúng ta thực hiện hàng triệu phép tính với các giá trị ước tính, chẳng hạn như biểu diễn dấu phẩy động của các số thực mà chúng ta thường sử dụng trên máy tính. Một số thuật toán số sử dụng hàng đợi ưu tiên và sắp xếp để kiểm soát độ chính xác trong tính toán. Ví dụ, một cách để thực hiện tích hợp số (cầu phương), trong đó mục tiêu là ước tính diện tích dưới đường cong, ta duy trì hàng đợi ưu tiên với các ước tính độ chính xác cho một tập hợp các khoảng con bao gồm toàn bộ khoảng thời gian. 

**Tìm kiếm kết hợp**. Một mô hình cổ điển trong trí tuệ nhân tạo và để đối phó với các vấn đề khó giải quyết là xác định một tập hợp các cấu hình với các bước di chuyển được xác định rõ ràng từ cấu hình này sang cấu hình tiếp theo và mức độ ưu tiên liên quan đến mỗi bước đi. Cũng được định nghĩa là cấu hình bắt đầu và cấu hình mục tiêu (tương ứng với việc đã giải quyết vấn đề). Thuật toán A* nổi tiếng là một quy trình giải quyết vấn đề trong đó chúng tôi đặt cấu hình bắt đầu vào hàng đợi ưu tiên, sau đó thực hiện những việc sau cho đến khi đạt được mục tiêu: xóa cấu hình có mức độ ưu tiên cao nhất và thêm vào hàng đợi tất cả các cấu hình có thể đạt được từ đó bằng một lần di chuyển (không bao gồm bước vừa bị loại bỏ).Giống như mô phỏng theo hướng sự kiện, quá trình này được thiết kế riêng cho các hàng đợi ưu tiên. Nó làm giảm việc giải quyết vấn đề để xác định một chức năng ưu tiên hiệu quả.

**Nén Huffman** là một thuật toán nén dữ liệu kinh điển phụ thuộc vào việc xử lý một tập hợp các mục có trọng số nguyên bằng cách kết hợp hai mục nhỏ nhất để tạo ra một mục mới có trọng số là tổng của hai thành phần của nó. Việc thực hiện thao tác này là ngay lập tức, sử dụng hàng đợi ưu tiên. Một số lược đồ nén dữ liệu khác dựa trên việc phân loại.

**Thuật toán Prim và thuật toán Dijkstra**. Cơ sở cho những thuật toán này và một số thuật toán đồ thị khác là tìm kiếm đồ thị, nơi chúng tôi tiến hành từ mục này sang mục khác dọc theo các cạnh. Hàng đợi ưu tiên đóng một vai trò cơ bản trong việc tổ chức tìm kiếm đồ thị, cho phép các thuật toán hoạt động hiệu quả.

**Thuật toán của Kruskal** là một thuật toán cổ điển khác dành cho đồ thị có các cạnh có trọng số phụ thuộc vào việc xử lý các cạnh theo thứ tự trọng số của chúng. Thời gian chạy của thuật toán này phụ thuộc bởi chi phí thời gian sắp xếp.

**Các thuật toán xử lý chuỗi**, có tầm quan trọng quan trọng trong các ứng dụng hiện đại trong mật mã và genomics, thường dựa trên việc sắp xếp (thường sử dụng một trong các kiểu sắp xếp chuỗi chuyên biệt). Ví dụ, các thuật toán để tìm chuỗi con lặp lại dài nhất trong một chuỗi đã cho dựa trên các hậu tố sắp xếp đầu tiên của chuỗi.


# Tài liệu tham khảo

1. Algorithms - Robert Sedgewick, Kevin Wayne
2. [cp-algorithms.com](https://cp-algorithms.com/)
3. Handbook Competitive Programming - Antti Laaksonen
4. Competitve programming 3 - Steven Halim, Felix Halim
5. Giải thuật và lập trình - Thầy Lê Minh Hoàng
6. Think Java_ How to Think Like a Computer Scientist - Allen Downey, Chris Mayfield (2019)