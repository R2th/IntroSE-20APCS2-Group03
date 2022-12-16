![](https://i.imgur.com/auAtAd7.jpg)

- Hiện nay để tạo ứng dụng Android hay bất kỳ một ứng dụng nào khác đã trở nên dễ dàng hơn trước. Nhưng để làm ứng dụng chất lượng, tốn ít bộ nhớ RAM, chiếm ít CPU,... thì lại là một điều hoàn toàn khác. 
Một phần do sự tăng tốc về nâng cấp phần cứng (RAM, CPU) quá nhanh làm cho các developer trở nên lười suy nghĩ hơn về việc tối ưu; hoặc những người mới bước vào lập trình hầu như chỉ quan tâm vào xây dựng chức năng ứng dụng cho máy đời cao mà lại quên mất phải tối ưu cả cho những máy đời thấp. 
Ngoài ra có thể đồng nghiệp của bạn cũng hay nói câu: "Tối ưu ứng dụng cho mấy máy đời cũ làm gì nữa ?" hay câu "Tối ưu mệt lắm! Không làm đâu :)"

- Mỗi lần bạn nghe thấy ai nói như thế thì hãy hỏi lại câu: "Thế tại sao apple phải tung ra bản iOS 12 để hỗ trợ cho những máy đời cũ từ iphone 5s trở lên và khi đã lên iOS 12 chạy còn mượn mà hơn ?". Tôi sẽ không bàn về vấn đề kinh doàn hay chiến lược xa vời gì ở đây; vì suy cho cùng nhà sản xuất cũng chỉ muốn tăng sự trải nghiệm tốt nhất trên sản phẩm của họ.
Tóm lại 1 câu ngắn gọn như sau: "Không có tư tưởng tối ưu thì bạn sẽ mãi chỉ là thằng developer cùi mà thôi"

Vậy nên ở bài viết này, chúng ta hãy cùng tìm hiểu Garbage Collector và 4 loại tham chiếu Strong Reference, Weak Reference, Soft Reference, Phantom Reference. Và tại sao nó lại ảnh hưởng đến chất lượng của ứng dụng ?

# I. Memory Leak ?
*   Khái niệm

Chắc hẳn bạn cũng đã nghe tới từ Memory Leak.
Memory leak xảy ra khi bạn giữ 1 tham chiếu đến đối tượng A sau khi đối tượng A đó đã hoàn thành xong nhiệm vụ và cần phải giải phóng nó khỏi bộ nhớ.

Bằng cách này hay cách khác nếu có 1 đối tượng B khác cũng đang tham chiếu đến đối tượng A. Thì sẽ làm cho Garbage Collector (GC) không thể xóa đối tượng A đi được vì bản thân Garbage Collector cũng đang hiểu là đối tượng A đang được sử dụng nên không thế xóa đối tượng A đi được

*  Tác hại

Chắc tác hại ai cũng sẽ hiểu được rẳng nếu không được giải phóng bộ nhớ thì đến 1 thời điểm ứng dụng của bạn sẽ bị đầy bộ nhớ, giật lag và cuối cùng sẽ bị crash ứng dụng.

# II. Hoạt động của Garbage Collector
Sau đây tôi sẽ trình bày sơ qua về cách hoạt động của Garbage Collector rằng tại sao lại có thể dẫn đến memory leak. 

Mỗi một ứng dụng JAVA đều có ít nhât 1 cây lưu giữ các đối tượng (Object Trees). Chừng nào ứng dụng còn sống thì các Object Trees này cũng tồn tại theo.

Dưới đây là hình ảnh mô tả 1 Garbage Collector (GC) root sẽ quản lý tất cả các đối tượng (objects) mà bạn khai báo trong ứng dụng.
![](https://i.imgur.com/ciR7pzT.png)

Hoạt động như sau:

Khi mỗi lần Garbage Collector được hoạt động thì JVM sẽ đi từ GC root để duyệt cây và đánh đấu những đối tượng đang được sử dụng, đối tượng nào không còn được sử dụng nữa(không còn liên kết đến GC root).
Từ đây JVM sẽ biết được những đối tượng nào không còn được liên kết đến GC root thì sẽ được giải phóng để có thêm bộ nhớ cho các nhiệm vụ mới.

Về phần này bạn nào đã học về cây tìm kiếm sẽ hiểu hay JVM duyệt cây GC root như thế nào.

Còn hình ảnh dưới đây là mô tả cho trường hợp memory leak khi mà đối tượng đã hoàn thành xong nhiệm vụ mà quên không xóa đi.

![](https://i.imgur.com/wfepeLx.png)

Hình ảnh trên đông nghĩa với việc bộ nhớ heap của bạn sẽ càng ngày tăng lên nếu như càng có nhiều đối tượng quên không được xóa.

Nếu như nhánh của Forgotten Reference càng nhiều, mỗi đối tượng chiếm bộ nhớ càng lớn thì buộc JVM phải tạm dừng toàn bộ main thread của ứng dụng để tìm các cây GC root khác còn đối tượng nào chưa được giải phóng không để cấp bộ nhớ cho ứng dụng. Nhưng nếu các cây GC root cũng gặp trường hợp tương tự thì bộ nhớ heap không còn đủ bộ nhớ cho ứng dụng và trường hợp OutOfMemoryError sẽ là điều tất yếu xảy ra.

Để xem cụ thể hơn bạn có thể vào xem trong link sau: 

https://www.dynatrace.com/resources/ebooks/javabook/how-garbage-collection-works/
# III. Reference ?
Vậy thì đến đây sẽ có bạn thắc mắc là: "Sẽ có những loại tham chiếu nào giúp cho GC tiến hành thu hồi bộ nhớ dễ dàng hơn không ?". Tôi xin trả lời là có. Và bạn hãy tiếp tục xem 4 loại dưới đây.
## 1) Strong Reference (tham chiếu mạnh)

Là kiểu mặc định trong khai báo JAVA. Bất kỳ đối tượng nào đang được giữ Strong Reference thì GC sẽ không thể giải phóng được đối tượng đó. Đối tượng chỉ có thể được giải phóng khi được gán giá trị `null`.

``` java
MyClass obj = new MyClass ();
```

Đối tượng `obj` là tham chiếu mạnh được tạo từ MyClass. Hiện tại đối tượng obj chưa được GC giải phóng.

```java
obj = null;
//'obj' object is no longer referencing to the instance. 
So the 'MyClass type object is now available for garbage collection.
```	 

![](https://i.imgur.com/xsR6K9I.png)

```java
// Java program to illustrate Strong reference 
class Gfg 
{ 
    //Code.. 
} 
public class Example 
{ 
    public static void main(String[] args) 
    { 
         //Strong Reference - by default 
        Gfg g = new Gfg();   
          
        //Now, object to which 'g' was pointing earlier is  
        //eligible for garbage collection. 
        g = null;  
    } 
}  
```

## 2) Weak Reference (tham chiếu yếu)

là tham chiếu không phải măc định, muốn khai báo Weak Reference thì phải chỉ định rõ ràng.

* Kiểu tham chiếu yếu được sử dụng trong WeakHashMap
* Nếu JVM phát hiện đối tượng là 1 tham chiếu yếu thì sẽ được đánh dấu để cho GC giải phóng
* Nếu tham chiếu yếu đã được gán giá trị `null` thì vẫn có thế lấy lại được bằng method `get()` nếu đối tượng đó chưa bị GC giải phóng

![](https://i.imgur.com/yRS8YTq.png)

```java
/Java Code to illustrate Weak reference 
import java.lang.ref.WeakReference; 
class Gfg 
{ 
    //code 
    public void x() 
    { 
        System.out.println("GeeksforGeeks"); 
    } 
} 
  
public class Example 
{ 
    public static void main(String[] args) 
    { 
        // Strong Reference 
        Gfg g = new Gfg();    
        g.x(); 
          
        // Creating Weak Reference to Gfg-type object to which 'g'  
        // is also pointing. 
        WeakReference<Gfg> weakref = new WeakReference<Gfg>(g); 
          
        //Now, Gfg-type object to which 'g' was pointing earlier 
        //is available for garbage collection. 
        //But, it will be garbage collected only when JVM needs memory. 
        g = null;  
          
        // You can retrieve back the object which 
        // has been weakly referenced. 
        // It succesfully calls the method. 
        g = weakref.get();  
          
        g.x(); 
    } 
} 
```

Kết quả:
> GeeksforGeeks
> 
> GeeksforGeeks

## 3) Soft Reference (tham chiếu mềm)
Soft Reference (tham chiếu mềm) gần giống với Weak Reference nhưng điểm khác ở chỗ nếu weak reference sẽ được giải phóng bộ nhớ ngay nhưng đối với Soft Reference thì phải đến khi bộ nhớ thấp. Khi JVM văng ra `out of memory` thì tham chiếu mềm đó mới được giải phóng.

![](https://i.imgur.com/EVW1gRe.png)

```java
//Code to illustrate Soft reference 
import java.lang.ref.SoftReference; 
class Gfg 
{ 
    //code.. 
    public void x() 
    { 
        System.out.println("GeeksforGeeks"); 
    } 
} 
  
public class Example 
{ 
    public static void main(String[] args) 
    { 
        // Strong Reference 
        Gfg g = new Gfg();    
        g.x(); 
          
        // Creating Soft Reference to Gfg-type object to which 'g'  
        // is also pointing. 
        SoftReference<Gfg> softref = new SoftReference<Gfg>(g); 
          
        // Now, Gfg-type object to which 'g' was pointing 
        // earlier is available for garbage collection. 
        g = null;  
          
        // You can retrieve back the object which 
        // has been weakly referenced. 
        // It succesfully calls the method. 
        g = softref.get();  
          
        g.x(); 
    } 
} 
```
Kết quả:

> GeeksforGeeks
> 
> GeeksforGeeks

Chú ý:
Trong android, không khuyến khích việc sử dụng `Soft Reference` cho việc tạo `cache`. Do hệ thống không có đủ thông tin để xóa hoặc giữ tham chiếu, dẫn đến bộ nhớ heap tăng cao. Trong trang chủ android có gợi ý sử dụng `android.util.LruCache` thay cho `SoftReference` khi tạo `cache`.

Chi tiết bạn có thể xem trong: 

https://developer.android.com/reference/java/lang/ref/SoftReference

## 4) Phantom Reference (tạm dịch là tham chiếu ma)

Khi khai báo tham chiếu này thì mặc định đã đủ điều kiện để cho GC xử lý. Nhưng trước khi bị xóa khỏi bộ nhớ thì JVM đặt chúng vào hàng đợi được gọi là **`"reference queue"`**; một đối tượng phantom reachable sẽ tồn tại đến khi tất cả các tham chiếu bị hủy hoặc bản thân nó trở thành unreachable.

Khác với `WeakReference` and `SoftReference`, hàm `get()` trong `PhantomReference` luôn trả về `null`.


Để hiểu rõ hơn hãy xem ví dụ sau:
```java
//Code to illustrate Phantom reference 
import java.lang.ref.*; 
class Gfg 
{ 
    //code 
    public void x() 
    { 
        System.out.println("GeeksforGeeks"); 
    } 
} 
  
public class Example 
{ 
    public static void main(String[] args) 
    { 
        //Strong Reference 
        Gfg g = new Gfg();    
        g.x(); 
          
        //Creating reference queue 
        ReferenceQueue<Gfg> refQueue = new ReferenceQueue<Gfg>(); 
  
        //Creating Phantom Reference to Gfg-type object to which 'g'  
        //is also pointing. 
        PhantomReference<Gfg> phantomRef = null; 
          
        phantomRef = new PhantomReference<Gfg>(g,refQueue); 
          
        //Now, Gfg-type object to which 'g' was pointing 
        //earlier is available for garbage collection. 
        //But, this object is kept in 'refQueue' before  
        //removing it from the memory. 
        g = null;  
          
        //It always returns null.  
        g = phantomRef.get();  
          
        //It shows NullPointerException. 
        g.x(); 
    } 
} 
```

Runtime Error:
> Exception in thread "main" java.lang.NullPointerException
	at Example.main(Example.java:31)
    
Kết quả:
> GeeksforGeeks

# Kết luận 
Hãy thử tạo project và dùng thử những loại tham chiếu trên để hiểu rõ cơ chế hoạt động hơn nhé. Cảm ơn !

# Tham khảo
https://www.dynatrace.com/resources/ebooks/javabook/how-garbage-collection-works/
https://dzone.com/articles/finalization-and-phantom
https://www.geeksforgeeks.org/types-references-java/
https://www.baeldung.com/java-weakhashmap
https://developer.android.com/reference/android/util/LruCache