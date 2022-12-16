Các ngôn ngữ lập trình chức năng  như **Clojure** có một khái niệm gọi là **Sequences** (chuỗi). Chuỗi khá thú vị, chúng ta có thể coi các thuật toán như cấu trúc dữ liệu, có thể gọi các hàm thực thi trên dữ liệu được tạo ra, cho phép chúng ta tương tác với kết quả trả về như 1 collection, kể cả khi chuỗi đó là vô hạn.

Thư viện chuẩn Ruby không bao gồm 1 class hay module sequence chính thống, nhưng thay vào đó, Ruby cung cấp cho chúng ta module **Enumerable**. Lập trình viên Ruby thường biết tới **Enumerable** thông qua các phương thức với mảng, ví dụ như ```map``` hay ```select```. Mảng, ví dụ như ```[1, 2, 3, 4]``` thường được coi là mảng hữu hạn, hay 1 chuỗi *eagerly loaded*, chúng chứa sẫn tất cả các phần tử mà chúng ta muốn liệt kê thông qua methods. 

# Liệt kê dãy Fibonacci
Dãy Fibonacci cũng được xem là 1 dãy vô hạn. Chúng ta có thể định nghĩa 1 hàm khởi tạo ```n``` phần tử đầu tiên trong dãy, với ```n``` là tham số truyền vào. Việc thực hiên sẽ như sau:
```ruby
def eager_fibonacci n
  a = b = 1
  result = []

  loop do
    break if result.size >= n

    result << a
    a, b = b, a + b
  end

  result
end
```

Hàm này thực thi hoàn toàn ổn, nhưng chúng ta có thể sử dụng một cách khác tối ưu hơn. Thay vì trả về 1 mảng đã được eagerly-loaded, chúng ta có thể trả về 1 **Enumerator**. Ta sẽ đưa từng phần tử vào **Enumerator** ngay khi nó được khởi tạo.
```ruby
def fibonacci
  Enumerator.new do |y|
    a = b = 1

    loop do
      y << a
      a, b = b, a + b
    end
  end
end
```
> **Enumerator** là một enumberable object (đối tượng tập đếm được) có thể sử dụng cho phép liệt kê trong hoặc ngoài 1 collection

Phương thức khởi tạo Enumerator lấy 1 block hoạt động như 1 template cho thuật toán enumerable. Block này lấy 1 tham số ```y``` - là instance của ```Enumerator::Yielder```, cho phép *yield* từng phần tử Enumerator tới các blocks được truyền tới các lệnh gọi phương thức. Nói 1 cách dễ hiểu hơn, 1 Enumerator có thể được sử dụng như 1 Array.

Để lấy ra 10 phần tử đầu tiên của phép liệt kê Fibonacci, ta có thể làm như sau:
```ruby
fibonacci.take 10
```

Chúng ta cũng có thể sử dụng phép liệt kê đối với chuỗi Fibonacci:
```ruby
fibonacci.take(10).each{|i| puts i}
```

Sử dụng phương thức ```Enumerator#lazy```, ta có thể hạn chế việc liệt kê trước, và chỉ query hoặc thực thi các phép toán khi mà mỗi phần tử được tạo ra. Điều này mở ra một vài use-cases hay ho, ví dụ như:
```ruby
fibonacci.lazy.select(&:even?).first(10)
#=> [2, 8, 34, 144, 610, 2584, 10946, 46368, 196418, 832040]

fibonacci.lazy.select(&:odd?).first(10)
#=> [1, 1, 3, 5, 13, 21, 55, 89, 233, 377]
```
Với ví dụ trên, có thể thấy ta đã lọc ra 10 phần tử chẵn hoặc lẻ được tạo ra bởi dãy Fibonacci. Thêm vào phương thức ```with_index```, ta sẽ thấy có bao nhiêu phần tử được liệt kê ra để có thể lấy được 10 số chẵn hoặc lẻ:
```ruby
fibonacci.lazy.with_index.select { |n, i| n.odd? }.first(10)
#=> [[1, 0], [1, 1], [3, 3], [5, 4], [13, 6], [21, 7], [55, 9], [89, 10], [233, 12], [377, 13]]

fibonacci.lazy.with_index.select { |n, i| n.even? }.first(10)
#=> [[2, 2], [8, 5], [34, 8], [144, 11], [610, 14], [2584, 17], [10946, 20], [46368, 23], [196418, 26], [832040, 29]]
```

Hãy để ý rằng, chúng ta chỉ cần liệt kê ra 13 phần tử để lấy được 10 số lẻ đầu tiên trong dãy Fibonacci, trong khi cần tới 29 phần tử để lấy được 10 số chẵn. Kết quả này thực sự không dễ để trả về nếu chúng ta sử dụng cách khai triển trước đó, khi mà số lượng phần tử mong muốn lấy được phải được truyền vào từ đầu.

# Sequence Functions
**Clojure** cung cấp 1 số phương thức hữu dụng cho phép chúng ta khởi tạo chuỗi từ các functions khác. Ví dụ, phương thức ```repeatedly``` sẽ lặp lại việc gọi 1 hàm cho trước và trả về kết quả là 1 chuỗi. Để lấy ra được 1 chuỗi 5 số ngẫu nhiên từ 0 đến 100, ta có thể làm như sau:
```clojure
(take 5 (repeatedly #(rand-int 100)))
```

Đối với những người chưa tiếp cận nhiều với **Clojure** câu lệnh trên nhìn có vẻ hơi kỳ, nhưng nó có thể được hiểu là *lấy ra 5 kết quả đầu tiên từ việc lặp đi lặp lại hành động yêu cầu 1 số ngẫu nhiên từ 0 đến 100*, và kết quả của hành động đó được trả về bằng 1 chuỗi.

Chúng ta có thể làm điều tương tự trong Ruby sử dụng **Enumerator**. Hãy thử định nghĩa phiên bản Ruby của phương thức ```repeatedly```, phương thức này sẽ liên tục gọi tới 1 block cho trước. 
```ruby
def repeatedly_foo(&block)
 loop do
    block.call
  end
end
```
Cách triển khai sử dụng vòng lặp như trên khá là ngây ngô, và có vẻ không được thực tế cho lắm bởi hàm đó sẽ không bao giờ trả về - một vòng lặp vô hạn. Để cải thiện, chúng ta sẽ truyền thêm một tham số ```n``` là số phần tử tối đa có thể trả về, và break khỏi vòng lặp sử dụng bộ đếm:
```ruby
def repeatedly_foo(n, &block)
  result = []

  loop do
    break if result.size >= n

    result << block.call
  end

  result
end
```
Khá ổn, nhưng cũng như ví dụ về dãy Fibonacci trước đó, chúng ta phải load trước 1 số lượng mong muốn trong mảng trả về. Để tối ưu hóa, 1 lần nữa chúng ta sẽ bọc vòng lặp trong 1 lớp **Enumerator**  để có thể sử dụng kết quả trả về như 1 chuỗi:
```ruby
def repeatedly &block
  Enumerator.new do |y|
    loop do
      y << block.call # "yield" the result to the Enumerator::Yielder
    end
  end
end
```
Thông qua cách định nghĩa trên, chúng ta có 1 lớp trừu tượng, có thể được chained tới các phương thức enumrator khác. Và việc gọi hàm trông khá giống với cảm hứng lấy từ **Clojure** trước đó:
```ruby
repeatedly { rand(100) }.take(5)
#=> [48, 48, 72, 41, 70] # your results will vary... they're random!
```

# Lời kết

Tất nhiên, sequence không phải là khái niệm duy nhất có thể được mô hình hóa theo cách này trong Ruby. Bất kỳ collection có kích thước không xác định, ví dụ, kết quả từ việc truy vấn, tài nguyên được phân trang được trả về từ API, dữ liệu từ thu thập web crawler, v.v., cũng là các use-cases hay để hiển thị dưới dạng liệt kê. Hãy cân nhắc việc gói các collection được khởi tạo bằng **Enumerator** có thể xử lý việc gọi hàm 1 cách linh hoạt hơn.



-----
*Bài viết được dịch từ [Infinite Sequences in Ruby](https://rossta.net/blog/infinite-sequences-in-ruby.html)*