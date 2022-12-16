Sự khác biệt giữa bộ nhớ **stack** và **heap** là câu hỏi lập trình phổ biến được hỏi bởi những người mới bắt đầu học Java hoặc bất kỳ ngôn ngữ lập trình nào khác. Bộ nhớ **stack** và **heap** là hai thuật ngữ lập trình viên bắt đầu nghe khi họ bắt đầu lập trình nhưng không có bất kỳ lời giải thích rõ ràng và rõ ràng nào. Thiếu kiến ​​thức về **heap** trong Java là gì và bộ nhớ stack trong Java dẫn đến những quan niệm sai lầm liên quan đến **stack** và **heap**. Để thêm vào sự nhầm lẫn này, một ngăn xếp cũng là một cấu trúc dữ liệu được sử dụng để lưu trữ các phần tử theo thứ tự LIFO (Last In First out) và có sẵn trong API Java dưới dạng java.util.Stack. Nói chung, cả **stack** và **heap** đều là một phần của bộ nhớ, một chương trình được phân bổ và sử dụng cho các mục đích khác nhau. Chương trình Java chạy trên JVM, được khởi chạy như một quá trình bằng lệnh "java". Java cũng sử dụng cả bộ nhớ stack và heap cho các nhu cầu khác nhau.
## Stack vs Heap
1. Bộ nhớ stack là  một phần của bộ nhớ chứa mehtod, local variable và variable tham chiếu.Bộ nhớ stack luôn được tham chiếu theo last in first out. Local variable thi được tạo trong stack.
2. Bộ nhớ Heap là  phần bộ nhớ chưa các Object cũng có thể chưa biến tham chiếu, instance variable được tạo ở đây. 
![](https://images.viblo.asia/a66cecc7-8fc9-4cdf-933e-9f408285005f.gif)

## Sự khác biệt giữa Stack vs Heap trong Java
**Dưới đây là một số khác biệt giữa bộ nhớ stack và heap trong Java:**

1.  Sự khác biệt chính giữa **heap** và **stack** là bộ nhớ **stack** được sử dụng để lưu trữ các biến cục bộ và gọi hàm trong khi bộ nhớ **heap** được sử dụng để lưu trữ các đối tượng trong Java. Không có vấn đề, nơi đối tượng được tạo trong mã, ví dụ: như một biến thành viên, biến cục bộ hoặc biến lớp, chúng luôn được tạo bên trong không gian heap trong Java.

2.  Mỗi luồng trong Java có ngăn xếp riêng có thể được chỉ định bằng tham số -Xss JVM, tương tự, bạn cũng có thể chỉ định kích thước **heap** của chương trình Java bằng tùy chọn JVM -Xms và -Xmx trong đó -Xms là kích thước bắt đầu của **heap** và -Xmx là một kích thước tối đa của heap java. để tìm hiểu thêm về các tùy chọn JVM, hãy xem bài đăng của tôi 10 tùy chọn JVM mà lập trình viên Java nên biết.

3.  Nếu không còn bộ nhớ trong ngăn xếp để lưu trữ hàm gọi hoặc biến cục bộ, JVM sẽ ném java.lang.StackOverFlowError, trong khi nếu không còn không gian heap để tạo đối tượng, JVM sẽ ném java.lang.OutOfMemoryError: Java **Heap** Không gian. Đọc thêm về cách đối phó với java.lang.OutOfMemoryError trong bài viết của tôi 2 cách để giải quyết OutOfMemoryError trong Java.


4.  Nếu bạn đang sử dụng Recursion, trên phương thức nào tự gọi, Bạn có thể nhanh chóng lấp đầy bộ nhớ **stack**. Một điểm khác biệt giữa**stack** và **heap** là kích thước của bộ nhớ stack ít hơn rất nhiều so với kích thước của bộ nhớ **heap** trong Java.


5.  Các biến được lưu trữ trong ngăn xếp chỉ hiển thị cho chủ sở hữu Chủ đề trong khi các đối tượng được tạo trong **heap** hiển thị cho tất cả các luồng. Nói cách khác, bộ nhớ ngăn xếp là loại bộ nhớ riêng của Chủ đề Java trong khi bộ nhớ **heap** được chia sẻ giữa tất cả các luồng.


Đó là tất cả về sự khác biệt giữa bộ nhớ **Stack** và Heap trong Java. Như tôi đã nói, điều quan trọng là phải hiểu **heap** là gì và **stack** là gì trong Java và loại biến nào đi đâu, làm thế nào bạn có thể hết stack và heap memory trong Java, v.v. Hãy cho chúng tôi biết nếu bạn quen thuộc với bất kỳ sự khác biệt nào khác giữa **stack** và **heap** memory trong java.

## Nếu các bạn chưa hiểu lắm thì đừng lo lắng, hãy xem ví dụ dưới đây để hiểu hớn nhé.
```
public class Memory {
    public static void main(Strings[] args) { // Line 1
        int a = 1;  //Line 2
        Object obj = new Object(); // Line 3
		Memory mem = new Memory(); // Line 4
		mem.foo(obj); // Line 5
    } // Line 9
    private void foo(Object param) { // Line 6
		String str = param.toString(); //// Line 7
		System.out.println(str);
	} // Line 8
}
```
Hình ảnh dưới đây cho thấy bộ nhớ Stack và Heap có tham chiếu đến chương trình trên và cách chúng đang được sử dụng để lưu trữ các biến nguyên thủy, đối tượng và tham chiếu
![](https://images.viblo.asia/c934d11f-a298-4b59-aac0-0eb43402f431.png)

**Hãy thông qua các step thực thi trương trình:**

1.  Ngay khi chúng ta chạy chương trình, nó sẽ tải tất cả các lớp Runtime vào không gian Heap. Khi tìm thấy phương thức main () ở dòng 1, Java Runtime tạo bộ nhớ ngăn xếp được sử dụng bởi luồng phương thức main ().


3.  Chúng tôi đang tạo biến cục bộ nguyên thủy ở dòng 2, do đó, nó được tạo và lưu trữ trong bộ nhớ ngăn xếp của phương thức main ().


5. Vì chúng ta đang tạo một Object ở dòng thứ 3, nên nó được tạo trong bộ nhớ heap và bộ nhớ stack chứa tham chiếu cho nó. Một quá trình tương tự xảy ra khi chúng ta tạo đối tượng Bộ nhớ trong dòng thứ 4.


7. Bây giờ khi chúng ta gọi phương thức foo () trong dòng thứ 5, một khối ở đầu ngăn xếp được tạo để được sử dụng bởi phương thức foo (). Do Java là giá trị truyền qua, nên một tham chiếu mới đến Object được tạo trong khối ngăn xếp foo () trong dòng thứ 6.


9. Một chuỗi được tạo trong dòng thứ 7, nó đi vào Chuỗi Pool trong không gian heap và một tham chiếu được tạo trong không gian ngăn xếp foo () cho nó.


11. Phương thức foo () được kết thúc ở dòng thứ 8, tại thời điểm này, khối bộ nhớ được phân bổ cho foo () trong ngăn xếp trở nên miễn phí.


13. Trong dòng 9, phương thức main () chấm dứt và bộ nhớ ngăn xếp được tạo cho phương thức main () bị hủy. Ngoài ra, chương trình kết thúc tại dòng này, do đó Java Runtime giải phóng tất cả bộ nhớ và kết thúc việc thực hiện chương trình.

Nguồn tham khảo :
> https://www.journaldev.com/4098/java-heap-space-vs-stack-memory
> http://net-informations.com/java/cjava/memory.htm
> https://www.java67.com/2016/10/difference-between-heap-and-stack-memory-in-java-JVM.html