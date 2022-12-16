Nếu bạn đã quen thuộc với việc cấp phát bộ nhớ trong các ngôn ngữ lập trình, bạn sẽ biết rằng có hai phần trong bộ nhớ được định nghĩa là Heap và Stack.

Bộ nhớ Stack được sử dụng để thực thi trong một luồng. Khi mỗi một function được gọi, một khối bộ nhớ được cấp phát trong stack để lưu trữ các biến cục bộ function đó. Bộ nhớ được phân bổ sẽ đượcgiảti phóng khi kết thúc hàm.
Trái ngược với Stack, bộ nhớ Heap được sử dụng để cấp phát động  (thường là khi tạo ra các đối tượng mới với từ khóa là ```new``` hoặc ```malloc``` ) và việc xử lý các bộ nhớ được cấp phát được xử lý riêng.

![](https://i.stack.imgur.com/NS0k7.jpg)



```
public void main() {
    // 1 Create reference
    Object myObject = new Object();
        ......
    // 2. Remove reference
    myObject = null
}
```


Nếu tại một thời điểm vào đó của chương trình, có một tham chiếu khác tới object (hay nói cách khác t gán giá trị của ```myObject``` tới một giá trị khác)  hoặc một giá trị ```null``` đựoc gán cho object đó (như trên) thì tham chiếu tồn tới với đối tượng vừa tạo ra sẽ được xóa (step 2 hình bên dưới)

![](https://images.viblo.asia/8be965b6-a2d0-46e0-b239-56c3bd02c7c8.PNG)

Tuy nhiên bộ nhớ đựoc phân bổ cho đối tượng này có thể không đựoc giải phóng mặc dù đối tuợng này có thể không được sử dụng. Trong các ngôn ngữ lập trình cũ hơn như C hoặc là C++, lập trìnhh viên cần quan tâm đến các loại đối tượng được phân bổ trong HEAP và xóa chúng khi không còn được sử dụng để giải phóng bộ nhớ. Không làm điều này có thể gây ra rò rỉ bộ nhớ (memoryleak nhiều bạn nhầm điều này với out of memory lắm 🤣🤣🤣🤣🤣🤣)

Mặc khác nếu chúng ta xóa nhầm có thể dẫn đến lỗi NullPointerExeption

Tuy nhiên, trong các ngôn ngữ lập trình như Java hay C# việc quản lý bộ nhớ này được thực hiện một cách tự động và riêng biệt thông qua **Garbage Collector**

Khi có **Garbage Collector**, chúng ta có thể cấp phát bộ nhớ cho một đối tượng sau đó sử dụng nó và khi không còn bất kì một tham chiếu nào tới đối tượng đó, đối tượng sẽ được đánh dấu để **Garbage Collector** giải phóng các bộ nhớ đã được phân bổ.
Và **Garbage collector** cũng đảm bảo rằng mọi đối tượng có tham chiếu trực tiếp sẽ không bị xóa khỏi bộ nhớ.
![](https://cdn-images-1.medium.com/max/600/0*f3waGGq2zA9yTGBn.png)

# Reference Counted trong Garbage Collection
Gargabe Collection sẽ theo dõi số lượng th am chiếu cho một đối tượng cụ thể trong bộ nhớ.  Cùng tham khảo đoạn code sau 
```
Object a = new Object(); // Reference Count(OB1) starts at 1
Object b = a;         // Reference Count (OB1) incremented to 2 as a new reference is added
Object c = new Object();

b.someMethod();
b = null;        // Reference Count(OB1) decremented to 1 as reference goes away
a = c;           // Reference Count(OB1) decremented to 0
```

1. Khi thực hiện dòng lệnh đầu tiên ```Object a = new Object ();```, một đối tượng mới (tạm gọi là OB1) đã được khởi tạo trong bộ nhớ và số lượng reference tới đối tượng này được tính bằng 1.
2. Đi tới dòng lệnh số 2 ```Object b = a;``` lúc này  reference của đối tượng a được copy sang đối tượng b, lúc này cả ```a``` và ```b``` cùng reference tới OB1. Lúc này reference count của OB1 tăng lên thành 2.
3. Khi ```b``` đựoc gán bằng ```null```, lúc này số luợng reference count giảm đi 1, lúc này chỉ còn duy nhất biến ```a``` đang  reference tới OB1.
4. Khi biến ```a``` được reference tới một địa chỉ ô nhớ khác ```a = c;``` lúc này reference count của OB1 = 0, lúc này OB1 đã sẵn sàn được thu dọn bởi **Garbage Collection**


# Những hạn chế của Reference Counted trong Garbage Collection
Nhược điểm chính của Reference Counted trong **Garbage Collection** là không có khả năng xác định các tham chiếu vòng. 
Để hiểu thế nào là tham chiếu vòng chúng t a cùng xem đoạn code dưới đây

Xét 2 lớp A và B có reference tới lớp còn lại

```
class A {
    private B b;

    public void setB(B b) {
        this.b = b;
    }
}

class B {
    private A a;

    public void setA(A a) {
        this.a = a;
    }
}
```

Bây giờ trong phương thức main chúng ta có thể tạo các đối tượng mới cho 2 class này và gán các tham chiếu cho chúng
```
public class Main {
    public static void main(String[] args) {
        A one = new A();
        B two = new B();

        // Make the objects refer to each other (creates a circular reference)
        one.setB(two);
        two.setA(one);

        // Throw away the references from the main method; the two objects are
        // still referring to each other
        one = null;
        two = null;
    }
}
```

Khi chúng ta gán giá trị ```null``` cho 2 biến ```one``` và ```two```, các tham chiếu bên ngoài  tồn tại đối với đối tượng class (A và B) đựoc tạo ban đầu sẽ bị xóa. Tuy nhiên chúng vẫn chưa đủ điều kiện để **Garbage Collector** thu dọn rác vì đối tượng ```one``` vẫn còn reference tới đối tượng ```two``` thông qua method ```setB(two);```   và ngược lại cho biến ```two``` . Điều này dẫn đến biến ```one``` và ```two``` sẽ không bao giờ bị giải phóng.

# Các cách hoạt động của GC
## 1. Mark and Sweep GC
**Garbage Collection** hoạt động dựa trên 2 giai đoạn chính. Mark and Sweep.
1. Mark Phase (Giai đoạn đánh dấu)
2. Sweep Phase (Giai đoạn quét)

### Mark Phase
Trong giai đoạn này, **Garbage Collector** xác định các đối tượng vẫn đang sử dụng và đánh dấu "mark bit" của chúng thành true. Việc tìm kiếm bắt đầu với một tập hợp gốc các tham chiếu được giữ trong các biến cục bộ trong Stack, hoặc biến toàn cục. Bắt đầu từ các tham chiếu gốc, **Garbage Collector** sẽ tiến hành tìm kiếm sâu cho các đối tượng có reference tới các gốc này, bất kì đối tượng nào giữ reference tới đối tượng khác, GC giữ cho đối tượng đó tồn tại. 

Điều quan trọng cần lưu ý là trong giai đoạn Mark Phase, các luồng ứng dụng cần được dừng lại để tránh những thay đổi có thể xảy ra với trạng thái của đối tượng trong giai đoạn đánh giấu này

![](https://cdn-images-1.medium.com/max/800/1*_xkq7jGtAKf7SP1R1a8vcA.png)

Các tham chiếu vòng không phải là vấn đề đối với Mark and Sweep, nếu bạn theo dõi diagram trên, có một tham chiếu vòng được biểu thị bằng hình vuông nhưng nó không thể truy cập trực tiếp được từ root, do đó nhưng loại references đó sẽ không đựoc đánh dấu là đang tồn tại và cho phép GC thu thập như 1 tài nguyên rác

### Sweep Phase
Giai đoạn quyét, tất cả các đối tượng không được đánh dấu từ giai đoạn Mark sẽ bị xóa khỏi bộ nhớ, giải phóng không gian của HEAP.

![](https://cdn-images-1.medium.com/max/800/1*eZTk9FfqQVMpNWmmdgS8VA.png)

Như các bạn có thể theo dõi trên diagram, có thjeer có nhiều vùng tự do sau giai đoạn quét (đựoc vẽ bằng màu trắng). Nhưng do sự phân mảnh này, việc cấp phát bộ nhớ tiếp theo có thể thất bại nếu nó cần nhiều bộ nhớ hơn vùng tự do còn lại.
Để giải quyết vấn đề này, GC đã add thêm 1 phase mới, **Compact Phase**

## 2. Mark-Sweep-Compact GC
Sau giai đoạn quét, tất cả các vị trí bộ nhớ đựoc xắp xếp lại để cung cấp phân bổ bộ nhớ nhỏ gọn hơn. Nhược điểm của phuơng pháp này là thời gian tạm dừng GC tăng lên vì nó cần sao chếp tất cả các đối tượng sang một địa điểm mới và cập nhật tất cả các tham chiếu tới các đối tượng đó
![](https://cdn-images-1.medium.com/max/800/1*8b-ANSuneRBXkO1JNtH6LQ.png)

## 3. Mark and Copy GC
Điều này tuơng tự như cách Mark and Sweep, nhưng không gian bộ nhớ được chia thành hai phần, ban đầu các đối tượng đựoc phân bổ cho một vùng không gian (như trên hình là fromspace) và các đối tuợng tồn tại được đánh dấu (màu xanh 1 2 3 4)
![](https://cdn-images-1.medium.com/max/800/1*NBJP3fl_PyBIRTekkaQWXg.png)

Không giống như giai đoạn Sweep giai đoạn thứ hai là Copy, các đối tượng đựoc đánh dấu sẽ được sao chép vào vùng không gian khác (như trên hình là tospace) và đồng thời được nén lại. Sau đó vùng (fromspace) sẽ bị xóa đi.
![](https://cdn-images-1.medium.com/max/800/1*KQD7WcGBjFCaPIocvPlDSA.png)

Sau quá trình này, cả hai không gian được hoán đổi cho nhau.
## 4. Generational Garbage Collector.
Trong Generational Garbage Collector không gian bộ nhớ chia thành các thế hệ khác nhau (ví dụ Young and Old Generation). Ban đầu tất cả các đối tượng sẽ được cấp phát trên Young Generation, tuy nhiên khi một chu kỳ thu dọn rác xảy ra, các đối tượng sống sót sẽ được chuyển lên Old  Generation. 
![](https://cdn-images-1.medium.com/max/800/1*lxyn657K6Wm8-uSRsjSj-w.png)
![](https://cdn-images-1.medium.com/max/800/1*YyFP0Jp9W2W3NhWigeQ0Ig.png)

Bây giờ các đối tượng còn lại trong Yound Generation có thể bị xóa bì tất cả các đối tượng sống sót đã được chuyển qua Old Genreration. 

Chu kỳ thu dọn rác ở Old Generation xảy ra ít thường xuyên hơn so với thế hệ Young Generation, Ý tuơng đằng sau phuơng pháp này là các đối tuợng sống sót trong lần thu thập rác đầu tiên có xu hướng sống lâu hơn. Do đó tần suất thu gom rác có thể giảm cho các đối tượng Old Generation. Số luơng Generation khác nhau đối với từng ngôn ngữ lập trình. 

# Garbage Collector trong Android
Trong android sử dụng cách dọn rác thứ 4 Generational Garbage Collector. Các đối tượng được phân bổ mới sẽ thuộc về Young Generation. Khi một đối tượng hoạt động đủ lâu, nó có thể được thăng cấp lên older generation và cuối cùng là Permanent Generation.

Mỗi thế hệ heap có giới hạn trên dành riêng cho số lượng bộ nhớ mà các đối tượng ở đó có thể chiếm. Bất cứ khi nào một thế hệ bắt đầu lấp đầy, hệ thống sẽ thực hiện một sự kiện thu gom rác nhằm giải phóng bộ nhớ. Thời lượng của bộ sưu tập rác phụ thuộc vào thế hệ của các đối tượng mà nó thu thập và số lượng đối tượng hoạt động trong mỗi thế hệ.


Trên đây là những thông tin về Garbage Collector và Garbage Collector trong Android. Rất cảm ơn các bạn đã đón đọc
# References
[1] https://medium.com/@kasunpdh/garbage-collection-how-its-done-d48135c7fe77

[2] https://app.pluralsight.com/library/courses/understanding-java-vm-memory-management/table-of-contents

[3] https://www.geeksforgeeks.org/mark-and-sweep-garbage-collection-algorithm/

[4] https://blogs.msdn.microsoft.com/abhinaba/2009/01/30/back-to-basics-mark-and-sweep-garbage-collection/

[5] https://plumbr.io/handbook/garbage-collection-algorithms

[5] https://developer.android.com/topic/performance/memory-overview#gc