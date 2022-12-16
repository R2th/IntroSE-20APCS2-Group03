# SOLID là gì?
Lập trình hướng đối tượng (object oriented programming – **OOP**) là một trong những mô hình lập trình được sử dụng nhiều nhất và cũng là một trong những mô hình hiệu quả nhất để mô hình hoá thế giới thực vào thế giới code. Các tính chất đặc biệt khiến việc “hướng đối tượng” trở nên hiệu quả đó là:

* Tính trừu tượng (abstraction): Tạo ra các lớp trừu tượng mô hình hoá các đối tượng trong thế giới thực.
* Tính đóng gói (Encapsulation): Các thực thể của lớp trừu tượng có các giá trị thuộc tính riêng biệt.
* Tính kế thừa (Inheritance): Các đối tượng có thể dễ dàng kế thừa và mở rộng lẫn nhau.
* Tính đa hình (Polymorphism): Có thể thực hiện một hành động đơn theo nhiều cách thức khác nhau tuỳ theo loại đối tượng cụ thể đang được gọi.

Các tính chất đặc biệt này của OOP giúp chúng ta xây dựng được các chương trình giải quyết được nhiều vấn đề cụ thể khác nhau trong thế giới thực. Chúng ta hầu hết đã biết các tính chất này của **OOP**, nhưng cách thức để phối hợp các tính chất này với nhau để tăng hiệu quả của ứng dụng thì không phải ai cũng nắm được.

Một trong những nguyên tắc (chỉ dẫn) để giúp chúng ta xây dựng được các ứng dụng OOP hiệu quả hơn đó là **SOLID** (đây là từ viết tắt), nó là một bộ 5 chỉ dẫn đã được nhắc tới từ lâu bởi các nhà phát triển phần mềm và được tổng hợp và phát biểu thành nguyên tắc bởi [Robert C. Martin](https://en.wikipedia.org/wiki/Robert_C._Martin), cũng chính là tác giả của cuốn sách **The Clean Coder**
        
 Dài dòng quá :)) Vậy SOLID là gì?
  **SOLID**  là tập hơp của **5 nguyên tắc**:
1. Single responsibility principle
2. Open-Closed principle (OCP)
3. Liskov substitution principle
4. Interface segregation principle
5. Dependency inversion principle

Giờ ta sẽ đi vào từng nguyên tắc xem chúng là gì nhé:
# Single responsibility principle
![](https://images.viblo.asia/5872fccb-9eb2-4ec0-af4d-91bed1716d1b.png)

Nguyên lý đầu tiên, tương ứng với chữ **S** trong **SOLID** . Nội dung nguyên lý: 
> Một class chỉ nên giữ 1 trách nhiệm duy nhất (Chỉ có thể sửa đổi với lí do duy nhất)
```java
public class ReportManager(){
    public void readDataFromDatabase();
    public void processData();
    public void ExportData();
}
```
Theo đó class này chịu tới 3 nhiệm vụ là đọc, xử lí và xuất dữ liệu. Do đó, chỉ cần ta thay đổi DB, thay đổi cách xuất kết quả, … ta sẽ phải sửa đổi class này. Càng về sau class sẽ càng phình to ra. Theo đúng nguyên lý, ta phải tách class này ra làm 3 class riêng. Tuy số lượng class nhiều hơn những việc sửa chữa sẽ đơn giản hơn, class ngắn hơn nên cũng ít bug hơn.
# Open-Closed principle (OCP).
![](https://images.viblo.asia/f69caf1d-0461-4788-9e89-c291e9748072.jpg)

Dành cho bạn nào thắc mắc câu trong hình thì về nghĩa bóng đại loại là:  Lập trình viên không nên mạo hiểm thay đổi chức năng cốt lõi để thêm một tính năng đơn giản và có khả năng ảnh hưởng đến tính toàn vẹn dữ liệu.

Nguyên lý thứ hai, tương ứng với chữ **O** trong **SOLID**. Nội dung nguyên lý:
> Có thể thoải mái mở rộng 1 class, nhưng không được sửa đổi bên trong class đó 
(open for extension but closed for modification).

Theo nguyên lý này, mỗi khi ta muốn thêm chức năng,.. cho chương trình, chúng ta nên viết class mới mở rộng class cũ ( bằng cách kế thừa hoặc sở hữu class cũ) không nên sửa đổi class cũ.
Ví dụ điển hình nhất và Android developer thường gặp là khi làm việc với **RecyclerView**. Khi mà tạo **adapter** cho **RecyclerView** của chúng ta thì phải extend từ lớp **RecyclerView.Adapte**r và implements các phương thức cần thiết mà không hề sửa đổi các thành phần có trong lớp **RecyclerView.Adapter**

# Liskov substitution principle
![](https://images.viblo.asia/93e56c8b-0ca3-40a6-89b5-b9881cd97029.jpg)

Đọc đến nguyên lí này thì chắc mình cũng như các bạn sẽ thắc mắc **Liskov** là ai? Thì câu trả lời là: **Barbara Liskov**, nhà nữ khoa học máy tính người mỹ đã phát biểu nguyên tắc này. Để biết thêm thông tin về Barbara Liskov thì bấm vào [đây](https://en.wikipedia.org/wiki/Barbara_Liskov)

Vào năm 1987, Barbara Liskov, nhà nữ khoa học máy tính người mỹ đã phát biểu **Liskov Substitution Principle (LSP)** như sau:
> If **S** is a subtype of **T**, then objects of type **T** may be replaced with objects of type **S** (i.e. an object of type **T** may be substituted with any object of a subtype **S**) without altering any of the desirable properties of the program

> Nếu **S** là kiểu mở rộng của **T**, thì **S** có thể được sử dụng thay thế cho **T** mà không thay đổi cấu trúc phần mềm. Hay nói cách khác phần mềm nên được thiết kế bởi các thành phần dễ dàng hoán đổi cho nhau.

Từ đó nguyên lí thứ 3 tương ứng với chữ **L** trong **SOLID**  có thể hiểu đơn giản hơn như sau:
> Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình

Nghe có vẻ còn khó hiểu hơn ấy chứ nhỉ =)))
Mình sẽ lấy một ví dụ kinh điển như sau để làm rõ hơn nhé: 
Đầu tiên, hãy cùng đọc đoạn code dưới đây. Ta có 2 class cho hình vuông và hình chữ nhật. Ai cũng biết hình vuông là hình chữ nhật có 2 cạnh bằng nhau, do đó ta có thể cho class **Square** kế thừa class **Rectangle** để tái sử dụng code.
```java
public class Rectangle {
    protected int mWidth;
    protected int mHeight;

    public int getWidth() {
        return mWidth;
    }

    public void setWidth(int width) {
        mWidth = width;
    }

    public int getHeight() {
        return mHeight;
    }

    public void setHeight(int height) {
        mHeight = height;
    }
}
```
Do hình vuông có 2 cạnh bằng nhau, mỗi khi set độ dài 1 cạnh thì ta set luôn độ dài của cạnh còn lại.
```
public class Square extends Rectangle{
    @Override
    public void setHeight(int height) {
        mHeight = height;
        mWidth = height;
    }

    @Override
    public void setWidth(int width) {
        mWidth = width;
        mHeight = width;
    }
}
```
Tuy nhiên, khi chạy thử, hành động này đã thay đổi hành vi của của class **Rectangle**, dẫn đến vi phạm **LSP**.
```java
        Rectangle rect = new Rectangle();
        rect.setHeight(10);
        rect.setWidth(20);
        Log.d(TAG, String.valueOf(rect.getArea())); // Kết quả trả về 5 * 10


        Rectangle otherRect = new Square();
        otherRect.setHeight(10);
        otherRect.setWidth(20);
        Log.d(TAG, String.valueOf(otherRect.getArea()));
        // Kết quả trả về 20 * 20
        // Nếu đúng phải là 10 * 20, vì diện tích hình chữ nhật là dài * rộng 
        // Class Square đã sửa đổi hành vi của class cha Rectangle, set cả dài và rộng về 20
```

Vậy để không vi phạm **LSP**, ta phải tạo 1 class cha là class Shape, sau đó cho Square và Rectangle kế thừa class Shape này.
Đây là nguyên lý… dễ bị vi phạm nhất, nguyên nhân chủ yếu là do sự thiếu kinh nghiệm khi thiết kế class. Thông thường, design các class dựa theo đời thật: hình vuông là hình chữ nhật,  Tuy nhiên, không thể bê nguyên văn mối quan hệ này vào code. Hãy nhớ 1 điều:

> Trong đời sống, **A** là **B** (hình vuông là hình chữ nhật) không có nghĩa là class **A** nên kế thừa class **B**. Chỉ cho class **A** kế thừa class **B** khi class **A** thay thế được cho class **B**.

# Interface segregation principle
![](https://images.viblo.asia/369f8cb4-6c3a-45a6-87ad-b8ec37c7c7e8.jpg)

Nguyên lý thứ tư, tương ứng với chữ **I** trong **SOLID** . Nội dung nguyên lý:

> Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể

Nguyên lý này khá dễ hiểu. Hãy tưởng tượng chúng ta có 1 **interface** lớn, khoảng 100 **methods**. Việc implements sẽ khá cực khổ, ngoài ra còn có thể dư thừa vì 1 class không cần dùng hết 100 method. Khi tách interface ra thành nhiều interface nhỏ, gồm các method liên quan tới nhau, việc implement và quản lý sẽ dễ hơn.

Một ví dụ khác mà chúng ta hẳn đã sử dụng nhiều lần. Trong **android** có nhiều sự kiện click: **onClickListener**, **onLongClickListener**, .. Nội dung của nó như sau:
```java
/**
 * Interface definition for a callback to be invoked when a view is clicked.
 */
public interface OnClickListener {
    /**
     * Called when a view has been clicked.
     *
     * @param v The view that was clicked.
     */
    void onClick(View v);
}
/**
 * Interface definition for a callback to be invoked when a view has been clicked and held.
 */
public interface OnLongClickListener {
    /**
     * Called when a view has been clicked and held.
     *
     * @param v The view that was clicked and held.
     *
     * @return true if the callback consumed the long click, false otherwise.
     */
    boolean onLongClick(View v);
}
```
Tới đây thì tự hỏi tại sao lại phải tách ra làm 2 interface trong khi chỉ xử lí có hành động nhấn nút và một cái nữa là nhấn giữ, Tại sao không làm như sau cho đơn giản nhỉ:
```
public interface MyOnClickListener {
    void onClick(View v);
    boolean onLongClick(View v);
}
```
Câu trả lời khá hiển nhiên khi mà nhấn Click thì ta sẽ không quan tâm đến **onLongClick** và ngược lại. Dẫn đến việc implement các phương thức thừa thãi mà không cần thiết.
Chính vì thế việc có 2 interface riêng biệt giúp tránh implement phương thức không sử dụng. Trường hợp muốn sử dụng cả hai thì implement cả hai. it's simple =))
# Dependency inversion principle
![](https://images.viblo.asia/6dfe6bba-abc3-45cb-9eee-cba80f7733b1.jpg)

Nguyên lý cuối cùng, tương ứng với chữ **D** trong **SOLID** . Nội dung nguyên lý:

> 1. Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. 
   Cả 2 nên phụ thuộc vào abstraction.
> 2. Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại.
( Các class giao tiếp với nhau thông qua interface, không phải thông qua implementation.)

Có một ví dụ thực tế như sau. Chúng ta đều biết 2 loại đèn: đèn tròn và đèn huỳnh quang. Chúng cùng có đuôi tròn, do đó ta có thể thay thế đèn tròn bằng đèn huỳnh quang cho nhau 1 cách dễ dàng.
Ở đây, interface chính là đuôi tròn, implementation là bóng đèn tròn và bóng đèn huỳnh quang. Ta có thể swap dễ dàng giữa 2 loại bóng vì ổ điện chỉ quan tâm tới interface (đuôi tròn), không quan tâm tới implementation.

Ngoài ra nếu các bạn đã sử dụng mô hình MVP thì có thể đã sử dụng nguyên lí này. Trong mô hình MVP thì chúng ta phải giữ tham chiếu của Presenter ở trong View. Nếu mà ta giữ một đối tượng kiểu Presenter và lưu trong View thì nó sẽ vô cùng cứng nhắc. Nên chúng ta sẽ tạo ra một interface để cho Presenter này implement và chỉ giữ tham chiếu đến interface này mà thôi!
# Tổng kết SOLID
Chúng ta đã cùng nhau tìm hiểu qua 5 nguyên lí lập trình với cái tên rút gọn là **SOLID** , tóm gọn lại, những nguyên tắc này sẽ giúp chúng ta: viết code trong sáng hơn, rõ ràng hơn, các module hệ thống tách bạch hơn, phần mềm sẽ dễ dàng kiểm thử, bảo trì và mở rộng hơn.

Như mọi người thấy, mặc dù **SOLID**  giúp ta cải thiện chất lượng code, nhưng chúng ta cũng phải đánh đổi: nó làm code của ta dài hơn, đòi hỏi nhiều công sức của lập trình viên hơn khi thiết kế, lập trình viên mới đọc code tốn thời gian hơn, code của ta sẽ khó theo vết hơn nếu có quá nhiều abtractions, … Chung quy lại, **SOLID**  cũng chỉ là một guideline, nó không phải là thuốc tiên, cần cân nhắc kĩ trước khi sử dụng.

![](https://images.viblo.asia/f9305635-2b04-4cc7-bd66-83463bca1a97.jpg)

Nguồn: https://medium.com/mindorks/solid-principles-explained-with-examples-79d1ce114ace
và: https://blogs.msdn.microsoft.com/cdndevs/2009/07/15/the-solid-principles-explained-with-motivational-posters/