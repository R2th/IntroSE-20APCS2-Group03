© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Java memory management & performance](https://viblo.asia/s/java-memory-management-performance-vElaB80m5kw).

Với bài viết đầu tiên, cùng nhìn sơ lược về cách JVM thực thi các đoạn code của chúng ta như thế nào nhé.

## 1) WORA

Java nổi tiếng với **WORA**, nghĩa là **Write once, run anywhere**, viết một lần và chạy mọi nơi. Oh shit, wtf... làm sao lại có một ngôn ngữ thần thánh như vậy, bí ẩn phía sau nó là gì?

Lấy ví dụ thực tế, nếu mình chỉ biết tiếng Việt, liệu mình có thể đi du lịch nước ngoài được không? Làm sao mình giao tiếp được với người bản địa. Chẳng có nhẽ với mỗi một quốc gia khác nhau mình phải học ngôn ngữ của họ. 

Có 3 cách cơ bản để giải quyết vấn đề trên:
> - Thứ nhất, tham dự một khóa học ngoại ngữ cấp tốc để giao tiếp cơ bản được với người bản địa. Khá tốn, không khả thi.
> - Thứ hai, cũng đi học ngoại ngữ nhưng là international language. Không khác cách đầu tiên mấy.
> - Thứ ba, thuê luôn tour guide cho nhàn, giàu nữa thì chơi hẳn interpreter cho máu. Có vẻ khả thi nhất rồi. Vẫn hơi tốn kém, thôi dùng cái máy thông dịch (khá phổ biến hiện nay) tầm 5 - 8 củ là ngon nghẻ rồi.

Như vậy, bài toán được giải quyết đơn giản với cách thứ ba, đầu tư một lần, dùng nhiều lần. Không cần biết tất cả các loại ngôn ngữ, chỉ cần biết một và.. đi đâu cũng dùng được với chiếc máy interpreter nhỏ gọn.

Java dựa trên idea này để thực hiện **WORA**, viết một lần dùng mọi nơi. Interpreter lúc này là **JVM** và **compiler**. Các ngôn ngữ của từng quốc gia là các hệ điều hành như Windows, MacOS, Linux... và ngôn ngữ chúng ta nói là các đoạn code Java.

Quá trình để một đoạn code Java được thực thi với WORA diễn ra như sau:
> - Mua một cái máy interpreter trước, hay nói cách khác là cài đặt **JDK (Java development kit)**. Nếu chưa rõ các bạn có thể tìm đọc thêm về JDK, JRE và JVM nhé.
> - Sau đó, nói vào máy thông dịch để nó ghi nhận thông tin. Tương ứng với việc viết code trong file **.java**.
> - Lúc này máy thực hiện chuyển ngôn ngữ của chúng ta sang dạng ngôn ngữ máy có thể hiểu được. Cụ thể đó là chuyển thông tin từ dạng âm thanh sang dạng tín hiệu điện từ để tiến hành phân tích. Với Java, ta phải làm việc này thủ công, đó là thực hiện biên dịch các file **.java** sang file **.class** chứa các bytecode là ngôn ngữ của JVM để được thực thi.
> - Cuối cùng, interpreter dịch sang ngôn ngữ bản địa và phát âm thanh. Tương ứng với **JVM** dịch **bytecode** sang **machine code** phù hợp với từng OS khác nhau để thực thi.

Trong thực tế, ứng dụng bao gồm rất nhiều file, sau khi compile ta sẽ nén nó thành một file duy nhất cho gọn, thường là **.jar** hoặc **.war**. Đem file **jar** này đi chạy trên OS nào cũng được, với điều kiện đã có **JRE**. **Write once, run anywhere** là như vậy.

![](https://i.imgur.com/qCaLYPF.png)

## 2) JIT Compiler

Bỏ qua phần compile code, để start một Java application với jar file, ta sử dụng câu lệnh:

```shell
$ java -jar file-name.jar
```

Sau khi chạy, một **JVM** mới được tạo ra và thực thi trên đó. Như vậy, mỗi một application chạy trên một JVM riêng biệt, nếu có được hỏi phỏng vấn thì cứ mạnh dạn trả lời nhé :joy:.

**JVM** có nhiệm vụ thông dịch các đoạn code sang mã máy để OS thực thi. Như vậy, có thể nói **Java** là **interpreter language**. Nếu bàn về tốc độ thực thi thì không có cửa so với các ngôn ngữ **compiled language** như **C**, **C++** hay **C#**...

> Các ngôn ngữ như **C** hay **C#** được trực tiếp biên dịch (compile) ra mã máy nên khi thực thi sẽ nhanh hơn do không tốn công chuyển đổi (interpret) từ **bytecode** sang **native code** như Java. Do đó, với **compiled language**, mỗi khi chạy trên OS khác nhau cần compile lại code để phù hợp với OS đó, không có **WORA** như Java, bù lại tốc độ thực thi nhanh hơn.

Tuy nhiên nó chỉ là bề nổi của tảng băng chìm, các kĩ sư của **Sun**/**Oracle** đã thiết kế **JVM** với hàng loạt tính năng và thuật toán phức tạp để làm chương trình hoạt động hiệu quả hơn là việc đơn thuần sử dụng **interpreter**. 

**JVM** sẽ monitor xem đoạn code nào được thực thi nhiều lần. Đoạn code đó có thể là method, một phần của method hoặc một vòng lặp (loop). Sau khi tìm được **block of code** đó, thay vì mỗi lần thực thi phải **interpret** sang **machine code** thì nó được **compile** sang **machine code** luôn cho nhanh. Tất nhiên sau khi **compile** phải có nơi lưu trữ lại **native code** đó, là **code cache**. Như vậy, tại một thời điểm, một vài phần của chương trình sẽ không chạy trong trạng thái **interpretive** nữa mà là thực thi luôn **native code**.

Việc **interpret** từ **bytecode** sang **native code** hoặc quyết định **compile** và lưu trữ lại **native code** đó hay không là nhiệm vụ của **Just-in-time Compiler**, ngắn gọn hơn là **JIT Compiler**.

> **Machine code** hay nói cách khác là **native code** là những đoạn code mà OS có thể hiểu ngay được để thực thi, không cần thông qua **interpreter**. **JIT Compiler** là trái tim của **JVM**, có nhiệm vụ thông dịch **bytecode** sang **native code** và giúp cho Java application chạy nhanh hơn. Ngoài ra, nó cũng là lý do vì sao khi benchmark những đoạn code chạy lần đầu luôn chậm hơn các lần sau đó.

Thực ra không cần đi quá sâu vào phần này nếu bạn không cần optimize application. Nên nếu muốn optimize application ta cần hiểu rõ hơn về nó. Let's continue :joy:.

> Những đoạn code được chạy thường xuyên (**hot code**) sẽ được **JIT Compiler** **compile** thành **native code** để tăng tốc độ thực thi. Tương tự, method nào cả ngày chỉ chạy có một vài lần thì.. thôi mỗi lần chạy là một lần **interpret** cũng được, để dành memory lưu trữ cho các đoạn code khác cần thiết hơn.

Việc **compile** từ **Java bytecode** sang **native code** được thực hiện trên [thread](https://viblo.asia/p/003-thread-va-process-gDVK2eeA5Lj#_2-thread-1) độc lập với quá trình **interpreter**. Bản chất **JVM** cũng là một application, và là **multi-thread** application. Một thread thực hiện **interpret** **bytecode** sang **native code**, thread khác thực thi **native code** đó, và một thread compile **bytecode** sang **native code** lưu trữ trên **code cache**. Do vậy, việc **compile** sang **native code** không có bất kì ảnh hưởng gì đến quá trình run application. Nếu chưa có sẵn **native code**, JVM vẫn sử dụng **interpreter** để thực thi code. Và khi **native code** đã sẵn sàng, JVM sẽ chuyển sang dùng luôn, chả tội gì phải **interpret** nữa.

## 3) Practice

Đến giờ thực hành rồi, cùng tìm hiểu xem dòng code nào được **compile** sang **native code**. Bài toán đơn giản như sau, in ra 10 số nguyên tố đầu tiên. Tạo file **Application.java** và code thôi:

```java
import java.util.ArrayList;
import java.util.List;

class PrimeNumberGenerator {

    private boolean isPrime(int n) {
        final double result = Math.sqrt(n);
        for (int i = 2; i <= result; i++) {
            if (n % i == 0) {
                return false;
            }
        }
        return true;
    }

    private int getNextPrimeAbove(int previous) {
        int number = previous + 1;
        while (!isPrime(number)) {
            ++number;
        }
        return number;
    }

    public void generateNumbers(int count) {
        final List<Integer> primes = new ArrayList<>();
        primes.add(2);

        int next = 2;
        while (primes.size() <= count) {
            next = getNextPrimeAbove(next);
            primes.add(next);
        }
        System.out.println(primes);
    }

}

public class Application {

    public static void main(String[] args) {
        final PrimeNumberGenerator generator = new PrimeNumberGenerator();
        generator.generateNumbers(10);
    }

}
```

Với Java 8, ta cần thực hiện compile sang **bytecode** trước khi chạy ứng dụng, tức là cần 2 câu lệnh. Tuy nhiên với Java 11, chỉ cần 1 câu lệnh, nó sẽ thực hiện compile on the fly luôn (chỉ thực hiện được với chương trình có 1 class duy nhất).

Hiện tại mình đang sử dụng Java 11 nhé.

```shell
$ java -version

java version "11.0.11" 2021-04-20 LTS
Java(TM) SE Runtime Environment 18.9 (build 11.0.11+9-LTS-194)
Java HotSpot(TM) 64-Bit Server VM 18.9 (build 11.0.11+9-LTS-194, mixed mode)
```

Nguy hiểm tí thôi, mình thực hiện luôn trên IDE cho nhanh. Hoặc dùng command line như bên dưới cho nguy hiểm.

```shell
$ javac Application.java
$ java Application

[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
```

Thêm JVM options khi chạy **-XX:+PrintCompilation**, nó sẽ in thêm các thông tin về quá trình **code compilation**. Nói qua về JVM options trước, nó là các tham số.. nâng cao trong quá trình thực thi code. Phần lớn JVM options tuân theo format chia làm 3 phần:
> - Phần đầu tiên **-XX:**
> - Phần tiếp theo là dấu **+** hoặc **-** nhằm mục đích bật/tắt các options.
> - Phần cuối là tên của options dưới dạng CamelCase, viết hoa các chữ cái đầu tiên của mỗi từ.

JVM options sẽ được thêm ngay sau keywork **java** khi thực thi chương trình, ví dụ:

```shell
$ java -XX:+PrintCompilation Application
```

Sau khi thêm **-XX:+PrintCompilation**, kết quả là:

```shell
     27    1       3       java.lang.StringLatin1::hashCode (42 bytes)
     28    2       3       java.lang.Object::<init> (1 bytes)
     28    3       3       java.lang.String::hashCode (49 bytes)
     28    5       3       java.lang.String::isLatin1 (19 bytes)
     28    4       3       java.lang.String::coder (15 bytes)
     28    6       3       java.util.ImmutableCollections$SetN::probe (56 bytes)
     28    7       3       java.lang.Math::floorMod (10 bytes)
     29    8       3       java.lang.Math::floorDiv (22 bytes)
     29   10       3       java.lang.StringLatin1::equals (36 bytes)
     29   11       3       java.util.ImmutableCollections$SetN::hashCode (46 bytes)
     29    9       3       java.lang.String::equals (65 bytes)
     30   12       3       java.util.ImmutableCollections::emptySet (4 bytes)
     30   13       3       java.util.Set::of (4 bytes)
     30   15       4       java.lang.StringLatin1::hashCode (42 bytes)
     30   14       3       java.util.Objects::equals (23 bytes)
     30   16       3       java.lang.module.ModuleDescriptor$Exports::hashCode (38 bytes)
     31   19       3       java.util.Objects::requireNonNull (14 bytes)
     31   17       3       java.util.AbstractCollection::<init> (5 bytes)
     31   18       3       java.util.ImmutableCollections$AbstractImmutableCollection::<init> (5 bytes)
     31   20       3       java.util.ImmutableCollections$AbstractImmutableSet::<init> (5 bytes)
     31   22       3       java.util.Set::of (66 bytes)
     32   23       1       java.lang.module.ModuleDescriptor::name (5 bytes)
     32   24       1       java.lang.module.ModuleReference::descriptor (5 bytes)
     32    1       3       java.lang.StringLatin1::hashCode (42 bytes)   made not entrant
     33   21       4       java.lang.Object::<init> (1 bytes)
     33    2       3       java.lang.Object::<init> (1 bytes)   made not entrant
     36   25       3       java.lang.String::charAt (25 bytes)
     36   26       3       java.lang.StringLatin1::charAt (28 bytes)
     37   27       3       java.util.concurrent.ConcurrentHashMap::tabAt (22 bytes)
     37   28       3       jdk.internal.misc.Unsafe::getObjectAcquire (7 bytes)
     37   30     n 0       jdk.internal.misc.Unsafe::getObjectVolatile (native)
     38   29       3       java.util.ImmutableCollections$SetN$SetNIterator::hasNext (13 bytes)
     38   31       3       java.util.concurrent.ConcurrentHashMap::spread (10 bytes)
     38   33       3       java.util.ImmutableCollections$SetN$SetNIterator::next (47 bytes)
     38   32       3       java.util.ImmutableCollections$SetN$SetNIterator::nextIndex (56 bytes)
     38   34       1       java.util.KeyValueHolder::getKey (5 bytes)
     39   35       1       java.util.KeyValueHolder::getValue (5 bytes)
     39   36       3       java.util.ImmutableCollections$MapN::probe (60 bytes)
     39   38       3       java.util.ImmutableCollections$MapN::get (35 bytes)
     39   39       3       java.util.HashMap::hash (20 bytes)
     39   37       3       java.util.KeyValueHolder::<init> (21 bytes)
     40   41       3       java.util.concurrent.ConcurrentHashMap::addCount (289 bytes)
     40   42     n 0       jdk.internal.misc.Unsafe::compareAndSetLong (native)
     40   45     n 0       jdk.internal.misc.Unsafe::compareAndSetObject (native)
     40   43   !   3       java.util.concurrent.ConcurrentHashMap::putVal (432 bytes)
     42   44       3       java.util.concurrent.ConcurrentHashMap$Node::<init> (20 bytes)
     42   48       3       java.util.concurrent.ConcurrentHashMap::putIfAbsent (8 bytes)
     42   46       3       java.lang.String::length (11 bytes)
     42   50     n 0       java.lang.System::arraycopy (native)   (static)
     42   47       3       java.util.concurrent.ConcurrentHashMap::casTabAt (21 bytes)
     43   40       1       java.lang.module.ResolvedModule::reference (5 bytes)
     43   49       1       java.util.ImmutableCollections$SetN::size (5 bytes)
     43   52       3       java.util.HashMap::getNode (148 bytes)
     44   54       3       java.util.HashMap::putVal (300 bytes)
     44   59     n 0       java.lang.Object::hashCode (native)
     45   53       3       java.util.HashMap::put (13 bytes)
     45   55       3       java.util.HashMap$Node::<init> (26 bytes)
     45   56       3       java.util.HashMap::newNode (13 bytes)
     45   57       3       java.util.HashMap::afterNodeInsertion (1 bytes)
     46   60       1       java.lang.module.ModuleDescriptor$Exports::source (5 bytes)
     46   51       3       java.util.HashMap::get (23 bytes)
     46   61       3       java.util.ImmutableCollections$Set12$1::hasNext (13 bytes)
     46   64       3       java.util.ImmutableCollections$Set12$1::next (92 bytes)
     46   58       1       java.lang.module.ModuleDescriptor::isAutomatic (5 bytes)
     46   62       1       java.lang.module.ResolvedModule::configuration (5 bytes)
     46   63       1       java.lang.module.ModuleDescriptor$Exports::targets (5 bytes)
     47   65       3       java.util.Map::entry (10 bytes)
     47   66       3       java.util.HashSet::add (20 bytes)
     47   67       1       java.lang.module.ModuleDescriptor::isOpen (5 bytes)
     48   68       4       java.lang.String::hashCode (49 bytes)
     48   69       3       java.util.HashMap::resize (356 bytes)
     48   76     n 0       java.lang.Module::addExportsToAllUnnamed0 (native)   (static)
     49   71       3       jdk.internal.module.ModuleBootstrap$2::hasNext (30 bytes)
     49   70       3       java.util.ImmutableCollections$Set12::size (13 bytes)
     49   74       3       jdk.internal.module.ModuleBootstrap$2::next (52 bytes)
     49   75       3       java.util.HashMap::putIfAbsent (13 bytes)
     49   77       1       java.lang.Module::getDescriptor (5 bytes)
     50   78       3       java.lang.CharacterDataLatin1::getProperties (11 bytes)
     51    3       3       java.lang.String::hashCode (49 bytes)   made not entrant
     51   73       4       java.util.ImmutableCollections$SetN$SetNIterator::hasNext (13 bytes)
     51   29       3       java.util.ImmutableCollections$SetN$SetNIterator::hasNext (13 bytes)   made not entrant
     51   72       4       java.util.HashMap::afterNodeInsertion (1 bytes)
     51   57       3       java.util.HashMap::afterNodeInsertion (1 bytes)   made not entrant
     52   79       3       java.lang.StringLatin1::indexOf (61 bytes)
     61   68       4       java.lang.String::hashCode (49 bytes)   made not entrant
     62   80       3       java.lang.AbstractStringBuilder::ensureCapacityInternal (39 bytes)
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
```

Vãi nhái thật :joy:, thế này ai chơi. Hít mấy hơi đọc tiếp xem quá trình **compilation** diễn ra thế nào.

Nhìn sơ qua cách tổ chức thông tin compilation chia làm các column:
> - Với column đầu tiên là các con số tăng dần 27, 28, 29... Nó là **số đo thời gian** biểu diễn dưới đơn vị **miliseconds** kể từ khi JVM bắt đầu chạy, chỉ có tăng chứ không giảm.
> - Column tiếp theo là trình tự compile các method hoặc block of code. Nhưng tại sao chúng không sắp xếp theo thứ tự, đơn giản là do có những đoạn code gọi các method được định nghĩa ở các vị trí khác nhau, file khác nhau. Ngoài ra còn do compilation time. Ta chưa cần quan tâm đến column này lắm.
> - Column tiếp theo đa số là các empty value, tuy nhiên có 2 giá trị ở đây là **%** và **n**: **s** là synchronized, **n** là **native code**, **%** là **On Stack Replacement compilation**. Tất cả có 5 giá trị chứ không chỉ có 2, discuss về nó sau nhé.
> - Tiếp theo là column có đoạn giá trị từ 0 đến 4, nói về loại **compilation**. 0 là không cần compile, các giá trị 1 đến 4 là code compilation level theo chiều sâu. Nhìn lại dòng có cột thứ ba giá trị **n**, vì là **native code** nên không cần compile nữa, do đó nhận giá trị 0. Level càng cao thì quá trình compile càng nhiều bước, time càng lớn.
> - Column tiếp theo là method name.
> - Theo sau là size của đoạn **bytecode** đó.

Bạn có nhận ra điều gì kì lạ không, gợi ý ở column cuối cùng. 

... waiting ...

Đó là.. không thấy code của mình viết ở đâu nhỉ, không có bất kì một dòng nào ngoài System.out.println() cuối cùng :joy:.

Chạy lại với và in ra nhiều số nguyên tố hơn, 5000 cho máu, bỏ luôn System.out.println() cho đỡ vướng mắt.

```shell
     27    1       3       java.lang.StringLatin1::hashCode (42 bytes)
     27    2       3       java.lang.Object::<init> (1 bytes)
     27    3       3       java.lang.String::hashCode (49 bytes)
     28    5       3       java.lang.String::isLatin1 (19 bytes)
     28    4       3       java.lang.String::coder (15 bytes)
     28    6       3       java.util.ImmutableCollections$SetN::probe (56 bytes)
     28    7       3       java.lang.Math::floorMod (10 bytes)
     28    8       3       java.lang.Math::floorDiv (22 bytes)
     29   10       3       java.lang.StringLatin1::equals (36 bytes)
     29   11       3       java.util.ImmutableCollections$SetN::hashCode (46 bytes)
     29    9       3       java.lang.String::equals (65 bytes)
     29   12       3       java.util.ImmutableCollections::emptySet (4 bytes)
     29   15       4       java.lang.StringLatin1::hashCode (42 bytes)
     30   13       3       java.util.Set::of (4 bytes)
     30   14       3       java.util.Objects::requireNonNull (14 bytes)
     30   16       3       java.lang.module.ModuleDescriptor$Exports::hashCode (38 bytes)
     30   17       3       java.util.AbstractCollection::<init> (5 bytes)
     30   18       3       java.util.ImmutableCollections$AbstractImmutableSet::<init> (5 bytes)
     30   20       3       java.util.Set::of (66 bytes)
     31   21       1       java.lang.module.ModuleDescriptor::name (5 bytes)
     31   22       1       java.lang.module.ModuleReference::descriptor (5 bytes)
     32    1       3       java.lang.StringLatin1::hashCode (42 bytes)   made not entrant
     32   19       4       java.lang.Object::<init> (1 bytes)
     33    2       3       java.lang.Object::<init> (1 bytes)   made not entrant
     34   23       3       java.lang.String::charAt (25 bytes)
     35   24       3       java.lang.StringLatin1::charAt (28 bytes)
     36   25       3       java.util.concurrent.ConcurrentHashMap::tabAt (22 bytes)
     36   28     n 0       jdk.internal.misc.Unsafe::getObjectVolatile (native)
     36   26       3       jdk.internal.misc.Unsafe::getObjectAcquire (7 bytes)
     36   29       3       java.util.ImmutableCollections$SetN$SetNIterator::nextIndex (56 bytes)
     37   27       3       java.util.ImmutableCollections$SetN$SetNIterator::hasNext (13 bytes)
     37   30       1       java.util.KeyValueHolder::getKey (5 bytes)
     38   32       3       java.util.ImmutableCollections$MapN::probe (60 bytes)
     38   35       3       java.util.ImmutableCollections$SetN$SetNIterator::next (47 bytes)
     38   31       1       java.util.KeyValueHolder::getValue (5 bytes)
     38   34       3       java.util.Objects::equals (23 bytes)
     38   33       3       java.util.KeyValueHolder::<init> (21 bytes)
     39   36       3       java.util.concurrent.ConcurrentHashMap::addCount (289 bytes)
     39   39     n 0       jdk.internal.misc.Unsafe::compareAndSetLong (native)
     39   42     n 0       jdk.internal.misc.Unsafe::compareAndSetObject (native)
     39   40   !   3       java.util.concurrent.ConcurrentHashMap::putVal (432 bytes)
     41   45       3       java.util.concurrent.ConcurrentHashMap::putIfAbsent (8 bytes)
     41   38       3       java.util.concurrent.ConcurrentHashMap::spread (10 bytes)
     41   41       3       java.util.concurrent.ConcurrentHashMap$Node::<init> (20 bytes)
     41   44       3       java.lang.String::length (11 bytes)
     41   43       3       java.util.concurrent.ConcurrentHashMap::casTabAt (21 bytes)
     42   46       3       java.util.HashMap::hash (20 bytes)
     42   37       1       java.lang.module.ResolvedModule::reference (5 bytes)
     42   48     n 0       java.lang.System::arraycopy (native)   (static)
     42   47       1       java.util.ImmutableCollections$SetN::size (5 bytes)
     42   49       3       java.util.HashMap::get (23 bytes)
     43   51       3       java.util.HashMap::getNode (148 bytes)
     43   53       3       java.util.HashMap::putVal (300 bytes)
     43   59     n 0       java.lang.Object::hashCode (native)
     44   52       3       java.util.HashMap::put (13 bytes)
     44   54       3       java.util.HashMap$Node::<init> (26 bytes)
     44   55       3       java.util.HashMap::newNode (13 bytes)
     44   57       3       java.util.HashMap::afterNodeInsertion (1 bytes)
     45   56       3       java.util.ImmutableCollections$Set12$1::hasNext (13 bytes)
     45   60       1       java.lang.module.ModuleDescriptor$Exports::source (5 bytes)
     45   50       3       java.lang.module.ResolvedModule::name (11 bytes)
     45   58       1       java.lang.module.ModuleDescriptor::isAutomatic (5 bytes)
     45   61       1       java.lang.module.ResolvedModule::configuration (5 bytes)
     45   62       1       java.lang.module.ModuleDescriptor$Exports::targets (5 bytes)
     46   63       3       java.util.Map::entry (10 bytes)
     46   64       3       java.util.HashSet::add (20 bytes)
     46   65       1       java.lang.module.ModuleDescriptor::isOpen (5 bytes)
     46   66       4       java.lang.String::hashCode (49 bytes)
     47   67       3       java.util.ImmutableCollections$Set12::size (13 bytes)
     47   69       3       jdk.internal.module.ModuleBootstrap$2::hasNext (30 bytes)
     47   70       3       java.util.HashMap::resize (356 bytes)
     47   75     n 0       java.lang.Module::addExportsToAllUnnamed0 (native)   (static)
     48   71       3       jdk.internal.module.ModuleBootstrap$2::next (52 bytes)
     48   74       3       java.util.HashMap::putIfAbsent (13 bytes)
     49   76       3       java.util.ImmutableCollections$MapN::get (35 bytes)
     49   73       1       java.lang.Module::getDescriptor (5 bytes)
     49    3       3       java.lang.String::hashCode (49 bytes)   made not entrant
     49   68       4       java.util.ImmutableCollections$SetN$SetNIterator::hasNext (13 bytes)
     50   77       3       java.lang.CharacterDataLatin1::getProperties (11 bytes)
     50   27       3       java.util.ImmutableCollections$SetN$SetNIterator::hasNext (13 bytes)   made not entrant
     50   72       4       java.util.HashMap::afterNodeInsertion (1 bytes)
     50   57       3       java.util.HashMap::afterNodeInsertion (1 bytes)   made not entrant
     51   78       3       java.lang.StringLatin1::indexOf (61 bytes)
     56   66       4       java.lang.String::hashCode (49 bytes)   made not entrant
     57   79       3       java.lang.AbstractStringBuilder::ensureCapacityInternal (39 bytes)
     59   80       3       PrimeNumberGenerator::isPrime (34 bytes)
     59   82       3       java.lang.Number::<init> (5 bytes)
     59   83       3       java.lang.Integer::<init> (10 bytes)
     59   87       4       PrimeNumberGenerator::isPrime (34 bytes)
     59   86       3       PrimeNumberGenerator::getNextPrimeAbove (20 bytes)
     59   84       3       java.util.ArrayList::add (25 bytes)
     60   81       1       java.util.ArrayList::size (5 bytes)
     60   85       3       java.util.ArrayList::add (23 bytes)
     60   80       3       PrimeNumberGenerator::isPrime (34 bytes)   made not entrant
     60   88       3       java.lang.Integer::valueOf (32 bytes)
     60   89 %     4       PrimeNumberGenerator::isPrime @ 9 (34 bytes)
     61   86       3       PrimeNumberGenerator::getNextPrimeAbove (20 bytes)   made not entrant
     61   90       3       PrimeNumberGenerator::getNextPrimeAbove (20 bytes)
     62   91       4       PrimeNumberGenerator::getNextPrimeAbove (20 bytes)
     63   90       3       PrimeNumberGenerator::getNextPrimeAbove (20 bytes)   made not entrant
```

Đã thấy có chút khác biệt, colum thứ ba có thêm giá trị **!** và column cuối đã xuất hiện những dòng code chúng ta viết.

Chú ý vào dòng có giá trị **%**, method isPrime() được gọi rất nhiều lần và được đặt vào **code cache**, chính là nơi lưu trữ **native code** từ quá trình **JIT Compiler**. Mình sẽ nói cụ thể hơn về nó ở phần sau.

Nếu đọc đến đây thì xin chúc mừng, bạn khá kiên nhẫn đấy :joy:. Đón chờ bài tiếp theo về **Code cache** và **Compiler** nhé.

### Reference
Reference in series https://viblo.asia/s/java-memory-management-performance-vElaB80m5kw

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)