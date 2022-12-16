© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

**Câu hỏi 1**: từ các bài trước, khi chia các bài toán ra thành nhiều phần có thể xử lý đồng thời và implement với **multi-thread** sẽ nhanh hơn **single-thread**. Vậy nhanh hơn bao nhiêu lần, làm thế nào để tính được con số cụ thể hoặc gần đúng nhất?

**Câu hỏi 2**: lập trình **multi-thread** có tốt hơn **single-thread** không và tốt hơn trong trường hợp nào? 

Bài viết này sẽ giải đáp 2 mối bận tâm trên. Let's begin!

## 1) Computational graph
Điều quan trọng khi lập trình **multi-thread** là xác định các bước có thể thực thi đồng thời, sau đó kết nối chúng để ra kết quả cuối cùng với mục đích tận dụng tối đa **parallel execution**.

Các bước đó cần được mô hình hóa để dễ dàng hình dung/implement và **computational graph** sẽ giúp ích trong tình huống này.

Mình sẽ sử dụng lại [bài toán salad](https://viblo.asia/p/001-parallel-computing-hardware-p1-Ljy5Vvvy5ra#_1-sequential-vs-parallel-computing-0) để lấy ví dụ cho phần này. Các **step** có thể làm đồng thời là cắt kiwi, cà rốt, rau củ. Sau đó trộn tất cả nguyên liệu lên và thêm sốt. Mỗi **step** là một **task** cần phải thực thi, ta gọi chúng là **unit of work** hoặc **unit of execution**. 

Với **computational graph**, chúng được biểu diễn như sau:
> - Mỗi **task** là một **node**.
> - Mũi tên chỉ thứ tự thực hiện của các **task**.
> - **Task** chỉ được thực hiện khi toàn bộ các **task** phía trước đã hoàn thành.

**Graph** dưới cho biết tất cả các task được thực hiện tuần tự, là **single path execution**, có thể implement với **single thread**.
![](https://i.imgur.com/4jR08cl.png)

Tất nhiên để tối ưu lợi thế của **parallel execution**, các task cắt kiwi, rau củ có thể thực hiện **asynchronous** với nhau, thực hiện theo bất kì thứ tự nào, thời gian bao lâu cũng không ảnh hưởng đến kết quả cuối 🥗.

![](https://i.imgur.com/olFgTdy.png)

Với **graph** trên, ta chia các task có thể thực thi **concurrent** và chạy với các **thread** khác nhau. Tuy nhiên, tất cả đều phải hoàn thành thì **task** tiếp theo mới được thực thi. Sẽ có 2 cặp từ khóa cần chú ý:
> - Spawn & Sync
> - Fork & Join

Cả 2 cặp từ khóa trên đều diễn tả việc tách các công việc có thể thực hiện **concurrent** ra và thực thi trên các **thread** khác nhau. Sau khi xong sẽ tổng hợp lại kết quả, làm các bước tiếp theo nếu có. Nếu dùng Java 8 trở lên ắt hẳn bạn đã quen thuộc với **tream** và **parallelStream**, **parallelStream** bên dưới sử dụng ForkJoinFramework của Java. 

Có rất nhiều cách khác nhau để vẽ **computational graph**, tuy nhiên mục đích chung của nó là cung cấp cái nhìn tổng quan khi chương trình được thực thi:
> - Mối quan hệ của các task.
> - Task nào có thể thực thi đồng thời.

## 2) Parallel ratio
Ngoài 2 mục đích trên, **computational graph** cũng được dùng để diễn tả các phần của chương trình được thực thi song song như thế nào. 

Với mỗi một task phía trên, mình sẽ chuyển nó thành thời gian để các task hoàn thành. Ví dụ như sau.

![](https://i.imgur.com/0SF2dAf.png)

Với **single-processor**, tổng thời gian hoàn thành các task chính là tổng thời gian thực thi của mỗi task, bằng **90** (đơn vị thời gian). Bạn có đặt ra vì sao **multi-thread** nhưng vẫn cộng tổng như vậy không? Nếu không thì chúc mừng, bạn đã nắm rõ bài học. Lý do: mặc dù **multi-thread** nhưng do **single-processor**, bản chất vẫn chỉ thực thi duy nhất một **thread** tại một thời điểm.

Với **graph** trên, ta có thể tìm được đường đi dài nhất là 3, 20, 5, 19, 14. Nó được gọi là **critical path**, diễn tả đường đi dài nhất, một chuỗi của các task nối liền nhau trong chương trình. Tổng thời gian thực thi của **critical path** là **61**. Mặc dù là đường đi dài nhất nhưng nó diễn tả tổng thời gian ngắn nhất để hoàn thành công việc nếu chương trình được thực thi song song ở mức tối đa (cần **multiple-processors**).

Từ đó, chúng ta có công thức để tính toán được tỉ lệ tối đa mà một chương trình được xử lý song song (**parallel ratio**) khi được thực thi với **multi-processor** và **single-processor**.

![](https://i.imgur.com/nfPGrrG.png)

Con số **1.48** nói lên điều gì? Trong trường hợp lý tưởng, chương trình trên chạy trên **multi-processor** sẽ nhanh hơn **single-processor** tối đa 1.48 lần.

Trong **software programming**, khá khó để giảm tổng thời gian xử lý các task, do đó ta cần thiết kế chương trình sao cho giảm tối đa thời gian xử lý **critical path**.

Như vậy, đã trả lời được câu hỏi thứ nhất ở đầu bài.

## 3) Trả lời câu hỏi thứ hai
Thứ nhất, như các bạn thấy ở trên, mặc dù **multi-thread** nhưng nếu thực thi trên **single processor** thì còn chậm hơn **single-thread** với **single processor**. Ngoài ra, ta cần **fork** và **join** các task lại với nhau, điều đó cũng sẽ tốn thời gian. 

Thứ hai, nếu độ phức tạp của các task rất nhỏ, thời gian thực thi rất nhanh thì việc tách ra **multi-thread** sẽ chậm hơn so với **single-thread**, công sức cho **context switch** lớn hơn cả công sức cho việc thực thi tính toán. Code ví dụ cho thật, nói mồm ai tin.

Mình sẽ thực hiện tăng biến **COUNTER** từ 0 lên 100 * 10^6.

```java
public class SingleThread {

    static long COUNTER = 0;

    public static void main(String... args) {
        long start = System.currentTimeMillis();
        for (int i = 0; i < 100_000_000; i++) {
            ++COUNTER;
        }
        long end = System.currentTimeMillis();
        System.out.println("Executed in: " + (end - start));
        System.out.println(COUNTER);
    }
}
```
Với **single-thread**, mất khoảng 10 ms để có kết quả.
```java
public class MultiThread {

    static long COUNTER = 0;

    public static void main(String... args) throws InterruptedException {
        var threads = IntStream
                .range(0, 100)
                .mapToObj(ignore -> new Thread(() -> {
                    synchronized (MultiThread.class) {
                        for (int i = 0; i < 1_000_000; i++) {
                            ++COUNTER;
                        }
                    }
                })).collect(Collectors.toList());
        long start = System.currentTimeMillis();
        threads.forEach(Thread::start);
        for (var thread : threads) {
            thread.join();
        }
        long end = System.currentTimeMillis();
        System.out.println("Executed in: " + (end - start));
        System.out.println(COUNTER);
    }
}
```
Với **multi-thread** cụ thể là 100 thread,mất khoảng 30 ms để xử lý. Lý do như mình đã trình bày phía trên.

Trong thực tế các task đều phức tạp nên khi lập trình **multi-thread** sẽ tận dụng được sức mạnh của **multi-processor**. Với các bài toán đơn giản thì **single-thread** đôi khi lại là giải pháp tốt hơn.

Cụ thể, dựa trên các đặc điểm tương tác của task mà phân chia ra làm 2 loại là:
> - **I/O bound task**.
> - **CPU bound task**.

### CPU bound task
**CPU bound** nói về task được thực hiện đa phần với **processor** ví dụ:
> - Thao tác phép tính với các con số: +, -, *, /.
> - Sắp xếp các phần tử trong array.
> - Đảo ngược một ma trận...

Tốc độ xử lý các bài toán này chủ yếu dựa trên sức mạnh của **processor**. **Processor** càng mạnh tốc độ xử lý càng nhanh, càng nhiều **processor** thì các **CPU bound task** được thực thi càng nhanh.

Do đó, **multi-threading** với các task này sẽ tận dụng được khả năng **parallel execution** giúp chương trình được thực thi nhanh hơn. Và nó chỉ thực sự phát huy tác dụng khi các task là **concurrent task**, không phải là sequence task giống như ví dụ ở trên nhé.

### I/O bound task
**I/O bound** nói về task mang tính chất tương tác với các hệ thống bên ngoài. Ví dụ:
> - Gọi ra các service bên ngoài thông qua internet ví dụ như TCP, UDP, HTTP...
> - Tương tác với database: đọc/ghi dữ liệu.
> - Tương các với hệ thống file.

Với bài trước, ta biết rằng tốc độ xử lý của **processor** là cực nhanh, hơn gấp nhiều lần tốc độ internet, HDD, SSD hay RAM. Do đó, tốc độ xử lý của chương trình **không phụ thuộc và processor** mà lúc này **phụ thuộc vào tốc độ đường truyền internet, tốc độ đọc/ghi của ổ đĩa (I/O computation)**.

Do đó, việc áp dụng **multi-threading** với **I/O bound task** không cải thiện tăng tốc độ thực thi, thậm chí còn làm chương trình xử lí tác vụ chậm hơn.

Nhưng chắc chắn nó vẫn đem lại 2 lợi ích vô cùng thiết thực:
> - **Multi-threading** với **I/O bound task** giúp thực hiện **asynchronize task**, thay vì chờ response từ client (service/database), ta sẽ thực hiện task đó trên thread khác tránh gây block cho main thread từ đó giúp chương trình chạy mượt mà hơn.
> - **Multi-threading** giúp handle được nhiều request hơn trong một thời điểm. Ví dụ nếu có 3 request mà chỉ có một thread thì 2 request đến sau phải chờ, nhưng nếu có 3 thread thì tất cả các request đều được xử lý đồng thời.

## 4) Bao nhiêu thread là đủ?

Làm một ví dụ đơn giản, cho [folder](https://github.com/datbv/tutorials/blob/main/word-counting/data-1.zip) chứa một danh sách các file. Nhiệm vụ là đếm số lượng kí là chữ cái latin (a-z, A-Z) xuất hiện tổng cộng bao nhiêu lần?

Xử lí với **single-threading** và **multi-threading** để thấy sự khác biệt, đồng thời tuning số lượng thread để trả lời câu hỏi đầu bài.

### 4.1) Single thread

Xử lí với **single thread** thì chẳng có gì để bàn, cứ tuần tự mà làm thôi.

### 4.2) Multi thread

Tất nhiên là phải code luôn multi thread thì mới compare được. Phân tích nhanh thì concurrent task sẽ là kiểm tra một string xem số lần xuất hiện của các kí tự là bao nhiêu. Các string có thể là một kí tự, một từ, một dòng, một file.

Bây giờ là đến việc tính toán số lượng thread như thế nào, phân chia task ra sao, hàng loạt các câu hỏi hiện lên trong đầu...
- Đọc file, mỗi dòng đẩy cho 1 thread xử lý có ổn không? Hay 1 thread xử lí cả đoạn văn, hay là 1 file luôn?
- Nếu tạo ít thread quá, có 2 3 cái mà có tận 16 files thì có chậm không?
- Hay mỗi file sinh ra một thread xử lí thì sao nhỉ? Nhưng lỡ có vài trăm vài nghìn files thì cũng không ổn?

Đi vào phân tích kĩ hơn, có 2 task chính cần thực hiện:
- **I/O bound task**: đọc file, lấy data để xử lý. Vì là I/O bound task nên cố gắng tối đa số lượng thread để read được càng nhiều data càng tốt. Tất nhiên còn phụ thuộc vào read/write speed của ổ cứng.
- **CPU bound task**: kiểm tra kí tự có là chữ cái latin hay không. Theo như mớ lý thuyết ở trên, chỉ cần tạo ra một thread là đủ.

Tiếp theo, phân tích về architecture, có thể tiếp cận với 2 cách sau:
- **Mô hình Actor**: tạo thread pool để read data, sau đó đẩy data sang một thread chuyên để xử lí kí tự, giao tiếp với nhau qua blocking queue.
- **Mô hình fork join**: vẫn là tạo thread pool, nhưng các thread sẽ làm từ đầu đến cuối cho một file, bao gồm read data và xử lí kí tự. Sau khi tất cả hoàn tất sẽ tổng hợp data.

Quẩy luôn cả 2 cách và tiến hành run code so sánh.


### 3) Run

[Source code](https://github.com/datbv/tutorials/tree/main/word-counting) các bạn có thể tham khảo kĩ hơn tại đây nhé. Mình sẽ tạo ra tổng cộng 9 scenario để có thể dễ dàng so sánh và kiểm chứng mớ lí thuyết của series này.
- Single thread
- Fork Join với lần lượt 2, 4, 8 và 16 threads.
- Actor cũng với lần lượt 2, 4, 8 và 16 threads.

> Cấu hình máy chạy test là CPU Intel i7-1165G7 4 cores - 8 threads.

```java
public class Application {

    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            System.out.println("New round ------------------------------------ ");
            execute(new SingleThreadCountingService(), args[0], "Single thread: \t\t\t");
            execute(new ForkJoinCountingService(2), args[0], "ForkJoin 02 thread: \t");
            execute(new ForkJoinCountingService(4), args[0], "ForkJoin 04 thread: \t");
            execute(new ForkJoinCountingService(8), args[0], "ForkJoin 08 thread: \t");
            execute(new ForkJoinCountingService(16), args[0], "ForkJoin 16 thread: \t");
            execute(new ActorCountingService(2), args[0], "Actor 02 thread: \t\t");
            execute(new ActorCountingService(4), args[0], "Actor 04 thread: \t\t");
            execute(new ActorCountingService(8), args[0], "Actor 08 thread: \t\t");
            execute(new ActorCountingService(16), args[0], "Actor 16 thread: \t\t");
        }
    }

    private static void execute(CharacterCountingService service, String dir, String message) {
        service.count(dir);
        System.out.printf("%s %15d %n", message, service.getExecutedTimeInNanos());
    }

}
```

Mình chạy tổng cộng 5 lượt để đưa ra đánh giá khách quan nhất. Lưu ý rằng kết quả của round đầu tiên sẽ bỏ qua vì cần [warm-up](https://viblo.asia/p/003-jvm-code-cache-va-ahead-of-time-compiler-YWOZrrQRZQ0) code. 

Đầu tiên, với folder [data-1](https://github.com/datbv/tutorials/blob/main/word-counting/data-1.zip), kết quả như sau (bỏ round đầu tiên):

```shell=
New round ------------------------------------ 
Single thread:          3455551600 
ForkJoin 02 thread:     1948649200 
ForkJoin 04 thread:     1314783500 
ForkJoin 08 thread:     1203243500 
ForkJoin 16 thread:     1242951800 
Actor 02 thread:        3092987600 
Actor 04 thread:        3130461000 
Actor 08 thread:        3139415900 
Actor 16 thread:        3135735200 
New round ------------------------------------ 
Single thread:          3448729400 
ForkJoin 02 thread:     1887355700 
ForkJoin 04 thread:     1330755100 
ForkJoin 08 thread:     1192182800 
ForkJoin 16 thread:     1233279900 
Actor 02 thread:        3113192000 
Actor 04 thread:        3131072800 
Actor 08 thread:        3130556300 
Actor 16 thread:        3196362400 
New round ------------------------------------ 
Single thread:          3531286300 
ForkJoin 02 thread:     1956214700 
ForkJoin 04 thread:     1298034700 
ForkJoin 08 thread:     1213541000 
ForkJoin 16 thread:     1254718100 
Actor 02 thread:        3112010700 
Actor 04 thread:        3199576800 
Actor 08 thread:        3114821800 
Actor 16 thread:        3150662900 
New round ------------------------------------ 
Single thread:          3497896900 
ForkJoin 02 thread:     1985285900 
ForkJoin 04 thread:     1314125300 
ForkJoin 08 thread:     1216979700 
ForkJoin 16 thread:     1211707400 
Actor 02 thread:        3148100900 
Actor 04 thread:        3304655300 
Actor 08 thread:        3183578200 
Actor 16 thread:        3382464400
```

Tổng quan về kết quả thì Fork Join 8 thread là chạy tốt nhất. 
> Từ đây, lí thuyết đầu tiên đã được kiểm chứng. Quá ít hoặc quá nhiều thread đều không đem lại kết quả tối ưu. **Tốt nhất số thread nên bằng số lượng cores**. Vì thứ thực sự thực thi task chính là core/processor chứ không phải thread.

Tiếp theo, về lí thuyết thì **Actor** nên có tốc độ xử lí tốt hơn **ForkJoin**, nhưng vì sao thực tế không phải vậy? Mặc dù việc check character là **CPU bound task** nhưng chúng ta có đến hàng nghìn kí tự trong tất cả các files. Mà việc tính toán này lại chỉ thực hiện trên single thread thì chậm là đúng. Đáng lí phải xử lý giống như ForkJoin, nhiều thread thực hiện check character và chỉ cần 1 thread để read data từ file là đủ.
> Tuy nhiên, kết quả của nó vẫn tốt hơn SingleThread vì việc read file được thực thi trên multi thread.

Bây giờ thay đổi dữ liệu một chút, chúng ta sẽ xử lý với [folder này](https://github.com/datbv/tutorials/blob/main/word-counting/data-2.zip) (8 files, trung bình 500 kí tự một file). Thử đoán kết quả trước khi xem tiếp nhé...

```shell=
New round ------------------------------------ 
Single thread:          1779600 
ForkJoin 02 thread:     1777900 
ForkJoin 04 thread:     1158000 
ForkJoin 08 thread:     1573700 
ForkJoin 16 thread:     1579400 
Actor 02 thread:         162900 
Actor 04 thread:         220200 
Actor 08 thread:         268000 
Actor 16 thread:         514400 
New round ------------------------------------ 
Single thread:          1774100 
ForkJoin 02 thread:     1501900 
ForkJoin 04 thread:     1219700 
ForkJoin 08 thread:     1748500 
ForkJoin 16 thread:     2140700 
Actor 02 thread:         275400 
Actor 04 thread:         169300 
Actor 08 thread:         352100 
Actor 16 thread:         258000 
New round ------------------------------------ 
Single thread:          1853600 
ForkJoin 02 thread:     1710100 
ForkJoin 04 thread:     1190200 
ForkJoin 08 thread:     1319800 
ForkJoin 16 thread:     1631500 
Actor 02 thread:         121000 
Actor 04 thread:         520700 
Actor 08 thread:         131900 
Actor 16 thread:         112200 
New round ------------------------------------ 
Single thread:          1253200 
ForkJoin 02 thread:     1301600 
ForkJoin 04 thread:     1866300 
ForkJoin 08 thread:     1717900 
ForkJoin 16 thread:     1826500 
Actor 02 thread:         141500 
Actor 04 thread:          98100 
Actor 08 thread:         200100 
Actor 16 thread:          84900 
```

Và.. một sự bất ngờ không hề nhẹ.
- **SingleThread** thỉnh thoảng có kết quả tốt hơn **ForkJoin** (multi thread).
- **Actor** lúc này cho kết quả tốt nhất.

Giải thích vô cùng đơn giản như sau:
- Số lượng kí tự ít, đồng nghĩ với việc các CPU bound task nhỏ. Việc thực thi trên single thread đem lại kết quả tốt vì cost cho [switch context](https://viblo.asia/p/005-os-doi-xu-voi-thread-the-nao-bJzKmVvYZ9N#_2-context-switch-1) nhỏ hơn rất nhiều so với multi thread.
- CPU bound task thấp, nên single thread là đủ để thực hiện nhiệm vụ. Tuy nhiên lúc này còn I/O bound task đọc data từ file, lúc này sử dụng multi thread là một lựa chọn cực kì hợp lí. Vì vậy mà lúc này **Actor** phát huy tối đa tác dụng!

## 5) Kết luận

Chắc cũng không cần thêm gì nhiều vì toàn bộ ví dụ trên đã giải thích tất cả. 
- Không phải cứ nhiều thread đã là nhanh.
- Không phải single thread đều chậm hơn multi thread.
- Điều quan trọng là biết vận dụng đúng cách, phân tích bài toán tỉ mỉ, phân chia task hợp lí để đạt hiệu quả tốt nhất.

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

### After credit

Ngoài ra, cách đặt vị trí **variable** (class/instance/local variable) cũng ảnh hưởng đến hiệu suất của bài toán. Nó liên quan đến cách quản lý bộ nhớ trong Java (sẽ có series riêng về phần này).

Không phải bài toán nào áp dụng **multi-thread programming** cũng thành công mà cần dựa trên tính chất và cách phân chia bài toán. Mình sẽ nói cụ thể ở bài sau. Ta cần linh hoạt áp dụng các cách triển khai và xử lý để đạt hiệu quả tối ưu. Bài tiếp theo sẽ bàn luận về performance khi lập trình **multi-thread**.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)