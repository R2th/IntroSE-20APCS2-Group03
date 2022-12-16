© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Java memory management & performance](https://viblo.asia/s/java-memory-management-performance-vElaB80m5kw).

**JIT Compiler** biến những [hot spots](https://viblo.asia/p/003-jvm-code-cache-va-ahead-of-time-strategy-YWOZrrQRZQ0#_after-credit-4) **bytecode** thành **native code** và lưu trữ ở **JVM Code cache** để những lần thông dịch sau có thể dùng luôn **native code** giúp tăng performance cho chương trình.

Bài viết hôm nay sẽ tìm hiểu kĩ hơn về JVM Code cache, tuning JVM Code cache size và AoT Compiler. Let's begin.

## 1) JVM Code cache

**JVM Code cache** là nơi lưu trữ các **native code** sau khi được **compile** từ **bytecode**. Và chỉ những **hot spot** code mới được **compile** sang **native code** chứ không phải toàn bộ. Xem model bên dưới để có cái nhìn tổng quan về quá trình **JVM** thực thi các dòng code nhé.

![](https://i.imgur.com/dwryCQQ.png)

> Nếu quan sát kĩ, bạn có nghĩ ra cách nào để **optimize** flow trên không?
>
> 3, 2, 1.. hết giờ. Thay vì chờ **C1** và **C2 compiler** compile hot code, ta có thể tự chỉ định đoạn code nào nên được compile luôn không? Như vậy, vừa giảm tính toán cho **JVM** mà vừa tăng performance cho application. 
>
> Nếu bạn nghĩ được như vậy thì bạn đã có suy nghĩ giống các kĩ sư của Oracle rồi. **AoT Compiler** (Ahead of Time Compiler) được sinh ra để thực hiện tính năng trên. Thực ra không chỉ riêng Java mà các **interpreter language** khác cũng có tính năng này :joy:.


Bản thân **code cache** là nơi lưu trữ **native code** nên chúng cũng có giới hạn bộ nhớ mặc định từ 2496 KB đến 240 MB với Java 8 JVM 64-bit. Với Java 7 maximum là 32 MB JVM 32-bit và 48 MB JVM 64-bit. Không cần quan tâm đến các con số default này lắm vì ta có thể thay đổi được.

Nếu lượng **native code** lưu trữ vượt quá 240 MB thì chuyện gì xảy ra? Tất nhiên rồi, **JVM** không thể compile thêm vào **code cache** dẫn đến các đoạn **hot code** khác không được compile mà cần interpret làm giảm performance của chương trình.

Khi đó **JVM** sẽ print out warning log:
```
Java HotSpot(TM) 64-Bit Server VM warning: CodeCache is full. Compiler has been disabled.
```

Nó không làm crash application, nhưng làm giảm performance, cũng tệ không kém :joy:. Để kiểm tra **code cache** size, ta sử dụng JVM options -XX:+PrintCodeCache. Sử dụng [code ở bài trước](https://viblo.asia/p/001-wora-jit-compiler-va-xxprintcompilation-gDVK2O3nZLj#_3-practice-2), thêm option xem output là gì nhé.

```shell
$ java -XX:+PrintCodeCache Application

CodeHeap 'non-profiled nmethods': size=120032Kb used=21Kb max_used=21Kb free=120010Kb
 bounds [0x00007fb9945a6000, 0x00007fb994816000, 0x00007fb99bade000]
CodeHeap 'profiled nmethods': size=120028Kb used=123Kb max_used=123Kb free=119905Kb
 bounds [0x00007fb98d06f000, 0x00007fb98d2df000, 0x00007fb9945a6000]
CodeHeap 'non-nmethods': size=5700Kb used=978Kb max_used=990Kb free=4721Kb
 bounds [0x00007fb98cade000, 0x00007fb98cd4e000, 0x00007fb98d06f000]
 total_blobs=329 nmethods=96 adapters=146
 compilation: enabled
              stopped_count=0, restarted_count=0
 full_count=0

```

Nếu bạn sử dụng Java 8 thì output sẽ có chút khác biệt.

Phân tích xem có gì hay ho. Với output trên, **code cache** được chia làm 3 segment **CodeHeap**: 
> - non-profiled nmethods
> - profiled nmethods
> - non-nmethods

Với tổng size khoảng 30 MB nhưng mới dùng (used) hơn 140 KB. Tất nhiên rồi, ứng dụng khá đơn giản nên không tốn mấy. Nhưng với các ứng dụng lớn và phức tạp, **used** thường gần bằng **size** và cứ đuổi nhau cho đến giới hạn **code cache** size.

## 2) Tuning JVM Code cache size

Thực ra không có cơ chế cụ thể nào để tìm ra **code cache** size cần thiết cho một application. Chỉ có thể dựa vào cảm nhận, khả năng phán đoán, các test case đặc biệt để quyết định tăng **code cache** size, thường là tăng x2 hoặc x4 giá trị default.

Có 3 JVM options để thực hiện tuning **code cache** size:
> - InitialCodeCacheSize: **code cache** size khi start application. Giá trị min defaut là 2496 KB.
> - ReservedCodeCacheSize: maximum **code cache** size, default là 240 MB, cũng đủ với một ứng dụng vừa phải. Size của **code cache** sẽ dao động từ giá trị **initial** đến giá trị **reserved** và việc resize không ảnh hưởng đáng kể đến application performance. Do đó, chỉ cần tuning giá trị **reserved** là đủ.
> - CodeCacheExpansionSize: **JVM** sẽ không cấp phát ngay 240 MB cho **code cache** mà size sẽ tăng lên theo size của **native code** đang lưu trữ. Với mỗi lần **native code** gần đạt giá trị max, **code cache** size sẽ tăng lên với giá trị **expansion** này. 

**Code cache** size sẽ tăng lên dựa trên size **native code** đang lưu trữ. Vậy vì sao không để default size là 1 GB hoặc 10 GB luôn cho khỏe? 

> Chuyện không đơn giản như vậy, lấy một ví dụ cho dễ hình dung. Hãy coi memory là một ngân khố, và bạn không thể tiêu quá số tiền trong ngân khố được. Tranh thủ nắng đẹp lên kế hoạch đi chơi, bạn xin $500. Nếu ngân khố còn đủ, họ sẽ cấp cho trợ lý của bạn quản lý số tiền này. Trợ lý sẽ đưa nhỏ giọt, tránh bạn cho gái :joy:, hoặc tiêu xài hoang phí.
>
> Điều tương tự xảy ra với Java application và **code cache**, nếu bạn muốn **code cache** size là 10 GB, hệ thống sẽ cấp phát đủ và dữ trữ cho đến khi nào cần. Nếu không sử dụng hết rất lãng phí.

Nói thế chứ **JVM** chỉ cho phép **code cache** size tối đa là 2 GB. Chạy lại với setting max size = 4 MB xem sao.

```shell
$ java -XX:ReservedCodeCacheSize=4m -XX:+PrintCodeCache Application

CodeCache: size=4096Kb used=1124Kb max_used=1134Kb free=2971Kb
 bounds [0x00007fd4956db000, 0x00007fd49594b000, 0x00007fd495adb000]
 total_blobs=330 nmethods=97 adapters=146
 compilation: enabled
              stopped_count=0, restarted_count=0
 full_count=0

```

Chuẩn **size** = 4 MB ~ 4096 KB.

Với những application nhỏ hoặc vừa, ta không cần quá quan tâm đến **code cache** size vì 240 MB không phải con số nhỏ. Tuy nhiên những application siêu to khổng lồ lắm tiền nhiều của với bộ nhớ không giới hạn, chẳng tội gì không tăng **code cache** size.

> Làm sao để biết chính xác application là đủ lớn để tăng **code cache** size? Hãy thực hiện test, integration test, stress test, performance test... và monitor qua **jsonsole**. 

![](https://i.imgur.com/1pSJfjI.png)

## 3) Ahead of Time Strategy

Java Ahead of Time (AOT) Compiler xuất hiện từ Java 9 trở đi, đó là lý do vì sao mình sử dụng Java 11 cho bài viết này. 

**AoT Compiler** có những đặc trưng khác với **JIT Compiler** như sau:
> - Compile **bytecode** sang **native code** trước thời điểm thực thi.
> - Load sẵn các **native code** và khi thực thi gọi trực tiếp đến **native code** đó.

Thế chả hóa ra từ **interpretive language** giờ lại chuyển thành **compile language**, dẫn đến mất luôn tôn chỉ **WORA** ban đầu? Bàn luận sau nhé.

![](https://i.imgur.com/I61tUxe.png)

Vì đặc trưng đó của AoT nên việc compile sẽ chuyển **Java code** trực tiếp sang **native code** thông qua **jaotc**. Sau đó được đính kèm vào **JVM** trong lúc start application.

> Vì việc compile AoT từ **Java code** sang **native code** xảy ra bên ngoài JVM, do vậy đoạn **native code** sau khi được compile chỉ có thể được thực thi trên chính OS đó.

![](https://i.imgur.com/ZBIC6KE.png)

Thực hành trước đã, đầu tiên tiến hành compile **Java code** sang **bytecode**:
```shell
javac Application.java
```

Lúc này sẽ có 2 file chứa **bytecode** của 2 class được tạo ra là Application.class và PrimeNumberGenerator.class. Tiến hành AoT compile cho PrimeNumberGenerator class:

```shell
jaotc --output libPrimeNumberGenerator.so PrimeNumberGenerator.class
```

Start application với libPrimeNumberGenerator chứa **native code**:
```shell
java -XX:+UnlockExperimentalVMOptions -XX:AOTLibrary=./libPrimeNumberGenerator.so Application
```

Giải thích qua các keyword:
> - **joatc**: compile **bytecode** sang **native code**. Với ví trụ trên, ta compile PrimeNumberGenerator.class sang **native code** được lưu trữ trong file **.so**.
> - **-XX:AOTLibrary**: tiếp theo để chương trình sử dụng các **native code** này, ta cần attach chúng vào JVM thông qua JVM option -XX:AOTLibrary.
> - **-XX:+UnlockExperimentalVMOptions**: **AoT** vẫn trong giai đoạn thử nghiệm, chưa support chính thức nên để enable cần sử dụng thêm UnlockExperimentalVMOptions.

Với AoT compilation, sẽ không còn các đoạn code cần tối ưu do chúng ta viết nữa, thay vào đó sẽ là **native code** luôn. Các bạn có thể kiểm chứng bằng cách thêm **-XX:+PrintCompilation** nhé.

Vậy nếu không muốn dùng AoT compilation thì sao? Đơn giản thôi, không khai báo JVM option trong quá trình start application nữa, chương trình vẫn hoạt động bình thường.
```shell
java Application
```

Đọc đến đây phần nào đã có cái nhìn chi tiết hơn về **AoT Compilation**. Nó không hoàn toàn biến Java thành **compile language** trừ khi bạn muốn như vậy. Nếu phát hiện ra đoạn code nào trong chương trình có khả năng cần tối ưu, có thể là heavy behavior hoặc loop... ta hoàn toàn có thể **pre-compile** với AoT để tăng performance cho application.

Ngoài ra trên production, việc **cross-platform** không phải vấn đề ưu tiên và gần như không xảy ra. Vấn đề cần quan tâm là làm sao cho application chạy nhanh nhất có thể.

Túm cái váy lại, **AoT Compiler** có những ưu điểm sau:
> - Tốc độ thực thi nhanh, không cần **interpret** bytecode.
> - Giảm CPU computation để compile hot spot **bytecode** sang **native code**.
> - Một vấn đề quan trọng, có thể share **native code** với nhiều process khác nhau trên cùng một máy. Vì **native code** được lưu trữ trong file .so, chỉ cần add vào JMV options. Tuy nhiên cần design, implement để tách riêng các đoạn code dùng chung nếu muốn tận dụng ưu điểm này.

Tuy nhiên, do chưa official release, support nên sẽ có những rủi ro.. không lường trước.

Phần sau sẽ tìm hiểu kĩ hơn về **code cache** segment với **C1** và **C2 Compiler** và tired compilation level nhé:
> - non-profiled nmethods
> - profiled nmethods
> - non-nmethods

### Reference
Reference in series https://viblo.asia/s/java-memory-management-performance-vElaB80m5kw

### After credit

**JVM** mình đề cập đến trong series này là **Java HotSpot(TM) 64-Bit Server VM** của Oracle, khá phổ biến và xịn xò. Bạn có thể sử dụng câu lệnh sau để kiểm tra, chắc ai cũng biết :joy::
```shell
$ java -version

java 11.0.11 2021-04-20 LTS
Java(TM) SE Runtime Environment 18.9 (build 11.0.11+9-LTS-194)
Java HotSpot(TM) 64-Bit Server VM 18.9 (build 11.0.11+9-LTS-194, mixed mode)
```

Phàm bất cứ chuyện gì xảy ra cũng đều có lý do cả. Bạn có biết vì sao nó được đặt tên là **HotSpot** không?

Idea khá đơn giản. **HotSpot** xuất phát từ cách tiếp cận của **Compiler** để biên dịch code. Trong một chương trình thông thường, chỉ một phần khá nhỏ **block of code** được thực thi thường xuyên và chính những **block of code** đó là yếu tố quyết định hiệu suất của chương trình. Và nó được gọi là các điểm nóng (**hot spots**) của chương trình. Phần code được thực thi càng nhiều thì càng **hot**.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)