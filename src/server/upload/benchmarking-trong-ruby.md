Benchmarking là một việc cần thiết khi chúng ta muốn kiểm chứng performance của một function hay một method nào đó. Và Ruby cũng đã cung cấp cho chúng ta [Benchmark module](http://ruby-doc.org/stdlib-2.2.0/libdoc/benchmark/rdoc/Benchmark.html) , nó có thể đo được thời gian chạy của bất cứ đoạn code nào. 

Đầu tiên chúng ta cần require thư việc trước

```
2.3.4 :001 > require 'benchmark'
 => true
```

#### Đo thời gian của một mã code đơn

Để đo thời gian của một mã code đơn giản ta sử dụng phương thức `#measure`

```
2.3.4 :006 > puts Benchmark.measure { 10_000_000.times { Object.new } }
  3.560000   0.000000   3.560000 (  3.563384)
 => nil 
```

Kết quả trả về với đơn vị là giây, và chúng ta có thể thấy rằng việc tạo ra 10 triệu Ojbject cũng khá tốn thời gian. Nếu chúng ta muốn custom message trả về thì chúng ta có thể sử dụng kết quả và custom nó.

```
2.3.4 :008 > result = Benchmark.realtime { 10_000_000.times { Object.new } }; puts "Creating ten million objects: #{result}s"
Creating ten million objects: 4.229887614957988s
```

#### So sánh nhiều blocks với nhau

Khi chúng ta cần giải quyết vấn đê thì sẽ có rất nhiều cách giải quyết khác nhau, và phân vân không biết nên chọn cái nào là tốt nhất. Giải sử chúng ta có bài toán về fibonacci của số n nào đó. chúng ta sẽ so sánh theo 2 cách giải quyết sau đây:

```
# Không theo đệ quy
def fib_dp(n)
  (2..n).reduce([0, 1]) { |f| f << f.last(2).reduce(:+) }[n]
end

#  Theo đệ quy
def fib_rec(n)
  return 0 if n == 0
  return 1 if n == 1

  fib_rec(n - 1) + fib_rec(n - 2)
end

```

Phương pháp đệ quy không được tối ưu nên chậm hơn rất nhiều so với phương pháp không dùng đệ quy (với n càng cao thì tỷ lệ chậm càng rõ). Ta có thể xem kết quả benchmark để thấy rõ hơn điều này.

```
2.3.4 :043 > Benchmark.bm(10) do |x|
2.3.4 :044 >       x.report('Khong de quy:') { fib_dp(5) }
2.3.4 :045?>     x.report('De quy:')       { fib_rec(5) }
2.3.4 :046?>   end
                 user     system      total        real
Khong de quy:  0.000000   0.000000   0.000000 (  0.000026)
De quy:      0.000000   0.000000   0.000000 (  0.000009)

2.3.4 :039 > Benchmark.bm(10) do |x|
2.3.4 :040 >       x.report('dp:')         { fib_dp(35) }
2.3.4 :041?>     x.report('recursive:')  { fib_rec(35) }
2.3.4 :042?>   end
                 user     system      total        real
dp:          0.000000   0.000000   0.000000 (  0.000082)
recursive:   4.650000   0.000000   4.650000 (  4.665559)

2.3.4 :061 >   Benchmark.bm(10) do |x|
2.3.4 :062 >       x.report('Khong de quy:') { fib_dp(40) }
2.3.4 :063?>     x.report('De quy:')       { fib_rec(40) }
2.3.4 :064?>   end
                 user     system      total        real
Khong de quy:  0.000000   0.000000   0.000000 (  0.000064)
De quy:     55.790000   0.020000  55.810000 ( 56.148162)
```

Nhìn vào kết quả chúng ta có thể thấy rằng dùng phương pháp không đệ quy tốn rất ít thời gian trong khi đó với n càng lớn thì phương pháp đệ quy càng tốn thời gian. Và trên thực tế thì phương pháp không đệ quy có thể xử lý một con số lớn trong khoảng thời gian nhỏ.

```
2.3.4 :010 > puts Benchmark.measure { fib_dp(100_000)  }
  0.330000   0.010000   0.340000 (  0.335586)

```

Ngoài ra thì chúng ta cũng có phương thức khác trong thư việc Benchmark cung cấp là `#bmbm`  nó sẽ thực thi test 2 lần, lần đầu tiên để làm nóng môi trường, và lần thứ 2 là tính toán kết quả trả về. Bạn có thể sử dụng phương thức này nếu bạn lo lắng rằng thứ tự thực hiện các block code khác nhau sẽ ảnh hưởng đến thời gian chạy của chúng. 

#### Sử dụng `benchmark-ips`

Thư viện [benchmark-ips](https://github.com/evanphx/benchmark-ips) cung cấp cho chúng ta rất nhiều tính năng so với thư viện Benchmark mặc định. Để sử dụng chúng ta cần install và require nó.

```
require 'benchmark/ips'
```

Giờ chúng ta hãy cùng sử dụng thư viện mới này test những function trước đó.

```
2.3.4 :013 > Benchmark.ips do |x|
2.3.4 :014 >       x.report("dp: ")        { fib_dp(35) }
2.3.4 :015?>     x.report("recursive: ") { fib_rec(35) }
2.3.4 :016?>   
2.3.4 :017 >       x.compare!
2.3.4 :018?>   end
Warming up --------------------------------------
                dp:      4.911k i/100ms
         recursive:      1.000  i/100ms
Calculating -------------------------------------
                dp:      48.915k (± 8.0%) i/s -    245.550k in   5.061913s
         recursive:       0.446  (± 0.0%) i/s -      3.000  in   6.720924s

Comparison:
                dp: :    48915.5 i/s
         recursive: :        0.4 i/s - 109581.23x  slower

```

Để công bằng thì ban `benchmark-ips` đã test 2 lần, tương đương với `#bmbm` ở trên, có thời gian làm nóng môi trường vào sau đó là tính toán. điểm khác biệt ở đây chúng ta nhìn thấy là dòng cuối cùng `x.compare!` nhưng chính sự khác biệt này đã cho chúng ta rất nhiều thông tin hữu ích. Và cuối cùng nó còn tính toán cho chúng ta biết mức độ chậm hơn giữa các phương thức. Như kết quả trả về trên kia thì ta có thể thấy được là với phương thức đệ quy thông thường chưa được tối ưu thì nó chậm 100K lần so với phương thức thông thường.

Từ công cụ trên, mỗi lần bạn băn khoăn nên sử dụng function nào để cho hợp lý thì bạn có thể dễ dàng kiểm chứng nó xem cái nào là nhanh và hơn bao nhiêu lần. Dưới đây là một vài ví dụ điển hình mà vẫn hay gặp thường ngày. Bạn có thể thấy chi tiết hơn trong repo [fast-ruby](https://github.com/JuanitoFatas/fast-ruby) trong này đã liệt kê khá chi tiết cho những methods mà có thể bạn sẽ có thắc mắc về nó. Ví dụ một số function như sau:

- `Array#bsearch` vs `Array#find`

```
Calculating -------------------------------------
                find     1.000  i/100ms
             bsearch    42.216k i/100ms
-------------------------------------------------
                find      0.184  (± 0.0%) i/s -      1.000  in   5.434758s
             bsearch    577.301k (± 6.6%) i/s -      2.913M

Comparison:
             bsearch:   577300.7 i/s
                find:        0.2 i/s - 3137489.63x slower
```

thì `find` chậm hơn `bsearch` rất nhiều, tuy nhiên điều chú ý là `bsearch` chỉ hoạt động đúng với array đã được sắp xếp. ví dụ bạn muốn tìm 1 số trong mảng cho trước  với số đó > 2. Ví dụ mảng `a = [3, 2, 4]`. Với 1 mảng không sắp xếp như vậy thì kết quả sẽ trả về `4` có nghĩa là nó sẽ lấy phần tử ngay sau điều kiện ta tìm.

```
2.3.4 :038 >   a = [3,2,4]
 => [3, 2, 4] 
2.3.4 :039 > a.bsearch{|t| t > 2}
 => 4

```

-  `Array#length` vs `Array#size` vs `Array#count`

```
Calculating -------------------------------------
        Array#length   172.998k i/100ms
          Array#size   168.130k i/100ms
         Array#count   164.911k i/100ms
-------------------------------------------------
        Array#length     11.394M (± 6.1%) i/s -     56.743M
          Array#size     11.303M (± 6.5%) i/s -     56.324M
         Array#count      9.195M (± 8.6%) i/s -     45.680M

Comparison:
        Array#length: 11394036.7 i/s
          Array#size: 11302701.1 i/s - 1.01x slower
         Array#count:  9194976.2 i/s - 1.24x slower
```

Với 1 array thì dùng `length` để đo số phần tử trong đó là nhanh nhất.

- `Array#[](0)` vs `Array#first`

```
Calculating -------------------------------------
           Array#[0]   152.751k i/100ms
         Array#first   148.088k i/100ms
-------------------------------------------------
           Array#[0]      8.614M (± 7.0%) i/s -     42.923M
         Array#first      7.465M (±10.7%) i/s -     36.874M

Comparison:
           Array#[0]:  8613583.7 i/s
         Array#first:  7464526.6 i/s - 1.15x slower
```

Thì viêc dùng `Array[0]` sẽ nhanh hơn so với việc dùng `Array.first` cũng tương tự dùng `Array[-1]` để lấy phần tử cuối cùng sẽ nhanh hơn so với việc dùng `Array.last`. Ngoài ra còn rất rất nhiều những methods được so sánh tại repo bên trên kia sẽ giúp chúng ta biết được dùng cái nào là tốt hơn.