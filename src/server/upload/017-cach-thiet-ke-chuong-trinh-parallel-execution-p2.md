© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

Với bài trước, ta đã biết để thiết kế một chương trình **parallel execution** cần trải qua 4 bước cơ bản:
> - Partitioning
> - Communication
> - Agglomeration
> - Mapping

Với 2 bước đầu tiên, từ một **task** lớn được chia thành nhiều **task** nhỏ, sau đó kết nối lại thông qua **communication**.

![](https://i.imgur.com/3RwuaFS.png)

Việc chia **task** lớn thành các **task** nhỏ nhằm mục đích tối đa hóa **parallel execution** từ đó tăng performance của chương trình. Tuy nhiên, nếu không làm đúng cách thì lợt bất cập hại. Vì sao vậy?

Bài hôm nay sẽ bàn luận tiếp về 2 bước cuối cùng: **Agglomeration** và **Mapping**.

## 1) Agglomeration
[Tại một thời điểm **processor** chỉ thực thi duy nhất một **thread**](https://viblo.asia/p/bJzKmVvYZ9N). Do đó, nếu có càng nhiều **thread**, tần suất xảy ra [**context switch**](https://viblo.asia/p/bJzKmVvYZ9N#_2-context-switch-1) càng cao, đó là một trong những nguyên nhân ảnh hưởng lớn đến **performance** của chương trình. Nên việc chia nhiều **concurrent task** chưa hẳn đã tốt. Ta cần cách tiếp cận khác để tối đa được hiệu suất (trên từng hardware khác nhau càng tốt).

Với **Agglomeration**, cần review 2 step trước đó :joy:. Tìm cách nhóm các **task** lại theo những yếu tố dựa trên data hoặc cách tính toán (**computation**). Sau khi nhóm lại như vậy thì có lợi ích gì?

![](https://i.imgur.com/mUf8nEj.png)

Với **parallel execution**, thời gian xử lý sẽ chia thành 2 phần chính:
> - Thời gian thực thi các task dựa trên độ lớn, cách phân chia (execution time).
> - Thời gian giao tiếp, trao đổi dữ liệu giữa các task (communication time).

Có thể thấy chúng có mối liên quan như sau:
> - Chia thành nhiều các task nhỏ, thời gian thực thi một task sẽ giảm. Nhưng số lượng **communication** phải xử lý sẽ tăng lên.
> - Chia càng ít task, thời gian thực thi một task sẽ tăng. Số lượng **communication** giảm xuống.

Dựa trên yếu tố đó, khả năng parallelism (song song hóa một ứng dụng) được chia làm 2 loại dựa trên cách phân chia task ở bước đầu tiên:
> - **Fine-grained parallelism**.
> - **Coarse-grained parallelism**.

**Fine-grained parallelism** hướng đến mục tiêu:
> - Chia thành **số lượng lớn** các **task nhỏ**.
> - Lợi ích của nó là có thể phân tán ra nhiều hardware khác nhau tận dụng tối đa sức mạnh của **multi-processors**.
> - Nhược điểm là công sức dành cho **task communication** khá lớn.

![](https://i.imgur.com/woaxKPY.png)

**Coarse-grained parallelism** hướng đến mục tiêu:
> - Chia thành **số lượng nhỏ** các **task lớn**.
> - Ưu điểm là giảm thiểu chi phí communicate giữa các task.
> - Tuy nhiên, nhược điểm là không tận dụng hết sức mạnh của **multi-processors** nếu được phân tán chạy trên nhiều hardware khác nhau.

![](https://i.imgur.com/iVDNi5y.png)

Lý thuyết là vậy, trong thực tế, ta luôn tìm cách cân bằng nhiều yếu tố khác nhau để đưa ra giải pháp tốt nhất, đó là: **Medium-grained parallelism**. Cần dựa vào độ phức tạp/thời gian thực thi của **task** và thông tin về **hardware** để tối ưu bài toán.

Lý thuyết đã xong, quay lại ví dụ đĩa spaghetti ở bài trước, nếu ta chia bài toán thành 8 task nhỏ hơn (mỗi task tương ứng 1 đĩa spaghetti), mỗi task đều communicate với các task xung quanh để lấy thông tin. Tổng cộng có 20 **communication** được thiết lập.

![](https://i.imgur.com/5uhFi5d.png)

Tuy nhiên máy tính của mình chỉ có 2 **processors**. 
Áp dụng bước thứ 3 là **Agglomeration**, chia bài toán thành 2 phần ứng với 2 processor, giảm thiểu số lượng **communication**, kéo theo lượng thông tin trao đổi sẽ tăng lên nhiều lần.

![](https://i.imgur.com/g9EEfSF.png)

Java cung cấp method để ta lấy được số lượng **active processor** của CPU. Từ đó giúp chúng ta dễ dàng hơn trong việc phân chia **task**, đồng thời tối ưu được chương trình. Với các hệ thống phân tán (distributed system) chúng ta cần cơ chế để phân chia dựa trên tổng số lượng **processor**, đừng **hardcore**. Nhầm, đừng **hardcode** nhé.
```java=
Runtime.getRuntime().availableProcessors();
```

Với kết luận này, khi tạo các **thread pool**, không hẳn nhiều **thread** đã tốt hơn so với ít **thread**. Nhưng ít thread quá cũng không ổn :joy:. Câu thần chú quen thuộc, tùy bài toán, tùy tình huống mà sử dụng con số phù hợp.

## 2) Mapping
Trong thực tế, bước này gần như được bỏ qua vì nó nói đến việc **mapping** các task vào các physical **processor**. Với các OS phổ biến hiện nay và khi chạy chương trình trên đó, **Schedular** sẽ là thứ thực hiện công việc **mapping**, chúng ta muốn làm thay cũng không làm được :joy:.

**Mapping** sẽ hữu dụng trong trường hợp chạy các **distributed system** hoặc các hệ thống phần cứng chuyên dụng nơi chúng ta có quyền điều khiển các processor. Có vẻ đi hơi xa :hole:...

Vậy lợi ích của **mapping là gì**? Tất cả những thứ đã làm, đã trải qua chỉ nhằm mục tiêu duy nhất: tăng performance của chương trình. 

Về cách **mapping** các task vào processor, dựa trên 2 chiến lược:
> - Các task có thể thực hiện **concurrently** thì nên **map** với các **processor** khác nhau. Tận dụng được parallel execution và giảm thiểu context switch.
> - Những task communicate thường xuyên với nhau nên được thực thi ở cùng **processor**.

Thực tế thì gần như chẳng bao giờ màu hường đến thế, những **task** có thể thực thi đồng thời lại hay **communicate** với nhau. Hoặc do design lởm, smell code... :slightly_smiling_face: (cái này khả năng cao).

Đúc kết lại, vẫn là câu nói thần thánh ở trên, tùy tình huống cụ thể, tùy bài toán mà ta có cách thiết kế hệ thống xử lý song song khác nhau, dựa trên 4 bước cơ bản:
> - Partitioning
> - Communication
> - Agglomeration
> - Mapping

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

### After credit
Với **multi-thread programming** trong Java, cơ bản và hay được sử dụng nhiều để thực thi là ExecutorService. Tất nhiên nó không đến nỗi tệ, tuy nhiên chúng ta đã biết cơ chế thực thi các thread của Schedular rồi và điểm yếu của nó là [**context switch**](https://viblo.asia/p/bJzKmVvYZ9N#_2-context-switch-1). Vậy có cách implement hoặc cơ chế nào tốt hơn threadpool và cụ thể là ExecutorService không? Đón chờ trong các bài tiếp theo nhé.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)