Giả sử bạn đang thực hiện một số tính toán bằng cách sử dụng một loạt đầu vào thích hợp. Có một số tính toán được thực hiện ở mọi trường hợp để rút ra một số kết quả. Bạn không biết rằng bạn đã gặp cùng một kết quả khi bạn cung cấp cùng một đầu vào. Vì vậy, nó giống như bạn đang thực hiện tính toán lại một kết quả mà trước đó đã đạt được bằng đầu vào cụ thể cho đầu ra tương ứng của nó. Nhưng vấn đề ở đây là gì? Đó là việc thời gian quý báu của bạn bị lãng phí. Bạn có thể dễ dàng giải quyết vấn đề ở đây bằng cách lưu giữ các bản ghi khớp với các tính toán trước đó. Chẳng hạn như sử dụng cấu trúc dữ liệu phù hợp. Ví dụ: bạn có thể lưu trữ đầu vào dưới dạng khóa và đầu ra dưới dạng giá trị.

Bây giờ bằng cách phân tích vấn đề, lưu trữ đầu vào của nó nếu nó mới (hoặc không có trong cấu trúc dữ liệu) với đầu ra tương ứng. Trường hợp còn lại kiểm tra khóa đầu vào đó và nhận đầu ra kết quả từ giá trị của nó. Bằng cách đó khi bạn thực hiện một số tính toán và kiểm tra xem đầu vào đó có tồn tại trong cấu trúc dữ liệu đó không, bạn có thể trực tiếp nhận được kết quả. Do đó chúng ta có thể liên hệ phương pháp này với các kỹ thuật lập trình động.

## Đi sâu vào lập trình động
Tóm lại, chúng ta có thể nói rằng lập trình động được sử dụng chủ yếu để tối ưu hóa các vấn đề, trong đó chúng ta muốn tìm ra cách tốt nhất để làm một điều gì đó.

Phần lớn các vấn đề về lập trình động có thể được phân loại thành hai loại:
1. Các bài toán con chồng chéo
2. Cấu trúc tối ưu

Trong bài viết này, chúng ta sẽ thảo luận chi tiết về thuộc tính đầu tiên (Các bài toán con chồng chéo) một cách chi tiết.

Một kịch bản cụ thể như các bài toán con xảy ra lần lượt có các bài toán con nhỏ hơn của riêng chúng. Thay vì giải quyết việc lặp lại của các bài toán con, lập trình động giải quyết mỗi bài toán con nhỏ hơn một lần duy nhất. Sau đó, bạn ghi lại các kết quả trong một bảng mà từ đó có thể thu được giải pháp cho vấn đề ban đầu.

Chẳng hạn, các số Fibonacci 0, 1, 1, 2, 3, 5 ,8, 13, có một mô tả đơn giản trong đó mỗi term có liên quan đến hai term trước nó. Nếu `F(n)` là term thứ `n` của dãy thì ta có `F(n) = F(n - 1) + F(n - 2)`. Đây được gọi là công thức đệ quy hay quan hệ lặp lại. Nó cần các term trước đó đã được tính toán để tính toán một term sau. 

## Các bài toán con chồng chéo
Lập trình động chủ yếu được sử dụng khi các giải pháp của cùng một bài toán con được cần lặp đi lặp lại. Trong lập trình động, các giải pháp được tính toán cho các bài toán con được lưu trữ trong một bảng để việc tính toán không phải lặp lại. Vì vậy, lập trình động không hữu ích khi không có các bài toán con (chồng chéo) chung vì không có điểm lưu trữ các giải pháp nếu chúng không cần thiết nữa.
## Cách tiếp cận để giải quyết: top-down vs bottom-up
Có hai cách khác nhau chính sau đây để giải quyết vấn đề:

Top-down: Bạn bắt đầu từ trên xuống, giải quyết vấn đề lần lượt. Nếu bạn thấy rằng vấn đề đã được giải quyết, thì chỉ cần trả lại câu trả lời đã lưu. Điều này được gọi là `Memoization`.

Bottom-up: Bạn trực tiếp bắt đầu giải các bài toán con nhỏ hơn để tiến lên đỉnh để tìm ra giải pháp cuối cùng cho một vấn đề lớn đó. Trong quá trình này, đảm bảo rằng các bài toán con được giải quyết trước khi giải quyết vấn đề. Điều này có thể được gọi là `Tabulation`

### Memoization
Lý do rõ ràng cho thuật toán đệ quy bị chậm là vì nó tính toán các số Fibonacci giống nhau nhiều lần.

![](https://images.viblo.asia/0c0aaf27-6483-4546-8405-0570dd4d3530.png)

Chúng ta có thể tăng tốc thuật toán đệ quy đáng kể chỉ bằng cách viết ra kết quả của các cuộc gọi đệ quy. Sau đó chúng ta có thể tìm kiếm chúng một lần nữa nếu chúng ta cần chúng sau này.

Memoization đề cập đến kỹ thuật lưu trữ và sử dụng lại các kết quả được tính toán trước đó. 

Chúng ta khởi tạo một mảng tra cứu với tất cả các giá trị ban đầu là NIL. Bất cứ khi nào chúng ta cần giải pháp cho một bài toán con, trước tiên chúng ta nhìn vào bảng tra cứu. Nếu giá trị được tính toán trước ở đó thì chúng ta trả về giá trị đó, nếu không, chúng ta tính toán giá trị và đưa kết quả vào bảng tra cứu để có thể sử dụng lại sau này.
```
/* Java program for Memoized version */
public class Fibonacci 
{ 
  final int MAX = 100; 
  final int NIL = -1; 
  
  int lookup[] = new int[MAX]; 
  
  /* Function to initialize NIL values in lookup table */
  void _initialize() 
  { 
    for (int i = 0; i < MAX; i++) 
        lookup[i] = NIL; 
  } 
  
  /* function for nth Fibonacci number */
  int fib(int n) 
  { 
    if (lookup[n] == NIL) 
    { 
      if (n <= 1) 
          lookup[n] = n; 
      else
          lookup[n] = fib(n-1) + fib(n-2); 
    } 
    return lookup[n]; 
  } 
  
  public static void main(String[] args) 
  { 
    Fibonacci f = new Fibonacci(); 
    int n = 40; 
    f._initialize(); 
    System.out.println("Fibonacci number is" + " " + f.fib(n)); 
  } 
  
} 
// This Code is Contributed by Saket Kumar 
```

### Tabulation
![](https://images.viblo.asia/89d94c7a-daf6-4075-804d-4ac0c102e794.png)

Tabulation lưu trữ các giá trị từ dưới lên trên. Nó đòi hỏi ít chi phí hơn vì nó không phải duy trì ánh xạ và lưu trữ dữ liệu ở dạng bảng cho mỗi giá trị. Nó cũng có thể tính toán các giá trị không cần thiết. Điều này có thể được sử dụng nếu tất cả những gì bạn muốn là tính toán tất cả các giá trị cho vấn đề của bạn.

Với cách tiếp cận Tabulation, chúng ta có thể loại bỏ nhu cầu đệ quy và chỉ cần trả về kết quả bằng cách lặp qua các phần tử.
```
/* Java program for Tabulated version */
public class Fibonacci 
{ 
  int fib(int n) 
  { 
    int f[] = new int[n+1]; 
    f[0] = 0; 
    f[1] = 1; 
    for (int i = 2; i <= n; i++) 
          f[i] = f[i-1] + f[i-2]; 
    return f[n]; 
  } 
  
  public static void main(String[] args) 
  { 
    Fibonacci f = new Fibonacci(); 
    int n = 9; 
    System.out.println("Fibonacci number is" + " " + f.fib(n)); 
  } 
  
} 
// This Code is Contributed by Saket Kumar 
```
## Tham khảo
[https://www.geeksforgeeks.org/overlapping-subproblems-property-in-dynamic-programming-dp-1/](https://www.geeksforgeeks.org/overlapping-subproblems-property-in-dynamic-programming-dp-1/)

[https://medium.freecodecamp.org/an-intro-to-algorithms-dynamic-programming-dd00873362bb](https://medium.freecodecamp.org/an-intro-to-algorithms-dynamic-programming-dd00873362bb)