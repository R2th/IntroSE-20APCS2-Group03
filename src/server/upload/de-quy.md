# 1. Đệ quy là gì?
> Một đối tượng được gọi là đệ quy nếu nó hoặc một phần của nó được định nghĩa thông qua khái niệm về chính nó.
> 
Ví dụ: Định nghĩa số tự nhiên:

* 0 là một số tự nhiên.
* n là số tự nhiên nếu n - 1 là số tự nhiên

# 2. Giải thuật đệ quy
Nếu lời giải của bài toán T được thực hiện bởi lời giải của một bài toán T’, có dạng như T thì đó là một lời giải đệ quy. Giải thuật chứa lời giải đệ quy được gọi là giải thuật đệ quy (T’<T).

Ví dụ: Tính n!
* Nếu n=0, 0!=1.
* Nếu n>0, n!=n*(n-1)!

Đặc điểm của hàm đệ quy:

* Trong hàm đệ quy có lời gọi đến chính nó.
* Mỗi lần có lời gọi thì kích thước của bài toán được thu nhỏ hơn trước.
* Vấn đề nhỏ hơn này, đến một lúc nào đó sẽ đơn
giản tới mức chương trình có thể tự giải quyết
được mà không cần gọi tới chính nó nữa.
* Đệ quy gồm:  đệ quy trực tiếp (hàm chứa lời gọi đến chính nó) và đệ quy gián tiếp (hàm chứa lời gọi đến hàm khác mà hàm này lại chứa lời gọi đến chính nó ) :)

# 3. Ưu, nhược điểm điều kiện để có thể viết đệ quy
**Ưu điểm:**
* Chương trình trong sáng, dễ hiểu (Tùy từng trường hợp).
* Có thể thực hiện một số lượng lớn các thao tác tính toán thông qua 1 đoạn chương trình ngắn gọn.
* Định nghĩa một tập hợp vô hạn các đối tượng thông qua một số hữu hạn lời phát biểu.

**Nhược điểm:**
* Tốn nhiều dung lượng
* Chậm

**Điều kiện để có thể viết được đệ quy:**

* Vấn đề cần xử lý phải được giải quyết một cách đệ quy.
* Ngôn ngữ dùng để viết chương trình phải hỗ trợ đệ quy (ngôn ngữ lập trình có hỗ trợ hàm hoặc thủ tục).
* Hạn chế việc khai báo các biến, hàng trong hàm đệ quy nếu không cần thiết.

**Khi nào thì không nên sử dụng đệ quy:**

Chương trình có thể viết dưới dạng lặp hoặc cấu trúc lệnh khác thì không nên sử dụng đệ quy.
Xét bài toán tính các phần tử của dãy Fibonacci. Dãy Fibonacci được định nghĩa như sau:

> $$
f(x) = \begin{cases}
   0  &\text{if } x = 0 \\
   1  &\text{if } x = 1 \\
   f(n-1) + f(n-2) &\text{if } n > 1
\end{cases}
$$

Hàm đệ quy để tính dãy Fibonacci được viết như sau:

```ruby
def fibo(n)
 if n == 0
  return 0
 elsif n == 1
  return 1
 else
  return fibo(n-1) + fibo(n-2)
 end
end
```

Kết quả thực hiện chương trình không có gì sai. Tuy nhiên, lời gọi đệ quy $f(n)$ sẽ dẫn tới 2 lời gọi đệ quy khác ứng với $n-1$ và $n-2$. Hai lời gọi này lại gây ra 4 lời gọi nữa..., cứ như vậy lời gọi đệ quy sẽ tăng theo cấp số mũ. Điều này rõ ràng không hiệu quả vì trong số các lời gọi đệ quy đó có rất nhiều lời gọi trùng nhau. Ví dụ lời gọi đệ quy $f(5)$ sẽ dẫn đến 2 lời gọi
$f(4)$ và $f(3)$. Lời gọi $f(4)$ sẽ gọi $f(3)$ và $f(2)$. Ngay chỗ này ta đã thấy có 2 lời gọi $f(3)$ được thực hiện.

Sử dụng vòng lặp để tính giá trị các phần tử của dãy Fibonacci:
Khai báo một mảng F các số tự nhiên để chứa các số Fibonacci. Vòng lặp để tính và gán các số này vào mảng rất đơn giản:
```ruby
f[0] = 0
f[1] = 1
2..n do |i|
 f[i] = f[i-1] + f[i-2]
end
```

Với vòng lặp này, mỗi số $f(n)$ chỉ được tính 1 lần
thay vì được tính toán chồng chéo như trên.