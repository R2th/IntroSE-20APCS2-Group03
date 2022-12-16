© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Java memory management & performance](https://viblo.asia/s/java-memory-management-performance-vElaB80m5kw).

**Thông dịch (interpret)** và **biên dịch (compile)**, hai khái niệm này cần phân biệt rõ. Với bài trước ta biết **Java** là **interpreter language**, ngôn ngữ thông dịch. Tuy nhiên với **JVM** và cụ thể là **JIT Compiler**, sẽ có một phần của chương trình trở thành **compiled language**, khiến cho tốc độ của Java application phần nào được cải thiện.

Một ví dụ dễ hiểu như sau, ta có một văn bản bằng tiếng Anh, và muốn nó được dịch sang ngôn ngữ tiếng Nhật để được thực thi. Có 2 cách:
> - **Compile**: dịch sẵn thành tiếng Nhật ra một văn bản khác, sau đó đưa văn bản đã dịch cho ông người Nhật thực thi.
> - **Interpret**: thuê phiên dịch viên, đọc từng dòng tiếng Anh và dịch sang tiếng Nhật cho ông người Nhật thực thi.

Cùng tìm hiểu về **JVM Compiler** với **C1 compiler và C2 compiler** trong bài viết này nhé. Let's begin.

## 1) JVM Compiler

**Native code** sau khi được [**JIT Compiler**](https://viblo.asia/p/001-wora-jit-compiler-va-xxprintcompilation-gDVK2O3nZLj#_2-jit-compiler-1) **compile** từ **bytecode** sẽ được lưu trữ ở **JVM Code cache** để phục vụ cho việc tối ưu performance khi code được gọi nhiều lần.

Ngoài ra, **JIT Compiler** không đơn thuần chuyển từ **bytecode** sang **native code** mà nó còn giúp tối ưu luôn đoạn **smell code** của chúng ta :joy: (đùa chứ không smell lắm, chỉ là optimize hộ thôi).

> **JVM** thực thi đoạn code càng nhiều lần thì càng có thêm **kinh nghiệm** với đoạn code đó. Các kinh nghiệm này được tích lũy lại và **JVM** tận dụng chúng để optimize trong quá trình **compile** sang **native code**.
> 
> Ví dụ, ta có method **equals()**, thường xuyên được override bởi các **sub-class**. Khi trình thông dịch (interpreter) xử lý đoạn code **boolean isEqual = objA.equals(objB)**, nó cần tìm chính xác class của **objA** để thực thi method **equals()**. Quá trình này là **dynamic lookup** và cũng.. tốn thời gian.
>
> Giả sử **objA** là java.lang.String và đoạn code được thực thi rất nhiều lần. Nhận thấy điều đó **JVM** sẽ thực thi **String.equals()** luôn cho nhanh. Như vậy, ngoài việc **compile** sang **native code**, performance còn được tăng lên nhờ quá trình **optimization**, cụ thể là bỏ qua quá trình **dynamic lookup** khi thực thi.
>
> Tất nhiên nó chỉ là ví dụ và không đơn giản như vậy. Vấn đề sẽ xảy ra trong trường hợp **objA** không phải là java.lang.String nữa. Do đó JVM không chỉ optimize mà còn.. de-optimize, re-optimize.

Việc **compile** từ **bytecode** sang **native code** được đảm nhận bởi 2 compiler là **C1 compiler** và **C2 compiler**.

Tại sao là hai compiler mà không phải một?
> Từ thuở xa xưa khi James Gosling tạo ra Java, **JIT Compiler** có 2 phiên bản. Nếu muốn sử dụng phiên bản nào chúng ta phải cài đặt JDK có phiên bản đó. Hai phiên bản đó là **Client compiler** và **Server compiler**, tuy nhiên ngày nay hầu như chẳng mấy ai quan tâm nữa vì **JVM** đã bao gồm cả 2 loại compiler này.

Nếu muốn trở thành **Optimization engineer**, hoặc ít nhất là có kiến thức về **JVM optimization**, ta cần hiểu về cơ chế hoạt động của 2 loại compiler này.

## 2) C1 compiler và C2 compiler

Ngày nay, **client compiler** và **server compiler** không còn mang đúng ý nghĩa như ban đầu, chúng được gọi với cái tên khác là **C1 compiler** và **C2 compiler**.


Với bài trước khi [print compilation](https://viblo.asia/p/001-wora-jit-compiler-va-xxprintcompilation-gDVK2O3nZLj#_3-practice-2), cột thứ tư có giá trị từ 0 đến 4, với 0 là không cần compile, các giá trị 1 đến 4 là code compilation level theo chiều sâu, càng sâu càng tốn nhiều cost và time.

Với **C1 compiler**, nó có khả năng compile 3 level đầu tiên và **C2 compiler** thực hiện compile level cuối cùng.

![](https://i.imgur.com/t2On9l2.png)

**JVM** sẽ quyết định level compile nào được áp dụng cho **block of code** nào dựa trên 2 yếu tố:
> - Mức độ thường xuyên được thực thi.
> - Độ phức tạp hoặc thời gian thực thi.

Quá trình này được gọi là **profiling the code**. Sự khác biệt giữa 2 loại compiler này là gì?

> Sự khác biệt nằm ở tính.. chủ động, tích cực (aggressiveness) trong quá trình compile code, **C1 compiler** tích cực hơn **C2 compiler**.

**C1** bắt đầu biên dịch code sớm hơn so với **C2**, do vậy **C1** thường biên dịch được nhiều code hơn. Nhìn vào **code compilation**, ta thấy đa số đều là level 1 đến 3, rất ít level 4.

Nhìn thì tưởng **C2** lười biếng mà hóa ra không phải vậy. Cái gì cũng có giá của nó.

> Muốn nhanh cứ phải từ từ. Muốn đi nhanh thì chạy, muốn đi xa thì.. đi bộ :joy:.

**C2** khởi động chậm hơn nhằm mục đích tích lũy **kiến thức** và **kinh nghiệm** để tối ưu hóa quá trình biên dịch. Do đó, code của **C2** tạo ra có thời gian thực thi nhanh hơn code của **C1**. Tuy nhiên, nếu kiến thức và kinh nghiệm chưa đủ, thì tốt nhất không nên làm gì cả, để một mình **C1** chạy là ok rồi. Vậy nên việc **performance** của code tốt đến đâu cũng tỉ lệ thuận với tần suất và thời gian thực thi của đoạn code đó. Hay nhỉ :100:.

> Gần như tất cả các JVM hiện đại ngày nay sử dụng kĩ thuật được gọi là **tiered compilation** để tiến hành **compile code**, diễn ra như sau:
> - C1 compiler thực hiện biên dịch trước.
> - Sau đó, C2 compiler sẽ bắt đầu khi có tìm được đoạn **hot code**. 
>
> Nếu chúng ta không muốn quá trình biên dịch xảy ra theo cách này, thêm JVM options **-XX:-TieredCompilation** khi khởi chạy ứng dụng, sẽ thấy ngay sự khác biệt. Mặc định **TieredCompilation** là on (+).

Đón chờ phần tiếp theo tìm hiểu về **Code cache, tuning code cache và JIT Compiler với các JVM options** nhé.

### Reference
Reference in series https://viblo.asia/s/java-memory-management-performance-vElaB80m5kw

### After credit

Series trước về [**multi-threading**](https://viblo.asia/s/QqKLvp2rl7z), ta đã biết sơ qua về cách hoạt động của Java memory với **RAM** và **registers**. Và một trong những **optimize quan trọng** mà JIT Compiler đã làm đó là thời điểm sử dụng giá trị của biến tại **RAM** và **registers**.

```java
public class Register {

    private int sum;

    public void calculateSum(int n) {
        for (int i = 0; i < n; i++) {
            sum += i;
        }
    }
    
}
```

Trên lý thuyết, biến **sum** được lưu ở **RAM**. Với mỗi lần sử dụng hoặc chuẩn bị sử dụng, **sum** được copy lên các cache level L3, L2, L1 và registers để CPU xử lý. Sau khi xử lý xong được copy ngược trở về RAM. Như vậy với vòng loop trên, mỗi lần xử lý giống như một cuộc đi phượt của **sum**, tốn rất nhiều thời gian tiền bạc.

Một vài lần thì không có chuyện gì, nhưng vấn đề sẽ xảy ra khi số lượng vòng lặp tăng cao. Bây giờ chính là lúc **JIT Compiler** tận dụng sức mạnh của mình, nó đăng kí luôn một biến **sum** trên registers, thực hiện lặp với giá trị đó của registers. Sau một khoảng thời gian (khó xác định :joy:), nó lưu lại kết quả xuống RAM.

Cái gì cũng có hai mặt, mặc dù **JIT Compiler** giúp tăng performance trong trường hợp này nhưng nếu lập trình multi-thread thì sẽ có vấn đề xảy ra ngay: [**data-race**](https://viblo.asia/p/010-nham-tuong-ve-data-race-va-race-condition-bWrZnVG9Zxw).

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)